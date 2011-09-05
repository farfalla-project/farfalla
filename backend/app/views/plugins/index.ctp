<div class="plugins index">
	<h2><?php __('Plugins');?></h2>
	<table cellpadding="0" cellspacing="0">
	<tr>
			<th><?php echo $this->Paginator->sort('name');?></th>
			<th><?php echo $this->Paginator->sort('description');?></th>
			<th class="actions"><?php __('Actions');?></th>
	</tr>
	<?php
	$i = 0;
	foreach ($plugins as $plugin):
		$class = null;
		if ($i++ % 2 == 0) {
			$class = ' class="altrow"';
		}
	?>
	<tr<?php echo $class;?>>
		<td><strong><?php echo $plugin['Plugin']['name']; ?></strong>&nbsp;</td>
		<td><?php echo $plugin['Plugin']['description']; ?>&nbsp;</td>
		<td class="actions">
			<?php echo $this->Html->link(__('View', true), array('action' => 'view', $plugin['Plugin']['id'])); ?>
			<?php echo $this->Html->link(__('Edit', true), array('action' => 'edit', $plugin['Plugin']['id'])); ?>
			<?php echo $this->Html->link(__('Delete', true), array('action' => 'delete', $plugin['Plugin']['id']), null, sprintf(__('Are you sure you want to delete # %s?', true), $plugin['Plugin']['id'])); ?>
		</td>
	</tr>
<?php endforeach; ?>
	</table>
	<p>
	<?php
	echo $this->Paginator->counter(array(
	'format' => __('Page %page% of %pages%, showing %current% records out of %count% total, starting on record %start%, ending on %end%', true)
	));
	?>	</p>

	<div class="paging">
		<?php echo $this->Paginator->prev('<< ' . __('previous', true), array(), null, array('class'=>'disabled'));?>
	 | 	<?php echo $this->Paginator->numbers();?>
 |
		<?php echo $this->Paginator->next(__('next', true) . ' >>', array(), null, array('class' => 'disabled'));?>
	</div>
</div>
<div class="actions">
	<h3><?php __('Actions'); ?></h3>
	<ul>
		<li><?php echo $this->Html->link(__('New Plugin', true), array('action' => 'add')); ?></li>
		<li><?php echo $this->Html->link(__('List Profiles', true), array('controller' => 'profiles', 'action' => 'index')); ?> </li>
		<li><?php echo $this->Html->link(__('New Profile', true), array('controller' => 'profiles', 'action' => 'add')); ?> </li>
	</ul>
</div>