"use strict";

angular.module("detailService", [])
    .factory("Detail", ["$http", "$cookies", function($http, $cookies) {

        var detailService = {};

        detailService.isDraft = function() {
            return $cookies.get("source") === 'draft';
        };

        return detailService;
    }]);
