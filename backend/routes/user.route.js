import express from 'express';
import { login, logout, register, updateProfile } from '../controllers/user.controller.js';
import {isAuthenticated} from '../middlewares/auth.middleware.js';
import { upload } from '../middlewares/multer.js';


const router = express.Router();

router
    .route("/register")
    .post(upload.single('profilePhoto'), register);

router
    .route("/login")
    .post(login)

router
    .route("/logout")
    .get(logout)

router
    .route("/update-profile")
    .post(isAuthenticated, updateProfile)

export default router;