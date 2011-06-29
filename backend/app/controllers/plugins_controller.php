<?php
class PluginsController extends AppController {

	var $name = 'Plugins';

	function index() {
		$this->Plugin->recursive = 0;
		$this->set('plugins', $this->paginate());
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
}
?>