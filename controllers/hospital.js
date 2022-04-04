/** Express router providing Hospital related routes
 * @module routers/Hospital
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
 * Hospital models
 * @const
 */
const models = require('../models/index.js');
const Hospital = models.Hospital;


const sequelize = models.sequelize; // sequelize functions and operations
const Op = models.Op; // sequelize query operators




/**
 * Route to list hospital records
 * @route {GET} /hospital/index/{fieldname}/{fieldvalue}
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
			let searchFields = Hospital.searchFields();
			where[Op.or] = searchFields;
			replacements.search = `%${search}%`;
		}
		
		
		query.raw = true;
		query.where = where;
		query.replacements = replacements;
		query.order = Hospital.getOrderBy(req);
		query.attributes = Hospital.listFields();
		let page = parseInt(req.query.page) || 1;
		let limit = parseInt(req.query.limit) || 20;
		let result = await Hospital.paginate(query, page, limit);
		return res.ok(result);
	}
	catch(err) {
		return res.serverError(err);
	}
});


/**
 * Route to view Hospital record
 * @route {GET} /hospital/view/{recid}
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
		query.attributes = Hospital.viewFields();
		let record = await Hospital.findOne(query);
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
 * Route to insert Hospital record
 * @route {POST} /hospital/add
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.post('/add/' , 
	[
		body('hid').not().isEmpty(),
		body('email').not().isEmpty().isEmail(),
		body('password').not().isEmpty(),
		body('confirm_password', 'Passwords do not match').custom((value, {req}) => (value === req.body.password)),
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
		let hidCount = await Hospital.count({ where:{ 'hid': modeldata.hid } });
		if(hidCount > 0){
			return res.badRequest(`${modeldata.hid} already exist.`);
		}
		let emailCount = await Hospital.count({ where:{ 'email': modeldata.email } });
		if(emailCount > 0){
			return res.badRequest(`${modeldata.email} already exist.`);
		}
		
		//save Hospital record
		let record = await Hospital.create(modeldata);
		//await record.reload(); //reload the record from database
		let recid =  record['_id'];
		
		return res.ok(record);
	} catch(err){
		return res.serverError(err);
	}
});


/**
 * Route to get  Hospital record for edit
 * @route {GET} /hospital/edit/{recid}
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
		query.attributes = Hospital.editFields();
		let record = await Hospital.findOne(query);
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
 * Route to update  Hospital record
 * @route {POST} /hospital/edit/{recid}
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.post('/edit/:recid' , 
	[
		body('created_date').optional(),
		body('modified_date').optional(),
		body('hid').optional({nullable: true}).not().isEmpty(),
		body('name').optional(),
		body('payment_id').optional(),
		body('address').optional(),
		body('tagline').optional(),
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
		body('patients_per_day').optional(),
		body('emergency_service').optional(),
		body('medical_tourisum_accepted').optional(),
		body('status').optional(),
		body('url').optional(),
		body('poc').optional(),
		body('rooms').optional(),
		body('insurance').optional(),
		body('token').optional(),
		body('tpa').optional(),
		body('bank_details').optional(),
		body('hospital_logo').optional(),
		body('district').optional(),
		body('avg_patients').optional(),
		body('tv_installed').optional(),
		body('specialties').optional(),
		body('facilities').optional(),
		body('ayush').optional(),
		body('contact').optional(),
		body('pincode').optional(),
		body('icu_beds').optional(),
		body('_v').optional(),
		body('branches').optional(),
		body('beds').optional(),
		body('staff').optional(),
		body('ventilator_beds').optional(),
		body('doctors').optional(),
		body('rohini_id').optional(),
		body('logo').optional(),
		body('test').optional(),
		body('test1').optional(),
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
		let hidCount = await Hospital.count({where:{'hid': modeldata.hid, '_id': {[Op.ne]: recid} }});
		if(hidCount > 0){
			return res.badRequest(`${modeldata.hid} already exist.`);
		}
		let query = {};
		let where = {};
		where['_id'] = recid;
		query.raw = true;
		query.where = where;
		query.attributes = Hospital.editFields();
		let record = await Hospital.findOne(query);
		if(!record){
			return res.notFound();
		}
		await Hospital.update(modeldata, {where: where});
		return res.ok(modeldata);
	}
	catch(err){
		return res.serverError(err);
	}
});


/**
 * Route to delete Hospital record by table primary key
 * Multi delete supported by recid separated by comma(,)
 * @route {GET} /hospital/delete/{recid}
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
		let records = await Hospital.findAll(query);
		records.forEach(async (record) => { 
			//perform action on each record before delete
		});
		await Hospital.destroy(query);
		return res.ok(recid);
	}
	catch(err){
		return res.serverError(err);
	}
});
module.exports = router;
