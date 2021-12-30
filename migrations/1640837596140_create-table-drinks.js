/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.createTable('drinks', {
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

  pgm.addConstraint('drinks', 'fk_drinks.shops_id_shops.id', 'FOREIGN KEY(shops_id) REFERENCES shops(id) ON DELETE CASCADE');

};

exports.down = pgm => {
  pgm.dropTable('drinks');
  pgm.dropConstraint('drinks', 'fk_foods.shops_id_shops.id');
};
