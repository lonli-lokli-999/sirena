/*====================================
 * options bar module
====================================*/ 

	'use strit';

	function fileContextMenu( key, folder ){
		key == 'open' ?
			( music.plshow( '.music', files.sort(files.open( folder )).music ) ) :
		key == 'addtobookmarks' ? 
			( bookmarks.add( folder ) ) :
		key == 'playlistcreate' ?
			( playlist.create( 'new' ) ) :
		false;
	};

	function bookmarksContextMenu( key, bokm ){
		key == 'open' ?
			( music.plshow( '.music', files.sort(files.open( bokm )).music ) ) :		
		key == 'del' ?
			( bookmarks.remove( bokm ) ) :
		false;
	};
	
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
				json = JSON.stringify( bokm.filter( (el) => ( el != folder ) ) );
				fs.writeFileSync( './data/bookmarks.json', json );
		}
	},


		playlist = {
		create: function(name){
			fs.writeFileSync( `./data/pl-${name.replace( / /g, '_' )}.json`, '[]' )
		},
		del: function( file ){
			fs.unlinkSync(file)
		},
		add: function(){

		},
		remove: function(){

		},
		allpalylist: function(){
			return fs.readdirSync('./data').filter( (el) => ( el.lastIndexOf( 'pl-' ) != -1 ? true : false ) );
		},
		readplaylist(pl){
			return JSON.parse( fs.readFileSyncfile( pl, 'utf8' ) );
		}
	};
