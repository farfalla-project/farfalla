<?php
class PluginsController extends AppController {

	var $helpers = array('Html','Javascript');
	var $name = 'Plugins';
	var $components = array('RequestHandler');

	function beforeFilter() {
	        $this->Auth->allow('set_option','get_option','menu');
	}

	function index() {
		$this->Plugin->recursive = 0;
		$this->set('plugins', $this->paginate());
	}

	function menu() {
		$this->Session->start();
		$this->layout = 'ajax';
		$this->RequestHandler->setContent('json', 'text/x-json');
		$this->set('plugins', $this->Plugin->find('all', array('fields' => array('Plugin.id', 'Plugin.name'), 'recursive' => 0)));
	}

	function view($id = null) {
		if (!$id) {
			$this->Session->setFlash(__('Invalid plugin', true));
			$this->redirect(array('action' => 'index'));
		}
		$this->set('plugin', $this->Plugin->read(null, $id));
	}

	function add() {
		if (!empty($this->data)) {
			$this->Plugin->create();
			if ($this->Plugin->save($this->data)) {
				$this->Session->setFlash(__('The plugin has been saved', true));
				$this->redirect(array('action' => 'index'));
			} else {
				$this->Session->setFlash(__('The plugin could not be saved. Please, try again.', true));
			}
		}
		$profiles = $this->Plugin->Profile->find('list');
		$this->set(compact('profiles'));
		$groups = $this->Plugin->Group->find('list');
		$this->set(compact('groups'));
	}

	function edit($id = null) {
		if (!$id && empty($this->data)) {
			$this->Session->setFlash(__('Invalid plugin', true));
			$this->redirect(array('action' => 'index'));
		}
		if (!empty($this->data)) {
			if ($this->Plugin->save($this->data)) {
				$this->Session->setFlash(__('The plugin has been saved', true));
				$this->redirect(array('action' => 'index'));
			} else {
				$this->Session->setFlash(__('The plugin could not be saved. Please, try again.', true));
			}
		}
		if (empty($this->data)) {
			$this->data = $this->Plugin->read(null, $id);
		}
		$profiles = $this->Plugin->Profile->find('list');
		$this->set(compact('profiles'));
		$groups = $this->Plugin->Group->find('list');
		$this->set(compact('groups'));
	}

	function delete($id = null) {
		if (!$id) {
			$this->Session->setFlash(__('Invalid id for plugin', true));
			$this->redirect(array('action'=>'index'));
		}
		if ($this->Plugin->delete($id)) {
			$this->Session->setFlash(__('Plugin deleted', true));
			$this->redirect(array('action'=>'index'));
		}
		$this->Session->setFlash(__('Plugin was not deleted', true));
		$this->redirect(array('action' => 'index'));
	}
	function admin_index() {
		$this->Plugin->recursive = 0;
		$this->set('plugins', $this->paginate());
	}

	function admin_view($id = null) {
		if (!$id) {
			$this->Session->setFlash(__('Invalid plugin', true));
			$this->redirect(array('action' => 'index'));
		}
		$this->set('plugin', $this->Plugin->read(null, $id));
	}

	function admin_add() {
		if (!empty($this->data)) {
			$this->Plugin->create();
			if ($this->Plugin->save($this->data)) {
				$this->Session->setFlash(__('The plugin has been saved', true));
				$this->redirect(array('action' => 'index'));
			} else {
				$this->Session->setFlash(__('The plugin could not be saved. Please, try again.', true));
			}
		}
		$profiles = $this->Plugin->Profile->find('list');
		$this->set(compact('profiles'));
	}

	function admin_edit($id = null) {
		if (!$id && empty($this->data)) {
			$this->Session->setFlash(__('Invalid plugin', true));
			$this->redirect(array('action' => 'index'));
		}
		if (!empty($this->data)) {
			if ($this->Plugin->save($this->data)) {
				$this->Session->setFlash(__('The plugin has been saved', true));
				$this->redirect(array('action' => 'index'));
			} else {
				$this->Session->setFlash(__('The plugin could not be saved. Please, try again.', true));
			}
		}
		if (empty($this->data)) {
			$this->data = $this->Plugin->read(null, $id);
		}
		$profiles = $this->Plugin->Profile->find('list');
		$this->set(compact('profiles'));
	}

	function admin_delete($id = null) {
		if (!$id) {
			$this->Session->setFlash(__('Invalid id for plugin', true));
			$this->redirect(array('action'=>'index'));
		}
		if ($this->Plugin->delete($id)) {
			$this->Session->setFlash(__('Plugin deleted', true));
			$this->redirect(array('action'=>'index'));
		}
		$this->Session->setFlash(__('Plugin was not deleted', true));
		$this->redirect(array('action' => 'index'));
	}
	
	function get_option($option = null) {
		$key = $option;
		$value = $this->Session->read($option);
		$this->layout = 'ajax';
	    $this->RequestHandler->setContent('json', 'text/x-json');
		$this->set(compact('key'));
		$this->set(compact('value'));
	}

	function set_option($key = null, $value = null) {
		$this->Session->write($key,$value);
		$this->layout = 'ajax';
	    $this->RequestHandler->setContent('json', 'text/x-json');
	}

}
?>