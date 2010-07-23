// ==UserScript==
// @name           Farfalla
// @namespace      userscripts.org
// @description    Injects Farfalla helper
// @version        0.1
// @include        *
// ==/UserScript==
	

var headID = document.getElementsByTagName("head")[0];         
var farfallaScript = document.createElement('script');
var randomnumber = Math.random();

farfallaScript.type = 'text/javascript';
farfallaScript.src = 'http://localhost/farfalla/farfalla.js?updated='+randomnumber;

headID.appendChild(farfallaScript);

