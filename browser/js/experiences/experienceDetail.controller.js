app.controller('experienceDetailCTRL', function ($scope, experiencesFactory, experience, CartFactory, cart) {
	$scope.experience = experience;
	$scope.cart = cart;


	$scope.addToCart	= function (experience) {
		CartFactory.addToCart($scope.cart, experience)
			.then(function (modifiedCart) {
				$scope.cart = modifiedCart;
			})
	};
});
