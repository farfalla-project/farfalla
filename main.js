
$(function() {
	
	
// Inclusion of the needed css stylesheets

	$('<link>').attr('type','text/css').attr('rel','stylesheet').attr('href',farfalla_path+'jquery-ui-1.7.2.custom.css').prependTo('head');
	$('<link>').attr('type','text/css').attr('rel','stylesheet').attr('href',farfalla_path+'farfalla.css').prependTo('head');

// Farfalla core functions

		// Creates the main toolbar

		function farfalla_toolbar_create() {
			$('<div></div>').attr('id','farfalla_toolbar').addClass('farfalla_toolbar').prependTo('body');
			$('<div></div>').attr('id','farfalla_buttons').appendTo('#farfalla_toolbar');
			$('<ul></ul>').appendTo('#farfalla_buttons');
		};

		// Adds the profile selection form

		function farfalla_selection_create() {		

			$('<div></div>').attr('id','farfalla_selection').prependTo('#farfalla_toolbar');
	
			$('<form></form>').attr({'id':'farfalla_toolbar_form','action':'#','method':'post'}).appendTo('#farfalla_selection');
				$('<select></select>').attr({'id':'farfalla_profile','name':'farfalla_profile'}).appendTo('#farfalla_toolbar_form');
					$('<option></option>').addClass('choose').html('Choose your profile...').appendTo('#farfalla_profile');
				$('<input></input>').attr({'type':'submit','id':'farfalla_activator','value':'get preferences'}).appendTo('#farfalla_toolbar_form');
	
				$.getJSON(
					farfalla_path+"backend/profiles/menu/?callback=?",
					{},
					function(data) {
						$.each(data, function(value, name){
							$('<option>').attr('value', value).text(name).appendTo('#farfalla_profile');
						});
					}
				);
		};

		// Adds the plugins listing area

		function farfalla_plugins_listing_create(id) {		
	
			$('<div></div>').attr('id','farfalla_active').hide().prependTo('#farfalla_toolbar');
				$('<p></p>').appendTo('#farfalla_active');
				$('<ul></ul>').appendTo('#farfalla_active p');
					$('<li></li>').appendTo('#farfalla_active p ul');
						$('<input></input>').attr({'type':'button','id':'farfalla_change_profile','value':'change profile'}).appendTo('#farfalla_active p ul li');
				
							$.getJSON(
								farfalla_path+'backend/profiles/retrieve/'+id+'/?callback=?', 
								{},
								function(data) {
									$.each(data.Plugin, function(i, plugin){
										$('#farfalla_active ul').prepend('<li>'+plugin.name+'</li>');
										$('#farfalla_selection').hide();
										$('#farfalla_active').show();
										jQuery.getScript(farfalla_path+'plugins/'+plugin.name+'/'+plugin.name+'.farfalla.js');
									});
								}
							);
							
		};
			
		// Adds interaction to the activation button in the profile selection form

		function farfalla_selection_interaction() {

			$("#farfalla_activator").click(function() {
	
			var farfalla_profile = $('#farfalla_profile').val();
				
			$.getJSON(
				farfalla_path+"backend/profiles/retrieve/"+$('#farfalla_profile').val()+"/?callback=?", {},

				// Recall the plugins

				function(data) {
					farfalla_plugins_listing_create($('#farfalla_profile').val());
					farfalla_plugins_listing_interaction();
					$('#farfalla_toolbar_form').fadeOut('slow');
					$('#farfalla_active').fadeIn('slow');
				}

			);

			// stop the call to the form "action"
			return false;					

		});
		};

		// Adds interaction to the plugins list: reset the profiles selection
	
		function farfalla_plugins_listing_interaction() {

			$('#farfalla_change_profile').click( function(){
						$('#farfalla_active').fadeOut();
						farfalla_selection_create();
						farfalla_selection_interaction();
//						$('#farfalla_buttons').children().remove();
				$.getJSON(farfalla_path+'backend/profiles/reset/?callback=?', {}, function(){});
			} );
		};
		
		// Checks if a profile has already been selected, then starts what is needed
				
		function farfalla_check_status() {
		
				$.getJSON(
					farfalla_path+"backend/profiles/status/?callback=?",
					{},
					function(data) {
						if(data == 0){
							farfalla_selection_create();
							farfalla_selection_interaction();
						} else {
							farfalla_plugins_listing_create(data);		
							farfalla_plugins_listing_interaction();
						}
					}
				);
		}

// determine wether to add the toolbar or not

	if(window.location.href.search(farfalla_path)=='-1' && window.location.href.search('lisp8.formazione.unimib.it')=='-1'){

		farfalla_toolbar_create();

		farfalla_check_status();

// end "if" to determine wether to add the toolbar or not			
	};
				


/*	
	#######################################
	#                                     #
	#    Reusable functions for plugins   #
	#                                     #	
	#######################################
*/	
	
	// A function for adding buttons to the toolbar
	// name -> text displayed on the button
	// id -> unique identifier for the button: the final id will be something like button_id
	// accesskey -> the value for the accesskey attribute useful for activating the buttons from the keyboard
	// callback -> a function to be triggered by the button

	
	$.fn.farfalla_add_button = function( name, id, accesskey, callback ){
		$('<li></li>').appendTo('#farfalla_buttons ul');
		$('<img></img>')
		  .attr({
		    'src':farfalla_path+'images/'+id+'.jpg',
		    'id':'button_'+id,
		    'alt':name})
		  .appendTo('#farfalla_buttons ul li:last');
		$('#button_'+id).wrap('<a accesskey="'+accesskey+'"></a>');
		$('#button_'+id).parent('a').click(callback);
	};



});
