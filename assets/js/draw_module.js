/*====================================
 * draw grafic enterface module
====================================*/

	var draw = {
		pl(el, tracks){
			box_pl = tabs.create( el );
			box_pl.innerHTML = tracks.map( el => `<button data="file://${el}">${el.slice( el.lastIndexOf( '/' ) +1 )}</button>` ).join('');	
			atach_event.pl(box_pl)
		},
		contextmenu(coard, content){
			if( document.querySelector( '.contextmenu' ) ) { 
				document.querySelector( '.contextmenu' ).remove()
				document.body.removeEventListener( 'click', context_remove )
			};

			var box_menu = document.createElement( 'div' );
				box_menu.classList.add( 'contextmenu' );
				box_menu.style.cssText = `top: ${coard.y}; left: ${coard.x}`;
				box_menu.innerHTML = content;
				atach_event.contextMenu( box_menu )
				
			return document.body.appendChild( box_menu );
		},
		fileManeger(files){
			var fm_html = files.map( el => `<button data="${el}">${el.slice( el.lastIndexOf( '/' ) +1 )}</button>` ).join(''),
				el = document.querySelector('.options__file-wiev');
			el.innerHTML = fm_html;
			atach_event.fm(el)
		}
	};


	var	atach_event = {
		pl(box_pl){
			box_pl.querySelectorAll('button').forEach( function(btn){
				
				btn.addEventListener( 'click', function(){
				player.set( this )
				} );
			
				btn.addEventListener( 'contextmenu', function(ev){
					ev.preventDefault();
					var contextelm = this,
						contextmenuhtml = `<button id=pay>Play</button><button id=playlistcreate>Create playlist</button>`,
						div  = draw.contextmenu( {x:ev.clientX,y:ev.clientY}, contextmenuhtml );
				} );

			} );
		},
		fm(box_fm){
			box_fm.querySelectorAll('button').forEach( function(folders){

				folders.addEventListener('click', function(){
					var res = files.sort(files.open( this.getAttribute( 'data' ) ));
					files.show( res.folders )
				});
				
				folders.addEventListener('contextmenu', function(ev){
					ev.preventDefault();
					var contextelm = this,
						contextmenuhtml = `<button id=open>Open</button><button id=addtobookmarks>Add to bookmarks</button><button id=playlistcreate>Create playlist</button>`,
						div  = draw.contextmenu( {x:ev.clientX,y:ev.clientY}, contextmenuhtml );
						
						div.querySelectorAll( 'button' ).forEach( function(el){
							el.addEventListener( 'click', function(){
									fileContextMenu(this.getAttribute('id'), contextelm.getAttribute( 'data' ) );
							} )
						} )
						
				});

			})
		},
		contextMenu( box_menu ){
			document.body.addEventListener( 'click', context_remove );

			function context_remove(){
					document.querySelector( '.contextmenu' ).remove();
					document.body.removeEventListener( 'click', context_remove )
			};		
		}
	};
		

				
