

var http = require('http');
var fs = require('fs');

const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS, GET, PUT, PATCH, DELETE",
    "Access-Control-Allow-Headers":"Origin X-Requested-With, Content-Type, Accept",
    /** add other headers as per requirement */
};


var server = http.createServer(function (req, res) {

    console.log(req.method)
    if (req.method === "GET") {
        res.writeHead(200, headers);
        res.write("Hello")
        res.end();
    } else if (req.method === "OPTIONS") {
    
        var body = "";
        req.on("data", function (chunk) {
            body += chunk;
            console.log(body);
        });
        req.on("end", function(){
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.setHeader("Access-Control-Allow-Credentials", "true");
            res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
            res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
            res.writeHead(200);
            res.end(body);
        });
    }else if (req.method === "POST") {
    
        var body = "";
        let data;
        req.on("data", function (chunk) {
            body += chunk;
            data=body;
        });
        
        req.on("end", function(){
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.setHeader("Access-Control-Allow-Credentials", "true");
            res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
            res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
            res.writeHead(200);
            console.log(data);
            res.end(body);
        });
    }

}).listen(8080);