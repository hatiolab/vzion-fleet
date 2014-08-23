Ext.setup({
    tabletStartupScreen: 'tablet_startup.jpg',
    phoneStartupScreen: 'phone_startup.jpg',
    tabletIcon: 'icon-ipad.png',
    phoneIcon: 'icon-iphone.png',
    glossOnIcon: false,
    onReady: function() {
        tabpanel = new Ext.Panel({
            dockedItems: {  
                ui: 'light',
                xtype: 'panel',
                height: '2.6em',
                docked: 'top',
                layout: {
                    type: 'card',
                    align: 'stretch'
                },
                activeItem: 0,
                items: [{
                    docked: 'top',
                    xtype: 'toolbar',
                    ui: 'light',
                    title: '2010 Census Data - USA',
                    items:[]
                }]
            },
            fullscreen: true,
            items: []
        });

        var titlePanel = tabpanel.dockedItems.get(0).items.get(0);

        var geom = {},
            data = {},
            components = {},
            page = 'states',
            counties = false,
            color = {
                from: [49, 130, 189],
                to: [222, 235, 247]
            },
            colorMap = {};
       
            window.data = data; 
        
        Ext.Ajax.request({
          url: 'src/geom/_States.json',
          success: function(response) {
              geom.states = JSON.parse(response.responseText);
              
              Ext.Ajax.request({
                url: 'src/data/states.json',
                success: function(response) {
                    data.states = JSON.parse(response.responseText);
                    initMap();

                },
                failure: function() {
                    console.log('something went wrong');
                }
              });
              
          },
          failure: function() {
              console.log('something went wrong');
          }
        });

        
        function initMap() {
            var i = 0, 
                j = 0,
                states = geom.states,
                statesData = data.states,
                l = states.length,
                lp = 0,
                max = Number.MIN_VALUE,
                min = Number.MAX_VALUE,
                state, drawComponent, surface, prop, val, pathArray,
                barChart, pyramidChart, barChartData = [];

            
            //Create sprite configurations for USA geometry.
            for (; i < l; i++) {
                state = states[i];
                pathArray = state.path.split(/[, ]/);
                
                for (j = 0, lp = pathArray.length; j < lp; j++) {
                    if (!isNaN(+pathArray[j])) {
                        pathArray[j] /= 1.5;
                    }
                }
                
                Ext.apply(state, {
                    fill: '#ccc',
                    stroke: '#333',
                    'stroke-width': 2,
                    path: pathArray
                });
            }

            for (prop in statesData) {
                barChartData.push({
                    name: prop,
                    population: +statesData[prop].POP100
                });
            }

            barChartData.sort(function(b, a) { 
                var aname = a.name,
                    bname = b.name;

                if (bname > aname) {
                    return 1;
                } else if (bname < aname) {
                    return -1;
                }

                return 0;
            });

            components.states = drawComponent = new Ext.draw.Component({
                ui: 'light',
                layout: 'fit',
                style: 'position:absolute;top:205px;left:0;',
                width: 950 / 1.5,
                height: 600 / 1.5,
                items: states
            });

             function selectElement(e) {
                var p = e && Ext.util.Point.fromEvent(e.event) || { x: 74, y: 480 },
                    i = 0,
                    l = states.length,
                    surface = drawComponent.surface,
                    items = surface.items.items,
                    region = surface.getRegion(),
                    item, bbox, fillColor = '#dd8';

                p.x -= region.left;
                p.y -= region.top;

                for (; i < l; i++) {
                    item = items[i];
                    bbox = (item.bbox && item.bbox.transform) || item.getBBox();

                    if (p.x >= bbox.x && p.x <= bbox.x + bbox.width &&
                        p.y >= bbox.y && p.y <= bbox.y + bbox.height &&
                            pointInPolygon(p.x, p.y, item.attr.path)) {

                      countyData = data.states[item.id];
                      data.pieStore.setData(countyData.race);
                      data.pyramidStore.setData(countyData.sex_by_age);

                      if (!item.beforeColor) {
                          item.beforeColor = item.attr.fill;
                      }

                      item.setAttributes({
                          fill: '#dd8'
                      });
                      surface.renderSprite(item);

                      titlePanel.setTitle('2010 Census Data - ' + data.states[item.id].NAME);

                      page = item.id;

                    } else {
                        if (item.beforeColor) {
                            item.setAttributes({
                                fill: item.beforeColor
                            });
                            surface.renderSprite(item);
                            delete item.beforeColor;
                        }
                    }
                }
            }

            drawComponent.on({
                tap: selectElement
            });

            components.panel = new Ext.Panel({
                items: []
            });

            components.countyPanel = new Ext.Panel({
                cls: 'race',
                height: '2.6em',
                docked: 'top',
                width: 640,
                items: []
            });

            components.countyPanel.add(drawComponent);

            data.pieStore = new Ext.data.ArrayStore({
                fields: ['name', 'value']
            });

            colorSet = ['rgb(8, 69, 148)',
                        'rgb(33, 113, 181)',
                        'rgb(66, 146, 198)',
                        'rgb(107, 174, 214)',
                        'rgb(158, 202, 225)',
                        'rgb(198, 219, 239)',
                        'rgb(222, 235, 247)'];

            components.pieChart = pieChart = new Ext.chart.Panel({
                cls: 'race',
                title: 'Race Distribution',
                width: 325,
                height: 325,
                style: 'position:absolute;top:330px;right:0;',
                items: {
                    animate: true,
                    shadow: false,
                    store: data.pieStore,
                    series: [{
                        type: 'pie',
                        donut: 15,
                        field: 'value',
                        highlight: false,
                        colorSet: colorSet,
                        label: {
                            field: 'name',
                            display: 'rotate',
                            contrast: true
                        }
                    }]
                }
            });

            components.panel.add(components.countyPanel);
            components.panel.add(components.pieChart);

            data.pyramidStore = new Ext.data.ArrayStore({
                fields: ['name', 'male', 'female']
            });

            components.pyramidChart = pyramidChart = new Ext.chart.Panel({
                cls: 'race',
                title: 'Gender Distribution',
                width: 325,
                height: 325,
                style: 'position:absolute;top:0;right:0;',
                items: {
                    animate: true,
                    shadow: false,
                    showInLegend: true,
                    store: data.pyramidStore,
                    legend: {
                        position: {
                            portrait: 'bottom',
                            landscape: 'bottom'
                        }
                    },
                    series: [{
                        type: 'pyramid',
                        field1: 'female',
                        field2: 'male',
                        label: {
                            field: 'name',
                            display: 'rotate'
                        }
                    }]
                }
            });
            
            
            data.barStore = new Ext.data.ArrayStore({
                fields: ['name', 'population']
            });

            components.barChart = barChart = new Ext.chart.Panel({
                cls: 'race',
                title: 'Population Distribution',
                width: 640,
                height: 200,
                style: 'position:absolute;top:0;left:0;',
                items: {
                    animate: true,
                    shadow: false,
                    showInLegend: false,
                    store: data.barStore,
                    axes: [{
                        type: 'Category',
                        position: 'bottom',
                        title: 'State',
                        fields: 'name',
                        label: {
                            renderer: function(v) {
                                return v;
                            },
                            font: '7px Arial'
                        }
                    }, {
                        type: 'Numeric',
                        minimum: 0,
                        position: 'left',
                        fields: ['population'],
                        label: {
                            renderer: function(v) {
                                if (!(v % 1e6)) {
                                    return Math.round(v / 1e6) + 'M';
                                }
                                return v;
                            },
                            font: '7px Arial'
                        }
                    }],
                    series: [{
                        type: 'column',
                        xField: 'name',
                        yField: 'population',
                        axis: 'left',
                        label: {
                            field: 'name',
                            font: '5px Arial'
                        },
                        renderer: function(sprite, storeItem, attr, index, store) {
                            if (colorMap[storeItem.data.name]) {
                                attr.fill = colorMap[storeItem.data.name];
                            }
                            return attr;
                        }
                    }]
                }
            });
            
            components.panel.add(pyramidChart);
            components.panel.add(barChart);

            tabpanel.add(components.panel);
            tabpanel.doLayout();
            components.panel.doLayout();
            components.countyPanel.doLayout();

            tabpanel.add(drawComponent);
            tabpanel.doLayout();

            transitionData(drawComponent, data.states, 'POP100');
            data.barStore.setData(barChartData);

            selectElement();
        }

        function pointInPolygon(x, y, polygon) {
          var comp = 2,
              conj = 0,
              i = 0,
              l = polygon.length, 
              poly = [], 
              n, startX, startY, stopX, stopY, k, cx;

            for (; i < l; i++) {
                n = +polygon[i];
                if (!isNaN(n)) {
                  poly.push(n);
                }
            }

            l = poly.length / 2;

           for (i = 0; i < l; i++) {
             startX = +poly[i * comp    ];
             startY = +poly[i * comp + 1];

             stopX = +poly[(i + 1) * comp    ] || +poly[0];
             stopY = +poly[(i + 1) * comp + 1] || +poly[1];

             if (startY >= y && stopY < y ||
                 startY <= y && stopY > y) {
               // find inverse k
               k = (stopX - startX) / (stopY - startY);
               cx = (y - startY) * k + startX;
               if (cx == x) {
  
               } else if (cx > x) {
                 conj++;
               }
             }
           }
            return (conj % 2) !== 0;
         }

         function transitionData(component, data, prop) {
            var i = 0,
                items = component.surface.items.items, 
                l = items.length, 
                min = Number.MAX_VALUE,
                max = Number.MIN_VALUE,
                item, dataItem, value, colorArray, p, id;
            
            for (; i < l; i++) {
                id = items[i].id;
                if (data[id]) {
                    value = +data[id][prop];
                } else {
                    for (p in data) {
                        if (p.indexOf(id) > -1) {
                            value = +data[p][prop];
                            break;
                        }
                    }
                }
                min = min < value ? min : value;
                max = max > value ? max : value;
            }
            
            for (i = 0; i < l; i++) {
                id = items[i].id;
                if (data[id]) {
                    value = +data[id][prop];
                } else {
                    for (p in data) {
                        if (p.indexOf(id) > -1) {
                            value = +data[p][prop];
                            break;
                        }
                    }
                }
                colorArray = [
                  ((value - min) / (max - min) * (color.to[0] - color.from[0]) + color.from[0]) >> 0,
                  ((value - min) / (max - min) * (color.to[1] - color.from[1]) + color.from[1]) >> 0,
                  ((value - min) / (max - min) * (color.to[2] - color.from[2]) + color.from[2]) >> 0
                ];

                items[i].setAttributes({
                  fill: 'rgb('  + colorArray.join() + ')'
                });

                colorMap[items[i].id] = 'rgb('  + colorArray.join() + ')';
            }

            component.surface.renderFrame();

         }
    }
});
