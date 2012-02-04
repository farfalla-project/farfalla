// ==UserScript==
// @name           Farfalla
// @namespace      userscripts.org
// @description    Injects Farfalla helper
// @version        0.3.3.1
// @match          http://*/*
// @exclude_match  http://*.facebook.com/*
// @permissions    http://*/
// @include        *
// @exclude        http://*.facebook.com/*
//
// Farfalla - Accessibility in the Cloud
// http://farfalla-project.org/
//
// Copyright 2010, Andrea Mangiatordi
// Licensed under the AGPL Version 3 license.
// http://farfalla-project.org/license
//
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
	var farfalla_path = 'http://farfalla-project.org/code/';
	farfallaScript.type = 'text/javascript';
	farfallaScript.src = farfalla_path+'farfalla.js';
	headID.appendChild(farfallaScript);
}