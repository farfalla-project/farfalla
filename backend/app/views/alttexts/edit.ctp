<div class="alttexts form">
<?php echo $this->Form->create('Alttext');?>
	<fieldset>
 		<legend><?php __('Edit Alttext'); ?></legend>
	<?php
		echo $this->Form->input('id');
		echo $this->Form->input('url');
		echo $this->Form->input('text');
		echo $this->Form->input('language_id');
		echo $this->Form->input('xpath');
	?>
	</fieldset>
<?php echo $this->Form->end(__('Submit', true));?>
</div>
<div class="actions">
	<h3><?php __('Actions'); ?></h3>
	<ul>

		<li><?php echo $this->Html->link(__('Delete', true), array('action' => 'delete', $this->Form->value('Alttext.id')), null, sprintf(__('Are you sure you want to delete # %s?', true), $this->Form->value('Alttext.id'))); ?></li>
		<li><?php echo $this->Html->link(__('List Alttexts', true), array('action' => 'index'));?></li>
		<li><?php echo $this->Html->link(__('List Languages', true), array('controller' => 'languages', 'action' => 'index')); ?> </li>
		<li><?php echo $this->Html->link(__('New Language', true), array('controller' => 'languages', 'action' => 'add')); ?> </li>
	</ul>
</div>