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
			      return this };
			    el.appendTo = function( par ){
			      par = typeof par == 'string' ? document.querySelector( par ) : par ;
			      par.appendChild( this );
			      return par };
			    el.event = function( ev, fun ){
			      this.addEventListener( ev, fun );
			      return this };
			    return el
			};
        
            function scroll( el ) {
                el.addEventListener( 'wheel', function(ev) {
                ev.preventDefault();
                sy = this.querySelector( '.scroll-all' ).style.top ? - parseInt( this.querySelector( '.scroll-all' ) .style.top ) : 0;
                delt = ev.deltaY || ev.detail || ev.wheelDelta;
                sy += delt * 5;
                hs = parseInt( getComputedStyle( this ).height ) ;
                ha = parseInt( getComputedStyle( this.querySelector( '.scroll-all' ) ).height ) ;
                    if( sy < 0 ) sy = 0 ;
                    if( sy > ha - hs  )  sy = ha - hs;
                    if( ha > hs )this.querySelector( '.scroll-all' ).style.top = `-${sy}px`;
                } )
            };
        
    /*====================================
	functions end
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

    /*====================================
	music
	====================================*/
    
    var music = {
        trlist: [],
        opendir: function( arg ) {
            dir = path.relative('./', arg );
            fs.readdir( dir, function(err, items) {
                items.forEach( function( el ) {
                    if( el.lastIndexOf( '.mp3' ) != -1 ) {
                        furl = 'file:///' + path.resolve( dir + '/' + el );
                        music.tpl( furl );
                    };
                } )
            } )  
        },
		loadpl: function(){
			fs.readdir( 'data', function( err, fl ){
				if( err ) return f;
				fl.forEach(function(el){
					if( el.lastIndexOf( 'pl-' ) != -1 ){
						var name = el.slice( 3, el.length - 5 );
						_( 'button', { text: name, attr: { data: el } } )
								.event( 'click', function() {
									music.plc(),
									fs.readFile( `data/${this.getAttribute( 'data' )}`, function(err, json){
										if( err ) return f;
										JSON.parse( json )
											.forEach( function( el ){
												music.tpl( el )
											} )
									} )
								} )
						.appendTo( document.querySelector( '#js-music-playlist' ) )
					}
				})
			} );
		},
		loaddir: function(){
			document.querySelector( '#js-music-folders' ).innerHTML = '';
			fs.readFile( 'data/music-folders.json', 'utf-8', function( err ,json ) {
					JSON.parse( json )
						.forEach( function( fol ){
							_( 'button', { text: fol, attr: { data: fol } } )
								.event( 'click', function() {
									music.plc(),
									music.opendir( this.getAttribute( 'data' ) )
								} )
							.appendTo( document.querySelector( '#js-music-folders' ) )
						} )
                    ;
            }  )
		},
        plc: function(){
            this.trlist.length = 0;
            document.querySelector( '.playlist' )
            .querySelector( 'ul' )
                .innerHTML = ''; 
        },
        tpl: function( track ){
            music.trlist.push( track );
            _( 'li' )
                .append( 
                    _( 'button', { attr: { data: track }, text: track.slice( track.lastIndexOf('/')+1 ) } )
                        .event( 'click', function(){
			audio.mutted( this, this.getAttribute( 'data' ) )
			})	 
			)
            .appendTo( document .querySelector( '.playlist' ) .querySelector( 'ul' ) );
        }
    };
    
    /*====================================
	music end
	====================================*/
    
    /*====================================
	console
	====================================*/
    var term = {
        perf: function(arg) {
            if( !arg ) return;
            arg = arg.split( ' ' );
            this.clear();
                arg[0] == "open" ? 
                    ( music.plc(), music.opendir( arg[1] ) ):
                arg[0] == 'exit' ?
                    ( alert( 'Exit' ) ) :
                arg[0] == 'pladd' ?
                    ( this.addpl( arg[1], arg[2] ) ) :
				arg[0] == 'diradd' ?
					( this.diradd( arg[1] ) ) :
				arg[0] == 'find' ?
					( this.find( arg[1] ) ):
                false;
            
        },
        clear: function() {
            d.querySelector( '.comand-line' ).value = '';
        },
        addpl: function( pl, tr ) {
			fs.readFile(`data/pl-${pl}.json`, function(err, tracks){
				tracks = err ? [] : JSON.parse( tracks );
				tr.split( ',' ).forEach(function(el){
					tracks.push(el)
				});
				fs.writeFile( `data/pl-${pl}.json`, JSON.stringify( tracks ), function(err){} );
			})
        },
		diradd: function(dir){
			fs.readFile( 'data/music-folders.json', 'utf-8', function( err ,json ) {
                if( err ) return ;
					var folders = JSON.parse( json );
					folders.push( dir );
					fs.writeFile( 'data/music-folders.json', JSON.stringify( folders ), function(err){
						if(!err) music.loaddir();
					} );
            }  );
		},
		find: function( str ){
			if( !music.trlist ) return ;
				res = music.trlist.filter( function( value ){ return value.slice( value.lastIndexOf('/')+1 ).indexOf( str ) != -1 ? true : false } );
				music.plc()
				res.forEach( function( el ){
					music.tpl( el )
				} )
		}
    };
    
    /*====================================
	console end
	====================================*/

	/*====================================
	event
	====================================*/

	(function(u){

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
                
            d.querySelector( '.comand-line' ).addEventListener( 'change', function(){
                term.perf( this.value );
            } );

			d.querySelector( '.volume-bar' )
				.addEventListener( 'click', function(ev) {
				y = ev.layerY,
				h = parseInt( getComputedStyle( this ).height ),
				v = 100 - ((y / h) * 100);
				this.querySelector( 'span' ).style.height = v + '%';
				audio.aud.volume = v / 100;
			} );
                                
            d.querySelectorAll( '.scroll-show' ).forEach( function (el) {
                scroll( el )
            } );

            d.querySelector( '.status-bar' ).addEventListener( 'click', function( ev ) {
				x = ev.layerX,
				w = parseInt( getComputedStyle( this ).width );
				audio.control( (x / w) * 100 )
			});
			
			audio.aud.addEventListener( 'timeupdate', function(){
				audio.watch()
			} );

			audio.aud.addEventListener( 'ended', function(){
				audio.next()
			} );
			
			music.loaddir();
			music.loadpl();

	}( u ));

	/*====================================
	event  end 
	====================================*/
