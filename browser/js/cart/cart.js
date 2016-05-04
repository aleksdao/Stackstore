app.config(function ($stateProvider) {
  $stateProvider
    .state('cart', {
      url: '/cart',
      templateUrl: 'js/cart/cart.html',
      controller: 'CartCtrl',
      resolve: {
        cart: function (CartFactory) {
          return CartFactory.fetchCart();
        },
      }
    });
});


app.controller('CartCtrl', function ($scope, $state, cart, CartFactory, UserFactory, $http) {

  $scope.cart = cart;

  $scope.checkout = function () {
    $state.go('checkout');
  };

  $scope.expire = function () {
    $http.get('/api/cart/expire')
  }

  $scope.addToCart = function (lineItem) {
    CartFactory.addToCart($scope.cart, experience)
      .then(function (cart) {
        $scope.cart = cart;
      });
  };

  $scope.removeFromCart = function (lineItem) {
    CartFactory.removeFromCart(lineItem, $scope.cart)
      .then(function (modifiedCart) {
        $scope.cart = modifiedCart;
      });
  };

  $scope.getSubtotal = function (cart) {
    return CartFactory.getSubtotal(cart);
  };

//following function is tied to number picker
  $scope.updateCart = function(lineItem){
    if (lineItem.quantity === 0) {
      $scope.removeFromCart(lineItem);
    } else {
      CartFactory.updateCart($scope.cart);
    }
  };

});
///////////////begin CartFactory
app.factory('CartFactory', function ($http, ngToast) {
  var factory = {};

  var depopulateLineItemsArr = function (lineItems) {
    var depopulatedLineItems = lineItems.map(function (lineItem) {
      var depopulatedLineItem = {};
      depopulatedLineItem.experienceId = lineItem.experienceId._id;
      depopulatedLineItem.quantity = lineItem.quantity;
      depopulatedLineItem.dateAdded = lineItem.dateAdded;
      depopulatedLineItem.expired = lineItem.expired;
      return depopulatedLineItem;
    });
    return depopulatedLineItems;
  };

  //Alex: The following function retrieves the cart. A cart is always returned
  //whether it is via sessionID from non-logged-in-user or via userId from logged
  //in user. check routes/cart/index.js to see the logic

  factory.fetchCart = function () {
    return $http.get('/api/cart')
      .then(function (response) {
          var cart = response.data;
          return cart;
      });
  };


  factory.addToCart = function (cart, experience) {
    var lineItems;
    if(cart.lineItems)
      lineItems = depopulateLineItemsArr(cart.lineItems);
    else {
      lineItems = [];
    }
    var experienceIsInCart = false;

    lineItems = lineItems.map(function (lineItem) {
      if (lineItem.experienceId === experience._id) {
        experienceIsInCart = true;
        lineItem.quantity += 1;
      }
      return lineItem;
    });
    if (!experienceIsInCart) {
      var newLineItem = {};
      newLineItem.experienceId = experience._id;
      newLineItem.quantity = 1;
      newLineItem.dateAdded = Date.now();
      console.log('here is the line item getting added to lineItems array', newLineItem);
      lineItems.push(newLineItem);
    }
    experience.tempQuantity--;


    var toReturn = {};

    return $http.put('/api/experiences/' + experience._id, experience)
      .then(function (response) {
        console.log(response.data);
        toReturn.tempQuantity = response.data.tempQuantity;
        return $http.put('/api/cart/' + cart._id, { lineItems: lineItems });
      })
      .then(function (response) {
        // var modifiedCart = response.data;
        toReturn.modifiedCart = response.data;
        return toReturn;
      });


  };

  factory.removeFromCart = function (lineItem, cart) {
    var lineItemIdx = cart.lineItems.indexOf(lineItem);
    cart.lineItems.splice(lineItemIdx, 1);
    var depopulatedLineItems = depopulateLineItemsArr(cart.lineItems);
    return $http.put('/api/cart/' + cart._id, { lineItems: depopulatedLineItems })
      .then(function (response) {
        var modifiedCart = response.data;
        ngToast.create({
          className: 'danger',
          content: '<h2>Item removed from Cart</h2>'
        });//end ngToast.create

        return modifiedCart;
      });
  };

  factory.getSubtotal = function (cart) {
    var subtotal = 0;
    cart.lineItems.forEach(function (lineItem) {
      if (!lineItem.expired) {
        subtotal += lineItem.quantity * lineItem.experienceId.price;
      }

    });
    return subtotal;
  };

  factory.updateCart = function (cart) {
    return $http.put('/api/cart/' + cart._id, cart)
      .then(function (cart) {
        return cart.data;
      });


  };//end updateCart

  return factory;

});
