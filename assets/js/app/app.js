var assetApp = angular.module('assetApp', ['ngRoute','angularCharts','mgcrea.ngStrap.alert']);


assetApp.config(['$routeProvider',function($routeProvider){
	$routeProvider.
	when('/checkinhistory',{
		templateUrl:'checkinhistory.html',
		controller:'CheckinHistController'
	}).
	when('/employee-profile/:empid',{
		templateUrl:'employee-profile.html',
		controller:'EmpProfController'
	}).
	otherwise({
		redirectTo:'/checkinhistory'
	});
}]);


assetApp.controller('CheckinHistController',['$scope','$http','$log','$interval','$filter','$alert','$rootScope',function($scope,$http,$log,$interval,$filter,$alert,$rootScope){

	$scope.empList = [];
	io.socket.get('/attendance/pushtodb');
    io.socket.on('attendance',function(data){
    	$scope.getRecentCheckin();
    	$alert({
            content: 'New Checkin',
            animation: 'fadeZoomFadeDown',
			type: 'success',
			placement: 'top-right',
            duration: 3
        });
    });    
	$scope.baseurl = "http://localhost:1337/";
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

assetApp.controller('EmpProfController',['$scope','$http','$log','$route','$routeParams',function($scope,$http,$log,$route,$routeParams){

	$scope.empid = $routeParams.empid || "";
	$scope.baseUrl = 'http://localhost:1337/';
	$http.get('employee/'+ $scope.empid)
		 .success(function(data){
		 	$log.info(data);
		 	$scope.empData = data;
		 })
		 .error(function(data){
		 	$log.info(data);
		 });
}]);