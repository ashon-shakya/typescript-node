import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/phone-directory', {});
        console.log('MongoDB connected...');
    } catch (err) {
        if (err instanceof Error) {
            console.error(err.message);
        }
        else {
            console.error('An Unknown error occured');
        }
        process.exit(1);
    }
};

export default connectDB;