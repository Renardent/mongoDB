const {Comment} = require('../model');

module.exports.createComment = async (req,res,next) => {
    try {
        const {body} = req;
        const com = await Comment.save(body);
        
        return res.status(200).send(com);
    } catch(error) {
        next(error);
    }
}

module.exports.getComment = async (req, res, next) => {
    try {
        const {params: {commentId}} = req;
        const com = await Comment.findById(commentId);
        return res.status(200).send(com);
    } catch(error) {
        next(error);
    }
};
