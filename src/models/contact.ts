import mongoose, { Document, Schema } from 'mongoose';

export interface IContact extends Document {
    name: string;
    phone: number;
}

const ContactSchema: Schema = new Schema({
    name: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        required: true,
        length: 10
    },
});

export default mongoose.model<IContact>('Contact', ContactSchema);