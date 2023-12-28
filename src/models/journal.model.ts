import { Schema, model, Document } from 'mongoose';


export const JOURNAL_MODEL_NAME = "journal";


// Define the journal schema
const schema = new Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },

},{
    timestamps: true,
    collection: JOURNAL_MODEL_NAME,
    versionKey: false,
});

// Define the journal model
interface Journal extends Document {
    title: string;
    content: string;
    [x: string]: any;
}

const Journal = model<Journal>(JOURNAL_MODEL_NAME, schema);

export default Journal;
