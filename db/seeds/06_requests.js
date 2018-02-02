exports.seed = function(knex, Promise) {
	// Deletes ALL existing entries
	return knex('requests')
		.del()
		.then(function() {
			// Inserts seed entries
			return knex('requests').insert([
				{
					request_status: 'waiting',
					requester_id: 3,
					ride_id: 1,
				},
				{
					request_status: 'rejected',
					requester_id: 1,
					ride_id: 2,
				},
				{
					request_status: 'approved',
					requester_id: 4,
					ride_id: 2,
				},
			]);
		});
};
