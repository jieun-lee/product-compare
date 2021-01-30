import mongoose from 'mongoose';

const itemSchema = mongoose.Schema({
    list: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    price: Number,
    imageUrl: String,
    description: String,
    details: [String],
    comments: [{
        comment: String,
        date: {
            type: Date,
            default: new Date()
        }
    }],
    isFavourite: Boolean,
    rating: {
        type: Number,
        default: 0
    },
    isArchived: Boolean
});

const Item = mongoose.model('Item', itemSchema);

export default Item;