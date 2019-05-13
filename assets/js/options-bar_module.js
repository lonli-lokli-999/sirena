/*====================================
 * options bar module
====================================*/ 

	'use strit';

	function fileContextMenu( key, folder ){
		key == 'open' ?
			( draw.pl( folder, files.sort(files.open( folder )).music ) ) :
		key == 'addtobookmarks' ? 
			( bookmarks.add( folder ) ) :
		key == 'playlistcreate' ?
			( playlist.create( 'new' ) ) :
		false;
	};

	function bookmarksContextMenu( key, bokm ){
		key == 'open' ?
			( draw.pl( bokm, files.sort(files.open( bokm )).music ) ) :		
		key == 'del' ?
			( bookmarks.remove( bokm ) ) :
		false;
	};
	
	var bookmarks = {
		read(){
				return JSON.parse( fs.readFileSync('./data/bookmarks.json', 'utf8' ) );
		},
		add(folder){
			var bokm = this.read(),
				json = JSON.stringify(  bokm.concat( folder ) );
				fs.writeFileSync( './data/bookmarks.json', json );
		},
		remove(folder){
			var bokm = this.read(),
				json = JSON.stringify( bokm.filter( (el) => ( el != folder ) ) );
				fs.writeFileSync( './data/bookmarks.json', json );
		}
	};

	var	playlist = {
		create(name){
			fs.writeFileSync( `./data/pl-${name.replace( / /g, '_' )}.json`, '[]' )
		},
		del( file ){
			fs.unlinkSync(file)
		},
		add(){

		},
		remove(){

		},
		readplaylist(pl){
			return JSON.parse( fs.readFileSyncfile( pl, 'utf8' ) );
		},
		get all(){
			return fs.readdirSync('./data').filter( (el) => ( el.lastIndexOf( 'pl-' ) != -1 ? true : false ) );
		}
	};

	var	tabs = {
		create(tab){		
			var 
				boxTabId = `idtabs${document.querySelectorAll('.music div').length}`,
				boxTab = document.createElement( 'div' ),
				btnTab = document.createElement( 'button' );
				console.log( document.querySelectorAll('.music div').length )
				boxTab.setAttribute( 'id', boxTabId )
				boxTab.classList.add( 'tab' )
				
				btnTab.innerHTML = tab;
				btnTab.setAttribute( 'data', boxTabId );
				btnTab.addEventListener( 'click', function(){
					tabs.set( document.querySelector( `\#${this.getAttribute('data')}` ) )
				});

			document.querySelector('.music').appendChild( boxTab )
			document.querySelector('.options__tabs').appendChild( btnTab )

			this.set( boxTab )
			return boxTab
		},
		list(){
			var tabsBoxList = document.querySelectorAll( '.music .tab' );
			return tabsBoxList.length != 0 ? tabsBoxList.map( el => el.getAttribue( 'data' ) ) : []; 	
		},
		remove(tab){
		},
		set(tab){
			var activeTab = tab.parentElement.querySelector( '.tab--active' );
			if( activeTab ) activeTab.classList.remove( 'tab--active' );
			tab.classList.add( 'tab--active' );
			scrollReset( tab.closest( '.b-scroll' ) )
		}
	};






