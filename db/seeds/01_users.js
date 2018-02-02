exports.seed = function(knex, Promise) {
	// Deletes ALL existing entries
	return knex('users')
		.del()
		.then(function() {
			// Inserts seed entries
			return knex('users').insert([
				{
					id: 1,
					first_name: 'ibrahim',
					last_name: 'alhamad',
					phone: '962790363929',
					birthdate: new Date('July 30, 1994'),
					username: 'ialhamad',
					email: 'ibra@al.com',
				},
				{
					id: 2,
					first_name: 'anas',
					last_name: 'alhamad',
					phone: '962790363929',
					username: 'anas1',
					email: 'anas@al.com',
				},
				{
					id: 3,
					first_name: 'malek',
					last_name: 'alhamad',
					phone: '962790363929',
					username: 'malek2005',
					email: 'malek@al.com',
				},
				{
					id: 4,
					first_name: 'abuhadba',
					last_name: 'ibraheem',
					phone: '962797023426',
					username: 'ibraheem',
					email: 'ibrahhem@al.com',
				},
			]);
		});
};
