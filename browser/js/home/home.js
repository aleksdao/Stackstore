app.config(function ($stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        controller : 'redirectCTRL'
    });
});

app.controller('redirectCTRL', function($scope,$state){
		$state.go('experiences');
});