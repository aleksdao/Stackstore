app.config(function ($stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        controller : function($scope,$state){
 		$state.go('experiences');
    	}
	});
});
