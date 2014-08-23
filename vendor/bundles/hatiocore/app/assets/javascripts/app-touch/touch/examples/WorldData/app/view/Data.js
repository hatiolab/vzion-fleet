Ext.define("wd.view.Data", {
    extend: "Ext.chart.Chart",
    depth: [3, 3],
    config: {
        id: 'dataView',
        store: 'Current',
        theme: 'WorldData',
        interactions: [
            {
                type: 'reset'
            },
            {
                type: 'panzoom'
            },
            {
                type: 'iteminfo',
                gesture: 'longpress',
                panel: {
                    tpl: '<b> {title} :</b><br />{value:si} {unit}'
                }
            },
            {
                type: 'itemcompare'
            }
        ],
        axes: [
            {
                type: 'Numeric',
                grid: true,
                position: 'left',
                fields: ['value'],
                title: 'Value',
                label: {
                    renderer: Ext.util.Format.si
                }
            },
            {
                type: 'Time',
                dateFormat: 'Y',
                grid: true,
                position: 'bottom',
                fields: ['date'],
                title: 'Date',
                step: [Ext.Date.YEAR, 1],
                label: {
                }
            }
        ],
        series: [
            {
                type: 'line',
                lineWidth: 1,
                showMarkers: true,
                fill: true,
                axis: ['left', 'bottom'],
                xField: 'date',
                yField: 'value'
            }
        ]
    }
});