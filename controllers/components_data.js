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
 * Route to get home_data_component records
 * @route {GET} /components_data/home_data_component
 * @param {string} path - Express paths
 * @param {callback} middleware - Express middleware.
 */
router.get('/home_data_component', async (req, res) => {
	try{
		let sqltext = `SELECT sum(initiateamount) as initiateamount FROM users WHERE hid=:HID
` ;
		let queryParams = {};
queryParams['HID'] = req.user.hid;
		let records = await sequelize.query(sqltext, {replacements: queryParams, type: sequelize.QueryTypes.SELECT });
		return res.ok(records);
	}
	catch(err){
		console.error(err)
		return res.serverError(err);
	}
});


 /**
 * Route to get home_data_component_2 records
 * @route {GET} /components_data/home_data_component_2
 * @param {string} path - Express paths
 * @param {callback} middleware - Express middleware.
 */
router.get('/home_data_component_2', async (req, res) => {
	try{
		let sqltext = `SELECT (SELECT COUNT(*) AS num FROM users WHERE hid = :HID) as totalpatient` ;
		let queryParams = {};
queryParams['HID'] = req.user.hid;
		let records = await sequelize.query(sqltext, {replacements: queryParams, type: sequelize.QueryTypes.SELECT });
		return res.ok(records);
	}
	catch(err){
		console.error(err)
		return res.serverError(err);
	}
});


 /**
 * Route to get home_data_component_3 records
 * @route {GET} /components_data/home_data_component_3
 * @param {string} path - Express paths
 * @param {callback} middleware - Express middleware.
 */
router.get('/home_data_component_3', async (req, res) => {
	try{
		let sqltext = `SELECT (SELECT  COUNT(*) FROM users WHERE hid=:HID AND created_date > now() - interval '1' day) as newpatient` ;
		let queryParams = {};
queryParams['HID'] = req.user.hid;
		let records = await sequelize.query(sqltext, {replacements: queryParams, type: sequelize.QueryTypes.SELECT });
		return res.ok(records);
	}
	catch(err){
		console.error(err)
		return res.serverError(err);
	}
});


 /**
 * Route to get barchart_revenue records
 * @route {GET} /components_data/barchart_revenue
 * @param {string} path - Express paths
 * @param {callback} middleware - Express middleware.
 */
router.get('/barchart_revenue',  async (req, res) => {
	let chartData = { labels:[], datasets:[] };
	try{
		let sqltext = `SELECT sum(initiateamount) as initiateamount, TO_CHAR(created_date, 'Month') AS month, EXTRACT(YEAR FROM created_date) AS year FROM users WHERE hid=:HID group by year, month order by TO_CHAR(created_date, 'Month')` ;
		let queryParams = {};
queryParams['HID'] = req.user.hid;
		let records = await sequelize.query(sqltext, {replacements: queryParams, type: sequelize.QueryTypes.SELECT });
		chartData['labels'] = records.map(function(v){ return v.month });
		let dataset1 = {
			data: records.map(function(v){ return parseFloat(v.initiateamount) }),
			label: "Amount",
			backgroundColor: "#0077b5", 
			borderColor: "#0077b5", 
			borderWidth: "",
		};
		chartData.datasets.push(dataset1);
		return res.ok(chartData) ;
	}
	catch(err) {
		return res.serverError(err);
	}
});


 /**
 * Route to get test_data_component records
 * @route {GET} /components_data/test_data_component
 * @param {string} path - Express paths
 * @param {callback} middleware - Express middleware.
 */
router.get('/test_data_component', async (req, res) => {
	try{
		let sqltext = `` ;
		let records = await sequelize.query(sqltext, { type: sequelize.QueryTypes.SELECT });
		return res.ok(records);
	}
	catch(err){
		console.error(err)
		return res.serverError(err);
	}
});


 /**
 * Route to get test1_data_component records
 * @route {GET} /components_data/test1_data_component
 * @param {string} path - Express paths
 * @param {callback} middleware - Express middleware.
 */
