var assetApp = angular.module('assetApp', ['ngRoute']);

assetApp.config(['$routeProvider',function($routeProvider){
	$routeProvider.
	when('/checkinhistory',{
		templateUrl:'checkinhistory.html',
		controller:'CheckinHistController'
	}).
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


assetApp.controller('CheckinHistController',['$scope','$http','$log','$interval','$filter',function($scope,$http,$log,$interval,$filter){

	$scope.empList = [];
	io.socket.get('/attendance/pushtodb');
    io.socket.on('attendance',function(data){
      $scope.getRecentCheckin();
    });
	$scope.baseurl = "https://sensomate-checkin.herokuapp.com/";
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
assetApp.controller('AddAssetController',function($scope){

});
assetApp.controller('MapAssetController',function($scope){

});
assetApp.controller('MovementHistoryController',function($scope){

});
assetApp.controller('AssetDetailsController',function($scope){

});