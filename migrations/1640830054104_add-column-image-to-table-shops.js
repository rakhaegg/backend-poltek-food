/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.addColumn('shops', {
        image: {
          type: 'TEXT',
        },
      });
};

exports.down = pgm => {
    pgm.dropColumn('shops', 'image');
};
