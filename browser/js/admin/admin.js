app.config(function($stateProvider){
	$stateProvider
		.state('admin', {
			url : '/admin',
			controller : 'adminCtrl',
			templateUrl : '/js/admin/admin.html'
		});
});

