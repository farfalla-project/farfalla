// Farfalla plugin: Dasher. Includes a Java applet from the Dasher project.
//Dasher allows to write through the use of mouse and avoiding the usage of a keyboard.
// See http://www.inference.phy.cam.ac.uk/dasher/ for info about what is dasher and how it works.


var dasherApplet = $('<applet />');	

	dasherApplet.attr({
		'height':'100%',
		'width':'100%',
		'archive':farfalla_path+'plugins/dasher/Dasher.jar',
		'code':'dasher/applet/JDasherApplet.class'
	});

var dasherDiv = $('<div id="farfalla_dasher"></div>');

	dasherDiv.css({
		'position':'absolute',
		'top':0,
		'left':0,
		'height':'90%',
		'width':'100%'
	});

	dasherApplet.appendTo(dasherDiv);
	dasherDiv.appendTo('body').hide();

jQuery.fn.dasher = function(){

	dasherDiv.toggle();

};	


$('textarea, input').click(function() {
	$(this).dasher();
});	