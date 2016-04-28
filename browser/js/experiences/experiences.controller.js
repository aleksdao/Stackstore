app.controller('experiencesCTRL',function($scope,experiencesFactory,experiences, $state,$timeout, CategoriesFactory, categories){

	// $scope.allexp = experiences;
	// $scope.numCatsSelected = 0;
	$scope.allexp = experiences;

	$scope.categories = categories;
	$scope.checkedCategories = [];
	$scope.gotoDetail=function(exp){
		$state.go('experience',{ id: exp._id });
	};

	$scope.isSelected = function (category) {
		return $scope.checkedCategories.indexOf(category) >= 0;
	}

	$scope.toggle = function (category) {
		if ($scope.isSelected(category)) {
			var catsAndExperiences = CategoriesFactory.removeCatAndExp($scope.allexp, $scope.checkedCategories, category);

				$scope.allexp = catsAndExperiences.experiences;
				$scope.checkedCategories = catsAndExperiences.categories;

		}
		else {
			CategoriesFactory.addCatAndExp($scope.allexp, $scope.checkedCategories, category)
				.then(function (catsAndExperiences) {
					$scope.allexp = catsAndExperiences.experiences;
					$scope.checkedCategories = catsAndExperiences.categories;
			})
		}

	}




});
