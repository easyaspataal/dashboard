/** Express router providing Testing related routes
 * @module routers/Testing
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
 * Testing models
 * @const
 */
const models = require('../models/index.js');
const Testing = models.Testing;


const sequelize = models.sequelize; // sequelize functions and operations
const Op = models.Op; // sequelize query operators




/**
 * Route to list testing records
 * @route {GET} /testing/index/{fieldname}/{fieldvalue}
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
			let searchFields = Testing.searchFields();
			where[Op.or] = searchFields;
			replacements.search = `%${search}%`;
		}
		
		
		query.raw = true;
		query.where = where;
		query.replacements = replacements;
		query.order = Testing.getOrderBy(req);
		query.attributes = Testing.listFields();
		let page = parseInt(req.query.page) || 1;
		let limit = parseInt(req.query.limit) || 20;
		let result = await Testing.paginate(query, page, limit);
		return res.ok(result);
	}
	catch(err) {
		return res.serverError(err);
	}
});


/**
 * Route to view Testing record
 * @route {GET} /testing/view/{recid}
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
		query.attributes = Testing.viewFields();
		let record = await Testing.findOne(query);
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
 * Route to insert Testing record
 * @route {POST} /testing/add
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.post('/add/' , 
	[
		body('specialities').optional(),
		body('facilities').optional(),
		body('ayush').optional(),
		body('name').optional(),
		body('payment_id').optional(),
		body('contact').optional().isNumeric(),
		body('email').optional().isEmail(),
		body('address').optional(),
		body('tagline').optional(),
		body('pincode').optional().isNumeric(),
		body('city').optional(),
		body('ownership').optional(),
		body('type').optional(),
		body('accreditation').optional(),
		body('registration_no').optional(),
		body('about').optional(),
		body('state').optional(),
		body('website').optional(),
		body('latitude').optional(),
		body('longitude').optional(),
		body('insurance_accepted').optional(),
		body('branches').optional().isNumeric(),
		body('bed').optional().isNumeric(),
		body('doctors').optional(),
		body('staff').optional().isNumeric(),
		body('patients_per_day').optional().isNumeric(),
		body('emergency_service').optional(),
		body('icu_beds').optional().isNumeric(),
		body('ventilator_beds').optional().isNumeric(),
		body('medical_tourism').optional(),
		body('password').optional(),
		body('confirm_password', 'Passwords do not match').custom((value, {req}) => (value === req.body.password)),
		body('status').optional(),
		body('hid').optional(),
		body('url').optional(),
		body('created_date').optional(),
		body('modified_date').optional(),
		body('logo').optional(),
		body('poc').optional(),
		body('rooms').optional(),
		body('createdat').optional(),
		body('insurance').optional(),
		body('tokens').optional(),
		body('tpa').optional(),
		body('updatedat').optional(),
		body('bank_details').optional(),
		body('hospitallogo').optional(),
		body('district').optional(),
		body('avg_patients').optional().isNumeric(),
		body('tv_installed').optional(),
		body('test').optional(),
	]
, async function (req, res) {
	try{
		let errors = validationResult(req); // get validation errors if any
		if (!errors.isEmpty()) {
			let errorMsg = utils.formatValidationError(errors.array());
			return res.badRequest(errorMsg);
		}
		let modeldata = req.body;
		modeldata.password = utils.passwordHash(modeldata.password);
		
		//save Testing record
		let record = await Testing.create(modeldata);
		//await record.reload(); //reload the record from database
		let recid =  record['_id'];
		
		return res.ok(record);
	} catch(err){
		return res.serverError(err);
	}
});


/**
 * Route to get  Testing record for edit
 * @route {GET} /testing/edit/{recid}
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
		query.attributes = Testing.editFields();
		let record = await Testing.findOne(query);
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
 * Route to update  Testing record
 * @route {POST} /testing/edit/{recid}
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.post('/edit/:recid' , 
	[
		body('specialities').optional(),
		body('facilities').optional(),
		body('ayush').optional(),
		body('name').optional(),
		body('payment_id').optional(),
		body('contact').optional().isNumeric(),
		body('email').optional().isEmail(),
		body('address').optional(),
		body('tagline').optional(),
		body('pincode').optional().isNumeric(),
		body('city').optional(),
		body('ownership').optional(),
		body('type').optional(),
		body('accreditation').optional(),
		body('registration_no').optional(),
		body('about').optional(),
		body('state').optional(),
		body('website').optional(),
		body('latitude').optional(),
		body('longitude').optional(),
		body('insurance_accepted').optional(),
		body('branches').optional().isNumeric(),
		body('bed').optional().isNumeric(),
		body('doctors').optional(),
		body('staff').optional().isNumeric(),
		body('patients_per_day').optional().isNumeric(),
		body('emergency_service').optional(),
		body('icu_beds').optional().isNumeric(),
		body('ventilator_beds').optional().isNumeric(),
		body('medical_tourism').optional(),
		body('status').optional(),
		body('hid').optional(),
		body('url').optional(),
		body('created_date').optional(),
		body('modified_date').optional(),
		body('logo').optional(),
		body('poc').optional(),
		body('rooms').optional(),
		body('createdat').optional(),
		body('insurance').optional(),
		body('tokens').optional(),
		body('tpa').optional(),
		body('updatedat').optional(),
		body('bank_details').optional(),
		body('hospitallogo').optional(),
		body('district').optional(),
		body('avg_patients').optional().isNumeric(),
		body('tv_installed').optional(),
		body('test').optional(),
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
		query.attributes = Testing.editFields();
		let record = await Testing.findOne(query);
		if(!record){
			return res.notFound();
		}
		await Testing.update(modeldata, {where: where});
		return res.ok(modeldata);
	}
	catch(err){
		return res.serverError(err);
	}
});


/**
 * Route to delete Testing record by table primary key
 * Multi delete supported by recid separated by comma(,)
 * @route {GET} /testing/delete/{recid}
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
		let records = await Testing.findAll(query);
		records.forEach(async (record) => { 
			//perform action on each record before delete
		});
		await Testing.destroy(query);
		return res.ok(recid);
	}
	catch(err){
		return res.serverError(err);
	}
});
module.exports = router;
