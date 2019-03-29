	;
	"use strict";

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

	function _() {
	  var el = document.createElement(arguments[0]);
	  if (arguments[1]) {
	    if (typeof arguments[1] == 'string' || arguments[1].styles) {
	      cls = typeof arguments[1] == 'string' ? arguments[1] : arguments[1].styles;
	      cls = cls.split(' ');

	      cls.forEach(function(cls) {
	        el.classList.add(cls)
	      });
	    }
	    if (arguments[1].text || arguments[2]) {
	      el.innerHTML = typeof arguments[1] == 'object' ? arguments[1].text : arguments[2];
	    }
	    if (arguments[1].attr || arguments[3]) {
	      attr = typeof arguments[1] == 'object' ? arguments[1].attr : arguments[3];
	      keys = Object.keys(attr);
	      keys.forEach(function(key) {
	        el.setAttribute(key, attr[key]);
	      });
	    }
	  }
	  el.append = function(elm) {
	    this.appendChild(elm);
	    return this
	  };
	  el.appendTo = function(par) {
	    par = typeof par == 'string' ? document.querySelector(par) : par;
	    par.appendChild(this);
	    return par
	  };
	  el.event = function(ev, fun) {
	    this.addEventListener(ev, fun);
	    return this
	  };
	  return el
	};

	function scroll(el) {
	  el.addEventListener('wheel', function(ev) {
	    ev.preventDefault();
	    sy = this.querySelector('.scroll-all').style.top ? -parseInt(this.querySelector('.scroll-all').style.top) : 0;
	    delt = ev.deltaY || ev.detail || ev.wheelDelta;
	    sy += delt * 5;
	    hs = parseInt(getComputedStyle(this).height);
	    ha = parseInt(getComputedStyle(this.querySelector('.scroll-all')).height);
	    if (sy < 0) sy = 0;
	    if (sy > ha - hs) sy = ha - hs;
	    if (ha > hs) this.querySelector('.scroll-all').style.top = `-${sy}px`;
	  })
	};
	
	window.addEventListener( 'resize', function(){
		var box = document.querySelector( '.playlist' );
		box.querySelector( '.scroll-all' ).style.top = 0;
	} );
	
	function random_color( param ){
		var
		r = Math.round(0 - 0.5 + Math.random() * (260 - 0 + 1)),
		g = Math.round(0 - 0.5 + Math.random() * (260 - 0 + 1)),
		b = Math.round(0 - 0.5 + Math.random() * (260 - 0 + 1));
		document.body.style.setProperty( param , `rgba(${r},${g},${b},1)` );
	};


	/*====================================
	functions end
	====================================*/

	/*====================================
	starting
	====================================*/

	(function(u) {

	  d.querySelector('#mutted')
	    .addEventListener('click', function() {
	      audio.mutted()
	    });

	  d.querySelector('#next')
	    .addEventListener('click', function() {
	      audio.next()
	    });

	  d.querySelector('#previous')
	    .addEventListener('click', function() {
	      audio.previous()
	    });

	  d.querySelector('#fs')
	    .addEventListener('click', function() {
	      vis = document.querySelector('.fs-wrapp');
	      vis.style.height = vis.style.height != '20rem' ? '20rem' : 0;
	    });

	  d.querySelector('#volume')
	    .addEventListener('click', function() {
	      audio.aud.volume = audio.aud.volume != 0 ? 0 : 1;
	    });
	    
	  d.querySelector('#color').addEventListener('dblclick', function(){
		random_color( '--prm_bg' )
	  } );

	  d.querySelector('.inp-wrap')
		.querySelector('button')
			.addEventListener('click', function() {
				var val = this.parentElement.querySelector('input').value;
				term.perf(val);
		});

	  d.querySelector('.volume-bar')
	    .addEventListener('click', function(ev) {
	      y = ev.layerY,
	        h = parseInt(getComputedStyle(this).height),
	        v = 100 - ((y / h) * 100);
	      this.querySelector('span').style.height = v + '%';
	      audio.aud.volume = v / 100;
	    });

	  d.querySelectorAll('.scroll-show').forEach(function(el) {
	    scroll(el)
	  });

	  d.querySelector('.status-bar').addEventListener('click', function(ev) {
	    x = ev.layerX,
	      w = parseInt(getComputedStyle(this).width);
	    audio.control((x / w) * 100)
	  });

	  audio.aud.addEventListener('timeupdate', function() {
	    audio.watch()
	  });

	  audio.aud.addEventListener('ended', function() {
	    audio.next()
	  });

	  fs.readdir( 'assets/img/bg/', function( err, bgs ){
		  if( err ) {
			  d.body.style.background = 'url(assets/img/bg/main_bg0.png)  center center / cover no-repeat';
		  } else {
			var
				max = bgs.length -1,
				min = 0,
				i =  Math.round(min - 0.5 + Math.random() * (max - min + 1)) ;
			d.body.style.background = `url(assets/img/bg/${bgs[i]})  center center / cover no-repeat`;
		}
	  } );
	  
	  music.loaddir();
	  music.loadpl();
	  random_color( '--prm_bg' );

	}(u));

	/*====================================
	starting  end
	====================================*/
