Voto
=========
[Voto](http://photo-voto.herokuapp.com/) presents algorithmically sorted, crowd-curated photos and information about the best attractions on earth. I built it using Angular, Express, Node, MongoDB, Kimono, the TripAdvisor API, the Instagram API, and Async.js.

Primary Features
---------
* **Voting Algorithm Quality**: My voting algorithm produces better quality photos than Instagram's API does. For evidence search the hashtag of any attraction ('Golden Gate Bridge' to 'GoldenGateBridge') at [FindGram](http://findgram.com/) and compare Voto's top four photos with Instagram's. This is the power of crowd curating your photos.
![](/images/voting.png?raw=true)
* **Voting Algorithm**: Each time a user clicks on their favorite photo their vote is cast and they're brought to the next attraction. I created a voting algorithm (below) that always presents the three most popular photos while still allowing for new, popular photos to make their way to the top.
```
$scope.vote = function (page, photoId) {
  //setTimeout used to divert computing power until one second after the newPage function has been called
  setTimeout(function(){
    page.views++;
    var i = 0;
    var royals = 0; //resets each page's royals count to 0 and repopulates it accurately during the function
    for (i; i < 4; i++) {
      var photo = page.photos.photoArray[i];
      photo.views++; //every photo has been viewed at least once
      if (photo._id === photoId) {
        photo.votes++;
      } //only the clicked photo receives a vote
      photo.approval = Math.round(photo.votes / photo.views * 100); // (0-100) every photo gets an approval rating
      if (photo.approval > 0) {
        royals++;
      }
    }
    page.photos.royalty = royals; //reassign royals count
    sortByKey(page.photos.photoArray, "approval").reverse();
    $http.jsonp('https://api.instagram.com/v1/tags/' + page.hashtag + '/media/recent?callback=?&amp;client_id=a91636c3098f409d8c8c55a2bd255a32&callback=JSON_CALLBACK') //finds new photos depending on how many photos have a 0% approval rating
    .success(function(data){
      var instagramJsonp = data.data;
      if (page.photos.royalty === 4) {
        var k = 3;
      } else {
        var k = page.photos.royalty;
      }
      for (k; k < 4; k++) {
        var tempObject = {};
        var uui = 0;
        for (uui; uui <= 20; uui++) {
          var photoArray = page.photos.photoArray;
          var instagramPhotoUrl = instagramJsonp[uui].images.standard_resolution.url;
          if (photoArray[0].url === instagramPhotoUrl || photoArray[1].url === instagramPhotoUrl || photoArray[2].url === instagramPhotoUrl || photoArray[3].url === instagramPhotoUrl) {
          } else {
            tempObject.url = instagramPhotoUrl;
            uui = 20; //use this to jump out of the loop
          }
        }
        tempObject.votes = 0;
        tempObject.views = 0;
        page.photos.photoArray.splice(k ,1, tempObject);
      }
      $http.put('/api/v1/Pages/' + page._id, page)
      .success(function(data) {
      });
    });
  }, 1000);
};
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
After forking the project and downloading the dependencies you're able to populate the database on your local machine. Go to [http://localhost:9000/login](localhost:9000/login), sign in with the email andrewscheuermann@gmail.com and the local password "1234". This will take you to the admin page where you'll be able to populate the database. Visit a city's Trip Advisor attraction page ([San Francisco example here])(http://www.tripadvisor.com/Attractions-g60713-Activities-San_Francisco_California.html), copy & paste the URL into the admin page, and hit submit. The app will then make asynchronous TripAdvisor and Instagram API calls. After this is complete you'll be able to browse through photos!

Featured in [Course Report](https://www.coursereport.com/blog/hiring-day-at-fullstack-academy).