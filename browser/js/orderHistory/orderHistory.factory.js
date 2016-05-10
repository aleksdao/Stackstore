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
