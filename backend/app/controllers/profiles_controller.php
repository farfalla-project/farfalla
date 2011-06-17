<?php
class ProfilesController extends AppController {

	var $helpers = array('Html','Javascript');
	var $name = 'Profiles';
	var $components = array('RequestHandler');

	function beforeFilter() {
	        $this->Auth->allow('menu','retrieve','reset','status');
	}

	function index() {
		$this->Profile->recursive = 0;
//		$this->Profile->bindTranslation(array ('name' => 'nameTranslation'));
		$this->set('profiles', $this->paginate());
	}

	function menu() {
		$this->Session->start();
/*		if($this->Session->read('id')){
			$this->redirect(array('action' => 'retrieve/'.$this->Session->read('id').'/?callback='.$_GET['callback']));
		}
*/
		$this->layout = 'ajax';
		$this->RequestHandler->setContent('json', 'text/x-json');
		$this->set('profiles', $this->Profile->find('list', array('fields' => array('Profile.id', 'Profile.name'))));
	}

	function retrieve($id = null) {
		$this->Session->write('id',$id);
		$this->layout = 'ajax';
	    $this->RequestHandler->setContent('json', 'text/x-json');		
//	    $this->set('callback', $callback);
	    $this->set('profile', $this->Profile->read(null, $id));
	}
	
	function reset() {
		$this->Session->delete('id');
//	    $this->set('callback', $callback);
		$this->layout = 'ajax';
	    $this->RequestHandler->setContent('json', 'text/x-json');		
//		$this->redirect(array('action' => 'menu'));
	}

	function status() {
		$this->layout = 'ajax';
	    $this->RequestHandler->setContent('json', 'text/x-json');		

//		$this->set('id', $this -> Session -> read('id'));
//	    $this->set('callback', $callback);		
	}

	function view($id = null) {
		if (!$id) {
			$this->Session->setFlash(__('Invalid profile', true));
			$this->redirect(array('action' => 'index'));
		}
		$this->set('profile', $this->Profile->read(null, $id));
	}

	function add() {
		if (!empty($this->data)) {
			$this->Profile->create();
			if ($this->Profile->save($this->data)) {
				$this->Session->setFlash(__('The profile has been saved', true));
				$this->redirect(array('action' => 'index'));
			} else {
				$this->Session->setFlash(__('The profile could not be saved. Please, try again.', true));
			}
		}
		$plugins = $this->Profile->Plugin->find('list');
		$this->set(compact('plugins'));
	}

	function edit($id = null) {
		if (!$id && empty($this->data)) {
			$this->Session->setFlash(__('Invalid profile', true));
			$this->redirect(array('action' => 'index'));
		}
		if (!empty($this->data)) {
			if ($this->Profile->save($this->data)) {
				$this->Session->setFlash(__('The profile has been saved', true));
				$this->redirect(array('action' => 'index'));
			} else {
				$this->Session->setFlash(__('The profile could not be saved. Please, try again.', true));
			}
		}
		if (empty($this->data)) {
			$this->data = $this->Profile->read(null, $id);
		}
		$plugins = $this->Profile->Plugin->find('list');
		$this->set(compact('plugins'));
	}


	function copy($id = null) {
		if (!$id && empty($this->data)) {
			$this->Session->setFlash(__('Invalid profile', true));
			$this->redirect(array('action' => 'index'));
		}
		if (!empty($this->data)) {
			$this->Profile->create();
			if ($this->Profile->save($this->data)) {
				$this->Session->setFlash(__('The profile has been saved', true));
				$this->redirect(array('action' => 'index'));
			} else {
				$this->Session->setFlash(__('The profile could not be saved. Please, try again.', true));
			}
		}
		if (empty($this->data)) {
			$this->data = $this->Profile->read(null, $id);
		}
		$plugins = $this->Profile->Plugin->find('list');
		$this->set(compact('plugins'));
	}


	function delete($id = null) {
		if (!$id) {
			$this->Session->setFlash(__('Invalid id for profile', true));
			$this->redirect(array('action'=>'index'));
		}
		if ($this->Profile->delete($id)) {
			$this->Session->setFlash(__('Profile deleted', true));
			$this->redirect(array('action'=>'index'));
		}
		$this->Session->setFlash(__('Profile was not deleted', true));
		$this->redirect(array('action' => 'index'));
	}
	function admin_index() {
		$this->Profile->recursive = 0;
		$this->set('profiles', $this->paginate());
	}

	function admin_view($id = null) {
		if (!$id) {
			$this->Session->setFlash(__('Invalid profile', true));
			$this->redirect(array('action' => 'index'));
		}
		$this->set('profile', $this->Profile->read(null, $id));
	}

	function admin_add() {
		if (!empty($this->data)) {
			$this->Profile->create();
			if ($this->Profile->save($this->data)) {
				$this->Session->setFlash(__('The profile has been saved', true));
				$this->redirect(array('action' => 'index'));
			} else {
				$this->Session->setFlash(__('The profile could not be saved. Please, try again.', true));
			}
		}
		$plugins = $this->Profile->Plugin->find('list');
		$this->set(compact('plugins'));
	}

	function admin_edit($id = null) {
		if (!$id && empty($this->data)) {
			$this->Session->setFlash(__('Invalid profile', true));
			$this->redirect(array('action' => 'index'));
		}
		if (!empty($this->data)) {
			if ($this->Profile->save($this->data)) {
				$this->Session->setFlash(__('The profile has been saved', true));
				$this->redirect(array('action' => 'index'));
			} else {
				$this->Session->setFlash(__('The profile could not be saved. Please, try again.', true));
			}
		}
		if (empty($this->data)) {
			$this->data = $this->Profile->read(null, $id);
		}
		$plugins = $this->Profile->Plugin->find('list');
		$this->set(compact('plugins'));
	}

	function admin_delete($id = null) {
		if (!$id) {
			$this->Session->setFlash(__('Invalid id for profile', true));
			$this->redirect(array('action'=>'index'));
		}
		if ($this->Profile->delete($id)) {
			$this->Session->setFlash(__('Profile deleted', true));
			$this->redirect(array('action'=>'index'));
		}
		$this->Session->setFlash(__('Profile was not deleted', true));
		$this->redirect(array('action' => 'index'));
	}
}
?>
