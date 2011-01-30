// Farfalla plugin: Text to Speech. Allows rapid text to speech translation. 
// Requires jplayer and at least one plugin producing text strings in the #monitor div

$(function() {

  $('<div id="farfalla_jplayer">').prependTo('body');

  $('#farfalla_buttons').farfalla_add_button('say this','say_this',function(){

    $('#farfalla_jplayer').jPlayer({
      ready: function () {
        $(this).jPlayer("setMedia", {
	      mp3: "http://speech.jtalkplugin.com/api/?speech="+$('#monitor').html()
        }).jPlayer("play");
      },
      swfPath: "./",
      supplied: "mp3"
    });
//  alert($('#monitor').html());
  return false;
  });

});