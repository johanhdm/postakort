var cart = require('./cart.js');

exports.StartServer = function() {
 
    var restify = require('restify');
 
    
    var server = restify.createServer();
    server.use(restify.bodyParser());

    //routes
    server.get('/cart/:id', getCart);
    server.post('/cart/:id', addItemToCart);


    server.listen(1337, function() {
        console.log('%s listening at %s', server.name, server.url);
    });
 
};

function getCart(req, res, next) {
    res.contentType = 'application/json';
    cart.Get(req.params.id, function(err, cart){
        if (err){
            res.send({ code: 500, error : err });
        }
        else{
            res.send({ code: 200, cart: cart});    
        }
        res.end();            
    });

 
}

function addItemToCart(req, res, next){
    res.contentType = 'application/json';

    cart.Add(req.body, function(err, cart){
        if (err){
            res.send({ code: 500, error : err });
        }
        else{
            res.send({ code: 200, cart: cart});    
        }
        res.end();            
    });

}