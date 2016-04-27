app.controller('experienceDetailCTRL', function ($scope, experiencesFactory, experience, CartFactory, cart) {
	$scope.experience = experience;
	$scope.cart = cart;

	$scope.tempQuantity = experience.tempQuantity;

	$scope.addToCart	= function (experience) {
		CartFactory.addToCart($scope.cart, experience)
			.then(function (returnedObj) {
				$scope.cart = returnedObj.modifiedCart;
				$scope.tempQuantity = returnedObj.tempQuantity;
			})
	};

	$scope.experienceInStock = function () {
		return $scope.tempQuantity > 0;
	}

});
