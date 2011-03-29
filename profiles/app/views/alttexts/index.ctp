<div class="alttexts index">
	<h2><?php __('Alttexts');?></h2>
	<table cellpadding="0" cellspacing="0">
	<tr>
			<th><?php echo $this->Paginator->sort('id');?></th>
			<th><?php echo $this->Paginator->sort('url');?></th>
			<th><?php echo $this->Paginator->sort('text');?></th>
			<th><?php echo $this->Paginator->sort('language_id');?></th>
			<th><?php echo $this->Paginator->sort('xpath');?></th>
			<th><?php echo $this->Paginator->sort('created');?></th>
			<th><?php echo $this->Paginator->sort('modified');?></th>
			<th class="actions"><?php __('Actions');?></th>
	</tr>
	<?php
	$i = 0;
	foreach ($alttexts as $alttext):
		$class = null;
		if ($i++ % 2 == 0) {
			$class = ' class="altrow"';
		}
	?>
	<tr<?php echo $class;?>>
		<td><?php echo $alttext['Alttext']['id']; ?>&nbsp;</td>
		<td><?php echo $alttext['Alttext']['url']; ?>&nbsp;</td>
		<td><?php echo $alttext['Alttext']['text']; ?>&nbsp;</td>
		<td>
			<?php echo $this->Html->link($alttext['Language']['name'], array('controller' => 'languages', 'action' => 'view', $alttext['Language']['id'])); ?>
		</td>
		<td><?php echo $alttext['Alttext']['xpath']; ?>&nbsp;</td>
		<td><?php echo $alttext['Alttext']['created']; ?>&nbsp;</td>
		<td><?php echo $alttext['Alttext']['modified']; ?>&nbsp;</td>
		<td class="actions">
			<?php echo $this->Html->link(__('View', true), array('action' => 'view', $alttext['Alttext']['id'])); ?>
			<?php echo $this->Html->link(__('Edit', true), array('action' => 'edit', $alttext['Alttext']['id'])); ?>
			<?php echo $this->Html->link(__('Delete', true), array('action' => 'delete', $alttext['Alttext']['id']), null, sprintf(__('Are you sure you want to delete # %s?', true), $alttext['Alttext']['id'])); ?>
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
		<li><?php echo $this->Html->link(__('New Alttext', true), array('action' => 'add')); ?></li>
		<li><?php echo $this->Html->link(__('List Languages', true), array('controller' => 'languages', 'action' => 'index')); ?> </li>
		<li><?php echo $this->Html->link(__('New Language', true), array('controller' => 'languages', 'action' => 'add')); ?> </li>
	</ul>
</div>