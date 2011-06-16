<div class="languages view">
<h2><?php  __('Language');?></h2>
	<dl><?php $i = 0; $class = ' class="altrow"';?>
		<dt<?php if ($i % 2 == 0) echo $class;?>><?php __('Id'); ?></dt>
		<dd<?php if ($i++ % 2 == 0) echo $class;?>>
			<?php echo $language['Language']['id']; ?>
			&nbsp;
		</dd>
		<dt<?php if ($i % 2 == 0) echo $class;?>><?php __('Name'); ?></dt>
		<dd<?php if ($i++ % 2 == 0) echo $class;?>>
			<?php echo $language['Language']['name']; ?>
			&nbsp;
		</dd>
	</dl>
</div>
<div class="actions">
	<h3><?php __('Actions'); ?></h3>
	<ul>
		<li><?php echo $this->Html->link(__('Edit Language', true), array('action' => 'edit', $language['Language']['id'])); ?> </li>
		<li><?php echo $this->Html->link(__('Delete Language', true), array('action' => 'delete', $language['Language']['id']), null, sprintf(__('Are you sure you want to delete # %s?', true), $language['Language']['id'])); ?> </li>
		<li><?php echo $this->Html->link(__('List Languages', true), array('action' => 'index')); ?> </li>
		<li><?php echo $this->Html->link(__('New Language', true), array('action' => 'add')); ?> </li>
		<li><?php echo $this->Html->link(__('List Alttexts', true), array('controller' => 'alttexts', 'action' => 'index')); ?> </li>
		<li><?php echo $this->Html->link(__('New Alttext', true), array('controller' => 'alttexts', 'action' => 'add')); ?> </li>
	</ul>
</div>
<div class="related">
	<h3><?php __('Related Alttexts');?></h3>
	<?php if (!empty($language['Alttext'])):?>
	<table cellpadding = "0" cellspacing = "0">
	<tr>
		<th><?php __('Id'); ?></th>
		<th><?php __('Url'); ?></th>
		<th><?php __('Text'); ?></th>
		<th><?php __('Language Id'); ?></th>
		<th><?php __('Xpath'); ?></th>
		<th><?php __('Created'); ?></th>
		<th><?php __('Modified'); ?></th>
		<th class="actions"><?php __('Actions');?></th>
	</tr>
	<?php
		$i = 0;
		foreach ($language['Alttext'] as $alttext):
			$class = null;
			if ($i++ % 2 == 0) {
				$class = ' class="altrow"';
			}
		?>
		<tr<?php echo $class;?>>
			<td><?php echo $alttext['id'];?></td>
			<td><?php echo $alttext['url'];?></td>
			<td><?php echo $alttext['text'];?></td>
			<td><?php echo $alttext['language_id'];?></td>
			<td><?php echo $alttext['xpath'];?></td>
			<td><?php echo $alttext['created'];?></td>
			<td><?php echo $alttext['modified'];?></td>
			<td class="actions">
				<?php echo $this->Html->link(__('View', true), array('controller' => 'alttexts', 'action' => 'view', $alttext['id'])); ?>
				<?php echo $this->Html->link(__('Edit', true), array('controller' => 'alttexts', 'action' => 'edit', $alttext['id'])); ?>
				<?php echo $this->Html->link(__('Delete', true), array('controller' => 'alttexts', 'action' => 'delete', $alttext['id']), null, sprintf(__('Are you sure you want to delete # %s?', true), $alttext['id'])); ?>
			</td>
		</tr>
	<?php endforeach; ?>
	</table>
<?php endif; ?>

	<div class="actions">
		<ul>
			<li><?php echo $this->Html->link(__('New Alttext', true), array('controller' => 'alttexts', 'action' => 'add'));?> </li>
		</ul>
	</div>
</div>
