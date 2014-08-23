Ext.setup({
    tabletStartupScreen: 'tablet_startup.jpg',
    phoneStartupScreen: 'phone_startup.jpg',
    tabletIcon: 'icon-ipad.png',
    phoneIcon: 'icon-iphone.png',
    glossOnIcon: false,
    onReady: function() {
        
        Ext.define('User', {
            extend: 'Ext.data.Model',
            config: {
                fields: ['children', 'leaf', 'data', 'id', 'name']
            }
        });
        
        window.treeStore = new Ext.data.TreeStore({
            model: 'User',
            batchUpdateMode: 'complete',
            proxy: {
                type: 'ajax',
                url: 'src/model.json',
                reader: {
                    type: 'json'
                }
            }
        })
        
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
                        rec.get('data').area += rec.get('data').area * (Math.random() - 0.5) / 2;
                        rec.get('data').area = Math.max(2, rec.get('data').area);
                    }
                    for (i = 0, ch = node.childNodes, l = ch.length; i < l; i++) {
                        randomize(ch[i]);
                    }
                })(root);

                panel.getItems().get(1).getSeries().get(0).drawSeries();
            };
            var chart = new Ext.chart.Chart({
                    themeCls: 'tm1',
                    theme: 'Demo',
                    insetPadding: {
                        top: 10,
                        left: 10,
                        right: 10,
                        bottom: 10
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
                                if (rec) {
                                    panel.updateHtml('<ul><li><b>Name: </b>' + rec.get('name') + '</li><li><b>Amount: </b>' + data.area + 'M USD</li></ul>');
                                }
                            }
                        }
                    }],
                    series: [{
                        type: 'sunburst',
                        highlight: true,
                        rootName: '2012 Budget Proposal',
                        titleField: 'name',
                        spanField: function(node) {
                            // TODO: Why getRecord(node.storeItem).get('data') could be null?
                            return node && node.storeItem && getRecord(node.storeItem) && getRecord(node.storeItem).get('data') ? getRecord(node.storeItem).get('data').area : 1;
                        },
                        areaField: function(node) {
                          return getRecord(node) && getRecord(node).get('data') ? getRecord(node).get('data').area : 1; 
                        },
                        colorField: function(node) {
                            return getRecord(node.storeItem) && getRecord(node.storeItem).get('data') ? (getRecord(node.storeItem).get('data').color || getRecord(node.storeItem.childNodes[0]).get('data').color) : '#555'; 
                        }
                    }]
                });
            var panel = new Ext.chart.Panel({
                fullscreen: true,
                title: '2012 Budget Proposal',
                padding: 0,
                buttons: [{
                  xtype: 'button',
                  iconCls: 'shuffle',
                  iconMask: true,
                  ui: 'plain',
                  handler: reload
                }],
                chart: chart
            });
        }
    }
});
