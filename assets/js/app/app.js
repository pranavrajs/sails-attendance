var assetApp = angular.module('assetApp', ['ngRoute','angularCharts','mgcrea.ngStrap']);

assetApp
	.config(function($alertProvider) {
		angular.extend($alertProvider.defaults, {
			animation: 'am-fade-and-slide-top',
			placement: 'top'
		});
	})
assetApp.config(['$routeProvider',function($routeProvider){
	$routeProvider.
	when('/checkinhistory',{
		templateUrl:'checkinhistory.html',
		controller:'CheckinHistController'
	}).
	// when('/login',{
	// 	templateUrl:'login.html',
	// 	controller:'LoginController'
	// }).
	when('/map-asset',{
		templateUrl:'map-asset.html',
		controller:'MapAssetController'
	}).
	when('/movement-history',{
		templateUrl:'movement-history.html',
		controller:'MovementHistoryController'
	}).
	when('/asset-details',{
		templateUrl:'asset-details.html',
		controller:'AssetDetailsController'
	}).
	otherwise({
		redirectTo:'/checkinhistory'
	});
}]);


assetApp.controller('CheckinHistController',['$scope','$http','$log','$interval','$filter','$rootScope',function($scope,$http,$log,$interval,$filter,$rootScope){

	$scope.empList = [];
	io.socket.get('/attendance/pushtodb');
    io.socket.on('attendance',function(data){
    	alert(data);

    	$scope.getRecentCheckin();
    });
    
	$scope.baseurl = "http://ec2-54-148-0-61.us-west-2.compute.amazonaws.com:1337/";
	$scope.getRecentCheckin = function(){
	//$interval(function(){
		
		$http.get($scope.baseurl + 'attendance/')
			.success(function(checkin_data){

				$log.info(checkin_data);
				$scope.empList = checkin_data;
			})
			.error(function(err_data){

				$log.info(err_data);
			});
	};
	$scope.reverse = false;
	$scope.predicate = '-id';
	//},5000);
	$scope.getRecentCheckin();

	// var orderBy = $filter('orderBy');
	// $scope.order = function(predicate, reverse) {
 //    	$scope.empList = orderBy($scope.empList, predicate, reverse);
 //  	};
 //  	$scope.order('-',true);

 	$scope.config = {
	    title: 'Attendance',
	    tooltips: true,
	    labels: false,
	    mouseover: function() {},
	    mouseout: function() {},
	    click: function() {},
	    legend: {
	      display: true,
	      position: 'right'
	    }
	  };

	  $scope.data = {
	    series: ['Male','Female','Total'],
	    data: [{
	      x: "Dec12",
	      y: [100,200,300],
	    }, {
	      x: "Dec13",
	      y: [150, 120, 370]
	    }, {
	      x: "Dec14",
	      y: [112,131,243]
	    }]
  	};
}]);
assetApp.controller('AddAssetController',function($scope){

});
// assetApp.controller('LoginController',function($scope){

// });
assetApp.controller('MapAssetController',function($scope){

});
assetApp.controller('MovementHistoryController',function($scope){

});
assetApp.controller('AssetDetailsController',function($scope){

});