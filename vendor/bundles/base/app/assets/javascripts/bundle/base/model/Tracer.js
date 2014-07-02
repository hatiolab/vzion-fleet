Ext.define('Base.model.Tracer', {
	extend : 'Ext.data.Model',
	
	fields : [{
		name : 'issued_by'
	}, {
		name : 'severity'
	}, {
		name : 'message'
	}, {
		name : 'source_class'
	}, {
		name : 'source_method'
	}, {
		name : 'source_file'
	}, {
		name : 'source_line'
	}, {
		name : 'trace'
	}, {
		name : 'request_uri'
	}, {
		name : 'request_params'
	}, {
		name : 'server_throwable_type'
	}, {
		name : 'server_throwable_message'
	}, {
		name : 'server_throwable_trace'
	}, {
		name : 'issued_at',
		type : 'date',
		dateFormat : 'time'
	}]
});