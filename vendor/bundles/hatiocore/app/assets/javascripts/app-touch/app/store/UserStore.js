Ext.define('FleetTouch.store.UserStore', {
    extend: 'Ext.data.Store',

    config: {
        autoLoad: false,

        pageSize: 1,

        fields: [{
            name: 'key',
            type: 'string'
        },
        {
            name: 'email',
            type: 'string'
        },
        {
            name: 'company',
            type: 'string'
        },
        {
            name: 'name',
            type: 'string'
        },
        {
            name: 'admin',
            type: 'boolean'
        },
        {
            name: 'enabled',
            type: 'boolean'
        },
        {
            name: 'language',
            type: 'string'
        },
        {
            name: 'image_clip',
            type: 'string'
        },
        {
            name: 'created_at',
            type: 'date'
        },
        {
            name: 'updated_at',
            type: 'date'
        }],

        proxy: {
            type: 'ajax',
            url: 'users',
            reader: {
                type: 'json',
                rootProperty: 'items',
                totalProperty: 'total'
            }
        }
    }

});