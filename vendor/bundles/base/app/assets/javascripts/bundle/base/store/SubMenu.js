Ext.define('Base.store.SubMenu', {
	
	extend : 'Ext.data.Store',
	
	requires: 'Base.model.Menu',
	
	model : 'Base.model.Menu',
	
	autoLoad : false,
	
	remoteFilter : true,
	
	remoteSort : true,
	
	proxy : {
		type: 'rest',
		url : 'menus',
		format : 'json',
	    reader: {
			type: 'json',
			root: 'items',
			successProperty : 'success',
			totalProperty : 'total'
        },
        writer: {
			type: 'json'
        }
	},
	
	sorters: [{
		property: 'rank',
		direction: 'ASC'
	}]
});
