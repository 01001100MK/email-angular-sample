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

                    // getMails();
                    Maincontent.getEmails(route, user, function(result) {
                        $scope.emails = result;
                    });

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
                        Trash.sendToTrash(email, function(res) {
                            // Refresh email List
                            Maincontent.getEmails(route, user, function(result) {
                                $scope.emails = result;
                            });
                        });
                    };

                    $scope.restore = function(email) {
                        Trash.restore(email, function(res) {
                            Maincontent.getEmails(route, user, function(result) {
                                $scope.emails = result;
                            });
                        });
                    }
                        // Read message
                    $scope.logOut = function() {
                        Users.logOut();
                        $location.path('/login');
                    }

                    //  Determine whether it's trash page and hide Trash icon
                    $scope.isTrash = Trash.isTrash();
                }
            ]
        };
    }]);
