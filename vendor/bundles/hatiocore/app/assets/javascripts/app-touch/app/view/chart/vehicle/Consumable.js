Ext.define('FleetTouch.view.chart.vehicle.Consumable', {
	extend : 'Ext.Panel',
	
	xtype : 'chart_v_consumable',
	
	requires: [
		'Ext.chart.Chart',
		'Ext.chart.axis.Numeric',
		'Ext.chart.axis.Category',
		'Ext.chart.series.Column',
	],
		
	config : {
		title : T('title.chart_v_consumable'),
		cls : 'grayBg',
		layout : 'fit'
	},

	constructor : function(config) {
		var self = this;
		
		this.callParent(arguments);	
		
		var chart = this.add(this.buildChart());

		this.on('painted', function() {
			FleetTouch.setting.on('vehicle', this.refresh, this);
			this.refresh();
		});
		
		this.on('erased', function() {
			FleetTouch.setting.un('vehicle', this.refresh, this);
		});
	},

	getChart : function() {
		/* chart 가 문제가 없을 때까지는 아래처럼 해야한다. */
		if(!this.chart)
			this.chart = this.getAt(0);
		return this.chart;
	},
	
	refresh : function() {
		if(FleetTouch.setting.get('vehicle') === this.vehicle) 
			return;
		
		this.refreshPage();
	},
	
	refreshPage : function() {
		var self = this;		
		this.vehicle = FleetTouch.setting.get('vehicle');
		var store = Ext.getStore('VehicleConsumableStore');
		this.vehicle = FleetTouch.setting.get('vehicle');
		
		store.load({
			params : {
				'vehicle_id-eq' : this.vehicle
			},
			callback : function(records) {
				Ext.each(records, function(record) {
					record.data.status = T('label.'+ record.data.status);
					record.data.health_rate = record.data.health_rate.toFixed(2);
				});
				
				self.getChart().getStore().setData(records);
			}
		});		
	},
	
	buildChart : function(store) {
		var self = this;
		var store = new Ext.create('Ext.data.JsonStore', {
			fields : ['name', 'health_rate', 'repl_unit', 'status', 'next_repl_mile', 'last_repl_date', 'cycle_repl_mile', 'cumulative_cost', 'cycle_repl_duration', 'last_repl_mile'],
			data : []
		});
		
		return {
			xtype : 'chart',
			store : store,
			themeCls : 'column1',
			animate : {
				easing : 'bounceOut',
				duration : 750
			},
			shadow : false,
			toolbar : null,
			gradients : [ {
				'id' : 'overdue',
				'angle' : 0,
				stops : {
					0 : {
						color: 'rgb(212, 40, 40)'
					},
					70 : {
						color: 'rgb(212, 216, 42)'
					},
					100 : {
						color: 'rgb(14, 117, 14)'
					}
				}
			}, {
				'id' : 'impending',
				'angle' : 0,
				stops : {
					0 : {
						color: 'rgb(242, 176, 40)'
					},
					20 : {
						color: 'rgb(212, 216, 42)'
					},
					100 : {
						color: 'rgb(14, 117, 14)'
					}
				}
			}, {
				'id': 'healthy',
				'angle': 0,
				stops: {
					100: {
						color: 'rgb(14, 117, 14)'
					}
				}
			} ],
			axes: [
				{
					type: 'Numeric',
					position: 'left',
					fields: ['health_rate'],
					grid : {
						stroke : '#ccc'
					},
					label: {
						renderer: function (v) {
							return v;
						}
					},
					title: T('label.health_rate') + ' (%)',
					majorTickSteps : 10,
					minimum : 0,
					maximum : 120
				},
				{
					type: 'Category',
					position: 'bottom',
					fields: ['name'],
					title: T('label.consumable_item'),
					label: {
						rotate: {
							degrees: 315
						}
					}
				}
			],
			series: [
				{
					type: 'column',
					axis: 'left',
					highlight: true,
					renderer: function (sprite, storeItem, barAttr, i, store) {
						var health_rate = storeItem.get('health_rate');
						if(health_rate > 100) {
							barAttr.fill = "url(#overdue)";
						} else if(health_rate > 90) {
							barAttr.fill = "url(#impending)";
						} else {
							barAttr.fill = "url(#healthy)";
						}

						return barAttr;
					},
					label: {
						display: 'outside',
						'text-anchor': 'middle',
						field: 'health_rate',
						orientation: 'horizontal',
						color: '#333',
						renderer : function(v) {
							return v.toString() + ' (%)';
						}
					},
					xField: 'name',
					yField: 'health_rate'
				}
			],
			interactions: [{
				type: 'iteminfo',
				gesture: 'tap',
				listeners: {
					show: function(interaction, item, panel) {
						var record = item.storeItem;
						var title = record.data.name + ' : ' + (record.data.health_rate) + '% (' + record.data.status + ')';
						var msg = record.data.name + ' ' + T('button.reset') + ' ' + T('msg.confirm_run');
						Ext.Msg.show({
							title : title,
							message : msg,
							buttons: Ext.MessageBox.OKCANCEL,
							animEl: 'elId',
							icon: Ext.MessageBox.QUESTION,
							fn : function(btn) {
								if(btn == "ok") {
									Ext.Msg.confirm(
										T('label.confirm'),
										msg,
										function(answer) {
											if(answer == "yes") {
												self.resetConsumable(record.data.name);
											}
										});
								}
							}
						});
					}
				}
			}]
		};	
	},
	
	resetConsumable : function(consumableItem) {
		var self = this;
		Ext.Ajax.request({
			url : '/vehicle_consumable/reset',
			method : 'POST',
			params : {
				'vehicle_id-eq' : this.vehicle,
				name : consumableItem
			},
			success : function(response) {
				var resultObj = Ext.JSON.decode(response.responseText);
				if (resultObj.success) {
					self.refreshPage();
				} else {
					Ext.Msg.alert(T('label.failure'), resultObj.msg);
				}
			},
			failure : function(response) {
				Ext.Msg.alert(T('label.failure'), response.responseText);
			}
		});
	}
});
