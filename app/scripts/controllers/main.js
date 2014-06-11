'use strict';



function sortByKey(array, key) {
    return array.sort(function(a, b) {
        var x = a[key]; var y = b[key];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
}

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

    function setScreenSize () {
      var imageHeight = $('#imageRow').height();
      var imageWidth = $('#imageRow').width()/2;
      var imageHW = Math.min(imageHeight, imageWidth);
      $('img').css({
        'height': imageHW + 'px',
        'width': imageHW + 'px'
      });
    }
    setScreenSize();
    $(window).resize(setScreenSize);

    $scope.authorized = false;


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

    $scope.vote = function (page, photoUrl) {
      $scope.viewed = true;
      var i = 0;
      var royals = 0;
      for (i; i < 4; i++) {
        page.photos.photoArray[i].views++;
        if (page.photos.photoArray[i].url === photoUrl) {
          page.photos.photoArray[i].votes++;
        }
        page.photos.photoArray[i].approval = page.photos.photoArray[i].votes / page.photos.photoArray[i].views * 100;
        if (page.photos.photoArray[i].approval > 0) {
          royals++;
        }
        page.photos.royalty = royals;
      }
      $http.get('/api/v1/Pages/')
      .success(function(data) {
        $scope.page = data[pageIndex];
        pageIndex++;
      });



setTimeout(function(){

      sortByKey(page.photos.photoArray, "approval").reverse();


      $http.jsonp('https://api.instagram.com/v1/tags/' + page.hashtag + '/media/recent?callback=?&amp;client_id=a91636c3098f409d8c8c55a2bd255a32&callback=JSON_CALLBACK')
      .success(function(data){
        var instagramJsonp = data.data;
        var k = page.photos.royalty;

        for (k; k < 4; k++) {
          var temp = {};
          var uui = 0;
          for (uui; uui <= 20; uui++) {
            if (page.photos.photoArray[0].url === instagramJsonp[uui].images.standard_resolution.url || page.photos.photoArray[1].url === instagramJsonp[uui].images.standard_resolution.url || page.photos.photoArray[2].url === instagramJsonp[uui].images.standard_resolution.url || page.photos.photoArray[3].url === instagramJsonp[uui].images.standard_resolution.url) {

                console.log('duplicate url match at ' + uui + '. url not assigned');

            } else {
              temp.url = instagramJsonp[uui].images.standard_resolution.url;
              console.log('no duplicate url match at ' + uui + '. url ASSIGNED!');
              uui = 20;
            }
          }
          temp.votes = 0;
          temp.views = 0;
          page.photos.photoArray.splice(k ,1, temp);
        }
        $http.put('/api/v1/Pages/' + page._id, page)
        .success(function(data) {
          console.log("put ID page has been updated.");
        });
      });






      // $http.get('/api/v1/Pages/')
      // .success(function(data) {
      //   $scope.page = data[pageIndex];
      //   pageIndex++;
      // });
}, 3000);
    };

    $scope.deletePage = function (object) {
      console.log(object);
      $http.delete('/api/v1/Pages/' + object._id);
      $http.get('/api/v1/Pages/')
      .success(function(data) {
        $scope.page = data[pageIndex];
        pageIndex++;
      });
    };



  });

//attach jquery event to window.resize
//SO dynamically resize div based on size of browser window
//emilolsson.com/shop/demo/l