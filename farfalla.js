$(function() {

// Creazione interfaccia accesso alla selezione della configurazione

	$('<div id="farfalla_auth">').addClass('toolbar').prependTo('body').fadeIn(3000);

	$('<form id="farfalla_auth_form" action="#">').prependTo('#farfalla_auth');

	$('<input type="input" id="farfalla_profile">').val('pluto').appendTo('#farfalla_auth_form');

	$('<input type="submit" id="farfalla_activator">').val('get preferences').appendTo('#farfalla_auth_form');


	$('<p id="farfalla_active">').appendTo('#farfalla_auth');

	

// Richiamo delle impostazioni dal db centrale

	$("#farfalla_activator").click(function() {

		$.getJSON(
			"http://localhost/farfalla/json.php?callback=?",
			{
					"profile": $('#farfalla_profile').val()
			},

// Richiamo dei plugin

			function(data) {
				$.each(data.plugins, function(i,plugin){
		     		$('<script type="text/javascript" src="http://localhost/farfalla/plugins/'+plugin.name+'/'+plugin.name+'.farfalla.js">')
					.appendTo('head');
					$("#farfalla_active").append(' | '+plugin.name);
		     	});				
			}
		);

		// impediamo l'invocazione della action del form
		return false;                    
	});





		
});
	
