/*====================================
 * music module
====================================*/


var music = {
	plshow: function(el, tracks){
		el = document.querySelector( el );
		el.innerHTML = tracks.map( el => `<button data="file://${el}">${el.slice( el.lastIndexOf( '/' ) +1 )}</button>` ).join('');	
		this.pleventer( el.querySelectorAll( 'button' ) )	
	},
	pleventer: function(btn){
		btn.forEach( function(el){
			el.addEventListener( 'click', function(){
				audioControll.set( this.getAttribute( 'data' ) )
			} )

			el.addEventListener( 'contextmenu', function(ev){
				ev.preventDefault();
					var contextelm = this,
						contextmenuhtml = `<button id=open>Open</button><button id=addtobookmarks>Add to bookmarks</button><button id=playlistcreate>Create playlist</button>`,
						div  = contextmenu( {x:ev.clientX,y:ev.clientY}, contextmenuhtml );
			} )	
		} )
	}
};
