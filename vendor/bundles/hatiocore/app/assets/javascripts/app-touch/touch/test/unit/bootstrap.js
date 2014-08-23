(function() {
    var rootPath =  '../../', 
        bootstrap;

    bootstrap = this.TestBootstrap = {
        rootPath: rootPath,

        disableCaching: !(/[?&](?:cache|disableCacheBuster)\b/i).test(location.search) &&
            !/(^|[ ;])ext-cache=1/.test(document.cookie),
        
        cacheBuster: function() {
            return ((this.disableCaching) ? ('?' + (new Date()).getTime()) : '');
        },
        
        loadScript: function(path) {
            document.write('<script type="text/javascript" src="' + rootPath + path + this.cacheBuster() + '"></script>');
        },
       
        loadSpecs: function(callback) {
            bootstrap.afterAllSpecsAreLoaded = callback;
            bootstrap.pendingSpecs = 0;
            bootstrap.loadedSpecs = 0;
            Ext.Array.each(ExtSpecs, function(spec) {
                bootstrap.pendingSpecs++;
                Ext.Loader.injectScriptElement(spec + bootstrap.cacheBuster(), bootstrap.afterSpecLoad, bootstrap.afterSpecLoad, bootstrap);
            });
        },
        
        afterSpecLoad: function() {
            bootstrap.loadedSpecs++;
            if (bootstrap.loadedSpecs == bootstrap.pendingSpecs) {
                bootstrap.afterAllSpecsAreLoaded();
            }
        }
    };

    bootstrap.loadScript('../testreporter/deploy/testreporter/jasmine.js');
    bootstrap.loadScript('test/unit/data.js');
    bootstrap.loadScript('sencha-touch.js');
    bootstrap.loadScript('touch-charts.js');
})();
