<h2>Farfalla control panel</h2>

<p>Here you can create your own profile, taking inspiration from an existing one or starting from scratch!</p>

<h3>Template profiles</h3>

<p>
	<?php echo $this->Html->link(__('Read a short description of the existing profiles.', true), array('controller' => 'profiles', 'action' => 'index')); ?>
</p>

<h3>Create your profile</h3>
<p>
	<?php echo $this->Html->link(__('Access the profile creation page.', true), array('controller' => 'profiles', 'action' => 'add')); ?>
</p>