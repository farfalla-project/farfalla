// ==UserScript==
// @name           Farfalla
// @namespace      userscripts.org
// @description    Injects Farfalla helper
// @version        0.1
// @include        *
// ==/UserScript==
	

var headID = document.getElementsByTagName("head")[0];         
var farfallaCss = document.createElement('link');
var jqueryScript = document.createElement('script');
var jqueryuiScript = document.createElement('script');
var jokScript = document.createElement('script');
var farfallaScript = document.createElement('script');
farfallaCss.type = 'text/css';
farfallaCss.rel = 'stylesheet';
farfallaCss.href = 'http://localhost/farfalla/farfalla.css';
jqueryScript.type = 'text/javascript';
jqueryScript.src = 'http://localhost/farfalla/jquery-1.3.2.min.js';
jqueryuiScript.type = 'text/javascript';
jqueryuiScript.src = 'http://localhost/farfalla/jquery-ui-1.7.2.custom.min.js';
jokScript.type = 'text/javascript';
jokScript.src = 'http://localhost/farfalla/jquery.keyboard.js';
farfallaScript.type = 'text/javascript';
farfallaScript.src = 'http://localhost/farfalla/farfalla.js';
headID.appendChild(farfallaCss);
headID.appendChild(jqueryScript);
headID.appendChild(jqueryuiScript);
headID.appendChild(jokScript);
headID.appendChild(farfallaScript);
