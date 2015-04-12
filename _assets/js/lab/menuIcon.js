import Snap from 'snapsvg';

function endAnimation() {
	// Do something when animation ends
}

export default class MenuIcon {
	constructor() {
		var icon = document.querySelector('.icon');
		icon.addEventListener('click', this.CrossMorph.bind(this)); 
		this.toggle = true;
		this.toggleCss();
	}

	CrossMorph(e){
		var rec = Snap('#Rectangle-1');
		var rec2 = Snap('#Rectangle-2');
		var rec3 = Snap('#Rectangle-3');
		if(this.toggle) {
			e.preventDefault();
			rec.animate({transform: "R45,0,0", fill: 'green'}, 300, mina.easeout, endAnimation());
			rec2.animate({transform: "R-45,22,40", fill: 'green'}, 300, mina.easeout, endAnimation());
			rec3.animate({width:0, opacity: 0}, 100, mina.easein, endAnimation());
			this.toggle = false;
		} else {
			e.preventDefault();
			rec.animate({transform: "R0,0,0", fill: ''}, 300, mina.easeout, endAnimation());
			rec2.animate({transform: "R0,22,40",fill: '' }, 300, mina.easeout, endAnimation());
			rec3.animate({width:60, opacity: 1}, 100, mina.easein, endAnimation());
			this.toggle = true;
		}
	}

	toggleCss() {
		var icon = document.querySelector('.css');
		var btn = icon.querySelector('.menu-icon');
		btn.addEventListener('click', _ => {
			icon.classList.toggle('animate');
		});	
	}
}

	
