// ==UserScript==
// @name           Farfalla
// @namespace      userscripts.org
// @description    Injects Farfalla helper
// @version        0.2
// @include        *
// ==/UserScript==
	
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
	var farfalla_path = 'http://code.farfalla-project.org/'
	farfallaScript.type = 'text/javascript';
	farfallaScript.src = farfalla_path+'farfalla.js';
	headID.appendChild(farfallaScript);
};