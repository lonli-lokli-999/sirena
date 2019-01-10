var audio = {
	  aud: new Audio(),
	  mutted: function(but, url) {
	    if (!url || url == this.track) this.aud.paused == true ? this.play() : this.pause();
	    if (this.track != url && url) {
	      this.set(but, url);
	      this.play();
	    }
	  },
	  set: function(but, track) {
	    act = document.querySelector('.playlist').querySelector('.active');
	    if (act) act.classList.remove('active');
	    but.classList.add('active');
	    this.aud.src = this.track = track;
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
	    document.querySelector('.status-bar').querySelector('span').style.width = status + '%';
	  },
	  control: function(t) {
	    t = this.aud.duration * (t / 100);
	    this.aud.currentTime = t;
	  },
	  next: function() {
	    el = document.querySelector('.playlist').querySelector('.active').parentElement;
	    el = el.nextSibling.querySelector('button');
	    if (el != null) this.mutted(el, el.getAttribute('data')) ;
	  },
	  previous: function() {
	    el = document.querySelector('.playlist').querySelector('.active').parentElement;
	    el = el.previousSibling.querySelector('button');
	    if (el != null) this.mutted(el, el.getAttribute('data'));
	  }
	};