import { Schema, model } from 'mongoose'
import mongooosePaginate from 'mongoose-paginate-v2'

const hospitalSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    location: {
        type: String,
        required: true,
        trim: true
    },
    telephone: {
        type: Number,
        required: true,
        trim: true
    },
    medical_director: {
        type: String,
        required: true,
        trim: true
    },
    opening_date: {
        type: Date,
        required: true,
    },
}, {
    versionKey: false,
    timestamps: true
});

hospitalSchema.plugin(mongooosePaginate);
export default model('Hospital', hospitalSchema)