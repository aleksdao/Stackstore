app.controller('experienceDetailCTRL', function ($scope, experiencesFactory, experience, CartFactory, cart, ngToast, $state, reviews) {
	$scope.experience = experience;
	$scope.similarExperiences;
	$scope.cart = cart;
	$scope.tempQuantity = experience.tempQuantity;
	$scope.reviews	= reviews;

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


 $scope.ratingStates = [
	 {stateOn: 'glyphicon-ok-sign', stateOff: 'glyphicon-ok-circle'},
	 {stateOn: 'glyphicon-star', stateOff: 'glyphicon-star-empty'},
	 {stateOn: 'glyphicon-heart', stateOff: 'glyphicon-ban-circle'},
	 {stateOn: 'glyphicon-heart'},
	 {stateOff: 'glyphicon-off'}
 ];

//look into putting this into state, if possible

 function getSimilar(){
	 experiencesFactory.fetchAll()
	 .then(function(experiences){
		 return experiences.filter(function(experience){
			 if (experience.category._id === $scope.experience.category._id && experience._id !== $scope.experience._id){
				 return experience;
			 }
		 });//end filter
	 })
	 .then(function(experiences){
		 var cutExperiences = experiences.slice(0,4)
		 $scope.similarExperiences = cutExperiences;
	 });
 }//end getSimilar
 getSimilar();

});//end controller
