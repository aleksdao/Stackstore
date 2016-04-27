app.controller('experienceDetailCTRL', function ($scope, experiencesFactory, experience, CartFactory, cart, ngToast) {
	$scope.experience = experience;
	$scope.cart = cart;

	$scope.tempQuantity = experience.tempQuantity;

	$scope.addToCart	= function (experience) {
		$scope.tempQuantity--;
		CartFactory.addToCart($scope.cart, experience)
			.then(function (returnedObj) {
				$scope.cart = returnedObj.modifiedCart;
				$scope.tempQuantity = returnedObj.tempQuantity;
				ngToast.create({
					className: 'success',
					content: '<h2>Item added to Cart</h2>'
				});//end ngToast.create
			});
	};

$scope.experienceInStock = function () {
	return $scope.tempQuantity > 0;
};

});//end controller
