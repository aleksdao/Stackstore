app.controller('experiencesCTRL',function($scope, ngToast, experiencesFactory,experiences, $state,$timeout, CategoriesFactory, categories, breadcrumbCategory, cart, CartFactory){

	$scope.allexp = experiences;

	$scope.categories = categories;
	$scope.checkedCategories = [];

	$scope.cart = cart;

	// var experience = {}

	$scope.gotoDetail=function(exp){
		$state.go('experience',{ id: exp._id });
	};
	// $scope.isChecked;
	$scope.isSameAsBreadcrumb = function (category) {
		return breadcrumbCategory._id === category._id;
	}

	$scope.experienceInStock = function (experience) {
		return experience.tempQuantity > 0;
	};

	$scope.addToCart	= function (experience) {
		CartFactory.addToCart($scope.cart, experience)
			.then(function (returnedObj) {
				$scope.cart = returnedObj.modifiedCart;
				experience.tempQuantity = returnedObj.tempQuantity;
				ngToast.create({
					className: 'success',
					content: '<h2>Item added to Cart</h2>'
				});//end ngToast.create
			});
	};


	$scope.isSelected = function (category) {
		return $scope.checkedCategories.indexOf(category) >= 0;
	}
	$scope.toggle = function (category) {
		if ($scope.isSelected(category)) {
			var catsAndExperiences = CategoriesFactory.removeCatAndExp($scope.allexp, $scope.checkedCategories, category);
				$scope.checkedCategories = catsAndExperiences.categories;
				if ($scope.checkedCategories.length === 0)
					$scope.allexp = experiences;
				else {
					$scope.allexp = catsAndExperiences.experiences;

				}
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
