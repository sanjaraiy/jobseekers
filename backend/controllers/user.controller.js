import { User} from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


export const register = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, password, role } = req.body;

        // Check if all required fields are provided
        if (!fullname || !email || !phoneNumber || !password || !role) {
            return res.status(400).json({
                success: false,
                message: "Something is missing",
            });
        }

        // Check if user is already registered
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                success: false,
                message: "User is already registered",
            });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = await User.create({
            fullname,
            email,
            phone: phoneNumber,
            password: hashedPassword,
            role,
        });

        // Save the new user
        await newUser.save();

        // Select the user fields without the password
        const userWithoutPassword = await User.findById(newUser._id).select("-password");

        // Return the new user data without the password
        return res.status(201).json({
            success: true,
            message: userWithoutPassword,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message,
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
