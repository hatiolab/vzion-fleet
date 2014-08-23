Ext.define("EnergyApp.view.Main", {
    extend: "Ext.Panel",
    config: {
        id: "main",
        fullscreen: true,
        layout: 'card',
        items: [
            {
                cls: 'launchscreen',
                html: '<div>' +
                    '<p><strong>This application visualizes US Energy data with charts from the Sencha Touch Charts package.</strong><br>' +
                    'Start by selecting consumption or production.</p>' +
                    '</div>'
            },
            {
                xtype: 'chartview',
                id: 'chartView'
            }
        ],
        sheet: {
            hidden: true,
            enter: 'left',
            exit: 'left',
            stretchY: true,
            modal: true,
            hideOnMaskTap: true,
            zIndex: 40
        },
        navigation: {
            width: 250,
            docked: 'left'
        },
        navigationButton: {
            id: "navigationButton",
            text: "Navigate",
            zIndex: 30
        },
        title: '',
        toolbar: {
            ui: 'dark',
            docked: 'top'
        }
    },

    orientate: function (orientation) {
        var navigation = this.getNavigation(),
            navigationButton = this.getNavigationButton(),
            docked = Ext.os.deviceType != 'Phone' && orientation == "landscape",
            sheet = this.getSheet();
        if (docked) {
            if (navigation && navigation.getParent() != this) {
                sheet.hide();
                sheet.add(this.getToolbar());
                this.add(navigation);
                this.add(this.getToolbar());
                navigation.show();
            }
        } else {
            if (navigation && sheet) {
                sheet.add(navigation);
                navigation.show();
            }
        }
        if (navigationButton) {
            navigationButton.setHidden(docked);
        }
    },

    applySheet: function (sheet, currentSheetInstance) {
        return Ext.factory(sheet, "Ext.Sheet", currentSheetInstance);
    },
    
    updateSheet: function (sheet, oldSheet) {
        if (oldSheet) {
            Ext.Viewport.remove(oldSheet);
        }
        if (sheet) {
            Ext.Viewport.add(sheet);
        }
    },

    applyNavigation: function (navigation, currentNavigationInstance) {
        return Ext.factory(navigation, "EnergyApp.view.Navigation", currentNavigationInstance);
    },

    updateNavigation: function (navigation, currentNavigationInstance) {
        if (currentNavigationInstance) {
            this.remove(currentNavigationInstance);
        }
        this.orientate(Ext.Viewport.getOrientation());
    },

    applyNavigationButton: function (navigationButton, currentNavigationButtonInstance) {
        var docked = Ext.os.deviceType != 'Phone' && Ext.Viewport.getOrientation() == "landscape";
        navigationButton = Ext.factory(navigationButton, "Ext.Button", currentNavigationButtonInstance);
        if (currentNavigationButtonInstance != navigationButton) {
            if (currentNavigationButtonInstance) {
                this.remove(currentNavigationButtonInstance);
            }
            if (navigationButton) {
                if (docked) {
                    navigationButton.hide();
                } else {
                    navigationButton.show();
                }
            }
        }
        return navigationButton;
    },

    updateTitle: function (title) {
        if (this.getToolbar()) {
            this.getToolbar().setTitle(title);
        }
    },

    applyToolbar: function (toolbar, currentToolbarInstance) {
        toolbar = Ext.factory(toolbar, "Ext.Toolbar", currentToolbarInstance);
        return toolbar;
    },

    updateToolbar: function (toolbar, currentToolbarInstance) {
        if (currentToolbarInstance) {
            this.remove(currentToolbarInstance);
        }
        if (toolbar) {
            this.add(toolbar);
            toolbar.setTitle(this.getTitle());
            toolbar.add(this.getNavigationButton());
        }
    }
});