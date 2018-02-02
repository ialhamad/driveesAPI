exports.seed = function(knex, Promise) {
	// Deletes ALL existing entries
	return knex('rides')
		.del()
		.then(function() {
			// Inserts seed entries
			return knex('rides').insert([
				{
					travel_start_time: knex.fn.now(),
					seat_offered: 3,
					seat_price: 1.75,
					luggage_size: 'backpack',
					src_city_id: 1,
					dest_city_id: 2,
					user_car_id: 1,
				},
				{
					travel_start_time: knex.fn.now(),
					seat_offered: 2,
					seat_price: 1.5,
					luggage_size: '',
					src_city_id: 1,
					dest_city_id: 3,
					user_car_id: 1,
				},
				{
					travel_start_time: knex.fn.now(),
					seat_offered: 3,
					seat_price: 1.0,
					luggage_size: 'backpack',
					src_city_id: 2,
					dest_city_id: 3,
					user_car_id: 2,
				},
			]);
		});
};
