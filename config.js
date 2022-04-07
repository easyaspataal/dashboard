var config = {
<<<<<<< HEAD
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
=======
app: {
        name: "Easyaspataal",
        url: "35.200.253.165",
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
>>>>>>> 6603869ba3f177043b360629c71f6d40e3d3879c
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
		
		photo: {
			filenameType: "random",
			extensions: "jpg,png,gif,jpeg",
			limit: "1",
			maxFileSize: "3",
			returnFullpath: false,
			filenamePrefix: "",
			uploadDir: "uploads/files",
			imageResize:  [ 
				{name: "small", width: 100, height: 100, mode: "cover"}, 
				{name: "medium", width: 480, height: 480, mode: "inside"}, 
				{name: "large", width: 1024, height: 760, mode: "inside"}
			],

		},

		policy_doc: {
			filenameType: "random",
			extensions: "docx,doc,xls,xlsx,xml,csv,pdf,xps",
			limit: "3",
			maxFileSize: "100",
			returnFullpath: false,
			filenamePrefix: "",
			uploadDir: "uploads/files",
			
		},

		hospital_invoice: {
			filenameType: "random",
			extensions: "docx,doc,xls,xlsx,xml,csv,pdf,xps",
			limit: "1",
			maxFileSize: "3",
			returnFullpath: false,
			filenamePrefix: "",
			uploadDir: "uploads/files",
			
		},

	},
	s3: {
		secretAccessKey: "",
		accessKeyId: "",
		region: "",
		bucket: "",
	},
	
	locales: {
		'english': 'English',
	}

}
module.exports = config
