import {Job} from '../models/job.model.js';

//Admin
export const postJob = async (req, res) => {
    try {
        const { title, description, requirements, salary, location, jobType, experience, position, companyId } = req.body;
        const userId = req.id; // Assuming req.id contains the ID of the logged-in admin

        // Validate required fields
        if (!title || !description || !requirements || !salary || !location || !jobType || !experience || !position || !companyId) {
            return res.status(400).json({
                success: false,
                message: "Something is missing",
            });
        }

        // Convert requirements into an array if provided
        let requirementsArray;
        if (requirements) {
            requirementsArray = requirements.split(',');
        }

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


//student
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
        const jobs = await Job.find(query);

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


//student
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


//admin
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
