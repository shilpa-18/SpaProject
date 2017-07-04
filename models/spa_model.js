const db = require('../db/setup');

const findAllByUser = (userId) => {
	return db.any('SELECT * FROM spa WHERE user_id = $1', [userId]);
}

const findById = (spaId, userId) => {
	return db.oneOrNone('SELECT * FROM spa WHERE id = $1 AND user_id = $2'[spaId, userId]);
}

const create = (spaInfo, userId)=> {
	return db.oneOrNone(`INSERT INTO spa
	(name, address, id)	
	VALUES ($1, $2, $3) RETURNING *`,
	[spaInfo.name, spaInfo.address, userId]);	
}

const update = (spa, id) => {
	return db.oneOrNone(`UPDATE spa 
	SET name = $1, address = $2)
	WHERE id = $3 AND RETURNING id`,
	[spa.name, spa.id, spa.lat, spa.long, spa.icon, spa.user_id]);
}

const destroy = (spaId, userId) => {
	return db.none(`DELETE FROM spa WHERE id = $1 AND user_id = $2`,
	[spaId, userId]);
}


module.exports = { findAllByUser, findById, create, update, destroy};