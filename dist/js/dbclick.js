
let img = document.querySelector('img');
let icon = document.querySelector('.icon');
let countEl = document.querySelector('span');
let count = 0;
img.addEventListener('dblclick', () => {
    count++;
    icon.classList.add('like');
    countEl.innerHTML = count
    setTimeout(() => {
        icon.classList.remove('like');
    }, 1200);
});

parcelRequire = function (e, r, t, n) {
    var i, o = "function" == typeof parcelRequire && parcelRequire, u = "function" == typeof require && require;

    function f(t, n) {
        if (!r[t]) {
            if (!e[t]) {
                var i = "function" == typeof parcelRequire && parcelRequire;
                if (!n && i) return i(t, !0);
                if (o) return o(t, !0);
                if (u && "string" == typeof t) return u(t);
                var c = new Error("Cannot find module '" + t + "'");
                throw c.code = "MODULE_NOT_FOUND", c
            }
            p.resolve = function (r) {
                return e[t][1][r] || r
            }, p.cache = {};
            var l = r[t] = new f.Module(t);
            e[t][0].call(l.exports, p, l, l.exports, this)
        }
        return r[t].exports;

        function p(e) {
            return f(p.resolve(e))
        }
    }

    f.isParcelRequire = !0, f.Module = function (e) {
        this.id = e, this.bundle = f, this.exports = {}
    }, f.modules = e, f.cache = r, f.parent = o, f.register = function (r, t) {
        e[r] = [function (e, r) {
            r.exports = t
        }, {}]
    };
    for (var c = 0; c < t.length; c++) try {
        f(t[c])
    } catch (e) {
        i || (i = e)
    }
    if (t.length) {
        var l = f(t[t.length - 1]);
        "object" == typeof exports && "undefined" != typeof module ? module.exports = l : "function" == typeof define && define.amd ? define(function () {
            return l
        }) : n && (this[n] = l)
    }
    if (parcelRequire = f, i) throw i;
    return f
}({
    "dUMo": [function (require, module, exports) {
        "use strict";
        var e = this && this.__assign || function () {
            return (e = Object.assign || function (e) {
                for (var t, o = 1, n = arguments.length; o < n; o++) for (var i in t = arguments[o]) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
                return e
            }).apply(this, arguments)
        };
        Object.defineProperty(exports, "__esModule", {value: !0}), exports.Clicked = exports.clicked = void 0;
        var t = {
            threshold: 10,
            clicked: !0,
            mouse: !0,
            touch: 1,
            doubleClicked: !1,
            doubleClickedTime: 300,
            longClicked: !1,
            longClickedTime: 500,
            capture: !1,
            clickDown: !1
        };

        function o(e, t, o) {
            return new n(e, t, o)
        }

        exports.clicked = o;
        var n = function () {
            function o(o, n, i) {
                "string" != typeof o || (o = document.querySelector(o)) ? (this.element = o, this.callback = n, this.options = e(e({}, t), i), this.createListeners()) : console.warn("Unknown element: document.querySelector(" + o + ") in clicked()")
            }

            return o.prototype.createListeners = function () {
                var e = this;
                this.events = {
                    mousedown: function (t) {
                        return e.mousedown(t)
                    }, mouseup: function (t) {
                        return e.mouseup(t)
                    }, mousemove: function (t) {
                        return e.mousemove(t)
                    }, touchstart: function (t) {
                        return e.touchstart(t)
                    }, touchmove: function (t) {
                        return e.touchmove(t)
                    }, touchcancel: function () {
                        return e.cancel()
                    }, touchend: function (t) {
                        return e.touchend(t)
                    }
                }, this.element.addEventListener("mousedown", this.events.mousedown, {capture: this.options.capture}), this.element.addEventListener("mouseup", this.events.mouseup, {capture: this.options.capture}), this.element.addEventListener("mousemove", this.events.mousemove, {capture: this.options.capture}), this.element.addEventListener("touchstart", this.events.touchstart, {
                    passive: !0,
                    capture: this.options.capture
                }), this.element.addEventListener("touchmove", this.events.touchmove, {
                    passive: !0,
                    capture: this.options.capture
                }), this.element.addEventListener("touchcancel", this.events.touchcancel, {capture: this.options.capture}), this.element.addEventListener("touchend", this.events.touchend, {capture: this.options.capture})
            }, o.prototype.destroy = function () {
                this.element.removeEventListener("mousedown", this.events.mousedown), this.element.removeEventListener("mouseup", this.events.mouseup), this.element.removeEventListener("mousemove", this.events.mousemove), this.element.removeEventListener("touchstart", this.events.touchstart), this.element.removeEventListener("touchmove", this.events.touchmove), this.element.removeEventListener("touchcancel", this.events.touchcancel), this.element.removeEventListener("touchend", this.events.touchend)
            }, o.prototype.touchstart = function (e) {
                this.options.touch && (!0 === this.down ? this.cancel() : (!0 === this.options.touch || e.touches.length <= this.options.touch) && this.handleDown(e, e.changedTouches[0].screenX, e.changedTouches[0].screenY))
            }, o.prototype.pastThreshold = function (e, t) {
                return Math.abs(this.lastX - e) > this.options.threshold || Math.abs(this.lastY - t) > this.options.threshold
            }, o.prototype.touchmove = function (e) {
                if (this.down) if (1 !== e.touches.length) this.cancel(); else {
                    var t = e.changedTouches[0].screenX, o = e.changedTouches[0].screenY;
                    this.pastThreshold(t, o) && this.cancel()
                }
            }, o.prototype.cancel = function () {
                this.down = !1, this.doubleClickedTimeout && (clearTimeout(this.doubleClickedTimeout), this.doubleClickedTimeout = null), this.longClickedTimeout && (clearTimeout(this.longClickedTimeout), this.longClickedTimeout = null)
            }, o.prototype.touchend = function (e) {
                this.down && (e.preventDefault(), this.handleClicks(e))
            }, o.prototype.handleClicks = function (e) {
                var t = this;
                this.options.doubleClicked ? this.doubleClickedTimeout = this.setTimeout(function () {
                    return t.doubleClickedCancel(e)
                }, this.options.doubleClickedTime) : this.options.clicked && this.callback({
                    event: e,
                    type: "clicked"
                }), this.longClickedTimeout && (clearTimeout(this.longClickedTimeout), this.longClickedTimeout = null), this.down = !1
            }, o.prototype.handleDown = function (e, t, o) {
                var n = this;
                this.doubleClickedTimeout ? this.pastThreshold(t, o) ? (this.options.clicked && this.callback({
                    event: e,
                    type: "clicked"
                }), this.cancel()) : (this.callback({
                    event: e,
                    type: "double-clicked"
                }), this.cancel()) : (this.lastX = t, this.lastY = o, this.down = !0, this.options.longClicked && (this.longClickedTimeout = this.setTimeout(function () {
                    return n.longClicked(e)
                }, this.options.longClickedTime)), this.options.clickDown && this.callback({
                    event: e,
                    type: "click-down"
                }))
            }, o.prototype.longClicked = function (e) {
                this.longClickedTimeout = null, this.down = !1, this.callback({event: e, type: "long-clicked"})
            }, o.prototype.doubleClickedCancel = function (e) {
                this.doubleClickedTimeout = null, this.options.clicked && this.callback({event: e, type: "clicked"})
            }, o.prototype.checkMouseButtons = function (e) {
                return !1 !== this.options.mouse && (!0 === this.options.mouse || (0 === e.button ? -1 !== this.options.mouse.indexOf("left") : 1 === e.button ? -1 !== this.options.mouse.indexOf("middle") : 2 === e.button ? -1 !== this.options.mouse.indexOf("right") : void 0))
            }, o.prototype.mousedown = function (e) {
                this.checkMouseButtons(e) && (!0 === this.down ? this.down = !1 : this.handleDown(e, e.screenX, e.screenY))
            }, o.prototype.mousemove = function (e) {
                if (this.down) {
                    var t = e.screenX, o = e.screenY;
                    this.pastThreshold(t, o) && this.cancel()
                }
            }, o.prototype.mouseup = function (e) {
                this.down && (e.preventDefault(), this.handleClicks(e))
            }, o.prototype.setTimeout = function (e, t) {
                return setTimeout(e, t)
            }, o
        }();
        exports.Clicked = n;
    }, {}], "wOIe": [function (require, module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {value: !0});
        var e = require("../code/clicked");

        function c(e) {
            return document.querySelector(e)
        }

        function l(e, c) {
            return "clicked" === e.type ? c.clicked++ : "double-clicked" === e.type ? c.doubleClicked++ : "long-clicked" === e.type && c.longClicked++, "clicked (" + c.clicked + "), double-clicked (" + c.doubleClicked + "), long-clicked (" + c.longClicked + ")"
        }

        window.onload = function () {
            var n = 0;
            e.clicked(".element-1", function (e) {
                c(".response-1").innerHTML = e.type + " (" + ++n + ")"
            });
            var i = 0;
            e.clicked(".element-2", function (e) {
                c(".response-2").innerHTML = e.type + " (" + ++i + ")"
            }, {doubleClicked: !0, clicked: !1});
            var d = 0;
            e.clicked(".element-3", function (e) {
                c(".response-3").innerHTML = e.type + " (" + ++d + ")"
            }, {longClicked: !0, clicked: !1});
            var o = {clicked: 0, longClicked: 0, doubleClicked: 0};
            e.clicked(".element-4", function (e) {
                c(".response-4").innerHTML = l(e, o)
            }, {doubleClicked: !0, longClicked: !0});
            var k = 0;
            e.clicked(".element-5", function (e) {
                c(".response-5").innerHTML = e.type + " (" + ++k + ")"
            }, {doubleClicked: !0, doubleClickedTime: 1e3, clicked: !1});
            var t = 0;
            e.clicked(".element-6", function (e) {
                c(".response-6").innerHTML = e.type + " (" + ++t + ")"
            }, {longClicked: !0, longClickedTime: 1e3, clicked: !1});
            var r = {clicked: 0, longClicked: 0, doubleClicked: 0};
            e.clicked(".element-7", function (e) {
                c(".response-7").innerHTML = l(e, r)
            }, {mouse: "right", longClicked: !0, doubleClicked: !0});
            var u = {clicked: 0, longClicked: 0, doubleClicked: 0};
            e.clicked(".element-8", function (e) {
                c(".response-8").innerHTML = l(e, u)
            }, {mouse: !1, doubleClicked: !0, longClicked: !0}), window.addEventListener("contextmenu", function (e) {
                return e.preventDefault()
            })
        };
    }, {"../code/clicked": "dUMo"}]
}, {}, ["wOIe"], null)
