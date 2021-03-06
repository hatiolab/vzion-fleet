/**
 * @class Ext.chart.interactions.ItemInfo
 * @extends Ext.util.Observable
 *
 * The ItemInfo interaction allows displaying detailed information about a series data
 * point in a popup panel.
 *
 * To attach this interaction to a chart, include an entry in the chart's
 * {@link Ext.chart.Chart#interactions interactions} config with the `iteminfo` type:
 *
 *     new Ext.chart.Chart({
 *         renderTo: Ext.getBody(),
 *         width: 800,
 *         height: 600,
 *         store: store1,
 *         axes: [ ...some axes options... ],
 *         series: [ ...some series options... ],
 *         interactions: [{
 *             type: 'iteminfo',
 *             listeners: {
 *                 show: function(me, item, panel) {
 *                     panel.setHtml('Stock Price: $' + item.storeItem.get('price'));
 *                 }
 *             }
 *         }]
 *     });

 * @author Nicolas Garcia Belmonte <nicolas@sencha.com>
 * @docauthor Jason Johnston <jason@sencha.com>
 */
Ext.define('Ext.chart.interactions.ItemInfo', {

    extend: 'Ext.chart.interactions.Abstract',

    type: 'iteminfo',

    config: {
        /**
         * @cfg {String} gesture
         * Defines the gesture type that should trigger the item info panel to be displayed.
         */
        gesture: 'tap',

        /**
         * @cfg {Object} infoPanel
         * An optional set of configuration overrides for the {@link Ext.Panel} that gets
         * displayed. This object will be merged with the default panel configuration.
         */
        panel: {
            floating: true,
            modal: true,
            centered: true,
            width: 250,
            height: 300,
            styleHtmlContent: true,
            scrollable: 'vertical',
            hideOnMaskTap: true,
            fullscreen: false,
            hidden: true,
            zIndex: 30,
            items: [
                {
                    docked: 'top',
                    xtype: 'toolbar',
                    title: 'Item Detail'
                }
            ]
        }
    },

    /**
     * @event show
     * Fires when the info panel is shown.
     * @param {Ext.chart.interactions.ItemInfo} this The interaction instance
     * @param {Object} item The item whose info is being displayed
     * @param {Ext.Panel} panel The panel for displaying the info
     */

    applyPanel: function (panel, oldPanel) {
        return Ext.factory(panel, 'Ext.Panel', oldPanel);
    },

    updatePanel: function (panel, oldPanel) {
        if (panel) {
            panel.on('hide', this.reset, this);
        }
        if (oldPanel) {
            oldPanel.un('hide', this.reset, this);
        }
    },

    onGesture: function (e) {
        var me = this,
            item = me.getItemForEvent(e),
            panel;
        if (item) {
            me.item = item;
            item.series.highlightItem(item);
            panel = me.getPanel();
            me.fireEvent('show', me, item, panel);
            panel.show('pop');
        }
    },

    reset: function () {
        var me = this,
            item = me.item;
        if (item) {
            item.series.unHighlightItem(item);
            delete me.item;
        }
    }

}, function () {
    Ext.chart.interactions.Manager.registerType('iteminfo', Ext.chart.interactions.ItemInfo);
});
