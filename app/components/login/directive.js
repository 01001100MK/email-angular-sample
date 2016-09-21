"use strict";

angular.module('app.directives.login', ['userService'])
    .directive('loginForm', [function() {
        return {
            restrict: 'E',
            scope: {},
            // replace: true,
            templateUrl: 'components/login/template.html',
            controller: ['$scope', '$http', '$location', 'Users', '$cookies', function($scope, $http, $location, Users, $cookies) {
                $scope.errMessage = {
                    error: ''
                };

                $scope.doLogin = function() {
                    // Get User Password and check
                    Users.getPassword($scope.userEmail).success(function(response) {
                        if ($scope.password === response) {
                            // Store user email in cookies
                            $cookies.put("userEmail", $scope.userEmail);
                            Users.setSource('inbox');
                            $location.path('/inbox');
                        } else {
                            $scope.errMessage.error = 'Invalid email or password!';
                        }
                    }).error(function(response) {
                        $scope.errMessage.error = response.code;
                    });
                };
            }]

        };
    }]);
