app.factory('CategoriesFactory', function ($http) {
  var factory = {};
  factory.fetchAll = function () {
    return $http.get('/api/categories')
      .then(function (response) {
        var categories = response.data;
        return categories;
      });
  };

  factory.fetchExperiencesByCategory = function (category) {
    return $http.get('/api/categories/' + category._id + '/experiences')
      .then(function (response) {
        var experiences = response.data;
        return experiences;
      });
  };

  factory.removeCatAndExp = function (experiences, categories, category) {
    var catsAndExperiences = {};
    var categoryIdx = categories.indexOf(category);
    experiences = experiences.filter(function (experience) {
      return experience.category._id !== category._id;
    });
    categories.splice(categoryIdx, 1);
    catsAndExperiences.experiences = experiences;
    catsAndExperiences.categories = categories;
    return catsAndExperiences;
  };

  factory.addCatAndExp = function (experiences, categories, category) {
    //very modest concern -- but we are modifying collections which get passed in here--
    //that could be intent-- which is fine-- just be aware of it
    //http://stackoverflow.com/questions/25509977/q-promise-equivalent-of-bluebird-promise-bind
    // just a thought-- but the bluebird promise library has something 
    // called bind which allows you to flatten out your promises even more... sometimes if you have a lot going on in a then-- it allows you to break things down a bit... something to think about-- if nothing else-- you might want to look at bluebird on the client-- again just a thought.
    if (categories.length === 0) experiences = [];
    categories.push(category);
    return this.fetchExperiencesByCategory(category)
      .then(function (newExperiences) {
        experiences = experiences.concat(newExperiences);
      })
      .then(function(){
        var catsAndExperiences = {};
        catsAndExperiences.experiences = experiences;
        catsAndExperiences.categories = categories;
        return catsAndExperiences;
      });
  };

  return factory;

});
