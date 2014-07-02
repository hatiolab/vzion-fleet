Ext.define('Base.model.Contact', {
    
	extend: 'Ext.data.Model',
    
	fields : [
		{ name : 'id', type : 'integer' },
		{ name : 'name', type : 'string' },
		{ name : 'description', type : 'string' },
		{ name : 'family_name', type : 'string' },
		{ name : 'given_name', type : 'string' },
		{ name : 'company', type : 'string' },
		{ name : 'department', type : 'string' },
		{ name : 'title', type : 'string' },
		{ name : 'email', type : 'string' },
		{ name : 'phone_office', type : 'string' },
		{ name : 'phone_mobile', type : 'string' },
		{ name : 'fax', type : 'string' },
		{ name : 'address', type : 'string' },
		{ name : 'properties_attributes', type : 'auto', defaultValue: [] },
		{ name : 'creator', type : 'auto' },
		{ name : 'updater', type : 'auto' },
		{ name : 'created_at', type : 'date' }, 
		{ name : 'updated_at', type : 'date' },
		{ name : '_cud_flag_', type : 'string' }
	],

	validations : [
		{type : 'presence', field : 'family_name'},
		{type : 'presence', field : 'given_name'}
	],
	
  	proxy: {
		type: 'rest',
		url : 'contacts',
		format : 'json',
	    reader: {
			type: 'json'
        },
        writer: {
			type: 'json',
			root: 'contact'
        }
	}
});