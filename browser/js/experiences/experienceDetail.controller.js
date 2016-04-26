app.controller('experienceDetailCTRL', function ($scope, experiencesFactory, experience) {
	$scope.experience = experience;
	
	$scope.addToCart	= function(id){
		console.log('item id', id);
	};
});
