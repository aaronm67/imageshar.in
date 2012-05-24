var express = require("express");
var query = require("./models/image.js");
var app = express.createServer();
var fs = require("fs");
var PORT_NUM = 80;

var image_dir = __dirname + "/public/img/";
app.configure(function(){
    app.use(express.limit('5mb'));
    app.set('views', __dirname + '/views');
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
    var image = new query.Image(name, contentType);
    query.addImage(image, function(img) {
        var buf = new Buffer(data, "base64");
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
        img.addHit(function() {
            res.contentType(img.contentType);
            next();
        });
    });
});

app.listen(PORT_NUM);
