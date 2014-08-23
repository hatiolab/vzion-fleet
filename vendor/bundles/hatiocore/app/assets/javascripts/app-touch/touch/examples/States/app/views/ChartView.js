Ext.define('StatesMVC.views.Geometry', {
    extend: 'Ext.Panel',
    cls: 'race',
    config: {
        flex: 1,
        layout: 'fit',
        items: []
    },
    geometryComponent: {},
    initialize: function(){
        this.callParent();
        var me = this;

        var geometryComponent = me.geometryComponent = new Ext.draw.Component({
            ui: 'light',
            viewBox: true,
            width: 950 / 1.5,
            height: 600 / 1.5,
            items: StatesMVC.data.StatesGeometry
        });
        geometryComponent.on({
            tap: me.selectElement,
            scope: me
        });

        me.add(geometryComponent);
        me.transitionData(geometryComponent, StatesMVC.data.StatesData, 'POP100');
        me.selectElement({
            event: {
                pageX: 221,
                pageY: 36
            }
        });
        geometryComponent.surface.dirt();
        geometryComponent.surface.renderFrame();
    },

    selectElement: function(e){
        var p = e && Ext.util.Point.fromEvent(e.event) || { x: 221, y: 36 },
            me = this,
            states = StatesMVC.data.StatesGeometry,
            statesData = StatesMVC.data.StatesData,
            countyData,
            lastSelection = me.lastSelection,
            selection,
            doUpdate,
            i = 0,
            l = states.length,
            surface = me.geometryComponent.surface,
            items = surface.getItems().items,
            region = surface.getRegion(),
            item, bbox, fillColor = '#dd8';

        p.x -= region.left;
        p.y -= region.top;
        for (; i < l; i++) {
            item = items[i];
            bbox = (item.bbox && item.bbox.transform) || item.getBBox();

            if (p.x >= bbox.x && p.x <= bbox.x + bbox.width &&
                p.y >= bbox.y && p.y <= bbox.y + bbox.height &&
                me.pointInPath(p.x, p.y, item.attr.path)) {
                selection = item;
                break;
            }
        }
        if (selection != me.lastSelection) {
            me.lastSelection = selection;
            if (selection == lastSelection) {
                return;
            }
            if (lastSelection && lastSelection.beforeColor) {
                lastSelection.setAttributes({
                    fill: lastSelection.beforeColor
                });
                surface.renderSprite(lastSelection);
                delete lastSelection.beforeColor;
            }
            if (selection) {


                if (!selection.beforeColor) {
                    selection.beforeColor = selection.attr.fill;
                }
                selection.setAttributes({
                    fill: '#dd8'
                });

                surface.renderSprite(selection);
                selection = selection;
                surface.dirty = false;
                countyData = statesData[selection.id];
                StatesMVC.stores.pieStore.setData(countyData.race);
                StatesMVC.stores.pyramidStore.setData(countyData.sex_by_age);
                StatesMVC.views.viewport.getItems().get(0).getItems().get(0).setTitle('2010 Census Data - ' + statesData[selection.id].NAME);
            }
        }
    },
    pointInPath: function(x, y, path) {
        var parts = [], polies = [], poly, l = path.length, i = 0;
        polies  = [];
        for (; i < l; i++) {
            switch(path[i]) {
                case 'L':
                    poly.push([path[++i], path[++i]]);
                    break;
                case 'M':
                    polies.push(poly = []);
                    poly.push([path[++i], path[++i]]);
                    break;
                case 'z':
                    poly.push(poly[0]);
                    break;
                case 'C':
                    poly.push([path[++i], path[++i]]);
                    poly.push([path[++i], path[++i]]);
                    poly.push([path[++i], path[++i]]);
                    break;
            }
        }
        parts = [];
        for (i = 0, l = polies.length; i < l; i++) {
            parts = parts.concat(polies[i]);
        }
        for(i = l - 2; i > 0; i--) {
            parts.push(polies[i][0]);
        }
        return this.pointInPolygon(x, y, parts);
    },
    
    pointInPolygon: function(x, y, poly) {
          var conj = 0,
              i = 0,
              l = poly.length, startX, startY, stopX, stopY, k, cx;

        for (i = 0; i < l; i++) {
            startX = poly[i][0];
            startY = poly[i][1];

            stopX = (poly[i + 1] || poly[0])[0];
            stopY = (poly[i + 1] || poly[0])[1];

            if (startY >= y && stopY < y ||
                startY <= y && stopY > y) {
                // find inverse k
                k = (stopX - startX) / (stopY - startY);
                cx = (y - startY) * k + startX;
                if (cx > x) {
                    conj++;
                }
            }
        }
        return (conj % 2) !== 0;
    },
    transitionData: function(component, data, prop) {
        var i = 0,
            items = component.surface.getItems().items,
            l = items.length,
            min = Number.MAX_VALUE,
            max = Number.MIN_VALUE,
            item, dataItem, value, colorArray, p, id,
            color = {
                from: [49, 130, 189],
                to: [222, 235, 247]
            }, colorMap = {};

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
        StatesMVC.colorMap = colorMap;
    }
});

