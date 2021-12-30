/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.addColumn('shops', {
        owner: {
          type: 'VARCHAR(50)',
        },
      });
};

exports.down = pgm => {
    pgm.dropColumn('shops', 'owner');
};
