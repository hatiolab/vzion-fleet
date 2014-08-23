/**
 * @class Ext.draw.Color
 * @extends Object
 *
 * Represents an RGB color and provides helper functions to get
 * color components in HSL color space.
 */
Ext.define('Ext.draw.Color', {

    colorToHexRe: /(.*?)rgb\((\d+),\s*(\d+),\s*(\d+)\)/,
    rgbRe: /\s*rgba?\s*\(\s*([0-9]+)\s*,\s*([0-9]+)\s*,\s*([0-9]+)\s*(,\s*[0-9\.]+\s*)?\)\s*/,
    hexRe: /\s*#([0-9a-fA-F][0-9a-fA-F]?)([0-9a-fA-F][0-9a-fA-F]?)([0-9a-fA-F][0-9a-fA-F]?)\s*/,

    /**
     * @cfg {Number} lightnessFactor
     *
     * The default factor to compute the lighter or darker color.
     */
    lightnessFactor: 0.2,

    /**
     * @constructor
     * @param {Number} red Red component (0..255)
     * @param {Number} green Green component (0..255)
     * @param {Number} blue Blue component (0..255)
     */
    // COMPAT Ext.util.Numbers -> Ext.Number
    constructor : function(red, green, blue) {
        var me = this,
            clamp = Ext.Number.constrain;
        me.r = clamp(red, 0, 255);
        me.g = clamp(green, 0, 255);
        me.b = clamp(blue, 0, 255);
    },

    /**
     * Get the red component of the color, in the range 0..255.
     * @return {Number}
     */
    getRed: function() {
        return this.r;
    },

    /**
     * Get the green component of the color, in the range 0..255.
     * @return {Number}
     */
    getGreen: function() {
        return this.g;
    },

    /**
     * Get the blue component of the color, in the range 0..255.
     * @return {Number}
     */
    getBlue: function() {
        return this.b;
    },

    /**
     * Get the RGB values.
     * @return {Array}
     */
    getRGB: function() {
        var me = this;
        return [me.r, me.g, me.b];
    },

    /**
     * Get the equivalent HSL components of the color.
     * @return {Array}
     */
    getHSL: function() {
        var me = this,
            r = me.r / 255,
            g = me.g / 255,
            b = me.b / 255,
            max = Math.max(r, g, b),
            min = Math.min(r, g, b),
            delta = max - min,
            h,
            s = 0,
            l = 0.5 * (max + min);

        // min==max means achromatic (hue is undefined)
        if (min != max) {
            s = (l < 0.5) ? delta / (max + min) : delta / (2 - max - min);
            if (r == max) {
                h = 60 * (g - b) / delta;
            } else if (g == max) {
                h = 120 + 60 * (b - r) / delta;
            } else {
                h = 240 + 60 * (r - g) / delta;
            }
            if (h < 0) {
                h += 360;
            }
            if (h >= 360) {
                h -= 360;
            }
        }
        return [h, s, l];
    },

    /**
     * Return a new color that is lighter than this color.
     * @param {Number} factor Lighter factor (0..1), default to 0.2
     * @return Ext.draw.Color
     */
    getLighter: function(factor) {
        var hsl = this.getHSL();
        factor = factor || this.lightnessFactor;
        // COMPAT Ext.util.Numbers -> Ext.Number
        hsl[2] = Ext.util.Numbers.constrain(hsl[2] + factor, 0, 1);
        return this.fromHSL(hsl[0], hsl[1], hsl[2]);
    },

    /**
     * Return a new color that is darker than this color.
     * @param {Number} factor Darker factor (0..1), default to 0.2
     * @return Ext.draw.Color
     */
    getDarker: function(factor) {
        factor = factor || this.lightnessFactor;
        return this.getLighter(-factor);
    },

    /**
     * Return the color in the hex format, i.e. '#rrggbb'.
     * @return {String}
     */
    toString: function() {
        var me = this,
            round = Math.round,
            r = round(me.r).toString(16),
            g = round(me.g).toString(16),
            b = round(me.b).toString(16);
        r = (r.length == 1) ? '0' + r : r;
        g = (g.length == 1) ? '0' + g : g;
        b = (b.length == 1) ? '0' + b : b;
        return ['#', r, g, b].join('');
    },

    /**
     * Convert a color to hexadecimal format.
     *
     * @param {String, Array} color The color value (i.e 'rgb(255, 255, 255)', 'color: #ffffff').
     * Can also be an Array, in this case the function handles the first member.
     * @returns {String} The color in hexadecimal format.
     */
    toHex: function(color) {
        if (Ext.isArray(color)) {
            color = color[0];
        }
        if (!Ext.isString(color)) {
            return '';
        }
        if (color.substr(0, 1) === '#') {
            return color;
        }
        var digits = this.colorToHexRe.exec(color);

        if (Ext.isArray(digits)) {
            var red = parseInt(digits[2], 10),
                green = parseInt(digits[3], 10),
                blue = parseInt(digits[4], 10),
                rgb = blue | (green << 8) | (red << 16);
            return digits[1] + '#' + ("000000" + rgb.toString(16)).slice(-6);
        }
        else {
            return '';
        }
    },

    /**
     * Parse the string and create a new color.
     *
     * Supported formats: '#rrggbb', '#rgb', and 'rgb(r,g,b)'.
     *
     * If the string is not recognized, an undefined will be returned instead.
     *
     * @param {String} str Color in string.
     * @returns Ext.draw.Color
     */
    fromString: function(str) {
        var values, r, g, b,
            parse = parseInt;

        if ((str.length == 4 || str.length == 7) && str.substr(0, 1) === '#') {
            values = str.match(this.hexRe);
            if (values) {
                r = parse(values[1], 16) >> 0;
                g = parse(values[2], 16) >> 0;
                b = parse(values[3], 16) >> 0;
                if (str.length == 4) {
                    r += (r * 16);
                    g += (g * 16);
                    b += (b * 16);
                }
            }
        }
        else {
            values = str.match(this.rgbRe);
            if (values) {
                r = values[1];
                g = values[2];
                b = values[3];
            } else {
                return Ext.draw.Color.fromName(str);
            }
        }

        return (typeof r == 'undefined') ? undefined : new Ext.draw.Color(r, g, b);
    },

    /**
     * Returns the gray value (0 to 255) of the color.
     *
     * The gray value is calculated using the formula r*0.3 + g*0.59 + b*0.11.
     *
     * @returns {Number}
     */
    getGrayscale: function() {
        // http://en.wikipedia.org/wiki/Grayscale#Converting_color_to_grayscale
        return this.r * 0.3 + this.g * 0.59 + this.b * 0.11;
    },

    /**
     * Create a new color based on the specified HSL values.
     *
     * @param {Number} h Hue component (0..359)
     * @param {Number} s Saturation component (0..1)
     * @param {Number} l Lightness component (0..1)
     * @returns Ext.draw.Color
     */
    fromHSL: function(h, s, l) {
        var C, X, m, rgb = [],
            abs = Math.abs,
            floor = Math.floor;

        if (s == 0 || h == null) {
            // achromatic
            rgb = [l, l, l];
        }
        else {
            // http://en.wikipedia.org/wiki/HSL_and_HSV#From_HSL
            // C is the chroma
            // X is the second largest component
            // m is the lightness adjustment
            h /= 60;
            C = s * (1 - abs(2 * l - 1));
            X = C * (1 - abs(h - 2 * floor(h / 2) - 1));
            m = l - C / 2;
            switch (floor(h)) {
                case 0:
                    rgb = [C, X, 0];
                    break;
                case 1:
                    rgb = [X, C, 0];
                    break;
                case 2:
                    rgb = [0, C, X];
                    break;
                case 3:
                    rgb = [0, X, C];
                    break;
                case 4:
                    rgb = [X, 0, C];
                    break;
                case 5:
                    rgb = [C, 0, X];
                    break;
            }
            rgb = [rgb[0] + m, rgb[1] + m, rgb[2] + m];
        }
        return new Ext.draw.Color(rgb[0] * 255, rgb[1] * 255, rgb[2] * 255);
    }
}, function() {
    var prototype = this.prototype;

    // TODO(zhangbei): do we have a better way to convert color names to rgb?
    this.addStatics({
        ColorList : {
            "aliceblue": "#f0f8ff", "antiquewhite": "#faebd7", "aqua": "#00ffff", "aquamarine": "#7fffd4", "azure": "#f0ffff",
            "beige": "#f5f5dc", "bisque": "#ffe4c4", "black": "#000000", "blanchedalmond": "#ffebcd", "blue": "#0000ff", "blueviolet": "#8a2be2", "brown": "#a52a2a", "burlywood": "#deb887",
            "cadetblue": "#5f9ea0", "chartreuse": "#7fff00", "chocolate": "#d2691e", "coral": "#ff7f50", "cornflowerblue": "#6495ed", "cornsilk": "#fff8dc", "crimson": "#dc143c", "cyan": "#00ffff",
            "darkblue": "#00008b", "darkcyan": "#008b8b", "darkgoldenrod": "#b8860b", "darkgray": "#a9a9a9", "darkgreen": "#006400", "darkkhaki": "#bdb76b", "darkmagenta": "#8b008b", "darkolivegreen": "#556b2f",
            "darkorange": "#ff8c00", "darkorchid": "#9932cc", "darkred": "#8b0000", "darksalmon": "#e9967a", "darkseagreen": "#8fbc8f", "darkslateblue": "#483d8b", "darkslategray": "#2f4f4f", "darkturquoise": "#00ced1",
            "darkviolet": "#9400d3", "deeppink": "#ff1493", "deepskyblue": "#00bfff", "dimgray": "#696969", "dodgerblue": "#1e90ff",
            "firebrick": "#b22222", "floralwhite": "#fffaf0", "forestgreen": "#228b22", "fuchsia": "#ff00ff",
            "gainsboro": "#dcdcdc", "ghostwhite": "#f8f8ff", "gold": "#ffd700", "goldenrod": "#daa520", "gray": "#808080", "green": "#008000", "greenyellow": "#adff2f",
            "honeydew": "#f0fff0", "hotpink": "#ff69b4",
            "indianred ": "#cd5c5c", "indigo ": "#4b0082", "ivory": "#fffff0", "khaki": "#f0e68c",
            "lavender": "#e6e6fa", "lavenderblush": "#fff0f5", "lawngreen": "#7cfc00", "lemonchiffon": "#fffacd", "lightblue": "#add8e6", "lightcoral": "#f08080", "lightcyan": "#e0ffff", "lightgoldenrodyellow": "#fafad2",
            "lightgrey": "#d3d3d3", "lightgreen": "#90ee90", "lightpink": "#ffb6c1", "lightsalmon": "#ffa07a", "lightseagreen": "#20b2aa", "lightskyblue": "#87cefa", "lightslategray": "#778899", "lightsteelblue": "#b0c4de",
            "lightyellow": "#ffffe0", "lime": "#00ff00", "limegreen": "#32cd32", "linen": "#faf0e6",
            "magenta": "#ff00ff", "maroon": "#800000", "mediumaquamarine": "#66cdaa", "mediumblue": "#0000cd", "mediumorchid": "#ba55d3", "mediumpurple": "#9370d8", "mediumseagreen": "#3cb371", "mediumslateblue": "#7b68ee",
            "mediumspringgreen": "#00fa9a", "mediumturquoise": "#48d1cc", "mediumvioletred": "#c71585", "midnightblue": "#191970", "mintcream": "#f5fffa", "mistyrose": "#ffe4e1", "moccasin": "#ffe4b5",
            "navajowhite": "#ffdead", "navy": "#000080",
            "oldlace": "#fdf5e6", "olive": "#808000", "olivedrab": "#6b8e23", "orange": "#ffa500", "orangered": "#ff4500", "orchid": "#da70d6",
            "palegoldenrod": "#eee8aa", "palegreen": "#98fb98", "paleturquoise": "#afeeee", "palevioletred": "#d87093", "papayawhip": "#ffefd5", "peachpuff": "#ffdab9", "peru": "#cd853f", "pink": "#ffc0cb", "plum": "#dda0dd", "powderblue": "#b0e0e6", "purple": "#800080",
            "red": "#ff0000", "rosybrown": "#bc8f8f", "royalblue": "#4169e1",
            "saddlebrown": "#8b4513", "salmon": "#fa8072", "sandybrown": "#f4a460", "seagreen": "#2e8b57", "seashell": "#fff5ee", "sienna": "#a0522d", "silver": "#c0c0c0", "skyblue": "#87ceeb", "slateblue": "#6a5acd", "slategray": "#708090", "snow": "#fffafa", "springgreen": "#00ff7f", "steelblue": "#4682b4",
            "tan": "#d2b48c", "teal": "#008080", "thistle": "#d8bfd8", "tomato": "#ff6347", "turquoise": "#40e0d0",
            "violet": "#ee82ee",
            "wheat": "#f5deb3", "white": "#ffffff", "whitesmoke": "#f5f5f5",
            "yellow": "#ffff00", "yellowgreen": "#9acd32"
        },
        fromHSL : function() {
            return prototype.fromHSL.apply(prototype, arguments);
        },
        fromString : function() {
            return prototype.fromString.apply(prototype, arguments);
        },
        fromName : function(name) {
            if (this.ColorList[name.toLowerCase()]){
                return this.fromString(this.ColorList[name.toLowerCase()]);
            } else {
                return null;
            }
        },
        toHex : function(color) {
            return prototype.toHex(color);
        }
    });
});

/**
 * @singleton Ext.draw.Draw
 * Base Drawing class.  Provides base drawing functions.
 */

