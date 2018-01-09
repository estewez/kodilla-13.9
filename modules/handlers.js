var fs = require('fs');
var formidable = require('formidable');
var path = require('path');

var fileName = '';

exports.upload = function(request, response) {
    console.log("Rozpoczynam obsługę żądania upload.");
    var form = new formidable.IncomingForm();
    form.parse(request, function(error, fields, files) {
        fs.renameSync(files.upload.path, "img/test.png");
        fileName = files.upload.name;
        fs.readFile('./html/show.html', 'utf8', function (err, data){
            response.writeHead(200, {"Content-Type": "text/html"});
            response.write(data);
            response.end();
        });
    });
}

exports.show = function(request, response) {
    fs.readFile("img/test.png", "binary", function(error, file) {
        console.log("Rozpoczynam obsługę żądania show.");
        response.writeHead(200, {"Content-Disposition": "attachment; filename=" + fileName});
        response.write(file, "binary");
        response.end();
    });
}

exports.handle = function(request, response) {
    var filePath = request.url;
    if (filePath == '/' || filePath == '/welcome') {
        filePath = '/html/index.html'
    }
    filePath = filePath.substring(1);
    console.log(filePath);
    var extname = path.extname(filePath);
    console.log(extname);
    var contentType = 'text/html';
    if (extname == '.css') {
        contentType = 'text/css';
    }
    fs.readFile(filePath, function(err, content) {
        if (!err) {
            console.log("Rozpoczynam obsługę żądania");
            response.writeHead(200, {"Content-Type": contentType + "; charset=utf-8"});
            response.write(content);
            response.end();
        } else {
            fs.readFile('html/404.html', function(err, html) {
                console.log("Rozpoczynam obsługę żądania error.");
                response.writeHead(404, {"Content-Type": "text/html; charset=utf-8"});
                response.write(html);
                response.end();
            });
        }
    });
}