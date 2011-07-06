// ==UserScript==
// @name           Farfalla
// @namespace      userscripts.org
// @description    Injects Farfalla helper
// @version        0.1
// @include        *
// ==/UserScript==


var headID = document.getElementsByTagName("head")[0];
var farfallaScript = document.createElement('script');
// var randomnumber = Math.random();
var farfalla_path = 'http://code.farfalla-project.org/'

farfallaScript.type = 'text/javascript';
farfallaScript.src =
farfalla_path+'farfalla.js';

headID.appendChild(farfallaScript);

var todayDate = largeExpDate = new Date ();
largeExpDate.setTime(todayDate.getTime() + 365 * 24 * 3600 * 1000);
document.cookie = 'farfalla_path='+
farfalla_path+'; expires=' + largeExpDate.toGMTString();

