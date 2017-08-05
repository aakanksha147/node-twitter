angular.module('userServices',[])

.factory('User',function($http){
	var userFactory={};

	userFactory.getDetails = function(username){
		return $http.get('/tweets/info/'+username);
	}
	return userFactory;
});