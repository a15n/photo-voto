'use strict';

angular.module('photoVotoApp')
  .controller('MainCtrl', function ($scope, $http) {

    //sets a new page
    $scope.newPage = function (city) {
      $scope.viewed = true;
      var randomNumber = Math.floor(Math.random() * $scope.user.indexes.length);
      if (city) {
        $http.get('api/v1/Pages/?$and={"city":"' + city + '"}')
        .success(function(data){
          $scope.page = data[$scope.user.indexes[randomNumber]];
          $scope.user.indexes.splice(randomNumber,1);
          if ($scope.user.indexes.length === 0) {
            setIndexes(city);
            console.log("Congrats, you have now seen every photo of " + city + "!");
          }
        })
      } else {
        $http.get('api/v1/Pages/')
        .success(function(data){
          $scope.page = data[$scope.user.indexes[randomNumber]];
          $scope.user.indexes.splice(randomNumber,1);
          if ($scope.user.indexes.length === 0) {
            setIndexes();
            console.log("Congrats, you have now seen every photo!");
          }
        })
      }
    };

    //function that dynamically sizes the photo box. Used on screen.load and screen.resize
    function setScreenSize () {
      var imageHeight = $('#imageRow').height();
      var imageWidth = $('#imageRow').width()/2;
      var imageHW = Math.min(imageHeight, imageWidth);
      $('#imageRow img').css({
        'height': imageHW + 'px',
        'width': imageHW + 'px'
      });
    }

    //sets the user index to ensure random, non-repeating pages are presented
    function setIndexes (city) {
      if (city) {
        $http.get('api/v1/Pages/?$and={"city":"' + city + '"}').success(function(data){
          $scope.user = {};
          $scope.user.indexes = [];
          for (var i = 0; i < data.length; i++) {
            $scope.user.indexes[i] = i;
          }
        })
      } else {
        $http.get('api/v1/Pages/').success(function(data){
          $scope.user = {};
          $scope.user.indexes = [];
          for (var i = 0; i < data.length; i++) {
            $scope.user.indexes[i] = i;
          }
        })
      }
    }

    // sorts the photoArray in descending approval order during the setRoyals function (http://repl.it/Wwj)
    function sortByApproval(photoArray) {
      var result = photoArray.sort(function(a, b){
        if (a.approval > b.approval) {
          return -1;
        } else if (a.approval < b.approval) {
          return 1;
        } else {
          return 0;
        }
      });
      return result;
    }

    // assigns the correct royals rank, score, and order to each photo.
    function setRoyals(page, photoId) {
      //resets each page's royals count to 0 and repopulates it during the function.
      var royals = 0;
      for (var i = 0; i < 4; i++) {
        var photo = page.photos.photoArray[i];
        // every photo has been viewed at least once
        photo.views++;
        // only the clicked photo receives a vote
        if (photo._id === photoId) {
          photo.votes++;
        }
        // (0-100) every photo gets an approval rating
        photo.approval = Math.round(photo.votes / photo.views * 100);
        // royals are only counted if they have a >0 approval rating
        if (photo.approval > 0) {
          royals++;
        }
      }
      //reassign royals count
      page.photos.royalty = royals;
      page.photos.photoArray = sortByApproval(page.photos.photoArray);
      return page;
    }

    // return true if instagram photo is not contained with the photoArray
    function photoIsUnique(photoArray, instagramPhotoUrl){
      if (photoArray[0].url === instagramPhotoUrl || photoArray[1].url === instagramPhotoUrl || photoArray[2].url === instagramPhotoUrl || photoArray[3].url === instagramPhotoUrl){
        return false;
      } else {
        return true;
      }
    }

    // finds new, unique photos for each photo without a royalty rating
    function refreshRoyaltyPhotos(page) {
      $http.jsonp('https://api.instagram.com/v1/tags/' + page.hashtag + '/media/recent?callback=?&amp;client_id=a91636c3098f409d8c8c55a2bd255a32&callback=JSON_CALLBACK')
      .success(function(data){
        var instagramJsonp = data.data;
        // if 4 royalty found the lowest scoring photo will be reassigned. Only 3 / 4 photos will remain
        if (page.photos.royalty === 4) {
          var k = 3;
        } else {
          var k = page.photos.royalty;
        }
        // photos k -> 4 are then replaced with the first unique instagram URL found in the instagram API call
        for (k; k < 4; k++) {
          var tempObject = {};
          var instagramJsonpLength = 20;
          for (var uui = 0; uui <= instagramJsonpLength; uui++) {
            var photoArray = page.photos.photoArray;
            var instagramPhotoUrl = instagramJsonp[uui].images.standard_resolution.url;
            if (photoIsUnique(photoArray, instagramPhotoUrl) ) {
              tempObject.url = instagramPhotoUrl;
              break
            }
          }
          tempObject.votes = 0;
          tempObject.views = 0;
          page.photos.photoArray.splice(k, 1, tempObject);
        }
        $http.put('/api/v1/Pages/' + page._id, page);
      });
    }

    $scope.vote = function (page, photoId) {
      // set timeout used to preserve computing power and prevent 'photo rearrange' before the next page's photos are shown.
      setTimeout(function(){
        page.views++;
        page = setRoyals(page, photoId);
        refreshRoyaltyPhotos(page);
      }, 1000)
    };

    $scope.changeCity = function (city){
      if (city === "All") {
        $scope.city = undefined;
        setIndexes();
      } else {
        $scope.city = city;
        setIndexes(city);
      }
    }

    //initiallized to false to see the open page
    $scope.viewed = false

    //sizes the photo box initally and on screen resize
    setScreenSize();
    $(window).resize(setScreenSize);

    $scope.user = {};

    //List all of the cities plus "All" option
    $scope.cities = [];
    $http.get('/api/v1/Pages/')
    .success(function(data) {
      var tempArray = [];
      for (var index in data) {
        tempArray.push(data[index].city);
      }
      $.each(tempArray, function(i, el){
        if($.inArray(el, $scope.cities) === -1) $scope.cities.push(el);
      });
      $scope.cities.sort().unshift("All");
    })

    setIndexes();

  });