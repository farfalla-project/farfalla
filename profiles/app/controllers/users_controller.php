<?php
class UsersController extends AppController {

    var $name = 'Users';    
//    var $components = array('Auth'); // Not necessary if declared in your app controller

	
	function beforeFilter() {
	        $this->Auth->allow('register');
	}


    function login() {
    }

    function logout() {
        $this->redirect($this->Auth->logout());
    }
    
 	function register() {
    	if ($this->data) {
        	if ($this->data['User']['password'] == $this->Auth->password($this->data['User']['password_confirm'])) {
            	$this->User->create();
	            $this->User->save($this->data);
				$this->Session->setFlash(__('The new user has been created. You can now login.', true));
				$this->redirect(array('action' => 'login'));
    	    }
    	}
	}
}

?>
