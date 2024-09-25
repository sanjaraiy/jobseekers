import express from 'express';

import {isAuthenticated, isAuthorization} from '../middlewares/auth.middleware.js';
import { deletePost, getAdminJobs, getAllJobs, getJobById, postJob, updatePost } from '../controllers/job.controller.js';

const router = express.Router();

router
    .route("/post")
    .post(isAuthenticated, isAuthorization(['RECRUITER']), postJob)

router
    .route("/")
    .get(isAuthenticated, isAuthorization(['APPLICANT']), getAllJobs)

router
    .route("/get-recruiter-jobs")
    .get(isAuthenticated, isAuthorization(['RECRUITER']), getAdminJobs)

router
    .route("/:id")
    .get(isAuthenticated, getJobById)
    .put(isAuthenticated,isAuthorization(['RECRUITER']),updatePost)
    .delete(isAuthenticated, isAuthorization(['RECRUITER']), deletePost)

export default router;