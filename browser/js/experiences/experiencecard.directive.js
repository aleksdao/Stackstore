app.directive('experienceCard',function(){
	return{
		restrict : 'AE',
		templateUrl : '/js/experiences/directive-views/experience-card.html'
	};
});
app.directive('experienceSmall',function(){
	return{
		restrict : 'AE',
		templateUrl : '/js/experiences/directive-views/experience-card-small.html'
	};
});
app.directive('review',function(){
	return{
		restrict : 'AE',
		templateUrl : '/js/experiences/directive-views/experience-review.html'
	};
});
