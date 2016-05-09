app.config(function($stateProvider){
	$stateProvider
		.state('admin', {
			url : '/admin',
			controller : 'adminCtrl',
			templateUrl : '/js/admin/admin.html'
		})
		.state('manageUsers', {
			url: '/admin/manageUsers',
			templateUrl: '/js/admin/manageusers.html',
			resolve: {
				users: function (UserFactory) {
					return UserFactory.fetchAll();
				}
			},
			controller: function ($scope, users, ForgotPasswordFactory, AdminFactory) {
				$scope.users = users;
				$scope.promoteToAdmin = function (user) {
					AdminFactory.promoteToAdmin(user)
						.then(function (usersObj) {
							$scope.users = usersObj.allUsers;
							$scope.successMsg = "Successfully promoted " + usersObj.promotedUser.email + " to Administrator role."
						})
				}

				$scope.demoteFromAdmin = function (user) {
					AdminFactory.demoteFromAdmin(user)
						.then(function (usersObj) {
							$scope.users = usersObj.allUsers;
							$scope.successMsg = "Successfully demoted " + usersObj.demotedUser.email + " from Administrator role."
						})
				}

				$scope.onChange = function (user, makeAdmin) {
					if (makeAdmin) {
						$scope.promoteToAdmin(user);
					}
					else {
						$scope.demoteFromAdmin(user);
					}
				}

				$scope.userRole = function (user) {
					return user.admin === true ? "Administrator" : "Customer";
				}

				$scope.isAdmin = function (user) {
					return user.admin;
				}

				$scope.resetPassword = function (user) {
					ForgotPasswordFactory.forgotPassword(user.email)
					.then(function (successMsg) {
						if (successMsg) {
							$scope.successMsg = successMsg;
						}
					})
				}
			}
		})
});

app.factory('AdminFactory', function ($http) {
	var factory = {};
	factory.promoteToAdmin = function (user) {
		return $http.get('/api/admin/manage/users/' + user._id + '/promote')
			.then(function (response) {
				return response.data;
			})
	}

	factory.demoteFromAdmin = function (user) {
		return $http.get('/api/admin/manage/users/' + user._id + '/demote')
			.then(function (response) {
				return response.data;
			})
	}
	return factory;
})
