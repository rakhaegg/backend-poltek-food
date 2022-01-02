/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.addColumn('orders', {
        daftar: {
          type: 'TEXT',
        },
        total: {
            type: 'INT',
          },
          dafter_drink : {
            type: 'TEXT',
 
          }
      });
};

exports.down = pgm => {
    pgm.dropColumn('orders', 'daftar');
    pgm.dropColumn('orders', 'total');
    pgm.dropColumn('orders', 'dafter_drink');

};
