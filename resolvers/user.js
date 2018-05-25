const { tryLogin } = require('../auth');
const bcrypt = require('bcrypt');

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
				.where('id', id)
				.limit(1);
		},
		me: async (parent, args, { db, user }) => {
			if (user) {
				return db('users')
					.select()
					.where('id', user.id)
					.limit(1)
					.then(rows => rows[0]);
			}
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

		login: async (parent, { email, password }, { db, secret, refreshSecret }) => {
			return tryLogin(email, password, db, secret, refreshSecret);
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
