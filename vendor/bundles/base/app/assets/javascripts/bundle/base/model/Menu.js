Ext.define('Base.model.Menu', {
    
	extend : 'Ext.data.Model',
    
	fields : [
		{ name : 'id', type : 'string' },
		{ name : 'name', type : 'string' },
		{ name : 'description', type : 'string' },
		{ name : 'parent_id', type : 'string' },
		{ name : 'template', type : 'string' },
		{ name : 'menu_type', type : 'string' },
		{ name : 'category', type : 'string' },
		{ name : 'rank', type : 'integer' },
		{ name : 'icon_path', type : 'string' },
		{ name : 'hidden_flag', type : 'boolean' },
		{ name : 'creator', type : 'auto' },
		{ name : 'updater', type : 'auto' },
		{ name : 'created_at', type : 'date' }, 
		{ name : 'updated_at', type : 'date' }, 
		{ name : '_cud_flag_', type : 'string' }
	],
	
	validations : [
		{ type : 'presence',  field : 'name' },
		{ type : 'length',    field : 'name', min : 2, max : 60 },
		{ type : 'length',    field : 'description', max : 255 },
		{ type : 'presence',  field : 'category' },
		{ type : 'inclusion', field : 'category', list : ['STANDARD', 'TERMINAL'] },
		{ type : 'presence',  field : 'menu_type' }
	],
	
  	proxy : {
		type : 'rest',
		url : 'menus',
		format : 'json',
	    reader : {
			type : 'json'
        },
        writer : {
			type : 'json',
			root : 'menu'
        }
	}
});