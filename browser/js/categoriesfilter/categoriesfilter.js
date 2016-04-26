app.factory('CategoriesFactory', function ($http) {
  var factory = {};
  factory.fetchAll = function () {
    return $http.get('/api/categories')
      .then(function (response) {
        var categories = response.data;
        return categories;
      })
  }

  factory.fetchExperiencesByCategory = function (category) {
    return $http.get('/api/categories/' + category._id + '/experiences')
      .then(function (response) {
        var experiences = response.data;
        return experiences;
      })
  }

  factory.removeCatAndExp = function (experiences, categories, category) {
    var catsAndExperiences = {};
    var categoryIdx = categories.indexOf(category);
    experiences = experiences.filter(function (experience) {
      return experience.category._id !== category._id;
    })
    categories.splice(categoryIdx, 1);
    catsAndExperiences.experiences = experiences;
    catsAndExperiences.categories = categories;
    return catsAndExperiences;
  }

  factory.addCatAndExp = function (experiences, categories, category) {
    if (categories.length === 0) experiences = [];
    var catsAndExperiences = {};
    categories.push(category);
    return this.fetchExperiencesByCategory(category)
      .then(function (newExperiences) {
        experiences = experiences.concat(newExperiences);
        catsAndExperiences.experiences = experiences;
        catsAndExperiences.categories = categories;
        return catsAndExperiences;
      })
  }

  return factory;

})
