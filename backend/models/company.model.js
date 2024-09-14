import mongoose from 'mongoose';

const companySchema = new mongoose.Schema({
   companyName: {
    type: String,
    required: [true, 'Company name is required'],
    unique: [true, 'Company is already registered']
    },
    description: {
        type: String,
         
    },
    website: {
        type: String,
    },
    location: {
        type: String,
        // required: [true,'Location is required'],
    },
    logo: {
        type: String, //Url link
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Recuiter is required'], 
    },

}, {timestamps: true});

export const Company = mongoose.model('Company', companySchema);
