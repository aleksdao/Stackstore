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

  // $scope.cart = cart;
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
        $scope.cart = modifiedCart;
      })
  }

  $scope.getSubtotal = function (cart) {
    return CartFactory.getSubtotal(cart);
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
    return depopulatedLineItems;
  }

  //Alex: The following function retrieves a cart based on the logged in user's
  //id. If it's a new user and cart doesn't exist, we make POST call to /api/cart//
  //to create a cart.

  factory.fetchCart = function () {
    return $http.get('/api/cart')
      .then(function (response) {
        if (response.data)
          return response;
        else {
          return $http.post('/api/cart');
        }
      })
      .then(function (response) {
        var cart = response.data;
        return cart;
      })
  }

  factory.addToCart = function (cart, experience) {
    console.log(cart);
    var lineItems;
    if(cart.lineItems)
      lineItems = depopulateLineItemsArr(cart.lineItems);
    else {
      lineItems = [];
    }
    var newLineItem = {};
    newLineItem.experienceId = experience._id;
    newLineItem.quantity = 1;
    lineItems.push(newLineItem);
    return $http.put('/api/cart/' + cart._id, { lineItems: lineItems })
      .then(function (response) {
        var modifiedCart = response.data;
        return modifiedCart;
      })
  }

  factory.removeFromCart = function (lineItem, cart) {
    var lineItemIdx = cart.lineItems.indexOf(lineItem);
    cart.lineItems.splice(lineItemIdx, 1);
    var depopulatedLineItems = depopulateLineItemsArr(cart.lineItems);
    return $http.put('/api/cart/' + cart._id, { lineItems: depopulatedLineItems })
      .then(function (response) {
        var modifiedCart = response.data;
        return modifiedCart;
      })
  }

  factory.getSubtotal = function (cart) {
    var subtotal = 0;
    cart.lineItems.forEach(function (lineItem) {
      subtotal += lineItem.quantity * lineItem.experienceId.price;
    })
    return subtotal;
  }

  return factory;

})
