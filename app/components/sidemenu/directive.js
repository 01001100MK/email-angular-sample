'use strict';

angular.module('app.directives.sidemenu', [])
    .directive('sideMenu', [function() {
        return {
            restrict: 'E',
            templateUrl: 'components/sidemenu/template.html',
            controller: ['$scope', '$http', '$location', 'Users',
                function($scope, $http, $location, Users) {

                    if (!Users.isLoggedIn()) {
                        $location.path('/login');
                    }

                    // default landing page
                    // Users.setSource('inbox');
                    $scope.changeRoute = function(route) {
                        $location.path('/' + route);
                        Users.setSource(route);
                    };

                    // compose doesn't need to Users.setSource('compose') otherwise it introduces a bug.
                    $scope.compose = function() {
                        $location.path('/compose');
                    };

                    $scope.route =  Users.getSource();

                    $scope.logOut = function() {
                        Users.logOut();
                        $location.path('/login');
                    }
                }
            ]
        };
    }]);
