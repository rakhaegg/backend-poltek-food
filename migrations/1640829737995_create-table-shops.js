/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.createTable('shops', {
        id: {
          type: 'VARCHAR(50)',
          primaryKey: true,
        },
        name: {
          type: 'TEXT',
          notNull: true,
        },
        address: {
          type: 'TEXT',
          notNull: true,
        },
        no_phone: {
          type: 'TEXT',
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
      });
};

exports.down = pgm => {
    pgm.dropTable('shops');
};
