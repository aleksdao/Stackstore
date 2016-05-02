app.config(function($stateProvider){
	$stateProvider
		.state('experiences',{
			url:'/experiences',
			templateUrl: '/js/experiences/allexperiences.html',
			controller : 'experiencesCTRL',
			params:	{
				category:	{}
			},
			resolve: {
				categories: function (CategoriesFactory) {
					return CategoriesFactory.fetchAll();
				},
				experiences: function (experiencesFactory) {
					return experiencesFactory.fetchAll();
				},
				breadcrumbCategory:	function($stateParams){
					return	$stateParams.category;
				},
				cart: function (CartFactory) {
					return CartFactory.fetchCart();
				}
			}//end resolve
		})
		.state('experience', {
			url:'/experiences/:id',
			templateUrl: '/js/experiences/experienceDetail.html',
			controller : 'experienceDetailCTRL',
			params:	{
				_experience:	{}
			},
			resolve : {
				experience: function  (experiencesFactory, $stateParams) {
					if($stateParams._experience !== {}){
						console.log('in here', $stateParams._experience);
						return $stateParams._experience;
					}	else {
					return experiencesFactory.fetch($stateParams.id);
				}
				},
				cart: function (CartFactory) {
					return CartFactory.fetchCart();
				}
				// reviews: function(experiencesFactory, $stateParams){
				// 	return experiencesFactory.getReviews($stateParams.id);
				// }
			}
		})
		.state('newExperience', {
			url:'/experiences/new',
			templateUrl: '/js/experiences/new.html'
		});
});
