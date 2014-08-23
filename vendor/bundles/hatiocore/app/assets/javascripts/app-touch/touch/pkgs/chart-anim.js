/**
 * @singleton Ext.fx.Queue
 *
 * Manages an animation Queue. Behaves more like a Pool than a Queue.
 *
 */

Ext.define('Ext.fx.Queue', {
  singleton: true,

  queue: [],

  /**
   * Adds an animation to the pool.
   *
   *  @param {Ext.fx.Abstract} The animation to add to the pool.
   *
   * */
  add: function(animation) {
    if (!this.contains(animation)) {
      this.queue.push(animation);
    }
  },

    /**
     * Removes an animation from the pool.
     *
     *  @param {Ext.fx.Abstract} The animation to remove from the pool.
     *
     * */
  remove: function(animation) {
    var me = this,
        queue = me.queue,
        i = 0,
        l = queue.length;

    for (; i < l; ++i) {
      if (queue[i] === animation) {
        queue.splice(i, 1);
        return;
      }
    }
  },

    /**
     * Returns true or false whether it contains the given animation or not.
     *
     *  @param {Ext.fx.Abstract} The animation to check for.
     *
     * */
  contains: function(animation) {
    return this.queue.indexOf(animation) > -1;
  },

    /**
     * Returns true or false whether the pool is empty or not.
     *
     * */
  empty: function () {
    return this.queue.length === 0;
  },

    /**
     * Given a frame time it will filter out finished animations from the pool.
     *
     *  @param {Number} The time in milliseconds.
     *
     * */
  refresh: function(startTime) {
    var me = this,
        queue = me.queue,
        newQueue = [],
        i = 0,
        l = queue.length;

    for (; i < l; ++i) {
      queue[i].step(startTime);
      if (queue[i].animating) {
        newQueue.push(queue[i]);
      }
    }

    me.queue = newQueue;
  }

});


(function () {
    var pow = Math.pow,
        sin = Math.sin,
        cos = Math.cos,
        acos = Math.acos,
        PI = Math.PI,
        EasingPrototype, addEasing, Poly, easing, i, l;

    //create polynomial easing equations
    Poly = ['Quad', 'Cubic', 'Quart', 'Quint'];

    //create other easing equations
    EasingPrototype = {

        Pow: function (p, x) {
            return pow(p, x[0] || 6);
        },

        Expo: function (p) {
            return pow(2, 8 * (p - 1));
        },

        Circ: function (p) {
            return 1 - sin(acos(p));
        },

        Sine: function (p) {
            return 1 - sin((1 - p) * PI / 2);
        },

        Back: function (p, n) {
            n = n || 1.616;
            return p * p * ((n + 1) * p - n);
        },

        Bounce: function (p) {
            var value;
            for (var a = 0, b = 1; 1; a += b, b /= 2) {
                if (p >= (7 - 4 * a) / 11) {
                    value = b * b - pow((11 - 6 * a - 11 * p) / 4, 2);
                    break;
                }
            }
            return value;
        },

        Elastic: function (p, x) {
            return pow(2, 10 * --p) * cos(20 * p * PI * (x || 1) / 3);
        }
    };

    //Add easeIn, easeOut, easeInOut options to all easing equations.
    addEasing = function (easing, params) {
        params = params && params.length ? params : [ params ];
        return Ext.apply(easing, {

            easeIn: function (pos) {
                return easing(pos, params);
            },

            easeOut: function (pos) {
                return 1 - easing(1 - pos, params);
            },

            easeInOut: function (pos) {
                return (pos <= 0.5) ? easing(2 * pos, params) / 2
                    : (2 - easing(2 * (1 - pos), params)) / 2;
            }
        });
    };

    //Append the polynomial equations with easing support to the EasingPrototype.
    for (i = 0, l = Poly.length; i < l; ++i) {
        EasingPrototype[Poly[i]] = (function (times) {
            return function (p) {
                return pow(p, times);
            };
        })(i + 2);
    }

    //Add linear interpolator
    EasingPrototype.Linear = function (x) {
        return x;
    };

    for (easing in EasingPrototype) {
        if (EasingPrototype.hasOwnProperty(easing)) {
            addEasing(EasingPrototype[easing]);
        }
    }

    /**
     * @class
     * @singleton 
     *
     * Contains transition equations such as `Quad`, `Cubic`, `Quart`, `Quint`, `Expo`, `Circ`, `Pow`, `Sine`, `Back`, `Bounce`, `Elastic`, etc.
     * Each transition also contains methods for applying this function as ease in, ease out or ease in and out accelerations.
     *
     * ## Example use:

     var fx = Ext.create('Ext.fx.Sprite', {
         sprite: sprite,
         duration: 1000,
         easing: 'backOut'
     });

     *
     */
    Ext.define('Ext.fx.TimingFunctions', Ext.apply({
        singleton: true,
        EasingMap: {
            linear: EasingPrototype.Linear,
            easeIn: EasingPrototype.Quad.easeIn,
            easeOut: EasingPrototype.Quad.easeOut,
            easeInOut: EasingPrototype.Quad.easeInOut,
            backIn: EasingPrototype.Back,
            backOut: function (x, n) {
                return 1 - EasingPrototype.Back(1 - x, n);
            },
            backInOut: function (x, n) {
                if (x < 0.5) {
                    return EasingPrototype.Back(x * 2, n) * 0.5;
                } else {
                    return 1 - EasingPrototype.Back((1 - x) * 2, n) * 0.5;
                }
            },
            elasticIn: function (x, n) {
                return 1 - EasingPrototype.Elastic(1 - x, n);
            },
            elasticOut: EasingPrototype.Elastic,
            bounceIn: EasingPrototype.Bounce,
            bounceOut: function (x) {
                return 1 - EasingPrototype.Bounce(1 - x);
            }
        }
    }, EasingPrototype));

})();


