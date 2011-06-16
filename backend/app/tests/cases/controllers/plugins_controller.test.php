<?php

Warning: date(): It is not safe to rely on the system's timezone settings. You are *required* to use the date.timezone setting or the date_default_timezone_set() function. In case you used any of those methods and you are still getting this warning, you most likely misspelled the timezone identifier. We selected 'Europe/Berlin' for 'CEST/2.0/DST' instead in /Library/WebServer/Documents/farfalla/profiles/cake/console/templates/default/classes/test.ctp on line 22
/* Plugins Test cases generated on: 2010-08-09 13:08:06 : 1281354186*/
App::import('Controller', 'Plugins');

class TestPluginsController extends PluginsController {
	var $autoRender = false;

	function redirect($url, $status = null, $exit = true) {
		$this->redirectUrl = $url;
	}
}

class PluginsControllerTestCase extends CakeTestCase {
	var $fixtures = array('app.plugin', 'app.profile', 'app.profiles_plugin');

	function startTest() {
		$this->Plugins =& new TestPluginsController();
		$this->Plugins->constructClasses();
	}

	function endTest() {
		unset($this->Plugins);
		ClassRegistry::flush();
	}

	function testIndex() {

	}

	function testView() {

	}

	function testAdd() {

	}

	function testEdit() {

	}

	function testDelete() {

	}

	function testAdminIndex() {

	}

	function testAdminView() {

	}

	function testAdminAdd() {

	}

	function testAdminEdit() {

	}

	function testAdminDelete() {

	}

}
?>