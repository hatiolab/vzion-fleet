Ext.define("wd.model.CountryIndicator", {
    extend: "Ext.data.Model",
    config: {
        fields: [
            {name: "countryId", type: "string"},
            {name: "countryName", type: "string"},
            {name: "indicatorId", type: "string"},
            {name: "indicatorName", type: "string"},
            {name: "name", type: "string", convert: function (value, record) {
                return record.get('indicatorName');
            }},
            {name: "alias", type: "string"},
            'unit'
        ]
    }
});
