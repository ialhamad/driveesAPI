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
		register: (parent, args, { db }) => {
			return db('users')
				.insert(args)
				.returning('*')
				.then(rows => rows[0]);
		},
		login: (parent, { email, password }, { db }) => {
			return {
				ok: true,
				token: 'dummy_data - eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9',
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