Ext.define('Ext.draw.Draw', {

    singleton: true,

    requires: ['Ext.env.OS', 'Ext.draw.Color', 'Ext.fx.Frame'],
    pathToStringRE: /,?([achlmqrstvxz]),?/gi,
    pathCommandRE: /([achlmqstvz])[\s,]*((-?\d*\.?\d*(?:e[-+]?\d+)?\s*,?\s*)+)/ig,
    pathValuesRE: /(-?\d*\.?\d*(?:e[-+]?\d+)?)\s*,?\s*/ig,
    stopsRE: /^(\d+%?)$/,
    radian: Math.PI / 180,
    pi2: Math.PI * 2,
    snapEndsIntervalWeights: [[0, 15], [20, 4], [30, 2], [40, 4], [50, 9], [60, 4], [70, 2], [80, 4], [100, 15]],

    is: function(o, type) {
        type = String(type).toLowerCase();
        return (type == "object" && o === Object(o)) ||
            (type == "undefined" && typeof o == type) ||
            (type == "null" && o === null) ||
            (type == "array" && Array.isArray && Array.isArray(o)) ||
            (Object.prototype.toString.call(o).toLowerCase().slice(8, -1)) == type;
    },

    /** Generates an ellipse path string from an ellipse sprite object
     *
     * @param {Ext.draw.Sprite} sprite
     */
    ellipsePath: function(sprite) {
        var attr = sprite.attr;
        return Ext.String.format("M{0},{1}A{2},{3},0,1,1,{0},{4}A{2},{3},0,1,1,{0},{1}z", attr.x, attr.y - attr.ry, attr.rx, attr.ry, attr.y + attr.ry);
    },

    /** Generates a rectangle path string from a rectangle sprite object
     *
     * @param {Ext.draw.Sprite} sprite
     */
    rectPath: function(sprite) {
        var attr = sprite.attr;
        if (attr.radius) {
            return Ext.String.format("M{0},{1}l{2},0a{3},{3},0,0,1,{3},{3}l0,{5}a{3},{3},0,0,1,{4},{3}l{6},0a{3},{3},0,0,1,{4},{4}l0,{7}a{3},{3},0,0,1,{3},{4}z", attr.x + attr.radius, attr.y, attr.width - attr.radius * 2, attr.radius, -attr.radius, attr.height - attr.radius * 2, attr.radius * 2 - attr.width, attr.radius * 2 - attr.height);
        }
        else {
            return Ext.String.format("M{0},{1}l{2},0,0,{3},{4},0z", attr.x, attr.y, attr.width, attr.height, -attr.width);
        }
    },

    /** Convert the given array path to an SVG compatible path string.
     *
     * @param {Array} arrayPath
     */
    pathToString: function(arrayPath) {
        if (Ext.isArray(arrayPath)) {
            arrayPath = arrayPath.join(',');
        }
        return arrayPath.replace(Ext.draw.Draw.pathToStringRE, "$1");
    },

    parsePathString: function (pathString) {
        if (!pathString) {
            return null;
        }
        var paramCounts = {a: 7, c: 6, h: 1, l: 2, m: 2, q: 4, s: 4, t: 2, v: 1, z: 0},
            data = [],
            me = this;
        if (me.is(pathString, "array") && me.is(pathString[0], "array")) { // rough assumption
            data = me.pathClone(pathString);
        }
        if (!data.length) {
            Ext.draw.Draw.pathToString(pathString).replace(me.pathCommandRE, function (a, b, c) {
                var params = [],
                    name = b.toLowerCase();
                c.replace(me.pathValuesRE, function (a, b) {
                    b && params.push(+b);
                });
                if (name == "m" && params.length > 2) {
                    data.push([b].concat(params.splice(0, 2)));
                    name = "l";
                    b = (b == "m") ? "l" : "L";
                }
                while (params.length >= paramCounts[name]) {
                    data.push([b].concat(params.splice(0, paramCounts[name])));
                    if (!paramCounts[name]) {
                        break;
                    }
                }
            });
        }
        return data;
    },

    mapPath: function (path, matrix) {
        if (!matrix) {
            return path;
        }
        var x, y, i, ii, j, jj, pathi;
        path = this.path2curve(path);
        for (i = 0, ii = path.length; i < ii; i++) {
            pathi = path[i];
            for (j = 1, jj = pathi.length; j < jj-1; j += 2) {
                x = matrix.x(pathi[j], pathi[j + 1]);
                y = matrix.y(pathi[j], pathi[j + 1]);
                pathi[j] = x;
                pathi[j + 1] = y;
            }
        }
        return path;
    },

    pathClone: function(pathArray) {
        var res = [],
            j, jj, i, ii;
        if (!this.is(pathArray, "array") || !this.is(pathArray && pathArray[0], "array")) { // rough assumption
            pathArray = this.parsePathString(pathArray);
        }
        for (i = 0, ii = pathArray.length; i < ii; i++) {
            res[i] = [];
            for (j = 0, jj = pathArray[i].length; j < jj; j++) {
                res[i][j] = pathArray[i][j];
            }
        }
        return res;
    },

    pathToAbsolute: function (pathArray) {
        if (!this.is(pathArray, "array") || !this.is(pathArray && pathArray[0], "array")) { // rough assumption
            pathArray = this.parsePathString(pathArray);
        }
        var res = [],
            x = 0,
            y = 0,
            mx = 0,
            my = 0,
            i = 0,
            ln = pathArray.length,
            r, pathSegment, j, ln2;
        // MoveTo initial x/y position
        if (pathArray[0][0] == "M") {
            x = +pathArray[0][1];
            y = +pathArray[0][2];
            mx = x;
            my = y;
            i++;
            res[0] = ["M", x, y];
        }
        for (; i < ln; i++) {
            r = res[i] = [];
            pathSegment = pathArray[i];
            if (pathSegment[0] != pathSegment[0].toUpperCase()) {
                r[0] = pathSegment[0].toUpperCase();
                switch (r[0]) {
                    // Elliptical Arc
                    case "A":
                        r[1] = pathSegment[1];
                        r[2] = pathSegment[2];
                        r[3] = pathSegment[3];
                        r[4] = pathSegment[4];
                        r[5] = pathSegment[5];
                        r[6] = +(pathSegment[6] + x);
                        r[7] = +(pathSegment[7] + y);
                        break;
                    // Vertical LineTo
                    case "V":
                        r[1] = +pathSegment[1] + y;
                        break;
                    // Horizontal LineTo
                    case "H":
                        r[1] = +pathSegment[1] + x;
                        break;
                    case "M":
                    // MoveTo
                        mx = +pathSegment[1] + x;
                        my = +pathSegment[2] + y;
                    default:
                        j = 1;
                        ln2 = pathSegment.length;
                        for (; j < ln2; j++) {
                            r[j] = +pathSegment[j] + ((j % 2) ? x : y);
                        }
                }
            }
            else {
                j = 0;
                ln2 = pathSegment.length;
                for (; j < ln2; j++) {
                    res[i][j] = pathSegment[j];
                }
            }
            switch (r[0]) {
                // ClosePath
                case "Z":
                    x = mx;
                    y = my;
                    break;
                // Horizontal LineTo
                case "H":
                    x = r[1];
                    break;
                // Vertical LineTo
                case "V":
                    y = r[1];
                    break;
                // MoveTo
                case "M":
                    pathSegment = res[i];
                    ln2 = pathSegment.length;
                    mx = pathSegment[ln2 - 2];
                    my = pathSegment[ln2 - 1];
                default:
                    pathSegment = res[i];
                    ln2 = pathSegment.length;
                    x = pathSegment[ln2 - 2];
                    y = pathSegment[ln2 - 1];
            }
        }
        return res;
    },

    // Returns a path converted to a set of curveto commands
    path2curve: function (path) {
        var me = this,
            points = me.pathToAbsolute(path),
            ln = points.length,
            attrs = {x: 0, y: 0, bx: 0, by: 0, X: 0, Y: 0, qx: null, qy: null},
            i, seg, segLn, point;

        for (i = 0; i < ln; i++) {
            points[i] = me.command2curve(points[i], attrs);
            if (points[i].length > 7) {
                    points[i].shift();
                    point = points[i];
                    while (point.length) {
                        points.splice(i++, 0, ["C"].concat(point.splice(0, 6)));
                    }
                    points.splice(i, 1);
                    ln = points.length;
                }
            seg = points[i];
            segLn = seg.length;
            attrs.x = seg[segLn - 2];
            attrs.y = seg[segLn - 1];
            attrs.bx = parseFloat(seg[segLn - 4]) || attrs.x;
            attrs.by = parseFloat(seg[segLn - 3]) || attrs.y;
        }
        return points;
    },

    interpolatePaths: function (path, path2) {
        var me = this,
            p = me.pathToAbsolute(path),
            p2 = me.pathToAbsolute(path2),
            attrs = {x: 0, y: 0, bx: 0, by: 0, X: 0, Y: 0, qx: null, qy: null},
            attrs2 = {x: 0, y: 0, bx: 0, by: 0, X: 0, Y: 0, qx: null, qy: null},
            fixArc = function (pp, i) {
                if (pp[i].length > 7) {
                    pp[i].shift();
                    var pi = pp[i];
                    while (pi.length) {
                        pp.splice(i++, 0, ["C"].concat(pi.splice(0, 6)));
                    }
                    pp.splice(i, 1);
                    ii = Math.max(p.length, p2.length || 0);
                }
            },
            fixM = function (path1, path2, a1, a2, i) {
                if (path1 && path2 && path1[i][0] == "M" && path2[i][0] != "M") {
                    path2.splice(i, 0, ["M", a2.x, a2.y]);
                    a1.bx = 0;
                    a1.by = 0;
                    a1.x = path1[i][1];
                    a1.y = path1[i][2];
                    ii = Math.max(p.length, p2.length || 0);
                }
            };
        for (var i = 0, ii = Math.max(p.length, p2.length || 0); i < ii; i++) {
            p[i] = me.command2curve(p[i], attrs);
            fixArc(p, i);
            (p2[i] = me.command2curve(p2[i], attrs2));
            fixArc(p2, i);
            fixM(p, p2, attrs, attrs2, i);
            fixM(p2, p, attrs2, attrs, i);
            var seg = p[i],
                seg2 = p2[i],
                seglen = seg.length,
                seg2len = seg2.length;
            attrs.x = seg[seglen - 2];
            attrs.y = seg[seglen - 1];
            attrs.bx = parseFloat(seg[seglen - 4]) || attrs.x;
            attrs.by = parseFloat(seg[seglen - 3]) || attrs.y;
            attrs2.bx = (parseFloat(seg2[seg2len - 4]) || attrs2.x);
            attrs2.by = (parseFloat(seg2[seg2len - 3]) || attrs2.y);
            attrs2.x = seg2[seg2len - 2];
            attrs2.y = seg2[seg2len - 1];
        }
        return [p, p2];
    },

    //Returns any path command as a curveto command based on the attrs passed
    command2curve: function (pathCommand, d) {
        var me = this;
        if (!pathCommand) {
            return ["C", d.x, d.y, d.x, d.y, d.x, d.y];
        }
        if (pathCommand[0] != "T" && pathCommand[0] != "Q") {
            d.qx = d.qy = null;
        }
        switch (pathCommand[0]) {
            case "M":
                d.X = pathCommand[1];
                d.Y = pathCommand[2];
                break;
            case "A":
                pathCommand = ["C"].concat(me.arc2curve.apply(me, [d.x, d.y].concat(pathCommand.slice(1))));
                break;
            case "S":
                pathCommand = ["C", d.x + (d.x - (d.bx || d.x)), d.y + (d.y - (d.by || d.y))].concat(pathCommand.slice(1));
                break;
            case "T":
                d.qx = d.x + (d.x - (d.qx || d.x));
                d.qy = d.y + (d.y - (d.qy || d.y));
                pathCommand = ["C"].concat(me.quadratic2curve(d.x, d.y, d.qx, d.qy, pathCommand[1], pathCommand[2]));
                break;
            case "Q":
                d.qx = pathCommand[1];
                d.qy = pathCommand[2];
                pathCommand = ["C"].concat(me.quadratic2curve(d.x, d.y, pathCommand[1], pathCommand[2], pathCommand[3], pathCommand[4]));
                break;
            case "L":
                pathCommand = ["C"].concat(d.x, d.y, pathCommand[1], pathCommand[2], pathCommand[1], pathCommand[2]);
                break;
            case "H":
                pathCommand = ["C"].concat(d.x, d.y, pathCommand[1], d.y, pathCommand[1], d.y);
                break;
            case "V":
                pathCommand = ["C"].concat(d.x, d.y, d.x, pathCommand[1], d.x, pathCommand[1]);
                break;
            case "Z":
                pathCommand = ["C"].concat(d.x, d.y, d.X, d.Y, d.X, d.Y);
                break;
        }
        return pathCommand;
    },

    quadratic2curve: function (x1, y1, ax, ay, x2, y2) {
        var _13 = 1 / 3,
            _23 = 2 / 3;
        return [
                _13 * x1 + _23 * ax,
                _13 * y1 + _23 * ay,
                _13 * x2 + _23 * ax,
                _13 * y2 + _23 * ay,
                x2,
                y2
            ];
    },

    rotate: function (x, y, rad) {
        var cos = Math.cos(rad),
            sin = Math.sin(rad),
            X = x * cos - y * sin,
            Y = x * sin + y * cos;
        return {x: X, y: Y};
    },

    arc2curve: function (x1, y1, rx, ry, angle, large_arc_flag, sweep_flag, x2, y2, recursive) {
        // for more information of where this Math came from visit:
        // http://www.w3.org/TR/SVG11/implnote.html#ArcImplementationNotes
        var me = this,
            PI = Math.PI,
            radian = me.radian,
            _120 = PI * 120 / 180,
            rad = radian * (+angle || 0),
            res = [],
            math = Math,
            mcos = math.cos,
            msin = math.sin,
            msqrt = math.sqrt,
            mabs = math.abs,
            masin = math.asin,
            xy, cos, sin, x, y, h, rx2, ry2, k, cx, cy, f1, f2, df, c1, s1, c2, s2,
            t, hx, hy, m1, m2, m3, m4, newres, i, ln, f2old, x2old, y2old;
        if (!recursive) {
            xy = me.rotate(x1, y1, -rad);
            x1 = xy.x;
            y1 = xy.y;
            xy = me.rotate(x2, y2, -rad);
            x2 = xy.x;
            y2 = xy.y;
            cos = mcos(radian * angle);
            sin = msin(radian * angle);
            x = (x1 - x2) / 2;
            y = (y1 - y2) / 2;
            h = (x * x) / (rx * rx) + (y * y) / (ry * ry);
            if (h > 1) {
                h = msqrt(h);
                rx = h * rx;
                ry = h * ry;
            }
            rx2 = rx * rx;
            ry2 = ry * ry;
            k = (large_arc_flag == sweep_flag ? -1 : 1) *
                    msqrt(mabs((rx2 * ry2 - rx2 * y * y - ry2 * x * x) / (rx2 * y * y + ry2 * x * x)));
            cx = k * rx * y / ry + (x1 + x2) / 2;
            cy = k * -ry * x / rx + (y1 + y2) / 2;
            f1 = masin(((y1 - cy) / ry).toFixed(7));
            f2 = masin(((y2 - cy) / ry).toFixed(7));

            f1 = x1 < cx ? PI - f1 : f1;
            f2 = x2 < cx ? PI - f2 : f2;
            if (f1 < 0) {
                f1 = PI * 2 + f1;
            }
            if (f2 < 0) {
                f2 = PI * 2 + f2;
            }
            if (sweep_flag && f1 > f2) {
                f1 = f1 - PI * 2;
            }
            if (!sweep_flag && f2 > f1) {
                f2 = f2 - PI * 2;
            }
        }
        else {
            f1 = recursive[0];
            f2 = recursive[1];
            cx = recursive[2];
            cy = recursive[3];
        }
        df = f2 - f1;
        if (mabs(df) > _120) {
            f2old = f2;
            x2old = x2;
            y2old = y2;
            f2 = f1 + _120 * (sweep_flag && f2 > f1 ? 1 : -1);
            x2 = cx + rx * mcos(f2);
            y2 = cy + ry * msin(f2);
            res = me.arc2curve(x2, y2, rx, ry, angle, 0, sweep_flag, x2old, y2old, [f2, f2old, cx, cy]);
        }
        df = f2 - f1;
        c1 = mcos(f1);
        s1 = msin(f1);
        c2 = mcos(f2);
        s2 = msin(f2);
        t = math.tan(df / 4);
        hx = 4 / 3 * rx * t;
        hy = 4 / 3 * ry * t;
        m1 = [x1, y1];
        m2 = [x1 + hx * s1, y1 - hy * c1];
        m3 = [x2 + hx * s2, y2 - hy * c2];
        m4 = [x2, y2];
        m2[0] = 2 * m1[0] - m2[0];
        m2[1] = 2 * m1[1] - m2[1];
        if (recursive) {
            return [m2, m3, m4].concat(res);
        }
        else {
            res = [m2, m3, m4].concat(res).join().split(",");
            newres = [];
            ln = res.length;
            for (i = 0;  i < ln; i++) {
                newres[i] = i % 2 ? me.rotate(res[i - 1], res[i], rad).y : me.rotate(res[i], res[i + 1], rad).x;
            }
            return newres;
        }
    },

    pathDimensions: function (path) {
        if (!path || !path.length) {
            return {x: 0, y: 0, width: 0, height: 0};
        }
        path = this.path2curve(path);
        var x = 0,
            y = 0,
            X = [],
            Y = [],
            i = 0,
            ln = path.length,
            p, xmin, ymin, dim;
        for (; i < ln; i++) {
            p = path[i];
            if (p[0] == "M") {
                x = p[1];
                y = p[2];
                X.push(x);
                Y.push(y);
            }
            else {
                dim = this.curveDim(x, y, p[1], p[2], p[3], p[4], p[5], p[6]);
                X = X.concat(dim.min.x, dim.max.x);
                Y = Y.concat(dim.min.y, dim.max.y);
                x = p[5];
                y = p[6];
            }
        }
        xmin = Math.min.apply(0, X);
        ymin = Math.min.apply(0, Y);
        return {
            x: xmin,
            y: ymin,
            path: path,
            width: Math.max.apply(0, X) - xmin,
            height: Math.max.apply(0, Y) - ymin
        };
    },

    intersectInside: function(path, cp1, cp2) {
        return (cp2[0] - cp1[0]) * (path[1] - cp1[1]) > (cp2[1] - cp1[1]) * (path[0] - cp1[0]);
    },

    intersectIntersection: function(s, e, cp1, cp2) {
        var p = [],
            dcx = cp1[0] - cp2[0],
            dcy = cp1[1] - cp2[1],
            dpx = s[0] - e[0],
            dpy = s[1] - e[1],
            n1 = cp1[0] * cp2[1] - cp1[1] * cp2[0],
            n2 = s[0] * e[1] - s[1] * e[0],
            n3 = 1 / (dcx * dpy - dcy * dpx);

        p[0] = (n1 * dpx - n2 * dcx) * n3;
        p[1] = (n1 * dpy - n2 * dcy) * n3;
        return p;
    },

    intersect: function(subjectPolygon, clipPolygon) {
        var me = this,
            i = 0,
            ln = clipPolygon.length,
            cp1 = clipPolygon[ln - 1],
            outputList = subjectPolygon,
            cp2, s, e, ln2, inputList, j;
        for (; i < ln; ++i) {
            cp2 = clipPolygon[i];
            inputList = outputList;
            outputList = [];
            s = inputList[inputList.length - 1];
            j = 0;
            ln2 = inputList.length;
            for (; j < ln2; j++) {
                e = inputList[j];
                if (me.intersectInside(e, cp1, cp2)) {
                    if (!me.intersectInside(s, cp1, cp2)) {
                        outputList.push(me.intersectIntersection(s, e, cp1, cp2));
                    }
                    outputList.push(e);
                }
                else if (me.intersectInside(s, cp1, cp2)) {
                    outputList.push(me.intersectIntersection(s, e, cp1, cp2));
                }
                s = e;
            }
            cp1 = cp2;
        }
        return outputList;
    },

    curveDim: function (p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y) {
        var a = (c2x - 2 * c1x + p1x) - (p2x - 2 * c2x + c1x),
            b = 2 * (c1x - p1x) - 2 * (c2x - c1x),
            c = p1x - c1x,
            t1 = (-b + Math.sqrt(b * b - 4 * a * c)) / 2 / a,
            t2 = (-b - Math.sqrt(b * b - 4 * a * c)) / 2 / a,
            y = [p1y, p2y],
            x = [p1x, p2x],
            dot;
        if (Math.abs(t1) > 1e12) {
            t1 = 0.5;
        }
        if (Math.abs(t2) > 1e12) {
            t2 = 0.5;
        }
        if (t1 > 0 && t1 < 1) {
            dot = this.findDotAtSegment(p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y, t1);
            x.push(dot.x);
            y.push(dot.y);
        }
        if (t2 > 0 && t2 < 1) {
            dot = this.findDotAtSegment(p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y, t2);
            x.push(dot.x);
            y.push(dot.y);
        }
        a = (c2y - 2 * c1y + p1y) - (p2y - 2 * c2y + c1y);
        b = 2 * (c1y - p1y) - 2 * (c2y - c1y);
        c = p1y - c1y;
        t1 = (-b + Math.sqrt(b * b - 4 * a * c)) / 2 / a;
        t2 = (-b - Math.sqrt(b * b - 4 * a * c)) / 2 / a;
        if (Math.abs(t1) > 1e12) {
            t1 = 0.5;
        }
        if (Math.abs(t2) > 1e12) {
            t2 = 0.5;
        }
        if (t1 > 0 && t1 < 1) {
            dot = this.findDotAtSegment(p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y, t1);
            x.push(dot.x);
            y.push(dot.y);
        }
        if (t2 > 0 && t2 < 1) {
            dot = this.findDotAtSegment(p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y, t2);
            x.push(dot.x);
            y.push(dot.y);
        }
        return {
            min: {x: Math.min.apply(0, x), y: Math.min.apply(0, y)},
            max: {x: Math.max.apply(0, x), y: Math.max.apply(0, y)}
        };
    },

    /**
     * @private
     *
     * Calculates bezier curve control anchor points for a particular point in a path, with a
     * smoothing curve applied. The smoothness of the curve is controlled by the 'value' parameter.
     * Note that this algorithm assumes that the line being smoothed is normalized going from left
     * to right; it makes special adjustments assuming this orientation.
     *
     * @param {Number} prevX X coordinate of the previous point in the path
     * @param {Number} prevY Y coordinate of the previous point in the path
     * @param {Number} curX X coordinate of the current point in the path
     * @param {Number} curY Y coordinate of the current point in the path
     * @param {Number} nextX X coordinate of the next point in the path
     * @param {Number} nextY Y coordinate of the next point in the path
     * @param {Number} value A value to control the smoothness of the curve; this is used to
     *                 divide the distance between points, so a value of 2 corresponds to
     *                 half the distance between points (a very smooth line) while higher values
     *                 result in less smooth curves. Defaults to 4.
     * @return {Object} Object containing x1, y1, x2, y2 bezier control anchor points; x1 and y1
     *                  are the control point for the curve toward the previous path point, and
     *                  x2 and y2 are the control point for the curve toward the next path point.
     */
    getAnchors: function (prevX, prevY, curX, curY, nextX, nextY, value) {
        value = value || 4;
        var math = Math,
            PI = math.PI,
            halfPI = PI / 2,
            abs = math.abs,
            sin = math.sin,
            cos = math.cos,
            atan = math.atan,
            control1Length, control2Length, control1Angle, control2Angle,
            control1X, control1Y, control2X, control2Y, alpha;

        // Find the length of each control anchor line, by dividing the horizontal distance
        // between points by the value parameter.
        control1Length = (curX - prevX) / value;
        control2Length = (nextX - curX) / value;

        // Determine the angle of each control anchor line. If the middle point is a vertical
        // turnaround then we force it to a flat horizontal angle to prevent the curve from
        // dipping above or below the middle point. Otherwise we use an angle that points
        // toward the previous/next target point.
        if ((curY >= prevY && curY >= nextY) || (curY <= prevY && curY <= nextY)) {
            control1Angle = control2Angle = halfPI;
        } else {
            control1Angle = atan((curX - prevX) / abs(curY - prevY));
            if (prevY < curY) {
                control1Angle = PI - control1Angle;
            }
            control2Angle = atan((nextX - curX) / abs(curY - nextY));
            if (nextY < curY) {
                control2Angle = PI - control2Angle;
            }
        }

        // Adjust the calculated angles so they point away from each other on the same line
        alpha = halfPI - ((control1Angle + control2Angle) % (PI * 2)) / 2;
        if (alpha > halfPI) {
            alpha -= PI;
        }
        control1Angle += alpha;
        control2Angle += alpha;

        // Find the control anchor points from the angles and length
        control1X = curX - control1Length * sin(control1Angle);
        control1Y = curY + control1Length * cos(control1Angle);
        control2X = curX + control2Length * sin(control2Angle);
        control2Y = curY + control2Length * cos(control2Angle);

        // One last adjustment, make sure that no control anchor point extends vertically past
        // its target prev/next point, as that results in curves dipping above or below and
        // bending back strangely. If we find this happening we keep the control angle but
        // reduce the length of the control line so it stays within bounds.
        if ((curY > prevY && control1Y < prevY) || (curY < prevY && control1Y > prevY)) {
            control1X += abs(prevY - control1Y) * (control1X - curX) / (control1Y - curY);
            control1Y = prevY;
        }
        if ((curY > nextY && control2Y < nextY) || (curY < nextY && control2Y > nextY)) {
            control2X -= abs(nextY - control2Y) * (control2X - curX) / (control2Y - curY);
            control2Y = nextY;
        }

        return {
            x1: control1X,
            y1: control1Y,
            x2: control2X,
            y2: control2Y
        };
    },

    /* Smoothing function for a path.  Converts a path into cubic beziers.  Value defines the divider of the distance between points.
     * Defaults to a value of 4.
     */
    smooth: function (originalPath, value) {
        var path = this.path2curve(originalPath),
            newp = [path[0]],
            x = path[0][1],
            y = path[0][2],
            j,
            points,
            i = 1,
            ii = path.length,
            beg = 1,
            mx = x,
            my = y,
            cx = 0,
            cy = 0;
        for (; i < ii; i++) {
            var pathi = path[i],
                pathil = pathi.length,
                pathim = path[i - 1],
                pathiml = pathim.length,
                pathip = path[i + 1],
                pathipl = pathip && pathip.length;
            if (pathi[0] == "M") {
                mx = pathi[1];
                my = pathi[2];
                j = i + 1;
                while (path[j][0] != "C") {
                    j++;
                }
                cx = path[j][5];
                cy = path[j][6];
                newp.push(["M", mx, my]);
                beg = newp.length;
                x = mx;
                y = my;
                continue;
            }
            if (pathi[pathil - 2] == mx && pathi[pathil - 1] == my && (!pathip || pathip[0] == "M")) {
                var begl = newp[beg].length;
                points = this.getAnchors(pathim[pathiml - 2], pathim[pathiml - 1], mx, my, newp[beg][begl - 2], newp[beg][begl - 1], value);
                newp[beg][1] = points.x2;
                newp[beg][2] = points.y2;
            }
            else if (!pathip || pathip[0] == "M") {
                points = {
                    x1: pathi[pathil - 2],
                    y1: pathi[pathil - 1]
                };
            } else {
                points = this.getAnchors(pathim[pathiml - 2], pathim[pathiml - 1], pathi[pathil - 2], pathi[pathil - 1], pathip[pathipl - 2], pathip[pathipl - 1], value);
            }
            newp.push(["C", x, y, points.x1, points.y1, pathi[pathil - 2], pathi[pathil - 1]]);
            x = points.x2;
            y = points.y2;
        }
        return newp;
    },

    findDotAtSegment: function (p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y, t) {
        var t1 = 1 - t;
        return {
            x: Math.pow(t1, 3) * p1x + Math.pow(t1, 2) * 3 * t * c1x + t1 * 3 * t * t * c2x + Math.pow(t, 3) * p2x,
            y: Math.pow(t1, 3) * p1y + Math.pow(t1, 2) * 3 * t * c1y + t1 * 3 * t * t * c2y + Math.pow(t, 3) * p2y
        };
    },


    /**
     * snapEnds is a utility function that gives you axis ticks information based on start, end
     * and preferred number of steps. It happens quite often that you have just a dataset and need to
     * build an axis. If you simply take min and max and divide delta to number of steps you could get
     * very ugly numbers. Lets say you have min = 0.532 and max = 0.823 and you want to draw axis
     * across 20 steps. Simple calculation like (max - min) / steps will give us: 0.014549(9), so
     * your axis will look like this:
     *
     *     0.532, 0.5465499, 0.5610998, 0.5756497, etc
     *
     * Not pretty at all. snapEnds will give different set of numbers for the same values:
     *
     *     0.5, 0.52, 0.54, 0.56, 0.58, 0.6, 0.62, ... 0.8, 0.82, 0.84
     *
     * It starts a bit earlier and ends a bit later and trying to find a step which will look nice.
     *
     * @param {Number} from The minimum value in the data
     * @param {Number} to The maximum value in the data
     * @param {Number} stepsMax The maximum number of ticks
     * @param {Number} endsLocked If true, the 'from' and 'to' parameters will be used as fixed end values
     *        and will not be adjusted
     * @return {Object} The calculated step and ends info; properties are:
     *     - from: The result start value, which may be lower than the original start value
     *     - to: The result end value, which may be higher than the original end value
     *     - power: The power of 10 used in the step calculation
     *     - step: The value size of each step
     *     - steps: The number of steps. NOTE: the steps may not divide the from/to range perfectly evenly;
     *              there may be a smaller distance between the last step and the end value than between prior
     *              steps, particularly when the `endsLocked` param is true. Therefore it is best to not use
     *              the `steps` result when finding the axis tick points, instead use the `step`, `to`, and
     *              `from` to find the correct point for each tick.
     */
    snapEnds: function (from, to, stepsMax, endsLocked) {
        if (Ext.isDate(from)) {
            return this.snapEndsByDate(from, to, stepsMax, endsLocked);
        }
        var math = Math,
            pow = math.pow,
            floor = math.floor,

            // start with a precise step size
            step = (to - from) / stepsMax,

            // power is a power of 10 of the step. For axis 1, 2, 3 or 10, 20, 30 or
            // 0.1, 0.2, 0.3 power will be 0, 1 and -1 respectively.
            power = floor(math.log(step) / math.LN10) + 1,
            tenToPower = pow(10, power),

            // modulo will translate rounded value of the step to the 0 - 100 range. We will need it later.
            modulo = math.round((step % tenToPower) * pow(10, 2 - power)),

            // interval is an array of value/weight pairs
            interval = Ext.draw.Draw.snapEndsIntervalWeights,
            ln = interval.length,
            stepCount = 0,
            topWeight = 1e9,
            cur, value, weight, i, topValue;

        // round the start value by the power, so e.g. 0.532 will become 0.5.
        if (!endsLocked) {
            from = floor(from / tenToPower) * tenToPower;
        }
        cur = from;

        // find what is our step going to be to be closer to "pretty" numbers. This is done taking into
        // account the interval weights. This way we figure out topValue.
        for (i = 0; i < ln; i++) {
            value = interval[i][0];
            weight = (value - modulo) < 0 ? 1e6 : (value - modulo) / interval[i][1];
            if (weight < topWeight) {
                topValue = value;
                topWeight = weight;
            }
        }

        // with the new topValue, calculate the final step size
        step = floor(step * pow(10, -power)) * pow(10, power) + topValue * pow(10, power - 2);
        while (cur < to) {
            cur += step;
            stepCount++;
        }

        // Cut everything that is after tenth digit after floating point. This is to get rid of
        // rounding errors, i.e. 12.00000000000121212.
        if (!endsLocked) {
            to = +cur.toFixed(10);
        }

        return {
            from: from,
            to: to,
            power: power,
            step: step,
            steps: stepCount
        };
    },

    /**
     * snapEndsByDate is a utility method to deduce an appropriate tick configuration for the data set of given
     * feature. Refer to {@link #snapEnds}.
     *
     * @param {Date} from The minimum value in the data
     * @param {Date} to The maximum value in the data
     * @param {Number} stepsMax The maximum number of ticks
     * @param {Boolean} lockEnds If true, the 'from' and 'to' parameters will be used as fixed end values
     *        and will not be adjusted
     * @return {Object} The calculated step and ends info; properties are:
     *     - from: The result start value, which may be lower than the original start value
     *     - to: The result end value, which may be higher than the original end value
     *     - step: The value size of each step
     *     - steps: The number of steps. NOTE: the steps may not divide the from/to range perfectly evenly;
     *              there may be a smaller distance between the last step and the end value than between prior
     *              steps, particularly when the `endsLocked` param is true. Therefore it is best to not use
     *              the `steps` result when finding the axis tick points, instead use the `step`, `to`, and
     *              `from` to find the correct point for each tick.
     */
    snapEndsByDate: function (from, to, stepsMax, lockEnds) {
        var selectedStep = false, scales = [
                [Ext.Date.MILLI, [1, 2, 3, 5, 10, 20, 30, 50, 100, 200, 300, 500]],
                [Ext.Date.SECOND, [1, 2, 3, 5, 10, 15, 30]],
                [Ext.Date.MINUTE, [1, 2, 3, 5, 10, 20, 30]],
                [Ext.Date.HOUR, [1, 2, 3, 4, 6, 12]],
                [Ext.Date.DAY, [1, 2, 3, 7, 14]],
                [Ext.Date.MONTH, [1, 2, 3, 4, 6]]
            ], j, yearDiff;

        // Find the most desirable scale
        Ext.each(scales, function(scale, i) {
            for (j = 0; j < scale[1].length; j++) {
                if (to < Ext.Date.add(from, scale[0], scale[1][j] * stepsMax)) {
                    selectedStep = [scale[0], scale[1][j]];
                    return false;
                }
            }
        });
        if (!selectedStep) {
            yearDiff = this.snapEnds(from.getFullYear(), to.getFullYear() + 1, stepsMax, lockEnds);
            selectedStep = [Ext.Date.YEAR, Math.round(yearDiff.step)];
        }
        return this.snapEndsByDateAndStep(from, to, selectedStep, lockEnds);
    },


    /**
     * snapEndsByDateAndStep is a utility method to deduce an appropriate tick configuration for the data set of given
     * feature and specific step size.
     * @param {Date} from The minimum value in the data
     * @param {Date} to The maximum value in the data
     * @param {Array} step An array with two components: The first is the unit of the step (day, month, year, etc). The second one is the number of units for the step (1, 2, etc.).
     * @param {Boolean} lockEnds If true, the 'from' and 'to' parameters will be used as fixed end values
     *        and will not be adjusted
     */
    snapEndsByDateAndStep: function(from, to, step, lockEnds) {
        var fromStat = [from.getFullYear(), from.getMonth(), from.getDate(),
                from.getHours(), from.getMinutes(), from.getSeconds(), from.getMilliseconds()],
            steps = 0, testFrom, testTo;
        if (lockEnds) {
            testFrom = from;
        } else {
            switch (step[0]) {
                case Ext.Date.MILLI:
                    testFrom = new Date(fromStat[0], fromStat[1], fromStat[2], fromStat[3],
                            fromStat[4], fromStat[5], Math.floor(fromStat[6] / step[1]) * step[1]);
                    break;
                case Ext.Date.SECOND:
                    testFrom = new Date(fromStat[0], fromStat[1], fromStat[2], fromStat[3],
                            fromStat[4], Math.floor(fromStat[5] / step[1]) * step[1], 0);
                    break;
                case Ext.Date.MINUTE:
                    testFrom = new Date(fromStat[0], fromStat[1], fromStat[2], fromStat[3],
                            Math.floor(fromStat[4] / step[1]) * step[1], 0, 0);
                    break;
                case Ext.Date.HOUR:
                    testFrom = new Date(fromStat[0], fromStat[1], fromStat[2],
                            Math.floor(fromStat[3] / step[1]) * step[1], 0, 0, 0);
                    break;
                case Ext.Date.DAY:
                    testFrom = new Date(fromStat[0], fromStat[1],
                            Math.floor((fromStat[2] - 1)/ step[1]) * step[1] + 1, 0, 0, 0, 0);
                    break;
                case Ext.Date.MONTH:
                    testFrom = new Date(fromStat[0], Math.floor(fromStat[1] / step[1]) * step[1], 1, 0, 0, 0, 0);
                    break;
                default: // Ext.Date.YEAR
                    testFrom = new Date(Math.floor(fromStat[0] / step[1]) * step[1], 0, 1, 0, 0, 0, 0);
                    break;
            }
        }

        testTo = testFrom;
        // TODO(zhangbei) : We can do it better somehow...
        do {
            testTo = Ext.Date.add(testTo, step[0], step[1]);
            steps++;
        } while (testTo < to); // stop when testTo >= to

        if (lockEnds) {
            testTo = to;
        }
        return {
            from : +testFrom,
            to : +testTo,
            step : (testTo - testFrom) / steps,
            steps : steps
        };
    },

    sorter: function (a, b) {
        return a.offset - b.offset;
    },

    rad: function(degrees) {
        return degrees % 360 * Math.PI / 180;
    },

    degrees: function(radian) {
        return radian * 180 / Math.PI % 360;
    },

    withinBox: function(x, y, bbox) {
        bbox = bbox || {};
        return (x >= bbox.x && x <= (bbox.x + bbox.width) && y >= bbox.y && y <= (bbox.y + bbox.height));
    },
    
    updateIOS: Ext.os.is.iOS ? function () {
        // Work around for iOS
        // Nested 3d-transforms seems to block the changes inside it until some event is fire of change of dom tree.
        Ext.getBody().createChild({id: 'frame-workaround', style: 'position: absolute; top: 0px; bottom: 0px; left: 0px; right: 0px; background: rgba(0,0,0,0.001); z-index: 100000'});
        Ext.fx.Frame.requestAnimationFrame(function () {Ext.get('frame-workaround').destroy();});
    } : Ext.emptyFn,

    parseGradient: function(gradient) {
        var me = this,
            type = gradient.type || 'linear',
            angle = gradient.angle || 0,
            degrees = gradient.degrees || 0,
            radian = me.radian,
            stops = gradient.stops,
            stopsArr = [],
            stop,
            vector,
            max,
            stopObj;

        if (type == 'linear') {
            vector = [0, 0, Math.cos(angle * radian), Math.sin(angle * radian)];
            max = 1 / (Math.max(Math.abs(vector[2]), Math.abs(vector[3])) || 1);
            vector[2] *= max;
            vector[3] *= max;
            if (vector[2] < 0) {
                vector[0] = -vector[2];
                vector[2] = 0;
            }
            if (vector[3] < 0) {
                vector[1] = -vector[3];
                vector[3] = 0;
            }
        }

        for (stop in stops) {
            if (stops.hasOwnProperty(stop) && me.stopsRE.test(stop)) {
                stopObj = {
                    offset: parseInt(stop, 10),
                    color: Ext.draw.Color.toHex(stops[stop].color) || '#ffffff',
                    opacity: stops[stop].opacity || 1
                };
                stopsArr.push(stopObj);
            }
        }
        // Sort by pct property
        stopsArr.sort(me.sorter);
        if (type == 'linear') {
            return {
                id: gradient.id,
                type: type,
                angle: angle,
                degrees: degrees,
                vector: vector,
                stops: stopsArr
            };
        }
        else {
            return {
                id: gradient.id,
                type: type,
                angle: angle,
                degrees: degrees,
                centerX: gradient.centerX,
                centerY: gradient.centerY,
                focalX: gradient.focalX,
                focalY: gradient.focalY,
                radius: gradient.radius,
                vector: vector,
                stops: stopsArr
            };
        }
    }
});

