import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import env from 'dotenv';
import connectDB from './config/connectiondb.js';

env.config();

const app = express();
const PORT = process.env.PORT || 3000;
const URI = process.env.MONGODB_URI;

//============ DB Connection ===============
connectDB(URI);
 

//======== in-built middlewares ============
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:true}));
const corsOptions = {
    origin: [
        'http://localhost:5173',
        'http://localhost:5174',
        'http://localhost:5175',
    ],
    credentials: true
}
app.use(cors(corsOptions));


app.listen(PORT, () => {
    console.log(`Server is running at PORT: http://localhost:${PORT}`);
    
})