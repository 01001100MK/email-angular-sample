"use strict";

angular.module("trashService", [])
    .factory("Trash", ["$http", "$cookies", 'Users', function($http, $cookies, Users) {
        var trashService = {};

        trashService.get = function(username) {
            return $http.get('/api/trash/' + username);
        };

        trashService.getDetail = function(id) {
            return $http.get('/api/trash/detail/' + id);
        };

        // Send to trash and delete from the table that is trashed.
        trashService.sendToTrash = function(email) {
            var source = Users.getSource();
            $http.post('/api/trash/', email).success(function() {
                $http.delete('/api/' +  source + '/' + email.id).success(function() {
                    return true;
                });
            });
        };

        return trashService;
    }]);
