
const BaseModel = require("./basemodel");
class Hospital extends BaseModel {
	static init(sequelize, Sequelize) {
		return super.init(
			{
				
				_id: { type: Sequelize.INTEGER, primaryKey: true , autoIncrement: true },
				hid: {name: 'hid', type:Sequelize.STRING},
				name: {name: 'name', type:Sequelize.STRING},
				email: {name: 'email', type:Sequelize.STRING},
				password: {name: 'password', type:Sequelize.STRING},
				contact: {name: 'contact', type:Sequelize.DECIMAL},
				bank_details_account_no: {name: 'bank_details_account_no', type:Sequelize.STRING},
				bank_details_bank_name: {name: 'bank_details_bank_name', type:Sequelize.STRING},
				bank_details_ifsc_code: {name: 'bank_details_ifsc_code', type:Sequelize.STRING},
				bank_details_payee_name: {name: 'bank_details_payee_name', type:Sequelize.STRING},
				subvention_rate: {name: 'subvention_rate', type:Sequelize.STRING}
			}, 
			{ 
				sequelize,
				schema: "public", 
				tableName: "hospital",
				modelName: "hospital",
			}
		);
	}
	
	static listFields() {
		let sequelize = this.sequelize;
		return [
			'_id', 
			'hid', 
			'name', 
			'email', 
			'contact', 
			'bank_details_account_no', 
			'bank_details_bank_name', 
			'bank_details_ifsc_code', 
			'bank_details_payee_name', 
			'subvention_rate'
		];
	}

	static exportListFields() {
		let sequelize = this.sequelize;
		return [
			'_id', 
			'hid', 
			'name', 
			'email', 
			'contact', 
			'bank_details_account_no', 
			'bank_details_bank_name', 
			'bank_details_ifsc_code', 
			'bank_details_payee_name', 
			'subvention_rate'
		];
	}

	static viewFields() {
		let sequelize = this.sequelize;
		return [
			'_id', 
			'hid', 
			'name', 
			'email', 
			'contact', 
			'bank_details_account_no', 
			'bank_details_bank_name', 
			'bank_details_ifsc_code', 
			'bank_details_payee_name', 
			'subvention_rate'
		];
	}

	static exportViewFields() {
		let sequelize = this.sequelize;
		return [
			'_id', 
			'hid', 
			'name', 
			'email', 
			'contact', 
			'bank_details_account_no', 
			'bank_details_bank_name', 
			'bank_details_ifsc_code', 
			'bank_details_payee_name', 
			'subvention_rate'
		];
	}

	static accounteditFields() {
		let sequelize = this.sequelize;
		return [
			'_id', 
			'hid', 
			'name', 
			'email', 
			'contact', 
			'bank_details_account_no', 
			'bank_details_bank_name', 
			'bank_details_ifsc_code', 
			'bank_details_payee_name', 
			'subvention_rate'
		];
	}

	static accountviewFields() {
		let sequelize = this.sequelize;
		return [
			'_id', 
			'hid', 
			'name', 
			'email', 
			'contact', 
			'bank_details_account_no', 
			'bank_details_bank_name', 
			'bank_details_ifsc_code', 
			'bank_details_payee_name', 
			'subvention_rate'
		];
	}

	static exportAccountviewFields() {
		let sequelize = this.sequelize;
		return [
			'_id', 
			'hid', 
			'name', 
			'email', 
			'contact', 
			'bank_details_account_no', 
			'bank_details_bank_name', 
			'bank_details_ifsc_code', 
			'bank_details_payee_name', 
			'subvention_rate'
		];
	}

	static editFields() {
		let sequelize = this.sequelize;
		return [
			'_id', 
			'hid', 
			'name', 
			'contact', 
			'bank_details_account_no', 
			'bank_details_bank_name', 
			'bank_details_ifsc_code', 
			'bank_details_payee_name', 
			'subvention_rate'
		];
	}

	
	static searchFields(){
		let sequelize = this.sequelize;
		return [
			sequelize.literal("hid iLIKE :search"), 
			sequelize.literal("name iLIKE :search"), 
			sequelize.literal("email iLIKE :search"), 
			sequelize.literal("CAST(contact AS TEXT) iLIKE :search"), 
			sequelize.literal("bank_details_account_no iLIKE :search"), 
			sequelize.literal("bank_details_bank_name iLIKE :search"), 
			sequelize.literal("bank_details_ifsc_code iLIKE :search"), 
			sequelize.literal("bank_details_payee_name iLIKE :search"), 
			sequelize.literal("subvention_rate iLIKE :search"),
		];
	}

	
	
}
module.exports = Hospital;
