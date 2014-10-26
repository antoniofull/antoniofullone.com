(function(){
	"use strict";
 
	var Utils = {

		initialize: function() {
			var settings = document.querySelector('.settings'); 
			var self = this;
			this.body = document.body;

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

