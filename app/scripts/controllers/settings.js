'use strict';

angular.module('photoVotoApp')
  .controller('SettingsCtrl', function ($scope, $http, User, Auth) {
    $scope.errors = {};

    $scope.changePassword = function(form) {
      $scope.submitted = true;

      if(form.$valid) {
        Auth.changePassword( $scope.user.oldPassword, $scope.user.newPassword )
        .then( function() {
          $scope.message = 'Password successfully changed.';
        })
        .catch( function() {
          form.password.$setValidity('mongoose', false);
          $scope.errors.other = 'Incorrect password';
        });
      }
		};

    // successful post request
    $scope.submitAttractions = function (form) {
      var url = $scope.url;
      var pages = $scope.pages;
      var cityName = $scope.cityName;
      $scope.url = "";
      $scope.pages = "";
      $scope.cityName = "";

      $http.get("http://www.kimonolabs.com/api/dubyibfi?apikey=0a1d375d04e46d6b8ff57584f2c1ddf9")
      .success(function(data) {
        console.log("success");
      });


      // $http.jsonp(instaUrl(hashtag($scope.page.title.text)))
      // .success(function(data) {
      //   $scope.photos = data.data;
      //   // $scope.scrubbedPhotos = instaScrub(data.data);
      // })

      var result = "Object here";

    };

    // var data = {name: "Andrew"};
    // $http.post('/api/basketball', data)
    // .success(function(data) {
    //   console.log('successful post');
    // });
  });