router.get('/test1_data_component', async (req, res) => {
	try{
		let sqltext = `SELECT (SELECT COUNT(*) AS num FROM users WHERE hid = :HID) as totalpatient, (SELECT COUNT(*) AS num FROM users where status='New' AND hid = :HID2) as newpatient` ;
		let queryParams = {};
queryParams['HID'] = req.hospital.hid;
queryParams['HID2'] = req.hospital.hid;
		let records = await sequelize.query(sqltext, {replacements: queryParams, type: sequelize.QueryTypes.SELECT });
		return res.ok(records);
	}
	catch(err){
		console.error(err)
		return res.serverError(err);
	}
});


 /**
 * Route to get ttt_data_component records
 * @route {GET} /components_data/ttt_data_component
 * @param {string} path - Express paths
 * @param {callback} middleware - Express middleware.
 */
router.get('/ttt_data_component', async (req, res) => {
	try{
		let sqltext = `SELECT  * FROM users WHERE created_date >= NOW() - '1 day'::INTERVAL` ;
		let records = await sequelize.query(sqltext, { type: sequelize.QueryTypes.SELECT });
		return res.ok(records);
	}
	catch(err){
		console.error(err)
		return res.serverError(err);
	}
});


 /**
 * Route to get patient_list_data_repeater records
 * @route {GET} /components_data/patient_list_data_repeater
 * @param {string} path - Express paths
 * @param {callback} middleware - Express middleware.
 */
router.get('/patient_list_data_repeater', async (req, res) => {
	try{
		let sqltext = `SELECT initiatetreatment as initiatetreatment, initiateamount as initiateamount, email_id as email_id, contact as contact,patient_name as patient_name, _id as _id FROM users  WHERE  hid=:HID ORDER BY created_date DESC` ;
		let queryParams = {};
		queryParams['HID'] = req.user.hid;
		let records = await sequelize.query(sqltext, {replacements: queryParams, type: sequelize.QueryTypes.SELECT });
		return res.ok(records);
	}
	catch(err){
		console.error(err)
		return res.serverError(err);
	}
});


 /**
 * Route to get doughnutchart_revenue records
 * @route {GET} /components_data/doughnutchart_revenue
 * @param {string} path - Express paths
 * @param {callback} middleware - Express middleware.
 */
