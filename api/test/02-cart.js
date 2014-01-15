restify = require('restify');
assert = require('assert');

var client = restify.createJsonClient({
    version: '*',
    url: 'http://127.0.0.1:1337'
});
 
describe('service: cart', function() {
 
    // Test #1
    describe('200 response check', function() {
        it('should get a 200 response', function(done) {
            client.get('/cart/1234567890', function(err, req, res, data) {
                if (err) {
                    throw new Error(err);
                }
                else {
                    if (data.cart.total != 0 || data.cart.items.length != 0){
                        throw new Error('invalid init from /cart/1234567890');
                    }

                    if (data.code != 200) {
                        throw new Error('invalid response from /cart/1234567890');
                    }
                    done();
                }
            });

        });
    });

    describe('add new item', function() {
        it('should get a 200 response', function(done) {
            var item = {
                id : 'abc123',
                address : {
                    name : 'John Does',
                    street1 : 'Box nr',
                    street2 : 'Street address',
                    postal : '123 45 City',
                    country : ''
                }
            };

            var url = '/cart/1234567890';
            client.post(url, item, function(err, req, res, data) {
                if (err) {
                    throw new Error(err);
                }
                else {
                    if (data.cart.items.length != 1){
                        throw new Error('invalid init from ' + url);
                    }
                    if (data.cart.items[0].id != 'abc123' ){
                        throw new Error('invalid id from ' + url);
                    }

                    var card = data.cart.items[0];
                    if (card.address.name != 'John Does'){
                        throw new Error('invalid name from ' + url);                        
                    }
                    if (card.address.street1 != 'Box nr' || card.address.street2 != 'Street address' || card.address.postal != '123 45 City')
                    {
                        throw new Error('invalid address from ' + url);
                    }

                    if (card.shippingCost != 11) throw new Error('invalid shippingCost from ' + url);

                    if (data.code != 200) {
                        throw new Error('invalid response from ' + url);
                    }
                    done();
                }
            });

        });
    });

    describe('add another item', function() {
            it('should get a 200 response', function(done) {
                var item = {
                    id : 'abcd1234'
                };

                var url = '/cart/1234567890';
                client.post(url, item, function(err, req, res, data) {
                    if (err) {
                        throw new Error(err);
                    }
                    else {
                        if (data.cart.items.length != 2){
                            throw new Error('invalid init from ' + url);
                        }

                        if (data.cart.items[0].id != 'abc123' ){
                            throw new Error('invalid id from ' + url);
                        }
                        if (data.cart.items[1].id != 'abcd1234' ){
                            throw new Error('invalid id from ' + url);
                        }

                        if (data.code != 200) {
                            throw new Error('invalid response from ' + url);
                        }
                        done();
                    }
                });

            });
        });
    // Add more tests as needed...
});
