<div class="languages index">
	<h2><?php __('Languages');?></h2>
	<table cellpadding="0" cellspacing="0">
	<tr>
			<th><?php echo $this->Paginator->sort('id');?></th>
			<th><?php echo $this->Paginator->sort('name');?></th>
			<th class="actions"><?php __('Actions');?></th>
	</tr>
	<?php
	$i = 0;
	foreach ($languages as $language):
		$class = null;
		if ($i++ % 2 == 0) {
			$class = ' class="altrow"';
		}
	?>
	<tr<?php echo $class;?>>
		<td><?php echo $language['Language']['id']; ?>&nbsp;</td>
		<td><?php echo $language['Language']['name']; ?>&nbsp;</td>
		<td class="actions">
			<?php echo $this->Html->link(__('View', true), array('action' => 'view', $language['Language']['id'])); ?>
			<?php echo $this->Html->link(__('Edit', true), array('action' => 'edit', $language['Language']['id'])); ?>
			<?php echo $this->Html->link(__('Delete', true), array('action' => 'delete', $language['Language']['id']), null, sprintf(__('Are you sure you want to delete # %s?', true), $language['Language']['id'])); ?>
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
		<li><?php echo $this->Html->link(__('New Language', true), array('action' => 'add')); ?></li>
		<li><?php echo $this->Html->link(__('List Alttexts', true), array('controller' => 'alttexts', 'action' => 'index')); ?> </li>
		<li><?php echo $this->Html->link(__('New Alttext', true), array('controller' => 'alttexts', 'action' => 'add')); ?> </li>
	</ul>
</div>