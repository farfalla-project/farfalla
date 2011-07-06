<?php

class Profile extends AppModel {

	var $name = 'Profile';
	var $actsAs = array(
		'Translate' => array(
			'name'
		)
	);
	// Use a different model (and table)
	var $translateModel = 'ProfileI18n';}

?>