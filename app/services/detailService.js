"use strict";

angular.module("detailService", [])
    .factory("Detail", ["$http", "$cookies", "Inbox", "Outbox", "Draft", "Trash",
        function($http, $cookies, Inbox, Outbox, Draft, Trash) {

            var detailService = {};

            detailService.isDraft = function() {
                return $cookies.get("source") === 'draft';
            };

            // Get email clicked in detail viewed
            detailService.get = function(route, id, callback) {
                if (route === 'inbox') {
                    Inbox.getDetail(id).success(function(email) {
                        callback(email);
                    });
                } else if (route === 'outbox') {
                    Outbox.getDetail(id).success(function(email) {
                        callback(email);
                    });
                } else if (route === 'draft') {
                    Draft.getDetail(id).success(function(email) {
                        callback(email);
                    });
                } else if (route === 'trash') {
                    Trash.getDetail(id).success(function(email) {
                        callback(email);
                    });
                } else {
                    console.log('Get star email');
                    var source = $cookies.get('starsource');
                    $http.get('/api/' + source + '/detail/' + id).success(function(email) {
                        callback(email);
                    });
                }
            };

            return detailService;
        }
    ]);
