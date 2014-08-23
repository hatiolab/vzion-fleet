Ext.application({
    name: 'SPECTRUM',

    autoCreateViewport: false,

    requires: [
        'SPECTRUM.view.Viewport',
        'SPECTRUM.model.EL',
        'SPECTRUM.Logger'
    ],


    controllers: [ 'SpectrumC'],


    launch: function() {
        SPECTRUM.app = this;

        this.getController('SpectrumC').start();
        this.viewport = Ext.create('SPECTRUM.view.Viewport');

    }

});
