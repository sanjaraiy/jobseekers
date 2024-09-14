import mongoose from "mongoose";

const connectDB = async (url) => {
    try {
      const res = await mongoose.connect(url);
      console.log(`MongoDB connection is successfully at: http://localhost:${res.connection.host}`);
    } catch (error) {
      console.log(`Failed database connection due to: ${error}`);
      process.exit(1);
    }
}

export default connectDB;