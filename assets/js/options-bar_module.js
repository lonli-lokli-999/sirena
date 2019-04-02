/*====================================
 * options bar module
====================================*/ 

	'use strit';
	
	var bookmarks = {
		read: function(){
				return JSON.parse( fs.readFileSync('./data/bookmarks.json', 'utf8' ) );
		},
		add: function(folder){
			var bokm = this.read(),
				json = JSON.stringify(  bokm.concat( folder ) );
				fs.writeFileSync( './data/bookmarks.json', json );
		},
		remove: function(folder){
			var bokm = this.read(),
				json = JSON.stringify( bokm.filter( (el) => ( el == folder ) ) );
				fs.writeFileSync( './data/bookmarks.json', json );
		}
	}
