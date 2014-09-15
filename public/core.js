var userDetail = angular.module('userDetail', []);

function mainController($scope, $http) {
	$scope.formData = {};

	// when landing on the page, get all todos and show them
	$http.get('/api/user')
		.success(function(data) {
			$scope.user = data;
		})
		.error(function(data) {
			console.log('Error: ' + data);
		});

	// when submitting the add form, send the text to the node API
	$scope.createUser = function() {
		$http.post('/api/user', $scope.formData)
			.success(function(data) {
				$scope.formData = {}; // clear the form so our user is ready to enter another
				$scope.user = data;
				console.log(data);
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
	};

	// delete a todo after checking it
	$scope.deleteUser = function(id) {
		$http.delete('/api/user/' + id)
			.success(function(data) {
				$scope.user = data;
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
	};
}
