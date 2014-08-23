Ext.ns('StatesMVC.views');
Ext.define('StatesMVC.views.Viewport', {
    extend: 'Ext.Panel',
    config: {
        fullscreen: true
    },

    statics: {
        defaultItems: {
            ui: 'plain',
            xtype: 'panel',
            height: '2.6em',
            docked: 'top',
            activeItem: 0,
            items: {
                docked: 'top',
                xtype: 'toolbar',
                ui: 'light',
                title: '2010 Census Data - USA'
            }
        }
    },

    constructor: function (config) {
        config.items = StatesMVC.views.Viewport.defaultItems;
        config.layout = 'fit';
        this.callParent([config]);
    },

    initialize: function () {

        this.callParent(arguments);
        var me = this;

        var initAll = function () {
            var i = 0,
                j = 0,
                states = StatesMVC.data.StatesGeometry,
                statesData = StatesMVC.data.StatesData,
                l = states.length,
                lp = 0,
                max = Number.MIN_VALUE,
                min = Number.MAX_VALUE,
                state, prop, pathArray,
                barChartData = [];

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
                    'stroke-width': 1.5,
                    path: pathArray
                });
            }

            for (prop in statesData) {
                barChartData.push({
                    name: prop,
                    population: +statesData[prop].POP100
                });
            }

            barChartData.sort(function (b, a) {
                var aname = a.name,
                    bname = b.name;

                if (bname > aname) {
                    return 1;
                } else if (bname < aname) {
                    return -1;
                }

                return 0;
            });
            StatesMVC.stores.barStore.setData(barChartData);

            var statisticsPanel = new StatesMVC.views.Statistics();

            me.add(statisticsPanel);
        };
        // let's get some data
        Ext.Ajax.request({
            url: 'app/data/states_geo.json',
            success: function (response) {
                StatesMVC.data.StatesGeometry = JSON.parse(response.responseText);

                Ext.Ajax.request({
                    url: 'app/data/states_data.json',
                    success: function (response) {
                        StatesMVC.data.StatesData = JSON.parse(response.responseText);
                        initAll();
                    },
                    failure: function () {
                        console.log('something went wrong');
                    }
                });

            },
            failure: function () {
                console.log('something went wrong');
            }
        });

    }
});

Ext.ns('StatesMVC.data');