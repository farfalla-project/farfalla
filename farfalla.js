/*!
 * Farfalla - A web tool for accessibility - v0.1
 * http://farfalla-project.org.com/
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
 
 
//
// Set the path to main Farfalla scripts from the cookie set at every page load
//

function getFarfallaPath(){
var search = 'farfalla_path=';
if (document.cookie.length > 0) {
	offset = document.cookie.indexOf(search);
	if (offset != -1) {
		offset += search.length;
		end = document.cookie.indexOf(";", offset);
		if (end == -1){
			end = document.cookie.length;
			}
			return unescape(document.cookie.substring(offset, end))
		}
	}
}

var farfalla_path = getFarfallaPath();


//
// Call the basically required scripts...
//

var headID = document.getElementsByTagName("head")[0];         

var jqueryScript = document.createElement('script');
jqueryScript.type = 'text/javascript';
jqueryScript.src = farfalla_path+'jquery-1.4.2.min.js';
headID.appendChild(jqueryScript);

var jqueryuiScript = document.createElement('script');
jqueryuiScript.type = 'text/javascript';
jqueryuiScript.src = farfalla_path+'jquery-ui-1.7.2.custom.min.js';
headID.appendChild(jqueryuiScript);

var fmainScript = document.createElement('script');
fmainScript.type = 'text/javascript';
fmainScript.src = farfalla_path+'main.js';
headID.appendChild(fmainScript);
