exports.seed = function(knex, Promise) {
	// Deletes ALL existing entries
	return knex('cities')
		.del()
		.then(function() {
			// Inserts seed entries
			return knex('cities').insert([
				{
					name: 'sahab',
					state: 'amman',
					country: 'jordan',
				},
				{
					name: 'khalda',
					state: 'amman',
					country: 'jordan',
				},
				{
					name: 'mecca street',
					state: 'amman',
					country: 'jordan',
				},
			]);
		});
};
