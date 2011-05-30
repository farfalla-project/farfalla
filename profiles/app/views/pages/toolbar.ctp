<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<head>
	
	<link type="text/css" rel="stylesheet" href="../../../farfalla.css" />
	<script type="text/javascript" src="../../../jquery-1.4.2.min.js"></script>
	<script type="text/javascript" src="../../../postmessage.js"></script>
	<script type="text/javascript" src="../../../jquery.cookie.js"></script>
	<script type="text/javascript" src="../../../jquery.jsoncookie.js"></script>
    <script type="text/javascript" src="../../../postmessage.js"></script>
	
	<script type="text/javascript">
	
	$(function(){


		
		pm({
			target: window.parent,
			type: "pass-cookie", 
			data: $.JSONCookie('farfalla_plugins_cookie')
			});

			$('<ul>').appendTo('#farfalla_active').hide();			

			$.each($.JSONCookie('farfalla_plugins_cookie').Plugin, function(i,plugin){
				$('#farfalla_active ul').prepend('<li>'+plugin.name+'</li>');					
			});


//			$('#farfalla_active ul').show();
//			$('#farfalla_active ul').append('');					
			$('#change_profile').click(
				function(){
					$.cookie('farfalla_plugins_cookie', null, { path: '/' }); 
					window.location = 'form';
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
		
	#farfalla_active{
			margin: 3px;
	}

	</style>

</head>
	<body>
		
		<div id="farfalla_active">
		
			<p><?php __('Loaded plugin(s): ', false) ?></p>
        
	        <ul>
				<li>
					<input type="button" id="change_profile" value="<?php __('change profile', false); ?>" />
				</li>
			</ul>			
			
		</div>


	</body>
</html>