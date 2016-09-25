"use strict";

angular.module("maincontentService", [])
    .factory("Maincontent", ["$http", "Users", "Inbox", "Outbox", "Draft", "Trash",
        function($http, Users, Inbox, Outbox, Draft, Trash) {
            var maincontentService = {};

            // Get emails from respective table according to route
            maincontentService.getEmails = function(route, user, callback) {
                var result = [];
                if (route === 'inbox') {
                    Inbox.get(user).success(function(emails) {
                        callback(emails);
                    });
                } else if (route === 'outbox') {
                    Outbox.get(user).success(function(emails) {
                        callback(emails);
                    });
                } else if (route === 'draft') {
                    Draft.get(user).success(function(emails) {
                        callback(emails);
                    });
                } else {
                    Trash.get(user).success(function(emails) {
                        callback(emails);
                    });
                }

                // return result;
            };

            return maincontentService;
        }
    ]);
