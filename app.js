var express = require("express");
var query = require("./models/image.js");
var app = express();
var fs = require("fs");
var expressLayouts = require('express-ejs-layouts')

var image_dir = __dirname + "/public/img/";
app.configure(function(){
    app.use(express.limit('5mb'));
    app.set('views', __dirname + '/views');
    app.set('view engine', 'ejs');
    app.set('layout', 'layout');
    app.use(expressLayouts);
    app.use(express.bodyParser());
    app.use(app.router);
    app.use(express.static(__dirname + '/public'));
});

app.get("/", function(req, res) {
    res.render("index.ejs");
});

app.post("/upload", function(req, res) {
    var data = req.body.data;
    var contentType = req.body.contentType;
    var name = req.body.name;
    var buf = new Buffer(data, "base64");
    if (!contentType && name) {
        contentType = "application/octet-stream";
    }
    var image = new query.Image(name, contentType);
    query.addImage(image, function(img) {
        fs.writeFile(image_dir + img.lookup, buf, function() {
            res.send(img.lookup);
        });
    });
});

app.get('/view/:id', function(req, res) {
    query.getImage(req.params.id, function(img) { 
        res.render("view.ejs", { image: img });
    });
});

app.get("/img/:id", function(req, res, next) {
    query.getImage(req.params.id, function(img) {
        if (img) {
            img.addHit(function() {
                res.contentType(img.contentType);
                next();
            });
        }
        else {
            res.send("Not found", 404);
        }
    });
});

app.listen(3001);
