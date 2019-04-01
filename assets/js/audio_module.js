/*====================================
 * audio module
====================================*/

	'use strict';
	
	var audioControll = {
		audio: new Audio(),
		muted: function() {
			if( this.audio.paused ) 
				{ this.audio.play() }
				else
				{ this.audio.pause() };
		},
		succeeding: function() {
		},
		previous: function(){
			
		},
		set: function( treack ) {
			this.audio.src = treack;
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
		}
	};
	
	
	(function(){
		audioControll.audio.addEventListener('timeupdate', function() {
			audioControll.watch( document.querySelector( '.status-bar span' ) )
		});

		audioControll.audio.addEventListener('ended', function() {
			audioControll.succeeding()
		});
		
		document.querySelector('#volume').addEventListener('wheel', function(ev) {
			ev.preventDefault();
			var step = ev.deltaY * 0.001,
				volume = audioControll.audio.volume,
				newvolume = volume - step;
				audioControll.audio.volume = newvolume >= 1 ? 1 : newvolume <= 0 ? 0 : newvolume;
		});
		
		document.querySelector('.status-bar').addEventListener('click', function(ev) {
			var
			x = ev.layerX,
			w = parseInt(getComputedStyle(this).width);
			audioControll.setingtime( (x/w)*100 )
		});
	}(1));
