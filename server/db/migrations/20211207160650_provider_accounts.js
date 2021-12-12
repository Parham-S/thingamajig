exports.up = (knex) =>
  knex.schema.createTable('provider_accounts', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('(UUID())'));
    table.enum('provider', ['github']).defaultTo('github');
    table.string('provider_id').notNullable();
    table
      .uuid('user_id')
      .references('id')
      .inTable('users')
      .defaultTo(knex.raw('(UUID())'));
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });

exports.down = (knex) => knex.schema.dropTable('provider_accounts');
