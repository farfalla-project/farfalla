javascript:(function(){
var headID=document.getElementsByTagName('head')[0];
var farfallaScript=document.createElement('script');
var jquerypostmessageScript=document.createElement('script');
var randomnumber=Math.random();
var farfalla_path='http://code.farfalla-project.org/';
farfallaScript.type='text/javascript';
farfallaScript.src=farfalla_path+'farfalla.js?updated='+randomnumber;
farfallaScript.onLoad='this.document.ready()';
jquerypostmessageScript.type='text/javascript';
jquerypostmessageScript.src=farfalla_path+'postmessage.js?updated='+randomnumber;
jquerypostmessageScript.onLoad='this.document.ready()';
headID.appendChild(jquerypostmessageScript);
headID.appendChild(farfallaScript);
var todayDate=largeExpDate=new Date ();
largeExpDate.setTime(todayDate.getTime()+365*24*3600*1000);
document.cookie='farfalla_path='+
farfalla_path+'; expires='+largeExpDate.toGMTString();})()