const jsonwebtoken = require('jsonwebtoken');
const ـ = require('lodash');
const bcrypt = require('bcrypt');

const createTokens = async (user, secret, secret2) => {
	const createToken = jwt.sign(
		{
			user: _.pick(user, ['id', 'role']),
		},
		secret,
		{
			expiresIn: '12m',
		}
	);

	const createRefreshToken = jwt.sign(
		{
			user: _.pick(user, 'id'),
		},
		secret2,
		{
			expiresIn: '7d',
		}
	);

	return [createToken, createRefreshToken];
};

const refreshTokens = async (token, refreshToken, db, SECRET) => {
	let userId = -1;
	try {
		const { user: { id } } = jwt.decode(refreshToken);
		userId = id;
	} catch (err) {
		return {};
	}

	if (!userId) {
		return {};
	}

	const user = await db('users')
		.select('*')
		.where('id', id)
		.then(rows => rows[0]);

	if (!user) {
		return {};
	}

	try {
		jwt.verify(refreshToken, user.refreshSecret);
	} catch (err) {
		return {};
	}

	const [newToken, newRefreshToken] = await createTokens(user, SECRET, user.refreshSecret);
	return {
		token: newToken,
		refreshToken: newRefreshToken,
		user,
	};
};

const tryLogin = async (email, password, db, SECRET, SECRET2) => {
	const user = await db('users')
		.select('*')
		.where('email', email)
		.then(rows => rows[0]);
	if (!user) {
		// user with provided email not found
		return {
			ok: false,
			errors: [{ path: 'email', message: 'Wrong email' }],
		};
	}

	const valid = await bcrypt.compare(password, user.password);
	if (!valid) {
		// bad password
		return {
			ok: false,
			errors: [{ path: 'password', message: 'Wrong password' }],
		};
	}

	const refreshTokenSecret = user.password + SECRET2;

	const [token, refreshToken] = await createTokens(user, SECRET, refreshTokenSecret);

	return {
		ok: true,
		token,
		refreshToken,
	};
};

module.exports = {
	refreshTokens,
	tryLogin,
};
