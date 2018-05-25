exports.up = function(knex, Promise) {
	return knex.schema
		.createTable('users', t => {
			t.increments('id').primary();
			t.string('first_name');
			t.string('last_name');
			t.date('birthdate');
			t.string('phone');
			t.string('username').unique();
			t
				.string('email')
				.notNullable()
				.unique();
			t.string('password');
			t.boolean('is_admin').defaultTo(false);

			t.timestamps(true, true);
		})

		.createTable('cars', t => {
			t.increments('id').primary();
			t.string('name');
			t.string('make');
			t.string('model');
			t.date('make_year');
			t.string('color');
			t.string('plate_number');

			t.timestamps(true, true);
		})

		.createTable('users_cars', t => {
			t.increments('id').primary();

			t
				.integer('user_id')
				.references('id')
				.inTable('users')
				.onDelete('CASCADE');
			t
				.integer('car_id')
				.references('id')
				.inTable('cars')
				.onDelete('CASCADE');

			t.timestamps(true, true);
		})

		.createTable('cities', t => {
			t.increments('id').primary();
			t.string('name');
			t.string('state');
			t.string('country');

			t.timestamps(true, true);
		})

		.createTable('rides', t => {
			t.increments('id').primary();
			t.datetime('travel_start_time');
			t.integer('seat_offered');
			t.double('seat_price');
			t.string('luggage_size');

			t
				.integer('user_car_id')
				.references('id')
				.inTable('users_cars');
			t
				.integer('src_city_id')
				.references('id')
				.inTable('cities');
			t
				.integer('dest_city_id')
				.references('id')
				.inTable('cities');

			t.timestamps(true, true);
		})
		.createTable('enroute_cities', t => {
			t.increments('id').primary();
			t
				.integer('ride_id')
				.references('id')
				.inTable('rides')
				.onDelete('CASCADE');
			t
				.integer('city_id')
				.references('id')
				.inTable('cities')
				.onDelete('CASCADE');

			t.timestamps(true, true);
		})
		.createTable('requests', t => {
			t.increments('id').primary();
			t.string('request_status');
			t
				.integer('requester_id')
				.references('id')
				.inTable('users')
				.onDelete('CASCADE');
			t
				.integer('ride_id')
				.references('id')
				.inTable('rides')
				.onDelete('CASCADE');

			t
				.integer('enroute_city_id')
				.references('id')
				.inTable('cities')
				.onDelete('CASCADE');
			t.timestamps(true, true);
		})
		.createTable('users_reviews', t => {
			t.increments('id').primary();
			t
				.integer('user_id')
				.references('id')
				.inTable('users')
				.onDelete('CASCADE');
			t.integer('rate');
			t.string('title');
			t.string('comment');

			t.timestamps(true, true);
		});
};

exports.down = function(knex, Promise) {
	return knex.schema
		.dropTable('requests')
		.dropTable('enroute_cities')
		.dropTable('rides')
		.dropTable('cities')
		.dropTable('users_cars')
		.dropTable('cars')
		.dropTable('users_reviews')
		.dropTable('users');
};
