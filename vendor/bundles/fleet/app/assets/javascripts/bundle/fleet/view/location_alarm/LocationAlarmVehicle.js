Ext.define('Fleet.view.location_alarm.LocationAlarmVehicle', {
	
	extend : 'Ext.grid.Panel',
	
	requires : [ 'Fleet.store.LocationAlarmVehicle' ],
	
	mixins : { spotlink : 'Frx.mixin.view.SpotLink' },
	
	xtype : 'fleet_location_alarm_vehicle',
	
	title : T('menu.LocationAlarmVehicle'),

	store : 'Fleet.store.LocationAlarmVehicle',
	
	sortableColumns : false,

	selModel : Ext.create('Ext.selection.CheckboxModel'),
	
    plugins : [ Ext.create('Ext.grid.plugin.CellEditing', { clicksToEdit : 1 }) ],
	
	columns : [ 
		{ 
			header : T('label.vehicle'), 
			dataIndex : 'vehicle', 
			xtype : 'entitycolumn',
			editor : { 
				xtype: 'entitycolumneditor', 
				storeClass: 'Fleet.store.Vehicle' 
			}  
		},
		{ 
			header : T('label.x_desc', {x : T('label.vehicle')}), 
			dataIndex : 'vehicle', 
			width : 150, 
			renderer : function(val) {
				return val ? val.description : '';
			} 
		},
		{ header : T('label.alarm_name'), dataIndex : 'alarm_name', align : 'right' , editor : { xtype : 'textfield' } }
	],
	
	dockedItems: [ {
		xtype: 'controlbar',
		items: ['->', 'list', 'add', 'save', 'delete']
	} ]
});