/**
 * @class Ext.draw.CompositeSprite
 * @extends Ext.util.MixedCollection
 *
 * A composite Sprite handles a group of sprites with common methods to a sprite
 * such as `hide`, `show`, `setAttributes`. These methods are applied to the set of sprites
 * added to the group.
 *
 * CompositeSprite extends {@link Ext.util.MixedCollection} so you can use the same methods
 * in `MixedCollection` to iterate through sprites, add and remove elements, etc.
 *
 * In order to create a CompositeSprite, one has to provide a handle to the surface where it is
 * rendered:
 *
 *     var group = Ext.create('Ext.draw.CompositeSprite', {
 *         surface: drawComponent.surface
 *     });
 *
 * Then just by using `MixedCollection` methods it's possible to add {@link Ext.draw.Sprite}s:
 *
 *     group.add(sprite1);
 *     group.add(sprite2);
 *     group.add(sprite3);
 *
 * And then apply common Sprite methods to them:
 *
 *     group.setAttributes({
 *         fill: '#f00'
 *     }, true);
 */
(function(){
    function createRelayEvent(name) {
        return (function(e) {
            this.fireEvent(name, e);
        });
    }

    function createDispatcherMethod(name) {
        return function() {
            var args = Array.prototype.slice(arguments), items = this.items, l = items.length, i = 0, item;
            for(; i<l; i++){
                item = items[i];
                item[name].apply(item, args);
            };
        };
    }

    function createDispatcherMethodWithAggregation(name, aggregation, init, post) {
        if (!Ext.isFunction(post)) {
            post = function (x) { return x; };
        }
        return function() {
            var result = init.apply(this, arguments), args = Array.prototype.slice(arguments),
                items = this.items, l = this.items, i = 0, item;
            for(; i<l; i++){
                item = items[i];
                result = aggregation(result, item[name].apply(item, args));
            }
            return post(result);
        };
    }

    Ext.define('Ext.draw.CompositeSprite', {

        extend: 'Ext.util.MixedCollection',

        statics: {
            RelayedEvents: ['mousedown', 'mouseup', 'mouseover', 'mouseout', 'click']
        },

        /* End Definitions */
        isCompositeSprite: true,

        constructor: function(config) {
            var me = this;
            if (!config.surface) {
                Ext.error('Specify surface to create Ext.draw.CompositeSprite.');
            }
            config = config || {};
            Ext.apply(me, config);

            me.id = Ext.id(null, 'ext-sprite-group-');

            me.callParent(arguments);
        },

        /**
         * @private
         * @param {Sprite} o
         */
        attachEvents: function(o) {
            var me = this, events = me.relayedEvents;
            if (!me.relayedEvents) {
                events = {scope: me};
                Ext.Array.each(Ext.draw.CompositeSprite.RelayedEvents, function(name) {
                    events[name] = createRelayEvent(name);
                });
                me.relayedEvents = events;
            }
            o.on(events);
        },
        /**
         * @private
         * @param o
         */
        detachEvents: function (o) {
            o.un(this.relayedEvents);
        },

        /**
         * @private
         * @param config
         */
        prepareItem: function(config) {
            if (config.isSprite) {
                return config;
            }
            if (!config.surface) {
                config.surface = this.surface;
            }
            return new Ext.draw.Sprite(config);
        },

        /** Add a Sprite to the Group
         *
         * @param {String} key
         * @param {Ext.draw.Sprite} o
         */
        add: function(key, o) {
            if (o === undefined) {
                o = key;
            }
            if (!o.isSprite) {
                o = this.prepareItem(o);
            }
            key = this.getKey(o);
            var result = this.callParent([key, o]);
            this.attachEvents(result);
            return result;
        },

        /** Insert Sprite into the Group
         *
         * @param {Number} index
         * @param {String} key
         * @param {Ext.draw.Sprite} o
         */
        insert: function(index, key, o) {
            if (o === undefined) {
                o = key;
            }
            if (!o.isSprite) {
                o = this.prepareItem(o);
            }
            key = this.getKey(o);
            if (!o.isSprite) {
                o = new Ext.draw.Sprite(o);
            }
            return this.callParent([index, key, o]);
        },

        /** Remove a Sprite from the Group
         * 
         * @param {Ext.draw.Sprite} o The Sprite to be removed.
         */
        remove: function(o) {
            if (~this.indexOf(o)) { // != -1
                var me = this;
                me.detachEvents(o);
                this.callParent(arguments);
            }
        },

        /** Set attributes to all sprites.
         *
         * @param {Object} o Sprite attribute options just like in {@link Ext.draw.Sprite}.
         */
        setAttributes: createDispatcherMethod('setAttributes'),

        setText: createDispatcherMethod('setText'),

        /** Display all sprites in the Group.
         *
         * @param {Boolean} o Whether to re-render the frame.
         */
        show: createDispatcherMethod('show'),

        /** Hide all sprites in the Group.
         *
         * @param {Boolean} o Whether to re-render the frame.
         */
        hide: createDispatcherMethod('hide'),

        /** Redraw all sprites in the Group.
         *
         * @param {Boolean} o Whether to re-render the frame.
         */
        redraw: createDispatcherMethod('redraw'),

        /** Trigger an animation for all sprites in the Group.
         *
         */
        tween: createDispatcherMethod('tween'),
        dirt: createDispatcherMethod('dirt'),
        setStyle: createDispatcherMethod('setStyle'),
        addCls: createDispatcherMethod('addCls'),
        removeCls: createDispatcherMethod('removeCls'),

        /**
         * Return the minimal bounding box that contains all the sprites bounding boxes in this group.
         */
        getBBox: createDispatcherMethodWithAggregation('getBBox', function(result, current){
            result.l = Math.min(result.l, current.x);
            result.b = Math.max(result.b, current.height + current.y);
            result.t = Math.min(result.t, current.y);
            result.r = Math.max(result.r, current.width + current.x);
            return result;
        }, function () {
            var inf = Infinity;
            return {
                l: inf,
                r: -inf,
                t: inf,
                b: -inf
            };
        }, function(f) {
            return {
                x: f.l,
                y: f.t,
                height: f.b - f.t,
                width: f.r - f.l
            };
        }),

        /**
         * Grab the surface items surface.
         *
         * @return {Ext.draw.Surface} The surface, null if not found
         */
        getSurface: function(){
            var first = this.first();
            if (first) {
                return first.surface;
            }
            return null;
        },

        /**
         * Destroys the SpriteGroup
         */
        destroy: function(){
            var me = this,
                surface = me.surface,
                item;

            if (surface) {
                while (me.getCount() > 0) {
                    item = me.first();
                    me.remove(item);
                    item.destroy();
                }
                surface.removeGroup(me);
            }
            me.callParent();
        }
    });
})();


