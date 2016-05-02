app.controller('experienceAddCtrl',function($scope,experiencesFactory,categories){
	$scope.newExperience= {
      "name": "abc de gga",
      "shortDescription": "this is for all the chocolate ullam nostrum. Debitis est quod perferendis iusto numquam.",
      "description": "chocolate or nestle whatever it'll be ab consequatur rerum itaque impedit aut necessitatibus. Soluta non voluptatem. Non veniam architecto eligendi aut at velit beatae laboriosam ut.\n \rIpsum voluptatibus quisquam in. Quia id officiis eaque voluptate. Cumque itaque incidunt quo ex tempore totam repellat voluptatem.\n \rEst provident ipsa nostrum qui culpa quod qui porro. Nulla enim sint velit sed adipisci ducimus distinctio magni. Autem quasi sed veritatis at animi. Doloribus iure asperiores dolor quas voluptas amet in. Itaque in cum vero velit aut.",
      "quantity": "5",
      "price": 100,
      "address":{"address": "275 South Mall",
      "city": "Lake Booyah",
      "state": "California",
      "postalCode": "95119-0581",
      "country": "USA"},
      "__v": 0,
      "categories": [
        {
          "_id": "571b9256341b5676199ce075",
          "name": "Not for the faint of heart",
          "__v": 0
        }
      ],
      "photoUrl": "http://lorempixel.com/640/480/nightlife"
    };
	$scope.newExperience.categories=[];

	$scope.addCategory=function(){
		$scope.newExperience.push($scope.tempdata.selectedCategory);
	};

	$scope.addExperience=function(){
		delete $scope.newExperience.selectedCategory;
		$scope.newExperience.tempQuantity=$scope.newExperience.quantity;
		$scope.newExperience.ratingAverage='0';
		console.log($scope.newExperience);
		experiencesFactory.add($scope.newExperience)
		.then(function(newRecord){
			console.log('newrecord =');
			console.log(newRecord);
		});
		
	};
	$scope.categories=categories;
});