Ext.setup({
    tabletStartupScreen: 'tablet_startup.jpg',
    phoneStartupScreen: 'phone_startup.jpg',
    tabletIcon: 'icon-ipad.png',
    phoneIcon: 'icon-iphone.png',
    glossOnIcon: false,
    requires: ['Ext.chart.Panel',
            'Ext.chart.axis.Numeric',
            'Ext.chart.axis.Category',
            'Ext.chart.series.Scatter',
            'Ext.draw.engine.ImageExporter'],
        onReady: function() {
        window.generateData = function() {
            var delta = arguments[0],
                l = arguments.length,
                data = [],
                i, j,
                rec;
            for (i = -1; i <= 1; i += delta) {
                rec = {
                    x: i
                };
                for (j = 1; j < l; ++j) {
                    rec['data' + j] = arguments[j](i);
                }
                data.push(rec);
            }
            return data;
        };

        var fn = [
            function(x) { return Math.sin(5 * x); },
            function(x) { return x * x * 2 - 1; },
            function(x) { return Math.sqrt((1 + x) / 2) * 2 - 1; },
            function(x) { return Math.random() * 2 - 1; },
            function(x) { return x * x * x; },
            function(x) { return x * x * x - x; },
            function(x) { return Math.cos(10 * x); },
            function(x) { return Math.random() * 2 - 1; }
        ];

        var ct = 0.04,
            delay = 10,
            i = 0, l;

        window.store1 = new Ext.data.JsonStore({
            fields: ['x', 'data1'],
            data: generateData(ct, fn[0])
        });

        var onRefreshTap = function() {
            window.store1.setData(generateData(ct, fn[++i % fn.length]));
        };
            
        var chart = new Ext.chart.Chart({
                themeCls: 'scatter1',
                theme: 'Demo',
                animate: true,
                store: store1,
                insetPadding: {
                  left: 5,
                  top: 5,
                  bottom: 5,
                  right: 5
                },
                maxGutter: [10, 10],
                axes: [{
                    type: 'Numeric',
                    position: 'left',
                    fields: ['data1'],
                    title: 'f(x)'
                }, {
                    type: 'Numeric',
                    position: 'bottom',
                    fields: ['x'],
                    title: 'x'
                }],
                series: [{
                    type: 'column',
                    markerConfig: {},
                    axis: ['left', 'bottom'],
                    xField: 'x',
                    yField: 'data1',
                    renderer: function(sprite, storeItem, attr, i, store) {
                        var val = Math.abs(storeItem.get('data1'));
                        attr.opacity = val < 0.01 ? 0 : val;
                        return attr;
                    }
                }]
            });

        //Add a nice delay effect.
        if (delay) {
            setTimeout(function() {
                var series = chart.getSeries().get(0),
                    items = series.items,
                    l = items.length,
                    i = 0, item;
                    for (; i < l; ++i) {
                        item = items[i];
                        if (item.sprite) {
                            item.sprite.fx.setDelay(i * delay);
                        }
                    }
            }, 1500);
        }

        new Ext.chart.Panel({
            title: 'Plots y = f(x)',
            fullscreen: true,
            buttons: [{
                xtype: 'button',
                iconCls: 'shuffle',
                iconMask: true,
                ui: 'plain',
                handler: onRefreshTap,
                docked: 'right'
            }],
            chart: chart
        });
    }
});
