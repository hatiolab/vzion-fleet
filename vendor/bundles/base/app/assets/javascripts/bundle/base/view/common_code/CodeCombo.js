Ext.define('Base.view.common_code.CodeCombo', {
	extend : 'Ext.form.field.ComboBox',
	
	xtype : ['codecombo', 'codecolumneditor'],

    anchor: '100%',
	
	editable : false,

	config : {
		valueField : 'name',
		displayField : 'name',

		queryMode : 'local',
		
	    minChars: 1, 
	    typeAhead: true,
		triggerAction : 'all'
	},
	
    listConfig: {
        loadingText: T('text.Searching...'),
        emptyText: T('text.No matching data found'),
        itemTpl : '<div><span>{name}</span>{description}&nbsp;</div>',
		minWidth : 200
    },

	initComponent : function() {
		this.callParent();

		this.bindStore(HF.code_store(this.commonCode));
	}
});