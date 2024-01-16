import http from "http";
http.createServer(function (request, response) {
    response.writeHead(200, { 'Content-Type': 'text/plain' });
    response.end('Hello \n');
}).listen(8124);
console.log('Server running at http://127.0.0.1:8124/');
//# sourceMappingURL=example1.js.map