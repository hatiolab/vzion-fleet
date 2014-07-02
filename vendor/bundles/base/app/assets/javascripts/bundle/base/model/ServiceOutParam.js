Ext.define('Base.model.ServiceOutParam', {
    
	extend: 'Ext.data.Model',
    
	fields: [
		{ name : 'id', type : 'string' },
		{ name : 'resource_type', type : 'string'},
		{ name : 'resource_id', type : 'string'},
		{ name : 'name', type : 'string' },
		{ name : 'description', type : 'string' },
		{ name : 'rank', type : 'integer' },
		{ name : '_cud_flag_', type : 'string' }
	]
});