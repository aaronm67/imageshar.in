var getCon = require("./db.js").getConnection;

var Image = function(filename, contentType, hits) {
    this.lookup = "";
    this.filename = filename || "";
    this.contentType = contentType || "";
    this.hits = hits;
};

Image.prototype.addHit = function(cb) {
    var img = this;
    img.hits = img.hits + 1;

    var db = getCon();
    db.connect();
    
    var query = "update images set hits = ? where id = ?";
    db.query(query, [ img.hits, img.id ], function(err, result) {
       cb(result); 
    });

    db.end();
};

Image.prototype.getExtension = function() {
    if (this.filename && (!this.contentType || this.contentType == "application/octet-stream")) {
        return this.filename.substring(this.filename.indexOf(".") + 1);
    }

    return this.contentType.substring(this.contentType.indexOf("/") + 1);
};

Image.prototype.generateLookup = function() {
    var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
    var string_length = 8;
    var randomstring = '';
    for (var i = 0; i < string_length; i++) {
        var rnum = Math.floor(Math.random() * chars.length);
        randomstring += chars.substring(rnum,rnum+1);
    }

    return randomstring + "." + this.getExtension();
};

exports.addImage = function(image, cb) {
    var db = getCon();
    db.connect();

    var query = "INSERT INTO images SET ?";

    var lookup = image.generateLookup();
    image.lookup = lookup;
    db.query(query, image, function(err, result) {
        if (err) {
                throw err;
        }
        image.id = result.id;
        cb(image); 
    });

    db.end();
};

exports.getImage = function(id, callback) {
    var db = getCon();
    db.connect();

    db.query("SELECT * FROM images WHERE lookup = ?", [ id ], function(err, results) {
        if (err || rows.length == 0) { 
            callback(false);
        }
        
        var image = new Image();
        image.id = rows[0].id;
        image.lookup = rows[0].lookup;
        image.filename = rows[0].filename;
        image.contentType = rows[0].contentType;
        image.hits = rows[0].hits;
        callback(image);
    });
    db.end();
};

exports.Image = Image;
