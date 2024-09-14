import {Company} from '../models/company.model.js';

export const registerCompany = async (req, res) => {
    try {
        const { companyName } = req.body;

        // Check if companyName is provided
        if (!companyName) {
            return res.status(400).json({
                success: false,
                message: "Company name is missing",
            });
        }

        // Check if the company is already registered
        let company = await Company.findOne({ companyName });
        if (company) {
            return res.status(400).json({
                success: false,
                message: "You can't register the same company twice",
            });
        }

        // Create a new company with userId associated with the logged-in user
        company = await Company.create({
            companyName,
            userId: req.id, // Assuming req.id contains the logged-in user's ID
        });

        // Return a success response with the created company details
        return res.status(201).json({
            success: true,
            company,
            message: "Company registered successfully",
        });

    } catch (error) {
        // Handle server errors
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Server error, unable to register company",
            error: error.message,
        });
    }
};


export const getCompany = async (req, res) => {
    try {
        // Logged in user ID from middleware
        const userId = req.id;


        // Fetch companies associated with the logged-in user
        const companies = await Company.find({ userId });

        // Check if no companies were found
        if (!companies || companies.length === 0) {
            return res.status(404).json({
                success: false,
                message: "companies not found",
            });
        }

        // Return the found companies
        return res.status(200).json({
            success: true,
            companies: companies,
            message: "Companies retrieved successfully",
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Server error, unable to fetch companies",
            error: error.message,
        });
    }
};

export const getCompanyById = async (req, res) => {
    try {
        const companyId = req.params.id;

        // Find the company by its ID
        const company = await Company.findById(companyId);

        // If company is not found, return a 404 response
        if (!company) {
            return res.status(404).json({
                success: false,
                message: "Company not found",
            });
        }

        // If company is found, return it with a 200 response
        return res.status(200).json({
            success: true,
            company,
            message: "Company retrieved successfully",
        });

    } catch (error) {
        // Handle any server errors
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Server error, unable to retrieve company",
            error: error.message, // Optional: include the error message for debugging
        });
    }
};


export const updateCompany = async (req, res) => {
    try {
        const { companyName, description, website, location } = req.body;
      

        // Initialize an object to store the update data
        const updateData = {};

        // Only add fields to updateData if they are provided
        if (companyName) updateData.companyName = companyName;
        if (description) updateData.description = description;
        if (website) updateData.website = website;
        if (location) updateData.location = location;



        const file = req.file; // Assuming file (like company logo) is uploaded

        // Handle file upload if necessary (for example, using Cloudinary)
        if (file) {
            // Example using Cloudinary
            // const uploadResult = await cloudinary.uploader.upload(file.path, {
            //     folder: 'company_logos',
            // });
            // updateData.logo = uploadResult.secure_url; // Assuming you want to update the logo URL
        }

        // Find the company by ID and update its information
        const company = await Company.findByIdAndUpdate(req.params.id, updateData, { new: true });

        // Check if the company exists
        if (!company) {
            return res.status(404).json({
                success: false,
                message: "Company not found",
            });
        }

        // Return a success response
        return res.status(200).json({
            success: true,
            message: "Company information updated successfully",
            company,
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Server error, unable to update company information",
            error: error.message,
        });
    }
};
