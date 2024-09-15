import express, { application } from 'express';
import { isAuthenticated, isAuthorization } from '../middlewares/auth.middleware.js';
import { applyJob, getApplicants, getAppliedJobs } from '../controllers/application.controller.js';


const router = express.Router();


router
    .route("/apply/:id")
    .get(isAuthenticated, applyJob)

router
    .route("/")
    .get(isAuthenticated, getAppliedJobs)
    
router
    .route("/:id/applicants")
    .get(isAuthenticated, isAuthorization, getApplicants)

router
    .route("/status/:id/update")
    .post(isAuthenticated, isAuthorization, getAppliedJobs)


export default router;