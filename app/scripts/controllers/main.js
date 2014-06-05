'use strict';

angular.module('photoVotoApp')
  .controller('MainCtrl', function ($scope, $http) {
    var getUrl = function (tag) {
      return 'https://api.instagram.com/v1/tags/' + tag + '/media/recent?callback=?&amp;client_id=a91636c3098f409d8c8c55a2bd255a32&callback=JSON_CALLBACK';
    };
    // $http.jsonp('https://api.instagram.com/v1/media/popular?client_id=a91636c3098f409d8c8c55a2bd255a32&callback=JSON_CALLBACK')
    $http.jsonp(getUrl('GoldenGate'))
    .success(function(data) {
      $scope.photos = data.data;
      console.log(data);
    })
    .error( function () {
    });
  });

//comment

//attach jquery event to window.resize
//SO dynamically resize div based on size of browser window
//emilolsson.com/shop/demo/l