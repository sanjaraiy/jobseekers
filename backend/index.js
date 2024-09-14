import env from 'dotenv';
import app from './app.js';
import connectDB from './config/connectiondb.js';

env.config();

const PORT = process.env.PORT || 3000;
const URI = process.env.MONGODB_URI;

// Connect to the database
connectDB(URI);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running at: http://localhost:${PORT}`);
});
