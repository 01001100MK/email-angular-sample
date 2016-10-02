"use strict";

angular.module('app.directives.maincontent', ['inboxService', 'userService'])
    .directive('mainContent', [function() {
        return {
            restrict: 'E',
            templateUrl: 'components/maincontent/template.html',
            controller: ['$scope', '$http', '$location', 'Inbox', 'Outbox',
                'Draft', 'Trash', 'Users', 'Maincontent', 'Star',
                function($scope, $http, $location, Inbox, Outbox,
                    Draft, Trash, Users, Maincontent, Star) {
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
                        // isRead = 1, set already read
                        Inbox.setRead(id).success(function() {

                        });

                        $location.path('/detail/' + id);
                    }

                    // Send to trash
                    $scope.trash = function(email) {
                        Trash.sendToTrash(email, function(res) {
                            // Refresh email List
                            Maincontent.getEmails(route, user, function(result) {
                                $scope.emails = result;

                                // Decreased unread count by 1
                                Inbox.getUnreadCount().success(function(res) {
                                    $scope.unreadCount = res.ucount;
                                });
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

                    // Inbox needs to show sender
                    $scope.isInbox = Inbox.isInbox();

                    // is the email starred?
                    $scope.isStarred = function(email) {
                        return email.star === 1;
                    };

                    // toggle star on/off
                    $scope.toggleStar = function(email) {
                        var source = Users.getSource();
                        if (email.star === 0) {
                            Star.toggleOn(email.id, source).success(function(res) {
                                Maincontent.getEmails(route, user, function(result) {
                                    $scope.emails = result;
                                });
                            });
                        } else {
                            Star.toggleOff(email.id, source).success(function(res) {
                                Maincontent.getEmails(route, user, function(result) {
                                    $scope.emails = result;
                                });
                            });
                        }
                    };

                    // New unread inbox mails count
                    $scope.unreadCount = 0;
                    Inbox.getUnreadCount().success(function(res) {
                        $scope.unreadCount = res.ucount;
                    });

                    // Check email is unread
                    $scope.unread = function(email) {
                        return email.isRead === 0;
                    };

                    $scope.setUnread = function(id) {
                        Inbox.setUnread(id).success(function() {
                            Maincontent.getEmails(route, user, function(emails) {
                                $scope.emails = emails;

                                // Unread count will increase by 1
                                Inbox.getUnreadCount().success(function(res) {
                                    $scope.unreadCount = res.ucount;
                                });
                            });
                        });
                    };
                }
            ]
        };
    }]);
