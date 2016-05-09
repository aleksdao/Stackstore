app.config(function ($stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: '/js/home/home.html',
        controller : function($scope,$state){
          $scope.video = {
            id: 'eZp2CQgxs9c'
          };
          $scope.resources = [
            '*.ogv',
            '/video/Experience_Splash.mp4',
        ];
        $scope.poster = 'https://www.hillphoto.com/experience_fpo/mike-wiegele-Deluxe-212.jpg';
        $scope.fullScreen = false;
        $scope.muted = true;
        $scope.zIndex = '99';
        $scope.playInfo = {};
        $scope.pausePlay = true;
            (function() {
                var i=0;
                var actionsarray=['SURF','SURF','RIDE','RIDE','RIDE','RIDE','SKI','RUN','RUN','CLIMB','DARE','DREAM','DREAM','LIVE','LIVE'];
                    setInterval(function(){
                        if(i >= actionsarray.length){ return; }
                        if( document.getElementById('actions') !== null){
                          document.getElementById('actions').innerHTML='<md-button class="gobutton"><h1 class="splashaction">'+actionsarray[i]+'</h1></md-button>';
                        }
                        if(i == actionsarray.length-1){document.getElementById('actions').innerHTML='<div class="gobuttonlast"><h1 class="splashaction">'+actionsarray[i]+'</h1></div>'; }
                        i++;
                    },700);



            })();
            setTimeout(function(){
                $state.go('experiences');
            },20000);
        }
     });

});
