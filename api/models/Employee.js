/**
* Employee.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  
  connection:'mysql',
	schema: false,
	beforeCreate: function(values, next) {
	  next();
	},
	attributes: {

  		name:{
        type:"string",
        required:true,
        minLength: 2
      },
      url:{
        type:"string",
        minLength: 2
      },
  		phone:{
  			type:"string",
  		},
  		email:{
  			type:"email",
  			unique: true
  		},
  		desig:{
  			type:"string",
  		},
  		empid:{
  			type:"string",
  			required:true,
  			unique: true
  		},
  		uid:{
  			type:"string",
  			required:true,
       		unique:true
  		},
      status:{
        type:"integer",
        defaultsTo:1
		  },

		
	}
};

