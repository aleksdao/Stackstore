// app.factory('OrderHistoryFactory', function ($http, user, orders) {
//   var factory = {};
//
//   factory.fetch = function () {
//     console.log('in here');
//     return $http.get('/api/orders/'+ user._id)
//       .then(function (response) {
//         var orders = response.data;
//         return orders;
//       });
//     };
//
//   return factory;
// });
