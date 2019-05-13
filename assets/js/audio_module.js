/*====================================
 * audio module
====================================*/

	'use strict';
	
	var player = {
		audio: new Audio(),
		muted: function() {
			if( this.audio.paused ) 
				{ this.audio.play() }
				else
				{ this.audio.pause() };
		},
		get next() {
			return this.btntreack.nextSibling
		},
		get previous(){
			return this.btntreack.previousSibling
		},
		set: function( btntreack ) {
			this.btntreack = btntreack;
			this.audio.src = btntreack.getAttribute( 'data' );
			this.audio.play()
		},
		setingtime: function(ratetime) {
			if( !this.audio.src ) return -1;
			this.audio.currentTime = this.audio.duration * ( ratetime / 100 );
		},
		volume: function() {
			this.audio.volume = this.audio.volume != 0 ? 0 : 0.5;
		},
		watch: function(box) {
			var
			a = this.audio,
			nowstatus = ( a.currentTime / a.duration ) * 100;
			box.style.width = `${nowstatus}%`;
		},
		find: function(){
			var val = document.getElementById( 'inp-search' ).value;
			alert( val );
		}
	};
	
	
	(function(){ // audio elements event
		player.audio.addEventListener('timeupdate', function() {
			player.watch( document.querySelector( '.status-bar span' ) )
		});

		player.audio.addEventListener('ended', function() {
			player.set( player.next )
		});
		
		document.querySelector('#volume').addEventListener('wheel', function(ev) {
			ev.preventDefault();
			var step = ev.deltaY * 0.001,
				volume = player.audio.volume,
				newvolume = volume - step;
				player.audio.volume = newvolume >= 1 ? 1 : newvolume <= 0 ? 0 : newvolume;
		});
		
		document.querySelector('.status-bar').addEventListener('click', function(ev) {
			var
			x = ev.layerX,
			w = parseInt(getComputedStyle(this).width);
			player.setingtime( (x/w)*100 )
		});
	}(null));
