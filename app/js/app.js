angular.module('myApp', [
    'ngRoute',
    'ngCookies',
    'appRoutes',
    'inboxService',
    'outboxService',
    'draftService',
    'detailService',
    'app.directives.login',
    'app.directives.detail',
    'app.directives.compose',
    'app.directives.sidemenu',
    'app.directives.maincontent',
]);
