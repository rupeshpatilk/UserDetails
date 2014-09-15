var User = require('./models/user');

module.exports = function(app) {

	// api ---------------------------------------------------------------------
	// get all User
	app.get('/api/user', function(req, res) {

		// use mongoose to get all users in the database
		User.find(function(err, user) {
			// if there is an error retrieving, send the error. nothing after res.send(err) will execute
			if (err)
				res.send(err)

			res.json(user); // return all users in JSON format
		});
	});

	// create user and send back all users after creation
	app.post('/api/user', function(req, res) {

		// create a user, information comes from AJAX request from Angular
		User.create({
			fname : req.body.fname,
			lname : req.body.lname,
			address : req.body.address
		}, function(err, user) {
			if (err)
				res.send(err);

			// get and return all the user after you create another
			User.find(function(err, user) {
				if (err)
					res.send(err)
				res.json(user);
			});
		});

	});

	// delete a User
	app.delete('/api/user/:_id', function(req, res) {
		User.remove({
			_id : req.params._id
		}, function(err, user) {
			if (err)
				res.send(err);

			// get and return all the user after you create another
			User.find(function(err, user) {
				if (err)
					res.send(err)
				res.json(user);
			});
		});
	});

	// application -------------------------------------------------------------
	app.get('*', function(req, res) {
		res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
	});
};