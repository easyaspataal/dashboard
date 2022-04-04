
/** Express router providing related routes to page component data
 * @module routers/components_data
 * @requires express
 * @requires config - app config
 * @requires models- app model module
 */
//2lines
 /**
 * express module
 * @const
 */
const express = require('express');
//2lines
/**
 * Express router to mount user page functions.
 * @type {object}
 * @const
 */
const router = express.Router();
//2lines
/**
 * App config module
 * @const
 */
const config = require('../config.js');
//2lines
/**
 *  models
 * @const
 */
const models = require('../models/index.js');

//2lines
const sequelize = models.sequelize;
const Op = models.Op; // sequelize query operators


const utils = require('../helpers/utils.js');

router.get('/index', function (req, res)
{
    //res.render('home/index');
});



module.exports = router;
