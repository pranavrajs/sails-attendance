var assetApp = angular.module('assetApp', ['ngRoute','mgcrea.ngStrap.alert','mgcrea.ngStrap.select']);

assetApp.config(['$routeProvider',function($routeProvider){
	$routeProvider.
	when('/dashboard',{
		templateUrl:'dashboard.html',
		controller:'CheckinHistController'
	}).
	when('/checkinhistory',{
		templateUrl:'checkinhistory.html',
		controller:'CheckinHistController'
	}).
	when('/employee-profile/:empid',{
		templateUrl:'employee-profile.html',
		controller:'EmpProfController'
	}).
	when('/employee-details',{
		templateUrl:'employee-details.html',
		controller:'EmpDetController'
	}).
	otherwise({
		redirectTo:'/dashboard'
	});
}]);


assetApp.controller('CheckinHistController',['$scope','$http','$log','$interval','$alert','$rootScope',function($scope,$http,$log,$interval,$alert,$rootScope){

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
	$scope.baseurl = "http://ec2-54-148-0-61.us-west-2.compute.amazonaws.com:1337";
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

 
}]);

assetApp.controller('EmpProfController',['$scope','$http','$log','$route','$routeParams',function($scope,$http,$log,$route,$routeParams){

	$scope.empid = $routeParams.empid || "";
 	$scope.empData = [];

	$scope.baseUrl = 'http://ec2-54-148-0-61.us-west-2.compute.amazonaws.com:1337';
	$http.get('employee/'+ $scope.empid)
		 .success(function(data){
		 	$log.info(data);
		 	$scope.empData = data;
		 	$http.get('attendance/lastentry/'+$scope.empData.uid)
				 .success(function(data){
				 	$log.info(data);
				 	$scope.employee_login = data.data;
				 })
				 .error(function(data){
				 	$log.info(data);
				 });
		 })
		 .error(function(data){
		 	$log.info(data);
		 });
	

}]);

assetApp.controller('EmpDetController',['$scope','$http','$log','$route','$routeParams',function($scope,$http,$log,$route,$routeParams){

	$scope.baseUrl = 'http://ec2-54-148-0-61.us-west-2.compute.amazonaws.com:1337';
	$scope.empData = [];
	$http.get('employee/')
		 .success(function(data){
		 	$log.info(data);
		 	$scope.empData = data;
		 })
		 .error(function(data){
		 	$log.info(data);
		 });
}]);