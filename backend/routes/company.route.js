import express from 'express';
import {isAuthenticated, isAuthorization} from '../middlewares/auth.middleware.js';
import { getCompany, getCompanyById, registerCompany, updateCompany } from '../controllers/company.controller.js';

const router = express.Router();

router
    .route("/register")
    .post(isAuthenticated, isAuthorization(['RECRUITER']), registerCompany)

router
    .route("/")
    .get(isAuthenticated, isAuthorization(['APPLICANT']), getCompany)

router
    .route("/:id")
    .get(isAuthenticated, isAuthorization(['APPLICANT']), getCompanyById)

router
    .route("/update/:id")
    .put(isAuthenticated, isAuthorization(['RECRUITER']), updateCompany)

export default router;