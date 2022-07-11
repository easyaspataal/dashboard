
const BaseModel = require("./basemodel");
class Insurance extends BaseModel {
	static init(sequelize, Sequelize) {
		return super.init(
			{
				
				id: { type: Sequelize.INTEGER, primaryKey: true  },
				insurer: {name: 'insurer', type:Sequelize.STRING},
				address: {name: 'address', type:Sequelize.STRING},
				ceo: {name: 'ceo', type:Sequelize.STRING},
				email: {name: 'email', type:Sequelize.STRING}
			}, 
			{ 
				sequelize,
				schema: "public", 
				tableName: "Insurance",
				modelName: "Insurance",
			}
		);
	}
	
	static listFields() {
		let sequelize = this.sequelize;
		return [
			'id', 
			'insurer', 
			'address', 
			'ceo', 
			'email'
		];
	}

	static exportListFields() {
		let sequelize = this.sequelize;
		return [
			'id', 
			'insurer', 
			'address', 
			'ceo', 
			'email'
		];
	}

	static viewFields() {
		let sequelize = this.sequelize;
		return [
			'id', 
			'insurer', 
			'address', 
			'ceo', 
			'email'
		];
	}

	static exportViewFields() {
		let sequelize = this.sequelize;
		return [
			'id', 
			'insurer', 
			'address', 
			'ceo', 
			'email'
		];
	}

	static editFields() {
		let sequelize = this.sequelize;
		return [
			'id', 
			'insurer', 
			'address', 
			'ceo', 
			'email'
		];
	}

	
	static searchFields(){
		let sequelize = this.sequelize;
		return [
			sequelize.literal("insurer iLIKE :search"), 
			sequelize.literal("address iLIKE :search"), 
			sequelize.literal("ceo iLIKE :search"), 
			sequelize.literal("email iLIKE :search"),
		];
	}

	
	
}
module.exports = Insurance;
