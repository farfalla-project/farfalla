<?php
class Plugin extends AppModel {
	var $name = 'Plugin';
	var $displayField = 'name';
	
	var $actAs = 'Copyable';
	//The Associations below have been created with all possible keys, those that are not needed can be removed

	var $hasAndBelongsToMany = array(
		'Profile' => array(
			'className' => 'Profile',
			'joinTable' => 'profiles_plugins',
			'foreignKey' => 'plugin_id',
			'associationForeignKey' => 'profile_id',
			'unique' => true,
			'conditions' => '',
			'fields' => '',
			'order' => '',
			'limit' => '',
			'offset' => '',
			'finderQuery' => '',
			'deleteQuery' => '',
			'insertQuery' => ''
		)
	);

}
?>