app.factory('UserFactory', function ($http) {
  var factory = {};
  factory.getCurrentUser = function (userId) {
    return $http.get('/api/members/me/' + userId)
      .then(function (response) {
        var user = response.data;
        return user;
      });
  };

  factory.fetchAll = function () {
    return $http.get('/api/members')
      .then(function (response) {
        return response.data;
      })
  }

  return factory;
})
