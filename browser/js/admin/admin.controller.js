app.controller('adminCtrl',function($scope){
/*
TODO
Create and edit products with name, description, price and one or more photos
Create categories for items, each item can have multiple categories
Manage the availability of a product. If a product is no longer available, users will not see it while browsing, but they can view the product detail page if they've ordered it previously or have a direct link. On that product detail page, it should say "Currently Unavailable"
*/
/* TODO
View a list of all orders
Filter orders by status (Created, Processing, Cancelled, Completed)
Change the status of the order (Created -> Processing, Processing -> Cancelled || Completed)
View details of a specific order
*/
/*
TODO
Promote other user accounts to have admin status
Delete a user
Trigger password reset for a user (next time they successfully log in—with their old password—they are prompted for a new one)
*/

	$scope.adminFunctions=[
		{label : 'Manager Experiences', value : 'editexp', url : 'manageexp',actions:[
																						{label : 'Add Experiences', value : 'newExperience'},
																						{label : 'Manage Availability', value : 'managestock'},
																						{label : 'Edit Experiences', value : 'listAllForEdit'},
																						{label : 'Manager Categories', value : 'editCategories'}
																						]},
		{label : 'Manage Orders', value : 'manageorders', url : 'manageorders',actions:[
																						{label : 'View all Orders', value : 'viewOrder'},
																						]},
		{label : 'Manage Users', value : 'manageusers', url : 'manageusers',actions:[
																						{label : 'Manage User', value : 'manageUsers'},
																						{label : 'Manage Admins', value : 'manageadmin'}
																						]}
	];
});
