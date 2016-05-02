app.factory('experiencesFactory',function($http){

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
			return $http.post('/api/experiences/',data)
			.then(function(newExp){
				return newExp.data;
			},function(err){
				return err;
			});
		},
		update : function(id,data){
			return $http.put('/api/experiences/'+id,data)
			.then(function(newExp){
				return newExp.data;
			},function(err){
				return err;
			});
		},
		remove : function(id){
			return $http.delete('/api/experiences/'+id)
			.then(function(deletedExp){
				return 'experience '+ deletedExp.data.name +' deleted';
			},function(err){
				return err;
			});
		},
		getReviews : function(id){
			return $http.get('api/experiences/'+ id +'/reviews')
			.then(function(reviews){
				return reviews.data;
			},function(err){
				return err;
			});
		},
		postReview : function(review){
			return $http.post('api/experiences/'+ review.experience +'/reviews', review)
			.then(function(review){
				return review.data;
			},function(err){
				return err;
			});
		},

	};
});
