'use strict';

function hashtag(string) {
  var words = string.split(' ');
  var result = [];
  var f = function(prefix, words) {
    for (var i = 0; i < words.length; i++) {
      result.push(prefix + words[i]);
      f(prefix + words[i], words.slice(i + 1));
    }
  };
  f('#', words);
  return result;
}


var newYorkCity = [
  'Kinky Boots on Broadway',
	'Jersey Boys',
	'Frick Collection',
	'Beautiful The Carole King Musical',
	'Manhattan Skyline',
	'The Metropolitan Opera',
	'Central Park',
	'Empire State Building'
];





// CLIENT INFO
// CLIENT ID a91636c3098f409d8c8c55a2bd255a32
// CLIENT SECRET d0a1c1182670449290c5b58e9cf084ec
// WEBSITE URL http://photo-voto.herokuapp.com/
// REDIRECT URI  http://photo-voto.herokuapp.com/

//https://api.instagram.com/v1/media/popular?client_id=a91636c3098f409d8c8c55a2bd255a32