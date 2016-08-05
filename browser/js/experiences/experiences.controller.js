app.filter('averageRatingFilter', function () {
	return function (experiences, greaterThanRating) {

		var output = experiences.filter(function (experience) {

			function calcAverageRating (experience)	{
				var sum = 0;
				for (var i = 0; i < experience.reviews.length; i++) {
					sum += experience.reviews[i].rating;
				}//end for
				return (sum/experience.reviews.length);
			}
			var averageRating = calcAverageRating(experience);

			return averageRating >= greaterThanRating;
		});
		return output;
	};
});

app.filter('priceFilter', function () {
	return function (experiences, minPrice, maxPrice) {
		minPrice = minPrice || null;
		maxPrice = maxPrice || null;
		var output = experiences.filter(function (experience) {
			if (maxPrice && minPrice) return experience.price >= minPrice && experience.price <= maxPrice;
			else if (maxPrice && !minPrice) return experience.price <= maxPrice;
			else return experience.price >= minPrice;
		});
		return output;
	};
});

app.filter('categoryFilter', function () {
	return function (experiences, checkedCategories) {
		if (!checkedCategories.length) return experiences;
		checkedCategories = checkedCategories.map(function (category) {
			return category._id;
		});
		var output = experiences.filter(function (experience) {
			return checkedCategories.indexOf(experience.category._id) >= 0;
		});
		return output;
	};
});

app.controller('experiencesCTRL',function($scope, ngToast, experiencesFactory,experiences, $state,$timeout, CategoriesFactory, categories, breadcrumbCategory, cart, CartFactory){

	$scope.allexp = experiences;
	$scope.greaterThanRating = 0;

	$scope.categories = categories;
	$scope.checkedCategories = [];

	$scope.cart = cart;

	// var experience = {}

	//for reviews filter

	$scope.max = 5;
	// $scope.greaterThanRating = 0;
	//end reviews filter

	$scope.gotoDetail=function(exp){
		$state.go('experience',{ id: exp._id , _experience: exp});
	};
	// $scope.isChecked;
	$scope.isSameAsBreadcrumb = function (category) {
		return breadcrumbCategory._id === category._id;
	};

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
	};

	$scope.toggle = function (category) {
		if ($scope.isSelected(category)) {
			$scope.checkedCategories.splice($scope.checkedCategories.indexOf(category), 1);
		}
		else {
			$scope.checkedCategories.push(category);
		}
	};


	function loadCategory () {
		if(breadcrumbCategory.name !== undefined){
			// $scope.checkedCategories.push(category);
			$scope.toggle(breadcrumbCategory);
		}
	}
	loadCategory();

	$scope.selectAll	= function(){
		$scope.checkedCategories = [];
		for (var i = 0; i < $scope.categories.length; i++) {
			$scope.toggle($scope.categories[i]);
		}
	};



});
