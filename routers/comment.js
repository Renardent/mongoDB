const {Router} = require('express');
const CommentController = require('../controllers/Comment.controller');

const commentRouter = Router();

commentRouter.get('/:commentId', CommentController.getComment);
commentRouter.post('/', CommentController.createComment);


module.exports = commentRouter;