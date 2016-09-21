"use strict";

angular.module('app.directives.maincontent', ['inboxService', 'userService'])
    .directive('mainContent', [function() {
        return {
            restrict: 'E',
            templateUrl: 'components/maincontent/template.html',
            controller: ['$scope', '$http', '$location', 'Inbox', 'Outbox', 'Draft', 'Trash', 'Users', 'Maincontent',
                function($scope, $http, $location, Inbox, Outbox, Draft, Trash, Users, Maincontent) {
                    // Initialize
                    $scope.mail = {};
                    var user = Users.getUserEmail();
                    var route = Users.getSource();
                    $scope.emails = [];

                    var getMails = function() {
                        if (route === 'inbox') {
                            Inbox.get(user).success(function(emails) {
                                $scope.emails = emails;
                            });
                        } else if (route === 'outbox') {
                            Outbox.get(user).success(function(emails) {
                                $scope.emails = emails;
                            });
                        } else if (route === 'draft') {
                            Draft.get(user).success(function(emails) {
                                $scope.emails = emails;
                            });
                        } else {
                            Trash.get(user).success(function(emails) {
                                $scope.emails = emails;
                            });
                        }
                    };

                    getMails();

                    // Check user logged in or not
                    if (!Users.isLoggedIn()) {
                        $location.path('/login');
                    }

                    // Read message
                    $scope.toDetail = function(id) {
                        $location.path('/detail/' + id);
                    }

                    // Send to trash
                    $scope.trash = function(email) {
                        Trash.sendToTrash(email);

                        // Refresh email List
                        getMails();
                    };

                    // Read message
                    $scope.logOut = function() {
                        Users.logOut();
                        $location.path('/login');
                    }

                }
            ]
        };
    }]);
