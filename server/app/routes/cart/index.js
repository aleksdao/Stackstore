var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
// var Experience = mongoose.model('Experience');
var Cart = mongoose.model('Cart');
var User = mongoose.model('User');
var CronJob = require('cron').CronJob;
var Promise = require('bluebird');
var Experience = mongoose.model('Experience');

var returnToStock = function (expToUpdate) {
  console.log('returning to stock', expToUpdate);
  var prevExpQuantity;
  return Experience.findById(expToUpdate.id)
    .then(function (experience) {
      prevExpQuantity = experience.tempQuantity;
      experience.tempQuantity += expToUpdate.quantityReturned;
      return experience.save();
    })
    .then(function (updExperience) {
      console.log('returned to Stock: from ', prevExpQuantity, ' to ', updExperience.tempQuantity);
    })
}

//cron job runs every minute

new CronJob('0 5 * * * *', function () {
  console.log('hi there');
  //modify minutes variable to determine how long an item can stay in a user's cart before it is expired and returned to stock
  var minutes = 1;
  var seconds = 60;
  var milliseconds = 1000;
  var expiryInterval = minutes * seconds * milliseconds;
  var experiencesToUpdate = [];
  var cartsToUpdate = [];
  Cart.find({})
    .populate('lineItems.experienceId')
    .then(function (carts) {
      carts.forEach(function (cart) {
        cart.lineItems = cart.lineItems.map(function (lineItem) {
          var expToUpdate = {};
          if (!(Date.now() - lineItem.dateAdded < expiryInterval) && !lineItem.expired) {
            console.log('this line item, ', lineItem.experienceId.name)
            lineItem.expired = true;
            expToUpdate.id = lineItem.experienceId;
            expToUpdate.quantityReturned = lineItem.quantity;
            experiencesToUpdate.push(returnToStock(expToUpdate));
          }
          return lineItem;
        })
        cartsToUpdate.push(cart.save());
      })
      return Promise.all(experiencesToUpdate);
    })
    .then(function () {
      console.log('succesffully updated exps')
      return Promise.all(cartsToUpdate);

    })
    .then(function (carts) {
      console.log('successfully updated carts')

    })
},
  null,
  true,
  'America/New_York'
);

//expire all button on the Cart page hits this route to expire all events that have
//been in cart for 5+ minutes

router.get('/expire', function (req, res, next) {
  var expiryInterval = 30 * 1000;
  var experiencesToUpdate = [];
  var cartsToUpdate = [];
  Cart.find({})
    .populate('lineItems.experienceId')
    .then(function (carts) {
      carts.forEach(function (cart) {
        cart.lineItems = cart.lineItems.map(function (lineItem) {
          var expToUpdate = {};
          if (!(Date.now() - lineItem.dateAdded < expiryInterval) && !lineItem.expired) {
            console.log('this line item, ', lineItem.experienceId.name)
            lineItem.expired = true;
            expToUpdate.id = lineItem.experienceId;
            expToUpdate.quantityReturned = lineItem.quantity;
            experiencesToUpdate.push(returnToStock(expToUpdate));
          }
          return lineItem;
        })
        cartsToUpdate.push(cart.save());
      })
      return Promise.all(experiencesToUpdate);
    })
    .then(function () {
      console.log('succesffully updated exps')
      return Promise.all(cartsToUpdate);

    })
    .then(function (carts) {
      console.log('successfully updated carts')
      res.send(carts);
    })
})

var ensureAuthenticated = function (req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(401).end();
  }
};

router.get('/', function (req, res, next) {
  var sessionCart;
  var existingUserCart;
  var combineCarts = false;
  var existingUserCart;
  var createNewCart = false;

  if (req.user) {


    Cart.findOne({ userId: req.user._id })
      .populate('lineItems.experienceId')
      .then(function (userCart) {
        if (!userCart) {
          //if no cart for user is found, then check if there is a session cart. if there is a session cart,
          //take the session cart and add the userId to it. the logged in user inherits the session cart.
          //if there is no session cart, create a new cart for the user.

          if (req.session.sessionCart) {
            sessionCart = true;
            req.session.sessionCart = null;
            return Cart.findOneAndUpdate({ sessionId: String(req.sessionID) }, { userId: req.user._id }, { new: true }).populate('lineItems.experienceId');
          }
          else {
            createNewCart = true;
            return Cart.create({ userId: req.user._id });
          }
        }
        else {
          existingUserCart = userCart;
          if (req.session.sessionCart) {
            combineCarts = true;
            req.session.sessionCart = null;
          }
          return Cart.findOne({ sessionId: String(req.sessionID) }).populate('lineItems.experienceId');
        }
      })
      .then(function (retrievedCart) {
        if (!combineCarts) {
          res.send(existingUserCart);
        }
        else if (sessionCart || createNewCart) {
          console.log('sending back sessionCart or new cart');
          res.send(retrievedCart);
        }
        else {
          var sessionLineItems = retrievedCart.lineItems;
          var foundSameItem = false;
          sessionLineItems.forEach(function (sessionLineItem) {
            existingUserCart.lineItems.map(function (userCartLineItem) {
              //why does this require String? the below conditional didn't pass until I casted with String
              if (String(userCartLineItem.experienceId._id) === String(sessionLineItem.experienceId._id)) {

                console.log('found same item');
                foundSameItem = true;
                userCartLineItem.quantity += sessionLineItem.quantity;
              }
              return userCartLineItem;
            });
            if (!foundSameItem) {
              existingUserCart.lineItems.push(sessionLineItem);
            }
          });
          return existingUserCart.save();
        }
      })
      .then(function (combinedCart) {
        if (combineCarts) {
          console.log('sending combined cart');
          res.send(combinedCart);
        }

      });
  }
  else {

    //Todo: I'm currently casting req.sessionID to type String because I haven't
    //figured out how to reference the 'Session' model/schema that is automatically
    //created by the mongo-store. Ideally we would have the Cart schema have a
    //sessionId field with Schema.Types.ObjectId, ref: 'Session' type

    Cart.findOne({ sessionId: String(req.sessionID) })
      .populate('lineItems.experienceId')
      .then(function (foundCart) {
        if (!foundCart) {
          console.log('created a cart for non-logged-in-user from sessionID')
          return Cart.create({ sessionId: String(req.sessionID) });
        }
        else {
          console.log('found a cart for non-logged-in-user from sessionID', foundCart);
          return foundCart;
        }
      })
      .then(function (retrievedCart) {
        req.session.sessionCart = retrievedCart._id;
        res.send(retrievedCart);
      });
  }

});

// currently this is not being used

router.post('/', function (req, res, next) {
  Cart.create({ userId: req.user._id })
    .then(function (createdCart) {
      res.status(201).send(createdCart);
    });
});

//updates the cart
router.put('/:id', function (req, res, next) {
  Cart.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .populate('lineItems.experienceId')
    .then(function (modifiedCart) {
      res.send(modifiedCart);
    });
});

module.exports = router;

// Do we need a delete route? I don't see us ever deleting the cart. Users
// can remove items from the cart but the cart should persist, right?
