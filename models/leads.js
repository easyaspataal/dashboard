
const BaseModel = require("./basemodel");
class Leads extends BaseModel {
	static init(sequelize, Sequelize) {
		return super.init(
			{
				
				_id: { type: Sequelize.STRING, primaryKey: true  },
				initiatetreatment: {name: 'initiatetreatment', type:Sequelize.STRING},
				initiateamount: {name: 'initiateamount', type:Sequelize.STRING},
				age: {name: 'age', type:Sequelize.STRING},
				approved: {name: 'approved', type:Sequelize.STRING},
				reason: {name: 'reason', type:Sequelize.STRING},
				date: {name: 'date', type:Sequelize.STRING},
				doctor: {name: 'doctor', type:Sequelize.STRING},
				patient_name: {name: 'patient_name', type:Sequelize.STRING},
				email_id: {name: 'email_id', type:Sequelize.STRING},
				contact: {name: 'contact', type:Sequelize.STRING}
			}, 
			{ 
				sequelize,
				schema: "public", 
				tableName: "leads",
				modelName: "leads",
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
			'contact'
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
			'contact'
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
			'contact'
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
			'contact'
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
			'contact'
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
		];
	}

	
	
}
module.exports = Leads;
