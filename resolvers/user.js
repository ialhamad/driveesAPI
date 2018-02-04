const bcrypt = require('bcrypt');
const util = require('util');
const jwt = require('jsonwebtoken');

module.exports = {
	Query: {
		users: (parent, args, { db }) => {
			return db('users')
				.select()
				.then(rows => rows);
		},
		user: (parent, { id }, { db }) => {
			return db('users')
				.select()
				.where('id', id);
		},
	},
	Mutation: {
		register: async (parent, { input }, { db }) => {
			const user = input;
			user.password = await bcrypt.hashSync(user.password, 12);
			return db('users')
				.insert(user)
				.returning('*')
				.then(rows => rows[0]);
		},

		login: async (parent, { email, password }, { db, secret }) => {
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
			const token = jwt.sign(
				{
					user: {
						id: user.id,
					},
				},
				secret,
				{ expiresIn: '32m' }
			);
			return {
				ok: true,
				token,
			};
		},

		updateUser: (parent, { id, input }, { db }) => {
			return db('users')
				.update(input)
				.where('id', id)
				.then(rows => rows === 1);
		},
		deleteUser: (parent, { id }, { db }) => {
			return db('users')
				.delete()
				.where('id', id)
				.then(rows => rows === 1);
		},
	},
};
