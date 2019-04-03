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
	},


		playlist = {
		create: function(name){
			fs.writeFileSync( `./data/pl-${name.replace( / /g, '_' )}`, '[]' )
		},
		del: function( file ){
			fs.unlinkSync(file)
		},
		add: function(){

		},
		remove: function(){

		},
		allpalylist: function(){

		},
		readplaylist(pl){
			return JSON.parse( fs.readFileSyncfile( pl, 'utf8' ) );
		}
	};
