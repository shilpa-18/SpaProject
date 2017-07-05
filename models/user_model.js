const bcrypt = require('bcryptjs');

const db = require('../db/setup');

function create (user) {
	console.log('I am in your model function')
	const password = bcrypt.hashSync(user.password,10);
	return db.one(`
	INSERT INTO users
	(email, password_digest)
	VALUES
	($1, $2)
	RETURNING *`,
	[user.email, password]
	);
};

function findByEmail (email) {
  return db.oneOrNone(`
    SELECT *
    FROM users
    WHERE email = $1;`,
    [email]
  );
};

module.exports = {create, findByEmail};
