/**
 * LocationsController
 *
 * @description :: Server-side logic for managing locations
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	getAllProjects:function (req,res) {
		var id = req.param('id');
		Projects.find({location:id})
				.exec(function(err,data){
					
					if(err){
						next();
						console.log(err);
					}
					console.log(data);
					if(data === undefined)
						res.json({notFound:true});
					else
						res.json({notFound:false,data:data});
				})
	}
};

