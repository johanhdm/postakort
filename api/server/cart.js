var cart = {
	total : 0,
	items : []
};


exports.Get = function(id, callback){

	callback(null, cart);

}

exports.Add = function(item, callback){

	if (!item.address) callback('No address', null);

	if ( !item.address.country){
		item.shippingCost = 6;
	}

	cart.items.push(item);


	callback(null, cart);

}