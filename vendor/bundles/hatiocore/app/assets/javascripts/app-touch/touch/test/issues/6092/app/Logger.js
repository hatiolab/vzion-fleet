Ext.define('SPECTRUM.Logger', {
    statics: {
        log: function(arg) {
            if (window.console && window.console.log) {
                window.console.log(arg);
            }
        }
    }
});