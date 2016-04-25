app.config(function ($stateProvider) {

  $stateProvider.state('experience', {
      url: '/experience/:id',
      templateUrl: 'js/experience_detail/experience_detail.html',
      controller: 'experience-detail-CTRL',
      resolve:  {
        experience: function  (experiencesFactory, $stateParams) {
          return experiencesFactory.fetch($stateParams.id);
        },
      },//end resolve
    });
});
