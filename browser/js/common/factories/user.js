app.factory('UserFactory', function ($http) {
  var factory = {};
  factory.getCurrentUser = function (userId) {
    return $http.get('/api/members/me/' + userId)
      .then(function (response) {
        var user = response.data;
        console.log('sending back', user);
        return user;
      });
  };
  return factory;
})
