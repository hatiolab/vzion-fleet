Ext.define('Fleet.view.spot_alarm.SpotAlarmVehicle', {

	extend : 'Ext.grid.Panel',

	requires : [ 'Fleet.store.SpotAlarmVehicle' ],

	mixins : { spotlink : 'Frx.mixin.view.SpotLink' },

	xtype : 'fleet_spot_alarm_vehicle',

	title : T('label.vehicle'),

	store : 'Fleet.store.SpotAlarmVehicle',

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
		}
	],

	dockedItems: [ {
		xtype: 'controlbar',
		items: ['->', 'list', 'add', 'save', 'delete']
	} ]
});