Ext.define('StatesMVC.views.Statistics',{
    extend: 'Ext.Panel',
    config: {
        items: []
    },

    constructor: function (config) {
        config = config || {};
        var me = this,
            colorSet = ['rgb(8, 69, 148)',
                        'rgb(33, 113, 181)',
                        'rgb(66, 146, 198)',
                        'rgb(107, 174, 214)',
                        'rgb(158, 202, 225)',
                        'rgb(198, 219, 239)',
                        'rgb(222, 235, 247)'],
            countyPanel, barChart, pieChart, pyramidChart;
        countyPanel = new StatesMVC.views.Geometry();
        pieChart = new Ext.chart.Panel({
            ui: 'plain',
            cls: 'race',
            title: 'Race Distribution',
            width: 315,
            height: 315,
            chart: {
                animate: true,
                shadow: false,
                store: StatesMVC.stores.pieStore,
                series: [{
                    type: 'pie',
                    donut: 15,
                    field: 'value',
                    highlight: false,
                    colorSet: colorSet,
                    listeners: {
                        'labelOverflow': function(label, item) {
                            item.useCallout = true;
                        }
                    },
                    label: {
                        field: 'name',
                        display: 'rotate',
                        contrast: true
                    }
                }]
            }
        });
        pyramidChart = new Ext.chart.Panel({
            ui: 'plain',
            cls: 'race',
            title: 'Gender Distribution',
            width: 315,
            height: 315,
            chart: {
                animate: true,
                shadow: false,
                showInLegend: true,
                store: StatesMVC.stores.pyramidStore,
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
        barChart = new Ext.chart.Panel({
            ui: 'plain',
            cls: 'race',
            title: 'Population Distribution',
            width: 640,
            height: 150,
            chart: {
                animate: true,
                shadow: false,
                showInLegend: false,
                store: StatesMVC.stores.barStore,
                axes: [{
                    type: 'Category',
                    position: 'bottom',
                    title: 'State',
                    fields: 'name',
                    label: {
                        renderer: function(v) {
                            return v;
                        },
                        field: 'name',
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
                        if (StatesMVC.colorMap[storeItem.data.name]) {
                            attr.fill = StatesMVC.colorMap[storeItem.data.name];
                        }
                        return attr;
                    }
                }]
            }
        });
        config.items = {
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            items: [
                {
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    width: 640,
                    items: [
                        barChart,
                        countyPanel
                    ]
                }, {
                    flex: 1
                },
                {
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
//                    width: 325,
                    items: [
                        pyramidChart,
                        pieChart
                    ]
                }
            ]
        };
        config.layout = 'fit';
        me.callParent([config]);
    },
    initialize: function(){
        this.callParent(arguments);
    }
});
