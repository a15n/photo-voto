'use strict';

var hashtag = function (inputString) {
  return inputString.replace(/\W/g,'').split(" ").join("");
};
var instaUrl = function (tag) {
      return 'https://api.instagram.com/v1/tags/' + tag + '/media/recent?callback=?&amp;client_id=a91636c3098f409d8c8c55a2bd255a32&callback=JSON_CALLBACK';
    };
var instaScrub =function (inputArray, title) {
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
};






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

    // $scope.submitAttractions = function (form) {
    //   var url = 'http://www.tripadvisor.com/Attractions-g60713-Activities-San_Francisco_California.html';
    //   var urls = [url.slice(27)];
    //   var cityName = 'San Francisco';


    //   var pages = 1;
    //   if (pages > 1) {
    //     var i = 1;
    //     var urlLeft = url.slice(27,57);
    //     var urlRight = url.slice(57);
    //     var urlMiddleNum = 30;
    //     for (i; i < pages; i++) {
    //       var urlMiddle = 'oa' + urlMiddleNum.toString() + '-';
    //       urls.push(urlLeft + urlMiddle + urlRight);
    //       urlMiddleNum = urlMiddleNum + 30;
    //     }
    //   }

    //   // var finalArray = [];

    //   var j = 0;

    //   var kimonoUrl = "http://www.kimonolabs.com/api/43takhg6?apikey=0a1d375d04e46d6b8ff57584f2c1ddf9&kimpath1=";

    //   var scrubData = function (getUrl) {
    //     $http.get(getUrl)
    //     .success(function(data){
    //       var k = 0;
    //       for (k; k < 30; k++) {
    //         var page = {};
    //         var stringLimit = 123;
    //         page.city = cityName;
    //         page.attraction = data.results.collection1[k].attraction.text;
    //         page.url = data.results.collection1[k].attraction.href;
    //         page.hashtag = hashtag(page.attraction);
    //         page.rating = data.results.collection1[k].rating.alt;
    //         page.review1 = data.results.collection1[k].review1.text;
    //         page.review2 = data.results.collection1[k].review2.text;
    //         if (typeof data.results.collection1[k].description !== "string" && typeof data.results.collection1[k].description[1] === "string") { //is a string
    //           if (data.results.collection1[k].description[1].substring(0,5) === "Owner") {
    //             page.description = data.results.collection1[k].description[1].slice(19).slice(0,stringLimit);
    //           } else {
    //             page.description = data.results.collection1[k].description[1].slice(0,stringLimit);
    //           }
    //         }
    //         else if (typeof data.results.collection1[k].description !== "string" && typeof data.results.collection1[k].description[1] === "object") {
    //           page.description = data.results.collection1[k].description[1].text.slice(0,stringLimit);
    //         }
    //         // console.log(page);
    //         // finalArray.push(page);
    //         postToBackend(page);
    //       }
    //     });
    //   };


    //   //scrubData calls the kimono API and asynchronously returns the object to the backend
    //   for (j; j < pages; j++) {
    //     var scrubUrl = kimonoUrl + urls[j];
    //     scrubData(scrubUrl);
    //   }
    //   // $scope.TEST = finalArray











    //       // for (k; k < 30; k++) {
    //       //   var page = {};
    //       //   // var page.city = cityName;
    //       //   // var page.attraction = data.results.collection1[k].attraction.text;
    //       //   finalArray.push(page);
    //       // }

    //   // $http.get("http://www.kimonolabs.com/api/43takhg6?apikey=0a1d375d04e46d6b8ff57584f2c1ddf9")
    //   // .success(function(data) {
    //   //   console.log("success");
    //   //   // console.log(data);
    //   // })

    //   // "http://www.tripadvisor.com/Attractions-g60713-Activities-San_Francisco_California.html"
    //   // "Attractions-g60713-Activities-oa30-San_Francisco_California.html"
    //   // "Attractions-g60713-Activities-oa60-San_Francisco_California.html"
    //   // "Attractions-g60713-Activities-oa90-San_Francisco_California.html"
    //   //http://www.kimonolabs.com/api/43takhg6?apikey=0a1d375d04e46d6b8ff57584f2c1ddf9&kimpath1=Attractions-g60713-Activities-oa90-San_Francisco_California.html
    //   //http://www.kimonolabs.com/api/43takhg6?apikey=0a1d375d04e46d6b8ff57584f2c1ddf9&kimpath1=Attractions-g60713-Activities-oa90-San_Francisco_California.html
    // };
    var populatePhotos = function (attraction) {

      var instaJsonp;
      $http.jsonp(instaUrl(hashtag(attraction)))
        .success(function(data) {
          instaJsonp = data.data;

          var photos = {};
          photos.attraction = attraction;
          photos.hashtag = hashtag(attraction);
          photos.photoArray = [];
          var i = 0;
          for (i; i < 4; i++) {
            photos.photoArray[i] = {};
            photos.photoArray[i].url = instaJsonp[i].images.standard_resolution.url;

            photos.photoArray[i].views = 0;
            photos.photoArray[i].votes = 0;
          }


          $http.post('/api/v1/Photos/', photos)
          .success(function (data) {
            console.log(data);
          });
        });
    };

    $scope.submitAttractions = function ($scope) {
      var url = 'http://www.tripadvisor.com/Attractions-g60713-Activities-San_Francisco_California.html';
      var urls = [url.slice(27)];
      var kimonoUrl = "http://www.kimonolabs.com/api/43takhg6?apikey=0a1d375d04e46d6b8ff57584f2c1ddf9&kimpath1=";
      var city = 'San Francisco';
      var pages = 1; //number of pages

      // var Attractions = {
      //   url: url,
      //   city: city,
      //   pages: pages
      // };
      var andrewApi = function (getUrl) {
        $http.get(getUrl)
          .success(function(data){
            var k = 0;

            for (k; k < 1; k++) { //limit of the page
              var page = {};
              var stringLimit = 123;
              page.url = data.results.collection1[k].attraction.href;
              page.city = city;
              page.attraction = data.results.collection1[k].attraction.text.replace(/[&]/g, '');

              page.hashtag = hashtag(page.attraction);

              populatePhotos(page.attraction);







              page.rating = data.results.collection1[k].rating.alt;
              page.review1 = data.results.collection1[k].review1.text;
              page.review2 = data.results.collection1[k].review2.text;
              if (typeof data.results.collection1[k].description !== "string" && typeof data.results.collection1[k].description[1] === "string") { //is a string
                if (data.results.collection1[k].description[1].substring(0,5) === "Owner") {
                  page.description = data.results.collection1[k].description[1].slice(19).slice(0,stringLimit);
                } else {
                  page.description = data.results.collection1[k].description[1].slice(0,stringLimit);
                }
              }
              else if (typeof data.results.collection1[k].description !== "string" && typeof data.results.collection1[k].description[1] === "object") {
                page.description = data.results.collection1[k].description[1].text.slice(0,stringLimit);
              }
              console.log(page.name);
              postToDatabase(page);
            }
          });
        };

      var postToDatabase = function (page) {
        $http.post('/api/v1/Attractions/', page)
        .success(function(data){
          console.log(JSON.stringify(data) + " added to DB!!!!!!!!");
        });
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
      }

      for (var j = 0; j < pages; j++) {
        var masterUrl = kimonoUrl + urls[j];
        andrewApi(masterUrl);   //Andrew API called here
      }
    };

    $scope.clearEverything = function ($scope) {
      $http.delete('/api/v1/Attractions/')
      .success(function(data){
        console.log("Attractions deleted");
      });
      $http.delete('/api/v1/Photos/')
      .success(function(data){
        console.log("Photos deleted");
      });
    };

    var postToBackend = function (page) {
      $http.post('/api/basketball', page)
      .success(function(data) {
        console.log("Whole page added");
      });
    };


  });



