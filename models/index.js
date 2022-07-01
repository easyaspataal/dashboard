
const Sequelize = require('sequelize');
const dbConfig    = require('../config.js').database;

const sequelize = new Sequelize(dbConfig.name, dbConfig.username, dbConfig.password, {
		dialect: dbConfig.type,
		host: dbConfig.host,
		port: dbConfig.port,
		pool: {
			max: 15,
			min: 5,
			idle: 20000,
			evict: 15000,
			acquire: 30000
		},
		define: {
			timestamps: false,
			freezeTableName: true
		},
		operatorsAliases: 0
	}
);


// Override timezone formatting
Sequelize.DATE.prototype._stringify = function _stringify(date, options) {
	return this._applyTimezone(date, options).format('YYYY-MM-DD HH:mm:ss');
};

const Hospital =  require("./hospital").init(sequelize, Sequelize);
const Hospitalss =  require("./hospitalss").init(sequelize, Sequelize);
const Payment =  require("./payment").init(sequelize, Sequelize);
const Users =  require("./users").init(sequelize, Sequelize);

const Op = Sequelize.Op;
module.exports = {
	sequelize,
	Op,
	Hospital,
	Hospitalss,
	Payment,
	Users
}
