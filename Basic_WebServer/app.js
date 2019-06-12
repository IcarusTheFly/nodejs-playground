let http = require('http');
let fs = require('fs');

let requestCount = 0;
let server = http.createServer((req, res) => {
    if (req.url === '/public/penguins.jpg') {
        res.writeHead(200, {
            'Content-type': 'image/jpeg'
        });

        let image = fs.readFileSync('public/penguins.jpg');
        res.end(image);
    } else if (req.url === '/public/desert.jpg') {
        res.writeHead(200, {
            'Content-type': 'image/jpeg'
        });

        // Async
        fs.readFile('public/desert.jpg', {}, (err, data) => {
            res.end(data);
        });
    } else if (req.url.indexOf('/public') === 0) {
        fs.readFile('.' + req.url, {}, (err, data) => {
            if (err) {
                res.writeHead(404, {
                    'Content-Type': 'text/plain'
                });
                res.end('404 Not Found');
            } else {
                let contentType = req.url.endsWith('.jpg') ? 'image/jpeg' : 'text/plain';
                res.writeHead(200, {
                    'Content-Type': contentType
                });
                res.end(data);
            }
        });
    } else if (req.url === '/about') {
        res.writeHead(200, {
            'Content-type': 'text/html'
        });
        res.end('<html><body><h1>This is the "About Me" site</h1><img src="/public/koala.jpg"/></body></html>');
    } else if (req.url === '/async') {
        res.writeHead(200, {
            'Content-type': 'text/plain'
        });

        let a = 0;
        setInterval(() => {
            // Printing logs continuously
            console.log(a);
        }, 1000);
        setTimeout(() => {
            a++;
        }, 5000);

        res.end('Async test site. Check the console to see the logs');
    } else if (req.url === '/') {
        requestCount += 1;
        res.end('Access: ' + requestCount);
    }
});

server.listen(8080);