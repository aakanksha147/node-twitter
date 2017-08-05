angular.module('mainController',['userServices'])

.controller('mainCtrl',function(User,$scope,$timeout,$location, $rootScope,$window){
	var app=this;
	app.user=false;
	app.list=false;
	app.loading= false;
	this.search = function(data){
		console.log(app.data.username)
		app.loading= true;

		User.getDetails(app.data.username).then(function(data){
			app.user=true;
			app.list=false;
			app.name = data.data.user[0].name
			app.location = data.data.user[2].location
			app.status = data.data.user[4].statuses_count
			app.followers = data.data.user[3].followers_count
			app.friends = data.data.user[1].friends_count
			app.profile_pic = data.data.user[5].profile_image_url
			app.follower = data.data.user[6].followers;
			console.log(app.follower)
			app.loading=false;
		})

	}

	this.follow = function(){
		app.user = false;
		app.list = true;
	}
});