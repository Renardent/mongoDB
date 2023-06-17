const mongoose = require('mongoose');
const { Schema } = mongoose;
const Salad = require('./Salad');
const Ingredient = require('./Ingredient');
const User = require('./User');
const Comment = require('./Comment');
const DB = process.env.DB_NAME || 'fm-test';

mongoose.connect(`mongodb://localhost:27017/${DB}`)
.catch(err => {
    console.log('connect failed');
    process.exit(1);
})



module.exports = {
    Salad,
    Ingredient, 
    User,
    Comment
};