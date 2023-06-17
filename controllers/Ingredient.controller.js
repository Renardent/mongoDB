const {Ingredient} = require('../model');

module.exports.addIngredient = async (req,res,next) => {
    try {
        const {body} = req;
        const ing = await Ingredient.create(body);
        return res.status(200).send(ing);
    } catch(error) {
        next(error);
    }
}

module.exports.getAllIngredients = async (req, res, next) => {
    try {
        const all = await Ingredient.find({});
        return res.status(200).send(all);
    }catch(error) {
        next(error)
    }
};
