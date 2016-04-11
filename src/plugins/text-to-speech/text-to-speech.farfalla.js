// Farfalla plugin: Text to Speech. Allows rapid text to speech translation.
// Requires jplayer and at least one plugin producing text strings in the #monitor div

jQuery.noConflict();
(function($) {

 $(function() {



  jQuery.getScript(farfalla_path+'plugins/jplayer/jplayer.farfalla.js', function(){


   $('#farfalla_jplayer').jPlayer({
      swfPath: "./",
      supplied: "wav"
    });


   $('#farfalla_buttons').farfalla_add_button('say_this', 'read', 'say_this', 'r', '#f9fbca', '#000', function(){

    alert($('#monitor').html());
/*	$.get('http://localhost/pvox.php?string='+$('#monitor').html(), function(data) {
        console.log(data);
      });
*/

     $('#farfalla_jplayer').jPlayer("setMedia", {
	    wav: ""
     }).jPlayer("play");
    return false;
   });

  });


 });

})(jQuery);