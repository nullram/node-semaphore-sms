var config = require('./config');
var request = require('request');

function Semaphore() {
	if (!(this instanceof Semaphore)) {
		return new Semaphore();
	}

	// Set the headers
	var headers = {
	    'User-Agent'	: 'Semaphore SMS/1.0.0.',
	    'Content-Type'	: 'application/x-www-form-urlencoded'
	}

	this.headers = headers;
};

Semaphore.prototype.sendsms = function sendsms(sms, callback) {
   var data = {
   			from: sms.from,
	    	api: config.semaphore.api_key, 
	    	number: sms.to, 
	    	message: sms.message
    	}

	var options = {
	    url: config.semaphore.endpoint + '/api/sms',
	    method: 'POST',
	    headers: this.headers,
	    form: data
	}
	
	sendRequest(options, callback);	
};

Semaphore.prototype.bulksms = function bulksms(numbers, message, callback) {
   var data = {
   			from: config.message.from,
	    	api: config.semaphore.api_key, 
	    	number: numbers, 
	    	message: message
    	}

	var options = {
	    url: config.semaphore.url + '/v3/bulk_api/sms',
	    method: 'POST',
	    headers: this.headers,
	    form: data
	}
	
	sendRequest(options, callback);
};

Semaphore.prototype.status = function status(callback) {
	var options = {
	    url: config.semaphore.url + '/api/sms/account?api=' + config.semaphore.api_key,
	    method: 'GET'
	}
	
	sendRequest(options, callback);
};

function sendRequest(options, callback) {

	function handleResponse(error, response, body) {
		if (!error && response.statusCode == 200) {
		  return callback(null, body);
		}
		return callback(error);
	}

  	request(options, handleResponse);
}

module.exports = Semaphore;
