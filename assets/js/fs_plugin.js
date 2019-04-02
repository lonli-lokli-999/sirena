/*====================================
 * file viewer module
====================================*/

	'use strict';
	
	var files = {
		open: function( foldername ){
			var dir = fs.readdirSync(path.relative('./', foldername ));
			return dir.map( el => `${foldername}/${el}` ) 
		},
		sort: function(list) {
			var music = list.filter( (el) => ( el.lastIndexOf( '.mp3' ) != -1 ? true : false ) ),
				folders = list.filter( (el) => ( el.lastIndexOf( '.' ) == -1 ? true : false ) );
			return  {music: music, folders: folders}	
		},
		show: function(el, list){
			files.clear( '.options__file-wiev' );
			
			list.forEach(function( cont ){
				var btn = document.createElement( 'button' );
				btn.setAttribute( 'data', cont );
				
				btn.addEventListener('click', function(){
					var res = files.sort(files.open( this.getAttribute( 'data' ) ));
					files.show( '.options__file-wiev' ,res.folders )
				});
				
				btn.addEventListener('contextmenu', function(ev){
					ev.preventDefault();
					var contextelm = this,
						contextmenuhtml = `<button id=open>Open</button><button id=addtobookmarks>Add to bookmarks</button><button id=playlistcreate>Create playlist</button>`,
						div  = contextmenu( {x:ev.clientX,y:ev.clientY}, contextmenuhtml );
						
						div.querySelectorAll( 'button' ).forEach( function(el){
							el.addEventListener( 'click', function(){
									var folder = contextelm.getAttribute( 'data' ),
									key = this.getAttribute('id');
									
									key == 'open' ?
										( music.plshow( '.music', files.sort(files.open( folder )).music ) ) :
									false;
							} )
						} )
						
				});
				
				btn.innerHTML = cont.slice( cont.lastIndexOf( '/' ) +1 );
				document.querySelector( el ).appendChild( btn )
			});
		},
		clear: function(el){
			document.querySelector(el).innerHTML = '';
		}
	};
