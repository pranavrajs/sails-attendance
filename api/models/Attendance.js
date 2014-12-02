/**
* Attendance.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

	attributes: {

		// Associated to Employee
		emp_entry:{
			model:'Employee'
		},

		//Other entries
		uid:{
			required:true,
			type:'string'
		},
		capturedAt:{
			type:'string',
			required:true
		},
		deviceid:{
			type:'string',
			required:true
		}
	}
};

