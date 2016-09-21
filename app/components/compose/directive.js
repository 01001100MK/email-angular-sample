"use strict";
angular.module('app.directives.compose', ['outboxService', 'userService'])
    .directive('composeForm', [function() {
        return {
            restrict: 'E',
            templateUrl: 'components/compose/template.html',
            controller: ['$scope', '$http', '$location', '$routeParams', 'Outbox', 'Users', 'Draft',
            function($scope, $http, $location, $routeParams, Outbox, Users, Draft) {
                // Initialize
                $scope.mail = {};

                // Check user logged in or not
                if (!Users.isLoggedIn()) {
                    $location.path('/login');
                }

                // Send
                $scope.send = function() {
                    $scope.mail.sender = Users.getUserEmail();
                    Outbox.post($scope.mail).success(function() {
                        $location.path('/' + Users.getSource());
                    });
                };

                // Save draft
                $scope.saveDraft = function() {
                    $scope.mail.sender = Users.getUserEmail();
                    Draft.post($scope.mail).success(function() {
                        $location.path('/' + Users.getSource());
                    });
                };

                // Close and go back to previous route
                $scope.close = function() {
                    $location.path('/' + Users.getSource());
                };
            }]
        };
    }]);
