Ext.define('Base.view.common_code.CodeSearchCombo', {
	
	extend : 'Ext.form.FieldContainer',
	
	xtype : ['codesearchcombo'],

	layout : 'hbox',
	
	editable : false,

	defaults : {
		flex : 1,
		hideLabel : true
	},
	
	initComponent : function() {		
		this.items = [ {
			xtype : 'codecombo',
			name : this.name,
			commonCode : this.commonCode,
			margin : '0 5 0 0',
			displayField : this.displayField,
			valueField : this.valueField,
			editable : this.editable,
			flex : 1
		}, {
			xtype : 'textfield',
			name : this.name + '-desc',
			disabled : true,
			flex : 1
		} ];

		this.callParent();
		
		var codeCombo = this.down(' codecombo');
		var codeValueText = this.down(' textfield');
		var codeDescText = this.down(' textfield[name=' + this.name + '-desc]');
		
		codeValueText.on('specialkey', function(field, e, eOpts) {
			if(e.DELETE) {
				codeDescText.setValue('');
			}
		});		
		
		codeCombo.on('select', function(me, record) {
			if(codeDescText) {
				codeDescText.setValue(record[0].data.description);
			}
		});
	}
});
