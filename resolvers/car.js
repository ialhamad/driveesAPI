module.exports = {
	Query: {
		cars: (parent, args, { db }) => {
			return db('cars').select();
		},
		car: (parent, { id }, { db }) => {
			return db('cars')
				.select()
				.where('id', id)
				.then(rows => rows[0]);
		},
	},
	Mutation: {
		createCar: (parent, args, { db }) => {
			return db('cars')
				.insert(args)
				.returning('*')
				.then(rows => rows[0]);
		},
		updateCar: (parent, args, { db }) => {
			return db('cars')
				.update(args)
				.where('id', args.id);
		},
	},
};
