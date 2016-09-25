"use strict";

angular.module("outboxService", [])

.factory("Outbox", ["$http", function($http) {

    // create a new object
    var outboxService = {};

    outboxService.get = function(username) {
        return $http.get('/api/outbox/' + username);
    };

    outboxService.getDetail = function(id) {
        return $http.get('/api/outbox/detail/' + id);
    }

    outboxService.post = function(email) {
        return $http.post('/api/outbox/', email);
    }
    
    // return our entire outboxService object
    return outboxService;

}]);
