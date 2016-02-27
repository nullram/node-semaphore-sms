# node-semaphore-sms

Semaphore SMS API Client for NodeJS. Semaphore is The Simplest Web to SMS API ever. To find out more and subscribe to their service, visit their [homepage](http://semaphore.co/).

This SMS service is only available to mobile numbers from the Philippines.

## Installation

	npm install node-semaphore-sms

You also need to change the file **config.json.sample** to **config.json**.

You also need to provide your **API KEY** from Semaphore.

## Usage

	var Semaphore = require('node-semaphore-sms');

    var apikey = "YOUR_API_KEY";
	var sms = new Semaphore(apikey);

	// To check your account status:
    sms.status(function(error, result) {
    	if (!error)
    		console.log(result);
    });	

    // To send a single SMS message:
    var payload = {
    	from: 'SEMAPHORE',
    	to: '09179008888',
    	message: 'Semaphore API Rocks!'
    };
    sms.sendsms(payload, function(error, result) {
    	if (!error) {
    		console.log(result);
    	} else
    		console.log(error);
    });    

    // To send SMS to bulk numbers:
	var bulk_numbers = "09179008888,09168769988";
    sms.bulksms(bulk_numbers, function(error, result) {
    	if (!error) {
    		console.log(result);
    	} else
    		console.log(error);
    });

## License

MIT

## Release History

* 1.0.0 - Initial release
* 1.0.3 - Minor refactoring