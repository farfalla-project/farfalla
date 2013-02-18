<?php
App::uses('AppModel', 'Model');
/**
 * I18n Model
 *
 */
class I18n extends AppModel {

/**
 * Use table
 *
 * @var mixed False or table name
 */
	public $useTable = 'i18n';

/**
 * Display field
 *
 * @var string
 */
	public $displayField = 'locale';

}
