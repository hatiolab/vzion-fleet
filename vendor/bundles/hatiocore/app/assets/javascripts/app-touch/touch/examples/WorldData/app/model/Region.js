Ext.define("wd.model.Region", {
    extend: "Ext.data.Model",
    config: {
        fields: [
            {name: "id", type: "string"},
            {name: "code", type: "string"},
            {name: "name", type: "string"}
        ]
    }
});