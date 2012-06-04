var mysql = require('db-mysql');

exports.runQuery = function(cb) {
    new mysql.Database({
        hostname: 'HOSTNAME',
        user: 'DBUSER',
        password: 'DB_PASS',
         database: 'DB_NAME'
    }).on('error', function(error) {
             console.log('ERROR: ' + error);
    }).on('ready', function(server) {
     }).connect(cb);
 };

