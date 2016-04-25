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

  $scope.cart = cart;

  $scope.addToCart = function (lineItem) {
    CartFactory.addToCart(lineItem, $scope.cart)
      .then(function (cart) {
        $scope.cart = cart;
      })
  }

  $scope.removeFromCart = function (lineItem) {
    CartFactory.removeFromCart(lineItem, $scope.cart)
      .then(function (modifiedCart) {
        console.log('this is the cart htat is returned to scope: ', modifiedCart);
        $scope.cart = modifiedCart;
      })
  }
})

app.factory('CartFactory', function ($http) {
  var factory = {};

  var depopulateLineItemsArr = function (lineItems) {
    var depopulatedLineItems = lineItems.map(function (lineItem) {
      var depopulatedLineItem = {};
      depopulatedLineItem.experienceId = lineItem.experienceId._id;
      depopulatedLineItem.quantity = lineItem.quantity;
      return depopulatedLineItem;
    })
    console.log('depopulated line items', depopulatedLineItems);
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
        return cart;
      })
  }

  factory.addToCart = function (lineItem, cart) {
    var lineItems = depopulateLineItemsArr(cart.lineItems);
    lineItems.push(lineItem._id);
    return $http.put('/api/cart/' + cart._id, lineItems)
      .then(function (response) {
        var modifiedCart = response.data;
        return modifiedCart;
      })
  }

  factory.removeFromCart = function (lineItem, cart) {
    var lineItemIdx = cart.lineItems.indexOf(lineItem);
    console.log('found index', lineItemIdx);
    cart.lineItems.splice(lineItemIdx, 1);
    console.log('line items before depopulate', cart.lineItems);
    var depopulatedLineItems = depopulateLineItemsArr(cart.lineItems);
    console.log('this should be ' + depopulatedLineItems.length, depopulatedLineItems);
    return $http.put('/api/cart/' + cart._id, { lineItems: depopulatedLineItems })
      .then(function (response) {
        var modifiedCart = response.data;
        return modifiedCart;
      })
  }

  return factory;

})