/**
 * @class Ext.draw.Sprite
 * @extends Object
 *
 * A Sprite is an object rendered in a Drawing surface. There are different options and types of sprites.
 * The configuration of a Sprite is an object with the following properties:
 *
 * - **type** - (String) The type of the sprite. Possible options are 'circle', 'path', 'rect', 'text', 'square', 'image'.
 * - **group** - (String/Array) The group that this sprite belongs to, or an array of groups. Only relevant when added to a {@link Ext.draw.Surface}. 
 * - **width** - (Number) Used in rectangle sprites, the width of the rectangle.
 * - **height** - (Number) Used in rectangle sprites, the height of the rectangle.
 * - **size** - (Number) Used in square sprites, the dimension of the square.
 * - **radius** - (Number) Used in circle sprites, the radius of the circle.
 * - **x** - (Number) The position along the x-axis.
 * - **y** - (Number) The position along the y-axis.
 * - **path** - (Array) Used in path sprites, the path of the sprite written in SVG-like path syntax.
 * - **opacity** - (Number) The opacity of the sprite.
 * - **fill** - (String) The fill color.
 * - **stroke** - (String) The stroke color.
 * - **stroke-width** - (Number) The width of the stroke.
 * - **font** - (String) Used with text type sprites. The full font description. Uses the same syntax as the CSS `font` parameter.
 * - **text** - (String) Used with text type sprites. The text itself.
 * 
 * Additionally there are three transform objects that can be set with `setAttributes` which are `translate`, `rotate` and
 * `scale`.
 * 
 * For translate, the configuration object contains x and y attributes that indicate where to
 * translate the object. For example:
 * 
 *     sprite.setAttributes({
 *       translate: {
 *        x: 10,
 *        y: 10
 *       }
 *     }, true);
 * 
 * For rotation, the configuration object contains x and y attributes for the center of the rotation (which are optional),
 * and a `degrees` attribute that specifies the rotation in degrees. For example:
 * 
 *     sprite.setAttributes({
 *       rotate: {
 *        degrees: 90
 *       }
 *     }, true);
 * 
 * For scaling, the configuration object contains x and y attributes for the x-axis and y-axis scaling. For example:
 * 
 *     sprite.setAttributes({
 *       scale: {
 *        x: 10,
 *        y: 3
 *       }
 *     }, true);
 *
 * Sprites can be created with a reference to a {@link Ext.draw.Surface}
 *
 *      var drawComponent = Ext.create('Ext.draw.Component', options here...);
 *
 *      var sprite = Ext.create('Ext.draw.Sprite', {
 *          type: 'circle',
 *          fill: '#ff0',
 *          surface: drawComponent.surface,
 *          radius: 5
 *      });
 *
 * Sprites can also be added to the surface as a configuration object:
 *
 *      var sprite = drawComponent.surface.add({
 *          type: 'circle',
 *          fill: '#ff0',
 *          radius: 5
 *      });
 *
 * In order to properly apply properties and render the sprite we have to
 * `show` the sprite setting the option `redraw` to `true`:
 *
 *      sprite.show(true);
 *
 * The constructor configuration object of the Sprite can also be used and passed into the {@link Ext.draw.Surface}
 * add method to append a new sprite to the canvas. For example:
 *
 *     drawComponent.surface.add({
 *         type: 'circle',
 *         fill: '#ffc',
 *         radius: 100,
 *         x: 100,
 *         y: 100
 *     });
 */

/**
 * @cfg {String} type The type of the sprite. Possible options are 'circle', 'path', 'rect', 'text', 'square', 'image'
 */

/**
 * @cfg {Number} width Used in rectangle sprites, the width of the rectangle
 */

/**
 * @cfg {Number} height Used in rectangle sprites, the height of the rectangle
 */

/**
 * @cfg {Number} size Used in square sprites, the dimension of the square
 */

/**
 * @cfg {Number} radius Used in circle sprites, the radius of the circle
 */

/**
 * @cfg {Number} x The position along the x-axis
 */

/**
 * @cfg {Number} y The position along the y-axis
 */

/**
 * @cfg {Array} path Used in path sprites, the path of the sprite written in SVG-like path syntax
 */

/**
 * @cfg {Number} opacity The opacity of the sprite
 */

/**
 * @cfg {String} fill The fill color
 */

/**
 * @cfg {String} stroke The stroke color
 */

/**
 * @cfg {Number} stroke-width The width of the stroke
 */

/**
 * @cfg {String} font Used with text type sprites. The full font description. Uses the same syntax as the CSS font parameter
 */

/**
 * @cfg {String} text Used with text type sprites. The text itself
 */

/**
 * @cfg {String/Array} group The group that this sprite belongs to, or an array of groups. Only relevant when added to a
 * {@link Ext.draw.Surface}
 */

/**
 * @event beforedestroy
 * @event destroy
 * @event render
 * @event mousedown
 * @event mouseup
 * @event mouseover
 * @event mouseout
 * @event mousemove
 * @event click
 * @event rightclick
 * @event mouseenter
 * @event mouseleave
 * @event touchstart
 * @event touchmove
 * @event touchend
 */

Ext.define('Ext.draw.Sprite', { 
 
    mixins: {
        identifiable: 'Ext.mixin.Identifiable',
        observable: 'Ext.util.Observable'
    },

    dirty: false,
    dirtyHidden: false,
    dirtyTransform: false,
    dirtyPath: true,
    dirtyFont: true,
    zIndexDirty: true,
    isSprite: true,
    zIndex: 0,
    fontProperties: [
        'font',
        'font-size',
        'font-weight',
        'font-style',
        'font-family',
        'text-anchor',
        'text'
    ],
    pathProperties: [
        'x',
        'y',
        'd',
        'path',
        'height',
        'width',
        'radius',
        'r',
        'rx',
        'ry',
        'cx',
        'cy'
    ],

    minDefaults: {
        circle: {
            cx: 0,
            cy: 0,
            r: 0,
            fill: "none"
        },
        ellipse: {
            cx: 0,
            cy: 0,
            rx: 0,
            ry: 0,
            fill: "none"
        },
        rect: {
            x: 0,
            y: 0,
            width: 0,
            height: 0,
            rx: 0,
            ry: 0,
            fill: "none"
        },
        text: {
            x: 0,
            y: 0,
            "text-anchor": "start",
            fill: "#000"
        },
        path: {
            d: "M0,0",
            fill: "none"
        },
        image: {
            x: 0,
            y: 0,
            width: 0,
            height: 0,
            preserveAspectRatio: "none"
        }
    },

    constructor: function(config) {
        var me = this;
        config = config || {};
        me.id = config.id || Ext.id(null, 'ext-sprite-');
        me.transformations = [];
        me.surface = config.surface;
        me.group = config.group;
        me.type = config.type;
        //attribute bucket
        me.bbox = {};
        me.attr = {
            zIndex: 0,
            translation: {
                x: null,
                y: null
            },
            rotation: {
                degrees: null,
                x: null,
                y: null
            },
            scaling: {
                x: null,
                y: null,
                cx: null,
                cy: null
            }
        };
        //delete not bucket attributes
        delete config.surface;
        delete config.group;
        delete config.type;
        Ext.applyIf(config, me.minDefaults[me.type]);
        me.setAttributes(config);
        
        me.mixins.observable.constructor.apply(me, arguments);

        //make animate instance
        me.fx = new Ext.fx.Sprite({
            sprite: me
        });
    },

    getAttribute: function(name) {
        var me = this,
            attr = me.attr;

        if (name == 'translate' && attr.translation) {
            return attr.translation;
        }
        if (name == 'scale' && attr.scaling) {
            return attr.scaling;
        }
        if (name == 'rotate' && attr.rotation) {
            return attr.rotation;
        }
        if (name in me.attr) {
            return me.attr[name];
        }
        return me.surface.getDefaultAttribute(name) || null;
    },

    /**
     * Change the attributes of the sprite.
     * @param {Object} attrs attributes to be changed on the sprite.
     * @param {Boolean} redraw Flag to immediatly draw the change.
     * @return {Ext.draw.Sprite} this
     */
    setAttributes: function(attrs, redraw) {
        if (!attrs) {
          return this;
        }

        var me = this,
            fontProps = me.fontProperties,
            fontPropsLength = fontProps.length,
            pathProps = me.pathProperties,
            pathPropsLength = pathProps.length,
            hasSurface = !!me.surface,
            custom = hasSurface && me.surface.customAttributes || {},
            spriteAttrs = me.attr,
            attr, i, translate, translation, rotate, rotation, scale, scaling;

        for (attr in custom) {
            if (attrs.hasOwnProperty(attr) && typeof custom[attr] == "function") {
                Ext.apply(attrs, custom[attr].apply(me, [].concat(attrs[attr])));
            }
        }

        // Flag a change in hidden
        if (!!attrs.hidden !== !!spriteAttrs.hidden) {
            me.dirtyHidden = true;
        }

        // Flag path change
        for (i = 0; i < pathPropsLength; i++) {
            attr = pathProps[i];
            if (attr in attrs && attrs[attr] !== spriteAttrs[attr]) {
                me.dirtyPath = true;
                break;
            }
        }

        // Flag zIndex change
        if ('zIndex' in attrs && attrs.zIndex != spriteAttrs.zIndex) {
            me.zIndexDirty = true;
        }

        // Flag font/text change
        for (i = 0; i < fontPropsLength; i++) {
            attr = fontProps[i];
            if (attr in attrs && attrs[attr] !== spriteAttrs[attr]) {
                me.dirtyFont = true;
                break;
            }
        }

        translate = attrs.translate || attrs.translation;
        translation = spriteAttrs.translation;
        if (translate) {
            if ((('x' in translate) && translate.x !== translation.x) ||
                (('y' in translate) && translate.y !== translation.y)) {
                Ext.apply(translation, translate);
                me.dirtyTransform = true;
            }
        }

        rotate = attrs.rotate || attrs.rotation;
        rotation = spriteAttrs.rotation;
        if (rotate) {
            if ((('x' in rotate) && rotate.x !== rotation.x) || 
                (('y' in rotate) && rotate.y !== rotation.y) ||
                (('degrees' in rotate) && rotate.degrees !== rotation.degrees)) {
                Ext.apply(rotation, rotate);
                me.dirtyTransform = true;
            }
        }

        scale = attrs.scale || attrs.scaling;
        scaling = spriteAttrs.scaling;
        if (scale) {
            if ((('x' in scale) && scale.x !== scaling.x) || 
                (('y' in scale) && scale.y !== scaling.y) ||
                (('cx' in scale) && scale.cx !== scaling.cx) ||
                (('cy' in scale) && scale.cy !== scaling.cy)) {
                Ext.apply(scaling, scale);
                me.dirtyTransform = true;
            }
        }

        for (var key in attrs) {
            var v = attrs[key];
            if (key == 'rotate') {
                key = 'rotation';
            } else if (key == 'scale') {
                key = 'scaling';
            } else if (key == 'translate') {
                key = 'translation';
            }
            spriteAttrs[key] = v;
        }

        // If the bbox is changed, then the bbox based transforms should be invalidated.
        if (me.dirtyPath && !me.dirtyTransform) {
            if (spriteAttrs.rotation.x === null ||
                spriteAttrs.rotation.y === null ||
                spriteAttrs.scaling.x === null ||
                spriteAttrs.scaling.y === null) {
                me.dirtyTransform = true;
            }
        }
        
        me.dirt();

        if (redraw === true && hasSurface) {
            me.redraw();
        }
        return this;
    },

    /**
     * Retrieve the bounding box of the sprite. This will be returned as an object with x, y, width, and height properties.
     * @return {Object} bbox
     */
    getBBox: function(isWithoutTransform) {
        return this.surface.getBBox(this, isWithoutTransform);
    },
    
    setText: function(text) {
        return this.surface.setText(this, text);
    },

    /**
     * Hide the sprite.
     * @param {Boolean} redraw Flag to immediatly draw the change.
     * @return {Ext.draw.Sprite} this
     */
    hide: function(redraw) {
        this.setAttributes({
            hidden: true
        }, redraw);
        return this;
    },

    /**
     * Show the sprite.
     * @param {Boolean} redraw Flag to immediatly draw the change.
     * @return {Ext.draw.Sprite} this
     */
    show: function(redraw) {
        this.setAttributes({
            hidden: false
        }, redraw);
        return this;
    },

    /**
     * Remove the sprite.
     */
    remove: function() {
        if (this.surface) {
            this.surface.remove(this);
            return true;
        }
        return false;
    },

    onRemove: function() {
        this.surface.onRemove(this);
    },

    /**
     * Removes the sprite and clears all listeners.
     */
    destroy: function() {
        var me = this;
        if (me.fireEvent('beforedestroy', me) !== false) {
            me.remove();
            me.surface.onDestroy(me);
            if (me.fx) {
                me.fx.stop();
                delete me.fx;
            }
            me.clearListeners();
            me.fireEvent('destroy');
        }
        this.callParent();
    },

    /**
     * Redraw the sprite.
     * @return {Ext.draw.Sprite} this
     */
    redraw: function() {
        this.surface.renderItem(this);
        return this;
    },

    /**
     * Draw a sprite Tween (animation interpolation).
     * @return {Ext.draw.Sprite} this
     */
    tween: function() {
        this.surface.tween(this);
        return this;
    },

    dirt: function() {
        if (!this.dirty) {
            this.dirty = true;
            if (this.surface) {
                this.surface.dirt();
            }
        }
        return this;
    },
    /**
     * Wrapper for setting style properties, also takes single object parameter of multiple styles.
     * @param {String/Object} property The style property to be set, or an object of multiple styles.
     * @param {String} value (optional) The value to apply to the given property, or null if an object was passed.
     * @return {Ext.draw.Sprite} this
     */
    setStyle: function() {
        this.element.setStyle.apply(this.element, arguments);
        return this;
    },

    /**
     * Adds one or more CSS classes to the element. Duplicate classes are automatically filtered out.  Note this method
     * is severly limited in VML.
     * @param {String/Array} className The CSS class to add, or an array of classes
     * @return {Ext.draw.Sprite} this
     */
    addCls: function(obj) {
        this.surface.addCls(this, obj);
        return this;
    },

    /**
     * Removes one or more CSS classes from the element.
     * @param {String/Array} className The CSS class to remove, or an array of classes.  Note this method
     * is severly limited in VML.
     * @return {Ext.draw.Sprite} this
     */
    removeCls: function(obj) {
        this.surface.removeCls(this, obj);
        return this;
    }
});


/**
 * @class Ext.draw.Matrix
 * @private
 * Utility class to calculate [affine transformation](http://en.wikipedia.org/wiki/Affine_transformation) matrix.
 *
 */
