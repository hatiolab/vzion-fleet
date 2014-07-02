Ext.define('<%= @bundle %>.model.<%= class_name %>', {
    
	extend : 'Ext.data.Model',
    
	<%= Hatio::Generators::ResourceViewUtil.generateModelFields(@columns, "\t\t") %>,
	
  	proxy : {
		type : 'rest',
		url : '<%= table_name %>',
		format : 'json',
	    reader : {
			type : 'json'
        },
        writer : {
			type : 'json',
			root : '<%= singular_name %>'
        }
	}
});