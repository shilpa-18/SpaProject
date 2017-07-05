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


const destroy = (spa_id) => {
	return db.oneOrnone(`DELETE FROM spa WHERE spa_id = $1`,
	[spa_id]);
}


module.exports = { findAllByUser, findById, create, destroy };