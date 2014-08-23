Ext.define('SPECTRUM.view.Viewport', {
    extend: 'Ext.container.Viewport',

    requires: [
        'Ext.panel.*',
        'Ext.layout.container.Table',
        'Ext.layout.container.Border',
        'SPECTRUM.view.chart.SpectrumPanel',
        'SPECTRUM.view.chart.Spectrum'
    ],
    layout: 'fit',
    items:{
        title: 'Spectrum',
        xtype: 'enpasosSpectrumPanel'
    }

});

