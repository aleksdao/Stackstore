app.config(function ($stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: '/js/home/home.html',
        controller : function($scope,$state){
          $scope.video = {
            id: 'eZp2CQgxs9c'
          };
          $scope.resources = [
            // 'http://techslides.com/demos/sample-videos/small.webm',
            '*.ogv',
            '/video/Experience_Splash.mp4',
        ];
        $scope.poster = 'http://placehold.it/2000&text=you%20may%20want%20to%20have%20a%20poster';
        $scope.fullScreen = false;
        $scope.muted = true;
        $scope.zIndex = '99';
        $scope.playInfo = {};
        $scope.pausePlay = true;
        }
     });
});
