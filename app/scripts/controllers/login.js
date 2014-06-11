'use strict';

angular.module('photoVotoApp')
  .controller('LoginCtrl', function ($scope, $http, Auth, $location) {
    $scope.user = {};
    $scope.errors = {};

    $scope.login = function(form) {
      $scope.submitted = true;

      if(form.$valid) {
        Auth.login({
          email: $scope.user.email,
          password: $scope.user.password
        })
        .then( function() {
          // Logged in, redirect to settings page
          $location.path('/settings');
        })
        .catch( function(err) {
          err = err.data;
          $scope.errors.other = err.message;
        });
      }
    };

    $scope.submitAttractions = function ($scope) {

      var url = $scope.url;
      var urls = [url.slice(27)];
      var kimonoUrl = "http://www.kimonolabs.com/api/43takhg6?apikey=0a1d375d04e46d6b8ff57584f2c1ddf9&kimpath1=";
      var pages = $scope.pages;
      $scope.url = "";
      $scope.pages = "";
      var populatePhotosWithObject = function (hashtag, originalObject) {
        var page = originalObject;
        page.photos = {};

        page.photos.royalty = 0;
        page.photos.nonRoyalty = 4;
        page.photos.photoArray = [];
        $http.jsonp('https://api.instagram.com/v1/tags/' + hashtag + '/media/recent?callback=?&amp;client_id=a91636c3098f409d8c8c55a2bd255a32&callback=JSON_CALLBACK')
        .success(function(data){
          var instagramJsonp = data.data;
          var m = 0;
          for (m; m < 4; m++) {
            page.photos.photoArray[m] = {};
            page.photos.photoArray[m].url = instagramJsonp[m].images.standard_resolution.url;
            page.photos.photoArray[m].votes = 0;
            page.photos.photoArray[m].views = 0;
          }
          console.log(page.attraction + " " + page.city + " added!!!");
          postToDatabase(page);
        });
      };

      var andrewApi = function (getUrl) {
        $http.get(getUrl)
          .success(function(data){
            var k = 0;
            for (k; k < 30; k++) {                    // k < #: # === attractions per page
              var page = {};
              var stringLimit = 123;
              var testMe = data.results;

              page.city = data.results.collection2[0].city.slice(16);
              page.attraction = data.results.collection1[k].attraction.text.replace(/[&-().]/g, '');
              page.hashtag = page.attraction.replace(/\W/g,'').split(" ").join("");

              page.url = data.results.collection1[k].attraction.href;
              page.rating = data.results.collection1[k].rating.alt;
              page.ratingNumber = parseInt(data.results.collection1[k].rating.alt);
              if (data.results.collection1[k].review1.text !== undefined) {
                page.review1 = "\"" + data.results.collection1[k].review1.text + "\"";
              }
              if (data.results.collection1[k].review2.text !== undefined) {
                page.review2 = "\"" + data.results.collection1[k].review2.text + "\"";
              }
              if (typeof data.results.collection1[k].description !== "string" && typeof data.results.collection1[k].description[1] === "string") { //is a string
                if (data.results.collection1[k].description[1].substring(0,5) === "Owner") {
                  page.description = data.results.collection1[k].description[1].slice(19).slice(0,stringLimit);
                } else {
                  page.description = data.results.collection1[k].description[1].slice(0,stringLimit);
                }
              } else if (typeof data.results.collection1[k].description !== "string" && typeof data.results.collection1[k].description[1] === "object") {
                page.description = data.results.collection1[k].description[1].text.slice(0,stringLimit);
              } //page.description if/ else if statement
              populatePhotosWithObject(page.hashtag, page); //passed object to 2ns API callback


            }
          });
        };

      var postToDatabase = function (page) {
        $http.post('/api/v1/Pages/', page);
      };


      if (pages > 1) {
        var i = 1;
        var urlLeft = url.slice(27,57);
        var urlRight = url.slice(57);
        var urlMiddleNum = 30;
        for (i; i < pages; i++) {
          var urlMiddle = 'oa' + urlMiddleNum.toString() + '-';
          urls.push(urlLeft + urlMiddle + urlRight);
          urlMiddleNum = urlMiddleNum + 30;
        }
      } //creates URLs to scrape multiple pages on Trip Advisor

      for (var j = 0; j < pages; j++) {
        var masterUrl = kimonoUrl + urls[j];
        andrewApi(masterUrl);   //Andrew API called here pages.length times

      }
    };

    $scope.clearEverything = function ($scope) {
      $http.delete('/api/v1/Pages/')
      .success(function(data){
        console.log("Pages DB deleted");
      });
    };



    $http.get('/api/v1/Pages/')
    .success(function(data) {
      $scope.pages = data;
    });

    $scope.revisePage = function (page, tempObject){
      if (!tempObject) {
        console.log("input fields must be updated!")
      } else {
        page.hashtag = tempObject.hashtag;
        $http.put('/api/v1/Pages/' + page._id, page)
        .success(function (data) {
          console.log(page.attraction + " updated")
        });
      }
    }

    $scope.deletePage = function(page) {
      $http.delete('/api/v1/Pages/' + page._id)
      .success(function(data) {
        console.log(page.attraction + " deleted");
      });
    }


  });



//https://api.instagram.com/v1/tags/search?q=goldengate&access_token=418954256.f59def8.2ecd8c03f3d14d2aaa3ed5da8cf10789
//https://api.instagram.com/v1/tags/search?q=goldengatebridge&access_token=418954256.f59def8.2ecd8c03f3d14d2aaa3ed5da8cf10789