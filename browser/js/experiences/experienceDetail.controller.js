app.controller('experienceDetailCTRL', function ($scope, experiencesFactory, experience, CartFactory, cart, ngToast) {
	$scope.experience = experience;
	$scope.cart = cart;

	$scope.tempQuantity = experience.tempQuantity;

	$scope.addToCart	= function (experience) {
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

$scope.rate = experience.ratingAverage;
 $scope.max = 5;
 $scope.isReadonly = true;

 $scope.hoveringOver = function(value) {
	 $scope.overStar = value;
	 $scope.percent = 100 * (value / $scope.max);
 };

 $scope.ratingStates = [
	 {stateOn: 'glyphicon-ok-sign', stateOff: 'glyphicon-ok-circle'},
	 {stateOn: 'glyphicon-star', stateOff: 'glyphicon-star-empty'},
	 {stateOn: 'glyphicon-heart', stateOff: 'glyphicon-ban-circle'},
	 {stateOn: 'glyphicon-heart'},
	 {stateOff: 'glyphicon-off'}
 ];




});
