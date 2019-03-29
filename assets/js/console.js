var term = {
	  perf: function(arg) {
	    if (!arg) return;
	    arg = arg.split(' ');
	    this.clear();
	    arg[0] == "open" ?
	      (music.plc(), music.opendir(arg[1])) :
	      arg[0] == 'exit' ?
	      (alert('Exit')) :
	      arg[0] == 'addpl' ?
	      (this.addpl(arg[1], arg[2])) :
				arg[0] == 'delpl' ?
				(this.delpl( arg[1] )) :
	      arg[0] == 'addfolder' ?
	      (this.diradd(arg[1])) :
	      arg[0] == 'find' ?
	      (this.find(arg[1])) :
	      false;

	  },
	  clear: function() {
	    d.querySelector('.comand-line').value = '';
	  },
	  addpl: function(pl, tr) {
	    tr == 'music' ? tr = music.trlist :
	    tr == 'track' ? tr = [audio.track] :
	    tr == undefined ? tr = '' : tr.split(',');
	    fs.readFile(`data/pl-${pl}.json`, function(err, tracks) {
	      tracks = err ? [] : JSON.parse(tracks);
	      tr.forEach(function(el) {
	        tracks.push(el)
	      });
	      fs.writeFile(`data/pl-${pl}.json`, JSON.stringify(tracks), function(err) { if(!err) music.loadpl() });
	    })
	  },
	  delpl: function(name) {
	    fs.unlink(`data/pl-${name}.json`, function(err) {
	      if (!err) music.loadpl();

	    })
	  },
	  diradd: function(dir) {
	    fs.readFile('data/music-folders.json', 'utf-8', function(err, json) {
	      if (err) return;
	      var folders = json != '' ? JSON.parse(json) : [];
	      folders.push(dir);
	      fs.writeFile('data/music-folders.json', JSON.stringify(folders), function(err) {
	        if (!err) music.loaddir();
	      });
	    });
	  },
	  find: function(str) {
	    if (!music.trlist) return;
	    res = music.trlist.filter(function(value) {
	      return value.slice(value.lastIndexOf('/') + 1).indexOf(str) != -1 ? true : false
	    });
	    music.plc()
	    res.forEach(function(el) {
	      music.tpl(el)
	    });
	  }
	};
