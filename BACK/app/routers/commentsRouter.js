const express = require('express');

const commentsController = require('../controllers/commentsController');
const handlerController = require('../controllers/handlerController');
const errorHandler = require('../utils/errorControl/errorHandler');
const userController = require( "../controllers/userController" );
const tokenCheck = require('../utils/middlewares/tokenCheck');

const router = express.Router();



router.get('/',
    handlerController(commentsController.getAll.bind(commentsController))
);

router.post('/',
    tokenCheck,
    handlerController(commentsController.create.bind(commentsController))
);


module.exports = router;
