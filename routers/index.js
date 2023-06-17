const {Router} = require('express');
const saladRouter = require('./salad');
const ingredientRouter = require('./ingredient');
const commentRouter = require('./comment');
const userRouter = require('./user');

const router = Router();

router.use('/salads', saladRouter);
router.use('/ingredients', ingredientRouter);
router.use('/comments', commentRouter);
router.use('/users', userRouter);

module.exports = router;