/**
 * @class Ext.fx.Abstract
 * @private
 * An abstract class used as the base for animations.
 *
 */
Ext.define('Ext.fx.Abstract', {

    requires: ['Ext.fx.TimingFunctions', 'Ext.fx.Queue'],

    config: {
        /**
         * @cfg {Number} delay
         * The delay in ms for triggering the animation. Default's 0.
         */
        delay: 0,
        /**
         * @cfg {Number} duration
         * The duration of the animation in ms. Default's 1000.
         */
        duration: 1000,

        /**
         * @cfg {Number} easing
         *  An easing function for the animation. The easing function will receive a parameter in [0, 1] and
         *  return a float value.
         */
        easing: function (x) {
            return x;
        },

        /**
         * @cfg {Function} onCompute
         * Called on each step of the animation (if the animation is timer based).
         * The first argument of the function is a real number from [0, 1].
         */
        onCompute: Ext.emptyFn,

        /**
         * @cfg {Function} onComplete
         * Called once the animation has ended.
         */
        onComplete: Ext.emptyFn,

        /**
         * @cfg {Mixed} from
         *  The initial value for the animation.
         */
        from: 0,

        /**
         * @cfg {Mixed} to
         *  The end value for the animation.
         */
        to: 0
    },

    /**
     *
     * @constructor
     * @param {Object} config The configuration options
     */
    constructor: function (config) {
        this.initConfig(config);
    },

    /**
     * Starts the animation
     */
    start: function () {
        //Add to queue
        Ext.fx.Queue.add(this);
    },

    /**
     * Stops the animation
     */
    stop: function () {
        //Remove from queue
        Ext.fx.Queue.remove(this);
    },

    /** 
     * Computes the current values for the animation
     */
    compute: Ext.emptyFn,

    step: Ext.emptyFn,

    /* Pauses the animation  */
    pause: Ext.emptyFn,

    resume: Ext.emptyFn,

    applyEasing: function (easing) {
        if (typeof easing === 'string') {
            return Ext.fx.TimingFunctions.EasingMap[easing];
        } else {
            return easing;
        }
    }
});



/**
 * @class Ext.fx.Frame
 * @extends Ext.fx.Abstract
 *
 * Frame by frame based animation. Will use requestAnimationFrame or timer based animations.
 *
 * ## Example Code
    var fx = Ext.create('Ext.fx.Frame', {
        duration: 1000,

        onCompute: function(from, to, delta) {
            console.log(Ext.fx.Frame.compute(from, to, delta));
        },

        onComplete: function() {
          console.log('animation ended!');
        }
    });

    fx.setFrom(0);
    fx.setTo(10);

    fx.start();
 *
 */
