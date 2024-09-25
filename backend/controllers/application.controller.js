import { Application } from "../models/application.model.js";
import { Job } from "../models/job.model.js";

//Applicant only
export const applyJob = async (req, res) => {
    try {
        // Assuming req.id contains the logged-in user's ID
        const userId = req.id;  

        // Job ID from the request parameters
        const jobId = req.params.id;  

        // Check if the job ID is provided
        if (!jobId) {
            return res.status(400).json({
                success: false,
                message: "Job ID is required",
            });
        }

        // Check if the user has already applied for this job
        const existingApplication = await Application.findOne({ job: jobId, applicant: userId });
        if (existingApplication) {
            return res.status(400).json({
                success: false,
                message: "You have already applied for this job",
            });
        }

        // Check if the job exists
        const isJobExisting = await Job.findById(jobId);
        if (!isJobExisting) {
            return res.status(404).json({
                success: false,
                message: "Job not found",
            });
        }

        // Create a new application
        const newApplication = await Application.create({
            job: jobId,
            applicant: userId,
        });

        // Add the new application to the job's application list
        isJobExisting.applications.push(newApplication._id);
        await isJobExisting.save();

        // Send success response
        return res.status(201).json({
            success: true,
            application: newApplication,
            message: "Job applied successfully",
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Server error, unable to apply for the job",
            error: error.message,
        });
    }
};

//Applicant only
export const getAppliedJobs = async (req, res) => {
    try {
        // Assuming req.id holds the logged-in user's ID
        const userId = req.id;  

        // Find all applications where the applicant matches the user ID, sort them by creation date
        const applications = await Application.find({ applicant: userId })
            .sort({ createdAt: -1 })
            .populate({
                path: 'job',
                populate: {
                    path: 'company',  // Populate the associated company for each job
                },
            });

        // If no applications are found
        if (!applications || applications.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No applications found for this user",
            });
        }

        // Return success response with the found applications
        return res.status(200).json({
            success: true,
            applications,  // Returning the list of applications with populated job and company data
            message: "Applications retrieved successfully",
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Server error, unable to retrieve applied jobs",
            error: error.message,
        });
    }
};


//Recuiter only 
export const getApplicants = async (req, res) => {
    try {
        const jobId = req.params.id;

        // Find the job by ID and populate applications and applicant details
        const job = await Job.findById(jobId).populate({
            path: 'applications',
            options: { sort: { createdAt: -1 } }, // Sort applications by creation date (newest first)
            populate: {
                path: 'applicant', // Populate the applicant details
                options: { sort: { createdAt: -1 } }
            }
        });

        // If the job is not found
        if (!job) {
            return res.status(404).json({
                success: false,
                message: "Job not found",
            });
        }

        // Return the populated job with applicants
        return res.status(200).json({
            success: true,
            applicants: job.applications, // Returning only the applications (applicants)
            message: "Job's applicants retrieved successfully",
        });

    } catch (error) {
        // Handle server errors
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Server error, unable to retrieve applicants",
            error: error.message,
        });
    }
};

//Recuiter only
export const updateStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const applicationId = req.params.id;

        // Check if status is provided
        if (!status) {
            return res.status(400).json({
                success: false,
                message: "Status is required",
            });
        }

        // Find the application by its ID
        const application = await Application.findById(applicationId);
        if (!application) {
            return res.status(404).json({
                success: false,
                message: "Application not found",
            });
        }

        // Update the status
        application.status = status[0].toUpperCase() + status.slice(1);

        // Save the updated application
        await application.save();

        // Return success response
        return res.status(200).json({
            success: true,
            message: "Application status updated successfully",
            updatedStatus: application.status,
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Server error, unable to update status",
            error: error.message,
        });
    }
};


