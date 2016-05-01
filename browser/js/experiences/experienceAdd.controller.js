app.controller('experienceAddCtrl',function($scope,experiencesFactory,categories){
	$scope.addExperience=function(experienceObj){
		experienceObj.tempQuantity=experienceObj.quantity;
		console.log(experienceObj);
		experiencesFactory.add(experienceObj)
		.then(function(newRecord){
			console.log('newrecord =');
			console.log(newRecord);
		});
		
	};
	$scope.categories=categories;
});