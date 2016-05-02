app.controller('experienceDetailCTRL', function ($scope, experiencesFactory, experience, CartFactory, cart, ngToast, $state, reviews, $uibModal, AuthService) {

$scope.loggedInTrue = false;
$scope.alreadyReviewed	= false;


function isLoggedIn () {
			return  AuthService.getLoggedInUser()
				.then(function(user){
					$scope.isLoggedIn = user;
					if(user !== null){
						$scope.loggedInTrue = true;
						for (var i = 0; i < reviews.length; i++) {
							if (reviews[i].user === user._id){
								$scope.alreadyReviewed	= true;
							}

						}
					}
				});
	}
	isLoggedIn();

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
	 {stateOn: 'glyphicon-star', stateOff: 'glyphicon-star-empty'}
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


// below launches modal window for review creation
 $scope.writeReview = function () {

    var modalInstance = $uibModal.open({
      animation: true,
      templateUrl: '/js/experiences/directive-views/new-review.html',
      controller: 'ModalInstanceCtrl',
      resolve: {
        experience: function () {
          return $scope.experience;
        },
				loggedInUser:	function () {
					return $scope.isLoggedIn;
				}
      }
    });

    modalInstance.result.then(function (review) {
			$scope.alreadyReviewed	= true;
      $scope.reviews.unshift(review);
    }, function () {
      console.log('Added a new review to array ', review);
    });
  };

});//end controller
