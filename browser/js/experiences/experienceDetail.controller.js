app.controller('experienceDetailCTRL', function ($scope, experiencesFactory, experience, CartFactory) {
	$scope.experience = experience;



	$scope.addToCart	= function(id){
		CartFactory.fetchCart()
		.then(function(cart){
			CartFactory.addToCart(id, cart);
		});
	};
});
