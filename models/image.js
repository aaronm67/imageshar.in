var query = require("./db.js").runQuery;

var Image = function(filename, contentType, hits) {
    this.lookup = "";
    this.filename = filename || "";
    this.contentType = contentType || "";
    this.hits = hits;
};

Image.prototype.addHit = function(cb) {
    var img = this;
    img.hits = img.hits + 1;
    query(function() {
        this.query().update('images').set({ "hits": img.hits }).where("id= ?", [ img.id ]).execute(function(error, result) {
            cb(result);
        });
    });
};

var generateLookup = function() {
    var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
    var string_length = 8;
    var randomstring = '';
    for (var i = 0; i < string_length; i++) {
        var rnum = Math.floor(Math.random() * chars.length);
        randomstring += chars.substring(rnum,rnum+1);
    }

    return randomstring + ".jpg";
};

exports.addImage = function(image, cb) {
    var lookup = generateLookup();
    query(function() {
        this.query().insert('images', ['lookup', 'filename', 'contentType' ], [ lookup, image.filename, image.contentType ]).execute(
            function(error, result) {
                if (error) {

                }
                image.id = result.id;
                image.lookup = lookup;

                cb(image);  
            });
    });
};

exports.getImage = function(id, callback) {
    query(function() {
         this.query().select('*').from('images').where('lookup = ?', [ id ]).execute(function(err, rows) {
            if (rows.length == 0) { 
                throw "Couldn't find image";
            }

            var image = new Image();
            image.id = rows[0].id;
            image.lookup = rows[0].lookup;
            image.filename = rows[0].filename;
            image.contentType = rows[0].contentType;
            image.hits = rows[0].hits;
            callback(image);
         });
    });
};

exports.Image = Image;
