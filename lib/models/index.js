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

mongoose.model('Attractions', attractionsSchema);
mongoose.model('Photos', photosSchema);