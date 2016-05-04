app.controller('experienceAddCtrl',function($scope,experiencesFactory,categories,experience){
	$scope.newExperience= {
      "name": "",
      "shortDescription": "",
      "description": "",
      "quantity": "",
      "price": '',
      "address" : { "address": "",
      "city": "",
      "state": "",
      "postalCode": "",
      "country": ""},
      "category":{},
      "photoUrl": ""
    };
	//$scope.newExperience.category=[];
if(experience.id !== undefined){
	$scope.newExperience=experience;
}
$scope.newExperience=experience;
console.log(experience);

	$scope.addCategory=function(){
		$scope.newExperience.category=JSON.parse($scope.tempdata.selectedCategory);
	};

	$scope.addExperience=function(){
		$scope.newExperience.tempQuantity=$scope.newExperience.quantity;
		$scope.newExperience.ratingAverage='0';
		experiencesFactory.add($scope.newExperience)
		.then(function(newRecord){
			$scope.newExperience=newRecord;
		});
	};

	$scope.editExperience=function(){
		//delete $scope.newExperience._id
		experiencesFactory.update($scope.newExperience._id,$scope.newExperience)
		.then(function(newRecord){
			$scope.newExperience=newRecord;
		});
	};	

	$scope.sendExperience=function(){
		if($scope.newExperience._id !== undefined){
			$scope.editExperience();
			
		}else{
			$scope.addExperience();
		}
	};

	$scope.categories=categories;
});