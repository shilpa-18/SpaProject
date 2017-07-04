const db = require('../db/setup');

const findAllByUser = () => {
	return db.any('SELECT * FROM spa;');
}

const findById = (spaId, userId) => {
	return db.oneOrNone('SELECT * FROM spa WHERE id = $1 AND user_id = $2'[spaId, userId]);
}

const create = (name, address)=> {
	return db.oneOrNone(`INSERT INTO spa
	(name, address)	
	VALUES ($1, $2) RETURNING *`,
	[name, address]);	
}

// const update = (spa, id) => {
// 	return db.oneOrNone(`UPDATE spa 
// 	SET name = $1, address = $2)
// 	WHERE id = $3 AND RETURNING id`,
// 	[spa.name, spa.id, spa.lat, spa.long, spa.icon, spa.user_id]);
// }

const destroy = (spaId) => {
	return db.none(`DELETE FROM spa WHERE id = $1`,
	[spaId]);
}


module.exports = { findAllByUser, findById, create, destroy};