
const BaseModel = require("./basemodel");
class Payment extends BaseModel {
	static init(sequelize, Sequelize) {
		return super.init(
			{
				
				_id: { type: Sequelize.INTEGER, primaryKey: true , autoIncrement: true },
				hid: {name: 'hid', type:Sequelize.STRING},
				contact: {name: 'contact', type:Sequelize.DECIMAL},
				amount: {name: 'amount', type:Sequelize.DECIMAL},
				created_date: {name: 'created_date', type:Sequelize.DATE}
			}, 
			{ 
				sequelize,
				schema: "public", 
				tableName: "payment",
				modelName: "payment",
			}
		);
	}
	
	static listFields() {
		let sequelize = this.sequelize;
		return [
			'_id', 
			'hid', 
			'contact', 
			'amount', 
			'created_date'
		];
	}

	static exportListFields() {
		let sequelize = this.sequelize;
		return [
			'_id', 
			'hid', 
			'contact', 
			'amount', 
			'created_date'
		];
	}

	static viewFields() {
		let sequelize = this.sequelize;
		return [
			'_id', 
			'hid', 
			'contact', 
			'amount', 
			'created_date'
		];
	}

	static exportViewFields() {
		let sequelize = this.sequelize;
		return [
			'_id', 
			'hid', 
			'contact', 
			'amount', 
			'created_date'
		];
	}

	static editFields() {
		let sequelize = this.sequelize;
		return [
			'_id', 
			'hid', 
			'contact', 
			'amount', 
			'created_date'
		];
	}

	
	static searchFields(){
		let sequelize = this.sequelize;
		return [
			sequelize.literal("hid iLIKE :search"),
		];
	}

	
	
}
module.exports = Payment;
