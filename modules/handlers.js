var fs = require('fs');
var formidable = require('formidable');

exports.upload = function(request, response) {
    console.log("Rozpoczynam obsługę żądania upload.");
    var form = new formidable.IncomingForm();
    form.parse(request, function(error, fields, files) {
        fs.renameSync(files.upload.path, "img/test.png");
        fs.readFile('./html/show.html', 'utf8', function (err, data){
            response.writeHead(200, {"Content-Type": "text/html"});
            response.write(data);
            response.end();
        });
    });
}

exports.welcome = function(request, response) {
    console.log("Rozpoczynam obsługę żądania welcome.");
    fs.readFile('html/index.html', function(err, html) {
        response.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
        response.write(html);
        response.end();
    });
}

exports.error = function(request, response) {
    console.log("Rozpoczynam obsługę żądania error.");
    fs.readFile('html/404.html', function(err, html) {
        response.writeHead(404, {"Content-Type": "text/html; charset=utf-8"});
        response.write(html);
        response.end();
    });
}

exports.PNFcss = function(request, response) {
    fs.readFile('css/404.css', function(err, css) {
        console.log("Rozpoczynam obsługę żądania css dla error.");
        response.writeHead(200, {"Content-Type": "text/css; charset=utf-8"});
        response.write(css);
        response.end();
    });
}

exports.show = function(request, response) {
    fs.readFile("img/test.png", "binary", function(error, file) {
        console.log("Rozpoczynam obsługę żądania show.");
        response.writeHead(200, {"Content-Disposition": "attachment; filename=test.png"});
        response.write(file, "binary");
        response.end();
    });
}

exports.showCss = function(request, response) {
    fs.readFile('css/show.css', function(err, css) {
        console.log("Rozpoczynam obsługę żądania css dla show.");
        response.writeHead(200, {"Content-Type": "text/css; charset=utf-8"});
        response.write(css);
        response.end();
    });
}