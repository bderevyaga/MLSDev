var app = angular.module('myApp', ['ngRoute']);

app.controller('MainController', function ($scope, $http) {
    $http.get('https://api.github.com/users', {}).success(function (response) {
        $scope.responses = response;
    });
});

app.controller('UsersController', function ($scope, $routeParams, $http){
    $scope.name = "UsersController";
    $scope.userId = $routeParams.userId;
    $http.get('https://api.github.com/users/' + $scope.userId , {}).success(function (response) {
        $scope.userData = response;
        $http.get(response.repos_url, {}).success(function (response) {
            $scope.reposesData = response;
        });
    });
});

app.controller('ReposController', function ($scope, $routeParams, $http){
    $scope.name = "ReposController";
});

app.config(function ($routeProvider, $locationProvider) {
    const route = $routeProvider;
    route.when('/',{
        templateUrl: 'partials/main.html',
        controller: 'MainController'
    });
    route.when('/user/:userId',{
        templateUrl: 'partials/user.html',
        controller: 'UsersController'
    });
    route.when('/user/:userId/:reposId',{
        templateUrl: 'partials/repos.html',
        controller: 'ReposController'
    });
});