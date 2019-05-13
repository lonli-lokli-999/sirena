	'use strict';
	(function(w,d,h, b){

			var cfg = JSON.parse( fs.readFileSync('./data/config.json', 'utf8' ) ); // conigure file load

			var theme = d.createElement('link');
				theme.setAttribute( 'rel', 'stylesheet' );
				theme.setAttribute( 'href', `./themes/theme-${cfg.theme}.css` );
			h.appendChild( theme ); // main css themes load

			b.style.background = `url(${cfg.mainbg}) center center / cover no-repeat`; // main backgroud load


			d.querySelectorAll( '.b-scroll' ).forEach( (el) => ( scrollBox(el) ) ); // box scroll activate
		
			d.querySelectorAll( '.controll-bar button' ).forEach( function(el){ // controll bar event
				el.addEventListener( 'click', function(){
					var btnid = this.getAttribute( 'id' );
						btnid == 'next' ?
							( player.set( player.next ) ) :
						btnid == 'previous' ?
							( player.set( player.previous ) ) :
						btnid == 'muted' ?
							( player.set( player.muted() ) ) :
						false;
				} );
			} );
			
			d.querySelectorAll( '.options-list button' ).forEach( function(el){ // options bar event
				el.addEventListener( 'click', function(){
					scrollReset( d.querySelector( '.options-list' ).parentElement )
					var btnid = this.getAttribute( 'id' );
					d.querySelector( '.options--active' ).classList.remove( 'options--active' );
					d.querySelector( `.options__${btnid}` ).classList.add( 'options--active' );
				} );
			} );	

			files.show( files.sort(files.open( cfg.maindir )).folders ); // file meneger open main folder
			
			d.querySelector('.options__playlists').innerHTML = playlist.all.map(el => `<button data="${el}">${el}</button>`).join(''); //playlists load			

			var boxBookmarks = d.querySelector( '.options__bookmarks' ); // bookmarks load
			boxBookmarks.innerHTML = bookmarks.read().map(el => `<button data="${el}">${el}</button>`).join('');
			
			boxBookmarks.querySelectorAll( 'button' ).forEach( function(el){
				el.addEventListener( 'click', function(){	
					draw.pl( '.music' , files.sort( files.open( this.getAttribute( 'data' ) ) ).music )
				} );

				el.addEventListener( 'contextmenu', function(ev){
					ev.preventDefault();

					var contextelm = this.getAttribute('data'),
						contextmenuhtml = `<button id=open>Open</button><button id=del >Del</button>`,
						div  = draw.contextmenu( {x:ev.clientX,y:ev.clientY}, contextmenuhtml );
					div.querySelectorAll( 'button' ).forEach(function(el){
						el.addEventListener( 'click', function(){
							bookmarksdraw.contextmenu( this.getAttribute('id'), contextelm )		
						})
					});
				} );
			} );
	
	}(window, document, document.head, document.body));

	
	
