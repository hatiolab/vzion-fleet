/*
    This file is generated and updated by Sencha Cmd. You can edit this file as
    needed for your application, but these edits will have to be merged by
    Sencha Cmd when it performs code generation tasks such as generating new
    models, controllers or views and when running "sencha app upgrade".

    Ideally changes to this file would be limited and most work would be done
    in other places (such as Controllers). If Sencha Cmd cannot merge your
    changes and its generated code, it will produce a "merge conflict" that you
    will need to resolve manually.
*/
//<debug>
Ext.Loader.setPath({
    'Ext': 'assets/app-touch/touch/src',
	'FleetTouch': 'assets/app-touch/app',
	'FleetTouch.mixin': 'assets/app-touch/app/mixin'
});
//</debug>

Ext.define('FleetTouch', {
	singleton : true,
	mixins : {
		user : 'FleetTouch.mixin.User',
		subitem : 'FleetTouch.mixin.SubItem',
		setting : 'FleetTouch.mixin.Setting',
		label : 'FleetTouch.mixin.Label',
		nav : 'FleetTouch.mixin.Nav',
		map : 'FleetTouch.mixin.Map'
	}
});

Ext.application({
	
	name: 'FleetTouch',

	requires: [
		'Ext.MessageBox',
		'Ext.tab.Panel'
	],

	controllers: ['Main', 'Nav', 'Report', 'monitor.Track', 'monitor.Info'],
	
	stores: [
		'VehicleFilteredStore', 'VehicleStore', 'RecentIncidentStore', 
		'VehicleMapStore', 'DriverStore', 'DriverBriefStore', 
		'VehicleGroupStore', 'DriverGroupStore', 'TrackByVehicleStore', 
		'IncidentByVehicleStore', 'IncidentLogStore', 'VehicleConsumableStore', 
		'DriverRunStore', 'VehicleRunStore', 'YearStore', 'TrackStore', 
		'VehicleSummaryStore', 'DriverSummaryStore', 'VehicleRepairStore'
	],
	
	views: ['Main', 'Setting'],
	
    icon: {
        '57': 'assets/app-touch/resources/icons/Icon.png',
        '72': 'assets/app-touch/resources/icons/Icon~ipad.png',
        '114': 'assets/app-touch/resources/icons/Icon@2x.png',
        '144': 'assets/app-touch/resources/icons/Icon~ipad@2x.png'
    },

    isIconPrecomposed: true,

    startupImage: {
        '320x460': 'assets/app-touch/resources/startup/320x460.jpg',
        '640x920': 'assets/app-touch/resources/startup/640x920.png',
        '768x1004': 'assets/app-touch/resources/startup/768x1004.png',
        '748x1024': 'assets/app-touch/resources/startup/748x1024.png',
        '1536x2008': 'assets/app-touch/resources/startup/1536x2008.png',
        '1496x2048': 'assets/app-touch/resources/startup/1496x2048.png'
    },

    launch: function() {
		// Destroy the #appLoadingIndicator element
		Ext.fly('appLoadingIndicator').destroy();
		FleetTouch.setting.set('app_mode', (0 === window.location.pathname.indexOf('/m')));
		FleetTouch.setting.set('version', '1.0');
		
		if(login && login.id) {
			FleetTouch.login.set(login);
			Ext.Viewport.add(Ext.create('FleetTouch.view.Main'));
		} else {
			document.location.href = "/users/sign_in";
		}
    },

    onUpdated: function() {
        Ext.Msg.confirm(
            "Application Update",
            "This application has just successfully been updated to the latest version. Reload now?",
            function(buttonId) {
                if (buttonId === 'yes') {
                    window.location.reload();
                }
            }
        );
    }
});
