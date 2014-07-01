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
          $scope.loggedIn = true;
        })
        .catch( function(err) {
          err = err.data;
          $scope.errors.other = err.message;
        });
      }
    };

  });


// angular.module('photoVotoApp')
//   .controller('LoginCtrl', function ($scope, $http, Auth, $location) {
//     $scope.user = {};
//     $scope.errors = {};

//     $scope.login = function(form) {
//       $scope.submitted = true;
//       if(form.$valid) {
//         Auth.login({
//           email: $scope.user.email,
//           password: $scope.user.password
//         })
//         .then( function() {
//           // Logged in, redirect to settings page
//           $location.path('/settings');
//           $scope.loggedIn = true;
//         })
//         .catch( function(err) {
//           err = err.data;
//           $scope.errors.other = err.message;
//         });
//       }
//     };

//   });