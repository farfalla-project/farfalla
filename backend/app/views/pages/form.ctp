<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<head>

	<script type="text/javascript" src="../../../jquery-1.4.2.min.js"></script>
	<script type="text/javascript" src="../../../json2.js"></script>
	<script type="text/javascript" src="../../../jquery.cookie.js"></script>
	<script type="text/javascript" src="../../../jquery.jsoncookie.js"></script>
	<script type="text/javascript" src="../../../postmessage.js"></script>
	<script type="text/javascript">


	$(function(){

	function getFarfallaPath(){
		var search = 'farfalla_path=';
		if (document.cookie.length > 0) {
			offset = document.cookie.indexOf(search);
			if (offset != -1) {
				offset += search.length;
				end = document.cookie.indexOf(";", offset);
				if (end == -1){
					end = document.cookie.length;
				}
				return unescape(document.cookie.substring(offset, end))
			}
		}
	}

	//var farfalla_path = 'http://localhost/farfalla/';
	var farfalla_path = getFarfallaPath();

	$('#farfalla_toolbar_form').hide();

	// check if a configuration has already been chosen

		if($.cookie('farfalla_plugins_cookie')){
			window.location = farfalla_path+'profiles/index.php/pages/toolbar?update='+Math.random();
		} else {

	// if not, retrieve the available profiles

		$.getJSON(
			"profiles/index.php/profiles/menu/?callback=?",
			{},
			function(data) {
				$.each(data, function(value, name){
					$('<option>').attr('value', value).text(name).appendTo('#farfalla_profile');
				});
				$('#farfalla_toolbar_form').show();
			}
			);
		};



		// Recall user's configuration from central db

	$("#farfalla_activator").click(function() {

			var farfalla_profile = $('#farfalla_profile').val();


			$.getJSON(
				"profiles/index.php/profiles/retrieve/"+farfalla_profile+"/?callback=?", {},

// Recall the plugins

				function(data) {

					$.cookie('farfalla_plugins_cookie', JSON.stringify(data), { path: '/', expires: 10 });

					$('#farfalla_toolbar_form').fadeOut(1000);
					pm({
						target: window.parent,
						type: "force-reload"
					});
				}
			);



			// stop the call to the form "action"
			return false;

	});



	});

	</script>

	<style type="text/css" rel="stylesheet">
		body{

			background-image: url('../../../images/farfalla-toolbar-background.jpg');
			background-color: #000;

			font-family: Helvetica, Calibri, sans;
			font-size: 12pt;
			color: #fff;
		}

		#farfalla_toolbar_form{
			margin: 3px;
		}

	</style>
</head>
	<body>
		<form id="farfalla_toolbar_form" action="#">
		<select id="farfalla_profile" name="farfalla_profile">
			<option class="choose"><?php __('Choose your profile...',false); ?></option>
			<!-- Don't look for profiles here, they are loaded dynamically! -->
		</select>
		<input type="submit" id="farfalla_activator" value="<?php __('get preferences',false); ?>" />
		</form>
	</body>
</html>
