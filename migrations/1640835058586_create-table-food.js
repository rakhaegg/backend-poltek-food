/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.createTable('foods', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
    },
    name: {
      type: 'TEXT',
      notNull: true,
    },
    price: {
      type: 'INT',
      notNull: true,
    },

    created_at: {
      type: 'TEXT',
      notNull: true,
    },
    updated_at: {
      type: 'TEXT',
      notNull: true,
    },
    shops_id: {
      type: 'VARCHAR(50)',
    },
    image: {
      type: 'TEXT'
    }

  });

  pgm.addConstraint('foods', 'fk_foods.shops_id_shops.id', 'FOREIGN KEY(shops_id) REFERENCES shops(id) ON DELETE CASCADE');
};

exports.down = pgm => {
  pgm.dropTable('foods');
  pgm.dropConstraint('foods', 'fk_foods.shops_id_shops.id');
};
