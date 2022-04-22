
const BaseModel = require("./basemodel");
class Patient extends BaseModel {
	static init(sequelize, Sequelize) {
		return super.init(
			{
				
				_id: { type: Sequelize.STRING, primaryKey: true  },
				created_date: {name: 'created_date', type:Sequelize.DATE},
				modified_date: {name: 'modified_date', type:Sequelize.DATE},
				hid: {name: 'hid', type:Sequelize.STRING},
				patient_name: {name: 'patient_name', type:Sequelize.STRING},
				email: {name: 'email', type:Sequelize.STRING},
				pan: {name: 'pan', type:Sequelize.STRING},
				contact: {name: 'contact', type:Sequelize.STRING},
				aadhar: {name: 'aadhar', type:Sequelize.STRING},
				date: {name: 'date', type:Sequelize.STRING},
				document: {name: 'document', type:Sequelize.STRING},
				estimated_amount: {name: 'estimated_amount', type:Sequelize.STRING}
			}, 
			{ 
				sequelize,
				schema: "public", 
				tableName: "Patient",
				modelName: "Patient",
			}
		);
	}
	
	static listFields() {
		let sequelize = this.sequelize;
		return [
			'_id', 
			'created_date', 
			'modified_date', 
			'hid', 
			'patient_name', 
			'email', 
			'pan', 
			'contact', 
			'aadhar', 
			'date', 
			'document', 
			'estimated_amount'
		];
	}

	static exportListFields() {
		let sequelize = this.sequelize;
		return [
			'_id', 
			'created_date', 
			'modified_date', 
			'hid', 
			'patient_name', 
			'email', 
			'pan', 
			'contact', 
			'aadhar', 
			'date', 
			'document', 
			'estimated_amount'
		];
	}

	static viewFields() {
		let sequelize = this.sequelize;
		return [
			'_id', 
			'created_date', 
			'modified_date', 
			'hid', 
			'patient_name', 
			'email', 
			'pan', 
			'contact', 
			'aadhar', 
			'date', 
			'document', 
			'estimated_amount'
		];
	}

	static exportViewFields() {
		let sequelize = this.sequelize;
		return [
			'_id', 
			'created_date', 
			'modified_date', 
			'hid', 
			'patient_name', 
			'email', 
			'pan', 
			'contact', 
			'aadhar', 
			'date', 
			'document', 
			'estimated_amount'
		];
	}

	static editFields() {
		let sequelize = this.sequelize;
		return [
			'_id', 
			'created_date', 
			'modified_date', 
			'hid', 
			'patient_name', 
			'email', 
			'pan', 
			'contact', 
			'aadhar', 
			'date', 
			'document', 
			'estimated_amount'
		];
	}

	
	static searchFields(){
		let sequelize = this.sequelize;
		return [
			sequelize.literal("hid iLIKE :search"), 
			sequelize.literal("patient_name iLIKE :search"), 
			sequelize.literal("email iLIKE :search"), 
			sequelize.literal("pan iLIKE :search"), 
			sequelize.literal("contact iLIKE :search"), 
			sequelize.literal("aadhar iLIKE :search"), 
			sequelize.literal("document iLIKE :search"), 
			sequelize.literal("estimated_amount iLIKE :search"),
		];
	}

	
	
}
module.exports = Patient;
