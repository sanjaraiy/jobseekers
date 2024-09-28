import multer from "multer";

// Allowed file types for uploading
const allowedFileTypes = ["image/jpeg", "image/jpg", "image/png"];

// Configure Multer storage
const storage = multer.diskStorage({
  // Destination folder for uploaded files
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Specify the uploads folder
  },
  // Naming the uploaded file
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname); // Create a unique file name
  },
});

// File filter to validate file type
const fileFilter = (req, file, cb) => {
  // Check if the uploaded file type is allowed
  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true); // Accept the file
  } else {
    cb(new Error("Invalid file type. Only JPEG, JPG, and PNG files are allowed.")); // Reject the file
  }
};

// Multer upload middleware configuration
export const upload = multer({
  storage: storage, // Use the configured storage
  limits: { fileSize: 5 * 1024 * 1024 }, // Set a 5MB file size limit
  fileFilter: fileFilter, // Use the file filter for validation
});
