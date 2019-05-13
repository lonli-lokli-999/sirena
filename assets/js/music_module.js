/*====================================
 * music module
====================================*/


var music = {
	plshow(el, tracks){
		el = tabs.create( el );
		el.innerHTML = tracks.map( el => `<button data="file://${el}">${el.slice( el.lastIndexOf( '/' ) +1 )}</button>` ).join('');	
		this.pleventer( el.querySelectorAll( 'button' ) )	
	},
	pleventer(btn){


	}
};
