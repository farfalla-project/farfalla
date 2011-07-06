/*!
 * Farfalla - A web tool for accessibility - v0.1
 * http://farfalla-project.org/
 *
 * Copyright 2010, Andrea Mangiatordi
 * Licensed under the AGPL Version 3 license.
 * http://farfalla-project.org/license
 *
 *
 *
 * Includes:
 *
 *   jQuery JavaScript Library
 *   http://jquery.com/
 *   Copyright 2010, John Resig
 *   Dual licensed under the MIT or GPL Version 2 licenses.
 *   http://jquery.org/license
 *
 *   jQuery UI
 *   Copyright (c) 2009 (http://jqueryui.com/about)
 *   Dual licensed under the MIT and GPL licenses.
 *   http://docs.jquery.com/UI
 *
 *   Sizzle.js
 *   http://sizzlejs.com/
 *   Copyright 2010, The Dojo Foundation
 *   Released under the MIT, BSD, and GPL Licenses.
 *
 *
 */

function fgetScriptNodes(s){

	var scripts = window.document.getElementsByTagName('script');

	for (i = 0; i <= scripts.length-1; i++) {
		if(scripts[i].src.indexOf(s) > 0){
			return scripts[i].src
		}
	}

}

function fgetPath(){

	var search = 'farfalla.js';

	var farfalla_script = fgetScriptNodes(search);

	end = farfalla_script.indexOf(search);
	if (end == -1){
		end = farfalla_script.length;
		}
		return unescape(farfalla_script.substring(0, end))
}

var farfalla_path = fgetPath();

//
// Call the basically required scripts...
//

var headID = document.getElementsByTagName("head")[0];

var jqueryScript = document.createElement('script');
jqueryScript.type = 'text/javascript';
jqueryScript.src = farfalla_path+'libs/jquery.min.js';

var jqueryuiScript = document.createElement('script');
jqueryuiScript.type = 'text/javascript';
jqueryuiScript.src = farfalla_path+'libs/jquery-ui.custom.min.js';

var fmainScript = document.createElement('script');
fmainScript.type = 'text/javascript';
fmainScript.src = farfalla_path+'libs/main.js';

headID.appendChild(jqueryScript);
jqueryScript.onload = function () {
	headID.appendChild(jqueryuiScript);
	headID.appendChild(fmainScript);
}