exports.up = (knex) =>
  knex.schema.createTable('profiles', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('(UUID())'));
    table
      .uuid('user_id')
      .references('id')
      .inTable('users')
      .defaultTo(knex.raw('(UUID())'));
    table.string('first_name');
    table.string('last_name');
    table.string('avatar');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });

exports.down = (knex) => knex.schema.dropTable('profiles');
