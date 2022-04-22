
const BaseModel = require("./basemodel");
class Employees extends BaseModel {
	static init(sequelize, Sequelize) {
		return super.init(
			{
				
				id: { type: Sequelize.INTEGER, primaryKey: true , autoIncrement: true },
				name: {name: 'name', type:Sequelize.STRING},
				contact: {name: 'contact', type:Sequelize.STRING},
				bank: {name: 'bank', type:Sequelize.STRING}
			}, 
			{ 
				sequelize,
				schema: "public", 
				tableName: "employees",
				modelName: "employees",
			}
		);
	}
	
	static listFields() {
		let sequelize = this.sequelize;
		return [
			'id', 
			'name', 
			'contact', 
			'bank'
		];
	}

	static exportListFields() {
		let sequelize = this.sequelize;
		return [
			'id', 
			'name', 
			'contact', 
			'bank'
		];
	}

	static viewFields() {
		let sequelize = this.sequelize;
		return [
			'id', 
			'name', 
			'contact', 
			'bank'
		];
	}

	static exportViewFields() {
		let sequelize = this.sequelize;
		return [
			'id', 
			'name', 
			'contact', 
			'bank'
		];
	}

	static editFields() {
		let sequelize = this.sequelize;
		return [
			'id', 
			'name', 
			'contact', 
			'bank'
		];
	}

	
	static searchFields(){
		let sequelize = this.sequelize;
		return [
			sequelize.literal("name iLIKE :search"),
		];
	}

	
	
}
module.exports = Employees;
