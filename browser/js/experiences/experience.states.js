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
				}
			}//end resolve
		})
		.state('experience', {
			url:'/experiences/:id',
			templateUrl: '/js/experiences/experienceDetail.html',
			controller : 'experienceDetailCTRL',
			resolve : {
				experience: function  (experiencesFactory, $stateParams) {
					return experiencesFactory.fetch($stateParams.id);
				},
				cart: function (CartFactory) {
					return CartFactory.fetchCart();
				}
			}
		})
		.state('newExperience', {
			url:'/experiences/new',
			templateUrl: '/js/experiences/new.html',
			resolve:{
				categories : function(CategoriesFactory){
					return CategoriesFactory.fetchAll();
				}
			},
			controller:'experienceAddCtrl'
		});
});
