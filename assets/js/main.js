;  "use strict";
var
  d = document,
  u = undefined,
  n = null,
  f = false,
  t = true,
  s = 'string',
  o = 'object',
  b = 'boolean';

  var 
  	fs = require('fs'),
  	path = require('path');
  
    /*====================================
	functions end
	====================================*/
        
            function scroll( el ) {
                el.addEventListener( 'wheel', function(ev) {
                                ev.preventDefault();
                sy = this.querySelector( '.scroll-all' ).style.top ? - parseInt( this.querySelector( '.scroll-all' ) .style.top ) : 0;
                console.log( sy )
                                delt = ev.deltaY || ev.detail || ev.wheelDelta;
                                sy += delt * 10;
                hs = parseInt( getComputedStyle( this.querySelector( '.scroll-show' ) ).height ) ;
                ha = parseInt( getComputedStyle( this.querySelector( '.scroll-all' ) ).height ) ;
                                if( sy < 0 ) sy = 0 ;
                                if( sy > ha - hs  )  sy = ha - hs;
                                if( ha > hs )this.querySelector( '.scroll-all' ).style.top = - sy + 'px';
                        } )
        };
        
        /*====================================
	functions end
	====================================*/
  
	/*====================================
	init player 
	====================================*/

	(function(u){

			dir = '../../music/';
			fs.readdir( dir, function(err, items) {
    			items.forEach( function( el ) {
    				to_playlist( 'file:///' + path.resolve( dir + el ) )
    			} )
			});	

			d.querySelector( '#mutted' ) 
				.addEventListener( 'dblclick', function() {
				audio.mutted()
			} );

			d.querySelector( '#next' )
				.addEventListener( 'dblclick', function() {
					audio.next()
			} );

			d.querySelector( '#previous' )
				.addEventListener( 'dblclick', function() {
					audio.previous()
			} );

			d.querySelector( '#vis' )
				.addEventListener( 'dblclick', function() {
					vis = document.querySelector( '.vis-wrapp' );
					vis.style.height = vis.style.height != '10rem' ?  '10rem' : 0;
			} );

			d.querySelector( '#volume' )
				.addEventListener( 'dblclick', function() {
					audio.aud.volume = audio.aud.volume != 0 ?  0 : 1;
			} );

			d.querySelector( '.volume-bar' )
				.addEventListener( 'click', function(ev) {
				y = ev.layerY,
				h = parseInt( getComputedStyle( this ).height ),
				v = (y / h) * 100;
				this.querySelector( 'span' ).style.height = v + '%';
				audio.aud.volume = v / 100;
			} );
                                
                        d.querySelectorAll( '.b-scroll-wrap' ).forEach( function (el) {
                            scroll( el )
                        } )


	}( u ));

	function to_playlist( track ){
		_( 'li' )
			.append( 
					_( 'button', { attr: { data: track }, text: track.slice( +track.lastIndexOf('/')+1, track.length ) } )
				.event( 'click', function(){
					audio.mutted( this, this.getAttribute( 'data' ) )
				})	 
			)
		.appendTo( d .querySelector( '.playlist' ) .querySelector( 'ul' ) );
	};

	/*====================================
	init player  end 
	====================================*/


		var audio = {
		aud: new Audio(),
		mutted: function( but, url ) {
			if( !url || url == this.track ) this.aud.paused == true ? this.play() : this.pause();
			if( this.track != url && url ) {
				this.set( but, url );
				this.play();
			}
		},
		set: function( but, track ){
			act = document.querySelector( '.playlist' ) .querySelector( '.active' );
			if( act ) act.classList.remove( 'active' );
			but.classList.add( 'active' );
			this.aud.src = this.track = track;
			this.play()
		},
		play: function(){
			this.aud.play()
		},
		pause: function(){
			this.aud.pause()
		},
		watch: function(){
			d = this.aud.duration,
			t = this.aud.currentTime,
			status = ( t / d ) * 100;
			document.querySelector( '.status-bar' ).querySelector( 'span' ).style.width = status + '%';
		},
		control: function(t){
			t = this.aud.duration * (t / 100) ;
			this.aud.currentTime = t;
		},
		next: function() {
			el = document.querySelector( '.playlist' ) .querySelector( '.active' ) .parentElement ;
			el = el.nextSibling .querySelector( 'button' );
			if( el != null ) this.mutted( el, el.getAttribute( 'data' ) );
		},
		previous: function() {
			el = document.querySelector( '.playlist' ) .querySelector( '.active' ) .parentElement ;
			el = el.previousSibling .querySelector( 'button' );
			if( el != null ) this.mutted( el, el.getAttribute( 'data' ) );
		}
	};

	d.querySelector( '.status-bar' ).addEventListener( 'click', function( ev ) {
	x = ev.layerX,
	w = parseInt( getComputedStyle( this ).width );
	audio.control( (x / w) * 100 )
	});
	audio.aud.addEventListener( 'timeupdate', function(){
	audio.watch()
	} );


function _(){

    var el = document.createElement( arguments[0] );

    if( arguments[1] ){
      if( typeof arguments[1] == 'string' || arguments[1].styles ){
        cls = typeof arguments[1] == 'string' ? arguments[1] : arguments[1].styles ;
        cls = cls.split( ' ' );

        cls.forEach(function( cls ){
          el.classList.add( cls )
        });
      }

      if( arguments[1].text || arguments[2] ){
        el.innerHTML = typeof arguments[1] == 'object' ? arguments[1].text :  arguments[2];
      }

      if( arguments[1].attr || arguments[3] ){
        attr = typeof arguments[1] == 'object' ? arguments[1].attr : arguments[3];
        keys = Object.keys( attr );
        keys.forEach(function(key){
          el.setAttribute( key, attr[key] );
        });
      }
    }

    el.append = function( elm ){
      this.appendChild( elm );
      return this;
    };

    el.appendTo = function( par ){
      par = typeof par == 'string' ? document.querySelector( par ) : par ;
      par.appendChild( this );
      return par
    };

    el.event = function( ev, fun ){
      this.addEventListener( ev, fun );
      return this
    };
    return el
  };
