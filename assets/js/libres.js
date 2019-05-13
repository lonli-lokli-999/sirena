	'use strict';
	var
			fs = require('fs'),
			path = require('path');
			
	/* functions
	 =====================================*/
		function scrollBox(el){
			el.addEventListener( 'DOMSubtreeModified',function(){
				scrollReset( this )
			} )
	
			el.addEventListener('wheel', function(ev) {
					ev.preventDefault();
					var sy = this.querySelector('.scroll__content').style.top ? -parseInt(this.querySelector('.scroll__content').style.top) : 0,
					hs = parseInt(getComputedStyle(this).height),
					ha = parseInt(getComputedStyle(this.querySelector('.scroll__content')).height);
					sy += ev.deltaY * 4;
					if (sy < 0) sy = 0;
					if (sy > ha - hs) sy = ha - hs;
					if (ha > hs) this.querySelector('.scroll__content').style.top = `-${sy}px`;
			});
		};

		function scrollReset(bs){
			bs.querySelector('.scroll__content').style.top = '0';
		}

	/* functions end
	 =====================================*/

