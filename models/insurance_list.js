
const BaseModel = require("./basemodel");
class Insurance_List extends BaseModel {
	static init(sequelize, Sequelize) {
		return super.init(
			{
				
				id: { type: Sequelize.INTEGER, primaryKey: true  },
				insurer: {name: 'Insurer', type:Sequelize.STRING},
				address: {name: 'Address', type:Sequelize.STRING},
				ceo: {name: 'CEO', type:Sequelize.STRING},
				email: {name: 'Email', type:Sequelize.STRING}
			}, 
			{ 
				sequelize,
				schema: "public", 
				tableName: "Insurance List",
				modelName: "Insurance List",
			}
		);
	}
	
	static listFields() {
		let sequelize = this.sequelize;
		return [
			'id', 
			sequelize.literal('Insurer AS insurer'), 
			sequelize.literal('Address AS address'), 
			sequelize.literal('CEO AS ceo'), 
			sequelize.literal('Email AS email')
		];
	}

	static exportListFields() {
		let sequelize = this.sequelize;
		return [
			'id', 
			sequelize.literal('Insurer AS insurer'), 
			sequelize.literal('Address AS address'), 
			sequelize.literal('CEO AS ceo'), 
			sequelize.literal('Email AS email')
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
			sequelize.literal("Insurer iLIKE :search"), 
			sequelize.literal("Address iLIKE :search"), 
			sequelize.literal("CEO iLIKE :search"), 
			sequelize.literal("Email iLIKE :search"),
		];
	}

	
	
}
module.exports = Insurance_List;
