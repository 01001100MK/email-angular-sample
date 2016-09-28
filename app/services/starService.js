"use strict";

angular.module("starService", [])
.factory("Star", ["$http", "Users", function($http, Users) {
    //create a new object
    var starService = {};

    starService.get = function(username) {
        return $http.get('/api/star/' + username);
    };


	starService.getDetail = function(id) {
					
	};

		
	starService.toggleOn = function(id, route) {
		return $http.put('/api/star/' + route + '/on/' + id);
	};
	
	starService.toggleOff = function(id, route) {
		return $http.put('/api/star/' + route + '/off/' + id);
	};

    return starService;
}]);
