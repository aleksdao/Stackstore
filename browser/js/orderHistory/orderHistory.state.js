app.factory('OrderHistoryFactory', function ($http) {
  var factory = {};

  factory.fetch = function (user) {
    console.log('in here');
    return $http.get('/api/orders/'+ user._id)
      .then(function (response) {
        var orders = response.data;
        return orders;
      });
    };

  return factory;
});


app.config(function ($stateProvider) {
  $stateProvider
    .state('orderHistoryPage', {
      url: '/orderHistoryPage',
      templateUrl: 'js/orderHistory/orderHistory.html',
      controller: 'orderHistoryCtrl',
      resolve: {
        user: function  (AuthService) {
          return AuthService.getLoggedInUser();
        },  
        orders: function (OrderHistoryFactory, AuthService) {
          return AuthService.getLoggedInUser()
            .then(function (user) {
              return OrderHistoryFactory.fetch(user);
            });
      }//end orders

    }
    });
});
