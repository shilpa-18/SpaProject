const express = require('express'),
	router = express.Router(),
	spa = require("../models/spa_model"),
	search = require('../services/places')

const auth = require('../services/auth');
const spas = require('../services/places')

router.get('/favorites',(req,res)=> {
	// console.log('inside or spa/ route', res._passport);
	// pick up some data all the favs by user
	// render that on favoriteSpas.html view
	console.log('inside find all favorites route')
	spa
		.findAllByUser()
		.then(favoriteSpas => {
			// console.log(favoriteSpas);
			res.render('spa/favoriteSpas', {favoriteSpas})
		})
		.catch(err => {
			console.log(err);
		})
});


// search route for spa to go to Google API
router.post('/search', (req, res)=> {
	console.log(req.body.lat, req.body.long)
	search.getNearBySpas(req.body.lat, req.body.long)
		.then((data) => {
			// console.log('LAT AND LONG FROM THE CONTROLLER: ');
			// console.log(data.data.results);
			res.json(data.data.results);
		})
		.catch((err) => {
			console.log('post route error: ', err);
		})
});

router.post('/', (req, res)=> {
	// console.log('inside router.post for new favorite spas');
	spa
		.create(req.body.name, req.body.address)
		.then((newlyCreatedSpa) => {
			// console.log('LAT AND LONG FROM THE CONTROLLER: ');
			// console.log(data.data.results);
			res.json(newlyCreatedSpa);
		})
		.catch((err) => {
			console.log('post route error not into DB', err);
		})
});

router.get('/', (req, res) => {
	res.render('spa/spa')
})


router.delete('/:id/', (req, res) => {
	spa
	.destroy(req.params.id)
	.then((data) => {
		res.json(data)
	})
	.catch(err => {
		console.log(err);
	})
})



module.exports = router;