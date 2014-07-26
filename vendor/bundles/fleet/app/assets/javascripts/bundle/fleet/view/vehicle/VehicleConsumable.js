Ext.define('Fleet.view.vehicle.VehicleConsumable', {
	
	extend: 'Ext.panel.Panel',
	
	xtype : 'fleet_vehicle_consumable',
	
	title : T('menu.VehicleConsumable'),
	
	mixins : {
		spotlink : 'Frx.mixin.view.SpotLink'
	},
	
	layout : {
		type : 'vbox',
		align : 'stretch'
	},
	
	initComponent : function() {
		this.items = [ 
			this.createTopSection(this), 
			{ xtype : 'displayfield', height : 10 },
			this.createHistoryPart(this) 
		];
		this.callParent();
	},
	
	createTopSection : function(view) {
		return {
			xtype : 'panel',
			layout : { type : 'hbox', align : 'stretch' },
			flex : 2,
			items : [
				this.createItemPart(view),
				{ xtype : 'displayfield', width : 20 },
				this.createDetailPart(view)
			]
		};
	},
	
	createItemPart : function(view) {
		return {
			xtype : 'grid',
			itemId : 'item_grid',
			title : 'Consumable Item',
			flex : 1.5,
			autoScroll : true,
			cls : 'marginT10',
			store : Ext.create('Fleet.store.VehicleConsumable'),
	
			columns : [ {
				dataIndex : 'id', 
				hidden : true
			}, { 
				text: T('label.item'),
				sortable: true,
				dataIndex: 'name',
				flex : 1
			}, {  
				text : T('label.health_rate'),
				dataIndex : 'health_rate',
				sortable : false,
				width : 150,
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
			}, { 
				header : T('label.status'),
				dataIndex : 'status',
				flex : 1.2,
				align : 'right',
				sortable : false,
				renderer : function(value, meta, record) {
					return Ext.util.Format.number(record.get('health_rate'), '0.0') + ' (%) - ' + value;
				} 
			}, { 
				xtype : 'actioncolumn',
				align : 'center',
				icon: 'assets/image/iconAddOn.png',
				width : 40
			}, {
				xtype : 'actioncolumn',
				align : 'center',
				icon: 'assets/image/iconRefreshOn.png',
				width : 40
			} ],
		};
	},
	
	createDetailPart : function(view) {
		return {
			xtype : 'form',
			title : 'Consumable Detail',
			flex : 1,
			layout : {
				type : 'vbox',
				align : 'stretch'
			},
			defaults : {
				labelWidth : 180
			},
			items : [ 
				{ name : 'name', fieldLabel : T('label.item'), xtype : 'textfield', readOnly : true },
				{ name : 'repl_unit', fieldLabel : T('label.repl_unit'), xtype : 'textfield', readOnly : true },
				{ name : 'status', fieldLabel : T('label.status'), xtype : 'textfield' },
				{ name : 'health_rate', fieldLabel : T('label.health_rate'), xtype : 'textfield' },
				{ name : 'cycle_repl_mile', fieldLabel : T('label.x_repl_cycle_y', {x : '', y : T('label.mile')}), xtype : 'numberfield' },
				{ name : 'cycle_repl_duration', fieldLabel : T('label.x_repl_cycle_y', {x : '', y : T('label.month')}), xtype : 'numberfield' },
				{ name : 'last_repl_date', fieldLabel : T('label.x_repl_date', {x : T('label.last')}), xtype : 'datefield', format : T('format.date') },
				{ name : 'last_repl_mile', fieldLabel : T('label.x_repl_mile', {x : T('label.last')}), xtype : 'numberfield' },
				{ name : 'next_repl_date', fieldLabel : T('label.x_repl_date', {x : T('label.next')}), xtype : 'datefield', format : T('format.date') },
				{ name : 'next_repl_mile', fieldLabel : T('label.x_repl_mile', {x : T('label.next')}), xtype : 'numberfield' }
			]
		};
	},
	
	createHistoryPart : function(view) {
		return {
			xtype : 'grid',
			itemId : 'consumable_hist_grid',
			title : 'Consumable Replacement History',
			flex : 1,
			store : Ext.create('Ext.data.Store', {
				fields : [ 
					{ name : 'id', type : 'string' },
					{ name : 'name', type : 'string' }, 
					{ name : 'last_repl_date', type : 'date' }, 
					{ name : 'last_repl_mile', type : 'integer' }, 
					{ name : 'worker', type : 'string' }, 
					{ name : 'component', type : 'string' }, 
					{ name : 'repl_cost', type : 'integer' },
					{ name : 'worker_comment', type : 'integer' },
					{ name : 'created_at', type : 'date' }
				],
				 
				pageSize : 30,
	
				proxy : {
					type : 'rest',
					url : 'vehicle_consumables/:id/consumable_hists',
					format : 'json',
				    reader : {
						type : 'json',
						root : 'items',
						successProperty : 'success',
						totalProperty : 'total'
					},
					writer : {
						type : 'json'
					}
				}
			}),
			columns : [ 
				{ dataIndex : 'id', hidden : true },
				{ header : T('label.time'), dataIndex : 'created_at', width : 120 },
				{ header : T('label.item'), dataIndex : 'name', width : 100 },
				{ header : T('label.x_repl_date', {x : T('label.last')}), dataIndex : 'last_repl_date', xtype : 'datecolumn', format : T('format.date'), width : 115 },
				{ header : T('label.x_repl_mile', {x : T('label.last')}), dataIndex : 'last_repl_mile', xtype : 'numbercolumn', format : T('format.number'), width : 115, align : 'right' },
				{ header : T('label.worker'), dataIndex : 'worker', width : 100 },
				{ header : T('label.component'), dataIndex : 'component', width : 120 },
				{ header : T('label.cost'), dataIndex : 'repl_cost', xtype : 'numbercolumn', format : T('format.number'), width : 80 },
				{ header : T('label.comment'), dataIndex : 'worker_comment', width : 200 },
				{ xtype : 'actioncolumn', align : 'center', icon: 'assets/image/btn_close.png', width : 40 }
			]
		};
	},
	
	dockedItems: [ {
		xtype: 'controlbar',
		items: ['->', 'list']
	} ]
});