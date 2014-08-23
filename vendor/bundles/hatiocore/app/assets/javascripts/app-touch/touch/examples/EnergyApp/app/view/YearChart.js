Ext.define('EnergyApp.view.YearChart', {
    xtype: 'year',
    extend: 'Ext.Panel',
    config: {
        title: 'Yearly',
        iconCls: 'line',
        cls: 'chartpanel',
        layout: {
            type: 'hbox',
            align: 'stretch'
        },
        items: [
            {
                docked: 'bottom',
                xtype: 'toolbar',
                height: 70,
                items: [
                    {
                        xtype: 'component',
                        cls: ['yearlabel', 'x-title'],
                        html: '1960'
                    },
                    {
                        flex: 1,
                        ui: 'light',
                        id: 'mySlider',
                        xtype: 'slider',
                        name: 'year',
                        // TODO: wait for touch team to allow minValue > 0
                        maxValue: 2009 - 1960,
                        minValue: 0,
                        value: 2009 - 1960,
                        listeners: {
                            change: function (slider) {
                                var value = slider.getValue()[0] + 1960;
                                Ext.getCmp('yearToolbar').setTitle('Data For ' + value);
                                EnergyApp.loadPieAtYear(value);
                            },
                            drag: function (slider, thumb, value) {
                                value = value[0] + 1960;
                                Ext.getCmp('yearToolbar').setTitle('Data For ' + value);
                                EnergyApp.loadPieAtYear(value);
                            }
                        }
                    },
                    {
                        xtype: 'component',
                        cls: ['yearlabel', 'x-title'],
                        html: '2009'
                    }
                ]
            },
            {
                id: 'yearToolbar',
                docked: 'bottom',
                xtype: 'toolbar',
                title: 'Data For 2009'
            },
            {
                flex: 1,
                xtype: 'chart',
                theme: 'Energy',
                themeCls: 'radar',
                store: "YearStore",
                shadow: false,
                animate: true,
                interactions: [
                    {
                        type: 'iteminfo',
                        listeners: {
                            show: function (interaction, item, panel) {
                                EnergyApp.popupYear(item, panel);
                            }
                        }
                    },
                    'rotate',
                    'reset'
                ],
                axes: [
                    {
                        steps: 5,
                        type: 'Radial',
                        position: 'radial',
                        label: {
                            renderer: function (v) {
                                if (isNaN(v)) {
                                    return v;
                                } else {
                                    return EnergyApp.commify(v) + "M";
                                }
                            }
                        }
                    }
                ],
                series: [
                    {
                        type: 'radar',
                        xField: 'type',
                        yField: 'data'
                    }
                ],
                listeners: {
                    afterrender: function (me) {
                        me.on('beforerefresh', function () {
                            if (me.ownerCt.ownerCt.ownerCt.getActiveItem().id !== me.ownerCt.ownerCt.id) {
                                return false;
                            }
                        }, me);
                    }
                }
            },
            {
                flex: 1,
                xtype: 'chart',
                store: "YearStore",
                shadow: false,
                animate: true,
                insetPadding: 30,
                interactions: [
                    {
                        type: 'rotate'
                    },
                    {
                        type: 'iteminfo',
                        listeners: {
                            show: function (interaction, item, panel) {
                                EnergyApp.popupYear(item, panel);
                            }
                        }
                    }
                ],
                series: [
                    {
                        type: 'pie',
                        field: 'data',
                        interactions: ['rotate', 'reset'],
                        highlight: false,
                        label: {
                            field: 'type',
                            display: 'rotate',
                            contrast: true,
                            font: '12px Arial'
                        },
                        listeners: {
                            'labelOverflow': function (label, item) {
                                item.useCallout = true;
                            }
                        },
                        callouts: {
                            renderer: function (callout, storeItem) {
                                callout.label.setAttributes({
                                    text: storeItem.get('type')
                                }, true);
                            },
                            filter: function () {
                                return false;
                            },
                            lines: {
                                'stroke-width': 2,
                                offsetFromViz: 20
                            },
                            label: {
                                font: '12px Arial',
                                fill: '#fff'
                            }
                        }
                    }
                ],
                listeners: {
                    afterrender: function (me) {
                        me.on('beforerefresh', function () {
                            if (me.ownerCt.ownerCt.ownerCt.getActiveItem().id !== me.ownerCt.ownerCt.id) {
                                return false;
                            }
                        }, me);
                    }
                }
            }
        ]
    }
});