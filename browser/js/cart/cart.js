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
    })
})

app.controller('CartCtrl', function ($scope, cart, CartFactory, UserFactory, ngToast) {

  // $scope.cart = cart;
  $scope.cart = cart;
  // UserFactory.getCurrentUser(cart.userId)
  //   .then(function (user) {
  //     console.log(user);
  //     $scope.user = user;
  //   });

  $scope.checkout = function () {
    $scope.cart.billingAddress = $scope.billingAddressSelected;
    $scope.cart.shippingAddress = $scope.shippingAddressSelected;
    $scope.cart.subtotal = $scope.getSubtotal($scope.cart);
    return CartFactory.checkout($scope.cart)
      .then(function (order) {
        $scope.order = order;
        ngToast.create({
					className: 'success',
					content: 'Order successfully placed!'
				});
      })
  }


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
        if (response.data) {
          console.log('is this cart', response.data);
          return response;
        }
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
    })
    if (!experienceIsInCart) {
      var newLineItem = {};
      newLineItem.experienceId = experience._id;
      newLineItem.quantity = 1;
      lineItems.push(newLineItem);
    }
    experience.tempQuantity--;


    var toReturn = {};

    return $http.put('/api/experiences/' + experience._id, experience)
      .then(function (response) {
        console.log(response.data);
        toReturn.tempQuantity = response.data.tempQuantity;
        return $http.put('/api/cart/' + cart._id, { lineItems: lineItems })
      })
      .then(function (response) {
        var modifiedCart = response.data;
        toReturn.modifiedCart = response.data;
        return toReturn;
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

  factory.checkout = function (cart) {
    return $http.post('/api/checkout', cart)
      .then(function (response) {
        var order = response.data;
        return order;
      })
  }

  return factory;

})
