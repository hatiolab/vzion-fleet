Ext.define("wd.model.Topic", {
    extend: "Ext.data.Model",
    config: {
        fields: [
            {name: "id", type: "string"},
            {name: "value", type: "string"},
            {name: "sourceNote", type: "string"}
        ]
    }
});