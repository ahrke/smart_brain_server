const Clarifai = require('clarifai');

const app = new Clarifai.App({
 apiKey: 'c3767252de524308a51a9d046db4f2b1'
});

const handleApiCall = () => (req, res) => {
	app.models
	    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
	    .then(data => res.json(data))	
}

const handleImage = (db) => (req,res) => {
	const { id } = req.body;
	db('users').where('id','=',id)
		.increment('entries',1)
		.returning('entries')
		.then(entries => res.json(entries))
}

module.exports = {
	handleImage,
	handleApiCall
}