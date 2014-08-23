Ext.define("EnergyApp.view.Navigation",{
    extend: "Ext.dataview.NestedList",
    xtype: 'navigation',
    id: 'navigation',
    config: {
        toolbar: {
            id: 'navigationBar'
        },
        store: "NavigationStore",
        docked: 'left',
        useTitleAsBackText: false,
        useToolbar: Ext.os.deviceType != "Phone",
        displayField: 'label',
        title: 'Choose Data'
    },
    constructor: function () {
        this.callParent(arguments);
        this.setHidden(!Ext.os.is.Phone && Ext.Viewport.getOrientation() == 'portrait');
    }
});
