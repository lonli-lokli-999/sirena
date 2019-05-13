/*====================================
 * file viewer module
====================================*/

	'use strict';
	
	var files = {
		open( foldername ){
			var parent_folder = path.dirname( path.resolve( foldername ) ),
				folder_content = fs.readdirSync(path.relative('./', foldername )).map( el => `${foldername}/${el}` );
			if( parent_folder != '/' ) folder_content.unshift( parent_folder );
			return folder_content 
		},
		sort(list) {
			var music = list.filter( (el) => ( el.lastIndexOf( '.mp3' ) != -1 ? true : false ) ),
				folders = list.filter( (el) => ( el.lastIndexOf( '.' ) == -1 ? true : false ) );
			return  {music: music, folders: folders}	
		},
		show(files){	
			draw.fileManeger(files)
		}
	};



