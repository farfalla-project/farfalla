<?php
App::uses('AppController', 'Controller');
/**
 * Plugins Controller
 *
 * @property Plugin $Plugin
 */
class PluginsController extends AppController {

/**
 * index method
 *
 * @return void
 */
	public function index() {
		$this->Plugin->recursive = 0;
		$this->set('plugins', $this->paginate());
	}
	
	public 	function beforeFilter() {
        $this->Auth->allow('set_option','get_option','menu');
	}


/**
 * view method
 *
 * @throws NotFoundException
 * @param string $id
 * @return void
 */
	public function view($id = null) {
		if (!$this->Plugin->exists($id)) {
			throw new NotFoundException(__('Invalid plugin'));
		}
		$options = array('conditions' => array('Plugin.' . $this->Plugin->primaryKey => $id));
		$this->set('plugin', $this->Plugin->find('first', $options));
	}

/**
 * menu method
 *
 * @return void
 */

	public function menu() {
		$this->layout = 'ajax';
		$this->RequestHandler->setContent('json', 'text/x-json');
		$this->set('plugins', $this->Plugin->find('all', array('fields' => array('Plugin.id', 'Plugin.name', 'Plugin.visible'), 'recursive' => 0)));
	}


/**
 * add method
 *
 * @return void
 */
	public function add() {
		if ($this->request->is('post')) {
			$this->Plugin->create();
			if ($this->Plugin->save($this->request->data)) {
				$this->Session->setFlash(__('The plugin has been saved'));
				$this->redirect(array('action' => 'index'));
			} else {
				$this->Session->setFlash(__('The plugin could not be saved. Please, try again.'));
			}
		}
		$groups = $this->Plugin->Group->find('list');
		$this->set(compact('groups'));
	}

/**
 * edit method
 *
 * @throws NotFoundException
 * @param string $id
 * @return void
 */
	public function edit($id = null) {
		if (!$this->Plugin->exists($id)) {
			throw new NotFoundException(__('Invalid plugin'));
		}
		if ($this->request->is('post') || $this->request->is('put')) {
			if ($this->Plugin->save($this->request->data)) {
				$this->Session->setFlash(__('The plugin has been saved'));
				$this->redirect(array('action' => 'index'));
			} else {
				$this->Session->setFlash(__('The plugin could not be saved. Please, try again.'));
			}
		} else {
			$options = array('conditions' => array('Plugin.' . $this->Plugin->primaryKey => $id));
			$this->request->data = $this->Plugin->find('first', $options);
		}
		$groups = $this->Plugin->Group->find('list');
		$this->set(compact('groups'));
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
		$this->Plugin->id = $id;
		if (!$this->Plugin->exists()) {
			throw new NotFoundException(__('Invalid plugin'));
		}
		$this->request->onlyAllow('post', 'delete');
		if ($this->Plugin->delete()) {
			$this->Session->setFlash(__('Plugin deleted'));
			$this->redirect(array('action' => 'index'));
		}
		$this->Session->setFlash(__('Plugin was not deleted'));
		$this->redirect(array('action' => 'index'));
	}
	
	public function get_option($option = null) {
		$key = $option;
		$value = $this->Session->read($option);
		$this->layout = 'ajax';
	    $this->RequestHandler->setContent('json', 'text/x-json');
		$this->set(compact('key'));
		$this->set(compact('value'));
	}

	public function set_option($key = null, $value = null) {
		$this->Session->write($key,$value);
		$this->layout = 'ajax';
	    $this->RequestHandler->setContent('json', 'text/x-json');
	}

}
