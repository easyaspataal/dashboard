/** Express router providing Surgery related routes
 * @module routers/Surgery
 * @requires express
 * @requires config - app config
 * @requires utils - app utils functions
 * @requires express-validator - form validation module
 * @requires models- app model module
 */


 /**
 * express module
 * @const
 */
const express = require('express');


/**
 * Express router to mount user page functions.
 * @type {object}
 * @const
 */
const router = express.Router();


/**
 * App config module
 * @const
 */
const config = require('../config.js');


/**
 * App utils functions module
 * @const
 */
const utils = require('../helpers/utils.js');


/**
 * Form input validation module
 * @const
 */
const { body, validationResult } = require('express-validator');


/**
 * Surgery models
 * @const
 */
const models = require('../models/index.js');
const Surgery = models.Surgery;


const sequelize = models.sequelize; // sequelize functions and operations
const Op = models.Op; // sequelize query operators




/**
 * Route to list surgery records
 * @route {GET} /surgery/index/{fieldname}/{fieldvalue}
 * @param {array} path - Array of express paths
 * @param {callback} middleware - Express middleware.
 */
router.get(['/', '/index/:fieldname?/:fieldvalue?'], async (req, res) => {  
	try{
		let query = {};  // sequelize query object
		let where = {};  // sequelize where conditions
		let replacements = {};  // sequelize query params
		let fieldname = req.params.fieldname;
		let fieldvalue = req.params.fieldvalue;
		
		if (fieldname){
			where[Op.and] = [
				sequelize.literal(`(${fieldname} = :fieldvalue)`)
			];
			replacements.fieldvalue = fieldvalue;
		}
		let search = req.query.search;
		if(search){
			let searchFields = Surgery.searchFields();
			where[Op.or] = searchFields;
			replacements.search = `%${search}%`;
		}
		
		
		query.raw = true;
		query.where = where;
		query.replacements = replacements;
		query.order = Surgery.getOrderBy(req);
		query.attributes = Surgery.listFields();
		let page = parseInt(req.query.page) || 1;
		let limit = parseInt(req.query.limit) || 20;
		let result = await Surgery.paginate(query, page, limit);
		return res.ok(result);
	}
	catch(err) {
		return res.serverError(err);
	}
});
/**
 * Custom route
 * @param {callback} middleware - Express middleware.
 */
router.get('/diseaselist', async (req, res) => {  
    try{
        let tableModel = models.Surgery;
    let records = await tableModel.findAll();
        return res.ok(records);
    }
    catch(err) {
        return res.serverError(err);
    }
});
/**
 * Custom route
 * @param {callback} middleware - Express middleware.
 */
router.get('/fetchamnt', async (req, res) => {  
    try{
        let sqltext = "SELECT general FROM Surgery where surgery=:param1 and city=:param2";
        let queryParams = {
            param1: "Hysterectomy",
            param2: "METRO"
        }
        let records = await sequelize.query(sqltext, {replacements: queryParams, type: sequelize.QueryTypes.SELECT });
        return res.ok(records);
    }
    catch(err) {
        return res.serverError(err);
    }
});
/**
 * Custom route
 * @param {callback} middleware - Express middleware.
 */
 router.post('/fetchamntcopy', async (req, res) => {  
    try{
        console.log('text')
        console.log(req.body)
        let tableModel = models.Surgery;
        let where = {'surgery': req.body.surgery,'city':req.body.city};
    let record = await tableModel.findOne({where: where});
        return res.ok(record);
    }
    catch(err) {
        return res.serverError(err);
    }
});
module.exports = router;
