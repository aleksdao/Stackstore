var experiencesFactory , $httpBackend, $rootScope, experienceContoller;
describe('experiencesController',function(){
	beforeEach(module('FullstackGeneratedApp'));
	beforeEach(inject(function(_experiencesFactory_,_$httpBackend_,_$controller_,_$rootScope_){
		experiencesFactory=_experiencesFactory_
		$httpBackend = _$httpBackend_;
		$rootScope = _$rootScope_;
		$controller = _$controller_;
	}));
	it('checks that the controller exists',function(){
		var $scope = $rootScope.$new();
		var experienceContoller = $controller('experiencesCTRL',{ $scope : $scope} );
		expect(experienceContoller).to.be.ok;
	});
	it('to have experiences',function(){
		var $scope = $rootScope.$new();
		var experienceContoller = $controller('experiencesCTRL',{ $scope : $scope} );
		expect($scope.experiences).to.be.ok;
	});
	
});