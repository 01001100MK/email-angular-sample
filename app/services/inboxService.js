"use strict";

angular.module("inboxService", [])
    .factory("Inbox", ["$http", "Users", function($http, Users) {
        //create a new object
        var inboxService = {};

        inboxService.get = function(username) {
            return $http.get('/api/inbox/' + username);
        };

        inboxService.getDetail = function(id) {
            return $http.get('/api/inbox/detail/' + id);
        };

        // Insert email into Inbox table
        inboxService.post = function(email) {
            return $http.post('/api/inbox/', email);
        };

        inboxService.isInbox = function() {
            return Users.getSource() === 'inbox';
        };

        inboxService.getUnreadCount = function() {
            return $http.get('/api/inbox/unread/count');
        };

        inboxService.setRead = function(id) {
            return $http.put('/api/inbox/read/' + id);
        };
        inboxService.setUnread = function(id) {
            return $http.put('/api/inbox/unread/' + id);
        };

        return inboxService;
    }]);
