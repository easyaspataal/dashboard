
const BaseModel = require("./basemodel");
class Surgery extends BaseModel {
	static init(sequelize, Sequelize) {
		return super.init(
			{
				
				id: { type: Sequelize.INTEGER, primaryKey: true  },
				surgery: {name: 'Surgery', type:Sequelize.STRING},
				general: {name: 'General', type:Sequelize.STRING},
				twin: {name: 'twin', type:Sequelize.STRING},
				single: {name: 'single', type:Sequelize.STRING},
				city: {name: 'city', type:Sequelize.STRING}
			}, 
			{ 
				sequelize,
				schema: "public", 
				tableName: "Surgery",
				modelName: "Surgery",
			}
		);
	}
	
	static listFields() {
		let sequelize = this.sequelize;
		return [
			'id', 
			sequelize.literal('Surgery AS surgery'), 
			sequelize.literal('General AS general'), 
			'twin', 
			'single', 
			'city'
		];
	}

	static exportListFields() {
		let sequelize = this.sequelize;
		return [
			'id', 
			sequelize.literal('Surgery AS surgery'), 
			sequelize.literal('General AS general'), 
			'twin', 
			'single', 
			'city'
		];
	}

	static exportViewFields() {
		let sequelize = this.sequelize;
		return [
			
		];
	}

	
	static searchFields(){
		let sequelize = this.sequelize;
		return [
			sequelize.literal("Surgery iLIKE :search"), 
			sequelize.literal("General iLIKE :search"), 
			sequelize.literal("twin iLIKE :search"), 
			sequelize.literal("single iLIKE :search"), 
			sequelize.literal("city iLIKE :search"),
		];
	}

	
	
}
module.exports = Surgery;
