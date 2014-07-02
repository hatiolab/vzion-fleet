Ext.define('Base.mixin.lifecycle.ListSlideShow', {

	/**
	 * 리스트에서 슬라이드 쇼를 처리함.
	 */
	onSlideShow : function(grid, item, rowIndex, colIndex, e, record) {
		// TODO Base 모듈 종속성
		var store = Ext.create('Base.store.Attachment');
		
		
		store.load({
			params : {
				'_q[on_type-eq]' : HF.humanize(HF.current.resource().type),
				'_q[on_id-eq]' : record.get('id'),
				'_q[tag-eq]' : 'attachment'
			},
			callback : function(records, operation, success) {
				if(success) {
					HF.slideshow(Ext.Array.map(records, function(record) {
						return record.data;
					}));
				}
			}
		})
	}

});




