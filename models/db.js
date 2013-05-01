var mysql = require('mysql');

exports.getConnection = function() {
    return connection = mysql.createConnection({
        host: "localhost",
        user: "user",
        password: "password"
    });
};
