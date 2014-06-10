'use strict';


var hashtag = function (inputString) {
  return inputString.replace(/\W/g,'').split(" ").join("");
};

var instaUrl = function (tag) {
  //https://api.instagram.com/v1/tags/marinheadlands/media/recent?callback=?&amp;client_id=a91636c3098f409d8c8c55a2bd255a32&callback=JSON_CALLBACK
  return 'https://api.instagram.com/v1/tags/' + tag + '/media/recent?callback=?&amp;client_id=a91636c3098f409d8c8c55a2bd255a32&callback=JSON_CALLBACK';
};

function instaScrub (inputArray, title) {
  var outputArray = [];
  var i = 0, j = 0, inputArrayLength = inputArray.length;
  for (i; i < inputArrayLength; i++) {
    if (inputArray[i].users_in_photo.length === 0) {
      outputArray[j] = {};
      outputArray[j].title = title;
      outputArray[j].url = inputArray[i].images.standard_resolution.url;
      outputArray[j].votes = 0;
      outputArray[j].views = 0;
      outputArray[j].approval = undefined;
      outputArray[j].rank = undefined;
      j++;
    }
  }
  return outputArray;
}

angular.module('photoVotoApp')
  .controller('MainCtrl', function ($scope, $http) {





    var pageIndex = 0;

    $scope.newPage = function (city) {
      $scope.viewed = true;
      if (city) {
        //return results with city filtering
      } else {
        $http.get('/api/v1/Pages/')
        .success(function(data) {
          $scope.page = data[pageIndex];
          pageIndex++;
        });
      }
    };

    $scope.vote = function (photo) {
      $scope.viewed = true;
      for (var i = 0; i < 4; i++) {
        $scope.photoArray[i].views++;
        if ($scope.photoArray[i]._id === photo._id) {
          $scope.photoArray[i].votes++;
        }
        $scope.photoArray[i].approval = $scope.photoArray[i].votes / $scope.photoArray[i].views * 100;
      }
      $http.put('/api/v1/Photos/' + $scope.photos._id, $scope.photos)
      .success(function(data){
        console.log("put is successful!");
      });

    $scope.deletePage = function (name) {
      console.log(name);
    };

    };
  });

//attach jquery event to window.resize
//SO dynamically resize div based on size of browser window
//emilolsson.com/shop/demo/l