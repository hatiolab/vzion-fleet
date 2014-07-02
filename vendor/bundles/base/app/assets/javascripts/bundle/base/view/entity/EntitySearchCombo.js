Ext.define('Base.view.entity.EntitySearchCombo', {
	
	extend : 'Ext.form.FieldContainer',
	
	xtype : ['entitysearchcombo'],

	layout : 'hbox',

	defaults : {
		flex : 1,
		hideLabel : true
	},
	
	clearFields : [],
	
	initComponent : function() {		
		this.items = [ {
			xtype : 'entitynamecombo',
			name : this.name,
			margin : '0 5 0 0',
			storeClass : this.storeClass,
			customSelectionUrl : this.customSelectionUrl,
			valueField : this.valueField,
			associationField : this.associationField,
			flex : 1
		}, {
			xtype : 'textfield',
			name : this.name + '-desc',
			disabled : true,
			flex : 1
		} ];

		this.callParent();
		
		var entityCombo = this.down(' entitynamecombo');
		var entityValueText = this.down(' textfield');
		var entityDescText = this.down(' textfield[name=' + this.name + '-desc]');
		
		entityValueText.on('specialkey', function(field, e, eOpts) {
			if(e.DELETE) {
				entityDescText.setValue('');
			}
		});		
		
		var self = this;
		entityCombo.on('select', function(me, record) {
			if(entityDescText) {
				entityDescText.setValue(record[0].data.description);
			}
			
			if(self.clearFields.length > 0) {
				var form = self.up('searchform');
				if(form) {
					Ext.each(self.clearFields, function(clearField) {
						var fieldToClear = form.down("entitysearchcombo[name=" + clearField + "]");
						if(fieldToClear) {
							var clearEntityNameCombo = fieldToClear.down(' entitynamecombo');
							var clearText = fieldToClear.down(' textfield');
							var clearDescText = fieldToClear.down(' textfield[name=' + clearField + '-desc]');
							clearEntityNameCombo.setValue('');
							clearText.setValue('');
							clearDescText.setValue('');
						}
					});
				}
			}
		});
	}
});
