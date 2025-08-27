import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs"
import { generateToken } from "../utils/generateToken.js";
import { deleteMediaFromCloudinary, uploadMedia } from "../utils/cloudinary.js";
import { use } from "react";

export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "all fields are required"
            })
        };

        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                success: false,
                message: "User already exits"
            })
        };
        const hashPassword = await bcrypt.hash(password, 10);
        await User.create({
            name,
            email,
            password: hashPassword
        })

        return res.status(201).json({
            success: true,
            message: "Account created successFully"
        })

    } catch (error) {
        console.log("register error", error)
        return res.status(500).json({
            success: false,
            message: "failed to register"
        })
    }

};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "all fields are required"
            })
        };
        const user = await User.findOne({ email });
        if (!user) {
            res.status(400).json({
                success: false,
                message: "user email or password wrong"
            });
        }
        const comparePassword = await bcrypt.compare(password, user.password);
        if (!comparePassword) {
            res.status(400).json({
                success: false,
                message: "user email or password wrong"
            });
        }

        generateToken(res, user, `welcome back ${user.name}`)

    } catch (error) {
        console.log("register error", error)
        return res.status(500).json({
            success: false,
            message: "failed to login"
        })

    }
}

export const logout = async (req, res) => {
    try {
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({
            message: "Logged out successfully.",
            success: true
        })

    } catch (error) {
        console.log("logout error", error)
        return res.status(500).json({
            success: false,
            message: "failed to logout"
        })
    }
}

export const getUserProfile = async (req, res) => {
    try {
        const userId = req.id;
        const user = await User.findById(userId).select("-password");
        if (!user) {
            return res.status(400).json({
                message: "Profile not found",
                success: false
            })
        }
        return res.status(200).json({
            success: true,
            user
        })
    } catch (error) {
        console.log("Profile error", error)
        return res.status(500).json({
            success: false,
            message: "failed to load user"
        })
    }
}


export const updateProfile = async (req, res) => {
    try {
        const userId = req.id;
        const { name } = req.body;
        const profilePhoto = req.file;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                message: "User not found",
                success: false
            })
        }

        // extract public id of the old image url is it exists
        if(user.photoURL){
            const publicId = user.photoURL.split("/").pop().split(".")[0]
            deleteMediaFromCloudinary(publicId)
        }

        // upload new photo 
        const cloudResponse = await uploadMedia(profilePhoto.path)
        const photoUrl = cloudResponse.secure_url;

        const updateData = { name, photoUrl }
        const updateUser = await User.findByIdAndUpdate(userId,updateData,{new:true}).select("-password")

        return res.status(200).json({
            success:true,
            user:updateUser,
            message:"Profile updated successfully"
        })

    } catch (error) {
        console.log("Profile error", error)
        return res.status(500).json({
            success: false,
            message: "failed to update profile"
        })
    }
}