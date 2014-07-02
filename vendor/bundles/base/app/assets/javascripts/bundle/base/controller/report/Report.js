/**
 * Report controller
 */
Ext.define('Base.controller.report.Report', {
	
	extend: 'Frx.controller.ListController',
	
	mixins : {
		slideshow : 'Base.mixin.lifecycle.ListSlideShow'
	},
	
	requires : [ 
		'Base.model.Report', 
		'Base.store.Report', 
		'Base.view.report.Report' 
	],
	
	models : ['Base.model.Report'],
			
	stores: ['Base.store.Report'],
	
	views : ['Base.view.report.Report'],
	
	refs: [ { ref : 'Report', selector : 'base_report' } ],
	
	init: function() {
		this.callParent(arguments);
		
		this.control({
			'base_report' : this.EntryPoint(),
			'base_report #goto_item' : {
				click : this.onGotoItem
			},
			'base_report #slideshow' : {
				click : this.onSlideShow
			}
		});
	}

});