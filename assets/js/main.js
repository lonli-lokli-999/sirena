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
					scrollReset( d.querySelector( '.options-list' ).parentElement )
					var btnid = this.getAttribute( 'id' );
					d.querySelector( '.options--active' ).classList.remove( 'options--active' );
					d.querySelector( `.options__${btnid}` ).classList.add( 'options--active' );
				} );
			} );	
			
			d.querySelectorAll( '.b-scroll' ).forEach( (el) => ( scrollBox(el) ) );

			files.show( '.options__file-wiev' ,files.sort(files.open( '/home' )).folders );
			d.querySelector('.options__playlists').innerHTML = playlist.allpalylist().map(el => `<button data="${el}">${el}</button>`).join('');			

			var boxBookmarks = d.querySelector( '.options__bookmarks' );
			boxBookmarks.innerHTML = bookmarks.read().map(el => `<button data="${el}">${el}</button>`).join('');
			
			boxBookmarks.querySelectorAll( 'button' ).forEach( function(el){
				el.addEventListener( 'click', function(){	
					music.plshow( '.music' , files.sort( files.open( this.getAttribute( 'data' ) ) ).music )
				} );

				el.addEventListener( 'contextmenu', function(ev){
					ev.preventDefault();

					var contextelm = this.getAttribute('data'),
						contextmenuhtml = `<button id=open>Open</button><button id=del >Del</button>`,
						div  = contextmenu( {x:ev.clientX,y:ev.clientY}, contextmenuhtml );
					console.log( contextelm )
					div.querySelectorAll( 'button' ).forEach(function(el){
						el.addEventListener( 'click', function(){
							bookmarksContextMenu( this.getAttribute('id'), contextelm )		
						})
					});
				} );
			} );

			
			
	}(window, document, document.head, document.body));

	
	
