var mysql = require('db-mysql');


exports.runQuery = function(cb) {
    new mysql.Database({
        hostname: 'localhost',
        user: 'USER',
        password: 'PASSWORD',
         database: 'DATABASE'
    }).on('error', function(error) {
             console.log('ERROR: ' + error);
    }).on('ready', function(server) {
             console.log('Connected to ' + server.hostname + ' (' + server.version + ')');
     }).connect(cb);
 };

