'use strict';

var hashtag = function (inputString) {
  return inputString.replace(/\W/g,'').split(" ").join("");
};

var instaUrl = function (tag) {
      return 'https://api.instagram.com/v1/tags/' + tag + '/media/recent?callback=?&amp;client_id=a91636c3098f409d8c8c55a2bd255a32&callback=JSON_CALLBACK';
    };

function instaScrub (inputArray, title) {
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
}

var page = {
  "san francisco 1": [
    {
      "title": {
        "text": "Marin Headlands",
        "href": "http://www.tripadvisor.com/Attraction_Review-g60713-d103182-Reviews-Marin_Headlands-San_Francisco_California.html"
      },
      "attractionNum": "#1 of 364 attractions in San Francisco",
      "rating": {
        "src": "http://c1.tacdn.com/img2/x.gif",
        "alt": "5 of 5 stars"
      },
      "reviews": {
        "text": "1,185 reviews",
        "href": "http://www.tripadvisor.com/Attraction_Review-g60713-d103182-Reviews-Marin_Headlands-San_Francisco_California.html#REVIEWS"
      },
      "review1": {
        "text": "A Must Do with Awesome Views of th...",
        "href": "http://www.tripadvisor.com/ShowUserReviews-g60713-d103182-r209077820-Marin_Headlands-San_Francisco_California.html"
      },
      "review1Date": "06/05/2014",
      "review2": {
        "text": "The Other Side",
        "href": "http://www.tripadvisor.com/ShowUserReviews-g60713-d103182-r208744261-Marin_Headlands-San_Francisco_California.html"
      },
      "review2Date": "06/03/2014",
      "Category": "Category: State Parks; Nature/ Wildlife Areas",
      "description": [
        "Category: State Parks; Nature/ Wildlife Areas",
        "Located at the Point Bonita Lighthouse, these headlands offer a suspension bridge and hiking trail."
      ],
      "description2": [
        "Category: State Parks; Nature/ Wildlife Areas",
        "Located at the Point Bonita Lighthouse, these headlands offer a suspension bridge and hiking trail."
      ]
    },
    {
      "title": {
        "text": "Marrakech Magic Theater",
        "href": "http://www.tripadvisor.com/Attraction_Review-g60713-d2098477-Reviews-Marrakech_Magic_Theater-San_Francisco_California.html"
      },
      "attractionNum": "#2 of 364 attractions in San Francisco",
      "rating": {
        "src": "http://c1.tacdn.com/img2/x.gif",
        "alt": "5 of 5 stars"
      },
      "reviews": {
        "text": "558 reviews",
        "href": "http://www.tripadvisor.com/Attraction_Review-g60713-d2098477-Reviews-Marrakech_Magic_Theater-San_Francisco_California.html#REVIEWS"
      },
      "review1": {
        "text": "A Super \"Up-Close & Intimate\" Magi...",
        "href": "http://www.tripadvisor.com/ShowUserReviews-g60713-d2098477-r209060856-Marrakech_Magic_Theater-San_Francisco_California.html"
      },
      "review1Date": "06/05/2014",
      "review2": {
        "text": "Great entertainment!",
        "href": "http://www.tripadvisor.com/ShowUserReviews-g60713-d2098477-r209048412-Marrakech_Magic_Theater-San_Francisco_California.html"
      },
      "review2Date": "06/05/2014",
      "Category": "Category: Performances",
      "description": [
        "Category: Performances",
        "Owner description:\nAn uproarious one-of-a-kind close-up show in an intimate, historic setting. Featuring the comedy and classical magic of San...\nmore » \nOwner description:\nAn uproarious one-of-a-kind close-up show in an intimate, historic setting. Featuring the comedy and classical magic of San Francisco Magician Peter Morrison. Have an experience to last a lifetime. At The Marrakech Magic Theater, cherished memories are made during Peter Morrison's unique comedy and magic experience. The evening begins one hour before the show in the Sultan's Oasis lounge where guests can enjoy s little pre-show entertainment and meet and greet with Magician and host Peter Morrison. Drinks and appetizers are available for purchase as well during this hour before the main show. Your evening ends in the Magic Theater with Peter's unforgettable 75 minute performance in the Main Showroom. Have a stress-free night, full of laughter and sensational entertainment! The Main Showroom is an intimate close-up theater, perfect for high spirits and Peter's extraordinary performances. You'll witness intriguing feats of mentalism, sleight of hand miracles, and throughout, his clean comedy will keep you laughing! Have a remarkable evening-see a show so fantastic that you'll almost forget that you're still in San Francisco!\n« less"
      ],
      "description2": [
        "Category: Performances",
        "Owner description:\nAn uproarious one-of-a-kind close-up show in an intimate, historic setting. Featuring the comedy and classical magic of San...\nmore » \nOwner description:\nAn uproarious one-of-a-kind close-up show in an intimate, historic setting. Featuring the comedy and classical magic of San Francisco Magician Peter Morrison. Have an experience to last a lifetime. At The Marrakech Magic Theater, cherished memories are made during Peter Morrison's unique comedy and magic experience. The evening begins one hour before the show in the Sultan's Oasis lounge where guests can enjoy s little pre-show entertainment and meet and greet with Magician and host Peter Morrison. Drinks and appetizers are available for purchase as well during this hour before the main show. Your evening ends in the Magic Theater with Peter's unforgettable 75 minute performance in the Main Showroom. Have a stress-free night, full of laughter and sensational entertainment! The Main Showroom is an intimate close-up theater, perfect for high spirits and Peter's extraordinary performances. You'll witness intriguing feats of mentalism, sleight of hand miracles, and throughout, his clean comedy will keep you laughing! Have a remarkable evening-see a show so fantastic that you'll almost forget that you're still in San Francisco!\n« less"
      ]
    },
    {
      "title": {
        "text": "Golden Gate Bridge",
        "href": "http://www.tripadvisor.com/Attraction_Review-g60713-d104675-Reviews-Golden_Gate_Bridge-San_Francisco_California.html"
      },
      "attractionNum": "#3 of 364 attractions in San Francisco",
      "rating": {
        "src": "http://c1.tacdn.com/img2/x.gif",
        "alt": "4.5 of 5 stars"
      },
      "reviews": {
        "text": "10,637 reviews",
        "href": "http://www.tripadvisor.com/Attraction_Review-g60713-d104675-Reviews-Golden_Gate_Bridge-San_Francisco_California.html#REVIEWS"
      },
      "review1": {
        "text": "Iconic even in the fog!",
        "href": "http://www.tripadvisor.com/ShowUserReviews-g60713-d104675-r209084699-Golden_Gate_Bridge-San_Francisco_California.html"
      },
      "review1Date": "06/05/2014",
      "review2": {
        "text": "A Treasure of a Bridge in the U.S.",
        "href": "http://www.tripadvisor.com/ShowUserReviews-g60713-d104675-r209078001-Golden_Gate_Bridge-San_Francisco_California.html"
      },
      "review2Date": "06/05/2014",
      "Category": "Category: Bridges",
      "description": [
        "Category: Bridges",
        {
          "text": "The Golden Gate Bridge is not the oldest suspension bridge nor the newest.  It is no longer the tallest or the highest.  Yet it remains the most visited and photographed bridge in...\nmore »",
          "href": "http://www.tripadvisor.com/Travel-g60713-d104675/San-Francisco:California:Golden.Gate.Bridge.html"
        }
      ],
      "description2": [
        "Category: Bridges",
        {
          "text": "The Golden Gate Bridge is not the oldest suspension bridge nor the newest.  It is no longer the tallest or the highest.  Yet it remains the most visited and photographed bridge in...\nmore »",
          "href": "http://www.tripadvisor.com/Travel-g60713-d104675/San-Francisco:California:Golden.Gate.Bridge.html"
        }
      ]
    },
    {
      "title": {
        "text": "Alcatraz",
        "href": "http://www.tripadvisor.com/Attraction_Review-g60713-d102523-Reviews-Alcatraz-San_Francisco_California.html"
      },
      "attractionNum": "#4 of 364 attractions in San Francisco",
      "rating": {
        "src": "http://c1.tacdn.com/img2/x.gif",
        "alt": "4.5 of 5 stars"
      },
      "reviews": {
        "text": "13,573 reviews",
        "href": "http://www.tripadvisor.com/Attraction_Review-g60713-d102523-Reviews-Alcatraz-San_Francisco_California.html#REVIEWS"
      },
      "review1": {
        "text": "A fascinating insight",
        "href": "http://www.tripadvisor.com/ShowUserReviews-g60713-d102523-r209083271-Alcatraz-San_Francisco_California.html"
      },
      "review1Date": "06/05/2014",
      "review2": {
        "text": "Go! Great historical sight!",
        "href": "http://www.tripadvisor.com/ShowUserReviews-g60713-d102523-r209077732-Alcatraz-San_Francisco_California.html"
      },
      "review2Date": "06/05/2014",
      "Category": "Category: Historic Sites; Islands; National Parks; Nature/ Wildlife Areas; Lighthouses; Natural History Museums",
      "description": [
        "Category: Historic Sites; Islands; National Parks; Nature/ Wildlife Areas; Lighthouses; Natural History Museums",
        {
          "text": "Alcatraz Island, located in the middle of San Francisco Bay, is a must-see attraction for any visitor to the area.  One of the most infamous prisons in the country for housing...\nmore »",
          "href": "http://www.tripadvisor.com/Travel-g60713-d102523/San-Francisco:California:Alcatraz.html"
        }
      ],
      "description2": [
        "Category: Historic Sites; Islands; National Parks; Nature/ Wildlife Areas; Lighthouses; Natural History Museums",
        {
          "text": "Alcatraz Island, located in the middle of San Francisco Bay, is a must-see attraction for any visitor to the area.  One of the most infamous prisons in the country for housing...\nmore »",
          "href": "http://www.tripadvisor.com/Travel-g60713-d102523/San-Francisco:California:Alcatraz.html"
        }
      ]
    },
    {
      "title": {
        "text": "San Francisco Bay",
        "href": "http://www.tripadvisor.com/Attraction_Review-g60713-d106745-Reviews-San_Francisco_Bay-San_Francisco_California.html"
      },
      "attractionNum": "#5 of 364 attractions in San Francisco",
      "rating": {
        "src": "http://c1.tacdn.com/img2/x.gif",
        "alt": "4.5 of 5 stars"
      },
      "reviews": {
        "text": "1,818 reviews",
        "href": "http://www.tripadvisor.com/Attraction_Review-g60713-d106745-Reviews-San_Francisco_Bay-San_Francisco_California.html#REVIEWS"
      },
      "review1": {
        "text": "New...",
        "href": "http://www.tripadvisor.com/ShowUserReviews-g60713-d106745-r209036523-San_Francisco_Bay-San_Francisco_California.html"
      },
      "review1Date": "06/05/2014",
      "review2": {
        "text": "Beautiful Views",
        "href": "http://www.tripadvisor.com/ShowUserReviews-g60713-d106745-r208946032-San_Francisco_Bay-San_Francisco_California.html"
      },
      "review2Date": "06/05/2014",
      "Category": "Category: Bodies of Water",
      "description": [
        "Category: Bodies of Water",
        "Owner description:\nOffers hiking and biking along its shores, paddling and sailing on top of its surface, and bird-watching and exploring among...\nmore » \nOwner description:\nOffers hiking and biking along its shores, paddling and sailing on top of its surface, and bird-watching and exploring among its wetlands.\n« less"
      ],
      "description2": [
        "Category: Bodies of Water",
        "Owner description:\nOffers hiking and biking along its shores, paddling and sailing on top of its surface, and bird-watching and exploring among...\nmore » \nOwner description:\nOffers hiking and biking along its shores, paddling and sailing on top of its surface, and bird-watching and exploring among its wetlands.\n« less"
      ]
    },
    {
      "title": {
        "text": "AT&T Park",
        "href": "http://www.tripadvisor.com/Attraction_Review-g60713-d557330-Reviews-AT_T_Park-San_Francisco_California.html"
      },
      "attractionNum": "#6 of 364 attractions in San Francisco",
      "rating": {
        "src": "http://c1.tacdn.com/img2/x.gif",
        "alt": "4.5 of 5 stars"
      },
      "reviews": {
        "text": "1,811 reviews",
        "href": "http://www.tripadvisor.com/Attraction_Review-g60713-d557330-Reviews-AT_T_Park-San_Francisco_California.html#REVIEWS"
      },
      "review1": {
        "text": "Baseball",
        "href": "http://www.tripadvisor.com/ShowUserReviews-g60713-d557330-r209037025-AT_T_Park-San_Francisco_California.html"
      },
      "review1Date": "06/05/2014",
      "review2": {
        "text": "Great facilities!",
        "href": "http://www.tripadvisor.com/ShowUserReviews-g60713-d557330-r209012361-AT_T_Park-San_Francisco_California.html"
      },
      "review2Date": "06/05/2014",
      "Category": "Category: Arenas/ Stadiums/ Fields",
      "description": [
        "Category: Arenas/ Stadiums/ Fields",
        {
          "text": "ATT Park opened as the home of the San Francisco Giants in 2000.  It has sweeping views of the city and of the Bay.  \nmore »",
          "href": "http://www.tripadvisor.com/Travel-g60713-d557330/San-Francisco:California:At.And.T.Park.html"
        }
      ],
      "description2": [
        "Category: Arenas/ Stadiums/ Fields",
        {
          "text": "ATT Park opened as the home of the San Francisco Giants in 2000.  It has sweeping views of the city and of the Bay.  \nmore »",
          "href": "http://www.tripadvisor.com/Travel-g60713-d557330/San-Francisco:California:At.And.T.Park.html"
        }
      ]
    },
    {
      "title": {
        "text": "Lands End",
        "href": "http://www.tripadvisor.com/Attraction_Review-g60713-d117409-Reviews-Lands_End-San_Francisco_California.html"
      },
      "attractionNum": "#7 of 364 attractions in San Francisco",
      "rating": {
        "src": "http://c1.tacdn.com/img2/x.gif",
        "alt": "4.5 of 5 stars"
      },
      "reviews": {
        "text": "680 reviews",
        "href": "http://www.tripadvisor.com/Attraction_Review-g60713-d117409-Reviews-Lands_End-San_Francisco_California.html#REVIEWS"
      },
      "review1": {
        "text": "Great view of the Pacific",
        "href": "http://www.tripadvisor.com/ShowUserReviews-g60713-d117409-r208991341-Lands_End-San_Francisco_California.html"
      },
      "review1Date": "06/05/2014",
      "review2": {
        "text": "Pacific Ocean meets SF Bay",
        "href": "http://www.tripadvisor.com/ShowUserReviews-g60713-d117409-r208789002-Lands_End-San_Francisco_California.html"
      },
      "review2Date": "06/03/2014",
      "Category": "Category: Hiking Trails",
      "description": [
        "Category: Hiking Trails",
        "Owner description:\nAt the northwestern corner of San Francisco, there is a series of stunning views at every turn in this wild and windy trail....\nmore » \nOwner description:\nAt the northwestern corner of San Francisco, there is a series of stunning views at every turn in this wild and windy trail. Hillsides of cypress and wildflowers, views of shipwrecks and access to the ruins of Sutro baths, a San Francisco specials memory.\n« less"
      ],
      "description2": [
        "Category: Hiking Trails",
        "Owner description:\nAt the northwestern corner of San Francisco, there is a series of stunning views at every turn in this wild and windy trail....\nmore » \nOwner description:\nAt the northwestern corner of San Francisco, there is a series of stunning views at every turn in this wild and windy trail. Hillsides of cypress and wildflowers, views of shipwrecks and access to the ruins of Sutro baths, a San Francisco specials memory.\n« less"
      ]
    },
    {
      "title": {
        "text": "Beach Blanket Babylon",
        "href": "http://www.tripadvisor.com/Attraction_Review-g60713-d142394-Reviews-Beach_Blanket_Babylon-San_Francisco_California.html"
      },
      "attractionNum": "#8 of 364 attractions in San Francisco",
      "rating": {
        "src": "http://c1.tacdn.com/img2/x.gif",
        "alt": "4.5 of 5 stars"
      },
      "reviews": {
        "text": "1,091 reviews",
        "href": "http://www.tripadvisor.com/Attraction_Review-g60713-d142394-Reviews-Beach_Blanket_Babylon-San_Francisco_California.html#REVIEWS"
      },
      "review1": {
        "text": "Too Funny!!",
        "href": "http://www.tripadvisor.com/ShowUserReviews-g60713-d142394-r208594058-Beach_Blanket_Babylon-San_Francisco_California.html"
      },
      "review1Date": "06/02/2014",
      "review2": {
        "text": "Fun Evening",
        "href": "http://www.tripadvisor.com/ShowUserReviews-g60713-d142394-r208427670-Beach_Blanket_Babylon-San_Francisco_California.html"
      },
      "review2Date": "06/01/2014",
      "Category": "Category: Performances",
      "description": [
        "Category: Performances",
        "Owner description:\nOn June 7, 1974, Steve Silver produced a small show in the back room of the Savoy Tivoli Restaurant in San Francisco. The...\nmore » \nOwner description:\nOn June 7, 1974, Steve Silver produced a small show in the back room of the Savoy Tivoli Restaurant in San Francisco. The show was to run for six weeks. That was over 37 years ago... Today, Steve Silver's Beach Blanket Babylon has the distinguished title of \"World's Longest Running Musical Revue.\" The show - a musical spoof known internationally for its extravagant costumes, outrageous hats, show-stopping numbers and hilarious puns of pop culture and political character - has been seen by over 5.5 Million people, including HRC Queen Elizabeth II, Prince Charles and Camilla the Duchess of Cornwall as well as some of Hollywood's biggest stars.\"Steve Silver's Beach Blanket Babylon,\" hailed as \"a constant cascade of showstoppers\" by the \"San Francisco Chronicle\", follows Snow White as she takes a fast-paced journey around the world in search of her \"Prince Charming.\" Along the way she encounters a star-studded, ever-changing line-up of hilarious pop-culture characters, including President Barack & Michelle Obama, Gangnam Style, Prince William, Kate Middleton and the Queen of England, Honey Boo Boo, Governor Jerry Brown, Justin Bieber, Nicki Minaj, Hilary & Bill Clinton, Oprah Winfrey, Nancy Pelosi, Michael Jackson, Adele, General David Patraeus, \"50 Shades of Grey,\" and The San Francisco Giants.\n« less"
      ],
      "description2": [
        "Category: Performances",
        "Owner description:\nOn June 7, 1974, Steve Silver produced a small show in the back room of the Savoy Tivoli Restaurant in San Francisco. The...\nmore » \nOwner description:\nOn June 7, 1974, Steve Silver produced a small show in the back room of the Savoy Tivoli Restaurant in San Francisco. The show was to run for six weeks. That was over 37 years ago... Today, Steve Silver's Beach Blanket Babylon has the distinguished title of \"World's Longest Running Musical Revue.\" The show - a musical spoof known internationally for its extravagant costumes, outrageous hats, show-stopping numbers and hilarious puns of pop culture and political character - has been seen by over 5.5 Million people, including HRC Queen Elizabeth II, Prince Charles and Camilla the Duchess of Cornwall as well as some of Hollywood's biggest stars.\"Steve Silver's Beach Blanket Babylon,\" hailed as \"a constant cascade of showstoppers\" by the \"San Francisco Chronicle\", follows Snow White as she takes a fast-paced journey around the world in search of her \"Prince Charming.\" Along the way she encounters a star-studded, ever-changing line-up of hilarious pop-culture characters, including President Barack & Michelle Obama, Gangnam Style, Prince William, Kate Middleton and the Queen of England, Honey Boo Boo, Governor Jerry Brown, Justin Bieber, Nicki Minaj, Hilary & Bill Clinton, Oprah Winfrey, Nancy Pelosi, Michael Jackson, Adele, General David Patraeus, \"50 Shades of Grey,\" and The San Francisco Giants.\n« less"
      ]
    },
    {
      "title": {
        "text": "Golden Gate National Recreation Area",
        "href": "http://www.tripadvisor.com/Attraction_Review-g60713-d104207-Reviews-Golden_Gate_National_Recreation_Area-San_Francisco_California.html"
      },
      "attractionNum": "#9 of 364 attractions in San Francisco",
      "rating": {
        "src": "http://c1.tacdn.com/img2/x.gif",
        "alt": "4.5 of 5 stars"
      },
      "reviews": {
        "text": "376 reviews",
        "href": "http://www.tripadvisor.com/Attraction_Review-g60713-d104207-Reviews-Golden_Gate_National_Recreation_Area-San_Francisco_California.html#REVIEWS"
      },
      "review1": {
        "text": "A must",
        "href": "http://www.tripadvisor.com/ShowUserReviews-g60713-d104207-r208935983-Golden_Gate_National_Recreation_Area-San_Francisco_California.html"
      },
      "review1Date": "06/04/2014",
      "review2": {
        "text": "Bigger than Central Park",
        "href": "http://www.tripadvisor.com/ShowUserReviews-g60713-d104207-r208745322-Golden_Gate_National_Recreation_Area-San_Francisco_California.html"
      },
      "review2Date": "06/03/2014",
      "Category": "Category: Parks; National Parks; State Parks",
      "description": [
        "Category: Parks; National Parks; State Parks",
        "Owner description:\nGolden Gate National Recreation Area, the nation's largest national park in an urban area, encompasses nearly 81,000 acres....\nmore » \nOwner description:\nGolden Gate National Recreation Area, the nation's largest national park in an urban area, encompasses nearly 81,000 acres. Spanning Marin, San Francisco, and San Mateo Counties, Golden Gate National Recreation Area also includes areas such as Alcatraz Island, Muir Woods National Monument, Fort Point National Historic Site, Presidio of San Francisco, and the Marin Headlands. Best to visit our website to see what other areas of the park we cover.\n« less"
      ],
      "description2": [
        "Category: Parks; National Parks; State Parks",
        "Owner description:\nGolden Gate National Recreation Area, the nation's largest national park in an urban area, encompasses nearly 81,000 acres....\nmore » \nOwner description:\nGolden Gate National Recreation Area, the nation's largest national park in an urban area, encompasses nearly 81,000 acres. Spanning Marin, San Francisco, and San Mateo Counties, Golden Gate National Recreation Area also includes areas such as Alcatraz Island, Muir Woods National Monument, Fort Point National Historic Site, Presidio of San Francisco, and the Marin Headlands. Best to visit our website to see what other areas of the park we cover.\n« less"
      ]
    },
    {
      "title": {
        "text": "Golden Gate Park",
        "href": "http://www.tripadvisor.com/Attraction_Review-g60713-d311684-Reviews-Golden_Gate_Park-San_Francisco_California.html"
      },
      "attractionNum": "#10 of 364 attractions in San Francisco",
      "rating": {
        "src": "http://c1.tacdn.com/img2/x.gif",
        "alt": "4.5 of 5 stars"
      },
      "reviews": {
        "text": "2,759 reviews",
        "href": "http://www.tripadvisor.com/Attraction_Review-g60713-d311684-Reviews-Golden_Gate_Park-San_Francisco_California.html#REVIEWS"
      },
      "review1": {
        "text": "Excellent City Environmental Treas...",
        "href": "http://www.tripadvisor.com/ShowUserReviews-g60713-d311684-r209071236-Golden_Gate_Park-San_Francisco_California.html"
      },
      "review1Date": "06/05/2014",
      "review2": {
        "text": "Beautiful park",
        "href": "http://www.tripadvisor.com/ShowUserReviews-g60713-d311684-r209052379-Golden_Gate_Park-San_Francisco_California.html"
      },
      "review2Date": "06/05/2014",
      "Category": "Category: Parks",
      "description": [
        "Category: Parks",
        {
          "text": "The Golden Gate Park is a large urban park configured in a rectangular shape, much like the famous Central Park of New York City.  The park contains gardens, museums and ample...\nmore »",
          "href": "http://www.tripadvisor.com/Travel-g60713-d311684/San-Francisco:California:Golden.Gate.Park.html"
        }
      ],
      "description2": [
        "Category: Parks",
        {
          "text": "The Golden Gate Park is a large urban park configured in a rectangular shape, much like the famous Central Park of New York City.  The park contains gardens, museums and ample...\nmore »",
          "href": "http://www.tripadvisor.com/Travel-g60713-d311684/San-Francisco:California:Golden.Gate.Park.html"
        }
      ]
    },
    {
      "title": {
        "text": "San Francisco Magic Show",
        "href": "http://www.tripadvisor.com/Attraction_Review-g60713-d2444698-Reviews-San_Francisco_Magic_Show-San_Francisco_California.html"
      },
      "attractionNum": "#11 of 364 attractions in San Francisco",
      "rating": {
        "src": "http://c1.tacdn.com/img2/x.gif",
        "alt": "5 of 5 stars"
      },
      "reviews": {
        "text": "118 reviews",
        "href": "http://www.tripadvisor.com/Attraction_Review-g60713-d2444698-Reviews-San_Francisco_Magic_Show-San_Francisco_California.html#REVIEWS"
      },
      "review1": {
        "text": "Entertainning",
        "href": "http://www.tripadvisor.com/ShowUserReviews-g60713-d2444698-r207997902-San_Francisco_Magic_Show-San_Francisco_California.html"
      },
      "review1Date": "05/30/2014",
      "review2": {
        "text": "Great Meaning",
        "href": "http://www.tripadvisor.com/ShowUserReviews-g60713-d2444698-r207394638-San_Francisco_Magic_Show-San_Francisco_California.html"
      },
      "review2Date": "05/27/2014",
      "Category": "Category: Performances",
      "description": [
        "Category: Performances",
        "Owner description:\nSan Francisco’s Aquarium of the Bay at Pier 39 proudly presents “The San Francisco Magic Show” at the newly remodeled 270...\nmore » \nOwner description:\nSan Francisco’s Aquarium of the Bay at Pier 39 proudly presents “The San Francisco Magic Show” at the newly remodeled 270 seat Bay Theater, starring Las Vegas Comedy Magician Timothy Noonan.“The San Francisco Magic Show” – is a 60 minute, hilarious, family-friendly comedy magic experience! Perfect for families, couples, and visitors just like you, this magical experience is a perfect blend of Timothy Noonan’s amazing magic and “laugh-out-loud” comedy!\n« less"
      ],
      "description2": [
        "Category: Performances",
        "Owner description:\nSan Francisco’s Aquarium of the Bay at Pier 39 proudly presents “The San Francisco Magic Show” at the newly remodeled 270...\nmore » \nOwner description:\nSan Francisco’s Aquarium of the Bay at Pier 39 proudly presents “The San Francisco Magic Show” at the newly remodeled 270 seat Bay Theater, starring Las Vegas Comedy Magician Timothy Noonan.“The San Francisco Magic Show” – is a 60 minute, hilarious, family-friendly comedy magic experience! Perfect for families, couples, and visitors just like you, this magical experience is a perfect blend of Timothy Noonan’s amazing magic and “laugh-out-loud” comedy!\n« less"
      ]
    },
    {
      "title": {
        "text": "Legion of Honor",
        "href": "http://www.tripadvisor.com/Attraction_Review-g60713-d156333-Reviews-Legion_of_Honor-San_Francisco_California.html"
      },
      "attractionNum": "#12 of 364 attractions in San Francisco",
      "rating": {
        "src": "http://c1.tacdn.com/img2/x.gif",
        "alt": "4.5 of 5 stars"
      },
      "reviews": {
        "text": "670 reviews",
        "href": "http://www.tripadvisor.com/Attraction_Review-g60713-d156333-Reviews-Legion_of_Honor-San_Francisco_California.html#REVIEWS"
      },
      "review1": {
        "text": "Nice Museum",
        "href": "http://www.tripadvisor.com/ShowUserReviews-g60713-d156333-r209040805-Legion_of_Honor-San_Francisco_California.html"
      },
      "review1Date": "06/05/2014",
      "review2": {
        "text": "An excellent art museum",
        "href": "http://www.tripadvisor.com/ShowUserReviews-g60713-d156333-r208863782-Legion_of_Honor-San_Francisco_California.html"
      },
      "review2Date": "06/04/2014",
      "Category": "Category: Art Museums",
      "description": [
        "Category: Art Museums",
        "An outstanding collection of European art in a gorgeous hilltop museum setting."
      ],
      "description2": [
        "Category: Art Museums",
        "An outstanding collection of European art in a gorgeous hilltop museum setting."
      ]
    },
    {
      "title": {
        "text": "Twin Peaks",
        "href": "http://www.tripadvisor.com/Attraction_Review-g60713-d105363-Reviews-Twin_Peaks-San_Francisco_California.html"
      },
      "attractionNum": "#13 of 364 attractions in San Francisco",
      "rating": {
        "src": "http://c1.tacdn.com/img2/x.gif",
        "alt": "4.5 of 5 stars"
      },
      "reviews": {
        "text": "1,374 reviews",
        "href": "http://www.tripadvisor.com/Attraction_Review-g60713-d105363-Reviews-Twin_Peaks-San_Francisco_California.html#REVIEWS"
      },
      "review1": {
        "text": "Backwoods in SF, with views",
        "href": "http://www.tripadvisor.com/ShowUserReviews-g60713-d105363-r209028090-Twin_Peaks-San_Francisco_California.html"
      },
      "review1Date": "06/05/2014",
      "review2": {
        "text": "Fantastic view",
        "href": "http://www.tripadvisor.com/ShowUserReviews-g60713-d105363-r209022492-Twin_Peaks-San_Francisco_California.html"
      },
      "review2Date": "06/05/2014",
      "Category": "Category: Scenic/ Historic Walking Areas; Mountains; Neighborhoods; Lookouts",
      "description": [
        "Category: Scenic/ Historic Walking Areas; Mountains; Neighborhoods; Lookouts",
        "A twenty-minute ride from downtown, this is the best place to catch a San Francisco sunrise."
      ],
      "description2": [
        "Category: Scenic/ Historic Walking Areas; Mountains; Neighborhoods; Lookouts",
        "A twenty-minute ride from downtown, this is the best place to catch a San Francisco sunrise."
      ]
    },
    {
      "title": {
        "text": "Palace of Fine Arts",
        "href": "http://www.tripadvisor.com/Attraction_Review-g60713-d104538-Reviews-Palace_of_Fine_Arts-San_Francisco_California.html"
      },
      "attractionNum": "#14 of 364 attractions in San Francisco",
      "rating": {
        "src": "http://c1.tacdn.com/img2/x.gif",
        "alt": "4.5 of 5 stars"
      },
      "reviews": {
        "text": "864 reviews",
        "href": "http://www.tripadvisor.com/Attraction_Review-g60713-d104538-Reviews-Palace_of_Fine_Arts-San_Francisco_California.html#REVIEWS"
      },
      "review1": {
        "text": "picture perfect in a sunny day",
        "href": "http://www.tripadvisor.com/ShowUserReviews-g60713-d104538-r209084596-Palace_of_Fine_Arts-San_Francisco_California.html"
      },
      "review1Date": "06/05/2014",
      "review2": {
        "text": "beautiful",
        "href": "http://www.tripadvisor.com/ShowUserReviews-g60713-d104538-r209035906-Palace_of_Fine_Arts-San_Francisco_California.html"
      },
      "review2Date": "06/05/2014",
      "Category": "Category: Art Museums",
      "description": [
        "Category: Art Museums",
        {
          "text": "The Palace of Fine Arts was built for the 1915 Panama-Pacific International Expo, which San Francisco hosted.  It was built to have the feel of an overgrown Roman ruin, and they...\nmore »",
          "href": "http://www.tripadvisor.com/Travel-g60713-d104538/San-Francisco:California:Palace.Of.Fine.Arts.html"
        }
      ],
      "description2": [
        "Category: Art Museums",
        {
          "text": "The Palace of Fine Arts was built for the 1915 Panama-Pacific International Expo, which San Francisco hosted.  It was built to have the feel of an overgrown Roman ruin, and they...\nmore »",
          "href": "http://www.tripadvisor.com/Travel-g60713-d104538/San-Francisco:California:Palace.Of.Fine.Arts.html"
        }
      ]
    },
    {
      "title": {
        "text": "Asian Art Museum",
        "href": "http://www.tripadvisor.com/Attraction_Review-g60713-d103857-Reviews-Asian_Art_Museum-San_Francisco_California.html"
      },
      "attractionNum": "#15 of 364 attractions in San Francisco",
      "rating": {
        "src": "http://c1.tacdn.com/img2/x.gif",
        "alt": "4.5 of 5 stars"
      },
      "reviews": {
        "text": "528 reviews",
        "href": "http://www.tripadvisor.com/Attraction_Review-g60713-d103857-Reviews-Asian_Art_Museum-San_Francisco_California.html#REVIEWS"
      },
      "review1": {
        "text": "Very interesting!",
        "href": "http://www.tripadvisor.com/ShowUserReviews-g60713-d103857-r208560067-Asian_Art_Museum-San_Francisco_California.html"
      },
      "review1Date": "06/02/2014",
      "review2": {
        "text": "Fabulous",
        "href": "http://www.tripadvisor.com/ShowUserReviews-g60713-d103857-r207865917-Asian_Art_Museum-San_Francisco_California.html"
      },
      "review2Date": "05/29/2014",
      "Category": "Category: Art Museums",
      "description": [
        "Category: Art Museums",
        {
          "text": "The Asian Art Museum is one of the best Asian art museums in the world so plan on spending several hours. The best introduction to the museum is to take one of the many free...\nmore »",
          "href": "http://www.tripadvisor.com/Travel-g60713-d103857/San-Francisco:California:Asian.Art.Museum.html"
        }
      ],
      "description2": [
        "Category: Art Museums",
        {
          "text": "The Asian Art Museum is one of the best Asian art museums in the world so plan on spending several hours. The best introduction to the museum is to take one of the many free...\nmore »",
          "href": "http://www.tripadvisor.com/Travel-g60713-d103857/San-Francisco:California:Asian.Art.Museum.html"
        }
      ]
    },
    {
      "title": {
        "text": "Walt Disney Family Museum",
        "href": "http://www.tripadvisor.com/Attraction_Review-g60713-d1556974-Reviews-Walt_Disney_Family_Museum-San_Francisco_California.html"
      },
      "attractionNum": "#16 of 364 attractions in San Francisco",
      "rating": {
        "src": "http://c1.tacdn.com/img2/x.gif",
        "alt": "4.5 of 5 stars"
      },
      "reviews": {
        "text": "792 reviews",
        "href": "http://www.tripadvisor.com/Attraction_Review-g60713-d1556974-Reviews-Walt_Disney_Family_Museum-San_Francisco_California.html#REVIEWS"
      },
      "review1": {
        "text": "History of Disney",
        "href": "http://www.tripadvisor.com/ShowUserReviews-g60713-d1556974-r208930497-Walt_Disney_Family_Museum-San_Francisco_California.html"
      },
      "review1Date": "06/04/2014",
      "review2": {
        "text": "Please don't bring the children",
        "href": "http://www.tripadvisor.com/ShowUserReviews-g60713-d1556974-r208930381-Walt_Disney_Family_Museum-San_Francisco_California.html"
      },
      "review2Date": "06/04/2014",
      "Category": "Category: Disney",
      "description": [
        "Category: Disney",
        {
          "text": "The Walt Disney History Museum is a wonderful museum dedicated to the life and times of Walt and his family, business associates, friends, etc.   The family has put on display...\nmore »",
          "href": "http://www.tripadvisor.com/Travel-g60713-d1556974/San-Francisco:California:Walt.Disney.Family.Museum.html"
        }
      ],
      "description2": [
        "Category: Disney",
        {
          "text": "The Walt Disney History Museum is a wonderful museum dedicated to the life and times of Walt and his family, business associates, friends, etc.   The family has put on display...\nmore »",
          "href": "http://www.tripadvisor.com/Travel-g60713-d1556974/San-Francisco:California:Walt.Disney.Family.Museum.html"
        }
      ]
    },
    {
      "title": {
        "text": "San Francisco Ballet",
        "href": "http://www.tripadvisor.com/Attraction_Review-g60713-d142414-Reviews-San_Francisco_Ballet-San_Francisco_California.html"
      },
      "attractionNum": "#17 of 364 attractions in San Francisco",
      "rating": {
        "src": "http://c1.tacdn.com/img2/x.gif",
        "alt": "4.5 of 5 stars"
      },
      "reviews": {
        "text": "67 reviews",
        "href": "http://www.tripadvisor.com/Attraction_Review-g60713-d142414-Reviews-San_Francisco_Ballet-San_Francisco_California.html#REVIEWS"
      },
      "review1": {
        "text": "Magnificent ballet company",
        "href": "http://www.tripadvisor.com/ShowUserReviews-g60713-d142414-r208421403-San_Francisco_Ballet-San_Francisco_California.html"
      },
      "review1Date": "06/01/2014",
      "review2": {
        "text": "Nutcracker",
        "href": "http://www.tripadvisor.com/ShowUserReviews-g60713-d142414-r207698027-San_Francisco_Ballet-San_Francisco_California.html"
      },
      "review2Date": "05/28/2014",
      "Category": "Category: Ballets",
      "description": [
        "Category: Ballets",
        {
          "text": "The San Francisco Ballet is the oldest classical ballet company in the country.  As a result, they are the first U.S. ballet company to perform full-length versions of Swan Lake...\nmore »",
          "href": "http://www.tripadvisor.com/Travel-g60713-d142414/San-Francisco:California:San.Francisco.Ballet.html"
        }
      ],
      "description2": [
        "Category: Ballets",
        {
          "text": "The San Francisco Ballet is the oldest classical ballet company in the country.  As a result, they are the first U.S. ballet company to perform full-length versions of Swan Lake...\nmore »",
          "href": "http://www.tripadvisor.com/Travel-g60713-d142414/San-Francisco:California:San.Francisco.Ballet.html"
        }
      ]
    },
    {
      "title": {
        "text": "San Francisco Opera",
        "href": "http://www.tripadvisor.com/Attraction_Review-g60713-d142412-Reviews-San_Francisco_Opera-San_Francisco_California.html"
      },
      "attractionNum": "#18 of 364 attractions in San Francisco",
      "rating": {
        "src": "http://c1.tacdn.com/img2/x.gif",
        "alt": "4.5 of 5 stars"
      },
      "reviews": {
        "text": "169 reviews",
        "href": "http://www.tripadvisor.com/Attraction_Review-g60713-d142412-Reviews-San_Francisco_Opera-San_Francisco_California.html#REVIEWS"
      },
      "review1": {
        "text": "Showboat: Wonderful",
        "href": "http://www.tripadvisor.com/ShowUserReviews-g60713-d142412-r208440876-San_Francisco_Opera-San_Francisco_California.html"
      },
      "review1Date": "06/02/2014",
      "review2": {
        "text": "You must see this at least once in...",
        "href": "http://www.tripadvisor.com/ShowUserReviews-g60713-d142412-r206334096-San_Francisco_Opera-San_Francisco_California.html"
      },
      "review2Date": "05/20/2014",
      "Category": "Category: Operas",
      "description": [
        "Category: Operas",
        {
          "text": "Opera season runs September through November.  Generally a dozen Operas are staged each season, running in repertory.  With little exception, the same Opera is not performed two...\nmore »",
          "href": "http://www.tripadvisor.com/Travel-g60713-d142412/San-Francisco:California:San.Francisco.Opera.html"
        }
      ],
      "description2": [
        "Category: Operas",
        {
          "text": "Opera season runs September through November.  Generally a dozen Operas are staged each season, running in repertory.  With little exception, the same Opera is not performed two...\nmore »",
          "href": "http://www.tripadvisor.com/Travel-g60713-d142412/San-Francisco:California:San.Francisco.Opera.html"
        }
      ]
    },
    {
      "title": {
        "text": "San Francisco Symphony",
        "href": "http://www.tripadvisor.com/Attraction_Review-g60713-d142413-Reviews-San_Francisco_Symphony-San_Francisco_California.html"
      },
      "attractionNum": "#19 of 364 attractions in San Francisco",
      "rating": {
        "src": "http://c1.tacdn.com/img2/x.gif",
        "alt": "4.5 of 5 stars"
      },
      "reviews": {
        "text": "126 reviews",
        "href": "http://www.tripadvisor.com/Attraction_Review-g60713-d142413-Reviews-San_Francisco_Symphony-San_Francisco_California.html#REVIEWS"
      },
      "review1": {
        "text": "No working pianos at the San Franc...",
        "href": "http://www.tripadvisor.com/ShowUserReviews-g60713-d142413-r208566163-San_Francisco_Symphony-San_Francisco_California.html"
      },
      "review1Date": "06/02/2014",
      "review2": {
        "text": "Go to a daytime rehearsal!",
        "href": "http://www.tripadvisor.com/ShowUserReviews-g60713-d142413-r208495238-San_Francisco_Symphony-San_Francisco_California.html"
      },
      "review2Date": "06/02/2014",
      "Category": "Category: Symphonies",
      "description": [
        "Category: Symphonies",
        "Owner description:\nPresents and performs over 220 concerts annually, from September through July. In 2011-12 celebrates its 100th centennial...\nmore » \nOwner description:\nPresents and performs over 220 concerts annually, from September through July. In 2011-12 celebrates its 100th centennial season- learn more at our website.\n« less"
      ],
      "description2": [
        "Category: Symphonies",
        "Owner description:\nPresents and performs over 220 concerts annually, from September through July. In 2011-12 celebrates its 100th centennial...\nmore » \nOwner description:\nPresents and performs over 220 concerts annually, from September through July. In 2011-12 celebrates its 100th centennial season- learn more at our website.\n« less"
      ]
    },
    {
      "title": {
        "text": "The Exploratorium",
        "href": "http://www.tripadvisor.com/Attraction_Review-g60713-d102775-Reviews-The_Exploratorium-San_Francisco_California.html"
      },
      "attractionNum": "#20 of 364 attractions in San Francisco",
      "rating": {
        "src": "http://c1.tacdn.com/img2/x.gif",
        "alt": "4.5 of 5 stars"
      },
      "reviews": {
        "text": "595 reviews",
        "href": "http://www.tripadvisor.com/Attraction_Review-g60713-d102775-Reviews-The_Exploratorium-San_Francisco_California.html#REVIEWS"
      },
      "review1": {
        "text": "interesting for family",
        "href": "http://www.tripadvisor.com/ShowUserReviews-g60713-d102775-r209036708-The_Exploratorium-San_Francisco_California.html"
      },
      "review1Date": "06/05/2014",
      "review2": {
        "text": "I LOVE THIS PLACE!!!",
        "href": "http://www.tripadvisor.com/ShowUserReviews-g60713-d102775-r208946147-The_Exploratorium-San_Francisco_California.html"
      },
      "review2Date": "06/05/2014",
      "Category": "Category: Science Museums; Children's Museums",
      "description": [
        "Category: Science Museums; Children's Museums",
        "Owner description:\nEnter a world of hands-on curiosity, discovery and play.Experience the Exploratorium, a unique interactive museum dedicated...\nmore » \nOwner description:\nEnter a world of hands-on curiosity, discovery and play.Experience the Exploratorium, a unique interactive museum dedicated to the excitement of experimentation, the pleasure of discovery, and power of play. Part museum, part laboratory, part studio, we make it possible for people to see the world around them through new eyes.Indulge your curiosity across six galleries and more than 600 exhibits, as you play, and discover new ways to understand the world around you.Located at Pier 15 along the Embarcadero, between Pier 39 and the Ferry Building, the Exploratorium is a newly polished gem with a restaurant on the Bay, two gift shops and new outdoor exhibits, all located at a nexus of public transit and ample parking.Advanced tickets are available online to ensure quick and easy entry and a great visit.\n« less"
      ],
      "description2": [
        "Category: Science Museums; Children's Museums",
        "Owner description:\nEnter a world of hands-on curiosity, discovery and play.Experience the Exploratorium, a unique interactive museum dedicated...\nmore » \nOwner description:\nEnter a world of hands-on curiosity, discovery and play.Experience the Exploratorium, a unique interactive museum dedicated to the excitement of experimentation, the pleasure of discovery, and power of play. Part museum, part laboratory, part studio, we make it possible for people to see the world around them through new eyes.Indulge your curiosity across six galleries and more than 600 exhibits, as you play, and discover new ways to understand the world around you.Located at Pier 15 along the Embarcadero, between Pier 39 and the Ferry Building, the Exploratorium is a newly polished gem with a restaurant on the Bay, two gift shops and new outdoor exhibits, all located at a nexus of public transit and ample parking.Advanced tickets are available online to ensure quick and easy entry and a great visit.\n« less"
      ]
    },
    {
      "title": {
        "text": "16th Ave Tiled Steps Project",
        "href": "http://www.tripadvisor.com/Attraction_Review-g60713-d3440316-Reviews-16th_Ave_Tiled_Steps_Project-San_Francisco_California.html"
      },
      "attractionNum": "#27 of 364 attractions in San Francisco",
      "rating": {
        "src": "http://c1.tacdn.com/img2/x.gif",
        "alt": "4.5 of 5 stars"
      },
      "reviews": {
        "text": "44 reviews",
        "href": "http://www.tripadvisor.com/Attraction_Review-g60713-d3440316-Reviews-16th_Ave_Tiled_Steps_Project-San_Francisco_California.html#REVIEWS"
      },
      "review1": {
        "text": "Amazing mosaics and succulent gard...",
        "href": "http://www.tripadvisor.com/ShowUserReviews-g60713-d3440316-r206808379-16th_Ave_Tiled_Steps_Project-San_Francisco_California.html"
      },
      "review1Date": "05/24/2014",
      "review2": {
        "text": "There are two of them now",
        "href": "http://www.tripadvisor.com/ShowUserReviews-g60713-d3440316-r206529322-16th_Ave_Tiled_Steps_Project-San_Francisco_California.html"
      },
      "review2Date": "05/21/2014",
      "Category": "Category: Landmarks/ Points of Interest",
      "description": "Category: Landmarks/ Points of Interest",
      "description2": "Category: Landmarks/ Points of Interest"
    },
    {
      "title": {
        "text": "California Academy of Sciences",
        "href": "http://www.tripadvisor.com/Attraction_Review-g60713-d117078-Reviews-California_Academy_of_Sciences-San_Francisco_California.html"
      },
      "attractionNum": "#21 of 364 attractions in San Francisco",
      "rating": {
        "src": "http://c1.tacdn.com/img2/x.gif",
        "alt": "4.5 of 5 stars"
      },
      "reviews": {
        "text": "1,441 reviews",
        "href": "http://www.tripadvisor.com/Attraction_Review-g60713-d117078-Reviews-California_Academy_of_Sciences-San_Francisco_California.html#REVIEWS"
      },
      "review1": {
        "text": "has a rainforest and aquarium",
        "href": "http://www.tripadvisor.com/ShowUserReviews-g60713-d117078-r209044383-California_Academy_of_Sciences-San_Francisco_California.html"
      },
      "review1Date": "06/05/2014",
      "review2": {
        "text": "Really Cool Place to Visit",
        "href": "http://www.tripadvisor.com/ShowUserReviews-g60713-d117078-r208679430-California_Academy_of_Sciences-San_Francisco_California.html"
      },
      "review2Date": "06/03/2014",
      "Category": "Category: Educational Sites; Science Museums; Aquariums; Observatories/ Planetariums; Natural History Museums",
      "description": [
        "Category: Educational Sites; Science Museums; Aquariums; Observatories/ Planetariums; Natural History Museums",
        "Owner description:\nThe world’s only aquarium-planetarium-rainforest-living museum. Come nose-to-beak with penguins and parrots, watch sharks and...\nmore » \nOwner description:\nThe world’s only aquarium-planetarium-rainforest-living museum. Come nose-to-beak with penguins and parrots, watch sharks and sting rays cruise beneath your feet, and feel the spray of the California coast. Fly to Mars (and beyond the Milky Way!) from the safety of your planetarium seat, take a virtual safari in African Hall, or climb into the canopy of a living rainforest. Face your fears—and an albino alligator—inside the Swamp, and meet scientists as they return from research expeditions around the world. From the depths of a Philippine coral reef to the outer reaches of the Universe, it's all inside the California Academy of Sciences.\n« less"
      ],
      "description2": [
        "Category: Educational Sites; Science Museums; Aquariums; Observatories/ Planetariums; Natural History Museums",
        "Owner description:\nThe world’s only aquarium-planetarium-rainforest-living museum. Come nose-to-beak with penguins and parrots, watch sharks and...\nmore » \nOwner description:\nThe world’s only aquarium-planetarium-rainforest-living museum. Come nose-to-beak with penguins and parrots, watch sharks and sting rays cruise beneath your feet, and feel the spray of the California coast. Fly to Mars (and beyond the Milky Way!) from the safety of your planetarium seat, take a virtual safari in African Hall, or climb into the canopy of a living rainforest. Face your fears—and an albino alligator—inside the Swamp, and meet scientists as they return from research expeditions around the world. From the depths of a Philippine coral reef to the outer reaches of the Universe, it's all inside the California Academy of Sciences.\n« less"
      ]
    },
    {
      "title": {
        "text": "Crissy Field",
        "href": "http://www.tripadvisor.com/Attraction_Review-g60713-d144990-Reviews-Crissy_Field-San_Francisco_California.html"
      },
      "attractionNum": "#22 of 364 attractions in San Francisco",
      "rating": {
        "src": "http://c1.tacdn.com/img2/x.gif",
        "alt": "4.5 of 5 stars"
      },
      "reviews": {
        "text": "500 reviews",
        "href": "http://www.tripadvisor.com/Attraction_Review-g60713-d144990-Reviews-Crissy_Field-San_Francisco_California.html#REVIEWS"
      },
      "review1": {
        "text": "Great view of the Golden Gate Brid...",
        "href": "http://www.tripadvisor.com/ShowUserReviews-g60713-d144990-r208949256-Crissy_Field-San_Francisco_California.html"
      },
      "review1Date": "06/05/2014",
      "review2": {
        "text": "Great Views of the Bridge",
        "href": "http://www.tripadvisor.com/ShowUserReviews-g60713-d144990-r208684258-Crissy_Field-San_Francisco_California.html"
      },
      "review2Date": "06/03/2014",
      "Category": "Category: Parks",
      "description": [
        "Category: Parks",
        "A popular park for jogging, picnics, biking, and sightseeing."
      ],
      "description2": [
        "Category: Parks",
        "A popular park for jogging, picnics, biking, and sightseeing."
      ]
    },
    {
      "title": {
        "text": "Angel Island State Park",
        "href": "http://www.tripadvisor.com/Attraction_Review-g60713-d208341-Reviews-Angel_Island_State_Park-San_Francisco_California.html"
      },
      "attractionNum": "#23 of 364 attractions in San Francisco",
      "rating": {
        "src": "http://c1.tacdn.com/img2/x.gif",
        "alt": "4.5 of 5 stars"
      },
      "reviews": {
        "text": "255 reviews",
        "href": "http://www.tripadvisor.com/Attraction_Review-g60713-d208341-Reviews-Angel_Island_State_Park-San_Francisco_California.html#REVIEWS"
      },
      "review1": {
        "text": "A Day Well Spent",
        "href": "http://www.tripadvisor.com/ShowUserReviews-g60713-d208341-r208649746-Angel_Island_State_Park-San_Francisco_California.html"
      },
      "review1Date": "06/03/2014",
      "review2": {
        "text": "Great day on the island",
        "href": "http://www.tripadvisor.com/ShowUserReviews-g60713-d208341-r208604367-Angel_Island_State_Park-San_Francisco_California.html"
      },
      "review2Date": "06/02/2014",
      "Category": "Category: Islands; State Parks; Nature/ Wildlife Areas; Military Bases/ Facilities; Historic Sites; Hiking Trails; Parks",
      "description": [
        "Category: Islands; State Parks; Nature/ Wildlife Areas; Military Bases/ Facilities; Historic Sites; Hiking Trails; Parks",
        "Owner description:\nThe largest island in San Francisco Bay features magnificent views of Marin County and San Francisco, while offering a wide...\nmore » \nOwner description:\nThe largest island in San Francisco Bay features magnificent views of Marin County and San Francisco, while offering a wide variety of recreation for outdoor enthusiasts.\n« less"
      ],
      "description2": [
        "Category: Islands; State Parks; Nature/ Wildlife Areas; Military Bases/ Facilities; Historic Sites; Hiking Trails; Parks",
        "Owner description:\nThe largest island in San Francisco Bay features magnificent views of Marin County and San Francisco, while offering a wide...\nmore » \nOwner description:\nThe largest island in San Francisco Bay features magnificent views of Marin County and San Francisco, while offering a wide variety of recreation for outdoor enthusiasts.\n« less"
      ]
    },
    {
      "title": {
        "text": "Musee Mecanique",
        "href": "http://www.tripadvisor.com/Attraction_Review-g60713-d104542-Reviews-Musee_Mecanique-San_Francisco_California.html"
      },
      "attractionNum": "#24 of 364 attractions in San Francisco",
      "rating": {
        "src": "http://c1.tacdn.com/img2/x.gif",
        "alt": "4.5 of 5 stars"
      },
      "reviews": {
        "text": "496 reviews",
        "href": "http://www.tripadvisor.com/Attraction_Review-g60713-d104542-Reviews-Musee_Mecanique-San_Francisco_California.html#REVIEWS"
      },
      "review1": {
        "text": "Feels Like Being At Playland At Th...",
        "href": "http://www.tripadvisor.com/ShowUserReviews-g60713-d104542-r208619510-Musee_Mecanique-San_Francisco_California.html"
      },
      "review1Date": "06/03/2014",
      "review2": {
        "text": "Spooky and fascinating",
        "href": "http://www.tripadvisor.com/ShowUserReviews-g60713-d104542-r208585450-Musee_Mecanique-San_Francisco_California.html"
      },
      "review2Date": "06/02/2014",
      "Category": "Category: Specialty Museums; Museums",
      "description": [
        "Category: Specialty Museums; Museums",
        "This superb collection of mechanical games and toys will entice people of all ages."
      ],
      "description2": [
        "Category: Specialty Museums; Museums",
        "This superb collection of mechanical games and toys will entice people of all ages."
      ]
    },
    {
      "title": {
        "text": "Baker Beach",
        "href": "http://www.tripadvisor.com/Attraction_Review-g60713-d754023-Reviews-Baker_Beach-San_Francisco_California.html"
      },
      "attractionNum": "#25 of 364 attractions in San Francisco",
      "rating": {
        "src": "http://c1.tacdn.com/img2/x.gif",
        "alt": "4.5 of 5 stars"
      },
      "reviews": {
        "text": "125 reviews",
        "href": "http://www.tripadvisor.com/Attraction_Review-g60713-d754023-Reviews-Baker_Beach-San_Francisco_California.html#REVIEWS"
      },
      "review1": {
        "text": "Peaceful beach with views of the G...",
        "href": "http://www.tripadvisor.com/ShowUserReviews-g60713-d754023-r208994411-Baker_Beach-San_Francisco_California.html"
      },
      "review1Date": "06/05/2014",
      "review2": {
        "text": "Better than Ocean Beach!",
        "href": "http://www.tripadvisor.com/ShowUserReviews-g60713-d754023-r208710857-Baker_Beach-San_Francisco_California.html"
      },
      "review2Date": "06/03/2014",
      "Category": "Category: Beaches",
      "description": [
        "Category: Beaches",
        "Owner description:\nMile-long Baker Beach lies at the foot of rugged serpentine cliffs west of the Golden Gate. Large waves, undertow and rip...\nmore » \nOwner description:\nMile-long Baker Beach lies at the foot of rugged serpentine cliffs west of the Golden Gate. Large waves, undertow and rip currents make the beach unsafe for swimming, but it provides panoramic views of the Golden Gate Bridge, Marin Headlands and Lands End. You can fish or check out the shorelife along the beach and rocky shoreline. Restrooms and picnic tables are nearby.\n« less"
      ],
      "description2": [
        "Category: Beaches",
        "Owner description:\nMile-long Baker Beach lies at the foot of rugged serpentine cliffs west of the Golden Gate. Large waves, undertow and rip...\nmore » \nOwner description:\nMile-long Baker Beach lies at the foot of rugged serpentine cliffs west of the Golden Gate. Large waves, undertow and rip currents make the beach unsafe for swimming, but it provides panoramic views of the Golden Gate Bridge, Marin Headlands and Lands End. You can fish or check out the shorelife along the beach and rocky shoreline. Restrooms and picnic tables are nearby.\n« less"
      ]
    },
    {
      "title": {
        "text": "Cable Car Museum",
        "href": "http://www.tripadvisor.com/Attraction_Review-g60713-d104939-Reviews-Cable_Car_Museum-San_Francisco_California.html"
      },
      "attractionNum": "#26 of 364 attractions in San Francisco",
      "rating": {
        "src": "http://c1.tacdn.com/img2/x.gif",
        "alt": "4.5 of 5 stars"
      },
      "reviews": {
        "text": "1,000 reviews",
        "href": "http://www.tripadvisor.com/Attraction_Review-g60713-d104939-Reviews-Cable_Car_Museum-San_Francisco_California.html#REVIEWS"
      },
      "review1": {
        "text": "A fascinating insight!",
        "href": "http://www.tripadvisor.com/ShowUserReviews-g60713-d104939-r209084123-Cable_Car_Museum-San_Francisco_California.html"
      },
      "review1Date": "06/05/2014",
      "review2": {
        "text": "Definitely worth a look - free, fa...",
        "href": "http://www.tripadvisor.com/ShowUserReviews-g60713-d104939-r208860950-Cable_Car_Museum-San_Francisco_California.html"
      },
      "review2Date": "06/04/2014",
      "Category": "Category: Specialty Museums",
      "description": [
        "Category: Specialty Museums",
        "A museum to San Francisco's beloved cable cars, with a subterranean walkway that lets you see the moving cable."
      ],
      "description2": [
        "Category: Specialty Museums",
        "A museum to San Francisco's beloved cable cars, with a subterranean walkway that lets you see the moving cable."
      ]
    },
    {
      "title": {
        "text": "Castro Theatre",
        "href": "http://www.tripadvisor.com/Attraction_Review-g60713-d270041-Reviews-Castro_Theatre-San_Francisco_California.html"
      },
      "attractionNum": "#28 of 364 attractions in San Francisco",
      "rating": {
        "src": "http://c1.tacdn.com/img2/x.gif",
        "alt": "4.5 of 5 stars"
      },
      "reviews": {
        "text": "194 reviews",
        "href": "http://www.tripadvisor.com/Attraction_Review-g60713-d270041-Reviews-Castro_Theatre-San_Francisco_California.html#REVIEWS"
      },
      "review1": {
        "text": "An experience of a lifetime",
        "href": "http://www.tripadvisor.com/ShowUserReviews-g60713-d270041-r208035489-Castro_Theatre-San_Francisco_California.html"
      },
      "review1Date": "05/30/2014",
      "review2": {
        "text": "Retro",
        "href": "http://www.tripadvisor.com/ShowUserReviews-g60713-d270041-r208021309-Castro_Theatre-San_Francisco_California.html"
      },
      "review2Date": "05/30/2014",
      "Category": "Category: Movie Theaters",
      "description": [
        "Category: Movie Theaters",
        {
          "text": "The Castro Movie Theater was built in 1922 by the Nasser borthers, entrepreneurs who started a nickelodeon in 1908 in the  neighborhood. One of the more interesting places to see...\nmore »",
          "href": "http://www.tripadvisor.com/Travel-g60713-d270041/San-Francisco:California:Castro.Theatre.html"
        }
      ],
      "description2": [
        "Category: Movie Theaters",
        {
          "text": "The Castro Movie Theater was built in 1922 by the Nasser borthers, entrepreneurs who started a nickelodeon in 1908 in the  neighborhood. One of the more interesting places to see...\nmore »",
          "href": "http://www.tripadvisor.com/Travel-g60713-d270041/San-Francisco:California:Castro.Theatre.html"
        }
      ]
    },
    {
      "title": {
        "text": "de Young Museum",
        "href": "http://www.tripadvisor.com/Attraction_Review-g60713-d127943-Reviews-De_Young_Museum-San_Francisco_California.html"
      },
      "attractionNum": "#29 of 364 attractions in San Francisco",
      "rating": {
        "src": "http://c1.tacdn.com/img2/x.gif",
        "alt": "4.5 of 5 stars"
      },
      "reviews": {
        "text": "584 reviews",
        "href": "http://www.tripadvisor.com/Attraction_Review-g60713-d127943-Reviews-De_Young_Museum-San_Francisco_California.html#REVIEWS"
      },
      "review1": {
        "text": "A smaller art museum with some fin...",
        "href": "http://www.tripadvisor.com/ShowUserReviews-g60713-d127943-r208212053-De_Young_Museum-San_Francisco_California.html"
      },
      "review1Date": "05/31/2014",
      "review2": {
        "text": "World-Class Museum",
        "href": "http://www.tripadvisor.com/ShowUserReviews-g60713-d127943-r208125930-De_Young_Museum-San_Francisco_California.html"
      },
      "review2Date": "05/31/2014",
      "Category": "Category: Art Museums",
      "description": [
        "Category: Art Museums",
        {
          "text": "The DeYoung museum has been a San Francisco institution since it opened in Golden Gate Park in 1895.  The new building, designed by Herzog & de Mueron, opened in 2005.  The...\nmore »",
          "href": "http://www.tripadvisor.com/Travel-g60713-d127943/San-Francisco:California:De.Young.Museum.html"
        }
      ],
      "description2": [
        "Category: Art Museums",
        {
          "text": "The DeYoung museum has been a San Francisco institution since it opened in Golden Gate Park in 1895.  The new building, designed by Herzog & de Mueron, opened in 2005.  The...\nmore »",
          "href": "http://www.tripadvisor.com/Travel-g60713-d127943/San-Francisco:California:De.Young.Museum.html"
        }
      ]
    },
    {
      "title": {
        "text": "Filbert Steps",
        "href": "http://www.tripadvisor.com/Attraction_Review-g60713-d142463-Reviews-Filbert_Steps-San_Francisco_California.html"
      },
      "attractionNum": "#30 of 364 attractions in San Francisco",
      "rating": {
        "src": "http://c1.tacdn.com/img2/x.gif",
        "alt": "4.5 of 5 stars"
      },
      "reviews": {
        "text": "84 reviews",
        "href": "http://www.tripadvisor.com/Attraction_Review-g60713-d142463-Reviews-Filbert_Steps-San_Francisco_California.html#REVIEWS"
      },
      "review1": {
        "text": "Steep climb but you will be greatl...",
        "href": "http://www.tripadvisor.com/ShowUserReviews-g60713-d142463-r207968269-Filbert_Steps-San_Francisco_California.html"
      },
      "review1Date": "05/30/2014",
      "review2": {
        "text": "Unexpected an awesome views!",
        "href": "http://www.tripadvisor.com/ShowUserReviews-g60713-d142463-r207937826-Filbert_Steps-San_Francisco_California.html"
      },
      "review2Date": "05/29/2014",
      "Category": "Category: Scenic/ Historic Walking Areas",
      "description": [
        "Category: Scenic/ Historic Walking Areas",
        "A 284 foot wooden-step walkway leading up to the top of Telegraph Hill."
      ],
      "description2": [
        "Category: Scenic/ Historic Walking Areas",
        "A 284 foot wooden-step walkway leading up to the top of Telegraph Hill."
      ]
    }
  ]
};

angular.module('photoVotoApp')
  .controller('MainCtrl', function ($scope, $http) {
    $scope.i = 2;
    $scope.page = page["san francisco 1"][$scope.i];


    $http.jsonp(instaUrl(hashtag($scope.page.title.text)))
    .success(function(data) {
      $scope.photos = data.data;
      // $scope.scrubbedPhotos = instaScrub(data.data);
    })
    .error( function () {
    });

    // successful post request
    // var data = $scope.photos;
    // $http.post('/api/basketball', data)
    // .success(function(data) {
    //   console.log('successful post');
    // });
  });

//attach jquery event to window.resize
//SO dynamically resize div based on size of browser window
//emilolsson.com/shop/demo/l