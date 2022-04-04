/** Express router providing Users related routes
 * @module routers/Users
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
 * Users models
 * @const
 */
const models = require('../models/index.js');
const Users = models.Users;


const sequelize = models.sequelize; // sequelize functions and operations
const Op = models.Op; // sequelize query operators




/**
 * Route to list users records
 * @route {GET} /users/index/{fieldname}/{fieldvalue}
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
			let searchFields = Users.searchFields();
			where[Op.or] = searchFields;
			replacements.search = `%${search}%`;
		}
		
		
		query.raw = true;
		query.where = where;
		query.replacements = replacements;
		query.order = Users.getOrderBy(req);
		query.attributes = Users.listFields();
		let page = parseInt(req.query.page) || 1;
		let limit = parseInt(req.query.limit) || 20;
		let result = await Users.paginate(query, page, limit);
		return res.ok(result);
	}
	catch(err) {
		return res.serverError(err);
	}
});


/**
 * Route to view Users record
 * @route {GET} /users/view/{recid}
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
		query.attributes = Users.viewFields();
		let record = await Users.findOne(query);
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
 * Route to insert Users record
 * @route {POST} /users/add
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.post('/add/' , 
	[
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
		body('hid').optional(),
		body('test').optional(),
		body('test_t').optional(),
		body('testtt').optional(),
		body('testtttt').optional(),
	]
, async function (req, res) {
	try{
		let errors = validationResult(req); // get validation errors if any
		if (!errors.isEmpty()) {
			let errorMsg = utils.formatValidationError(errors.array());
			return res.badRequest(errorMsg);
		}
		let modeldata = req.body;
		
		//save Users record
		let record = await Users.create(modeldata);
		//await record.reload(); //reload the record from database
		let recid =  record['_id'];
		
		return res.ok(record);
	} catch(err){
		return res.serverError(err);
	}
});


/**
 * Route to get  Users record for edit
 * @route {GET} /users/edit/{recid}
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
		query.attributes = Users.editFields();
		let record = await Users.findOne(query);
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
 * Route to update  Users record
 * @route {POST} /users/edit/{recid}
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.post('/edit/:recid' , 
	[
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
		body('hid').optional(),
		body('test').optional(),
		body('test_t').optional(),
		body('testtt').optional(),
		body('testtttt').optional(),
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
		query.attributes = Users.editFields();
		let record = await Users.findOne(query);
		if(!record){
			return res.notFound();
		}
		await Users.update(modeldata, {where: where});
		return res.ok(modeldata);
	}
	catch(err){
		return res.serverError(err);
	}
});


/**
 * Route to delete Users record by table primary key
 * Multi delete supported by recid separated by comma(,)
 * @route {GET} /users/delete/{recid}
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
		let records = await Users.findAll(query);
		records.forEach(async (record) => { 
			//perform action on each record before delete
		});
		await Users.destroy(query);
		return res.ok(recid);
	}
	catch(err){
		return res.serverError(err);
	}
});
/**
 * Custom route
 * @param {callback} middleware - Express middleware.
 */
 router.post('/addpatient', async (req, res) => {  
    try{
        let response = {success: false, msg: 'Error Adding Patient.'};
        let modeldata = {
            initiatetreatment: req.body.initiatetreatment,
            initiateamount: req.body.initiateamount,
            age: req.body.age,
            approved: req.body.approved,
            reason: req.body.reason,
            date: req.body.date,
            doctor: req.body.doctor,
            patient_name: req.body.patient_name,
            email_id: req.body.email_id,
            contact: req.body.contact,
            hid: req.body.hid
        }; 
        let record = await Users.create(modeldata);
        //send payment link
        let axios = require("axios");
            let email = req.body.email;
            let fname = req.body.fname;
            let contact = req.body.contact;
            let amt=req.body.amt;
           var data = JSON.stringify({
               "name":fname,
               "contact":contact,
                "email":email,
                "amt": amt,
        });
            var configp = {
          method: 'post',
          url: 'https://bk2-gwli64osaq-el.a.run.app/payments/agentpay',
          headers: { 
            'Content-Type': 'application/json'
          },
          data : data
        };
      axios(configp)
        .then(function (response) {
          console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
          console.log(error);
        });
        //send payment link
        return res.ok(response);
    }
    catch(error){
        console.log(error)
    }
});
module.exports = router;
