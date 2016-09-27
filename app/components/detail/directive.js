"use strict";

angular.module('app.directives.detail', ['inboxService'])
    .directive('detailForm', [function() {
        return {
            restrict: 'E',
            scope: {},
            // replace: true,
            templateUrl: 'components/detail/template.html',
            controller: ['$scope', '$http', '$location', '$routeParams',
                'Users', 'Inbox', 'Outbox', 'Draft', 'Detail', 'Trash',
                function($scope, $http, $location, $routeParams,
                    Users, Inbox, Outbox, Draft, Detail, Trash) {
                    // Initialize
                    $scope.email = {};

                    // Check user logged in or not
                    if (!Users.isLoggedIn()) {
                        $location.path('/login');
                    }

                    // Draft detail needs save draft button
                    $scope.isDraft = Detail.isDraft();

                    // Trash detail needs restore icon
                    $scope.isTrash = Trash.isTrash();

                    // Get Message detail by checking previous route
                    var route = Users.getSource();
                    Detail.get(route, $routeParams.id, function(email) {
                        $scope.email = email;
                    });

                    // close the detail and go back to previous route
                    $scope.close = function() {
                        $location.path('/' + Users.getSource());
                    };

                    $scope.send = function() {
                        Outbox.post($scope.email).success(function() {
                            // Delete draft after sending
                            Draft.delete($scope.email.id).success(function() {
                                $location.path('/' + Users.getSource());
                            });
                        });

                    };

                    $scope.updateDraft = function() {
                        // delete $scope.email.id;
                        delete $scope.email.datetime;

                        Draft.put($scope.email, $routeParams.id).success(function() {
                            $location.path('/' + Users.getSource());
                        });
                    };

                    // Send to trash
                    $scope.trash = function(email) {
                        Trash.sendToTrash(email, function(res) {
                            $scope.close();
                        });
                    };

                    // Restore trash email
                    $scope.restore = function(email) {
                        Trash.restore(email, function(res) {
                            $scope.close();
                        });
                    };
                }
            ]
        };

    }]);
