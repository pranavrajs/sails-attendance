/**
 * AttendanceController
 *
 * @description :: Server-side logic for managing attendances
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	
	pushtodb:function(req,res){

		var data_from_client = req.params.all();
		//Get data from server
		delete data_from_client.id;

		var data_from_client = req.params.all();

		if(req.method == 'POST'){


			Employee.findByUid(data_from_client.uid)
				.exec(function(err,data){

					console.log(data);
					if(data.length ===0 || data === undefined)
						data_from_client.emp_entry = 0;
					else
						data_from_client.emp_entry = data[0].id;

					console.log(err);
					Attendance.create(data_from_client)
							.exec(function(err,success_data){

								console.log(err);
								Attendance.publishCreate({
									id:success_data.id, 
									uid:success_data.uid,
									capturedAt:success_data.capturedAt,
									deviceid:success_data.deviceid
								});
								console.log(success_data);
								return res.json(200,{ log_entry: success_data.id })
							})
							// (function(error_data){destroy/3
							// 	console.log(error_data);

							// 	// No need to send model data
							// 	delete error_data.model;
							// 	return res.json(400,error_data);
							// });

				});
			//Console Log in server
			console.log(data_from_client);
	
		}
		else if(req.isSocket){
			Attendance.watch(req.socket);
			console.log('User with socket id '+req.socket.id+' is now subscribed to the model class Attendance.');
			return;
		}
		else{
			console.log("errr");
		}
	},

	// lastentry:function(req,res){

	// 	var id = req.param('id');
	// 	Attendance
	// 	.find()
	// 		.sort('id DESC')
	// 		.limit(1)
	// 		.then(function(data){
	// 		 	if(data === undefined) // No data
	// 		 		return res.json({
	// 		 					notDefined:true
	// 		 				},403);
	// 		 	else{
	// 		 		//Delete un-necessary data sent back to client
	// 		 		delete data[0].id;
	// 		 		delete data[0].createdAt;
	// 		 		delete data[0].updatedAt;

	// 		 		return res.json({
	// 		 					notDefined:false,
	// 		 					data:data[0]
	// 		 				});
	// 		 	}
	// 		})
	// 		.fail(function(error_data){
	// 		 	console.log("Err : "+error_data);
	// 		 	return res.json({
	// 		 					notDefined: true,
	// 		 					error: error_data
	// 		 				});
	// 		});
	// }	
};

