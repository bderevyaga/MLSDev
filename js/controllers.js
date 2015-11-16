var app = angular.module('myApp', []);
app.controller('Git', function($scope) {
	$scope.loading = true;
	$scope.users = false;
	$http.get('https://api.github.com/users', {  }).success(function(responses)
	{
		$scope.responses = responses;
		$scope.loading = false;
	});
});