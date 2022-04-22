var config = {
	app: {
		name: "Easyaspataal",
        url: "https://dashboard-7k5qcren2q-el.a.run.app/",
        frontendUrl: "https://s3.ap-south-1.amazonaws.com/hospital.easyaspataal.com/index.html#/",
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
		name:"ea_hospital_dashboard",
        type: "postgres",
        host: "easyaspataal-staging.cluster-cbqgtf1hzzqq.ap-south-1.rds.amazonaws.com",
        username: "easy_admin",
        password: "EasyAspatal1212",
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