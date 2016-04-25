app.controller('experiencesCTRL',function($scope,experiencesFactory){
experiencesFactory.fetchAll()
.then(function(experiences){
	$scope.experiences=experiences;
	//console.log($scope.experiences);
});


});