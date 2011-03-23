<?php
class Profile extends AppModel {
	var $name = 'Profile';
	var $displayField = 'name';
	
	var $actsAs = array('Copyable' => array('stripFields' => array('id', 'created', 'modified', 'name')));


	//The Associations below have been created with all possible keys, those that are not needed can be removed

	var $hasAndBelongsToMany = array(
		'Plugin' => array(
			'className' => 'Plugin',
			'joinTable' => 'profiles_plugins',
			'foreignKey' => 'profile_id',
			'associationForeignKey' => 'plugin_id',
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