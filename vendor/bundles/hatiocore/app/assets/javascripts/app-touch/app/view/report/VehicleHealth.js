Ext.define('FleetTouch.view.report.VehicleHealth', {
	
	extend : 'Ext.Panel',
	
	xtype : 'rpt_vehicle_health',
	
	requires: [
		'Ext.chart.Chart',
		'Ext.chart.axis.Numeric',
		'Ext.chart.axis.Category',
		'Ext.chart.series.Pie'
	],
		
	config : {
		title : T('title.vehicle_health'),
		cls : 'grayBg',
		layout : 'fit'
	},

	constructor : function(config) {
		config.items = [ this.buildChart() ];
		
		this.callParent(arguments);
		
		var url = window.location.pathname.indexOf(contextPath) === 0 ? 'diy_services/FleetVehicleHealth/shoot.json' : 'assets/app-touch/data/dashboard/health/vehicle.json';
		
		Ext.Ajax.request({
			url : url,
			method : 'POST',
			params : { health_type : 'health' },
			success: function(response) {
				var resultObj = Ext.JSON.decode(response.responseText);

				if(resultObj.success) {
					var records = resultObj.items;
					var data = [];
					for(var i = 0 ; i < records.length ; i++) {
						if(records[i].name === 'health') {
							data = records[i].summary;
							if(data.length > 0) {
								Ext.each(data, function(summary) {
									summary.name = T('label.' + summary.name);
								});
							}
							break;
						}
					}

					this.down('chart').getStore().setData(data);
				} else {
					Ext.MessageBox.alert(T('label.failure'), resultObj.msg);
				}
			},
			failure: function(response) {
				Ext.MessageBox.alert(T('label.failure'), response.responseText);
			},
			scope : this
		});
	},

	buildChart : function() {
		return {
			xtype : 'chart',
			themeCls: 'pie1',
			theme: 'Demo',
			// theme: 'Base:gradients',
			shadow: false,
			animate: true,
			toolbar : null,
			insetPadding: 20,
			legend: {
				position: 'left',
				labelFont : '10px',
				boxStroke : '#cfcfcf'
			},

			store: Ext.create('Ext.data.JsonStore', {
				fields: ['name', 'value'],
				data : []
			}),

            interactions: [
				'reset',
				'rotate',
				'itemhighlight',
				{
					type : 'iteminfo',
					gesture : 'longpress',
					listeners : {
						show : function(interaction, item, panel) {
							var record = item.storeItem;
							panel.setHtml([
								'<b>Vehicles in the ' + record.get('name') + ' state :</b>',
								'<ul>' +
									'<li> Count : ' + record.get('value') + '</li>' +
									'</ul>'
								].join('')
							);
						}
					}
				}
            ],

			series: [ {
				type: 'pie',
				field: 'value',
				showInLegend: true,
				donut: false,
				tips: {
					trackMouse: true,
					width: 140,
					height: 25,
					renderer: function(storeItem, item) {
						// calculate percentage.
						var total = 0;
						store.each(function(rec) {
							total += rec.get(idx);
						});
						var name = storeItem.get('name');
						var count = storeItem.get('value');
						var percent = Math.round(count / total * 100);
						this.setTitle(name + ' : ' + count + '(' + percent + '%)');
					}
				},
				colorSet : ['#00aa00', '#ffff00', '#aa0000'],
				highlight: {
					segment: {
						margin: 20
					}
				},
				label: {
					field: 'name',
					display: 'rotate',
					contrast: true,
					font: '14px Arial'
				}
			} ]
		}
	}

});