Ext.define('Ext.fx.Frame', {

    extend: 'Ext.fx.Abstract',
    uses: ['Ext.draw.Draw'],
    statics: {

        //Handle frame by frame callbacks.
        //I don't see a better way of doing this since I can't
        //integrate Observable as static methods for a non-singleton class.

        _frameCallbacks: [],

        frameStartTime: +new Date(),

        addFrameCallback: function (callback, scope) {
            scope = scope || this;
            if (Ext.isString(callback)) {
                callback = scope[callback];
            }
            Ext.fx.Frame._frameCallbacks.push({fn: callback, scope: scope});
        },

        removeFrameCallback: function (callback, scope) {
            var index = -1;
            scope = scope || this;
            if (Ext.isString(callback)) {
                callback = scope[callback];
            }
            for (var i = 0; i < this._frameCallbacks.length; i++) {
                var cb = this._frameCallbacks[i];
                if (cb.fn === callback && cb.scope === scope) {
                    index = i;
                    break;
                }
            }
            if (index > -1) {
                Ext.fx.Frame._frameCallbacks.splice(index, 1);
            }
        },

        fireFrameCallbacks: function () {
            var callbacks = this._frameCallbacks,
                i = 0,
                l = callbacks.length;

            for (; i < l; ++i) {
                callbacks[i].fn.apply(callbacks[i].scope, []);
            }
        },

        /* A basic linear interpolation function. */
        compute: function (from, to, delta) {
            return from + (to - from) * delta;
        },

        /* Cross browser animationTime implementation */
        animationTime: (function () {
            //fallback to Date
            var animationStartTimePolyfill = (function () {
                var global = (self || window || this),
                    prefix = ['webkit', 'moz', 'o', 'ms'],
                    i = 0,
                    l = prefix.length,
                    property, dateFallback;

                //check for animationTime
                if (global.animationStartTime) {
                    return function () {
                        return global.animationStartTime;
                    };
                }

                //check for vendor prefixes
                for (; i < l; ++i) {
                    property = prefix[i] + 'AnimationStartTime';
                    if (global[property]) {
                        return function () {
                            return global[property];
                        };
                    }
                }
                if (Date.now) {
                    return Date.now;
                }
                return function () {
                    return +new Date();
                }
            })();

            return function () {
                if (!this.frameStartTime) {
                    return this.frameStartTime = animationStartTimePolyfill();
                }
                return this.frameStartTime;
            }
        })(),

        /* Cross browser requestAnimationFrame implementation */
        requestAnimationFrame: (function () {
            var global = (self || window || this),
                prefix = ['webkit', 'moz', 'o', 'ms'],
                i = 0,
                l = prefix.length,
                method;

            //check for requestAnimationFrame
            if (global.requestAnimationFrame) {
                return function (callback) {
                    global.requestAnimationFrame(function () {
                        callback();
                    });
                };
            }

            //check for vendor prefixes
            for (; i < l; ++i) {
                method = prefix[i] + 'RequestAnimationFrame';
                if (global[method]) {
                    method = global[method];
                    return function (callback) {
                        method(callback);
                    };
                }
            }

            //fallback to setTimeout
            return function (callback) {
                setTimeout(function () {
                    callback();
                }, 1000 / 100);
            };

        })()
    },

    time: null,

    constructor: function (config) {
        this.callParent([config]);
    },

    start: function () {
        var me = this;
        me.animating = true;
        me.time = 0;
        me.callParent(arguments);
        Ext.fx.Frame.ignite();
    },

    //perform a step in the animation (computed on each frame).
    step: function (currentTime) {
        var me = this,
            time = me.time,
            delay = me.getDelay(),
            duration = me.getDuration(),
            delta = 0;

        if (time === 0) {
            time = me.time = currentTime;
        }
        //if not animating, then return
        if (!me.animating) {
            return;
        }

        //hold animation for the delay
        if (currentTime < time + delay) {
            // me.set(me.compute(me.getFrom(), me.getTo(), 0));
            return;
        }
        //if in our time window, then execute animation
        if (currentTime < time + delay + duration) {
            delta = me.getEasing()((currentTime - time - delay) / duration);
            me.set(me.compute(me.getFrom(), me.getTo(), delta));
        } else {
            me.set(me.compute(me.getFrom(), me.getTo(), 1));
            me.getOnComplete().call(me);
            me.animating = false;
        }
    },

    compute: function (from, to, delta) {
        return this.getOnCompute().call(this, delta);
    },

    stop: function () {
        var me = this;
        if (me.animating) {
            me.animating = false;
            me.time = null;
            me.getOnComplete().call(me);
        }
        me.callParent(arguments);
    },

    set: Ext.emptyFn

    //Inherited

    // pause: Ext.emptyFn,

    // resume: Ext.emptyFn,

}, function () {
    //Initialize the endless animation loop.
    var looping = false,
        ExtQueue = Ext.fx.Queue,
        Frame = Ext.fx.Frame;
    
    function loop () {
        Frame.frameStartTime = false;
        Frame.animationTime();
        if (!ExtQueue.empty()) {
            ExtQueue.refresh(Frame.frameStartTime);
            Frame.fireFrameCallbacks();
            Frame.requestAnimationFrame(loop);
        } else {
            looping = false;
        }
    }

    Frame.ignite = function () {
        if (!looping) {
            looping = true;
            Frame.requestAnimationFrame(loop);
            Ext.draw.Draw.updateIOS();
        }
    }

});

