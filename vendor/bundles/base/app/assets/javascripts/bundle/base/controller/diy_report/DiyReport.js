/**
 * DiyReport controller
 */
Ext.define('Base.controller.diy_report.DiyReport', {
	
	extend: 'Frx.controller.ListController',
	
	requires : [ 
		'Base.model.DiyReport', 
		'Base.store.DiyReport', 
		'Base.view.diy_report.DiyReport' 
	],
		
	models : ['Base.model.DiyReport'],
			
	stores: ['Base.store.DiyReport'],
	
	views : ['Base.view.diy_report.DiyReport'],
	
	init: function() {
		this.callParent(arguments);
		
		this.control({
			'base_diy_report' : this.EntryPoint(),
			'base_diy_report #goto_item' : {
				click : this.onGotoItem
			}
		});
	},
	
	/**
	 * created, updated, deleted records를 한꺼번에 생성, 수정, 삭제한다.  
	 *
	 * @grid
	 * @records
	 */
	updateList : function(grid, records) {		
		Ext.Array.each(records, function(record) {
			delete record["service_url"];
			delete record["service_in_params"];
			delete record["service_out_params"];
		});
		
		this.callParent(arguments);
	},	
});