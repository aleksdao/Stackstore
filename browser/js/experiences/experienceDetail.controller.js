app.controller('experienceDetailCTRL', function ($scope, experiencesFactory, experience, CartFactory, cart) {
	$scope.experience = experience;
	$scope.cart = cart;

	$scope.tempQuantity = experience.tempQuantity;

	$scope.addToCart	= function (experience) {
		$scope.tempQuantity--;
		CartFactory.addToCart($scope.cart, experience)
			.then(function (modifiedCart) {
				$scope.cart = modifiedCart;
			})
	};

	$scope.experienceInStock = function () {
		return $scope.tempQuantity > 0;
	}

});
