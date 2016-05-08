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
            (function() {
                var i=0;
                var actionsarray=['SURF','SURF','RIDE','RIDE','RIDE','RIDE','SKI','RUN','RUN','CLIMB','DARE','DREAM','DREAM','LIVE','LIVE'];
                    setInterval(function(){
                        if(i >= actionsarray.length){return};
                        document.getElementById('actions').innerHTML='<md-button class="gobutton"><h1 class="splashaction">'+actionsarray[i]+'</h1></md-button>';
                        if(i == actionsarray.length-1){document.getElementById('actions').innerHTML='<div class="gobuttonlast"><h1 class="splashaction">'+actionsarray[i]+'</h1></div>'; }
                        i++;
                    },700);



            })();
        }
     });

});
