const mongoose = require('mongoose');
const { Schema } = mongoose;
const Salad = require('./Salad');
const Ingredient = require('./Ingredient');
const DB = process.env.DB_NAME || 'fm-test';

mongoose.connect(`mongodb://localhost:27017/${DB}`)
.catch(err => {
    console.log('connect failed');
    next(err);
    process.exit(1);
})



module.exports = {
    Salad,
    Ingredient
};