"use strict";

angular.module('app.directives.detail', ['inboxService'])
    .directive('detailForm', [function() {
        return {
            restrict: 'E',
            scope: {},
            // replace: true,
            templateUrl: 'components/detail/template.html',
            controller: ['$scope', '$http', '$location', '$routeParams',
                'Users', 'Inbox', 'Outbox', 'Draft', 'Detail',
                function($scope, $http, $location, $routeParams,
                    Users, Inbox, Outbox, Draft, Detail) {
                    // Initialize
                    $scope.mail = {};

                    // Check user logged in or not
                    if (!Users.isLoggedIn()) {
                        $location.path('/login');
                    }

                    $scope.isDraft = Detail.isDraft();

                    // Get Message detail by checking previous route
                    $scope.route = Users.getSource();
                    if ($scope.route === 'inbox') {
                        Inbox.getDetail($routeParams.id).success(function(email) {
                            $scope.mail = email;
                        });
                    } else if ($scope.route === 'outbox') {
                        Outbox.getDetail($routeParams.id).success(function(email) {
                            $scope.mail = email;
                        });
                    } else {
                        Draft.getDetail($routeParams.id).success(function(email) {
                            $scope.mail = email;
                        });
                    }

                    // close the detail and go back to previous route
                    $scope.close = function() {
                        $location.path('/' + Users.getSource());
                    };

                    $scope.send = function() {
                        // draft id can't be used
                        var draftID = $scope.mail.id;
                        delete $scope.mail.id;
                        // draft date can't be used
                        delete $scope.mail.datetime

                        Outbox.post($scope.mail).success(function() {
                            // Delete draft after sending
                            Draft.delete(draftID).success(function() {
                                $location.path('/' + Users.getSource());
                            });
                        });

                    };

                    $scope.updateDraft = function() {
                        // delete $scope.mail.id;
                        delete $scope.mail.datetime;

                        Draft.put($scope.mail, $routeParams.id).success(function() {
                            $location.path('/' + Users.getSource());
                        });
                    };
                }
            ]
        };

    }]);
