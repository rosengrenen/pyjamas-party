
exports.up = async function(knex) {
  await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');

  if (!(await knex.schema.hasTable("questions"))) {
    return knex.schema.createTable("questions", table => {
      table
        .uuid("id")
        .primary()
        .defaultTo(knex.raw("uuid_generate_v4()"));

      table
        .string("question")
        .notNullable();

      table.timestamps(true, true);
    });
  }

};

exports.down = async function(knex) {
	return knex.schema.dropTableIfExists("questions");
};
