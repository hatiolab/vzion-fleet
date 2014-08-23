$(function() {
	//$.getJSON('http://www.highcharts.com/samples/data/jsonp.php?filename=aapl-c.json&callback=?', function(data) {
		
		window.chart = new Highcharts.StockChart({
			chart : {
				renderTo : 'container'
			},

			rangeSelector : {
				//selected : 1
				enabled: false
			},

			/*title : {
				text : 'AAPL Stock Price'
			},*/

			xAxis : {
				labels: {
					formatter: function() {
						return this.value;
					}
				}
			},

			series : [{
				name : '',
				data : dataA,
				type : 'area',
				threshold : null,
				
				fillColor : {
					linearGradient : {
						x1: 0, 
						y1: 0, 
						x2: 0, 
						y2: 1
					},
					stops : [[0, Highcharts.getOptions().colors[0]], [1, 'rgba(0,0,0,0)']]
				}
			}, {
				name : '',
				data : dataB,
				type : 'area',
				threshold : null,
				
				fillColor : {
					linearGradient : {
						x1: 0, 
						y1: 0, 
						x2: 0, 
						y2: 1
					},
					stops : [[0, Highcharts.getOptions().colors[1]], [1, 'rgba(0,0,0,0)']]
				}
			}, {
				name : '',
				data : dataC,
				type : 'area',
				threshold : null,
				
				fillColor : {
					linearGradient : {
						x1: 0, 
						y1: 0, 
						x2: 0, 
						y2: 1
					},
					stops : [[0, Highcharts.getOptions().colors[2]], [1, 'rgba(0,0,0,0)']]
				}
			}],
			
			navigator: {
				//enabled: false
				xAxis: {
					labels: {
						formatter: function() {
							return this.value;
						},
						align: 'left'
					}
				}
			}
		});
	//});
});