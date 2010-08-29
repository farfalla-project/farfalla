<?php


if($_GET['profile']=='1'){
	echo ($_GET['callback'] .'({
		"plugins" : [
			{
				"name" : "keyboard",
				"options" : { "layout" : "qwerty" }
			}
		]
	});');
}

if($_GET['profile']=='2'){
	echo ($_GET['callback'] .'({
		"plugins" : [
			{
				"name" : "magnifier",
				"options" : {"ratio" : "2x"}
			}
		]
	});');
}

if($_GET['profile']=='All'){
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