Ext.define('Base.view.common_code.CodeColumn', {
	extend: 'Ext.grid.column.Column',

	xtype: 'codecolumn',

	defaultRenderer: function(v, meta, record, rowIdx, colIdx, store, view) {
		if(!this.tpl) {
			return v;
		}
		return this.tpl.apply(HF.code(this.commonCode, v) || {
			name : '',
			description : ''
		});
	}
});
