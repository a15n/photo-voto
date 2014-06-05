'use strict';

angular.module('photoVotoApp')
  .controller('MainCtrl', function ($scope, $http) {
    $http.get('/api/awesomeThings').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
    });
    // $http.get('https://api.instagram.com/v1/tags/cats/media/recent?callback=?&amp;client_id=a91636c3098f409d8c8c55a2bd255a32')
    window.callbackFunction = function () {
      $scope.getRequest = 'WILLIAM';
    };
    var s = document.createElement('script');
    s.src = 'https://api.instagram.com/v1/media/popular?client_id=a91636c3098f409d8c8c55a2bd255a32&callback=callbackFunction';
    document.head.appendChild(s);

    // $http.get('https://api.instagram.com/v1/media/popular?client_id=a91636c3098f409d8c8c55a2bd255a32&callback=callbackFunction');
    // .success(function(data, status, headers, config) {
    //   $scope.getRequest = 'success';
    // })
    // .error( function () {
    //   $scope.getRequest = 'failure';
    // });
  });


/*
know this is something specific to Angularjs. This works fine on my catgram app.

http://stackoverflow.com/questions/21102690/angularjs-not-detecting-access-control-allow-origin-header
http://stackoverflow.com/questions/3102819/disable-same-origin-policy-in-chrome

angular JSONP handling
https://docs.angularjs.org/api/ng/service/$http

*/