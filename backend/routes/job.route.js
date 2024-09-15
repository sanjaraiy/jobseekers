import express from 'express';

import {isAuthenticated, isAuthorization} from '../middlewares/auth.middleware.js';
import { deletePost, getAdminJobs, getAllJobs, getJobById, postJob, updatePost } from '../controllers/job.controller.js';

const router = express.Router();

router
    .route("/post")
    .post(isAuthenticated, isAuthorization, postJob)

router
    .route("/")
    .get(isAuthenticated, getAllJobs)

router
    .route("/get-recruiter-jobs")
    .get(isAuthenticated, isAuthorization, getAdminJobs)

router
    .route("/:id")
    .get(isAuthenticated, getJobById)
    .put(isAuthenticated,isAuthorization,updatePost)
    .delete(isAuthenticated, isAuthorization, deletePost)

export default router;