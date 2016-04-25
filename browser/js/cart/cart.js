app.config(function ($stateProvider) {
  $stateProvider
    .state('cart', {
      url: '/cart',
      templateUrl: 'js/cart/cart.html',
      controller: 'CartCtrl',
      resolve: {
        cart: function (CartFactory) {
          return CartFactory.fetchCart();
        }
      }
    })
})

app.controller('CartCtrl', function ($scope, cart, CartFactory) {
  console.log(cart);
  $scope.cart = cart;

  $scope.addToCart = function (lineItem) {
    CartFactory.addToCart(lineItem, $scope.cart)
      .then(function (cart) {
        $scope.cart = cart;
      })
  }

  $scope.removeFromCart = function (lineItem) {
    CartFactory.removeFromCart(lineItem, $scope.cart)
      .then(function (cart) {
        $scope.cart = cart;
      })
  }
})

app.factory('CartFactory', function ($http) {
  var factory = {};

  var depopulateLineItemsArr = function (lineItems) {
    var depopulatedLineItems = lineItems.map(function (lineItem) {
      var depopulatedLineItem = {};
      depopulatedLineItem.experienceId = lineItem.experienceId;
      depopulatedLineItem.quantity = lineItem.quantity;
      return depopulatedLineItem;
    })
    return depopulatedLineItems;
  }

  //Alex: I seeded the database with a cart for every single user, so the
  //below always returns a cart. I think any time a new user is created,
  //a corresponding cart should also be created. that functionality still
  //needs to be added

  factory.fetchCart = function () {
    return $http.get('/api/cart')
      .then(function (response) {
        var cart = response.data;
        if (cart) {
          console.log('found cart', cart._id)
          return cart;
        }

      })
  }

  factory.addToCart = function (lineItem, cart) {
    var lineItems = depopulateLineItemsArr(cart.lineItems);
    lineItems.push(lineItem._id);
    return $http.put('/api/cart/' + cart._id, lineItems)
      .then(function (response) {
        var cart = response.data;
        return cart;
      })
  }

  factory.removeFromCart = function (lineItem, cart) {
    var lineItems = depopulateLineItemsArr(cart.lineItems);
    var lineItemIdx = lineItems.indexOf(lineItem._id);
    lineItems.splice(lineItemIdx, 1);
    return $http.put('/api/cart/' + cart._id, lineItems)
      .then(function (response) {
        var cart = response.data;
        return cart;
      })
  }

  return factory;

})
