'use strict';

angular.module('photoVotoApp')
  .factory('Session', function ($resource) {
    return $resource('/api/session/');
  });
