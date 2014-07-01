'use strict';

var api = require('./controllers/api'),
    index = require('./controllers'),
    colors = require('colors'),
    users = require('./controllers/users'),
    session = require('./controllers/session'),
    middleware = require('./middleware'),
    http = require('http'),
    express = require('express'),
    request = require('request'),
    async = require('async'), //async here
    mongoose = require('mongoose');

var app = express();
var PagesSchema = mongoose.model('Pages');

/**
 * Application routes
 */
module.exports = function(app) {

  // Server API Routes
  app.route('/api/awesomeThings')
    .get(api.awesomeThings);

  app.route('/api/users')
    .post(users.create)
    .put(users.changePassword);
  app.route('/api/users/me')
    .get(users.me);
  app.route('/api/users/:id')
    .get(users.show);

  app.route('/api/session')
    .post(session.login)
    .delete(session.logout);

  //successful post request
  app.route('/api/basketball')
    .post(function(req,res) {
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
      var instagramApi = function (originalObject,callback) {
        var page = originalObject;
        page.photos = {};

        page.photos.royalty = 0;
        page.photos.photoArray = [];
        request('https://api.instagram.com/v1/tags/' + page.hashtag + '/media/recent?callback=?&amp;client_id=a91636c3098f409d8c8c55a2bd255a32', function(err, response, body){
          console.log(("insta api callback beginning for " + page.hashtag).green);
          var temp = JSON.parse(body);
          var instagramJsonp = temp.data;
          var m = 0;
          for (m; m < 4; m++) {
            if (instagramJsonp[m]) {

              page.photos.photoArray[m] = {};
              page.photos.photoArray[m].url = instagramJsonp[m].images.standard_resolution.url;

              page.photos.photoArray[m].votes = 0;
              page.photos.photoArray[m].views = 0;
            } else {
              console.log(("not enough photos for " + page.hashtag).red);
            }

          }
          callback(null,page);
        });
      };

      request(req.body.url, function(err, response, body) {
        var attractionsArray = [], toFindArray = [];
        var data = JSON.parse(body);
        var k = 0;
        var indexes = [];
        for (k; k < 30; k++) {
          indexes.push(k);
        }

        indexes.forEach(function(k) {


          var page = {};
          var stringLimit = 125; //safe at 123
          var thisCollection = data.results.collection1[k];
          page.views = 0;
          page.randomNumber = Math.random();
          page.city = data.results.collection2[0].city.slice(16);
          page.airbnbUrl = "https://www.airbnb.com/s/" + page.city.split(" ").join("_");
          page.attraction = thisCollection.attraction.text.replace(/[&-().]/g, '');
          console.log(page.attraction.yellow);
          page.hashtag = page.attraction.replace(/\W/g,'').split(" ").join("");
          page.tripAdvisorUrl = thisCollection.attraction.href;
          page.rating = thisCollection.rating.alt;
          page.ratingNumber = parseFloat(page.rating);
          // page.ratingStars = numToStars(page.ratingNumber);
          page.numReviews = thisCollection.numReviews.text;
          if (thisCollection.review1.text !== undefined) {
            page.review1 = "\"" + thisCollection.review1.text + "\"";
          }
          if (thisCollection.review2.text !== undefined) {
            page.review2 = "\"" + thisCollection.review2.text + "\"";
          }
          if (typeof thisCollection.description !== "string" && typeof thisCollection.description[1] === "string") {
            if (thisCollection.description[1].substring(0,5) === "Owner") {
              page.description = thisCollection.description[1].slice(19).slice(0,stringLimit) + "...";
            } else {
              page.description = thisCollection.description[1].slice(0,stringLimit + "...");
            }
          } else if (typeof thisCollection.description !== "string" && typeof thisCollection.description[1] === "object") {
            page.description = thisCollection.description[1].text.slice(0,stringLimit) + "...";
          } //page.description if/ else if statement
          // instagramApi(page); //passed object to 2nd API callback
          page.photos = {};

          page.photos.royalty = 0;
          page.photos.photoArray = [];
          attractionsArray.push(page);
          toFindArray.push(function(cb) {
            instagramApi(page,cb);
          });
          // instagramApi(page);
        });


        async.parallel(toFindArray,function(err,pages) {
          console.log("TripAdvisor & instagram API callback complete".red);
          var pagesLength = pages.length;
          for (var k = 0; k < pagesLength; k++) {
            var submission = new PagesSchema(pages[k]);
            submission.save(function(err) {
              if (err) throw err;
              console.log(("page pushed to the DB").blue);
            });
          console.log("submission complete".red);
          }

        });

      });
    });

  // All undefined api routes should return a 404
  app.route('/api/*')
    .get(function(req, res) {
      res.send(404);
    });

  // All other routes to use Angular routing in app/scripts/app.js
  app.route('/partials/*')
    .get(index.partials);
  app.route('/*')
    .get( middleware.setUserCookie, index.index);
};








































