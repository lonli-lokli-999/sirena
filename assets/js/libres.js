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

	/* functions end
	 =====================================*/
