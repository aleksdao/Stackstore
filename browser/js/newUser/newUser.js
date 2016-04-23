app.config(function ($stateProvider) {

  $stateProvider.state('newUser', {
      url: '/newUser',
      templateUrl: 'js/newUser/newUser.html',
      controller: 'newUserCtrl',
    });
});

app.factory('newUserFactory', function ($http) {
  return {
    createNewUser: function (newUser) {
      return $http.post('/api/members/', newUser)
        .then(function (user) {
          return user;
        });
    },
  };  //end return
}); //end factory

app.controller('newUserCtrl', function ($scope, AuthService, $state, newUserFactory) {

  $scope.newUser = {};
  $scope.error = null;
  $scope.userExists = false;

  function sendLogin(loginInfo) {
    AuthService.login(loginInfo).then(function () {
          $state.go('home');
        }).catch(function () {
          $scope.error = 'Invalid login credentials.';
        });
  }// end sendLogin

  $scope.sendCreateUser = function () {
    newUserFactory.createNewUser($scope.newUser)
      .then(function (user) {
        sendLogin($scope.newUser);
      }).catch(function (response) {
        $scope.error = response.data.message;
        $scope.userExists = true;
      });
  };  //end sendCreateUser

});
