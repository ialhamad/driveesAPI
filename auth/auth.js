const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const createTokens = async (user, secret, secret2) => {
	const createToken = jwt.sign(
		{
			user: {
				id: user.id,
			},
		},
		secret,
		{ expiresIn: '32m' }
	);

	const createRefreshToken = jwt.sign(
		{
			user: {
				id: user.id,
			},
		},
		secret2,
		{ expiresIn: '1w' }
	);

	return [createToken, createRefreshToken];
};
module.exports = {
	refreshTokens: async (token, refreshToken, db, secret, secret2) => {
		let userId = 0;
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
			.select()
			.where('email', email)
			.then(rows => rows[0]);
		if (!user) {
			return {};
		}

		const refreshSecret = user.password + secret2;

		try {
			jwt.verify(refreshToken, refreshSecret);
		} catch (err) {
			return {};
		}

		const [newToken, newRefreshToken] = await createTokens(user, secret, refreshSecret);
		return {
			token: newToken,
			refreshToken: newRefreshToken,
			user,
		};
	},
	tryLogin: async (email, password, db, secret, refreshSecret) => {
		const user = await db('users')
			.select()
			.where('email', email)
			.then(rows => rows[0]);
		if (!user) {
			throw new Error('No user with that email.');
		}
		const valid = await bcrypt.compareSync(password, user.password);
		if (!valid) {
			throw new Error('Incorrect password.');
		}

		const refreshTokenSecret = user.password + refreshSecret;
		const [token, refreshToken] = await createTokens(user, secret, refreshTokenSecret);

		return {
			ok: true,
			token,
			refresh_token: refreshToken,
		};
	},
};
