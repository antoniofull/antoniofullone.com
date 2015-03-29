(function(){
	"use strict";

	var utils = require('./utils');
	// var FontLoader = require('./FontLoader');

	document.addEventListener('DOMContentLoaded', function() {
		if(document.querySelector('.settings')) {
			utils.initialize();
	  	}
		// var fontLoader = new FontLoader(['skolar', 'freight-text-pro-1'], {
		//             "fontsLoaded": function(error) {
		//                 if (error !== null) {
		//                     // Reached the timeout but not all fonts were loaded
		//                     console.log(error.message);
		//                     console.log(error.notLoadedFontFamilies); 
		//                 } else {
		//                     // All fonts were loaded
		//                     console.log("all fonts were loaded");
		//                 }
		//             },   
		//             "fontLoaded": function(fontFamily) {
		//                 // One of the fonts was loaded
		//                 console.log("font loaded: " + fontFamily);
		//             }
		//         }, 3000);
		//         fontLoader.loadFonts();
	});
})(); 

