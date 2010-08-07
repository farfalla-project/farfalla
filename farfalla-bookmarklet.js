javascript:(function(){
var headID = document.getElementsByTagName("head")[0];         
var farfallaScript = document.createElement('script');
var jquerypostmessageScript = document.createElement('script');
var randomnumber = Math.random();
farfallaScript.type = 'text/javascript';
farfallaScript.src = 'http://www.farfalla-project.org/code/farfalla.js?updated='+randomnumber;
farfallaScript.onLoad = 'this.document.ready()';
jquerypostmessageScript.type = 'text/javascript';
jquerypostmessageScript.src = 'http://www.farfalla-project.org/code/postmessage.js?updated='+randomnumber;
jquerypostmessageScript.onLoad = 'this.document.ready()';
headID.appendChild(jquerypostmessageScript);
headID.appendChild(farfallaScript);})()