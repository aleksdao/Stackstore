app.factory('CategoriesFactory', function ($http) {
  var factory = {};
  factory.fetchAll = function () {
    return $http.get('/api/categories')
      .then(function (response) {
        var categories = response.data;
        return categories;
      })
  }

  factory.fetchProductsByCategory = function (category) {
    return $http.get('/api/categories/' + category._id)
      .then(function (response) {
        var products = response.data;
        return products;
      })
  }

  factory.toggleCategory = function (categories, category) {
    var categoryIdx = categories.indexOf(category);
    if (categoryIdx === -1) {
      categories.push(category);
    }
    else {
      categories.splice(categoryIdx, 1);
    }
    return $http.get('/api/experiences')
      .then(function (response) {
        var catsAndExperiences = {};
        var allExperiences = response.data;
        categories = categories.map(function (category) {
          return category._id;
        })
        var experiencesWithCats = allExperiences.filter(function (experience) {
          return (categories.indexOf(experience.category._id) >= 0);
        })
        catsAndExperiences.experiences = experiencesWithCats;
        catsAndExperiences.categories = categories;
        return catsAndExperiences;
      })
  }

  return factory;

})
