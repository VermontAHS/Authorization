
exports.up = (knex, Promise) => {
 return knex.schema.createTable('users', (table) => {
    table.increments('id').primary();
    table.string('first_name');
    table.string('last_name');
    table.string('mi');
    table.string('suffix');
    table.string('username');
    table.string('email');
    table.string('password');
    table.timestamp('created_at').defaultTo(knex.fn.now());
  })
};

exports.down = (knex, Promise) => {
  return knex.schema.dropTable('users')
};
