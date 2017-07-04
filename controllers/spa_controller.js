const express = require('express'),
	router = express.Router(),
	spa = require("../models/spa_model"),
	search = require('../services/places')

const auth = require('../services/auth');
const spas = require('../services/places')

router.get('/',(req,res)=> {
	console.log('inside or spa/ route', res._passport);
	res.render('spa/spa');
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
})

router.post('/', (req, res)=> {
	console.log('inside router.post for new spas');
	let newSpa = {
		"name": req.body.name,
		"id": req.body.id,
		"address": req.body.address
	};
	spa.create(newSpa)
		.then((data) => {
			// console.log('LAT AND LONG FROM THE CONTROLLER: ');
			// console.log(data.data.results);
			res.json(data);
		})
		.catch((err) => {
			console.log('post route error not into DB', err);
		})
})

// router.post('/',(req,res) => {
// 	spa
// 	.update(req.body, req.params.id)
// 	.then(spa => {
// 		res.send(spa);
// 	})
// 	.catch(err => console.log(err))
// });


module.exports = router;