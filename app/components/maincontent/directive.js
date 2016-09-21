"use strict";

angular.module('app.directives.maincontent', ['inboxService', 'userService'])
    .directive('mainContent', [function() {
        return {
            restrict: 'E',
            templateUrl: 'components/maincontent/template.html',
            controller: ['$scope', '$http', '$location', 'Inbox', 'Outbox', 'Draft', 'Users',
            function($scope, $http, $location, Inbox, Outbox, Draft, Users) {
                // Initialize
                $scope.mail = {};

                // Check user logged in or not
                if (!Users.isLoggedIn()) {
                    $location.path('/login');
                }

                // Read message
                $scope.toDetail = function(id) {
                    $location.path('/detail/' + id);
                }

                // List all messages in Inbox
                var user = Users.getUserEmail();
                $scope.route = Users.getSource();

                if ($scope.route === 'inbox') {
                    Inbox.get(user).success(function(emails) {
                        $scope.emails = emails;
                    });
                } else if ($scope.route === 'outbox') {
                    Outbox.get(user).success(function(emails) {
                        $scope.emails = emails;
                    });
                } else {
                    Draft.get(user).success(function(emails) {
                        $scope.emails = emails;
                    });
                }

                // Read message
                $scope.logOut = function() {
                    Users.logOut();
                    $location.path('/login');
                }

            }]
        };
    }]);
