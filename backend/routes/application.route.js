import express, { application } from 'express';
import { isAuthenticated, isAuthorization } from '../middlewares/auth.middleware.js';
import { applyJob, getApplicants, getAppliedJobs } from '../controllers/application.controller.js';


const router = express.Router();


router
    .route("/apply/:id")
    .get(isAuthenticated, isAuthorization(['APPLICANT']), applyJob)

router
    .route("/get-applied-jobs")
    .get(isAuthenticated, isAuthorization(['APPLICANT']), getAppliedJobs)
    
router
    .route("/:id/applicants")
    .get(isAuthenticated, isAuthorization(['RECRUITER']), getApplicants)

router
    .route("/status/:id/update")
    .post(isAuthenticated, isAuthorization(['RECRUITER']), getAppliedJobs)


export default router;