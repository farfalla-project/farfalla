//
// Farfalla - Accessibility in the Cloud
// http://farfalla-project.org/
//
// Copyright 2010, Andrea Mangiatordi
// Licensed under the AGPL Version 3 license.
// http://farfalla-project.org/license
//

function fgetScripts(s){
	var scripts = window.document.getElementsByTagName('script');
	var output = true;
	for (i = 0; i <= scripts.length-1; i++) {
		if(scripts[i].src.indexOf(s) > 0){
			output = false;
		}
	}
	return output;
}

if (fgetScripts('farfalla.js')){
	var headID = document.getElementsByTagName("head")[0];
	var farfallaScript = document.createElement('script');
	var farfalla_path = 'http://code.farfalla-project.org/';
	farfallaScript.type = 'text/javascript';
	farfallaScript.src = farfalla_path+'farfalla.js';
	headID.appendChild(farfallaScript);
}
