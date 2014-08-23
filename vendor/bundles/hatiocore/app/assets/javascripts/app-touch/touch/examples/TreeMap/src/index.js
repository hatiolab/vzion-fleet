Ext.setup({
    tabletStartupScreen: 'tablet_startup.jpg',
    phoneStartupScreen: 'phone_startup.jpg',
    tabletIcon: 'icon-ipad.png',
    phoneIcon: 'icon-iphone.png',
    glossOnIcon: false,
    onReady: function() {
        
        Ext.define('User', {
            extend: "Ext.data.Model",
            config: {
                fields: ['children', 'leaf', 'data', 'id', 'name']
            }
        });
        
        treeStore = new Ext.data.TreeStore({
            model: 'User',
            batchUpdateMode: 'complete',
            proxy: {
                type: 'ajax',
                url: 'src/model.json',
                reader: {
                    type: 'json',
                    rootProperty: 'children'
                }
            }
        });

        treeStore.load({
          callback: callback
        });

        function callback() {

            var getRecord = function(item) {
                return item;
            };

            var reload = function() {
                var root = treeStore.getRoot();

                (function randomize(node) {
                    var i, l, ch, rec = getRecord(node);
                    if (rec && rec.get('data')) {
                        rec.get('data').area = 5 + (Math.random() * (25 - 5)) >> 0;
                    }
                    for (i = 0, ch = node.childNodes, l = ch.length; i < l; i++) {
                        randomize(ch[i]);
                    }
                })(root);

                panel.items.get(1).series.get(0).drawSeries();
            };

            var switchLayout = function(name) {
                if (name == 'SliceAndDice') {
                    return function() {
                        var chart = panel.getItems().get(1),
                            series = chart.getSeries().get(0);
                        Ext.apply(series, Ext.chart.series.Treemap.Layout.SliceAndDice);
                        series.renderInner = Ext.chart.series.Treemap.prototype.renderInner;
                        if (series.layout == 'sliceanddice') {
                            series.orientation = series.orientation == 'horizontal' ? 'vertical' : 'horizontal';
                        } else {
                            series.layout = 'sliceanddice';
                            series.orientation = 'horizontal';
                        }
                        series.drawSeries();
                    };
                } else if (name == 'Squarified') {
                    return function() {
                        var chart = panel.getItems().get(1),
                            series = chart.getSeries().get(0);
                        Ext.apply(series, Ext.chart.series.Treemap.Layout.Squarified);
                        series.renderInner = Ext.chart.series.Treemap.prototype.renderInner;
                        series.layout = 'squarified';
                        series.drawSeries();
                    };
                } else if (name == 'Icicle') {
                    return function() {
                        var chart = panel.getItems().get(1),
                            series = chart.getSeries().get(0);
                        Ext.apply(series, Ext.chart.series.Icicle.Layout.Icicle);
                        series.renderInner = Ext.chart.series.Icicle.prototype.renderInner;
                        if (series.layout == 'icicle') {
                            series.orientation = series.orientation == 'horizontal' ? 'vertical' : 'horizontal';
                        } else {
                            series.layout = 'icicle';
                            series.orientation = 'horizontal';
                        }
                        series.drawSeries();
                    };
                } 
            };
            var chart = new Ext.chart.Chart({
                    themeCls: 'tm1',
                    theme: 'Demo',
                    insetPadding: {
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0
                    },
                    store: treeStore,
                    animate: true,
                    background: {
                        fill: '#000'
                    },
                    interactions: [{
                        type: 'iteminfo',
                        panel: {
                            dockedItems: [{
                                docked: 'top',
                                xtype: 'toolbar',
                                title: 'Details'
                            }]
                        },
                        listeners: {
                            show: function(me, item, panel) {
                                var rec = getRecord(item.storeItem),
                                    data = rec.get('data');
                                if (rec && data) {
                                    panel.setHtml('<ul><li><b>Name: </b>' + rec.get('name') + '</li><li><b>Amount: </b>' + data.area + 'M USD</li></ul>');
                                }
                            }
                        }
                    }],
                    series: [{
                        type: 'treemap',
                        layout: 'squarified',
                        orientation: 'horizontal',
                        highlight: true,
                        titleHeight: 13,
                        offset: 0.5,
                        rootName: '2012 Budget Proposal',
                        titleField: 'name',
                        lengthField: function(node) {
                            return node && node.get('data') ? node.get('data').area : 1;
                        },
                        areaField: function(node) { 
                          return getRecord(node) && getRecord(node).get('data') ? getRecord(node).get('data').area : 1; 
                        },
                        colorField: function(node) {
                            if (node.series.layout == 'icicle') {
                                return getRecord(node.storeItem) && getRecord(node.storeItem).get('data') ? (getRecord(node.storeItem).get('data').color || getRecord(node.storeItem.childNodes[0]).get('data').color) : '#558'; 
                            } else {
                                return getRecord(node.storeItem) && getRecord(node.storeItem).get('data') ? (getRecord(node.storeItem).get('data').color || '#555') : '#555'; 
                            }
                        }
                    }]
                });
                
            var panel = new Ext.chart.Panel({
                fullscreen: true,
                title: '2012 Budget Proposal',
                padding: 0,
                buttons: [{
                    xtype: 'button',
                    text: 'Squarified',
                    iconMask: true,
                    ui: 'plain',
                    handler: switchLayout('Squarified')
                }, {
                    xtype: 'button',
                    text: 'Slice and Dice',
                    iconMask: true,
                    ui: 'plain',
                    handler: switchLayout('SliceAndDice')
                }, {
                    xtype: 'button',
                    text: 'Icicle',
                    iconMask: true,
                    ui: 'plain',
                    handler: switchLayout('Icicle')
                }],
                chart: chart
            });
        }

    }
});
