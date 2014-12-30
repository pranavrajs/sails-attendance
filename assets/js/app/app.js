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


assetApp.controller('CheckinHistController',['$scope','$filter','$http','$log','$interval','$alert','$rootScope',function($scope,$filter,$http,$log,$interval,$alert,$rootScope){
	
	$scope.catData = [];
	$scope.EmpCheckinData= [];

	
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

	$scope.getGraphDetails = function () {
		
		$http.get($scope.baseurl + 'attendance/dailylog')
			.success(function(checkin_data){

				$log.info(checkin_data);
				for (var i = checkin_data.length - 1; i >= 0; i--) {
					$scope.catData.push($filter('date')(checkin_data[i].logdate, "dd/MM/yyyy"));
					$scope.EmpCheckinData.push(checkin_data[i].empcount);
				};
				$log.info($scope.EmpCheckinData);

				$('#container').highcharts({
                  chart: {
                      type: 'column'
                  },
                  title: {
                      text: 'Daily Attendance'
                  },
                  xAxis: {
                      categories: $scope.catData
                  },
                  yAxis: {
                      min: 0,
                      title: {
                          text: 'Attendance(%)'
                      }
                  },
                  tooltip: {
                      headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                      pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                          '<td style="padding:0"><b>{point.y:.1f}%</b></td></tr>',
                      footerFormat: '</table>',
                      shared: true,
                      useHTML: true
                  },
                  plotOptions: {
                      column: {
                          pointPadding: 0.2,
                          borderWidth: 0
                      }
                  },
                  series: [{
                      name: 'Employees',
                      data: $scope.EmpCheckinData

                  }]
              	});

			})
			.error(function(err_data){

				$log.info(err_data);
			});
	}
	$scope.getGraphDetails();
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

	$scope.baseUrl = 'http://localhost:1337/';
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

	$scope.baseUrl = 'http://localhost:1337/';
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