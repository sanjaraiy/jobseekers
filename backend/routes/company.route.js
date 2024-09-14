import express from 'express';
import {isAuthenticated, isAuthorization} from '../middlewares/auth.middleware.js';
import { getCompany, getCompanyById, registerCompany, updateCompany } from '../controllers/company.controller.js';

const router = express.Router();

router
    .route("/register")
    .post(isAuthenticated, isAuthorization, registerCompany)

router
    .route("/")
    .get(isAuthenticated, getCompany)

router
    .route("/:id")
    .get(isAuthenticated, getCompanyById)

router
    .route("/update/:id")
    .put(isAuthenticated, isAuthorization, updateCompany)

export default router;