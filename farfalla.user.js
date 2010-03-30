// ==UserScript==
// @name           Farfalla
// @namespace      userscripts.org
// @description    Injects Farfalla helper
// @version        0.2
// @include        *
// ==/UserScript==
	

var headID = document.getElementsByTagName("head")[0];         
var farfallaScript = document.createElement('script');
farfallaScript.type = 'text/javascript';
farfallaScript.src = 'http://localhost/farfalla/farfalla.js';
headID.appendChild(farfallaScript);

