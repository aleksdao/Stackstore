app.controller('experiencesCTRL',function($scope,experiencesFactory,experiences, $state,$timeout, CategoriesFactory, categories, breadcrumbCategory){

	$scope.allexp = experiences;

	$scope.categories = categories;
	$scope.checkedCategories = [];
	// $scope.isChecked;
	$scope.isSameAsBreadcrumb = function (category) {
		console.log(category.name, breadcrumbCategory.name)
		return breadcrumbCategory._id === category._id;
	}


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

			});
		}

	};//end $scope.toggle

	function loadCategory () {
		if(breadcrumbCategory.name !== undefined){
			// $scope.checkedCategories.push(category);
			$scope.toggle(breadcrumbCategory);
		}
	}
	loadCategory();



});
