// Farfalla plugin: Text to Speech. Allows rapid text to speech translation.
// Requires jplayer and at least one plugin producing text strings in the #monitor div

$(function() {



  jQuery.getScript(farfalla_path+'plugins/jplayer/jplayer.farfalla.js', function(){

    $('#farfalla_jplayer').jPlayer({
      swfPath: "./",
      supplied: "wav"
    });

	
   $('#farfalla_buttons').farfalla_add_button('say this', 'say_this', 's', function(){
	console.log('Sound should be played now...');
	$.get('http://localhost/pvox.php?string='+$('#monitor').html(), function(data) {
        console.log(data);
      });

//	$.load("http://localhost/pvox.php?string="+$('#monitor').html());

     $('#farfalla_jplayer').jPlayer("setMedia", {
	    wav: ""
     }).jPlayer("play");
    return false;
   });

  });




});