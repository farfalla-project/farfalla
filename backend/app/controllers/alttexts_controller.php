<?php
class AlttextsController extends AppController {

	var $name = 'Alttexts';

	function index() {
		$this->Alttext->recursive = 0;
		$this->set('alttexts', $this->paginate());
	}

	function view($id = null) {
		if (!$id) {
			$this->Session->setFlash(__('Invalid alttext', true));
			$this->redirect(array('action' => 'index'));
		}
		$this->set('alttext', $this->Alttext->read(null, $id));
	}

	function add() {
		if (!empty($this->data)) {
			$this->Alttext->create();
			if ($this->Alttext->save($this->data)) {
				$this->Session->setFlash(__('The alttext has been saved', true));
				$this->redirect(array('action' => 'index'));
			} else {
				$this->Session->setFlash(__('The alttext could not be saved. Please, try again.', true));
			}
		}
		$languages = $this->Alttext->Language->find('list');
		$this->set(compact('languages'));
	}

	function edit($id = null) {
		if (!$id && empty($this->data)) {
			$this->Session->setFlash(__('Invalid alttext', true));
			$this->redirect(array('action' => 'index'));
		}
		if (!empty($this->data)) {
			if ($this->Alttext->save($this->data)) {
				$this->Session->setFlash(__('The alttext has been saved', true));
				$this->redirect(array('action' => 'index'));
			} else {
				$this->Session->setFlash(__('The alttext could not be saved. Please, try again.', true));
			}
		}
		if (empty($this->data)) {
			$this->data = $this->Alttext->read(null, $id);
		}
		$languages = $this->Alttext->Language->find('list');
		$this->set(compact('languages'));
	}

	function delete($id = null) {
		if (!$id) {
			$this->Session->setFlash(__('Invalid id for alttext', true));
			$this->redirect(array('action'=>'index'));
		}
		if ($this->Alttext->delete($id)) {
			$this->Session->setFlash(__('Alttext deleted', true));
			$this->redirect(array('action'=>'index'));
		}
		$this->Session->setFlash(__('Alttext was not deleted', true));
		$this->redirect(array('action' => 'index'));
	}
}
?>