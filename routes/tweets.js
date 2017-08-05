var express = require('express');
var router = express.Router();

var Twit = require('twit');
var config = require('../config');
var T = new Twit(config);

router.get('/info/:username', function(req, res) {
	var user=[];
	params = {
	screen_name: req.params.username, // the user id passed in as part of the route
	count:15 	// how many tweets to return
	};

	T.get('users/show', params, function(err, data)  {  
		user.push({"name":data.name});
		user.push({"friends_count":data.friends_count});
		user.push({"location":data.location});
		user.push({"followers_count":data.followers_count});
		user.push({"statuses_count":data.statuses_count});
		user.push({"profile_image_url":data.profile_image_url});
	});

	T.get('followers/ids', params,  function (err, data, response) {
		var count = 0;
		var nbFollowers = data.ids.length
		
		followers = []
		var id = []
		for (i=0 ; i < nbFollowers ; i++) {
			id = data.ids[i];
			params = {
			user_id:id
			}
			T.post('users/lookup', params, function(err, data,response)  {  
				if(err){
					count = count+1;
				}

				else {
					followers.push(data);
					count = count+1;
					console.log(count);
					if (count == nbFollowers) {
						user.push({"followers":followers});
						res.json({user:user});
					}

				}
				
			})
		}
	});
});
module.exports = router;
