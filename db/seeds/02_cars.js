exports.seed = function(knex, Promise) {
	// Deletes ALL existing entries
	return knex('cars')
		.del()
		.then(function() {
			// Inserts seed entries
			return knex('cars').insert([
				{
					name: 'testCar1',
					make: 'toyota',
					model: 'prius',
					make_year: new Date(2013),
					color: 'red',
					plate_number: '13-23253',
				},
				{
					name: 'testCar2',
					make: 'toyota',
					model: 'camry',
					make_year: new Date(2011),
					color: 'blue',
					plate_number: '12-27841',
				},
				{
					name: 'testCar3',
					make: 'mercedes',
					model: 'GLC 300',
					make_year: new Date(2015),
					color: 'gray',
					plate_number: '17-741741',
				},
			]);
		});
};
