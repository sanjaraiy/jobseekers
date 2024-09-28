import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import cloudinary from './config/cloudinary.js'
// Initialize the Express application
const app = express();

// In-built middlewares
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// CORS setup
const corsOptions = {
    origin: [
        'http://localhost:5173',
        'http://localhost:5174',
        'http://localhost:5175',
    ],
    credentials: true,
};
app.use(cors(corsOptions));

// Import routes
import userRoute from './routes/user.route.js'; 
import companyRoute from './routes/company.route.js';
import jobRoute from './routes/job.route.js';
import applicationRoute from './routes/application.route.js';


// Setup routes
app.use('/api/v1/user', userRoute);
app.use('/api/v1/company', companyRoute);
app.use('/api/v1/job', jobRoute);
app.use('/api/v1/application', applicationRoute);

export default app;
