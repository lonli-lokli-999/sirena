	'use strict';
	var
			fs = require('fs'),
			path = require('path');
			
	/* functions
	 =====================================*/

		function contextmenu(coard, content){
			if( document.querySelector( '.contextmenu' ) ) document.querySelector( '.contextmenu' ).remove();
			function contextremove(){
					document.querySelector( '.contextmenu' ).remove();
					document.body.removeEventListener( 'click', contextremove )
			};
			var div = document.createElement( 'div' );
				div.classList.add( 'contextmenu' );
				div.style.cssText = `top: ${coard.y}; left: ${coard.x}`;
				div.innerHTML = content;
				
				document.body.addEventListener( 'click', contextremove )
				return document.body.appendChild( div );
		};

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

