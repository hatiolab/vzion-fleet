Ext.define('Base.model.Infographic', {
    
	extend : 'Ext.data.Model',
    
	fields : [
		{ name : 'id', type : 'string' },
		{ name : 'name', type : 'string' },
		{ name : 'description', type : 'string' },
		{ name : 'infographic_type', type : 'string' },
		{ name : 'printer_type', type : 'string' },
		{ name : 'diagram', type : 'string' },
		{ name : 'print_command', type : 'string' },
		{ name : 'properties_attributes', type : 'auto', defaultValue : [] },
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
		{ type : 'presence',  field : 'infographic_type' }
	],
	
  	proxy : {
		type : 'rest',
		url : 'infographics',
		format : 'json',
	    reader : {
			type : 'json'
        },
        writer : {
			type : 'json',
			root : 'infographic'
        }
	}
});