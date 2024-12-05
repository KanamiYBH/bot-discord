const http = require('http');
http.createServer(function(req, res){
    res.write('Bot is Alive');
    res.end();
}).listen(8080);