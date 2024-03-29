/*! Hammer.JS - v1.0.6 - 2014-01-02
 * http://eightmedia.github.com/hammer.js
 *
 * Copyright (c) 2014 Jorik Tangelder <j.tangelder@gmail.com>;
 * Licensed under the MIT license */
!(function (a, b) {
	console.log(this)
	// console.log(a)
  "use strict";
  function c() {
    d.READY ||
      (d.event.determineEventTypes(),
      d.utils.each(d.gestures, function (a) {
        d.detection.register(a);
      }),
      d.event.onTouch(d.DOCUMENT, d.EVENT_MOVE, d.detection.detect),
      d.event.onTouch(d.DOCUMENT, d.EVENT_END, d.detection.detect),
      (d.READY = !0));
  }
  var d = function (a, b) {
    return new d.Instance(a, b || {});
  };
  (d.defaults = {
    stop_browser_behavior: {
      userSelect: "none",
      touchAction: "none",
      touchCallout: "none",
      contentZooming: "none",
      userDrag: "none",
      tapHighlightColor: "rgba(0,0,0,0)",
    },
  }),
    (d.HAS_POINTEREVENTS =
      a.navigator.pointerEnabled || a.navigator.msPointerEnabled),
    (d.HAS_TOUCHEVENTS = "ontouchstart" in a),
    (d.MOBILE_REGEX = /mobile|tablet|ip(ad|hone|od)|android|silk/i),
    (d.NO_MOUSEEVENTS =
      d.HAS_TOUCHEVENTS && a.navigator.userAgent.match(d.MOBILE_REGEX)),
    (d.EVENT_TYPES = {}),
    (d.DIRECTION_DOWN = "down"),
    (d.DIRECTION_LEFT = "left"),
    (d.DIRECTION_UP = "up"),
    (d.DIRECTION_RIGHT = "right"),
    (d.POINTER_MOUSE = "mouse"),
    (d.POINTER_TOUCH = "touch"),
    (d.POINTER_PEN = "pen"),
    (d.EVENT_START = "start"),
    (d.EVENT_MOVE = "move"),
    (d.EVENT_END = "end"),
    (d.DOCUMENT = a.document),
    (d.plugins = d.plugins || {}),
    (d.gestures = d.gestures || {}),
    (d.READY = !1),
    (d.utils = {
      extend: function (a, c, d) {
        for (var e in c) (a[e] !== b && d) || (a[e] = c[e]);
        return a;
      },
      each: function (a, c, d) {
        var e, f;
        if ("forEach" in a) a.forEach(c, d);
        else if (a.length !== b) {
          for (e = 0, f = a.length; f > e; e++)
            if (c.call(d, a[e], e, a) === !1) return;
        } else
          for (e in a)
            if (a.hasOwnProperty(e) && c.call(d, a[e], e, a) === !1) return;
      },
      hasParent: function (a, b) {
        for (; a; ) {
          if (a == b) return !0;
          a = a.parentNode;
        }
        return !1;
      },
      getCenter: function (a) {
        var b = [],
          c = [];
        return (
          d.utils.each(a, function (a) {
            b.push("undefined" != typeof a.clientX ? a.clientX : a.pageX),
              c.push("undefined" != typeof a.clientY ? a.clientY : a.pageY);
          }),
          {
            pageX: (Math.min.apply(Math, b) + Math.max.apply(Math, b)) / 2,
            pageY: (Math.min.apply(Math, c) + Math.max.apply(Math, c)) / 2,
          }
        );
      },
      getVelocity: function (a, b, c) {
        return { x: Math.abs(b / a) || 0, y: Math.abs(c / a) || 0 };
      },
      getAngle: function (a, b) {
        var c = b.pageY - a.pageY,
          d = b.pageX - a.pageX;
        return (180 * Math.atan2(c, d)) / Math.PI;
      },
      getDirection: function (a, b) {
        var c = Math.abs(a.pageX - b.pageX),
          e = Math.abs(a.pageY - b.pageY);
        return c >= e
          ? a.pageX - b.pageX > 0
            ? d.DIRECTION_LEFT
            : d.DIRECTION_RIGHT
          : a.pageY - b.pageY > 0
          ? d.DIRECTION_UP
          : d.DIRECTION_DOWN;
      },
      getDistance: function (a, b) {
        var c = b.pageX - a.pageX,
          d = b.pageY - a.pageY;
        return Math.sqrt(c * c + d * d);
      },
      getScale: function (a, b) {
        return a.length >= 2 && b.length >= 2
          ? this.getDistance(b[0], b[1]) / this.getDistance(a[0], a[1])
          : 1;
      },
      getRotation: function (a, b) {
        return a.length >= 2 && b.length >= 2
          ? this.getAngle(b[1], b[0]) - this.getAngle(a[1], a[0])
          : 0;
      },
      isVertical: function (a) {
        return a == d.DIRECTION_UP || a == d.DIRECTION_DOWN;
      },
      stopDefaultBrowserBehavior: function (a, b) {
        b &&
          a &&
          a.style &&
          (d.utils.each(
            ["webkit", "khtml", "moz", "Moz", "ms", "o", ""],
            function (c) {
              d.utils.each(b, function (b) {
                c && (b = c + b.substring(0, 1).toUpperCase() + b.substring(1)),
                  b in a.style && (a.style[b] = b);
              });
            }
          ),
          "none" == b.userSelect &&
            (a.onselectstart = function () {
              return !1;
            }),
          "none" == b.userDrag &&
            (a.ondragstart = function () {
              return !1;
            }));
      },
    }),
    (d.Instance = function (a, b) {
      var e = this;
      return (
        c(),
        (this.element = a),
        (this.enabled = !0),
        (this.options = d.utils.extend(
          d.utils.extend({}, d.defaults),
          b || {}
        )),
        this.options.stop_browser_behavior &&
          d.utils.stopDefaultBrowserBehavior(
            this.element,
            this.options.stop_browser_behavior
          ),
        d.event.onTouch(a, d.EVENT_START, function (a) {
          e.enabled && d.detection.startDetect(e, a);
        }),
        this
      );
    }),
    (d.Instance.prototype = {
      on: function (a, b) {
        var c = a.split(" ");
        return (
          d.utils.each(
            c,
            function (a) {
              this.element.addEventListener(a, b, !1);
            },
            this
          ),
          this
        );
      },
      off: function (a, b) {
        var c = a.split(" ");
        return (
          d.utils.each(
            c,
            function (a) {
              this.element.removeEventListener(a, b, !1);
            },
            this
          ),
          this
        );
      },
      trigger: function (a, b) {
        b || (b = {});
        var c = d.DOCUMENT.createEvent("Event");
        c.initEvent(a, !0, !0), (c.gesture = b);
        var e = this.element;
        return (
          d.utils.hasParent(b.target, e) && (e = b.target),
          e.dispatchEvent(c),
          this
        );
      },
      enable: function (a) {
        return (this.enabled = a), this;
      },
    });
  var e = null,
    f = !1,
    g = !1;
  (d.event = {
    bindDom: function (a, b, c) {
      var e = b.split(" ");
      d.utils.each(e, function (b) {
        a.addEventListener(b, c, !1);
      });
    },
    onTouch: function (a, b, c) {
      var h = this;
      this.bindDom(a, d.EVENT_TYPES[b], function (i) {
        var j = i.type.toLowerCase();
        if (!j.match(/mouse/) || !g) {
          j.match(/touch/) ||
          j.match(/pointerdown/) ||
          (j.match(/mouse/) && 1 === i.which)
            ? (f = !0)
            : j.match(/mouse/) && !i.which && (f = !1),
            j.match(/touch|pointer/) && (g = !0);
          var k = 0;
          f &&
            (d.HAS_POINTEREVENTS && b != d.EVENT_END
              ? (k = d.PointerEvent.updatePointer(b, i))
              : j.match(/touch/)
              ? (k = i.touches.length)
              : g || (k = j.match(/up/) ? 0 : 1),
            k > 0 && b == d.EVENT_END
              ? (b = d.EVENT_MOVE)
              : k || (b = d.EVENT_END),
            (k || null === e) && (e = i),
            c.call(
              d.detection,
              h.collectEventData(a, b, h.getTouchList(e, b), i)
            ),
            d.HAS_POINTEREVENTS &&
              b == d.EVENT_END &&
              (k = d.PointerEvent.updatePointer(b, i))),
            k || ((e = null), (f = !1), (g = !1), d.PointerEvent.reset());
        }
      });
    },
    determineEventTypes: function () {
      var a;
      (a = d.HAS_POINTEREVENTS
        ? d.PointerEvent.getEvents()
        : d.NO_MOUSEEVENTS
        ? ["touchstart", "touchmove", "touchend touchcancel"]
        : [
            "touchstart mousedown",
            "touchmove mousemove",
            "touchend touchcancel mouseup",
          ]),
        (d.EVENT_TYPES[d.EVENT_START] = a[0]),
        (d.EVENT_TYPES[d.EVENT_MOVE] = a[1]),
        (d.EVENT_TYPES[d.EVENT_END] = a[2]);
    },
    getTouchList: function (a) {
      return d.HAS_POINTEREVENTS
        ? d.PointerEvent.getTouchList()
        : a.touches
        ? a.touches
        : ((a.identifier = 1), [a]);
    },
    collectEventData: function (a, b, c, e) {
      var f = d.POINTER_TOUCH;
      return (
        (e.type.match(/mouse/) ||
          d.PointerEvent.matchType(d.POINTER_MOUSE, e)) &&
          (f = d.POINTER_MOUSE),
        {
          center: d.utils.getCenter(c),
          timeStamp: new Date().getTime(),
          target: e.target,
          touches: c,
          eventType: b,
          pointerType: f,
          srcEvent: e,
          preventDefault: function () {
            this.srcEvent.preventManipulation &&
              this.srcEvent.preventManipulation(),
              this.srcEvent.preventDefault && this.srcEvent.preventDefault();
          },
          stopPropagation: function () {
            this.srcEvent.stopPropagation();
          },
          stopDetect: function () {
            return d.detection.stopDetect();
          },
        }
      );
    },
  }),
    (d.PointerEvent = {
      pointers: {},
      getTouchList: function () {
        var a = this,
          b = [];
        return (
          d.utils.each(a.pointers, function (a) {
            b.push(a);
          }),
          b
        );
      },
      updatePointer: function (a, b) {
        return (
          a == d.EVENT_END
            ? (this.pointers = {})
            : ((b.identifier = b.pointerId), (this.pointers[b.pointerId] = b)),
          Object.keys(this.pointers).length
        );
      },
      matchType: function (a, b) {
        if (!b.pointerType) return !1;
        var c = b.pointerType,
          e = {};
        return (
          (e[d.POINTER_MOUSE] =
            c === b.MSPOINTER_TYPE_MOUSE || c === d.POINTER_MOUSE),
          (e[d.POINTER_TOUCH] =
            c === b.MSPOINTER_TYPE_TOUCH || c === d.POINTER_TOUCH),
          (e[d.POINTER_PEN] =
            c === b.MSPOINTER_TYPE_PEN || c === d.POINTER_PEN),
          e[a]
        );
      },
      getEvents: function () {
        return [
          "pointerdown MSPointerDown",
          "pointermove MSPointerMove",
          "pointerup pointercancel MSPointerUp MSPointerCancel",
        ];
      },
      reset: function () {
        this.pointers = {};
      },
    }),
    (d.detection = {
      gestures: [],
      current: null,
      previous: null,
      stopped: !1,
      startDetect: function (a, b) {
        this.current ||
          ((this.stopped = !1),
          (this.current = {
            inst: a,
            startEvent: d.utils.extend({}, b),
            lastEvent: !1,
            name: "",
          }),
          this.detect(b));
      },
      detect: function (a) {
        if (this.current && !this.stopped) {
          a = this.extendEventData(a);
          var b = this.current.inst.options;
          return (
            d.utils.each(
              this.gestures,
              function (c) {
                return this.stopped ||
                  b[c.name] === !1 ||
                  c.handler.call(c, a, this.current.inst) !== !1
                  ? void 0
                  : (this.stopDetect(), !1);
              },
              this
            ),
            this.current && (this.current.lastEvent = a),
            a.eventType == d.EVENT_END &&
              !a.touches.length - 1 &&
              this.stopDetect(),
            a
          );
        }
      },
      stopDetect: function () {
        (this.previous = d.utils.extend({}, this.current)),
          (this.current = null),
          (this.stopped = !0);
      },
      extendEventData: function (a) {
        var b = this.current.startEvent;
        !b ||
          (a.touches.length == b.touches.length && a.touches !== b.touches) ||
          ((b.touches = []),
          d.utils.each(a.touches, function (a) {
            b.touches.push(d.utils.extend({}, a));
          }));
        var c,
          e,
          f = a.timeStamp - b.timeStamp,
          g = a.center.pageX - b.center.pageX,
          h = a.center.pageY - b.center.pageY,
          i = d.utils.getVelocity(f, g, h);
        return (
          "end" === a.eventType
            ? ((c =
                this.current.lastEvent && this.current.lastEvent.interimAngle),
              (e =
                this.current.lastEvent &&
                this.current.lastEvent.interimDirection))
            : ((c =
                this.current.lastEvent &&
                d.utils.getAngle(this.current.lastEvent.center, a.center)),
              (e =
                this.current.lastEvent &&
                d.utils.getDirection(this.current.lastEvent.center, a.center))),
          d.utils.extend(a, {
            deltaTime: f,
            deltaX: g,
            deltaY: h,
            velocityX: i.x,
            velocityY: i.y,
            distance: d.utils.getDistance(b.center, a.center),
            angle: d.utils.getAngle(b.center, a.center),
            interimAngle: c,
            direction: d.utils.getDirection(b.center, a.center),
            interimDirection: e,
            scale: d.utils.getScale(b.touches, a.touches),
            rotation: d.utils.getRotation(b.touches, a.touches),
            startEvent: b,
          }),
          a
        );
      },
      register: function (a) {
        var c = a.defaults || {};
        return (
          c[a.name] === b && (c[a.name] = !0),
          d.utils.extend(d.defaults, c, !0),
          (a.index = a.index || 1e3),
          this.gestures.push(a),
          this.gestures.sort(function (a, b) {
            return a.index < b.index ? -1 : a.index > b.index ? 1 : 0;
          }),
          this.gestures
        );
      },
    }),
    (d.gestures.Drag = {
      name: "drag",
      index: 50,
      defaults: {
        drag_min_distance: 10,
        correct_for_drag_min_distance: !0,
        drag_max_touches: 1,
        drag_block_horizontal: !1,
        drag_block_vertical: !1,
        drag_lock_to_axis: !1,
        drag_lock_min_distance: 25,
      },
      triggered: !1,
      handler: function (a, b) {
        if (d.detection.current.name != this.name && this.triggered)
          return b.trigger(this.name + "end", a), (this.triggered = !1), void 0;
        if (
          !(
            b.options.drag_max_touches > 0 &&
            a.touches.length > b.options.drag_max_touches
          )
        )
          switch (a.eventType) {
            case d.EVENT_START:
              this.triggered = !1;
              break;
            case d.EVENT_MOVE:
              if (
                a.distance < b.options.drag_min_distance &&
                d.detection.current.name != this.name
              )
                return;
              if (
                d.detection.current.name != this.name &&
                ((d.detection.current.name = this.name),
                b.options.correct_for_drag_min_distance && a.distance > 0)
              ) {
                var c = Math.abs(b.options.drag_min_distance / a.distance);
                (d.detection.current.startEvent.center.pageX += a.deltaX * c),
                  (d.detection.current.startEvent.center.pageY += a.deltaY * c),
                  (a = d.detection.extendEventData(a));
              }
              (d.detection.current.lastEvent.drag_locked_to_axis ||
                (b.options.drag_lock_to_axis &&
                  b.options.drag_lock_min_distance <= a.distance)) &&
                (a.drag_locked_to_axis = !0);
              var e = d.detection.current.lastEvent.direction;
              a.drag_locked_to_axis &&
                e !== a.direction &&
                (a.direction = d.utils.isVertical(e)
                  ? a.deltaY < 0
                    ? d.DIRECTION_UP
                    : d.DIRECTION_DOWN
                  : a.deltaX < 0
                  ? d.DIRECTION_LEFT
                  : d.DIRECTION_RIGHT),
                this.triggered ||
                  (b.trigger(this.name + "start", a), (this.triggered = !0)),
                b.trigger(this.name, a),
                b.trigger(this.name + a.direction, a),
                ((b.options.drag_block_vertical &&
                  d.utils.isVertical(a.direction)) ||
                  (b.options.drag_block_horizontal &&
                    !d.utils.isVertical(a.direction))) &&
                  a.preventDefault();
              break;
            case d.EVENT_END:
              this.triggered && b.trigger(this.name + "end", a),
                (this.triggered = !1);
          }
      },
    }),
    (d.gestures.Hold = {
      name: "hold",
      index: 10,
      defaults: { hold_timeout: 500, hold_threshold: 1 },
      timer: null,
      handler: function (a, b) {
        switch (a.eventType) {
          case d.EVENT_START:
            clearTimeout(this.timer),
              (d.detection.current.name = this.name),
              (this.timer = setTimeout(function () {
                "hold" == d.detection.current.name && b.trigger("hold", a);
              }, b.options.hold_timeout));
            break;
          case d.EVENT_MOVE:
            a.distance > b.options.hold_threshold && clearTimeout(this.timer);
            break;
          case d.EVENT_END:
            clearTimeout(this.timer);
        }
      },
    }),
    (d.gestures.Release = {
      name: "release",
      index: 1 / 0,
      handler: function (a, b) {
        a.eventType == d.EVENT_END && b.trigger(this.name, a);
      },
    }),
    (d.gestures.Swipe = {
      name: "swipe",
      index: 40,
      defaults: {
        swipe_min_touches: 1,
        swipe_max_touches: 1,
        swipe_velocity: 0.7,
      },
      handler: function (a, b) {
        if (a.eventType == d.EVENT_END) {
          if (
            b.options.swipe_max_touches > 0 &&
            a.touches.length < b.options.swipe_min_touches &&
            a.touches.length > b.options.swipe_max_touches
          )
            return;
          (a.velocityX > b.options.swipe_velocity ||
            a.velocityY > b.options.swipe_velocity) &&
            (b.trigger(this.name, a), b.trigger(this.name + a.direction, a));
        }
      },
    }),
    (d.gestures.Tap = {
      name: "tap",
      index: 100,
      defaults: {
        tap_max_touchtime: 250,
        tap_max_distance: 10,
        tap_always: !0,
        doubletap_distance: 20,
        doubletap_interval: 300,
      },
      handler: function (a, b) {
        if (a.eventType == d.EVENT_END && "touchcancel" != a.srcEvent.type) {
          var c = d.detection.previous,
            e = !1;
          if (
            a.deltaTime > b.options.tap_max_touchtime ||
            a.distance > b.options.tap_max_distance
          )
            return;
          c &&
            "tap" == c.name &&
            a.timeStamp - c.lastEvent.timeStamp <
              b.options.doubletap_interval &&
            a.distance < b.options.doubletap_distance &&
            (b.trigger("doubletap", a), (e = !0)),
            (!e || b.options.tap_always) &&
              ((d.detection.current.name = "tap"),
              b.trigger(d.detection.current.name, a));
        }
      },
    }),
    (d.gestures.Touch = {
      name: "touch",
      index: -1 / 0,
      defaults: { prevent_default: !1, prevent_mouseevents: !1 },
      handler: function (a, b) {
        return b.options.prevent_mouseevents && a.pointerType == d.POINTER_MOUSE
          ? (a.stopDetect(), void 0)
          : (b.options.prevent_default && a.preventDefault(),
            a.eventType == d.EVENT_START && b.trigger(this.name, a),
            void 0);
      },
    }),
    (d.gestures.Transform = {
      name: "transform",
      index: 45,
      defaults: {
        transform_min_scale: 0.01,
        transform_min_rotation: 1,
        transform_always_block: !1,
      },
      triggered: !1,
      handler: function (a, b) {
        if (d.detection.current.name != this.name && this.triggered)
          return b.trigger(this.name + "end", a), (this.triggered = !1), void 0;
        if (!(a.touches.length < 2))
          switch (
            (b.options.transform_always_block && a.preventDefault(),
            a.eventType)
          ) {
            case d.EVENT_START:
              this.triggered = !1;
              break;
            case d.EVENT_MOVE:
              var c = Math.abs(1 - a.scale),
                e = Math.abs(a.rotation);
              if (
                c < b.options.transform_min_scale &&
                e < b.options.transform_min_rotation
              )
                return;
              (d.detection.current.name = this.name),
                this.triggered ||
                  (b.trigger(this.name + "start", a), (this.triggered = !0)),
                b.trigger(this.name, a),
                e > b.options.transform_min_rotation && b.trigger("rotate", a),
                c > b.options.transform_min_scale &&
                  (b.trigger("pinch", a),
                  b.trigger("pinch" + (a.scale < 1 ? "in" : "out"), a));
              break;
            case d.EVENT_END:
              this.triggered && b.trigger(this.name + "end", a),
                (this.triggered = !1);
          }
      },
    }),
    "function" == typeof define && "object" == typeof define.amd && define.amd
      ? define(function () {
          return d;
        })
      : "object" == typeof module && "object" == typeof module.exports
      ? (module.exports = d)
      : (a.Hammer = d);
})(this);
//# sourceMappingURL=hammer.min.map
