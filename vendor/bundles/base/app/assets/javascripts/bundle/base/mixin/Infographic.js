Ext.define('Base.mixin.Infographic', {
	constructor : function(config) {
		var infographicbar;
		
		function showInfographic(infographic) {
			if (!infographicbar) {
				infographicbar = document.createElement('div');
				infographicbar.style.display = 'none';
				document.body.appendChild(infographicbar);	
			}

			$.colorbox({
				inline : true,
				href : $(infographicbar),
				onLoad : function() {
					var v = new Delo.Viewer({
						el : infographicbar,
					    collection : new Delo.Document()
					});
			
					v.collection.load(infographic.diagram);

					infographicbar.style.display = 'block';
				},
				onCleanup : function() {
					infographicbar.style.display = 'none';
					$(infographicbar).empty();
				}
			});
		}
		
		return {
			infographic : showInfographic
		};
	}
});
