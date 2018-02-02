exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('users_cars').del()
    .then(function () {
      // Inserts seed entries
      return knex('users_cars').insert([{
          user_id: 1,
          car_id: 1
        },
        {
          user_id: 2,
          car_id: 2
        },
        {
          user_id: 3,
          car_id: 3
        }
      ]);
    });
};