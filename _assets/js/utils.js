(function(){
	"use strict";

	var Utils = {

		initialize: function() {
			var settings = document.querySelector('.settings'); 
			this.body = document.body;

			var self = this;
			console.log(settings); 
			if(settings) {
				settings.addEventListener('click', function(e){
					self.showGrid(e);
				});
			}
		},

		showGrid: function(e) {
			e.preventDefault();
			document.querySelector('html').classList.toggle('baseline');
		}
	};

	module.exports = Utils;
	
})();
