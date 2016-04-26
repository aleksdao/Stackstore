app.controller('experiencesCTRL',function($scope,experiencesFactory,experiences, $state,$timeout, CategoriesFactory, categories){

	// $scope.allexp = experiences;
	$scope.allexp = [];

	$scope.categories = categories;
	$scope.checkedCategories = [];

	$scope.isSelected = function (category) {
		return $scope.checkedCategories.indexOf(category) >= 0;
	}

	$scope.toggle = function (category) {
		var refreshCatsAndExperiences;
		if ($scope.isSelected(category)) {
			refreshCatsAndExperiences = CategoriesFactory.removeCatAndExp($scope.allexp, $scope.checkedCategories, category)
		}
		else
		{
			refreshCatsAndExperiences = CategoriesFactory.addCatAndExp($scope.allexp, $scope.checkedCategories, category)
		}
		refreshCatsAndExperiences
			.then(function (catsAndExperiences) {
				$scope.allexp = catsAndExperiences.experiences;
				$scope.checkedCategories = catsAndExperiences.categories;
			})
	}



});