/**
 * @class Ext.fx.Parser
 * @singleton
 * @private
 * Provides methods for parsing, computing and serving special values (colors, numbers, etc) that need
 * to be interpolated during an animation.
 */
Ext.define('Ext.fx.Parser', {
    singleton: true,
    compute: function(from, to, delta) {
        return from + (to - from) * delta;
    },
    
    Color: {
        parse: function(value) {
            var color;
            if (value === color) {
                return null;
            }
            if (value.match(/^#[0-9a-fA-F]{3,6}$/)) {
                color = Ext.draw.Color.fromString(value);
                return [ color.r, color.g, color.b, 1];
            }
            color = value.match(/rgba\((\d+),\s*(\d+),\s*(\d+),\s*(\d+)\)/);
            if (color) {
                return [ +color[1], +color[2], +color[3], +color[4]];
            } else {
                color = value.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
                if (color) {
                    return [ +color[1], +color[2], +color[3], 1 ];
                } else if (typeof value === 'string' && (color = Ext.draw.Color.fromName(value))) {
                    return [ color.r, color.g, color.b, 1 ];
                } else if (value === 'none') {
                    return [0, 0, 0, 0];
                } else {
                    return value;
                }
            }
        },

        compute: function(from, to, delta) {
            if (!Ext.isArray(from) || !Ext.isArray(to)) {
                return to || from;
            } else {
                var me = this;
                return [ Ext.fx.Parser.compute(from[0], to[0], delta),
                    Ext.fx.Parser.compute(from[1], to[1], delta),
                    Ext.fx.Parser.compute(from[2], to[2], delta),
                    Ext.fx.Parser.compute(from[3], to[3], delta)];
            }
        },

        serve: function(value) {
            if (typeof value == 'string') {
                return value;
            } else if (value) {
                return 'rgba(' + [ +value[0] >> 0, +value[1] >> 0, +value[2] >> 0, +value[3]].join(',') + ')';
            }
        }
    },

    Object: {
        parse: function(value) {
            var ans = {},
                name;

            for (name in value) {
                ans[name] = Ext.fx.Parser.prepare(name, value[name]);
            }

            return ans;
        },

        compute: function(from, to, delta) {
            var ans = {},
                name, fromValue, toValue, parser;

            for (name in from) {
                parser = Ext.fx.Parser.AttributeParser[name];
                if (parser) {
                    fromValue = from[name];
                    toValue = to[name];
                    ans[name] = parser.compute(fromValue, toValue, delta);
                }
            }

            return ans;
        },

        serve: function(props, unit) {
            var ret = {},
                prop, name, parser;

            for (name in props) {
                parser = Ext.fx.Parser.AttributeParser[name];
                prop = props[name];
                ret[name] = parser.serve(prop, unit);
            }

            return ret;
        }
    },

    Number: {
        parse: function(n) { return n === null ? null : parseFloat(n); },

        compute: function(from, to, delta) {
            if (!Ext.isNumber(from) || !Ext.isNumber(to)) {
                return to || from;
            } else {
                return Ext.fx.Parser.compute(from, to, delta);
            }
        },

        serve: function(value, unit) {
            return unit ? value + unit : value;
        }
    },

    String: {
        parse: function(value) { return value; },

        compute: function(from, to) {
            return to;
        },

        serve: function(value) {
            return value;
        }
    },

    Path: {

        parse: function(value) {
            if (!value.length && !value[0].length) {
                value = Ext.draw.Draw.parsePathString(path);
            }
            return value;
        },

        compute: function(from, to, delta) {
            var i = 0,
                j = 0,
                ans = [],
                l = from.length,
                n, cmd, cmdFrom, cmdTo;

            for (; i < l; ++i) {
                cmd = ans[i] = [];
                cmdFrom = from[i];
                cmdTo = to[i];

                for (j = 0, n = cmdFrom.length; j < n; ++j) {
                    if (typeof cmdFrom[j] == 'number') {
                        cmd[j] = cmdFrom[j] + (cmdTo[j] - cmdFrom[j]) * delta;
                    } else {
                        cmd[j] = cmdFrom[j];
                    }
                }
            }

            return ans;
        },

        serve: function(value) {
            return value;
        }
    },

    Text: {
        parse: function(value) { return value; },

        compute: function(from, to, delta) {
            return from.substr(0, Math.round(from.length * (1 - delta))) + to.substr(Math.round(to.length * (1 - delta)));
        },

        serve: function(value) {
            return value;
        }
    },

    prepare: function(key, value) {
        var parser = Ext.fx.Parser.AttributeParser[key];
        if (!parser && console && console.warn) {
            console.warn('Missing parser for property ' + key + '. Using String parser.');
        }
        return parser ? parser.parse(value) : value;
    }
}, function() {
    var parser = Ext.fx.Parser,
        obj = parser.Object;

    //TODO(nico): Add more parsers here
    parser.AttributeParser = {
        fill:        parser.Color,
        stroke:      parser.Color,
        color:       parser.Color,
        shadowColor: parser.Color,

        x:              parser.Number,
        y:              parser.Number,
        width:          parser.Number,
        height:         parser.Number,
        top:            parser.Number,
        left:           parser.Number,
        bottom:         parser.Number,
        right:          parser.Number,
        margin:         parser.Number,
        degrees:        parser.Number,
        padding:        parser.Number,
        lineWidth:      parser.Number,
        opacity:        parser.Number,
        shadowOffsetX:  parser.Number,
        shadowOffsetY:  parser.Number,
        shadowBlur:     parser.Number,
        radius:         parser.Number,
        size:           parser.Number,
        'stroke-width': parser.Number,
        "font-size":    parser.Number,
        "font-family":  parser.String,
        startAngle:     parser.Number,
        endAngle:       parser.Number,
        margin:         parser.Number,
        rho:            parser.Number,
        startRho:       parser.Number,
        endRho:         parser.Number,

        translate:   obj,
        translation: obj,
        rotate:      obj,
        rotation:    obj,
        scale:       obj,
        scaling:     obj,
        segment:     obj,

        path: parser.Path,

        zIndex:        parser.String,
        index:         parser.String,
        "text-anchor": parser.String,
        type:          parser.String,
        src:           parser.String,
        reset:         parser.String,
        font:          parser.String,
        hidden:        parser.String,
        text:          parser.Text
    };
});

/**
 * @class Ext.fx.Sprite
 * @extends Ext.fx.Frame
 *
 * A class to handle the animation of drawing Sprites.
 *
 * ## Example Code
 *

        var sprite = drawComponent.surface.add({
          type: 'rect',
          width: 100,
          height: 200,
          fill: '#c00'
        });

        var animation = new Ext.fx.Sprite({
            sprite:  sprite,
            duration: 300,
            easing: 'bounceOut'
        });

        animation.start({
          width: 300,
          height: 300
        });

 *
 */

Ext.define('Ext.fx.Sprite', {

  extend: 'Ext.fx.Frame',

  requires: ['Ext.fx.Parser'],

  config: {
    /**
     * @cfg {Object} sprite
     * An {@link Ext.draw.Sprite} instance.
     */
    sprite: null,

    /**
     * @cfg {String} unit
     * Units for values.
     */
    unit: null
  },

  /** Prepares values to be animated in the Sprite */
  prepare: function(sprite, key, value) {
    var me = this,
        parser = Ext.fx.Parser,
        attr = sprite.getAttribute(key),
        from = parser.prepare(key, (attr !== undefined && attr !== null) ? attr : value),
        to = parser.prepare(key, value),
        ans;

    if (key == 'path') {
      ans = Ext.draw.Draw.interpolatePaths(from, to);
      from = ans[0];
      to = ans[1];
    }

    return {
      from: from,
      to: to
    };
  },

  /** Triggers the animation. */
  start: function(attributes) {
    var me = this,
        from = {},
        to = {},
        sprite = me.getSprite(),
        name, parsed;

    for (name in attributes) {
      parsed = me.prepare(sprite, name, attributes[name]);
      from[name] = parsed.from;
      to[name] = parsed.to;
    }

    me.setFrom(from);
    me.setTo(to);

    me.callParent(arguments);
  },

  //compute interpolated values.
  compute: Ext.fx.Parser.Object.compute,
    
  //set the values into the instance.
  set: function(computed) {
    var me = this;
    me.render(me.getSprite(), Ext.fx.Parser.Object.serve(computed, me.getUnit()));
  },

  //render the sprite.
  render: function(sprite, attributes) {
    sprite.setAttributes(attributes, true);
  }
});

