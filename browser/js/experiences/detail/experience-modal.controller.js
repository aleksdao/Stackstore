app.controller('ModalInstanceCtrl', function ($scope, $uibModalInstance, experience, loggedInUser, experiencesFactory) {
	$scope.experience =	experience;
	$scope.loggedInUser = loggedInUser;
	$scope.review = {
		description:	''
	};

	$scope.rate = 5;
 	$scope.max = 5;
 	$scope.isReadonly = false;

 $scope.hoveringOver = function(value) {
	 $scope.overStar = value;
	 $scope.percent = 100 * (value / $scope.max);
 };

 $scope.ratingStates = [
	 {stateOn: 'glyphicon-star', stateOff: 'glyphicon-star-empty'}
 ];

  $scope.sendReview = function () {
		var newReview = {
			description: $scope.review.description,
			rating:	$scope.rate,
			experience:	experience._id,
			user: loggedInUser._id,
		};
		experiencesFactory.postReview(newReview)
		.then(function(review){
			$uibModalInstance.close(review);
		});
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});
