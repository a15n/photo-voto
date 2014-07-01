'use strict';

var attractionsPerPage = 30; // k < #: # === attractions per page

function sortByKey(array, key) {
  return array.sort(function(a, b) {
    var x = a[key]; var y = b[key];
    return ((x < y) ? -1 : ((x > y) ? 1 : 0));
  });
}

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
          // $location.path('/settings');
          $scope.loggedIn = true;
        })
        .catch( function(err) {
          err = err.data;
          $scope.errors.other = err.message;
        });
      }
    };

    $scope.practice = function (url) {
      var urlObject = {url: url};
      $http.post('/api/basketball', urlObject);
    }

    $scope.submitAttractions = function ($scope) {
      //locally saves the form variables
      var url = $scope.url;
      var pages = $scope.pages;

      //resets the page inputs
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
        var numToStars = function (num) {
          var numArray = [];
          if (num % 1 === 0) {  //whole number
            var i = 0;
            var x = num;
            for (i; i < x; i++) {
                numArray.push(i + 1);
            }
          } else { //float number
            var j = 0;
            var y = num - 0.5;
            for (j; j < y; j++) {
                numArray.push(j + 1);
            }
            numArray.push(0.5);
          }
          if (numArray.length < 5) {
            var k = 5 - numArray.length;
            // var dummyArray = [11,12,13,14,15];
            while(k--) {
                numArray.push(undefined);
            }
          }
          return numArray;
        };

        $http.get(getUrl)
          .success(function(data){
            var k = 0;
            for (k; k < attractionsPerPage; k++) { //this is on line 3
              var page = {};
              var stringLimit = 125; //safe at 123
              var thisCollection = data.results.collection1[k];
              page.views = 0;
              page.randomNumber = Math.random();
              page.city = data.results.collection2[0].city.slice(16);
              page.airbnbUrl = "https://www.airbnb.com/s/" + page.city.split(" ").join("_");
              page.attraction = thisCollection.attraction.text.replace(/[&-().]/g, '');
              page.hashtag = page.attraction.replace(/\W/g,'').split(" ").join("");
              page.tripAdvisorUrl = thisCollection.attraction.href;
              page.rating = thisCollection.rating.alt;
              page.ratingNumber = parseFloat(page.rating);
              page.ratingStars = numToStars(page.ratingNumber);
              page.numReviews = thisCollection.numReviews.text;
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
      var answer = confirm("Delete everything?");
      if (answer == true) {
        $http.delete('/api/v1/Pages/')
        .success(function(data){
          console.log("Pages DB deleted");
        });
      }
    };

    $scope.revisePage = function (page, tempObject){
      setTimeout(function () {
        if (!tempObject) {
          console.log("grey input fields must be included!");
        } else {
          page.hashtag = tempObject.hashtag;
          $http.put('/api/v1/Pages/' + page._id, page)
          .success(function (data) {
            console.log(page.attraction + " updated");
          });
        }
      }, 5000);
    };

    $scope.deletePage = function(page) {
      setTimeout(function () {
        $http.delete('/api/v1/Pages/' + page._id)
        .success(function(data) {
          console.log(page.attraction + " deleted");
        });
      }, 5000);
    };

    //bring page to the login page
    $http.get('/api/v1/Pages/')
      .success(function(data) {
        $scope.pages = data;
      });

  });