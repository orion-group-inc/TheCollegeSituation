define({ "api": [  {    "type": "post",    "url": "/school/createSchool",    "title": "Create a new school",    "name": "CreateSchool",    "group": "School",    "version": "0.0.0",    "filename": "./controllers/SchoolController.js",    "groupTitle": "School"  },  {    "type": "get",    "url": "/school/allSchools",    "title": "Get school information",    "name": "GetSchools",    "group": "School",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "_id",            "description": "<p>Unique ID of school</p>"          },          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "isActive",            "description": "<p>status of school in app</p>"          },          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "name",            "description": "<p>name of school</p>"          },          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "desc",            "description": "<p>description of school</p>"          },          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "population",            "description": "<p>total school enrollment</p>"          },          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "avgTuitionInternational",            "description": "<p>tuition for international students</p>"          },          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "avgTuitionLocal",            "description": "<p>tuition for American students</p>"          },          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "website",            "description": "<p>official school website</p>"          },          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "address",            "description": "<p>school address</p>"          },          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "state",            "description": "<p>state where school is located</p>"          },          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "city",            "description": "<p>city where school is located</p>"          },          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "zip",            "description": "<p>zip code of  where school is located</p>"          },          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "graduationRate",            "description": "<p>graduation rate</p>"          },          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "acceptanceRate",            "description": "<p>acceptance rate</p>"          },          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "generalPhone",            "description": "<p>General admission Phone</p>"          },          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "intlAdmissionPhone",            "description": "<p>International admission Phone</p>"          },          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "dateOfCreation",            "description": "<p>date of creation</p>"          }        ]      }    },    "version": "0.0.0",    "filename": "./controllers/SchoolController.js",    "groupTitle": "School"  },  {    "type": "get",    "url": "/student/registeredStudents",    "title": "Get students information",    "name": "GetStudents",    "group": "Student",    "version": "0.0.0",    "filename": "./controllers/StudentController.js",    "groupTitle": "Student"  },  {    "type": "post",    "url": "/student/login",    "title": "Login Student",    "name": "Login_Student",    "group": "Student",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "email",            "description": "<p>student's email</p>"          },          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "password",            "description": "<p>student's password</p>"          }        ]      }    },    "version": "0.0.0",    "filename": "./controllers/AuthController.js",    "groupTitle": "Student"  },  {    "type": "post",    "url": "/student/register",    "title": "Register Student",    "name": "Register_Student",    "group": "Student",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "firstName",            "description": "<p>students firstname</p>"          },          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "lastName",            "description": "<p>student's last name</p>"          },          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "email",            "description": "<p>student's email</p>"          },          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "password",            "description": "<p>student's password</p>"          },          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "birthday",            "description": "<p>student's birthday</p>"          }        ]      }    },    "version": "0.0.0",    "filename": "./controllers/AuthController.js",    "groupTitle": "Student"  }] });