Ext.define('Ext.draw.Matrix', {

    /**
     * Create an affine transform matrix.
     *
     * @param xx Coefficient from x to x
     * @param xy Coefficient from x to y
     * @param yx Coefficient from y to x
     * @param yy Coefficient from y to y
     * @param dx Offset of x
     * @param dy Offset of y
     */
    constructor: function (xx, xy, yx, yy, dx, dy) {
        if (xx !== undefined) {
            this.matrix = [[xx, yx, dx],  [xy, yy, dy], [0, 0, 1]];
        } else {
            this.matrix = [[1, 0, 0], [0, 1, 0], [0, 0, 1]];
        }
    },

    /**
     * Postpend a matrix onto the current.
     * Note: The resulting transform will be first do the given transform,
     * then the current one.
     *
     * @param xx Coefficient from x to x
     * @param xy Coefficient from x to y
     * @param yx Coefficient from y to x
     * @param yy Coefficient from y to y
     * @param dx Offset of x
     * @param dy Offset of y
     * @returns this
     */
    add: function (xx, xy, yx, yy, dx, dy) {
        var me = this, out = [[], [], []], 
            matrix = [[xx, yx, dx], [xy, yy, dy], [0, 0, 1]], 
            x, y, z, res;

        for (x = 0; x < 3; x++) {
            for (y = 0; y < 3; y++) {
                res = 0;
                for (z = 0; z < 3; z++) {
                    res += me.matrix[x][z] * matrix[z][y];
                }
                out[x][y] = res;
            }
        }
        me.matrix = out;
        return me;
    },

    /**
     * Prepend a matrix onto the current.
     * Note: The resulting transform will be first do the current transform,
     * then the given one.
     *
     * @param xx Coefficient from x to x
     * @param xy Coefficient from x to y
     * @param yx Coefficient from y to x
     * @param yy Coefficient from y to y
     * @param dx Offset of x
     * @param dy Offset of y
     * @returns this
     */
    prepend: function (xx, xy, yx, yy, dx, dy) {
        var me = this, out = [[], [], []],
            matrix = [[xx, yx, dx], [xy, yy, dy], [0, 0, 1]],
            x, y, z, res;

        for (x = 0; x < 3; x++) {
            for (y = 0; y < 3; y++) {
                res = 0;
                for (z = 0; z < 3; z++) {
                    res += matrix[x][z] * me.matrix[z][y];
                }
                out[x][y] = res;
            }
        }
        me.matrix = out;
        return me;
    },

    /**
     * Return a new matrix represents the opposite transformation of the current one.
     *
     * @return {Ext.draw.Matrix}
     */
    invert: function () {
        var matrix = this.matrix, a = matrix[0][0], b = matrix[1][0], c = matrix[0][1], d = matrix[1][1], e = matrix[0][2], f = matrix[1][2], x = 1 / (a * d - b * c);
        return new Ext.draw.Matrix(d * x, -b * x, -c * x, a * x, (c * f - d * e) * x, (b * e - a * f) * x);
    },

    clone: function () {
        var matrix = this.matrix;
        return new Ext.draw.Matrix(matrix[0][0], matrix[1][0], matrix[0][1], matrix[1][1], matrix[0][2], matrix[1][2]);
    },

    translate: function (x, y) {
        this.prepend(1, 0, 0, 1, x, y);
        return this;
    },

    scale: function (x, y, cx, cy) {
        var me = this;
        if (y === null) {
            y = x;
        }
        me.add(1, 0, 0, 1, cx, cy);
        me.add(x, 0, 0, y, 0, 0);
        me.add(1, 0, 0, 1, -cx, -cy);
        return me;
    },

    rotate: function (a, x, y) {
        a = Ext.draw.Draw.rad(a);
        var me = this, cos = +Math.cos(a).toFixed(9), sin = +Math.sin(a).toFixed(9);
        me.add(cos, sin, -sin, cos, x, y);
        me.add(1, 0, 0, 1, -x, -y);
        return me;
    },

    x: function (x, y) {
        var matrix = this.matrix;
        return x * matrix[0][0] + y * matrix[0][1] + matrix[0][2];
    },

    y: function (x, y) {
        var matrix = this.matrix;
        return x * matrix[1][0] + y * matrix[1][1] + matrix[1][2];
    },

    get: function (i, j) {
        return +this.matrix[i][j].toFixed(4);
    },

    /**
     * Determines whether this matrix is an identity matrix (no transform)
     * @return {Boolean}
     */
    isIdentity: function () {
        var mat = this.matrix;
        return mat[0][0] === 1 && mat[0][1] === 0 && mat[0][2] === 0 && mat[1][0] === 1 && mat[1][1] === 0 && mat[1][2] === 0 && mat[1][1] === 0 && mat[1][2] === 0;
    },

    /**
     * Determines if this matrix has the same values as another matrix
     * @param {Ext.draw.Matrix} matrix
     * @return {Boolean}
     */
    equals: function (matrix) {
        var thisMatrix = this.matrix, otherMatrix = matrix.matrix;
        return thisMatrix[0][0] === otherMatrix[0][0] && thisMatrix[0][1] === otherMatrix[0][1] && thisMatrix[0][2] === otherMatrix[0][2] && thisMatrix[1][0] === otherMatrix[1][0] && thisMatrix[1][1] === otherMatrix[1][1] && thisMatrix[1][2] === otherMatrix[1][2];
    },

    toString: function () {
        var me = this;
        return [me.get(0, 0), me.get(0, 1), me.get(1, 0), me.get(1, 1), 0, 0].join(',');
    },

    toCanvas: function (ctx) {
        var matrix = this.matrix;
        ctx.transform(matrix[0][0], matrix[1][0], matrix[0][1], matrix[1][1], matrix[0][2], matrix[1][2]);
    },

    toSvg: function () {
        var matrix = this.matrix;
        return "matrix(" + [matrix[0][0], matrix[1][0], matrix[0][1], matrix[1][1], matrix[0][2], matrix[1][2]].join(',') + ")";
    },

    offset: function () {
        var matrix = this.matrix;
        return [matrix[0][2].toFixed(4), matrix[1][2].toFixed(4)];
    },

    /**
     * Split matrix into Translate Scale, Shear, and Rotate
     */
    split: function () {
        function norm (a) {
            return a[0] * a[0] + a[1] * a[1];
        }

        function normalize (a) {
            var mag = Math.sqrt(norm(a));
            a[0] /= mag;
            a[1] /= mag;
        }

        var matrix = this.matrix, out = {
            translateX: matrix[0][2],
            translateY: matrix[1][2]
        }, row;

        // scale and shear
        row = [
            [matrix[0][0], matrix[0][1]],
            [matrix[1][1], matrix[1][1]]
        ];
        out.scaleX = Math.sqrt(norm(row[0]));
        normalize(row[0]);

        out.shear = row[0][0] * row[1][0] + row[0][1] * row[1][1];
        row[1] = [row[1][0] - row[0][0] * out.shear, row[1][1] - row[0][1] * out.shear];

        out.scaleY = Math.sqrt(norm(row[1]));
        normalize(row[1]);
        out.shear /= out.scaleY;

        // rotation
        out.rotate = Math.asin(-row[0][1]);

        out.isSimple = !+out.shear.toFixed(9) && (out.scaleX.toFixed(9) == out.scaleY.toFixed(9) || !out.rotate);

        return out;
    }
});

/**
 * @class Ext.draw.Surface
 * @extends Object
 *
 * A Surface is an interface to render methods inside a draw {@link Ext.draw.Component}.
 * A Surface contains methods to render sprites, get bounding boxes of sprites, add
 * sprites to the canvas, initialize other graphic components, etc. One of the most used
 * methods for this class is the `add` method, to add Sprites to the surface.
 *
 * Most of the Surface methods are abstract and they have a concrete implementation
 * in VML or SVG engines.
 *
 * A Surface instance can be accessed as a property of a draw component. For example:
 *
 *     drawComponent.surface.add({
 *         type: 'circle',
 *         fill: '#ffc',
 *         radius: 100,
 *         x: 100,
 *         y: 100
 *     });
 *
 * The configuration object passed in the `add` method is the same as described in the {@link Ext.draw.Sprite}
 * class documentation.
 *
 * ### Listeners
 *
 * You can also add event listeners to the surface using the `Observable` listener syntax. Supported events are:
 *
 * - 'mouseup'
 * - 'mousedown'
 * - 'mouseover'
 * - 'mouseout'
 * - 'mousemove'
 * - 'mouseenter'
 * - 'mouseleave'
 * - 'click'
 * - 'dblclick'
 * - 'tap'
 * - 'tapstart'
 * - 'tapend'
 * - 'tapcancel'
 * - 'longpress'
 * - 'doubletap'
 * - 'singletap'
 * - 'touchstart'
 * - 'touchmove'
 * - 'touchend'
 * - 'drag'
 * - 'dragstart'
 * - 'dragend'
 * - 'pinch'
 * - 'pinchstart'
 * - 'pinchend'
 * - 'swipe'
 *
 * For example:
 *
 *     drawComponent.surface.on({
 *        'mousemove': function() {
 *             console.log('moving the mouse over the surface');
 *         }
 *     });
 *
 * ## Example
 *
 *     drawComponent.surface.add([
 *         {
 *             type: 'circle',
 *             radius: 10,
 *             fill: '#f00',
 *             x: 10,
 *             y: 10,
 *             group: 'circles'
 *         },
 *         {
 *             type: 'circle',
 *             radius: 10,
 *             fill: '#0f0',
 *             x: 50,
 *             y: 50,
 *             group: 'circles'
 *         },
 *         {
 *             type: 'circle',
 *             radius: 10,
 *             fill: '#00f',
 *             x: 100,
 *             y: 100,
 *             group: 'circles'
 *         },
 *         {
 *             type: 'rect',
 *             radius: 10,
 *             x: 10,
 *             y: 10,
 *             group: 'rectangles'
 *         },
 *         {
 *             type: 'rect',
 *             radius: 10,
 *             x: 50,
 *             y: 50,
 *             group: 'rectangles'
 *         },
 *         {
 *             type: 'rect',
 *             radius: 10,
 *             x: 100,
 *             y: 100,
 *             group: 'rectangles'
 *         }
 *     ]);
 *
 */
// COMPAT set Ext.baseCSSPrefix
Ext.baseCSSPrefix = 'x-';

