var audio = {
	  aud: new Audio(),
	  mutted: function(but, url) {
	    this.aud.paused == true ? this.play() : this.pause();
	  },
	  set: function(but, track) {
	    var act = document.querySelector('.playlist .active');
	    if (act) act.classList.remove('active');
	    but.classList.add('active');
	    this.aud.src = track;
	    this.play()
	  },
	  play: function() {
	    this.aud.play()
	  },
	  pause: function() {
	    this.aud.pause()
	  },
	  watch: function() {
	    dur = this.aud.duration,
	      t = this.aud.currentTime,
	      status = (t / dur) * 100;
	    document.querySelector('.status-bar span').style.width = status + '%';
	  },
	  control: function(t) {
	    t = this.aud.duration * (t / 100);
	    this.aud.currentTime = t;
	  },
	  next: function() {
	    var el = document.querySelector('.playlist .active').nextSibling;
	    if (el != null) this.set(el, el.getAttribute('data')) ;
	  },
	  previous: function() {
	    var el = document.querySelector('.playlist .active').previousSibling;
	    if (el != null) this.mutted(el, el.getAttribute('data'));
	  }
	};
