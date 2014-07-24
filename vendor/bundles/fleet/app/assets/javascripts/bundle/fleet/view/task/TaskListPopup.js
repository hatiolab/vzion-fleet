Ext.define('Fleet.controller.task.TaskListPopup', {
	
	extend : 'Frx.common.Popup',
	
	requires : ['Fleet.store.Task'],

	xtype : 'fleet_task_list_popup',
	
	title : T('menu.TaskCalendar'),
	
	height : 420,
	
	width : 950,
	
	layout : {
		type : 'vbox',
		align : 'stretch'
	},
	
	dockedItems : [ {
		xtype : 'controlbar',
		items : ['->', 'close']
	} ],
	
	items : [ {
		xtype : 'grid',
		flex : 1,
		store : 'Fleet.store.Task',
		columns : [
			{
				xtype : 'actioncolumn',
				width : 30, 
				align : 'center', 
				itemId : 'go_detail',
				items : [ { icon : '/assets/std/iconDetail.png', tooltip : T('tooltip.goto_item') } ] 
			},		
			{ header : T('label.id'), dataIndex : 'id', hidden : true },
			{ header : T('label.title'), dataIndex : 'title', editor : { xtype : 'textfield', maxLength : 255 }, width : 150 },
			{ header : T('label.x_date', {x : T('label.start')}), dataIndex : 'start_date', xtype : 'datecolumn', format : T('format.date'), width : 80, editor : { xtype : 'datefield', format : T('format.date') }, align: 'center' },
			{ header : T('label.x_date', {x : T('label.end')}), dataIndex : 'end_date', xtype : 'datecolumn', format : T('format.date'), width : 80, editor : { xtype : 'datefield', format : T('format.date') }, align: 'center' },
			{ header : T('label.all_day'), dataIndex : 'all_day', editor : { xtype : 'textfield', maxLength : 255 }, width : 150 },
			{ header : T('label.category'), dataIndex : 'category', editor : { xtype : 'textfield', maxLength : 255 }, width : 150 },
			{ header : T('label.reminder'), dataIndex : 'reminder', editor : { xtype : 'textfield', maxLength : 255 }, width : 150 },
			{ header : T('label.notes'), dataIndex : 'notes', editor : { xtype : 'textfield', maxLength : 255 }, width : 150 },
			{ header : T('label.loc'), dataIndex : 'loc', editor : { xtype : 'textfield', maxLength : 255 }, width : 150 }
		]
	} ]
});