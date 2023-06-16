const mongoose = require('mongoose');
const { Schema } = mongoose;
const DB = process.env.DB_NAME || 'fm-test';

mongoose.connect(`mongodb://localhost:27017/${DB}`)
.catch(err => {
    console.log('connect failed');
    next(err);
    process.exit(1);
})

const saladSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    weight: Number,
    ingredients: {
        type: Array,
        required: true
    },
    sauce: String,
    dietType: String,
    spicy: Boolean,
    expired: {
        type: Date,
        validate: {
            validator: (v) => v > new Date(),
            message: 'Salad is expired!'
        }
    } 
})


const Salad = mongoose.model('Salad', saladSchema);


module.exports = {
    Salad
};