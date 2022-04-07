var config = {
	app: {
		name: "Easyaspataal",
		url: "http://localhost:8060",
		frontendUrl: "http://localhost:8060",
		secret: "15f75c4f11a6e4d5075986dd0284fffc",
		language: "english",
		publicDir: "assets",
	},
	meta: {
		author:"",
		description: "__metadescription",
		charset: "UTF-8",
	},
	auth: {
		jwtDuration: 240, //in minutes
		otpDuration: 5, //in minutes
	},
	database: {
		name:"postgres",
		type: "postgres",
		host: "localhost",
		username: "postgres",
		password: "sampat",
		port: "5432",
		charset: "utf8",
		recordlimit: 10,
		ordertype: "DESC"
	},
	mail: {
		username:"",
		password: "",
		senderemail:"",
		sendername:"",
		host: "",
		port: ""
	},
	upload: {
		tempDir: "uploads/temp/",
		import_data: {
			filenameType: "timestamp",
			extensions: "json,csv",
			limit: "10",
			maxFileSize: "3",
			returnFullpath: "false",
			filenamePrefix: "",
			uploadDir: "uploads/files/"
		},
		
	},
	s3: {
		secretAccessKey: "",
		accessKeyId: "",
		region: "",
		bucket: "",
	},
	
}
module.exports = config