<?php


if($_GET['profile']=='mouseonly'){
	echo ($_GET['callback'] .'({
		"plugins" : [
			{
				"name" : "keyboard",
				"options" : { "layout" : "qwerty" }
			}
		]
	});');
}


if($_GET['profile']=='all'){
	echo ($_GET['callback'] .'({
		"plugins" : [
			{
				"name" : "keyboard",
				"options" : { "layout" : "qwerty" }
			},
			{
				"name" : "magnifier",
				"options" : {"ratio" : "2x"}
			}
		]
	});');
}


?>