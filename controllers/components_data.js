/** Express router providing related routes to page component data
 * @module routers/components_data
 * @requires express
 * @requires config - app config
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
 *  models
 * @const
 */
const models = require('../models/index.js');
const utils = require('../helpers/utils.js');


const sequelize = models.sequelize;
const Op = models.Op; // sequelize query operators


 /**
 * Route to check if field value already exist in a Hospital table
 * @route {GET} /components_data/hospital_hid_exist/{fieldvalue}
 * @param {string} path - Express paths
 * @param {callback} middleware - Express middleware.
 */
router.get('/hospital_hid_exist/:fieldvalue', async (req, res) => {
	try{
		let val = req.params.fieldvalue
		let count = await models.Hospital.count({ where:{ 'hid': val } });
		if(count > 0){
			return res.ok("true");
		}
		return res.ok("false");
	}
	catch(err){
		return res.serverError(err);
	}
});


 /**
 * Route to check if field value already exist in a Hospital table
 * @route {GET} /components_data/hospital_email_exist/{fieldvalue}
 * @param {string} path - Express paths
 * @param {callback} middleware - Express middleware.
 */
router.get('/hospital_email_exist/:fieldvalue', async (req, res) => {
	try{
		let val = req.params.fieldvalue
		let count = await models.Hospital.count({ where:{ 'email': val } });
		if(count > 0){
			return res.ok("true");
		}
		return res.ok("false");
	}
	catch(err){
		return res.serverError(err);
	}
});
/**
 * Custom route
 * @param {callback} middleware - Express middleware.
 */
 router.post('/custom_endpoint', async (req, res) => {  
    try{
        let axios = require("axios");
        let email = req.body.email_id; //prayag@easyaspataal.com
        let url = "https://bk2-gwli64osaq-el.a.run.app/hospital/dasboardjiralist?reporterId="+email;
        let response = await axios.get(url);
        console.log(response.data);
        return res.ok(response.data);
    }
    catch(error){
        console.log(error)
    }
});
/**
 * Custom route
 * @param {callback} middleware - Express middleware.
 */
 router.post('/leaddetail', async (req, res) => {  
    try{
        let axios = require("axios");
        let email = req.body.email_id;
       let claim = req.body.claim_no 
       let url = "https://bk2-gwli64osaq-el.a.run.app/hospital/viewreporterlist?claimNo="+claim;
        let response = await axios.get(url);
        console.log(response.data);
        return res.ok(response.data);
    }
    catch(error){
        console.log(error)
    }
});/**
 * Custom route
 * @param {callback} middleware - Express middleware.
 */
 router.post('/comment', async (req, res) => {  
    try{
        let axios = require("axios");
        console.log('test')
        console.log(req.body)
        var data = JSON.stringify({
            "body": req.body.comment
});
var config = {
  method: 'post',
  url: 'https://easylos.atlassian.net/rest/api/2/issue/CLAIM-3762/comment',
  headers: { 
    'Authorization': 'Basic Y2hpcmFnQGVhc3lhc3BhdGFhbC5jb206RngzaHZOeXpzWmRQZjRNcmtzN0s5RUUw', 
    'Content-Type': 'application/json'
  },
  data : data
};
axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});
    }
    catch(error){
        console.log(error)
    }
});/**
 * Custom route
 * @param {callback} middleware - Express middleware.
 */
 router.post('/createissue', async (req, res) => {  
    try{
        let axios = require("axios");
var data = JSON.stringify({
  "fields": {
    "project": {
      "key": "CLAIM"
    },
    "summary": "LOAN REQUEST",
    "description": "Patient Name:" + req.body.name +
    "Contact:" + req.body.contact +
    "Email Id:" + req.body.email +
    "Age:" + req.body.age +
    "Loan Amount:" + req.body.amount +
    "Loan required:" + req.body.reason +
    "Insurance Approved Amount:" + req.body.approved +
    "Date:" + req.body.date +
    "Doctor Name:" + req.body.doctor,
    "issuetype": {
      "name": "Service Request"
    }
  }
});
var config = {
  method: 'post',
  url: 'https://easylos.atlassian.net/rest/api/2/issue/',
  headers: { 
    'Authorization': 'Basic Y2hpcmFnQGVhc3lhc3BhdGFhbC5jb206RngzaHZOeXpzWmRQZjRNcmtzN0s5RUUw', 
    'Content-Type': 'application/json', 
    'Cookie': 'atlassian.xsrf.token=2320118d-6d73-4369-addd-eae328a4f16c_d8a942fe101fb24f812bf389468d459b73e7c490_lin'
  },
  data : data
};
axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});
    }
    catch(error){
        console.log(error)
    }
});
/**
 * Custom route
 * @param {callback} middleware - Express middleware.
 */
router.get('/revenuelist', async (req, res) => {  
    try{
        let reporterId = req.body.email_id   
        console.log(req.body)
var config = {
  method: 'get',
  url: 'http://easylos.atlassian.net/rest/api/2/search?jql=reporter='+req.body.email_id,
  headers: { 
    'Authorization': 'Basic Y2hpcmFnQGVhc3lhc3BhdGFhbC5jb206RngzaHZOeXpzWmRQZjRNcmtzN0s5RUUw'
  }
};
axios(config)
.then(function (response) {
    var patientarr = [];
    var amountarr = [];
    var datearr = [];
    var keyarr = [];
    response.data.issues.map((issue, index) => {
 const patientresult = issue.fields.customfield_10040
patientarr.push(patientresult)
const amountresult = issue.fields.customfield_10089
amountarr.push(amountresult)
const dateresult = issue.fields.customfield_10090
datearr.push(dateresult)
 const keyresult = issue.key;
 keyarr.push(keyresult)
    })
var items = keyarr.map((keyarr, index) => {
    return {
      key: keyarr,
      patient: patientarr[index], 
      amount : amountarr[index],
      date: datearr[index]
    }
  });
    const result = {
    code: 200,
    status: true,
    message:items
}
res.json(result);
})
.catch(function (error) {
  console.log(error);
});
    }
    catch(err) {
        return res.serverError(err);
    }
});
/**
 * Custom route
 * @param {callback} middleware - Express middleware.
 */
 router.post('/attachment', async (req, res) => {  
    try{
       var axios = require('axios');
       console.log(req.body)
var config = {
    method: 'post',
    url: 'http://localhost:8080/hospital/attachment?file='+req.body.attachment,
  headers: { 
    'Content-Type': 'text/plain'
  },
};
axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});
    }
    catch(err) {
        return res.serverError(err);
    }
});
module.exports = router;
