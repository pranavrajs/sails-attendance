/**
* Attendance.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

	connection:'mysql',
	attributes: {

		// Associated to Employee
		emp_entry:{
			model:'Employee'
		},
		projcode:{

			required:true,
			type:'string'
		},
		//Other entries
		uid:{
			required:true,
			type:'string'
		},
		capturedAt:{
			type:'date',
			required:true
		},
		deviceid:{
			type:'string',
			required:true
		}
	}
};

