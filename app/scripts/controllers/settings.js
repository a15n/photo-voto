'use strict';

angular.module('photoVotoApp')
  .controller('SettingsCtrl', function ($scope, $http, User, Auth) {
    $scope.errors = {};

    // successful post request
    $scope.submitAttractions = function (submission) {
      var kimonoUrl = "http://www.kimonolabs.com/api/43takhg6?apikey=0a1d375d04e46d6b8ff57584f2c1ddf9&kimpath1=" + submission.url.slice(27);
      var urlObject = {url: kimonoUrl};
      $scope.submission.url = "";
      $http.post('/api/basketball', urlObject);
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


    // $scope.changePassword = function(form) {
    //   $scope.submitted = true;

    //   if(form.$valid) {
    //     Auth.changePassword( $scope.user.oldPassword, $scope.user.newPassword )
    //     .then( function() {
    //       $scope.message = 'Password successfully changed.';
    //     })
    //     .catch( function() {
    //       form.password.$setValidity('mongoose', false);
    //       $scope.errors.other = 'Incorrect password';
    //     });
    //   }
    // };