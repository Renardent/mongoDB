const {Salad} = require('../model');

module.exports.createSalad = async (req, res, next) =>{
    try{
        const {body, ingredients } = req;
        const salad = await Salad.create({...body, ingredients});
        return res.status(201).send(salad);
    } catch(error) {
        next(error);
    }
};

module.exports.getSalad = async (req, res, next) => {
    try {
        const {params: {saladId}} = req;
        const salad = await Salad.findById(saladId)
                .populate('ingredients');
        return res.status(200).send(salad);
    } catch(error) {
        next(error);
    }
};

module.exports.getAllSalads = async (req, res,next) => {
    try {
        const salad = await Salad.find({})
            .populate('ingredients');
    return res.status(200).send(salad);
    }catch(error) {
        next(error)
    }
};

module.exports.updateSalad = async (req, res,next) => {
    try {
        const {body, params: {saladId}} = req;
        const update = await Salad.findByIdAndUpdate(saladId, body, {returnDocument: 'after'});
        if(!update) {
            return res.status(400).send('Incorrected');
        }
        res.status(200).send(update);
    }catch(error) {
        next(error)
    }
};

module.exports.deleteSalad = async (req, res,next) => {
    try {
        const {params: {saladId}} = req;
        const deleted = await Salad.findByIdAndDelete(saladId);
        if(!deleted) {
            return res.status(400).send('Or was deleted or something incorrect');
        }
        res.status(200).send(deleted);
    }catch(error) {
        next(error)
    }
};