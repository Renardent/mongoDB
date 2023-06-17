const {User} = require('../model');

module.exports.createUser = async (req, res, next) =>{
    try{
        const {body, comments } = req;
        const user = await User.create({...body, comments});
        return res.status(201).send(user);
    } catch(error) {
        next(error);
    }
};

module.exports.getUser = async (req, res, next) => {
    try {
        const {params: {userId}} = req;
        const user = await User.findById(userId)
                .populate('comments');
        return res.status(200).send(user);
    } catch(error) {
        next(error);
    }
};

module.exports.getAllUsers = async (req, res,next) => {
    try {
        const users = await User.find({})
            .populate('comments');
    return res.status(200).send(users);
    }catch(error) {
        next(error)
    }
};