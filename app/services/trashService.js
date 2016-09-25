"use strict";

angular.module("trashService", [])
    .factory("Trash", ["$http", "$cookies", 'Users', 'Inbox', 'Outbox', 'Draft',
        function($http, $cookies, Users, Inbox, Outbox, Draft) {
            var trashService = {};

            trashService.get = function(username) {
                return $http.get('/api/trash/' + username);
            };

            trashService.getDetail = function(id) {
                return $http.get('/api/trash/detail/' + id);
            };

            // Send to trash and delete from the table that is trashed.
            trashService.sendToTrash = function(email, callback) {
                var source = Users.getSource();
                email.source = source;
                $http.post('/api/trash/', email).success(function() {
                    $http.delete('/api/' + source + '/' + email.id).success(function(res) {
                        callback(res);
                    });
                });
            };

            trashService.delete = function(id) {
                return $http.delete('/api/trash/' + id);
            };

            trashService.restore = function(email, callback) {
                var source = email.source;

                if (source === 'inbox') {
                    Inbox.post(email).success(function() {

                    });
                } else if (source === 'outbox') {
                    Outbox.post(email).success(function() {
                        trashService.delete(email.id).success(function(res) {
                            callback(res);
                        });
                    });
                } else if (source === 'draft') {

                }
            };

            trashService.isTrash = function() {
                return Users.getSource() === 'trash';
            }

            return trashService;
        }
    ]);
