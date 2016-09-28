"use strict";

angular.module('app.directives.star', [])
    .directive('starForm', [function() {
        return {
            restrict: 'E',
            templateUrl: 'components/star/template.html',
            controller: ['$scope', '$http', '$cookies', '$location', 'Inbox', 'Outbox', 'Draft', 'Trash',
                'Users', 'Maincontent', 'Star',
                function($scope, $http, $cookies, $location, Inbox, Outbox, Draft, Trash, Users, Maincontent, Star) {
                    // Initialize
                    $scope.route = 'star';
                    
                    $scope.changeRoute = function(route) {
                        $location.path('/' + route);
                        Users.setSource(route);
                    };

                    // compose doesn't need to Users.setSource('compose') otherwise it introduces a bug.
                    $scope.compose = function() {
                        $location.path('/compose');
                    };

                    $scope.mail = {};
                    var user = Users.getUserEmail();
                    var route = Users.getSource();
                    $scope.emails = [];

                    Star.get(user).success(function(emails) {
                        $scope.emails = emails;
                    });

                    $scope.toDetail = function(email) {
                        // temp coding
                        $cookies.put("starsource", email.source)
                        $location.path('/detail/' + email.id);
                    };

                    $scope.starOff = function(email) {
                        $http.put('/api/star/' + email.source + '/off/' + email.id).success(function(res) {
                            Star.get(user).success(function(emails) {
                                $scope.emails = emails;
                            });
                        });
                    };

                }
            ]
        };
    }]);
