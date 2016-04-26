app.config(function($stateProvider){
	$stateProvider
		.state('experiences',{
			url:'/experiences',
			templateUrl: '/js/experiences/allexperiences.html',
			controller : 'experiencesCTRL',
			resolve: {
				categories: function (CategoriesFactory) {
					return CategoriesFactory.fetchAll();
				},
				experiences: function (experiencesFactory) {
					return experiencesFactory.fetchAll();
				}
			}
		})
		.state('experience',{
			url:'/experiences/:id',
			templateUrl: '/js/experiences/experienceDetail.html',
			controller : 'experiencesCTRL',
			resolve : {
				experience : function(){

				}
			}
	});
});
