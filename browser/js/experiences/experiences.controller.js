app.controller('experiencesCTRL',function($scope,experiencesFactory,experiences, $state,$timeout, CategoriesFactory, categories){

	$scope.allexp = experiences;

	$scope.categories = categories;
	$scope.checkedCategories = categories.slice();

	$scope.toggleCategory = function (category) {

		CategoriesFactory.toggleCategory($scope.checkedCategories, category)
			.then(function (catsAndExperiences) {
				$scope.allexp = catsAndExperiences.experiences;
				$scope.checkedCategories = $scope.checkedCategories.filter(function (category) {
					return catsAndExperiences.categories.indexOf(category._id) >= 0;
				});
			})
	}

});
