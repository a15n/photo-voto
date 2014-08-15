Voto
=========
[Voto](http://photo-voto.herokuapp.com/) presents algorithmically sorted, crowd-curated photos and information about the best attractions on earth. I built it using Angular, Express, Node, MongoDB, Kimono, the TripAdvisor API, the Instagram API, and Async.js. The app has been featured in [Course Report](https://www.coursereport.com/blog/hiring-day-at-fullstack-academy).

Primary Features
---------
* **Voting Algorithm Quality**: My voting algorithm produces better quality photos than Instagram's API does. For evidence search the hashtag of any attraction ('Golden Gate Bridge' to 'GoldenGateBridge') at [FindGram](http://findgram.com/) and compare Voto's top four photos with Instagram's. This is the power of crowd curating your photos.
![](/images/voting.png?raw=true)
* **Voting Algorithm**: Each time a user clicks on their favorite photo their vote is cast and they're brought to the next attraction. I created a voting algorithm (below) that always presents the three most popular photos while still allowing for new, popular photos to make their way to the top. (Full script found in `app/scripts/controllers/main.js`)
```
$scope.vote = function (page, photoId) {
  // set timeout used to preserve computing power and prevent 'photo rearrange' before the next page's photos are shown.
  setTimeout(function(){
    page.views++;
    page = setRoyals(page, photoId);
    refreshRoyaltyPhotos(page);
  }, 1000)
};

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

// return true if instagram photo is not contained with the photoArray
function photoIsUnique(photoArray, instagramPhotoUrl){
  if (photoArray[0].url === instagramPhotoUrl || photoArray[1].url === instagramPhotoUrl || photoArray[2].url === instagramPhotoUrl || photoArray[3].url === instagramPhotoUrl){
    return false;
  } else {
    return true;
  }
}
```
* **Async API Calls**: Each attraction submission requires over 30 dependent API calls to the Trip Advisor and Instagram APIs. This was managed using the [Async](https://github.com/caolan/async) utility module. The resulting data is then scrubbed and reduced in size by ~95% to minimize the size of the Mongo Database.
* **Random, Non-Repeating Searching**: Whether searching by city or by "All" the user is guaranteed to see all of the photos in random order before ever seeing a duplicate photo. This guarantees a unique, non-repeating experience for the user. I accomplish this by creating, and randomly splicing from, a user's "unseen pages index" every time a new page is visited (see below).
![](/images/console.png?raw=true)
* **User Interface**: I	focused on providing a good UX: maximum photo area using screen size queries (function shown below), icons over words, clean fonts and colors, and a minimalistic layout. Go ahead and resize the screen. You'll see the photo box remain as large as possible.
```
function setScreenSize () {
  var imageHeight = $('#imageRow').height();
  var imageWidth = $('#imageRow').width()/2;
  var imageHW = Math.min(imageHeight, imageWidth);
  $('#imageRow img').css({
    'height': imageHW + 'px',
    'width': imageHW + 'px'
  });
}
```
* **Stars**: Although subtle, the stars rating on each attraction is uniquely Angular. Whole, partial, or empty star icons are ng-shown or ng-hid based on an array (for example: 3.5 stars === [1, 2, 3, 0.5, randomNumber()]) and interpreted with the code below.
```
<h2 ng-repeat="star in page.ratingStars" class="stars">
  <span class="fa fa-star" ng-show="star % 1 === 0"></span>
  <span class="fa fa-star-half-o" ng-show="star % 0.5 === 0 && star % 1 !== 0"></span>
  <span class="fa fa-star-o" ng-show="star % 1 !== 0 && star % 0.5 !== 0"></span>
</h2>
```
* **Admin Page**: The Admin Page let's administrators add attractions, delete attractions, and identify obscure hashtags before they become problems. To use the admin panel see "Fork Me" below for directions.
![](/images/admin.png?raw=true)


Fork Me
---------
After forking the project and downloading the dependencies you're able to populate the database on your local machine. Go to [http://localhost:9000/login](localhost:9000/login), sign in with the email andrewscheuermann@gmail.com and the local password "1234". This will take you to the admin page where you'll be able to populate the database. Visit a city's Trip Advisor attraction page ([San Francisco example here](http://www.tripadvisor.com/Attractions-g60713-Activities-San_Francisco_California.html)), copy & paste the URL into the admin page, and hit submit. The app will then make asynchronous TripAdvisor and Instagram API calls. After this is complete you'll be able to browse through photos!

