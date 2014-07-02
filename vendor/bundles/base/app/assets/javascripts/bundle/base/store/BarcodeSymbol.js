Ext.define('Base.store.BarcodeSymbol', {
	extend : 'Ext.data.Store',
	
	fields: ['sym', 'desc', 'text', 'opts'],
	
	queryMode : 'local'
});