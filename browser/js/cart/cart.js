app.config(function ($stateProvider) {
  $stateProvider
    .state('cart', {
      url: '/cart',
      templateUrl: '/js/cart/cart.html',
      controller: 'CartCtrl',
      resolve: {
        cart: function (CartFactory) {
          return CartFactory.fetchCart();
        }
      }
    })
})

app.controller('CartCtrl', function ($scope, cart, CartFactory) {
  $scope.cart = cart;

  $scope.addToCart = function (experience) {
    $scope.cart.experiences.push(experience._id);
    return CartFactory.addToCart($scope.cart._id, $scope.cart.experiences);
  }

  $scope.removeFromCart = function (experience) {
    var experienceIdx = $scope.cart.experiences.indexOf(experience);
    $scope.cart.experiences.splice(experienceIdx, 1);
    return CartFactory.removeFromCart($scope.cart._id, $scope.cart.experiences);
  }
})

app.factory('CartFactory', function ($http) {
  var factory = {};
  factory.fetchCart = function () {
    $http.get('/api/cart')
      .then(function (response) {
        var cart = response.data;
        if (cart) return cart;
        if (!cart) return $http.post('/api/cart');
      })
      .then(function (response) {
        var createdCart = response.data;
        return createdCart;
      })
  }

  factory.addToCart = function (id, experiences) {
    $http.put('/api/cart/' + id, experiences)
      .then(function (response) {
        var cart = response.data;
        return cart;
      })
  }

  factory.removeFromCart = function (id, experiences) {
    $http.put('/api/cart/' + id, experiences)
      .then(function (response) {
        var cart = response.data;
        return cart;
      })
  }

  return factory;

})
