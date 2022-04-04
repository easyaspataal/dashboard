
const BaseModel = require("./basemodel");
class Users extends BaseModel {
	static init(sequelize, Sequelize) {
		return super.init(
			{
				
				_id: { type: Sequelize.INTEGER, primaryKey: true , autoIncrement: true },
				initiatetreatment: {name: 'initiatetreatment', type:Sequelize.STRING},
				initiateamount: {name: 'initiateamount', type:Sequelize.STRING},
				age: {name: 'age', type:Sequelize.STRING},
				approved: {name: 'approved', type:Sequelize.STRING},
				reason: {name: 'reason', type:Sequelize.STRING},
				date: {name: 'date', type:Sequelize.STRING},
				doctor: {name: 'doctor', type:Sequelize.STRING},
				patient_name: {name: 'patient_name', type:Sequelize.STRING},
				email_id: {name: 'email_id', type:Sequelize.STRING},
				contact: {name: 'contact', type:Sequelize.STRING},
				hid: {name: 'hid', type:Sequelize.STRING},
				test: {name: 'test', type:Sequelize.STRING},
				test_t: {name: 'test_t', type:Sequelize.STRING},
				testtt: {name: 'testtt', type:Sequelize.STRING},
				testtttt: {name: 'testtttt', type:Sequelize.STRING}
			}, 
			{ 
				sequelize,
				schema: "public", 
				tableName: "users",
				modelName: "users",
			}
		);
	}
	
	static listFields() {
		let sequelize = this.sequelize;
		return [
			'_id', 
			'initiatetreatment', 
			'initiateamount', 
			'age', 
			'approved', 
			'reason', 
			'date', 
			'doctor', 
			'patient_name', 
			'email_id', 
			'contact', 
			'hid', 
			'test', 
			'test_t', 
			'testtt', 
			'testtttt'
		];
	}

	static exportListFields() {
		let sequelize = this.sequelize;
		return [
			'_id', 
			'initiatetreatment', 
			'initiateamount', 
			'age', 
			'approved', 
			'reason', 
			'date', 
			'doctor', 
			'patient_name', 
			'email_id', 
			'contact', 
			'hid', 
			'test', 
			'test_t', 
			'testtt', 
			'testtttt'
		];
	}

	static viewFields() {
		let sequelize = this.sequelize;
		return [
			'_id', 
			'initiatetreatment', 
			'initiateamount', 
			'age', 
			'approved', 
			'reason', 
			'date', 
			'doctor', 
			'patient_name', 
			'email_id', 
			'contact', 
			'hid', 
			'test', 
			'test_t', 
			'testtt', 
			'testtttt'
		];
	}

	static exportViewFields() {
		let sequelize = this.sequelize;
		return [
			'_id', 
			'initiatetreatment', 
			'initiateamount', 
			'age', 
			'approved', 
			'reason', 
			'date', 
			'doctor', 
			'patient_name', 
			'email_id', 
			'contact', 
			'hid', 
			'test', 
			'test_t', 
			'testtt', 
			'testtttt'
		];
	}

	static editFields() {
		let sequelize = this.sequelize;
		return [
			'_id', 
			'initiatetreatment', 
			'initiateamount', 
			'age', 
			'approved', 
			'reason', 
			'date', 
			'doctor', 
			'patient_name', 
			'email_id', 
			'contact', 
			'hid', 
			'test', 
			'test_t', 
			'testtt', 
			'testtttt'
		];
	}

	
	static searchFields(){
		let sequelize = this.sequelize;
		return [
			sequelize.literal("initiatetreatment iLIKE :search"), 
			sequelize.literal("initiateamount iLIKE :search"), 
			sequelize.literal("age iLIKE :search"), 
			sequelize.literal("approved iLIKE :search"), 
			sequelize.literal("reason iLIKE :search"), 
			sequelize.literal("doctor iLIKE :search"), 
			sequelize.literal("patient_name iLIKE :search"), 
			sequelize.literal("contact iLIKE :search"), 
			sequelize.literal("hid iLIKE :search"),
		];
	}

	
	
}
module.exports = Users;
