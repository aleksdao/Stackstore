app.controller('experienceDetailCTRL', function ($scope, experiencesFactory, experience, CartFactory, cart, ngToast, $state, $uibModal, AuthService) {

$scope.loggedInTrue = false;
$scope.alreadyReviewed	= false;
$scope.similarExperiences =[];


function isLoggedIn () {
			return  AuthService.getLoggedInUser()
				.then(function(user){
					$scope.isLoggedIn = user;
					if(user !== null){
						$scope.loggedInTrue = true;
						for (var i = 0; i < experience.reviews.length; i++) {
							if (experience.reviews[i].user === user._id){
								$scope.alreadyReviewed	= true;
							}

						}
					}
				});
	}
	isLoggedIn();

	function calcAverageRating ()	{
		var sum = 0;
		for (var i = 0; i < experience.reviews.length; i++) {
			sum += experience.reviews[i].rating;
		}//end for
		return (sum/experience.reviews.length);
	}

	$scope.experience = experience;
	// $scope.similarExperiences;
	$scope.cart = cart;
	$scope.tempQuantity = experience.tempQuantity;
	$scope.reviews	= experience.reviews || [];
	//below sets number of stars in display under photo
	$scope.rate	= calcAverageRating();




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

$scope.gotoDetail=function(exp){
	$state.go('experience',{ id: exp._id, _experience: exp });
};
//below specs are for star display directive
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
				 var avgOfRating = calcAverageRating(experience);
				 experience.averageRating = avgOfRating;
				 return experience;
			 }
		 });//end filter
	 })
	 .then(function(experiences){
		 $scope.similarExperiences = experiences.slice(0,4);
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
//below is passed back to after modal closes, also averages review again
    modalInstance.result.then(function (review) {
			$scope.alreadyReviewed	= true;
      $scope.reviews.unshift(review);
			var sum = 0;

				for (var i = 0; i < $scope.reviews.length; i++) {
					sum += $scope.reviews[i].rating;
				}//end for
				$scope.rate = (sum / $scope.reviews.length);


    }, function () {
      console.log('Added a new review to array ', review);
    });
  };

});//end controller
