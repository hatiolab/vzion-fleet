/**
 * @singleton
 * @private
 * @class 
 * Defines several common shapes used in chart. 
 */
Ext.define("Ext.chart.Shape", {
    singleton: true,
    image: function (surface, opts) {
        opts.height = opts.height || 16;
        opts.width = opts.width || 16;
        return surface.add(Ext.applyIf({
            type: 'image',
            x: opts.x,
            y: opts.y,
            height: opts.height,
            width: opts.width,
            src: opts.src
        }, opts));
    },
    circle: function (surface, opts) {
        return surface.add(Ext.apply({
            type: 'circle',
            x: opts.x,
            y: opts.y,
            stroke: null,
            radius: opts.radius
        }, opts));
    },
    line: function (surface, opts) {
        return surface.add(Ext.apply({
            type: 'rect',
            x: opts.x - opts.radius,
            y: opts.y - opts.radius,
            height: 2 * opts.radius,
            width: 2 * opts.radius / 5
        }, opts));
    },
    square: function (surface, opts) {
        return surface.add(Ext.applyIf({
            type: 'rect',
            x: opts.x - opts.radius,
            y: opts.y - opts.radius,
            height: 2 * opts.radius,
            width: 2 * opts.radius,
            radius: null
        }, opts));
    },
    triangle: function (surface, opts) {
        opts.radius *= 1.75;
        return surface.add(Ext.apply({
            type: 'path',
            stroke: null,
            path: "M".concat(opts.x, ",", opts.y, "m0-", opts.radius * 0.58, "l", opts.radius * 0.5, ",", opts.radius * 0.87, "-", opts.radius, ",0z")
        }, opts));
    },
    diamond: function (surface, opts) {
        var r = opts.radius;
        r *= 1.5;
        return surface.add(Ext.apply({
            type: 'path',
            stroke: null,
            path: ["M", opts.x, opts.y - r, "l", r, r, -r, r, -r, -r, r, -r, "z"]
        }, opts));
    },
    cross: function (surface, opts) {
        var r = opts.radius;
        r = r / 1.7;
        return surface.add(Ext.apply({
            type: 'path',
            stroke: null,
            path: "M".concat(opts.x - r, ",", opts.y, "l", [-r, -r, r, -r, r, r, r, -r, r, r, -r, r, r, r, -r, r, -r, -r, -r, r, -r, -r, "z"])
        }, opts));
    },
    plus: function (surface, opts) {
        var r = opts.radius / 1.3;
        return surface.add(Ext.apply({
            type: 'path',
            stroke: null,
            path: "M".concat(opts.x - r / 2, ",", opts.y - r / 2, "l", [0, -r, r, 0, 0, r, r, 0, 0, r, -r, 0, 0, r, -r, 0, 0, -r, -r, 0, 0, -r, "z"])
        }, opts));
    },
    arrow: function (surface, opts) {
        var r = opts.radius;
        return surface.add(Ext.apply({
            type: 'path',
            path: "M".concat(opts.x - r * 0.7, ",", opts.y - r * 0.4, "l", [r * 0.6, 0, 0, -r * 0.4, r, r * 0.8, -r, r * 0.8, 0, -r * 0.4, -r * 0.6, 0], "z")
        }, opts));
    },
    drop: function (surface, x, y, text, size, angle) {
        size = size || 30;
        angle = angle || 0;
        surface.add({
            type: 'path',
            path: ['M', x, y, 'l', size, 0, 'A', size * 0.4, size * 0.4, 0, 1, 0, x + size * 0.7, y - size * 0.7, 'z'],
            fill: '#000',
            stroke: 'none',
            rotate: {
                degrees: 22.5 - angle,
                x: x,
                y: y
            }
        });
        angle = (angle + 90) * Math.PI / 180;
        surface.add({
            type: 'text',
            x: x + size * Math.sin(angle) - 10, // Shift here, Not sure why.
            y: y + size * Math.cos(angle) + 5,
            text:  text,
            'font-size': size * 12 / 40,
            stroke: 'none',
            fill: '#fff'
        });
    }
});
/**
 * @class Ext.chart.Toolbar
 * @extends Ext.Container
 *
 * The chart toolbar is a container that is docked to one side of the chart, that is intended
 * to hold buttons for performing user actions without taking up valuable screen real estate
 * from the chart. This is used internally for things like the button for showing the legend
 * when the legend is {@link Ext.chart.Legend#dock docked}, or the
 * {@link Ext.chart.interactions.PanZoom pan/zoom interaction}'s button for switching between
 * pan and zoom mode in non-multi-touch environments.
 *
 * An instance of this class is created automatically by the chart when it is needed; authors
 * should not need to instantiate it directly. To customize the configuration of the toolbar,
 * specify the chart's {@link Ext.chart.Chart#toolbar toolbar} config.
 *
 * @author Jason Johnston <jason@sencha.com>
 * @docauthor Jason Johnston <jason@sencha.com>
 */
Ext.define('Ext.chart.Toolbar', { 
 
    extend: 'Ext.Container',
    
    isChartToolbar: true,

    config: {
        baseCls: Ext.baseCSSPrefix + 'chart-toolbar',

        chart: null,
        /**
         * @cfg {String} position
         * The position at which the toolbar should be docked in relation to the chart. Can be one of:
         *
         * -  "top" - positions the legend centered at the top of the chart
         * -  "bottom" - positions the legend centered at the bottom of the chart
         * -  "left" - positions the legend centered on the left side of the chart
         * -  "right" - positions the legend centered on the right side of the chart
         *
         *     toolbar: {
         *         position: 'right'
         *     }
         *
         * In addition, you can specify different positionss based on the orientation of the browser viewport,
         * for instance you might want to put the toolbar on the right in landscape orientation but on the bottom in
         * portrait orientation. To achieve this, you can set the `position` config to an Object with `portrait` and
         * `landscape` properties, and set the value of those properties to one of the recognized value types described
         * above. For example, the following config will put the toolbar on the right in landscape and on the bottom
         * in portrait:
         *
         *     toolbar:
         *         position: {
         *             landscape: 'right',
         *             portrait: 'bottom'
         *         }
         *     }
         *
         * If not specified, the position will default to the configured position of the chart legend (if
         * a legend is configured), or 'bottom' otherwise.
         */
        position: false,
        docked: 'top',
        defaultType: 'button'
    },



    /**
     * Returns whether the toolbar is configured with orientation-specific positions.
     * @return {Boolean}
     */
    isOrientationSpecific: function() {
        var position = this.getPosition();
        return (position && Ext.isObject(position) && 'portrait' in position);
    },

    /**
     * Get the target position of the toolbar, after resolving any orientation-specific configs.
     * In most cases this method should be used rather than reading the `position` property directly.
     * @return {String} The position config value
     */
    getDockedPosition: function() {
        var me = this,
            position = me.getPosition(),
            legend = me.getChart().getLegend();
        if (!position && legend) {
            // Fall back to legend position if legend is present
            position = legend.getDockedPosition();
        }
        else if (me.isOrientationSpecific()) {
            // Grab orientation-specific config if specified
            position = position[Ext.Viewport.getOrientation()];
        }
        if (!position || !Ext.isString(position)) {
            // Catchall fallback
            position = 'bottom';
        }
        return position;
    },

    /**
     * @protected
     * Updates the toolbar to match the current viewport orientation.
     */
    orient: function() {
        var me = this,
            orientation = Ext.Viewport.getOrientation();
        if (orientation !== me.lastOrientation) {
            me.element.dom.setAttribute('data-side', me.getDockedPosition());
            me.lastOrientation = orientation;
        }
    },

    updateChart: function (chart) {
        this.setRenderTo(chart.element);
        this.orient();
    }

});

/**
 * @class Ext.chart.Legend
 *
 * Defines a legend for a chart's series.
 * The 'chart' member must be set prior to rendering.
 * The legend class displays a list of legend items each of them related with a
 * series being rendered. In order to render the legend item of the proper series
 * the series configuration object must have {@link Ext.chart.Series#showInLegend showInLegend}
 * set to true.
 *
 * The legend configuration object accepts a {@link #position} as parameter, which allows
 * control over where the legend appears in relation to the chart. The position can be
 * confiured with different values for portrait vs. landscape orientations. Also, the {@link #dock}
 * config can be used to hide the legend in a sheet docked to one of the sides.
 *
 * Full example:
    <pre><code>
    var store = new Ext.data.JsonStore({
        fields: ['name', 'data1', 'data2', 'data3', 'data4', 'data5'],
        data: [
            {'name':'metric one', 'data1':10, 'data2':12, 'data3':14, 'data4':8, 'data5':13},
            {'name':'metric two', 'data1':7, 'data2':8, 'data3':16, 'data4':10, 'data5':3},
            {'name':'metric three', 'data1':5, 'data2':2, 'data3':14, 'data4':12, 'data5':7},
            {'name':'metric four', 'data1':2, 'data2':14, 'data3':6, 'data4':1, 'data5':23},
            {'name':'metric five', 'data1':27, 'data2':38, 'data3':36, 'data4':13, 'data5':33}
        ]
    });

    new Ext.chart.Chart({
        renderTo: Ext.getBody(),
        width: 500,
        height: 300,
        animate: true,
        store: store,
        shadow: true,
        theme: 'Category1',
        legend: {
            position: 'top'
        },
         axes: [{
                type: 'Numeric',
                grid: true,
                position: 'left',
                fields: ['data1', 'data2', 'data3', 'data4', 'data5'],
                title: 'Sample Values',
                grid: {
                    odd: {
                        opacity: 1,
                        fill: '#ddd',
                        stroke: '#bbb',
                        'stroke-width': 1
                    }
                },
                minimum: 0,
                adjustMinimumByMajorUnit: 0
            }, {
                type: 'Category',
                position: 'bottom',
                fields: ['name'],
                title: 'Sample Metrics',
                grid: true,
                label: {
                    rotate: {
                        degrees: 315
                    }
                }
        }],
        series: [{
            type: 'area',
            highlight: false,
            axis: 'left',
            xField: 'name',
            yField: ['data1', 'data2', 'data3', 'data4', 'data5'],
            style: {
                opacity: 0.93
            }
        }]
    });
    </code></pre>
 *
 */
Ext.define('Ext.chart.Legend', {

    mixins: {
        identifiable: 'Ext.mixin.Identifiable',
        observable: 'Ext.util.Observable'
    },

    uses: [
        'Ext.chart.legend.View'
    ],

    config: {
        /**
         * @cfg {Boolean} visible
         * Whether or not the legend should be displayed.
         */
        visible: true,

        /**
         * @cfg {String} position
         * The position of the legend in relation to the chart. Can be one of:
         *
         * -  "top" - positions the legend centered at the top of the chart
         * -  "bottom" - positions the legend centered at the bottom of the chart
         * -  "left" - positions the legend centered on the left side of the chart
         * -  "right" - positions the legend centered on the right side of the chart
         * -  an Object with numeric properties `x` and `y`, and boolean property `vertical` - displays the legend
         *    floating on top of the chart at the given x/y coordinates. If `vertical:true` the legend items will
         *    be arranged stacked vertically, otherwise they will be arranged side-by-side. If {@link #dock} is
         *    set to `true` then this position config will be ignored and will dock to the bottom.
         *
         * In addition, you can specify different legend alignments based on the orientation of the browser viewport,
         * for instance you might want to put the legend on the right in landscape orientation but on the bottom in
         * portrait orientation. To achieve this, you can set the `position` config to an Object with `portrait` and
         * `landscape` properties, and set the value of those properties to one of the recognized value types described
         * above. For example, the following config will put the legend on the right in landscape but float it on top
         * of the chart at position 10,10 in portrait:
         *
         *     legend: {
         *         position: {
         *             landscape: 'right',
         *             portrait: {
         *                 x: 10,
         *                 y: 10,
         *                 vertical: true
         *             }
         *         }
         *     }
         */
        position: 'bottom',

        /**
         * @cfg {Boolean} popup
         * If set to `true`, then rather than rendering alongside the chart area, an icon will be inserted
         * into chart toolbar and the legend will be shown within a {@link Ext.Sheet} when clicked on the button.
         * 
         * This prevents screen real-estate from being taken up by the legend, 
         * which is especially important on small screen devices.
         */
        popup: Ext.os.is.Phone,

        /**
         * @cfg {Number} doubleTapThreshold
         * The duration in milliseconds in which two consecutive taps will be considered a doubletap.
         */
        doubleTapThreshold: 250,

        view: {},

        chart: null,

        sheet: {
            ui: 'legend',
            style: 'padding: 0.3em',
            hideOnMaskTap: true,
            bottom: 0,
            right: 0,
            height: 250,
            stretchX: true,
            zIndex: 30,
            layout: 'fit',
            scrollable: false,
            enter: 'bottom',
            exit: 'bottom',
            hidden: true,
            items: [
                {
                    xtype: 'toolbar',
                    ui: 'dark',
                    docked: 'top',
                    title: 'Legend',
                    items: [
                        {
                            xtype: 'spacer'
                        },
                        {
                            ui: 'plain',
                            text: '&times;'
                        }
                    ]
                }
            ]
        },

        button: {
            hide: true,
            showAnimation: 'fade',
            cls: Ext.baseCSSPrefix + 'legend-button',
            iconCls: Ext.baseCSSPrefix + 'legend-button-icon',
            iconMask: true
        }
    },
    /**
     * @event combine
     * Fired when two legend items are combined together via drag-drop.
     * @param {Ext.chart.Legend} legend
     * @param {Ext.chart.series.Series} series The series owning the items being combined
     * @param {Number} index1 The index of the first legend item
     * @param {Number} index2 The index of the second legend item
     */

    /**
     * @event split
     * Fired when a previously-combined legend item is split into its original constituent items.
     * @param {Ext.chart.Legend} legend
     * @param {Ext.chart.series.Series} series The series owning the item being split
     * @param {Number} index The index of the legend item being split
     */

    /**
     * @constructor
     * @param {Object} config
     */
    constructor: function (config) {
        var me = this;
        me.initConfig(config);

        me.callParent(arguments);
        me.mixins.observable.constructor.apply(me, arguments);
    },

    wire: function () {
        var me = this,
            popup = me.getPopup(),
            chart = me.getChart(),
            toolbar = chart && chart.getToolbar(),
            button = me.getButton(),
            view = me.getView(),
            sheet,
            anim = {
                type: 'slide',
                duration: 150,
                direction: "down"
            };

        if (view) {
            view.setLegend(this);
        }
        if (toolbar && button) {
            toolbar.add(button);
        }
        if (popup) {
            if ((sheet = me.getSheet())) {
                if (button) {
                    button.show();
                    button.setHandler(function () {
                        sheet && sheet.show();
                    });
                }
                // TODO: Investigate why we have to set parent to null.
                view.setParent(null);
                view.setScrollable(true);
                sheet.add(view);
                sheet.setConfig({
                    enter: "bottom",
                    anim: anim,
                    enterAnimation: anim,
                    exitAnimation: anim
                });
                Ext.Viewport.add(sheet);
            }
        } else {
            button.hide();
            view.setConfig({
                parent: null,
                scrollable: false
            });
            view.setRenderTo(chart && chart.element);
        }
    },

    updateDock: function (dock) {
        this.wire();
    },

    applyButton: function (button, oldButton) {
        return Ext.factory(button, "Ext.Button", oldButton);
    },

    updateButton: function (button, oldButton) {
        if (oldButton) {
            oldButton.destroy();
        }
        this.wire();
    },

    applySheet: function (sheet, oldSheet) {
        return Ext.factory(sheet, "Ext.Sheet", oldSheet);
    },

    updateSheet: function (sheet, oldSheet) {
        if (oldSheet) {
            oldSheet.destroy();
        }
        sheet.on({
            delegate: 'button',
            tap: function () {
                sheet.hide();
            }
        });
        this.wire();
    },

    updateChart: function (chart, oldChart) {
        var me = this,
            button = me.getButton(),
            chartEl = chart && chart.element, view = me.getView(),
            sheet = me.getSheet(), sheetAnim;
        me.wire();
        if (oldChart) {
            oldChart.un('serieschange', me.orient, me);
        }
        if (chart) {
            chart.on('serieschange', me.orient, me);
        }
    },

    applyView: function (view, currentView) {
        return Ext.factory(view, "Ext.chart.legend.View", currentView);
    },

    updateView: function (view, currentView) {
        if (currentView) {
            currentView.setLegend(false);
        }
        this.wire();
    },

    /**
     * @private Determine whether the legend should be displayed. Looks at the legend's 'visible' config,
     * and also the 'showInLegend' config for each of the series.
     * @return {Boolean}
     */
    isDisplayed: function () {
        return this.getVisible() && this.getChart().getSeries().findIndex('showInLegend', true) !== -1;
    },

    /**
     * Returns whether the legend is configured with orientation-specific positions.
     * @return {Boolean}
     */
    isOrientationSpecific: function () {
        var position = this.getPosition();
        return (Ext.isObject(position) && 'portrait' in position);
    },

    /**
     * Get the target position of the legend, after resolving any orientation-specific configs.
     * In most cases this method should be used rather than reading the `position` property directly.
     * @return {String/Object} The position config value
     */
    getDockedPosition: function () {
        var me = this,
            position = me.getPosition();

        // Grab orientation-specific config if specified
        if (me.isOrientationSpecific()) {
            position = position[Ext.Viewport.getOrientation()];
        }
        // If legend is docked, default non-String values to 'bottom'
        if (me.getPopup() && !Ext.isString(position)) {
            position = 'bottom';
        }
        return position;
    },

    /**
     * Returns whether the orientation of the legend items is vertical.
     * @return {Boolean} `true` if the legend items are to be arranged stacked vertically, `false` if they
     * are to be arranged side-by-side.
     */
    isVertical: function () {
        var position = this.getDockedPosition();
        return this.getPopup() || (Ext.isObject(position) ? position.vertical : "left|right|float".indexOf('' + position) !== -1);
    },

    /**
     * Update the legend component to match the current viewport orientation.
     */
    orient: function () {
        var me = this,
            sheet = me.getSheet(),
            position = me.getDockedPosition(),
            orientation = Ext.Viewport.getOrientation(),
            auto = 'auto';
        me.wire();
        me.getView().orient();
        if (me.getPopup() && me.lastOrientation !== orientation) {
            if (sheet) {
                sheet.hide();
                sheet.enter = sheet.exit = position;
                sheet.setSize(null, null);
                // sheet.orient();
            }

            me.lastOrientation = orientation;
        }
        me.getView().refreshStore();
    },

    /**
     * @private Update the position of the legend if it is displayed and not docked.
     */
    updateLocation: function () {
        if (!this.getPopup()) {
            var me = this,
                chart = me.getChart(),
                chartBBox = chart.chartBBox,
                insets = chart.getInsetPadding(),
                isObject = Ext.isObject(insets),
                insetLeft = (isObject ? insets.left : insets) || 0,
                insetRight = (isObject ? insets.right : insets) || 0,
                insetBottom = (isObject ? insets.bottom : insets) || 0,
                insetTop = (isObject ? insets.top : insets) || 0,
                chartWidth = chart.element.getWidth(),
                chartHeight = chart.element.getHeight(),
                seriesWidth = chartBBox.width - (insetLeft + insetRight),
                seriesHeight = chartBBox.height - (insetTop + insetBottom),
                chartX = chartBBox.x + insetLeft,
                chartY = chartBBox.y + insetTop,
                isVertical = me.isVertical(),
                view = me.getView(),
                math = Math,
                mfloor = math.floor,
                mmin = math.min,
                mmax = math.max,
                x, y, legendWidth, legendHeight, maxWidth, maxHeight, position, undef;

            me.orient();
            if (me.isDisplayed()) {
                // Calculate the natural size
                view.show();
                view.element.setSize(isVertical ? undef : null, isVertical ? null : undef); //clear fixed scroller length
                legendWidth = view.element.getWidth();
                legendHeight = view.element.getHeight();

                position = me.getDockedPosition();
                if (Ext.isObject(position)) {
                    // Object with x/y properties: use them directly
                    x = position.x;
                    y = position.y;
                } else {
                    // Named positions - calculate x/y based on chart dimensions
                    switch (position) {
                        case "left":
                            x = insetLeft;
                            y = mfloor(chartY + seriesHeight / 2 - legendHeight / 2);
                            break;
                        case "right":
                            x = mfloor(chartWidth - legendWidth) - insetRight;
                            y = mfloor(chartY + seriesHeight / 2 - legendHeight / 2);
                            break;
                        case "top":
                            x = mfloor(chartX + seriesWidth / 2 - legendWidth / 2);
                            y = insetTop;
                            break;
                        default:
                            x = mfloor(chartX + seriesWidth / 2 - legendWidth / 2);
                            y = mfloor(chartHeight - legendHeight) - insetBottom;
                    }
                    x = mmax(x, insetLeft);
                    y = mmax(y, insetTop);
                }

                maxWidth = chartWidth - x - insetRight;
                maxHeight = chartHeight - y - insetBottom;

                view.setLeft(x);
                view.setTop(y);

                if (legendWidth > maxWidth || legendHeight > maxHeight) {
                    view.element.setSize(mmin(legendWidth, maxWidth), mmin(legendHeight, maxHeight));
                }
            } else {
                view.hide();
            }
        }
    },

    /**
     * Calculate and return the number of pixels that should be reserved for the legend along
     * its edge. Only returns a non-zero value if the legend is positioned to one of the four
     * named edges, and if it is not {@link #dock docked}.
     */
    getInsetSize: function () {
        var me = this,
            pos = me.getDockedPosition(),
            chartPadding = me.getChart().insets,
            left = chartPadding.left,
            bottom = chartPadding.bottom,
            top = chartPadding.top,
            right = chartPadding.right,
            size = 0,
            view;

        if (!me.getPopup() && me.isDisplayed()) {
            view = me.getView();
            view.show();
            if (pos === 'left' || pos === 'right') {
                size = view.element.getWidth() + left;
            }
            else if (pos === 'top' || pos === 'bottom') {
                size = view.element.getHeight() + top;
            }
        }
        return size;
    },

    /**
     * Shows the legend if it is currently hidden.
     */
    show: function () {
        (this.getPopup() ? this.getSheet() : this.getView()).show();
    },

    /**
     * Hides the legend if it is currently shown.
     */
    hide: function () {
        (this.getPopup() ? this.getSheet() : this.getView()).hide();
    },

    /**
     * @protected Fired when two legend items are combined via drag-drop in the legend view.
     * @param {Ext.chart.series.Series} series The series for the combined items
     * @param {Ext.chart.series.Series} index1 The series for the combined items
     * @param {Ext.chart.series.Series} index2 The series for the combined items
     */
    onCombine: function (series, index1, index2) {
        var me = this;
        series.combine(index1, index2);
        me.getView().refreshStore();
        me.fireEvent('combine', me, series, index1, index2);
    },

    onSplit: function (series, index) {
        var me = this;
        series.split(index);
        me.getView().refreshStore();
        me.fireEvent('split', me, series, index);
    },

    /**
     * Reset the legend back to its initial state before any user interactions.
     */
    reset: function () {
        this.getView().reset();
    }
});


/**
 * @private
 * @class Ext.chart.legend.View
 * @extends Ext.DataView
 *
 * A DataView specialized for displaying the legend items for a chart. This class is only
 * used internally by {@link Ext.chart.Legend} and should not need to be instantiated directly.
 */
Ext.define('Ext.chart.legend.View', {

    extend: 'Ext.dataview.DataView',
    require: [
        'Ext.Viewport',
        'Ext.draw.Draw'
    ],

    config: {
        itemTpl: [
            '<span class="x-legend-item-marker {[values.disabled?\'x-legend-inactive\':\'\']}" style="background-color:{markerColor};"></span>{label}'
        ],
        store: {
            fields: ['markerColor', 'label', 'series', 'seriesId', 'index', 'disabled'],
            data: []
        },
        baseCls: Ext.baseCSSPrefix + 'legend',
        disableSelection: true,
        scrollable: false,
        legend: false
    },

    componentCls: Ext.baseCSSPrefix + 'legend',
    horizontalCls: Ext.baseCSSPrefix + 'legend-horizontal',

    initialize: function () {
        var me = this,
            scroller = me.getScrollableBehavior().getScrollView(),
            innerSize, outerSize;

        me.callParent(arguments);
        
        me.on('itemtap', me.itemTap);
        
        //append the needed css class
    },

    refresh: function () {
        this.callParent();
    },

    updateLegend: function (legend, oldLegend) {
        if (legend && legend.getChart()) {
            var chart = legend.getChart(),
                series = chart.getSeries();
            chart.on('serieschange', this.refreshStore, this);
            if (series) {
                series.each(function (series) {
                    series.on('titlechange', this.refreshStore, this);
                });
            }
        }
    },

    /**
     * @private Fired when a legend item is tap-held. Initializes a draggable for the
     * held item.
     */
    onTapHold: function (e, target) {
        //TODO(nico):
        //This function is currently disabled until 
        //ST 2 adds dragging capabilities to the framework.
        return;

        // var me = this,
        //     draggable, record, seriesId, combinable;

        // if (!Ext.fly(target).hasCls(me.inactiveItemCls)) {
        //     record = me.getRecord(target);
        //     seriesId = record.get('seriesId');
        //     combinable = me.getStore().findBy(function(record2) {
        //         return record2 !== record && record2.get('seriesId') === seriesId;
        //     });
        //     if (combinable > -1) {
        //         draggable = new Ext.util.Draggable(target, {
        //             threshold: 0,
        //             revert: true,
        //             direction: me.getLegend().isVertical() ? 'vertical' : 'horizontal',
        //             group: seriesId
        //         });

        //         draggable.on('dragend', me.onDragEnd, me);

        //         if (!draggable.dragging) {
        //             draggable.onStart(e);
        //         }
        //     }
        // }
    },

    /**
     * @private Updates the droppable objects for each list item. Should be called whenever
     * the list view is re-rendered.
     */
    updateDroppables: function () {
        var me = this,
            droppables = me.droppables,
            droppable;

        Ext.destroy(droppables);
    },

    /**
     * @private Handles dropping one legend item on another.
     */
    onDrop: function (droppable, draggable) {
        var me = this,
            dragRecord = me.getRecord(draggable.element.dom),
            dropRecord = me.getRecord(droppable.element.dom);
        me.getLegend().onCombine(dragRecord.get('series'), dragRecord.get('index'), dropRecord.get('index'));
    },

    onDragEnd: function (draggable, e) {
        draggable.destroy();
    },

    /**
     * @private Create and return the JSON data for the legend's internal data store
     */
    getStoreData: function () {
        var data = [], info, series = this.getLegend().getChart().getSeries();
        if (series) {
            series.each(function (series) {
                if (series.showInLegend) {
                    info = series.getLegendInfo();
                    Ext.each(info.items, function (item, i) {
                        data.push({
                            label: item.label,
                            markerColor: item.color,
                            series: series,
                            seriesId: Ext.id(series, 'legend-series-'),
                            index: i,
                            disabled: item.disabled
                        });
                    });
                }
            });
        }
        return data;
    },

    /**
     * Updates the internal store to match the current legend info supplied by all the series.
     */
    refreshStore: function () {
        var me = this,
            store = me.getStore(),
            data = me.getStoreData();
        store.setData(data);
        
        // TODO: remove this when iOS update issue goes away.
        Ext.draw.Draw.updateIOS();
    },

    /**
     * Update the legend component to match its current vertical/horizontal orientation
     */
    orient: function (orientation) {
        var me = this,
            legend = me.getLegend(),
            horizontalCls = me.horizontalCls,
            isVertical = legend.isVertical(),
            pos = legend.getDockedPosition();

        orientation = orientation || Ext.Viewport.getOrientation();
        if (me.lastOrientation !== orientation) {
            if (isVertical) {
                me.removeCls(horizontalCls);
            } else {
                me.addCls(horizontalCls);
            }
            me.setSize(null, null);
            me.setDocked(pos);
            // Clean up things set by previous scroller -- Component#setScrollable should be fixed to do this
            // Re-init scrolling in the correct direction
            // me.setScrollable(isVertical ? 'vertical' : 'horizontal');

            if (isVertical) {
                // Fix to the initial natural width so it doesn't expand when items are combined
                me.setSize(me.getWidth());
            }
            if (me.scroller) {
                me.scroller.scrollTo({x: 0, y: 0});
            }
            me.lastOrientation = orientation;
        }
    },

    itemTap: function (target, index, e) {
        var me = this,
            item = Ext.get(target),
            record = me.getStore().getAt(index),
            series = record && record.get('series'),
            threshold = me.getLegend().doubleTapThreshold,
            tapTask = me.tapTask || (me.tapTask = new Ext.util.DelayedTask()),
            now = +new Date(),
            oldEndsX, oldEndsY, axis;
        tapTask.cancel();

        // If the tapped item is a combined item, we need to distinguish between single and
        // double taps by waiting a bit; otherwise trigger the single tap handler immediately.
        if (series.isCombinedItem(index)) {
            if (now - (me.lastTapTime || 0) < threshold) {
                me.doItemDoubleTap(item, index);
            }
            else {
                tapTask.delay(threshold, me.doItemTap, me, [item, index]);
            }
            me.lastTapTime = now;
        } else {
            series.onLegendItemTap(record, index);
            if (series.getAxesForXAndYFields) {
                var axes = series.getAxesForXAndYFields();
                axis = axes.xAxis && series.getChart().getAxes().get(axes.xAxis);
                if (axis && axis.getRange) {
                    oldEndsX = axis.getRange();
                }
                axis = axes.yAxis && series.getChart().getAxes().get(axes.yAxis);
                if (axis && axis.getRange) {
                    oldEndsY = axis.getRange();
                }
            }

            if (oldEndsX && oldEndsY && series.getAxesForXAndYFields) {
                var newEndsX, newEndsY;
                newEndsX = axes.xAxis && series.getChart().getAxes().get(axes.xAxis).getRange();
                newEndsY = axes.xAxis && series.getChart().getAxes().get(axes.yAxis).getRange();
                if (newEndsX[0] !== oldEndsX[0] || newEndsX[1] !== oldEndsX[1] ||
                    newEndsY[0] !== oldEndsY[0] || newEndsY[1] !== oldEndsY[1]) {
                    series.getChart().redraw();
                } else {
                    series.drawSeries();
                    series.getSurface().renderFrame();
                }
            } else {
                series.getChart().redraw();
            }
        }
        me.refreshStore();
    },
    /**
     * @private
     * Handle double-taps on legend items; splits items that are a result of item combination
     */
    doItemDoubleTap: function (item, index) {
        var me = this,
            record = me.getStore().getAt(index),
            series = record.get('series');
        if (record) {
            me.getLegend().onSplit(record.get('series'), record.get('index'));
        }
        series.onLegendItemDoubleTap(record, index);
    },

    /**
     * Reset the legend view back to its initial state before any user interactions.
     */
    reset: function () {
        var me = this;
        me.getStore().each(function (record, i) {
            var series = record.get('series');
            series._index = record.get('index');
            series.showAll();
            Ext.fly(me.getViewItems()[i]).removeCls(me.inactiveItemCls);
            series.clearCombinations();
            series.onLegendReset();
        });

        me.refreshStore();
    }

});




//TODO(nico): I'm pretty sure this shouldn't be here.
Ext.ComponentQuery.pseudos['nth-child'] = function(items, value) {
    var index = +value -1;
    if (items[index]) {
        return [items[index]];
    }
    return [];
};

Ext.ComponentQuery.pseudos.highlight = function(items, value) {
    var i = 0, 
        j = 0,
        l = items.length,
        ans = [],
        item, refItems, refItem, lRefItems;

    for (; i < l; ++i) {
        item = items[i];
        if (item.isXType && item.isXType('highlight')) {
            ans.push(item);
        }
        if (item.getRefItems) {
            refItems = item.getRefItems(true);
            for (j = 0, lRefItems = refItems.length; j < lRefItems; ++j) {
                refItem = refItems[j];
                if (refItem.isXType && refItem.isXType('highlight')) {
                    ans.push(refItem);
                }
            }
        }
        
    }
    return ans;
};

/**
 * @class
 */
Ext.define('Ext.chart.theme.Theme', {

    uses: ['Ext.chart.theme.Base', 'Ext.chart.theme.Style'],

    theme: 'Base',

    timestamp: 1,

    applyStyles: function(themeName) {
        //http://www.w3.org/TR/css3-selectors/#specificity.
        var me = this,
            root = {

                getRefItems: function() {
                    return [me];
                },

                isXType: function() {
                    return false;
                },

                initCls: function() {
                    return [];
                },

                getItemId: function() {
                    return '';
                }
            },
            themes = [Ext.chart.theme.Base.selectors.slice()],
            i = 0,
            n = 0,
            results = [],
            res, selector, style, rule, j, matches, lmatches, ln, l, configs;

        if (themeName || me.getTheme() != 'Base') {
            themes.push(Ext.chart.theme[themeName || me.getTheme()].selectors.slice());
        }

        var timestamp = me.timestamp++;

        for (ln = themes.length; n < ln; ++n) {
            configs = themes[n];
            l = configs.length;

            //sort by specificity
            configs.sort(function(a, b) {
                var sa = a.specificity,
                    sb = b.specificity;

                return sb[0] < sa[0] || (sb[0] == sa[0] && (sb[1] < sa[1]
                    || (sb[1] == sa[1] && sb[2] < sa[2])));
            });

            for (i = 0; i < l; ++i) {
                rule = configs[i];
                selector = rule.selector;
                style = rule.style;
                matches = Ext.ComponentQuery.query(selector, root);
                for (j = 0, lmatches = matches.length; j < lmatches; ++j) {
                    if (matches[j] instanceof Ext.chart.theme.Style) {
                        if (matches[j].$themeTimestamp !== timestamp) {
                            matches[j].$themeTimestamp = timestamp;
                            results.push(matches[j]);
                            matches[j].themeStyle.reset();
                        }
                        Ext.merge(matches[j].themeStyle, style);
                    } else {
                        if (matches[j].$themeTimestamp !== timestamp) {
                            matches[j].$themeTimestamp = timestamp;
                            results.push(matches[j]);
                            matches[j].themeStyle = {};
                            if (!matches[j].configStyle) {
                                matches[j].configStyle = matches[j].style;
                            }
                            matches[j].style = Ext.Object.chain(matches[j].themeStyle);
                            Ext.apply(matches[j].style, matches[j].configStyle);
                        }
                        matches[j].themeStyle = Ext.merge(matches[j].themeStyle || {}, style);
                    }
                }
            }
        }

        for (j = 0, lmatches = results.length; j < lmatches; ++j) {
            res = results[j];
            delete res.$themeTimestamp;
        }
    }
});


Ext.define('Ext.chart.theme.Base', {
    singleton: true,
    selectors: [
    {
        "selector": "chart",
        "style": {
            "padding": 10,
            "colors": [
                "#115fa6",
                "#94ae0a",
                "#a61120",
                "#ff8809",
                "#ffd13e",
                "#a61187",
                "#24ad9a",
                "#7c7474",
                "#a66111"
            ]
        },
        "specificity": [
            0,
            0,
            1
        ]
    },
    {
        "selector": "chart axis",
        "style": {
            "color": "#354f6e",
            "fill": "#354f6e",
            "stroke": "#cccccc",
            "stroke-width": 1
        },
        "specificity": [
            0,
            0,
            2
        ]
    },
    {
        "selector": "chart axis label",
        "style": {
            "color": "#354f6e",
            "fill": "#354f6e",
            "font": "12px \"Helvetica\", \"Arial\", \"sans-serif\"",
            "font-weight": "bold",
            "spacing": 2,
            "padding": 5
        },
        "specificity": [
            0,
            0,
            3
        ]
    },
    {
        "selector": "chart axis title",
        "style": {
            "font": "18px \"Helvetica\", \"Arial\", \"sans-serif\"",
            "color": "#354f6e",
            "fill": "#354f6e",
            "padding": 5
        },
        "specificity": [
            0,
            0,
            3
        ]
    },
    {
        "selector": "chart axis[position=\"left\"] title",
        "style": {
            "rotate": {
                "x": 0,
                "y": 0,
                "degrees": 270
            }
        },
        "specificity": [
            0,
            1,
            3
        ]
    },
    {
        "selector": "chart axis[position=\"right\"] title",
        "style": {
            "rotate": {
                "x": 0,
                "y": 0,
                "degrees": 270
            }
        },
        "specificity": [
            0,
            1,
            3
        ]
    },
    {
        "selector": "chart axis[position=\"radial\"]",
        "style": {
            "fill": "none"
        },
        "specificity": [
            0,
            1,
            2
        ]
    },
    {
        "selector": "chart axis[position=\"radial\"] label",
        "style": {
            "font": "10px \"Helvetica\", \"Arial\", \"sans-serif\"",
            "text-anchor": "middle"
        },
        "specificity": [
            0,
            1,
            3
        ]
    },
    {
        "selector": "chart axis[position=\"gauge\"]",
        "style": {
            "fill": "none"
        },
        "specificity": [
            0,
            1,
            2
        ]
    },
    {
        "selector": "chart axis[position=\"gauge\"] label",
        "style": {
            "font": "10px \"Helvetica\", \"Arial\", \"sans-serif\"",
            "text-anchor": "middle"
        },
        "specificity": [
            0,
            1,
            3
        ]
    },
    {
        "selector": "chart series",
        "style": {
            "stroke-width": 1
        },
        "specificity": [
            0,
            0,
            2
        ]
    },
    {
        "selector": "chart series label",
        "style": {
            "font": "12px \"Helvetica\", \"Arial\", \"sans-serif\"",
            "fill": "#333333",
            "display": "none",
            "field": "name",
            "minMargin": "50",
            "orientation": "horizontal"
        },
        "specificity": [
            0,
            0,
            3
        ]
    },
    {
        "selector": "chart series:nth-child(1)",
        "style": {
            "fill": "#115fa6"
        },
        "specificity": [
            0,
            1,
            2
        ]
    },
    {
        "selector": "chart series:nth-child(2)",
        "style": {
            "fill": "#94ae0a"
        },
        "specificity": [
            0,
            1,
            2
        ]
    },
    {
        "selector": "chart series:nth-child(3)",
        "style": {
            "fill": "#a61120"
        },
        "specificity": [
            0,
            1,
            2
        ]
    },
    {
        "selector": "chart series:nth-child(4)",
        "style": {
            "fill": "#ff8809"
        },
        "specificity": [
            0,
            1,
            2
        ]
    },
    {
        "selector": "chart series:nth-child(5)",
        "style": {
            "fill": "#ffd13e"
        },
        "specificity": [
            0,
            1,
            2
        ]
    },
    {
        "selector": "chart series:nth-child(6)",
        "style": {
            "fill": "#a61187"
        },
        "specificity": [
            0,
            1,
            2
        ]
    },
    {
        "selector": "chart series:nth-child(7)",
        "style": {
            "fill": "#24ad9a"
        },
        "specificity": [
            0,
            1,
            2
        ]
    },
    {
        "selector": "chart series:nth-child(8)",
        "style": {
            "fill": "#7c7474"
        },
        "specificity": [
            0,
            1,
            2
        ]
    },
    {
        "selector": "chart series:nth-child(9)",
        "style": {
            "fill": "#a66111"
        },
        "specificity": [
            0,
            1,
            2
        ]
    },
    {
        "selector": "chart series:highlight",
        "style": {
            "radius": 20,
            "stroke-width": 5,
            "stroke": "#ff5555",
            "zIndex": "100"
        },
        "specificity": [
            0,
            1,
            2
        ]
    },
    {
        "selector": "chart series[type=\"line\"]:highlight",
        "style": {
            "stroke-width": 3
        },
        "specificity": [
            0,
            2,
            2
        ]
    },
    {
        "selector": "chart series[type=\"bar\"]:highlight",
        "style": {
            "stroke-width": 3,
            "stroke": "#5555cc",
            "opacity": 0.8
        },
        "specificity": [
            0,
            2,
            2
        ]
    },
    {
        "selector": "chart series[type=\"area\"]:highlight",
        "style": {
            "stroke-width": 3,
            "stroke": "#111111"
        },
        "specificity": [
            0,
            2,
            2
        ]
    },
    {
        "selector": "chart series[type=\"pie\"]:highlight",
        "style": {
            "stroke": "none",
            "stroke-width": 0
        },
        "specificity": [
            0,
            2,
            2
        ]
    },
    {
        "selector": "chart series[type=\"scatter\"]:highlight",
        "style": {
            "stroke": "none",
            "stroke-width": 0
        },
        "specificity": [
            0,
            2,
            2
        ]
    },
    {
        "selector": "chart marker",
        "style": {
            "stroke": "#ffffff",
            "stroke-width": 1,
            "type": "circle",
            "fill": "#000000",
            "radius": 5,
            "size": 5
        },
        "specificity": [
            0,
            0,
            2
        ]
    },
    {
        "selector": "chart marker:nth-child(1)",
        "style": {
            "fill": "#115fa6",
            "type": "circle"
        },
        "specificity": [
            0,
            1,
            2
        ]
    },
    {
        "selector": "chart marker:nth-child(2)",
        "style": {
            "fill": "#94ae0a"
        },
        "specificity": [
            0,
            1,
            2
        ]
    },
    {
        "selector": "chart marker:nth-child(3)",
        "style": {
            "fill": "#a61120"
        },
        "specificity": [
            0,
            1,
            2
        ]
    },
    {
        "selector": "chart marker:nth-child(3)",
        "style": {
            "fill": "#a61120"
        },
        "specificity": [
            0,
            1,
            2
        ]
    },
    {
        "selector": "chart marker:nth-child(4)",
        "style": {
            "fill": "#ff8809"
        },
        "specificity": [
            0,
            1,
            2
        ]
    },
    {
        "selector": "chart marker:nth-child(5)",
        "style": {
            "fill": "#ffd13e"
        },
        "specificity": [
            0,
            1,
            2
        ]
    },
    {
        "selector": "chart marker:nth-child(6)",
        "style": {
            "fill": "#a61187"
        },
        "specificity": [
            0,
            1,
            2
        ]
    },
    {
        "selector": "chart marker:nth-child(7)",
        "style": {
            "fill": "#24ad9a"
        },
        "specificity": [
            0,
            1,
            2
        ]
    },
    {
        "selector": "chart marker:nth-child(8)",
        "style": {
            "fill": "#7c7474"
        },
        "specificity": [
            0,
            1,
            2
        ]
    },
    {
        "selector": "chart marker:nth-child(9)",
        "style": {
            "fill": "#a66111"
        },
        "specificity": [
            0,
            1,
            2
        ]
    },
    {
        "selector": "chart interaction[type=\"itemcompare\"] circle",
        "style": {
            "fill": "rgba(0, 0, 0, 0)",
            "stroke": "#0d75f2",
            "radius": 5
        },
        "specificity": [
            0,
            1,
            3
        ]
    },
    {
        "selector": "chart interaction[type=\"itemcompare\"] line",
        "style": {
            "stroke": "#0d75f2",
            "stroke-width": 3
        },
        "specificity": [
            0,
            1,
            3
        ]
    },
    {
        "selector": "chart interaction[type=\"itemcompare\"] arrow",
        "style": {
            "fill": "#0d75f2",
            "radius": 8
        },
        "specificity": [
            0,
            1,
            3
        ]
    },
    {
        "selector": "chart interaction[type=\"piegrouping\"] slice",
        "style": {
            "stroke": "#0d75f2",
            "stroke-width": 2,
            "fill": "#0d75f2",
            "opacity": 0.5
        },
        "specificity": [
            0,
            1,
            3
        ]
    },
    {
        "selector": "chart interaction[type=\"piegrouping\"] handle",
        "style": {
            "stroke": "#0d75f2",
            "stroke-width": 2,
            "fill": "#0d75f2"
        },
        "specificity": [
            0,
            1,
            3
        ]
    }
]
});
Ext.define('Ext.chart.theme.Demo', {
    singleton: true,
    selectors: [
    {
        "selector": "chart[themeCls=\"area1\"] axis[position=\"left\"] grid even",
        "style": {
            "opacity": 1,
            "fill": "#dddddd",
            "stroke": "#bbbbbb",
            "stroke-width": 1
        },
        "specificity": [
            0,
            2,
            4
        ]
    },
    {
        "selector": "chart[themeCls=\"area1\"] axis[position=\"bottom\"] label",
        "style": {
            "rotate": {
                "degrees": 45
            }
        },
        "specificity": [
            0,
            2,
            3
        ]
    },
    {
        "selector": "chart[themeCls=\"area1\"] series",
        "style": {
            "opaciy": "0.93"
        },
        "specificity": [
            0,
            1,
            2
        ]
    },
    {
        "selector": "chart[themeCls=\"bar1\"] axis[position=\"bottom\"] grid",
        "style": {
            "stroke": "#cccccc"
        },
        "specificity": [
            0,
            2,
            3
        ]
    },
    {
        "selector": "chart[themeCls=\"column1\"]",
        "style": {
            "background": "#111111"
        },
        "specificity": [
            0,
            1,
            1
        ]
    },
    {
        "selector": "chart[themeCls=\"column1\"] axis",
        "style": {
            "stroke": "#eeeeee",
            "fill": "#eeeeee"
        },
        "specificity": [
            0,
            1,
            2
        ]
    },
    {
        "selector": "chart[themeCls=\"column1\"] axis label",
        "style": {
            "fill": "#ffffff"
        },
        "specificity": [
            0,
            1,
            3
        ]
    },
    {
        "selector": "chart[themeCls=\"column1\"] axis title",
        "style": {
            "fill": "#ffffff"
        },
        "specificity": [
            0,
            1,
            3
        ]
    },
    {
        "selector": "chart[themeCls=\"column1\"] axis[position=\"left\"] grid odd",
        "style": {
            "stroke": "#555555"
        },
        "specificity": [
            0,
            2,
            4
        ]
    },
    {
        "selector": "chart[themeCls=\"column1\"] axis[position=\"left\"] grid even",
        "style": {
            "stroke": "#555555"
        },
        "specificity": [
            0,
            2,
            4
        ]
    },
    {
        "selector": "chart[themeCls=\"column1\"] series label",
        "style": {
            "fill": "#ffffff",
            "font": "17px Arial",
            "display": "insideEnd",
            "text-anchor": "middle",
            "orientation": "horizontal"
        },
        "specificity": [
            0,
            1,
            3
        ]
    },
    {
        "selector": "chart[themeCls=\"barcombo1\"] axis[position=\"bottom\"] grid",
        "style": {
            "stroke": "#cccccc"
        },
        "specificity": [
            0,
            2,
            3
        ]
    },
    {
        "selector": "chart[themeCls=\"piecombo1\"]",
        "style": {
            "padding": 20
        },
        "specificity": [
            0,
            1,
            1
        ]
    },
    {
        "selector": "chart[themeCls=\"piecombo1\"] series label",
        "style": {
            "display": "rotate",
            "contrast": true,
            "font": "14px Arial"
        },
        "specificity": [
            0,
            1,
            3
        ]
    },
    {
        "selector": "chart[themeCls=\"gaugecombo1\"]",
        "style": {
            "padding": 30
        },
        "specificity": [
            0,
            1,
            1
        ]
    },
    {
        "selector": "chart[themeCls=\"gaugecombo1\"] axis",
        "style": {
            "stroke": "#cccccc"
        },
        "specificity": [
            0,
            1,
            2
        ]
    },
    {
        "selector": "chart[themeCls=\"gaugecombo1\"] axis label",
        "style": {
            "font": "15px Arial"
        },
        "specificity": [
            0,
            1,
            3
        ]
    },
    {
        "selector": "chart[themeCls=\"radarcombo1\"]",
        "style": {
            "padding": 20
        },
        "specificity": [
            0,
            1,
            1
        ]
    },
    {
        "selector": "chart[themeCls=\"radarcombo1\"] axis",
        "style": {
            "stroke": "#cccccc",
            "fill": "none"
        },
        "specificity": [
            0,
            1,
            2
        ]
    },
    {
        "selector": "chart[themeCls=\"radarcombo1\"] axis label",
        "style": {
            "font": "11px Arial",
            "text-anchor": "middle"
        },
        "specificity": [
            0,
            1,
            3
        ]
    },
    {
        "selector": "chart[themeCls=\"radarcombo1\"] series",
        "style": {
            "opacity": 0.4
        },
        "specificity": [
            0,
            1,
            2
        ]
    },
    {
        "selector": "chart[themeCls=\"line1\"] axis[position=\"left\"] grid odd",
        "style": {
            "opacity": 1,
            "fill": "#dddddd",
            "stroke": "#bbbbbb",
            "stroke-width": 0.5
        },
        "specificity": [
            0,
            2,
            4
        ]
    },
    {
        "selector": "chart[themeCls=\"line1\"] marker",
        "style": {
            "size": 4,
            "radius": 4,
            "stroke-width": 0
        },
        "specificity": [
            0,
            1,
            2
        ]
    },
    {
        "selector": "chart[themeCls=\"line1\"] series:nth-child(1) marker",
        "style": {
            "type": "image",
            "height": "46",
            "width": "46",
            "src": "\"../resources/shared/img/iphone.png\""
        },
        "specificity": [
            0,
            2,
            3
        ]
    },
    {
        "selector": "chart[themeCls=\"line1\"] series:nth-child(2) marker",
        "style": {
            "type": "image",
            "height": "46",
            "width": "46",
            "src": "\"../resources/shared/img/android.png\""
        },
        "specificity": [
            0,
            2,
            3
        ]
    },
    {
        "selector": "chart[themeCls=\"line1\"] series:nth-child(3) marker",
        "style": {
            "type": "image",
            "height": "46",
            "width": "46",
            "src": "\"../resources/shared/img/ipad.png\""
        },
        "specificity": [
            0,
            2,
            3
        ]
    },
    {
        "selector": "chart[themeCls=\"pie1\"]",
        "style": {
            "padding": 10
        },
        "specificity": [
            0,
            1,
            1
        ]
    },
    {
        "selector": "chart[themeCls=\"pie1\"] series label",
        "style": {
            "display": "rotate",
            "contrast": true,
            "font": "18px Helvetica, Arial, sans-serif"
        },
        "specificity": [
            0,
            1,
            3
        ]
    },
    {
        "selector": "chart[themeCls=\"radar1\"]",
        "style": {
            "padding": 20
        },
        "specificity": [
            0,
            1,
            1
        ]
    },
    {
        "selector": "chart[themeCls=\"radar1\"] axis",
        "style": {
            "stroke": "#cccccc",
            "fill": "none"
        },
        "specificity": [
            0,
            1,
            2
        ]
    },
    {
        "selector": "chart[themeCls=\"radar1\"] axis label",
        "style": {
            "font": "11px Arial",
            "text-anchor": "middle"
        },
        "specificity": [
            0,
            1,
            3
        ]
    },
    {
        "selector": "chart[themeCls=\"radar1\"] series",
        "style": {
            "opacity": 0.4
        },
        "specificity": [
            0,
            1,
            2
        ]
    },
    {
        "selector": "chart[themeCls=\"scatter1\"]",
        "style": {
            "padding": 40
        },
        "specificity": [
            0,
            1,
            1
        ]
    },
    {
        "selector": "chart[themeCls=\"scatter1\"] axis[position=\"left\"] grid odd",
        "style": {
            "opacity": 1,
            "fill": "#dddddd",
            "stroke": "#bbbbbb",
            "stroke-width": 0.5
        },
        "specificity": [
            0,
            2,
            4
        ]
    },
    {
        "selector": "chart[themeCls=\"scatter1\"] marker",
        "style": {
            "size": 8,
            "radius": 8
        },
        "specificity": [
            0,
            1,
            2
        ]
    },
    {
        "selector": "chart[themeCls=\"stock1\"] axis label",
        "style": {
            "font": "12px Arial"
        },
        "specificity": [
            0,
            1,
            3
        ]
    },
    {
        "selector": "chart[themeCls=\"stock1\"] axis[position=\"left\"] grid",
        "style": {
            "stroke": "#cccccc"
        },
        "specificity": [
            0,
            2,
            3
        ]
    }
]
});
Ext.define('Ext.chart.theme.Energy', {
    singleton: true,
    selectors: [
    {
        "selector": "chart",
        "style": {
            "colors": [
                "rgba(17, 95, 166, 0.85)",
                "rgba(148, 174, 10, 0.85)",
                "rgba(166, 17, 32, 0.85)",
                "rgba(255, 136, 9, 0.85)",
                "rgba(255, 209, 62, 0.85)",
                "rgba(166, 17, 135, 0.85)",
                "rgba(36, 173, 154, 0.85)",
                "rgba(124, 116, 116, 0.85)",
                "rgba(166, 97, 17, 0.85)"
            ]
        },
        "specificity": [
            0,
            0,
            1
        ]
    },
    {
        "selector": "chart series",
        "style": {
            "stroke-width": 2
        },
        "specificity": [
            0,
            0,
            2
        ]
    },
    {
        "selector": "chart series grid odd",
        "style": {
            "stroke": "#333333"
        },
        "specificity": [
            0,
            0,
            4
        ]
    },
    {
        "selector": "chart series grid even",
        "style": {
            "stroke": "#222222"
        },
        "specificity": [
            0,
            0,
            4
        ]
    },
    {
        "selector": "chart axis",
        "style": {
            "stroke": "#555555",
            "fill": "#555555"
        },
        "specificity": [
            0,
            0,
            2
        ]
    },
    {
        "selector": "chart axis label",
        "style": {
            "fill": "#666666"
        },
        "specificity": [
            0,
            0,
            3
        ]
    },
    {
        "selector": "chart axis title",
        "style": {
            "fill": "#cccccc"
        },
        "specificity": [
            0,
            0,
            3
        ]
    },
    {
        "selector": "chart axis[position=\"radial\"]",
        "style": {
            "fill": "none"
        },
        "specificity": [
            0,
            1,
            2
        ]
    },
    {
        "selector": "chart axis[position=\"radial\"] label",
        "style": {
            "fill": "#ffffff",
            "text-anchor": "center",
            "translate": {
                "x": 0,
                "y": -10
            }
        },
        "specificity": [
            0,
            1,
            3
        ]
    },
    {
        "selector": "chart[themeCls=\"radar\"]",
        "style": {
            "padding": 40
        },
        "specificity": [
            0,
            1,
            1
        ]
    },
    {
        "selector": "chart[themeCls=\"radar\"] series",
        "style": {
            "opacity": 0.4
        },
        "specificity": [
            0,
            1,
            2
        ]
    }
]
});
Ext.define('Ext.chart.theme.WorldData', {
    singleton: true,
    selectors: [
    {
        "selector": "chart",
        "style": {
            "colors": [
                "#49080e",
                "#49080e",
                "#d7a400"
            ],
            "background": "#dbddd8"
        },
        "specificity": [
            0,
            0,
            1
        ]
    },
    {
        "selector": "chart series:highlight",
        "style": {
            "radius": 5,
            "stroke-width": 3,
            "stroke": "#ffffff"
        },
        "specificity": [
            0,
            1,
            2
        ]
    },
    {
        "selector": "chart axis",
        "style": {
            "stroke": "#c2c4be",
            "fill": "#c2c4be"
        },
        "specificity": [
            0,
            0,
            2
        ]
    },
    {
        "selector": "chart axis grid",
        "style": {
            "stroke": "#c2c4be"
        },
        "specificity": [
            0,
            0,
            3
        ]
    },
    {
        "selector": "chart axis label",
        "style": {
            "fill": "#909488"
        },
        "specificity": [
            0,
            0,
            3
        ]
    },
    {
        "selector": "chart axis title",
        "style": {
            "fill": "#43453e"
        },
        "specificity": [
            0,
            0,
            3
        ]
    }
]
});

/**
 * @class Ext.chart.theme.Style
 * @ignore
 */
Ext.define('Ext.chart.theme.Style', {

    constructor: function(config) {
        config = config || {};

        if (config.parent) {
            this.themeStyle = Ext.Object.chain(config.parent);
        } else {
            this.themeStyle = {};
        }

        this.themeStyle.reset = function () {
            Ext.Object.each(this, function(name) {
                delete this[name];
            });
        };
        this.themeStyle = Ext.Object.chain(this.themeStyle);
        this.style = Ext.Object.chain(this.themeStyle);
        Ext.apply(this.style, config);
    }
});

/**
 * @class Ext.chart.theme.LabelStyle
 * @ignore
 *
 * @xtype label
 */
Ext.define('Ext.chart.theme.LabelStyle', { 
 
    extend: 'Ext.chart.theme.Style',
    
    constructor: function(config) {
        this.callParent(arguments);
    },
    
    /* ---------------------------------
      Methods needed for ComponentQuery
     ----------------------------------*/
    
    isXType: function(xtype) {
        return xtype === 'label';
    }
});

/**
 * @class Ext.chart.theme.HighlightStyle
 * @ignore
 *
 * @xtype marker
 */
Ext.define('Ext.chart.theme.HighlightStyle', { 
 
    extend: 'Ext.chart.theme.Style',
    
    constructor: function(config) {
        this.callParent(arguments);
    },
    
    /* ---------------------------------
      Methods needed for ComponentQuery
     ----------------------------------*/
    
    isXType: function(xtype) {
        return xtype === 'highlight';
    },
    
    getRefItems: function(deep) {
        return [];
    }
});




/**
 * @class Ext.chart.theme.MarkerStyle
 * @ignore
 *
 * @xtype marker
 */
Ext.define('Ext.chart.theme.MarkerStyle', { 

    extend: 'Ext.chart.theme.Style',
    
    constructor: function(config) {
      this.callParent(arguments);
    },
    
    /* ---------------------------------
      Methods needed for ComponentQuery
     ----------------------------------*/
    
    isXType: function(xtype) {
        return xtype === 'marker';
    }
});

/**
 * @class Ext.chart.theme.TitleStyle
 * @ignore
 *
 * @xtype title
 */
Ext.define('Ext.chart.theme.TitleStyle', { 
 
    extend: 'Ext.chart.theme.Style',
    
    constructor: function(config) {
        this.callParent(arguments);
    },
    
    /* ---------------------------------
      Methods needed for ComponentQuery
     ----------------------------------*/
    
    isXType: function(xtype) {
        return xtype === 'title';
    }
});

/**
 * @class Ext.chart.theme.CalloutStyle
 * @ignore
 *
 * @xtype marker
 */
Ext.define('Ext.chart.theme.CalloutStyle', { 
 
    extend: 'Ext.chart.theme.Style',
    uses: [
        'Ext.chart.theme.OddStyle',
        'Ext.chart.theme.EvenStyle'
    ],
    constructor: function(config) {
        this.callParent(arguments);
        this.oddStyle = new Ext.chart.theme.OddStyle();
        this.evenStyle = new Ext.chart.theme.EvenStyle();
    },
    
    /* ---------------------------------
      Methods needed for ComponentQuery
     ----------------------------------*/
    
    isXType: function(xtype) {
        return xtype === 'callout';
    },
    
    getRefItems: function(deep) {
        return [];
    }
});



/**
 * @class Ext.chart.theme.GridStyle
 * @ignore
 *
 * @xtype marker
 */
Ext.define('Ext.chart.theme.GridStyle', { 
 
    extend: 'Ext.chart.theme.Style',
    
    uses: [
        'Ext.chart.theme.OddStyle',
        'Ext.chart.theme.EvenStyle'
    ],
    
    constructor: function(config) {
        var me = this, odd = config.odd, even = config.even;
        delete config.odd;
        delete config.even;
        me.callParent(arguments);
        me.oddStyle = Ext.create('Ext.chart.theme.OddStyle', Ext.apply({parent: me.style}, odd));
        me.evenStyle = Ext.create('Ext.chart.theme.EvenStyle', Ext.apply({parent: me.style}, even));
    },
    
    isXType: function(xtype) {
        return xtype === 'grid';
    },
    
    getRefItems: function(deep) {
        return [ this.oddStyle, this.evenStyle ];
    }
});


/**
 * @class Ext.chart.theme.EvenStyle
 * @ignore
 *
 * @xtype even
 */
Ext.define('Ext.chart.theme.EvenStyle', { 
 
    extend: 'Ext.chart.theme.Style',
    
    constructor: function(config) {
        this.callParent(arguments);
    },
    
    /* ---------------------------------
      Methods needed for ComponentQuery
     ----------------------------------*/
    
    isXType: function(xtype) {
        return xtype === 'even';
    }
});



/**
 * @class Ext.chart.theme.OddStyle
 * @ignore
 *
 * @xtype odd
 */
Ext.define('Ext.chart.theme.OddStyle', { 
 
    extend: 'Ext.chart.theme.Style',

    constructor: function(config) {
        this.callParent(arguments);
    },
    
    /* ---------------------------------
      Methods needed for ComponentQuery
     ----------------------------------*/
    
    isXType: function(xtype) {
        return xtype === 'odd';
    }
});


/**
 * @class Ext.chart.Chart
 * @extends Ext.draw.Component
 *
 * The Ext.chart package provides the capability to visualize data.
 * Each chart binds directly to an Ext.data.Store enabling automatic updates of the chart.
 * A chart configuration object has some overall styling options as well as an array of axes
 * and series. A chart instance example could look like:
 *
  <pre><code>
    new Ext.chart.Chart({
        renderTo: Ext.getBody(),
        width: 800,
        height: 600,
        animate: true,
        store: store1,
        shadow: true,
        theme: 'Category1',
        legend: {
            position: 'right'
        },
        axes: [ ...some axes options... ],
        series: [ ...some series options... ]
    });
  </code></pre>
 *
 * In this example we set the `width` and `height` of the chart, we decide whether our series are
 * animated or not and we select a store to be bound to the chart. We also turn on shadows for all series,
 * select a color theme `Category1` for coloring the series, set the legend to the right part of the chart and
 * then tell the chart to render itself in the body element of the document. For more information about the axes and
 * series configurations please check the documentation of each series (Line, Bar, Pie, etc).
 *
 * @xtype chart
 */

Ext.define('Ext.chart.Chart', { 
 
    extend: 'Ext.draw.Component',
    xtype: 'chart',

    mixins: {
        theme: 'Ext.chart.theme.Theme'
    },
    
    uses: [
        'Ext.draw.Draw',
        'Ext.chart.Legend',
        'Ext.chart.interactions.Abstract',
        'Ext.chart.axis.Axis',
        'Ext.util.SizeMonitor'
    ],
    /**
     * @event beforerefresh
     * Fires before a refresh to the chart data is called.  If the beforerefresh handler returns
     * <tt>false</tt> the {@link #refresh} action will be cancelled.
     * @param {Ext.chart.Chart} this
     */

    /**
     * @event refresh
     * Fires after the chart data has been refreshed.
     * @param {Ext.chart.Chart} this
     */

    /**
     * @event redraw
     * Fires after the chart is redrawn
     * @param {Ext.chart.Chart} this
     */

    /**
     * @event itemmousemove
     * Fires when the mouse is moved on a series item.
     * @param {Ext.chart.series.Series} series
     * @param {Object} item
     * @param {Event} event
     */
    /**
     * @event itemmouseup
     * Fires when a mouseup event occurs on a series item.
     * @param {Ext.chart.series.Series} series
     * @param {Object} item
     * @param {Event} event
     */
    /**
     * @event itemmousedown
     * Fires when a mousedown event occurs on a series item.
     * @param {Ext.chart.series.Series} series
     * @param {Object} item
     * @param {Event} event
     */
    /**
     * @event itemmouseover
     * Fires when the mouse enters a series item.
     * @param {Ext.chart.series.Series} series
     * @param {Object} item
     * @param {Event} event
     */
    /**
     * @event itemmouseout
     * Fires when the mouse exits a series item.
     * @param {Ext.chart.series.Series} series
     * @param {Object} item
     * @param {Event} event
     */
    /**
     * @event itemclick
     * Fires when a click event occurs on a series item.
     * @param {Ext.chart.series.Series} series
     * @param {Object} item
     * @param {Event} event
     */
    /**
     * @event itemdoubleclick
     * Fires when a doubleclick event occurs on a series item.
     * @param {Ext.chart.series.Series} series
     * @param {Object} item
     * @param {Event} event
     */
    /**
     * @event itemtap
     * Fires when a tap event occurs on a series item.
     * @param {Ext.chart.series.Series} series
     * @param {Object} item
     * @param {Event} event
     */
    /**
     * @event itemtapstart
     * Fires when a tapstart event occurs on a series item.
     * @param {Ext.chart.series.Series} series
     * @param {Object} item
     * @param {Event} event
     */
    /**
     * @event itemtapend
     * Fires when a tapend event occurs on a series item.
     * @param {Ext.chart.series.Series} series
     * @param {Object} item
     * @param {Event} event
     */
    /**
     * @event itemtapcancel
     * Fires when a tapcancel event occurs on a series item.
     * @param {Ext.chart.series.Series} series
     * @param {Object} item
     * @param {Event} event
     */
    /**
     * @event itemtaphold
     * Fires when a taphold event occurs on a series item.
     * @param {Ext.chart.series.Series} series
     * @param {Object} item
     * @param {Event} event
     */
    /**
     * @event itemdoubletap
     * Fires when a doubletap event occurs on a series item.
     * @param {Ext.chart.series.Series} series
     * @param {Object} item
     * @param {Event} event
     */
    /**
     * @event itemsingletap
     * Fires when a singletap event occurs on a series item.
     * @param {Ext.chart.series.Series} series
     * @param {Object} item
     * @param {Event} event
     */
    /**
     * @event itemtouchstart
     * Fires when a touchstart event occurs on a series item.
     * @param {Ext.chart.series.Series} series
     * @param {Object} item
     * @param {Event} event
     */
    /**
     * @event itemtouchmove
     * Fires when a touchmove event occurs on a series item.
     * @param {Ext.chart.series.Series} series
     * @param {Object} item
     * @param {Event} event
     */
    /**
     * @event itemtouchend
     * Fires when a touchend event occurs on a series item.
     * @param {Ext.chart.series.Series} series
     * @param {Object} item
     * @param {Event} event
     */
    /**
     * @event itemdragstart
     * Fires when a dragstart event occurs on a series item.
     * @param {Ext.chart.series.Series} series
     * @param {Object} item
     * @param {Event} event
     */
    /**
     * @event itemdrag
     * Fires when a drag event occurs on a series item.
     * @param {Ext.chart.series.Series} series
     * @param {Object} item
     * @param {Event} event
     */
    /**
     * @event itemdragend
     * Fires when a dragend event occurs on a series item.
     * @param {Ext.chart.series.Series} series
     * @param {Object} item
     * @param {Event} event
     */
    /**
     * @event itempinchstart
     * Fires when a pinchstart event occurs on a series item.
     * @param {Ext.chart.series.Series} series
     * @param {Object} item
     * @param {Event} event
     */
    /**
     * @event itempinch
     * Fires when a pinch event occurs on a series item.
     * @param {Ext.chart.series.Series} series
     * @param {Object} item
     * @param {Event} event
     */
    /**
     * @event itempinchend
     * Fires when a pinchend event occurs on a series item.
     * @param {Ext.chart.series.Series} series
     * @param {Object} item
     * @param {Event} event
     */
    /**
     * @event itemswipe
     * Fires when a swipe event occurs on a series item.
     * @param {Ext.chart.series.Series} series
     * @param {Object} item
     * @param {Event} event
     */

    /**
     * @property version Current Version of Touch Charts
     * @type {String}
     */
    version : '2.0.0b',

    // @private
    viewBox: false,
    
    config: {

        /**
         * @cfg {Ext.data.Store} store
         * The store that supplies data to this chart.
         */
        store: null,

        /**
         * @cfg {Boolean/Object} shadow (optional) true for the default shadow configuration (shadowOffsetX: 2, shadowOffsetY: 2, shadowBlur: 3, shadowColor: '#444')
         * or a standard shadow config object to be used for default chart shadows.
         */
        shadow: false,

        /**
         * @cfg {Boolean/Object} animate (optional) true for the default animation (easing: 'ease' and duration: 500)
         * or a standard animation config object to be used for default chart animations.
         */
        animate: false,

        /**
         * @cfg {Ext.chart.series.Series} series
         * Array of {@link Ext.chart.series.Series Series} instances or config objects. For example:
         *
         * series: [{
         *      type: 'column',
         *      axis: 'left',
         *      listeners: {
         *          'afterrender': function() {
         *              console('afterrender');
         *          }
         *      },
         *      xField: 'category',
         *      yField: 'data1'
         * }]
         */
        series: [],

        /**
         * @cfg {Ext.chart.axis.Axis} axes
         * Array of {@link Ext.chart.axis.Axis Axis} instances or config objects. For example:
         *
         * axes: [{
         *      type: 'Numeric',
         *      position: 'left',
         *      fields: ['data1'],
         *      title: 'Number of Hits',
         *      minimum: 0,
         *      //one minor tick between two major ticks
         *      minorTickSteps: 1
         * }, {
         *      type: 'Category',
         *      position: 'bottom',
         *      fields: ['name'],
         *      title: 'Month of the Year'
         * }]
         */
        axes: [],

        /**
         * @cfg {Boolean/Object} legend (optional) true for the default legend display or a legend config object. 
         */
        legend: null,
        
        /**
         * @cfg {String} theme (optional) The name of the theme to be used. A theme defines the colors and
         * other visual displays of tick marks on axis, text, title text, line colors, marker colors and styles, etc.
         * Possible theme values are 'Base', 'Green', 'Sky', 'Red', 'Purple', 'Blue', 'Yellow' and also six category themes
         * 'Category1' to 'Category6'. Default value is 'Base'.
         */
        theme: 'Base',

        /**
         * @cfg {String}
         * The class name used only in theming system.
         */
        themeCls: '',
        /**
         * @cfg {Boolean/Array} colors Array of colors/gradients to override the color of items and legends.
         */
        colors: null,

        /**
         * @cfg {Number} insetPadding Set the amount of inset padding in pixels for the chart.
         */
        insetPadding: 10,

        /**
         * @cfg {Object|Boolean} background (optional) Set the chart background. This can be a gradient object, image, or color.
         *
         * For example, if `background` were to be a color we could set the object as
         *
         <pre><code>
            background: {
                //color string
                fill: '#ccc'
            }
         </code></pre>

         You can specify an image by using:

         <pre><code>
            background: {
                image: 'http://path.to.image/'
            }
         </code></pre>

         Also you can specify a gradient by using the gradient object syntax:

         <pre><code>
            background: {
                gradient: {
                    id: 'gradientId',
                    angle: 45,
                    stops: {
                        0: {
                            color: '#555'
                        }
                        100: {
                            color: '#ddd'
                        }
                    }
                }
            }
         </code></pre>
         */
        background: false,

        maxGutter: [0, 0],

        /**
         * @cfg {Array} interactions
         * Interactions are optional modules that can be plugged in to a chart to allow the user to interact
         * with the chart and its data in special ways. The `interactions` config takes an Array of Object
         * configurations, each one corresponding to a particular interaction class identified by a `type` property:
         *
         *     new Ext.chart.Chart({
         *         renderTo: Ext.getBody(),
         *         width: 800,
         *         height: 600,
         *         store: store1,
         *         axes: [ ...some axes options... ],
         *         series: [ ...some series options... ],
         *         interactions: [{
         *             type: 'interactiontype'
         *             // ...additional configs for the interaction...
         *         }]
         *     });
         *
         * When adding an interaction which uses only its default configuration (no extra properties other than `type`),
         * you can alternately specify only the type as a String rather than the full Object:
         *
         *     interactions: ['reset', 'rotate']
         *
         * The current supported interaction types include:
         *
         * - {@link Ext.chart.interactions.PanZoom panzoom} - allows pan and zoom of axes
         * - {@link Ext.chart.interactions.ItemCompare itemcompare} - allows selection and comparison of two data points
         * - {@link Ext.chart.interactions.ItemHighlight itemhighlight} - allows highlighting of series data points
         * - {@link Ext.chart.interactions.ItemInfo iteminfo} - allows displaying details of a data point in a popup panel
         * - {@link Ext.chart.interactions.PieGrouping piegrouping} - allows selection of multiple consecutive pie slices
         * - {@link Ext.chart.interactions.Rotate rotate} - allows rotation of pie and radar series
         * - {@link Ext.chart.interactions.Reset reset} - allows resetting of all user interactions to the default state
         * - {@link Ext.chart.interactions.ToggleStacked togglestacked} - allows toggling a multi-yField bar/column chart between stacked and grouped
         *
         * See the documentation for each of those interaction classes to see how they can be configured.
         *
         * Additional custom interactions can be registered with the {@link Ext.chart.interactions.Manager interaction manager}.
         */
        interactions: [],


        /**
         * @cfg {Object} toolbar
         * Optional configuration for this chart's toolbar. The toolbar docks itself to one side of the chart
         * and can contain buttons for handling certain actions. For example, if the chart legend is configured
         * with {@link Ext.chart.Legend#dock dock:true} then a button for bringing up the legend will be placed
         * in this toolbar. Custom may also be added to the toolbar if desired.
         *
         * See the {@link Ext.chart.Toolbar} docs for the recognized config properties.
         */
        toolbar: {}
    },

    colorArrayStyle: [],

    /**
     * @private The z-indexes to use for the various surfaces
     */
    surfaceZIndexes: {
        main: 0,
        axis: 1,
        series: 2,
        overlay: 3,
        events: 4
    },
    
    constructor: function(config) {
        var me = this,
            defaultAnim,
            p, i, l, colors, color, colorArrayStyle;

        config = Ext.apply({}, config);
        if (me.gradients) {
            Ext.apply(config, { gradients: me.gradients });
        }
        if (me.background) {
            Ext.apply(config, { background: me.background });
        }
        if (config.animate) {
            defaultAnim = {
                easing: 'easeInOut',
                duration: 500
            };
            if (Ext.isObject(config.animate)) {
                config.animate = Ext.applyIf(config.animate, defaultAnim);
            }
            else {
                config.animate = defaultAnim;
            }
        }

        me.chartBBox = {x: 0, y: 0, width: 0, height: 0};
        if (config.theme) {
            me.applyStyles(config.theme);
        }

        me.callParent(arguments);

        this.surface.destroy();
        delete this.surface;
    },

    applyStyles: function (theme) {
        var me = this;
        me.mixins.theme.applyStyles.call(me, theme);
        me.colorArrayStyle = [];
        if (me.style && me.style.colors) {
            colors = me.style.colors;
            colorArrayStyle = me.colorArrayStyle;
            for (i = 0, l = colors.length; i < l; ++i) {
                color = colors[i];
                if (Ext.isObject(color)) {
                    for (p in me.surfaces) {
                        me.surfaces[p].addGradient(color);
                    }
                    colorArrayStyle.push('url(#' + color.id + ')');
                } else {
                    colorArrayStyle.push(color);
                }
            }
        }
    },

    initialize: function() {
        var me = this, ref;

        Ext.applyIf(me, {
            zoom: {
                width: 1,
                height: 1,
                x: 0,
                y: 0
            }
        });
        me.maxGutter = me.maxGutter || [0, 0];

        if (me.tipRenderer) {
            ref = me.getFunctionRef(me.tipRenderer);
            me.setTipRenderer(ref.fn, ref.scope);
        }
        
        me.callParent();

        me.getAxes().each(function (axis) {
            if(axis.initialize) {
                axis.initialize();
            }
        });
        me.getSeries().each(function (series) {
            if (series.initialize) {
                series.initialize();
            }
        });
        me.getInteractions().each(function(interaction) {
            interaction.initializeDefaults({
                type: 'beforerender'
            });
            if (me.getAnimate()) {
                //on after render callback should remove itself since it's
                //only called once.
                var callback = function() {
                    me.getInteractions().each(function(interaction) {
                        interaction.initializeDefaults({
                            type: 'afterrender'
                        });
                    });
                    me.getSeries().get(0).removeListener('afterrender', callback);
                };
            } else {
                interaction.initializeDefaults();
            }
            if (interaction.initialize) {
                interaction.initialize();
            }
        });

        Ext.Viewport.on('orientationchange', me.redraw, me);
    },

    onPainted: function() {
        this.callParent();
        var me = this;
        me.getSurface('main');

        me.applyStyles();
        me.onResize();
    },

    onResize: function () {
        var me = this;
        if (!me.resizeTask) {
            me.resizeTask = new Ext.util.DelayedTask(function() { me.redraw(true); }, me);
        } else {
            me.resizeTask.cancel();
        }
        me.resizeTask.delay(1);
    },
    
    getEventsSurface: function() {
        return this.getSurface('events');
    },

    getSurface: function(name) {
        var me = this,
            surfaces = me.surfaces || (me.surfaces = {}),
            surface = surfaces[name],
            zIndexes = me.surfaceZIndexes,
            element;
        if (!surface) {
            surface = surfaces[name] = me.createSurface({
                background: null,
                initEvents: (name == 'events')
            });
            element = surface.element;
            element.setStyle('position', 'absolute');
            element.setStyle('top', 0);
            element.setStyle('left', 0);
            // Apply z-index if surface name is in the surfaceZIndexes mapping
            if (name in zIndexes) {
                element.setStyle('zIndex', zIndexes[name]);
            } else {
                element.setStyle('zIndex', zIndexes.main);
            }
        }
        return surface;
    },

    applyColors: function (colors) {
        if (Ext.isArray(colors)) {
            var me = this, colorArrayStyle = colors.slice(0),
                i, l, color;
            for (i = 0, l = colors.length; i < l; ++i) {
                color = colors[i];
                if (Ext.isObject(color)) {
                    for (p in me.surfaces) {
                        me.surfaces[p].addGradient(color);
                    }
                    colorArrayStyle.push('url(#' + color.id + ')');
                } else {
                    colorArrayStyle.push(color);
                }
            }
            return colorArrayStyle;
        }
        return colors;
    },

    getColorsStyle: function () {
        return this.getColors() || this.colorArrayStyle;
    },

    applyToolbar: function(toolbar, currentToolbarInstance) {
        return Ext.factory(toolbar, Ext.chart.Toolbar, currentToolbarInstance);
    },

    updateToolbar: function(toolbar) {
        if (toolbar) {
            toolbar.setChart(this);
        }
    },
    
    applyAxes: function (axes, oldAxes) {
        var me = this,
            collection = new Ext.util.MixedCollection(false, function(a) { return a.getPosition(); }),
            ln = axes.length, i;
        if (!axes) {
            return;
        }
        if (!Ext.isArray(axes) && !(axes instanceof Ext.util.MixedCollection)) {
            axes = [axes];
            ln = 1;
        }
        if (Ext.isArray(axes)) {
            axes.each = function(fn) { Ext.each(axes, fn); };
        }

        axes.each(function (axis) {
            if (!(axis instanceof Ext.chart.axis.Axis)) {
                axis.chart = me;
                collection.add(axis = Ext.create('Ext.chart.axis.' + me.capitalize(axis.type), axis));
            }
        });
        if (oldAxes) {
            oldAxes.each(function (axis) {
                if (!collection.contains(axis)) {
                    axis.destroy();
                }
            });
        }
        return collection;
    },

    updateTheme: function (n, o) {
        this.applyStyles();
    },

    updateAxes: function (n, o) {
        this.applyStyles();
    },

    updateSeries: function (newSeries, oldSeries) {
        this.applyStyles();
    },

    applySeries: function (series, oldSeries) {
        var me = this,
            collection = new Ext.util.MixedCollection(false, function(a) { return a.seriesId; }),
            ln = series.length, i;
        if (!series) {
            return;
        }
        if (!Ext.isArray(series) && !(series instanceof Ext.util.MixedCollection)) {
            series = [series];
            ln = 1;
        }
        if (Ext.isArray(series)) {
            series.each = function(fn) { Ext.each(series, fn); };
        }
        series.each(function (series) {
            if (!(series instanceof Ext.chart.series.Series)) {
                series.chart = me;
                collection.add(series = Ext.create('Ext.chart.series.' + me.capitalize(series.type), series));
            }
        });
        if (oldSeries) {
            oldSeries.each(function (seriesItem) {
                if (!collection.contains(seriesItem)) {
                    seriesItem.destroy();
                }
            });
        }
        return collection;
    },

    applyInteractions: function (interactions) {
        var me = this,
            collection = new Ext.util.MixedCollection(false, function(a) {
                return a.type;
            }),
            ln = interactions.length, i;

        if (!interactions) {
            return;
        }
        if (!Ext.isArray(interactions) && !(interactions instanceof Ext.util.MixedCollection)) {
            interactions = [interactions];
            ln = 1;
        }
        if (Ext.isArray(interactions)) {
            interactions.each = function(fn) { Ext.each(interactions, fn); };
        }
        interactions.each(function (interaction) {
            if (Ext.isString(interaction)) {
                interaction = {type: interaction};
            }
            if (!(interaction instanceof Ext.chart.interactions.Abstract)) {
                interaction.chart = me;
                collection.add(interaction = Ext.chart.interactions.Manager.create(interaction));
                
            }
        });
        return collection;
    },

    applyLegend: function (legend, oldLegend) {
        var me = this;
        if (legend === oldLegend) {
            return legend;
        }
        legend = Ext.factory(legend, Ext.chart.Legend, oldLegend);
        if (oldLegend && oldLegend !== legend) {
            oldLegend.un({
                scope: me,
                combine : me.redraw,
                split: me.redraw
            });
        }
        return legend;
    },
    
    updateLegend: function (legend) {
        var me = this;
        if (legend) {
            legend.setChart(this);
            legend.un({
                scope: me,
                combine : me.redraw,
                split: me.redraw
            });
        }
        return legend;
    },

    applyStore: function(store, currentStore) {
        var me = this,
            initial = !me.storeIsBound;

        store = store && Ext.StoreMgr.lookup(store);
        if (!initial && currentStore && store !== currentStore) {
            if (currentStore.autoDestroy) {
                currentStore.destroy();
            }
            else {
                currentStore.un({
                    scope: me,
                    refresh: me.delayRefresh
                });
            }
        }
        if (store && (initial || store !== currentStore)) {
            store.on({
                scope: me,
                refresh: me.delayRefresh
            });
        }
        me.storeIsBound = true;
        if (store && !initial) {
            me.refresh();
        }
        return store;
    },
    /**
     * Override the call to repaint and do nothing here. Repainting is handled by the draw/redraw methods in Chart.
     */
    repaint: Ext.emptyFn,

    /**
     * Redraw the chart. If animations are set this will animate the chart too.
     * @param {Boolean} resize (optional) flag which changes the default origin points of the chart for animations.
     */
    redraw: function(resize) {
        var me = this,
            toolbar,
            width = me.getWidth(), 
            height = me.getHeight(), 
            legend = me.getLegend(),
            toUpdate = false;

        if (!Ext.isNumber(width) || !Ext.isNumber(height)) {
            width = me.element.getWidth();
            height = me.element.getHeight();
        }
        toUpdate = width != me.curWidth || height != me.curHeight;
        if (toUpdate) {
            resize = true;
        }
        
        if (resize) {
            me.curWidth = width;
            me.curHeight = height;

            me.chartBBox = {
                x: 0,
                y: 0,
                height: me.curHeight,
                width: me.curWidth
            };

            if (toUpdate) {
                me.getEventsSurface().setSize(width, height);
                me.getSurface('main').setSize(width, height);
            }

            if (legend) {
                legend.updateLocation();
            }

            me.updateMaxGutter();

            me.dirtyStore = false;


            me.getAxes().each(me.preprocessAxis, me);

            legend = me.getLegend();
            if (legend) {
                legend.orient();
            }

            toolbar = me.getToolbar();
            if (toolbar) {
                toolbar.orient();
            }
            
        }

        //process all views (aggregated data etc) on stores before rendering.
        me.getAxes().each(function(axis) {
            axis.processView();
        });
        me.getAxes().each(function(axis) {
            if (axis.getHidden()) {
                return;
            }
            axis.drawAxis(true);
        });

        me.alignAxes();
        
        if (toUpdate) {
            // Reposition legend based on new axis alignment
            if (legend) {
                legend.updateLocation();
            }
        }
        // Draw axes and series
        me.resizing = !!resize;

        me.getAxes().each(me.drawAxis, me);
        me.getSeries().each(me.drawCharts, me);

        Ext.iterate(me.surfaces, function(name, surface) {
             surface.renderFrame();
        });

        me.resizing = false;

        // TODO: check on specific versions of iOS for this. it is too damn slow.
//        if (Ext.os.is.iPad) {
//            Ext.repaint();
//        }

        me.fireEvent('redraw', me);
    },

    /**
     * @private
     * Return the x and y position of the given event relative to the chart's series area.
     */
    getEventXY: function(e) {
        e = (e.changedTouches && e.changedTouches[0]) || e.event || e.browserEvent || e;

        var me = this,
            chartXY = me.element.getXY(),
            chartBBox = me.chartBBox,
            x = e.pageX - chartXY[0] - chartBBox.x,
            y = e.pageY - chartXY[1] - chartBBox.y;

        return [x, y];
    },

    /**
     * Given an x/y point relative to the chart, find and return the first series item that
     * matches that point.
     * @param {Number} x
     * @param {Number} y
     * @return {Object} an object with `series` and `item` properties, or `false` if no item found
     */
    getItemForPoint: function(x, y) {
        var me = this,
            i = 0,
            items = me.getSeries().items,
            l = items.length,
            series, item;

        for (; i < l; i++) {
            series = items[i];
            item = series.getItemForPoint(x, y);
            if (item) {
                return item;
            }
        }

        return false;
    },
    /**
     * Given an x/y point relative to the chart, find and return all series items that match that point.
     * @param {Number} x
     * @param {Number} y
     * @return {Array} an array of objects with `series` and `item` properties
     */
    getItemsForPoint: function(x, y) {
        var me = this,
            items = [];

        me.getSeries().each(function(series) {
            var item = series.getItemForPoint(x, y);
            if (item) {
                items.push(item);
            }
        });

        return items;
    },

    capitalize: function(string) {
        return string.charAt(0).toUpperCase() + string.substr(1);
    },

    // @private buffered refresh for when we update the store
    delayRefresh: function() { 
        var me = this;
        if (!me.refreshTask) {
            me.refreshTask = new Ext.util.DelayedTask(me.refresh, me);
        }
        me.refreshTask.delay(1);
    },

    // @private
    refresh: function() {
        var me = this,
            undef;
        if (me.refreshTask) {
            me.refreshTask.cancel();
        }
        me.dirtyStore = true;

        if (me.curWidth != undef && me.curHeight != undef && me.fireEvent('beforerefresh', me) !== false) {
            me.redraw();
            me.fireEvent('refresh', me);
        }
    },

    /**
     * Changes the data store bound to this chart and refreshes it.
     * @param {Ext.data.Store} store The store to bind to this chart
     */
    bindStore: function(store) {
        this.setStore(store);
    },

    // @private Create Axis
    preprocessAxis: function(axis) {
        var me = this,
            chartBBox = me.chartBBox,
            w = chartBBox.width,
            h = chartBBox.height,
            x = chartBBox.x,
            y = chartBBox.y,
            config = {
                chart: me,
                parent: me,
                x: 0,
                y: 0
            };
        switch (axis.getPosition()) {
            case 'top':
                Ext.apply(config, {
                    length: w,
                    width: h,
                    startX: x,
                    startY: y
                });
            break;
            case 'bottom':
                Ext.apply(config, {
                    length: w,
                    width: h,
                    startX: x,
                    startY: h
                });
            break;
            case 'left':
                Ext.apply(config, {
                    length: h,
                    width: w,
                    startX: x,
                    startY: h
                });
            break;
            case 'right':
                Ext.apply(config, {
                    length: h,
                    width: w,
                    startX: w,
                    startY: h
                });
            break;
        }

        axis.setConfig(config);
    },


    /**
     * @private Adjust the dimensions and positions of each axis and the chart body area after accounting
     * for the space taken up on each side by the axes and legend.
     */
    alignAxes: function() {
        var me = this,
            axes = me.getAxes(),
            legend = me.getLegend(),
            edges = ['top', 'right', 'bottom', 'left'],
            chartBBox,
            //get padding from sass styling or property setting.
            insetPadding = me.getInsetPadding() || +me.style.padding || 10,
            insets;

        //store the original configuration for insetPadding.
        if (Ext.isObject(insetPadding)) {
            me.setInsetPadding(Ext.apply({} ,insetPadding));
            insets = {
                top: insetPadding.top || 0,
                right: insetPadding.right || 0,
                bottom: insetPadding.bottom || 0,
                left: insetPadding.left || 0
            };
        } else {
            me.setInsetPadding(insetPadding);
            insets = {
                top: insetPadding,
                right: insetPadding,
                bottom: insetPadding,
                left: insetPadding
            };
        }

        me.insets = insets;

        function getAxis(edge) {
            return axes.get(edge);
        }

        // Find the space needed by axes and legend as a positive inset from each edge
        Ext.each(edges, function(edge) {
            var isVertical = (edge === 'left' || edge === 'right'),
                axis = getAxis(edge),
                bbox;

            // Add legend size if it's on this edge
            if (legend) {
                if (legend.getDockedPosition() === edge) {
                    insets[edge] += legend.getInsetSize();
                }
            }

            // Add axis size if there's one on this edge only if it has been
            //drawn before.
            if (axis && axis.bbox) {
                bbox = axis.bbox;
                insets[edge] += (isVertical ? bbox.width : bbox.height);
            }
        });
        // Build the chart bbox based on the collected inset values
        chartBBox = {
            x: insets.left,
            y: insets.top,
            width: me.curWidth - insets.left - insets.right,
            height: me.curHeight- insets.top - insets.bottom
        };
        me.chartBBox = chartBBox;

        // Go back through each axis and set its size, position, and relative start point based on the
        // corresponding edge of the chartBBox
        axes.each(function(axis) {
            var pos = axis.getPosition(),
                axisBBox = !axis.getHidden() && axis.bbox || {width: 0, height: 0},
                isVertical = (pos === 'left' || pos === 'right'),
                config = {
                    x : (pos === 'left' ? chartBBox.x - axisBBox.width : chartBBox.x),
                    y : (pos === 'top' ? chartBBox.y - axisBBox.height : chartBBox.y),
                    width : (isVertical ? axisBBox.width + chartBBox.width: axisBBox.height + chartBBox.height),
                    length : (isVertical ? chartBBox.height : chartBBox.width),
                    startX : (isVertical ? (pos === 'left' ? axisBBox.width : chartBBox.width) : 0),
                    startY : (pos === 'top' ? axisBBox.height : chartBBox.height)
                };
            axis.setConfig(config);
        });
    },

    // @private
    updateMaxGutter: function() {
        var me = this,
            maxGutter = me.getMaxGutter().slice();
        me.getSeries().each(function(s) {
            var gutter = s.getGutters && s.getGutters() || [0, 0];
            maxGutter[0] = Math.max(maxGutter[0], gutter[0]);
            maxGutter[1] = Math.max(maxGutter[1], gutter[1]);
        });
        me.maxGutter = maxGutter;
    },

    // @private draw axis.
    drawAxis: function(axis) {
        if (axis.getHidden()) {
            return;
        }
        axis.drawAxis();
    },

    // @private draw series.
    drawCharts: function(series) {
        series.drawSeries();
        if (!this.getAnimate()) {
            series.fireEvent('afterrender');
        }
    },
    /**
     * Used to save a chart.
     *
     * The following config object properties affect the saving process:
     * - **type** - string - The intended export type. Supported types: 'svg': returns the chart's Svg-String, 'image/png': returns the chart as png, 'image/jpeg': returns the chart as jpeg. Default: 'image/png'
     *
     *  <h2>Example usage:</h2>
     *  <code><pre>
     chartInstance.save({
        type: 'image/png'
     });
     * </pre></code>
     * 
     * @param {Object} config The config object for the export generation
     */
    save: function(config){
        // width and height config properties don't affect export right now
        // TODO(patrick): take width/height into account at export generation
        return Ext.draw.Surface.save(config, this.surfaces);
    },
    /**
     * Reset the chart back to its initial state, before any user interaction.
     * @param {Boolean} skipRedraw if `true`, redrawing of the chart will be skipped.
     */
    reset: function(skipRedraw) {
        var me = this,
            legend = me.getLegend();

        me.getAxes().each(function(axis) {
            if (axis.reset) {
                axis.reset();
            }
        });

        me.getSeries().each(function(series) {
            if (series.reset) {
                series.reset();
            }
        });

        if (legend && legend.reset) {
            legend.reset();
        }

        if (!skipRedraw) {
            me.redraw();
        }
    },

    // @private remove gently.
    destroy: function() {
        var me = this;
        Ext.iterate(this.surfaces, function(name, surface) {
            surface.destroy();
        });
        me.setStore(null);
        me.setLegend(false);
        me.setSeries([]);
        me.setAxes([]);
        me.setInteractions([]);
        me.setToolbar(null);
        Ext.Viewport.un('orientationchange', me.redraw, me);
        this.callParent(arguments);
    },

    /* ---------------------------------
      Methods needed for ComponentQuery
     ----------------------------------*/

    parent: null,

    getItemId: function() {
        return this.element && this.element.id || this.id || null;
    },

    initCls: function() {
        // Workaround for [cls=xxx] ComponentQueries to work.
        // In Component.initCls method, this.cls will be deleted,
        // we need to revert it to make CQ function which is used in theme system.
        var cls = this.cls,
            result = this.callParent();
        this.cls = cls;
        return result;
    },

    isXType: function(xtype) {
        return xtype === 'chart';
    },

    getRefItems: function(deep) {
        var me = this,
            ans = [];

        me.getSeries() && me.getSeries().each(function(series) {
            if (series.getRefItems) {
                ans.push(series);
                if (deep) {
                    if (series.markerStyle) {
                        ans.push(series.markerStyle);
                    }
                    if (series.labelStyle) {
                        ans.push(series.labelStyle);
                    }
                    if (series.calloutStyle) {
                        ans.push(series.calloutStyle);
                    }
                }
            }
        });

        me.getAxes() && me.getAxes().each(function(axis) {
            if (axis.getRefItems) {
                ans.push(axis);
                if (axis.labelStyle) {
                    ans.push(axis.labelStyle);
                }
                if (axis.gridStyle) {
                    ans.push(axis.gridStyle);
                    ans.push(axis.gridStyle.oddStyle);
                    ans.push(axis.gridStyle.evenStyle);
                }
            }
        });

        me.getInteractions() && me.getInteractions().each(function(interaction) {
            ans.push(interaction);
            if (deep) {
                ans = ans.concat(interaction.getRefItems(deep));
            }
        });

        return ans;
    }
});

if (!Ext.util.DelayedTask) {
    Ext.util.DelayedTask = function(fn, scope, args) {
        var me = this,
            id,
            call = function() {
                clearInterval(id);
                id = null;
                fn.apply(scope, args || []);
            };

        /**
         * Cancels any pending timeout and queues a new one
         * @param {Number} delay The milliseconds to delay
         * @param {Function} newFn (optional) Overrides function passed to constructor
         * @param {Object} newScope (optional) Overrides scope passed to constructor. Remember that if no scope
         * is specified, <code>this</code> will refer to the browser window.
         * @param {Array} newArgs (optional) Overrides args passed to constructor
         */
        this.delay = function(delay, newFn, newScope, newArgs) {
            me.cancel();
            fn = newFn || fn;
            scope = newScope || scope;
            args = newArgs || args;
            id = setInterval(call, delay);
        };

        /**
         * Cancel the last queued timeout
         */
        this.cancel = function(){
            if (id) {
                clearInterval(id);
                id = null;
            }
        };
    };
}

/**
 * @class Ext.chart.Spark
 * @extends Ext.chart.Chart
 *
 * The Spark Chart provides small sized charts. This class extends the {@link Ext.chart.Chart} class
 * with default configuration options needed to create word-sized charts.
 *
 * Example:

            //create a line spark
            var chart = new Ext.chart.Spark({
                store: store1,
                renderTo: 'glucose-chart',
                series: [{
                    type: 'line',
                    xField: 'name',
                    yField: 'glucose',
                    fill: true,
                    style: {
                        fill: '#777'
                    }
                }]
            });

            chart.redraw();

            //create an area spark
            chart = new Ext.chart.Spark({
                store: store1,
                renderTo: 'respiration-chart',
                series: [{
                    type: 'line',
                    xField: 'name',
                    yField: 'respiration',
                    style: {
                        fill: '#777'
                    }
                }]
            });

            chart.redraw();

            //create a column spark
            chart = new Ext.chart.Spark({
                store: store1,
                renderTo: 'temperature-chart',
                series: [{
                    type: 'column',
                    xField: 'name',
                    yField: 'temperature'
                }]
            });

            chart.redraw();

            //create an area spark
            chart = new Ext.chart.Spark({
                store: store1,
                renderTo: 'WBC-chart',
                series: [{
                    type: 'area',
                    xField: 'name',
                    yField: 'WBC'
                }]
            });

            chart.redraw();
 
 *
 *  {@img Ext.chart.Spark/Ext.chart.Spark.png Ext.chart.Spark Spark visualization}
 *  
 * In this example we create all the available types of spark charts: `line`, `column` and `area`. The options for each
 * of those series are the same than the ones defined in {@link Ext.chart.series.Line}, {@link Ext.chart.series.Column} and
 * {@link Ext.chart.series.Area}
 *
 */
Ext.define('Ext.chart.Spark', {
    extend: 'Ext.chart.Chart',
    constructor: function(config) {
        var finalConfig = {},
            defaults = {
            line: {
                xField: 'name',
                yField: 'value',
                axis: 'left',
                showMarkers: false
            },
            column: {
                gutter: 1,
                groupGutter: 1,
                xField: 'name',
                yField: 'value',
                axis: 'left'
            },
            area: {
                gutter: 1,
                xPadding: 0,
                yPadding: 0,
                groupGutter: 1,
                xField: 'name',
                yField: 'value',
                axis: 'left'
            },
            chart: {
                animate: false,
                width: 100,
                height: 20,
                componentCls: 'x-spark',
                insetPadding: {
                    left: 0,
                    bottom: 0,
                    top: 0,
                    right: 0
                }
            }
        };

        finalConfig = Ext.apply(defaults.chart, config);
        
        if (typeof config.series == 'string') {
            config.series = [{
                type: config.series
            }];
        }

        finalConfig.series = [Ext.apply(defaults[config.series[0].type], config.series[0])];
        finalConfig.axes = [
            {
                hidden: true,
                type: 'numeric',
                fields: [finalConfig.series[0].yField]
            },
            {
                hidden: true,
                type: 'category',
                fields: [finalConfig.series[0].xField]
            }
        ];
        return this.callParent([finalConfig]);
    }
});

/**
 * @ignore
 */
Ext.define('Ext.chart.Panel', {

    extend: 'Ext.Container',
    requires: ['Ext.chart.Chart'],

    config: {
        chart: null,

        buttons: [],

        defaultType: 'chart',

        layout: 'fit',

        title: ''
    },

    constructor: function (config) {
        var ui = config.ui || 'dark',
            toolbar = {
            xtype: 'panel',
            height: '2.6em',
            docked: 'top',
            layout: {
                type: 'card',
                align: 'stretch'
            },
            activeItem: 0,
            ui: ui,
            items: [
                {
                    xtype: 'toolbar',
                    ui: ui,
                    title: '',
                    items: {
                        xtype: 'spacer'
                    }
                },
                {
                    xtype: 'toolbar',
                    ui: ui,
                    title: ''
                }
            ]
        };
        config.items = [toolbar];
        this.callParent([config]);
    },

    initialize: function (config) {
        var me = this,
            headerPanel;
        me.callParent(arguments);

        headerPanel = me.headerPanel = me.getItems().get(0);
        me.descriptionPanel = headerPanel.getItems().get(1);

    },

    updateTitle: function (title) {
        this.getItems().get(0).getItems().get(0).setTitle(title);
    },

    applyButtons: function (buttons) {
        return this.getItems().get(0).getItems().get(0).add(buttons);
    },

    applyChart: function (chart, currentChart) {
        if (chart !== currentChart) {
            chart = Ext.factory(chart, 'Ext.chart.Chart', currentChart);
        }
        if (!currentChart) {
            this.add(chart);
        }
        return chart;
    }
});

/**
 * @class Ext.chart.Callout
 * @ignore
 */
Ext.define('Ext.chart.Callout', {

    uses: ['Ext.chart.theme.CalloutStyle'],
    
    constructor: function(config) {
        var me = this;
        if (config.callouts) {
            config.callouts.styles = Ext.apply({}, config.callouts.styles || {});
            me.callouts = Ext.apply(me.callouts || {}, config.callouts);
            me.calloutsArray = [];
        }
        me.calloutStyle = new Ext.chart.theme.CalloutStyle();
    },

    renderCallouts: function() {
        if (!this.callouts) {
            return;
        }

        var me = this,
            items = me.items,
            animate = me.getChart().getAnimate(),
            config = me.callouts,
            styles = config.styles,
            group = me.calloutsArray,
            store = me.getChart().getStore(),
            len = store.getCount(),
            ratio = items.length / len,
            previouslyPlacedCallouts = [],
            i, count, j, p;

        for (i = 0, count = 0; i < len; i++) {
            for (j = 0; j < ratio; j++) {
                var item = items[count],
                    label = group[count],
                    storeItem = store.getAt(i),
                    display;

                display = ((item && item.useCallout) || config.filter(storeItem, item, i, display, j, count)) && (Math.abs(item.endAngle - item.startAngle) > 0.8);

                if (!display && !label) {
                    count++;
                    continue;
                }

                if (!label) {
                    group[count] = label = me.onCreateCallout(storeItem, item, i, display, j, count);
                }
                for (p in label) {
                    if (label[p] && label[p].setAttributes) {
                        label[p].setAttributes(styles, true);
                    }
                }
                if (!display) {
                    for (p in label) {
                        if (label[p]) {
                            if (label[p].setAttributes) {
                                label[p].setAttributes({
                                    hidden: true
                                }, true);
                            } else if(label[p].setVisible) {
                                label[p].setVisible(false);
                            }
                        }
                    }
                }
                config.renderer(label, storeItem);

                if (display) {
                    me.onPlaceCallout(label, storeItem, item, i, display, animate,
                                      j, count, previouslyPlacedCallouts);
                }
                previouslyPlacedCallouts.push(label);
                count++;
            }
        }
        this.hideCallouts(count);
    },

    onCreateCallout: function(storeItem, item, i, display) {
        var me = this,
            config = me.callouts,
            styles = config.styles,
            width = styles.width || 100,
            height = styles.height || 100,
            surface = me.getSurface(),
            calloutObj = {
                label: false,
                box: false,
                lines: false
            };

        calloutObj.lines = surface.add(Ext.apply({}, {
            type: 'path',
            path: 'M0,0',
            stroke: me.getLegendColor(i) || '#555'
        }, config.lines || {}));

        calloutObj.box = surface.add(Ext.apply({
            type: 'rect',
            width: width,
            height: height
        }, config.box || {}));

        calloutObj.label = surface.add(Ext.apply({
            type: 'text',
            text: 'some text'
        }, config.label || {}));

        return calloutObj;
    },

    hideCallouts: function(index) {
        var calloutsArray = this.calloutsArray,
            len = calloutsArray.length,
            co, p;
        while (len-->index) {
            co = calloutsArray[len];
            for (p in co) {
                if (co[p]) {
                    co[p].hide(true);
                }
            }
        }
    },

    /* ---------------------------------
      Methods needed for ComponentQuery
     ----------------------------------*/

    //filled by the constructor.
    parent: null,

    getItemId: function() {
        return this.element && this.element.id || this.id || null;
    },

    initCls: function() {
        return (this.cls || '').split(' ');
    },

    isXType: function(xtype) {
        return xtype === 'callout';
    },

    getRefItems: function(deep) {
        return [];
    }
});

/**
/**
/**
 * @class Ext.chart.Highlight
 * @ignore
 */
Ext.define('Ext.chart.Highlight', {

    uses: ['Ext.chart.theme.HighlightStyle'],

    statics : {
        getOriginal: function (origin, attr, surface) {
            var result = {};
            for (var prop in attr) {
                if (typeof attr[prop] === 'function') {
                    continue;
                } else {
                    result[prop] = origin[prop] === undefined ? surface.availableAttrs[prop] : origin[prop];
                    if (result[prop] === attr[prop]) {
                        delete result[prop];
                    } else if (typeof attr[prop] === 'object') {
                        result[prop] = this.getOriginal(result[prop], attr[prop], surface);
                    }
                }
            }
            return result;
        }
    },

    config: {
        /**
         * @cfg {Number} [highlightDuration=500]
         * The duration for the highlight effect in milliseconds.
         */
        highlightDuration : 500,

        /**
         * @cfg {Boolean} toggles whether highlighing with {@link Ext.chart.interactions.ItemHighlight itemhighlight}
         * is allowed.
         */
        highlight : true,

        /**
         * @cfg {Object} highlightCfg
         * Configure how the sprites are highlighted by apply this to its config.
         */
        highlightCfg : { }
    },

    highlightedSprites : null,

    /**
     * @event highlight
     * @event unhighlight
     */

    applyHighlight: function (highlight) {
        if (!Ext.isBoolean(highlight)) {
            this.setHighlightCfg(highlight);
            return true;
        }
        return highlight;
    },

    applyHighlightCfg: function (highlightCfg, oldHighlightCfg) {
        return Ext.merge(oldHighlightCfg || {}, highlightCfg || {});
    },

    constructor: function(config) {
        this.highlightStyle = Ext.create('Ext.chart.theme.HighlightStyle');
        this.highlightedSprites = new Ext.util.MixedCollection();
    },

    highlightSprite: function(sprite, animate) {
        var me = this,
            opts = Ext.merge({}, me.highlightStyle.style, me.getHighlightCfg());
        if (animate === undefined) {
            animate = me.getChart().getAnimate();
        }
        if (me.highlightedSprites.contains(sprite)) {
            return;
        }
        me.highlightedSprites.add(sprite);
        if (!sprite.originalAttr) {
            sprite.originalAttr = Ext.chart.Highlight.getOriginal(sprite.attr, opts, sprite.surface);
        }
        if (sprite.highlightFx) {
            sprite.highlightFx.stop();
        }
        if (animate) {
            sprite.highlightFx = new Ext.fx.Sprite({
                sprite: sprite,
                easing: opts.easing || animate.easing || 'easeInOut',
                duration: me.getHighlightDuration() || opts.duration || animate.duration || 500,
                onComplete : function () {
                    delete sprite.highlightFx;
                }
            });
            sprite.highlightFx.start(opts);
        } else {
            sprite.setAttributes(opts, true);
        }
    },

    unHighlightSprite: function (sprite, animate) {
        var me = this,
            opts = Ext.merge({}, me.highlightStyle.style, me.getHighlightCfg());
        if (!sprite) {
            while(me.highlightedSprites.length) {
                me.unHighlightSprite(me.highlightedSprites.first(), animate);
            }
            return;
        }
        if (animate === undefined) {
            animate = this.getChart().getAnimate();
        }
        if (sprite.highlightFx) {
            sprite.highlightFx.stop();
        }
        if (animate) {
            sprite.highlightFx = new Ext.fx.Sprite({
                sprite: sprite,
                easing: opts.easing || animate.easing || 'easeInOut',
                duration: me.getHighlightDuration() || opts.duration || animate.duration || 500,
                onComplete : function () {
                    delete sprite.highlightFx;
                }
            });
            sprite.highlightFx.start(sprite.originalAttr);
        } else {
            sprite.setAttributes(sprite.originalAttr, true);
        }
        me.highlightedSprites.remove(sprite);
    },

    /**
     * Highlight the given series item.
     * @param {Object} item Info about the item; same format as returned by #getItemForPoint.
     */
    highlightItem: function(item) {
        if (!item) {
            return;
        }
        var me = this, sprite = item.sprite,
            animate = me.getChart().getAnimate();
        if (me.getHighlight() === false || !sprite) {
            return;
        }
        me.highlightSprite(sprite, animate);
        me.fireEvent('highlight', item);
    },

    /**
     * Un-highlight any existing highlights
     */
    unHighlightItem: function(item) {
        var me = this, animate = me.getChart().getAnimate();
        if (me.getHighlight() === false) {
            return;
        }
        me.unHighlightSprite(item && item.sprite, animate);
        me.fireEvent('unhighlight');
    },

    cleanHighlights: function() {
        if (this.highlightedItem) {
            delete this.highlightedItem;
        }
        this.unHighlightSprite();
    }
});


/**
 * @class Ext.chart.Label
 *
 * Labels is a mixin whose methods are appended onto the Series class. Labels is an interface with methods implemented
 * in each of the Series (Pie, Bar, etc) for label creation and label placement.
 *
 * The methods implemented by the Series are:
 *
 * - **`onCreateLabel(storeItem, item, i, display)`** Called each time a new label is created.
 *   The arguments of the method are:
 *   - *`storeItem`* The element of the store that is related to the label sprite.
 *   - *`item`* The item related to the label sprite. An item is an object containing the position of the shape
 *     used to describe the visualization and also pointing to the actual shape (circle, rectangle, path, etc).
 *   - *`i`* The index of the element created (i.e the first created label, second created label, etc)
 *   - *`display`* The display type. May be <b>false</b> if the label is hidden
 *
 *  - **`onPlaceLabel(label, storeItem, item, i, display, animate)`** Called for updating the position of the label.
 *    The arguments of the method are:
 *    - *`label`* The sprite label.</li>
 *    - *`storeItem`* The element of the store that is related to the label sprite</li>
 *    - *`item`* The item related to the label sprite. An item is an object containing the position of the shape
 *      used to describe the visualization and also pointing to the actual shape (circle, rectangle, path, etc).
 *    - *`i`* The index of the element to be updated (i.e. whether it is the first, second, third from the labelGroup)
 *    - *`display`* The display type. May be <b>false</b> if the label is hidden.
 *    - *`animate`* A boolean value to set or unset animations for the labels.
 */
Ext.define('Ext.chart.Label', {

    /**
     * @cfg {Object} label
     * Object with the following properties:
     *
     * - **display** : String
     *
     * Specifies the presence and position of labels for each pie slice. Either "rotate", "middle", "insideStart",
     * "insideEnd", "outside", "over", "under", or "none" to prevent label rendering.
     * Default value: 'none'.
     *
     * - **color** : String
     *
     * The color of the label text.
     * Default value: '#000' (black).
     *
     * - **contrast** : Boolean
     *
     * True to render the label in contrasting color with the backround.
     * Default value: false.
     *
     * - **field** : String
     *
     * The name of the field to be displayed in the label.
     * Default value: 'name'.
     *
     * - **minMargin** : Number
     *
     * Specifies the minimum distance from a label to the origin of the visualization.
     * This parameter is useful when using PieSeries width variable pie slice lengths.
     * Default value: 50.
     *
     * - **font** : String
     *
     * The font used for the labels.
     * Default value: "11px Helvetica, sans-serif".
     *
     * - **orientation** : String
     *
     * Either "horizontal" or "vertical".
     * Default value: "horizontal".
     *
     * - **renderer** : Function
     *
     * Optional function for formatting the label into a displayable value.
     * Default value: function(v) { return v; }
     */


    //@private a regex to parse url type colors.
    colorStringRe: /url\s*\(\s*#([^\/)]+)\s*\)/,

    //@private
    //how labels are filtered hidden/shown
    labelFilterModel: false,

    //@private the mixin constructor. Used internally by Series.
    constructor: function(config) {
        var me = this;
        me.label = Ext.applyIf(config.label || {}, {
            renderer: function(v) {
                return v;
            }
        });
    },

    initialize: function () {
        var me = this;
        if (me.label.display !== 'none') {
            me.labelsGroup = me.getChart().getSurface('labels').getGroup(me.seriesId + '-labels');
        }
    },

    //@private a method to render all labels in the labelGroup
    renderLabels: function() {
        var me = this,
            chart = me.getChart(),
            items = me.items,
            config = Ext.apply(me.labelStyle.style || {}, me.label || {}),
            display = config.display,
            field = [].concat(config.field),
            group = me.labelsGroup,
            len = me.getRecordCount(),
            itemLength = (items || 0) && items.length,
            ratio = itemLength / len,
            count = 0, index, j, k, item, label,
            sprite;

        if (display == 'none') {
            return;
        }

        me.eachRecord(function(storeItem, i) {
            index = 0;
            for (j = 0; j < ratio; j++) {
                item = items[count];
                label = group.getAt(count);

                //TODO(nico): there are now two label rendering models.
                //one considers that sprites are reused and hidden and non-hidden
                //sprites contiguous. The other model maintains a sparse array 
                //of hidden non-hidden sprites.
                //Eventually the only label rendering model should be the second one
                //(currently used bu the bar chart)
                if (!me.labelFilterModel) {
                    while (me.getExcludes() && me.getExcludes()[index]) {
                        index++;
                    }
                    
                    if (!item && label) {
                        label.hide(true);
                    }

                    if (item && field[j]) {
                        me.renderLabel(label, item, i, j, index, storeItem);
                    }

                } else {
                    if (me.itemHidden(item) && label) {
                        label.hide(true);
                    }

                    if (!me.itemHidden(item) && field[j]) {
                        me.renderLabel(label, item, i, j, index, storeItem);
                    }
                }
                count++;
                index++;
            }
        });
        me.hideLabels(count);
    },

    renderLabel: function(label, item, i, j, index, storeItem) {
        var me = this,
            chart = me.getChart(),
            gradients = chart.gradients,
            animate = chart.getAnimate(),
            config = Ext.apply(me.labelStyle.style || {}, me.label || {}),
            display = config.display,
            field = [].concat(config.field),
            gradientsCount = (gradients || 0) && gradients.length,
            Color = Ext.draw.Color,
            gradient, count = 0, k, colorStopTotal, colorStopIndex, colorStop,
            sprite, spriteColor, spriteBrightness, labelColor, colorString, match;

        if (!label) {
            label = me.onCreateLabel(storeItem, item, i, display, j, index);
        }
        label.show(true);
        me.onPlaceLabel(label, storeItem, item, i, display, animate, j, index);

        //set contrast
        if (config.contrast && item.sprite) {
            sprite = item.sprite;
            //set the color string to the color to be set.
            if (sprite._endStyle) {
                colorString = sprite._endStyle.fill;
            }
            else if (sprite._to) {
                colorString = sprite._to.fill;
            }
            else {
                colorString = sprite.attr.fill;
            }
            colorString = colorString || sprite.attr.fill;
            spriteColor = colorString && Color.fromString(colorString);
            //color wasn't parsed property maybe because it's a gradient id
            if (colorString && !spriteColor) {
                colorString = (match = colorString.match(me.colorStringRe)) && match[1];
                for (k = 0; k < gradientsCount; k++) {
                    gradient = gradients[k];
                    if (gradient.id == colorString) {
                        //avg color stops
                        colorStop = 0;
                        colorStopTotal = 0;
                        for (colorStopIndex in gradient.stops) {
                            colorStop++;
                            colorStopTotal += Color.fromString(gradient.stops[colorStopIndex].color).getGrayscale();
                        }
                        spriteBrightness = (colorStopTotal / colorStop) / 255;
                        break;
                    }
                }
            } else if (spriteColor) {
                spriteBrightness = spriteColor.getGrayscale() / 255;
            }
            if (label.isOutside) {
                spriteBrightness = 1;
            }
            labelColor = Color.fromString(label.attr.color || label.attr.fill).getHSL();

            labelColor[2] = spriteBrightness > 0.5 ? 0.2 : 0.8;
            label.setAttributes({
                fill: String(Color.fromHSL.apply({},
                labelColor))
            },
            true);
        }
    },

    itemHidden: function(item) {
        return false;
    },

    //@private a method to hide labels.
    hideLabels: function(index) {
        var labelsGroup = this.labelsGroup,
            len;
        index = index || 0;
        if (labelsGroup) {
            len = labelsGroup.getCount();
            while (len-->index) {
                labelsGroup.getAt(len).hide(true);
            }
        }
    }
});

/**
 * @class Ext.chart.Transformable
 *
 * Transformable is a mixin for chart items (axes, series, etc.) which makes them capable
 * of having their surfaces panned and zoomed via transformations.
 *
 * There are two modes of transformation that this mixin supports:
 *
 * - **Persistent transform** - This is a logical transformation, saved to the item as properties
 *   {@link #panX}, {@link #panY}, {@link #zoomX}, and {@link #zoomY}. The item's drawing logic must
 *   honor these properties and should be explicitly re-run after updating the persistent transform.
 * - **Fast transform** - This is a pixel-wise transform applied (via CSS3) to the {@link Ext.draw.Surface}
 *   element itself. As this does not perform a redraw of the surface, vector shapes currently
 *   rendered to the surface will be deformed by this transform. This is meant to only be transient,
 *   and to have {@link #syncToFastTransform} called once the speed is no longer required to apply
 *   the fast transform parameters into the persistent transform properties.
 */
Ext.define('Ext.chart.Transformable', {

    /**
     * @property zoomX
     * @type {Number}
     * The horizontal zoom transformation factor for this chart item. 
     */
    zoomX: 1,
    /**
     * @property zoomY
     * @type {Number}
     * The vertical zoom transformation factor for this chart item.
     */
    zoomY: 1,
    /**
     * @property panX
     * @type {Number}
     * The horizontal pan transformation offset for this chart item.
     */
    panX: 0,
    /**
     * @property panY
     * @type {Number}
     * The vertical pan transformation offset for this chart item.
     */
    panY: 0,

    /**
     * @event transform
     * Fired after a transformation has been applied to this chart item.
     * @param {Object} this
     * @param {Boolean} fast True if it is a CSS3 fast transform, false if a persistent transform
     */

    /**
     * Directly sets the persistent pan/zoom transform properties for this chart item. Removes any
     * active fast transform and updates the {@link #panX}, {@link #panY}, {@link #zoomX}, and
     * {@link #zoomY} properties to match the supplied arguments.
     * @param {Number} panX
     * @param {Number} panY
     * @param {Number} zoomX
     * @param {Number} zoomY
     */
    setTransform: function(panX, panY, zoomX, zoomY) {
        var me = this;
        me.panX = panX;
        me.panY = panY;
        me.zoomX = zoomX;
        me.zoomY = zoomY;
        me.clearFastTransform();
        Ext.each(me.getTransformableSurfaces(), function(surface) {
            surface.setSurfaceTransform(panX, panY, zoomX, zoomY);
        });
        me.fireEvent('transform', me, false);
    },

    /**
     * Adjusts the persistent pan/zoom transform properties for this chart item. Removes any
     * active fast transform and adjusts the existing {@link #panX}, {@link #panY}, {@link #zoomX}, and
     * {@link #zoomY} properties by the supplied arguments.
     * @param {Number} panX
     * @param {Number} panY
     * @param {Number} zoomX
     * @param {Number} zoomY
     */
    transformBy: function(panX, panY, zoomX, zoomY) {
        var me = this;
        me.setTransform(me.panX + panX, me.panY + panY, me.zoomX * zoomX, me.zoomY * zoomY);
    },

    /**
     * Sets the pan/zoom transformation for this chart item, using CSS3 for fast hardware-accelerated
     * transformation. The existing persistent {@link #panX}, {@link #panY}, {@link #zoomX}, and
     * {@link #zoomY} properties will be left alone and the remaining transform required to reach
     * the supplied arguments will be applied using a CSS3 transform.
     * @param {Number} panX
     * @param {Number} panY
     * @param {Number} zoomX
     * @param {Number} zoomY
     */
    setTransformFast: function(panX, panY, zoomX, zoomY) {
        var me = this;
        panX -= me.panX;
        panY -= me.panY;
        zoomX /= me.zoomX;
        zoomY /= me.zoomY;
        me.clearFastTransform();
        me.transformByFast(panX, panY, zoomX, zoomY);
    },

    /**
     * Adjusts the pan/zoom transformation for this chart item, using CSS3 for fast hardware-accelerated
     * transformation. The existing persistent {@link #panX}/{@link #panY}/{@link #zoomX}/{@link #zoomY}
     * properties will be left alone and the supplied arguments will be added to the existing transform
     * using CSS3.
     * @param {Number} panX
     * @param {Number} panY
     * @param {Number} zoomX
     * @param {Number} zoomY
     */
    transformByFast: function(panX, panY, zoomX, zoomY) {
        this.setFastTransformMatrix(this.getFastTransformMatrix().translate(panX, panY).scale(zoomX, zoomY, 0, 0));
    },

    /**
     * Returns a {@link Ext.draw.Matrix} representing the total current transformation for this chart
     * item, including both the persistent {@link #panX}/{@link #panY}/{@link #zoomX}/{@link #zoomY}
     * and any additional CSS3 fast transform that is currently applied.
     * @return {Ext.draw.Matrix}
     */
    getTransformMatrix: function() {
        var me = this;
        return me.getFastTransformMatrix().clone().translate(me.panX, me.panY).scale(me.zoomX, me.zoomY, 0, 0);
    },

    /**
     * Returns a {@link Ext.draw.Matrix} representing the CSS3 fast transform currently applied to this
     * chart item. If no fast transform is applied a Matrix in its default state will be returned. This
     * matrix does *not* include the persistent {@link #panX}/{@link #panY}/{@link #zoomX}/{@link #zoomY}
     * transformation properties.
     * @return {Ext.draw.Matrix}
     */
    getFastTransformMatrix: function() {
        return this.fastTransformMatrix || new Ext.draw.Matrix();
    },

    /**
     * Sets the pan/zoom transformation for this chart item, using CSS3 for fast hardware-accelerated
     * transformation. The existing persistent {@link #panX}, {@link #panY}, {@link #zoomX}, and
     * {@link #zoomY} properties will be left alone and the remaining transform required to reach
     * the supplied matrix argument will be applied using a CSS3 transform.
     * @param {Ext.draw.Matrix} matrix
     */
    setTransformMatrixFast: function(matrix) {
        var parts = matrix.split();
        this.setTransformFast(parts.translateX, parts.translateY, parts.scaleX, parts.scaleY);
    },

    /**
     * @private
     * Sets only the CSS3 fast transform to match the given {@link Ext.draw.Matrix}, overwriting
     * any existing fast transform.
     * @param {Ext.draw.Matrix} matrix
     */
    setFastTransformMatrix: function(matrix) {
        var me = this;
        me.fastTransformMatrix = matrix;
        Ext.each(me.getTransformableSurfaces(), function(surface) {
            surface.setSurfaceFastTransform(matrix);
        });
        if (matrix) {
            me.fireEvent('transform', me, true);
        }
    },

    /**
     * @private
     * Removes any CSS3 fast transform currently applied to this chart item.
     */
    clearFastTransform: function() {
        this.setFastTransformMatrix(null);
    },

    /**
     * Returns `true` if this chart item currently has a CSS3 fast transform applied, `false` if not.
     * @return {Boolean}
     */
    hasFastTransform: function() {
        var matrix = this.fastTransformMatrix;
        return matrix;
    },

    /**
     * Clears all transforms from this chart item.
     */
    clearTransform: function() {
        this.setTransform(0, 0, 1, 1);
    },

    /**
     * If this chart item has a CSS3 fast transform applied, this method will apply that transform
     * to the persistent {@link #panX}/{@link #panY}/{@link #zoomX}/{@link #zoomY} transform properties
     * and remove the fast transform.
     */
    syncToFastTransform: function() {
        // decompose the fast transform matrix and adjust the persistent pan/zoom by its values
        var me = this,
            fastMatrix = me.getFastTransformMatrix(),
            parts = fastMatrix.split();
        delete me.fastTransformMatrix;
        me.transformBy(parts.translateX, parts.translateY, parts.scaleX, parts.scaleY);
    },

    /**
     * Return a list of the {@link Ext.draw.Surface surfaces} that should be kept in sync
     * with this chart item's transformations.
     */
    getTransformableSurfaces: function() {
        return [];
    }

});

/**
 * @class Ext.chart.axis.Abstract
 *
 * An abstract axis class extended by Numeric, Category and Radial axes.
 */
Ext.define('Ext.chart.axis.Abstract', { 

    uses: [
        'Ext.chart.theme.TitleStyle',
        'Ext.chart.theme.LabelStyle',
        'Ext.chart.theme.GridStyle'
    ],

    config: {
        /**
         * @cfg {String} position
         * Where to set the axis. Available options are `left`, `bottom`, `right`, `top`. Default's `bottom`.
         */
        position: 'bottom',
        /**
         * @cfg {Array} fields
         * An array containing the names of the record fields which should be mapped along the axis.
         */
        fields: [],
        labels: [],
        /**
         * @cfg {String} labelTitle
         *
         * The title for the axis.
         */
        labelTitle: null,
        /**
         * @cfg {Object} label
         *
         * The label configuration object for the Axis. This object may include style attributes
         * like `spacing`, `padding`, `font`, and a `renderer` function that receives a string or number and
         * returns a new string with the modified values.
         */
        label: null,
        /**
         * @cfg {Object} grid
         * The grid configuration object for the Axis style. Can contain `stroke` or `fill` attributes.
         * Also may contain an `odd` or `even` property in which you only style things on odd or even rows.
         * For example:
         *
         *
                  grid {
                    odd: {
                      stroke: '#555';
                    }
                    even: {
                      stroke: '#ccc';
                    }
                  }
         *              
         */
        grid: null,

        chart: null,
        steps: 10,
        x: 0,
        y: 0,
        
        /**
         * @cfg {Number} length
         *
         * Offset axis position. Default's 0.
         */
        length: 0,

        /**
         * @cfg {Number} width
         *
         * Offset axis width. Default's 0.
         */
        width: 0,

        startX: 0,
        startY: 0,

        hidden: false
    },

    mixins: { 
      identifiable: 'Ext.mixin.Identifiable',
      observable: 'Ext.util.Observable',
      transformable: 'Ext.chart.Transformable'
    },

    applyPosition: function(pos) {
        // return pos.charAt(0).toUpperCase() + pos.substring(1);
        return pos.toLowerCase();
    },

    constructor: function(config) {
        var me = this;

        me.titleStyle = Ext.create('Ext.chart.theme.TitleStyle', config.labelTitle || {});
        me.labelStyle = Ext.create('Ext.chart.theme.LabelStyle', config.label || {});
        me.gridStyle = Ext.create('Ext.chart.theme.GridStyle', config.grid || {});
        
        this.initConfig(config);
        me.getId();

        me.mixins.observable.constructor.apply(me, arguments);
        me.mixins.transformable.constructor.apply(me, arguments);
    },

    applyLabel: function(data) {
        var me = this;
        Ext.apply(me.labelStyle.style, data);
        return data;
    },

    getLabel: function() {
        var me = this;
        Ext.applyIf(me._label, me.labelStyle.style);
        return me._label;
    },

    initialize: function () {
        var me = this;
        me.labelGroup = me.getSurface().getGroup(me.axisId + "-labels");
    },

    getId: function() {
        return this.axisId || (this.axisId = Ext.id(null, 'ext-axis-'));
    },

    /*
      Called to process a view i.e to make aggregation and filtering over
      a store creating a substore to be used to render the axis. Since many axes
      may do different things on the data and we want the final result of all these
      operations to be rendered we need to call processView on all axes before drawing
      them.
    */
    processView: Ext.emptyFn,

    /**
     * Draws/Updates the axis into the canvas.
    */
    drawAxis: Ext.emptyFn,

    /**
     * Get the {@link Ext.draw.Surface} instance for this axis.
     * @return {Ext.draw.Surface}
     */
    getSurface: function() {
        var me = this,
            surface = me.surface,
            chart = me.getChart();
        if (!surface) {
            surface = me.surface = chart.getSurface(me.getPosition() + 'Axis');
            surface.element.setStyle('zIndex', chart.surfaceZIndexes.axis);
        }
        return surface;
    },

    /**
     * Hides all axis labels.
     */
    hideLabels: function() {
        this.labelGroup.hide();
    },

    /**
     * @private update the position/size of the axis surface. By default we set it to the
     * full chart size; subclasses can change this for custom clipping size.
     */
    updateSurfaceBox: function() {
        var me = this,
            surface = me.getSurface(),
            chart = me.getChart();
        
        surface.element.setTop(0);
        surface.element.setLeft(0);
        surface.setSize(chart.getWidth() || chart.element.getWidth(),
                        chart.getHeight() || chart.element.getHeight());
    },

    getTransformableSurfaces: function() {
        return [this.getSurface()];
    },

    /**
     * @private Reset the axis to its original state, before any user interaction.
     */
    reset: function() {
        this.clearTransform();
    },

    /**
     * Invokes renderFrame on this axis's surface(s)
     */
    renderFrame: function() {
        this.getSurface().renderFrame();
    },


    /* ---------------------------------
      Methods needed for ComponentQuery
     ----------------------------------*/

    //filled by the constructor.
    parent: null,

    getItemId: function() {
        return this.element && this.element.id || this.id || null;
    },

    initCls: function() {
        return (this.cls || '').split(' ');
    },

    isXType: function(xtype) {
        return xtype === 'axis';
    },

    getRefItems: function(deep) {
        var me = this,
            ans = [];

        if (me.labelStyle) {
            ans.push(me.labelStyle);
        }

        if (me.titleStyle) {
            ans.push(me.titleStyle);
        }

        if (me.gridStyle) {
            ans.push(me.gridStyle);
            ans.push(me.gridStyle.oddStyle);
            ans.push(me.gridStyle.evenStyle);
        }

        return ans;
    }
});


/**
 * @class Ext.chart.axis.Axis
 * @extends Ext.chart.axis.Abstract
 *
 * Defines axis for charts. The axis position, type, style can be configured.
 * The axes are defined in an axes array of configuration objects where the type,
 * field, grid and other configuration options can be set. To know more about how
 * to create a Chart please check the Chart class documentation. Here's an example for the axes part:
 * An example of axis for a series (in this case for an area chart that has multiple layers of yFields) could be:
 *
 *     axes: [{
 *         type: 'Numeric',
 *         grid: true,
 *         position: 'left',
 *         fields: ['data1', 'data2', 'data3'],
 *         title: 'Number of Hits',
 *         grid: {
 *             odd: {
 *                 opacity: 1,
 *                 fill: '#ddd',
 *                 stroke: '#bbb',
 *                 'stroke-width': 1
 *             }
 *         },
 *         minimum: 0
 *     }, {
 *         type: 'Category',
 *         position: 'bottom',
 *         fields: ['name'],
 *         title: 'Month of the Year',
 *         grid: true,
 *         label: {
 *             rotate: {
 *                 degrees: 315
 *             }
 *         }
 *     }]
 *
 * In this case we use a `Numeric` axis for displaying the values of the Area series and a `Category` axis for displaying the names of
 * the store elements. The numeric axis is placed on the left of the screen, while the category axis is placed at the bottom of the chart.
 * Both the category and numeric axes have `grid` set, which means that horizontal and vertical lines will cover the chart background. In the
 * category axis the labels will be rotated so they can fit the space better.
 */
Ext.define('Ext.chart.axis.Axis', {

    extend: 'Ext.chart.axis.Abstract',

    config: {
        /**
         * @cfg {Number} majorTickSteps
         * If `minimum` and `maximum` are specified it forces the number of major ticks to the specified value.
         */
        majorTickSteps: false,
        /**
         * @cfg {Number} minorTickSteps
         * The number of small ticks between two major ticks. Default is zero.
         */
        minorTickSteps: false,

        /**
         * @cfg {String} title
         * The title for the Axis
         */
        title: false,

        /**
         * @cfg {Number} dashSize
         * The size of the dash marker. Default's 3.
         */
        dashSize: 3,

        /**
         * @cfg {Number} minimum
         * The minimum value drawn by the axis. If not set explicitly, the axis
         * minimum will be calculated automatically.
         */
        minimum: NaN,

        /**
         * @cfg {Number} maximum
         * The maximum value drawn by the axis. If not set explicitly, the axis
         * maximum will be calculated automatically.
         */
        maximum: NaN,

        adjustMaximumByMajorUnit: false,
        
        adjustMinimumByMajorUnit: false,

        /**
         * @cfg {Number} increment
         * Given a minimum and maximum bound for the series to be rendered (that can be obtained
         * automatically or by manually setting `minimum` and `maximum`) tick marks will be added
         * on each `increment` from the minimum value to the maximum one.
         */
        increment: null
    },

    // @private
    applyData: Ext.emptyFn,

    /**
     * @private If true, label values will be calculated during each axis draw; useful for numeric axes.
     */
    calcLabels: false,

    /**
     * @private Size of the buffer area on either side of the viewport to provide seamless zoom/pan
     * transforms. Expressed as a multiple of the viewport length, e.g. 1 will make the buffer on
     * each side equal to the length of the visible axis viewport.
     */
    overflowBuffer: 1.25,

    /**
     * Invokes renderFrame on this axis's surface(s)
     */
    renderFrame: function() {
        var me = this,
            surface = me.getSurface(),
            labelSurface = me.getLabelSurface();
        surface.renderFrame();
        if (labelSurface !== surface) {
            labelSurface.renderFrame();
        }
    },

    updatePosition: function (value) {
        if (value === 'left' || value === 'right') {
            this.isSide = function () { return true; };
        } else {
            this.isSide = function () { return false; };
        }
    },

    // @private returns whether this axis is on the left or right side
    isSide: function () {
        var pos = this.getPosition();
        return pos === 'left' || pos === 'right';
    },

    /**
     * @private update the position, size, and clipping of the axis surface to match the
     * current bbox and zoom/pan properties.
     */
    updateSurfaceBox: function () {
        var me = this,
            isSide = me.isSide(),
            length = me.getLength(),
            viewLength = length + 1, //add 1px to viewable area so the last tick lines up with main line of adjacent axis
            width = me.getWidth(),
            surface = me.getSurface();

        surface.element.setTop(me.getY());
        surface.element.setLeft(me.getX());

        surface.setSize(isSide ? width : viewLength, isSide ? viewLength : width);
    },

    calcEnds: Ext.emptyFn,

    /**
     * Renders the axis into the screen and updates it's position.
     *
     */
    drawAxis: function (init) {
        var me = this,
            zoomX = me.zoomX,
            zoomY = me.zoomY,
            surface = me.getSurface(),
            x = me.getStartX() * zoomX,
            y = me.getStartY() * zoomY,
            gutterX = me.getChart().maxGutter[0] * zoomX,
            gutterY = me.getChart().maxGutter[1] * zoomY,
            dashSize = me.getDashSize(),
            subDashesX = me.getMinorTickSteps() || 0,
            subDashesY = me.getMinorTickSteps() || 0,
            isSide = me.isSide(),
            viewLength = me.getLength(),
            bufferLength = viewLength * me.overflowBuffer,
            totalLength = viewLength * (isSide ? zoomY : zoomX),
            position = me.getPosition(),
            inflections = [],
            calcLabels = me.calcLabels,
            stepCalcs = me.applyData(),
            step = stepCalcs.step,
            from = stepCalcs.from,
            to = stepCalcs.to,
            math = Math,
            mfloor = math.floor,
            mmax = math.max,
            mmin = math.min,
            mround = math.round,
            labels = [],
            increment = me.getIncrement(),
            trueLength, currentX, currentY, startX, startY, path, dashesX, dashesY, delta, skipTicks, i;

        me.updateSurfaceBox();

        //update the step value if an increment configuration property is provided
        if (increment) {
            step = increment;
        }

        //If no steps are specified
        //then don't draw the axis. This generally happens
        //when an empty store.
        if (me.hidden || !me.getChart().getStore() || me.getChart().getStore().getCount() < 1 || stepCalcs.steps <= 0) {
            me.getSurface().getItems().hide(true);
            if (me.displaySprite) {
                me.displaySprite.hide(true);
            }
            return;
        }

        me.from = stepCalcs.from;
        me.to = stepCalcs.to;
        if (isSide) {
            currentX = mfloor(x) + 0.5;
            path = ["M", currentX, y, "l", 0, -totalLength];
            trueLength = totalLength - (gutterY * 2);
        }
        else {
            currentY = mfloor(y) + 0.5;
            path = ["M", x, currentY, "l", totalLength, 0];
            trueLength = totalLength - (gutterX * 2);
        }

        delta = trueLength * step / (to - from);
        skipTicks = me.skipTicks = mfloor(mmax(0, (isSide ? totalLength + me.panY - viewLength - bufferLength : -me.panX - bufferLength)) / delta);
        dashesX = mmax(subDashesX +1, 0);
        dashesY = mmax(subDashesY +1, 0);
        if (calcLabels) {
            labels = [stepCalcs.from + skipTicks * step];
        }
        if (isSide) {
            currentY = startY = y - gutterY - delta * skipTicks;
            currentX = x - ((position == 'left') * dashSize * 2);
            while (currentY >= startY - mmin(trueLength, viewLength + bufferLength * 2)) {
                path.push("M", currentX, mfloor(currentY) + 0.5, "l", dashSize * 2 + 1, 0);
                if (currentY != startY) {
                    for (i = 1; i < dashesY; i++) {
                        path.push("M", currentX + dashSize, mfloor(currentY + delta * i / dashesY) + 0.5, "l", dashSize + 1, 0);
                    }
                }
                inflections.push([ mfloor(x), mfloor(currentY) ]);
                currentY -= delta;
                if (calcLabels) {
                    // Cut everything that is after tenth digit after floating point. This is to get rid of
                    // rounding errors, i.e. 12.00000000000121212.
                    labels.push(+(labels[labels.length - 1] + step).toFixed(10));
                }
                if (delta === 0) {
                    break;
                }
            }
            if (mround(currentY + delta - (y - gutterY - trueLength))) {
                path.push("M", currentX, mfloor(y - totalLength + gutterY) + 0.5, "l", dashSize * 2 + 1, 0);
                for (i = 1; i < dashesY; i++) {
                    path.push("M", currentX + dashSize, mfloor(y - totalLength + gutterY + delta * i / dashesY) + 0.5, "l", dashSize + 1, 0);
                }
                inflections.push([ mfloor(x), mfloor(currentY) ]);
                if (calcLabels) {
                    // Cut everything that is after tenth digit after floating point. This is to get rid of
                    // rounding errors, i.e. 12.00000000000121212.
                    labels.push(+(labels[labels.length - 1] + step).toFixed(10));
                }
            }
        } else {
            currentX = startX = x + gutterX + delta * skipTicks;
            currentY = y - ((position == 'top') * dashSize * 2);
            while (currentX <= startX + mmin(trueLength, viewLength + bufferLength * 2)) {
                path.push("M", mfloor(currentX) + 0.5, currentY, "l", 0, dashSize * 2 + 1);
                if (currentX != startX) {
                    for (i = 1; i < dashesX; i++) {
                        path.push("M", mfloor(currentX - delta * i / dashesX) + 0.5, currentY, "l", 0, dashSize + 1);
                    }
                }
                inflections.push([ mfloor(currentX), mfloor(y) ]);
                currentX += delta;
                if (calcLabels) {
                    // Cut everything that is after tenth digit after floating point. This is to get rid of
                    // rounding errors, i.e. 12.00000000000121212.
                    labels.push(+(labels[labels.length - 1] + step).toFixed(10));
                }
                if (delta === 0) {
                    break;
                }
            }
            if (mround(currentX - delta - (x + gutterX + trueLength))) {
                path.push("M", mfloor(x + totalLength - gutterX) + 0.5, currentY, "l", 0, dashSize * 2 + 1);
                for (i = 1; i < dashesX; i++) {
                    path.push("M", mfloor(x + totalLength - gutterX - delta * i / dashesX) + 0.5, currentY, "l", 0, dashSize + 1);
                }
                inflections.push([mfloor(currentX), mfloor(y) ]);
                if (calcLabels) {
                    // Cut everything that is after tenth digit after floating point. This is to get rid of
                    // rounding errors, i.e. 12.00000000000121212.
                    labels.push(+(labels[labels.length - 1] + step).toFixed(10));
                }
            }
        }
        if (calcLabels) {
            me.setLabels(labels);
        }

        if (!me.axis) {
            me.axis = surface.add(Ext.apply({
                type: 'path',
                path: path,
                hidden: false
            }, me.style));
            surface.renderItem(me.axis);
        } else {
            me.axis.setAttributes({
                path: path,
                hidden: false
            }, true);
        }

        me.inflections = inflections;
        if (!init) {
            //if grids have been styled in some way
            if ( me.getGrid() ||
                 me.gridStyle.style ||
                 me.gridStyle.oddStyle.style ||
                 me.gridStyle.evenStyle.style ) {
              me.drawGrid();
            }
        }
        me.axisBBox = me.axis.getBBox();
        me.drawLabel();
    },

    /**
     * Renders an horizontal and/or vertical grid into the Surface.
     */
    drawGrid: function() {
        var me = this,
            surface = me.getSurface(),
            grid = me.gridStyle.style || me.getGrid(),
            odd = me.gridStyle.oddStyle.style || grid.odd,
            even = me.gridStyle.evenStyle.style || grid.even,
            inflections = me.inflections,
            ln = inflections.length - ((odd || even)? 0 : 1),
            position = me.getPosition(),
            gutter = me.getChart().maxGutter,
            width = me.getWidth() - 2,
            point, prevPoint,
            i = 1,
            isSide = me.isSide(),
            path = [], styles, lineWidth, dlineWidth,
            oddPath = [], evenPath = [];

        for (; i < ln; i++) {
            point = inflections[i] || inflections[0];
            prevPoint = inflections[i - 1];
            if (odd || even) {
                path = (i % 2)? oddPath : evenPath;
                styles = ((i % 2)? odd : even) || {};
                lineWidth = (styles.lineWidth || styles['stroke-width'] || 0) / 2;
                dlineWidth = 2 * lineWidth;
                if (position == 'left') {
                    path.push("M", prevPoint[0] + 1 + lineWidth, prevPoint[1] + 0.5 - lineWidth,
                              "L", prevPoint[0] + 1 + width - lineWidth, prevPoint[1] + 0.5 - lineWidth,
                              "L", point[0] + 1 + width - lineWidth, point[1] + 0.5 + lineWidth,
                              "L", point[0] + 1 + lineWidth, point[1] + 0.5 + lineWidth, "Z");
                }
                else if (position == 'right') {
                    path.push("M", prevPoint[0] - lineWidth, prevPoint[1] + 0.5 - lineWidth,
                              "L", prevPoint[0] - width + lineWidth, prevPoint[1] + 0.5 - lineWidth,
                              "L", point[0] - width + lineWidth, point[1] + 0.5 + lineWidth,
                              "L", point[0] - lineWidth, point[1] + 0.5 + lineWidth, "Z");
                }
                else if (position == 'top') {
                    path.push("M", prevPoint[0] + 0.5 + lineWidth, prevPoint[1] + 1 + lineWidth,
                              "L", prevPoint[0] + 0.5 + lineWidth, prevPoint[1] + 1 + width - lineWidth,
                              "L", point[0] + 0.5 - lineWidth, point[1] + 1 + width - lineWidth,
                              "L", point[0] + 0.5 - lineWidth, point[1] + 1 + lineWidth, "Z");
                }
                else {
                    path.push("M", prevPoint[0] + 0.5 + lineWidth, prevPoint[1] - lineWidth,
                            "L", prevPoint[0] + 0.5 + lineWidth, prevPoint[1] - width + lineWidth,
                            "L", point[0] + 0.5 - lineWidth, point[1] - width + lineWidth,
                            "L", point[0] + 0.5 - lineWidth, point[1] - lineWidth, "Z");
                }
            } else {
                if (position == 'left') {
                    path = path.concat(["M", point[0] + 0.5, point[1] + 0.5, "l", width, 0]);
                }
                else if (position == 'right') {
                    path = path.concat(["M", point[0] - 0.5, point[1] + 0.5, "l", -width, 0]);
                }
                else if (position == 'top') {
                    path = path.concat(["M", point[0] + 0.5, point[1] + 0.5, "l", 0, width]);
                }
                else {
                    path = path.concat(["M", point[0] + 0.5, point[1] - 0.5, "l", 0, -width]);
                }
            }
        }
        if (odd || even) {
            if (oddPath.length) {
                if (!me.gridOdd && oddPath.length) {
                    me.gridOdd = surface.add({
                        type: 'path',
                        path: oddPath
                    });
                }
                me.gridOdd.setAttributes(Ext.apply({
                    path: oddPath,
                    hidden: false
                }, odd || {}), true);
            }
            if (evenPath.length) {
                if (!me.gridEven) {
                    me.gridEven = surface.add({
                        type: 'path',
                        path: evenPath
                    });
                }
                me.gridEven.setAttributes(Ext.apply({
                    path: evenPath,
                    hidden: false
                }, even || {}), true);
            }
        }
        else {
            if (path.length) {
                if (!me.gridLines) {
                    me.gridLines = me.getSurface().add({
                        type: 'path',
                        path: path,
                        "stroke-width": me.lineWidth || 1,
                        stroke: me.gridColor || '#ccc'
                    });
                }
                me.gridLines.setAttributes({
                    hidden: false,
                    path: path
                }, true);
            }
            else if (me.gridLines) {
                me.gridLines.hide(true);
            }
        }
    },

    isPannable: function() {
        var me = this,
            length = me.getLength(),
            isSide = me.isSide(),
            math = Math,
            ceil = math.ceil,
            floor = math.floor,
            matrix = me.getTransformMatrix();
        return matrix && (
            (isSide ? ceil(matrix.y(0, 0)) < 0 : floor(matrix.x(length, 0)) > length) ||
            (isSide ? floor(matrix.y(0, length)) > length : ceil(matrix.x(0, 0)) < 0)
        );
    },

    //@private
    getOrCreateLabel: function(i, text) {
        var me = this,
            labelGroup = me.labelGroup,
            textLabel = labelGroup.getAt(i),
            surface,
            labelStyle = me.labelStyle.style;
        if (textLabel) {
            if (text != textLabel.attr.text) {
                textLabel.setAttributes(Ext.apply({
                    text: text
                }, labelStyle), true);
                textLabel._bbox = textLabel.getBBox();
            }
        }
        else {
            surface = me.getLabelSurface();
            textLabel = surface.add(Ext.apply({
                group: labelGroup,
                type: 'text',
                x: 0,
                y: 0,
                text: text
            }, labelStyle));
            surface.renderItem(textLabel);
            textLabel._bbox = textLabel.getBBox();
        }
        //get untransformed bounding box
        if (labelStyle.rotation) {
            textLabel.setAttributes({
                rotation: {
                    degrees: 0
                }
            }, true);
            textLabel._ubbox = textLabel.getBBox();
            textLabel.setAttributes(labelStyle, true);
        } else {
            textLabel._ubbox = textLabel._bbox;
        }
        return textLabel;
    },

    intersect: function(l1, l2, rectangular) {
        var r1 = l1.r || (l1.r = this.rect2pointArray(l1, rectangular)),
            r2 = l2.r || (l2.r = this.rect2pointArray(l2, rectangular));
        return !(r1[0] > r2[1] || r1[1] < r2[0] || r1[2] > r2[3] || r1[3] < r2[2]);
    },

    rect2pointArray: function(sprite, rectangular) {
        var rect = sprite.getBBox(true),
            hw = rect.width * 0.5,
            hh = rect.height * 0.5,
            x = (sprite.attr.translation.x || 0) + rect.x + hw,
            y = (sprite.attr.translation.y || 0) + rect.y + hh,
            p = [x, y];
        if (rectangular) {
            // Assuming we have only rotation and translation
            x = rectangular.x(p[0], p[1]);
            y = rectangular.y(p[0], p[1]);
        }
        return [x - hw, x + hw, y - hh, y + hh];
    },

    drawHorizontalLabels: function() {
        var me = this,
            labelConf = me.labelStyle.style,
            renderer = (me.getLabel() || {}).renderer || function(v) {
                return v;
            },
            filter = labelConf.filter || function() {
                return true;
            },
            math = Math,
            floor = math.floor,
            max = math.max,
            axes = me.getChart().getAxes(),
            position = me.getPosition(),
            inflections = me.inflections,
            ln = inflections.length,
            labels = me.getLabels(),
            skipTicks = me.skipTicks,
            maxHeight = 0,
            ratio,
            bbox, point, prevLabel,
            textLabel, text,
            rectangular = false,
            last, x, y, i, firstLabel;

        if (labelConf.rotate) {
            rectangular = new Ext.draw.Matrix();
            rectangular.rotate(labelConf.rotate.degrees, 0, 0);
        }

        if (!me.calcLabels && skipTicks) {
            labels = labels.slice(skipTicks);
            ln -= skipTicks;
        }

        last = ln - 1;
        //get a reference to the first text label dimensions
        point = inflections[0];
        firstLabel = me.getOrCreateLabel(0, renderer(labels[0]));
        ratio = math.abs(math.sin(labelConf.rotate && (labelConf.rotate.degrees * math.PI / 180) || 0)) >> 0;

        for (i = 0; i < ln; i++) {
            point = inflections[i] || inflections[0];
            text = renderer(labels[i]);
            textLabel = me.getOrCreateLabel(i, text);
            bbox = textLabel._bbox;
            maxHeight = max(maxHeight, bbox.height + me.getDashSize() + (labelConf.padding || 0));
            x = floor(point[0] - (ratio? bbox.height : bbox.width) / 2);
            if (me.getChart().maxGutter[0] == 0) {
                if (i == 0 && !axes.get('left')) {
                    x = point[0];
                }
                else if (i == last && !axes.get('right')) {
                    x = point[0] - bbox.width;
                }
            }
            if (position == 'top') {
                y = point[1] - (me.getDashSize() * 2) - labelConf.padding - (bbox.height / 2);
            }
            else {
                y = point[1] + (me.getDashSize() * 2) + labelConf.padding + (bbox.height / 2);
            }
            if (!me.isPannable()) {
                x += me.panX;
            }
            textLabel.setAttributes({
                hidden: false,
                x: x,
                y: y
            }, true);
            if (labelConf.rotate) {
                textLabel.setAttributes(labelConf, true);
            }

            delete textLabel.r;
            // Skip label if there isn't available minimum space
            if (i != 0 && (me.intersect(textLabel, prevLabel, rectangular) || !filter(textLabel, text, i))) {
                textLabel.hide(true);
                continue;
            }
            prevLabel = textLabel;
        }

        return maxHeight;
    },

    drawVerticalLabels: function() {
        var me = this,
            labelConf = me.labelStyle.style,
            renderer = (me.getLabel() || {}).renderer || function(v) {
                return v;
            },
            filter = labelConf.filter || function() {
                return true;
            },
            inflections = me.inflections,
            position = me.getPosition(),
            ln = inflections.length,
            labels = me.getLabels().slice(),
            skipTicks = me.skipTicks,
            maxWidth = 0,
            math = Math,
            max = math.max,
            floor = math.floor,
            ceil = math.ceil,
            axes = me.getChart().getAxes(),
            gutterY = me.getChart().maxGutter[1],
            bbox, point, prevLabel,
            textLabel, text,
            rectangular,
            last, x, y, i;

        if (labelConf.rotate) {
            rectangular = new Ext.draw.Matrix();
            rectangular.rotate(labelConf.rotate.degrees, 0, 0);
        }
        
        if (!me.calcLabels && skipTicks) {
            labels = labels.slice(skipTicks);
            ln -= skipTicks;
        }

        last = ln;
        for (i = 0; i < last; i++) {
            point = inflections[i] || inflections[0];
            text = renderer(labels[i]);
            textLabel = me.getOrCreateLabel(i, text);
            bbox = textLabel._bbox;
            maxWidth = max(maxWidth, bbox.width + me.getDashSize() + (labelConf.padding || 0));
            y = point[1];
            if (gutterY < bbox.height / 2) {
                if (i == last - 1 && !axes.get('top')) {
                    y += ceil(bbox.height / 2);
                }
                else if (i == 0 && !axes.get('bottom')) {
                    y -= floor(bbox.height / 2);
                }
            }
            if (position == 'left') {
                x = point[0] - bbox.width - me.getDashSize() - (labelConf.padding || 0) - 2;
            }
            else {
                x = point[0] + me.getDashSize() + (labelConf.padding || 0) + 2;
            }
            if (!me.isPannable()) {
                y += me.panY;
            }
            textLabel.setAttributes(Ext.apply({
                hidden: false,
                x: x,
                y: y
            }, labelConf), true);
            
            delete textLabel.r;
            // Skip label if there isn't available minimum space
            if (i != 0 && (me.intersect(textLabel, prevLabel, rectangular) || !filter(textLabel, text, i))) {
                textLabel.hide(true);
                continue;
            }
            prevLabel = textLabel;
        }

        return maxWidth;
    },

    /**
     * Renders the labels in the axes.
     */
    drawLabel: function() {
        if (!this.inflections) {
            return 0;
        }

        var me = this,
            labelGroup = me.labelGroup,
            inflections = me.inflections,
            surface = me.getLabelSurface(),
            maxWidth = 0,
            maxHeight = 0,
            ln, i;

        // If we are switching between rendering labels to the axis surface and the main
        // chart surface, then we need to blow away all existing labels and let them get
        // re-created on the new surface
        if (me.lastLabelSurface !== surface) {
            labelGroup.each(function(sprite) {
                sprite.destroy();
            });
            labelGroup.clear();
            me.lastLabelSurface = surface;
        }

        if (me.isSide()) {
            maxWidth = me.drawVerticalLabels();
        } else {
            maxHeight = me.drawHorizontalLabels();
        }

        // Hide unused label sprites
        ln = labelGroup.getCount();
        i = inflections.length;
        for (; i < ln; i++) {
            labelGroup.getAt(i).hide(true);
        }

        me.bbox = {};
        Ext.apply(me.bbox, me.axisBBox);
        me.bbox.height = maxHeight;
        me.bbox.width = maxWidth;
        if (Ext.isString(me.getTitle())) {
            me.drawTitle(maxWidth, maxHeight);
        }
    },

    /**
     * @private
     * Returns the surface onto which axis tick labels should be rendered. Differs between
     * when the axis is in its initial non-zoomed state (uses the main chart surface so the
     * labels can display outside the axis clipping area) and when it is zoomed so it overflows
     * (uses the axis surface so the labels are clipped and panned along with the axis grid).
     * @return {Ext.draw.Surface}
     */
    getLabelSurface: function() {
        return this.getSurface();
        if (this.labelSurface) {
            return this.labelSurface;
        }
        var me = this;
        //TODO(nico): I think there's a bug here when me.getChart().getSurface('main') is called.
        return me.labelSurface = (me.isPannable() ? me.getSurface() : me.getChart().getSurface('main'));
    },

    /**
     * Updates the {@link #title} of this axis.
     * @param {String} title
     */
    updateTitle: function(title) {
        this.drawLabel();
    },

    // @private draws the title for the axis.
    drawTitle: function(maxWidth, maxHeight) {
        var me = this,
            position = me.getPosition(),
            surface = me.getChart().getSurface('main'), //title is drawn on main surface so it doesn't get transformed
            displaySprite = me.displaySprite,
            title = me.getTitle(),
            length = me.getLength(),
            rotate = me.isSide(),
            x = me.getStartX() + me.getX(),
            y = me.getStartY() + me.getY(),
            base, bbox, pad;

        if (displaySprite) {
            displaySprite.setAttributes({text: title}, true);
        } else {
            base = {
                type: 'text',
                x: 0,
                y: 0,
                text: title
            };
            displaySprite = me.displaySprite = surface.add(Ext.apply(base, me.titleStyle.style, me.labelTitle));
            surface.renderItem(displaySprite);
        }
        bbox = displaySprite.getBBox();
        pad = me.getDashSize() + (me.titleStyle.style.padding || 0);

        if (rotate) {
            y -= ((length / 2) - (bbox.height / 2));
            if (position == 'left') {
                x -= (maxWidth + pad + (bbox.width / 2));
            }
            else {
                x += (maxWidth + pad + bbox.width - (bbox.width / 2));
            }
            me.bbox.width += bbox.width + 10;
        }
        else {
            x += (length / 2) - (bbox.width * 0.5);
            if (position == 'top') {
                y -= (maxHeight + pad + (bbox.height * 0.3));
            }
            else {
                y += (maxHeight + pad + (bbox.height * 0.8));
            }
            me.bbox.height += bbox.height + 10;
        }
        displaySprite.setAttributes({
            hidden: false,
            translate: {
                x: x,
                y: y
            }
        }, true);
    },

    /**
     * Return the Series object(s) that are bound to this axis.
     * @return Ext.util.MixedCollection
     */
    getBoundSeries: function() {
        var me = this,
            series = me.getChart().getSeries();
        return series.filterBy(function(s) {
            var seriesFields = [].concat(s.getXField && s.getXField(), s.getYField && s.getYField()),
                i = seriesFields.length;
            while (i--) {
                if (me.isBoundToField(seriesFields[i])) {
                    return true;
                }
            }
            return false;
        });
    },

    /**
     * Determine whether this axis is bound to the given field name.
     * @param {String} field
     * @return {Boolean}
     */
    isBoundToField: function(field) {
        var fields = this.getFields(),
            i = fields.length;
        while(i--) {
            if (fields[i] === field) {
                return true;
            }
        }
        return false;
    },

    /**
     * Return a list of the {@link Ext.draw.Surface surfaces} that should be kept in sync
     * with this chart item's transformations.
     */
    getTransformableSurfaces: function() {
        return [this.getSurface(), this.getLabelSurface()];
    }
});


/**
 * @class Ext.chart.axis.Category
 * @extends Ext.chart.axis.Axis
 *
 * A type of axis that displays items in categories. This axis is generally used to
 * display categorical information like names of items, month names, quarters, etc.
 * but no quantitative values. For that other type of information <em>Number</em>
 * axis are more suitable.
 *
 * As with other axis you can set the position of the axis and its title. For example:
 *
 * {@img Ext.chart.axis.Category/Ext.chart.axis.Category.png Ext.chart.axis.Category chart axis}
 *
 *     var store = new Ext.data.JsonStore({
 *         fields: ['name', 'data1', 'data2', 'data3', 'data4', 'data5'],
 *         data: [
 *             {'name':'metric one', 'data1':10, 'data2':12, 'data3':14, 'data4':8, 'data5':13},
 *             {'name':'metric two', 'data1':7, 'data2':8, 'data3':16, 'data4':10, 'data5':3},
 *             {'name':'metric three', 'data1':5, 'data2':2, 'data3':14, 'data4':12, 'data5':7},
 *             {'name':'metric four', 'data1':2, 'data2':14, 'data3':6, 'data4':1, 'data5':23},
 *             {'name':'metric five', 'data1':27, 'data2':38, 'data3':36, 'data4':13, 'data5':33}                                                
 *         ]
 *     });
 *  
 *     new Ext.chart.Chart({
 *         renderTo: Ext.getBody(),
 *         width: 500,
 *         height: 300,
 *         store: store,
 *         axes: [{
 *             type: 'Numeric',
 *             grid: true,
 *             position: 'left',
 *             fields: ['data1', 'data2', 'data3', 'data4', 'data5'],
 *             title: 'Sample Values',
 *             grid: {
 *                 odd: {
 *                     opacity: 1,
 *                     fill: '#ddd',
 *                     stroke: '#bbb',
 *                     'stroke-width': 1
 *                 }
 *             },
 *             minimum: 0,
 *             adjustMinimumByMajorUnit: false
 *         }, {
 *             type: 'Category',
 *             position: 'bottom',
 *             fields: ['name'],
 *             title: 'Sample Metrics',
 *             grid: true,
 *             label: {
 *                 rotate: {
 *                     degrees: 315
 *                 }
 *             }
 *         }],
 *         series: [{
 *             type: 'area',
 *             highlight: false,
 *             axis: 'left',
 *             xField: 'name',
 *             yField: ['data1', 'data2', 'data3', 'data4', 'data5'],
 *             style: {
 *                 opacity: 0.93
 *             }
 *         }]
 *     });
 *
 * In this example with set the category axis to the bottom of the surface, bound the axis to
 * the <em>name</em> property and set as title <em>Month of the Year</em>.
 */

Ext.define('Ext.chart.axis.Category', {

    extend: 'Ext.chart.axis.Axis',

    type: 'category',

    // TODO(zhangbei): seems not used?
    config: {
        /**
         * @cfg {Array} categoryNames
         * A list of category names to display along this axis.
         */
        categoryNames: null,

        /**
         * @cfg {Boolean} calculateCategoryCount
         * Indicates whether or not to calculate the number of categories (ticks and
         * labels) when there is not enough room to display all labels on the axis.
         * If set to true, the axis will determine the number of categories to plot.
         * If not, all categories will be plotted.
         */
        calculateCategoryCount: false
    },

    // @private creates an array of labels to be used when rendering.
    deduceLabels: function() {
        var me = this,
            chart = me.getChart(),
            store = chart.getStore(),
            fields = Ext.Array.from(me.getFields()),
            ln = fields.length,
            labels = [],
            i;

        store.each(function(record) {
            for (i = 0; i < ln; i++) {
                labels.push(record.get(fields[i]));
            }
        }, this);
        
        this.setLabels(labels);
    },

    calcEnds: function () {
        var count = this.getChart().getStore().getCount();
        return {
            from: 0,
            to: count - 1,
            power: 1,
            step: 1,
            steps: count - 1
        };
    },
    
    // @private calculates labels positions and marker positions for rendering.
    applyData: function() {
        this.callParent();
        this.deduceLabels();
        return this.calcEnds();
    }
});

/**
 * @class Ext.chart.axis.Gauge
 * @extends Ext.chart.axis.Abstract
 *
 * Gauge Axis is the axis to be used with a Gauge series. The Gauge axis
 * displays numeric data from an interval defined by the `minimum`, `maximum` and
 * `step` configuration properties. The placement of the numeric data can be changed
 * by altering the `margin` option that is set to `10` by default.
 *
 * A possible configuration for this axis would look like:
 *
 *     axes: [{
 *         type: 'gauge',
 *         position: 'gauge',
 *         minimum: 0,
 *         maximum: 100,
 *         steps: 10,
 *         margin: 7
 *     }],
 */
Ext.define('Ext.chart.axis.Gauge', { 
 
    extend: 'Ext.chart.axis.Abstract',

    config: {
        /**
         * @cfg {Number} minimum (required) the minimum value of the interval to be displayed in the axis.
         */
        minimum: NaN,
        /**
         * @cfg {Number} maximum (required) the maximum value of the interval to be displayed in the axis.
         */
        maximum: NaN,
         /**
         * @cfg {Number} steps (optional) the number of steps and tick marks to add to the interval. Default's 10.
         */
        steps: 10,
        /**
         * @cfg {Number} margin (optional) the offset positioning of the tick marks and labels in pixels. Default's 10.
         */
        margin: 10,
        /**
         * @cfg {String} position
         * Where to set the axis. Available options are `left`, `bottom`, `right`, `top`. Default's `bottom`.
         */
        position: 'gauge',
        /**
         * @cfg {String} title
         * The title for the Axis
         */
        title: false
    },

    applyPosition: function () { return 'gauge'; },

    drawAxis: function(init) {
        var me = this,
            chart = me.getChart(),
            surface = me.getSurface(),
            bbox = chart.chartBBox,
            centerX = bbox.x + (bbox.width / 2),
            centerY = bbox.y + bbox.height,
            margin = me.getMargin(),
            rho = Math.min(bbox.width, 2 * bbox.height) /2 + margin,
            sprites = [],
            sprite,
            steps = me.getSteps(),
            i, pi = Math.PI,
            cos = Math.cos,
            sin = Math.sin;

        if (me.sprites && !chart.resizing) {
            me.drawLabel();
            return;
        }

        me.updateSurfaceBox();

        if (margin >= 0) {
            if (!me.sprites) {
                //draw circles
                for (i = 0; i <= steps; i++) {
                    sprite = surface.add({
                        type: 'path',
                        path: ['M', centerX + (rho - margin) * cos(i / steps * pi - pi),
                                    centerY + (rho - margin) * sin(i / steps * pi - pi),
                                    'L', centerX + rho * cos(i / steps * pi - pi),
                                    centerY + rho * sin(i / steps * pi - pi), 'Z'],
                        stroke: '#ccc'
                    });
                    sprite.setAttributes(Ext.apply(me.style || {}, {
                        hidden: false
                    }), true);
                    sprites.push(sprite);
                }
            } else {
                sprites = me.sprites;
                //draw circles
                for (i = 0; i <= steps; i++) {
                    sprites[i].setAttributes({
                        path: ['M', centerX + (rho - margin) * cos(i / steps * pi - pi),
                                    centerY + (rho - margin) * sin(i / steps * pi - pi),
                               'L', centerX + rho * cos(i / steps * pi - pi),
                                    centerY + rho * sin(i / steps * pi - pi), 'Z']
                    }, true);
                }
            }
        }
        me.sprites = sprites;
        me.drawLabel();
        if (me.getTitle()) {
            me.drawTitle();
        }
    },

    drawTitle: function() {
        var me = this,
            chart = me.getChart(),
            surface = me.getSurface(),
            bbox = chart.chartBBox,
            labelSprite = me.titleSprite,
            labelBBox;

        if (!labelSprite) {
            me.titleSprite = labelSprite = surface.add({
                type: 'text',
                zIndex: 2
            });
        }
        labelSprite.setAttributes(Ext.apply({
            text: me.getTitle()
        }, Ext.apply(me.titleStyle && me.titleStyle.style || {}, me.getLabel() || {})), true);
        labelBBox = labelSprite.getBBox();
        labelSprite.setAttributes({
            x: bbox.x + (bbox.width / 2) - (labelBBox.width / 2),
            y: bbox.y + bbox.height - (labelBBox.height / 2) - 4
        }, true);
    },

    /**
     * Updates the {@link #title} of this axis.
     * @param {String} title
     */
    updateTitle: function(title) {
        // this.drawTitle();
    },

    drawLabel: function() {
        var me = this,
            chart = me.getChart(),
            surface = me.getSurface(),
            bbox = chart.chartBBox,
            centerX = bbox.x + (bbox.width / 2),
            centerY = bbox.y + bbox.height,
            margin = me.getMargin(),
            rho = Math.min(bbox.width, 2 * bbox.height) /2 + 2 * margin,
            round = Math.round,
            labelArray = [], label,
            maxValue = me.getMaximum() || 0,
            steps = me.getSteps(), i = 0,
            adjY,
            pi = Math.PI,
            cos = Math.cos,
            sin = Math.sin,
            labelConf = me.labelStyle.style,
            renderer = labelConf.renderer || function(v) { return v; };

        if (!me.labelArray) {
            //draw scale
            for (i = 0; i <= steps; i++) {
                // TODO Adjust for height of text / 2 instead
                adjY = (i === 0 || i === steps) ? 7 : 0;
                label = surface.add({
                    type: 'text',
                    text: renderer(round(i / steps * maxValue)),
                    x: centerX + rho * cos(i / steps * pi - pi),
                    y: centerY + rho * sin(i / steps * pi - pi) - adjY,
                    'text-anchor': 'middle',
                    'stroke-width': 0.2,
                    zIndex: 10,
                    stroke: '#333'
                });
                label.setAttributes(Ext.apply(me.labelStyle.style || {}, {
                    hidden: false
                }), true);
                labelArray.push(label);
            }
        }
        else {
            labelArray = me.labelArray;
            //draw values
            for (i = 0; i <= steps; i++) {
                // TODO Adjust for height of text / 2 instead
                adjY = (i === 0 || i === steps) ? 7 : 0;
                labelArray[i].setAttributes({
                    text: renderer(round(i / steps * maxValue)),
                    x: centerX + rho * cos(i / steps * pi - pi),
                    y: centerY + rho * sin(i / steps * pi - pi) - adjY
                }, true);
            }
        }
        me.labelArray = labelArray;
    }
});

/**
 * @class Ext.chart.axis.Numeric
 * @extends Ext.chart.axis.Axis
 *
 * An axis to handle numeric values. This axis is used for quantitative data as
 * opposed to the category axis. You can set mininum and maximum values to the
 * axis so that the values are bound to that. If no values are set, then the
 * scale will auto-adjust to the values.
 *
 * {@img Ext.chart.axis.Numeric/Ext.chart.axis.Numeric.png Ext.chart.axis.Numeric chart axis}
 *
 * For example:
 *
 *     var store = new Ext.data.JsonStore({
 *          fields: ['name', 'data1', 'data2', 'data3', 'data4', 'data5'],
 *          data: [
 *              {'name':'metric one', 'data1':10, 'data2':12, 'data3':14, 'data4':8, 'data5':13},
 *              {'name':'metric two', 'data1':7, 'data2':8, 'data3':16, 'data4':10, 'data5':3},
 *              {'name':'metric three', 'data1':5, 'data2':2, 'data3':14, 'data4':12, 'data5':7},
 *              {'name':'metric four', 'data1':2, 'data2':14, 'data3':6, 'data4':1, 'data5':23},
 *              {'name':'metric five', 'data1':27, 'data2':38, 'data3':36, 'data4':13, 'data5':33}
 *          ]
 *     });
 *
 *     new Ext.chart.Chart({
 *         renderTo: Ext.getBody(),
 *         width: 500,
 *         height: 300,
 *         store: store,
 *         axes: [{
 *             type: 'Numeric',
 *             grid: true,
 *             position: 'left',
 *             fields: ['data1', 'data2', 'data3', 'data4', 'data5'],
 *             title: 'Sample Values',
 *             grid: {
 *                 odd: {
 *                     opacity: 1,
 *                     fill: '#ddd',
 *                     stroke: '#bbb',
 *                     'stroke-width': 1
 *                 }
 *             },
 *             minimum: 0,
 *             adjustMinimumByMajorUnit: 0
 *         }, {
 *             type: 'Category',
 *             position: 'bottom',
 *             fields: ['name'],
 *             title: 'Sample Metrics',
 *             grid: true,
 *             label: {
 *                 rotate: {
 *                     degrees: 315
 *                 }
 *             }
 *         }],
 *         series: [{
 *             type: 'area',
 *             highlight: false,
 *             axis: 'left',
 *             xField: 'name',
 *             yField: ['data1', 'data2', 'data3', 'data4', 'data5'],
 *             style: {
 *                 opacity: 0.93
 *             }
 *         }]
 *     });
 *
 * In this example we create an axis of Numeric type. We set a minimum value so that
 * even if all series have values greater than zero, the grid starts at zero. We bind
 * the axis onto the left part of the surface by setting <em>position</em> to <em>left</em>.
 * We bind three different store fields to this axis by setting <em>fields</em> to an array.
 * We set the title of the axis to <em>Number of Hits</em> by using the <em>title</em> property.
 * We use a <em>grid</em> configuration to set odd background rows to a certain style and even rows
 * to be transparent/ignored.
 *
 * @constructor
 */
Ext.define('Ext.chart.axis.Numeric', { 
 
    extend: 'Ext.chart.axis.Axis',

    type: 'numeric',

    config: {

        /**
         * @cfg {Boolean} roundToDecimal
         * Whether to round the result to the given decimals. Defualt's false.
         * If true then the decimals config will determine the number of decimals to round the 
         * number to.
         */
        roundToDecimal: false,
        
        /**
         * @cfg {Number} decimals
         * The number of decimals to round the value to.
         * Default's 2.
         */
        decimals: 2,

        /**
         * @cfg {String} scale
         * The scaling algorithm to use on this axis. May be "linear" or
         * "logarithmic".
         */
        scale: "linear",

        /**
         * @cfg {String} position
         */
        position: 'left',

        /**
         * @cfg {Boolean} adjustMaximumByMajorUnit
         * Indicates whether to extend maximum beyond data's maximum to the nearest
         * majorUnit.
         */
        adjustMaximumByMajorUnit: false,

        /**
         * @cfg {Boolean} adjustMinimumByMajorUnit
         * Indicates whether to extend the minimum beyond data's minimum to the
         * nearest majorUnit.
         */
        adjustMinimumByMajorUnit: false
    },
    
    calcLabels: true,

    constructor: function(config) {
        var me = this,
            label = config.label || {},
            f;

        me.callParent([config]);
        if (me.getRoundToDecimal() === false) {
            return;
        }
        if (label.renderer) {
            f = label.renderer;
            label.renderer = function(v) {
                return me.roundToDecimal( f(v), me.getDecimals() );
            };
        } else {
            label.renderer = function(v) {
                return me.roundToDecimal(v, me.getDecimals());
            };
        }
        me.setLabel(label);
    },

    roundToDecimal: function(v, dec) {
        var val = Math.pow(10, dec || 0);
        return ((v * val) >> 0) / val;
    },

    /**
     * Returns an object with minimum and maximum values taken from processing the bound stores to the axis.
     * @returns An object with `min` and `max` properties.
     */
    getRange: function () {
        var me = this,
            min = isNaN(me.getMinimum()) ? Infinity : me.getMinimum(),
            max = isNaN(me.getMaximum()) ? -Infinity : me.getMaximum(),
            boundSeries = me.getBoundSeries();

        // For each series bound to this axis, ask the series for its min/max values
        // and use them to find the overall min/max.
        boundSeries.each(function(series) {
            var minMax = me.isBoundToField(series.getXField()) ? series.getMinMaxXValues() : series.getMinMaxYValues();
            if (minMax[0] < min) {
                min = minMax[0];
            }
            if (minMax[1] > max) {
                max = minMax[1];
            }
        });
        if (!isFinite(max)) {
            max = me.prevMax || 0;
        }
        if (!isFinite(min)) {
            min = me.prevMin || 0;
        }
        return {min: min, max: max};
    },

    // @private creates a structure with start, end and step points.
    calcEnds: function () {
        var me = this,
            min, max, range,
            zoom = me['zoom' + (me.isSide() ? 'Y' : 'X')],
            endsLocked = me.getChart().endsLocked && (me.prevFrom !== undefined),
            outfrom, outto, out;


        if (endsLocked) {
            min = me.prevFrom;
            max = me.prevTo;
        } else {
            range = me.getRange();
            min = range.min;
            max = range.max;
            // If the max isn't on the floor, we want to ceil the max for a better endpoint.
            if (min != max && Ext.isNumber(max) && (max != (Math.floor(max)))) {
                max = Math.ceil(max);
            }
        }

        // if minimum and maximum are the same in a numeric axis then change the minimum bound.
        if (me.type == 'numeric' && min === max) {
            if (max !== 0) {
                min = max / 2;
            } else {
                min = -1;
            }
        }

        out = Ext.draw.Draw.snapEnds(min, max, (me.getMajorTickSteps() !== false ?  (me.getMajorTickSteps() +1) : me.getSteps()) * zoom, endsLocked);
        outfrom = out.from;
        outto = out.to;

        if (!endsLocked) {
            if (!isNaN(me.getMaximum())) {
                //TODO(nico) users are responsible for their own minimum/maximum values set.
                //Clipping should be added to remove lines in the chart which are below the axis.
                out.to = me.getMaximum();
            }
            if (!isNaN(me.getMinimum())) {
                //TODO(nico) users are responsible for their own minimum/maximum values set.
                //Clipping should be added to remove lines in the chart which are below the axis.
                out.from = me.getMinimum();
            }
        }

        //Adjust after adjusting minimum and maximum
        out.step = (out.to - out.from) / (outto - outfrom) * out.step;

        if (me.getAdjustMaximumByMajorUnit()) {
            out.to += out.getStep();
        }
        if (me.getAdjustMinimumByMajorUnit()) {
            out.from -= out.getStep();
        }
        if (!endsLocked) {
            me.prevTo = out.to;
            me.prevFrom = out.from;
            me.prevMin = min == max ? 0 : min;
            me.prevMax = max;
        }
        return out;
    },

    // @private apply data.
    applyData: function() {
        this.callParent(arguments);
        return this.calcEnds();
    }
});

/**
 * @class Ext.chart.axis.Radial
 * @extends Ext.chart.axis.Abstract
 *
 * Radial Axis is the axis to be used with a Radar Series. The Radial axis
 * is a circular display of numerical data by steps, with the number of circles
 * equivalent to the defined number of `steps`. Given the maximum data value,
 * the axis will compute step values depending on the number of defined `steps`.
 *
 * A possible configuration for this axis would look like:
 *
 *      axes: [{
 *          steps: 5,
 *          type: 'Radial',
 *          position: 'radial',
 *          label: {
 *              display: 'none'
 *          }
 *      }]
 */
Ext.define('Ext.chart.axis.Radial', { 

    extend: 'Ext.chart.axis.Abstract',

    config: {
        /**
         * @cfg {Number} maximum (optional) the maximum value to be displayed in the axis.
         */
        maximum:  false,

        /**
         * @cfg {Number} steps (required) the number of steps to add to the radial axis.
         */
        step: 10,
        
        position: 'radial',

        /**
         * @cfg {Number} rotation
         * The angle in degrees at which the first pie slice should start.
         */
        rotation: 0
    },

    applyPosition: function() { /* readonly */ return 'radial'; },

    drawAxis: function(init) {
        var me = this,
            chart = me.getChart(),
            surface = me.getSurface(),
            bbox = chart.chartBBox,
            store = chart.getStore(),
            l = store.getCount(),
            centerX = bbox.x + (bbox.width / 2),
            centerY = bbox.y + (bbox.height / 2),
            math = Math,
            mmax = math.max,
            rho = math.min(bbox.width, bbox.height) /2,
            sprites = [], sprite,
            steps = me.getSteps(),
            rotation = -me.getRotation(),
            rad = Ext.draw.Draw.rad,
            cos = math.cos,
            sin = math.sin,
            i, angle;

        if (!l) {
            surface.getItems().hide(true);
            return;
        }

        me.updateSurfaceBox();

        me.centerX = centerX;
        me.centerY = centerY;

        if (!me.sprites) {
            //draw circles
            for (i = 1; i <= steps; i++) {
                sprite = surface.add(Ext.apply(me.style || {}, {
                    type: 'circle',
                    x: centerX,
                    y: centerY,
                    'stroke-width': 1.5,
                    radius: mmax(rho * i / steps, 0),
                    stroke: '#ccc'
                }));
                sprite.setAttributes({
                    hidden: false
                }, true);
                sprites.push(sprite);
            }
            //draw lines
            store.each(function(rec, i) {
                angle = rad(rotation + i / l * 360);
                sprite = surface.add(Ext.apply(me.style || {}, {
                    type: 'path',
                    path: ['M', centerX, centerY, 'L', centerX + rho * cos(angle), centerY + rho * sin(angle), 'Z']
                }));
                sprite.setAttributes({
                    hidden: false
                }, true);
                sprites.push(sprite);
            });
        } else {
            sprites = me.sprites;
            //draw circles
            for (i = 0; i < steps; i++) {
                sprites[i].setAttributes({
                    hidden: false,
                    x: centerX,
                    y: centerY,
                    radius: mmax(rho * (i + 1) / steps, 0)
                }, true);
            }
            //draw lines
            store.each(function(rec, j) {
                angle = rad(rotation + j / l * 360);
                sprites[i + j].setAttributes(Ext.apply(me.style || {}, {
                    hidden: false,
                    path: ['M', centerX, centerY, 'L', centerX + rho * cos(angle), centerY + rho * sin(angle), 'Z']
                }), true);
            });
        }
        me.sprites = sprites;

        me.drawLabel();
    },

    drawLabel: function() {
        var me = this,
            chart = me.getChart(),
            renderer = (me.getLabel() || {}).renderer || function (v) { return v; },
            surface = me.getSurface(),
            bbox = chart.chartBBox,
            store = chart.getStore(),
            centerX = me.centerX,
            centerY = me.centerY,
            rho = Math.min(bbox.width, bbox.height) / 2,
            max = Math.max, round = Math.round,
            labelArray = [], label,
            fields = [], nfields,
            categories = [], xField,
            aggregate = !me.getMaximum(),
            maxValue = me.getMaximum() || 0,
            steps = me.getSteps(), i = 0, j, dx, dy,
            rotation = -me.getRotation(),
            rad = Ext.draw.Draw.rad,
            cos = Math.cos, sin = Math.sin,
            display = me.getLabel().display,
            draw = display !== 'none',
            labelGroup = me.labelGroup,
            labelStyle = me.labelStyle.style,
            categoriesStyle = Ext.apply({}, labelStyle),
            margin = 10,
            angle;

        if (!draw) {
            return;
        }

        //get all rendered fields
        chart.getSeries().each(function(series) {
            fields.push(series.getYField());
            xField = series.getXField();
        });

        //get maxValue to interpolate
        store.each(function(record, i) {
            if (aggregate) {
                for (i = 0, nfields = fields.length; i < nfields; i++) {
                    maxValue = max(+record.get(fields[i]), maxValue);
                }
            }
            categories.push(record.get(xField));
        });
        if (!me.labelArray) {
            if (display != 'categories') {
                //draw scale
                for (i = 1; i <= steps; i++) {
                    label = surface.add({
                        group: labelGroup,
                        type: 'text',
                        text: renderer(round(i / steps * maxValue)),
                        x: centerX,
                        y: centerY - rho * i / steps
                    });
                    if (labelStyle) {
                        label.setAttributes(labelStyle, true);
                    }
                    labelArray.push(label);
                }
            }
            if (display != 'scale') {
                //TODO(nico): ignore translate property since positioning is radial.
                delete categoriesStyle.translate;
                //draw text
                for (j = 0, steps = categories.length; j < steps; j++) {
                    angle = rad(rotation + j / steps * 360);
                    dx = cos(angle) * (rho + margin);
                    dy = sin(angle) * (rho + margin);
                    label = surface.add({
                        group: labelGroup,
                        type: 'text',
                        text: renderer(categories[j]),
                        x: centerX + dx,
                        y: centerY + dy,
                        'text-anchor': dx * dx <= 0.001? 'middle' : (dx < 0? 'end' : 'start')
                    });
                    if (labelStyle) {
                        label.setAttributes(categoriesStyle, true);
                    }
                    labelArray.push(label);
                }
            }
        }
        else {
            labelArray = me.labelArray;
            if (display != 'categories') {
                //draw values
                for (i = 0; i < steps; i++) {
                    labelArray[i].setAttributes({
                        text: renderer(round((i + 1) / steps * maxValue)),
                        x: centerX,
                        y: centerY - rho * (i + 1) / steps,
                        hidden: false
                    }, true);
                }
            }
            if (display != 'scale') {
                //draw text
                for (j = 0, steps = categories.length; j < steps; j++) {
                    angle = rad(rotation + j / steps * 360);
                    dx = cos(angle) * (rho + margin);
                    dy = sin(angle) * (rho + margin);
                    if (labelArray[i + j]) {
                        labelArray[i + j].setAttributes({
                            type: 'text',
                            text: renderer(categories[j]),
                            x: centerX + dx,
                            y: centerY + dy,
                            'text-anchor': dx * dx <= 0.001? 'middle' : (dx < 0? 'end' : 'start'),
                            hidden: false
                        }, true);
                    }
                }
            }
        }
        me.labelArray = labelArray;
    },

    getSurface: function() {
        return this.getChart().getSurface('main');
    },

    reset: function() {
        this.setRotation(0);
        this.callParent();
    }

});

/**
 * @class Ext.chart.axis.Time
 * @extends Ext.chart.axis.Numeric
 *
 * A type of axis whose units are measured in time values. Use this axis
 * for listing dates that you will want to group or dynamically change.
 * If you just want to display dates as categories then use the
 * Category class for axis instead.
 *
 * For example:
 *
 *     axes: [{
 *         type: 'Time',
 *         position: 'bottom',
 *         fields: 'date',
 *         title: 'Day',
 *         dateFormat: 'M d',
 *
 *         constrain: true,
 *         fromDate: new Date('1/1/11'),
 *         toDate: new Date('1/7/11')
 *     }]
 *
 * In this example we're creating a time axis that has as title *Day*.
 * The field the axis is bound to is `date`.
 * The date format to use to display the text for the axis labels is `M d`
 * which is a three letter month abbreviation followed by the day number.
 * The time axis will show values for dates between `fromDate` and `toDate`.
 * Since `constrain` is set to true all other values for other dates not between
 * the fromDate and toDate will not be displayed.
 *
 * @constructor
 */
Ext.define('Ext.chart.axis.Time', { 
 
    extend: 'Ext.chart.axis.Numeric',

    type: 'time',
    
    config: {
        /**
         * @cfg {Boolean} calculateByLabelSize
         * The minimum value drawn by the axis. If not set explicitly, the axis
         * minimum will be calculated automatically.
         */
        calculateByLabelSize: true,

        /**
         * @cfg {String/Boolean} dateFormat
         * Indicates the format the date will be rendered on.
         * For example: 'M d' will render the dates as 'Jan 30', etc.
         */
        dateFormat: false,

        /**
         * @cfg fromDate {Date} The starting date for the time axis.
         */
        fromDate: false,

        /**
         * @cfg toDate {Date} The ending date for the time axis.
         */
        toDate: false,

        /**
         * @cfg step {Array} An array with two components: The first is the unit of the step (Ext.Date.DAY, Ext.Date.MONTH, etc). The second one is the number of units for the step (1, 2, etc.).
         * Default's [Date.DAY, 1]. If this is specified, {@link #steps} config is omitted.
         */
        step: [Ext.Date.DAY, 1],

        /**
         * @cfg {Boolean} constrain
         *
         * If true, the values of the chart will be rendered only if they belong between fromDate and toDate.
         * If false, the time axis will adapt to the new values by adding/removing steps.
         * Default's [Ext.Date.DAY, 1].
         */
        constrain: false
    },

    constructor: function (config) {
        var me = this, label, f, df;
        me.callParent([config]);
        label = me.getLabel() || {};
        df = this.getDateFormat();
        if (df) {
            if (label.renderer) {
                f = label.renderer;
                label.renderer = function(v) {
                    var dv = new Date(f(v));
                    if (isNaN(dv.valueOf())) return f(v);
                    return Ext.Date.format(dv, df);
                };
            } else {
                label.renderer = function(v) {
                    var dv = new Date(v);
                    if (isNaN(dv.valueOf())) return v;
                    return Ext.Date.format(dv, df);
                };
            }
        }
        me.setLabel(label);
    },

    doConstrain: function () {
        var me = this,
            store = me.getChart().getStore(),
            data = [],
            fields = me.getFields(),
            ln = fields.length,
            range = me.getRange(),
            min = range.min, max = range.max, i,
            value, data = [];

        store.each(function(record) {
            for (i = 0; i < ln; i++) {
                value = record.get(fields[i]);
                if (+value < +min) return;
                if (+value > +max) return;
            }
            data.push(record);
        })
        me.getChart().substore = Ext.create('Ext.data.JsonStore', { model: store.model, data: data });
    },

    // Before rendering, set current default step count to be number of records.
    processView: function () {
        var me = this;
        if (me.fromDate) {
            me.setMinimum(+me.fromDate);
        }
        if (me.toDate) {
            me.setMaximum(+me.toDate);
        }
        if (me.constrain) {
            me.doConstrain();
        }
    },

    calcEnds: function() {
        var me = this, range, step = me.getStep();
        if (step) {
            range = me.getRange();
            range = Ext.draw.Draw.snapEndsByDateAndStep(new Date(range.min), new Date(range.max), Ext.isNumber(step) ? [Ext.Date.MILLI, step]: step);
            if (!isNaN(me.getMinimum())) {
                range.from = me.getMinimum();
            }
            if (!isNaN(me.getMaximum())) {
                range.to = me.getMaximum();
            }
            range.step = (range.to - range.from) / range.steps;
            return range;
        } else {
            return me.callParent(arguments);
        }
    }
});

/**
 * @class Ext.chart.series.ItemEvents
 *
 * This series mixin defines events that occur on a particular series item, and adds default
 * event handlers for detecting and firing those item interaction events.
 *
 * @author Jason Johnston <jason@sencha.com>
 * @docauthor Jason Johnston <jason@sencha.com>
 */
Ext.define('Ext.chart.series.ItemEvents', {
    statics: {
        itemEventNames: [
            /**
             * @event itemmousemove
             * Fires when the mouse is moved on a series item.
             * @param {Ext.chart.series.Series} series
             * @param {Object} item
             * @param {Event} event
             */
            'itemmousemove',
            /**
             * @event itemmouseup
             * Fires when a mouseup event occurs on a series item.
             * @param {Ext.chart.series.Series} series
             * @param {Object} item
             * @param {Event} event
             */
            'itemmouseup',
            /**
             * @event itemmousedown
             * Fires when a mousedown event occurs on a series item.
             * @param {Ext.chart.series.Series} series
             * @param {Object} item
             * @param {Event} event
             */
            'itemmousedown',
            /**
             * @event itemmouseover
             * Fires when the mouse enters a series item.
             * @param {Ext.chart.series.Series} series
             * @param {Object} item
             * @param {Event} event
             */
            'itemmouseover',
            /**
             * @event itemmouseout
             * Fires when the mouse exits a series item.
             * @param {Ext.chart.series.Series} series
             * @param {Object} item
             * @param {Event} event
             */
            'itemmouseout',
            /**
             * @event itemclick
             * Fires when a click event occurs on a series item.
             * @param {Ext.chart.series.Series} series
             * @param {Object} item
             * @param {Event} event
             */
            'itemclick',
            /**
             * @event itemdoubleclick
             * Fires when a doubleclick event occurs on a series item.
             * @param {Ext.chart.series.Series} series
             * @param {Object} item
             * @param {Event} event
             */
            'itemdoubleclick',
            /**
             * @event itemtap
             * Fires when a tap event occurs on a series item.
             * @param {Ext.chart.series.Series} series
             * @param {Object} item
             * @param {Event} event
             */
            'itemtap',
            /**
             * @event itemtapstart
             * Fires when a tapstart event occurs on a series item.
             * @param {Ext.chart.series.Series} series
             * @param {Object} item
             * @param {Event} event
             */
            'itemtapstart',
            /**
             * @event itemtapend
             * Fires when a tapend event occurs on a series item.
             * @param {Ext.chart.series.Series} series
             * @param {Object} item
             * @param {Event} event
             */
            'itemtapend',
            /**
             * @event itemtapcancel
             * Fires when a tapcancel event occurs on a series item.
             * @param {Ext.chart.series.Series} series
             * @param {Object} item
             * @param {Event} event
             */
            'itemtapcancel',
            /**
             * @event itemtaphold
             * Fires when a taphold event occurs on a series item.
             * @param {Ext.chart.series.Series} series
             * @param {Object} item
             * @param {Event} event
             */
            'itemtaphold',
            /**
             * @event itemdoubletap
             * Fires when a doubletap event occurs on a series item.
             * @param {Ext.chart.series.Series} series
             * @param {Object} item
             * @param {Event} event
             */
            'itemdoubletap',
            /**
             * @event itemsingletap
             * Fires when a singletap event occurs on a series item.
             * @param {Ext.chart.series.Series} series
             * @param {Object} item
             * @param {Event} event
             */
            'itemsingletap',
            /**
             * @event itemtouchstart
             * Fires when a touchstart event occurs on a series item.
             * @param {Ext.chart.series.Series} series
             * @param {Object} item
             * @param {Event} event
             */
            'itemtouchstart',
            /**
             * @event itemtouchmove
             * Fires when a touchmove event occurs on a series item.
             * @param {Ext.chart.series.Series} series
             * @param {Object} item
             * @param {Event} event
             */
            'itemtouchmove',
            /**
             * @event itemtouchend
             * Fires when a touchend event occurs on a series item.
             * @param {Ext.chart.series.Series} series
             * @param {Object} item
             * @param {Event} event
             */
            'itemtouchend',
            /**
             * @event itemdragstart
             * Fires when a dragstart event occurs on a series item.
             * @param {Ext.chart.series.Series} series
             * @param {Object} item
             * @param {Event} event
             */
            'itemdragstart',
            /**
             * @event itemdrag
             * Fires when a drag event occurs on a series item.
             * @param {Ext.chart.series.Series} series
             * @param {Object} item
             * @param {Event} event
             */
            'itemdrag',
            /**
             * @event itemdragend
             * Fires when a dragend event occurs on a series item.
             * @param {Ext.chart.series.Series} series
             * @param {Object} item
             * @param {Event} event
             */
            'itemdragend',
            /**
             * @event itempinchstart
             * Fires when a pinchstart event occurs on a series item.
             * @param {Ext.chart.series.Series} series
             * @param {Object} item
             * @param {Event} event
             */
            'itempinchstart',
            /**
             * @event itempinch
             * Fires when a pinch event occurs on a series item.
             * @param {Ext.chart.series.Series} series
             * @param {Object} item
             * @param {Event} event
             */
            'itempinch',
            /**
             * @event itempinchend
             * Fires when a pinchend event occurs on a series item.
             * @param {Ext.chart.series.Series} series
             * @param {Object} item
             * @param {Event} event
             */
            'itempinchend',
            /**
             * @event itemswipe
             * Fires when a swipe event occurs on a series item.
             * @param {Ext.chart.series.Series} series
             * @param {Object} item
             * @param {Event} event
             */
            'itemswipe'

            // TODO itemtouchenter, itemtouchleave?
        ]
    },


    constructor: function() {
        var me = this,
            itemEventNames = me.statics().itemEventNames;
        me.enableBubble(itemEventNames);
    },

    initialize: function() {
        var me = this;
        me.getChart().on({
            scope: me,
            mousemove: me.onMouseMove,
            mouseup: me.onMouseUp,
            mousedown: me.onMouseDown,
            click: me.onClick,
            doubleclick: me.onDoubleClick,
            tap: me.onTap,
            tapstart: me.onTapStart,
            tapend: me.onTapEnd,
            tapcancel: me.onTapCancel,
            longpress: me.onLongPress,
            doubletap: me.onDoubleTap,
            singletap: me.onSingleTap,
            touchstart: me.onTouchStart,
            touchmove: me.onTouchMove,
            touchend: me.onTouchEnd,
            dragstart: me.onDragStart,
            drag: me.onDrag,
            dragend: me.onDragEnd,
            pinchstart: me.onPinchStart,
            pinch: me.onPinch,
            pinchend: me.onPinchEnd,
            swipe: me.onSwipe
        });
    },

    itemForEvent: function(e) {
        var me = this;
        if(me.lastEvent != e) {
            me.lastEvent = e;
            var me = this,
            chartXY = me.getChart().getEventXY(e);
            return me.lastItemForEvent = me.getItemForPoint(chartXY[0], chartXY[1]);
        }
        return me.lastItemForEvent;
    },

    getBubbleTarget: function() {
        return this.getChart();
    },

    onMouseMove: function(e) {
        var me = this,
            lastItem = me.lastOverItem,
            item = me.itemForEvent(e);
        if (lastItem && item !== lastItem) {
            me.fireEvent('itemmouseout', me, lastItem, e);
            delete me.lastOverItem;
        }
        if (item) {
            me.fireEvent('itemmousemove', me, item, e);
        }
        if (item && item !== lastItem) {
            me.fireEvent('itemmouseover', me, item, e);
            me.lastOverItem = item;
        }
    }
}, function () {
    function createEventRelayMethod(name) {
        return function(e) {
            var me = this,
                item = me.itemForEvent(e);
            if (item) {
                me.fireEvent(name, me, item, e);
            }
        }
    }
    Ext.apply(this.prototype, {
        // Events directly relayed when on an item:
        onMouseUp: createEventRelayMethod('itemmouseup'),
        onMouseDown: createEventRelayMethod('itemmousedown'),
        onClick: createEventRelayMethod('itemclick'),
        onDoubleClick: createEventRelayMethod('itemdoubleclick'),
        onTap: createEventRelayMethod('itemtap'),
        onTapStart: createEventRelayMethod('itemtapstart'),
        onTapEnd: createEventRelayMethod('itemtapend'),
        onTapCancel: createEventRelayMethod('itemtapcancel'),
        onLongPress: function(e) {
            var me = this,
                item = me.itemForEvent(e);
            if (item) {
                me.fireEvent('itemlongpress', me, item, e);
                //<deprecated product=charts since=2.0>
                me.fireEvent('itemtaphold', me, item, e);
                //</deprecated>
            }
        },
        onDoubleTap: createEventRelayMethod('itemdoubletap'),
        onSingleTap: createEventRelayMethod('itemsingletap'),
        onTouchStart: createEventRelayMethod('itemtouchstart'),
        onTouchMove: createEventRelayMethod('itemtouchmove'),
        onTouchEnd: createEventRelayMethod('itemtouchend'),
        onDragStart: createEventRelayMethod('itemdragstart'),
        onDrag: createEventRelayMethod('itemdrag'),
        onDragEnd: createEventRelayMethod('itemdragend'),
        onPinchStart: createEventRelayMethod('itempinchstart'),
        onPinch: createEventRelayMethod('itempinch'),
        onPinchEnd: createEventRelayMethod('itempinchend'),
        onSwipe: createEventRelayMethod('itemswipe')
    });
});


/**
 * @class Ext.chart.series.Series
 *
 * Series is the abstract class containing the common logic to all chart series. Series includes
 * methods from Labels, Highlights, Tips and Callouts mixins. This class implements the logic of
 * animating, hiding, showing all elements and returning the color of the series to be used as a legend item.
 *
 * ## Listeners
 *
 * The series class supports listeners via the Observable syntax. Some of these listeners are:
 *
 *  - `itemmouseup` When the user interacts with a marker.
 *  - `itemmousedown` When the user interacts with a marker.
 *  - `itemmousemove` When the user iteracts with a marker.
 *  - (similar `item*` events occur for many raw mouse and touch events)
 *  - `afterrender` Will be triggered when the animation ends or when the series has been rendered completely.
 *
 * For example:
 *
 *     series: [{
 *             type: 'column',
 *             axis: 'left',
 *             listeners: {
 *                     'afterrender': function() {
 *                             console('afterrender');
 *                     }
 *             },
 *             xField: 'category',
 *             yField: 'data1'
 *     }]
 *
 */
Ext.define('Ext.chart.series.Series', { 
    
    mixins: {
      identifiable: 'Ext.mixin.Identifiable',
      observable: 'Ext.mixin.Observable',
      label: 'Ext.chart.Label',
      highlight: 'Ext.chart.Highlight',
      callout: 'Ext.chart.Callout',
      transformable: 'Ext.chart.Transformable',
      itemEvents: 'Ext.chart.series.ItemEvents'
    },

    uses: [
        'Ext.chart.theme.MarkerStyle',
        'Ext.chart.theme.LabelStyle'
    ],
    /**
     * @event beforedraw
     * @event draw
     * @event afterdraw
     */

    /**
     * @event titlechange
     * Fires when the series title is changed via {@link #setFieldTitle}.
     * @param {String} title The new title value
     * @param {Number} index The index in the collection of titles
     */

    config: {
        chart: null,

        /**
         * @cfg {String} title
         * The human-readable name of the series.
         */
        title: null,

        /**
         * @cfg {Array} excludes
         * Indicates whether a fragment is to be ignored.
         */
        excludes: [],

        /**
         * @cfg {Array} shadowAttributes
         * An array with shadow attributes
         */
        shadowAttributes: [],

        /**
         * @cfg {Object} shadowOptions
         */
        shadowOptions: {},

        /**
         * @cfg {Function} renderer
         * A function that can be overridden to set custom styling properties to each rendered element.
         * Passes in (sprite, record, attributes, index, store) to the function.
         */
        renderer: function(sprite, record, attributes, index, store) {
            return attributes;
        }

    },
    
    // TODO make into interaction:
    /**
     * @cfg {Object} tips
     * Add tooltips to the visualization's markers. The options for the tips are the
     * same configuration used with {@link Ext.tip.ToolTip}. For example:
     *
     *     tips: {
     *       trackMouse: true,
     *       width: 140,
     *       height: 28,
     *       renderer: function(storeItem, item) {
     *         this.setFieldTitle(storeItem.get('name') + ': ' + storeItem.get('data1') + ' views');
     *       }
     *     },
     */

    /**
     * @protected {String} type
     * The type of series. Set in subclasses.
     */
    type: null,

    /**
     * @cfg {Boolean} showInLegend
     * Whether to show this series in the legend.
     */
    showInLegend: true,

    //@private triggerdrawlistener flag
    triggerAfterDraw: 0,

    constructor: function(config) {
        var me = this;
        me.seriesId = config.seriesId;
        me.getId();

        //new fresh object as own property.
        me.style = {};
        me.themeStyle = {};

        me.shadowGroups = [];
        me.markerStyle = new Ext.chart.theme.MarkerStyle();
        me.labelStyle = new Ext.chart.theme.LabelStyle();

        me.mixins.observable.constructor.apply(me, arguments);
        me.mixins.label.constructor.apply(me, arguments);
        me.mixins.highlight.constructor.apply(me, arguments);
        me.mixins.callout.constructor.apply(me, arguments);
        me.mixins.transformable.constructor.apply(me, arguments);
        me.mixins.itemEvents.constructor.apply(me, arguments);

        me.initConfig(config);
    },

    initialize: function () {
        var me = this, surface = me.getSurface(), i, l;
        me.group = surface.getGroup(me.getId());
        me.mixins.label.initialize.call(me);
        me.mixins.itemEvents.initialize.apply(me, arguments);

        me.setConfig({
            shadowAttributes: surface.getShadowAttributesArray(),
            //get canvas shadow options.
            shadowOptions: {}
        });


        if (me.getChart().getShadow()) {
            for (i = 0, l = this.getShadowAttributes().length; i < l; i++) {
                me.shadowGroups.push(surface.getGroup(me.seriesId + '-shadows' + i));
            }
        }
    },

    applyShadowOptions: function (option) {
        var me = this,
            surface = me.getSurface();
        if (surface) {
            return Ext.apply(Ext.Object.chain(surface.getShadowOptions()), option);
        }
        return Ext.apply({}, option);
    },

    applyExcludes: function (excludes) {
        return [].concat(excludes);
    },

    getId: function() {
        return this.seriesId || (this.seriesId = Ext.id(null, 'ext-series-'));
    },

    updateChart: function(chart) {
        var me = this;
        delete me.surface;
        if (chart) {
            me.surface = chart.getSurface('series-' + me.getId());
            me.surface.element.setStyle('zIndex', me.getChart().surfaceZIndexes.series);
        }
    },

    /**
     * @private get the surface for drawing the series sprites
     */
    getSurface: function() {
        return this.surface;
    },

    /**
     * @private get the surface for drawing the series overlay sprites
     */
    getOverlaySurface: function() {
        var me = this,
            surface = me.overlaySurface;
        if (!surface) {
            surface = me.overlaySurface = me.getChart().getSurface('seriesOverlay' + me.index);
            surface.element.setStyle('zIndex', me.getChart().surfaceZIndexes.overlay);
        }
        return surface;
    },

    // @private set the bbox and clipBox for the series
    setBBox: function(noGutter) {
        var me = this,
            chart = me.getChart(),
            chartBBox = chart.chartBBox,
            gutterX = noGutter ? 0 : chart.maxGutter[0],
            gutterY = noGutter ? 0 : chart.maxGutter[1],
            clipBox, bbox;

        clipBox = {
            x: 0,
            y: 0,
            width: chartBBox.width,
            height: chartBBox.height
        };
        me.clipBox = clipBox;

        bbox = {
            x: ((clipBox.x + gutterX) - (chart.zoom.x * chart.zoom.width)) * me.zoomX,
            y: ((clipBox.y + gutterY) - (chart.zoom.y * chart.zoom.height)) * me.zoomY,
            width: (clipBox.width - (gutterX * 2)) * chart.zoom.width * me.zoomX,
            height: (clipBox.height - (gutterY * 2)) * chart.zoom.height * me.zoomY
        };

        me.bbox = bbox;
    },

    // @private set the animation for the sprite
    onAnimate: function(sprite, attr) {
        var me = this,
            params = me.getChart().getAnimate(),
            fx = sprite.fx;

        fx.stop();
        fx.setDuration(attr.duration || params.duration || 500);
        fx.setEasing(attr.easing || params.easing || 'easeInOut');

        me.triggerAfterDraw++;
        fx.setOnComplete(function() {
            me.triggerAfterDraw--;
            if (me.triggerAfterDraw === 0) {
                me.fireEvent('afterrender');
            }
        });
        return fx.start(attr.to);
    },

    // @private return the gutter.
    getGutters: function() {
        return [0, 0];
    },

    /**
     * For a given x/y point relative to the Surface, find a corresponding item from this
     * series, if any.
     * @param {Number} x
     * @param {Number} y
     * @return {Object} An object describing the item, or null if there is no matching item. The exact contents of
     *                  this object will vary by series type, but should always contain at least the following:
     *                  <ul>
     *                    <li>{Ext.chart.series.Series} series - the Series object to which the item belongs</li>
     *                    <li>{Object} value - the value(s) of the item's data point</li>
     *                    <li>{Array} point - the x/y coordinates relative to the chart box of a single point
     *                        for this data item, which can be used as e.g. a tooltip anchor point.</li>
     *                    <li>{Ext.draw.Sprite} sprite - the item's rendering Sprite.
     *                  </ul>
     */
    getItemForPoint: function(x, y) {
        var me = this,
            items = me.items,
            bbox = me.bbox,
            i, ln;

        if (items && items.length && !me.seriesIsHidden && Ext.draw.Draw.withinBox(x, y, bbox)) {
            // Adjust for series pan
            x -= me.panX;
            y -= me.panY;

            // Check bounds
            for (i = 0, ln = items.length; i < ln; i++) {
                if (items[i] && me.isItemInPoint(x, y, items[i], i)) {
                    return items[i];
                }
            }
        }

        return null;
    },

    isItemInPoint: function() {
        return false;
    },

    /**
     * Hides all the elements in the series.
     */
    hideAll: function() {
        var me = this,
            items = me.items,
            item, len, i, j, l, sprite, shadows;

        me.seriesIsHidden = true;
        me._prevShowMarkers = me.showMarkers;

        me.showMarkers = false;
        //hide all labels
        me.hideLabels(0);
        //hide all sprites
        for (i = 0, len = items.length; i < len; i++) {
            item = items[i];
            sprite = item.sprite;
            if (sprite) {
                sprite.setAttributes({
                    hidden: true
                }, true);
                
                if (sprite.shadows) {
                    shadows = sprite.shadows;
                    for (j = 0, l = shadows.length; j < l; ++j) {
                        shadows[j].hide(true);
                    }
                }
            }

        }
    },

    /**
     * Shows all the elements in the series.
     */
    showAll: function() {
        var me = this,
            prevAnimate = me.getChart().animate;
        me.getChart().animate = false;
        me.seriesIsHidden = false;
        me.showMarkers = me._prevShowMarkers;
        me.drawSeries();
        me.getChart().animate = prevAnimate;
    },

    /**
     * Performs drawing of this series.
     */
    drawSeries: function() {
        this.updateSurfaceBox();
    },

    /**
     * Returns an array of labels to be displayed as items in the legend. Only relevant if
     * {@link #showInLegend} is true.
     */
    getLegendLabels: function() {
        var title = this.getTitle();
        return title ? [title] : [];
    },

    getColorFromStyle: function(style) {
        if (Ext.isObject(style)) {
            return style.stops[0].color;
        }
        //if it's a gradient just return the first color stop.
        return style.indexOf('url') == -1 ? style : this.getSurface('main')._gradients[style.match(/url\(#([^\)]+)\)/)[1]].stops[0].color;
    },

    /**
     * Returns a string with the color to be used for the series legend item.
     */
    getLegendColor: function(index) {
        var me = this, fill, stroke;

        if (me.style) {
            fill = me.style.fill;
            stroke = me.style.stroke;
            if (fill && fill != 'none') {
                return me.getColorFromStyle(fill);
            }
            return me.getColorFromStyle(stroke);
        }

        return '#000';
    },

    /**
     * Checks whether the data field should be visible in the legend
     * @private
     * @param {Number} index The index of the current item
     */
    visibleInLegend: function(index){
        if (this.getLegendLabels().length == 1) {
            return !this.seriesIsHidden;
        } else {
            return !this.isExcluded(index);
        }
    },

    /**
     * Returns an array of objects that describe the legend items involved in this series.
     */
    getLegendInfo: function() {
        var me = this,
            labels = me.getLegendLabels(),
            i = 0, ln = labels.length,
            result = [];
        for (; i < ln; i++) {
            result.push({
                label: labels[i],
                color: me.getLegendColor(i),
                disabled: !me.visibleInLegend(i)
            });
        }
        return {
            items: result
        }
    },

    onLegendItemTap: function(record, index) {
        var me = this, disabled, excludes;
        if (this.getLegendLabels().length == 1) {
            disabled = !this.seriesIsHidden;
            this.seriesIsHidden = disabled;
        } else {
            disabled = !me.isExcluded(index);
            excludes = me.getExcludes();
            excludes[index] = disabled;
            // Trigger the updater
            me.setExcludes(excludes);
        }
        record.set('disabled', disabled);
    },

    onLegendItemDoubleTap: function(record, index) {

    },

    onLegendReset: function() {
        if (this.getLegendLabels().length == 1) {
            this.seriesIsHidden = false
        } else {
            this.setExcludes([]);
        }
    },
    
    /**
     * Changes the value of the {@link #title} for the series.
     * Arguments can take two forms:
     * <ul>
     * <li>A single String value: this will be used as the new single title for the series (applies
     * to series with only one yField)</li>
     * <li>A numeric index and a String value: this will set the title for a single indexed yField.</li>
     * </ul>
     * @param {Number} index
     * @param {String} title
     */
    setFieldTitle: function(index, title) {
        var me = this,
            oldTitle = me.title;

        if (Ext.isString(index)) {
            title = index;
            index = 0;
        }

        if (Ext.isArray(oldTitle)) {
            oldTitle[index] = title;
        } else {
            me.title = title;
        }

        me.fireEvent('titlechange', title, index);
    },

    /**
     * @private update the position/size of the series surface
     */
    updateSurfaceBox: function() {
        var me = this,
            surface = me.getSurface(),
            overlaySurface = me.getOverlaySurface(),
            chartBBox = me.getChart().chartBBox;

        surface.element.setTop(chartBBox.y);
        surface.element.setLeft(chartBBox.x);

        surface.setSize(chartBBox.width, chartBBox.height);

        overlaySurface.element.setTop(chartBBox.y);
        overlaySurface.element.setLeft(chartBBox.x);

        overlaySurface.setSize(chartBBox.width, chartBBox.height);
    },

    getTransformableSurfaces: function() {
        // Need to transform the overlay surface along with the normal surface
        // TODO might be good to skip transforming the overlay surface if there is nothing in it
        return [this.getSurface(), this.getOverlaySurface()];
    },

    /**
     * Iterate over each of the records for this series. The default implementation simply iterates
     * through the entire data store, but individual series implementations can override this to
     * provide custom handling, e.g. adding/removing records.
     * @param {Function} fn The function to execute for each record.
     * @param {Object} scope Scope for the fn.
     */
    eachRecord: function(fn, scope) {
        var chart = this.getChart();
        (chart.substore || chart.getStore()).each(fn, scope);
    },

    /**
     * Return the number of records being displayed in this series. The defaults behavior returns the number of
     * records in the store; individual series implementations can override to provide custom handling.
     */
    getRecordCount: function() {
        var chart = this.getChart(),
            store = chart.substore || chart.getStore();
        return store ? store.getCount() : 0;
    },

    /**
     * Determines whether the series item at the given index has been excluded, i.e. toggled off in the legend.
     * @param index
     */
    isExcluded: function(index) {
        var excludes = this.getExcludes();
        return !!(excludes && excludes[index]);
    },

    /**
     * Combine two of this series's indexed items into one. This is done via drag-drop on the
     * legend for series that render more than one legend item. The data store is not modified,
     * but the series uses the cumulative list of combinations in its rendering.
     * @param {Number} index1 Index of the first item
     * @param {Number} index2 Index of the second item
     */
    combine: function(index1, index2) {
        var me = this,
            combinations = me.combinations || (me.combinations = []),
            excludes = me.getExcludes();
        combinations.push([index1, index2]);
        if (excludes && index1 < excludes.length) {
            excludes.splice(index1, 1);
        }
    },

    /**
     * Determines whether the item at the given index is the result of item combination.
     * @param {Number} index
     * @return {Boolean}
     */
    isCombinedItem: function(index) {
        return this.getCombinationIndexesForItem(index).length > 0;
    },

    getCombinationIndexesForItem: function(index) {
        var me = this,
            combinations = me.combinations,
            provenances = [],
            i, len, combo, comboIndexA, comboIndexB;
        if (combinations) {
            // Step through the combinations to determine which combination step(s) contribute
            // to the item at the given index, if any
            for (i = 0, len = combinations.length; i < len; i++) {
                combo = combinations[i];
                comboIndexA = combo[0];
                comboIndexB = combo[1];
                if (!provenances[comboIndexB]) {
                    provenances[comboIndexB] = [];
                }
                if (provenances[comboIndexA]) {
                    provenances[comboIndexB] = provenances[comboIndexB].concat(provenances[comboIndexA]);
                }
                provenances[comboIndexB].push(i);
                provenances.splice(comboIndexA, 1);
            }
        }
        return provenances[index] || [];
    },

    split: function(index) {
        var me = this,
            combinations = me.combinations,
            excludes = me.getExcludes(),
            i, j, len, comboIndexes, combo, movedItemIndex;

        if (combinations) {
            comboIndexes = me.getCombinationIndexesForItem(index);

            // For each contributing combination, remove it from the list and adjust the indexes
            // of all subsequent combinations and excludes to account for it
            if (comboIndexes) {
                for (i = comboIndexes.length; i--;) {
                    movedItemIndex = combinations[comboIndexes[i]][0];
                    for (j = comboIndexes[i] + 1, len = combinations.length; j < len; j++) {
                        if (movedItemIndex <= combinations[j][0]) {
                            combinations[j][0]++;
                        }
                        if (movedItemIndex <= combinations[j][1]) {
                            combinations[j][1]++;
                        }
                    }
                    combinations.splice(comboIndexes[i], 1);

                    if (excludes) {
                        excludes.splice(movedItemIndex, 0, false);
                    }
                }
            }

            // Now that the combinations list is updated, reset and replay them all
            me.clearCombinations();
            for (i = 0, len = combinations.length; i < len; i++) {
                combo = combinations[i];
                me.combine(combo[0], combo[1]);
            }
        }
    },

    /**
     * Split any series items that were combined via {@link #combine} into their original items.
     */
    clearCombinations: function() {
        delete this.combinations;
    },

    /**
     * Reset the series to its original state, before any user interaction.
     */
    reset: function() {
        var me = this;
        me.unHighlightItem();
        me.cleanHighlights();
        me.clearTransform();
    },

    /* ---------------------------------
      Methods needed for ComponentQuery
     ----------------------------------*/

    //filled by the constructor.
    parent: null,

    getItemId: function() {
        return this.element && this.element.id || this.id || null;
    },

    initCls: function() {
        return (this.cls || '').split(' ');
    },

    isXType: function(xtype) {
        return xtype === 'series';
    },

    getRefItems: function(deep) {
        var me = this,
            ans = [];

        if (me.markerStyle) {
            ans.push(me.markerStyle);
        }

        if (me.labelStyle) {
            ans.push(me.labelStyle);
        }

        if (me.calloutStyle) {
            ans.push(me.calloutStyle);
        }
        
        if (me.highlightStyle) {
            ans.push(me.highlightStyle);
        }

        return ans;
    }
});


/**
 * @class Ext.chart.series.Cartesian
 * @extends Ext.chart.series.Series
 *
 * Common base class for series implementations which plot values using x/y coordinates.
 *
 * @constructor
 */
Ext.define('Ext.chart.series.Cartesian', { 
 
    extend: 'Ext.chart.series.Series',

    config: {
        /**
         * The field used to access the x axis value from the items from the data
         * source.
         *
         * @cfg xField
         * @type String
         */
        xField: null,

        /**
         * The field used to access the y-axis value from the items from the data
         * source.
         *
         * @cfg yField
         * @type String
         */
        yField: null,


        /**
         * @cfg {String} axis
         * The position of the axis to bind the values to. Possible values are 'left', 'bottom', 'top' and 'right'.
         * You must explicitly set this value to bind the values of the line series to the ones in the axis, otherwise a
         * relative scale will be used.
         */
        axis: 'left'
    },

    // @private
    boundAxes: {
        xAxis: 'bottom',
        yAxis: 'left'
    },

    applyYField: function(field) {
        return [].concat(field);
    },

    applyAxis: function (axis) {
        return [].concat(axis);
    },

    updateAxis: function () {
        this.onAxesChanged();
    },

    initialize: function () {
        var me = this;
        me.callParent();
        me.getChart().on('axeschange', 'onAxesChanged', me);
        me.onAxesChanged();
    },

    getLegendLabels: function() {
        var me = this,
            labels = [],
            combinations = me.combinations;

        Ext.each(me.getYField(), function(yField, i) {
            var title = me.getTitle();
            // Use the 'title' config if present, otherwise use the raw yField name
            labels.push((Ext.isArray(title) ? title[i] : title) || yField);
        });

        // Handle yFields combined via legend drag-drop
        if (combinations) {
            Ext.each(combinations, function(combo) {
                var label0 = labels[combo[0]],
                    label1 = labels[combo[1]];
                labels[combo[1]] = label0 + ' & ' + label1;
                labels.splice(combo[0], 1);
            });
        }

        return labels;
    },

    /**
     * @protected Iterates over a given record's values for each of this series's yFields,
     * executing a given function for each value. Any yFields that have been combined
     * via legend drag-drop will be treated as a single value.
     * @param {Ext.data.Model} record
     * @param {Function} fn
     * @param {Object} scope
     */
    eachYValue: function(record, fn, scope) {
        Ext.each(this.getYValueAccessors(), function(accessor, i) {
            fn.call(scope, accessor(record), i);
        });
    },

    /**
     * @protected Returns the number of yField values, taking into account fields combined
     * via legend drag-drop.
     * @return {Number}
     */
    getYValueCount: function() {
        return this.getYValueAccessors().length;
    },

    combine: function(index1, index2) {
        var me = this,
            accessors = me.getYValueAccessors(),
            accessor1 = accessors[index1],
            accessor2 = accessors[index2];

        // Combine the yValue accessors for the two indexes into a single accessor that returns their sum
        accessors[index2] = function(record) {
            return accessor1(record) + accessor2(record);
        };
        accessors.splice(index1, 1);

        Ext.chart.series.Cartesian.superclass.combine.call(me, index1, index2);
    },

    clearCombinations: function() {
        // Clear combined accessors, they'll get regenerated on next call to getYValueAccessors
        delete this.yValueAccessors;
        Ext.chart.series.Cartesian.superclass.clearCombinations.call(this);
    },

    /**
     * @protected Returns an array of functions, each of which returns the value of the yField
     * corresponding to function's index in the array, for a given record (each function takes the
     * record as its only argument.) If yFields have been combined by the user via legend drag-drop,
     * this list of accessors will be kept in sync with those combinations.
     * @return {Array} array of accessor functions
     */
    getYValueAccessors: function() {
        var me = this,
            accessors = me.yValueAccessors;
        if (!accessors) {
            accessors = me.yValueAccessors = [];
            Ext.each(me.getYField(), function(yField) {
                accessors.push(function(record) {
                    return record.get(yField);
                });
            });
        }
        return accessors;
    },

    /**
     * @private
     * @param aggFunc
     */
    aggregateRecords: function(aggFunc, init, done) {
        init = Ext.isFunction(init) ? init.apply(this) : init;
        this.eachRecord(function (record) {
            return init = aggFunc.apply(this, [init, record]);
        })
        return Ext.isFunction(done) ? done(init): init;
    },

    /**
     * @private
     * @param aggFunc
     */
    aggregateXValues: function(aggFunc, init, done) {
        var field = this.getXField();
        return this.aggregateRecords(function (init, record) {
            return init = aggFunc.apply(this, [init, record.get(field)]);
        }, init, done);
    },

    /**
     * @private
     * @param aggFunc
     */
    aggregateYValues: function(aggFunc, init, done) {
        var field = this.getYField();
        return this.aggregateRecords(function (init, record) {
            return init = aggFunc.apply(this, [init, record.get(field)]);
        }, init, done);
    },

    /**
     * Calculate the min and max values for this series's xField.
     * @return {Array} [min, max]
     */
    getMinMaxXValues: function() {
        return this.aggregateXValues(
            function (result, value) {
                if (value > result[1]) {
                    result[1] = value;
                }
                if (value < result[0]) {
                    result[0]= value;
                }
                return result;
            },
            [Infinity,-Infinity]
        );
        // TODO: remove this after the above is considered good.
        var me = this,
            min, max,
            xField = me.getXField();

        if (me.getRecordCount() > 0) {
            min = Infinity;
            max = -min;
            me.eachRecord(function(record) {
                var xValue = record.get(xField);
                if (xValue > max) {
                    max = xValue;
                }
                if (xValue < min) {
                    min = xValue;
                }
            });
        } else {
            min = max = 0;
        }
        return [min, max];
    },

    /**
     * Calculate the min and max values for this series's yField(s). Takes into account yField
     * combinations, exclusions, and stacking.
     * @return {Array} [min, max]
     */
    getMinMaxYValues: function() {
        var me = this,
            stacked = me.stacked,
            min, max,
            positiveTotal, negativeTotal;

        function eachYValueStacked(yValue, i) {
            if (!me.isExcluded(i)) {
                if (yValue < 0) {
                    negativeTotal += yValue;
                } else {
                    positiveTotal += yValue;
                }
            }
        }

        function eachYValue(yValue, i) {
            if (!me.isExcluded(i)) {
                if (yValue > max) {
                    max = yValue;
                }
                if (yValue < min) {
                    min = yValue;
                }
            }
        }

        if (me.getRecordCount() > 0) {
            min = Infinity;
            max = -min;
            me.eachRecord(function(record) {
                if (stacked) {
                    positiveTotal = 0;
                    negativeTotal = 0;
                    me.eachYValue(record, eachYValueStacked);
                    if (positiveTotal > max) {
                        max = positiveTotal;
                    }
                    if (negativeTotal < min) {
                        min = negativeTotal;
                    }
                } else {
                    me.eachYValue(record, eachYValue);
                }
            });
        } else {
            min = max = 0;
        }
        return [min, max];
    },

    onAxesChanged: function () {
        var me = this,
            axes = me.getChart().getAxes(),
            axis = me.getAxis(),
            xAxis, yAxis;

        if (axis.indexOf('top') > -1) {
            xAxis = 'top';
        } else if (axis.indexOf('bottom') > -1) {
            xAxis = 'bottom';
        } else {
            if (axes.get('top')) {
                xAxis = 'top';
            } else if (axes.get('bottom')) {
                xAxis = 'bottom';
            }
        }

        if (axis.indexOf('left') > -1) {
            yAxis = 'left';
        } else if (axis.indexOf('right') > -1) {
            yAxis = 'right';
        } else {
            if (axes.get('left')) {
                yAxis = 'left';
            } else if (axes.get('right')) {
                yAxis = 'right';
            }
        }

        me.boundAxes = {
            xAxis: xAxis,
            yAxis: yAxis
        };
    },

    getAxesForXAndYFields: function() {
        return this.boundAxes;
    }

});

/**
 * Creates a Bar Chart. A Bar Chart is a useful visualization technique to display quantitative information for
 * different categories that can show some progression (or regression) in the dataset. As with all other series, the Bar
 * Series must be appended in the *series* Chart array configuration. See the Chart documentation for more information.
 * A typical configuration object for the bar series could be:
 *
 * {@img Ext.chart.series.Bar/Ext.chart.series.Bar.png Ext.chart.series.Bar chart series}
 *
 *     var store = new Ext.data.JsonStore({
 *         fields: ['name', 'data1', 'data2', 'data3', 'data4', 'data5'],
 *         data: [
 *             {'name':'metric one', 'data1':10, 'data2':12, 'data3':14, 'data4':8, 'data5':13},
 *             {'name':'metric two', 'data1':7, 'data2':8, 'data3':16, 'data4':10, 'data5':3},
 *             {'name':'metric three', 'data1':5, 'data2':2, 'data3':14, 'data4':12, 'data5':7},
 *             {'name':'metric four', 'data1':2, 'data2':14, 'data3':6, 'data4':1, 'data5':23},
 *             {'name':'metric five', 'data1':27, 'data2':38, 'data3':36, 'data4':13, 'data5':33}
 *         ]
 *     });
 *     
 *     new Ext.chart.Chart({
 *         renderTo: Ext.getBody(),
 *         width: 500,
 *         height: 300,
 *         animate: true,
 *         store: store,
 *         axes: [{
 *             type: 'Numeric',
 *             position: 'bottom',
 *             fields: ['data1'],
 *             label: {
 *                 renderer: Ext.util.Format.numberRenderer('0,0')
 *             },
 *             title: 'Sample Values',
 *             grid: true,
 *             minimum: 0
 *         }, {
 *             type: 'Category',
 *             position: 'left',
 *             fields: ['name'],
 *             title: 'Sample Metrics'
 *         }],
 *         series: [{
 *             type: 'bar',
 *             axis: 'bottom',
 *             highlight: true,
 *             tips: {
 *               trackMouse: true,
 *               width: 140,
 *               height: 28,
 *               renderer: function(storeItem, item) {
 *                 this.setTitle(storeItem.get('name') + ': ' + storeItem.get('data1') + ' views');
 *               }
 *             },
 *             label: {
 *               display: 'insideEnd',
 *                 field: 'data1',
 *                 renderer: Ext.util.Format.numberRenderer('0'),
 *                 orientation: 'horizontal',
 *                 color: '#333',
 *                 'text-anchor': 'middle'
 *             },
 *             xField: 'name',
 *             yField: ['data1']
 *         }]
 *     });
 *
 * In this configuration we set `bar` as the series type, bind the values of the bar to the bottom axis and set the
 * xField or category field to the `name` parameter of the store. We also set `highlight` to true which enables smooth
 * animations when bars are hovered. We also set some configuration for the bar labels to be displayed inside the bar,
 * to display the information found in the `data1` property of each element store, to render a formated text with the
 * `Ext.util.Format` we pass in, to have an `horizontal` orientation (as opposed to a vertical one) and we also set
 * other styles like `color`, `text-anchor`, etc.
 */
Ext.define('Ext.chart.series.Bar', {
 
    extend: 'Ext.chart.series.Cartesian',

    type: 'bar',

    /**
     * @private {Boolean} column Whether to set the visualization as column chart or horizontal bar chart.
     */
    column: false,

    config: {

        axis: 'bottom',
        /**
         * @cfg style Style properties that will override the theming series styles.
         */
        style: false,
        /**
         * @cfg {Number} gutter The gutter space between single bars, as a percentage of the bar width
         */
        gutter: 38.2,

        /**
         * @cfg {Number} groupGutter The gutter space between groups of bars, as a percentage of the bar width
         */
        groupGutter: 38.2,

        /**
         * @cfg {Number} xPadding Padding between the left/right axes and the bars
         */
        xPadding: 0,

        /**
         * @cfg {Number} yPadding Padding between the top/bottom axes and the bars
         */
        yPadding: 10,

        highlightCfg : {
            lineWidth: 3,
            stroke: '#55c',
            opacity: 0.8,
            color: '#f00'
        }
    },

    //@private
    //see Label.js
    labelFilterModel: true,

    /**
     * @private
     * @property disjointStacked
     * @type Boolean
     * If set to `true`, then if `stacked:true` the bars will be drawn stacked in terms of their
     * y-values but remain side-by-side in the x-direction, basically a hybrid between stacked and
     * grouped. This is only used internally to support an intermediate animation state when
     * toggling between stacked and grouped (see the ToggleStacked interaction).
     */

    constructor: function(config) {
        this.callParent(arguments);
        
        var me = this,
            surface = me.getSurface();
        
        me.group = surface.getGroup(me.seriesId + '-bars');
        me.initialStacked = me.stacked;
    },

    // @private sets the bar girth.
    getBarGirth: function() {
        var me = this,
            column = me.column,
            ln = me.getRecordCount(),
            gutter = me.getGutter() / 100;
        return (me.getChart().chartBBox[column ? 'width' : 'height'] - (column ? me.getXPadding() : me.getYPadding()) * 2) / (ln * (gutter + 1) - gutter);
    },

    // @private returns the gutters.
    getGutters: function() {
        var me = this,
            column = me.column,
            gutter = Math.ceil((column ? me.getXPadding() : me.getYPadding()) + me.getBarGirth() / 2);
        return column ? [gutter, 0] : [0, gutter];
    },

    // @private Get chart and data boundaries
    getBounds: function() {
        var me = this,
            chart = me.getChart(),
            barsLen = me.getYValueCount(),
            visibleBarsLen = barsLen,
            groupGutter = me.getGroupGutter() / 100,
            column = me.column,
            zoomX = me.zoomX,
            zoomY = me.zoomY,
            xPadding = me.getXPadding() * zoomX,
            yPadding = me.getYPadding() * zoomY,
            stacked = me.stacked,
            disjointStacked = me.disjointStacked,
            barWidth = me.getBarGirth() * (column ? zoomX : zoomY),
            math = Math,
            mmax = math.max,
            mabs = math.abs,
            groupBarWidth, bbox, minY, maxY, axis, out,
            scale, zero, total, j, plus, minus, recordIndex;

        me.setBBox(true);
        bbox = me.bbox;

        //Skip excluded yFields
        for (j = 0, total = barsLen; j < total; j++) {
            if (me.isExcluded(j)) {
                visibleBarsLen--;
            }
        }

        if (me.getAxis()) {
            axis = chart.getAxes().get(me.getAxis());
            if (axis) {
                out = axis.calcEnds();
                minY = out.from;
                maxY = out.to;
            }
        }

        if (me.getYField() && !Ext.isNumber(minY)) {
            axis = new Ext.chart.axis.Numeric({
                chart: chart,
                fields: [].concat(me.getYField())
            });
            out = axis.calcEnds();
            minY = out.from;
            maxY = out.to;
        }

        if (!Ext.isNumber(minY)) {
            minY = 0;
        }
        if (!Ext.isNumber(maxY)) {
            maxY = 0;
        }
        scale = (column ? bbox.height - yPadding * 2 : bbox.width - xPadding * 2) / (maxY - minY);
        groupBarWidth = barWidth / ((stacked && !disjointStacked ? 1 : visibleBarsLen) * (groupGutter + 1) - groupGutter);
        zero = (column) ? bbox.y + bbox.height - yPadding : bbox.x + xPadding;


        function eachYValue(yValue, i) {
            if (!me.isExcluded(i)) {
                total[yValue > 0 ? 1 : 0][recordIndex] += mabs(yValue);
            }
        }

        if (stacked) {
            total = [[], []];
            me.eachRecord(function(record, i) {
                total[0][i] = total[0][i] || 0;
                total[1][i] = total[1][i] || 0;
                recordIndex = i;
                me.eachYValue(record, eachYValue);
            });
            total[+(maxY > 0)].push(mabs(maxY));
            total[+(minY > 0)].push(mabs(minY));
            minus = mmax.apply(math, total[0]);
            plus = mmax.apply(math, total[1]);
            scale = (column ? bbox.height - yPadding * 2 : bbox.width - xPadding * 2) / (plus + minus);
            zero = zero + minus * scale * (column ? -1 : 1);
        }
        else if (minY / maxY < 0) {
            zero = zero - minY * scale * (column ? -1 : 1);
        }
        return {
            bbox: bbox,
            barsLen: barsLen,
            visibleBarsLen: visibleBarsLen,
            barWidth: barWidth,
            groupBarWidth: groupBarWidth,
            scale: scale,
            zero: zero,
            xPadding: xPadding,
            yPadding: yPadding,
            signed: minY / maxY < 0,
            minY: minY,
            maxY: maxY
        };
    },

    // @private Build an array of paths for the chart
    getPaths: function() {
        var me = this,
            chart = me.getChart(),
            bounds = me.bounds = me.getBounds(),
            items = me.items = [],
            gutter = me.getGutter() / 100,
            groupGutter = me.getGroupGutter() / 100,
            animate = chart.getAnimate(),
            column = me.column,
            group = me.group,
            enableShadows = chart.getShadow(),
            shadowGroups = me.shadowGroups,
            shadowGroupsLn = shadowGroups.length,
            bbox = bounds.bbox,
            xPadding = me.getXPadding() * me.zoomX,
            yPadding = me.getYPadding() * me.zoomY,
            stacked = me.stacked,
            disjointStacked = me.disjointStacked,
            barsLen = bounds.barsLen,
            colors = chart.getColorsStyle(),
            colorLength = colors && colors.length || 0,
            math = Math,
            mmax = math.max,
            mabs = math.abs,
            total = me.getRecordCount(),
            height, totalDim, totalNegDim, bottom, top, hasShadow, barAttr, attrs, counter,
            shadowIndex, shadow, sprite, offset, floorY, recordIndex, currentRecord;

        function eachYValue(yValue, i) {
            //create bar object.
            barAttr = {
                fill: colors[(barsLen > 1 ? i : 0) % colorLength]
            };

            // Excluded series
            if (me.isExcluded(i)) {
                height = 0;
                if (!me.stacked) {
                    counter--;
                    barAttr.hidden = true;
                }
            } else {
              height = Math.round(yValue * bounds.scale);
            }

            if (column) {
                Ext.apply(barAttr, {
                    height: height,
                    width: mmax(bounds.groupBarWidth, 0),
                    x: (bbox.x + xPadding + recordIndex * bounds.barWidth * (1 + gutter) + counter * bounds.groupBarWidth * (1 + groupGutter) * (!stacked || disjointStacked ? 1 : 0)),
                    y: bottom - height
                });
            }
            else {
                // draw in reverse order
                offset = (total - 1) - recordIndex;
                Ext.apply(barAttr, {
                    height: mmax(bounds.groupBarWidth, 0),
                    width: height + (bottom == bounds.zero),
                    x: bottom + (bottom != bounds.zero),
                    y: (bbox.y + yPadding + offset * bounds.barWidth * (1 + gutter) + counter * bounds.groupBarWidth * (1 + groupGutter) * (!stacked || disjointStacked ? 1 : 0) + 1)
                });
            }
            if (height < 0) {
                if (column) {
                    barAttr.y = top;
                    barAttr.height = mabs(height);
                } else {
                    barAttr.x = top + height;
                    barAttr.width = mabs(height);
                }
            }
            if (stacked) {
                if (height < 0) {
                    top += height * (column ? -1 : 1);
                } else {
                    bottom += height * (column ? -1 : 1);
                }
                totalDim += mabs(height);
                if (height < 0) {
                    totalNegDim += mabs(height);
                }
            }
            barAttr.x = Math.floor(barAttr.x) + 1;
            floorY = Math.floor(barAttr.y);
            if (!Ext.isIE9 && barAttr.y > floorY) {
                floorY--;
            }
            barAttr.y = floorY;
            barAttr.width = Math.floor(barAttr.width);
            barAttr.height = Math.floor(barAttr.height);
            items.push({
                series: me,
                storeItem: currentRecord,
                value: [currentRecord.get(me.getXField()), yValue],
                attr: barAttr,
                point: column ? [barAttr.x + barAttr.width / 2, yValue >= 0 ? barAttr.y : barAttr.y + barAttr.height] :
                                [yValue >= 0 ? barAttr.x + barAttr.width : barAttr.x, barAttr.y + barAttr.height / 2]
            });
            // When resizing, reset before animating
            if (animate && chart.resizing) {
                attrs = column ? {
                    x: barAttr.x,
                    y: bounds.zero,
                    width: barAttr.width,
                    height: 0
                } : {
                    x: bounds.zero,
                    y: barAttr.y,
                    width: 0,
                    height: barAttr.height
                };
                if (enableShadows && (stacked && !hasShadow || !stacked)) {
                    hasShadow = true;
                    //update shadows
                    for (shadowIndex = 0; shadowIndex < shadowGroupsLn; shadowIndex++) {
                        shadow = shadowGroups[shadowIndex].getAt(stacked ? recordIndex : (recordIndex * barsLen + i));
                        if (shadow) {
                            shadow.setAttributes(attrs, true);
                        }
                    }
                }
                //update sprite position and width/height
                sprite = group.getAt(recordIndex * barsLen + i);
                if (sprite) {
                    sprite.setAttributes(attrs, true);
                }
            }
            counter++;
        }

        me.eachRecord(function(record, i) {
            bottom = top = bounds.zero;
            totalDim = 0;
            totalNegDim = 0;
            hasShadow = false;
            counter = 0;
            currentRecord = record;
            recordIndex = i;
            me.eachYValue(record, eachYValue);
            if (stacked && items.length) {
                items[i * counter].totalDim = totalDim;
                items[i * counter].totalNegDim = totalNegDim;
            }
        }, me);
    },

    // @private render/setAttributes on the shadows
    renderShadows: function(i, barAttr, baseAttrs, bounds) {
        var me = this,
            chart = me.getChart(),
            surface = me.getSurface(),
            animate = chart.getAnimate(),
            stacked = me.stacked,
            shadowGroups = me.shadowGroups,
            shadowAttributes = me.getShadowAttributes(),
            shadowGroupsLn = shadowGroups.length,
            store = chart.substore || chart.getStore(),
            column = me.column,
            items = me.items,
            shadows = [],
            zero = bounds.zero,
            shadowIndex, shadowBarAttr, shadow, totalDim, totalNegDim, j, rendererAttributes;

        if ((stacked && (i % bounds.visibleBarsLen === 0)) || !stacked) {
            j = i / bounds.visibleBarsLen;
            //create shadows
            for (shadowIndex = 0; shadowIndex < shadowGroupsLn; shadowIndex++) {
                shadowBarAttr = Ext.apply({}, shadowAttributes[shadowIndex]);
                shadow = shadowGroups[shadowIndex].getAt(stacked ? j : i);
                shadowBarAttr.x = barAttr.x;
                shadowBarAttr.y = barAttr.y;
                shadowBarAttr.width = barAttr.width;
                shadowBarAttr.height = barAttr.height;
                if (!shadow) {
                    shadow = surface.add(Ext.apply({
                        type: 'rect',
                        group: shadowGroups[shadowIndex]
                    }, Ext.apply({}, baseAttrs, shadowBarAttr)));
                }
                if (stacked) {
                    totalDim = items[i].totalDim;
                    totalNegDim = items[i].totalNegDim;
                    if (column) {
                        shadowBarAttr.y = zero - totalNegDim;
                        shadowBarAttr.height = totalDim;
                    }
                    else {
                        shadowBarAttr.x = zero - totalNegDim;
                        shadowBarAttr.width = totalDim;
                    }
                }
                if (animate) {
                    if (!stacked) {
                        rendererAttributes = me.getRenderer()(shadow, store.getAt(j), shadowBarAttr, i, store);
                        me.onAnimate(shadow, { to: rendererAttributes });
                    }
                    else {
                        rendererAttributes = me.getRenderer()(shadow, store.getAt(j), Ext.apply(shadowBarAttr, { hidden: true }), i, store);
                        shadow.setAttributes(rendererAttributes, true);
                    }
                }
                else {
                    rendererAttributes = me.getRenderer()(shadow, store.getAt(j), Ext.apply(shadowBarAttr, { hidden: false }), i, store);
                    shadow.setAttributes(rendererAttributes, true);
                }
                shadows.push(shadow);
            }
        }
        return shadows;
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
            stacked = me.stacked,
            column = me.column,
            enableShadows = chart.getShadow(),
            shadowGroups = me.shadowGroups,
            shadowGroupsLn = shadowGroups.length,
            group = me.group,
            seriesStyle = me.getStyle(),
            items, ln, i, j, baseAttrs, sprite, rendererAttributes, shadowIndex, shadowGroup,
            bounds, endSeriesStyle, barAttr, attrs, anim, item;

        if (me.fireEvent('beforedraw', me) === false) {
            return;
        }

        Ext.chart.series.Bar.superclass.drawSeries.call(this);

        if (!me.getRecordCount()) {
            surface.getItems().hide(true);
            return;
        }

        //fill colors are taken from the colors array.
        delete seriesStyle.fill;
        me.unHighlightItem();
        me.cleanHighlights();

        me.getPaths();
        bounds = me.bounds;
        items = me.items;

        baseAttrs = column ? {
            y: bounds.zero,
            height: 0
        } : {
            x: bounds.zero,
            width: 0
        };
        ln = items.length;
        // Create new or reuse sprites and animate/display
        for (i = 0; i < ln; i++) {
            item = items[i];
            sprite = group.getAt(i);
            barAttr = item.attr;

            if (enableShadows) {
                item.shadows = me.renderShadows(i, barAttr, baseAttrs, bounds);
            }

            // Create a new sprite if needed (no height)
            if (!sprite) {
                attrs = Ext.apply({}, baseAttrs, barAttr);
                attrs = Ext.apply(attrs, endSeriesStyle || {});
                if (enableShadows) {
                    Ext.apply(attrs, me.getShadowOptions());
                }
                sprite = surface.add(Ext.apply({}, {
                    type: 'rect',
                    group: group
                }, attrs));
            }

            if (!item.attr.hidden) {
                if (animate) {
                    rendererAttributes = me.getRenderer()(sprite, store.getAt(i), barAttr, i, store);
                    anim = me.onAnimate(sprite, { to: Ext.apply(rendererAttributes, endSeriesStyle) });
                    if (enableShadows && stacked && (i % bounds.barsLen === 0)) {
                        j = i / bounds.barsLen;
                        for (shadowIndex = 0; shadowIndex < shadowGroupsLn; shadowIndex++) {
                            anim.on('afteranimate', function() {
                                this.show(true);
                            }, shadowGroups[shadowIndex].getAt(j));
                        }
                    }
                }
                else {
                    rendererAttributes = me.getRenderer()(sprite, store.getAt(i), Ext.apply(barAttr, { hidden: false }), i, store);
                    sprite.setAttributes(Ext.apply(rendererAttributes, endSeriesStyle), true);
                }
            } else {
                sprite.hide(true);
            }

            item.sprite = sprite;
        }

        // Hide unused sprites
        ln = group.getCount();
        for (j = i; j < ln; j++) {
            group.getAt(j).hide(true);
        }
        // Hide unused shadows
        if (enableShadows) {
            for (shadowIndex = 0; shadowIndex < shadowGroupsLn; shadowIndex++) {
                shadowGroup = shadowGroups[shadowIndex];
                ln = shadowGroup.getCount();
                for (j = i; j < ln; j++) {
                    shadowGroup.getAt(j).hide(true);
                }
            }
        }
        me.renderLabels();
        me.fireEvent('draw', me);
    },

    // @private handled when creating a label.
    onCreateLabel: function(storeItem, item, i, display) {
        var me = this,
            surface = me.getSurface(),
            group = me.labelsGroup,
            config = me.label,
            endLabelStyle = Ext.apply({}, config, me.labelStyle.style || {}),
            sprite;

        return surface.add(Ext.apply({
            type: 'text',
            group: group
        }, endLabelStyle || {}));
    },

    // @private callback used when placing a label.
    onPlaceLabel: function(label, storeItem, item, i, display, animate, j, index) {
        // Determine the label's final position. Starts with the configured preferred value but
        // may get flipped from inside to outside or vice-versa depending on space.
        var me = this,
            opt = me.bounds,
            groupBarWidth = opt.groupBarWidth,
            column = me.column,
            chart = me.getChart(),
            chartBBox = chart.chartBBox,
            resizing = chart.resizing,
            xValue = item.value[0],
            yValue = item.value[1],
            attr = item.attr,
            config = Ext.apply(me.labelStyle.style || {},  me.label || {}),
            rotate = config.orientation == 'vertical',
            field = [].concat(config.field),
            format = config.renderer,
            text = format(storeItem.get(field[index])),
            size = me.getLabelSize(text),
            width = size.width,
            height = size.height,
            zero = opt.zero,
            outside = 'outside',
            insideStart = 'insideStart',
            insideEnd = 'insideEnd',
            offsetX = 10,
            offsetY = 6,
            signed = opt.signed,
            x, y, finalAttr;

        label.setAttributes({
            text: text
        }, true);

        label.isOutside = false;
        if (column) {
            if (display == outside) {
                if (height + offsetY + attr.height > (yValue >= 0 ? zero: chartBBox.height - zero)) {
                    display = insideEnd;
                }
            } else {
                if (height + offsetY > attr.height) {
                    display = outside;
                    label.isOutside = true;
                }
            }
            x = attr.x + groupBarWidth / 2;
            y = display == insideStart ?
                    (zero + ((height / 2 + 3) * (yValue >= 0 ? -1 : 1))) :
                    (yValue >= 0 ? (attr.y + ((height / 2 + 3) * (display == outside ? -1 : 1))) :
                                   (attr.y + attr.height + ((height / 2 + 3) * (display === outside ? 1 : -1))));
        }
        else {
            if (display == outside) {
                if (width + offsetX + attr.width > (yValue >= 0 ? chartBBox.width - zero : zero)) {
                    display = insideEnd;
                }
            }
            else {
                if (width + offsetX > attr.width) {
                    display = outside;
                    label.isOutside = true;
                }
            }
            x = display == insideStart ?
                (zero + ((width / 2 + 5) * (yValue >= 0 ? 1 : -1))) :
                (yValue >= 0 ? (attr.x + attr.width + ((width / 2 + 5) * (display === outside ? 1 : -1))) :
                (attr.x + ((width / 2 + 5) * (display === outside ? -1 : 1))));
            y = attr.y + groupBarWidth / 2;
        }
        //set position
        finalAttr = {
            x: x,
            y: y
        };
        //rotate
        if (rotate) {
            finalAttr.rotate = {
                x: x,
                y: y,
                degrees: 270
            };
        }
        //check for resizing
        if (animate && resizing) {
            if (column) {
                x = attr.x + attr.width / 2;
                y = zero;
            } else {
                x = zero;
                y = attr.y + attr.height / 2;
            }
            label.setAttributes({
                x: x,
                y: y
            }, true);
            if (rotate) {
                label.setAttributes({
                    rotate: {
                        x: x,
                        y: y,
                        degrees: 270
                    }
                }, true);
            }
        }
        //handle animation
        if (animate) {
            me.onAnimate(label, { to: finalAttr });
        }
        else {
            label.setAttributes(Ext.apply(finalAttr, {
                hidden: false
            }), true);
        }
    },

    /* @private
     * Gets the dimensions of a given bar label. Uses a single hidden sprite to avoid
     * changing visible sprites.
     * @param value
     */
    getLabelSize: function(value) {
        var tester = this.testerLabel,
            config = this.label,
            endLabelStyle = Ext.apply({}, config, this.labelStyle.style || {}),
            rotated = config.orientation === 'vertical',
            bbox, w, h,
            undef;
        if (!tester) {
            tester = this.testerLabel = this.getSurface().add(Ext.apply({
                type: 'text',
                opacity: 0
            }, endLabelStyle));
        }
        tester.setAttributes({
            text: value
        }, true);

        // Flip the width/height if rotated, as getBBox returns the pre-rotated dimensions
        bbox = tester.getBBox();
        w = bbox.width;
        h = bbox.height;
        return {
            width: rotated ? h : w,
            height: rotated ? w : h
        };
    },

    // @private used to animate label, markers and other sprites.
    onAnimate: function(sprite, attr) {
        sprite.show();
        Ext.chart.series.Bar.superclass.onAnimate.apply(this, arguments);
    },
    
    isItemInPoint: function(x, y, item) {
        var bbox = item.sprite.getBBox();
        return bbox.x <= x && bbox.y <= y
            && (bbox.x + bbox.width) >= x
            && (bbox.y + bbox.height) >= y;
    },

    //@private used by Label.js
    itemHidden: function(item) {
        return !item || item.attr.hidden || (item.attr.width <= 1)|| (item.attr.height <= 1);
    },



    /**
     * Returns the color of the series (to be displayed as color for the series legend item).
     * @param item {Object} Info about the item; same format as returned by #getItemForPoint
     */
    getLegendColor: function(index) {
        var me = this,
            colors = me.getChart().getColorsStyle();
        return me.getColorFromStyle(colors[index % colors.length]);
    },

    highlightItem: function(item) {
        this.callParent(arguments);
        this.renderLabels();
    },

    unHighlightItem: function() {
        this.callParent(arguments);
        this.renderLabels();
    },

    cleanHighlights: function() {
        this.callParent(arguments);
        this.renderLabels();
    },

    reset: function() {
        var me = this;
        me.stacked = me.initialStacked;
        Ext.chart.series.Bar.superclass.reset.call(me);
    }
});

/**
 * @class Ext.chart.series.Column
 * @extends Ext.chart.series.Bar
 * 
 * Creates a Column Chart. Much of the methods are inherited from Bar. A Column Chart is a useful visualization technique to display quantitative information for different 
 * categories that can show some progression (or regression) in the data set.
 * As with all other series, the Column Series must be appended in the *series* Chart array configuration. See the Chart 
 * documentation for more information. A typical configuration object for the column series could be:
 *
 * {@img Ext.chart.series.Column/Ext.chart.series.Column.png Ext.chart.series.Column chart series}
 *
 * ## Example
 * 
 *     var store = new Ext.data.JsonStore({
 *         fields: ['name', 'data1', 'data2', 'data3', 'data4', 'data5'],
 *         data: [
 *             {'name':'metric one', 'data1':10, 'data2':12, 'data3':14, 'data4':8, 'data5':13},
 *             {'name':'metric two', 'data1':7, 'data2':8, 'data3':16, 'data4':10, 'data5':3},
 *             {'name':'metric three', 'data1':5, 'data2':2, 'data3':14, 'data4':12, 'data5':7},
 *             {'name':'metric four', 'data1':2, 'data2':14, 'data3':6, 'data4':1, 'data5':23},
 *             {'name':'metric five', 'data1':27, 'data2':38, 'data3':36, 'data4':13, 'data5':33}
 *         ]
 *     });
 *     
 *     new Ext.chart.Chart({
 *         renderTo: Ext.getBody(),
 *         width: 500,
 *         height: 300,
 *         animate: true,
 *         store: store,
 *         axes: [{
 *             type: 'Numeric',
 *             position: 'bottom',
 *             fields: ['data1'],
 *             label: {
 *                 renderer: Ext.util.Format.numberRenderer('0,0')
 *             },
 *             title: 'Sample Values',
 *             grid: true,
 *             minimum: 0
 *         }, {
 *             type: 'Category',
 *             position: 'left',
 *             fields: ['name'],
 *             title: 'Sample Metrics'
 *         }],
 *             axes: [{
 *                 type: 'Numeric',
 *                 position: 'left',
 *                 fields: ['data1'],
 *                 label: {
 *                     renderer: Ext.util.Format.numberRenderer('0,0')
 *                 },
 *                 title: 'Sample Values',
 *                 grid: true,
 *                 minimum: 0
 *             }, {
 *                 type: 'Category',
 *                 position: 'bottom',
 *                 fields: ['name'],
 *                 title: 'Sample Metrics'
 *             }],
 *             series: [{
 *                 type: 'column',
 *                 axis: 'left',
 *                 highlight: true,
 *                 tips: {
 *                   trackMouse: true,
 *                   width: 140,
 *                   height: 28,
 *                   renderer: function(storeItem, item) {
 *                     this.setTitle(storeItem.get('name') + ': ' + storeItem.get('data1') + ' $');
 *                   }
 *                 },
 *                 label: {
 *                   display: 'insideEnd',
 *                   'text-anchor': 'middle',
 *                     field: 'data1',
 *                     renderer: Ext.util.Format.numberRenderer('0'),
 *                     orientation: 'vertical',
 *                     color: '#333'
 *                 },
 *                 xField: 'name',
 *                 yField: 'data1'
 *             }]
 *     });
 *  
 * In this configuration we set `column` as the series type, bind the values of the bars to the bottom axis, set `highlight` to true so that bars are smoothly highlighted
 * when hovered and bind the `xField` or category field to the data store `name` property and the `yField` as the data1 property of a store element. 
 */
Ext.define('Ext.chart.series.Column', { 
 
    extend: 'Ext.chart.series.Bar',

    type: 'column',
    /**
     * @private
     */
    column: true,
    
    config: {

        axis: 'left',

        /**
         * @cfg {Number} xPadding
         * Padding between the left/right axes and the bars
         */
        xPadding: 10,

        /**
         * @cfg {Number} yPadding
         * Padding between the top/bottom axes and the bars
         */
        yPadding: 0
    }
});

/**
 * @class Ext.chart.series.Gauge
 * @extends Ext.chart.series.Series
 *
 * Creates a Gauge Chart. Gauge Charts are used to show progress in a certain variable. There are two ways of using the Gauge chart.
 * One is setting a store element into the Gauge and selecting the field to be used from that store. Another one is instanciating the
 * visualization and using the `setValue` method to adjust the value you want.
 *
 * A chart/series configuration for the Gauge visualization could look like this:
 *
 *     {
 *         xtype: 'chart',
 *         store: store,
 *         axes: [{
 *             type: 'gauge',
 *             position: 'gauge',
 *             minimum: 0,
 *             maximum: 100,
 *             steps: 10,
 *             margin: -10
 *         }],
 *         series: [{
 *             type: 'gauge',
 *             angleField: 'data1',
 *             donut: false,
 *             colorSet: ['#F49D10', '#ddd']
 *         }]
 *     }
 *
 * In this configuration we create a special Gauge axis to be used with the gauge visualization (describing half-circle markers), and also we're
 * setting a maximum, minimum and steps configuration options into the axis. The Gauge series configuration contains the store field to be bound to
 * the visual display and the color set to be used with the visualization.
 *
 * @xtype gauge
 */
Ext.define('Ext.chart.series.Gauge', {

    extend: 'Ext.chart.series.Series',

    type: "gauge",

    rad: Math.PI / 180,

    config: {
        /**
         * @cfg {String} angleField
         * The store record field name to be used for the gauge angles.
         * The values bound to this field name must be positive real numbers.
         * This parameter is required.
         */
        angleField: false,


        /**
         * @cfg {Boolean} needle
         * Use the Gauge Series as an area series or add a needle to it. Default's false.
         */
        needle: false,

        /**
         * @cfg {Boolean/Number} donut
         * Use the entire disk or just a fraction of it for the gauge. Default's false.
         */
        donut: false,

        /**
         * @cfg {Boolean} showInLegend
         * Whether to add the gauge chart elements as legend items. Default's false.
         */
        showInLegend: false,

        /**
         * @cfg {Object} style
         * An object containing styles for overriding series styles from Theming.
         */

        minimum: 0,
        
        maximum: 100,

        colorSet: []
    },

    constructor: function(config) {
        if (!config.angleField && config.field) {
            console.warn('use angleField instead');
            config.angleField = config.field;
        }

        this.callParent(arguments);
        
        var me = this,
            chart = me.getChart(),
            surface = me.getSurface();
        
        surface.addCustomAttribute("segment", function(opt) {
            return me.getSegment(opt);
        });
    },

    //@private updates some onbefore render parameters.
    initialize: function() {
        var me = this;
        me.callParent();
    },

    // @private returns an object with properties for a PieSlice.
    getSegment: function(opt) {
        var me = this,
            rad = me.rad,
            cos = Math.cos,
            sin = Math.sin,
            abs = Math.abs,
            x = me.centerX,
            y = me.centerY,
            x1 = 0, x2 = 0, x3 = 0, x4 = 0,
            y1 = 0, y2 = 0, y3 = 0, y4 = 0,
            delta = 1e-2,
            startAngle = opt.startAngle,
            endAngle = opt.endAngle,
            midAngle = (startAngle + endAngle) / 2 * rad,
            margin = opt.margin || 0,
            flag = abs(endAngle - startAngle) > 180,
            auxValue = abs(endAngle % 360),
            flag2 = auxValue > 90  && auxValue < 270,
            a1 = Math.min(startAngle, endAngle) * rad,
            a2 = Math.max(startAngle, endAngle) * rad,
            singleSlice = false,
            fullCircle = false;

        x += margin * cos(midAngle);
        y += margin * sin(midAngle);

        x1 = x + opt.startRho * cos(a1);
        y1 = y + opt.startRho * sin(a1);

        x2 = x + opt.endRho * cos(a1);
        y2 = y + opt.endRho * sin(a1);

        x3 = x + opt.startRho * cos(a2);
        y3 = y + opt.startRho * sin(a2);

        x4 = x + opt.endRho * cos(a2);
        y4 = y + opt.endRho * sin(a2);

        if (abs(x1 - x3) <= delta && abs(y1 - y3) <= delta) {
            singleSlice = true;
        }

        fullCircle = singleSlice && (abs(x2 - x4) <= delta && abs(y2 - y4) <= delta);
        //Solves mysterious clipping bug with IE
        if (fullCircle) {
            return {
                path: [
                ["M", x4, y4 - 1e-4],
                ["A", opt.endRho, opt.endRho, 0, +flag, +flag2, x4, y4],
                ["Z"]]
            };
        } else if (singleSlice) {
            return {
                path: [
                ["M", x1, y1],
                ["L", x2, y2],
                ["A", opt.endRho, opt.endRho, 0, +flag, 1, x4, y4],
                ["Z"]]
            };
        } else {
            return {
                path: [
                ["M", x1, y1],
                ["L", x2, y2],
                ["A", opt.endRho, opt.endRho, 0, +flag, 1, x4, y4],
                ["M", x4, y4],
                ["L", x3, y3],
                ["A", opt.startRho, opt.startRho, 0, +flag, 0, x1, y1],
                ["Z"]]
            };
        }
    },

    // @private utility function to calculate the middle point of a pie slice.
    calcMiddle: function(item) {
        var me = this,
            rad = me.rad,
            slice = item.slice,
            x = me.centerX,
            y = me.centerY,
            startAngle = slice.startAngle,
            endAngle = slice.endAngle,
            a1 = Math.min(startAngle, endAngle) * rad,
            a2 = Math.max(startAngle, endAngle) * rad,
            midAngle = -(a1 + (a2 - a1) / 2),
            xm = x + (item.endRho + item.startRho) / 2 * Math.cos(midAngle),
            ym = y - (item.endRho + item.startRho) / 2 * Math.sin(midAngle);

        item.middle = {
            x: xm,
            y: ym
        };
    },

    /**
     * Draws the series for the current chart.
     */
    drawSeries: function() {
        var me = this,
            chart = me.getChart(),
            store = chart.substore || chart.getStore(),
            group = me.group,
            animate = me.getChart().getAnimate(),
            axis = me.getChart().getAxes().get(0),
            minimum = axis && axis.getMinimum() || me.getMinimum() || 0,
            maximum = axis && axis.getMaximum() || me.getMaximum() || 0,
            field = me.getAngleField() || me.field,
            surface = me.getSurface(),
            chartBBox = chart.chartBBox,
            donut = +me.getDonut(),
            items = [],
            seriesStyle = me.style,
            colors = chart.getColorsStyle(),
            colorArrayLength = colors && colors.length || 0,
            cos = Math.cos,
            sin = Math.sin,
            enableShadows = !!chart.getShadow(),
            rendererAttributes, centerX, centerY, slice, slices, sprite, value,
            item, ln, record, i, path,
            p, spriteOptions, bbox, splitAngle, sliceA, sliceB;

        if (me.fireEvent('beforedraw', me) === false) {
            return;
        }

        Ext.chart.series.Gauge.superclass.drawSeries.call(this);

        me.setBBox();
        bbox = me.bbox;

        //override theme colors
        if (me.getColorSet()) {
            colors = me.getColorSet();
            colorArrayLength = colors.length;
        }

        //if not store or store is empty then there's nothing to draw
        if (!me.getRecordCount()) {
            surface.getItems().hide(true);
            return;
        }

        centerX = me.centerX = (chartBBox.width / 2);
        centerY = me.centerY = chartBBox.height;
        me.radius = Math.min(centerX, centerY);
        me.slices = slices = [];
        me.items = items = [];

        if (!me.value) {
            record = store.getAt(0);
            me.value = record.get(field);
        }

        value = me.value;
        if (me.getNeedle()) {
            sliceA = {
                series: me,
                value: value,
                startAngle: -180,
                endAngle: 0,
                rho: me.radius
            };
            splitAngle = -180 * (1 - (value - minimum) / (maximum - minimum));
            slices.push(sliceA);
        } else {
            splitAngle = -180 * (1 - (value - minimum) / (maximum - minimum));
            sliceA = {
                series: me,
                value: value,
                startAngle: -180,
                endAngle: splitAngle,
                rho: me.radius
            };
            sliceB = {
                series: me,
                value: me.maximum - value,
                startAngle: splitAngle,
                endAngle: 0,
                rho: me.radius
            };
            slices.push(sliceA, sliceB);
        }

        //do pie slices after.
        for (i = 0, ln = slices.length; i < ln; i++) {
            slice = slices[i];
            sprite = group.getAt(i);
            //set pie slice properties
            rendererAttributes = Ext.apply({
                segment: {
                    startAngle: slice.startAngle,
                    endAngle: slice.endAngle,
                    margin: 0,
                    rho: slice.rho,
                    startRho: slice.rho * +donut / 100,
                    endRho: slice.rho
                }
            }, Ext.apply(seriesStyle, colors && { fill: colors[i % colorArrayLength] } || {}));

            item = Ext.apply({},
            rendererAttributes.segment, {
                slice: slice,
                series: me,
                storeItem: record,
                index: i
            });
            items[i] = item;
            // Create a new sprite if needed (no height)
            if (!sprite) {
                spriteOptions = Ext.apply({
                    type: "path",
                    group: group
                }, Ext.apply(seriesStyle, colors && { fill: colors[i % colorArrayLength] } || {}));

                if (enableShadows) {
                    Ext.apply(spriteOptions, me.getShadowOptions());
                }

                sprite = surface.add(Ext.apply(spriteOptions, rendererAttributes));
            }
            slice.sprite = slice.sprite || [];
            item.sprite = sprite;
            slice.sprite.push(sprite);

            if (animate) {
                rendererAttributes = me.getRenderer()(sprite, record, rendererAttributes, i, store);
                sprite._to = rendererAttributes;
                me.onAnimate(sprite, {
                    to: rendererAttributes
                });
            } else {
                rendererAttributes = me.getRenderer()(sprite, record, Ext.apply(rendererAttributes, {
                    hidden: false
                }), i, store);
                sprite.setAttributes(rendererAttributes, true);
            }
        }

        if (me.getNeedle()) {
            splitAngle = splitAngle * Math.PI / 180;

            if (!me.needleSprite) {
                me.needleSprite = me.getSurface().add({
                    type: 'path',
                    path: ['M', centerX + (me.radius * +donut / 100) * cos(splitAngle),
                                centerY + -Math.abs((me.radius * +donut / 100) * sin(splitAngle)),
                           'L', centerX + me.radius * cos(splitAngle),
                                centerY + -Math.abs(me.radius * sin(splitAngle))],
                    'stroke-width': 4,
                    'stroke': '#222'
                });
            } else {
                if (animate) {
                    me.onAnimate(me.needleSprite, {
                        to: {
                        path: ['M', centerX + (me.radius * +donut / 100) * cos(splitAngle),
                                    centerY + -Math.abs((me.radius * +donut / 100) * sin(splitAngle)),
                               'L', centerX + me.radius * cos(splitAngle),
                                    centerY + -Math.abs(me.radius * sin(splitAngle))]
                        }
                    });
                } else {
                    me.needleSprite.setAttributes({
                        type: 'path',
                        path: ['M', centerX + (me.radius * +donut / 100) * cos(splitAngle),
                                    centerY + -Math.abs((me.radius * +donut / 100) * sin(splitAngle)),
                               'L', centerX + me.radius * cos(splitAngle),
                                    centerY + -Math.abs(me.radius * sin(splitAngle))]
                    });
                }
            }
            me.needleSprite.setAttributes({
                hidden: false
            }, true);
        }

        delete me.value;

        me.fireEvent('draw', me);
    },

    /**
     * Sets the Gauge chart to the current specified value.
    */
    setValue: function (value) {
        this.value = value;
        this.drawSeries();
    },

    // @private callback for when creating a label sprite.
    onCreateLabel: Ext.emptyFn,

    // @private callback for when placing a label sprite.
    onPlaceLabel: Ext.emptyFn,

    // @private callback for when placing a callout.
    onPlaceCallout: Ext.emptyFn,

    // @private handles sprite animation for the series.
    onAnimate: function(sprite, attr) {
        sprite.show();
        Ext.chart.series.Gauge.superclass.onAnimate.apply(this, arguments);
    },

    isItemInPoint: function() {
        return false;
    },

    // @private shows all elements in the series.
    showAll: function() {
        if (!isNaN(this._index)) {
            this.getExcludes()[this._index] = false;
            this.drawSeries();
        }
    },

    /**
     * Returns the color of the series (to be displayed as color for the series legend item).
     * @param index {Number} Info about the item; same format as returned by #getItemForPoint
     */
    getLegendColor: function(index) {
        var me = this,
            colors = me.getChart().getColorsStyle();
        return me.getColorFromStyle(colors[index % colors.length]);
    }
});


/**
 * @class Ext.chart.series.Line
 * @extends Ext.chart.series.Cartesian
 *
 * Creates a Line Chart. A Line Chart is a useful visualization technique to display quantitative information for different
 * categories or other real values (as opposed to the bar chart), that can show some progression (or regression) in the dataset.
 * As with all other series, the Line Series must be appended in the *series* Chart array configuration. See the Chart
 * documentation for more information. A typical configuration object for the line series could be:
 *
 * {@img Ext.chart.series.Line/Ext.chart.series.Line.png Ext.chart.series.Line chart series}
 *
 *     var store = new Ext.data.JsonStore({
 *         fields: ['name', 'data1', 'data2', 'data3', 'data4', 'data5'],
 *         data: [
 *             {'name':'metric one', 'data1':10, 'data2':12, 'data3':14, 'data4':8, 'data5':13},
 *             {'name':'metric two', 'data1':7, 'data2':8, 'data3':16, 'data4':10, 'data5':3},
 *             {'name':'metric three', 'data1':5, 'data2':2, 'data3':14, 'data4':12, 'data5':7},
 *             {'name':'metric four', 'data1':2, 'data2':14, 'data3':6, 'data4':1, 'data5':23},
 *             {'name':'metric five', 'data1':27, 'data2':38, 'data3':36, 'data4':13, 'data5':33}
 *         ]
 *     });
 *
 *     new Ext.chart.Chart({
 *         renderTo: Ext.getBody(),
 *         width: 500,
 *         height: 300,
 *         animate: true,
 *         store: store,
 *         axes: [{
 *             type: 'Numeric',
 *             position: 'bottom',
 *             fields: ['data1'],
 *             label: {
 *                 renderer: Ext.util.Format.numberRenderer('0,0')
 *             },
 *             title: 'Sample Values',
 *             grid: true,
 *             minimum: 0
 *         }, {
 *             type: 'Category',
 *             position: 'left',
 *             fields: ['name'],
 *             title: 'Sample Metrics'
 *         }],
 *         series: [{
 *             type: 'line',
 *             highlight: {
 *                 size: 7,
 *                 radius: 7
 *             },
 *             axis: 'left',
 *             xField: 'name',
 *             yField: 'data1',
 *             markerConfig: {
 *                 type: 'cross',
 *                 size: 4,
 *                 radius: 4,
 *                 'stroke-width': 0
 *             }
 *         }, {
 *             type: 'line',
 *             highlight: {
 *                 size: 7,
 *                 radius: 7
 *             },
 *             axis: 'left',
 *             fill: true,
 *             xField: 'name',
 *             yField: 'data3',
 *             markerConfig: {
 *                 type: 'circle',
 *                 size: 4,
 *                 radius: 4,
 *                 'stroke-width': 0
 *             }
 *         }]
 *     });
 *
 * In this configuration we're adding two series (or lines), one bound to the `data1`
 * property of the store and the other to `data3`. The type for both configurations is
 * `line`. The `xField` for both series is the same, the name propert of the store.
 * Both line series share the same axis, the left axis. You can set particular marker
 * configuration by adding properties onto the markerConfig object. Both series have
 * an object as highlight so that markers animate smoothly to the properties in highlight
 * when hovered. The second series has `fill=true` which means that the line will also
 * have an area below it of the same color.
 *
 * **Note:** In the series definition remember to explicitly set the axis to bind the
 * values of the line series to. This can be done by using the `axis` configuration property.
 */
Ext.define('Ext.chart.series.Line', { 
 
    extend: 'Ext.chart.series.Cartesian',

    uses: [
        'Ext.chart.Shape'
    ],

    type: 'line',

    config: {
        /**
         * @cfg {Number} selectionTolerance
         * The offset distance from the cursor position to the line series to trigger events (then used for highlighting series, etc).
         */
        selectionTolerance: 20,

        /**
         * @cfg {Boolean} showMarkers
         * Whether markers should be displayed at the data points along the line. If true,
         * then the {@link #markerConfig} config item will determine the markers' styling.
         */
        showMarkers: true,

        /**
         * @cfg {Object} markerConfig
         * The display style for the markers. Only used if {@link #showMarkers} is true.
         * The markerConfig is a configuration object containing the same set of properties defined in
         * the Sprite class. For example, if we were to set red circles as markers to the line series we could
         * pass the object:
         *
         <pre><code>
            markerConfig: {
                type: 'circle',
                radius: 4,
                'fill': '#f00'
            }
         </code></pre>

         */
        markerConfig: {
            zIndex : 40
        },

        /**
         * @cfg {Object} style
         * An object containing styles for the visualization lines. These styles will override the theme styles.
         * Some options contained within the style object will are described next.
         */

        /**
         * @cfg {Boolean/Number} smooth
         * If set to `true` or a non-zero number, the line will be smoothed/rounded around its points; otherwise
         * straight line segments will be drawn.
         *
         * A numeric value is interpreted as a divisor of the horizontal distance between consecutive points in
         * the line; larger numbers result in sharper curves while smaller numbers result in smoother curves.
         *
         * If set to `true` then a default numeric value of 3 will be used.
         */
        smooth: false,


        /**
         * @cfg {Boolean} fill
         * If true, the area below the line will be filled using either the styles defined with sass or
         * {@link #style.fill} and {@link #style.opacity} config properties from {@link style}.
         */
        fill: false
    },

    /**
     * @private Default numeric smoothing value to be used when {@link #smooth} = true.
     */
    defaultSmoothness: 3,

    /**
     * @private Size of the buffer area on either side of the viewport to provide seamless zoom/pan
     * transforms. Expressed as a multiple of the viewport length, e.g. 1 will make the buffer on
     * each side equal to the length of the visible axis viewport.
     */
    overflowBuffer: 1,

    constructor: function(config) {
        this.callParent(arguments);
        var me = this,
            surface = me.getSurface();

        if (me.getShowMarkers()) {
            me.markerGroup = surface.getGroup(me.seriesId + '-markers');
        }
    },

    // @private makes an average of points when there are more data points than pixels to be rendered.
    shrink: function(xValues, yValues, size) {
        // Start at the 2nd point...
        var len = xValues.length,
            ratio = Math.floor(len / size),
            i = 1,
            xSum = 0,
            ySum = 0,
            xRes = [xValues[0]],
            yRes = [yValues[0]];

        for (; i < len; ++i) {
            xSum += xValues[i] || 0;
            ySum += yValues[i] || 0;
            if (i % ratio == 0) {
                xRes.push(xSum/ratio);
                yRes.push(ySum/ratio);
                xSum = 0;
                ySum = 0;
            }
        }
        return {
            x: xRes,
            y: yRes
        };
    },

    /**
     * Draws the series for the current chart.
     */
    drawSeries: function() {
        var me = this,
            chart = me.getChart(),
            chartAxes = chart.getAxes(),
            axisPosition,
            store = chart.substore || chart.getStore(),
            storeCount = me.getRecordCount(),
            bufferWidth = chart.chartBBox.width * me.overflowBuffer,
            surface = me.getSurface(),
            bbox = {},
            group = me.group,
            showMarkers = me.getShowMarkers(),
            markerGroup = me.markerGroup,
            enableShadows = chart.getShadow(),
            shadowGroups = me.shadowGroups,
            shadowAttributes = me.getShadowAttributes(),
            smooth = me.getSmooth(),
            lnsh = shadowGroups.length,
            dummyPath = ["M"],
            path = ["M"],
            markerIndex = chart.markerIndex,
            shadowBarAttr,
            xValues = [],
            xValueMap = {},
            yValues = [],
            yValueMap = {},
            onbreak = false,
            markerStyle = me.markerStyle.style,
            seriesStyle = me.style,
            colors = chart.getColorsStyle(),
            colorArrayLength = colors && colors.length || 0,
            isNumber = Ext.isNumber,
            seriesIdx = me.seriesIdx, 
            boundAxes = me.getAxesForXAndYFields(),
            boundXAxis = boundAxes.xAxis,
            boundYAxis = boundAxes.yAxis,
            shadows, shadow, shindex, fromPath, fill, fillPath, rendererAttributes,
            x, y, prevX, prevY, firstX, firstY, markerCount, i, j, ln, axis, ends, marker, markerAux, item, xValue,
            yValue, coords, xScale, yScale, minX, maxX, minY, maxY, line, animation, endMarkerStyle,
            endLineStyle, type, count, bufferMinX, bufferMaxX;

        if (me.fireEvent('beforedraw', me) === false) {
            return;
        }

        me.callParent(arguments);

        //if store is empty or the series is excluded in the legend then there's nothing to draw.
        if (!storeCount || me.seriesIsHidden) {
            surface.getItems().hide(true);
            return;
        }

        //prepare style objects for line and markers
        endMarkerStyle = Ext.apply(markerStyle, me.getMarkerConfig());
        type = endMarkerStyle.type;
        delete endMarkerStyle.type;
        endLineStyle = seriesStyle;
        //if no stroke with is specified force it to 0.5 because this is
        //about making *lines*
        if (!endLineStyle['stroke-width']) {
            endLineStyle['stroke-width'] = 0.5;
        }
        //If we're using a time axis and we need to translate the points,
        //then reuse the first markers as the last markers.
        if (markerIndex && markerGroup && markerGroup.getCount()) {
            for (i = 0; i < markerIndex; i++) {
                marker = markerGroup.getAt(i);
                markerGroup.remove(marker);
                markerGroup.add(marker);
                markerAux = markerGroup.getAt(markerGroup.getCount() - 2);
                marker.setAttributes({
                    x: 0,
                    y: 0,
                    translate: {
                        x: markerAux.attr.translation.x,
                        y: markerAux.attr.translation.y
                    }
                }, true);
            }
        }

        me.unHighlightItem();
        me.cleanHighlights();

        me.setBBox();
        bbox = me.bbox;
        me.clipRect = [bbox.x, bbox.y, bbox.width, bbox.height];

        if (boundXAxis && chart.getAxes().get(boundXAxis)) {
            ends = chart.getAxes().get(boundXAxis).calcEnds();
            minX = ends.from;
            maxX = ends.to;
        }

        if (boundYAxis && chart.getAxes().get(boundYAxis)) {
            ends = chart.getAxes().get(boundYAxis).calcEnds();
            minY = ends.from;
            maxY = ends.to;
        } else {
            ends = me.getMinMaxYValues();
            minY = ends.min;
            maxY = ends.max;
        }

        if (isNaN(minX)) {
            minX = 0;
            xScale = bbox.width / ((storeCount - 1) || 1);
        }
        else {
            xScale = bbox.width / ((maxX - minX) || (storeCount -1) || 1);
        }

        if (isNaN(minY)) {
            minY = 0;
            yScale = bbox.height / ((storeCount - 1) || 1);
        }
        else {
            yScale = bbox.height / ((maxY - minY) || 1);
        }

        // Find the min and max x values that fit within the zoom/pan buffer area
        bufferMinX = minX - (bufferWidth + me.panX) / xScale;
        bufferMaxX = bufferMinX + (bufferWidth * 2 + chart.chartBBox.width) / xScale;

        // Extract all x and y values from the store
        me.eachRecord(function(record, i) {
            xValue = record.get(me.getXField());

            // Ensure a value
            if (typeof xValue == 'string' || typeof xValue == 'object' && !Ext.isDate(xValue)
                //set as uniform distribution if the axis is a category axis.
                || boundXAxis && chartAxes.get(boundXAxis) && chartAxes.get(boundXAxis).type == 'category') {
                    if (xValue in xValueMap) {
                        xValue = xValueMap[xValue];
                    } else {
                        xValue = xValueMap[xValue] = i;
                    }
            }

            // Filter out values that don't fit within the pan/zoom buffer area
            if (xValue >= bufferMinX && xValue <= bufferMaxX) {
                yValue = record.get(me.getYField());
                //skip undefined values
                if (yValue === null || typeof yValue == 'undefined' || (typeof yValue == 'string' && !yValue)) {
                    //<debug warn>
                    if (Ext.isDefined(Ext.global.console)) {
                        Ext.global.console.warn("[Ext.chart.series.Line]  Skipping a store element with an undefined value at ", record, xValue, yValue);
                    }
                    //</debug>
                    return;
                }
                // Ensure a value
                if (typeof yValue == 'string' || typeof yValue == 'object' && !Ext.isDate(xValue)
                    //set as uniform distribution if the axis is a category axis.
                    || boundYAxis && chartAxes.get(boundYAxis) && chartAxes.get(boundYAxis).type == 'category') {
                    yValue = i;
                }
                xValues.push(xValue);
                yValues.push(yValue);
            }
        });

        ln = xValues.length;
        if (ln > bbox.width) {
            coords = me.shrink(xValues, yValues, bbox.width);
            xValues = coords.x;
            yValues = coords.y;
        }

        me.items = [];

        count = 0;
        ln = xValues.length;
        for (i = 0; i < ln; i++) {
            xValue = xValues[i];
            yValue = yValues[i];
            if (yValue === false) {
                if (path.length == 1) {
                    path = [];
                }
                onbreak = true;
                me.items.push(false);
                continue;
            } else {
                x = (bbox.x + (xValue - minX) * xScale).toFixed(2);
                y = ((bbox.y + bbox.height) - (yValue - minY) * yScale).toFixed(2);
                if (onbreak) {
                    onbreak = false;
                    path.push('M');
                }
                path = path.concat([x, y]);
            }
            if ((typeof firstY == 'undefined') && (typeof y != 'undefined')) {
                firstY = y;
                firstX = x;
            }
            // If this is the first line, create a dummypath to animate in from.
            if (!me.line || chart.resizing) {
                dummyPath = dummyPath.concat([x, bbox.y + bbox.height / 2]);
            }

            // When resizing, reset before animating
            if (chart.getAnimate() && chart.resizing && me.line) {
                me.line.setAttributes({
                    path: dummyPath
                }, true);
                if (me.fillPath) {
                    me.fillPath.setAttributes({
                        path: dummyPath,
                        opacity: 0.2
                    }, true);
                }
                if (me.line.shadows) {
                    shadows = me.line.shadows;
                    for (j = 0, lnsh = shadows.length; j < lnsh; j++) {
                        shadow = shadows[j];
                        shadow.setAttributes({
                            path: dummyPath
                        }, true);
                    }
                }
            }
            if (showMarkers) {
                marker = markerGroup.getAt(count++);
                if (!marker) {
                    marker = Ext.chart.Shape[type](surface, Ext.apply({
                        group: [group, markerGroup],
                        x: 0, y: 0,
                        translate: {
                            x: prevX || x,
                            y: prevY || (bbox.y + bbox.height / 2)
                        },
                        value: '"' + xValue + ', ' + yValue + '"',
                    }, endMarkerStyle));
                    marker._to = {
                        translate: {
                            x: x,
                            y: y
                        }
                    };
                } else {
                    marker.setAttributes({
                        value: '"' + xValue + ', ' + yValue + '"',
                        x: 0, y: 0,
                        hidden: false
                    }, true);
                    marker._to = {
                        translate: {
                            x: x, y: y
                        }
                    };
                }
            }
            me.items.push({
                series: me,
                value: [xValue, yValue],
                point: [x, y],
                sprite: marker,
                storeItem: store.getAt(i)
            });
            prevX = x;
            prevY = y;
        }

        if (path.length <= 1) {
            //nothing to be rendered
            return;
        }

        if (smooth) {
            path = Ext.draw.Draw.smooth(path, isNumber(smooth) ? smooth : me.defaultSmoothness);
        }

        //Correct path if we're animating timeAxis intervals
        if (chart.markerIndex && me.previousPath) {
            fromPath = me.previousPath;
            fromPath.splice(1, 2);
        } else {
            fromPath = path;
        }

        // Only create a line if one doesn't exist.
        if (!me.line) {
            me.line = surface.add(Ext.apply({
                type: 'path',
                group: group,
                path: dummyPath,
                stroke: endLineStyle.stroke || endLineStyle.fill
            }, endLineStyle || {}));

            if (enableShadows) {
                me.line.setAttributes(me.getShadowOptions(), true);
            }

            //unset fill here (there's always a default fill withing the themes).
            me.line.setAttributes({
                fill: 'none',
                zIndex: 30
            });
            if (!endLineStyle.stroke && colorArrayLength) {
                me.line.setAttributes({
                    stroke: colors[seriesIdx % colorArrayLength]
                }, true);
            }
            if (enableShadows) {
                //create shadows
                shadows = me.line.shadows = [];
                for (shindex = 0; shindex < lnsh; shindex++) {
                    shadowBarAttr = shadowAttributes[shindex];
                    shadowBarAttr = Ext.apply({}, shadowBarAttr, { path: dummyPath });
                    shadow = surface.add(Ext.apply({}, {
                        type: 'path',
                        group: shadowGroups[shindex]
                    }, shadowBarAttr));
                    shadows.push(shadow);
                }
            }
        }
        if (me.getFill()) {
            fillPath = path.concat([
                ["L", x, bbox.y + bbox.height],
                ["L", firstX, bbox.y + bbox.height],
                ["L", firstX, firstY]
            ]);
            if (!me.fillPath) {
                me.fillPath = surface.add({
                    group: group,
                    type: 'path',
                    opacity: endLineStyle.opacity || 0.3,
                    fill: endLineStyle.fill || colors[seriesIdx % colorArrayLength],
                    path: dummyPath
                });
            }
        }
        markerCount = showMarkers && markerGroup.getCount();
        if (chart.getAnimate()) {
            fill = me.getFill();
            line = me.line;
            //Add renderer to line. There is not unique record associated with this.
            rendererAttributes = me.getRenderer()(line, false, { path: path }, i, store);
            Ext.apply(rendererAttributes || {}, endLineStyle || {}, {
                stroke: endLineStyle.stroke || endLineStyle.fill
            });
            //fill should not be used here but when drawing the special fill path object
            delete rendererAttributes.fill;
            line.show(true);
            if (chart.markerIndex && me.previousPath) {
                me.animation = animation = me.onAnimate(line, {
                    to: rendererAttributes,
                    from: {
                        path: fromPath
                    }
                });
            } else {
                me.animation = animation = me.onAnimate(line, {
                    to: rendererAttributes
                });
            }
            //animate shadows
            if (enableShadows) {
                shadows = line.shadows;
                for(j = 0; j < lnsh; j++) {
                    shadows[j].show(true);
                    if (chart.markerIndex && me.previousPath) {
                        me.onAnimate(shadows[j], {
                            to: { path: path },
                            from: { path: fromPath }
                        });
                    } else {
                        me.onAnimate(shadows[j], {
                            to: { path: path }
                        });
                    }
                }
            }
            //animate fill path
            if (fill) {
                me.fillPath.show(true);
                me.onAnimate(me.fillPath, {
                    to: Ext.apply({}, {
                        path: fillPath,
                        fill: endLineStyle.fill || colors[seriesIdx % colorArrayLength],
                        'stroke-width': 0
                    }, endLineStyle || {})
                });
            }
            //animate markers
            if (showMarkers) {
                count = 0;
                for(i = 0; i < ln; i++) {
                    if (me.items[i]) {
                        item = markerGroup.getAt(count++);
                        if (item) {
                            rendererAttributes = me.getRenderer()(item, store.getAt(i), item._to, i, store);
                            me.onAnimate(item, {
                                to: Ext.apply(rendererAttributes || {}, endMarkerStyle || {})
                            });
                            item.show(true);
                        }
                    }
                }
                for(; count < markerCount; count++) {
                    item = markerGroup.getAt(count);
                    item.hide(true);
                }
//                for(i = 0; i < (chart.markerIndex || 0)-1; i++) {
//                    item = markerGroup.getAt(i);
//                    item.hide(true);
//                }
            }
        } else {
            rendererAttributes = me.getRenderer()(me.line, false, { path: path, hidden: false }, i, store);
            Ext.apply(rendererAttributes, endLineStyle || {}, {
                stroke: endLineStyle.stroke || endLineStyle.fill
            });
            //fill should not be used here but when drawing the special fill path object
            delete rendererAttributes.fill;
            me.line.setAttributes(rendererAttributes, true);
            //set path for shadows
            if (enableShadows) {
                shadows = me.line.shadows;
                for(j = 0; j < lnsh; j++) {
                    shadows[j].setAttributes({
                        path: path,
                        hidden: false
                    }, true);
                }
            }
            if (me.getFill()) {
                me.fillPath.setAttributes({
                    path: fillPath,
                    hidden: false
                }, true);
            }
            if (showMarkers) {
                count = 0;
                for(i = 0; i < ln; i++) {
                    if (me.items[i]) {
                        item = markerGroup.getAt(count++);
                        if (item) {
                            rendererAttributes = me.getRenderer()(item, store.getAt(i), item._to, i, store);
                            item.setAttributes(Ext.apply(rendererAttributes, endMarkerStyle || {}), true);
                            if (!item.attr.hidden) {
                                item.show(true);
                            }
                        }
                    }
                }
                for(; count < markerCount; count++) {
                    item = markerGroup.getAt(count);
                    item.hide(true);
                }
            }
        }

        if (chart.markerIndex) {
            path.splice(1, 0, path[1], path[2]);
            me.previousPath = path;
        }
        me.renderLabels();
        me.renderCallouts();

        me.fireEvent('draw', me);
    },

    // @private called when a label is to be created.
    onCreateLabel: function(storeItem, item, i, display) {
        var me = this,
            group = me.labelsGroup,
            config = me.label,
            bbox = me.bbox,
            endLabelStyle = Ext.apply(config, me.labelStyle.style);

        return me.getSurface().add(Ext.apply({
            'type': 'text',
            'text-anchor': 'middle',
            'group': group,
            'x': item.point[0],
            'y': bbox.y + bbox.height / 2,
            zIndex: 40
        }, endLabelStyle || {}));
    },

    // @private called when a label is to be created.
    onPlaceLabel: function(label, storeItem, item, i, display, animate) {
        var me = this,
            chart = me.getChart(),
            resizing = chart.resizing,
            config = me.label,
            format = config.renderer,
            field = config.field,
            bbox = me.bbox,
            x = +item.point[0],
            y = +item.point[1],
            radius = item.sprite.attr.radius,
            bb, width, height;

        label.setAttributes({
            text: format(storeItem.get(field)),
            hidden: true
        }, true);

        if (display == 'rotate') {
            label.setAttributes({
                'text-anchor': 'start',
                'rotation': {
                    x: x,
                    y: y,
                    degrees: -45
                }
            }, true);
            //correct label position to fit into the box
            bb = label.getBBox();
            width = bb.width;
            height = bb.height;
            x = x < bbox.x? bbox.x : x;
            x = (x + width > bbox.x + bbox.width)? (x - (x + width - bbox.x - bbox.width)) : x;
            y = (y - height < bbox.y)? bbox.y + height : y;

        } else if (display == 'under' || display == 'over') {
            //TODO(nicolas): find out why width/height values in circle bounding boxes are undefined.
            bb = item.sprite.getBBox();
            bb.width = bb.width || (radius * 2);
            bb.height = bb.height || (radius * 2);
            y = y + (display == 'over'? -bb.height : bb.height);
            //correct label position to fit into the box
            bb = label.getBBox();
            width = bb.width/2;
            height = bb.height/2;
            x = x - width < bbox.x? bbox.x + width : x;
            x = (x + width > bbox.x + bbox.width) ? (x - (x + width - bbox.x - bbox.width)) : x;
            y = y - height < bbox.y? bbox.y + height : y;
            y = (y + height > bbox.y + bbox.height) ? (y - (y + height - bbox.y - bbox.height)) : y;
        }

        if (me.getChart().getAnimate()) {
            label.show(true);
            me.onAnimate(label, {
                to: {
                    x: x,
                    y: y
                }
            });
        } else {
            label.setAttributes({
                x: x,
                y: y
            }, true);
            label.show(true);
        }
    },

    //@private Overriding highlights.js highlightItem method.
    highlightItem: function(item) {
        var me = this,
            line = me.line,
            marker, markerStyle, markerType;

        Ext.chart.series.Line.superclass.highlightItem.call(me, item);

        if (line && !me.highlighted) {
            if (!('__strokeWidth' in line)) {
                line.__strokeWidth = line.attr['stroke-width'] || 0;
            }
            if (line.__anim) {
                line.__anim.paused = true;
            }
            if (line.__anim) {
                line.__anim.stop();
            } else {
                line.__anim = new Ext.fx.Sprite({
                    sprite: line
                });
            }
            line.__anim.start({
                'stroke-width': parseFloat(line.__strokeWidth) * 2
            });
            me.highlighted = true;
        }

        // If no markers are configured, we still want to display one at the highlighted point
        // so the user can see what was highlighted.
        if (!me.getShowMarkers()) {
            marker = me.highlightMarker;
            if (!marker) {
                markerStyle = Ext.apply({}, me.markerStyle.style, me.getMarkerConfig());
                markerType = markerStyle.type;
                delete markerStyle.type;
                marker = me.highlightMarker = Ext.chart.Shape[markerType](me.getSurface(), Ext.apply({x: 0, y: 0}, markerStyle));
            }

            marker.setAttributes({
                translate: {
                    x: item.point[0],
                    y: item.point[1]
                },
                hidden: false
            }, true);
        }
    },

    //@private Overriding highlights.js unHighlightItem method.
    unHighlightItem: function(item) {
        var me = this,
            line = me.line,
            marker = me.highlightMarker;

        Ext.chart.series.Line.superclass.unHighlightItem.call(me, item);

        if (line && me.highlighted) {
            if (line.__anim) {
                line.__anim.stop();
            } else {
                line.__anim = new Ext.fx.Sprite({
                    sprite: line
                });
            }
            line.__anim.start({
                'stroke-width': line.__strokeWidth
            });
            me.highlighted = false;
        }

        if (marker) {
            marker.hide(true);
        }
    },

    //@private called when a callout needs to be placed.
    onPlaceCallout : function(callout, storeItem, item, i, display, animate, index) {
        if (!display) {
            return;
        }

        var me = this,
            chart = me.getChart(),
            config = me.callouts,
            items = me.items,
            prev = i === 0 ? false : items[i -1].point,
            next = (i == items.length -1)? false : items[i +1].point,
            cur = [+item.point[0], +item.point[1]],
            dir, norm, normal, a, aprev, anext,
            offsetFromViz = config.offsetFromViz || 30,
            offsetBox = config.offsetBox || 3,
            boxx, boxy, boxw, boxh,
            p, clipRect = me.clipRect,
            bbox = {
                width: config.styles.width || 10,
                height: config.styles.height || 10
            },
            x, y;

        //get the right two points
        if (!prev) {
            prev = cur;
        }
        if (!next) {
            next = cur;
        }
        a = (next[1] - prev[1]) / (next[0] - prev[0]);
        aprev = (cur[1] - prev[1]) / (cur[0] - prev[0]);
        anext = (next[1] - cur[1]) / (next[0] - cur[0]);

        norm = Math.sqrt(1 + a * a);
        dir = [1 / norm, a / norm];
        normal = [-dir[1], dir[0]];

        //keep the label always on the outer part of the "elbow"
        if (aprev > 0 && anext < 0 && normal[1] < 0
            || aprev < 0 && anext > 0 && normal[1] > 0) {
            normal[0] *= -1;
            normal[1] *= -1;
        } else if (Math.abs(aprev) < Math.abs(anext) && normal[0] < 0
                   || Math.abs(aprev) > Math.abs(anext) && normal[0] > 0) {
            normal[0] *= -1;
            normal[1] *= -1;
        }
        //position
        x = cur[0] + normal[0] * offsetFromViz;
        y = cur[1] + normal[1] * offsetFromViz;

        //box position and dimensions
        boxx = x + (normal[0] > 0? 0 : -(bbox.width + 2 * offsetBox));
        boxy = y - bbox.height /2 - offsetBox;
        boxw = bbox.width + 2 * offsetBox;
        boxh = bbox.height + 2 * offsetBox;

        //now check if we're out of bounds and invert the normal vector correspondingly
        //this may add new overlaps between labels (but labels won't be out of bounds).
        if (boxx < clipRect[0] || (boxx + boxw) > (clipRect[0] + clipRect[2])) {
            normal[0] *= -1;
        }
        if (boxy < clipRect[1] || (boxy + boxh) > (clipRect[1] + clipRect[3])) {
            normal[1] *= -1;
        }

        //update positions
        x = cur[0] + normal[0] * offsetFromViz;
        y = cur[1] + normal[1] * offsetFromViz;

        //update box position and dimensions
        boxx = x + (normal[0] > 0? 0 : -(bbox.width + 2 * offsetBox));
        boxy = y - bbox.height /2 - offsetBox;
        boxw = bbox.width + 2 * offsetBox;
        boxh = bbox.height + 2 * offsetBox;

        if (chart.getAnimate()) {
            //set the line from the middle of the pie to the box.
            me.onAnimate(callout.lines, {
                to: {
                    path: ["M", cur[0], cur[1], "L", x, y, "Z"]
                }
            });
            //set component position
            if (callout.panel) {
                callout.panel.setPosition(boxx, boxy, true);
            }
        }
        else {
            //set the line from the middle of the pie to the box.
            callout.lines.setAttributes({
                path: ["M", cur[0], cur[1], "L", x, y, "Z"]
            }, true);
            //set component position
            if (callout.panel) {
                callout.panel.setPosition(boxx, boxy);
            }
        }
        for (p in callout) {
            callout[p].show(true);
        }
    },

    isItemInPoint: function(x, y, item, i) {
        var me = this,
            items = me.items,
            tolerance = me.getSelectionTolerance(),
            point, diffX, diffY, dist,
            sqrt = Math.sqrt;

        // See if the target item is within the selectionTolerance distance from the x/y point
        point = item.point;
        diffX = x - point[0];
        diffY = y - point[1];
        dist = sqrt(diffX * diffX + diffY * diffY);

        if (dist <= tolerance) {
            // We have a match, but it's possible the previous or next item are even closer, so check them
            if (i > 0 && items[i - 1]) {
                point = items[i - 1].point;
                diffX = x - point[0];
                diffY = y - point[1];
                if (sqrt(diffX * diffX + diffY * diffY) < dist) {
                    return false;
                }
            }
            if (items[i + 1]) {
                point = items[i + 1].point;
                diffX = x - point[0];
                diffY = y - point[1];
                if (sqrt(diffX * diffX + diffY * diffY) < dist) {
                    return false;
                }
            }

            return true;
        }
        return false;
    },

    // @private toggle visibility of all series elements (markers, sprites).
    toggleAll: function(show) {
        var me = this,
            i, ln, shadow, shadows;
        if (!show) {
            Ext.chart.series.Line.superclass.hideAll.call(me);
        }
        else {
            Ext.chart.series.Line.superclass.showAll.call(me);
        }
        if (me.line) {
            me.line.setAttributes({
                hidden: !show
            }, true);
            //hide shadows too
            if (me.line.shadows) {
                for (i = 0, shadows = me.line.shadows, ln = shadows.length; i < ln; i++) {
                    shadow = shadows[i];
                    shadow.setAttributes({
                        hidden: !show
                    }, true);
                }
            }
        }
        if (me.fillPath) {
            me.fillPath.setAttributes({
                hidden: !show
            }, true);
        }
    },

    // @private hide all series elements (markers, sprites).
    hideAll: function() {
        this.toggleAll(false);
    },

    // @private hide all series elements (markers, sprites).
    showAll: function() {
        this.toggleAll(true);
    },

    /**
     * Returns a string with the color to be used for the series legend item.
     */
    getLegendColor: function(index) {
        var me = this, fill, stroke;

        if (me.style) {
            fill = me.style.fill;
            stroke = me.style.stroke;
            if (me.getFill() && fill && fill != 'none') {
                return me.getColorFromStyle(fill);
            }
            return me.getColorFromStyle(stroke || fill);
        }

        return '#000';
    }
});

/**
 * @class Ext.chart.series.Pie
 * @extends Ext.chart.series.Series
 *
 * Creates a Pie Chart. A Pie Chart is a useful visualization technique to display quantitative information for different
 * categories that also have a meaning as a whole.
 * As with all other series, the Pie Series must be appended in the *series* Chart array configuration. See the Chart
 * documentation for more information. A typical configuration object for the pie series could be:
 *
 * {@img Ext.chart.series.Pie/Ext.chart.series.Pie.png Ext.chart.series.Pie chart series}
 *
 *     var store = new Ext.data.JsonStore({
 *         fields: ['name', 'data1', 'data2', 'data3', 'data4', 'data5'],
 *         data: [
 *             {'name':'metric one', 'data1':10, 'data2':12, 'data3':14, 'data4':8, 'data5':13},
 *             {'name':'metric two', 'data1':7, 'data2':8, 'data3':16, 'data4':10, 'data5':3},
 *             {'name':'metric three', 'data1':5, 'data2':2, 'data3':14, 'data4':12, 'data5':7},
 *             {'name':'metric four', 'data1':2, 'data2':14, 'data3':6, 'data4':1, 'data5':23},
 *             {'name':'metric five', 'data1':27, 'data2':38, 'data3':36, 'data4':13, 'data5':33}
 *         ]
 *     });
 *
 *     new Ext.chart.Chart({
 *         renderTo: Ext.getBody(),
 *         width: 500,
 *         height: 300,
 *         animate: true,
 *         store: store,
 *         theme: 'Base:gradients',
 *         series: [{
 *             type: 'pie',
 *             angleField: 'data1',
 *             showInLegend: true,
 *             tips: {
 *               trackMouse: true,
 *               width: 140,
 *               height: 28,
 *               renderer: function(storeItem, item) {
 *                 //calculate and display percentage on hover
 *                 var total = 0;
 *                 store.each(function(rec) {
 *                     total += rec.get('data1');
 *                 });
 *                 this.setTitle(storeItem.get('name') + ': ' + Math.round(storeItem.get('data1') / total * 100) + '%');
 *               }
 *             },
 *             highlight: {
 *               segment: {
 *                 margin: 20
 *               }
 *             },
 *             label: {
 *                 field: 'name',
 *                 display: 'rotate',
 *                 contrast: true,
 *                 font: '18px Arial'
 *             }
 *         }]
 *     });
 *
 * In this configuration we set `pie` as the type for the series, set an object with specific style properties for highlighting options
 * (triggered when hovering elements). We also set true to `showInLegend` so all the pie slices can be represented by a legend item.
 * We set `data1` as the value of the field to determine the angle span for each pie slice. We also set a label configuration object
 * where we set the field name of the store field to be renderer as text for the label. The labels will also be displayed rotated.
 * We set `contrast` to `true` to flip the color of the label if it is to similar to the background color. Finally, we set the font family
 * and size through the `font` parameter.
 *
 * @xtype pie
 */
Ext.define('Ext.chart.series.Pie', {
 
    extend: 'Ext.chart.series.Series',

    type: 'pie',

    rad: Math.PI / 180,

    config: {

        /**
         * @cfg {Number} rotation
         * The angle in degrees at which the first pie slice should start.
         */
        rotation: 0,

        /**
         * @cfg {String} angleField
         * The store record field name to be used for the pie angles.
         * The values bound to this field name must be positive real numbers.
         * This parameter is required.
         */
        field: false,

        /**
         * @cfg {String} lengthField
         * The store record field name to be used for the pie slice lengths.
         * The values bound to this field name must be positive real numbers.
         * This parameter is optional.
         */
        lengthField: false,

        /**
         * @cfg {Boolean, Number} donut
         * Whether to set the pie chart as donut chart.
         * Default's false. Can be set to a particular percentage to set the radius
         * of the donut chart.
         */
        donut: false,

        /**
         * @cfg {Boolean} showInLegend
         * Whether to add the pie chart elements as legend items. Default's false.
         */
        showInLegend: false,

        /**
         * @cfg {Boolean} labelOverflowPadding
         * Extra distance value for which the labelOverflow listener is triggered. Default to 20.
         */
        labelOverflowPadding: 20,

        /**
         * @cfg {Array} colorSet
         * An array of color values which will be used, in order, as the pie slice fill colors.
         */
        colorSet: null,

        highlightCfg: {
            segment: {
                margin: 20
            }
        }
    },


    /**
     * @cfg {Object} style
     * An object containing styles for overriding series styles from Theming.
     */

    constructor: function(config) {
        this.callParent(arguments);

        var me = this,
            chart = me.getChart(),
            surface = me.getSurface(),
            shadow = chart.getShadow(), i, l;

        me.group = surface.getGroup(me.seriesId);
        surface.addCustomAttribute('segment', function(opt) {
            return me.getSegment(opt);
        });

        //add default label overflow listener which hides the label.
        me.addListener('labelOverflow', me.onLabelOverflow);
    },

    //default configuration for label overflowing the pie slice shape.
    onLabelOverflow: function(label) {
        label.hide(true);
    },

    // @private returns an object with properties for a PieSlice.
    getSegment: function(opt) {
        var me = this,
            rad = me.rad,
            cos = Math.cos,
            sin = Math.sin,
            abs = Math.abs,
            x = me.centerX,
            y = me.centerY,
            x1 = 0, x2 = 0, x3 = 0, x4 = 0,
            y1 = 0, y2 = 0, y3 = 0, y4 = 0,
            delta = 1e-2,
            startAngle = opt.startAngle,
            endAngle = opt.endAngle,
            midAngle = (startAngle + endAngle) / 2 * rad,
            margin = opt.margin || 0,
            flag = abs(endAngle - startAngle) > 180,
            a1 = Math.min(startAngle, endAngle) * rad,
            a2 = Math.max(startAngle, endAngle) * rad,
            singleSlice = false,
            fullCircle = false;

        x += margin * cos(midAngle);
        y += margin * sin(midAngle);

        x1 = x + opt.startRho * cos(a1);
        y1 = y + opt.startRho * sin(a1);

        x2 = x + opt.endRho * cos(a1);
        y2 = y + opt.endRho * sin(a1);

        x3 = x + opt.startRho * cos(a2);
        y3 = y + opt.startRho * sin(a2);

        x4 = x + opt.endRho * cos(a2);
        y4 = y + opt.endRho * sin(a2);

        if (abs(x1 - x3) <= delta && abs(y1 - y3) <= delta) {
            singleSlice = true;
        }

        fullCircle = singleSlice && (abs(x2 - x4) <= delta && abs(y2 - y4) <= delta);

        if (abs(endAngle - startAngle) < delta) {
            return { path: [ 'M', x, y ] };
        }

        //Solves mysterious clipping bug with IE
        if (fullCircle) {
            return {
                path: [
                ["M", x + opt.endRho, y - 1e-4],
                ["A", opt.endRho, opt.endRho, 0, 1, 0, x + opt.endRho, y],
                ["Z"]]
            };
        } else if (singleSlice) {
            return {
                path: [
                ["M", x1, y1],
                ["L", x2, y2],
                ["A", opt.endRho, opt.endRho, 0, +flag, 1, x4, y4],
                ["Z"]]
            };
        } else {
            return {
                path: [
                ["M", x1, y1],
                ["L", x2, y2],
                ["A", opt.endRho, opt.endRho, 0, +flag, 1, x4, y4],
                ["L", x4, y4],
                ["L", x3, y3],
                ["A", opt.startRho, opt.startRho, 0, +flag, 0, x1, y1],
                ["Z"]]
            };
        }
    },

    // @private utility function to calculate the middle point of a pie slice.
    calcMiddle: function(item) {
        var me = this,
            rad = me.rad,
            slice = item.slice,
            x = me.centerX,
            y = me.centerY,
            startAngle = slice.startAngle,
            endAngle = slice.endAngle,
            a1 = Math.min(startAngle, endAngle) * rad,
            a2 = Math.max(startAngle, endAngle) * rad,
            midAngle = -(a1 + (a2 - a1) / 2),
            xm = x + (item.endRho + item.startRho + item.margin) / 2 * Math.cos(midAngle),
            ym = y - (item.endRho + item.startRho + item.margin) / 2 * Math.sin(midAngle);

        item.middle = {
            x: xm,
            y: ym
        };
    },

    /**
     * Draws the series for the current chart.
     */
    drawSeries: function() {
        var me = this,
            store = me.getChart().substore || me.getChart().getStore(),
            group = me.group,
            animate = me.getChart().getAnimate(),
            field = me.getField() || me.field || me.getXField(),
            lenField = [].concat(me.getLengthField()),
            totalLenField = 0,
            chart = me.getChart(),
            surface = me.getSurface(),
            chartBBox = chart.chartBBox,
            enableShadows = chart.getShadow(),
            shadowGroups = me.shadowGroups,
            shadowAttributes = me.getShadowAttributes(),
            lnsh = shadowGroups.length,
            layers = lenField.length,
            rhoAcum = 0,
            donut = +me.getDonut(),
            layerTotals = [],
            items = [],
            totalField = 0,
            maxLenField = 0,
            angle = me.getRotation(),
            seriesStyle = me.style,
            colors = me.getChart().getColorsStyle(),
            colorArrayLength = colors && colors.length || 0,
            rendererAttributes,
            shadowAttr,
            shadows,
            shadow,
            shindex,
            centerX,
            centerY,
            deltaRho,
            first = 0,
            slice,
            slices,
            sprite,
            value,
            item,
            lenValue,
            ln,
            i,
            j,
            endAngle,
            middleAngle,
            path,
            p,
            spriteOptions, bbox;

        if (me.fireEvent('beforedraw', me) === false) {
            return;
        }

        me.updateSurfaceBox();

        me.setBBox();
        bbox = me.bbox;

        //override theme colors
        if (me.getColorSet()) {
            colors = me.getColorSet();
            colorArrayLength = colors.length;
        }

        me.unHighlightItem();
        me.cleanHighlights();

        centerX = me.centerX = chartBBox.x + (chartBBox.width / 2);
        centerY = me.centerY = chartBBox.y + (chartBBox.height / 2);
        me.radius = Math.min(centerX - chartBBox.x, centerY - chartBBox.y);
        me.slices = slices = [];
        me.items = items = [];

        me.eachRecord(function(record, i) {
            if (me.isExcluded(i)) {
                //hidden series
                return;
            }
            totalField += +record.get(field);
            if (lenField[0]) {
                for (j = 0, totalLenField = 0; j < layers; j++) {
                    totalLenField += +record.get(lenField[j]);
                }
                layerTotals[i] = totalLenField;
                maxLenField = Math.max(maxLenField, totalLenField);
            }
        }, this);

        totalField = totalField || 1;
        me.eachRecord(function(record, i) {
            if (me.isExcluded(i)) {
                slices[i] = {
                    series: me,
                    value: false,
                    startAngle: angle,
                    endAngle: angle,
                    rho : me.radius,
                    storeItem: record
                };
                //hidden series
                return;
            }
            value = record.get(field);
            middleAngle = angle - 360 * value / totalField / 2;
            // TODO - Put up an empty circle
            if (isNaN(middleAngle)) {
                middleAngle = 360;
                value = 1;
                totalField = 1;
            }
            // First slice
            if (!i || first === 0) {
                angle = 360 - middleAngle;
                me.firstAngle = angle;
                middleAngle = angle - 360 * value / totalField / 2;
                for (j = 0; j < i; j++) {
                    slices[j].startAngle = slices[j].endAngle = angle;
                }
            }
            endAngle = angle - 360 * value / totalField;
            slice = {
                series: me,
                value: value,
                startAngle: angle,
                endAngle: endAngle,
                storeItem: record
            };
            if (lenField[0]) {
                lenValue = layerTotals[i];
                slice.rho = me.radius * (lenValue / maxLenField);
            } else {
                slice.rho = me.radius;
            }
            slices[i] = slice;
            angle = endAngle;
            first++;
        }, me);

        //do all shadows first.
        if (enableShadows) {
            for (i = 0, ln = slices.length; i < ln; i++) {
                slice = slices[i];
                slice.shadowAttrs = [];
                for (j = 0, rhoAcum = 0, shadows = []; j < layers; j++) {
                    sprite = group.getAt(i * layers + j);
                    deltaRho = lenField[j] ? store.getAt(i).get(lenField[j]) / layerTotals[i] * slice.rho: slice.rho;
                    //set pie slice properties
                    rendererAttributes = {
                        segment: {
                            startAngle: slice.startAngle,
                            endAngle: slice.endAngle,
                            margin: 0,
                            rho: slice.rho,
                            startRho: rhoAcum + (deltaRho * donut / 100),
                            endRho: rhoAcum + deltaRho
                        },
                        hidden: !slice.value && (slice.startAngle % 360) == (slice.endAngle % 360)
                    };
                    //create shadows
                    for (shindex = 0, shadows = []; shindex < lnsh; shindex++) {
                        shadowAttr = shadowAttributes[shindex];
                        shadow = shadowGroups[shindex].getAt(i);
                        if (!shadow) {
                            shadow = me.getSurface().add(Ext.apply({}, {
                                type: 'path',
                                group: shadowGroups[shindex],
                                strokeLinejoin: "round"
                            }, rendererAttributes, shadowAttr));
                        }
                        if (animate) {
                            shadowAttr = me.getRenderer()(shadow, store.getAt(i), Ext.apply({}, rendererAttributes, shadowAttr), i, store);
                            me.onAnimate(shadow, {
                                to: shadowAttr
                            });
                        } else {
                            shadowAttr = me.getRenderer()(shadow, store.getAt(i), Ext.apply(shadowAttr, {
                                hidden: false
                            }), i, store);
                            shadow.setAttributes(shadowAttr, true);
                        }
                        shadows.push(shadow);
                    }
                    slice.shadowAttrs[j] = shadows;
                }
            }
        }
        //do pie slices after.
        for (i = 0, ln = slices.length; i < ln; i++) {
            slice = slices[i];
            for (j = 0, rhoAcum = 0; j < layers; j++) {
                sprite = group.getAt(i * layers + j);
                deltaRho = lenField[j] ? store.getAt(i).get(lenField[j]) / layerTotals[i] * slice.rho: slice.rho;
                //set pie slice properties
                rendererAttributes = Ext.apply({
                    segment: {
                        startAngle: slice.startAngle,
                        endAngle: slice.endAngle,
                        margin: 0,
                        rho: slice.rho,
                        startRho: rhoAcum + (deltaRho * donut / 100),
                        endRho: rhoAcum + deltaRho
                    },
                    hidden: !slice.value && (slice.startAngle % 360) == (slice.endAngle % 360)
                }, Ext.apply(seriesStyle, colors && { fill: colors[(layers > 1? j : i) % colorArrayLength] } || {}));
                item = Ext.apply({},
                rendererAttributes.segment, {
                    slice: slice,
                    series: me,
                    storeItem: slice.storeItem,
                    index: i
                });
                me.calcMiddle(item);
                if (enableShadows) {
                    item.shadows = slice.shadowAttrs[j];
                }
                items[i] = item;
                // Create a new sprite if needed (no height)
                if (!sprite) {
                    spriteOptions = Ext.apply({
                        type: "path",
                        group: group,
                        middle: item.middle
                    }, Ext.apply(seriesStyle, colors && { fill: colors[(layers > 1? j : i) % colorArrayLength] } || {}));

                    if (enableShadows) {
                        Ext.apply(spriteOptions, me.getShadowOptions());
                    }

                    sprite = surface.add(Ext.apply(spriteOptions, rendererAttributes));
                }
                slice.sprite = slice.sprite || [];
                item.sprite = sprite;
                slice.sprite.push(sprite);
                slice.point = [item.middle.x, item.middle.y];
                rendererAttributes = me.getRenderer()(sprite, store.getAt(i), rendererAttributes, i, store);
                if (animate) {
                    me.onAnimate(sprite, {
                        to: rendererAttributes
                    });
                } else {
                    sprite.setAttributes(rendererAttributes, true);
                }
                rhoAcum += deltaRho;
            }
        }

        // Hide unused bars
        ln = group.getCount();
        for (i = 0; i < ln; i++) {
            if (!slices[(i / layers) >> 0] && group.getAt(i)) {
                group.getAt(i).hide(true);
            }
        }
        if (enableShadows) {
            lnsh = shadowGroups.length;
            for (shindex = 0; shindex < ln; shindex++) {
                if (!slices[(shindex / layers) >> 0]) {
                    for (j = 0; j < lnsh; j++) {
                        if (shadowGroups[j].getAt(shindex)) {
                            shadowGroups[j].getAt(shindex).hide(true);
                        }
                    }
                }
            }
        }
        me.renderLabels();
        me.renderCallouts();

        me.fireEvent('draw', me);
    },

    // @private callback for when creating a label sprite.
    onCreateLabel: function(storeItem, item) {
        var me = this,
            group = me.labelsGroup,
            config = me.label,
            middle = item.middle,
            endLabelStyle = Ext.apply(me.labelStyle.style || {}, config || {});

        return me.getSurface().add(Ext.apply({
            'type': 'text',
            'text-anchor': 'middle',
            'group': group,
            'x': middle.x,
            'y': middle.y,
            zIndex: 100
        }, endLabelStyle));
    },

    // @private callback for when placing a label sprite.
    onPlaceLabel: function(label, storeItem, item, i, display, animate, index) {
        var me = this,
            chart = me.getChart(),
            resizing = chart.resizing,
            config = me.label,
            format = config.renderer,
            field = [].concat(config.field),
            centerX = me.centerX,
            centerY = me.centerY,
            middle = item.middle,
            opt = {
                x: middle.x,
                y: middle.y
            },
            x = middle.x - centerX,
            y = middle.y - centerY,
            from = {},
            rho = 1,
            theta = Math.atan2(y, x || 1),
            dg = theta * 180 / Math.PI,
            prevDg,
            sliceContainsLabel;
        
        function fixAngle(a) {
            if (a < 0) a += 360;
            return a % 360;
        }

        label.setAttributes({
            text: format(storeItem.get(field[index]))
        }, true);

        switch (display) {
        case 'outside':
            rho = Math.sqrt(x * x + y * y) * 2;
            //update positions
            opt.x = rho * Math.cos(theta) + centerX;
            opt.y = rho * Math.sin(theta) + centerY;
            break;

        case 'rotate':
            dg = fixAngle(dg);
            dg = (dg > 90 && dg < 270) ? dg + 180: dg;

            prevDg = label.attr.rotation.degrees;
            if (prevDg != null && Math.abs(prevDg - dg) > 180) {
                if (dg > prevDg) {
                    dg -= 360;
                } else {
                    dg += 360;
                }
                dg = dg % 360;
            } else {
                dg = fixAngle(dg);
            }
            //update rotation angle
            opt.rotate = {
                degrees: dg,
                x: opt.x,
                y: opt.y
            };
            break;

        default:
            break;
        }
        //ensure the object has zero translation
        opt.translate = {
            x: 0, y: 0
        };
        if (animate && !resizing && (display != 'rotate' || prevDg !== null)) {
            me.onAnimate(label, Ext.apply({
                to: opt
            }, animate));
        } else {
            label.setAttributes(opt, true);
        }

        sliceContainsLabel = me.sliceContainsLabel(item.slice, label);

        if (!sliceContainsLabel) {
            me.fireEvent('labelOverflow', label, item);
        }
    },

    onCreateCallout: function() {
        var me = this, ans;

        ans = Ext.chart.series.Pie.superclass.onCreateCallout.apply(this, arguments);

        ans.lines.setAttributes({
            path: ['M', me.centerX, me.centerY]
        });

        ans.box.setAttributes({
            x: me.centerX,
            y: me.centerY
        });

        ans.label.setAttributes({
            x: me.centerX,
            y: me.centerY
        });

        return ans;
    },

    // @private callback for when placing a callout sprite.
    onPlaceCallout: function(callout, storeItem, item) {
        var me = this,
            chart = me.getChart(),
            centerX = me.centerX,
            centerY = me.centerY,
            middle = item.middle,
            opt = {
                x: middle.x,
                y: middle.y
            },
            x = middle.x - centerX,
            y = middle.y - centerY,
            rho = 1,
            rhoCenter,
            theta = Math.atan2(y, x || 1),
            label = callout.label,
            box = callout.box,
            lines = callout.lines,
            lattr = lines.attr,
            bbox = label.getBBox(),
            offsetFromViz = lattr.offsetFromViz || 20,
            offsetToSide = lattr.offsetToSide || 10,
            offsetBox = box.attr.offsetBox || 10,
            p;
        //should be able to config this.
        rho = item.endRho + offsetFromViz;
        rhoCenter = (item.endRho + item.startRho) / 2 + (item.endRho - item.startRho) / 3;
        //update positions
        opt.x = rho * Math.cos(theta) + centerX;
        opt.y = rho * Math.sin(theta) + centerY;

        x = rhoCenter * Math.cos(theta);
        y = rhoCenter * Math.sin(theta);

        if (chart.getAnimate()) {
            //set the line from the middle of the pie to the box.
            me.onAnimate(callout.lines, {
              to: {
                    path: ["M", x + centerX, y + centerY, "L", opt.x, opt.y, "Z", "M", opt.x, opt.y, "l", x > 0 ? offsetToSide: -offsetToSide, 0, "z"]
                }
            });
            //set box position
            me.onAnimate(callout.box, {
                to: {
                    x: opt.x + (x > 0 ? offsetToSide: -(offsetToSide + bbox.width + 2 * offsetBox)),
                    y: opt.y + (y > 0 ? ( - bbox.height - offsetBox / 2) : ( - bbox.height - offsetBox / 2)),
                    width: bbox.width + 2 * offsetBox,
                    height: bbox.height + 2 * offsetBox
                }
            });
            //set text position
            me.onAnimate(callout.label, {
                to: {
                    x: opt.x + (x > 0 ? (offsetToSide + offsetBox) : -(offsetToSide + bbox.width + offsetBox)),
                    y: opt.y + (y > 0 ? -bbox.height / 4: -bbox.height / 4)
                }
            });
        } else {
            //set the line from the middle of the pie to the box.
            callout.lines.setAttributes({
                path: ["M", x + centerX, y + centerY, "L", opt.x, opt.y, "Z", "M", opt.x, opt.y, "l", x > 0 ? offsetToSide: -offsetToSide, 0, "z"]
            },
            true);
            //set box position
            callout.box.setAttributes({
                x: opt.x + (x > 0 ? offsetToSide: -(offsetToSide + bbox.width + 2 * offsetBox)),
                y: opt.y + (y > 0 ? ( - bbox.height - offsetBox / 2) : ( - bbox.height - offsetBox / 2)),
                width: bbox.width + 2 * offsetBox,
                height: bbox.height + 2 * offsetBox
            },
            true);
            //set text position
            callout.label.setAttributes({
                x: opt.x + (x > 0 ? (offsetToSide + offsetBox) : -(offsetToSide + bbox.width + offsetBox)),
                y: opt.y + (y > 0 ? -bbox.height / 4: -bbox.height / 4)
            },
            true);
        }
        for (p in callout) {
            callout[p].show(true);
        }
    },

    // @private handles sprite animation for the series.
    onAnimate: function(sprite, attr) {
        sprite.show();
        return Ext.chart.series.Pie.superclass.onAnimate.apply(this, arguments);
    },

    isItemInPoint: function(x, y, item) {
        var me = this,
            chartBBox = me.getChart().chartBBox,
            cx = me.centerX - chartBBox.x,
            cy = me.centerY - chartBBox.y,
            abs = Math.abs,
            dx = abs(x - cx),
            dy = abs(y - cy),
            startAngle = item.startAngle,
            endAngle = item.endAngle,
            rho = Math.sqrt(dx * dx + dy * dy),
            angle = Math.atan2(y - cy, x - cx) / me.rad;

        while (angle < endAngle) {
            angle += 360;
        }
        while (angle > startAngle) {
            angle -= 360;
        }
        return (angle <= startAngle && angle > endAngle
                && rho >= item.startRho && rho <= item.endRho);
    },

    getItemForAngle: function(angle) {
        var me = this,
            items = me.items,
            i = items.length;
        while (i--) {
            if (items[i] && me.isAngleInItem(angle, items[i])) {
                return items[i];
            }
        }
    },

    isAngleInItem: function(angle, item) {
        var startAngle = item.startAngle,
            endAngle = item.endAngle;

        while (angle < endAngle) {
            angle += 360;
        }
        while (angle > startAngle) {
            angle -= 360;
        }
        return (angle <= startAngle && angle > endAngle);
    },

    sliceContainsLabel: function(slice, label) {
        var me = this,
            PI = Math.PI,
            startAngle = slice.startAngle,
            endAngle = slice.endAngle,
            diffAngle =  Math.abs(endAngle - startAngle) * PI / 180,
            bbox = label.getBBox(true), //isWithoutTransform == true
            dist = me.radius,
            height = bbox.height + (me.getLabelOverflowPadding() || 0),
            angleHeight;

        if (diffAngle >= PI) {
            return true;
        }

        angleHeight = Math.abs(Math.tan(diffAngle / 2)) * dist * 2;

        return angleHeight >= height;
    },

    getLegendLabels: function() {
        var me = this,
            labelField = me.label.field,
            labels = [];

        if (labelField) {
            me.eachRecord(function(rec) {
                labels.push(rec.get(labelField));
            });
        }

        return labels;
    },

    /**
     * Returns the color of the series (to be displayed as color for the series legend item).
     * @param item {Object} Info about the item; same format as returned by #getItemForPoint
     */
    getLegendColor: function(index) {
        var me = this,
            colorSet = me.getColorSet(),
            colors = me.getChart().getColorsStyle();
        return me.getColorFromStyle(
            (colorSet && colorSet[index % colorSet.length]) || colors[index % colors.length]
        );
    },

    /**
     * Iterate over each of the displayed records for this pie series, taking into account
     * records that have been combined into one by the user.
     * @param {Function} fn The function to execute for each record.
     * @param {Object} scope Scope for the fn.
     */
    eachRecord: function(fn, scope) {
        var me = this,
            store = me.getChart().substore || me.getChart().getStore(),
            combinations = me.combinations,
            labelField = me.label.field,
            angleField = me.getField(),
            lengthFields = [].concat(me.getLengthField()),
            records;

        // If we have combined records, take a snapshot of the store data and apply the combinations
        if (combinations) {
            records = store.data.clone();
            Ext.each(combinations, function(combo) {
                var record1 = records.getAt(combo[0]),
                    record2 = records.getAt(combo[1]),
                    comboData = {};

                // Build a combination data model object from the two target records
                comboData[labelField] = record1.get(labelField) + ' & ' + record2.get(labelField);
                comboData[angleField] = +record1.get(angleField) + record2.get(angleField);
                if (lengthFields[0]) {
                    Ext.each(lengthFields, function(lengthField) {
                        comboData[lengthField] = +record1.get(lengthField) + record2.get(lengthField);
                    });
                }

                // Insert the new combination record in place of the second original record, and remove both originals
                records.insert(combo[1], Ext.ModelMgr.create(comboData, store.model));
                records.remove(record1);
                records.remove(record2);
            });
            records.each(fn, scope);
        } else {
            // No combinations - just iterate the store directly
            store.each(fn, scope);
        }
    },

    getRecordCount: function() {
        var me = this,
            combinations = me.combinations;
        return Ext.chart.series.Pie.superclass.getRecordCount.call(me) - (combinations ? combinations.length : 0);
    },

    /**
     * @private update the position/size of the series surface. For pie series we set it to the
     * full chart size so it doesn't get clipped when slices slide out.
     */
    updateSurfaceBox: function() {
        var me = this,
            surface = me.getSurface(),
            overlaySurface = me.getOverlaySurface(),
            chart = me.getChart(),
            width = chart.getWidth() || chart.element.getWidth(),
            height = chart.getHeight() || chart.element.getHeight();

        surface.element.setTop(0);
        surface.element.setLeft(0);
        surface.setSize(width, height);

        overlaySurface.element.setTop(0);
        overlaySurface.element.setLeft(0);
        overlaySurface.setSize(width, height);
    },

    reset: function() {
        this.setRotation(0);
        Ext.chart.series.Pie.superclass.reset.call(this);
    },

    highlightItem: function (item) {
        this.callParent(arguments);
        if (this.getHighlight()) {
            var me = this,
                highlighCfg = Ext.merge({}, me.highlightStyle.style, me.getHighlightCfg());
            // TODO: this might be a problem
            item.margin = highlighCfg.segment.margin;
            var chart = this.getChart(),
                animate = me.getChart().getAnimate();
            if (animate) {
                if (animate !== true) {
                    chart.setAnimate(Ext.apply(Ext.Object.chain(animate), {duration : me.getHighlightDuration()}));
                } else {
                    chart.setAnimate({duration : me.getHighlightDuration()});
                }
            }
            me.calcMiddle(item);
            me.renderLabels();
            if (animate) {
                if (animate !== true) {
                    chart.setAnimate(animate);
                }
            }
        }
    },

    unHighlightItem: function (item) {
        var me = this;
        if (!item) {
            if (this.highlightedItem) {
                item = this.highlightedItem;
            } else {
                return;
            }
        }
        me.callParent(arguments);
        if (me.getHighlight()) {
            item.margin = item.sprite.originalAttr.segment.margin;
            var chart = this.getChart(),
                animate = chart.getAnimate();
            if (animate) {
                if (animate !== true) {
                    chart.setAnimate(Ext.apply(Ext.Object.chain(animate), {duration : me.getHighlightDuration()}));
                } else {
                    chart.setAnimate({duration : me.getHighlightDuration()});
                }
            }
            me.calcMiddle(item);
            me.renderLabels();
            if (animate) {
                if (animate !== true) {
                    chart.setAnimate(animate);
                }
            }
        }
    }
});


/**
 * @class Ext.chart.series.Radar
 * @extends Ext.chart.series.Series
 *
 * Creates a Radar Chart. A Radar Chart is a useful visualization technique for comparing different quantitative values for
 * a constrained number of categories.
 * As with all other series, the Radar series must be appended in the *series* Chart array configuration. See the Chart
 * documentation for more information. A typical configuration object for the radar series could be:
 *
 * {@img Ext.chart.series.Radar/Ext.chart.series.Radar.png Ext.chart.series.Radar chart series}
 *
 *     var store = new Ext.data.JsonStore({
 *         fields: ['name', 'data1', 'data2', 'data3', 'data4', 'data5'],
 *         data: [
 *             {'name':'metric one', 'data1':10, 'data2':12, 'data3':14, 'data4':8, 'data5':13},
 *             {'name':'metric two', 'data1':7, 'data2':8, 'data3':16, 'data4':10, 'data5':3},
 *             {'name':'metric three', 'data1':5, 'data2':2, 'data3':14, 'data4':12, 'data5':7},
 *             {'name':'metric four', 'data1':2, 'data2':14, 'data3':6, 'data4':1, 'data5':23},
 *             {'name':'metric five', 'data1':27, 'data2':38, 'data3':36, 'data4':13, 'data5':33}
 *         ]
 *     });
 *
 *     new Ext.chart.Chart({
 *         renderTo: Ext.getBody(),
 *         width: 500,
 *         height: 300,
 *         animate: true,
 *         theme:'Category2',
 *         store: store,
 *         axes: [{
 *             type: 'Radial',
 *             position: 'radial',
 *             label: {
 *                 display: true
 *             }
 *         }],
 *         series: [{
 *             type: 'radar',
 *             xField: 'name',
 *             yField: 'data3',
 *             showInLegend: true,
 *             showMarkers: true,
 *             markerConfig: {
 *                 radius: 5,
 *                 size: 5
 *             },
 *             style: {
 *                 'stroke-width': 2,
 *                 fill: 'none'
 *             }
 *         },{
 *             type: 'radar',
 *             xField: 'name',
 *             yField: 'data2',
 *             showMarkers: true,
 *             showInLegend: true,
 *             markerConfig: {
 *                 radius: 5,
 *                 size: 5
 *             },
 *             style: {
 *                 'stroke-width': 2,
 *                 fill: 'none'
 *             }
 *         },{
 *             type: 'radar',
 *             xField: 'name',
 *             yField: 'data5',
 *             showMarkers: true,
 *             showInLegend: true,
 *             markerConfig: {
 *                 radius: 5,
 *                 size: 5
 *             },
 *             style: {
 *                 'stroke-width': 2,
 *                 fill: 'none'
 *             }
 *         }]
 *     });
 *
 * In this configuration we add three series to the chart. Each of these series is bound to the same categories field, `name` but bound to different properties for each category,
 * `data1`, `data2` and `data3` respectively. All series display markers by having `showMarkers` enabled. The configuration for the markers of each series can be set by adding properties onto
 * the markerConfig object. Finally we override some theme styling properties by adding properties to the `style` object.
 *
 * @xtype radar
 */
Ext.define('Ext.chart.series.Radar', { 
 
    extend: 'Ext.chart.series.Series',

    type: "radar",

    rad: Math.PI / 180,



    /**
     * @cfg {Object} style
     * An object containing styles for overriding series styles from Theming.
     */

    config: {
        /**
         * @cfg {Number} rotation
         * The angle in degrees at which the first marker should be.
         */
        rotation: 0,
        /**
         * @cfg {Boolean} showMarkers
         * Whether markers should be displayed at the data points along the line. If true,
         * then the {@link #markerConfig} config item will determine the markers' styling.
         */
        showMarkers: null,

        showInLegend: false,
        /**
         * @cfg {Object} markerConfig
         * The display style for the markers. Only used if {@link #showMarkers} is true.
         * The markerConfig is a configuration object containing the same set of properties defined in
         * the Sprite class. For example, if we were to set red circles as markers to the line series we could
         * pass the object:
         *
         <pre><code>
            markerConfig: {
                type: 'circle',
                radius: 4,
                'fill': '#f00'
            }
         </code></pre>

         */
        markerConfig: null,
         /**
         * @cfg {String} xField
         * The store record field name for the labels used in the radar series.
         */
        xField: null,
         /**
         * @cfg {Object} yField
         * The store record field name for the deflection of the graph in the radar series.
         */
        yField: null
    },

    constructor: function(config) {
        this.callParent(arguments);
        
        var me = this,
            surface = me.getSurface();

        me.group = surface.getGroup(me.seriesId);
        if (me.getShowMarkers()) {
            me.markerGroup = surface.getGroup(me.seriesId + '-markers');
        }
    },

    /**
     * Draws the series for the current chart.
     */
    drawSeries: function() {
        var me = this,
            group = me.group,
            chart = me.getChart(),
            field = me.field || me.getYField(),
            surface = me.getSurface(),
            chartBBox = chart.chartBBox,
            centerX, centerY,
            items,
            radius,
            maxValue = 0,
            fields = [],
            max = Math.max,
            cos = Math.cos,
            sin = Math.sin,
            rotation = -me.getRotation(),
            rad = Ext.draw.Draw.rad,
            angle,
            l = me.getRecordCount(),
            startPath, path, x, y, rho,
            nfields,
            seriesStyle = me.style,
            axis = chart.getAxes() && chart.getAxes().get(0),
            aggregate = !(axis && axis.getMaximum());

        if (me.fireEvent('beforedraw', me) === false) {
            return;
        }

        this.callParent();

        me.setBBox();

        maxValue = aggregate? 0 : (axis.getMaximum() || 0);

        //if the store is empty then there's nothing to draw
        if (!l || me.seriesIsHidden) {
            surface.getItems().hide(true);
            return;
        }

        me.unHighlightItem();
        me.cleanHighlights();

        centerX = me.centerX = (chartBBox.width / 2);
        centerY = me.centerY = (chartBBox.height / 2);
        me.radius = radius = Math.min(chartBBox.width, chartBBox.height) /2;
        me.items = items = [];

        if (aggregate) {
            //get all renderer fields
            chart.getSeries().each(function(series) {
                fields.push(series.getYField());
            });
            //get maxValue to interpolate
            me.eachRecord(function(record, i) {
                for (i = 0, nfields = fields.length; i < nfields; i++) {
                    maxValue = max(+record.get(fields[i]), maxValue);
                }
            });
        }
        //ensure non-zero value.
        maxValue = maxValue || 1;
        //create path and items
        startPath = []; path = [];
        me.eachRecord(function(record, i) {
            rho = radius * record.get(field) / maxValue;
            angle = rad(i / l * 360);
            x = rho * cos(angle);
            y = rho * sin(angle);
            if (i == 0) {
                path.push('M', x + centerX, y + centerY);
                startPath.push('M', 0.01 * x + centerX, 0.01 * y + centerY);
            } else {
                path.push('L', x + centerX, y + centerY);
                startPath.push('L', 0.01 * x + centerX, 0.01 * y + centerY);
            }
            items.push({
                sprite: false, //TODO(nico): add markers
                point: [centerX + x, centerY + y],
                series: me
            });
        });
        path.push('Z');
        //create path sprite
        if (!me.radar) {
            me.radar = surface.add(Ext.apply({
                type: 'path',
                group: group,
                path: startPath
            }, seriesStyle || {}));
        }
        //reset on resizing
        if (chart.resizing) {
            me.radar.setAttributes({
                path: startPath
            }, true);
        }
        //render/animate
        me.radar.show(true);
        if (chart.getAnimate()) {
            me.onAnimate(me.radar, {
                to: Ext.apply({
                    path: path
                }, seriesStyle || {})
            });
        } else {
            me.radar.setAttributes(Ext.apply({
                path: path
            }, seriesStyle || {}), true);
        }
        me.radar.setAttributes({rotate: {
            degrees: rotation,
            x: centerX,
            y: centerY
        }});
        //render markers, labels and callouts
        if (me.getShowMarkers()) {
            me.drawMarkers();
        }
        me.renderLabels();
        me.renderCallouts();

        me.fireEvent('draw', me);
    },

    // @private draws the markers for the lines (if any).
    drawMarkers: function() {
        var me = this,
            chart = me.getChart(),
            surface = me.getSurface(),
            markerStyle = Ext.apply({}, me.markerStyle.style || {}),
            endMarkerStyle = Ext.apply(markerStyle, me.getMarkerConfig()),
            items = me.items,
            type = endMarkerStyle.type,
            markerGroup = me.markerGroup,
            centerX = me.centerX,
            centerY = me.centerY,
            item, i, l, marker;

        delete endMarkerStyle.type;

        for (i = 0, l = items.length; i < l; i++) {
            item = items[i];
            marker = markerGroup.getAt(i);
            if (!marker) {
                marker = Ext.chart.Shape[type](surface, Ext.apply({
                    group: markerGroup,
                    x: 0,
                    y: 0,
                    translate: {
                        x: centerX,
                        y: centerY
                    }
                }, endMarkerStyle));
            }
            else {
                marker.show();
            }
            if (chart.resizing) {
                marker.setAttributes({
                    x: 0,
                    y: 0,
                    translate: {
                        x: centerX,
                        y: centerY
                    }
                }, true);
            }
            marker._to = {
                translate: {
                    x: item.point[0],
                    y: item.point[1]
                }
            };
            //render/animate
            if (chart.getAnimate()) {
                me.onAnimate(marker, {
                    to: marker._to
                });
            }
            else {
                marker.setAttributes(Ext.apply(marker._to, endMarkerStyle || {}), true);
            }
        }
    },

    isItemInPoint: function(x, y, item) {
        var point,
            tolerance = 10,
            abs = Math.abs;
        point = item.point;
        return (abs(point[0] - x) <= tolerance &&
                abs(point[1] - y) <= tolerance);
    },

    // @private callback for when creating a label sprite.
    onCreateLabel: function(storeItem, item) {
        var me = this,
            group = me.labelsGroup,
            config = me.label,
            centerX = me.centerX,
            centerY = me.centerY,
            rotation = -me.getRotation();

        return me.getSurface().add(Ext.apply({
            'type': 'text',
            'text-anchor': 'middle',
            'group': group,
            'x': centerX,
            'y': centerY,
            rotate: {
                degrees: rotation,
                x: centerX,
                y: centerY
            }
        }, config || {}));
    },

    // @private callback for when placing a label sprite.
    onPlaceLabel: function(label, storeItem, item, i, display, animate) {
        var me = this,
            chart = me.getChart(),
            resizing = chart.resizing,
            config = me.label,
            format = config.renderer,
            field = config.field,
            centerX = me.centerX,
            centerY = me.centerY,
            rotation = -me.getRotation(),
            opt = Ext.draw.Draw.rotate(item.point[0] - centerX, item.point[1] - centerY, Ext.draw.Draw.rad(rotation));
        opt.x += centerX;
        opt.y += centerY;

        label.setAttributes({
            text: format(storeItem.get(field)),
            hidden: true
        }, true);

        if (resizing) {
            label.setAttributes({
                x: centerX,
                y: centerY
            }, true);
        }

        if (animate) {
            label.show(true);
            me.onAnimate(label, {
                to: opt
            });
        } else {
            label.setAttributes(opt, true);
            label.show(true);
        }
    },

    // @private for toggling (show/hide) series.
    toggleAll: function(show) {
        var me = this,
            i, ln, shadow, shadows;
        if (!show) {
            me.superclass.hideAll.call(me);
        }
        else {
            me.superclass.showAll.call(me);
        }
        if (me.radar) {
            me.radar.setAttributes({
                hidden: !show
            }, true);
            //hide shadows too
            if (me.radar.shadows) {
                for (i = 0, shadows = me.radar.shadows, ln = shadows.length; i < ln; i++) {
                    shadow = shadows[i];
                    shadow.setAttributes({
                        hidden: !show
                    }, true);
                }
            }
        }
    },

    // @private hide all elements in the series.
    hideAll: function() {
        this.toggleAll(false);
        this.hideMarkers(0);
    },

    // @private show all elements in the series.
    showAll: function() {
        this.toggleAll(true);
    },

    // @private hide all markers that belong to `markerGroup`
    hideMarkers: function(index) {
        var me = this,
            count = me.markerGroup && me.markerGroup.getCount() || 0,
            i = index || 0;
        for (; i < count; i++) {
            me.markerGroup.getAt(i).hide(true);
        }
    },

    getLegendLabels: function() {
        var label = this.title || this.getYField();
        return label ? [label] : [];
    },

    reset: function() {
        this.setRotation(0);
        this.callParent();
    }

});


/**
 * @class Ext.chart.series.Scatter
 * @extends Ext.chart.series.Cartesian
 *
 * Creates a Scatter Chart. The scatter plot is useful when trying to display more than two variables in the same visualization.
 * These variables can be mapped into x, y coordinates and also to an element's radius/size, color, etc.
 * As with all other series, the Scatter Series must be appended in the *series* Chart array configuration. See the Chart
 * documentation for more information on creating charts. A typical configuration object for the scatter could be:
 *
 * {@img Ext.chart.series.Scatter/Ext.chart.series.Scatter.png Ext.chart.series.Scatter chart series}
 *
 *     var store = new Ext.data.JsonStore({
 *         fields: ['name', 'data1', 'data2', 'data3', 'data4', 'data5'],
 *         data: [
 *             {'name':'metric one', 'data1':10, 'data2':12, 'data3':14, 'data4':8, 'data5':13},
 *             {'name':'metric two', 'data1':7, 'data2':8, 'data3':16, 'data4':10, 'data5':3},
 *             {'name':'metric three', 'data1':5, 'data2':2, 'data3':14, 'data4':12, 'data5':7},
 *             {'name':'metric four', 'data1':2, 'data2':14, 'data3':6, 'data4':1, 'data5':23},
 *             {'name':'metric five', 'data1':27, 'data2':38, 'data3':36, 'data4':13, 'data5':33}
 *         ]
 *     });
 *
 *     new Ext.chart.Chart({
 *         renderTo: Ext.getBody(),
 *         width: 500,
 *         height: 300,
 *         animate: true,
 *         theme:'Category2',
 *         store: store,
 *         axes: [{
 *             type: 'Numeric',
 *             position: 'bottom',
 *             fields: ['data1', 'data2', 'data3'],
 *             title: 'Sample Values',
 *             grid: true,
 *             minimum: 0
 *         }, {
 *             type: 'Category',
 *             position: 'left',
 *             fields: ['name'],
 *             title: 'Sample Metrics'
 *         }],
 *         series: [{
 *             type: 'scatter',
 *             markerConfig: {
 *                 radius: 5,
 *                 size: 5
 *             },
 *             axis: 'left',
 *             xField: 'name',
 *             yField: 'data2'
 *         }, {
 *             type: 'scatter',
 *             markerConfig: {
 *                 radius: 5,
 *                 size: 5
 *             },
 *             axis: 'left',
 *             xField: 'name',
 *             yField: 'data3'
 *         }]
 *     });
 *
 * In this configuration we add three different categories of scatter series. Each of them is bound to a different field of the same data store,
 * `data1`, `data2` and `data3` respectively. All x-fields for the series must be the same field, in this case `name`.
 * Each scatter series has a different styling configuration for markers, specified by the `markerConfig` object. Finally we set the left axis as
 * axis to show the current values of the elements.
 *
 * @xtype scatter
 */
Ext.define('Ext.chart.series.Scatter', { 
 
    extend: 'Ext.chart.series.Cartesian',

    uses: ['Ext.chart.Shape'],
    
    type: 'scatter',

    config: {
        /**
         * @cfg {Boolean} showMarkers
         * Whether markers should be displayed at the data points along the line. If true,
         * then the {@link #markerConfig} config item will determine the markers' styling.
         */
        showMarkers: true,

        /**
         * @cfg {Object} markerConfig
         * The display style for the markers. Only used if {@link #showMarkers} is true.
         * The markerConfig is a configuration object containing the same set of properties defined in
         * the Sprite class. For example, if we were to set red circles as markers to the line series we could
         * pass the object:
         *
         <pre><code>
            markerConfig: {
                type: 'circle',
                radius: 4,
                'fill': '#f00'
            }
         </code></pre>

         */
        markerConfig: {}

        /**
         * @cfg {Object} style
         * Append styling properties to this object for it to override theme properties.
         */
    },

    constructor: function(config) {
        this.callParent(arguments);

        var me = this,
            surface = me.getSurface();
        me.group = surface.getGroup(me.seriesId);
    },

    // @private Get chart and data boundaries
    getBounds: function() {
        var me = this,
            chart = me.getChart(),
            count = me.getRecordCount(),
            boundAxes = me.getAxesForXAndYFields(),
            boundXAxis = boundAxes.xAxis,
            boundYAxis = boundAxes.yAxis,
            bbox, xScale, yScale, ln, minX, minY, maxX, maxY, i, axis, ends;

        me.setBBox();
        bbox = me.bbox;

        ends = chart.getAxes().get(boundXAxis).calcEnds();
        minX = ends.from;
        maxX = ends.to;

        ends = chart.getAxes().get(boundYAxis).calcEnds();
        minY = ends.from;
        maxY = ends.to;


        if (isNaN(minX)) {
            minX = 0;
            maxX = count - 1;
            xScale = bbox.width / (count - 1);
        }
        else {
            xScale = bbox.width / (maxX - minX);
        }

        if (isNaN(minY)) {
            minY = 0;
            maxY = count - 1;
            yScale = bbox.height / (count - 1);
        }
        else {
            yScale = bbox.height / (maxY - minY);
        }

        return {
            bbox: bbox,
            minX: minX,
            minY: minY,
            xScale: xScale,
            yScale: yScale
        };
    },

    // @private Build an array of paths for the chart
    getPaths: function() {
        var me = this,
            chart = me.getChart(),
            chartAxes = chart.getAxes(),
            enableShadows = chart.getShadow(),
            group = me.group,
            bounds = me.bounds = me.getBounds(),
            bbox = me.bbox,
            xScale = bounds.xScale,
            yScale = bounds.yScale,
            minX = bounds.minX,
            minY = bounds.minY,
            boundAxes = me.getAxesForXAndYFields(),
            boundXAxis = boundAxes.xAxis,
            boundYAxis = boundAxes.yAxis,
            boxX = bbox.x,
            boxY = bbox.y,
            boxHeight = bbox.height,
            attrs = [],
            x, y, xValue, yValue, sprite;

        me.items = [];

        me.eachRecord(function(record, i) {
            xValue = record.get(me.getXField());
            yValue = record.get(me.getYField());
            //skip undefined values
            if (typeof yValue == 'undefined' || (typeof yValue == 'string' && !yValue)) {
                //<debug warn>
                if (Ext.isDefined(Ext.global.console)) {
                    Ext.global.console.warn("[Ext.chart.series.Scatter]  Skipping a store element with an undefined value at ", record, xValue, yValue);
                }
                //</debug>
                return;
            }
            // Ensure a value
            if (typeof xValue == 'string' || typeof xValue == 'object'
                //set as uniform distribution if the axis is a category axis.
                || boundXAxis && chartAxes.get(boundXAxis).type == 'category') {
                xValue = i;
            }

            // Ensure a value
            if (typeof yValue == 'string' || typeof yValue == 'object'
                //set as uniform distribution if the axis is a category axis.
                || boundYAxis && chartAxes.get(boundYAxis).type == 'category') {
                yValue = i;
            }

            x = boxX + (xValue - minX) * xScale;
            y = boxY + boxHeight - (yValue - minY) * yScale;
            attrs.push({
                x: x,
                y: y
            });

            me.items.push({
                series: me,
                value: [xValue, yValue],
                point: [x, y],
                storeItem: record
            });

        });

        return attrs;
    },

    // @private create a new point
    createPoint: function(attr, type) {
        var me = this,
            group = me.group,
            bbox = me.bbox;

        return Ext.chart.Shape[type](me.getSurface(), Ext.apply({}, {
            x: 0,
            y: 0,
            group: group,
            translate: {
                x: (bbox.x + bbox.width) / 2,
                y: (bbox.y + bbox.height) / 2
            }
        }, attr));
    },

    // @private create a new set of shadows for a sprite
    createShadow: function(sprite, endMarkerStyle, type) {
        var me = this,
            shadowGroups = me.shadowGroups,
            shadowAttributes = me.getShadowAttributes(),
            lnsh = shadowGroups.length,
            bbox = me.bbox,
            i, shadow, shadows, attr;

        sprite.shadows = shadows = [];

        for (i = 0; i < lnsh; i++) {
            attr = Ext.apply({}, shadowAttributes[i]);
            if (attr.translate) {
                attr.translate.x += (bbox.x + bbox.width) / 2;
                attr.translate.y += (bbox.y + bbox.height) / 2;
            }
            else {
                Ext.apply(attr, {
                    translate: {
                        x: (bbox.x + bbox.width) / 2,
                        y: (bbox.y + bbox.height) / 2
                    }
                });
            }
            Ext.apply(attr, endMarkerStyle);
            shadow = Ext.chart.Shape[type](me.getSurface(), Ext.apply({}, {
                x: 0,
                y: 0,
                group: shadowGroups[i]
            }, attr));
            shadows.push(shadow);
        }
    },

    /**
     * Draws the series for the current chart.
     */
    drawSeries: function() {
        var me = this,
            chart = me.getChart(),
            store = chart.substore || chart.getStore(),
            group = me.group,
            enableShadows = chart.getShadow(),
            shadowGroups = me.shadowGroups,
            shadowAttributes = me.getShadowAttributes(),
            lnsh = shadowGroups.length,
            sprite, attrs, attr, ln, i, endMarkerStyle, shindex, type, shadows,
            rendererAttributes, shadowAttribute;

        if (me.fireEvent('beforedraw', me) === false) {
            return;
        }

        Ext.chart.series.Scatter.superclass.drawSeries.call(this);

        endMarkerStyle = Ext.apply(me.markerStyle.style || {}, me.getMarkerConfig());
        type = endMarkerStyle.type;
        delete endMarkerStyle.type;

        //if the store is empty then there's nothing to be rendered
        if (!me.getRecordCount() || me.seriesIsHidden) {
            me.getSurface().getItems().hide(true);
            return;
        }

        me.unHighlightItem();
        me.cleanHighlights();

        attrs = me.getPaths();
        ln = attrs.length;
        for (i = 0; i < ln; i++) {
            attr = attrs[i];
            sprite = group.getAt(i);
            attr = Ext.apply({
                translate: {
                    x: attr.x,
                    y: attr.y
                }
            }, endMarkerStyle);
            // Create a new sprite if needed (no height)
            if (!sprite) {
                sprite = me.createPoint(attr, type);
                if (enableShadows) {
                    me.createShadow(sprite, endMarkerStyle, type);
                    sprite.setAttributes(me.getShadowOptions(), true);
                }
            }

            shadows = sprite.shadows;
            if (chart.getAnimate()) {
                rendererAttributes = me.getRenderer()(sprite, store.getAt(i), attr, i, store);
                me.onAnimate(sprite, {
                    to: rendererAttributes
                });
                //animate shadows
                for (shindex = 0; shindex < lnsh; shindex++) {
                    shadowAttribute = Ext.apply({}, shadowAttributes[shindex]);
                    rendererAttributes = me.getRenderer()(shadows[shindex], store.getAt(i), Ext.apply({}, {
                        translate: {
                            x: attr.x + (shadowAttribute.translate? shadowAttribute.translate.x : 0),
                            y: attr.y + (shadowAttribute.translate? shadowAttribute.translate.y : 0)
                        }
                    }, shadowAttribute), i, store);
                    me.onAnimate(shadows[shindex], { to: rendererAttributes });
                }
            }
            else {
                rendererAttributes = me.getRenderer()(sprite, store.getAt(i), attr, i, store);
                sprite._to = rendererAttributes;
                sprite.setAttributes(rendererAttributes, true);
                //update shadows
                for (shindex = 0; shindex < lnsh; shindex++) {
                    shadowAttribute = Ext.apply({}, shadowAttributes[shindex]);
                    rendererAttributes = me.getRenderer()(shadows[shindex], store.getAt(i), Ext.apply({}, {
                        translate: {
                            x: attr.x + (shadowAttribute.translate? shadowAttribute.translate.x : 0),
                            y: attr.y + (shadowAttribute.translate? shadowAttribute.translate.y : 0)
                        }
                    }, shadowAttribute), i, store);
                    shadows[shindex].setAttributes(rendererAttributes, true);
                }
            }
            me.items[i].sprite = sprite;
        }

        // Hide unused sprites
        ln = group.getCount();
        for (i = attrs.length; i < ln; i++) {
            group.getAt(i).hide(true);
        }
        me.renderLabels();
        me.renderCallouts();

        me.fireEvent('draw', me);
    },

    // @private callback for when creating a label sprite.
    onCreateLabel: function(storeItem, item, i, display) {
        var me = this,
            group = me.labelsGroup,
            config = me.label,
            endLabelStyle = Ext.apply({}, config, me.labelStyle.style || {}),
            bbox = me.bbox;

        return me.getSurface().add(Ext.apply({
            type: 'text',
            group: group,
            x: item.point[0],
            y: bbox.y + bbox.height / 2
        }, endLabelStyle));
    },

    // @private callback for when placing a label sprite.
    onPlaceLabel: function(label, storeItem, item, i, display, animate) {
        var me = this,
            chart = me.getChart(),
            resizing = chart.resizing,
            config = me.label,
            format = config.renderer,
            field = config.field,
            bbox = me.bbox,
            x = item.point[0],
            y = item.point[1],
            radius = item.sprite.attr.radius,
            bb, width, height, anim;

        label.setAttributes({
            text: format(storeItem.get(field)),
            hidden: true
        }, true);

        if (display == 'rotate') {
            label.setAttributes({
                'text-anchor': 'start',
                'rotation': {
                    x: x,
                    y: y,
                    degrees: -45
                }
            }, true);
            //correct label position to fit into the box
            bb = label.getBBox();
            width = bb.width;
            height = bb.height;
            x = x < bbox.x? bbox.x : x;
            x = (x + width > bbox.x + bbox.width)? (x - (x + width - bbox.x - bbox.width)) : x;
            y = (y - height < bbox.y)? bbox.y + height : y;

        } else if (display == 'under' || display == 'over') {
            //TODO(nicolas): find out why width/height values in circle bounding boxes are undefined.
            bb = item.sprite.getBBox();
            bb.width = bb.width || (radius * 2);
            bb.height = bb.height || (radius * 2);
            y = y + (display == 'over'? -bb.height : bb.height);
            //correct label position to fit into the box
            bb = label.getBBox();
            width = bb.width/2;
            height = bb.height/2;
            x = x - width < bbox.x ? bbox.x + width : x;
            x = (x + width > bbox.x + bbox.width) ? (x - (x + width - bbox.x - bbox.width)) : x;
            y = y - height < bbox.y? bbox.y + height : y;
            y = (y + height > bbox.y + bbox.height) ? (y - (y + height - bbox.y - bbox.height)) : y;
        }

        if (!chart.getAnimate()) {
            label.setAttributes({
                x: x,
                y: y
            }, true);
            label.show(true);
        }
        else {
            if (resizing) {
                anim = item.sprite.getActiveAnimation();
                if (anim) {
                    anim.on('afteranimate', function() {
                        label.setAttributes({
                            x: x,
                            y: y
                        }, true);
                        label.show(true);
                    });
                }
                else {
                    label.show(true);
                }
            }
            else {
                me.onAnimate(label, {
                    to: {
                        x: x,
                        y: y
                    }
                });
            }
        }
    },

    // @private callback for when placing a callout sprite.
    onPlaceCallout: function(callout, storeItem, item, i, display, animate, index) {
        var me = this,
            chart = me.getChart(),
            cur = item.point,
            normal,
            bbox = callout.label.getBBox(),
            offsetFromViz = 30,
            offsetBox = 3,
            boxx, boxy, boxw, boxh,
            p, clipRect = me.bbox,
            x, y;

        //position
        normal = [Math.cos(Math.PI /4), -Math.sin(Math.PI /4)];
        x = cur[0] + normal[0] * offsetFromViz;
        y = cur[1] + normal[1] * offsetFromViz;

        //box position and dimensions
        boxx = x + (normal[0] > 0? 0 : -(bbox.width + 2 * offsetBox));
        boxy = y - bbox.height /2 - offsetBox;
        boxw = bbox.width + 2 * offsetBox;
        boxh = bbox.height + 2 * offsetBox;

        //now check if we're out of bounds and invert the normal vector correspondingly
        //this may add new overlaps between labels (but labels won't be out of bounds).
        if (boxx < clipRect[0] || (boxx + boxw) > (clipRect[0] + clipRect[2])) {
            normal[0] *= -1;
        }
        if (boxy < clipRect[1] || (boxy + boxh) > (clipRect[1] + clipRect[3])) {
            normal[1] *= -1;
        }

        //update positions
        x = cur[0] + normal[0] * offsetFromViz;
        y = cur[1] + normal[1] * offsetFromViz;

        //update box position and dimensions
        boxx = x + (normal[0] > 0? 0 : -(bbox.width + 2 * offsetBox));
        boxy = y - bbox.height /2 - offsetBox;
        boxw = bbox.width + 2 * offsetBox;
        boxh = bbox.height + 2 * offsetBox;

        if (chart.getAnimate()) {
            //set the line from the middle of the pie to the box.
            me.onAnimate(callout.lines, {
                to: {
                    path: ["M", cur[0], cur[1], "L", x, y, "Z"]
                }
            }, true);
            //set box position
            me.onAnimate(callout.box, {
                to: {
                    x: boxx,
                    y: boxy,
                    width: boxw,
                    height: boxh
                }
            }, true);
            //set text position
            me.onAnimate(callout.label, {
                to: {
                    x: x + (normal[0] > 0? offsetBox : -(bbox.width + offsetBox)),
                    y: y
                }
            }, true);
        } else {
            //set the line from the middle of the pie to the box.
            callout.lines.setAttributes({
                path: ["M", cur[0], cur[1], "L", x, y, "Z"]
            }, true);
            //set box position
            callout.box.setAttributes({
                x: boxx,
                y: boxy,
                width: boxw,
                height: boxh
            }, true);
            //set text position
            callout.label.setAttributes({
                x: x + (normal[0] > 0? offsetBox : -(bbox.width + offsetBox)),
                y: y
            }, true);
        }
        for (p in callout) {
            callout[p].show(true);
        }
    },

    // @private handles sprite animation for the series.
    onAnimate: function(sprite, attr) {
        sprite.show();
        Ext.chart.series.Scatter.superclass.onAnimate.apply(this, arguments);
    },

    isItemInPoint: function(x, y, item) {
        var point,
            tolerance = 10;

        point = item.point;
        return (point[0] - tolerance <= x && point[0] + tolerance >= x &&
            point[1] - tolerance <= y && point[1] + tolerance >= y);
    }
});


/**
 * @class Ext.chart.series.Area
 * @extends Ext.chart.series.Cartesian
 * 
 <p>
    Creates a Stacked Area Chart. The stacked area chart is useful when displaying multiple aggregated layers of information.
    As with all other series, the Area Series must be appended in the *series* Chart array configuration. See the Chart 
    documentation for more information. A typical configuration object for the area series could be:
 </p>
{@img Ext.chart.series.Area/Ext.chart.series.Area.png Ext.chart.series.Area chart series} 
  <pre><code>
   var store = new Ext.data.JsonStore({
        fields: ['name', 'data1', 'data2', 'data3', 'data4', 'data5'],
        data: [
            {'name':'metric one', 'data1':10, 'data2':12, 'data3':14, 'data4':8, 'data5':13},
            {'name':'metric two', 'data1':7, 'data2':8, 'data3':16, 'data4':10, 'data5':3},
            {'name':'metric three', 'data1':5, 'data2':2, 'data3':14, 'data4':12, 'data5':7},
            {'name':'metric four', 'data1':2, 'data2':14, 'data3':6, 'data4':1, 'data5':23},
            {'name':'metric five', 'data1':27, 'data2':38, 'data3':36, 'data4':13, 'data5':33}                                                
        ]
    });
    
    new Ext.chart.Chart({
        renderTo: Ext.getBody(),
        width: 500,
        height: 300,
        store: store,
        axes: [{
            type: 'Numeric',
            grid: true,
            position: 'left',
            fields: ['data1', 'data2', 'data3', 'data4', 'data5'],
            title: 'Sample Values',
            grid: {
                odd: {
                    opacity: 1,
                    fill: '#ddd',
                    stroke: '#bbb',
                    'stroke-width': 1
                }
            },
            minimum: 0,
            adjustMinimumByMajorUnit: 0
        }, {
            type: 'Category',
            position: 'bottom',
            fields: ['name'],
            title: 'Sample Metrics',
            grid: true,
            label: {
                rotate: {
                    degrees: 315
                }
            }
        }],
        series: [{
            type: 'area',
            highlight: false,
            axis: 'left',
            xField: 'name',
            yField: ['data1', 'data2', 'data3', 'data4', 'data5'],
            style: {
                opacity: 0.93
            }
        }]
    });
   </code></pre>
 
  
 <p>
  In this configuration we set `area` as the type for the series, set highlighting options to true for highlighting elements on hover, 
  take the left axis to measure the data in the area series, set as xField (x values) the name field of each element in the store, 
  and as yFields (aggregated layers) seven data fields from the same store. Then we override some theming styles by adding some opacity 
  to the style object.
 </p>
  
 * @xtype area
 * 
 */
Ext.define('Ext.chart.series.Area', { 
 
    extend: 'Ext.chart.series.Cartesian',

    config : {
        highlightCfg: {
            lineWidth: 3,
            stroke: '#55c',
            opacity: 0.8,
            color: '#f00'
        }
    },

    type: 'area',

    // @private Area charts are alyways stacked
    stacked: true,

    /**
     * @cfg {Object} style 
     * Append styling properties to this object for it to override theme properties.
     */

    constructor: function(config) {
        this.callParent(arguments);
        
        var me = this,
            i, l;

        if (me.getHighlight()) {
            me.highlightMark = me.getSurface().add({
                type: 'path',
                path: ['M', 0, 0],
                zIndex: 1000,
                opacity: 0.3,
                lineWidth: 5,
                hidden: true,
                stroke: '#444'
            });
        }
    },

    // @private Shrinks dataSets down to a smaller size
    shrink: function(xValues, yValues, size) {
        var len = xValues.length,
            ratio = Math.floor(len / size),
            i, j,
            xSum = 0,
            yCompLen = this.areas.length,
            ySum = [],
            xRes = [],
            yRes = [];
        //initialize array
        for (j = 0; j < yCompLen; ++j) {
            ySum[j] = 0;
        }
        for (i = 0; i < len; ++i) {
            xSum += xValues[i];
            for (j = 0; j < yCompLen; ++j) {
                ySum[j] += yValues[i][j];
            }
            if (i % ratio == 0) {
                //push averages
                xRes.push(xSum/ratio);
                for (j = 0; j < yCompLen; ++j) {
                    ySum[j] /= ratio;
                }
                yRes.push(ySum);
                //reset sum accumulators
                xSum = 0;
                for (j = 0, ySum = []; j < yCompLen; ++j) {
                    ySum[j] = 0;
                }
            }
        }
        return {
            x: xRes,
            y: yRes
        };
    },

    // @private Get chart and data boundaries
    getBounds: function() {
        var me = this,
            chart = me.getChart(),
            xValues = [],
            allYValues = [],
            infinity = Infinity,
            minX = infinity,
            maxX = -infinity,
            minY, maxY,
            math = Math,
            mmin = math.min,
            mmax = math.max,
            bbox, xScale, yScale, ln, sumValues, axis, out, recordYValues;

        me.setBBox();
        bbox = me.bbox;

        // Run through the axis
        if (me.axis) {
            axis = chart.getAxes().get(me.axis);
            if (axis) {
                out = axis.calcEnds();
                minY = out.from;
                maxY = out.to;
            }
        }

        if (me.getYField() && !Ext.isNumber(minY)) {
            axis = new Ext.chart.axis.Numeric({
                chart: chart,
                fields: [].concat(me.getYField())
            });
            out = axis.calcEnds();
            minY = out.from;
            maxY = out.to;
        }

        if (!Ext.isNumber(minY)) {
            minY = 0;
        }
        if (!Ext.isNumber(maxY)) {
            maxY = 0;
        }

        function eachYValue(yValue) {
            if (typeof yValue == 'number') {
                recordYValues.push(yValue);
            }
        }

        me.eachRecord(function(record, i) {
            var xValue = record.get(me.getXField());
            if (typeof xValue != 'number') {
                xValue = i;
            }
            xValues.push(xValue);

            recordYValues = [];
            me.eachYValue(record, eachYValue);

            minX = math.min(minX, xValue);
            maxX = math.max(maxX, xValue);
            allYValues.push(recordYValues);
        });

        xScale = bbox.width / ((maxX - minX) || 1);
        yScale = bbox.height / ((maxY - minY) || 1);

        ln = xValues.length;
        if ((ln > bbox.width) && me.areas) {
            sumValues = me.shrink(xValues, allYValues, bbox.width);
            xValues = sumValues.x;
            allYValues = sumValues.y;
        }

        return {
            bbox: bbox,
            minX: minX,
            minY: minY,
            xValues: xValues,
            yValues: allYValues,
            xScale: xScale,
            yScale: yScale,
            areasLen: me.getYValueCount()
        };
    },

    // @private Build an array of paths for the chart
    getPaths: function() {
        var me = this,
            first = true,
            bounds = me.getBounds(),
            bbox = bounds.bbox,
            items = me.items = [],
            componentPaths = [],
            componentPath,
            paths = [],
            i, ln, x, y, xValue, yValue, acumY, areaIndex, prevAreaIndex, areaElem, path;

        ln = bounds.xValues.length;
        // Start the path
        for (i = 0; i < ln; i++) {
            xValue = bounds.xValues[i];
            yValue = bounds.yValues[i];
            x = bbox.x + (xValue - bounds.minX) * bounds.xScale;
            acumY = 0;
            for (areaIndex = 0; areaIndex < bounds.areasLen; areaIndex++) {
                if (!items[areaIndex]) {
                    items[areaIndex] = {
                        pointsUp: [],
                        pointsDown: [],
                        series: me
                    };
                }
                if (!componentPaths[areaIndex]) {
                    componentPaths[areaIndex] = [];
                }
                areaElem = me.isExcluded(areaIndex) ? 0 : yValue[areaIndex];
                acumY += areaElem;
                y = bbox.y + bbox.height - (acumY - bounds.minY) * bounds.yScale;
                if (!paths[areaIndex]) {
                    paths[areaIndex] = ['M', x, y];
                    componentPaths[areaIndex].push(['L', x, y]);
                } else {
                    paths[areaIndex].push('L', x, y);
                    componentPaths[areaIndex].push(['L', x, y]);
                }
                items[areaIndex].pointsUp.push([x, y]);
            }
        }
        
        // Close the paths
        for (areaIndex = 0; areaIndex < bounds.areasLen; areaIndex++) {
            path = paths[areaIndex];
            // Close bottom path to the axis
            if (areaIndex == 0 || first) {
                first = false;
                path.push('L', x, bbox.y + bbox.height,
                          'L', bbox.x, bbox.y + bbox.height,
                          'Z');
            }
            // Close other paths to the one before them
            else {
                componentPath = componentPaths[prevAreaIndex];
                componentPath.reverse();
                path.push('L', x, componentPath[0][2]);
                for (i = 0; i < ln; i++) {
                    path.push(componentPath[i][0],
                              componentPath[i][1],
                              componentPath[i][2]);
                    items[areaIndex].pointsDown[ln -i -1] = [componentPath[i][1], componentPath[i][2]];
                }
                path.push('L', bbox.x, path[2], 'Z');
            }
            prevAreaIndex = areaIndex;
        }
        return {
            paths: paths,
            areasLen: bounds.areasLen
        };
    },

    /**
     * Draws the series for the current chart.
     */
    drawSeries: function() {
        var me = this,
            chart = me.getChart(),
            store = chart.substore || chart.store,
            surface = me.getSurface(),
            animate = chart.getAnimate(),
            group = me.group,
            areas = me.areas,
            endLineStyle = me.style,
            colors = chart.getColorsStyle(),
            colorArrayLength = colors && colors.length || 0,
            areaIndex, areaElem, paths, path, rendererAttributes,
            excludes;

        if (me.fireEvent('beforedraw', me) === false) {
            return;
        }

        this.callParent();
        me.unHighlightItem();
        me.cleanHighlights();

        if (!me.getRecordCount()) {
            surface.getItems().hide(true);
            return;
        }
        
        paths = me.getPaths();

        if (!areas) {
            areas = me.areas = [];
        }

        for (areaIndex = 0; areaIndex < paths.areasLen; areaIndex++) {
            if (!areas[areaIndex]) {
                me.items[areaIndex].sprite = areas[areaIndex] = surface.add(Ext.apply({}, {
                    type: 'path',
                    group: group,
                    // 'clip-rect': me.clipBox,
                    path: paths.paths[areaIndex],
                    stroke: endLineStyle.stroke || colors[areaIndex % colorArrayLength],
                    fill: colors[areaIndex % colorArrayLength]
                }, endLineStyle || {}));
            }
            areaElem = areas[areaIndex];
            path = paths.paths[areaIndex];
            if (animate) {
                //Add renderer to line. There is not a unique record associated with this.
                rendererAttributes = me.getRenderer()(areaElem, false, {
                    path: path,
                    hidden: me.isExcluded(areaIndex),
                    fill: colors[areaIndex % colorArrayLength],
                    stroke: endLineStyle.stroke || colors[areaIndex % colorArrayLength]
                }, areaIndex, store);
                //fill should not be used here but when drawing the special fill path object
                me.animation = me.onAnimate(areaElem, {
                    to: rendererAttributes
                });
            } else {
                rendererAttributes = me.getRenderer()(areaElem, false, {
                    path: path,
                    hidden: me.isExcluded(areaIndex),
                    fill: colors[areaIndex % colorArrayLength],
                    stroke: endLineStyle.stroke || colors[areaIndex % colorArrayLength]
                }, areaIndex, store);
                areas[areaIndex].setAttributes(rendererAttributes, true);
            }
        }

        // Hide leftover area sprites
        for (; areaIndex < areas.length; areaIndex++) {
            areas[areaIndex].hide();
        }

        me.renderLabels();
        me.renderCallouts();

        me.fireEvent('draw', me);
    },

    // @private
    onAnimate: function(sprite, attr) {
        sprite.show();
        Ext.chart.series.Area.superclass.onAnimate.apply(this, arguments);
    },

    // @private
    onCreateLabel: function(storeItem, item, i, display) {
        var me = this,
            group = me.labelsGroup,
            config = me.label,
            bbox = me.bbox,
            endLabelStyle = Ext.apply({}, config, me.labelStyle.style);

        return me.getSurface().add(Ext.apply({
            'type': 'text',
            'text-anchor': 'middle',
            'group': group,
            'x': item.point[0],
            'y': bbox.y + bbox.height / 2
        }, endLabelStyle || {}));
    },

    // @private
    onPlaceLabel: function(label, storeItem, item, i, display, animate, index) {
        var me = this,
            chart = me.getChart(),
            resizing = chart.resizing,
            config = me.label,
            format = config.renderer,
            field = config.field,
            bbox = me.bbox,
            x = item.point[0],
            y = item.point[1],
            bb, width, height;
        
        label.setAttributes({
            text: format(storeItem.get(field[index])),
            hidden: true
        }, true);
        
        bb = label.getBBox();
        width = bb.width / 2;
        height = bb.height / 2;
        
        x = x - width < bbox.x? bbox.x + width : x;
        x = (x + width > bbox.x + bbox.width) ? (x - (x + width - bbox.x - bbox.width)) : x;
        y = y - height < bbox.y? bbox.y + height : y;
        y = (y + height > bbox.y + bbox.height) ? (y - (y + height - bbox.y - bbox.height)) : y;

        if (me.getChart().getAnimate() && !me.getChart().resizing) {
            label.show(true);
            me.onAnimate(label, {
                to: {
                    x: x,
                    y: y
                }
            });
        } else {
            label.setAttributes({
                x: x,
                y: y
            }, true);
            if (resizing) {
                me.animation.on('afteranimate', function() {
                    label.show(true);
                });
            } else {
                label.show(true);
            }
        }
    },

    // @private
    onPlaceCallout : function(callout, storeItem, item, i, display, animate, index) {
        var me = this,
            chart = me.getChart(),
            surface = me.getSurface(),
            resizing = chart.resizing,
            config = me.callouts,
            items = me.items,
            prev = (i == 0) ? false : items[i -1].point,
            next = (i == items.length -1) ? false : items[i +1].point,
            cur = item.point,
            dir, norm, normal, a, aprev, anext,
            bbox = callout.label.getBBox(),
            offsetFromViz = 30,
            offsetToSide = 10,
            offsetBox = 3,
            boxx, boxy, boxw, boxh,
            p, clipRect = me.clipRect,
            x, y;

        //get the right two points
        if (!prev) {
            prev = cur;
        }
        if (!next) {
            next = cur;
        }
        a = (next[1] - prev[1]) / (next[0] - prev[0]);
        aprev = (cur[1] - prev[1]) / (cur[0] - prev[0]);
        anext = (next[1] - cur[1]) / (next[0] - cur[0]);
        
        norm = Math.sqrt(1 + a * a);
        dir = [1 / norm, a / norm];
        normal = [-dir[1], dir[0]];
        
        //keep the label always on the outer part of the "elbow"
        if (aprev > 0 && anext < 0 && normal[1] < 0 || aprev < 0 && anext > 0 && normal[1] > 0) {
            normal[0] *= -1;
            normal[1] *= -1;
        } else if (Math.abs(aprev) < Math.abs(anext) && normal[0] < 0 || Math.abs(aprev) > Math.abs(anext) && normal[0] > 0) {
            normal[0] *= -1;
            normal[1] *= -1;
        }

        //position
        x = cur[0] + normal[0] * offsetFromViz;
        y = cur[1] + normal[1] * offsetFromViz;
        
        //box position and dimensions
        boxx = x + (normal[0] > 0? 0 : -(bbox.width + 2 * offsetBox));
        boxy = y - bbox.height /2 - offsetBox;
        boxw = bbox.width + 2 * offsetBox;
        boxh = bbox.height + 2 * offsetBox;
        
        //now check if we're out of bounds and invert the normal vector correspondingly
        //this may add new overlaps between labels (but labels won't be out of bounds).
        if (boxx < clipRect[0] || (boxx + boxw) > (clipRect[0] + clipRect[2])) {
            normal[0] *= -1;
        }
        if (boxy < clipRect[1] || (boxy + boxh) > (clipRect[1] + clipRect[3])) {
            normal[1] *= -1;
        }

        //update positions
        x = cur[0] + normal[0] * offsetFromViz;
        y = cur[1] + normal[1] * offsetFromViz;
        
        //update box position and dimensions
        boxx = x + (normal[0] > 0? 0 : -(bbox.width + 2 * offsetBox));
        boxy = y - bbox.height /2 - offsetBox;
        boxw = bbox.width + 2 * offsetBox;
        boxh = bbox.height + 2 * offsetBox;
        
        //set the line from the middle of the pie to the box.
        callout.lines.setAttributes({
            path: ["M", cur[0], cur[1], "L", x, y, "Z"]
        }, true);
        //set box position
        callout.box.setAttributes({
            x: boxx,
            y: boxy,
            width: boxw,
            height: boxh
        }, true);
        //set text position
        callout.label.setAttributes({
            x: x + (normal[0] > 0? offsetBox : -(bbox.width + offsetBox)),
            y: y
        }, true);
        for (p in callout) {
            callout[p].show(true);
        }
    },
    
    isItemInPoint: function(x, y, item, i) {
        var me = this,
            pointsUp = item.pointsUp,
            pointsDown = item.pointsDown,
            abs = Math.abs,
            dist = Infinity, p, pln, point;
        
        for (p = 0, pln = pointsUp.length; p < pln; p++) {
            point = [pointsUp[p][0], pointsUp[p][1]];
            if (dist > abs(x - point[0])) {
                dist = abs(x - point[0]);
            } else {
                point = pointsUp[p -1];
                if (y >= point[1] && (!pointsDown.length || y <= (pointsDown[p -1][1]))) {
                    item.storeIndex = p -1;
                    item.storeField = me.getYField()[i];
                    item.storeItem = me.getChart().getStore().getAt(p -1);
                    item._points = pointsDown.length? [point, pointsDown[p -1]] : [point];
                    return true;
                } else {
                    break;
                }
            }
        }
        return false;
    },

    /**
     * Highlight this entire series.
     * @param {Object} item Info about the item; same format as returned by #getItemForPoint.
     */
    highlightSeries: function() {
        var area, to, fillColor;
        if (this._index !== undefined) {
            area = this.areas[this._index];
            area.__highlighted = true;
            area.__prevOpacity = area.__prevOpacity || area.attr.opacity || 1;
            area.__prevFill = area.__prevFill || area.attr.fill;
            area.__prevLineWidth = area.__prevLineWidth || area.attr.lineWidth;
            fillColor = Ext.draw.Color.fromString(area.__prevFill);
            to = {
                lineWidth: (area.__prevLineWidth || 0) + 2
            };
            if (fillColor) {
                to.fill = fillColor.getLighter(0.2).toString();
            }
            else {
                to.opacity = Math.max(area.__prevOpacity - 0.3, 0);
            }
            this.highlightSprite(area);
        }
    },

    /**
     * UnHighlight this entire series.
     * @param {Object} item Info about the item; same format as returned by #getItemForPoint.
     */
    unHighlightSeries: function() {
        var area;
        if (this._index !== undefined) {
            area = this.areas[this._index];
            this.unHighlightSprite(area);
        }
    },

    /**
     * Highlight the specified item. If no item is provided the whole series will be highlighted.
     * @param item {Object} Info about the item; same format as returned by #getItemForPoint
     */
    highlightItem: function(item) {
        var me = this,
            highlightMark = me.highlightMark,
            points, path;
        if (!item) {
            this.highlightSeries();
            return;
        }
        points = item._points;
        path = points.length == 2? ['M', points[0][0], points[0][1], 'L', points[1][0], points[1][1]] : ['M', points[0][0], points[0][1], 'L', points[0][0], me.bbox.y + me.bbox.height];
        if (highlightMark) {
            highlightMark.setAttributes(Ext.merge({
                path: path,
                hidden: false
            }, this.getHighlightCfg()), true);
        }
        //added for canvas rendering.
        me.getSurface().renderFrame();
    },

    /**
     * un-highlights the specified item. If no item is provided it will un-highlight the entire series.
     * @param item {Object} Info about the item; same format as returned by #getItemForPoint
     */
    unHighlightItem: function(item) {
        if (!item) {
            this.unHighlightSeries();
        }

        if (this.highlightMark) {
            this.highlightMark.hide(true);
        }
    },

    /**
     * Returns the color of the series (to be displayed as color for the series legend item).
     * @param item {Object} Info about the item; same format as returned by #getItemForPoint
     */
    getLegendColor: function(index) {
        var me = this,
            colors = me.getChart().getColorsStyle();
        return me.getColorFromStyle(colors[index % colors.length]);
    }
});

/**
 * @class Ext.chart.series.AbstractSpaceFilling
 * @extends Ext.chart.series.Series
 *
 * Contains main layout and rendering operations for space filling visualizations like Icicle or TreeMap.
 *
 * {@img Ext.chart.series.Icicle/Ext.chart.series.Icicle.png Ext.chart.series.Icicle Icicle visualization}
 *
 */

Ext.define('Ext.chart.series.AbstractSpaceFilling', {

    extend: 'Ext.chart.series.Series',

    showInLegend: false,

    title: {},

    /**
     * @cfg {String/Function} areaField
     * The name of the numeric field to be used to set the area of the rectangles. 
     * Can also be a function that gets a store item as first element and returns a number to be used 
     * for calculating the area of the rectangles. 
     * Default is `area`.
     */
     areaField: 'area',

    /**
     * @cfg {String/Function} colorField
     * The name of the color field to be used to set the area of the rectangles. 
     * Can also be a function that gets a store item as first element and returns a number to be used 
     * for calculating the area of the rectangles. 
     * Default is `color`.
     */
     colorField: 'color',

    
    /**
     * @cfg {Object} style
     * Append styling properties to this object for it to override theme properties.
     */

    constructor: function(config) {
        this.callParent(arguments);
        
        var me = this,
            surface = me.getSurface();

        Ext.apply(me, config, {
            style: {}
        });

        me.group = surface.getGroup(me.seriesId);
    },

    // @private Get chart and data boundaries
    getBounds: function() {
        var me = this,
            chart = me.getChart(),
            store = chart.getStore(),
            root = store.getRoot(),
            minValue = Infinity, 
            maxValue = -Infinity,
            areaField = me.areaField,
            getArea, bbox, maxArea;

        //convert to a function
        if (typeof areaField != 'function') {
            getArea = function(node) { return node.get(areaField); };
        } else {
            getArea = areaField;
        }
        me.areaField = getArea;

        //get bounding box
        me.setBBox();
        bbox = me.bbox;
        maxArea = bbox.width * bbox.height;

        //get max and min area values
        (function iterate(node) {
            var area = getArea(node),
                i, ch, len;
            if (node) {
                minValue = minValue > area ? area : minValue;
                maxValue = maxValue < area ? area : maxValue;
            }

            for (i = 0, ch = node.childNodes, len = ch.length; i < len; ++i) {
                iterate(ch[i]);
            }
        })(root);

        //set getArea to return the interpolated area values.
        me.getArea = function(node) {
            return (getArea(node) - minValue) / (maxValue - minValue) * maxArea;
        };

        return {
            bbox: bbox,
            minValue: minValue,
            maxValue: maxValue,
            area: bbox.width * bbox.height
        };
    },

    /**
     * Draws the visualization.
     */
    drawSeries: function() {
        var me = this,
            chart = me.getChart(),
            animate = chart.getAnimate(),
            store = chart.substore || chart.getStore(),
            group = me.group,
            titleHeight = me.titleHeight || 0,
            count = 0,
            leafCount = 0,
            labelsGroup = me.labelsGroup,
            leaf = function(item) {
                return !item.storeItem.childNodes.length;
            },
            descriptor, bbox, bounds, items, item, sprite, l, i, rendererAttributes;

        //somebody has prevented this series from drawing.
        if (me.fireEvent('beforedraw', me) === false) {
            return;
        }

        //if the store is empty then there's nothing to be rendered
        if (!store.getRoot().childNodes.length || me.seriesIsHidden) {
            me.getSurface().getItems().hide(true);
            return;
        }
        
        Ext.chart.series.AbstractSpaceFilling.superclass.drawSeries.call(this);

        //unhighlight all items before refreshing.
        me.unHighlightItem();
        me.cleanHighlights();

        //get bounds
        bounds = me.getBounds();
        bbox = bounds.bbox;

        //perform layout
        me.items = items = me.compute(bounds);

        //create sprites and render (or animate)
        for (i = 0, l = items.length; i < l; ++i) {
            item = items[i];
            item.series = me;
            
            if (leaf(item)) {
                me.renderLeaf(item, leafCount++, count++);
            } else {
                me.renderInner(item, leafCount++, count++);
            }
        }
        
        me.hideExtraElements(items.length, count);

        me.fireEvent('draw', me);
    },
    hideExtraElements: function(itemsLength, labelCount){
        var me = this,
            labelsGroup = me.labelsGroup,
            group = me.group,
            i, ln;

        // Hide unused sprites
        ln = group.getCount();
        for (i = itemsLength; i < ln; i++) {
            group.getAt(i).hide(true);
        }
        ln = labelsGroup.getCount();
        for(i = labelCount; i < ln;i++){
            labelsGroup.getAt(i).hide(true);
        }
    },

    //@private
    getOrCreateSprite: function(item, index) {
        var me = this,
            group = me.group,
            sprite = group.getAt(index),
            bbox = me.bbox;


        return sprite || me.getSurface().add({
            type: 'rect',
            x: 0,
            y: 0,
            width: 0,
            height: 0,
            group: group,
            translate: {
                x: (bbox.x + bbox.width) / 2,
                y: (bbox.y + bbox.height)/ 2
            }
        });
    },

    //@private
    getOrCreateLabel: function(item, index) {
        var me = this, 
            label = me.labelsGroup,
            sprite = label.getAt(index),
            titleHeight = me.titleHeight || 0,
            offset = me.offset || 0,
            bbox = me.bbox,
            node = item.storeItem,
            text =  node.get(me.titleField) || me.rootName,
            ans;

        ans = sprite || me.getSurface().add({
            type: 'text',
            text: text,
            font: Math.max((titleHeight - offset), 0) + 'px Arial',
            'text-align': 'center',
            x: 0,
            y: titleHeight / 2,
            fill: '#fff',
            group: label,
            width: 0,
            translate: {
                x: (bbox.x + bbox.width) / 2,
                y: (bbox.y + bbox.height)/ 2
            }
        });

        ans.setAttributes({
            text: text,
            hidden: false
        }, true);

        while (ans.getBBox().width > item.width && text.length >= 7) {
            text = text.slice(0, text.length / 2) + '...';
            ans.setAttributes({
                text: text
            }, true);
        }

        if ((/\.{3}$/.test(text) && text.length < 7) || ans.getBBox().height >= item.height) {
            ans.setAttributes({
                hidden: true
            }, true);
        }

        return ans;
    },

    /**
     * Renders the leaf node of the hierarchy.
     *
     * @param item {Object} An item containing information for the leaf node.
     * @param spriteIndex {Number} Uses this index to find the sprite to be used to render the leaf.
     * @param labelIndex {Number} Uses this index to find the label sprite to be used to render the leaf text.
     */
    renderLeaf: function(item, spriteIndex, labelIndex) {
        var me = this,
            animate = me.getChart().getAnimate(),
            sprite = me.getOrCreateSprite(item, spriteIndex),
            label = me.getOrCreateLabel(item, labelIndex),
            offset = (me.offset || 0) / 2,
            titleHeight = me.titleHeight || 0,
            getColor = typeof me.colorField == 'function' ? me.colorField : function(item) {
                return item.storeItem.get(me.colorField);
            },
            descriptorSprite = {
                fill: getColor(item),
                width: item.width - offset * 2,
                height: item.height - offset * 2,
                translate: {
                    x: item.x + offset,
                    y: item.y + offset
                }
            },
            descriptorLabel = {
                fill: me.label.fill || '#fff',
                width: item.width - offset * 2,
                'text-anchor': 'center',
                zIndex: 10000,
                translate: {
                    x: item.x + offset + item.width / 2,
                    y: item.y + offset + (item.height - Math.max(titleHeight, 0)) / 2
                }
            };
        
        item.sprite = sprite;

        //animate or render.
        if (animate) {
            me.onAnimate(sprite, {
                to: descriptorSprite
            });
            if (!label.attr.hidden) {
                me.onAnimate(label, {
                    to: descriptorLabel
                });
            }
        } else {
            sprite.setAttributes(descriptorSprite, true);
            label.setAttributes(descriptorLabel, true);
        }
    },

    /**
     * Renders an inner node of the hierarchy.
     *
     * @param item {Object} An item containing information for the leaf node.
     * @param spriteIndex {Number} Uses this index to find the sprite to be used to render the leaf.
     * @param labelIndex {Number} Uses this index to find the label sprite to be used to render the leaf text.
     */
    renderInner: function(item, spriteIndex, labelIndex) {
        if (!this.titleHeight) {
            return;
        }
      
        var me = this,
            animate = me.getChart().getAnimate(),
            sprite = me.getOrCreateSprite(item, spriteIndex),
            label = me.getOrCreateLabel(item, labelIndex),
            offset = (me.offset || 0) / 2,
            titleHeight = me.titleHeight || 0,
            descriptorSprite = {
                fill: me.title.fill || '#555',
                width: item.width - offset * 2,
                height: Math.max(titleHeight - offset, 0),
                translate: {
                    x: item.x + offset,
                    y: item.y + offset
                }
            },
            descriptorLabel = {
                fill: me.label.fill || '#fff',
                width: item.width - offset * 2,
                height: Math.max(titleHeight - offset, 0),
                'text-anchor': 'center',
                zIndex: 10000,
                translate: {
                    x: item.x + offset + item.width / 2,
                    y: item.y + offset
                }
            };

        item.sprite = sprite;

        //animate or render.
        if (animate) {
            me.onAnimate(sprite, {
                to: descriptorSprite
            });
            me.onAnimate(label, {
                to: descriptorLabel
            });
        } else {
            sprite.setAttributes(descriptorSprite, true);
            label.setAttributes(descriptorLabel, true);
        }
    },
    
    isItemInPoint: function(x, y, item) {
        if (!item.sprite) {
            return false;
        }
        var bbox = item.sprite.getBBox();
        return bbox.x <= x && bbox.y <= y
            && (bbox.x + bbox.width) >= x
            && (bbox.y + bbox.height) >= y;
    },
    

    // @private callback for when creating a label sprite.
    onCreateLabel: function(storeItem, item, i, display) {
    },

    // @private callback for when placing a label sprite.
    onPlaceLabel: function(label, storeItem, item, i, display, animate) {
    },

    // @private callback for when placing a callout sprite.
    onPlaceCallout: function(callout, storeItem, item, i, display, animate, index) {},

    // @private handles sprite animation for the series.
    onAnimate: function(sprite, attr) {
        sprite.show();
        Ext.chart.series.AbstractSpaceFilling.superclass.onAnimate.apply(this, arguments);
    }
});


/**
 * @private
 * 
 * @class Ext.chart.series.AbstractRadial
 *
 * Contains the main layout operations for radial based hierarchy visualizations.
 */

Ext.define('Ext.chart.series.AbstractRadial', {
    compute: function() {
        var me = this,
            lengthFunc = me.createLevelDistanceFunc(),
            bbox = me.bbox,
            nodes;

        me.centerX = bbox.x + bbox.width / 2;
        me.centerY = bbox.y + bbox.height / 2;

        nodes = me.computeAngularWidths();
        me.computePositions(nodes, null, lengthFunc);

        return nodes;
    },

    computePositions: function(nodes, links, getLength) {
        var me = this,
            store = me.getChart().getStore(),
            root = store.getRoot(),
            rootItem = nodes[0],
            parent = me.parent,
            config = me.config,
            math = Math,
            PI = math.PI,
            cos = math.cos,
            sin = math.sin,
            centerX = me.centerX,
            centerY = me.centerY,
            getRecord = function(node) {
                return node.storeItem.attributes.record;
            },
            getChildren = function(node) {
                var i = 0,
                    l = nodes.length,
                    ch = [];

                for (; i < l; ++i) {
                    if (nodes[i].parent == node) {
                        ch.push(nodes[i]);
                    }
                }

                return ch;
            },
            dimField = typeof me.dimField == 'function' ? me.dimField
                : function(n) {
                  return getRecord(n).get(me.dimField);
            };

        Ext.apply(rootItem, {
            span: PI * 2,
            angleSpan: {
                begin: 0,
                end: PI * 2
            }
        });

        (function iterate(node) {
            var ch = getChildren(node),
                i = 0,
                l = ch.length,
                maxDim = Number.MIN_VALUE,
                sortFn = function (a, b) { return b.dist - a.dist; },
                elem, angleSpan, angleInit, len,
                totalAngularWidths, subnodes,
                j, n, descendants, sib, dim,
                k, ls, child, angleProportion, theta;

            angleSpan = node.angleSpan.end - node.angleSpan.begin;
            angleInit = node.angleSpan.begin;
            len = getLength(node);

            totalAngularWidths = 0;
            subnodes = [];

            descendants = getChildren(node);

            for (j = 0, n = descendants.length; j < n; j++) {
                sib = descendants[j];
                totalAngularWidths += sib._treeAngularWidth;
                dim = dimField(sib);
                maxDim = dim > maxDim ? dim: maxDim;
                subnodes.push(sib);
            }

            //Maintain children order
            //Second constraint for <http://bailando.sims.berkeley.edu/papers/infovis01.htm>
            if (parent && parent.id == node.id && subnodes.length && subnodes[0].dist) {
                subnodes.sort(sortFn);
            }

            //Calculate nodes positions.
            for (k = 0, ls = subnodes.length; k < ls; k++) {
                child = subnodes[k];

                if (!child._flag) {
                    angleProportion = child._treeAngularWidth / totalAngularWidths * angleSpan;
                    theta = angleInit + angleProportion / 2;

                    Ext.apply(child, {
                        rho: len,
                        theta: theta,
                        x: cos(theta) * len + centerX,
                        y: sin(theta) * len + centerY,
                        span: angleProportion,
                        dimQuotient: dimField(child.dim) / maxDim,
                        angleSpan: {
                            begin: angleInit,
                            end: angleInit + angleProportion
                        }
                    });
                    angleInit += angleProportion;
                }
            }

            //call the function with children.
            for (k = 0, ls = subnodes.length; k < ls; k++) {
                iterate(subnodes[k]);
            }

        })(rootItem);
    },

    /*
     * Method: setAngularWidthForNodes
     *
     * Sets nodes angular widths.
     */
    setAngularWidthForNodes: function() {
        var me = this,
            store = me.getChart().getStore(),
            nodes = [],
            root = store.getRoot(),
            getRecord = function(node) {
                return node.storeItem.attributes.record;
            },
            dimField = typeof me.dimField == 'function' ? me.dimField
              : function(n) { geRecord(n).get(me.dimField); };

        (function iterate(node, parent, depth) {
            var item = {},
                ch = node.childNodes,
                l = ch.length,
                i = 0;

            Ext.apply(item, {
                id: nodes.length,
                storeItem: node,
                parent: parent,
                depth: depth
            });

            item._angularWidth = dimField(item);
            nodes.push(item);

            for (; i < l; i++) {
                iterate(ch[i], item, depth + 1);
            }

        })(root, null, 0);

        return nodes;
    },

    /**
     * Sets subtrees angular widths.
     */
    setSubtreesAngularWidth: function(nodes) {
        var me = this,
            i = 0,
            l = nodes.length;

        for (; i < l; i++) {
            me.setSubtreeAngularWidth(nodes[i], nodes);
        }
    },

    /**
     * Sets the angular width for a subtree.
     */
    setSubtreeAngularWidth: function(elem, nodes) {
        var me = this,
            nodeAW = elem._angularWidth,
            sumAW = 0,
            i = 0,
            l = nodes.length,
            ch = [];

        for (; i < l; i++) {
            if (nodes[i].parent == elem) {
                me.setSubtreeAngularWidth(nodes[i], nodes);
                sumAW += nodes[i]._treeAngularWidth;
            }
        }
        elem._treeAngularWidth = Math.max(nodeAW, sumAW);
    },

    /**
     * Computes nodes and subtrees angular widths.
     */
    computeAngularWidths: function() {
        var nodes = this.setAngularWidthForNodes();
        this.setSubtreesAngularWidth(nodes);
        return nodes;
    }
});


/**
 * @class Ext.chart.series.Sunburst
 * @extends Ext.chart.series.AbstractSpaceFilling
 *
 * Creates a Sunburst visualization. The Sunburst is a radial space filling visualization that renders hierarchies.
 * Hierarchy visualizations use TreeStores.
 *
 * {@img Ext.chart.series.Sunburst/Ext.chart.series.Sunburst.png Ext.chart.series.Sunburst Sunburst visualization}
 *
 *  For example:

        Ext.define('User', {
            extend: 'Ext.data.Model',
            config: {
                fields: ['children', 'leaf', 'data', 'id', 'name']
            }
        });

        treeStore = new Ext.data.TreeStore({
            model: 'User',
            batchUpdateMode: 'complete',
            proxy: {
                type: 'ajax',
                url: 'src/model.json',
                reader: {
                    type: 'json'
                }
            }
        })

        treeStore.load({
          callback: callback
        });

        function callback() {

            var chart = new Ext.chart.Chart({
                store: treeStore,
                animate: true,
                series: [{
                    type: 'sunburst',
                    highlight: true,
                    titleField: 'name',
                    spanField: function(node) {
                        return node && node.storeItem ? node.storeItem.get('data').area : 1;
                    },
                    areaField: function(node) {
                      return node ? node.get('data').area : 1;
                    },
                    colorField: function(node) {
                        return '#333';
                    }
                }]
            });


 * In this example we load a TreeStore via an http request from a json file, and once loaded we create a chart
 * with a sunburst series. We also set a function `spanField` that returns
 * the angle span allocated for the node to be placed in the Sunburst visualization.

 * @xtype sunburst
 */


Ext.define('Ext.chart.series.Sunburst', { 
 
    extend: 'Ext.chart.series.AbstractSpaceFilling',

    mixins: {
        'radial' : 'Ext.chart.series.AbstractRadial'
    },

    /**
     * @cfg {String} orientation
     * The orientation for the layout. Possible values are horizontal or vertical.
     */

    /**
     * @cfg {Number} offset
     * Margin between nodes in pixels.
     */

    /**
     * @cfg {String} rootName
     * A value for the root node name.
     */

    /**
     * @cfg {String} titleField
     * The field to be used to display text within each node's label.
     */

    /**
     * @cfg {String/Function} spanField
     *  A function that returns a value relative to which angle the node should take in th main layout.
     */

    /**
     * @cfg {String/Function} colorField
     * A function that returns a color string given a node.
     */

    config: {
        levelDistance: null
    },

    type: 'sunburst',

    constructor: function(config) {
        var me = this;
        me.callParent(arguments);
        me.dimField = me.spanField;
    },

    createLevelDistanceFunc: function() {
        var me = this,
            chart = me.getChart(),
            surface = me.getSurface(),
            width = surface.getWidth(),
            height = surface.getHeight(),
            root = chart.getStore().getRoot(),
            ld = (Math.min(width, height) >> 1) / (me.getTreeDepth(root) + 1);

        me.setLevelDistance(ld);
        
        return function(elem) {
            return (elem.depth + 1) * ld;
        };
    },

    getTreeDepth: function(root) {
        return (function depth(n, d) {
            if (!n) {
                return d;
            }
            var i = 0,
                childNodes = n.childNodes,
                l = childNodes.length,
                ch = Array(l);

            if (!l) {
                return d;
            }
            
            for (; i < l; ++i) {
                ch[i] = depth(childNodes[i], d + 1);
            }

            return Math.max.apply(Math, ch);
        })(root, 0);
    },

    //render inner nodes the same way as leaves.
    renderInner: function() {
        this.renderLeaf.apply(this, arguments);
    },
    
    getOrCreateSprite: function(item, index) {
        var me = this,
            group = me.group,
            sprite = group.getAt(index),
            bbox = me.bbox;

        if(sprite){
            sprite.show(true);
        }

        return sprite || me.getSurface().add({
            type: 'path',
            path: ['M', 0, 0],
            x: 0,
            y: 0,
            group: group
        });
    },

    getOrCreateLabel: function(item, index) {
        var me = this, 
            label = me.labelsGroup,
            sprite = label.getAt(index),
            titleHeight = me.titleHeight || 0,
            offset = me.offset || 0,
            levelDistance = me.getLevelDistance(),
            bbox = me.bbox,
            node = item.storeItem,
            text =  node.get(me.titleField) || me.rootName,
            theta = item.theta,
            cond = (theta > Math.PI / 2 && theta < 3 * Math.PI / 2),
            thetap = cond ? theta + Math.PI : theta,
            ans, textBBox;

        item.labelRotation = thetap;
        
        ans = sprite || me.getSurface().add({
            type: 'text',
            text: text,
            font: Math.max(12, 0) + 'px Arial',
            'text-anchor': 'center',
            fill: '#fff',
            group: label
        });

        ans.setAttributes({
            text: text,
            hidden: false
        }, true);

        textBBox = ans.getBBox();

        while (ans.getBBox(true).width > levelDistance && text.length >= 7) {
            text = text.slice(0, text.length / 2) + '...';
            ans.setAttributes({
                text: text
            }, true);
        }

        return ans;
    },


    renderLeaf: function(item, spriteIndex, labelIndex) {
        if (!item.parent) {
            item.sprite = {
                getBBox: function() {
                    return {
                        x: 0,
                        y: 0,
                        width: 0,
                        height: 0
                    }
                }
            };
            return;
        }
      
        //Skip the root node index which isn't rendered.
        spriteIndex -= 1;
        labelIndex -= 1;


        var me = this,
            math = Math,
            cos = math.cos,
            sin = math.sin,
            abs = math.abs,
            chart = me.getChart(),
            animate = chart.getAnimate(),
            sprite = me.getOrCreateSprite(item, spriteIndex),
            label = me.getOrCreateLabel(item, labelIndex),
            levelDistance = me.getLevelDistance() || 30,
            depth = item.depth,
            fromLen = depth * levelDistance,
            toLen = fromLen + levelDistance,
            span = item.span / 2,
            theta = item.theta,
            x = item.x,
            y = item.y,
            twoPI = 2 * math.PI,
            angleSpan = item.angleSpan,
            isSingleSlice = (twoPI%angleSpan.end == 0 && twoPI%span == 0), 
            a1 = theta - span,
            a2 = theta + span,
            centerX = me.centerX,
            centerY = me.centerY,
            x1 = item.rho * cos(a1),
            y1 = item.rho * sin(a1),
            x2 = (item.rho + levelDistance) * cos(a1),
            y2 = (item.rho + levelDistance) * sin(a1),
            x3 = item.rho * cos(a2),
            y3 = item.rho * sin(a2),
            x4 = (item.rho + levelDistance) * cos(a2),
            y4 = (item.rho + levelDistance) * sin(a2),
            flag = abs(a2 - a1) > math.PI,
            getColor = typeof me.colorField == 'function' ? me.colorField : function(item) {
                return item.storeItem.get(me.colorField);
            },
            descriptorSprite = {
                path: [["M", x1, y1], 
                       ["L", x2, y2],
                       ["A", toLen, toLen, 0, +flag, 1, x4, y4],
                       ["L", x4, y4], 
                       ["L", x3, y3],
                       ["A", fromLen, fromLen, 0, +flag, 0, x1, y1],
                       ["Z"]],
                fill: getColor(item),
                translate: {
                    x: centerX,
                    y: centerY
                }
            },
            descriptorLabel = {
                fill: me.label.fill || '#fff',
                'text-anchor': 'center',
                zIndex: 10000,
                translate: {
                    x: item.x + (levelDistance / 2 * cos(item.theta)),
                    y: item.y + (levelDistance / 2 * sin(item.theta))
                }
             };
             
             if(isSingleSlice){
                // TODO:
                // correct path for single slice
                descriptorSprite.path = [
                    ["M", x1, y1],
                    ["L", x2, y2],
                    ["A", toLen, toLen, 0, +flag, 1, x4, y4-0.1],
                    ["L", x4, y4],
                    ["L", x3, y3],
                    ["A", fromLen, fromLen, 0, +flag, 0, x1, y1],
                    ["Z"]
                ];
             }
        
        label.setAttributes({
            rotate: {
                    degrees: item.labelRotation * 180 / Math.PI,
                    x: 0,
                    y: 0
                }
        },true);
        
        item.sprite = sprite;
        //animate or render.
        if (animate && !chart.resizing) {
            me.onAnimate(sprite, {
                to: descriptorSprite
            });
            if (!label.attr.hidden) {
                delete descriptorLabel['text-anchor'];
                
                me.onAnimate(label, {
                    to: descriptorLabel
                });
            }
        } else {
            sprite.setAttributes(descriptorSprite, true);
            label.setAttributes(descriptorLabel, true);
        }
    },
    hideExtraElements: function(itemsLength, labelsCount){
        var me = this,
            labelsCount = labelsCount-1,
            labelsGroup = me.labelsGroup,
            group = me.group,
            i, ln;

        ln = group.getCount();
        for(i = itemsLength-1; i < ln; i++){
            group.getAt(i).hide(true);
        }

        ln = labelsGroup.getCount();
        for(i = labelsCount; i < ln; i++){
            labelsGroup.getAt(i).hide(true);
        }
    },
    isItemInPoint: function(x, y, item) {
        var me = this,
            diffX = x - me.centerX,
            diffY = y - me.centerY,
            rho = Math.sqrt(diffX * diffX + diffY * diffY),
            theta = Math.atan2(diffY, diffX),
            ldist = me.getLevelDistance();
        
        theta = theta < 0 ? (theta + Math.PI * 2) : theta;

        if (item.parent) {
            return rho >= item.rho && rho <= item.rho + ldist && 
              theta >= item.angleSpan.begin && theta <= item.angleSpan.end;
        }
    }
});


/**
 * @class Ext.chart.series.Icicle
 * @extends Ext.chart.series.AbstractSpaceFilling
 *
 * Creates a Icicle visualization. The Icicle is a space filling visualization that renders hierarchies.
 * Hierarchy visualizations use TreeStores.
 *
 * {@img Ext.chart.series.Icicle/Ext.chart.series.Icicle.png Ext.chart.series.Icicle Icicle visualization}
 *
 * For example:
 * 

         Ext.define('User', {
            extend: "Ext.data.Model",
            config: {
                fields: ['children', 'leaf', 'data', 'id', 'name']
            }
        });

        treeStore = new Ext.data.TreeStore({
            model: 'User',
            batchUpdateMode: 'complete',
            proxy: {
                type: 'ajax',
                url: 'src/model.json',
                reader: {
                    type: 'json',
                    rootProperty: 'children'
                }
            }
        });

        treeStore.load({
          callback: callback
        });

        function callback() {
            var chart = new Ext.chart.Chart({
                store: treeStore,
                animate: true,
                series: [{
                    type: 'icicle',
                    layout: 'icicle',
                    orientation: 'horizontal',
                    highlight: true,
                    titleHeight: 13,
                    offset: 0.5,
                    rootName: 'Root node name',
                    titleField: 'name',
                    lengthField: function(node) {
                        return node ? node.get('data').area : 1;
                    },
                    colorField: function(node) {
                        return '#522';
                    }
                }]
            });
        }

 *
 * In this example we load a TreeStore via an http request from a json file, and once loaded we create a chart
 * with an icicle series, icicle layout and horizontal orientation. We also set a function `lengthField` that returns
 * the height of the node to be placed in the Icicle visualization.
 *
 */

(function() {

//Contains the layout logic for an Icicle visualization.
var Layout = {};

//Define layout mixin
Layout.Icicle = {
  compute: function() {

    var me = this,
        store = me.getChart().getStore(),
        root = store.getRoot(),
        size = me.bbox,
        width = size.width,
        height = size.height,
        offset = me.offset,
        initialDepth = 0,
        treeDepth = 0,
        items = [];

    treeDepth = (function getDepth(node, depth) {
        var finalDepth = depth,
            ch = node.childNodes,
            l = ch.length,
            i = 0,
            depths = [];

        if (l) {
            for (; i < l; i++) {
                depths.push(getDepth(ch[i], depth + 1));
            }
            finalDepth = Math.max.apply(Math, depths);
        }

        return finalDepth;
    })(root, 0);
    
    if(me.orientation == 'horizontal') {
        me.computeSubtree(root, 0, 0, width/(treeDepth+1), height, initialDepth, treeDepth, items);
    } else {
        me.computeSubtree(root, 0, 0, width, height/(treeDepth+1), initialDepth, treeDepth, items);
    }

    return items;
  },

  computeSubtree: function (root, x, y, width, height, initialDepth, maxDepth, items) {
    var me = this,
        getRecord = function(n) { return n; },
        ch = root.childNodes,
        l = ch.length,
        i = 0,
        nodeLength = 0,
        prevNodeLength = 0,
        totalDim = 0,
        getLength = typeof me.lengthField == 'function' ? me.lengthField 
            : function(n) { return n.get(me.lengthField); },
        rootItem = {
            x: x,
            y: y,
            width: width,
            height: height,
            storeItem: root
        };

    items.push(rootItem);

    if (!l) {
        return;
    }

    for (; i < l; ++i) {
        totalDim += getLength(getRecord(ch[i]));
    }

    for(i = 0; i < l; ++i) {
        if(me.orientation == 'horizontal') {
            nodeLength = height * getLength(getRecord(ch[i])) / totalDim;
            me.computeSubtree(ch[i], x + width, y, width, nodeLength, initialDepth, maxDepth, items);
            y += nodeLength;
        } else {
            nodeLength = width * getLength(getRecord(ch[i])) / totalDim;
            me.computeSubtree(ch[i], x, y + height, nodeLength, height, initialDepth, maxDepth, items);
            x += nodeLength;
        }
      }
  }

};


Ext.define('Ext.chart.series.Icicle', { 
 
    extend: 'Ext.chart.series.AbstractSpaceFilling',

    statics: {
        Layout: Layout
    },

    type: 'icicle',

    /**
     * @cfg {String} orientation
     * The orientation for the layout. Possible values are horizontal or vertical.
     */

    /**
     * @cfg {Number} offset
     * Margin between nodes in pixels.
     */

    /**
     * @cfg {String} rootName
     * A value for the root node name.
     */

    /**
     * @cfg {String} titleField
     * The field to be used to display text within each node's label.
     */

    /**
     * @cfg {String/Function} lengthField
     *  A function that returns a value relative to what amount of space the node should occupy in th main layout.
     */

    /**
     * @cfg {String/Function} colorField
     * A function that returns a color string given a node.
     */


    orientation: 'horizontal',

    constructor: function(config) {
        this.callParent(arguments);
        Ext.apply(this, Layout.Icicle);
    },

    //render inner nodes the same way as leaves.
    renderInner: function() {
        this.renderLeaf.apply(this, arguments);
    }
});

})();


/**
 * @class Ext.chart.series.Treemap
 * @extends Ext.chart.series.AbstractSpaceFilling
 *
 * Creates a TreeMap visualization. The TreeMap is a space filling visualization that renders hierarchies.
 * Hierarchy visualizations use TreeStores.
 *
 * {@img Ext.chart.series.TreeMap/Ext.chart.series.TreeMap.png Ext.chart.series.TreeMap TreeMap visualization}
 *
 * For example:

         Ext.define('User', {
            extend: "Ext.data.Model",
            config: {
                fields: ['children', 'leaf', 'data', 'id', 'name']
            }
        });

        treeStore = new Ext.data.TreeStore({
            model: 'User',
            batchUpdateMode: 'complete',
            proxy: {
                type: 'ajax',
                url: 'src/model.json',
                reader: {
                    type: 'json',
                    rootProperty: 'children'
                }
            }
        });

        treeStore.load({
          callback: callback
        });

        function callback() {
            var chart = new Ext.chart.Chart({
                store: treeStore,
                animate: true,
                series: [{
                    type: 'treemap',
                    layout: 'squarified',
                    orientation: 'horizontal',
                    highlight: true,
                    titleHeight: 13,
                    offset: 0.5,
                    rootName: 'Root node title',
                    titleField: 'name',
                    lengthField: function(node) {
                        return node ? node.get('data').area : 1;
                    },
                    areaField: function(node) {
                      return node ? node.get('data').area : 1;
                    },
                    colorField: function(node) {
                        return '#555';
                    }
                }]
            });


 * In this example we load a TreeStore via an http request from a json file, and once loaded we create a chart
 * with a treemap series. We set the layout to be squarified, and also the orientation of the layout to be horizontal (only useful for slice and dice layout).
 * We also set a function `lengthField` that returns the area to be allocated for the node when placed in the treemap visualization.
 *
 * @xtype treemap
 */

(function() {

//Contains mixin with multiple treemap layouts.
var Layout = {};

//Define layout mixins
Layout.SliceAndDice = {
    
    /*
    * Slice and Dice layout methods
    */
    compute: function(bounds) {
        var me = this, 
            chart = me.getChart(),
            store = chart.substore || chart.getStore(),
            root = store.getRoot(),
            size = me.bbox,
            width = size.width,
            height = size.height,
            items = [], rootItem;

        rootItem = {
            x: size.x,
            y: size.y,
            width: width,
            height: height + (me.titleHeight || 0),
            storeItem: root
        };

        me.computePositions(rootItem, rootItem, me.orientation || 'horizontal', items);

        return items;
    },

    computePositions: function(parentItem, childItem, orn, items) {
        //compute children areas
        var me = this,
            parentNode = parentItem.storeItem,
            children = parentNode.childNodes,
            getArea = me.areaField,
            totalArea = 0,
            offset = me.offset || 0,
            offsetSize = 0,
            titleHeight = me.titleHeight || 0,
            width = parentItem.width,
            height = Math.max(0, parentItem.height - titleHeight),
            horizontal = orn == 'horizontal',
            i, l, item, ratio, otherSize, size, dim, pos, pos2, posth, pos2th;

        //append the node to the items
        items.push(childItem);

        //get total area of the children
        for (i = 0, l = children.length; i < l; ++i) {
            totalArea += getArea(children[i]);
        }

        ratio = parentItem == childItem ? 1 : (getArea(childItem.storeItem) / totalArea);

        //define sizes for the items
        if(horizontal) {
            orn = 'vertical';
            otherSize = height;
            size = width * ratio;
            dim = 'height';
            pos = 'y';
            pos2 = 'x';
            posth = titleHeight;
            pos2th = 0;
        } else {
            orn = 'horizontal';
            otherSize = height * ratio;
            size = width;
            dim = 'width';
            pos = 'x';
            pos2 = 'y';
            posth = 0;
            pos2th = titleHeight;
        }

        //set child item size
        childItem.width = size;
        childItem.height = otherSize;
        
        //iterate over grandchildren to set new positions
        children = childItem.storeItem.childNodes;
        for (i = 0, l = children.length; i < l; ++i) {
            item = {};
            item[pos] = offsetSize + childItem[pos] + posth;
            item[pos2] = childItem[pos2] + pos2th;
            item.storeItem = children[i];
            me.computePositions(childItem, item, orn, items);
            offsetSize += item[dim];
        }
    }
};

Layout.Area = {

     compute: function(bounds) {
        var me = this, 
            chart = me.getChart(),
            store = chart.substore || chart.getStore(),
            root = store.getRoot(),
            size = me.bbox,
            width = size.width,
            height = size.height,
            items = [], rootItem, coord,
            offset = me.offset,
            offsetWidth = width - offset,
            offsetHeight = height - offset;

        //set root position and dimensions
        rootItem = {
            x: 0,
            y: 0,
            width: width,
            height: height,
            storeItem: root
        };

        items.push(rootItem);

        coord = {
            top: me.titleHeight || 0,
            left: offset / 2,
            width: offsetWidth,
            height: offsetHeight - (me.titleHeight || 0)
        };

        me.computePositions(root, coord, items);

        return items;
     },
     
     computeDim: function(tail, initElem, w, coord, comp, items) {
       var me = this, l, c, newCoords;
       
       if(tail.length + initElem.length == 1) {
           l = tail.length == 1 ? tail : initElem;
           me.layoutLast(l, w, coord, items);
           return;
       }
       
       if(tail.length >= 2 && initElem.length == 0) {
           initElem = [tail.shift()];
       }
       
       if(tail.length == 0) {
           if(initElem.length > 0) {
              me.layoutRow(initElem, w, coord, items);
           }
           return;
       }
       
       c = tail[0];
       if(comp.call(this, initElem, w) >= comp.call(this, [c].concat(initElem), w)) {
         me.computeDim(tail.slice(1), initElem.concat([c]), w, coord, comp, items);
       } else {
         newCoords = me.layoutRow(initElem, w, coord, items);
         me.computeDim(tail, [], newCoords.dim, newCoords, comp, items);
       }
     },

     worstAspectRatio: function(ch, w) {
        if(!ch || ch.length == 0) {
            return Number.MAX_VALUE;
        }
       
        var me = this,
            areaSum = 0, 
            maxArea = 0, 
            minArea = Number.MAX_VALUE,
            i = 0, 
            l = ch.length,
            sqw = w * w,
            area, sqAreaSum;

       for(; i < l; i++) {
           area = ch[i]._area;
           areaSum += area;
           minArea = minArea < area ? minArea : area;
           maxArea = maxArea > area ? maxArea : area; 
       }

       sqAreaSum = areaSum * areaSum;

       return Math.max(sqw * maxArea / sqAreaSum,
                       sqAreaSum / (sqw * minArea));
     },
     
     avgAspectRatio: function(ch, w) {
        if(!ch || ch.length == 0) {
            return Number.MAX_VALUE;
        }

        var me = this,
            arSum = 0,
            i = 0,
            l = ch.length,
            area, h;

        for (; i < l; i++) {
            area = ch[i]._area;
            h = area / w;
            arSum += w > h? w / h : h / w;
        }

        return arSum / l;
     },

     layoutLast: function(ch, w, coord, items) {
       var child = ch[0];
       Ext.apply(child, {
          x: coord.left,
          y: coord.top,
          width: coord.width,
          height: coord.height
       });

       items.push(child);

       return child;
     }
};

Layout.Squarified = Ext.apply({
    
    computePositions: function(node, coord, items) {
        var me = this,
            offset = me.offset || 0,
            titleHeight = me.titleHeight || 0,
            max = Math.max,
            ch = node.childNodes,
            chItems = [],
            i = 0,
            l = ch.length,
            width, height, x, y;

        if (coord.width >= coord.height) {
            me.orientation = 'horizontal';
        } else {
            me.orientation = 'vertical';
        }

        if(ch.length > 0) {
            
            //create a child items array
            for (i = 0; i < l; i++) {
                chItems.push({
                    storeItem: ch[i]
                });
            }

            me.processChildrenLayout(node, chItems, coord, items);
            
            for (i = 0; i < l; i++) {
                chi = chItems[i]; 
                x = chi.x;
                y = chi.y;
                height = max(chi.height - offset - titleHeight, 0);
                width = max(chi.width - offset, 0);

                coord = {
                  width: width,
                  height: height,
                  top: y + titleHeight,
                  left: x
                };
                
                me.computePositions(chi.storeItem, coord, items);
            }
        }
    },

    processChildrenLayout: function(par, ch, coord, items) {
      //compute children real areas
      var me = this,
          i = 0, 
          l = ch.length, 
          parentArea = coord.width * coord.height,
          totalChArea = 0, 
          chArea = [],
          minimumSideValue, initElem, tail;

      for(; i < l; i++) {
          chArea[i] = parseFloat(me.areaField(ch[i].storeItem));
          totalChArea += chArea[i];
      }
      
      for(i = 0; i < l; i++) {
          ch[i]._area = parentArea * chArea[i] / totalChArea;
      }

      minimumSideValue = (me.orientation == 'horizontal') ? coord.height : coord.width;
      
      ch.sort(function(a, b) { 
          var diff = b._area - a._area; 
          return diff ? diff : (b.id == a.id ? 0 : (b.id < a.id? 1 : -1)); 
      });

      initElem = [ch[0]];
      tail = ch.slice(1);
      
      me.squarify(tail, initElem, minimumSideValue, coord, items);
    },

    squarify: function(tail, initElem, w, coord, items) {
        this.computeDim(tail, initElem, w, coord, this.worstAspectRatio, items);
    },

    layoutRow: function(ch, w, coord, items) {
        var me = this;
        if(me.orientation == 'horizontal') {
            return me.layoutV(ch, w, coord, items);
        } else {
            return me.layoutH(ch, w, coord, items);
        }
    },

    layoutV: function(ch, w, coord, items) {
        var me = this,
            totalArea = 0,
            i = 0,
            l = ch.length,
            width, h, chi, top, ans;

        for (; i < l; i++) {
            totalArea += ch[i]._area;
        }
        
        width = (totalArea / w) || 0;
        top =  0;

        for(i = 0; i < l; i++) {
            chi = ch[i];
            h = (chi._area / width) || 0;
            Ext.apply(chi, {
                x: coord.left,
                y: coord.top + top,
                width: width,
                height: h
            });

            //Add the item to the treemap.
            items.push(chi);

            top += h;
        }

        ans = {
            height: coord.height,
            width: coord.width - width,
            top: coord.top,
            left: coord.left + width
        };
        
        //take minimum side value.
        ans.dim = Math.min(ans.width, ans.height);
        
        if(ans.dim != ans.height) {
            me.orientation = (me.orientation == 'horizontal') ? 'vertical' : 'horizontal';
        }
        
        return ans;
    },

    layoutH: function(ch, w, coord, items) {
      var me = this,
          totalArea = 0,
          i = 0,
          l = ch.length,
          top = coord.top,
          left = 0,
          height, chi, ans;

      for (; i < l; i++) {
          totalArea += ch[i]._area;
      }
      
      height = totalArea / w || 0;

      for (i = 0; i < l; i++) {
          chi = ch[i];
          w = (chi._area / height) || 0;
          Ext.apply(chi, {
              x: coord.left + left,
              y: top,
              width: w,
              height: height
          });

          //add items to be rendered
          items.push(chi);

          left += w;
      }
      
      ans = {
          height: coord.height - height,
          width: coord.width,
          top: coord.top + height,
          left: coord.left
      };

      ans.dim = Math.min(ans.width, ans.height);

      if(ans.dim != ans.width) {
          me.orientation = (me.orientation == 'horizontal') ? 'vertical' : 'horizontal';
      }
      
      return ans;
    }

}, Layout.Area);


Ext.define('Ext.chart.series.Treemap', {
 
    extend: 'Ext.chart.series.AbstractSpaceFilling',

    type: 'treemap',

    layout: 'squarify',

    orientation: 'horizontal',

    statics: {
        Layout: Layout
    },

    /**
     * @cfg {Object} style
     * Append styling properties to this object for it to override theme properties.
     */

    /**
     * @cfg {String} layout
     * The treemap layout to be used. Possible values are sliceanddice and squarified.
     */

    /**
     * @cfg {String} orientation
     * The orientation for the layout (only used in slice and dice layouts). Possible values are horizontal or vertical.
     */

    /**
     * @cfg {Number} offset
     * Margin between nodes in pixels.
     */

    /**
     * @cfg {String} rootName
     * A value for the root node name.
     */

    /**
     * @cfg {String} titleField
     * The field to be used to display text within each node's label.
     */

    /**
     * @cfg {String/Function} lengthField
     *  A function that returns a value relative to what amount of space the node should occupy in th main layout.
     */

    /**
     * @cfg {String/Function} colorField
     * A function that returns a color string given a node.
     */

    constructor: function(config) {
        this.callParent(arguments);
        
        var me = this,
            surface = me.getSurface(),
            layout;


        layout = me.layout.toLowerCase();

        //set treemap layout.
        if (layout == 'sliceanddice') {
            Ext.apply(me, Layout.SliceAndDice);
        } else if (layout == 'squarified') {
            Ext.apply(me, Layout.Squarified);
        }
    }
});

})();

/**
 * @class Ext.chart.series.Wordmap
 * @extends Ext.chart.series.Series
 *
 * Creates a space filling layout for words. You can bind the size of the words to different values for the nodes.
 *
 * {@img Ext.chart.series.Wordmap/Ext.chart.series.Wordmap.png Ext.chart.series.Wordmap Wordmap visualization}
 *
 * For example:

            var chart = Ext.create('Ext.chart.Chart', {
                theme: 'Demo',
                store: store1,
                animate: {
                    easing: "backInOut",
                    duration: 500
                },
                series: [{
                    type: 'wordmap',
                    wordField: 'word',
                    wordCountField: 'count',
                    minFontSize: 20,
                    maxFontSize: 50,
                    minColor: 'rgb(0,0,0)',
                    maxColor: '#56b31f',
                    fontFamily: 'Ubuntu',
                    positionFn: function(bounds){
                        var width = bounds.width,
                            height = bounds.height,
                            rnd = Math.random,
                            x, y;
                            x = (width/2) + (((rnd() * 10 > 5) ? 1 : -1) * rnd() * 100 + 1) >> 0;
                            y = (height/2) + (((rnd() * 10 > 5) ? 1 : -1) * rnd() * 100 + 1) >> 0;

                        return {
                            x: x,
                            y: y
                        };
                    }
                }]
            });

 *
 * @xtype wordmap
 */
Ext.define('Ext.chart.series.Wordmap', {

    extend: 'Ext.chart.series.Series',

    type: 'wordmap',

    config: {
        /**
         *  @cfg {Number} maxFontSize (optional) The font size that should be used to display a store's item with a maximum count. The default value is 55
         */
        maxFontSize: 55,

        /**
         *  @cfg {Number} minFontSize (optional) The font size that should be used to display a store's item with a minimum count. The default value is 25
         */
        minFontSize: 25,

        /**
         *  @cfg {String} maxColor (optional) The color that should be used to display a store's item with a maximum count. e.g. 'rgb(0,0,0)', '#444', .. The default value is 'rgb(255,0,0)'
         */
        maxColor: 'rgb(255,0,0)',

        /**
         *  @cfg {String} minColor (optional) The color that should be used to display a store's item with a minimum count. e.g. 'rgb(0,0,0)', '#444', .. The default value is 'rgb(0,0,0)'
         */
        minColor: 'rgb(0,0,0)',


        /**
         *  @cfg {Function} positionFn (optional) Function for positioning a word. Based on this function all words get a start position.'
         */
        positionFn: function(bounds){
            var width = bounds.width,
                height = bounds.height,
                // random horizontal position
                // x = Math.random()*width+1 >> 0,
                // vertically centered
                // y = (height/2) >> 0;

                // centered, no distribution -> worst case since all positioned words intersect at least with the first
                // x = (width/2) >> 0;
                // y = (height/2) >> 0;

                // center distributed
                x = (width/2) + (((Math.random()*10>5)?1:-1) * Math.random()*50+1) >> 0;
                y = (height/2) + (((Math.random()*10>5)?1:-1) * Math.random()*50+1) >> 0;

            return {
                x: x,
                y: y
            };
        },

        fontFamily: 'Arial',

        wordField: false,

        wordCountField: false,

        // returns a color based on a given count and the boundary object
        colorFn: null
    },
    /* 
    example color function
    function(count, bounds){
        var r, g, b;
        r = (Math.random()*255+1>>0);
        g = (Math.random()*255+1>>0);
        b = (Math.random()*255+1>>0);
        return (new Ext.draw.Color(r, g, b).toString());
    },
    
    */
    
    // @private contains the added words which has to be checked for intersections with new words
    addedWords: [],

    constructor: function(config){
        this.callParent(arguments);
        
        var me = this,
            surface = me.getSurface(),
            store = me.getChart().getStore();

        me.group = surface.getGroup(me.seriesId);
    },
    
    // @private returns charts boundaries and scales
    getBounds: function(){
        var me = this,
            count,
            fontScale = 0,
            colorScale = 0,
            surface = me.getSurface(),
            wordCountField = me.getWordCountField(),
            bbox, maxCount, minCount;

        minCount = Infinity;
        maxCount = 0; 
        me.eachRecord(function (record) {
            count = record.get(wordCountField);
            if (count < minCount) minCount = count; 
            if (count > maxCount) maxCount = count;
        });
        me.setBBox();
        bbox = me.bbox;
        
        // take width/height into account
        fontScale = (maxCount - minCount) / (me.getMaxFontSize() - me.getMinFontSize());
        colorScale =  1/(maxCount - minCount);
    
    
        return {
            bbox: bbox,
            width: surface.getWidth(),
            height: surface.getHeight(),
            colorScale: colorScale,
            fontScale: fontScale,
            minCount: minCount,
            maxCount: maxCount 
        }
    },
    
    drawSeries: function(){
        var me = this,
            chart = me.getChart(),
            animate = chart.getAnimate(),
            surface = me.getSurface(),
            store = chart.substore || chart.getStore(),
            storeCount = store.getCount(),
            group = me.group,
            groupCount = group.getCount(),
            fontFamily = me.getFontFamily(),
            addedWords = me.addedWords || [],
            crossed = me.crossWords==null,
            startPosition, 
            bounds, currentPosition, spiralAngle,
            addedWords, collides, word, count, x, measuredWord,
            size, sprite, rotated, attrs, debug,
            start = +new Date;

        me.callParent();

        
        while(storeCount < groupCount--){
            group.get(groupCount).hide(true);
        }
        // set the bounds in order to make the positioning possible
        bounds = me.bounds = me.getBounds();
        
        // TODO: check whats the biggest word by measuring all words
        // check if the biggest word can be added to the surface
        // as long as the biggest word doesnt fit on the screen, decrement the maxFont
        x = 0;

        me.eachRecord(function(record, i){
            
            spiralAngle = 0.0;
            collides = false;
            rotated = crossed && (0 == (Math.random()*2 >> 0));//(i+1)%2==0);

            word = record.get(me.getWordField());
            count = record.get(me.getWordCountField());
            // assign a position based on the positioning function
            startPosition = me.getPositionFn()(bounds);
            currentPosition = startPosition;
            measuredWord = me.getMeasuredWord(currentPosition, word, count, rotated);

            collides = me.checkForCollisions(measuredWord);
                
            while(collides || me.isInBoundaries(measuredWord)){
                // moving along a spiral from the starting position
                currentPosition = me.moveAlongSpiral(startPosition, spiralAngle);
                measuredWord = me.getMeasuredWord(currentPosition, word, count, rotated);
                
                collides = me.checkForCollisions(measuredWord);
                // experimental addend 1/12 of a circle
                spiralAngle += Ext.draw.Draw.pi2 / 12;

            }

            addedWords.push(measuredWord);
            me.addedWords = addedWords;
            
            
            size = me.getWordSize(word, count);

            sprite = group.get(i) || (surface.add({
                type: 'text',
                group: group,
                x: currentPosition.x,
                y: currentPosition.y,
                "font-size": size.fontSize,
                "font-family": fontFamily,
                textBaseline: 'middle',
                "text-anchor": 'center',
                fill: me.getInterpolatedColor(count),
                text: word,
                rotate: {
                    degrees: rotated?90:0
                }
            }));
            if(group.get(i)){
            
               group.get(i).show(true);
            
                if(animate) {
                    me.onAnimate(sprite, {
                            to :
                            {
                                text: word,
                                x: currentPosition.x,
                                y: currentPosition.y,
                                rotate: {
                                    degrees: rotated ? 90 : 0
                                },
                                fill: me.getInterpolatedColor(count),
                                "font-size": size.fontSize,
                                "font-family": fontFamily
                            }
                        });
                } else {
                    sprite.setAttributes({
                        x: currentPosition.x,
                        y: currentPosition.y,
                        rotate: {
                            degrees: rotated ? 90 : 0
                        },
                        fill: me.getInterpolatedColor(count),
                        "font-size": size.fontSize,
                        "font-family": fontFamily,
                        text: word
                    });
                }
            }else{
                surface.add(sprite);
            }
 
        });
        me.addedWords = [];
        
        me.fireEvent('draw', me);
    },

    // @private handled when creating a label.
    onCreateLabel: function(storeItem, item, i, display) {
    
    },
    
    // @private callback for when placing a label sprite.
    onPlaceLabel: function(label, storeItem, item, i, display, animate) {
    
    },
    
    // @private returns a point on a spiral based on a starting position and the spirals angle
    moveAlongSpiral: function(startPosition, spiralAngle){
            // spiral of archimedes
        var a = spiralAngle,
            x = a * Math.cos(spiralAngle) >> 0,
            y = a * Math.sin(spiralAngle) >> 0;

            startPosition.x += x;
            startPosition.y += y;
            
        return startPosition;
    },
    
    // @private returns a color based on count by interpolating between min and maxcolor
    getInterpolatedColor: function(count){
        var me = this,
            bounds = me.bounds,
            minCount = bounds.minCount,
            maxCount = bounds.maxCount,
            color = Ext.draw.Color,
            colorScale = (count-minCount)*bounds.colorScale,
            maxColor = color.fromString(me.getMaxColor()).getRGB(),
            minColor = color.fromString(me.getMinColor()).getRGB(),
            rInt, gInt, bInt;
        if(me.getColorFn()){
            return me.getColorFn()(count, bounds);
        }
        
        rInt = minColor[0] + (maxColor[0] - minColor[0])*colorScale >> 0,
        gInt = minColor[1] + (maxColor[1] - minColor[1])*colorScale >> 0,
        bInt = minColor[2] + (maxColor[2] - minColor[2])*colorScale >> 0;
        
        return (new color(rInt, gInt, bInt).toString());
    },

    getWordSize: function(word, count){
        // TODO(zhangbei): this only works on Canvas engine, should we create a measure test on the Surface interface instead?
        var me = this,
            surface = me.getSurface(),
            ctx = surface.ctx,
            fontSize = me.getMinFontSize() + (((count - me.bounds.minCount)/me.bounds.fontScale) >> 0),
            font = fontSize+'px \'' + me.getFontFamily() + '\'',
            width, height;
        
        ctx.save();
        if (ctx.font != font) {
            ctx.font = font;
        }
        ctx.textBaseline = 'bottom';
        width = ctx.measureText(word).width >> 0;
        // experimental
        height = fontSize;
        ctx.restore();
            
        return {
            width: width,
            height: height,
            fontSize: fontSize
        };
    },


    getMeasuredWord: function(position, word, count, rotated){
        var me = this,
            wordSize = me.getWordSize(word, count),
            width = wordSize.width,
            height = wordSize.height,
            halfwidth = (!rotated)?width/2:height/2,
            halfheight = (!rotated)?height/2:width/2,
            p1 = [], p2 = [], p3 = [], p4 = [];
        
        
        // halfwidth and halfheight because the position is the center
        p1[0] = position.x - halfwidth;
        p1[1] = position.y - halfheight;
            
        p2[0] = position.x + halfwidth;
        p2[1] = position.y - halfheight;
            
        p3[0] = position.x + halfwidth;
        p3[1] = position.y + halfheight;
            
        p4[0] = position.x - halfwidth;
        p4[1] = position.y + halfheight;
        
        return [p1, p2, p3, p4];
    },
    
    // @private checks for word collisions
    checkForCollisions: function(currentWord){
        var me = this,
            prevWords = me.addedWords,
            length = prevWords.length,
            prevWord;

        for(var i = 0; i < length; i++){
            prevWord = prevWords[i];

            if(!!Ext.draw.Draw.intersect(currentWord, prevWord).length){
                return true;
            }
                
        }        
        return false;
    },
    // TODO:
    // let user specify boundary function and call it in here
    // @private checks if a word is in defined boundaries
    isInBoundaries: function(measuredWord){
        var me = this,
            bounds = me.bounds;
            
        return (measuredWord[0][0] && measuredWord[1][1] && (measuredWord[1][0] > bounds.width || measuredWord[1][1] > bounds.height));
    }
 });

/**
 * @class Ext.chart.interactions.Manager
 * @extends Ext.AbstractManager
 * @singleton
 * @private
 *
 * A singleton manager instance for chart interactions. Interaction classes register
 * themselves by name with this manager.
 */
Ext.define("Ext.chart.interactions.Manager", {
    singleton: true,
    extend: 'Ext.AbstractManager'
});
/**
 * @class Ext.chart.interactions.Abstract
 *
 * Defines a common abstract parent class for all interactions.
 *
 * @author Jason Johnston <jason@sencha.com>
 * @docauthor Jason Johnston <jason@sencha.com>
 */


Ext.define('Ext.chart.interactions.Abstract', { 
 
    mixins: {
        identifiable: 'Ext.mixin.Identifiable',
        observable: 'Ext.mixin.Observable'
    },

    config: {
        /**
         * @cfg {String} gesture
         * Specifies which gesture type should be used for starting the interaction.
         */
        gesture: 'tap',

        /**
         * @cfg {Ext.chart.Chart} chart
         */
        chart: false
    },

    constructor: function(config) {
        var me = this;
        me.initConfig(config);
    },

    /**
     * @protected
     * A method to be implemented by subclasses where all event attachment should occur.
     */
    initialize: Ext.emptyFn,

    updateChart: function (newChart, oldChart) {
        var me = this;
        if (oldChart === newChart) {
            return;
        }
        if (oldChart) {
            oldChart.un(me.getGesture(), me.onGesture, me);
        }
        if (newChart) {
            newChart.on(me.getGesture(), me.onGesture, me);
            //check whether we're using drag events then initialize them in the surface.
            if (me.getGesture() && me.getGesture() == 'drag' || me.panGesture && me.panGesture == 'drag') {
                newChart.getSurface('events').initializeDragEvents();
            }
        }
    },

    /**
     * @protected
     * Placeholder method.
     */
    onGesture: Ext.emptyFn,

    /**
     * @protected Find and return a single series item corresponding to the given event,
     * or null if no matching item is found.
     * @param {Event} e
     * @return {Object} the item object or null if none found.
     */
    getItemForEvent: function(e) {
        var me = this,
            chart = me.getChart(),
            chartXY = chart.getEventXY(e);
        return chart.getItemForPoint(chartXY[0], chartXY[1]);
    },

    /**
     * @protected Find and return all series items corresponding to the given event.
     * @param {Event} e
     * @return {Array} array of matching item objects
     */
    getItemsForEvent: function(e) {
        var me = this,
            chart = me.getChart(),
            chartXY = chart.getEventXY(e);
        return chart.getItemsForPoint(chartXY[0], chartXY[1]);
    },

    /**
     * @protected Add an event listener to this interaction's chart. All ineteraction event listeners
     * should be attached using this method, since it adds logic for honoring event locks.
     * @param name
     * @param fn
     * @param scope
     * @param opts
     */
    addChartListener: function(name, fn, scope, opts) {
        var me = this,
            locks = me.getLocks();
        me.getChart().on(
            name,
            // wrap the handler so it does not fire if the event is locked by another interaction
            function() {
                if (!(name in locks) || locks[name] === me) {
                    fn.apply(this, arguments);
                }
            },
            scope,
            opts
        );
    },

    lockEvents: function() {
        var me = this,
            locks = me.getLocks(),
            args = arguments,
            i = args.length;
        while (i--) {
            locks[args[i]] = me;
        }
    },

    unlockEvents: function() {
        var locks = this.getLocks(),
            args = arguments,
            i = args.length;
        while (i--) {
            delete locks[args[i]];
        }
    },

    getLocks: function() {
        var chart = this.getChart();
        return chart.lockedEvents || (chart.lockedEvents = {});
    },

    isMultiTouch: function() {
        return !(Ext.os.is.MultiTouch === false || (Ext.os.is.Android && !Ext.os.is.hasOwnProperty('MultiTouch')) || Ext.os.is.Desktop);
    },

    initializeDefaults: Ext.emptyFn,

    /* ---------------------------------
      Methods needed for ComponentQuery
     ----------------------------------*/

    //filled by the constructor.
    parent: null,

    getItemId: function() {
        return this.id || (this.id = Ext.id());
    },

    initCls: function() {
        return (this.cls || '').split(' ');
    },

    isXType: function(xtype) {
        return xtype === 'interaction';
    },

    getRefItems: function(deep) {
        return [];
    }
});

/**
 * @class Ext.chart.interactions.DelayedSync
 *
 * This is a mixin for chart interactions which gives them basic support for synchronizing
 * the chart to the user's interaction after a configurable {@link #syncDelay delay}. This
 * is useful for example in interactions which perform fast CSS3 transformation during the
 * interaction's gesture, but needs to perform a full synchronization to that transformation
 * for full quality after a delay.
 *
 * @author Jason Johnston <jason@sencha.com>
 * @docauthor Jason Johnston <jason@sencha.com>
 */
Ext.define('Ext.chart.interactions.DelayedSync', {

    config: {
        /**
         * @cfg {Number} syncDelay
         * Specifies a timeout in milliseconds between when the user finishes an interaction
         * gesture and when the chart are synced and redrawn to match.
         */
        syncDelay: 500,
    
        /**
         * @cfg {String} syncWaitText
         * The text to be displayed while the chart is redrawing itself after the interaction sync.
         */
        syncWaitText: 'Rendering...'
    },

    constructor: function() {
        var me = this,
            DelayedTask = Ext.util.DelayedTask;

        me.startSyncTask = new DelayedTask(me.startSync, me);
        me.doSyncTask = new DelayedTask(me.doSync, me);
        me.unlockInteractionTask = new DelayedTask(me.unlockInteraction, me);
    },

    sync: Ext.emptyFn,

    needsSync: function() {
        return true;
    },

    startSync: function() {
        var me = this;
        if (me.needsSync()) {
            me.lockInteraction();
            // Must delay the actual rerender to allow the lock/mask to take effect
            me.doSyncTask.delay(1);
        }
    },

    doSync: function() {
        var me = this;

        // Invoke the class's sync logic
        if (me.needsSync()) {
            me.sync();
        }

        // Must delay the unlock otherwise the browser will queue the events during
        // render and apply them immediately afterward
        me.unlockInteractionTask.delay(1);
    },

    cancelSync: function() {
        var me = this;
        me.startSyncTask.cancel();
        me.doSyncTask.cancel();
        me.unlockInteractionTask.cancel();
    },

    delaySync: function() {
        var me = this;
        me.cancelSync();
        me.startSyncTask.delay(me.getSyncDelay());
    },

    lockInteraction: function() {
        var me = this,
            chart = me.getChart(),
            chartEl = chart.element,
            stopEvent = me.stopEvent;

        me.unlockInteraction();
        chartEl.on({
            touchstart: stopEvent,
            touchmove: stopEvent,
            touchend: stopEvent,
            capture: true
        });

        // chartEl.mask(me.getSyncWaitText(), Ext.baseCSSPrefix + 'chart-wait', false);
        // Ext.repaint(); //mask doesn't get sized properly otherwise
    },

    unlockInteraction: function() {
        var me = this,
            chart = me.getChart(),
            chartEl = chart.element,
            stopEvent = me.stopEvent;

        chartEl.un({
            touchstart: stopEvent,
            touchmove: stopEvent,
            touchend: stopEvent,
            capture: true
        });

        // chartEl.unmask();
    },

    stopEvent: function(e) {
        e.stopEvent();
    }

});

/**
 * @class Ext.chart.interactions.PanZoom
 * @extends Ext.chart.interactions.Abstract
 *
 * The PanZoom interaction allows the user to navigate the data for one or more chart
 * axes by panning and/or zooming. Navigation can be limited to particular axes. Zooming is
 * performed by pinching on the chart or axis area; panning is performed by single-touch dragging.
 *
 * For devices which do not support multiple-touch events, zooming can not be done via pinch
 * gestures; in this case the interaction will allow the user to perform both zooming and
 * panning using the same single-touch drag gesture. Tapping the chart will switch between
 * the two modes, {@link #modeIndicatorDuration briefly displaying a graphical indicator}
 * showing whether it is in zoom or pan mode.
 *
 * You can attach this interaction to a chart by including an entry in the chart's
 * {@link Ext.chart.Chart#interactions interactions} config with the `panzoom` type:
 *
 *     new Ext.chart.Chart({
 *         renderTo: Ext.getBody(),
 *         width: 800,
 *         height: 600,
 *         store: store1,
 *         axes: [ ...some axes options... ],
 *         series: [ ...some series options... ],
 *         interactions: [{
 *             type: 'panzoom',
 *             axes: {
 *                 left: {
 *                     maxZoom: 5,
 *                     startZoom: 2
 *                 },
 *                 bottom: {
 *                     maxZoom: 2
 *                 }
 *             }
 *         }]
 *     });
 *
 * The configuration object for the `panzoom` interaction type should specify which axes
 * will be made navigable via the `axes` config. See the {@link #axes} config documentation
 * for details on the allowed formats. If the `axes` config is not specified, it will default
 * to making all axes navigable with the default axis options.
 *
 * @author Jason Johnston <jason@sencha.com>
 * @docauthor Jason Johnston <jason@sencha.com>
 */
Ext.define('Ext.chart.interactions.PanZoom', { 
 
    extend: 'Ext.chart.interactions.Abstract',

    type: 'panzoom',

    mixins: {
        delayedSync: 'Ext.chart.interactions.DelayedSync'
    },

    config: {
        
        /**
         * @cfg {Object/Array} axes
         * Specifies which axes should be made navigable. The config value can take the following formats:
         *
         * - An Object whose keys correspond to the {@link Ext.chart.axis.Axis#position position} of each
         *   axis that should be made navigable. Each key's value can either be an Object with further
         *   configuration options for each axis or simply `true` for a default set of options.
         *       {
         *           type: 'panzoom',
         *           axes: {
         *               left: {
         *                   maxZoom: 5,
         *                   allowPan: false
         *               },
         *               bottom: true
         *           }
         *       }
         *
         *   If using the full Object form, the following options can be specified for each axis:
         *
         *   - minZoom (Number) A minimum zoom level for the axis. Defaults to `1` which is its natural size.
         *   - maxZoom (Number) A maximum zoom level for the axis. Defaults to `10`.
         *   - startZoom (Number) A starting zoom level for the axis. Defaults to `1`.
         *   - allowZoom (Boolean) Whether zooming is allowed for the axis. Defaults to `true`.
         *   - allowPan (Boolean) Whether panning is allowed for the axis. Defaults to `true`.
         *   - startPan (Boolean) A starting panning offset for the axis. Defaults to `0`.
         *
         * - An Array of strings, each one corresponding to the {@link Ext.chart.axis.Axis#position position}
         *   of an axis that should be made navigable. The default options will be used for each named axis.
         *
         *       {
         *           type: 'panzoom',
         *           axes: ['left', 'bottom']
         *       }
         *
         * If the `axes` config is not specified, it will default to making all axes navigable with the
         * default axis options.
         */
        axes: true,
    
        /**
         * @cfg {Boolean} showOverflowArrows
         * If `true`, arrows will be conditionally shown at either end of each axis to indicate that the
         * axis is overflowing and can therefore be panned in that direction. Set this to `false` to
         * prevent the arrows from being displayed.
         */
        showOverflowArrows: true,
    
        /**
         * @cfg {Object} overflowArrowOptions
         * A set of optional overrides for the overflow arrow sprites' options. Only relevant when
         * {@link #showOverflowArrows} is `true`.
         */
    
        gesture: 'pinch'
    },
    
    panGesture: 'drag',

    applyAxes: function (axesConfig) {
        var result = {};
        if (axesConfig === true) {
            return {
                top: {},
                right: {},
                bottom: {},
                left: {}
            };
        } else if (Ext.isArray(axesConfig)) {
            // array of axis names - translate to full object form
            result = {};
            Ext.each(axesConfig, function(axis) {
                result[axis] = {};
            });
        } else if (Ext.isObject(axesConfig)) {
            Ext.iterate(axesConfig, function(key, val) {
                // axis name with `true` value -> translate to object
                if (val === true) {
                    result[key] = {};
                } else if (val !== false) {
                    result[key] = val;
                }
            });
        }
        return result;
    },

    constructor: function(config) {
        var me = this,
            zoomModeCls = Ext.baseCSSPrefix + 'zooming',
            axesConfig;

        me.callParent(arguments);
        me.mixins.delayedSync.constructor.apply(me, arguments);

        if (me.showOverflowArrows) {
            me.getChart().on('redraw', me.updateAllOverflowArrows, me);
        }

        // Add pan/zoom toggle button to toolbar if needed
        if (!me.isMultiTouch()) {
            me.zoomOnPanGesture = true; //default to zooming
            me.modeToggleButton = me.getChart().getToolbar().add({
                cls: [Ext.baseCSSPrefix + 'panzoom-toggle', zoomModeCls],
                iconCls: Ext.baseCSSPrefix + 'panzoom-toggle-icon',
                iconMask: true,
                handler: function() {
                    var button = this,
                        zoom = me.zoomOnPanGesture = !me.zoomOnPanGesture;
                    if (zoom) {
                        button.addCls(zoomModeCls);
                    } else {
                        button.removeCls(zoomModeCls);
                    }
                }
            });
        }
    },

    initialize: function() {
        var me = this;
        me.callParent(arguments);
        me.addChartListener(me.getGesture() + 'start', me.onGestureStart, me);
        me.addChartListener(me.getGesture() + 'end', me.onGestureEnd, me);
        me.addChartListener(me.panGesture + 'start', me.onPanGestureStart, me);
        me.addChartListener(me.panGesture, me.onPanGesture, me);
        me.addChartListener(me.panGesture + 'end', me.onPanGestureEnd, me);
    },

    initializeDefaults: function(opt) {
        var me = this;

        if (!opt || opt.type == 'beforerender') {
            me.onGestureStart();
            me.onPanGestureStart();

            me.getChart().getAxes().each(function(axis) {
                if (!me.getAxes()[axis.getPosition()]) {
                    return;
                }

                var config = me.getAxes()[axis.getPosition()],
                    startPan = config.startPan || 0,
                    startZoom = config.startZoom || 1;

                if (startPan != 0 || startZoom != 1) {
                    me.transformAxisBy(axis, startPan, startPan, startZoom, startZoom);
                }
            });
        }

        if (!opt || opt.type == 'afterrender') {
            me.onGestureEnd();
            me.onPanGestureEnd();
        }
    },

    getInteractiveAxes: function() {
        var me = this,
            axisConfigs = me.getAxes();
        return me.getChart().getAxes().filterBy(function(axis) {
            return !!axisConfigs[axis.getPosition()];
        });
    },

    isEventOnAxis: function(e, axis) {
        // TODO right now this uses the current event position but really we want to only
        // use the gesture's start event. Pinch does not give that to us though.
        var util = Ext.util;
        return !util.Region.getRegion(axis.getSurface().element).isOutOfBound(util.Point.fromEvent(e));
    },

    sync: function() {
        var me = this,
            chart = me.getChart(),
            anim = chart.getAnimate(),
            axes = me.getInteractiveAxes();

        chart.setAnimate(false);
//        chart.endsLocked = true;

        axes.each(function(axis) {
            if (axis.hasFastTransform()) {
                axis.syncToFastTransform();
            }
        });

        // sync all series bound to this axis
        me.getSeriesForAxes(axes).each(function(series) {
            if (series.hasFastTransform()) {
                series.syncToFastTransform();
            }
        });

        chart.redraw(true);
//        chart.endsLocked = false;
        chart.setAnimate(anim);

    },

    needsSync: function() {
        return !!this.getInteractiveAxes().findBy(function(axis) {
            return axis.hasFastTransform();
        });
    },

    transformAxisBy: function(axis, panX, panY, zoomX, zoomY) {
        var me = this,
            config = me.getAxes()[axis.getPosition()],
            minZoom = config.minZoom || 1,
            maxZoom = config.maxZoom || 4,
            isNumber = Ext.isNumber,
            length = axis.getLength(),
            isSide = axis.isSide(),
            pan = isSide ? panY : panX,
        zoom = isSide ? zoomY : zoomX;

        function doTransform(target) {
            var matrix = target.getTransformMatrix().clone(),
                currentZoom, inverse, inset;

            if (pan !== 0) {
                matrix.translate(isSide ? 0 : pan, isSide ? pan : 0);
            }

            if (zoom !== 1) {
                // constrain to minZoom/maxZoom zoom
                currentZoom = matrix.get(+isSide, +isSide);
                if (isNumber(minZoom)) {
                    zoom = Math.max(zoom, minZoom / currentZoom);
                }
                if (isNumber(maxZoom)) {
                    zoom = Math.min(zoom, maxZoom / currentZoom);
                }

                // use the matrix's inverse to find the scale origin that lines up with the middle of the axis
                inverse = matrix.invert();
                matrix.scale(
                isSide ? 1 : zoom, isSide ? zoom : 1, inverse.x(length / 2, 0), inverse.y(0, length / 2));
            }

            // constrain pan
            inset = matrix[isSide ? 'y' : 'x'](0, 0);
            if (inset > 0) {
                matrix.translate(isSide ? 0 : -inset, isSide ? -inset : 0);
            }
            inset = length - matrix[isSide ? 'y' : 'x'](length, length);
            if (inset > 0) {
                matrix.translate(isSide ? 0 : inset, isSide ? inset : 0);
            }

            target.setTransformMatrixFast(matrix);
        }

        doTransform(axis);
        axis.getBoundSeries().each(doTransform);

        if (me.showOverflowArrows) {
            me.updateAxisOverflowArrows(axis);
        }
    },

    getPannableAxes: function(e) {
        var me = this,
            axisConfigs = me.getAxes(),
            config;
        return me.getChart().getAxes().filterBy(function(axis) {
            config = axisConfigs[axis.getPosition()];
            return config && config.allowPan !== false && me.isEventOnAxis(e, axis);
        });
    },

    panBy: function(axes, x, y) {
        axes.each(function(axis) {
            this.transformAxisBy(axis, x, y, 1, 1);
        },
        this);
    },

    onPanGestureStart: function(e) {
        if (!e || !e.touches || e.touches.length < 2) { //Limit drags to single touch
            var me = this;
            me.cancelSync();
            if (me.zoomOnPanGesture) {
                me.onGestureStart(e);
            }
        }
    },

    onPanGesture: function(e) {
        if (!e.touches || e.touches.length < 2) { //Limit drags to single touch
            var me = this;
            if (me.zoomOnPanGesture) {
                me.zoomBy(me.getZoomableAxes(e), (e.previousX + e.previousDeltaX) / e.previousX, e.previousY / (e.previousY + e.previousDeltaY));
            } else {
                me.panBy(me.getPannableAxes(e), e.previousDeltaX, e.previousDeltaY);
            }
        }
    },

    onPanGestureEnd: function(e) {
        var me = this;
        if (me.zoomOnPanGesture) {
            me.onGestureEnd(e);
        } else {
            me.delaySync();
        }
    },

    getSeriesForAxes: function(axes) {
        var series = new Ext.util.MixedCollection(false, function(s) {
            return s.seriesId;
        });
        axes.each(function(axis) {
            series.addAll(axis.getBoundSeries().items);
        });
        return series;
    },

    getZoomableAxes: function(e) {
        var me = this,
            axisConfigs = me.getAxes(),
            config;
        return me.getChart().getAxes().filterBy(function(axis) {
            config = axisConfigs[axis.getPosition()];
            return config && config.allowZoom !== false && (!e || me.isEventOnAxis(e, axis));
        });
    },

    zoomBy: function(axes, zoomX, zoomY) {
        axes.each(function(axis) {
            this.transformAxisBy(axis, 0, 0, zoomX, zoomY);
        },
        this);
    },

    onGestureStart: function(e) {
        var me = this;
        me.cancelSync();

        // Hide axis labels while zooming
        me.getZoomableAxes(e).each(function(axis) {
            axis.hideLabels();
            axis.getLabelSurface().renderFrame();
        });
    },

    onGesture: function(e) {
        var me = this,
            abs = Math.abs,
            xDistance = abs(e.touches[1].point.x - e.touches[0].point.x),
            yDistance = abs(e.touches[1].point.y - e.touches[0].point.y),
            lastDistances = me.lastZoomDistances || [xDistance, yDistance],
            zoomX = xDistance < 30 ? 1 : xDistance / (lastDistances[0] || xDistance),
            zoomY = yDistance < 30 ? 1 : yDistance / (lastDistances[1] || yDistance);
        me.zoomBy(me.getZoomableAxes(e), zoomX, zoomY);
        me.lastZoomDistances = [xDistance, yDistance];
    },

    onGestureEnd: function(e) {
        var me = this;

        me.delaySync();
        delete me.lastZoomDistances;
    },

    getOverflowArrow: function(axis, direction, opts) {
        var me = this,
            axisPos = axis.getPosition(),
            allIndicators = me.overflowIndicators || (me.overflowIndicators = {}),
            axisIndicators = allIndicators[axisPos] || (allIndicators[axisPos] = {});
        return axisIndicators[direction] || (
        axisIndicators[direction] = Ext.chart.Shape.arrow(me.getChart().getEventsSurface(), opts));
    },

    updateAxisOverflowArrows: function(axis) {
        var me = this,
            isSide = axis.isSide(),
            axisPos = axis.getPosition(),
            allowPan = me.getAxes()[axisPos].allowPan !== false,
            length = axis.getLength() || 1,
            chart = me.getChart(),
            bbox = chart.chartBBox,
            matrix = axis.getTransformMatrix(),
            spriteOpts = Ext.apply({
                hidden: true,
                radius: 5,
                opacity: 0.3,
                fill: axis.style.stroke
            }, me.overflowArrowOptions),
            math = Math,
            ceil = math.ceil,
            floor = math.floor,
            upSprite = me.getOverflowArrow(axis, 'up', spriteOpts),
            downSprite = me.getOverflowArrow(axis, 'down', spriteOpts),
            path;

        if (allowPan && (isSide ? ceil(matrix.y(0, 0)) < 0 : floor(matrix.x(length, 0)) > length)) {
            // Top
            if (isSide) {
                path = ['M', bbox.x, bbox.y, 'l', bbox.width / 2, 0, 0, 5, -10, 10, 20, 0, -10, -10, 0, -5, bbox.width / 2, 0, 0, 20, -bbox.width, 0, 'z'].join(',');
            }
            // Right
            else {
                path = ['M', bbox.x + bbox.width, bbox.y, 'l', 0, bbox.height / 2, -5, 0, -10, -10, 0, 20, 10, -10, 5, 0, 0, bbox.height / 2, -20, 0, 0, -bbox.height, 'z'].join(',');
            }
            upSprite.setAttributes({
                hidden: false,
                path: path
            });
        } else {
            upSprite.hide();
        }

        if (allowPan && (isSide ? floor(matrix.y(0, length)) > length : ceil(matrix.x(0, 0)) < 0)) {
            // Bottom
            if (isSide) {
                path = ['M', bbox.x, bbox.y + bbox.height, 'l', bbox.width / 2, 0, 0, -5, -10, -10, 20, 0, -10, 10, 0, 5, bbox.width / 2, 0, 0, -20, -bbox.width, 0, 'z'].join(',');
            }
            // Left
            else {
                path = ['M', bbox.x, bbox.y, 'l', 0, bbox.height/ 2, 5, 0, 10, -10, 0, 20, -10, -10, -5, 0, 0, bbox.height / 2, 20, 0, 0, -bbox.height, 'z'].join(',');
            }
            downSprite.setAttributes({
                hidden: false,
                path: path
            });
        } else {
            downSprite.hide();
        }

        if (upSprite.dirtyTransform || upSprite.dirtyHidden || downSprite.dirtyTransform || downSprite.dirtyHidden) {
            me.getChart().getEventsSurface().renderFrame();
        }
    },

    updateAllOverflowArrows: function() {
        var me = this;
        me.getInteractiveAxes().each(me.updateAxisOverflowArrows, me);
    }
}, function () {
    Ext.chart.interactions.Manager.registerType('panzoom', Ext.chart.interactions.PanZoom);
});

/**
 * @class Ext.chart.interactions.PieGrouping
 * @extends Ext.chart.interactions.Abstract
 * 
 * The PieGrouping interaction allows the user to select a group of consecutive slices
 * in a {@link Ext.chart.series.Pie pie series} to get additional information about the
 * group. It provides an interactive user interface with handles that can be dragged
 * around the pie to add/remove slices in the selection group.
 *
 * You can attach this interaction to a chart by including an entry in the chart's
 * {@link Ext.chart.Chart#interactions interactions} config with the `piegrouping` type:
 *
 *     new Ext.chart.Chart({
 *         renderTo: Ext.getBody(),
 *         width: 800,
 *         height: 600,
 *         store: store1,
 *         series: [ ...pie series options... ],
 *         interactions: [{
 *             type: 'piegrouping'
 *         }]
 *     });
 *
 * @author Jason Johnston <jason@sencha.com>
 * @docauthor Jason Johnston <jason@sencha.com>
 */
Ext.define('Ext.chart.interactions.PieGrouping', { 
 
    extend: 'Ext.chart.interactions.Abstract',

    type: 'piegrouping',

    config: {

        /**
         * @cfg {String} gesture
         * Specifies the gesture that, when performed on a slice in the pie series, initializes the
         * selection UI on that slice.
         */
        gesture: 'tap',

        /**
         * @cfg {Number} outset
         * Specifies how far beyond the pie circle radius the selection overlay extends.
         */
        outset: 6,

        /**
         * @cfg {Boolean} snapWhileDragging
         * If set to `true`, the selection overlay will snap to the nearest pie slice continuously
         * while the user is dragging the handles, firing the {@link #selectionchange} event each
         * time it snaps. Otherwise, the selection will only snap to the nearest slice when the user
         * releases the handle drag, firing the event once.
         */
        snapWhileDragging: false,

        /**
         * @cfg {Function} onSelectionChange
         * A handler function that can be implemented to handle selection changes, as an alternative
         * to adding a listener for the {@link #selectionchange} event. The function will be passed
         * the same parameters as are passed to selectionchange listeners.
         */
        onSelectionChange: Ext.emptyFn
    },

    // TODO does it make sense to make this configurable? Are any other gestures relevant for this?
    resizeGesture: 'drag',

    /**
     * @event selectionchange
     * Fired when the set of selected pie slice items changes.
     * @param {Ext.chart.interactions.PieGrouping} interaction
     * @param {Array} selectedItems
     */

    constructor: function(config) {
        var me = this;

        me.callParent(arguments);

        me.handleStyle = new Ext.chart.interactions.PieGrouping.HandleStyle();
        me.sliceStyle = new Ext.chart.interactions.PieGrouping.SliceStyle();
    },

    initialize: function() {
        var me = this,
            resizeGesture = me.resizeGesture;
        me.callParent();
        me.addChartListener(resizeGesture + 'start', me.onResizeStart, me);
        me.addChartListener(resizeGesture, me.onResize, me);
        me.addChartListener(resizeGesture + 'end', me.onResizeEnd, me);
    },

    onGesture: function(e) {
        var me = this,
            outset = me.getOutset(),
            item = me.getItemForEvent(e),
            handleStyle = me.handleStyle.style,
            sliceStyle = me.sliceStyle.style,
            surface, startAngle, endAngle, handleLine;

        // If already active, allow tap outside the pie to cancel selection, or tapping an item
        // not within the selection to start a new selection.
        if (me.active && (!item || me.getSelectedItems().indexOf(item) < 0)) {
            me.cancel();
        }

        // Start selection at the tapped item's boundaries
        if (!me.active && item) {
            surface = me.getSeries().getOverlaySurface();
            startAngle = item.startAngle;
            endAngle = item.endAngle;

            me.slice = {
                startAngle: startAngle,
                endAngle: endAngle,
                sprite: surface.add(Ext.applyIf({
                    type: 'path'
                }, sliceStyle))
            };

            handleLine = 'M' + Math.max(item.startRho - outset, 0) + ',0L' + (item.endRho + outset) + ',0';
            me.startHandle = {
                angle: startAngle,
                sprite: surface.add(Ext.applyIf({
                    type: 'path',
                    path: handleLine + 'l5,-8l-10,0l5,8',
                    fill: handleStyle.stroke
                }, handleStyle))
            };
            me.endHandle = {
                angle: endAngle,
                sprite: surface.add(Ext.applyIf({
                    type: 'path',
                    path: handleLine + 'l5,8l-10,0l5,-8',
                    fill: handleStyle.stroke
                }, handleStyle))
            };

            me.getSeries().on('draw', me.onSeriesDraw, me);

            me.active = true;
            me.updateSprites();
            me.fireSelectionChange();
        }
    },

    onResizeStart: function(e) {
        var me = this,
            abs = Math.abs,
            normalizeAngle = me.normalizeAngle,
            startHandle = me.startHandle,
            endHandle = me.endHandle,
            resizeGesture = me.resizeGesture,
            activeHandle, angle;
        if (me.active) {
            angle = normalizeAngle(me.getAngleForEvent(e));
            if (abs(angle - normalizeAngle(startHandle.angle)) < 10) {
                activeHandle = startHandle;
            }
            else if (abs(angle - normalizeAngle(endHandle.angle)) < 10) {
                activeHandle = endHandle;
            }

            if (activeHandle) {
                me.lockEvents(resizeGesture + 'start', resizeGesture, resizeGesture + 'end');
            }
            me.activeHandle = activeHandle;
        }
    },

    onResize: function(e) {
        var me = this,
            handle = me.activeHandle,
            snapWhileDragging = me.getSnapWhileDragging(),
            slice = me.slice,
            sliceStartAngle, sliceEndAngle,
            sliceChanged = false,
            handleAngle;
        if (handle) {
            sliceStartAngle = slice.startAngle;
            sliceEndAngle = slice.endAngle;
            handleAngle = me.getAngleForEvent(e);
            handle.angle = handleAngle;

            if (handle === me.startHandle) {
                sliceStartAngle = snapWhileDragging ? me.snapToItemAngles(handleAngle, 0)[0] : handleAngle;
                while (sliceStartAngle > sliceEndAngle) {
                    sliceStartAngle -= 360;
                }
                while (sliceStartAngle <= sliceEndAngle) {
                    sliceStartAngle += 360;
                }
                if (slice.startAngle !== sliceStartAngle || !snapWhileDragging) {
                    sliceChanged = true;
                }
                slice.startAngle = sliceStartAngle;
            } else {
                sliceEndAngle = snapWhileDragging ? me.snapToItemAngles(0, handleAngle)[1] : handleAngle;
                while (sliceStartAngle > sliceEndAngle) {
                    sliceEndAngle += 360;
                }
                while (sliceStartAngle <= sliceEndAngle) {
                    sliceEndAngle -= 360;
                }
                if (slice.endAngle !== sliceEndAngle || !snapWhileDragging) {
                    sliceChanged = true;
                }
                slice.endAngle = sliceEndAngle;
            }

            me.updateSprites();
            if (sliceChanged && snapWhileDragging) {
                me.fireSelectionChange();
            }
        }
    },

    onResizeEnd: function(e) {
        var me = this,
            handle = me.activeHandle,
            startHandle = me.startHandle,
            endHandle = me.endHandle,
            slice = me.slice,
            closestAngle = me.closestAngle,
            resizeGesture = me.resizeGesture,
            snappedAngles, sliceStartAngle, sliceEndAngle;
        
        if (handle) {
            snappedAngles = me.snapToItemAngles(startHandle.angle, endHandle.angle);
            sliceStartAngle = slice.startAngle;
            sliceEndAngle = slice.endAngle;

            if (handle === startHandle) {
                startHandle.angle = closestAngle(snappedAngles[0], startHandle.angle, 1);
                sliceStartAngle = snappedAngles[0];
                while (sliceStartAngle > sliceEndAngle) {
                    sliceStartAngle -= 360;
                }
                while (sliceStartAngle <= sliceEndAngle) {
                    sliceStartAngle += 360;
                }
                slice.startAngle = sliceStartAngle;
            } else {
                endHandle.angle = closestAngle(snappedAngles[1], endHandle.angle, 0);
                sliceEndAngle = snappedAngles[1];
                while (sliceStartAngle > sliceEndAngle) {
                    sliceEndAngle += 360;
                }
                while (sliceStartAngle <= sliceEndAngle) {
                    sliceEndAngle -= 360;
                }
                slice.endAngle = sliceEndAngle;
            }

            me.updateSprites(true);
            if (!me.getSnapWhileDragging()) {
                me.fireSelectionChange();
            }
            delete me.activeHandle;

            me.unlockEvents(resizeGesture + 'start', resizeGesture, resizeGesture + 'end');
        }
    },

    /**
     * @private tries to sync the selection overlay to the series when it is redrawn
     */
    onSeriesDraw: function() {
        var me = this,
            startHandle = me.startHandle,
            endHandle = me.endHandle,
            slice = me.slice,
            lastSelection = me.lastSelection,
            oldStartItem, oldEndItem,
            newStartItem, newEndItem;
        if (me.active && lastSelection) {
            oldStartItem = lastSelection[0];
            oldEndItem = lastSelection[lastSelection.length - 1];

            newStartItem = me.findItemByRecord(oldStartItem.storeItem);
            newEndItem = me.findItemByRecord(oldEndItem.storeItem);

            if (!newStartItem || !newEndItem) {
                me.cancel();
            } else {
                startHandle.angle = slice.startAngle = newStartItem.startAngle;
                endHandle.angle = slice.endAngle = newEndItem.endAngle;
                while (slice.startAngle > slice.endAngle) {
                    slice.startAngle -= 360;
                }
                while (slice.startAngle <= slice.endAngle) {
                    slice.startAngle += 360;
                }
                me.updateSprites();
                me.fireSelectionChange();
            }
        }
    },

    findItemByRecord: function(record) {
        var items = this.getSeries().items,
            i = items.length;
        while (i--) {
            if (items[i] && items[i].storeItem === record) {
                return items[i];
            }
        }
    },

    normalizeAngle: function(angle) {
        while (angle < 0) {
            angle += 360;
        }
        return angle % 360;
    },

    fireSelectionChange: function() {
        var me = this,
            items = me.getSelectedItems();
        me.getOnSelectionChange()(me, items);
        me.fireEvent('selectionchange', me, items);
        me.lastSelection = items;
    },

    renderFrame: function() {
        this.getSeries().getOverlaySurface().renderFrame();
    },

    updateSprites: function(animate) {
        var me = this,
            series = me.getSeries(),
            startHandle = me.startHandle,
            endHandle = me.endHandle,
            angle1 = startHandle.angle,
            angle2 = endHandle.angle,
            centerX = series.centerX,
            centerY = series.centerY,
            slice = me.slice,
            outset = me.getOutset(),
            item1, item2, attrs;

        if (me.active) {
            // Start handle
            attrs = {
                rotate: {
                    degrees: angle1,
                    x: 0,
                    y: 0
                },
                translate: {
                    x: centerX,
                    y: centerY
                }
            };
            if (animate) {
                startHandle.sprite.fx.stop();
                startHandle.sprite.fx.start(attrs);
            } else {
                startHandle.sprite.setAttributes(attrs, true);
            }

            // End handle
            attrs = {
                rotate: {
                    degrees: angle2,
                    x: 0,
                    y: 0
                },
                translate: {
                    x: centerX,
                    y: centerY
                }
            };
            if (animate) {
                endHandle.sprite.fx.stop();
                endHandle.sprite.fx.start(attrs);
            } else {
                endHandle.sprite.setAttributes(attrs, true);
            }

            // Slice
            item1 = series.getItemForAngle(angle1 - 1e-9);
            item2 = series.getItemForAngle(angle2 + 1e-9);
            if (!item1 || !item2) {
                me.cancel();
                return;
            }

            attrs = {
                segment: {
                    startAngle: slice.startAngle,
                    endAngle: slice.endAngle,
                    startRho: Math.max(Math.min(item1.startRho, item2.startRho) - outset, 0),
                    endRho: Math.min(item1.endRho, item2.endRho) + outset
                }
            };
            if (animate) {
                slice.sprite.fx.stop();
                slice.sprite.fx.start(attrs);
            } else {
                slice.sprite.setAttributes(attrs, true);
            }

            if (!animate) {
                me.renderFrame();
            }
        }
    },

    snapToItemAngles: function(startAngle, endAngle) {
        var me = this,
            series = me.getSeries(),
            item1 = series.getItemForAngle(startAngle - 1e-9),
            item2 = series.getItemForAngle(endAngle + 1e-9);
        return [item1.startAngle, item2.endAngle];
    },

    closestAngle: function(target, current, dir) {
        if (dir) {
            while (target > current) {
                target -= 360;
            }
            while (target < current) {
                target += 360;
            }
        } else {
            while (target < current) {
                target += 360;
            }
            while (target > current) {
                target -= 360;
            }
        }
        return target;
    },

    cancel: function() {
        var me = this,
            series;
        if (me.active) {
            series = me.getSeries();
            Ext.destroy(me.startHandle.sprite, me.endHandle.sprite, me.slice.sprite);
            me.active = false;
            me.startHandle = me.endHandle = me.slice = null;
            me.fireSelectionChange();
            me.renderFrame();
            me.un(series, 'draw', me.onSeriesDraw, me);
        }
    },

    getSelectedItems: function() {
        var me = this,
            slice = me.slice,
            selectedItems,
            series = me.getSeries(),
            allItems, item1Index, item2Index;

        if (me.active) {
            allItems = me.getSeries().items;
            item1Index = allItems.indexOf(series.getItemForAngle(slice.startAngle - 1e-9));
            item2Index = allItems.indexOf(series.getItemForAngle(slice.endAngle + 1e-9));

            if (item1Index <= item2Index) {
                selectedItems = allItems.slice(item1Index, item2Index + 1);
            } else {
                selectedItems = allItems.slice(item1Index).concat(allItems.slice(0, item2Index + 1));
            }

            // prune undefined items
            selectedItems = selectedItems.filter(function(item, i, arr) {
                return i in arr;
            });
        }
        return selectedItems || [];
    },

    getAngleForEvent: function(e) {
        var me = this,
            series = me.getSeries(),
            seriesXY = series.getSurface().element.getXY();
        return Ext.draw.Draw.degrees(
            Math.atan2(e.pageY - series.centerY - seriesXY[1], e.pageX - series.centerX - seriesXY[0])
        );
    },

    getSeries: function() {
        var me = this,
            series = me._series;
        if (!series) {
            series = me._series = me._chart._series.findBy(function(series) {
                return series.type === 'pie';
            });
            series.getOverlaySurface().customAttributes.segment = function(opts) {
                return series.getSegment(opts);
            };
        }
        return series;
    },



    /* ---------------------------------
      Methods needed for ComponentQuery
     ----------------------------------*/

    getRefItems: function(deep) {
        return [this.handleStyle, this.sliceStyle];
    }

}, function () {
    Ext.chart.interactions.Manager.registerType('piegrouping', Ext.chart.interactions.PieGrouping);
});


Ext.define('Ext.chart.interactions.PieGrouping.HandleStyle', { 
 
    extend: 'Ext.chart.theme.Style',
    
    isXType: function(xtype) {
        return xtype === 'handle';
    }
});

Ext.define('Ext.chart.interactions.PieGrouping.SliceStyle', { 
 
    extend: 'Ext.chart.theme.Style',
    
    isXType: function(xtype) {
        return xtype === 'slice';
    }
});


/**
 * @class Ext.chart.interactions.Rotate
 * @extends Ext.chart.interactions.Abstract
 *
 * The Rotate interaction allows rotation of a Pie or Radar chart series. By default rotation
 * is performed via a single-finger drag around the center of the series, but can be configured
 * to use a two-finger pinch-rotate gesture by setting `gesture: 'pinch'`.
 *
 * To attach this interaction to a chart, include an entry in the chart's
 * {@link Ext.chart.Chart#interactions interactions} config with the `rotate` type:
 *
 *     new Ext.chart.Chart({
 *         renderTo: Ext.getBody(),
 *         width: 800,
 *         height: 600,
 *         store: store1,
 *         series: [ ...pie/radar series options... ],
 *         interactions: [{
 *             type: 'rotate'
 *         }]
 *     });
 *
 * @author Jason Johnston <jason@sencha.com>
 * @docauthor Jason Johnston <jason@sencha.com>
 */
Ext.define('Ext.chart.interactions.Rotate', { 
 
    extend: 'Ext.chart.interactions.Abstract',

    type: 'rotate',

    mixins: {
        delayedSync: 'Ext.chart.interactions.DelayedSync'
    },

    config: {
        /**
         * @cfg {String} gesture
         * Defines the gesture type that will be used to rotate the chart. Currently only
         * supports `pinch` for two-finger rotation and `drag` for single-finger rotation.
         */
        gesture: 'drag'
    },

    constructor: function(config) {
        var me = this;
        me.callParent(arguments);
        me.mixins.delayedSync.constructor.apply(me, arguments);
    },

    initialize: function() {
        var me = this,
            gesture = me.getGesture();
        me.callParent();
        me.addChartListener(gesture + 'start', me.onGestureStart, me);
        me.addChartListener(gesture + 'end', me.onGestureEnd, me);
    },

    onGestureStart: function(e) {
        var me = this,
            axis = me.getAxis();
        me.cancelSync();
        me.getSeries().each(function(series) {
            series.unHighlightItem();
            series.origHighlight = series.highlight;
            series.highlight = false;
            if (series.callouts) {
                series.hideCallouts(0);
                series.getSurface().renderFrame();
            }
        });
        if (axis && axis.getPosition() === 'radial') {
            axis.hideLabels();
            axis.renderFrame();
        }
    },

    onGesture: function(e) {
        var me = this,
            oldAngle = me.lastAngle,
            firstPageX, secondPageX, firstPageY, secondPageY,
            series, seriesXY, newAngle, undef;

        if (me.getGesture() === 'pinch') {
            // Multi-touch pinch event - use angle between two touches
            firstPageX = e.firstPageX;
            firstPageY = e.firstPageY;
            secondPageX = e.secondPageX;
            secondPageY = e.secondPageY;
        } else {
            // Single-touch event - use angle between touch point and series center
            series = me.getSeries().get(0);
            seriesXY = series.getSurface().element.getXY();
            firstPageX = series.centerX + seriesXY[0];
            firstPageY = series.centerY + seriesXY[1];
            secondPageX = e.pageX;
            secondPageY = e.pageY;
        }
        newAngle = Ext.draw.Draw.degrees(Math.atan2(secondPageY - firstPageY, secondPageX - firstPageX));

        if (oldAngle === undef) {
            oldAngle = Ext.draw.Draw.degrees(Math.atan2(e.startY - firstPageY, e.startX - firstPageX));
        }

        if (oldAngle !== newAngle) {
            me.rotateBy(newAngle - oldAngle);
        }

        me.lastAngle = newAngle;
    },

    onGestureEnd: function() {
        var me = this;
        me.delaySync();
        me.getSeries().each(function(series) {
            series.highlight = series.origHighlight;
        });
        delete me.lastAngle;
    },

    rotateBy: function(angle) {
        var me = this,
            series = me.getSeries(),
            axis = me.getAxis(),
            matrix;

        me.rotation = (me.rotation || 0) + angle;

        series.each(function(series) {
            matrix = series.getFastTransformMatrix();
            matrix.rotate(angle, series.centerX, series.centerY);
            series.setFastTransformMatrix(matrix);
        });

        if (axis) {
            matrix = axis.getFastTransformMatrix();
            matrix.rotate(angle, axis.centerX, axis.centerY);
            axis.setFastTransformMatrix(matrix);
        }
    },

    seriesFilter: function(series) {
        return series.type === 'pie' || series.type === 'radar';
    },

    getSeries: function() {
        return this.getChart().getSeries().filter(this.seriesFilter);
    },

    axisFilter: function(axis) {
        return axis.getPosition() === 'radial';
    },

    getAxis: function() {
        return this.getChart().getAxes().findBy(this.axisFilter);
    },

    sync: function() {
        var me = this,
            chart = me.getChart(),
            axis = me.getAxis(),
            anim = chart.getAnimate();

        chart.setAnimate(false);
        me.getSeries().each(function(series) {
            series.setRotation(series.getRotation() - me.rotation);
            series.drawSeries();
            series.getSurface().renderFrame();
            series.clearTransform();
        });
        if (axis) {
            axis.setRotation(axis.getRotation() - me.rotation);
            axis.drawAxis();
            axis.renderFrame();
            axis.clearTransform();
        }
        chart.setAnimate(anim);

        me.rotation = 0;
    },

    needsSync: function() {
        return !!this.rotation;
    }
}, function () {
    Ext.chart.interactions.Manager.registerType('rotate', Ext.chart.interactions.Rotate);
});

/**
 * @class Ext.chart.interactions.ItemCompare
 * @extends Ext.chart.interactions.Abstract
 *
 * The ItemCompare interaction allows the user to select two data points in a series and
 * see a trend comparison between the two. An arrowed line will be drawn between the two points.
 *
 * You can attach this interaction to a chart by including an entry in the chart's
 * {@link Ext.chart.Chart#interactions interactions} config with the `itemcompare` type:
 *
 *     new Ext.chart.Chart({
 *         renderTo: Ext.getBody(),
 *         width: 800,
 *         height: 600,
 *         store: store1,
 *         axes: [ ...some axes options... ],
 *         series: [ ...some series options... ],
 *         interactions: [{
 *             type: 'itemcompare'
 *         }]
 *     });
 *
 * The display of the arrowed line {@link Ext.draw.Sprite sprites} can be customized via the
 * {@link #circle}, {@link #line}, and {@link #arrow} configs. It can also be given a global
 * {@link #offset position offset}.
 *
 * Use the {@link #show} and {@link #hide} events to perform additional actions when the trend
 * is displayed or hidden, such as displaying the trend change percentage to the user. Handlers
 * for these events are passed a reference to the ItemCompare interaction instance, so you
 * can access data from the {@link #item1} and {@link #item2} properties.
 *
 * @author Nicolas Garcia Belmonte <nicolas@sencha.com>
 * @docauthor Jason Johnston <jason@sencha.com>
 */
Ext.define('Ext.chart.interactions.ItemCompare', {
    extend: 'Ext.chart.interactions.Abstract',
    config: {
        /**
         * @cfg {Object} circle
         * Custom {@link Ext.draw.Sprite} configuration to be applied to the sprite for the trend
         * line's starting circle.
         */
        /**
         * @cfg {Object} line
         * Custom {@link Ext.draw.Sprite} configuration to be applied to the sprite for the trend
         * line's connecting line.
         */
        /**
         * @cfg {Object} arrow
         * Custom {@link Ext.draw.Sprite} configuration to be applied to the sprite for the trend
         * line's ending arrow.
         */
        /**
         * @cfg {Object} offset
         * An optional x and y offset for the trend line's sprites in relation to the series items'
         * target points.
         */
        offset: {"x": 0, "y": 0}
    },

    /**
     * @property item1
     * @type {Object}
     * An object containing information about the first selected data point item if any.
     */

    /**
     * @property item2
     * @type {Object}
     * An object containing information about the second selected data point item if any.
     */

    /**
     * @event show
     * Fired when the point-to-point comparison is displayed
     * @param {Ext.chart.interactions.ItemCompare} this interaction instance
     */

    /**
     * @event hide
     * Fired when the point-to-point comparison is hidden
     * @param {Ext.chart.interactions.ItemCompare} this interaction instance
     */

    type: 'itemcompare',
    
    constructor: function(config) {
        var me = this;
        me.circleStyle = new (Ext.extend(Ext.chart.theme.Style, {isXType: function(xtype) {return xtype === 'circle';}}))(config.circle);
        me.lineStyle = new (Ext.extend(Ext.chart.theme.Style, {isXType: function(xtype) {return xtype === 'line';}}))(config.line);
        me.arrowStyle = new (Ext.extend(Ext.chart.theme.Style, {isXType: function(xtype) {return xtype === 'arrow';}}))(config.arrow);

        delete config.line;
        delete config.circle;
        delete config.arrow;

        me.callParent(arguments);
    },

    updateChart: function (newChart, oldChart) {
        var me = this;
        if (newChart != oldChart) {
            oldChart && oldChart.un('refresh', me.reset, me);
            newChart && newChart.on('refresh', me.reset, me);
        }
        me.callParent([newChart, oldChart]);
    },

    onGesture: function(e) {
        var me = this,
            item = me.getItemForEvent(e);
        if (item) {
            //if we were already showing the overlay for previous items, then reset
            if (me.item1 && me.item2) {
                me.reset();
            }

            if (me.item1) {
                if (me.item1.series != item.series) {
                    me.reset();
                }
                else if (item !== me.item1) {
                    me.item2 = item;
                    item.series.highlightItem(item);
                    me.showOverlay();
                }
            } else {
                me.item1 = item;
                item.series.highlightItem(item);
            }
        } else {
            me.reset();
        }
    },

    /**
     * Resets any selected comparison items, removes the overlay arrow if present, and fires
     * the 'hide' event.
     */
    reset: function() {
        var me = this,
            series = me.activeSeries;

        if (series) {
            me.line.remove();
            me.circle.remove();
            me.arrow.remove();
            series.unHighlightItem();
            series.un('transform', me.onSeriesTransform, me);
            series.getOverlaySurface().renderFrame();
            delete me.activeSeries;
        }

        me.item1 = me.item2 = null;
        me.fireEvent('hide', me);
    },

    onSeriesTransform: function(obj, fast) {
        if (!fast) {
            this.renderSprites();
        }
    },

    showOverlay: function() {
        var me = this,
            series = me.item1.series; //both items are always from the same series
        me.activeSeries = series;
        series.on('transform', me.onSeriesTransform, me);

        me.renderSprites();
        me.fireEvent('show', me);
    },

    initSprites: function() {
        var me = this,
            Sprite = Ext.draw.Sprite,
            arrowStyle = me.arrowStyle.style,
            arrowRadius;

        if (!me.line) {
            me.line = new Sprite(
                Ext.apply({
                    type: 'path',
                    path: ['M', 0, 0]
                },
                me.lineStyle.style)
            );

            me.circle = new Sprite(
                Ext.apply({
                    type: 'circle',
                    radius: 3
                },
                me.circleStyle.style)
            );

            arrowRadius = arrowStyle.radius || 3;
            me.arrow = new Sprite(
                Ext.apply({
                    type: 'path',
                    path: "M".concat("0,0m0-", arrowRadius * 0.58, "l", arrowRadius * 0.5, ",", arrowRadius * 0.87, "-", arrowRadius, ",0z")
                },
                arrowStyle)
            );
        }
    },

    renderSprites: function() {
        var me = this,
            item1 = me.item1,
            item2 = me.item2,
            series = item1.series, //both items are always from the same series
            overlaySurface, p1, p2, offset, offsetX, offsetY, x1, y1, x2, y2, line, circle, arrow;

        if (series) {
            me.initSprites();

            overlaySurface = series.getOverlaySurface();
            p1 = item1.point;
            p2 = item2.point;
            offset = me.getOffset() || {};
            offsetX = offset.x || 0;
            offsetY = offset.y || 0;
            x1 = (p1[0] + offsetX);
            y1 = (p1[1] + offsetY);
            x2 = (p2[0] + offsetX);
            y2 = (p2[1] + offsetY);
            line = me.line;
            circle = me.circle;
            arrow = me.arrow;

            line.setAttributes({
                path: ['M', x1, y1, 'L', x2, y2]
            });

            circle.setAttributes({
                translate: {
                    x: x1,
                    y: y1
                }
            });

            arrow.setAttributes({
                translate: {
                    x: x2,
                    y: y2
                },
                rotate: {
                    x: 0,
                    y: 0,
                    degrees: (Math.atan2(p2[1] - p1[1], p2[0] - p1[0]) * 180 / Math.PI - 90) + 180
                }
            });

            overlaySurface.add(line, circle, arrow);
            overlaySurface.renderFrame();
        }
    },


    /* ---------------------------------
      Methods needed for ComponentQuery
     ----------------------------------*/

    getRefItems: function(deep) {
        var me = this;
        return [me.arrowStyle, me.lineStyle, me.circleStyle];
    }

}, function () {
    Ext.chart.interactions.Manager.registerType('itemcompare', Ext.chart.interactions.ItemCompare);
});



/**
 * @class Ext.chart.interactions.ItemHighlight
 * @extends Ext.chart.interactions.Abstract
 *
 * The ItemHighlight interaction allows highlighting of series data items on the chart.
 * This interaction enables triggering and clearing the highlight on certain events, but
 * does not control how the highlighting is implemented or styled; that is handled by
 * each individual Series type and the {@link Ext.chart.Highlight} mixin. See the documentation
 * for that mixin for how to customize the highlighting effect.
 *
 * To attach this interaction to a chart, include an entry in the chart's
 * {@link Ext.chart.Chart#interactions interactions} config with the `itemhighlight` type:
 *
 *     new Ext.chart.Chart({
 *         renderTo: Ext.getBody(),
 *         width: 800,
 *         height: 600,
 *         store: store1,
 *         axes: [ ...some axes options... ],
 *         series: [ ...some series options... ],
 *         interactions: [{
 *             type: 'itemhighlight'
 *         }]
 *     });

 *
 * @author Jason Johnston <jason@sencha.com>
 * @docauthor Jason Johnston <jason@sencha.com>
 */
Ext.define('Ext.chart.interactions.ItemHighlight', { 
 
    extend: 'Ext.chart.interactions.Abstract',

    config: {
        gesture: 'tap'
    },

    unHighlightEvent: 'touchstart',

    initialize: function() {
        var me = this;
        me.callParent(arguments);
        me.addChartListener(me.unHighlightEvent, me.onUnHighlightEvent, me);
    },

    onGesture: function(e) {
        var me = this,
            items = me.getItemsForEvent(e),
            item, highlightedItem, series,
            i, len;

        for(i = 0, len = items.length; i < len; i++) {
            item = items[i];
            series = item.series;
            highlightedItem = series.highlightedItem;
            if (highlightedItem !== item) {
                if (highlightedItem) {
                    highlightedItem.series.unHighlightItem();
                }
                series.highlightItem(item);
                series.highlightedItem = item;
                series.getSurface().renderFrame();
            }
        }
    },

    onUnHighlightEvent: function(e) {
        var me = this,
            chart = me.getChart(),
            xy = chart.getEventXY(e),
            highlightedItem;
        chart.getSeries().each(function(series) {
            highlightedItem = series.highlightedItem;
            if (highlightedItem && highlightedItem !== series.getItemForPoint(xy[0], xy[1])) {
                series.unHighlightItem();
                delete series.highlightedItem;
            }
            series.getSurface().renderFrame();
        });
    }

}, function () {
    Ext.chart.interactions.Manager.registerType('itemhighlight', Ext.chart.interactions.ItemHighlight);
});

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

/**
 * @class Ext.chart.interactions.Reset
 * @extends Ext.chart.interactions.Abstract
 *
 * The Reset interaction allows resetting of all previous user interactions with
 * the chart. By default the reset is triggered by a double-tap on the empty chart
 * area; to customize the event use the {@link #event} config.
 *
 * To attach this interaction to a chart, include an entry in the chart's
 * {@link Ext.chart.Chart#interactions interactions} config with the `reset` type:
 *
 *     new Ext.chart.Chart({
 *         renderTo: Ext.getBody(),
 *         width: 800,
 *         height: 600,
 *         store: store1,
 *         axes: [ ...some axes options... ],
 *         series: [ ...some series options... ],
 *         interactions: [{
 *             type: 'reset'
 *         }]
 *     });

 * @author Nicolas Garcia Belmonte <nicolas@sencha.com>
 * @docauthor Jason Johnston <jason@sencha.com>
 */
Ext.define('Ext.chart.interactions.Reset', { 
 
    extend: 'Ext.chart.interactions.Abstract',

    type: 'reset',

    config: {
        /**
         * @cfg {String} gesture
         * Defines the gesture type that should trigger the chart reset. Gestures that occur on a series
         * item will be ignored.
         */
        gesture: 'doubletap',

        /**
         * @cfg {Boolean} confirm
         * If set to `true`, a dialog will be presented to the user to confirm that they want to reset
         * the chart.
         */
        confirm: false,

        /**
         * @cfg {String} confirmTitle
         * Specifies the title displayed in the confirmation dialog, if {@link #confirm} is `true`.
         */
        confirmTitle: 'Reset',

        /**
         * @cfg {String} confirmText
         * Specifies the text displayed in the confirmation dialog, if {@link #confirm} is `true`.
         */
        confirmText: 'Reset the chart?'
    },

    onGesture: function(e) {
        var me = this,
            chart = me.getChart();
        if (!me.getItemForEvent(e)) {
            if (me.confirm) {
                Ext.Msg.confirm(me.confirmTitle, me.confirmText, function(button) {
                    if (button === 'yes') {
                        chart.reset();
                    }
                });
            } else {
                chart.reset();
            }
        }
    }
}, function () {
    Ext.chart.interactions.Manager.registerType('reset', Ext.chart.interactions.Reset);
});

/**
 * @class Ext.chart.interactions.ToggleStacked
 * @extends Ext.chart.interactions.Abstract
 *
 * The ToggleStacked interaction allows toggling a {@link Ext.chart.series.Bar bar} or
 * {@link Ext.chart.series.Column column} series between stacked and grouped orientations
 * for multiple yField values. By default this is triggered via a `swipe` event; to customize
 * the trigger event modify the {@link #gesture} config.
 *
 * To attach this interaction to a chart, include an entry in the chart's
 * {@link Ext.chart.Chart#interactions interactions} config with the `togglestacked` type:
 *
 *     new Ext.chart.Chart({
 *         renderTo: Ext.getBody(),
 *         width: 800,
 *         height: 600,
 *         store: store1,
 *         axes: [ ...some axes options... ],
 *         series: [ ...bar or column series options... ],
 *         interactions: [{
 *             type: 'togglestacked',
 *             event: 'doubletap'
 *         }]
 *     });
 *
 * @author Jason Johnston <jason@sencha.com>
 * @docauthor Jason Johnston <jason@sencha.com>
 */
Ext.define('Ext.chart.interactions.ToggleStacked', { 
 
    extend: 'Ext.chart.interactions.Abstract',

    type: 'togglestacked',

    config: {

        /**
         * @cfg {String} gesture
         * Defines the gesture type that should trigger the toggle.
         */
        gesture: 'swipe',

        /**
         * @cfg {Boolean} animateDirect
         * If set to `true`, then animation will skip the intermediate disjoint state and simply
         * animate directly from the stacked to grouped orientation. Only relevant if the chart
         * is configured to allow animation.
         */
        animateDirect: false
    },

    onGesture: function(e) {
        var me = this,
            chart = me.getChart(),
            series = me.getSeries();

        if (series) {
            if (chart.getAnimate() && !me.getAnimateDirect()) {
                if (!me.locked) {
                    me.lock();
                    if (series.stacked) {
                        series.disjointStacked = true;
                        me.afterAnim(series, function() {
                            series.stacked = series.disjointStacked = false;
                            me.afterAnim(series, me.unlock);
                            chart.redraw();
                        });
                        series.drawSeries();
                    }
                    else {
                        series.stacked = series.disjointStacked = true;
                        me.afterAnim(series, function() {
                            series.disjointStacked = false;
                            me.afterAnim(series, me.unlock);
                            series.drawSeries();
                        });
                        chart.redraw();
                    }
                }
            } else {
                series.stacked = !series.stacked;
                chart.redraw();
            }
        }
    },

    lock: function() {
        this.locked = true;
    },

    unlock: function() {
        this.locked = false;
    },

    afterAnim: function(series, fn) {
        // TODO this fires too soon if the series is configured with bar labels
        var callback = function() {
            fn.apply(this, arguments);
            series.un('afterrender', callback);
        };
        series.on('afterrender', callback, this, {
            single: true,
            // must delay slightly so the handler can set another afterrender
            // listener without it getting called immediately:
            delay: 1
        });
    },

    getSeries: function() {
        return this.getChart().getSeries().findBy(function(series) {
            return series.type === 'bar' || series.type === 'column';
        });
    }
}, function () {
    Ext.chart.interactions.Manager.registerType('togglestacked', Ext.chart.interactions.ToggleStacked);
});

