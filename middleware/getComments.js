const {Comment} = require('../model');

module.exports.findComments = async(req, res, next) => {
    try {
        const {body: {comments} }= req;
        const comms = [];
        for (let i = 0; i < comments.length; i++) {
            const com = await Comment.findOne({
                name: comments[i]});
                comms.push(com['_id']);
        }
        console.log(comms);
        req.comments = comms;
        next();
    } catch(error) {
        next(error);
    }
}