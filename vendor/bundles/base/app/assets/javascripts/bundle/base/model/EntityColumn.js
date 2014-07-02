Ext.define('Base.model.EntityColumn', {
    
	extend: 'Ext.data.Model',
    
	fields : [ {
		name : 'id', type : 'string'
	}, {
		name : 'entity_id', type : 'string'
	}, {
		name : '_cud_flag_', type : 'string'
	}, {
		name : 'name', type : 'string'
	}, {
		name : 'description', type : 'string'
	}, {
		name : 'pk', type : 'boolean'
	}, {
		name : 'column_type', type : 'string'
	}, {
		name : 'ref_type', type : 'string'
	}, {
		name : 'ref_name', type : 'string'
	}, {
		name : 'editable', type : 'boolean'
	}, {
		name : 'list_rank', type : 'integer'
	}, {
		name : 'search_rank', type : 'integer'
	}, {
		name : 'sort_rank', type : 'integer'
	}, {
		name : 'reverse_sort', type : 'boolean'
	}, {
		name : 'display_rank', type : 'integer'
	} ],
	
	validations : [
		{ type : 'presence',  field : 'name' },
		{ type : 'length',    field : 'description', max : 255 }
	],		
});