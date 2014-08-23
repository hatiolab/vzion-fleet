Ext.setup({
    tabletStartupScreen: 'tablet_startup.jpg',
    phoneStartupScreen: 'phone_startup.jpg',
    tabletIcon: 'icon-ipad.png',
    phoneIcon: 'icon-iphone.png',
    glossOnIcon: false,
    onReady: function() {
        var dataSets = [
            {"words":[{"word":"SENCHA","count":26},{"word":"EXT","count":21},{"word":"TOUCH","count":13},{"word":"MORE","count":12},{"word":"AND","count":11},{"word":"FOR","count":10},{"word":"LEARN","count":10},{"word":"THE","count":6},{"word":"WEB","count":6},{"word":"GWT","count":5},{"word":"DESIGNER","count":5},{"word":"CHARTS","count":5},{"word":"WITH","count":5},{"word":"APPS","count":5},{"word":"SENCHA.IO","count":4},{"word":"SUPPORT","count":4},{"word":"EVENTS","count":4},{"word":"REGISTER","count":4},{"word":"NOW","count":4},{"word":"RICH","count":4},{"word":"CORE","count":3},{"word":"ANIMATOR","count":3},{"word":"TRAINING","count":3},{"word":"CUSTOMERS","count":3},{"word":"CONTACT","count":3},{"word":"BLOG","count":3},{"word":"SENCHACON","count":3},{"word":"FRAMEWORK","count":3},{"word":"CREATE","count":3},{"word":"WHEN:","count":3}]},
            {"words":[{"word":"SENCHA","count":22},{"word":"TOUCH","count":19},{"word":"THE","count":17},{"word":"AND","count":17},{"word":"EXT","count":15},{"word":"FOR","count":9},{"word":"WITH","count":8},{"word":"SUPPORT","count":7},{"word":"EVENTS","count":6},{"word":"MOBILE","count":6},{"word":"LIKE","count":6},{"word":"DATA","count":6},{"word":"APP","count":5},{"word":"THAT","count":5},{"word":"CAN","count":5},{"word":"PRODUCTS","count":4},{"word":"GWT","count":4},{"word":"CORE","count":4},{"word":"TRAINING","count":4},{"word":"CONTACT","count":4},{"word":"CHARTS","count":4},{"word":"FRAMEWORK","count":4},{"word":"WEB","count":4},{"word":"NATIVE","count":4},{"word":"DEVICES.","count":4},{"word":"OUR","count":4},{"word":"PHONEGAP","count":4},{"word":"YOUR","count":4},{"word":"DESIGNER","count":3},{"word":"SENCHA.IO","count":3}]},
            {"words":[{"word":"SENCHA","count":24},{"word":"AND","count":23},{"word":"EXT","count":15},{"word":"THE","count":15},{"word":"FOR","count":9},{"word":"WITH","count":7},{"word":"TOUCH","count":6},{"word":"SUPPORT","count":5},{"word":"CONTACT","count":5},{"word":"APPLICATION","count":5},{"word":"GWT","count":4},{"word":"WEB","count":4},{"word":"THAT","count":4},{"word":"LABS","count":4},{"word":"HAVE","count":4},{"word":"CAPITAL","count":4},{"word":"PARTNERS","count":4},{"word":"DESIGNER","count":3},{"word":"CORE","count":3},{"word":"SENCHA.IO","count":3},{"word":"SERVICES","count":3},{"word":"TRAINING","count":3},{"word":"TEAM","count":3},{"word":"CAREERS","count":3},{"word":"EVENTS","count":3},{"word":"PRESS","count":3},{"word":"CUSTOMERS","count":3},{"word":"DEVELOPERS","count":3},{"word":"TOOLS","count":3},{"word":"ARE","count":3}]}
        ];
        
        window.store1 = new Ext.data.JsonStore({
            fields: ['word','count'],
            data: dataSets[0].words
        });
        var updateData = function(){
            var index = (Math.random()*dataSets.length) >> 0;

            store1.setData(dataSets[index].words);
        };

        var chart = new Ext.chart.Chart({
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
                minFontSize: Ext.os.is.Phone ? 15 : 20,
                maxFontSize: Ext.os.is.Phone ? 30 : 50,
                minColor: 'rgb(0,0,0)',
                maxColor: '#56b31f',
                fontFamily: 'Verdana',
                positionFn: function(bounds){
                    var width = bounds.width,
                        height = bounds.height,
                        x, y;
                        // distributed around the screens center
                    x = (width / 2) + (((Math.random() * 10 > 5) ? 1 : -1) * Math.random() * 100 + 1) >> 0;
                    y = (height / 2) + (((Math.random() * 10 > 5) ? 1 : -1) * Math.random() * 100 + 1) >> 0;

                    return {
                        x: x,
                        y: y
                    };
                }
            }]
        });

        chartPanel = new Ext.chart.Panel({
            title: 'Wordmap',
            fullscreen: true,
            buttons: [{
                xtype: 'button',
                iconCls: 'shuffle',
                iconMask: true,
                ui: 'plain',
                handler: updateData
            }],
            chart: chart
        });
    }
});
