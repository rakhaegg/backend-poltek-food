/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.createTable('orders', {
        id: {
            type: 'VARCHAR(50)',
            primaryKey: true,
          },
        buyer_id : {
            type: 'VARCHAR(50)'
        },
        shop_id : {
            type: 'VARCHAR(50)'
        },
        driver_id : {
            type: 'VARCHAR(50)'
        },
        status_shop : {
            type : 'TEXT'
        },
        status_driver : {
            type : 'TEXT'
        },
        status_buyer : {
            type : 'TEXT'
        }
    } );
    
};

exports.down = pgm => {
    pgm.dropTable('orders');
  


};
