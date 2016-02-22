;(function(window) {
	var ua = navigator.userAgent.toLowerCase(), mc = function(e) {
		return e.test(ua)
	}, ts = Object.prototype.toString, isOpera = mc(/opera/), isChrome = mc(/\bchrome\b/), isWebKit = mc(/webkit/), isSafari = !isChrome && mc(/safari/), isIE = !isOpera && mc(/msie/), supportCanvas = !!document.createElement('canvas').getContext, isGecko = !isWebKit
			&& mc(/gecko/), isMobile = mc(/ipod|ipad|iphone|android/gi), arithmetic = {
		Linear : function(t, b, c, d) {
			return c * t / d + b;
		},
		Cubic : {
			easeIn : function(t, b, c, d) {
				return c * (t /= d) * t * t + b;
			},
			easeOut : function(t, b, c, d) {
				return c * ((t = t / d - 1) * t * t + 1) + b;
			},
			easeInOut : function(t, b, c, d) {
				if ((t /= d / 2) < 1)
					return c / 2 * t * t * t + b;
				return c / 2 * ((t -= 2) * t * t + 2) + b;
			}
		}
	};
	var _ = (function(window) {
		/**
		 * spirit from jquery
		 */
		var isReady = false, readyBound = false, readyList = [], DOMContentLoaded = (function() {
			if (document.addEventListener) {
				return function() {
					document.removeEventListener("DOMContentLoaded", DOMContentLoaded, false);
					ready();
				};
			} else if (document.attachEvent) {
				return function() {
					if (document.readyState === "complete") {
						document.detachEvent("onreadystatechange", DOMContentLoaded);
						ready();
					}
				};
			}
		})(), doScrollCheck = function() {
			if (isReady) {
				return;
			}
			try {
				document.documentElement.doScroll("left");
			} catch (e) {
				setTimeout(doScrollCheck, 1);
				return;
			}
			ready();
		}, ready = function() {
			if (!isReady) {
				isReady = true;
				for ( var i = 0; i < readyList.length; i++) {
					readyList[i].call(document);
				}
				readyList = [];
			}
		}, bindReady = function() {
			if (readyBound)
				return;
			readyBound = true;
			if (document.readyState === "complete") {
				return setTimeout(ready, 1);
			}
			if (document.addEventListener) {
				document.addEventListener("DOMContentLoaded", DOMContentLoaded, false);
				window.addEventListener("load", ready, false);
			} else if (document.attachEvent) {
				document.attachEvent("onreadystatechange", DOMContentLoaded);
				window.attachEvent("onload", ready);
				var toplevel = false;

				try {
					toplevel = window.frameElement == null;
				} catch (e) {
				}

				if (document.documentElement.doScroll && toplevel) {
					doScrollCheck();
				}
			}
		}, bind = function(fn) {
			bindReady();
			if (isReady)
				fn.call(document, _);
			else
				readyList.push(function() {
					return fn.call(this);
				});
		}, _ = function(selector) {
			if (!selector || selector.nodeType) {
				return selector;
			}
			if (typeof selector === "string") {
				if (selector.indexOf("#") != -1) {
					selector = selector.substring(1);
				}
				return document.getElementById(selector);
			}
			if (typeof selector === "function") {
				bind(selector);
			}
		};

		_.apply = function(d, e) {
			if (d && e && typeof e == "object") {
				for ( var a in e) {
					if (typeof e[a] != 'undefined')
						d[a] = e[a]
				}
			}
			if (!e && d) {
				var clone = {};
				for ( var a in d) {
					clone[a] = d[a]
				}
				return clone;
			}
			return d
		};

		_.apply(_, {
			version : "1.2.1",
			isEmpty : function(C, e) {
				return C === null || C === undefined || ((_.isArray(C) && !C.length)) || (!e ? C === "" : false)
			},
			isArray : function(e) {
				return ts.apply(e) === "[object Array]"
			},
			isObject : function(e) {
				return !!e && ts.apply(e) === "[object Object]"
			},
			isFunction : function(e) {
				return ts.apply(e) === "[object Function]"
			},
			isNumber : function(e) {
				return typeof e === "number" && isFinite(e)
			},
			isString : function(e) {
				return typeof e === "string"
			},
			isFalse : function(e) {
				return typeof e === "boolean" && !e;
			},
			isDefined : function(e) {
				return typeof e !== "undefined"
			},
            each : function(t,f,s,d) {
                var j = t.length;
                for ( var i = 0; i < j; i++) {
                    if (d&& _.isArray(t[i])) {
                        _.each(t[i],f, s,d);
                    } else {
                        if (_.isFalse(f.call(s||t, t[i],i))) {
                            break;
                        }
                    }
                }
            },
            eachAll : function(t,f,s) {
                _.each(t,f,s,true);
            },
            sor : function(t,f) {
                var L = t.length-1,T;
                for(var i = 0; i < L; i++){
                    for (var j = L; j > i;j--) {
                        if (f ? !f(t[j], t[j - 1]) : (t[j] < t[j - 1])) {
                            T = t[j];
                            t[j] = t[j - 1];
                            t[j - 1] = T;
                        }
                    }
                }
            }
		});

		/**
		 * only get the attr that target not exist
		 */
		_.applyIf = function(d, e) {
			if (d && _.isObject(e)) {
				for ( var a in e) {
					if (_.isDefined(e[a]) && !_.isDefined(d[a]))
						d[a] = e[a]
				}
			}
			if (!e && d) {
				return _.apply(d);
			}
			return d
		};
		/**
		 * there will apply a deep clone
		 */
		_.merge = function(d, e, f, g) {
			if (d && _.isObject(e)) {
				for ( var a in e) {
					if (_.isDefined(e[a])) {
						if (_.isObject(e[a])) {
							if (_.isObject(d[a])) {
								_.merge(d[a], e[a]);
							} else {
								d[a] = _.clone(e[a], true);
							}
						} else {
							d[a] = e[a];
						}
					}
				}
                return _.merge(d, f, g);
			}
			return d;
		};
		/**
		 * clone attribute that given
		 */
		_.clone = function(a, e, deep) {
			var d = {};
			if (_.isArray(a)&& _.isObject(e)) {
				for ( var i = 0; i < a.length; i++) {
					if (deep && _.isObject(e[a[i]]))
						d[a[i]] = _.clone(e[a[i]],deep);
					else
						d[a[i]] = e[a[i]];
				}
			} else if (_.isObject(a)) {
				for ( var b in a) {
					// avoid recursion reference
					if (e && _.isObject(a[b])&& !(a[b].ICHARTJS_OBJECT))
						d[b] = _.clone(a[b], e);
					else
						d[b] = a[b];
				}
			}
			return d;
		};

		_.override = function(e, D) {
			if (e&&D) {
				var C = e.prototype;
				_.apply(C, D);
				if (_.isIE && D.hasOwnProperty("toString")) {
					C.toString = D.toString
				}
			}
		};

		/**
		 * spirit from ext2.0
		 */
		_.extend = function() {
			var C = function(E) {
				for ( var D in E) {
					this[D] = E[D];
				}
			};
			var e = Object.prototype.constructor;
			return function(G, O) {
				var J = function() {
					G.apply(this, arguments);
				}
				var E = function() {
				}, H, D = G.prototype;
				E.prototype = D;
				H = J.prototype = new E();
				H.constructor = J;
				J.superclass = D;
				if (D.constructor == e) {
					D.constructor = G;
				}
				J.override = function(F) {
					_.override(J, F);
				};
				H.superclass = H.supr = (function() {
					return D;
				});
				H.override = C;
				_.override(J, O);
				J.extend = function(F) {
					return _.extend(J, F)
				};
				J.plugin_ = {};
				
				J.plugin = function(M,F) {
					if (_.isString(M) && _.isFunction(F))
						J.plugin_[M] = F;
				};
				return J;
			}
		}();

		var sin = Math.sin, cos = Math.cos, atan = Math.atan, sqrt = Math.sqrt, abs = Math.abs, PI = Math.PI, PI2 = 2 * PI, ceil = Math.ceil, round = Math.round, floor = Math.floor, max = Math.max, min = Math.min, pF = parseFloat,
		_Reg={},_Rep={},
		factor = function(v, w) {
			if (v == 0)
				return v;
			var M = abs(v),f = 0.1;
			if(M>1){
				while(M>1){
					M = M/10;
					f = f*10;
				}
				return floor(v/f+w)*f;
			}else{
				f = 1;
				while(M<1){
					M = M*10;
					f = f *10;
				}
				return round(v*f+w)/f;
			}
		},hex2Rgb = function(hex) {
			hex = hex.replace(/#/g, "").replace(/^(\w)(\w)(\w)$/, "$1$1$2$2$3$3");
			return  (hex.length==7?'rgba(':'rgb(') + parseInt(hex.substring(0, 2), 16) + ',' + parseInt(hex.substring(2, 4), 16) + ',' + parseInt(hex.substring(4, 6), 16) + (hex.length==7?',0.'+hex.substring(6,7)+')':')');
		}, c2a = function(rgb) {
			var result = /rgb\((\w*),(\w*),(\w*)\)/.exec(rgb);
			if (result) {
				return new Array(result[1], result[2], result[3]);
			}
			result = /rgba\((\w*),(\w*),(\w*),(.*)\)/.exec(rgb);
			if (result) {
				return new Array(result[1], result[2], result[3], result[4]);
			}
			throw new Error("invalid colors value '" + rgb + "'");
		}, toHsv = function(r, g, b) {
			if (_.isArray(r)) {
				g = r[1];
				b = r[2];
				r = r[0];
			}
			r = r / 255;
			g = g / 255;
			b = b / 255;
			var m = max(max(r, g), b), mi = min(min(r, g), b), dv = m - mi;
			if (dv == 0) {
				return new Array(0, 0, m);
			}
			var h;
			if (r == m) {
				h = (g - b) / dv;
			} else if (g == m) {
				h = (b - r) / dv + 2;
			} else if (b == m) {
				h = (r - g) / dv + 4;
			}
			h *= 60;
			if (h < 0)
				h += 360;
			return new Array(h, dv / m, m);
		}, toRgb = function(color) {
			if (!color)
				return color;
			color = color.replace(/\s/g, '').toLowerCase();
			// Look for rgb(255,255,255)
			if (/^rgb\([0-9]{1,3},[0-9]{1,3},[0-9]{1,3}\)$/.exec(color)) {
				return color;
			}

			// Look for rgba(255,255,255,0.3)
			if (/^rgba\([0-9]{1,3},[0-9]{1,3},[0-9]{1,3},(0(\.\d*)?|1(\.0)?)\)$/.exec(color)) {
				return color;
			}

			// Look for #a0b1c2 or #fff
			if (/^#(([a-fA-F0-9]{6,7})|([a-fA-F0-9]{3}))$/.exec(color))
				return hex2Rgb(color);
			throw new Error("invalid colors value '" + color + "'");
		}, hsv2Rgb = function(h, s, v, a) {
			if (_.isArray(h)) {
				a = s;
				s = h[1];
				v = h[2];
				h = h[0];
			}
			var r, g, b,
			hi = floor(h / 60) % 6,
			f = h / 60 - hi,
			p = v * (1 - s),
			q = v * (1 - s * f),
			t = v * (1 - s * (1 - f));
			switch (hi) {
				case 0 :
					r = v;
					g = t;
					b = p;
					break;
				case 1 :
					r = q;
					g = v;
					b = p;
					break;
				case 2 :
					r = p;
					g = v;
					b = t;
					break;
				case 3 :
					r = p;
					g = q;
					b = v;
					break;
				case 4 :
					r = t;
					g = p;
					b = v;
					break;
				case 5 :
					r = v;
					g = p;
					b = q;
					break;
			}
			return 'rgb' + (a ? 'a' : '') + '(' + round(r * 255) + ',' + round(g * 255) + ',' + round(b * 255) + (a ? ',' + a + ')' : ')');
		},
		/**
		 * the increment of s(v) of hsv model
		 */ 
		s_inc = 0.05, v_inc = 0.14,
		inc = function(v, iv) {
			iv = iv || v_inc;
			if (v > 0.5) {
				return iv - (1 - v) / 10;
			} else if (v > 0.1) {
				return iv - 0.16 + v / 5;
			} else {
				return v > iv ? iv : v / 2;
			}
		},
		/**
		 * @method anole,make color darker or lighter
		 * @param {Boolean} d true:dark,false:light
		 * @param {Object} rgb:color
		 * @param {Number} iv (0-1)
		 * @param {Number} is (0-1)
		 */
		anole = function(d, rgb, iv, is) {
			if (!rgb)
				return rgb;
			rgb = c2a(toRgb(rgb));
			var hsv = toHsv(rgb);
			is = is!=0?(is || s_inc):is;
			hsv[1] -= is;
			if (d) {
				hsv[2] -= inc(hsv[2], iv);
				hsv[1] = _.upTo(hsv[1], 1);
				hsv[2] = _.lowTo(hsv[2], 0);
			} else {
				hsv[2] += inc((1 - hsv[2]), iv);
				hsv[1] = _.lowTo(hsv[1], 0);
				hsv[2] = _.upTo(hsv[2], 1);
			}
			return hsv2Rgb(hsv, rgb[3]);
		};

		_.apply(_, {
			getFont : function(w, s, f, u) {
				return w + " " + s + (u||"px")+" " + f;
			},
			/**
			 * obtain the Dom Document*/
			getDoc : function() {
				var doc = window.contentWindow ? window.contentWindow.document : window.contentDocument ? window.contentDocument : window.document;
				return doc;
			},
			/**
			 * define the interface,the subclass must implement it
			 */
			_Abstract : function(M, H) {
				if (!H[M])
					throw new Error("You must implements method '" + M + "' in " + H.type);
			},
			getAA : function(tf) {
				if (tf == 'linear')
					return arithmetic.Linear;
				if (tf == 'easeInOut' || tf == 'easeIn' || tf == 'easeOut')
					return arithmetic.Cubic[tf];
				return arithmetic.Linear;
			},
			/**
			 * simple noConflict implements
			 */
			noConflict : function() {
				return _;
			},
			plugin : function(t, m, f) {
				if (_.isFunction(t))
					t.plugin(m, f);
			},
			parsePadding : function(s, d) {
				s = s || 0;
				if (_.isNumber(s))
					return new Array(s, s, s, s);
				if (_.isArray(s))
					return s;
				d = d || 0;
				s = s.replace(/^\s+|\s+$/g, "").replace(/\s{2,}/g, /\s/).replace(/\s/g, ',').split(",");
				if (s.length == 1) {
					s[0] = s[1] = s[2] = s[3] = pF(s[0]) || d;
				} else if (s.length == 2) {
					s[0] = s[2] = pF(s[0]) || d;
					s[1] = s[3] = pF(s[1]) || d;
				} else if (s.length == 3) {
					s[0] = pF(s[0]) || d;
					s[1] = s[3] = pF(s[1]) || d;
					s[2] = pF(s[2]) || d;
				} else {
					s[0] = pF(s[0]) || d;
					s[1] = pF(s[1]) || d;
					s[2] = pF(s[2]) || d;
					s[3] = pF(s[3]) || d;
				}
				return s;
			},
			/**
			 * the distance of two point
			 */
			distanceP2P : function(x1, y1, x2, y2) {
				return sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
			},
			atan2Radian : function(ox, oy, x, y) {
				if (ox == x) {
					if (y > oy)
						return PI / 2;
					return PI * 3 / 2;
				}
				if (oy == y) {
					if (x > ox)
						return 0;
					return PI;
				}
				
				var q = _.quadrant(ox, oy, x, y),
					r = atan(abs((oy - y) / (ox - x)));
				
				return q?(q == 3?PI2:PI)+(q == 2?r:-r):r;
			},
			angle2Radian : function(a) {
				return a * PI / 180;
			},
			radian2Angle : function(r) {
				return r * 180 / PI;
			},
			/**
			 * indicate angle in which quadrant,and it different from concept of Math.this will return 0 if it in first quadrant(other eg.0,1,2,3)
			 */
			quadrant : function(ox, oy, x, y) {
				if (ox < x) {
					if (oy < y) {
						return 0;
					} else {
						return 3;
					}
				} else {
					if (oy < y) {
						return 1;
					} else {
						return 2;
					}
				}
			},
			toPI2 : function(a) {
				while(a<0)
					a+=PI2;
				return a;
			},
			visible:function(s, e, f){
				if(s>=e)return [];
				var q1 = _.quadrantd(s),q2 = _.quadrantd(e);
				if((q1==2||q1==3)&&(q2==2||q2==3)&&((e-s)<PI))return[];
				s = _.toPI2(s);
				e = _.toPI2(e);
				if(e<=s){e+=PI2;}
				if(s > PI){s = PI2;}
				else if(e>PI2){
					return [{s:s,e:PI,f:f},{s:PI2,e:e,f:f}]
				}else if(e>PI){
					e = PI;
				}
				return {s:s,e:e,f:f};
			},
			quadrantd : function(a) {
				if(a==0)return 0;
				if(a % PI2==0)return 3;
				while(a<0)
					a+=PI2;
				return ceil(2 * (a % PI2) / PI)-1;
			},
			upTo : function(u, v) {
				return v > u ? u : v;
			},
			lowTo : function(l, v) {
				return v < l ? l : v;
			},
			between : function(l, u, v) {
				return l>u?_.between(u, l, v):(v > u ? u : v < l ? l : v);
			},
			inRange : function(l, u, v) {
				return u > v && l < v;
			},
			angleInRange : function(l, u, v) {
				v = (v -l);
				v = v<0?v+PI2:v;
				v = v %PI2;
				return (u -l) > v;
			},
			angleZInRange : function(l, u, v) {
				return u < l?(v > l || v < u):(u > v && l < v);
			},
			inRangeClosed : function(l, u, v) {
				return u >= v && l <= v;
			},
			inEllipse : function(x, y, a, b) {
				return (x * x / a / a + y * y / b / b) <= 1;
			},
			p2Point : function(x, y, a, C) {
				return {
					x : x + cos(a) * C,
					y : y + sin(a) * C
				}
			},
			toRgb:toRgb,
			toRgba:function(c,o){
				var rgb = c2a(toRgb(c));
				return  'rgba(' + rgb[0]+',' + rgb[1]+',' + rgb[2]+',' + o +')';
			},
			/**
			 * vector point
			 */
			vectorP2P : function(x, y, radian) {
				if (!radian) {
					y = _.angle2Radian(y);
					x = _.angle2Radian(x);
				}
				y = sin(y);
				return {
					x : y * sin(x),
					y : y * cos(x)
				}
			},
			uid : function() {
                var s4 = function () {
                    return floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
                };
                return function(k){
                    return (k || 'ijs') + '_' +s4() + s4() + s4();
                }
			}(),
			register:function(c){
				if (_.isString(c)) {
					_Rep[c.toLowerCase()] = c;
				}else{
					var id = c.get('id');
					if(!id||id==''){
						id = c.push('id',_.uid(c.type));
					}
					if(_Reg[id]){
						throw new Error("Exist Reduplicate id :"+id);
					}
					c.id = id;
					_Reg[id] = c;
				}
			},
			create:function(C){
				if(!C.type||!_Rep[C.type]){
					throw new Error("TypeNotFoundException["+C.type+"]");
				}
				return new _[_Rep[C.type]](C);
			},
			remove:function(id){
                var c= _Reg[id];
                c.destroy();
				delete _Reg[id];
			},
			get:function(id){
				return _Reg[id];
			},
			isPercent:function(v){
				return _.isString(v)&&v.match(/(.*)%/);
			},
			parsePercent:function(v,f){
				if(_.isString(v)){
					v = v.match(/(.*)%/);
					if(v){
						v = f?floor(pF(v[1])*f/100):v[1]/100;
					}
				}
				return (!v ||v <= 0 || v > f)?f:v;
			},
			parseFloat : function(v, d) {
				if (!_.isNumber(v)) {
					v = pF(v);
					if (!_.isNumber(v))
						throw new Error("[" + d +"]is not a valid number.");
				}
				return v;
			},
			ceil : function(max) {
				return factor(max,1);
			},
			floor : function(max) {
				return factor(max,-1);
			},
			_2D : '2d',
			_3D : '3d',
			light : function(rgb, iv, is) {
				return anole(false, rgb, iv, is);
			},
			dark : function(rgb, iv, is) {
				return anole(true, rgb, iv, is);
			},
			fixPixel : function(v) {
				return _.isNumber(v) ? v : pF(v.replace('px', "")) || 0;
			},
			toPixel : function(v) {
				return _.isNumber(v) ? v + 'px' : _.fixPixel(v) + 'px';
			},
			emptyFn : function() {
				return true;
			},
            ratio:window.devicePixelRatio || 1,
			supportCanvas : supportCanvas,
			isOpera : isOpera,
			isWebKit : isWebKit,
			isChrome : isChrome,
			isSafari : isSafari,
			isIE : isIE,
			isGecko : isGecko,
			isMobile : isMobile,
			touch: "ontouchend" in document,
			FRAME : isMobile ? 30 : 60
		});
		
		_.Assert = {
			isTrue : function(v, cause) {
				if (v !== true)
					throw new Error(cause);
			}
		};
		/**
		 * shim layer with setTimeout fallback
		 */
		_.requestAnimFrame = (function() {
			var raf = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(callback) {
				window.setTimeout(callback, 1000 / 60);
			};
			return function(f){raf(f)}
		})();
		
		
		/**
		 * defined Event
		 */
		_.Event = {
			addEvent : function(ele, type, fn, useCapture) {
				if (ele.addEventListener)
					ele.addEventListener(type, fn, useCapture);
				else
					ele['on' + type] = fn;
			},
			fix : function(e) {
				/**
				 * Fix event for mise
				 */
				if (typeof (e) == 'undefined') {
					e = window.event;
				}
				var E = {
						target:e.target,
						pageX : e.pageX,
						pageY : e.pageY,
						offsetX : e.offsetX,
						offsetY : e.offsetY,
						stopPropagation:false,
						//time: new Date().getTime(),
						event:e
					};
				/**
				 * This is mainly for FF which doesn't provide offsetX
				 */
				if (typeof (e.offsetX) == 'undefined') {

                    var doc = document.documentElement||{},
                        body = document.body,
                        left=(doc.scrollLeft || body.scrollLeft || 0) - (doc.clientLeft || body.clientLeft || 0),
                        top=(doc.scrollTop || body.scrollTop || 0) - (doc.clientTop || body.clientTop || 0),
                        t = e.targetTouches;

					/**
					 * Fix target property, if necessary
					 */
					if (!e.target) {
						E.target = e.srcElement || (t?t[0].target:doc||body);
					}
					
					if(t){
						E.pageX = t[0].pageX;
						E.pageY = t[0].pageY;
					}

					/**
					 * Calculate pageX/Y if missing and clientX/Y available
					 */
					if (E.pageX == null && e.clientX != null) {
						E.pageX = e.clientX + left;
						E.pageY = e.clientY + top;
					}
                    /**
                     * Browser not with offsetX and offsetY
                     */
                    var x = 0, y = 0, obj = E.target;

                    if (obj.getBoundingClientRect) {
                        var box = obj.getBoundingClientRect();
                        x = box.left + (window.pageXOffset || left);
                        y  = box.top +  (window.pageYOffset || top);
                    } else {
                        while (obj != document.body && obj) {
                            x += obj.offsetLeft-(obj.scrollLeft||0);
                            y += obj.offsetTop;
                            obj = obj.offsetParent;
                        }
                    }
					E.offsetX = E.pageX - x;
					E.offsetY = E.pageY - y;
				}
				
				E.x = E.offsetX;
				E.y = E.offsetY;
				/**
				 * Any browser that doesn't implement stopPropagation() (MSIE)
				 */
				if (!e.stopPropagation) {
					e.stopPropagation = function() {
						window.event.cancelBubble = true;
					}
				}
				
				return E;
		}
		};
		return _;

	})(window);

	window.iChart = _;

	if (!window.$) {
		window.$ = _;
	}
})(window);
