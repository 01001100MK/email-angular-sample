"use strict";

angular.module("userService", [])

.factory("Users", ["$http", "$cookies", function($http, $cookies) {

    // Initialize once and store the values for the whole life cycle
    var userService = {};
    var userEmail = "";
    // $cookies.userEmail = "";

    // Get Password
    userService.getPassword = function(email) {
        // Store the UserEmail
        userEmail = email;
        return $http.get('/api/password/' + email);
    };

    // Get User Email
    userService.getUserEmail = function() {
        return $cookies.get("userEmail");
    }

    // Check User is already logged in or not
    userService.isLoggedIn = function() {
        if ($cookies.get("userEmail") === undefined || $cookies.get("userEmail").length === 0) {
            return false;
        } else {
            return true;
        }
    }

    // User Logout
    userService.logOut = function() {
        $cookies.remove("userEmail");
    }

    // to store current url route
    userService.setSource = function(src) {
        $cookies.put("source", src);
    }

    //  to get previous url route
    userService.getSource = function() {
        return $cookies.get("source");
    }

    // return our entire UsersService object
    return userService;

}]);
