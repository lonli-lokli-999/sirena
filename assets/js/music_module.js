/*====================================
 * music module
====================================*/


var music = {
	plshow: function(el, tracks){
		el = document.querySelector( el );
		el.innerHTML = tracks.map( el => `<button data="file://${el}">${el.slice( el.lastIndexOf( '/' ) +1 )}</button>` ).join('');
		el.querySelectorAll( 'button' ).forEach( function(btn){
			btn.addEventListener( 'click', function(){
				audioControll.set( this.getAttribute( 'data' ) )
			} )
		} )
	}
};
