<?php
App::uses('AppController', 'Controller');
/**
 * Profiles Controller
 *
 * @property Profile $Profile
 */
class ProfilesController extends AppController {

	public $helpers = array('Html','Js');

	public function beforeFilter() {
        $this->Auth->allow('menu','retrieve','reset','status','top','show');
	}

/**
 * index method
 *
 * @return void
 */
	public function index() {
		$this->Profile->recursive = 0;
		$this->set('profiles', $this->paginate());
	}

	public function menu() {
//		$this->Session->start();
		$this->layout = 'ajax';
		$this->RequestHandler->setContent('json', 'text/x-json');
		$this->set('profiles', $this->Profile->find('all', array('fields' => array('Profile.id', 'Profile.name'))));
	}

	public function retrieve($id = null) {
		$this->Session->write('id',$id);
		$this->layout = 'ajax';
	    $this->RequestHandler->setContent('json', 'text/x-json');
	    $this->set('profile', $this->Profile->read(null, $id));
	}

	public function top($distance = null) {
		$this->Session->write('top',$distance);
		$this->layout = 'ajax';
	    $this->RequestHandler->setContent('json', 'text/x-json');
	}

	public function show($show = null) {
		$this->Session->write('show',$show);
		$this->layout = 'ajax';
	    $this->RequestHandler->setContent('json', 'text/x-json');
	}

	public function reset() {
		$this->Session->delete('id');
		$this->layout = 'ajax';
	    $this->RequestHandler->setContent('json', 'text/x-json');
	}

	public function status() {
		$this->layout = 'ajax';
	    $this->RequestHandler->setContent('json', 'text/x-json');
	}

/**
 * view method
 *
 * @throws NotFoundException
 * @param string $id
 * @return void
 */
	public function view($id = null) {
		if (!$this->Profile->exists($id)) {
			throw new NotFoundException(__('Invalid profile'));
		}
		$options = array('conditions' => array('Profile.' . $this->Profile->primaryKey => $id));
		$this->set('profile', $this->Profile->find('first', $options));
	}

/**
 * add method
 *
 * @return void
 */
	public function add() {
		if ($this->request->is('post')) {
			$this->Profile->create();
			if ($this->Profile->save($this->request->data)) {
				$this->Session->setFlash(__('The profile has been saved'));
				$this->redirect(array('action' => 'index'));
			} else {
				$this->Session->setFlash(__('The profile could not be saved. Please, try again.'));
			}
		}
		$plugins = $this->Profile->Plugin->find('list');
		$this->set(compact('plugins'));
	}

/**
 * edit method
 *
 * @throws NotFoundException
 * @param string $id
 * @return void
 */
	public function edit($id = null) {
		if (!$this->Profile->exists($id)) {
			throw new NotFoundException(__('Invalid profile'));
		}
		if ($this->request->is('post') || $this->request->is('put')) {
			if ($this->Profile->save($this->request->data)) {
				$this->Session->setFlash(__('The profile has been saved'));
				$this->redirect(array('action' => 'index'));
			} else {
				$this->Session->setFlash(__('The profile could not be saved. Please, try again.'));
			}
		} else {
			$options = array('conditions' => array('Profile.' . $this->Profile->primaryKey => $id));
			$this->request->data = $this->Profile->find('first', $options);
		}
		$plugins = $this->Profile->Plugin->find('list');
		$this->set(compact('plugins'));
	}

/**
 * delete method
 *
 * @throws NotFoundException
 * @throws MethodNotAllowedException
 * @param string $id
 * @return void
 */
	public function delete($id = null) {
		$this->Profile->id = $id;
		if (!$this->Profile->exists()) {
			throw new NotFoundException(__('Invalid profile'));
		}
		$this->request->onlyAllow('post', 'delete');
		if ($this->Profile->delete()) {
			$this->Session->setFlash(__('Profile deleted'));
			$this->redirect(array('action' => 'index'));
		}
		$this->Session->setFlash(__('Profile was not deleted'));
		$this->redirect(array('action' => 'index'));
	}
}
