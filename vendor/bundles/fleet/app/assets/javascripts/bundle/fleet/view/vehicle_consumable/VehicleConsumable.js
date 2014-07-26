Ext.define('Fleet.view.vehicle_consumable.VehicleConsumable', {
	
	extend: 'Frx.common.ListView',
	
	xtype : 'fleet_vehicle_consumable',
	
	title : T('menu.VehicleConsumable'),
	
	store : 'Fleet.store.VehicleConsumable',
	
	columns : [
		{ header : T('label.id'), dataIndex : 'id', hidden : true },
		{ header : T('label.vehicle'), dataIndex : 'vehicle', xtype : 'entitycolumn', editor : { xtype: 'entitycolumneditor', storeClass: 'Fleet.store.Vehicle' } },
		{ 
			header : T('label.x_desc', {x : T('label.vehicle')}), dataIndex : 'vehicle', width : 150,
			renderer : function(val) {
				return val ? val.description : '';
			}
		},
		{ header : T('label.item'), dataIndex : 'name', width: 120, editor : { xtype : 'textfield' } },
		{ 
			header : T('label.health_rate'), dataIndex : 'health_rate', width : 150,
			renderer : function(value, meta, record) {
				if(value > 110) {
					value = 110;
				} else if(value == 0) {
					value = 5;
				}
				
				var id = Ext.id();
				var chartStore = Ext.create('Ext.data.Store', { 
					fields : ['health_rate', 'data'], 
					data : [ { 'health_rate' : '', 'data' : value } ] 
				});

				Ext.defer(function (id) {
					var chart = Ext.create('Ext.chart.Chart', {
						animate : true,
						store : chartStore,
						width : 140,
						height : 25,
						renderTo : id,
						axes : [ {
							type : 'Numeric',
							position : 'bottom',
							fields : ['data'],
							minimum : 0,
							maximum : 120,
							hidden : true
						}, {
							type : 'Category',
							position : 'left',
							fields : ['health_rate'],
							hidden : true
						} ],
						series : [ {
							type : 'bar',
							axis : 'bottom',
							gutter : 0,
							groupGutter : 0,
							xPadding : 0,
							yPadding : 0,
							xField : 'health_rate',
							yField : ['data'],
							renderer : function(sprite, record, attr, index, store) {
								var value = record.get('data');
								var color = '';
								if(value <= 40) {
									color = '#00FF00';
								} else if(value <= 70) {
									color = '#FFCC00';
								} else if(value <= 80) {
									color = '#FF6600';
								} else if(value <= 100) {
									color = '#FF5C33';
								} else {
									color = '#FF0000';
								}
								return Ext.apply(attr, {
									fill: color
								});
							}
						}]
					});
				}, 500, this, [id]);
				return "<div id='" + id + "'></div>";
			}
		},
		{ 
			header : T('label.status'), 
			dataIndex : 'status', 
			width : 135, 
			editor : { xtype : 'codecombo', commonCode : 'HEALTH_STATUS' },
			renderer : function(value, meta, record) {
				return value + ' : ' + Ext.util.Format.number(record.get('health_rate'), '0.0') + ' (%)';
			}
		},
		{ header : T('label.repl_unit'), dataIndex : 'repl_unit', width : 90, editor : { xtype : 'codecombo', commonCode : 'REPLACE_UNIT' } },
		{ header : T('label.x_repl_cycle_y', {x : '', y : T('label.mile')}), dataIndex : 'cycle_repl_mile', xtype : 'numbercolumn', width : 120, format : T('format.number'), align : 'right', editor : { xtype : 'numberfield' } },
		{ header : T('label.x_repl_cycle_y', {x : '', y : T('label.month')}), dataIndex : 'cycle_repl_duration', width : 140, align : 'right' , editor : { xtype : 'numberfield' } },
		{ header : T('label.x_repl_date', {x : T('label.last')}), dataIndex : 'last_repl_date', xtype : 'datecolumn', format : T('format.date'), width : 110, align : 'center', editor : { xtype : 'datefield', format : T('format.date') } },
		{ header : T('label.x_repl_mile', {x : T('label.last')}), dataIndex : 'last_repl_mile', xtype : 'numbercolumn', format : T('format.number'), align : 'right', width : 115, editor : { xtype : 'numberfield' } },
		{ header : T('label.x_repl_date', {x : T('label.next')}), dataIndex : 'next_repl_date', xtype : 'datecolumn', format : T('format.date'), width : 115, align : 'center', editor : { xtype : 'datefield', format : T('format.date') } },
		{ header : T('label.x_repl_mile', {x : T('label.next')}), dataIndex : 'next_repl_mile', xtype : 'numbercolumn', format : T('format.number'), align : 'right', width : 115, editor : { xtype : 'numberfield' } },
		{ header : T('label.cumulative_cost'), dataIndex : 'cumulative_cost', align : 'right', width : 120, editor : { xtype : 'numberfield' } },
		{ header : T('label.updater'), dataIndex : 'updater', xtype : 'entitycolumn' },
		{ header : T('label.updated_at'), dataIndex : 'updated_at', xtype : 'datecolumn', format : T('format.datetime'), width : 120 },

		],	
	
	dockedItems: [ {
		xtype : 'searchform',
		items : [
			{ fieldLabel : T('label.vehicle'), name : 'vehicle.name-eq', xtype : 'entitysearchcombo', storeClass : 'Fleet.store.Vehicle', valueField : 'name' },
			{ fieldLabel : T('label.item'), name : 'name-like' }
		]
	}, {
		xtype: 'controlbar',
		items: ['->', 'import', 'export', 'add', 'save', 'delete']
	} ]
});