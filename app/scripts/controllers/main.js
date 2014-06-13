'use strict';

function sortByKey(array, key) {
    return array.sort(function(a, b) {
        var x = a[key]; var y = b[key];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
}

angular.module('photoVotoApp')
  .controller('MainCtrl', function ($scope, $http) {

    //function that dynamically sizes the photo box
    function setScreenSize () {
      var imageHeight = $('#imageRow').height();
      var imageWidth = $('#imageRow').width()/2;
      var imageHW = Math.min(imageHeight, imageWidth);
      $('#imageRow img').css({
        'height': imageHW + 'px',
        'width': imageHW + 'px'
      });
    }
    setScreenSize();
    $(window).resize(setScreenSize);

    var pageIndex = 0;

    //used on the first page only
    $scope.newPage = function (city) {
      $scope.viewed = true;
      $http.get('/api/v1/Pages/')
      .success(function(data) {
        $scope.page = data[pageIndex];
        pageIndex++;
      });
    };

    $scope.vote = function (page, photoId) {

      var i = 0;
      var royals = 0; //resets royal count to 0 before it repopulates it
      for (i; i < 4; i++) { //cycles through the 4 photos (index 0-3)
        var photo = page.photos.photoArray[i];
        photo.views++; //every photo has been viewed now
        if (photo._id === photoId) {

          photo.votes++;
        } //only the clicked photo receives a vote
        photo.approval = Math.round(photo.votes / photo.views * 100); // (0-100) every photo gets an approval rating

        if (photo.approval > 0) {
          royals++;
        }
      }
      page.photos.royalty = royals;
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
        if (page.photos.royalty === 4) {
          var k = 3;
        } else {
          var k = page.photos.royalty;
        }
        for (k; k < 4; k++) {
          var tempObject = {};
          var uui = 0;
          for (uui; uui <= 20; uui++) {
            var photoArray = page.photos.photoArray;
            var instagramPhotoUrl = instagramJsonp[uui].images.standard_resolution.url;
            if (photoArray[0].url === instagramPhotoUrl || photoArray[1].url === instagramPhotoUrl || photoArray[2].url === instagramPhotoUrl || photoArray[3].url === instagramPhotoUrl) {
                // console.log('duplicate url match at ' + uui + '. url not assigned');
                // uui for-loop continues
            } else {
              tempObject.url = instagramPhotoUrl;
              // console.log('no duplicate url match at ' + uui + '. url ASSIGNED!');
              uui = 20; //use this to jump out of the loop
            }
          }
          tempObject.votes = 0;
          tempObject.views = 0;
          page.photos.photoArray.splice(k ,1, tempObject);
        }
        $http.put('/api/v1/Pages/' + page._id, page)
        .success(function(data) {
          console.log("put ID page has been updated.");
        });
      });
      }, 2000);
    };

    // $.fn.stars = function() {
    //   return $(this).each(function() {
    //     // Get the value
    //     var val = parseFloat($(this).html());
    //     // Make sure that the value is in 0 - 5 range, multiply to get width
    //     var size = Math.max(0, (Math.min(5, val))) * 16;
    //     // Create stars holder
    //     var $span = $('<span />').width(size);
    //     // Replace the numerical value with stars
    //     $(this).html($span);
    //   });
    // }

    // $(function() {
    //   $('span.stars'.stars());
    // });

  });