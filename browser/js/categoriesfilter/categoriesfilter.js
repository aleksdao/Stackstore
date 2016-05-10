app.factory('CategoriesFactory', function ($http) {
  var factory = {};
  factory.fetchAll = function () {
    return $http.get('/api/categories')
      .then(function (response) {
        var categories = response.data;
        return categories;
      })
  }

  return factory;

})
