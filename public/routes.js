var app=angular.module('appRoutes', ['ngRoute'])

.config(function($routeProvider,$locationProvider){
 
console.log("route working");

	$routeProvider
	.otherwise({ redirectTo: '/'});

$locationProvider.html5Mode({
  enabled: true,
  requireBase: false
});
});