(function() {

Ext.define('Ext.draw.Surface', { 
 
    mixins: {
      identifiable: 'Ext.mixin.Identifiable',
      observable: 'Ext.util.Observable'
    },

    uses: [
        'Ext.draw.engine.Canvas',
        'Ext.draw.Sprite',
        'Ext.draw.Matrix',
        'Ext.draw.CompositeSprite'
    ],

    statics: {
        /**
         * Create and return a new concrete Surface instance appropriate for the current environment.
         * @param {Object} config Initial configuration for the Surface instance
         * @param {Array} enginePriority Optional order of implementations to use; the first one that is
         *                available in the current environment will be used. Defaults to
         *                <code>['Svg', 'Vml']</code>.
         */
        create: function(config, enginePriority) {
            return new Ext.draw.engine.Canvas(config);
            enginePriority = enginePriority || ['Canvas', 'Svg'];

            var i = 0,
                len = enginePriority.length;

            for (; i < len; i++) {
                //if (Ext.supports[enginePriority[i]]) {
                    //return new Ext.draw.engine[enginePriority[i]](config);
                    //return new Ext.draw.engine.Svg(config);
                //}
            }
            return false;
        },
        /**
         * Saves the passed surface array based on the config parameters.
         *
         * The following config object properties affect the saving process:
         * - **type** - string - The export type. Supported types: 'svg': returns the chart's Svg-String, 'image/png': returns the chart as png, 'image/jpeg': returns the chart as jpeg. Default: 'image/png'
         *
         * Used in {@link Ext.chart.Chart#save}
         *
         * @param {Object} config The config object for the export generation
         * @param {Array} surfaces The surfaces that should be saved
         *
         */
        save: function(config, surfaces){
            var surfacesList = [],
                series = [],
                overlays = [],
                others = [],
                axes = [],
                exportEngine = 'Image';
                
            for(var i in surfaces){
            
                if(surfaces.hasOwnProperty(i)){
                    // TODO better implementation
                    if(i == 'main'){
                        surfacesList.push(surfaces[i]);
                    }else if(i.indexOf('Overlay') != -1){
                        overlays.push(surfaces[i]);
                    }else if(i.indexOf('Axis') != -1){
                        axes.push(surfaces[i]);
                    }else if(i.indexOf('series') != -1){
                        series.push(surfaces[i]);
                    }else{
                        others.push(surfaces[i]);
                    }
                }
            }

            surfacesList = surfacesList.concat(axes, series, overlays, others);

            // check type and if canvas is supported
            if(config.type == 'svg' || (!document.createElement('canvas').getContext)){
                exportEngine = 'Svg';
            }
                
            return Ext.draw.engine[exportEngine + 'Exporter'].generate(config, surfacesList);
        },

        // @private
        rectPath: function (x, y, w, h, r) {
            if (r) {
                return [["M", x + r, y], ["l", w - r * 2, 0], ["a", r, r, 0, 0, 1, r, r], ["l", 0, h - r * 2], ["a", r, r, 0, 0, 1, -r, r], ["l", r * 2 - w, 0], ["a", r, r, 0, 0, 1, -r, -r], ["l", 0, r * 2 - h], ["a", r, r, 0, 0, 1, r, -r], ["z"]];
            }
            return [["M", x, y], ["l", w, 0], ["l", 0, h], ["l", -w, 0], ["z"]];
        },

        // @private
        ellipsePath: function (x, y, rx, ry) {
            if (ry == null) {
                ry = rx;
            }
            return [["M", x, y], ["m", 0, -ry], ["a", rx, ry, 0, 1, 1, 0, 2 * ry], ["a", rx, ry, 0, 1, 1, 0, -2 * ry], ["z"]];
        },

        // @private
        getPathpath: function (el) {
            return el.attr.path;
        },

        // @private
        getPathcircle: function (el) {
            var a = el.attr, r = 'radius' in a ? a.radius : a.r;
            return this.ellipsePath(a.x, a.y, r);
        },

        // @private
        getPathellipse: function (el) {
            var a = el.attr;
            return this.ellipsePath(a.x, a.y, 'radiusX' in a ? a.radiusX : a.rx, 'radiusY' in a ? a.radiusY : a.ry);
        },

        // @private
        getPathrect: function (el) {
            var a = el.attr;
            return this.rectPath(a.x, a.y, a.width, a.height, a.r);
        },

        // @private
        getPathimage: function (el) {
            var a = el.attr;
            return this.rectPath(a.x || 0, a.y || 0, a.width, a.height);
        },

        // @private
        getPathtext: function (el) {
            var bbox = this.getBBoxText(el);
            return this.rectPath(bbox.x, bbox.y, bbox.width, bbox.height);
        },
        
        eventNames: [
            'mouseup',
            'mousedown',
            'mouseover',
            'mouseout',
            'mousemove',
            'mouseenter',
            'mouseleave',
            'click',
            'dblclick',
            'tap',
            'tapstart',
            'tapend',
            'tapcancel',
            'longpress',
            'doubletap',
            'singletap',
            'touchstart',
            'touchmove',
            'touchend',
            'drag',
            'dragstart',
            'dragend',
            'pinch',
            'pinchstart',
            'pinchend',
            'swipe'
        ]
    },
    
    // @private
    container: undefined,
    x: 0,
    y: 0,
    zoomX: 1,
    zoomY: 1,
    panX: 0,
    panY: 0,
    dirty: true,

    // @private
    availableAttrs: {
        blur: 0,
        "clip-rect": "0 0 1e9 1e9",
        cursor: "default",
        cx: 0,
        cy: 0,
        'dominant-baseline': 'auto',
        fill: "none",
        "fill-opacity": 1,
        font: '10px "Arial"',
        "font-family": '"Arial"',
        "font-size": "10",
        "font-style": "normal",
        "font-weight": 400,
        gradient: "",
        height: 0,
        hidden: false,
        href: "http://sencha.com/",
        opacity: 1,
        path: "M0,0",
        radius: 0,
        rx: 0,
        ry: 0,
        scale: "1 1",
        src: "",
        stroke: "none",
        "stroke-dasharray": "",
        "stroke-linecap": "butt",
        "stroke-linejoin": "butt",
        "stroke-miterlimit": 0,
        "stroke-opacity": 1,
        "stroke-width": 1,
        target: "_blank",
        text: "",
        "text-anchor": "middle",
        title: "Ext Draw",
        width: 0,
        x: 0,
        y: 0,
        zIndex: 0
    },

    config: {
        /**
         * @cfg {Number} height
         * The height of this component in pixels (defaults to auto).
         * <b>Note</b> to express this dimension as a percentage or offset see {@link Ext.Component#anchor}.
         */
        height: 352,

        /**
         * @cfg {Number} width
         * The width of this component in pixels (defaults to auto).
         * <b>Note</b> to express this dimension as a percentage or offset see {@link Ext.Component#anchor}.
         */
        width: 512,

        background: false,

        renderTo: false,

        items: [],

        groups: [],

        gradients: []
    },

    constructor: function(config) {
        var me = this;

        me.initConfig(config);

        me.domRef = Ext.getDoc().dom;
        me.customAttributes = {};
        me.mixins.observable.constructor.apply(me, arguments);

        me.getId();
        
        if (me.getRenderTo()) {
            me.render(me.getRenderTo());
        }
    },

    /**
     * @private initializes surface events. Should be called after render.
     */
    initializeEvents: function() {
        //NOTE: drag events have been moved to a deferred function.

        var me = this, events = {};
        Ext.Array.each(Ext.draw.Surface.eventNames, function(name) {
            events[name] = function (e){
                me.processEvent.apply(me, [name].concat(Array.prototype.slice.call(arguments)));
            }
        });
        //<deprecated product=charts since=2.0>
        events.taphold = events.longpress;
        //</deprecated>
        events.scope = me;
        me.element.on(events);
    },

    /**
     * Add a custom attribute to the surface
     * @param {String} attr
     * @param {Function} handler
     */
    addCustomAttribute: function(attr, handler) {
        var me = this;
        me.customAttributes[attr] = handler;
        this.dirt();
    },

    /**
     * Remove a custom attribute.
     * @param {String} attr The name of the custom attribute.
     */
    removeCustomAttribute: function(attr) {
       delete this.customAttributes[attr];
    },

    // TODO: check if this is needed any more
    initializeDragEvents: function() {
        var me = this;

        if (me.dragEventsInitialized) {
            return;
        }

        me.dragEventsInitialized = true;

//        me.element.on({
//            scope: me,
//            dragstart: me.onDragStart,
//            drag: me.onDrag,
//            dragend: me.onDragEnd
//        });
    },

    // @private called to initialize components in the surface
    // this is dependent on the underlying implementation.
    initSurface: Ext.emptyFn,

    // @private called to setup the surface to render an item
    //this is dependent on the underlying implementation.
    renderItem: Ext.emptyFn,

    // @private
    renderItems: Ext.emptyFn,

    renderFrame: function () {
        this.dirty = false;
    },

    // @private
    setViewBox: Ext.emptyFn,

    // @private
    tween: Ext.emptyFn,

    /**
     * Adds one or more CSS classes to the element. Duplicate classes are automatically filtered out.
     *
     * For example:
     *
     *          drawComponent.surface.addCls(sprite, 'x-visible');
     *
     * @param {Object} sprite The sprite to add the class to.
     * @param {String/Array} className The CSS class to add, or an array of classes
     */
    addCls: Ext.emptyFn,

    /**
     * Removes one or more CSS classes from the element.
     *
     * For example:
     *
     *      drawComponent.surface.removeCls(sprite, 'x-visible');
     *
     * @param {Object} sprite The sprite to remove the class from.
     * @param {String/Array} className The CSS class to remove, or an array of classes
     */
    removeCls: Ext.emptyFn,

    /**
     * Sets CSS style attributes to an element.
     *
     * For example:
     *
     *      drawComponent.surface.setStyle(sprite, {
     *          'cursor': 'pointer'
     *      });
     *
     * @param {Object} sprite The sprite to add, or an array of classes to
     * @param {Object} styles An Object with CSS styles.
     */
    setStyle: Ext.emptyFn,

    // @private
    createWrapEl: function(container) {
        return Ext.fly(container).createChild({tag: 'div', cls: Ext.baseCSSPrefix + 'surface-wrap', style: 'overflow:hidden', id: this.id + '-wrap'});
    },

    // @private
    applyGradients: function(gradients) {
        var result = {};
        if (gradients) {
            Ext.each(gradients, function (gradient){
                gradient = this.parseGradient(gradient);
                result[gradient.id] = gradient;
            }, this);
        }
        return result;
    },

    // @private
    applyItems: function(items, oldItems) {
        var result;
        if (items instanceof Ext.draw.CompositeSprite) {
            result = items;
        } else {
            result = new Ext.draw.CompositeSprite({surface: this});
            result.addAll(this.prepareItems(items, true));
        }

        if (oldItems) {
            if (items != oldItems) {
                oldItems.destroy();
            }
        }

        return result;
    },

    applyGroups: function(groups, oldGroups) {
        var result = new Ext.util.MixedCollection();
        if (groups instanceof Ext.util.MixedCollection) {
            result = groups;
        } else {
            result.addAll(groups);
        }
        if (oldGroups) {
            oldGroups.each(function (group) {
                if (!result.contains()) {
                    group.destroy();
                }
            });
        }
        return result;
    },

    // @private
    applyBackground: function(background) {
        var me = this,
            gradientId,
            gradient,
            width = me.getWidth(),
            height = me.getHeight();
        if (background) {
            if (background.renderGradient) {
                gradient = background.renderGradient;
                gradientId = gradient.id;
                me.addGradient(gradient);
                return me.add({
                    type: 'rect',
                    x: 0,
                    y: 0,
                    width: width,
                    height: height,
                    fill: 'url(#' + gradientId + ')',
                    zIndex: -100
                });
            } else if (background.fill) {
                return me.add({
                    type: 'rect',
                    x: 0,
                    y: 0,
                    width: width,
                    height: height,
                    fill: background.fill,
                    zIndex: -100
                });
            } else if (background.image) {
                return me.add({
                    type: 'image',
                    x: 0,
                    y: 0,
                    width: width,
                    height: height,
                    src: background.image,
                    zIndex: -100
                });
            }
        }
    },

    /**
     * Sets the size of the surface. Accomodates the background (if any) to fit the new size too.
     *
     * For example:
     *
     *      drawComponent.surface.setSize(500, 500);
     *
     * This method is generally called when also setting the size of the draw Component.
     *
     * @param {Number} w The new width of the canvas.
     * @param {Number} h The new height of the canvas.
     */
    setSize: function(w, h) {
        if (this.getBackground()) {
            this.getBackground().setAttributes({
                width: w,
                height: h,
                hidden: false
            }, true);
        }
        this.setWidth(w);
        this.setHeight(h);
        this.updateSurfaceElBox();
    },

    // @private
    scrubAttrs: function(sprite) {
        var me = this,
            attrs = {},
            exclude = {},
            sattr = sprite.attr,
            i;
        for (i in sattr) {
            // Narrow down attributes to the main set
            if (me.translateAttrs.hasOwnProperty(i)) {
                // Translated attr
                attrs[me.translateAttrs[i]] = sattr[i];
                exclude[me.translateAttrs[i]] = true;
            }
            else if (me.availableAttrs.hasOwnProperty(i) && !exclude[i]) {
                // Passtrhough attr
                attrs[i] = sattr[i];
            }
        }
        return attrs;
    },

    // @private - Normalize a delegated single event from the main container to each sprite and sprite group
    processEvent: function(name, e) {
        var me = this,
            sprite = me.getSpriteForEvent(e);
        if (sprite) {
            sprite.fireEvent(name, sprite, e);
        }
        me.fireEvent.apply(me, arguments);
    },

    /**
     * @protected - For a given event, find the Sprite corresponding to it if any.
     * @return {Ext.draw.Sprite} The sprite instance, or null if none found.
     */
    getSpriteForEvent: function(e) {
        return null;
    },

    /**
     * Add a gradient definition to the Surface. Note that in some surface engines, adding
     * a gradient via this method will not take effect if the surface has already been rendered.
     * Therefore, it is preferred to pass the gradients as an item to the surface config, rather
     * than calling this method, especially if the surface is rendered immediately (e.g. due to
     * 'renderTo' in its config). For more information on how to create gradients in the Chart
     * configuration object please refer to {@link Ext.chart.Chart}.
     *
     * The gradient object to be passed into this method is composed by:
     *
     *
     *  - **id** - string - The unique name of the gradient.
     *  - **angle** - number, optional - The angle of the gradient in degrees.
     *  - **stops** - object - An object with numbers as keys (from 0 to 100) and style objects as values.
     *
     *
     For example:
                drawComponent.surface.addGradient({
                    id: 'gradientId',
                    angle: 45,
                    stops: {
                        0: {
                            color: '#555'
                        },
                        100: {
                            color: '#ddd'
                        }
                    }
                });
     */
    addGradient: function(grad) {
        var me = this;
        grad = me.parseGradient(grad);
        me.getGradients()[grad.id] = grad;
    },
    parseGradient: Ext.emptyFn,

    /**
     * Add a Sprite to the surface. See {@link Ext.draw.Sprite} for the configuration object to be passed into this method.
     *
     * For example:
     *
     *     drawComponent.surface.add({
     *         type: 'circle',
     *         fill: '#ffc',
     *         radius: 100,
     *         x: 100,
     *         y: 100
     *     });
     *
    */
    add: function() {
        var me = this,
            args = Array.prototype.slice.call(arguments),
            hasMultipleArgs = args.length > 1,
            sprite, items, i, ln, item, results;

        if (hasMultipleArgs || Ext.isArray(args[0])) {
            items = hasMultipleArgs ? args : args[0];
            results = [];

            for (i = 0, ln = items.length; i < ln; i++) {
                item = items[i];
                item = me.add(item);
                results.push(item);
            }

            return results;
        }
        sprite = me.prepareItems(args[0], true)[0];
        me.normalizeSpriteCollection(sprite);
        me.onAdd(sprite);
        me.dirt();
        return sprite;
    },

    /**
     * @private
     * Insert or move a given sprite into the correct position in the items
     * MixedCollection, according to its zIndex. Will be inserted at the end of
     * an existing series of sprites with the same or lower zIndex. If the sprite
     * is already positioned within an appropriate zIndex group, it will not be moved.
     * This ordering can be used by subclasses to assist in rendering the sprites in
     * the correct order for proper z-index stacking.
     * @param {Ext.draw.Sprite} sprite
     * @return {Number} the sprite's new index in the list
     */
    normalizeSpriteCollection: function(sprite) {
        var items = this.getItems(),
            zIndex = sprite.attr.zIndex,
            idx = items.indexOf(sprite);

        if (idx < 0 || (idx > 0 && items.getAt(idx - 1).attr.zIndex > zIndex) ||
                (idx < items.length - 1 && items.getAt(idx + 1).attr.zIndex < zIndex)) {
            items.removeAt(idx);
            idx = items.findIndexBy(function(otherSprite) {
                return otherSprite.attr.zIndex > zIndex;
            });
            if (idx < 0) {
                idx = items.length;
            }
            items.insert(idx, sprite);
        }
        return idx;
    },

    onAdd: function(sprite) {
        var group = sprite.group,
            draggable = sprite.draggable,
            groups, ln, i;
        if (group) {
            groups = [].concat(group);
            ln = groups.length;
            for (i = 0; i < ln; i++) {
                group = groups[i];
                this.getGroup(group).add(sprite);
            }
            delete sprite.group;
        }
        if (draggable) {
            sprite.initDraggable();
        }
    },

    /**
     * Remove a given sprite from the surface, optionally destroying the sprite in the process.
     * You can also call the sprite own `remove` method.
     *
     * For example:
     *
     *      drawComponent.surface.remove(sprite);
     *      //or...
     *      sprite.remove();
     *
     * @param {Ext.draw.Sprite} sprite
     * @param {Boolean} destroySprite
     * @return {Number} the sprite's new index in the list
     */
    remove: function(sprite, destroySprite) {
        if (sprite) {
            this.getItems().remove(sprite);
            this.getGroups().each(function(item) {
                item.remove(sprite);
            });
            sprite.onRemove();
            if (destroySprite === true) {
                sprite.destroy();
            }
            this.dirt();
        }
    },

    /**
     * Remove all sprites from the surface, optionally destroying the sprites in the process.
     *
     * For example:
     *
     *      drawComponent.surface.removeAll();
     *
     * @param {Boolean} destroySprites Whether to destroy all sprites when removing them.
     * @return {Number} The sprite's new index in the list.
     */
    removeAll: function(destroySprites) {
        var items = this.getItems().items,
            ln = items.length,
            i;
        for (i = ln - 1; i > -1; i--) {
            this.remove(items[i], destroySprites);
        }
    },

    onRemove: Ext.emptyFn,

    onDestroy: Ext.emptyFn,

    // @private
    applyTransformations: function(sprite) {
        sprite.bbox.transform = 0;
        sprite.dirtyTransform = false;

        var me = this,
            dirty = false,
            attr = sprite.attr;

        if (attr.translation.x != null || attr.translation.y != null) {
            me.translate(sprite);
            dirty = true;
        }
        if (attr.scaling.x != null || attr.scaling.y != null) {
            me.scale(sprite);
            dirty = true;
        }
        if (attr.rotation.degrees != null) {
            me.rotate(sprite);
            dirty = true;
        }
        if (dirty) {
            sprite.bbox.transform = 0;
            me.transform(sprite);
            sprite.transformations = [];
        }
    },

    // @private
    rotate: function (sprite) {
        var bbox,
            deg = sprite.attr.rotation.degrees,
            centerX = sprite.attr.rotation.x,
            centerY = sprite.attr.rotation.y,
            trans = sprite.attr.translation,
            dx = trans && trans.x || 0,
            dy = trans && trans.y || 0;
        if (!Ext.isNumber(centerX) || !Ext.isNumber(centerY)) {
            bbox = this.getBBox(sprite, true); //isWithoutTransform=true
            centerX = !Ext.isNumber(centerX) ? (bbox.x + dx) + bbox.width / 2 : centerX;
            centerY = !Ext.isNumber(centerY) ? (bbox.y + dy) + bbox.height / 2 : centerY;
        }
        sprite.transformations.push({
            type: "rotate",
            degrees: deg,
            x: centerX,
            y: centerY
        });
    },

    // @private
    translate: function(sprite) {
        var x = sprite.attr.translation.x || 0,
            y = sprite.attr.translation.y || 0;
        sprite.transformations.push({
            type: "translate",
            x: x,
            y: y
        });
    },

    // @private
    scale: function(sprite) {
        var bbox,
            x = sprite.attr.scaling.x || 1,
            y = sprite.attr.scaling.y || 1,
            centerX = sprite.attr.scaling.centerX,
            centerY = sprite.attr.scaling.centerY;

        if (!Ext.isNumber(centerX) || !Ext.isNumber(centerY)) {
            bbox = this.getBBox(sprite);
            centerX = !Ext.isNumber(centerX) ? bbox.x + bbox.width / 2 : centerX;
            centerY = !Ext.isNumber(centerY) ? bbox.y + bbox.height / 2 : centerY;
        }
        sprite.transformations.push({
            type: "scale",
            x: x,
            y: y,
            centerX: centerX,
            centerY: centerY
        });
    },

    createGroup: function(id) {
        var group = this.getGroups().get(id);
        if (!group) {
            group = new Ext.draw.CompositeSprite({surface: this});
            group.id = id || Ext.id(null, 'ext-surface-group-');
            this.getGroups().add(group);
        }
        this.dirt();
        return group;
    },

    removeGroup: function(group) {
        if (Ext.isString(group)){
            group = this.getGroups().get(group);
        }
        if (group) {
            this.getGroups().remove(group);
        }
        this.dirt();
    },
    /**
     * Returns a new group or an existent group associated with the current surface.
     * The group returned is a {@link Ext.draw.CompositeSprite} group.
     *
     * For example:
     *
     *      var spriteGroup = drawComponent.surface.getGroup('someGroupId');
     *
     * @param {String} id The unique identifier of the group.
     * @return {Object} The {@link Ext.draw.CompositeSprite}.
     */
    getGroup: function(id) {
        if (typeof id == "string") {
            var group = this.getGroups().get(id);
            if (!group) {
                group = this.createGroup(id);
            }
        } else {
            group = id;
        }
        return group;
    },
    
    // @private
    prepareItems: function(items, applyDefaults) {
        items = [].concat(items);
        // Make sure defaults are applied and item is initialized
        var item, i, ln, me = this;
        for (i = 0, ln = items.length; i < ln; i++) {
            item = items[i];
            if (!(item instanceof Ext.draw.Sprite)) {
                // Temporary, just take in configs...
                item.surface = me;
                items[i] = me.createItem(item);
            } else {
                item.surface = me;
            }
        }
        return items;
    },

    /**
     * Changes the text in the sprite element. The sprite must be a `text` sprite.
     * This method can also be called from {@link Ext.draw.Sprite}.
     *
     * For example:
     *
     *      var spriteGroup = drawComponent.surface.setText(sprite, 'my new text');
     *
     * @param {Object} sprite The Sprite to change the text.
     * @param {String} text The new text to be set.
     */
    setText: Ext.emptyFn,

    //@private Creates an item and appends it to the surface. Called
    //as an internal method when calling `add`.
    createItem: Ext.emptyFn,

    /**
     * Retrieves the id of this component.
     * Will autogenerate an id if one has not already been set.
     */
    getId: function() {
        return this.id || (this.id = Ext.id(null, 'ext-surface-'));
    },

    /**
     * Destroys the surface. This is done by removing all components from it and
     * also removing its reference to a DOM element.
     *
     * For example:
     *
     *      drawComponent.surface.destroy();
     */
    destroy: function() {
        delete this.domRef;
        this.removeAll(true);
        this.setGroups([]);
        this.getItems().destroy();
        this.callParent();
    },

    //Empty the surface (without destroying it)
    clear: Ext.emtpyFn,

    dirt: function () {
        this.dirty = true;
    },

    /**
     * @private update the position/size/clipping of the series surface to match the current
     * chartBBox and the stored zoom/pan properties.
     */
    updateSurfaceElBox: function() {

        var me = this,
            floor = Math.floor,
            surfaceWidth = me.getWidth(),
            surfaceHeight = me.getHeight(),
            width = floor(surfaceWidth * me.zoomX),
            height = floor(surfaceHeight * me.zoomY),
            panX = me.panX,
            panY = me.panY,
            maxWidth = 2000,
            maxHeight = 1500,
            surfaceEl = me.surfaceEl,
            surfaceDom = surfaceEl.dom,
            ctx = me.surfaceEl.dom.getContext('2d'),
            setTranslation = false,
            newWidth, newHeight,
            diffX, diffY;

        // adjust the surfaceEl to match current zoom/pan; only if the size is changing to prevent
        // the canvas from getting cleared as happens when width/height are set.
        if (surfaceDom.width != width || surfaceDom.height != height) {
            surfaceEl.setSize(width, height);
            surfaceDom.width = width;
            surfaceDom.height = height;

            //TODO(nico): this is canvas specific.
            //this with the pixel check should be moved to
            //Canvas.js.
            if (setTranslation) {
                ctx.translate(diffX, diffY);
            }
        }

        surfaceEl.setTop(panY);
        surfaceEl.setLeft(panX);
        this.dirt();
    },

    /**
     * Sets the persistent transform and updates the surfaceEl's size and position to match.
     * @param {Number} panX
     * @param {Number} panY
     * @param {Number} zoomX
     * @param {Number} zoomY
     */
    setSurfaceTransform: function(panX, panY, zoomX, zoomY) {
        var me = this;
        me.panX = panX;
        me.panY = panY;
        me.zoomX = zoomX;
        me.zoomY = zoomY;
        me.setSurfaceFastTransform(null);
        me.updateSurfaceElBox();
        me.renderFrame();
    },

    /**
     * Sets a fast CSS3 transform on the surfaceEl.
     * @param {Ext.draw.Matrix} matrix
     */
    setSurfaceFastTransform: function(matrix) {
        this.transformMatrix = matrix;
        this.surfaceEl.setStyle({
            webkitTransformOrigin: '0 0',
            webkitTransform: matrix ? matrix.toSvg() :'matrix(1,0,0,1,0,0)'
        });
        this.renderFrame();
    },

    /**
     * Returns the preferred default value for a sprite attribute.
     */
    getDefaultAttribute: function(name) {
        var me = this;
        if (name in me.availableAttrs) {
            return me.availableAttrs[name];
        }
        return false;
    }

});
})();



/**
 * @class Ext.draw.engine.Canvas
 * @extends Ext.draw.Surface
 *
 * Provides specific methods to draw with 2D Canvas element.
 */
