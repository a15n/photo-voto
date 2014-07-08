Voto
=========
[Voto](http://photo-voto.herokuapp.com/) presents algorithmically sorted, crowd-curated photos and information about the best attractions on earth. I built it using Angular, Express, Node, MongoDB, Kimono, the TripAdvisor API, the Instagram API, and Async.js.

Primary Features
---------
* **Voting Algorithm**: Each time a user clicks on their favorite photo their vote is cast and they're brought to the next attraction. I created a voting algorithm that always presents the three most popular photos while still allowing for new, popular photos to make their way to the top.
![](/images/voting.png?raw=true)
* **Voting Algorithm Quality**: My voting algorithm produces better quality photos than Instagram's API does. For evidence search the hashtag of any attraction ('Golden Gate Bridge' to 'GoldenGateBridge') at [FindGram](http://findgram.com/) and compare Voto's top four photos with Instagram's. This is the power of crowd curating your photos.
* **Async API Calls**: Each attraction submission requires > 30 dependent API calls to the Trip Advisor and Instagram APIs. This was managed using the Async library. The resulting data is then scrubbed and reduced in size by ~95% to minimize the size of the Mongo Database.
* **Random, Non-Repeating Searching**: Whether searching by city or by "All" the user is guaranteed to see all of the photos in random order before ever seeing a duplicate photo. This guarantees a unique, non-repeating experience for the user. I accomplish this by creating, and randomly subtracting from, a user's "unseen pages index" (see below).
![](/images/console.png?raw=true)
* **User Interface**: I	Focused on providing a good UX: maximum photo area using screen size queries, icons, clean fonts and colors, and a minimalistic layout
* **Stars**: Although subtle, the stars rating on each attraction is uniquely Angular. Whole, partial, or empty star icons are ng-shown or ng-hid based on a custom array (3.5 stars === [1, 2, 3 ,0.5 , randomNumber]).
![](/images/stars.png?raw=true "")
* **Admin Page**: The Admin Page let's administrators add attractions, delete attractions, and identify with obscure hashtags before they become problems. To use the admin panel see "Fork Me" below for directions.
![](/images/admin.png?raw=true)


Fork Me
---------
After forking the project and downloading the dependencies you're able to populate the database on your local machine. Go to [http://localhost:9000/login](localhost:9000/login), sign in with the email andrewscheuermann@gmail.com and the local password "1234". This will take you to the admin page where you'll be able to populate the database. Visit a city's Trip Advisor attraction page ([San Francisco example here])(http://www.tripadvisor.com/Attractions-g60713-Activities-San_Francisco_California.html), copy & paste the URL into the admin page, and hit submit. The app will then make asynchronous TripAdvisor and Instagram API calls. After this is complete you'll be able to browse through photos!