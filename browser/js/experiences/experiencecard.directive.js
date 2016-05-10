app.directive('experienceCard',function(){
	return{
		restrict : 'AE',
		templateUrl : '/js/experiences/experience-card.html',
		controller: function ($scope) {
			function calcAverageRating ()	{
				var sum = 0;
				for (var i = 0; i < $scope.exp.reviews.length; i++) {
					sum += $scope.exp.reviews[i].rating;
				}//end for
				return (sum / $scope.exp.reviews.length);
			}
			$scope.averageRating = calcAverageRating();

		}
	};
});
app.directive('experienceSmall',function(){
	return{
		restrict : 'AE',
		templateUrl : '/js/experiences/directive-views/experience-card-small.html'
	};
});
app.directive('review',function(){
	return{
		restrict : 'AE',
		templateUrl : '/js/experiences/directive-views/experience-review.html'
	};
});
