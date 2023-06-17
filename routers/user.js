const {Router} = require('express');
const UserController = require('../controllers/User.controller');
const {findComments} = require('../middleware/getComments');

const userRouter = Router();

userRouter.get('/', UserController.getAllUsers);
userRouter.get('/:userId', UserController.getUser);
userRouter.post('/', findComments, UserController.createUser);

module.exports = userRouter;