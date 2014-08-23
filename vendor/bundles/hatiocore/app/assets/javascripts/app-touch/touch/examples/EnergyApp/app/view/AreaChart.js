Ext.define('EnergyApp.view.AreaChart', {
    xtype: 'area',
    extend: 'Ext.chart.Chart',
    config: {
        title: 'Area',
        iconCls: 'area',
        cls: 'chartpanel',
        theme: 'Energy',
        interactions: [
            'reset',
            {
                type: 'panzoom'
            },
            {
                type: 'iteminfo',
                gesture: 'tap',
                listeners: {
                    show: function (interaction, item, panel) {
                        EnergyApp.popup(item, panel);
                    }
                }
            }
        ],
        animate: false,
        store: 'ChartStore',
        axes: [
            {
                type: 'Numeric',
                position: 'right',
                minimum: 0,
                label: {
                    renderer: EnergyApp.commify
                },
                adjustMinimumByMajorUnit: 0,
                fields: ['coal', 'nuclear', 'crude-oil', 'gas', 'renewable'],
                title: 'Million BTUs'
            },
            {
                type: 'Category',
                position: 'bottom',
                fields: ['year'],
                title: 'Year',
                label: {
                    rotate: {
                        degrees: 45
                    }
                }
            }
        ],
        legend: {
            position: Ext.os.is.Phone ? 'left' : 'top'
        },
        series: [
            {
                type: 'area',
                highlight: false,
                title: ['Coal', 'Nuclear', 'Oil', 'Natural Gas', 'Renewable'],
                axis: 'right',
                xField: 'year',
                yField: ['coal', 'nuclear', 'crude-oil', 'gas', 'renewable']
            }
        ],
        listeners: {
            afterrender: function (me) {
                me.on('beforerefresh', function () {
                    if (me.ownerCt.getActiveItem().id !== me.id) {
                        return false;
                    }
                }, me);
            }
        }
    }
});