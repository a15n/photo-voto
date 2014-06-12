'use strict';

var attractionsPerPage = 1; // k < #: # === attractions per page

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
      //locally saves the form variables
      var url = $scope.url;
      var pages = $scope.pages;
      //2 resets the page inputs
      $scope.url = "";
      $scope.pages = "";

      var kimonoUrls = function (inputUrl, numUrls) {
        var kimonoUrl = "http://www.kimonolabs.com/api/43takhg6?apikey=0a1d375d04e46d6b8ff57584f2c1ddf9&kimpath1=";
        var outputUrls = [kimonoUrl + inputUrl.slice(27)];
        var urlLeft = inputUrl.slice(27,57);
        var urlRight = inputUrl.slice(57);
        var urlMiddleNum = 30;
        var i = 1;
        if (numUrls > 1) {
          for (i; i < numUrls; i++) {
            var urlMiddle = 'oa' + urlMiddleNum + '-';
            outputUrls.push(kimonoUrl + urlLeft + urlMiddle + urlRight);
            urlMiddleNum += 30;
          }
        }
        return outputUrls;
      }; //creates URLs to scrape multiple pages on Trip Advisor


      var kimonoApi = function (getUrl) {
        $http.get(getUrl)
          .success(function(data){
            var k = 0;
            for (k; k < attractionsPerPage; k++) { //this is on line 3
              var page = {};
              var stringLimit = 125; //safe at 123
              var thisCollection = data.results.collection1[k];
              page.city = data.results.collection2[0].city.slice(16);
              page.attraction = thisCollection.attraction.text.replace(/[&-().]/g, '');
              page.hashtag = page.attraction.replace(/\W/g,'').split(" ").join("");
              page.url = thisCollection.attraction.href;
              page.rating = thisCollection.rating.alt;
              page.ratingNumber = parseInt(page.rating);
              if (thisCollection.review1.text !== undefined) {
                page.review1 = "\"" + thisCollection.review1.text + "\"";
              }
              if (thisCollection.review2.text !== undefined) {
                page.review2 = "\"" + thisCollection.review2.text + "\"";
              }
              if (typeof thisCollection.description !== "string" && typeof thisCollection.description[1] === "string") {
                if (thisCollection.description[1].substring(0,5) === "Owner") {
                  page.description = thisCollection.description[1].slice(19).slice(0,stringLimit);
                } else {
                  page.description = thisCollection.description[1].slice(0,stringLimit);
                }
              } else if (typeof thisCollection.description !== "string" && typeof thisCollection.description[1] === "object") {
                page.description = thisCollection.description[1].text.slice(0,stringLimit);
              } //page.description if/ else if statement
              instagramApi(page); //passed object to 2nd API callback
            }
          });
      }; //pulls data from kimono API

      var instagramApi = function (originalObject) {
        var page = originalObject;
        page.photos = {};

        page.photos.royalty = 0;
        page.photos.photoArray = [];
        $http.jsonp('https://api.instagram.com/v1/tags/' + page.hashtag + '/media/recent?callback=?&amp;client_id=a91636c3098f409d8c8c55a2bd255a32&callback=JSON_CALLBACK')
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
          $http.post('/api/v1/Pages/', page);
        });
      }; //pulls data from instagram API and pushes to mongoDB

      var urls = kimonoUrls (url, pages);
      var j = 0;
      for (j; j < pages; j++) {
        kimonoApi(urls[j]);
      } //kimonoApi called here pages times
    };

    $scope.clearEverything = function ($scope) {
      $http.delete('/api/v1/Pages/')
      .success(function(data){
        console.log("Pages DB deleted");
      });
    };

    $http.get('/api/v1/Pages/').success(function(data) {
      $scope.pages = data;
    }); //bring page to the login page

    $scope.revisePage = function (page, tempObject){
      if (!tempObject) {
        console.log("grey input fields must be included!");
      } else {
        page.hashtag = tempObject.hashtag;
        $http.put('/api/v1/Pages/' + page._id, page)
        .success(function (data) {
          console.log(page.attraction + " updated");
        });
      }
    };

    $scope.deletePage = function(page) {
      $http.delete('/api/v1/Pages/' + page._id)
      .success(function(data) {
        console.log(page.attraction + " deleted");
      });
    };
  });