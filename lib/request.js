/*
 * sharon
 * https://github.com/chrisenytc/sharon
 *
 * Copyright (c) 2015, Christopher EnyTC
 * Licensed under the MIT license.
 */

'use strict';

/*
 * Module Dependencies
 */

var request = require('superagent');

/**
 * A module responsible for provide requests to the API
 *
 * @example
 *
 * var request = new Request();
 *
 * @module Sharon
 * @class Request
 */

var Request = module.exports = function Request(accessToken) {
	//Consts
	this.API_KEY = process.env.GITHUB_ACCESS_TOKEN || accessToken;
    this.API_URI = process.env.GITHUB_ENDPOINT || 'https://api.github.com/';
};

/**
 * Method responsible to provide get requests
 *
 * @example
 *
 * request.get('path/to/route', {query: 'querystring'}, function(err, res) {
 *		console.log(res.body);
 * });
 *
 * @module Sharon
 * @class Request
 * @method get
 * @protected
 * @return {Function} A callback with the error and response object
 */

Request.prototype.get = function get(path, query, callback) {
	if (!callback) {
    	callback = query;
    }
    if (typeof callback !== 'function') {
    	throw new Error('Callback must be a function.');
    }
	var endpoint;
	if(/^https?:\/\//.test(path)) {
		endpoint = path;
	} else {
		endpoint = this.API_KEY + path;
	}
    request
    	.get(endpoint)
        .type('json')
		.set('Accept', 'application/json')
		.set('Authorization', 'token' + this.API_KEY)
        .query(query)
        .end(callback);
};

/**
 * Method responsible to provide post requests
 *
 * @example
 *
 * request.post('path/to/route', {query: 'querystring'}, function(err, res) {
 *		console.log(res.body);
 * });
 *
 * @module Sharon
 * @class Request
 * @method post
 * @protected
 * @return {Function} A callback with the error and response object
 */

Request.prototype.post = function post(path, body, query, callback) {
	if (!callback) {
    	callback = query;
    }
    if (typeof callback !== 'function') {
    	throw new Error('Callback must be a function.');
    }
	var endpoint;
	if(/^https?:\/\//.test(path)) {
		endpoint = path;
	} else {
		endpoint = this.API_KEY + path;
	}
    request
    	.post(endpoint)
    	.type('json')
        .set('Accept', 'application/json')
        .set('Authorization', 'token' + this.API_KEY)
        .query(query)
        .send(body)
        .end(callback);
};

/**
 * Method responsible to provide put requests
 *
 * @example
 *
 * request.put('path/to/route', {query: 'querystring'}, function(err, res) {
 *		console.log(res.body);
 * });
 *
 * @module Sharon
 * @class Request
 * @method put
 * @protected
 * @return {Function} A callback with the error and response object
 */

Request.prototype.put = function put(path, body, query, callback) {
	if (!callback) {
    	callback = query;
    }
    if (typeof callback !== 'function') {
    	throw new Error('Callback must be a function.');
    }
	var endpoint;
	if(/^https?:\/\//.test(path)) {
		endpoint = path;
	} else {
		endpoint = this.API_KEY + path;
	}
    request
    	.put(endpoint)
    	.type('json')
        .set('Accept', 'application/json')
        .set('Authorization', 'token' + this.API_KEY)
        .query(query)
        .send(body)
        .end(callback);
};

/**
 * Method responsible to provide delete requests
 *
 * @example
 *
 * request.del('path/to/route', {query: 'querystring'}, function(err, res) {
 *		console.log(res.body);
 * });
 *
 * @module Sharon
 * @class Request
 * @method del
 * @protected
 * @return {Function} A callback with the error and response object
 */

Request.prototype.del = function del(path, query, callback) {
	if (!callback) {
    	callback = query;
    }
    if (typeof callback !== 'function') {
    	throw new Error('Callback must be a function.');
    }
	var endpoint;
	if(/^https?:\/\//.test(path)) {
		endpoint = path;
	} else {
		endpoint = this.API_KEY + path;
	}
    request
    	.del(endpoint)
        .type('json')
		.set('Accept', 'application/json')
        .set('Authorization', 'token' + this.API_KEY)
        .query(query)
        .end(callback);
};
