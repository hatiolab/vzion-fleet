Ext.define('Base.model.User', {
	extend : 'Ext.data.Model',
	
	fields : [ {
		name : 'id', type : 'string'
	}, {
		name : 'login', type : 'string'
	}, {
		name : 'email', type : 'string'
	}, {
		name : 'name', type : 'string'
	}, {
		name : 'password', type : 'string'
	}, {
		name : 'password_confirmation', type : 'string'
	}, {
		name : 'admin_flag', type : 'boolean'
	}, {
		name : 'timezone', type : 'string'
	}, {
		name : 'locale', type : 'string'
	}, {
		name : 'operator_flag', type : 'boolean'
	}, {
		name : 'active_flag', type : 'boolean'
	}, {
		name : 'updater', type : 'auto'
	}, {
		name : 'updated_at', type : 'date'
	} ],
	
	validations : [
		{ type : 'presence',  field : 'login' },
		{ type : 'presence',  field : 'name' },		
		{ type : 'length',    field : 'name', min : 2, max : 16 },
		{ type : 'length',    field : 'name', min : 2, max : 60 },
		{ type : 'presence',  field : 'email' },
		{ type : 'email',     field : 'email' },
		{ type : 'length',    field : 'email', max : 255 }
	],
	
  	proxy : {
		type : 'rest',
		url : 'users',
		format : 'json',
	    reader : {
			type : 'json'
        },
        writer : {
			type : 'json',
			root : 'user'
        }
	}
});