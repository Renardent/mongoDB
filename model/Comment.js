const mongoose = require('mongoose');
const { Schema } = mongoose;

const comSchema = new Schema({
    author_name: {
        type: String,
        required: true,
    },
    body: {
        type: String,
    },
    created_at: {
        type: Date,
        default: Date.now
}
})

const Comment = mongoose.model('Comment', comSchema);

module.exports = Comment;