app.config(function ($stateProvider) {
  $stateProvider
    .state('orderConfirmationPage', {
      url: '/orderConfirmationPage',
      templateUrl: 'js/orderConfirmation/orderConfirmation.html',
      controller: 'orderConfirmationCtrl',
      params: {
        confirmation: {}
      },
      resolve: {
        confirmation: function ($stateParams) {
          return $stateParams.confirmation;
        }
      }
    });
});
