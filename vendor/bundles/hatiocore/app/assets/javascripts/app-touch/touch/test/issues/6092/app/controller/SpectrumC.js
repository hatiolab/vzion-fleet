Ext.define('SPECTRUM.controller.SpectrumC', {
    extend: 'Ext.app.Controller',

    stores: ['SpectrumStore'],

    models: ['SpectrumDot'],

    views: ['chart.Spectrum','chart.SpectrumPanel'],

    refs: [
        {
            ref: 'chart',
            selector: 'enpasosSpectrum'
        }
    ]
    ,

    requires: [
        'Ext.chart.*' ,
        'Ext.chart.series.*' ,
        'Ext.chart.axis.*' ,
        'Ext.draw.*'  ,
        'Ext.fx.*'
    ],

    init: function() {

        SPECTRUM.Logger.log('Initializing Spectrum Controller');

        this.control({
            'viewport  multislider': {
                changecomplete: this.onSliderChange
            },

	    'chart': {
	        render: function () {
		    console.log('rendered!');
		    var store = Ext.create('SPECTRUM.store.SpectrumStore');
		    var fn = function () {
			store.loadData([
			    {'a':21,'b':9,'c':0,'w':694873},
			    {'a':26,'b':8,'c':0,'w':694874},
			    {'a':30,'b':8,'c':0,'w':694875},
			    {'a':32,'b':7,'c':0,'w':694876},
			    {'a':32,'b':7,'c':0,'w':694877},
			    {'a':29,'b':6,'c':0,'w':694878},
			    {'a':25,'b':6,'c':0,'w':694879},
			    {'a':19,'b':6,'c':0,'w':694880},
			    {'a':14,'b':6,'c':0,'w':694881},
			    {'a':9,'b':7,'c':0,'w':694882},
			    {'a':5,'b':7,'c':0,'w':694883},
			    {'a':4,'b':7,'c':0,'w':694884},
			    {'a':5,'b':7,'c':0,'w':694885},
			    {'a':7,'b':6,'c':0,'w':694886},
			    {'a':10,'b':5,'c':0,'w':694887},
			    {'a':12,'b':4,'c':0,'w':694888},
			    {'a':13,'b':2,'c':0,'w':694889},
			    {'a':14,'b':1,'c':0,'w':694890},
			    {'a':14,'b':1,'c':0,'w':694891},
			    {'a':13,'b':0,'c':0,'w':694892},
			    {'a':13,'b':1,'c':0,'w':694893},
			    {'a':12,'b':2,'c':0,'w':694894},
			    {'a':12,'b':3,'c':0,'w':694895},
			    {'a':12,'b':5,'c':0,'w':694896},
			    {'a':11,'b':6,'c':0,'w':694897},
			    {'a':10,'b':7,'c':0,'w':694898},
			    {'a':9,'b':7,'c':0,'w':694899},
			    {'a':9,'b':6,'c':0,'w':694900},
			    {'a':8,'b':5,'c':0,'w':694901},
			    {'a':9,'b':4,'c':0,'w':694902},
			    {'a':10,'b':3,'c':0,'w':694903},
			    {'a':11,'b':3,'c':0,'w':694904},
			    {'a':11,'b':3,'c':0,'w':694905},
			    {'a':11,'b':4,'c':0,'w':694906},
			    {'a':11,'b':4,'c':0,'w':694907},
			    {'a':11,'b':5,'c':0,'w':694908},
			    {'a':11,'b':6,'c':0,'w':694909},
			    {'a':11,'b':7,'c':0,'w':694910},
			    {'a':12,'b':9,'c':0,'w':694911},
			    {'a':14,'b':12,'c':0,'w':694912},
			    {'a':15,'b':15,'c':0,'w':694913},
			    {'a':16,'b':18,'c':0,'w':694914},
			    {'a':18,'b':21,'c':0,'w':694915},
			    {'a':19,'b':21,'c':0,'w':694916},
			    {'a':21,'b':20,'c':0,'w':694917},
			    {'a':22,'b':17,'c':0,'w':694918},
			    {'a':23,'b':13,'c':0,'w':694919},
			    {'a':24,'b':9,'c':0,'w':694920},
			    {'a':24,'b':5,'c':0,'w':694921},
			    {'a':23,'b':2,'c':0,'w':694922},
			    {'a':21,'b':1,'c':0,'w':694923},
			    {'a':19,'b':0,'c':0,'w':694924},
			    {'a':16,'b':0,'c':0,'w':694925},
			    {'a':14,'b':0,'c':0,'w':694926},
			    {'a':13,'b':0,'c':0,'w':694927},
			    {'a':12,'b':1,'c':0,'w':694928},
			    {'a':12,'b':2,'c':0,'w':694929},
			    {'a':13,'b':3,'c':0,'w':694930},
			    {'a':14,'b':4,'c':0,'w':694931},
			    {'a':14,'b':5,'c':0,'w':694932},
			    {'a':13,'b':5,'c':0,'w':694933},
			    {'a':12,'b':5,'c':0,'w':694934},
			    {'a':11,'b':4,'c':0,'w':694935},
			    {'a':9,'b':3,'c':0,'w':694936},
			    {'a':8,'b':2,'c':0,'w':694937},
			    {'a':7,'b':1,'c':0,'w':694938},
			    {'a':7,'b':0,'c':0,'w':694939},
			    {'a':7,'b':0,'c':0,'w':694940},
			    {'a':8,'b':1,'c':0,'w':694941},
			    {'a':9,'b':2,'c':0,'w':694942},
			    {'a':8,'b':4,'c':0,'w':694943},
			    {'a':7,'b':6,'c':0,'w':694944},
			    {'a':6,'b':9,'c':0,'w':694945},
			    {'a':5,'b':11,'c':0,'w':694946},
			    {'a':4,'b':13,'c':0,'w':694947},
			    {'a':2,'b':13,'c':0,'w':694948},
			    {'a':2,'b':12,'c':0,'w':694949},
			    {'a':2,'b':10,'c':0,'w':694950},
			    {'a':3,'b':8,'c':0,'w':694951},
			    {'a':6,'b':6,'c':0,'w':694952},
			    {'a':8,'b':6,'c':0,'w':694953},
			    {'a':11,'b':6,'c':0,'w':694954},
			    {'a':13,'b':8,'c':0,'w':694955},
			    {'a':14,'b':9,'c':0,'w':694956},
			    {'a':15,'b':11,'c':0,'w':694957},
			    {'a':14,'b':12,'c':0,'w':694958},
			    {'a':13,'b':12,'c':0,'w':694959},
			    {'a':12,'b':11,'c':0,'w':694960},
			    {'a':11,'b':9,'c':0,'w':694961},
			    {'a':11,'b':7,'c':0,'w':694962},
			    {'a':9,'b':6,'c':0,'w':694963},
			    {'a':9,'b':5,'c':0,'w':694964},
			    {'a':8,'b':4,'c':0,'w':694965},
			    {'a':7,'b':5,'c':0,'w':694966},
			    {'a':6,'b':6,'c':0,'w':694967},
			    {'a':5,'b':7,'c':1,'w':694968},
			    {'a':5,'b':8,'c':1,'w':694969},
			    {'a':5,'b':7,'c':2,'w':694970},
			    {'a':4,'b':6,'c':2,'w':694971}],
			    true
			);
		    };

		    for (var i = 0; i < 1400; i++) {
			setTimeout(fn, 100);
		        console.log("iteration: " + i, "records: " + (i * 100));
		    }

		    this.getChart().redraw();
		}
	    }
        });

    } ,


    start: function() {

        SPECTRUM.model.EL.set('spectrum.minx', 560000);
        SPECTRUM.model.EL.set('spectrum.maxx', 700000);
    } ,


    onSliderChange: function(slider, newValue, thumb, options) {
        var chart = this.getChart();
        var xaxis = chart.axes.get(1);
        var minimum = slider.getValue(0);
        var maximum = slider.getValue(1);

        xaxis.minimum = minimum;
        xaxis.maximum = maximum;
        this.createSubstoreOnChart(minimum, maximum, chart);
        chart.redraw();
    },


    createSubstoreOnChart: function(xmin, xmax, chart) {
        var json = [];
        chart.store.each(function(rec) {
            var x = rec.get('w');
            if (x >= xmin && x <= xmax) {
                json.push(rec);
            }
        });
        chart.substore = Ext.create('Ext.data.JsonStore', {
            model: chart.model,
            data: json
        });
    }
});
