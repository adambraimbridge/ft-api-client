/*global console:true*/
var ftApi = require('../ftApi.js');

function getApiData () {
	"use strict";
	var config = {
			apiKey: "f65958a8e35bd14bc52f268b8b3ab4ad"
		},
		itemsList = ['2eb9530a-5e6e-11e2-b3cb-00144feab49a', 'becf9568-567a-11e2-aa70-00144feab49a'];

	// Optionally:
	//config.aggregateResponse		= true; Optional, set true by default: Combine all the response and return them when 'loadComplete' fires
	//config.apiDomain				= 'api.ft.com'; // Optional, set by default: The domain for the CAPI
	//config.apiItemPath			= '/content/notifications/v1/items'; // Optional, set by default
	//config.apiUpdateDelay			= 125; // Optional, set by default: Time in ms between requests, used to control the speed of comms to the API

	// Request the content from the API. Content is fetched synchronously and throttled using the apiUpdateDelay property of config.
	// Pass an array of IDs
	ftApi.content.getApiContent(itemsList, config);

	// An 'itemLoaded' event will fire after each item is successfully loaded
	ftApi.content.on('itemLoaded', function (data) {
		console.log('Individual item loaded');
		console.log(data);
	});

	// An 'allItemsLoaded' event will fire when all content is loaded.
	ftApi.content.on('allItemsLoaded', function (responseData) {
		// Returns a list of response CAPI response items
		console.log('All items loaded');
		console.log(responseData);
	});
}
getApiData();