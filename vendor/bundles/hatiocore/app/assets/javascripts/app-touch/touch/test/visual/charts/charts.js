Ext.setup({
    tabletStartupScreen: 'tablet_startup.jpg',
    phoneStartupScreen: 'phone_startup.jpg',
    tabletIcon: 'icon-ipad.png',
    phoneIcon: 'icon-iphone.png',
    glossOnIcon: false,
    onReady: function() {
    
    var generateData = function(n, floor){
        var data = [],
            p = (Math.random() *  11) + 1,
            i;
            
        floor = (!floor && floor !== 0)? 20 : floor;
        
        for (i = 0; i < (n || 12); i++) {
            data.push({
                name: Date.monthNames[i % 12],
                data1: Math.floor(Math.max((Math.random() * 100), floor)),
                data2: Math.floor(Math.max((Math.random() * 100), floor)),
                data3: Math.floor(Math.max((Math.random() * 100), floor)),
                data4: Math.floor(Math.max((Math.random() * 100), floor)),
                data5: Math.floor(Math.max((Math.random() * 100), floor)),
                data6: Math.floor(Math.max((Math.random() * 100), floor)),
                data7: Math.floor(Math.max((Math.random() * 100), floor)),
                data8: Math.floor(Math.max((Math.random() * 100), floor)),
                data9: Math.floor(Math.max((Math.random() * 100), floor))
            });
        }
        return data;
    };
    
    var store = new Ext.data.JsonStore({
        fields: ['name', 'data1', 'data2', 'data3', 'data4', 'data5', 'data6', 'data7', 'data9', 'data9'],
        data: generateData()
    });
    
    // Charts 1
    new Ext.chart.Panel({
        renderTo: Ext.getBody(),
        width: 600,
        height: 400,
        layout: 'fit',
        title: 'Chart 1',
        items: [{
            xtype: 'chart',
            style: 'background:#fff',
            animate: false,
            store: store,
            legend: {
                position: 'bottom'
            },    
            axes: [{
                type: 'Numeric',
                position: 'left',
                fields: ['data1', 'data2', 'data3', 'data4', 'data5', 'data6', 'data7'],
                title: 'Number of Hits',
                grid: {
                    odd: {
                        opacity: 1,
                        fill: '#ddd',
                        stroke: '#bbb',
                        'stroke-width': 1
                    }
                },
                minimum: 0,
                adjustMinimumByMajorUnit: 0
            }, {
                type: 'Category',
                position: 'bottom',
                fields: ['name'],
                title: 'Month of the Year',
                grid: true,
                label: {
                    rotate: {
                        degrees: 315
                    }
                }
            }],
            series: [{
                type: 'area',
                highlight: false,
                axis: 'left',
                xField: 'name',
                yField: ['data1', 'data2', 'data3', 'data4', 'data5', 'data6', 'data7'],
                style: {
                    opacity: 0.93
                }
            }]
        }]
    });
    
    
    // Charts 2
    new Ext.chart.Panel({
        renderTo: Ext.getBody(),
        width: 600,
        height: 400,
        layout: 'fit',
        title: 'Chart 2',
        items: [{
            xtype: 'chart',
            style: 'background:#fff',
            animate: false,
            defaultInsets: 30,
            store: store,
            legend: {
                position: 'right'
            },
            axes: [{
                type: 'Numeric',
                position: 'left',
                fields: ['data1', 'data2', 'data3', 'data4', 'data5', 'data6', 'data7'],
                title: 'Usage %',
                grid: true,
                decimals: 0,
                minimum: 0,
                maximum: 100,
                renderer: function(v) {
                    return Math.round(v * 100) / 100;
                }
            }, {
                type: 'Category',
                position: 'bottom',
                fields: ['data1'],
                title: 'Month of the Year'
            }],
            series: [{
                type: 'area',
                axis: 'left',
                highlight: true,
                tips: {
                  trackMouse: true,
                  width: 170,
                  height: 28,
                  renderer: function(storeItem, item) {
                      this.setTitle(item.storeField + ' - '
                              + Date.format(new Date(storeItem.get('date')), 'M y')
                              + ' - ' + storeItem.get(item.storeField) + '%');
                  }
                },
                xField: 'name',
                yField: ['data1', 'data2', 'data3', 'data4', 'data5', 'data6', 'data7'],
                style: {
                    lineWidth: 1,
                    stroke: '#666',
                    opacity: 0.86
                }
            }]
        }]
    });
    
    // Charts 3
    new Ext.chart.Panel({
        renderTo: Ext.getBody(),
        width: 600,
        height: 400,
        layout: 'fit',
        title: 'Chart 3',
        items: [{
            xtype: 'chart',
            animate: false,
            style: 'background:#fff',
            shadow: false,
            store: store,
            axes: [{
                type: 'Numeric',
                position: 'bottom',
                fields: ['data1'],
                label: {
                   renderer: function(v) { return Math.floor(v * 100) / 100; },
                },
                title: 'Number of Hits',
                minimum: 0
            }, {
                type: 'Category',
                position: 'left',
                fields: ['name'],
                title: 'Month of the Year'
            }],
            series: [{
                type: 'bar',
                axis: 'bottom',
                label: {
                    display: 'insideEnd',
                    field: 'data1',
                    renderer: function(v) { return Math.floor(v * 100) / 100; },
                    orientation: 'horizontal',
                    color: '#333',
                    'text-anchor': 'middle',
                    contrast: true
                },
                xField: 'name',
                yField: ['data1'],
                renderer: function(sprite, record, attr, index, store) {
                    var fieldValue = Math.random() * 20 + 10;
                    var value = (record.get('data1') >> 0) % 5;
                    var color = ['rgb(213, 70, 121)', 
                                 'rgb(44, 153, 201)', 
                                 'rgb(146, 6, 157)', 
                                 'rgb(49, 149, 0)', 
                                 'rgb(249, 153, 0)'][value];
                    return Ext.apply(attr, {
                        fill: color
                    });
                }
            }]
        }]
    }); 
    
    // Charts 4
    new Ext.chart.Panel({
        renderTo: Ext.getBody(),
        width: 600,
        height: 400,
        layout: 'fit',
        title: 'Chart 4',
        items: [{
            xtype: 'chart',
            animate: false,
            store: store,
            insetPadding: 30,
            axes: [{
                type: 'Numeric',
                minimum: 0,
                position: 'left',
                fields: ['data1'],
                title: false,
                grid: true,
                label: {
                    renderer: function(v) { return Math.floor(v * 100) / 100; },
                    font: '10px Arial'
                }
            }, {
                type: 'Category',
                position: 'bottom',
                fields: ['name'],
                title: false,
                label: {
                    font: '11px Arial',
                    renderer: function(name) {
                        return name.substr(0, 3) + ' 07';
                    }
                }
            }],
            series: [{
                type: 'line',
                axis: 'left',
                xField: 'name',
                yField: 'data1',
                listeners: {
                  itemmouseup: function(item) {
                      Ext.example.msg('Item Selected', item.value[1] + ' visits on ' + Date.monthNames[item.value[0]]);
                  }  
                },
                tips: {
                    trackMouse: true,
                    width: 80,
                    height: 40,
                    renderer: function(storeItem, item) {
                        this.setTitle(storeItem.get('name') + '<br />' + storeItem.get('data1'));
                    }
                },
                style: {
                    fill: '#38B8BF',
                    stroke: '#38B8BF',
                    'stroke-width': 3
                },
                markerConfig: {
                    type: 'circle',
                    size: 4,
                    radius: 4,
                    'stroke-width': 0,
                    fill: '#38B8BF',
                    stroke: '#38B8BF'
                }
            }]
        }]
    }); 
    
    // Charts 5
    new Ext.chart.Panel({
        renderTo: Ext.getBody(),
        width: 600,
        height: 400,
        layout: 'fit',
        title: 'Chart 5',
        items: [{
            xtype: 'chart',
            style: 'background:#fff',
            animate: false,
            shadow: true,
            store: store,
            axes: [{
                type: 'Numeric',
                position: 'left',
                fields: ['data1'],
                label: {
                    renderer: function(v) { return Math.floor(v * 100) / 100; }
                },
                title: 'Number of Hits',
                grid: true,
                minimum: 0
            }, {
                type: 'Category',
                position: 'bottom',
                fields: ['name'],
                title: 'Month of the Year'
            }],
            series: [{
                type: 'column',
                axis: 'left',
                highlight: true,
                tips: {
                  trackMouse: true,
                  width: 140,
                  height: 28,
                  renderer: function(storeItem, item) {
                    this.setTitle(storeItem.get('name') + ': ' + storeItem.get('data1') + ' $');
                  }
                },
                label: {
                  display: 'insideEnd',
                  'text-anchor': 'middle',
                    field: 'data1',
                    renderer: function(v) { return Math.floor(v * 100) / 100; },
                    orientation: 'vertical',
                    color: '#333'
                },
                xField: 'name',
                yField: 'data1'
            }]
        }]
    });
    
    // Charts 6
    new Ext.chart.Panel({
        renderTo: Ext.getBody(),
        width: 600,
        height: 400,
        layout: 'fit',
        title: 'Chart 6',
        items: [{
            xtype: 'chart',
            animate: false,
            store: store,
            shadow: true,
            legend: {
                position: 'right'
            },
            insetPadding: 2,
            series: [{
                type: 'pie',
                field: 'data1',
                showInLegend: true,
                donut: false,
                tips: {
                  trackMouse: true,
                  width: 140,
                  height: 28,
                  renderer: function(storeItem, item) {
                    //calculate percentage.
                    var total = 0;
                    store.each(function(rec) {
                        total += rec.get('data1');
                    });
                    this.setTitle(storeItem.get('name') + ': ' + Math.round(storeItem.get('data1') / total * 100) + '%');
                  }
                },
                highlight: {
                  segment: {
                    margin: 20
                  }
                },
                label: {
                    field: 'name',
                    display: 'rotate',
                    contrast: true,
                    font: '18px Arial'
                }
            }]
        }]
    });
    
    // Charts 7
    new Ext.chart.Panel({
        renderTo: Ext.getBody(),
        width: 600,
        height: 400,
        layout: 'fit',
        title: 'Chart 7',
        items: [{
            xtype: 'chart',
            style: 'background:#fff',
            animate: false,
            store: store,
            insetPadding: 20,
            legend: {
                position: 'right'
            },
            axes: [{
                type: 'Radial',
                position: 'radial',
                label: {
                    display: true
                }
            }],
            series: [{
                type: 'radar',
                xField: 'name',
                yField: 'data1',
                showInLegend: true,
                showMarkers: true,
                markerConfig: {
                    radius: 5,
                    size: 5
                },
                style: {
                    'stroke-width': 2,
                    fill: 'none',
                    stroke: '#c00'
                }
            },{
                type: 'radar',
                xField: 'name',
                yField: 'data2',
                showInLegend: true,
                showMarkers: true,
                markerConfig: {
                    radius: 5,
                    size: 5
                },
                style: {
                    'stroke-width': 2,
                    fill: 'none',
                    stroke: '#0c0'
                }
            },{
                type: 'radar',
                xField: 'name',
                yField: 'data3',
                showMarkers: true,
                showInLegend: true,
                markerConfig: {
                    radius: 5,
                    size: 5
                },
                style: {
                    'stroke-width': 2,
                    fill: 'none',
                    stroke: '#00c'
                }
            }]
        }]
    }); 
    
    // Charts 8
    new Ext.chart.Panel({
        renderTo: Ext.getBody(),
        width: 600,
        height: 400,
        layout: 'fit',
        title: 'Chart 8',
        items: [{
            xtype: 'chart',
            style: 'background:#fff',
            insetPadding: 20,
            animate: false,
            store: store,
            legend: {
                position: 'right'
            },
            axes: [{
                type: 'Radial',
                position: 'radial',
                label: {
                    display: true
                }
            }],
            series: [{
                showInLegend: true,
                type: 'radar',
                xField: 'name',
                yField: 'data1',
                style: {
                    opacity: 0.4
                }
            },{
                showInLegend: true,
                type: 'radar',
                xField: 'name',
                yField: 'data2',
                style: {
                    opacity: 0.4
                }
            },{
                showInLegend: true,
                type: 'radar',
                xField: 'name',
                yField: 'data3',
                style: {
                    opacity: 0.4
                }
            }]
        }]
    }); 
    
    // Charts 9
    new Ext.chart.Panel({
        renderTo: Ext.getBody(),
        width: 600,
        height: 400,
        layout: 'fit',
        title: 'Chart 9',
        items: [{
            xtype: 'chart',
            style: 'background:#fff',
            animate: false,
            store: store,
            axes: false,
            insetPadding: 50,
            series: [{
                type: 'scatter',
                axis: false,
                xField: 'data1',
                yField: 'data2',
                color: '#ccc',
                markerConfig: {
                    type: 'circle',
                    radius: 20,
                    size: 20
                }
            }]
        }]
    });
    
    // Charts 10
    new Ext.chart.Panel({
        renderTo: Ext.getBody(),
        width: 600,
        height: 400,
        layout: 'fit',
        title: 'Chart 10',
        items: [{
            xtype: 'chart',
            animate: false,
            style: 'background:#fff',
            store: store,
            insetPadding: 25,
            flex: 1,
            axes: [{
                type: 'gauge',
                position: 'gauge',
                minimum: 0,
                maximum: 100,
                steps: 10,
                margin: -10
            }],
            series: [{
                type: 'gauge',
                field: 'data1',
                donut: false,
                colorSet: ['#F49D10', '#ddd']
            }]
        }]
    });

    // Charts 11
    new Ext.chart.Panel({
        renderTo: Ext.getBody(),
        width: 600,
        height: 400,
        layout: 'fit',
        title: 'Chart 11',
        items: [{
            id: 'chartCmp',
            xtype: 'chart',
            style: 'background:#fff',
            animate: false,
            shadow: true,
            store: store,
            legend: {
              position: 'right'  
            },
            axes: [{
                type: 'Numeric',
                position: 'bottom',
                fields: ['data1', 'data2', 'data3'],
                minimum: 0,
                label: {
                    renderer: function(v) { return Math.floor(v * 100) / 100; }
                },
                grid: true,
                title: 'Number of Hits'
            }, {
                type: 'Category',
                position: 'left',
                fields: ['name'],
                title: 'Month of the Year'
            }],
            series: [{
                type: 'bar',
                axis: 'bottom',
                xField: 'name',
                yField: ['data1', 'data2', 'data3']
            }]
        }]
    }); 
  }
});
