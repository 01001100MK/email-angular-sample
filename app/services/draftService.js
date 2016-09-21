"use strict";

angular.module("draftService", [])
    .factory("Draft", ["$http", function($http) {

        var draftService = {};

        draftService.get = function(username) {
            return $http.get('/api/draft/' + username);
        };

        draftService.getDetail = function(id) {
            return $http.get('/api/draft/detail/' + id);
        };

        // Save Draft
        draftService.post = function(mail) {
            return $http.post('/api/draft', mail);
        };

        // Update Draft
        draftService.put = function(mail, id) {
            return $http.put('/api/draft/' + id, mail);
        };

        draftService.delete = function(id)  {
            return $http.delete('/api/draft/' + id);
        };

        return draftService;
}]);
