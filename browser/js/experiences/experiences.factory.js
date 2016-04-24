app.factory('experiences',function($http){
	
	return{
		fetchAll : function(){
			return $http.get('/api/experiences/')
			.then(function(result){
				return result.data;
			},function(err){
				return err;
			});
		},
		fetch : function(id){
			return $http.get('/api/experiences/'+id)
			.then(function(result){
				return result.data;
			},function(err){
				return err;
			});	
		},
		add : function(data){
			return $http.post('/api/experiences/')
			.then(function(newExp){
				return newExp.data;
			},function(err){
				return err;
			});
		},
		update : function(id,data){
			return $http.put('/api/experiences/'+id)
			.then(function(newExp){
				return newExp.data;
			},function(err){
				return err;
			});
		},
		remove : function(id){
			return $http.delete('api/experiences/'+id)
			.then(function(deletedExp){
				return 'experience delete';
			},function(err){
				return err;
			});
		},
		
	};
});