Ext.define('Ext.draw.engine.Canvas', { 
 
    extend: 'Ext.draw.Surface',

    uses: [
        'Ext.fx.Frame'
    ],
    //read only style attribute canvas property mapping.
    attributeMap: {
        //rotate: "rotation",
        stroke: "strokeStyle",
        fill: "fillStyle",
        lineWidth: "lineWidth",
        "text-anchor": "textAlign",
        "stroke-width": "lineWidth",
        "stroke-linecap": "lineCap",
        "stroke-linejoin": "lineJoin",
        "stroke-miterlimit": "miterLimit",
        opacity: "globalAlpha",
        font: 'font',
        "font-family": 'font',
        "font-size": 'font',
        shadowColor: "shadowColor",
        shadowOffsetX: "shadowOffsetX",
        shadowOffsetY: "shadowOffsetY",
        shadowBlur: "shadowBlur",
        textBaseline: "textBaseline",
        translate: "translate",
        scale: "scale",
        rotate: "rotate"
    },

    //read only default canvas property value map.
    attributeDefaults: {
        strokeStyle: "rgba(0, 0, 0, 1)",
        fillStyle: "rgba(0, 0, 0, 1)",
        lineWidth: 1,
        lineCap: "square",
        lineJoin: "miter",
        miterLimit: 1,
        shadowColor: "none",
        shadowOffsetX: 0,
        shadowOffsetY: 0,
        shadowBlur: 0,
        font: "10px 'Helvetica', 'sans-serif'",
        textAlign: "start",
        globalAlpha: 1,
        textBaseline: "middle",
        translate: { x: 0, y: 0 },
        scale: { x: 1, y: 1 },
        rotate: { degrees: 0 }
    },

    rgbRe: /\s*rgba?\s*\(\s*([0-9]+)\s*,\s*([0-9]+)\s*,\s*([0-9]+)\s*(,\s*[0-9\.]+\s*)?\)\s*/,
    gradientRe: /\s*url\s*\(#([^\)]+)\)\s*/,
    srcRe: /^"?([^"]*)"?$/,

    //a map containing the src of the images that have been loaded.
    loadedImages: {},

    //read-only map of value convertions
    //used to convert a gradient id string into a gradient object
    //in a generic way
    attributeParsers: {
        font: function (value, name, sprite, me) {
            var attr = sprite.attr;
            if (!attr.font && attr["font-size"] && attr["font-family"]) {
                return attr.font || attr["font-size"] + "px '" + attr["font-family"] + "'";
            }
            return attr.font;
        },
        fillStyle: function(value, name, sprite, me) {
            if (!value) {
                return value;
            }
            //is a gradient object
            if (Ext.isObject(value)) {
                me.addGradient(value);
                value = 'url(#' + value.id + ')';
            }
            var id = value.match(me.gradientRe);
            if (id) {
                return me.createGradient(me._gradients[id[1]], sprite);
            } else {
                return value == 'none'? 'rgba(0, 0, 0, 0)' : value;
            }
        },
        strokeStyle: function(value, name, sprite, me) {
            if (!value) {
                return value;
            }
            //is a gradient object
            if (Ext.isObject(value)) {
                me.addGradient(value);
                value = 'url(#' + value.id + ')';
            }
            var id = value.match(me.gradientRe);

            if (id) {
                return me.createGradient(me._gradients[id[1]], sprite);
            } else {
                return value == 'none'? 'rgba(0, 0, 0, 0)' : value;
            }
        },
        textAlign: function(value, name, sprite) {
            if (value === 'middle') {
                return 'center';
            }
            return value;
        }
    },

    statics: {
        // @private
        //TODO(nico): should sort also by abstract concept: "priority"
        zIndexSort: function(a, b) {
            var aAttr = a.attr,
                bAttr = b.attr,
                aIndex = aAttr && aAttr.zIndex || -1,
                bIndex = bAttr && bAttr.zIndex || -1,
                val = aIndex - bIndex;
            if (!val) {
                return (a.id > b.id) ? 1 :  -1;
            }
            else {
                return val;
            }
        },

        merge: function(a, b) {
            var i = 0, la = a.length, j = 0, lb = b.length, result = [];
            while (i < la && j < lb) {
                if (this.zIndexSort(a[i], b[j]) <= 0) {
                    result.push(a[i++]);
                } else {
                    result.push(b[j++]);
                }
            }
            while (i < la) {
                result.push(a[i++]);
            }
            while (j < lb) {
                result.push(b[j++]);
            }
            return result;
        },

        // Stable sort.
        mergeSort: function (list) {
            if (list.length <= 1) {
                return list;
            } else if (list.length === 2) {
                if (this.zIndexSort(list[0],list[1]) > 0) {
                    var temp = list[1];
                    list[1] = list[0];
                    list[0] = temp;
                }
                return list;
            } else {
                var mid = list.length >> 1;
                return this.merge(this.mergeSort(list.slice(0, mid)), this.mergeSort(list.slice(mid)));
            }
        }
    },

    constructor: function(config) {
        var me = this;
        //whether to add an event system to the canvas or not
        me.initEvents = 'initEvents' in config ? config.initEvents : true;
        //store a hash of gradient configurations
        me._gradients = {};
        me.callParent(arguments);

        me.initCanvas(config.renderTo, config);

        // Redraw after each animation frame event
        // Only render a frame if there are animations in the queue.
        // TODO(nico): should also check that any of those animations are happening in this surface.
        Ext.fx.Frame.addFrameCallback(me.renderFrame, me);
        //TODO(nico): This should be configurable.
        //disable context menu
        this.surfaceEl.on('contextmenu', function() { return false; });

    },

    //initializes the only canvas instance to draw the shapes to.
    initCanvas: function(container, config) {
        if (this.ctx) {
            return;
        }

        var me = this,
            domContainer = Ext.get(container),
            width = domContainer.getWidth() || config.width,
            height = domContainer.getHeight() || config.height,
            element = me.createWrapEl(container),
            surfaceEl = element.createChild({tag: 'canvas', id: me.id + '-canvas', width: width, height: height}),
            canvas = surfaceEl.dom,
            ctx = canvas.getContext('2d');

        element.setSize(width, height);
        //add an id to the dom div element.

        me.element = element;
        me.surfaceEl = surfaceEl;
        me.ctx = ctx;

        ctx.save();

        //Add event manager for canvas class
        me.initializeEvents();
    },

    getSpriteForEvent: function() {
        return null; //TODO!!!
    },

    //stores the gradient configuration into a hashmap
    parseGradient: function(gradient) {
        return Ext.draw.Draw.parseGradient(gradient);
    },

    //applies the current transformations to the element's matrix
    //TODO(nico): similar to what's found in Svg engine
    transform: function(sprite) {
        var matrix = new Ext.draw.Matrix(),
            transforms = sprite.transformations,
            transformsLength = transforms.length,
            i = 0,
            transform, type;

        for (; i < transformsLength; i++) {
            transform = transforms[i];
            type = transform.type;
            if (type == "translate") {
                matrix.translate(transform.x, transform.y);
            }
            else if (type == "rotate") {
                matrix.rotate(transform.degrees, transform.x, transform.y);
            }
            else if (type == "scale") {
                matrix.scale(transform.x, transform.y, transform.centerX, transform.centerY);
            }
        }
        sprite.matrix = matrix;
    },

    setSize: function(w, h) {
        var width, height,
            me = this,
            canvas = me.surfaceEl.dom;
        if (w && typeof w == 'object') {
            width = w.width;
            height = w.height;
        } else {
            width = w;
            height = h;
        }

        if (width !== canvas.width || height !== canvas.height) {
            me.element.setSize(width, height);
            me.surfaceEl.setSize(width, height);
            canvas.width = width;
            canvas.height = height;
        }

        me.callParent([width, height]);
    },

    tween: function() {
        this.animatedFrame = true;
        this.callParent();
    },

    /**
     * Triggers the re-rendering of the canvas.
     */
    renderFrame: function() {
        this.render();
    },

    render: function() {
        var me = this;
        if (!me.surfaceEl) {
            return;
        }
        me.renderAll();
    },

    createItem: function (config) {
        var sprite = new Ext.draw.Sprite(config);
        sprite.surface = this;
        sprite.matrix = new Ext.draw.Matrix();
        sprite.bbox = {
            plain: 0,
            transform: 0
        };
        return sprite;
    },

    renderAll: function() {
        if (this.dirty) {
            var me = this;
            me.clear();
            //sort by zIndex
            Ext.draw.engine.Canvas.mergeSort(me.getItems().items);
            me.getItems().each(me.renderSprite, me);
            me.dirty = false;
        }
    },

    /**
     * Renders a single sprite into the canvas (without clearing the canvas).
     *
     * @param {Ext.draw.Sprite} sprite The Sprite to be rendered.
     */
    renderSprite: function (sprite) {
        // Clear dirty flags that aren't used by the Canvas renderer
        sprite.dirtyHidden = sprite.dirtyPath = sprite.zIndexDirty = sprite.dirtyFont = sprite.dirty = false;

        if (sprite.attr.hidden) {
            return;
        }
        if (!sprite.matrix) {
            sprite.matrix = new Ext.draw.Matrix();
        }
        var me = this,
            ctx = me.ctx,
            attr = sprite.attr,
            attributeMap = me.attributeMap,
            attributeDefaults = me.attributeDefaults,
            attributeParsers = me.attributeParsers,
            prop, val, propertyValue;

        if (sprite.dirtyTransform) {
            me.applyTransformations(sprite);
            sprite.dirtyTransform = false;
        }
        ctx.save();

        //set matrix state
        sprite.matrix.toCanvas(ctx);

        //set styles
        for (prop in attributeMap) {
            val = attributeMap[prop];
            if (val in attributeParsers) {
                propertyValue = attributeParsers[val]( (prop in attr) ? attr[prop] :  me.availableAttrs[prop], prop, sprite, me);
                if (propertyValue === undefined) {
                    propertyValue = attributeDefaults[val];
                }
                if (ctx[val] != propertyValue) {
                    ctx[val] = propertyValue;
                }
            }
            else if (typeof ctx[val] !== 'function') {
                propertyValue = (prop in attr) ? attr[prop] : attributeDefaults[val];
                if (ctx[val] != propertyValue) {
                    ctx[val] = propertyValue;
                }
            }
        }

        //render shape
        me[sprite.type + 'Render'](sprite);
        ctx.restore();
    },

    circleRender: function(sprite) {
        var me = this,
            ctx = me.ctx,
            attr = sprite.attr,
            x = +(attr.x || 0),
            y = +(attr.y || 0),
            radius = attr.radius,
            pi2 = Ext.draw.Draw.pi2;

        //draw fill circle
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, pi2, true);
        ctx.closePath();
        me.fill();
        me.stroke();
    },

    ellipseRender: function(sprite) {
        var me = this,
            ctx = me.ctx,
            attr = sprite.attr,
            width = attr.width,
            height = attr.height,
            x = +(attr.x || 0),
            y = +(attr.y || 0),
            scaleX = 1,
            scaleY = 1,
            scalePosX = 1,
            scalePosY = 1,
            radius = 0,
            pi2 = Ext.draw.Draw.pi2;

        if (width > height) {
            radius = width / 2;
            scaleY = height / width;
            scalePosY = width / height;
        }
        else {
            radius = height / 2;
            scaleX = width / height;
            scalePosX = height / width;
        }
        ctx.scale(scaleX, scaleY);

        //make fill ellipse
        ctx.beginPath();
        ctx.arc(x * scalePosX, y * scalePosY, radius, 0, pi2, true);
        ctx.closePath();
        me.stroke();
    },

    imageRender: function(sprite) {
        var me = this,
            ctx = me.ctx,
            attr = sprite.attr,
            width = attr.width,
            height = attr.height,
            x = +(attr.x || 0),
            y = +(attr.y || 0),
            src = attr.src && attr.src.match(me.srcRe)[1],
            a, img;

        if (sprite._img && sprite._img.src == src) {
            img = sprite._img;
        } 
        else {
            sprite._img = img = new Image();
            img.height = height;
            img.width = width;

            //absolutize
            a = document.createElement('a');
            a.href = src;
            src = a.href;
            
            if (!me.loadedImages[src]) {
                img.onload = function() {
                    if (!me.loadedImages[src]) {
                        me.loadedImages[src] = true;
                        sprite.dirt();
                        me.renderFrame();
                    }
                };
            }
            
            img.src = src;
            attr.src = src;
        }

        if (me.loadedImages[src]) {
            ctx.drawImage(img, x - width / 2, y - height / 2, width, height);
        }
    },

    rectRender: function(sprite) {
        var me = this,
            ctx = me.ctx,
            attr = sprite.attr,
            width = attr.width,
            height = attr.height,
            x = +(attr.x || 0),
            y = +(attr.y || 0);

        if (isFinite(x) && isFinite(y) && isFinite(width) && isFinite(height)) {
            me.fillRect(x, y, width, height);
            me.strokeRect(x, y, width, height);
        }
    },

    textRender: function(sprite) {
        var me = this,
            ctx = me.ctx,
            bbox = sprite.getBBox(true),
            attr = sprite.attr,
            x = +(attr.x || 0),
            y = +(attr.y || 0),
            text = attr.text;

        if (isFinite(x) && isFinite(y)) {
            me.fillText(text, x, y);
        }
    },

    pathRender: function(sprite) {
        if (!sprite.attr.path) {
            return;
        }

        var me = this,
            ctx = me.ctx,
            attr = sprite.attr,
            path = Ext.draw.Draw.path2curve(attr.path),
            ln = path.length,
            x, y, i;

        ctx.beginPath();
        for (i = 0; i < ln; i++) {
            switch (path[i][0]) {
                case "M":
                    ctx.moveTo(path[i][1], path[i][2]);
                    if (x === null) {
                        x = path[i][1];
                    }
                    if (y === null) {
                        y = path[i][2];
                    }
                break;
                case "C":
                    ctx.bezierCurveTo(path[i][1],
                                      path[i][2],
                                      path[i][3],
                                      path[i][4],
                                      path[i][5],
                                      path[i][6]);
                break;
                case "Z":
                    ctx.lineTo(x, y);
                break;
            }
        }
        //if fill is not transparent then draw it
        if (attr.fill && attr.fill != 'none' && attr.fill != 'rgba(0, 0, 0, 0)') {
            me.fill();
        }
        //if stroke is not transparent then draw it
        if (attr.stroke && attr.stroke != 'none' && attr.stroke != 'rgba(0, 0, 0, 0)') {
            me.stroke();
        }
        ctx.closePath();
    },

    //Contains method used for event handling.
    //Returns the target pointed by the mouse or
    //false otherwise.
    contains: function(x, y) {
        var me = this,
            items = me.getItems().items,
            l = items.length,
            sprite;

        while (l--) {
            sprite = items[l];
            if (me.bboxContains(x, y, sprite)) {
                if (me[sprite.type + 'Contains'](x, y, sprite)) {
                    //TODO(nico): not returning just the sprite because a
                    //more complex object with more informaiton on the event
                    //may be returned.
                    return {
                        target: sprite
                    };
                }
            }
        }

        return false;
    },

    //Whether the point is in the BBox of the shape
    bboxContains: function(x, y, sprite) {
        var bbox = sprite.getBBox();

        return (x >= bbox.x && x <= (bbox.x + bbox.width)
            && (y >= bbox.y && y <= (bbox.y + bbox.height)));
    },

    //Whether the point is in the shape
    circleContains: function(x, y, sprite) {
        var attr = sprite.attr,
            trans = attr.translation,
            cx = (attr.x || 0) + (trans && trans.x || 0),
            cy = (attr.y || 0) + (trans && trans.y || 0),
            dx = x - cx,
            dy = y - cy,
            radius = attr.radius;

        return (dx * dx + dy * dy) <= (radius * radius);
    },

    //Whether the point is in the shape
    ellipseContains: function(x, y, sprite) {
        var attr = sprite.attr,
            trans = attr.translation,
            cx = (attr.x || 0) + (trans && trans.x || 0),
            cy = (attr.y || 0) + (trans && trans.y || 0),
            radiusX = attr.radiusX || (attr.width  / 2) || 0,
            radiusY = attr.radiusY || (attr.height / 2) || 0,
            radius = 0,
            scaleX = 1,
            scaleY = 1,
            dx, dy;

        if (radiusX > radiusY) {
                radius = radiusX;
                scaleY = radiusY / radiusX;
        } else {
            radius = radiusY;
            scaleY = radiusX / radiusY;
        }

        dx = (x - cx) / scaleX;
        dy = (y - cy) / scaleY;

        return (dx * dx + dy * dy) <= (radius * radius);
    },

    //Same behavior as the BBox check, so return true.
    imageContains: function(x, y, sprite) {
        return true;
    },

    //Same behavior as the BBox check, so return true.
    rectContains: function(x, y, sprite) {
        return true;
    },

    //Same behavior as the BBox check, so return true.
    textContains: function(x, y, sprite) {
        return true;
    },

    //TODO(nico): to be implemented later.
    pathContains: function(x, y, sprite) {
        return false;
    },

    createGradient: function(gradient, sprite) {
        var ctx = this.ctx,
            bbox = sprite.getBBox(),
            x1 = bbox.x,
            y1 = bbox.y,
            width = bbox.width,
            height = bbox.height,
            x2 = x1 + width,
            y2 = y1 + height,
            a = Math.round(Math.abs(gradient.degrees || gradient.angle || 0) % 360),
            stops = gradient.stops,
            stop, canvasGradient;

        if (a <= 0) {
            canvasGradient = ctx.createLinearGradient(x1, y1, x1, y2);
        } else if (a <= 45) {
            canvasGradient = ctx.createLinearGradient(x1, y1, x2, y2);
        } else if (a <= 90) {
            canvasGradient = ctx.createLinearGradient(x1, y1, x2, y1);
        } else if (a <= 135) {
            canvasGradient = ctx.createLinearGradient(x2, y1, x1, y2);
        } else if (a <= 180) {
            canvasGradient = ctx.createLinearGradient(x1, y2, x1, y1);
        } else if (a <= 225) {
            canvasGradient = ctx.createLinearGradient(x2, y2, x1, y1);
        } else if (a <= 270) {
            canvasGradient = ctx.createLinearGradient(x2, y1, x1, y1);
        } else if (a <= 315) {
            canvasGradient = ctx.createLinearGradient(x1, y2, x2, y1);
        } else {
            canvasGradient = ctx.createLinearGradient(x1, y1, x2, y2);
        }

        for (stop in stops) {
            if (stops.hasOwnProperty(stop)) {
                canvasGradient.addColorStop((stops[stop].offset || 0) /100, stops[stop].color || '#000');
            }
        }

        return canvasGradient;
    },

    /**
     * Returns the bounding box for the given Sprite as calculated with the Canvas engine.
     *
     * @param {Ext.draw.Sprite} sprite The Sprite to calculate the bounding box for.
     * @param {Boolean} isWithoutTransform Whether to calculate the bounding box with the current transforms or not.
     */
    getBBox: function (sprite, isWithoutTransform) {
        if (sprite.type == 'text') {
            return this.getBBoxText(sprite, isWithoutTransform);
        }
        var realPath = Ext.draw.Surface["getPath" + sprite.type](sprite);
        if (isWithoutTransform) {
            sprite.bbox.plain = sprite.bbox.plain || Ext.draw.Draw.pathDimensions(realPath);
            return sprite.bbox.plain;
        }
        //sprite.bbox.transform = sprite.bbox.transform || Ext.draw.Draw.pathDimensions(Ext.draw.Draw.mapPath(realPath, sprite.matrix));
        //caching the bounding box causes problems :(
        sprite.bbox.transform = Ext.draw.Draw.pathDimensions(Ext.draw.Draw.mapPath(realPath, sprite.matrix));
        return sprite.bbox.transform;
    },

    getBBoxText: function(sprite, isWithoutTransform) {
        var me = this,
            ctx = me.ctx,
            attr = sprite.attr,
            matrix,
            x = attr.x || 0,
            y = attr.y || 0,
            x1, x2, y1, y2,
            x1t, x2t, x3t, x4t,
            y1t, y2t, y3t, y4t,
            width, height,
            font = attr.font,
            height = attr['font-size'] || +(font && font.match(/[0-9]+/)[1]) || 10,
            text = attr.text,
            baseline =  attr.textBaseline || me.attributeDefaults.textBaseline,
            alignment = attr['text-anchor'] || attr.textAlign || me.attributeDefaults.textAlign;

        if (font && ctx.font !== font) {
            ctx.font = font;
        }
        width = ctx.measureText(text).width;

        switch (baseline) {
            case 'top' :
                y -= height;
                break;
            case 'hanging' : 
            case 'ideographic' :
            case 'alphabetic' :
                y -= height * 0.8;
                break;
            case 'middle' :
            case 'center' :
                y -= height * 0.5;
                break;
            case 'bottom' : break;
        }

        switch (alignment) {
            case 'end' :
            case 'right' :
                x -= width;
                break;
            case 'middle' :
            case 'center' :
                x -= width * 0.5;
                break;
        }
        if (!isWithoutTransform) {
            if (sprite.dirtyTransform) {
                me.applyTransformations(sprite);
            }
            matrix = sprite.matrix;
            x1 = x;
            y1 = y;
            x2 = x + width;
            y2 = y + height;
            x1t = matrix.x(x1, y1);
            y1t = matrix.y(x1, y1);

            x2t = matrix.x(x1, y2);
            y2t = matrix.y(x1, y2);

            x3t = matrix.x(x2, y1);
            y3t = matrix.y(x2, y1);

            x4t = matrix.x(x2, y2);
            y4t = matrix.y(x2, y2);

            x = Math.min(x1t, x2t, x3t, x4t);
            y = Math.min(y1t, y2t, y3t, y4t);

            width = Math.abs(x - Math.max(x1t, x2t, x3t, x4t));
            height = Math.abs(y - Math.max(y1t, y2t, y3t, y4t));
        }

        return {
            x: x,
            y: y,
            width: width,
            height: height
        };
    },

    /**
     * Returns the region occupied by the canvas.
     */
    getRegion: function() {
        var canvas = this.surfaceEl.dom,
            xy = this.surfaceEl.getXY();

        return {
            left: xy[0],
            top: xy[1],
            right: xy[0] + canvas.width,
            bottom: xy[1] + canvas.height
        };
    },

    //force will force the method to return a value.
    getShadowAttributesArray: function(force) {
        if (force) {
            return [{
                    "stroke-width": 6,
                    "stroke-opacity": 1,
                    stroke: 'rgba(200, 200, 200, 0.5)',
                    translate: {
                        x: 1.2,
                        y: 2
                    }
                },
                {
                    "stroke-width": 4,
                    "stroke-opacity": 1,
                    stroke: 'rgba(150, 150, 150, 0.5)',
                    translate: {
                        x: 0.9,
                        y: 1.5
                    }
                },
                {
                    "stroke-width": 2,
                    "stroke-opacity": 1,
                    stroke: 'rgba(100, 100, 100, 0.5)',
                    translate: {
                        x: 0.6,
                        y: 1
                    }
                }];
        } else {
            return [];
        }
    },

    //force will force the method to return a value.
    getShadowOptions: function(force) {
        return {
            shadowOffsetX: 2,
            //http://code.google.com/p/android/issues/detail?id=16025
            shadowOffsetY: Ext.os.is('Android') ? -2 : 2,
            shadowBlur: 3,
            shadowColor: '#444'
        };
    },

    /**
     * Clears the canvas.
     */
    clear: function() {
        var me = this,
            canvas = me.surfaceEl.dom;
        me.ctx.clearRect(0, 0, canvas.width, canvas.height);
    },

    /**
     * Returns the preferred default value for a sprite attribute.
     */
    getDefaultAttribute: function(name) {
        var me = this,
            map = me.attributeMap,
            def = me.attributeDefaults;

        if (name in map) {
            return def[ map[ name ] ];
        } else if (name in def) {
            return def[name];
        }

        return false;
    },

    /**
     * Destroys the Canvas element and prepares it for Garbage Collection.
     */
    destroy: function() {
        var me = this;
        delete me.ctx;
        me.surfaceEl.destroy();
        delete me.surfaceEl;
        me.element.destroy();
        delete me.element;
        Ext.fx.Frame.removeFrameCallback(me.renderFrame, me);
        me.callParent(arguments);
    }
}, function () {

    function globalAlphaPolyfill(method, type) {
        type = type + '-opacity';
        return (function () {
            var me = this, ctx = me.ctx, globalAlpha = +me.ctx.globalAlpha, opacity = me[type] === undefined ? 1 : me[type];
            if (globalAlpha > 0) {
                if (opacity !== undefined && opacity < 1 && opacity > 0) {
                    ctx.globalAlpha = globalAlpha * opacity;
                    ctx[method].apply(ctx, arguments);
                    ctx.globalAlpha = globalAlpha;
                } else {
                    ctx[method].apply(ctx, arguments);
                }
            }
        });
    }

    this.addMembers({
        stroke : globalAlphaPolyfill('stroke', 'stroke'),
        fill : globalAlphaPolyfill('fill', 'fill'),
        strokeRect : globalAlphaPolyfill('strokeRect', 'stroke'),
        fillRect : globalAlphaPolyfill('fillRect', 'fill'),
        strokeText : globalAlphaPolyfill('strokeText', 'stroke'),
        fillText : globalAlphaPolyfill('fillText', 'fill')
    });

});

