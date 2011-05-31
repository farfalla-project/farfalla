// Farfalla plugin: Text to Speech. Allows rapid text to speech translation. 
// Requires jplayer and at least one plugin producing text strings in the #monitor div

$(function() {



  jQuery.getScript(farfalla_path+'plugins/jplayer/jplayer.farfalla.js', function(){

    $('#farfalla_jplayer').jPlayer({
      swfPath: "./",
      supplied: "mp3"
    });

   $('#farfalla_buttons').farfalla_add_button('say this', 'say_this', function(){
     $('#farfalla_jplayer').jPlayer("setMedia", {
	    mp3: "http://speech.jtalkplugin.com/api/?speech="+$('#monitor').html()
     }).jPlayer("play");
    return false;
   });
  
  
  });





        

});