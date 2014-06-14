var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var attractionsSchema = new Schema({
	attraction: String,
	city: String,
	index: Number,
	hashtag: String,
	url: String,
	rating: String,
	ratings: String,
	review1: String,
	review2: String,
	description: String,
	ownerDescription: String
	//update this
});

var photosSchema = new Schema ({
	attraction: String,
	hashtag: String,
	photoArray: [
		{
			url: String,
			votes: Number,
			views: Number,
			approval: Number, //Like approval rating votes / vies
			rank: Number
		}
	]
});

var pagesSchema = new Schema ({
	randomNumber: Number,
	city: String,
	airbnbUrl: String,
	attraction: String,
	tripAdvisorUrl: String,
	rank: Number,  //not used
	hashtag: String,
	rating: String,
	views: Number,
	ratingNumber: Number,
	ratingStars: Array,
	numReviews: String,
	review1: String,
	review2: String,
	description: String,
	photos: {
		royalty: Number,
		photoArray: [
			{
				url: String,
				votes: Number,
				views: Number,
				approval: Number,
				index: Number //not used
			}
		]
	}
});


mongoose.model('Attractions', attractionsSchema);
mongoose.model('Photos', photosSchema);
mongoose.model('Pages', pagesSchema);