router.get('/doughnutchart_revenue',  async (req, res) => {
	let chartData = { labels:[], datasets:[] };
	try{
		let sqltext = `SELECT initiateamount as initiateamount FROM users WHERE hid='HS100009'` ;
		let records = await sequelize.query(sqltext, { type: sequelize.QueryTypes.SELECT });
		chartData['labels'] = records.map(function(v){ return v.initiateamount });
		let dataset1 = {
			data: records.map(function(v){ return parseFloat(v.initiateamount) }),
			label: "Amount",
			backgroundColor: utils.randomColor(), 
			borderColor: utils.randomColor(), 
			borderWidth: "",
		};
		chartData.datasets.push(dataset1);
		return res.ok(chartData) ;
	}
	catch(err) {
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
        let url = "https://bk2-7k5qcren2q-el.a.run.app/hospital/dasboardjiralist?reporterId="+email;
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
       let url = "https://bk2-7k5qcren2q-el.a.run.app/hospital/viewreporterlist?claimNo="+claim;
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
  url: 'https://easylos.atlassian.net/rest/api/2/issue/'+req.body.claim+'/comment',
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
       var data = JSON.stringify({
           "result": req.body.attachment
});
var config = {
    method: 'post',
    url: 'http://localhost:8080/hospital/attachment?attachment='+req.body.attachment+'&name='+req.body.name+'&claim='+req.body.claim,
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
    catch(err) {
        return res.serverError(err);
    }
});
 router.post('/cibil', async (req, res) => {  
    try{
        let axios = require("axios");
       let url = 'https://bk2-7k5qcren2q-el.a.run.app/admin/getequifax?name='+req.body.name+'&address='+req.body.address+'&state='+req.body.state+'&pin='+req.body.pin+'&contact='+req.body.contact+'&email='+req.body.email+'&pan='+req.body.pan+'&dob='+req.body.dob;
        let response = await axios.get(url);
        return res.ok(response.data);
    }
    catch(error){
        console.log(error)
    }
});
 router.post('/otpmail', async (req, res) => {  
    try{
        let axios = require("axios");
        console.log(req.body)
        let email = req.body.email_id; //prayag@easyaspataal.com
        let url = "https://bk2-7k5qcren2q-el.a.run.app/admin/emailotp?email="+req.body.email_id
        let response = await axios.post(url);
        console.log(response.data);
        return res.ok(response.data);
    }
    catch(error){
        console.log(error)
    }
});router.post('/collection', async (req, res) => {
    try{
        let axios = require("axios");
        console.log(req.body.start);
var config = {
  method: 'get',
  url: 'http://easylos.atlassian.net/rest/api/2/search?jql=status!="Ignore%20Mails"&reporter='+`'${req.body.email}'`+'&maxResults=100',
  headers: {
    'Authorization': 'Basic Y2hpcmFnQGVhc3lhc3BhdGFhbC5jb206RngzaHZOeXpzWmRQZjRNcmtzN0s5RUUw'
  }
};
axios(config)
.then(function (response) {
    var amountarr = [];
    var datearr = [];
    var keyarr = [];
    var statusarr = [];
    var summarray = [];
   var todayDate = new Date().toISOString().slice(0, 10); 
    response.data.issues.map((issue, index) => {
  if(issue.fields.customfield_10182 != null && issue.fields.customfield_10182 > 0){
  amountarr.push(issue.fields.customfield_10182);
  summarray.push(issue.fields.customfield_10182)
  }else{
     amountarr.push(0);  
  }
if(issue.fields.customfield_10055 != null){
    var dateresult = +todayDate.replace('-', '').replace('-', '') - +issue.fields.customfield_10055.replace('-', '').replace('-', '')  
  }else {
  var dateresult = issue.fields.customfield_10055  
  }
datearr.push(dateresult)
 const keyresult = issue.key;
 keyarr.push(keyresult)
 if(issue.fields.customfield_10382 == null){
     statusarr.push('Not Updated') 
     }else{
        statusarr.push(issue.fields.customfield_10382.value) 
     }
    })
 let sum = 0;
    for(let i = 0; i<summarray.length; i++){
      sum+=summarray[i];
    }
var items = keyarr.map((keyarr, index) => {
    return { 
      key: keyarr,
      status: statusarr[index],
      amount : amountarr[index],
      date: datearr[index],
    }
  });
    const result = {
    code: 200,
    status: true,
    message:items,
    sumresult: sum
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
});router.post('/createcalcissue', async (req, res) => {  
    try{
        let axios = require("axios");
var data = JSON.stringify({
  "fields": {
  "customfield_10448":req.body.reporter,
  "customfield_10041":req.body.name,
  "customfield_10107":req.body.contact,
  "customfield_10185":req.body.email,
  "customfield_10231":req.body.pin,
  "customfield_10057":req.body.pan,
  "customfield_10103":req.body.dob,
  "customfield_10182":req.body.paylater,
    "project": {
      "key": "CLAIM"
    },
  "summary": req.body.hospitalname + " Lead",
    "issuetype": {
    "name": "Task"
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
});router.post('/calendar', async (req, res) => {
    try{
        let axios = require("axios");
        console.log(req.body);
var config = {
  method: 'get',
  url: 'http://easylos.atlassian.net/rest/api/2/search?jql="Disbursement%20Date%5BDate%5D"%20>%3D%20"'+req.body.from+'"%20AND%20"Disbursement%20Date%5BDate%5D"%20<%3D%20'+req.body.to+'%20order%20by%20created%20DESC&status!="Ignore%20Mails"&reporter='+`'${req.body.email}'`+'&maxResults=100',
  headers: {
    'Authorization': 'Basic Y2hpcmFnQGVhc3lhc3BhdGFhbC5jb206RngzaHZOeXpzWmRQZjRNcmtzN0s5RUUw'
  }
};
axios(config)
.then(function (response) {
    var amountarr = [];
    var datearr = [];
    var keyarr = [];
    var patientarr = [];
    response.data.issues.map((issue, index) => {
        const amountresult = issue.fields.customfield_10182;
        amountarr.push(amountresult)
        const dateresult = issue.fields.customfield_10090;
        datearr.push(dateresult)
        const patientresult = issue.fields.customfield_10040;
        patientarr.push(patientresult)
 const keyresult = issue.key;
 keyarr.push(keyresult)
})
var items = keyarr.map((keyarr, index) => {
    return { 
      key: keyarr,
      amount : amountarr[index],
      date: datearr[index],
      patient: patientarr[index]
    }
  });
    const result = {
    code: 200,
    status: true,
    message:items,
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
module.exports = router;
