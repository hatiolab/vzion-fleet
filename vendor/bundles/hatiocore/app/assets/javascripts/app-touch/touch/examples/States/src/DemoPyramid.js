/**
 * Demographic pyramid.
 *
 */
Ext.define('Ext.chart.series.Pyramid', {
    extend: 'Ext.chart.series.Cartesian',

    type: 'pyramid',

    config: {
        axis: 'bottom',
        /**
         * @cfg style Style properties that will override the theming series styles.
         */

        /**
         * @cfg {Number} xPadding Padding between the left/right axes and the pyramids
         */
        xPadding: 0,

        /**
         * @cfg {Number} yPadding Padding between the top/bottom axes and the pyramids
         */
        yPadding: 10,


        field1: false,

        field2: false,

        colorSet: ['rgb(166, 206, 227)', 'rgb(31, 120, 180)']
    },



    constructor: function(config) {
        this.callParent([config]);
        var me = this,
            surface = me.getSurface();
        Ext.apply(me, config);
        me.group = surface.getGroup(me.seriesId + '-pyramids');
    },

    getPaths: function() {
        var me = this,
            chart = me.getChart(),
            store = chart.getStore(),
            ln = store.getCount(),
            padding = 5,
            y = 0,
            field1Array = [],
            field2Array = [],
            field1 = me.getField1(),
            field2 = me.getField2(),
            maxValue = Number.MIN_VALUE,
            colorSet = me.getColorSet(),
            width, elemWidth, bbox, step, middle, i, height;

        me.setBBox(false);
        bbox = me.bbox;
        width = (bbox.width - padding * 2) / 2;
        height = (bbox.height - padding * 2) / (ln + 1);
        y = bbox.height + bbox.y - height;
        middle = bbox.x + bbox.width / 2;



        store.each(function(rec) {
            maxValue = Math.max(maxValue, +rec.get(field1) || 0, +rec.get(field2) || 0);
        });

        store.each(function(rec, i) {
            elemWidth = width * (+rec.get(field1) || 0) / maxValue;
            field1Array.push({
                series: me,
                storeItem: rec,
                storeField: field1,
                attr: {
                    x: middle - elemWidth,
                    y: y,
                    width: elemWidth,
                    height: height,
                    fill: colorSet[0],
                    index: i
                }
            });

            elemWidth = width * (+rec.get(field2) || 0) / maxValue;
            field2Array.push({
                series: me,
                storeItem: rec,
                storeField: field2,
                attr: {
                    x: middle,
                    y: y,
                    width: elemWidth,
                    height: height,
                    fill: colorSet[1],
                    index: i
                }
            });

            y -= height;
        });

        me.items = field1Array.concat(field2Array);
    },

    /**
     * Draws the series for the current chart.
     */
    drawSeries: function() {
        var me = this,
            chart = me.getChart(),
            store = chart.substore || chart.getStore(),
            surface = me.getSurface(),
            animate = chart.getAnimate(),
            group = me.group,
            seriesStyle = me.style,
            items, itemArray, prop, count,
            ln, i, j, sprite, rendererAttributes, shadowIndex, shadowGroup,
            bounds, endSeriesStyle, pyramidAttr, attrs, anim, item;
        
        if (me.fireEvent('beforedraw', me) === false) {
            return;
        }

        Ext.chart.series.Pyramid.superclass.drawSeries.call(this);

        if (!me.getRecordCount()) {
            surface.getItems().hide(true);
            return;
        }

        //fill colors are taken from the colors array.
        delete seriesStyle.fill;
        me.unHighlightItem();
        me.cleanHighlights();

        me.getPaths();

        items = me.items;
        ln = items.length;

        for (i = 0, ln = items.length; i < ln; i++) {
            item = items[i];
            sprite = group.getAt(i);
            pyramidAttr = item.attr;

            // Create a new sprite if needed (no height)
            if (!sprite) {
                attrs = Ext.apply(pyramidAttr, endSeriesStyle || {});
                sprite = surface.add(Ext.apply({}, {
                    type: 'rect',
                    group: group
                }, attrs));
            }
            
            if (animate) {
                rendererAttributes = me.getRenderer()(sprite, item.storeItem, pyramidAttr, i, store);
                anim = me.onAnimate(sprite, { 
                    to: Ext.apply(rendererAttributes, endSeriesStyle) 
                });
            } else {
                rendererAttributes = me.getRenderer()(sprite, store.getAt(i), Ext.apply(pyramidAttr, { hidden: false }), i, store);
                sprite.setAttributes(Ext.apply(rendererAttributes, endSeriesStyle), true);
            }
            item.sprite = sprite;
        }

        // Hide unused sprites
        ln = group.getCount();
        for (j = i; j < ln; j++) {
            group.getAt(j).hide(true);
        }

        surface.renderFrame();
    },
    
    // @private handled when creating a label.
    onCreateLabel: function(storeItem, item, i, display) {
        var me = this,
            surface = me.getSurface(),
            group = me.labelsGroup,
            config = me.getLabel(),
            endLabelStyle = Ext.apply({}, config, me.labelStyle.style || {}),
            sprite;
       
        return surface.add(Ext.apply({
            type: 'text',
            group: group
        }, endLabelStyle || {}));
    },
    
    // @private callback used when placing a label.x
    onPlaceLabel: function(label, storeItem, item, i, display, animate, j, index) {
    },

    /* @private
     * Gets the dimensions of a given pyramid label. Uses a single hidden sprite to avoid
     * changing visible sprites.
     * @param value
     */
    getLabelSize: function(value) {
    },

    // @private used to animate label, markers and other sprites.
    onAnimate: function(sprite, attr) {
        sprite.show();
        Ext.chart.series.Pyramid.superclass.onAnimate.apply(this, arguments);
    },
    

    //@private used by Label.js
    itemHidden: function(item) {
        return !item || item.attr.hidden || (item.attr.width <= 1)|| (item.attr.height <= 1);
    },
    
    getLegendLabels: function() {
        return ['Female', 'Male'];
    },

    /**
     * Returns the color of the series (to be displayed as color for the series legend item).
     * @param item {Object} Info about the item; same format as returned by #getItemForPoint
     */
    getLegendColor: function(index) {
        return this.getColorSet()[index];
    },

    reset: function() {
        Ext.chart.series.Pyramid.superclass.reset.call(this);
    }
});

