Ext.define("wd.view.Topic", {
    extend: "Ext.List",
    depth: [0, 1],
    config: {
        id: 'topicList',
        store: 'Topic',
        itemTpl: '{value}'
    }
});