/**
 * @class Ext.draw.engine.SvgExporter
 * @singleton
 * The SvgExporter class provides a generate function which generates the export
 * and returns a SVG string containing all the chart's elements.
 *
 * Used in {@link Ext.draw.Surface#save}
 */
Ext.define("Ext.draw.engine.SvgExporter", {
    /**
     * Used to generate a SVG string containing all the chart's elements.
     *
     * @param {Object} config The config object for the export generation. Currently not used.
     * @param {Array} surfaces The chart's surfaces
     */
    generate: function(config, surfaces) {
        var me = this,
            width = me.width,
            height = me.height,
            gradients = me.gradients,
            surfaces = me.surfaces,
            svg = '<?xml version="1.0" standalone="yes"?>' +
                '<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">' +
                '<svg width="' + width + 'px" height="' + height +
                'px" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1">',
            gradient,
            i, ln, j, ln2, item, items, surface, offsetLeft, offsetTop;

        for (i = 0, ln = surfaces.length; i < ln; i++) {
            surface = surfaces[i];
            items = surface.getItems().items;
            ln2 = items.length;
            if (ln2 == 0) {
                continue;
            }

            offsetTop = parseFloat(surface.element.getStyle('top'));
            offsetLeft = parseFloat(surface.element.getStyle('left'));

            offsetTop = isNaN(offsetTop) ? 0 : offsetTop;
            offsetLeft = isNaN(offsetLeft) ? 0 : offsetLeft;

            // nested svg 
            // each layer is represented by an svg element containing its sprites
            // required because the sprite positions are from inside a layer
            svg += '<svg x="' + offsetLeft + '" y="' + offsetTop +
                '" width="' + surface.width + '" height="' + surface.height + '">';

            // add gradients definition
            if (gradients.length > 0) {
                svg += '<defs>';
                gradient = gradients[i];
                for (j = 0, ln2 = gradient.length; j < ln2; j++) {
                    svg += me.renderGradient(gradient[j]);
                }
                svg += '</defs>';
            }

            for (j = 0; j < ln2; j++) {
                item = items[j];
                if (!item.attr.hidden) {
                    svg += me[item.type](item);
                }
            }
            svg += '</svg>';
        }
        svg += '</svg>';
        return svg;
    },

    toPropertyString: function(obj) {
        var propString = [];
        for (var key in obj) {
            if (obj.hasOwnProperty(key) && obj[key] !== null) {
                propString.push(key, '="', obj[key], '"');
            }
        }
        return propString.join(' ');
    },

    path: function(sprite) {
        var me = this,
            attr = sprite.attr,
            path = attr.path,
            pathString, i, ln, p;
        if (Ext.isArray(path[0])) {
            pathString = [];
            for (i = 0, ln = path.length; i < ln; i++) {
                p = path[i];
                pathString.push(p.join(' '));
            }
            pathString = pathString.join('');
        } else if (Ext.isArray(path)) {
            pathString = path.join(' ');
        } else {
            pathString = path.replace(/,/g, ' ');
        }

        var props = me.toPropertyString({
            d: pathString,
            fill: attr.fill,
            stroke: attr.stroke,
            'fill-opacity': attr.opacity,
            'stroke-width': attr['stroke-width'],
            'stroke-opacity': attr['stroke-opacity'],
            transform: sprite.matrix.toSvg()
        });

        return '<path ' + props + '/>';
    },

    text: function(sprite) {
        var me = this,
            attr = sprite.attr, fontRegex = /^(-?\d*\.?\d*){1}(em|ex|px|in|cm|mm|pt|pc|%)\s('*.*'*)/,
            match = fontRegex.exec(attr.font),
            size = match[1],
            family = match[3],
            text = attr.text,
            tspanString = '',
            props = me.toPropertyString({
                x: attr.x,
                y: attr.y,
                'font-size': size,
                'font-family': family,
                'font-weight': attr['font-weight'],
                'text-anchor': attr['text-anchor'],
                // if no fill property is set it will be black
                fill: attr.fill || '#000',
                'fill-opacity': attr.opacity,
                transform: sprite.matrix.toSvg()
            });

        tspanString += '<tspan x="' + attr.x + '" dy="' + (size / 4) + '">';
        tspanString += Ext.String.htmlEncode(text) + '</tspan>';

        return '<text ' + props + '>' + tspanString + '</text>';
    },

    rect: function(sprite) {
        var me = this,
            attr = sprite.attr,
            props = me.toPropertyString({
                x: attr.x,
                y: attr.y,
                rx: attr.rx,
                ry: attr.ry,
                width: attr.width,
                height: attr.height,
                fill: attr.fill,
                'fill-opacity': attr.opacity,
                stroke: attr.stroke,
                'stroke-width': attr['stroke-width'],
                'stroke-opacity': attr['stroke-opacity'],
                transform: sprite.matrix.toSvg()
            });

        return '<rect ' + props + '/>';
    },

    circle: function(sprite) {
        var me = this,
            attr = sprite.attr,
            props = me.toPropertyString({
                cx: attr.x,
                cy: attr.y,
                r: attr.radius,
                fill: attr.translation.fill || attr.fill,
                'fill-opacity': attr.opacity,
                stroke: attr.stroke,
                'stroke-width': attr['stroke-width'],
                'stroke-opacity': attr['stroke-opacity'],
                transform: sprite.matrix.toSvg()
            });

        return '<circle ' + props + ' />';
    },

    image: function(sprite) {
        var me = this,
            attr = sprite.attr,
            props = me.toPropertyString({
                x: attr.x - (attr.width / 2 >> 0),
                y: attr.y - (attr.height / 2 >> 0),
                width: attr.width,
                height: attr.height,
                'xlink:href': attr.src,
                transform: sprite.matrix.toSvg()
            });

        return '<image ' + props + ' />';
    },

    // TODO: take angle in account / radialGradients?
    renderGradient: function(gradient) {
        var stops = gradient.stops, stop, stopsString = '';

        for (var key in stops) {
            if (stops.hasOwnProperty(key)) {
                stop = stops[key];
                stopsString += '<stop offset="' + key + '%" stop-color="' + stops[key].color + '" />';
            }
        }

        return '<linearGradient id="' + gradient.id + '" x1="0%" x2="0%" y1="0%" y2="100%" >' +
            stopsString +
            '</linearGradient>';
    }
});

/**
 * @class Ext.draw.engine.ImageExporter
 * @singleton
 *
 * The ImageExporter class provides a generate function which generates the export
 * and returns a base64 encoded image dataURL containing all the chart's elements.
 *
 * Used in {@link Ext.draw.Surface#save}
 */
Ext.define('Ext.draw.engine.ImageExporter', {
    
    singleton: true,
    /**
     * Used to generate a base64 encoded image dataURL containing all the chart's elements
     * 
     * @param {Object} config The config object for the export generation
     * @param {Array} surfaces The chart's surfaces
     */
    generate: function(config, surfaces){
        var canvas = document.createElement("canvas"),
            type = config.type || "image/png",
            len = surfaces.length,
            ctx = canvas.getContext("2d"),
            width = surfaces[0].canvas.width,
            height = surfaces[0].canvas.height;
            
            canvas.width = width;
            canvas.height = height;
        
        if(type == "image/jpeg"){
            // draw a white background if user wants to save a jpeg
            // otherwise the alpha channel would result in a black background
            ctx.save();
            ctx.fillStyle = "rgb(255,255,255)";
            ctx.fillRect(0, 0, width, height);
            ctx.restore();
        }
        
        // drawing all the layers on the canvas
        // considering that they probably have different positions
        for(var i=0; i < len; i++){
            var surface = surfaces[i],
                c = surface.canvas,
                width = surface.element.getWidth(),
                height = surface.element.getHeight(),
                top = surface.element.getStyle('top').replace(/px/, ''),
                left = surface.element.getStyle('left').replace(/px/, '');
                    
            top = isNaN(top)?0:top; 
            left = isNaN(left)?0:left;

            if (width && height) {
                ctx.drawImage(c, left, top);
            }
        }
        
        return canvas.toDataURL(config.type);
    }
});

/**
 * @class Ext.draw.Component
 * @extends Ext.Component
 *
 * The Draw Component is a surface in which sprites can be rendered. The Draw Component
 * manages and holds a `Surface` instance: an interface that has
 * an SVG or VML implementation depending on the browser capabilities and where
 * Sprites can be appended.
 * One way to create a draw component is:
 *
 *     var drawComponent = new Ext.draw.Component({
 *         items: [{
 *             type: 'circle',
 *             fill: '#79BB3F',
 *             radius: 100,
 *             x: 100,
 *             y: 100
 *         }]
 *     });
 *
 *     new Ext.Panel({
 *         fullscreen: true,
 *         items: [drawComponent]
 *     });
 *
 * In this case we created a draw component and added a sprite to it.
 * The *type* of the sprite is *circle* so if you run this code you'll see a yellow-ish
 * circle in a Window. When setting `viewBox` to `false` we are responsible for setting the object's position and
 * dimensions accordingly.
 *
 * You can also add sprites by using the surface's add method:
 *
 *     drawComponent.surface.add({
 *         type: 'circle',
 *         fill: '#79BB3F',
 *         radius: 100,
 *         x: 100,
 *         y: 100
 *     });
 *
 * For more information on Sprites, the core elements added to a draw component's surface,
 * refer to the {@link Ext.draw.Sprite} documentation.
 */
Ext.define('Ext.draw.Component', { 
    
    extend: 'Ext.Component',

    uses: [
        'Ext.draw.Surface'
    ],
    /**
     * @cfg {Array} enginePriority
     * Defines the priority order for which Surface implementation to use. The first
     * one supported by the current environment will be used.
     */
    enginePriority: ['Canvas'],

    config: {
        
        baseCls: 'ext-surface',

        componentLayout: 'draw',

        /**
         * @cfg {Boolean} viewBox
         * Turn on view box support which will scale and position items in the draw component to fit to the component while
         * maintaining aspect ratio. Note that this scaling can override other sizing settings on yor items.
         */
        viewBox: true,

        /**
         * @cfg {Boolean} autoSize
         * Turn on autoSize support which will set the bounding div's size to the natural size of the contents.
         */
        autoSize: false,

        /**
         * @cfg {Array} gradients (optional) Define a set of gradients that can be used as `fill` property in sprites.
         * The gradients array is an array of objects with the following properties:
         *
         * <ul>
         * <li><strong>id</strong> - string - The unique name of the gradient.</li>
         * <li><strong>angle</strong> - number, optional - The angle of the gradient in degrees.</li>
         * <li><strong>stops</strong> - object - An object with numbers as keys (from 0 to 100) and style objects
         * as values</li>
         * </ul>
         *

         For example:

         <pre><code>
            gradients: [{
                id: 'gradientId',
                angle: 45,
                stops: {
                    0: {
                        color: '#555'
                    },
                    100: {
                        color: '#ddd'
                    }
                }
            },  {
                id: 'gradientId2',
                angle: 0,
                stops: {
                    0: {
                        color: '#590'
                    },
                    20: {
                        color: '#599'
                    },
                    100: {
                        color: '#ddd'
                    }
                }
            }]
         </code></pre>

         Then the sprites can use `gradientId` and `gradientId2` by setting the fill attributes to those ids, for example:

         <pre><code>
            sprite.setAttributes({
                fill: 'url(#gradientId)'
            }, true);
         </code></pre>

         */
        gradients: []
    },

    cls: 'x-draw-component',

    initialize: function() {
        var me = this,
            viewBox = me.getViewBox(),
            autoSize = me.getAutoSize(),
            bbox, items, width, height, x, y;

        me.callParent();
        me.surface = me.createSurface();
        //Create the Surface on initial render
     
        items = me.surface.getItems();

        if (viewBox || autoSize) {
            bbox = items.getBBox();
            width = bbox.width;
            height = bbox.height;
            x = bbox.x;
            y = bbox.y;
            if (me.getViewBox()) {
                me.surface.setViewBox(x, y, width, height);
            }
            else {
                // AutoSized
                me.autoSizeSurface();
            }
        }

        me.relayEvents(me.getEventsSurface(), Ext.draw.Surface.eventNames);

        // Relay all mouse/touch events from the surface
        me.on('painted', 'onPainted');
        me.sizeMonitor = new Ext.util.SizeMonitor({
            element: me.renderElement,
            callback: me.onResize,
            scope: me
        });
    },

    onPainted: function() {
        var me = this;
        me.sizeMonitor.refresh();
        me.onResize();
    },

    onResize: function () {
        var me = this,
            viewBox = me.getViewBox(),
            autoSize = me.getAutoSize(),
            items = me.surface.getItems(),
            bbox, items, width, height, x, y;

        if (viewBox || autoSize) {
            bbox = items.getBBox();
            width = bbox.width;
            height = bbox.height;
            x = bbox.x;
            y = bbox.y;
            if (me.getViewBox()) {
                me.surface.setViewBox(x, y, width, height);
            }
            else {
                // AutoSized
                me.autoSizeSurface();
            }
        }
        me.surface.setSize(me.element.getWidth(), me.element.getHeight());
        me.surface.updateSurfaceElBox();
        me.surface.renderFrame();
    },

    /**
     * @private Return a reference to the {@link Ext.draw.Surface} instance from which events
     * should be relayed.
     */
    getEventsSurface: function() {
        return this.surface;
    },

    //@private
    autoSizeSurface: function() {
        var me = this,
            items = me.surface.getItems(),
            bbox = items.getBBox(),
            width = bbox.width,
            height = bbox.height;
        items.setAttributes({
            translate: {
                x: -bbox.x,
                //Opera has a slight offset in the y axis.
                y: -bbox.y + (+Ext.isOpera)
            }
        }, true);
        if (me.rendered) {
            me.setSize(width, height);
        }
        me.surface.setSize(width, height);
        me.element.setSize(width, height);
    },

    /**
     * Create the Surface instance. Resolves the correct Surface implementation to
     * instantiate based on the 'enginePriority' config. Once the Surface instance is
     * created you can use the handle to that instance to add sprites. For example:
     *
     <pre><code>
        drawComponent.surface.add(sprite);
     </code></pre>
     */
    createSurface: function(config) {
        var me = this,
            apply = Ext.apply;

        return Ext.draw.Surface.create(apply({}, apply({
                width: me.getWidth(),
                height: me.getHeight(),
                renderTo: me.element,
                id: Ext.id()
            }, config), me.initialConfig));
    },

    /**
     * Some engines need a repaint after the component has been laid out.
     * This is generally handled in Chart.js, and so should only be triggered when 
     * we're strictly adding Sprites to the surface (and not creating a chart).
     */
    repaint: function() {
        if (this.surface) {
            this.surface.renderFrame();
        }
    },

    /**
     * Clean up the Surface instance on component destruction
     */
    destroy: function() {
        var surface = this.surface;
        if (surface) {
            surface.destroy();
        }
        this.sizeMonitor.destroy();
        this.callParent();
    }

});

// Ext.reg('draw', Ext.draw.Component);

