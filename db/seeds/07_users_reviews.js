exports.seed = function(knex, Promise) {
	// Deletes ALL existing entries
	return knex('users_reviews')
		.del()
		.then(function() {
			// Inserts seed entries
			return knex('users_reviews').insert([
				{
					user_id: 1,
					rate: 4,
					title: 'Excellent',
					comment: 'Djil was very caring and careful while driving.',
				},
				{
					user_id: 2,
					rate: 1,
					title: 'Poor',
					comment: ' Alors nous avions rendez vous à la GAre du midi à 18h.',
				},
				{
					user_id: 3,
					rate: 5,
					title: 'Outstanding',
					comment: ' Perfect driver - very fast, safe, professional and polite. Thanks for the ride!',
				},
			]);
		});
};
