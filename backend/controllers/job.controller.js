import {Job} from '../models/job.model.js';

//Recruiter only
export const postJob = async (req, res) => {
    try {
        const { title, description, requirements, salary, location, jobType, experience, position, companyId } = req.body;
        
        
        // Validate required fields
        if (!title || !description || !requirements || !salary || !location || !jobType || !experience || !position || !companyId) {
            return res.status(400).json({
                success: false,
                message: "Something is missing",
            });
        }
          
      const isPostCreated = await Job.findOne({title});
      if(isPostCreated){
        return res.status(400).json({
            success: false,
            message: "This Job is already Posted"
        })
      }
        // Convert requirements into an array if provided
        let requirementsArray;
        if (requirements) {
            requirementsArray = requirements.split(',');
        }

        // Assuming req.id contains the ID of the logged-in admin
        const userId = req.id; 

        // Create the job post
        const job = await Job.create({
            title,
            description,
            requirements: requirementsArray,
            salary: Number(salary), // Convert salary to a number
            location,
            jobType,
            experience,
            position,
            company: companyId, // Link job to the company
            createdBy: userId,  // Set the job creator (admin)
        });

        // Respond with the created job
        return res.status(201).json({
            success: true,
            job,
            message: "New job created successfully",
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Server error, unable to create job",
            error: error.message,
        });
    }
};


//Applicant only
export const getAllJobs = async (req, res) => {
    try {
        const keyword = req.query.keyword || ""; // Keyword to search for in job titles and descriptions

        // Query to search for jobs by keyword in the title or description (case-insensitive)
        const query = {
            $or: [
                { title: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } },
            ],
        };

        // Fetch jobs based on the query
        const jobs = await Job.find(query).populate({
            path: "company"
        }).sort({createdAt:-1});

        // If no jobs are found, return a 404 response
        if (jobs.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No jobs found",
            });
        }

        // Return the list of jobs with a success response
        return res.status(200).json({
            success: true,
            jobs,
            message: "Jobs retrieved successfully",
        });

    } catch (error) {
        // Handle server errors
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Server error, unable to retrieve jobs",
            error: error.message,
        });
    }
};


//Applicant only
export const getJobById = async (req, res) => {
    try {
        const jobId = req.params.id;

        // Find the job by its ID
        const job = await Job.findById(jobId);

        // If job is not found, return a 404 response
        if (!job) {
            return res.status(404).json({
                success: false,
                message: "Job not found",
            });
        }

        // Return the found job with a success response
        return res.status(200).json({
            success: true,
            job,
            message: "Job retrieved successfully",
        });

    } catch (error) {
        // Handle server errors
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Server error, unable to retrieve job",
            error: error.message, // Optional: include the error message for debugging
        });
    }
};


//Recuiter only
export const getAdminJobs = async (req, res) => {
    try {
        const adminId = req.id; // ID of the admin or recruiter making the request

        // Fetch jobs created by the logged-in admin
        const jobs = await Job.find({ createdBy: adminId });

        // Check if any jobs were found
        if (jobs.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No jobs found for this recruiter",
            });
        }

        // Return the list of jobs with a success response
        return res.status(200).json({
            success: true,
            jobs,
            message: "Jobs retrieved successfully by recruiter",
        });

    } catch (error) {
        // Handle server errors
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Server error, unable to retrieve jobs",
            error: error.message, // Optional: include the error message for debugging
        });
    }
};

//Recuiter only
export const updatePost = async (req, res) => {
    try {
        const { title, description, requirements, salary, location, jobType, experience, position } = req.body;
        const postId = req.params.id;

        // Check if post ID is provided
        if (!postId) {
            return res.status(400).json({
                success: false,
                message: "Post ID is missing",
            });
        }

        // Check if at least one field is provided to update
        if (!title && !description && !requirements && !salary && !location && !jobType && !experience && !position) {
            return res.status(400).json({
                success: false,
                message: "At least one field is required to update",
            });
        }

        // Create an update object based on provided fields
        const updatePost = {};
        if (title) updatePost.title = title;
        if (description) updatePost.description = description;
        if (requirements) updatePost.requirements = requirements.split(','); // Convert requirements to an array
        if (salary) updatePost.salary = Number(salary);
        if (location) updatePost.location = location;
        if (jobType) updatePost.jobType = jobType;
        if (experience) updatePost.experience = experience;
        if (position) updatePost.position = position;

        // Update the job post in the database
        const updatedPost = await Job.findByIdAndUpdate(postId, updatePost, { new: true });

        // If the job post is not found
        if (!updatedPost) {
            return res.status(404).json({
                success: false,
                message: "Post not found",
            });
        }

        // Return the updated post
        return res.status(200).json({
            success: true,
            post: updatedPost,
            message: "Job post updated successfully",
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Server error, unable to update post",
            error: error.message,
        });
    }
};

//Recuiter only
export const deletePost = async (req, res) => {
    try {
        const postId = req.params.id;

        // Check if postId is provided
        if (!postId) {
            return res.status(400).json({
                success: false,
                message: "Post ID is missing",
            });
        }

        // Find and delete the post by ID
        const deletedPost = await Job.findByIdAndDelete(postId);

        // If the post is not found
        if (!deletedPost) {
            return res.status(404).json({
                success: false,
                message: "Job post not found",
            });
        }

        // Return success response after deletion
        return res.status(200).json({
            success: true,
            message: "Job post deleted successfully",
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Server error, unable to delete post",
            error: error.message,
        });
    }
};
