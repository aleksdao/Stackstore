app.factory('ForgotPasswordFactory', function ($http) {
  var factory = {};
  factory.forgotPassword = function (email) {
    return $http.post('/forgot', { email: email })
      .then(function (response) {
        return response.data;
      })
  }

  factory.resetPassword = function (token, password) {
    return $http.post('/api/reset/' + token, { password: password })
      .then(function (response) {
        return response.data;
      })
  }

  factory.confirmToken = function (token) {
    console.log('do we get in here', token);
    return $http.get('/api/reset/' + token)
      .then(function (response) {
        console.log('resposne.data', response.data);
        return response.data;
      })
  }

  return factory;
})

app.config(function ($stateProvider) {

  $stateProvider
    .state('forgotPassword', {
      url: '/forgot',
      templateUrl: '/js/forgot/forgot.html',
      controller: function ($scope, ForgotPasswordFactory, $timeout, $state) {
        $scope.forgotPassword = function (email) {
          ForgotPasswordFactory.forgotPassword(email)
            .then(function (successMsg) {
              if (successMsg) {
                $scope.successMsg = successMsg;
                $scope.forgot.email = null;
              }
              else {
                $scope.error = 'We could not find that e-mail in the database. Please try again.'
              }
              // console.log(response);
              // $scope.error = error;
            })
        }
      }
    })
    .state('resetPassword', {
      url: '/reset/:token',
      templateUrl: '/js/forgot/reset.html',
      resolve: {
        foundUser: function (ForgotPasswordFactory, $stateParams) {
          return ForgotPasswordFactory.confirmToken($stateParams.token);
        }
      },
      controller: function ($scope, ForgotPasswordFactory, $stateParams, foundUser, $state, $timeout) {
        if (foundUser) {
          $scope.user = foundUser;
        }
        else {
          $scope.error = 'Password reset token is invalid or has expired.';
        }

        $scope.resetPassword = function (password) {
          ForgotPasswordFactory.resetPassword($stateParams.token, password)
            .then(function (response) {
              console.log(response);
              $scope.confirm = true;
              $scope.resetPassword = null;
              $timeout(function () {
                $state.go('login')
              }, 3000);
            })
        }
      }
    });
});
