app.config(function ($stateProvider) {

    $stateProvider.state('newUser', {
        url: '/newUser',
        templateUrl: 'js/newUser/newUser.html',
        controller: 'newUserCtrl'
    });

});

app.factory('newUserFactory', function($http){
  return  {
    createNewUser: function(newUser){
      return  $http.post('/api/members/', newUser)
        .then(function(user){
          return user;
        });
    }
  };//end return
});//end factory

app.controller('newUserCtrl', function ($scope, AuthService, $state, newUserFactory) {

    $scope.newUser = {};
    $scope.error = null;

    $scope.sendCreateUser = function () {
        newUserFactory.createNewUser($scope.newUser)
          .then(function (user) {
            $state.go('home');
        }).catch(function () {
            $scope.error = 'Create New User Failed';
        });
    };
});
