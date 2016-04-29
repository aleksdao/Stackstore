app.controller('adminCtrl',function($scope){
	$scope.adminFunctions=[
	{label : 'Manager Experiences', value : 'editexp', url : 'editexp'},
	{label : 'View Orders', value : 'vieworders', url : 'vieworders'},
	{label : 'View', value : 'viewusers', url : 'viewusers'}
	];
});