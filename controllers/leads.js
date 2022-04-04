/** Express router providing Leads related routes
 * @module routers/Leads
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
 * Leads models
 * @const
 */
const models = require('../models/index.js');
const Leads = models.Leads;


const sequelize = models.sequelize; // sequelize functions and operations
const Op = models.Op; // sequelize query operators




/**
 * Route to list leads records
 * @route {GET} /leads/index/{fieldname}/{fieldvalue}
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
			let searchFields = Leads.searchFields();
			where[Op.or] = searchFields;
			replacements.search = `%${search}%`;
		}
		
		
		query.raw = true;
		query.where = where;
		query.replacements = replacements;
		query.order = Leads.getOrderBy(req);
		query.attributes = Leads.listFields();
		let page = parseInt(req.query.page) || 1;
		let limit = parseInt(req.query.limit) || 20;
		let result = await Leads.paginate(query, page, limit);
		return res.ok(result);
	}
	catch(err) {
		return res.serverError(err);
	}
});


/**
 * Route to view Leads record
 * @route {GET} /leads/view/{recid}
 * @param {array} path - Array of express paths
 * @param {callback} middleware - Express middleware.
 */
router.get(['/view/:recid'], async (req, res) => {
	try{
		let recid = req.params.recid || null;
		let query = {}
		let where = {}
		where['_id'] = recid;
		query.raw = true;
		query.where = where;
		query.attributes = Leads.viewFields();
		let record = await Leads.findOne(query);
		if(!record){
			return res.notFound();
		}
		return res.ok(record);
	}
	catch(err){
		return res.serverError(err);
	}
});


/**
 * Route to insert Leads record
 * @route {POST} /leads/add
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.post('/add/' , 
	[
		body('_id').not().isEmpty().isNumeric(),
		body('initiatetreatment').optional(),
		body('initiateamount').optional(),
		body('age').optional(),
		body('approved').optional(),
		body('reason').optional(),
		body('date').optional(),
		body('doctor').optional(),
		body('patient_name').optional(),
		body('email_id').optional().isEmail(),
		body('contact').optional(),
	]
, async function (req, res) {
	try{
		let errors = validationResult(req); // get validation errors if any
		if (!errors.isEmpty()) {
			let errorMsg = utils.formatValidationError(errors.array());
			return res.badRequest(errorMsg);
		}
		let modeldata = req.body;
		
		//save Leads record
		let record = await Leads.create(modeldata);
		//await record.reload(); //reload the record from database
		let recid =  record['_id'];
		
		return res.ok(record);
	} catch(err){
		return res.serverError(err);
	}
});


/**
 * Route to get  Leads record for edit
 * @route {GET} /leads/edit/{recid}
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.get('/edit/:recid', async (req, res) => {
	try{
		let recid = req.params.recid;
		let query = {};
		let where = {};
		where['_id'] = recid;
		query.raw = true;
		query.where = where;
		query.attributes = Leads.editFields();
		let record = await Leads.findOne(query);
		if(!record){
			return res.notFound();
		}
		return res.ok(record);
	}
	catch(err){
		return res.serverError(err);
	}
});


/**
 * Route to update  Leads record
 * @route {POST} /leads/edit/{recid}
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.post('/edit/:recid' , 
	[
		body('_id').optional({nullable: true}).not().isEmpty().isNumeric(),
		body('initiatetreatment').optional(),
		body('initiateamount').optional(),
		body('age').optional(),
		body('approved').optional(),
		body('reason').optional(),
		body('date').optional(),
		body('doctor').optional(),
		body('patient_name').optional(),
		body('email_id').optional().isEmail(),
		body('contact').optional(),
	]
, async (req, res) => {
	try{
		let errors = validationResult(req); // get validation errors if any
		if (!errors.isEmpty()) {
			let errorMsg = utils.formatValidationError(errors.array());
			return res.badRequest(errorMsg);
		}
		let recid = req.params.recid;
		let modeldata = req.body;
		let query = {};
		let where = {};
		where['_id'] = recid;
		query.raw = true;
		query.where = where;
		query.attributes = Leads.editFields();
		let record = await Leads.findOne(query);
		if(!record){
			return res.notFound();
		}
		await Leads.update(modeldata, {where: where});
		return res.ok(modeldata);
	}
	catch(err){
		return res.serverError(err);
	}
});


/**
 * Route to delete Leads record by table primary key
 * Multi delete supported by recid separated by comma(,)
 * @route {GET} /leads/delete/{recid}
 * @param {array} path - Array of express paths
 * @param {callback} middleware - Express middleware.
 */
router.get('/delete/:recid', async (req, res) => {
	try{
		let recid = req.params.recid || '';
		recid = recid.split(',');
		let query = {};
		let where = {};
		where['_id'] = recid;
		query.raw = true;
		query.where = where;
		let records = await Leads.findAll(query);
		records.forEach(async (record) => { 
			//perform action on each record before delete
		});
		await Leads.destroy(query);
		return res.ok(recid);
	}
	catch(err){
		return res.serverError(err);
	}
});
module.exports = router;
