// Farfalla plugin: Add Alt Attribute



$(function() {


function getXPath( element )
{
    var xpath = '';

    for ( ; element && element.nodeType == 1; element = element.parentNode ){

	    var id = $(element.parentNode).children(element.tagName).index(element) 	+ 1;
    	    // id > 1 ? (id = '[' + id + ']') : (id = '');
		id = id > 1 ? ('[' + id + ']') : '';
    	    xpath = '/' + element.tagName.toLowerCase() + id + xpath;
	    }
    	return xpath;
	}


  $('body').append('<div id="dialog-form" />');

  $('#dialog-form').append('<p>Add an alternative text for the image</p>');
  $('#dialog-form').append('<form></form>');
  $('#dialog-form form').append('<textarea name="farfalla-addalt" style="width:100%" /></textarea>');

  $.each($('img').not('#farfalla_logo img'), function() {
  
  		if($(this).parent()!='a') {

	  		$(this).wrap('<div class="farfalla_addalt ui-corner-all" />'); 

		} else {

			$(this).parent().wrap('<div class="farfalla_addalt ui-corner-all" />'); 

		};
  
  		if($(this).attr('alt')==""){
  
  			$(this).parent('div')
  				.addClass('ui-state-error')
  				.width($(this).width())
  				.append('<div class="addalt_overlay ui-state-error" style="display:none"><p><span class="ui-icon ui-icon-alert" style="float: left; margin-right: .3em;"></span>This image has no alternative text! Click here to add...</p></div>');

  		} else {

  			$(this).parent('div')
  				.width($(this).width())
  				.append('<div class="addalt_overlay" style="display:none"><p>'+$(this).attr('alt')+'</p></div>');  
  
  		}

  	}

  );


	$('.addalt_overlay').click(
  		function(){
  			$('#dialog-form').dialog('open');  
  	});

  $.each($('.farfalla_addalt'), function() {

	$(this).hover(
		function(){
			$(this).children('div').show(300);
		},
		function(){
			$(this).children('div').hide(300);
		});

	});

		$( "#dialog-form" ).dialog({
			autoOpen: false,
			height: 300,
			width: 350,
			modal: true,
			buttons: {
				"Send your proposal": function() {

					var bValid = true;

					allFields.removeClass( "ui-state-error" );

/*
					bValid = bValid && checkLength( name, "username", 3, 16 );
					bValid = bValid && checkLength( email, "email", 6, 80 );
					bValid = bValid && checkLength( password, "password", 5, 16 );
*/

/*
					bValid = bValid && checkRegexp( name, /^[a-z]([0-9a-z_])+$/i, "Username may consist of a-z, 0-9, underscores, begin with a letter." );
					// From jquery.validate.js (by joern), contributed by Scott Gonzalez: http://projects.scottsplayground.com/email_address_validation/
					bValid = bValid && checkRegexp( email, /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i, "eg. ui@jquery.com" );
					bValid = bValid && checkRegexp( password, /^([0-9a-zA-Z])+$/, "Password field only allow : a-z 0-9" );
*/


					if ( bValid ) {
						$( "#users tbody" ).append( "<tr>" +
							"<td>" + name.val() + "</td>" +
							"<td>" + email.val() + "</td>" +
							"<td>" + password.val() + "</td>" +
						"</tr>" );
						$( this ).dialog( "close" );
					}

				},
				Cancel: function() {
					$( this ).dialog( "close" );
				}
			},
			close: function() {
				allFields.val( "" ).removeClass( "ui-state-error" );
			}
		});



});