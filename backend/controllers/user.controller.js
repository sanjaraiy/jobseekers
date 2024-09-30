import bcrypt from "bcryptjs";
import fs from "fs";
import cloudinary from "../config/cloudinary.js"; 
import { User } from "../models/user.model.js"; 
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
    try {
        // Extract fields from req.body
        const { fullname, email, phone, password, role } = req.body;

        // console.log({ fullname, email, phone, password, role }); // Debugging log

        // Check required fields
        if (!fullname || !email || !phone || !password || !role) {
            return res.status(400).json({
                success: false,
                message: "Something is missing",
            });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User is already registered",
            });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        let profilePhotoUrl = null;

        // Check if a file was uploaded
        // console.log(req.file);
         
        // console.log(cloudinary);
        
        if (req.file) {
            const photo = req.file;

            // Upload to Cloudinary
            const photoUploadResult = await cloudinary.uploader.upload(photo.path, {
                folder: "avatar", // Specify the folder in Cloudinary
            });

            // console.log('Cloudinary Response:', photoUploadResult); // Debugging log

            profilePhotoUrl = photoUploadResult.secure_url; // Get the URL of the uploaded photo

            // Remove the local file after uploading to Cloudinary
            fs.unlinkSync(photo.path);
        }

        // Create a new user
        const newUser = await User.create({
            fullname,
            email,
            phone,
            password: hashedPassword,
            role,
            profile: {
                profilePhoto: profilePhotoUrl, // Save the URL in the profile object
            }
        });

        // Return the user data without the password
        const userWithoutPassword = await User.findById(newUser._id).select("-password");

        return res.status(201).json({
            success: true,
            user: userWithoutPassword,
            message: "User registered successfully",
        });

    } catch (error) {
        console.error(error); // Log the error for debugging
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


export const login = async (req, res) => {
    try {
        const { email, password, role } = req.body;

        // Check if all fields are present
        if (!email || !password || !role) {
            return res.status(400).json({
                success: false,
                message: 'Email, password, or role is missing',
            });
        }

        // Find user by email
        let isUser = await User.findOne({ email });

        // If user not found
        if (!isUser) {
            return res.status(400).json({
                success: false,
                message: 'User is not registered',
            });
        }

        // Check if the password is valid
        const isValidPassword = await bcrypt.compare(password, isUser.password);
        if (!isValidPassword) {
            return res.status(400).json({
                success: false,
                message: 'Password or email is invalid',
            });
        }

        // Check if the role matches
        if (role !== isUser.role) {
            return res.status(400).json({
                success: false,
                message: "Account doesn't exist with the current role",
            });
        }

        // Create token payload
        const tokenData = {
            userId: isUser._id,
            email: isUser.email,
            role: isUser.role,
        };

        // Sign the JWT token
        const token = jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1d' });

        // Clean up user object for response (remove sensitive info)
        isUser = {
            _id: isUser._id,
            fullname: isUser.fullname,
            email: isUser.email,
            phoneNumber: isUser.phoneNumber,
            role: isUser.role,
            profile: isUser.profile,
        };

        // Set the token as a cookie and send response
        return res
            .status(200)
            .cookie("token", token, {
                maxAge: 1 * 24 * 60 * 60 * 1000, // 1 day
                httpOnly: true, // Ensure the cookie is not accessible via JavaScript
                sameSite: 'strict',
            })
            .json({
                success: true,
                isUser,
                message: `Welcome back, ${isUser.fullname}`,
            });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Server error, please try again later',
        });
    }
};

export const logout = async (req, res) => {
    try {
        return res
           .status(200)
           .cookie("token","", {maxAge:0})
           .json({
            success: true,
            message: 'Logout successfully',
           })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Server error, unable to logout',
        });
    }
}

export const updateProfile = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, bio, skills } = req.body;
        
        // Assuming the authenticated user ID is set in the request by middleware
        const userId = req.id; 
        let user = await User.findById(userId);

        // Check if user exists
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        // Handle file upload if any (profile picture or resume)
        let file = req.file;
        if (file) {
            // Example code to handle file upload with Cloudinary
            // Uncomment and configure this block if using Cloudinary
            // const uploadResult = await cloudinary.uploader.upload(file.path, {
            //     folder: 'user_profiles',
            //     resource_type: "auto", // Automatically detect the file type
            // });
            // user.profile.picture = uploadResult.secure_url;
            // Handle resume upload similarly if required
        }

        // Convert skills to an array if provided
        let skillsArray = [];
        if (skills) {
            skillsArray = skills.split(",").map(skill => skill.trim());
        }

        // Update user data with the provided fields
        if (fullname) {
            user.fullname = fullname;
        }
        if (email) {
            user.email = email;
        }
        if (phoneNumber) {
            user.phoneNumber = phoneNumber;
        }
        if (bio) {
            user.profile.bio = bio;
        }
        if (skills) {
            user.profile.skills = skillsArray;
        }

        // Save the updated user information
        await user.save();

        // Construct updated user object for response
        const updatedUser = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: {
                bio: user.profile.bio,
                skills: user.profile.skills,
                // Add other profile fields as needed
                // picture: user.profile.picture, // Uncomment if handling picture
            },
        };

        // Respond with the updated user details
        return res.status(200).json({
            success: true,
            user: updatedUser,
            message: "Profile updated successfully",
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Server error, unable to update profile",
        });
    }
};
