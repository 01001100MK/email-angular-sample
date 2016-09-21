"use strict";

angular.module("maincontentService", [])
    .factory("Maincontent", ["$http", "Users", "Inbox", "Outbox", "Draft", "Trash",
        function($http, Users, Inbox, Outbox, Draft, Trash) {
            var maincontentService = {};

            // Get emails from respective table according to route
            maincontentService.getEmails = function(route, user) {
                var result = [];
                if (route === 'inbox') {
                    Inbox.get(user).success(function(emails) {
                        result = emails;
                    });
                } else if (route === 'outbox') {
                    Outbox.get(user).success(function(emails) {
                        result = emails;
                    });
                } else if (route === 'draft') {
                    Draft.get(user).success(function(emails) {
                        result = emails;
                        console.log(result);
                        return result;
                    });
                } else {
                    Trash.get(user).success(function(emails) {
                        result = emails;
                    });
                }

                // return result;
            };

            return maincontentService;
        }
    ]);
