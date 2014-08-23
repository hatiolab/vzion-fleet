/**
 * @class SPECTRUM.model.EL
 * This simple "Expression Language (EL)" provides a way to set and get values
 * under the window variable 'document.<<applicationName>>'. Therefore a '.'-notation is used.
 */
Ext.define('SPECTRUM.model.EL', {
    statics: {

        applicationName: 'spectro',

        get: function(path_) {
            SPECTRUM.Logger.log('get(' + path_ + ')');
            var path = null;
            if (path_) {
                path = SPECTRUM.model.EL.applicationName + '.' + path_;
            } else {
                path = SPECTRUM.model.EL.applicationName;
            }
            var elements = path.split(".");
            var result = document;
            for (var i = 0, len = elements.length; i < len; i++) {
                result = result[elements[i]];
                if (result === undefined || result === null) return null;
            }
            return result;
        },

        set: function(path_, value) {

            SPECTRUM.Logger.log('set(' + path_ + ', ' + value + ')');
            var path = null;
            if (path_) {
                path = SPECTRUM.model.EL.applicationName + '.' + path_;
            } else {
                path = SPECTRUM.model.EL.applicationName;
            }
            var elements = path.split(".");
            var object = document;
            for (var i = 0, len = elements.length; i < (len - 1); i++) {
                var name = elements[i];
                if (!object[name]) {
                    object[name] = new Object();
                }
                object = object[name];
            }
            name = elements[len - 1];
            object[name] = value;
        },

        setIfNullOrUndefined: function(path, value) {
            if (SPECTRUM.model.EL.get(path) == null) {
                SPECTRUM.model.EL.set(path, value);
            }

        },


        clear: function(path) {
            SPECTRUM.model.EL.set(path, null);
        }


    }
});