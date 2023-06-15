const {Salad} = require('../model/index');

module.exports.createSalad = async (req, res, next) => {
    try {
        const {body} = req;
        const salad = await Salad.create({body});
        res.send(salad);
    } catch (error) {
        next(error);
    }
};

module.exports.getSalad = () => {

};

module.exports.getAllSalads = () => {

};

module.exports.putSalad = () => {

};

module.exports.deleteSalad = () => {

};