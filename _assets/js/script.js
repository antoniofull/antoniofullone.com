"use strict";

var utils = require('./utils');

document.addEventListener('DOMContentLoaded', function() {
	if(document.querySelector('.settings')) {
		utils.initialize();
  	}
});