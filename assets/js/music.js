var music = {
	  trlist: [],
	  opendir: function(arg) {
	    dir = path.relative('./', arg);
	    fs.readdir(dir, function(err, items) {
	      items.forEach(function(el) {
	        if (el.lastIndexOf('.mp3') != -1) {
	          furl = 'file:///' + path.resolve(dir + '/' + el);
	          music.tpl(furl);
	        };
	      })
	    })
	  },
	  loadpl: function() {
	    document.querySelector('#js-music-playlist').innerHTML = '';
	    fs.readdir('data', function(err, fl) {
	      if (err) return f;
	      fl.forEach(function(el) {
	        if (el.lastIndexOf('pl-') != -1) {
	          var name = el.slice(3, el.length - 5);
	          _('button', {
	              text: name,
	              attr: {
	                data: el
	              }
	            })
	            .event('click', function() {
	              music.plc(),
	                fs.readFile(`data/${this.getAttribute( 'data' )}`, function(err, json) {
	                  if (err) return f;
	                  JSON.parse(json)
	                    .forEach(function(el) {
	                      music.tpl(el)
	                    })
	                })
	            })
	            .appendTo(document.querySelector('#js-music-playlist'))
	        }
	      })
	    });
	  },
	  loaddir: function() {
	    document.querySelector('#js-music-folders').innerHTML = '';
	    fs.readFile('data/music-folders.json', 'utf-8', function(err, json) {
	      JSON.parse(json)
	        .forEach(function(fol) {
	          _('button', {
	              text: fol,
	              attr: {
	                data: fol
	              }
	            })
	            .event('click', function() {
	              music.plc(),
	                music.opendir(this.getAttribute('data'))
	            })
	            .appendTo(document.querySelector('#js-music-folders'))
	        });
	    })
	  },
	  plc: function() {
	    music.trlist.length = 0;
	    pl = document.querySelector('.playlist');
	    pl.querySelector('ul').innerHTML = '';
	    pl.querySelector('.scroll-all').style.top = 0;
	  },
	  tpl: function(track) {
	    music.trlist.push(track);
	    _('li')
	      .append(
	        _('button', {
	          attr: {
	            data: track
	          },
	          text: track.slice(track.lastIndexOf('/') + 1)
	        })
	        .event('click', function() {
	          audio.mutted(this, this.getAttribute('data'))
	        })
	      )
	      .appendTo(document.querySelector('.playlist').querySelector('ul'));
	  }
	};