angular.module('appRoutes', [])

.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider
    // default page
        .when('/', {
        template: '<div><login-form></login-form></div>'
    })

    // login page
    .when('/login', {
        template: '<div><login-form></login-form></div>'
    })

    .when('/inbox', {
        template: '<div><side-menu></side-menu></div>'
    })

    .when('/detail/:id', {
        template: '<div><detail-form></detail-form></div>'
    })

    .when('/compose', {
        template: '<div><compose-form></compose-form></div>'

    })

    .when('/outbox', {
        template: '<div><side-menu></side-menu></div>'
    })

    .when('/draft', {
        template: '<div><side-menu></side-menu></div>'
    })

    .when('/trash', {
        template: '<div><side-menu></side-menu></div>'
    })
    
    .otherwise({
        redirectTo: '/login'
    });

    // To eliminate # characters from urls (eg. www.google.com/#/login)
    $locationProvider.html5Mode(true);
}]);
