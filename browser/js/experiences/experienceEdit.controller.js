app.controller('experienceEditList',function($scope,experiencesFactory,experiences){
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
$scope.allexp=experiences;
});


app.controller('experienceEditCtrl',function($scope,experiencesFactory,experience,categories){
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
$scope.newExperience=experience;
$scope.categories=categories;
});