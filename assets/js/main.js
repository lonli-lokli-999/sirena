	'use strict';
			
	(function(w,d,h, b){
		
			d.querySelectorAll( '.controll-bar button' ).forEach( function(el){
				el.addEventListener( 'click', function(){
					var btnid = this.getAttribute( 'id' );
					audioControll[btnid]()
				} );
			} );
			
			d.querySelectorAll( '.options-list button' ).forEach( function(el){
				el.addEventListener( 'click', function(){
					var btnid = this.getAttribute( 'id' );
					d.querySelector( '.options--active' ).classList.remove( 'options--active' );
					d.querySelector( `.options__${btnid}` ).classList.add( 'options--active' )
				} );
			} );
			
			d.querySelectorAll( '.b-scroll' ).forEach( function(el){
		
				el.addEventListener( 'DOMSubtreeModified',function(){
					this.querySelector('.scroll__content').style.top = '0';
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
			} );
			
			
			
			files.show( '.options__file-wiev' ,files.sort(files.open( '/home/reader' )).folders )
			
	}(window, document, document.head, document.body));

	
	
