import express from 'express';
import isAuthenticated from '../middlewares/auth.middleware.js';
import { getCompany, getCompanyById, registerCompany, updateCompany } from '../controllers/company.controller.js';

const router = express.Router();

router
    .route("/register-company")
    .post(isAuthenticated, registerCompany)

router
    .route("/")
    .get(isAuthenticated, getCompany)

router
    .route("/:id")
    .get(isAuthenticated, getCompanyById)

router
    .route("/update/:id")
    .post(isAuthenticated, updateProfile)

export default router;