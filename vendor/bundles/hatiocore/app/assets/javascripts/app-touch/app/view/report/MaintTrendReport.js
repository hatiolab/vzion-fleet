Ext.define('FleetTouch.view.report.MaintTrendReport', {
	extend : 'Ext.Panel',
	
	xtype : 'rpt_maint_trend',
	
	requires: [
		'Ext.chart.Chart',
		'Ext.chart.axis.Numeric',
		'Ext.chart.axis.Category',
		'Ext.chart.series.Bar',
		'Ext.chart.series.Line',
		'Ext.data.JsonStore'],
		
	config : {
		cls : 'grayBg',
		layout : 'fit'
	},
	
	constructor : function(config) {
		config.items = [ this.buildChart() ];
		
		this.callParent(arguments);
		
		var url = window.location.pathname.indexOf(contextPath) === 0 ? '/report/service' : 'assets/app-touch/data/maint_trend_report.json';
		
		Ext.Ajax.request({
			url : url,
			method : 'GET',
			params : {  id : 'repair_list', type : 'maint_trend' },
			success : function(response) {
				var resultObj = Ext.JSON.decode(response.responseText);

				if(resultObj.success) {
					var records = resultObj.items;
					var retObj = this.buildChartStore(records);
					this.down('chart').getStore().setData(retObj);
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
	
	buildChartStore : function(records) {
		var bottomFieldList = [], chartDataList = [], fieldList = ['year'];

		Ext.each(records, function(record) {
			var item = null;

			Ext.each(chartDataList, function(chartData) {
				if(chartData.year == record.year) {
					item = chartData;
				}
			});

			if(!item) {
				item = { "year" : record.year };
				chartDataList.push(item);
			}

			if(!Ext.Array.contains(fieldList, record.vehicle)) {
				fieldList.push(record.vehicle);
				bottomFieldList.push(record.vehicle);
			}

			item[record.vehicle] = record.mnt_cnt;
		});

		return chartDataList;
	},

	buildChart : function(chartStore) {
		return {
			xtype : 'chart',
			theme : 'Demo',
			animate : true,
			shadow : false,
			toolbar : null,
			flex : 1,
			legend : {
				position : 'bottom',
				labelFont : '17px Arial'
			},
			
			// FIXME VEHICLE LIST 고 정 --> 수 정
			
			store : Ext.create('Ext.data.Store', { 
				fields : ["year", "PV-001", "PV-002", "PV-003", "PV-004", "PV-005"], 
				data : [] 
			}),
			
			/*interactions : [ {
				type : 'togglestacked',
			} ],*/
            
			axes : [ {
				type : 'category',
				position : 'left',
				fields : ['year'],
				title : T('label.year')
			}, {
				type : 'numeric',
				position : 'bottom',
				fields : ["PV-001", "PV-002", "PV-003", "PV-004", "PV-005"],
				title : T('label.maintenance_count'),
				minimum : 0
			} ],
			
			series : [ {
				type : 'bar',
				fill : true,
				smooth : true,
				gutter : 80,
				axis : 'bottom',
				xField : 'year',
				yField : ["PV-001", "PV-002", "PV-003", "PV-004", "PV-005"],
				highlightCfg : {
					strokeStyle : 'red',
					size : 7,
					radius : 7
				},
				style : {
					stroke : 'blue',
					//shadowColor : 'black',
					shadowOffsetX : 3,
					shadowOffsetY : 3,
					minGapWidth : 1,
					maxBarWidth : 30
				}
			} ]
		};
	},

	buildTable : function() {
		return {
			xtype : 'panel',
			itemId : 'report',
			cls : 'paddingAll15',
			data : {},
			tpl : [
				'<table class=dataGrid>',
					'<tr>',
						'<th>'+ T('label.year') + '/' + T('label.month') +'</th>',
						'<th>'+ T('label.fuel_efficiency') +'</th>',
						'<th>'+ T('label.fuel_consumption') +'</th>',
					'</tr>',
					'<tpl for=".">',
					'<tr>',
						'<td class="alignCenter">{year}/{month}</td>',
						'<td class="alignCenter">{effcc}</td>',
						'<td class="alignCenter">{consmpt}</td>',
					'</tr>',
					'</tpl>',
				'</table>'
			]	
		};
	}
});
