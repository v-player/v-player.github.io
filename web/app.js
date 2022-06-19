(function () {
    'use strict';

    function subscribe() {
      this.add = function (type, listener) {
        if (this._listeners === undefined) this._listeners = {};
        var listeners = this._listeners;

        if (listeners[type] === undefined) {
          listeners[type] = [];
        }

        if (listeners[type].indexOf(listener) === -1) {
          listeners[type].push(listener);
        }
      };

      this.follow = function (type, listener) {
        var _this = this;

        type.split(',').forEach(function (name) {
          _this.add(name, listener);
        });
      };

      this.has = function (type, listener) {
        if (this._listeners === undefined) return false;
        var listeners = this._listeners;
        return listeners[type] !== undefined && listeners[type].indexOf(listener) !== -1;
      };

      this.remove = function (type, listener) {
        if (this._listeners === undefined) return;
        var listeners = this._listeners;
        var listenerArray = listeners[type];

        if (listenerArray !== undefined) {
          var index = listenerArray.indexOf(listener);

          if (index !== -1) {
            listenerArray.splice(index, 1);
          }
        }
      };

      this.send = function (type) {
        var event = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        if (this._listeners === undefined) return;
        var listeners = this._listeners;
        var listenerArray = listeners[type];

        if (listenerArray !== undefined) {
          event.target = this;
          var array = listenerArray.slice(0);

          for (var i = 0, l = array.length; i < l; i++) {
            array[i].call(this, event);
          }
        }
      };

      this.destroy = function () {
        this._listeners = null;
      };
    }

    function start$3() {
      return new subscribe();
    }

    function ownKeys(object, enumerableOnly) {
      var keys = Object.keys(object);

      if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        enumerableOnly && (symbols = symbols.filter(function (sym) {
          return Object.getOwnPropertyDescriptor(object, sym).enumerable;
        })), keys.push.apply(keys, symbols);
      }

      return keys;
    }

    function _objectSpread2(target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = null != arguments[i] ? arguments[i] : {};
        i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {
          _defineProperty(target, key, source[key]);
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }

      return target;
    }

    function _typeof(obj) {
      "@babel/helpers - typeof";

      return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
        return typeof obj;
      } : function (obj) {
        return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      }, _typeof(obj);
    }

    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }

    function _defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    function _createClass(Constructor, protoProps, staticProps) {
      if (protoProps) _defineProperties(Constructor.prototype, protoProps);
      if (staticProps) _defineProperties(Constructor, staticProps);
      Object.defineProperty(Constructor, "prototype", {
        writable: false
      });
      return Constructor;
    }

    function _defineProperty(obj, key, value) {
      if (key in obj) {
        Object.defineProperty(obj, key, {
          value: value,
          enumerable: true,
          configurable: true,
          writable: true
        });
      } else {
        obj[key] = value;
      }

      return obj;
    }

    function _slicedToArray(arr, i) {
      return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
    }

    function _arrayWithHoles(arr) {
      if (Array.isArray(arr)) return arr;
    }

    function _iterableToArrayLimit(arr, i) {
      var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];

      if (_i == null) return;
      var _arr = [];
      var _n = true;
      var _d = false;

      var _s, _e;

      try {
        for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
          _arr.push(_s.value);

          if (i && _arr.length === i) break;
        }
      } catch (err) {
        _d = true;
        _e = err;
      } finally {
        try {
          if (!_n && _i["return"] != null) _i["return"]();
        } finally {
          if (_d) throw _e;
        }
      }

      return _arr;
    }

    function _unsupportedIterableToArray(o, minLen) {
      if (!o) return;
      if (typeof o === "string") return _arrayLikeToArray(o, minLen);
      var n = Object.prototype.toString.call(o).slice(8, -1);
      if (n === "Object" && o.constructor) n = o.constructor.name;
      if (n === "Map" || n === "Set") return Array.from(o);
      if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
    }

    function _arrayLikeToArray(arr, len) {
      if (len == null || len > arr.length) len = arr.length;

      for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

      return arr2;
    }

    function _nonIterableRest() {
      throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }

    function toObject(a) {
      if (Object.prototype.toString.call(a) === '[object Object]') return a;else {
        a = {};
        return a;
      }
    }

    function toArray(a) {
      if (Object.prototype.toString.call(a) === '[object Object]') {
        var b = [];

        for (var i in a) {
          b.push(a[i]);
        }

        return b;
      } else if (typeof a == 'string' || a == null || typeof a == 'number' || typeof a == 'undefined') return [];else return a;
    }

    function decodeJson(string, empty) {
      var json = empty || {};

      if (string) {
        try {
          json = JSON.parse(string);
        } catch (e) {}
      }

      return json;
    }

    function isObject(a) {
      return Object.prototype.toString.call(a) === '[object Object]';
    }

    function isArray(a) {
      return Object.prototype.toString.call(a) === '[object Array]';
    }

    function extend(a, b, replase) {
      for (var i in b) {
        if (_typeof(b[i]) == 'object') {
          if (a[i] == undefined) a[i] = Object.prototype.toString.call(b[i]) == '[object Array]' ? [] : {};
          this.extend(a[i], b[i], replase);
        } else if (a[i] == undefined || replase) a[i] = b[i];
      }
    }

    function empty$1(a, b) {
      for (var i in b) {
        if (!a[i]) a[i] = b[i];
      }
    }

    function getKeys(a, add) {
      var k = add || [];

      for (var i in a) {
        k.push(i);
      }

      return k;
    }

    function getValues(a, add) {
      var k = add || [];

      for (var i in a) {
        k.push(a[i]);
      }

      return k;
    }

    function remove$2(from, need) {
      var inx = from.indexOf(need);
      if (inx >= 0) from.splice(inx, 1);
    }

    function clone(a) {
      return JSON.parse(JSON.stringify(a));
    }

    function insert(where, index, item) {
      where.splice(index, 0, item);
    }

    function destroy$7(arr) {
      var call_function = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'destroy';
      var value = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
      var where = toArray(arr);

      for (var i = where.length - 1; i >= 0; i--) {
        if (where[i] && where[i][call_function]) where[i][call_function](value);
      }
    }

    function groupBy(xs, key) {
      return xs.reduce(function (rv, x) {
        (rv[x[key]] = rv[x[key]] || []).push(x);
        return rv;
      }, {});
    }

    function removeNoIncludes(where, items) {
      for (var i = where.length - 1; i >= 0; i--) {
        if (items.indexOf(where[i]) === -1) remove$2(where, where[i]);
      }

      return where;
    }

    function shuffle(array) {
      for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }

      return array;
    }

    var Arrays = {
      toObject: toObject,
      toArray: toArray,
      decodeJson: decodeJson,
      isObject: isObject,
      isArray: isArray,
      extend: extend,
      getKeys: getKeys,
      getValues: getValues,
      insert: insert,
      clone: clone,
      remove: remove$2,
      destroy: destroy$7,
      empty: empty$1,
      groupBy: groupBy,
      removeNoIncludes: removeNoIncludes,
      shuffle: shuffle
    };

    var html$1e = "<div class=\"head\">\n    <div class=\"head__body\">\n        <div class=\"head__logo-icon\">\n            <img src=\"./img/logo-icon.svg\" />\n        </div>\n\n        <div class=\"head__split\"></div>\n\n        <div class=\"head__logo\">\n            <img src=\"./img/logo.svg\" />\n        </div>\n\n        <div class=\"head__title\">\n            \n        </div>\n        <div class=\"head__actions\">\n            <div class=\"head__action head__settings selector open--search\">\n                <svg version=\"1.1\" id=\"Capa_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\"\n                    viewBox=\"0 0 512 512\" style=\"enable-background:new 0 0 512 512;\" xml:space=\"preserve\">\n                        <path fill=\"currentColor\" d=\"M225.474,0C101.151,0,0,101.151,0,225.474c0,124.33,101.151,225.474,225.474,225.474\n                            c124.33,0,225.474-101.144,225.474-225.474C450.948,101.151,349.804,0,225.474,0z M225.474,409.323\n                            c-101.373,0-183.848-82.475-183.848-183.848S124.101,41.626,225.474,41.626s183.848,82.475,183.848,183.848\n                            S326.847,409.323,225.474,409.323z\"/>\n                        <path fill=\"currentColor\" d=\"M505.902,476.472L386.574,357.144c-8.131-8.131-21.299-8.131-29.43,0c-8.131,8.124-8.131,21.306,0,29.43l119.328,119.328\n                            c4.065,4.065,9.387,6.098,14.715,6.098c5.321,0,10.649-2.033,14.715-6.098C514.033,497.778,514.033,484.596,505.902,476.472z\"/>\n                </svg>\n            </div>\n\n            <div class=\"head__action head__settings selector open--broadcast\">\n                <svg viewBox=\"0 0 42 34\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                <path d=\"M3.00006 3H39.0001V31H23.9777C23.9925 31.3315 24 31.6649 24 32C24 32.6742 23.9697 33.3413 23.9103 34H42.0001V0H6.10352e-05V10.0897C0.658765 10.0303 1.32584 10 2 10C2.33516 10 2.66856 10.0075 3.00006 10.0223V3Z\" fill=\"currentColor\"/>\n                <path d=\"M18.8836 34C18.9605 33.344 19 32.6766 19 32C19 22.6112 11.3888 15 2 15C1.32339 15 0.65602 15.0395 6.10352e-05 15.1164V18.1418C0.653248 18.0483 1.32098 18 2 18C9.73199 18 16 24.268 16 32C16 32.679 15.9517 33.3468 15.8582 34H18.8836Z\" fill=\"currentColor\"/>\n                <path d=\"M10.777 34C10.923 33.3568 11.0001 32.6874 11.0001 32C11.0001 27.0294 6.97062 23 2.00006 23C1.31267 23 0.643284 23.0771 6.10352e-05 23.223V34H10.777Z\" fill=\"currentColor\"/>\n                </svg>\n            \n            </div>\n\n            <div class=\"head__action selector open--settings\">\n                <svg version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\" viewBox=\"0 0 368 368\" style=\"enable-background:new 0 0 368 368;\" xml:space=\"preserve\">\n                    <path fill=\"currentColor\" d=\"M344,144h-29.952c-2.512-8.2-5.8-16.12-9.792-23.664l21.16-21.16c4.528-4.528,7.024-10.56,7.024-16.984\n                        c0-6.416-2.496-12.448-7.024-16.976l-22.64-22.64c-9.048-9.048-24.888-9.072-33.952,0l-21.16,21.16\n                        c-7.536-3.992-15.464-7.272-23.664-9.792V24c0-13.232-10.768-24-24-24h-32c-13.232,0-24,10.768-24,24v29.952\n                        c-8.2,2.52-16.12,5.8-23.664,9.792l-21.168-21.16c-9.36-9.36-24.592-9.36-33.952,0l-22.648,22.64\n                        c-9.352,9.36-9.352,24.592,0,33.952l21.16,21.168c-3.992,7.536-7.272,15.464-9.792,23.664H24c-13.232,0-24,10.768-24,24v32\n                        C0,213.232,10.768,224,24,224h29.952c2.52,8.2,5.8,16.12,9.792,23.664l-21.16,21.168c-9.36,9.36-9.36,24.592,0,33.952\n                        l22.64,22.648c9.36,9.352,24.592,9.352,33.952,0l21.168-21.16c7.536,3.992,15.464,7.272,23.664,9.792V344\n                        c0,13.232,10.768,24,24,24h32c13.232,0,24-10.768,24-24v-29.952c8.2-2.52,16.128-5.8,23.664-9.792l21.16,21.168\n                        c9.072,9.064,24.912,9.048,33.952,0l22.64-22.64c4.528-4.528,7.024-10.56,7.024-16.976c0-6.424-2.496-12.448-7.024-16.976\n                        l-21.16-21.168c3.992-7.536,7.272-15.464,9.792-23.664H344c13.232,0,24-10.768,24-24v-32C368,154.768,357.232,144,344,144z\n                            M352,200c0,4.408-3.584,8-8,8h-36c-3.648,0-6.832,2.472-7.744,6c-2.832,10.92-7.144,21.344-12.832,30.976\n                        c-1.848,3.144-1.344,7.144,1.232,9.72l25.44,25.448c1.504,1.504,2.336,3.512,2.336,5.664c0,2.152-0.832,4.16-2.336,5.664\n                        l-22.64,22.64c-3.008,3.008-8.312,3.008-11.328,0l-25.44-25.44c-2.576-2.584-6.576-3.08-9.728-1.232\n                        c-9.616,5.68-20.04,10-30.968,12.824c-3.52,0.904-5.992,4.088-5.992,7.736v36c0,4.408-3.584,8-8,8h-32c-4.408,0-8-3.592-8-8v-36\n                        c0-3.648-2.472-6.832-6-7.744c-10.92-2.824-21.344-7.136-30.976-12.824c-1.264-0.752-2.664-1.112-4.064-1.112\n                        c-2.072,0-4.12,0.8-5.664,2.344l-25.44,25.44c-3.128,3.12-8.2,3.12-11.328,0l-22.64-22.64c-3.128-3.128-3.128-8.208,0-11.328\n                        l25.44-25.44c2.584-2.584,3.088-6.584,1.232-9.72c-5.68-9.632-10-20.048-12.824-30.976c-0.904-3.528-4.088-6-7.736-6H24\n                        c-4.408,0-8-3.592-8-8v-32c0-4.408,3.592-8,8-8h36c3.648,0,6.832-2.472,7.744-6c2.824-10.92,7.136-21.344,12.824-30.976\n                        c1.856-3.144,1.352-7.144-1.232-9.72l-25.44-25.44c-3.12-3.12-3.12-8.2,0-11.328l22.64-22.64c3.128-3.128,8.2-3.12,11.328,0\n                        l25.44,25.44c2.584,2.584,6.576,3.096,9.72,1.232c9.632-5.68,20.048-10,30.976-12.824c3.528-0.912,6-4.096,6-7.744V24\n                        c0-4.408,3.592-8,8-8h32c4.416,0,8,3.592,8,8v36c0,3.648,2.472,6.832,6,7.744c10.928,2.824,21.352,7.144,30.968,12.824\n                        c3.152,1.856,7.152,1.36,9.728-1.232l25.44-25.44c3.016-3.024,8.32-3.016,11.328,0l22.64,22.64\n                        c1.504,1.504,2.336,3.52,2.336,5.664s-0.832,4.16-2.336,5.664l-25.44,25.44c-2.576,2.584-3.088,6.584-1.232,9.72\n                        c5.688,9.632,10,20.048,12.832,30.976c0.904,3.528,4.088,6,7.736,6h36c4.416,0,8,3.592,8,8V200z\"/>\n                    \n                    <path fill=\"currentColor\" d=\"M184,112c-39.696,0-72,32.304-72,72s32.304,72,72,72c39.704,0,72-32.304,72-72S223.704,112,184,112z M184,240 c-30.88,0-56-25.12-56-56s25.12-56,56-56c30.872,0,56,25.12,56,56S214.872,240,184,240z\"/>\n                    \n                </svg>\n            </div>\n\n            <div class=\"head__action selector open--notice notice--icon\">\n                <svg enable-background=\"new 0 0 512 512\" height=\"512\" viewBox=\"0 0 512 512\" xmlns=\"http://www.w3.org/2000/svg\"><g><path fill=\"currentColor\" d=\"m411 262.862v-47.862c0-69.822-46.411-129.001-110-148.33v-21.67c0-24.813-20.187-45-45-45s-45 20.187-45 45v21.67c-63.59 19.329-110 78.507-110 148.33v47.862c0 61.332-23.378 119.488-65.827 163.756-4.16 4.338-5.329 10.739-2.971 16.267s7.788 9.115 13.798 9.115h136.509c6.968 34.192 37.272 60 73.491 60 36.22 0 66.522-25.808 73.491-60h136.509c6.01 0 11.439-3.587 13.797-9.115s1.189-11.929-2.97-16.267c-42.449-44.268-65.827-102.425-65.827-163.756zm-170-217.862c0-8.271 6.729-15 15-15s15 6.729 15 15v15.728c-4.937-.476-9.94-.728-15-.728s-10.063.252-15 .728zm15 437c-19.555 0-36.228-12.541-42.42-30h84.84c-6.192 17.459-22.865 30-42.42 30zm-177.67-60c34.161-45.792 52.67-101.208 52.67-159.138v-47.862c0-68.925 56.075-125 125-125s125 56.075 125 125v47.862c0 57.93 18.509 113.346 52.671 159.138z\"/><path fill=\"currentColor\" d=\"m451 215c0 8.284 6.716 15 15 15s15-6.716 15-15c0-60.1-23.404-116.603-65.901-159.1-5.857-5.857-15.355-5.858-21.213 0s-5.858 15.355 0 21.213c36.831 36.831 57.114 85.8 57.114 137.887z\"/><path fill=\"currentColor\" d=\"m46 230c8.284 0 15-6.716 15-15 0-52.086 20.284-101.055 57.114-137.886 5.858-5.858 5.858-15.355 0-21.213-5.857-5.858-15.355-5.858-21.213 0-42.497 42.497-65.901 98.999-65.901 159.099 0 8.284 6.716 15 15 15z\"/></g></svg>\n            </div>\n\n            <div class=\"head__action hide selector open--profile\">\n                <svg height=\"158\" viewBox=\"0 0 145 158\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                <circle cx=\"72.5\" cy=\"39.5\" r=\"32.5\" stroke=\"currentColor\" stroke-width=\"14\"/>\n                <path d=\"M138 157.5C138 121.325 108.675 92 72.5 92C36.3253 92 7 121.325 7 157.5\" stroke=\"currentColor\" stroke-width=\"14\"/>\n                </svg>\n            </div>\n        </div>\n\n        <div class=\"head__split\"></div>\n\n        <div class=\"head__time\">\n            <div class=\"head__time-now time--clock\"></div>\n            <div>\n                <div class=\"head__time-date time--full\"></div>\n                <div class=\"head__time-week time--week\"></div>\n            </div>\n        </div>\n    </div>\n</div>";

    var html$1d = "<div class=\"wrap layer--height layer--width\">\n    <div class=\"wrap__left layer--height\"></div>\n    <div class=\"wrap__content layer--height layer--width\"></div>\n</div>";

    var html$1c = "<div class=\"menu\">\n\n    <div class=\"menu__case\">\n        <ul class=\"menu__list\">\n            <li class=\"menu__item selector\" data-action=\"main\">\n                <div class=\"menu__ico\"><img src=\"./img/icons/menu/home.svg\" /></div>\n                <div class=\"menu__text\">\u0413\u043B\u0430\u0432\u043D\u0430\u044F</div>\n            </li>\n\n            <li class=\"menu__item selector\" data-action=\"movie\">\n                <div class=\"menu__ico\"><img src=\"./img/icons/menu/movie.svg\" /></div>\n                <div class=\"menu__text\">\u0424\u0438\u043B\u044C\u043C\u044B</div>\n            </li>\n\n            <li class=\"menu__item selector\" data-action=\"tv\">\n                <div class=\"menu__ico\"><img src=\"./img/icons/menu/tv.svg\" /></div>\n                <div class=\"menu__text\">\u0421\u0435\u0440\u0438\u0430\u043B\u044B</div>\n            </li>\n\n            <li class=\"menu__item selector\" data-action=\"catalog\">\n                <div class=\"menu__ico\"><img src=\"./img/icons/menu/catalog.svg\" /></div>\n                <div class=\"menu__text\">\u041A\u0430\u0442\u0430\u043B\u043E\u0433</div>\n            </li>\n            <li class=\"menu__item selector\" data-action=\"filter\">\n                <div class=\"menu__ico\">\n                    <svg height=\"36\" viewBox=\"0 0 38 36\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                        <rect x=\"1.5\" y=\"1.5\" width=\"35\" height=\"33\" rx=\"1.5\" stroke=\"white\" stroke-width=\"3\"/>\n                        <rect x=\"7\" y=\"8\" width=\"24\" height=\"3\" rx=\"1.5\" fill=\"white\"/>\n                        <rect x=\"7\" y=\"16\" width=\"24\" height=\"3\" rx=\"1.5\" fill=\"white\"/>\n                        <rect x=\"7\" y=\"25\" width=\"24\" height=\"3\" rx=\"1.5\" fill=\"white\"/>\n                        <circle cx=\"13.5\" cy=\"17.5\" r=\"3.5\" fill=\"white\"/>\n                        <circle cx=\"23.5\" cy=\"26.5\" r=\"3.5\" fill=\"white\"/>\n                        <circle cx=\"21.5\" cy=\"9.5\" r=\"3.5\" fill=\"white\"/>\n                    </svg>\n                </div>\n                <div class=\"menu__text\">\u0424\u0438\u043B\u044C\u0442\u0440</div>\n            </li>\n            <li class=\"menu__item selector\" data-action=\"collections\">\n                <div class=\"menu__ico\"><img src=\"./img/icons/menu/catalog.svg\" /></div>\n                <div class=\"menu__text\">\u041F\u043E\u0434\u0431\u043E\u0440\u043A\u0438</div>\n            </li>\n            <li class=\"menu__item selector\" data-action=\"relise\">\n                <div class=\"menu__ico\">\n                    <svg height=\"30\" viewBox=\"0 0 38 30\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                    <rect x=\"1.5\" y=\"1.5\" width=\"35\" height=\"27\" rx=\"1.5\" stroke=\"white\" stroke-width=\"3\"/>\n                    <path d=\"M18.105 22H15.2936V16H9.8114V22H7V8H9.8114V13.6731H15.2936V8H18.105V22Z\" fill=\"white\"/>\n                    <path d=\"M20.5697 22V8H24.7681C25.9676 8 27.039 8.27885 27.9824 8.83654C28.9321 9.38782 29.6724 10.1763 30.2034 11.2019C30.7345 12.2212 31 13.3814 31 14.6827V15.3269C31 16.6282 30.7376 17.7853 30.2128 18.7981C29.6943 19.8109 28.9602 20.5962 28.0105 21.1538C27.0609 21.7115 25.9895 21.9936 24.7962 22H20.5697ZM23.3811 10.3365V19.6827H24.7399C25.8395 19.6827 26.6798 19.3141 27.2608 18.5769C27.8419 17.8397 28.1386 16.7853 28.1511 15.4135V14.6731C28.1511 13.25 27.8637 12.1731 27.289 11.4423C26.7142 10.7051 25.8739 10.3365 24.7681 10.3365H23.3811Z\" fill=\"white\"/>\n                    </svg>\n                </div>\n                <div class=\"menu__text\">\u0420\u0435\u043B\u0438\u0437\u044B</div>\n            </li>\n            <li class=\"menu__item selector\" data-action=\"anime\">\n                <div class=\"menu__ico\">\n                    <svg height=\"173\" viewBox=\"0 0 180 173\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                    <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M126 3C126 18.464 109.435 31 89 31C68.5655 31 52 18.464 52 3C52 2.4505 52.0209 1.90466 52.0622 1.36298C21.3146 15.6761 0 46.8489 0 83C0 132.706 40.2944 173 90 173C139.706 173 180 132.706 180 83C180 46.0344 157.714 14.2739 125.845 0.421326C125.948 1.27051 126 2.13062 126 3ZM88.5 169C125.779 169 156 141.466 156 107.5C156 84.6425 142.314 64.6974 122 54.0966C116.6 51.2787 110.733 55.1047 104.529 59.1496C99.3914 62.4998 94.0231 66 88.5 66C82.9769 66 77.6086 62.4998 72.4707 59.1496C66.2673 55.1047 60.3995 51.2787 55 54.0966C34.6864 64.6974 21 84.6425 21 107.5C21 141.466 51.2208 169 88.5 169Z\" fill=\"white\"/>\n                    <path d=\"M133 121.5C133 143.315 114.196 161 91 161C67.804 161 49 143.315 49 121.5C49 99.6848 67.804 116.5 91 116.5C114.196 116.5 133 99.6848 133 121.5Z\" fill=\"white\"/>\n                    <path d=\"M72 81C72 89.8366 66.1797 97 59 97C51.8203 97 46 89.8366 46 81C46 72.1634 51.8203 65 59 65C66.1797 65 72 72.1634 72 81Z\" fill=\"white\"/>\n                    <path d=\"M131 81C131 89.8366 125.18 97 118 97C110.82 97 105 89.8366 105 81C105 72.1634 110.82 65 118 65C125.18 65 131 72.1634 131 81Z\" fill=\"white\"/>\n                    </svg>\n                </div>\n                <div class=\"menu__text\">\u0410\u043D\u0438\u043C\u0435</div>\n            </li>\n        </ul>\n    </div>\n\n    <div class=\"menu__split\"></div>\n\n    <div class=\"menu__case\">\n        <ul class=\"menu__list\">\n            <li class=\"menu__item selector\" data-action=\"favorite\" data-type=\"book\">\n                <div class=\"menu__ico\"><img src=\"./img/icons/menu/bookmark.svg\" /></div>\n                <div class=\"menu__text\">\u0417\u0430\u043A\u043B\u0430\u0434\u043A\u0438</div>\n            </li>\n\n            <li class=\"menu__item selector\" data-action=\"favorite\" data-type=\"like\">\n                <div class=\"menu__ico\"><img src=\"./img/icons/menu/like.svg\" /></div>\n                <div class=\"menu__text\">\u041D\u0440\u0430\u0432\u0438\u0442\u0441\u044F</div>\n            </li>\n\n            <li class=\"menu__item selector\" data-action=\"favorite\" data-type=\"wath\">\n                <div class=\"menu__ico\"><img src=\"./img/icons/menu/time.svg\" /></div>\n                <div class=\"menu__text\">\u041F\u043E\u0437\u0436\u0435</div>\n            </li>\n\n            <li class=\"menu__item selector\" data-action=\"favorite\" data-type=\"history\">\n                <div class=\"menu__ico\">\n                    <svg height=\"34\" viewBox=\"0 0 28 34\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                    <rect x=\"1.5\" y=\"1.5\" width=\"25\" height=\"31\" rx=\"2.5\" stroke=\"white\" stroke-width=\"3\"/>\n                    <rect x=\"6\" y=\"7\" width=\"9\" height=\"9\" rx=\"1\" fill=\"white\"/>\n                    <rect x=\"6\" y=\"19\" width=\"16\" height=\"3\" rx=\"1.5\" fill=\"white\"/>\n                    <rect x=\"6\" y=\"25\" width=\"11\" height=\"3\" rx=\"1.5\" fill=\"white\"/>\n                    <rect x=\"17\" y=\"7\" width=\"5\" height=\"3\" rx=\"1.5\" fill=\"white\"/>\n                    </svg>\n                </div>\n                <div class=\"menu__text\">\u0418\u0441\u0442\u043E\u0440\u0438\u044F</div>\n            </li>\n\n            <li class=\"menu__item selector\" data-action=\"timetable\">\n                <div class=\"menu__ico\">\n                    <svg height=\"28\" viewBox=\"0 0 28 28\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                        <rect x=\"1.5\" y=\"3.5\" width=\"25\" height=\"23\" rx=\"2.5\" stroke=\"white\" stroke-width=\"3\"/>\n                        <rect x=\"6\" width=\"3\" height=\"7\" rx=\"1.5\" fill=\"white\"/>\n                        <rect x=\"19\" width=\"3\" height=\"7\" rx=\"1.5\" fill=\"white\"/>\n                        <circle cx=\"7\" cy=\"12\" r=\"2\" fill=\"white\"/>\n                        <circle cx=\"7\" cy=\"19\" r=\"2\" fill=\"white\"/>\n                        <circle cx=\"14\" cy=\"12\" r=\"2\" fill=\"white\"/>\n                        <circle cx=\"14\" cy=\"19\" r=\"2\" fill=\"white\"/>\n                        <circle cx=\"21\" cy=\"12\" r=\"2\" fill=\"white\"/>\n                        <circle cx=\"21\" cy=\"19\" r=\"2\" fill=\"white\"/>\n                    </svg>\n                </div>\n                <div class=\"menu__text\">\u0420\u0430\u0441\u043F\u0438\u0441\u0430\u043D\u0438\u0435</div>\n            </li>\n\n            <li class=\"menu__item selector\" data-action=\"mytorrents\">\n                <div class=\"menu__ico\">\n                    <svg height=\"34\" viewBox=\"0 0 28 34\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                    <rect x=\"1.5\" y=\"1.5\" width=\"25\" height=\"31\" rx=\"2.5\" stroke=\"white\" stroke-width=\"3\"/>\n                    <rect x=\"6\" y=\"7\" width=\"16\" height=\"3\" rx=\"1.5\" fill=\"white\"/>\n                    <rect x=\"6\" y=\"13\" width=\"16\" height=\"3\" rx=\"1.5\" fill=\"white\"/>\n                    </svg>\n                </div>\n                <div class=\"menu__text\">\u0422\u043E\u0440\u0440\u0435\u043D\u0442\u044B</div>\n            </li>\n        </ul>\n    </div>\n\n    <div class=\"menu__split\"></div>\n\n    <div class=\"menu__case\">\n        <ul class=\"menu__list\">\n            <li class=\"menu__item selector\" data-action=\"settings\">\n                <div class=\"menu__ico\"><img src=\"./img/icons/menu/settings.svg\" /></div>\n                <div class=\"menu__text\">\u041D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438</div>\n            </li>\n\n            <li class=\"menu__item selector\" data-action=\"about\">\n                <div class=\"menu__ico\"><img src=\"./img/icons/menu/info.svg\" /></div>\n                <div class=\"menu__text\">\u0418\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044F</div>\n            </li>\n\n            <li class=\"menu__item selector\" data-action=\"console\">\n                <div class=\"menu__ico\">\n                    <svg height=\"30\" viewBox=\"0 0 38 30\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                    <rect x=\"1.5\" y=\"1.5\" width=\"35\" height=\"27\" rx=\"1.5\" stroke=\"white\" stroke-width=\"3\"/>\n                    <rect x=\"6\" y=\"7\" width=\"25\" height=\"3\" fill=\"white\"/>\n                    <rect x=\"6\" y=\"13\" width=\"13\" height=\"3\" fill=\"white\"/>\n                    <rect x=\"6\" y=\"19\" width=\"19\" height=\"3\" fill=\"white\"/>\n                    </svg>\n                </div>\n                <div class=\"menu__text\">\u041A\u043E\u043D\u0441\u043E\u043B\u044C</div>\n            </li>\n        </ul>\n    </div>\n</div>";

    var html$1b = "<div class=\"activitys layer--width\">\n    <div class=\"activitys__slides\"></div>\n</div>";

    var html$1a = "<div class=\"activity layer--width\">\n    <div class=\"activity__body\"></div>\n    <div class=\"activity__loader\"></div>\n</div>";

    var html$19 = "<div class=\"scroll\">\n    <div class=\"scroll__content\">\n        <div class=\"scroll__body\">\n            \n        </div>\n    </div>\n</div>";

    var html$18 = "<div class=\"settings\">\n    <div class=\"settings__layer\"></div>\n    <div class=\"settings__content layer--height\">\n        <div class=\"settings__head\">\n            <div class=\"settings__title\">\u041D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438</div>\n        </div>\n        <div class=\"settings__body\"></div>\n    </div>\n</div>";

    var html$17 = "<div>\n    <div class=\"settings-folder selector\" data-component=\"account\">\n        <div class=\"settings-folder__icon\">\n            <svg height=\"169\" viewBox=\"0 0 172 169\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                <circle cx=\"85.765\" cy=\"47.5683\" r=\"15.5683\" stroke=\"white\" stroke-width=\"12\"/>\n                <path d=\"M121.53 112C121.53 92.2474 105.518 76.2349 85.7651 76.2349C66.0126 76.2349 50 92.2474 50 112\" stroke=\"white\" stroke-width=\"12\"/>\n                <rect x=\"44\" y=\"125\" width=\"84\" height=\"16\" rx=\"8\" fill=\"white\"/>\n                <rect x=\"6\" y=\"6\" width=\"160\" height=\"157\" rx=\"21\" stroke=\"white\" stroke-width=\"12\"/>\n            </svg>\n        </div>\n        <div class=\"settings-folder__name\">\u0410\u043A\u043A\u0430\u0443\u043D\u0442</div>\n    </div>\n    <div class=\"settings-folder selector\" data-component=\"interface\">\n        <div class=\"settings-folder__icon\">\n            <img src=\"./img/icons/settings/panel.svg\" />\n        </div>\n        <div class=\"settings-folder__name\">\u0418\u043D\u0442\u0435\u0440\u0444\u0435\u0439\u0441</div>\n    </div>\n    <div class=\"settings-folder selector\" data-component=\"player\">\n        <div class=\"settings-folder__icon\">\n            <img src=\"./img/icons/settings/player.svg\" />\n        </div>\n        <div class=\"settings-folder__name\">\u041F\u043B\u0435\u0435\u0440</div>\n    </div>\n    <div class=\"settings-folder selector\" data-component=\"parser\">\n        <div class=\"settings-folder__icon\">\n            <img src=\"./img/icons/settings/parser.svg\" />\n        </div>\n        <div class=\"settings-folder__name\">\u041F\u0430\u0440\u0441\u0435\u0440</div>\n    </div>\n    <div class=\"settings-folder selector\" data-component=\"server\">\n        <div class=\"settings-folder__icon\">\n            <img src=\"./img/icons/settings/server.svg\" />\n        </div>\n        <div class=\"settings-folder__name\">TorrServer</div>\n    </div>\n    <div class=\"settings-folder selector\" data-component=\"plugins\">\n        <div class=\"settings-folder__icon\">\n            <svg height=\"44\" viewBox=\"0 0 44 44\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n            <rect width=\"21\" height=\"21\" rx=\"2\" fill=\"white\"/>\n            <mask id=\"path-2-inside-1_154:24\" fill=\"white\">\n            <rect x=\"2\" y=\"27\" width=\"17\" height=\"17\" rx=\"2\"/>\n            </mask>\n            <rect x=\"2\" y=\"27\" width=\"17\" height=\"17\" rx=\"2\" stroke=\"white\" stroke-width=\"6\" mask=\"url(#path-2-inside-1_154:24)\"/>\n            <rect x=\"27\" y=\"2\" width=\"17\" height=\"17\" rx=\"2\" fill=\"white\"/>\n            <rect x=\"27\" y=\"34\" width=\"17\" height=\"3\" fill=\"white\"/>\n            <rect x=\"34\" y=\"44\" width=\"17\" height=\"3\" transform=\"rotate(-90 34 44)\" fill=\"white\"/>\n            </svg>\n        </div>\n        <div class=\"settings-folder__name\">\u041F\u043B\u0430\u0433\u0438\u043D\u044B</div>\n    </div>\n    <div class=\"settings-folder selector hide\" data-component=\"cloud\">\n        <div class=\"settings-folder__icon\">\n            <svg height=\"60\" viewBox=\"0 0 63 60\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n            <path d=\"M48.75 25.9904L63 13L48.75 0.00961304V9H5V17H48.75V25.9904Z\" fill=\"white\"/>\n            <path d=\"M14.25 59.9808L0 46.9904L14.25 34V42.9904H58V50.9904H14.25V59.9808Z\" fill=\"white\"/>\n            </svg>\n        </div>\n        <div class=\"settings-folder__name\">\u0421\u0438\u043D\u0445\u0440\u043E\u043D\u0438\u0437\u0430\u0446\u0438\u044F</div>\n    </div>\n    <div class=\"settings-folder selector\" data-component=\"more\">\n        <div class=\"settings-folder__icon\">\n            <img src=\"./img/icons/settings/more.svg\" />\n        </div>\n        <div class=\"settings-folder__name\">\u041E\u0441\u0442\u0430\u043B\u044C\u043D\u043E\u0435</div>\n    </div>\n    \n</div>";

    var html$16 = "<div>\n    <div class=\"settings-param selector\" data-type=\"toggle\" data-name=\"light_version\">\n        <div class=\"settings-param__name\">\u041E\u0431\u043B\u0435\u0433\u0447\u0451\u043D\u043D\u0430\u044F \u0432\u0435\u0440\u0441\u0438\u044F</div>\n        <div class=\"settings-param__value\"></div>\n    </div>\n\n    <div class=\"settings-param selector\" data-type=\"toggle\" data-name=\"interface_size\">\n        <div class=\"settings-param__name\">\u0420\u0430\u0437\u043C\u0435\u0440 \u0438\u043D\u0442\u0435\u0440\u0444\u0435\u0439\u0441\u0430</div>\n        <div class=\"settings-param__value\"></div>\n    </div>\n\n    <div class=\"settings-param-title\"><span>\u0424\u043E\u043D</span></div>\n\n    <div class=\"settings-param selector\" data-type=\"toggle\" data-name=\"background\">\n        <div class=\"settings-param__name\">\u041F\u043E\u043A\u0430\u0437\u044B\u0432\u0430\u0442\u044C \u0444\u043E\u043D</div>\n        <div class=\"settings-param__value\"></div>\n    </div>\n\n    <div class=\"settings-param selector\" data-type=\"toggle\" data-name=\"background_type\">\n        <div class=\"settings-param__name\">\u0422\u0438\u043F \u0444\u043E\u043D\u0430</div>\n        <div class=\"settings-param__value\"></div>\n    </div>\n\n    <div class=\"settings-param-title\"><span>\u0411\u044B\u0441\u0442\u0440\u043E\u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0435</span></div>\n\n    <div class=\"settings-param selector\" data-type=\"toggle\" data-name=\"animation\">\n        <div class=\"settings-param__name\">\u0410\u043D\u0438\u043C\u0430\u0446\u0438\u044F</div>\n        <div class=\"settings-param__value\"></div>\n        <div class=\"settings-param__descr\">\u0410\u043D\u0438\u043C\u0430\u0446\u0438\u044F \u043A\u0430\u0440\u0442\u043E\u0447\u0435\u043A \u0438 \u043A\u043E\u043D\u0442\u0435\u043D\u0442\u0430</div>\n    </div>\n\n    <div class=\"settings-param selector\" data-type=\"toggle\" data-name=\"mask\">\n        <div class=\"settings-param__name\">\u0417\u0430\u0442\u0443\u0445\u0430\u043D\u0438\u0435</div>\n        <div class=\"settings-param__value\"></div>\n        <div class=\"settings-param__descr\">\u041F\u043B\u0430\u0432\u043D\u043E\u0435 \u0437\u0430\u0442\u0443\u0445\u0430\u043D\u0438\u0435 \u043A\u0430\u0440\u0442\u043E\u0447\u0435\u043A \u0441\u043D\u0438\u0437\u0443 \u0438 \u0441\u0432\u0435\u0440\u0445\u0443</div>\n    </div>\n\n    <div class=\"settings-param selector\" data-type=\"toggle\" data-name=\"scroll_type\">\n        <div class=\"settings-param__name\">\u0422\u0438\u043F \u0441\u043A\u0440\u043E\u043B\u0438\u043D\u0433\u0430</div>\n        <div class=\"settings-param__value\"></div>\n    </div>\n\n    <div class=\"settings-param selector\" data-type=\"toggle\" data-name=\"card_views_type\">\n        <div class=\"settings-param__name\">\u0422\u0438\u043F \u043F\u0440\u043E\u0441\u043C\u043E\u0442\u0440\u0430 \u043A\u0430\u0440\u0442\u043E\u0447\u0435\u043A</div>\n        <div class=\"settings-param__value\"></div>\n        <div class=\"settings-param__descr\">\u041F\u043E \u043C\u0435\u0440\u0435 \u0441\u043A\u0440\u043E\u043B\u043B\u0438\u043D\u0433\u0430 \u043B\u0435\u043D\u0442\u044B \u043A\u0430\u0440\u0442\u043E\u0447\u043A\u0438 \u0431\u0443\u0434\u0443\u0442 \u043F\u043E\u0434\u0433\u0440\u0443\u0436\u0430\u0442\u044C\u0441\u044F \u043F\u043E\u0441\u0442\u0435\u043F\u0435\u043D\u043D\u043E \u0438\u043B\u0438 \u0437\u0430\u0433\u0440\u0443\u0436\u0430\u0442\u044C\u0441\u044F \u0432\u0441\u0435</div>\n    </div>\n\n</div>";

    var html$15 = "<div>\n    <div class=\"settings-param selector\" data-type=\"toggle\" data-name=\"parser_use\">\n        <div class=\"settings-param__name\">\u0418\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u044C \u043F\u0430\u0440\u0441\u0435\u0440</div>\n        <div class=\"settings-param__value\"></div>\n        <div class=\"settings-param__descr\">\u0422\u0435\u043C \u0441\u0430\u043C\u044B\u043C, \u0432\u044B \u0441\u043E\u0433\u043B\u0430\u0448\u0430\u0435\u0442\u0435\u0441\u044C \u043F\u0440\u0438\u043D\u044F\u0442\u044C \u043D\u0430 \u0441\u0435\u0431\u044F \u0432\u0441\u044E \u043E\u0442\u0432\u0435\u0441\u0442\u0432\u0435\u043D\u043D\u043E\u0441\u0442\u044C \u0437\u0430 \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u043D\u0438\u0435 \u043F\u0443\u0431\u043B\u0438\u0447\u043D\u044B\u0445 \u0441\u0441\u044B\u043B\u043E\u043A \u0434\u043B\u044F \u043F\u0440\u043E\u0441\u043C\u043E\u0442\u0440\u0430 \u0442\u043E\u0440\u0440\u0435\u043D\u0442 \u0438 \u043E\u043D\u043B\u0430\u0439\u043D \u043A\u043E\u043D\u0442\u0435\u043D\u0442\u0430.</div>\n    </div>\n\n    <div class=\"settings-param selector\" data-type=\"toggle\" data-name=\"parser_torrent_type\">\n        <div class=\"settings-param__name\">\u0422\u0438\u043F \u043F\u0430\u0440\u0441\u0435\u0440\u0430 \u0434\u043B\u044F \u0442\u043E\u0440\u0440\u0435\u043D\u0442\u043E\u0432</div>\n        <div class=\"settings-param__value\"></div>\n    </div>\n\n    <div class=\"settings-param-title\"><span>Jackett</span></div>\n\n    <div class=\"settings-param selector\" data-type=\"input\" data-name=\"jackett_url\" placeholder=\"\u041D\u0430\u043F\u0440\u0438\u043C\u0435\u0440: 192.168.\u0445\">\n        <div class=\"settings-param__name\">\u0421\u0441\u044B\u043B\u043A\u0430</div>\n        <div class=\"settings-param__value\"></div>\n        <div class=\"settings-param__descr\">\u0423\u043A\u0430\u0436\u0438\u0442\u0435 \u0441\u0441\u044B\u043B\u043A\u0443 \u043D\u0430 \u0441\u043A\u0440\u0438\u043F\u0442 Jackett</div>\n    </div>\n\n    <div class=\"settings-param selector\" data-type=\"input\" data-name=\"jackett_key\" placeholder=\"\u041D\u0430\u043F\u0440\u0438\u043C\u0435\u0440: sa0sk83d..\">\n        <div class=\"settings-param__name\">Api \u043A\u043B\u044E\u0447</div>\n        <div class=\"settings-param__value\"></div>\n        <div class=\"settings-param__descr\">\u041D\u0430\u0445\u043E\u0434\u0438\u0442\u0441\u044F \u0432 Jackett</div>\n    </div>\n\n    <div class=\"settings-param-title is--torllok\"><span>Torlook</span></div> \n\n    <div class=\"settings-param selector is--torllok\" data-type=\"toggle\" data-name=\"torlook_parse_type\">\n        <div class=\"settings-param__name\">\u041C\u0435\u0442\u043E\u0434 \u043F\u0430\u0440\u0441\u0438\u043D\u0433\u0430 \u0441\u0430\u0439\u0442\u0430 TorLook</div>\n        <div class=\"settings-param__value\"></div>\n    </div>\n\n    <div class=\"settings-param selector is--torllok\" data-type=\"input\" data-name=\"parser_website_url\" placeholder=\"\u041D\u0430\u043F\u0440\u0438\u043C\u0435\u0440: scraperapi.com\">\n        <div class=\"settings-param__name\">\u0421\u0441\u044B\u043B\u043A\u0430 \u043D\u0430 \u043F\u0430\u0440\u0441\u0435\u0440 \u0441\u0430\u0439\u0442\u043E\u0432</div>\n        <div class=\"settings-param__value\"></div>\n        <div class=\"settings-param__descr\">\u0417\u0430\u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0438\u0440\u0443\u0439\u0442\u0435\u0441\u044C \u043D\u0430 \u0441\u0430\u0439\u0442\u0435 scraperapi.com, \u0432\u0432\u0435\u0434\u0438\u0442\u0435 \u0441\u0441\u044B\u043B\u043A\u0443 api.scraperapi.com?api_key=...&url={q}<br>\u0412 {q} \u0431\u0443\u0434\u0435\u0442 \u043F\u043E\u0441\u0442\u0430\u0432\u043B\u044F\u0442\u044C\u0441\u044F \u0441\u0430\u0439\u0442 w41.torlook.info</div>\n    </div>\n\n    <div class=\"settings-param-title\"><span>\u0415\u0449\u0451</span></div>\n\n    <div class=\"settings-param selector\" data-type=\"toggle\" data-name=\"parse_lang\">\n        <div class=\"settings-param__name\">\u041F\u043E\u0438\u0441\u043A</div>\n        <div class=\"settings-param__value\"></div>\n        <div class=\"settings-param__descr\">\u041D\u0430 \u043A\u0430\u043A\u043E\u043C \u044F\u0437\u044B\u043A\u0435 \u043F\u0440\u043E\u0438\u0437\u0432\u043E\u0434\u0438\u0442\u044C \u043F\u043E\u0438\u0441\u043A?</div>\n    </div>\n    <div class=\"settings-param selector\" data-type=\"toggle\" data-name=\"parse_in_search\">\n        <div class=\"settings-param__name\">\u041F\u0430\u0440\u0441\u0435\u0440 \u0432 \u043F\u043E\u0438\u0441\u043A\u0435</div>\n        <div class=\"settings-param__value\"></div>\n        <div class=\"settings-param__descr\">\u041F\u043E\u043A\u0430\u0437\u044B\u0432\u0430\u0442\u044C \u0440\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442\u044B \u0432 \u043F\u043E\u0438\u0441\u043A\u0435?</div>\n    </div>\n</div>";

    var html$14 = "<div>\n    <div class=\"settings-param selector\" data-type=\"toggle\" data-name=\"torrserver_use_link\">\n        <div class=\"settings-param__name\">\u0418\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u044C \u0441\u0441\u044B\u043B\u043A\u0443</div>\n        <div class=\"settings-param__value\"></div>\n    </div>\n\n    <div class=\"settings-param-title\"><span>\u0421\u0441\u044B\u043B\u043A\u0438</span></div>\n\n    <div class=\"settings-param selector\" data-type=\"input\" data-name=\"torrserver_url\" placeholder=\"\u041D\u0430\u043F\u0440\u0438\u043C\u0435\u0440: 192.168.\u0445\">\n        <div class=\"settings-param__name\">\u041E\u0441\u043D\u043E\u0432\u043D\u0430\u044F \u0441\u0441\u044B\u043B\u043A\u0430</div>\n        <div class=\"settings-param__value\"></div>\n        <div class=\"settings-param__descr\">\u0423\u043A\u0430\u0436\u0438\u0442\u0435 \u043E\u0441\u043D\u043E\u0432\u043D\u0443\u044E \u0441\u0441\u044B\u043B\u043A\u0443 \u043D\u0430 \u0441\u043A\u0440\u0438\u043F\u0442 TorrServer</div>\n        <div class=\"settings-param__status\"></div>\n    </div>\n\n    <div class=\"settings-param selector\" data-type=\"input\" data-name=\"torrserver_url_two\" placeholder=\"\u041D\u0430\u043F\u0440\u0438\u043C\u0435\u0440: 192.168.\u0445\">\n        <div class=\"settings-param__name\">\u0414\u043E\u043F\u043E\u043B\u043D\u0438\u0442\u0435\u043B\u044C\u043D\u0430\u044F \u0441\u0441\u044B\u043B\u043A\u0430</div>\n        <div class=\"settings-param__value\"></div>\n        <div class=\"settings-param__descr\">\u0423\u043A\u0430\u0436\u0438\u0442\u0435 \u0434\u043E\u043F\u043E\u043B\u043D\u0438\u0442\u0435\u043B\u044C\u043D\u0443\u044E \u0441\u0441\u044B\u043B\u043A\u0443 \u043D\u0430 \u0441\u043A\u0440\u0438\u043F\u0442 TorrServer</div>\n        <div class=\"settings-param__status\"></div>\n    </div>\n    \n    <div class=\"settings-param-title\"><span>\u0414\u043E\u043F\u043E\u043B\u043D\u0438\u0442\u0435\u043B\u044C\u043D\u043E</span></div>\n\n    <div class=\"settings-param selector is--android\" data-type=\"toggle\" data-name=\"internal_torrclient\">\n        <div class=\"settings-param__name\">\u0412\u0441\u0442\u0440\u043E\u0435\u043D\u043D\u044B\u0439 \u043A\u043B\u0438\u0435\u043D\u0442</div>\n        <div class=\"settings-param__value\"></div>\n        <div class=\"settings-param__descr\">\u0418\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u044C \u0432\u0441\u0442\u0440\u043E\u0435\u043D\u043D\u044B\u0439 JS-\u043A\u043B\u0438\u0435\u043D\u0442 TorrServe, \u0438\u043D\u0430\u0447\u0435 \u0437\u0430\u043F\u0443\u0441\u043A\u0430\u0435\u0442\u0441\u044F \u0441\u0438\u0441\u0442\u0435\u043C\u043D\u044B\u0439.</div>\n    </div>\n\n    <div class=\"settings-param selector\" data-type=\"toggle\" data-name=\"torrserver_savedb\">\n        <div class=\"settings-param__name\">\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C \u0432 \u0431\u0430\u0437\u0443</div>\n        <div class=\"settings-param__value\"></div>\n        <div class=\"settings-param__descr\">\u0422\u043E\u0440\u0440\u0435\u043D\u0442 \u0431\u0443\u0434\u0435\u0442 \u0434\u043E\u0431\u0430\u0432\u043B\u0435\u043D \u0432 \u0431\u0430\u0437\u0443 TorrServer</div>\n    </div>\n    \n    <div class=\"settings-param selector\" data-type=\"toggle\" data-name=\"torrserver_preload\">\n        <div class=\"settings-param__name\">\u0418\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u044C \u0431\u0443\u0444\u0435\u0440 \u043F\u0440\u0435\u0434.\u0437\u0430\u0433\u0440\u0443\u0437\u043A\u0438</div>\n        <div class=\"settings-param__value\"></div>\n        <div class=\"settings-param__descr\">\u0414\u043E\u0436\u0438\u0434\u0430\u0442\u044C\u0441\u044F \u0437\u0430\u043F\u043E\u043B\u043D\u0435\u043D\u0438\u044F \u0431\u0443\u0444\u0435\u0440\u0430 \u043F\u0440\u0435\u0434\u0432\u0430\u0440\u0438\u0442\u0435\u043B\u044C\u043D\u043E\u0439 \u0437\u0430\u0433\u0440\u0443\u0437\u043A\u0438 TorrServer \u043F\u0435\u0440\u0435\u0434 \u043F\u0440\u043E\u0438\u0433\u0440\u044B\u0432\u0430\u043D\u0438\u0435\u043C</div>\n    </div>\n\n    <div class=\"settings-param-title\"><span>\u0410\u0432\u0442\u043E\u0440\u0438\u0437\u0430\u0446\u0438\u044F</span></div>\n\n    <div class=\"settings-param selector\" data-type=\"toggle\" data-name=\"torrserver_auth\">\n        <div class=\"settings-param__name\">\u0412\u0445\u043E\u0434 \u043F\u043E \u043F\u0430\u0440\u043E\u043B\u044E</div>\n        <div class=\"settings-param__value\"></div>\n    </div>\n\n    <div class=\"settings-param selector\" data-type=\"input\" data-name=\"torrserver_login\" placeholder=\"\u041D\u0435 \u0443\u043A\u0430\u0437\u0430\u043D\">\n        <div class=\"settings-param__name\">\u041B\u043E\u0433\u0438\u043D</div>\n        <div class=\"settings-param__value\"></div>\n    </div>\n\n    <div class=\"settings-param selector\" data-type=\"input\" data-name=\"torrserver_password\" data-string=\"true\" placeholder=\"\u041D\u0435 \u0443\u043A\u0430\u0437\u0430\u043D\">\n        <div class=\"settings-param__name\">\u041F\u0430\u0440\u043E\u043B\u044C</div>\n        <div class=\"settings-param__value\"></div>\n    </div>\n</div>";

    var html$13 = "<div>\n    <div class=\"settings-param selector is--player\" data-type=\"toggle\" data-name=\"player\">\n        <div class=\"settings-param__name\">\u0422\u0438\u043F \u043F\u043B\u0435\u0435\u0440\u0430</div>\n        <div class=\"settings-param__value\"></div>\n        <div class=\"settings-param__descr\">\u041A\u0430\u043A\u0438\u043C \u043F\u043B\u0435\u0435\u0440\u043E\u043C \u0432\u043E\u0441\u043F\u0440\u043E\u0438\u0437\u0432\u043E\u0434\u0438\u0442\u044C</div>\n    </div>\n    \n    <div class=\"settings-param selector is--android\" data-type=\"button\" data-name=\"reset_player\" data-static=\"true\">\n        <div class=\"settings-param__name\">\u0421\u0431\u0440\u043E\u0441\u0438\u0442\u044C \u043F\u043B\u0435\u0435\u0440 \u043F\u043E \u0443\u043C\u043E\u043B\u0447\u0430\u043D\u0438\u044E</div>\n        <div class=\"settings-param__value\"></div>\n        <div class=\"settings-param__descr\">\u0421\u0431\u0440\u0430\u0441\u044B\u0432\u0430\u0435\u0442 \u0432\u044B\u0431\u0440\u0430\u043D\u043D\u044B\u0439 Android \u043F\u043B\u0435\u0435\u0440 \u0432 \u043F\u0440\u0438\u043B\u043E\u0436\u0435\u043D\u0438\u0438</div>\n    </div>\n\n    <div class=\"settings-param selector is--nw\" data-type=\"input\" data-name=\"player_nw_path\" placeholder=\"\">\n        <div class=\"settings-param__name\">\u041F\u0443\u0442\u044C \u043A \u043F\u043B\u0435\u0435\u0440\u0443</div>\n        <div class=\"settings-param__value\"></div>\n        <div class=\"settings-param__descr\">\u0423\u043A\u0430\u0436\u0438\u0442\u0435 \u043F\u0443\u0442\u044C \u043A \u043F\u043B\u0435\u0435\u0440\u0443 .exe</div>\n    </div>\n\n    <div class=\"settings-param selector\" data-type=\"toggle\" data-name=\"player_normalization\">\n        <div class=\"settings-param__name\">\u041D\u043E\u0440\u043C\u0430\u043B\u0438\u0437\u0430\u0446\u0438\u044F \u0437\u0432\u0443\u043A\u0430</div>\n        <div class=\"settings-param__value\"></div>\n        <div class=\"settings-param__descr\">\u041D\u043E\u0440\u043C\u0430\u043B\u0438\u0437\u0438\u0440\u0443\u0435\u0442 \u0437\u0432\u0443\u043A \u0432 \u043E\u0434\u0438\u043D \u0443\u0440\u043E\u0432\u0435\u043D\u044C, \u043F\u043E\u043D\u0438\u0436\u0430\u0435\u0442 \u0433\u0440\u043E\u043C\u043A\u0438\u0435 \u0437\u0432\u0443\u043A\u0438 \u0438 \u043F\u043E\u0432\u044B\u0448\u0430\u0435\u0442 \u0442\u0438\u0445\u0438\u0435.</div>\n    </div>\n    \n    <div class=\"settings-param selector\" data-type=\"toggle\" data-name=\"playlist_next\">\n        <div class=\"settings-param__name\">\u0421\u043B\u0435\u0434\u0443\u044E\u0449\u0430\u044F \u0441\u0435\u0440\u0438\u044F</div>\n        <div class=\"settings-param__value\"></div>\n        <div class=\"settings-param__descr\">\u0410\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0447\u0435\u0441\u043A\u0438 \u043F\u0435\u0440\u0435\u043A\u043B\u044E\u0447\u0430\u0442\u044C \u043D\u0430 \u0441\u043B\u0435\u0434\u0443\u044E\u0449\u0443\u044E \u0441\u0435\u0440\u0438\u044E \u043F\u043E \u043E\u043A\u043E\u043D\u0447\u0430\u043D\u0438\u0438 \u0442\u0435\u043A\u0443\u0449\u0435\u0439</div>\n    </div>\n\n    <div class=\"settings-param selector\" data-type=\"toggle\" data-name=\"player_timecode\">\n        <div class=\"settings-param__name\">\u0422\u0430\u0439\u043C\u043A\u043E\u0434</div>\n        <div class=\"settings-param__value\"></div>\n        <div class=\"settings-param__descr\">\u041F\u0440\u043E\u0434\u043E\u043B\u0436\u0438\u0442\u044C \u0441 \u043F\u043E\u0441\u043B\u0435\u0434\u043D\u0435\u0433\u043E \u043C\u0435\u0441\u0442\u0430 \u043F\u0440\u043E\u0441\u043C\u043E\u0442\u0440\u0430</div>\n    </div>\n\n    <div class=\"settings-param selector\" data-type=\"toggle\" data-name=\"player_scale_method\">\n        <div class=\"settings-param__name\">\u041C\u0435\u0442\u043E\u0434 \u043C\u0430\u0441\u0448\u0442\u0430\u0431\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u044F</div>\n        <div class=\"settings-param__value\"></div>\n        <div class=\"settings-param__descr\">\u041A\u0430\u043A\u0438\u043C \u043E\u0431\u0440\u0430\u0437\u043E\u043C \u043F\u0440\u043E\u0438\u0437\u0432\u043E\u0434\u0438\u0442\u044C \u0432\u044B\u0447\u0438\u0441\u043B\u0435\u043D\u0438\u044F \u0434\u043B\u044F \u043C\u0430\u0441\u0448\u0442\u0430\u0431\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u044F \u0432\u0438\u0434\u0435\u043E</div>\n    </div>\n    \n    <div class=\"is--has_subs\">\n        <div class=\"settings-param-title\"><span>\u0421\u0443\u0431\u0442\u0438\u0442\u0440\u044B</span></div>\n\n        <div class=\"settings-param selector\" data-type=\"toggle\" data-name=\"subtitles_start\">\n            <div class=\"settings-param__name\">\u0412\u043A\u043B\u044E\u0447\u0438\u0442\u044C</div>\n            <div class=\"settings-param__value\"></div>\n            <div class=\"settings-param__descr\">\u0412\u0441\u0435\u0433\u0434\u0430 \u0432\u043A\u043B\u044E\u0447\u0430\u0442\u044C \u0441\u0443\u0431\u0442\u0438\u0442\u0440\u044B \u043F\u043E\u0441\u043B\u0435 \u0437\u0430\u043F\u0443\u0441\u043A\u0430 \u0432\u0438\u0434\u0435\u043E</div>\n        </div>\n\n        <div class=\"settings-param selector\" data-type=\"toggle\" data-name=\"subtitles_size\">\n            <div class=\"settings-param__name\">\u0420\u0430\u0437\u043C\u0435\u0440</div>\n            <div class=\"settings-param__value\"></div>\n            <div class=\"settings-param__descr\"></div>\n        </div>\n        \n        <div class=\"settings-param selector\" data-type=\"toggle\" data-name=\"subtitles_stroke\">\n            <div class=\"settings-param__name\">\u0418\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u044C \u043E\u043A\u0430\u043D\u0442\u043E\u0432\u043A\u0443</div>\n            <div class=\"settings-param__value\"></div>\n            <div class=\"settings-param__descr\">\u0421\u0443\u0431\u0442\u0438\u0442\u0440\u044B \u0431\u0443\u0434\u0443\u0442 \u043E\u0431\u0432\u0435\u0434\u0435\u043D\u044B \u0447\u0435\u0440\u043D\u044B\u043C \u0446\u0432\u0435\u0442\u043E\u043C \u0434\u043B\u044F \u0443\u043B\u0443\u0447\u0448\u0435\u043D\u0438\u044F \u0447\u0438\u0442\u0430\u0435\u043C\u043E\u0441\u0442\u0438</div>\n        </div>\n        \n        <div class=\"settings-param selector\" data-type=\"toggle\" data-name=\"subtitles_backdrop\">\n            <div class=\"settings-param__name\">\u0418\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u044C \u043F\u043E\u0434\u043B\u043E\u0436\u043A\u0443</div>\n            <div class=\"settings-param__value\"></div>\n            <div class=\"settings-param__descr\">\u0421\u0443\u0431\u0442\u0438\u0442\u0440\u044B \u0431\u0443\u0434\u0443\u0442 \u043E\u0442\u043E\u0431\u0440\u0430\u0436\u0430\u0442\u044C\u0441\u044F \u043D\u0430 \u043F\u043E\u043B\u0443\u043F\u0440\u043E\u0437\u0440\u0430\u0447\u043D\u043E\u0439 \u043F\u043E\u0434\u043B\u043E\u0436\u043A\u0435 \u0434\u043B\u044F \u0443\u043B\u0443\u0447\u0448\u0435\u043D\u0438\u044F \u0447\u0438\u0442\u0430\u0435\u043C\u043E\u0441\u0442\u0438</div>\n        </div>\n    </div>\n\n    <div class=\"settings-param-title\"><span>\u0415\u0449\u0451</span></div>\n\n    <div class=\"settings-param selector\" data-type=\"toggle\" data-name=\"video_quality_default\">\n        <div class=\"settings-param__name\">\u041A\u0430\u0447\u0435\u0441\u0442\u0432\u043E \u0432\u0438\u0434\u0435\u043E \u043F\u043E \u0443\u043C\u043E\u043B\u0447\u0430\u043D\u0438\u044E</div>\n        <div class=\"settings-param__value\"></div>\n        <div class=\"settings-param__descr\">\u041F\u0440\u0435\u0434\u043F\u043E\u0447\u0442\u0438\u0442\u0435\u043B\u044C\u043D\u043E\u0435 \u043A\u0430\u0447\u0435\u0441\u0442\u0432\u043E \u0432\u0438\u0434\u0435\u043E \u0434\u043B\u044F \u043F\u0440\u043E\u0441\u043C\u043E\u0442\u0440\u0430</div>\n    </div>\n</div>";

    var html$12 = "<div>\n    <div class=\"settings-param selector\" data-type=\"toggle\" data-name=\"start_page\">\n        <div class=\"settings-param__name\">\u0421\u0442\u0430\u0440\u0442\u043E\u0432\u0430\u044F \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0430</div>\n        <div class=\"settings-param__value\"></div>\n        <div class=\"settings-param__descr\">\u0421 \u043A\u0430\u043A\u043E\u0439 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u044B \u043D\u0430\u0447\u0438\u043D\u0430\u0442\u044C \u043F\u0440\u0438 \u0437\u0430\u043F\u0443\u0441\u043A\u0435</div>\n    </div>\n\n    <div class=\"settings-param-title\"><span>\u0418\u0441\u0442\u043E\u0447\u043D\u0438\u043A</span></div>\n\n    <div class=\"settings-param selector\" data-type=\"toggle\" data-name=\"source\">\n        <div class=\"settings-param__name\">\u041E\u0441\u043D\u043E\u0432\u043D\u043E\u0439 \u0438\u0441\u0442\u043E\u0447\u043D\u0438\u043A</div>\n        <div class=\"settings-param__value\"></div>\n        <div class=\"settings-param__descr\">\u041E\u0442\u043A\u0443\u0434\u0430 \u0431\u0440\u0430\u0442\u044C \u0438\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044E \u043E \u0444\u0438\u043B\u044C\u043C\u0430\u0445</div>\n    </div>\n\n    <div class=\"settings-param selector\" data-type=\"toggle\" data-name=\"tmdb_lang\">\n        <div class=\"settings-param__name\">TMDB</div>\n        <div class=\"settings-param__value\"></div>\n        <div class=\"settings-param__descr\">\u041D\u0430 \u043A\u0430\u043A\u043E\u043C \u044F\u0437\u044B\u043A\u0435 \u043E\u0442\u043E\u0431\u0440\u0430\u0436\u0430\u0442\u044C \u0434\u0430\u043D\u043D\u044B\u0435 \u0441 TMDB</div>\n    </div>\n\n    <div class=\"settings-param selector\" data-type=\"toggle\" data-name=\"proxy_tmdb\">\n        <div class=\"settings-param__name\">\u041F\u0440\u043E\u043A\u0441\u0438\u0440\u043E\u0432\u0430\u0442\u044C TMDB</div>\n        <div class=\"settings-param__value\"></div>\n    </div>\n\n    <div class=\"settings-param selector\" data-type=\"toggle\" data-name=\"poster_size\">\n        <div class=\"settings-param__name\">\u0420\u0430\u0437\u0440\u0435\u0448\u0435\u043D\u0438\u0435 \u043F\u043E\u0441\u0442\u0435\u0440\u043E\u0432 TMDB</div>\n        <div class=\"settings-param__value\"></div>\n    </div> \n\n    <div class=\"settings-param-title\"><span>\u0421\u043A\u0440\u0438\u043D\u0441\u0435\u0439\u0432\u0435\u0440</span></div>\n\n    <div class=\"settings-param selector\" data-type=\"toggle\" data-name=\"screensaver\">\n        <div class=\"settings-param__name\">\u041F\u043E\u043A\u0430\u0437\u044B\u0432\u0430\u0442\u044C \u0437\u0430\u0441\u0442\u0430\u0432\u043A\u0443 \u043F\u0440\u0438 \u0431\u0435\u0437\u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0438</div>\n        <div class=\"settings-param__value\"></div>\n    </div>\n\n    <div class=\"settings-param selector\" data-type=\"toggle\" data-name=\"screensaver_type\">\n        <div class=\"settings-param__name\">\u0422\u0438\u043F \u0437\u0430\u0441\u0442\u0430\u0432\u043A\u0438</div>\n        <div class=\"settings-param__value\"></div>\n    </div>\n\n    <div class=\"settings-param-title\"><span>\u041F\u043E\u0434\u0441\u043A\u0430\u0437\u043A\u0438</span></div>\n\n    <div class=\"settings-param selector\" data-type=\"toggle\" data-name=\"helper\">\n        <div class=\"settings-param__name\">\u041F\u043E\u043A\u0430\u0437\u044B\u0432\u0430\u0442\u044C \u043F\u043E\u0434\u0441\u043A\u0430\u0437\u043A\u0438</div>\n        <div class=\"settings-param__value\"></div>\n    </div>\n\n    <div class=\"settings-param selector helper--start-again\" data-static=\"true\">\n        <div class=\"settings-param__name\">\u041F\u043E\u043A\u0430\u0437\u0430\u0442\u044C \u043F\u043E\u0434\u0441\u043A\u0430\u0437\u043A\u0438 \u0441\u043D\u043E\u0432\u0430</div>\n    </div>\n    \n    <div class=\"settings-param-title\"><span>\u0415\u0449\u0451</span></div>\n\n    <div class=\"settings-param selector\" data-type=\"toggle\" data-name=\"pages_save_total\">\n        <div class=\"settings-param__name\">\u0421\u043A\u043E\u043B\u044C\u043A\u043E \u0441\u0442\u0440\u0430\u043D\u0438\u0446 \u0445\u0440\u0430\u043D\u0438\u0442\u044C \u0432 \u043F\u0430\u043C\u044F\u0442\u0438</div>\n        <div class=\"settings-param__value\"></div>\n        <div class=\"settings-param__descr\">\u0425\u0440\u0430\u043D\u0438\u0442 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u044B \u0432 \u0442\u043E\u043C \u0441\u043E\u0441\u0442\u043E\u044F\u043D\u0438\u0438, \u0432 \u043A\u043E\u0442\u043E\u0440\u043E\u043C \u0432\u044B \u0438\u0445 \u043F\u043E\u043A\u0438\u043D\u0443\u043B\u0438.</div>\n    </div>\n\n    <div class=\"settings-param selector\" data-type=\"select\" data-name=\"time_offset\">\n        <div class=\"settings-param__name\">\u0421\u043C\u0435\u0441\u0442\u0438\u0442\u044C \u0432\u0440\u0435\u043C\u044F</div>\n        <div class=\"settings-param__value\"></div>\n    </div>\n\n    <div class=\"settings-param selector\" data-type=\"select\" data-name=\"navigation_type\">\n        <div class=\"settings-param__name\">\u0422\u0438\u043F \u043D\u0430\u0432\u0438\u0433\u0430\u0446\u0438\u0438</div>\n        <div class=\"settings-param__value\"></div>\n    </div>\n\n    <div class=\"settings-param selector\" data-type=\"select\" data-name=\"keyboard_type\">\n        <div class=\"settings-param__name\">\u0422\u0438\u043F \u043A\u043B\u0430\u0432\u0438\u0430\u0442\u0443\u0440\u044B</div>\n        <div class=\"settings-param__value\"></div>\n    </div>\n\n    <div class=\"settings-param selector\" data-type=\"input\" data-name=\"device_name\" placeholder=\"\u041D\u0430\u043F\u0440\u0438\u043C\u0435\u0440: \u041C\u043E\u044F \u041B\u0430\u043C\u043F\u0430\">\n        <div class=\"settings-param__name\">\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u0443\u0441\u0442\u0440\u043E\u0439\u0441\u0442\u0432\u0430</div>\n        <div class=\"settings-param__value\"></div>\n    </div>\n\n    <div class=\"settings-param selector clear-storage\" data-static=\"true\">\n        <div class=\"settings-param__name\">\u041E\u0447\u0438\u0441\u0442\u0438\u0442\u044C \u043A\u0435\u0448</div>\n        <div class=\"settings-param__value\">\u0411\u0443\u0434\u0443\u0442 \u043E\u0447\u0438\u0449\u0435\u043D\u044B \u0432\u0441\u0435 \u043D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438 \u0438 \u0434\u0430\u043D\u043D\u044B\u0435</div>\n    </div>\n</div>";

    var html$11 = "<div>\n    <div class=\"settings-param selector\" data-name=\"plugins\" data-static=\"true\" data-notice=\"\u0414\u043B\u044F \u043F\u0440\u0438\u043C\u0435\u043D\u0435\u043D\u0438\u044F \u043F\u043B\u0430\u0433\u0438\u043D\u0430 \u043D\u0435\u043E\u0431\u0445\u043E\u0434\u0438\u043C\u043E \u043F\u0435\u0440\u0435\u0437\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044C \u043F\u0440\u0438\u043B\u043E\u0436\u0435\u043D\u0438\u0435\">\n        <div class=\"settings-param__name\">\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u043F\u043B\u0430\u0433\u0438\u043D</div>\n        <div class=\"settings-param__descr\">\u0414\u043B\u044F \u0443\u0434\u0430\u043B\u0435\u043D\u0438\u044F \u0434\u043E\u0431\u0430\u0432\u043B\u0435\u043D\u043D\u043E\u0433\u043E \u043F\u043B\u0430\u0433\u0438\u043D\u0430 \u0443\u0434\u0435\u0440\u0436\u0438\u0432\u0430\u0439\u0442\u0435 \u0438\u043B\u0438 \u043D\u0430\u0436\u043C\u0438\u0442\u0435 \u0434\u0432\u0430\u0436\u0434\u044B \u043A\u043B\u0430\u0432\u0438\u0448\u0443 (OK) \u043D\u0430 \u043D\u0435\u043C</div>\n    </div>\n    <div class=\"settings-param selector\" data-name=\"install\" data-static=\"true\">\n        <div class=\"settings-param__name\">\u0423\u0441\u0442\u0430\u043D\u043E\u0432\u0438\u0442\u044C \u043F\u043B\u0430\u0433\u0438\u043D</div>\n        <div class=\"settings-param__descr\">\u0423\u0441\u0442\u0430\u043D\u043E\u0432\u0438\u0442\u044C \u043F\u043B\u0430\u0433\u0438\u043D \u0438\u0437 \u0441\u043F\u0438\u0441\u043A\u0430 \u0434\u043E\u0441\u0442\u0443\u043F\u043D\u044B\u0445</div>\n    </div>\n</div>";

    var html$10 = "<div>\n    <div class=\"settings-param selector\" data-type=\"toggle\" data-name=\"cloud_use\">\n        <div class=\"settings-param__name\">\u0421\u0438\u043D\u0445\u0440\u043E\u043D\u0438\u0437\u0430\u0446\u0438\u044F</div>\n        <div class=\"settings-param__value\"></div>\n        <div class=\"settings-param__descr\">\u0421\u0438\u043D\u0445\u0440\u043E\u043D\u0438\u0437\u0430\u0446\u0438\u044F \u0434\u0430\u0451\u0442 \u0432\u043E\u0437\u043C\u043E\u0436\u043D\u043E\u0441\u0442\u044C \u0441\u0438\u043D\u0445\u0440\u043E\u043D\u0438\u0437\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0432\u0430\u0448\u0438 \u0437\u0430\u043A\u043B\u0430\u0434\u043A\u0438, \u0438\u0441\u0442\u043E\u0440\u0438\u044E \u043F\u0440\u043E\u0441\u043C\u043E\u0442\u0440\u043E\u0432, \u043C\u0435\u0442\u043A\u0438 \u0438 \u0442\u0430\u0439\u043C-\u043A\u043E\u0434\u044B. \u0418\u043D\u0441\u0442\u0440\u0443\u043A\u0446\u0438\u044F \u043F\u043E \u043F\u043E\u0434\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u044E https://github.com/yumata/lampa/wiki</div>\n    </div>\n\n    <div class=\"settings-param-title\"><span>\u0410\u0432\u0442\u043E\u0440\u0438\u0437\u0430\u0446\u0438\u044F</span></div>\n\n    <div class=\"settings-param selector\" data-type=\"input\" data-name=\"cloud_token\" placeholder=\"\u041D\u0435 \u0443\u043A\u0430\u0437\u0430\u043D\">\n        <div class=\"settings-param__name\">Token</div>\n        <div class=\"settings-param__value\"></div>\n    </div>\n\n    <div class=\"settings-param-title\"><span>\u0421\u0442\u0430\u0442\u0443\u0441</span></div>\n\n    <div class=\"settings-param selector settings--cloud-status\" data-static=\"true\">\n        <div class=\"settings-param__name\"></div>\n        <div class=\"settings-param__descr\"></div>\n    </div>\n</div>";

    var html$$ = "<div>\n    <div class=\"settings-param selector\" data-type=\"toggle\" data-name=\"account_use\">\n        <div class=\"settings-param__name\">\u0421\u0438\u043D\u0445\u0440\u043E\u043D\u0438\u0437\u0430\u0446\u0438\u044F</div>\n        <div class=\"settings-param__value\"></div>\n        <div class=\"settings-param__descr\">\u0421\u0438\u043D\u0445\u0440\u043E\u043D\u0438\u0437\u0430\u0446\u0438\u044F \u0441 \u0441\u0435\u0440\u0432\u0438\u0441\u043E\u043C CUB: \u0441\u0438\u043D\u0445\u0440\u043E\u043D\u0438\u0437\u0430\u0446\u0438\u044F \u0432\u0430\u0448\u0438\u0445 \u0437\u0430\u043A\u043B\u0430\u0434\u043E\u043A, \u0438\u0441\u0442\u043E\u0440\u0438\u0438 \u043F\u0440\u043E\u0441\u043C\u043E\u0442\u0440\u043E\u0432, \u043C\u0435\u0442\u043E\u043A \u0438 \u0442\u0430\u0439\u043C-\u043A\u043E\u0434\u043E\u0432. \u0421\u0430\u0439\u0442: https://cub.watch</div>\n    </div>\n\n    <div class=\"settings-param-title settings--account-user hide\"><span>\u0410\u043A\u043A\u0430\u0443\u043D\u0442</span></div>\n\n    <div class=\"settings-param selector settings--account-user settings--account-user-info hide\" data-static=\"true\">\n        <div class=\"settings-param__name\">\u0412\u043E\u0448\u043B\u0438 \u043A\u0430\u043A</div>\n        <div class=\"settings-param__value\"></div>\n    </div>\n\n    <div class=\"settings-param selector settings--account-user settings--account-user-profile hide\" data-static=\"true\">\n        <div class=\"settings-param__name\">\u041F\u0440\u043E\u0444\u0438\u043B\u044C</div>\n        <div class=\"settings-param__value\"></div>\n    </div>\n\n    <div class=\"settings-param selector settings--account-user settings--account-user-sync hide\" data-static=\"true\">\n        <div class=\"settings-param__name\">\u0421\u0438\u043D\u0445\u0440\u043E\u043D\u0438\u0437\u0438\u0440\u043E\u0432\u0430\u0442\u044C</div>\n        <div class=\"settings-param__value\">\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C \u043B\u043E\u043A\u0430\u043B\u044C\u043D\u044B\u0435 \u0437\u0430\u043A\u043B\u0430\u0434\u043A\u0438 \u0432 \u0430\u043A\u043A\u0430\u0443\u043D\u0442 CUB</div>\n    </div>\n\n    <div class=\"settings-param selector settings--account-user settings--account-user-backup hide\" data-static=\"true\">\n        <div class=\"settings-param__name\">\u0411\u044D\u043A\u0430\u043F</div>\n        <div class=\"settings-param__value\">\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C \u0438\u043B\u0438 \u0437\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044C \u0431\u044D\u043A\u0430\u043F \u0434\u0430\u043D\u043D\u044B\u0445</div>\n    </div>\n\n    <div class=\"settings-param selector settings--account-user settings--account-user-out hide\" data-static=\"true\">\n        <div class=\"settings-param__name\">\u0412\u044B\u0439\u0442\u0438 \u0438\u0437 \u0430\u043A\u043A\u0430\u0443\u043D\u0442\u0430</div>\n    </div>\n\n    <div class=\"settings-param-title settings--account-signin\"><span>\u0410\u0432\u0442\u043E\u0440\u0438\u0437\u0430\u0446\u0438\u044F</span></div>\n\n    <div class=\"settings-param selector settings--account-signin\" data-type=\"input\" data-name=\"account_email\" placeholder=\"\u041D\u0435 \u0443\u043A\u0430\u0437\u0430\u043D\">\n        <div class=\"settings-param__name\">Email</div>\n        <div class=\"settings-param__value\"></div>\n    </div>\n\n    <div class=\"settings-param selector settings--account-signin\" data-type=\"input\" data-string=\"true\" data-name=\"account_password\" placeholder=\"\u041D\u0435 \u0443\u043A\u0430\u0437\u0430\u043D\">\n        <div class=\"settings-param__name\">\u041F\u0430\u0440\u043E\u043B\u044C</div>\n        <div class=\"settings-param__value\"></div>\n    </div>\n\n    <div class=\"settings-param-title\"><span>\u0421\u0442\u0430\u0442\u0443\u0441</span></div>\n\n    <div class=\"settings-param selector settings--account-status\" data-static=\"true\">\n        <div class=\"settings-param__value\"></div>\n        <div class=\"settings-param__descr\"></div>\n    </div>\n</div>";

    var html$_ = "<div class=\"items-line\">\n    <div class=\"items-line__head\">\n        <div class=\"items-line__title\">{title}</div>\n    </div>\n    <div class=\"items-line__body\"></div>\n</div>";

    var html$Z = "<div class=\"card selector\">\n    <div class=\"card__view\">\n        <img src=\"./img/img_load.svg\" class=\"card__img\" />\n\n        <div class=\"card__icons\">\n            <div class=\"card__icons-inner\">\n                \n            </div>\n        </div>\n    </div>\n\n    <div class=\"card__title\">{title}</div>\n    <div class=\"card__age\">{release_year}</div>\n</div>";

    var html$Y = "<div class=\"card-parser selector\">\n    <div class=\"card-parser__title\">{Title}</div>\n\n    <div class=\"card-parser__footer\">\n        <div class=\"card-parser__details\">\n            <div>\u0420\u0430\u0437\u0434\u0430\u044E\u0442: <span>{Seeders}</span></div>\n            <div>\u041A\u0430\u0447\u0430\u044E\u0442: <span>{Peers}</span></div>\n        </div>\n        <div class=\"card-parser__size\">{size}</div>\n    </div>\n</div>";

    var html$X = "<div class=\"card-watched\">\n    <div class=\"card-watched__inner\">\n        <div class=\"card-watched__title\">\u0412\u044B \u0441\u043C\u043E\u0442\u0440\u0435\u043B\u0438</div>\n        <div class=\"card-watched__body\"></div>\n    </div>\n</div>";

    var html$W = "<div class=\"full-start\">\n\n    <div class=\"full-start__body\">\n        <div class=\"full-start__right\">\n            <div class=\"full-start__poster\">\n                <img class=\"full-start__img\" />\n\n                <div class=\"info__rate\"><span>{r_themovie}</span></div>\n            </div>\n        </div>\n\n        <div class=\"full-start__left\">\n            <div class=\"full-start__tags\">\n                <div class=\"full-start__tag tag--genres\">\n                    <img src=\"./img/icons/pulse.svg\" /> <div>{genres}</div>\n                </div>\n                <div class=\"full-start__tag tag--time\">\n                    <img src=\"./img/icons/time.svg\" /> <div>{time}</div>\n                </div>\n                <div class=\"full-start__tag hide is--serial\">\n                    <img src=\"./img/icons/menu/catalog.svg\" /> <div>{seasons}</div>\n                </div>\n                <div class=\"full-start__tag hide is--serial\">\n                    <img src=\"./img/icons/menu/movie.svg\" /> <div>{episodes}</div>\n                </div>\n                <div class=\"full-start__tag tag--episode hide\">\n                    <img src=\"./img/icons/time.svg\" /> <div></div>\n                </div>\n            </div>\n\n            <div class=\"full-start__title\">{title}</div>\n            <div class=\"full-start__title-original\">{original_title}</div>\n\n            <div class=\"full-start__descr\">{descr}</div>\n        </div>\n    </div>\n\n    <div class=\"full-start__footer\">\n        <div class=\"full-start__title-mobile\">{title}</div>\n\n        <div class=\"full-start__buttons-line\">\n            <div class=\"full-start__buttons-scroll\"></div>\n\n            <div class=\"full-start__buttons\">\n                <div class=\"full-start__button view--torrent hide\">\n                    <svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" xmlns:svgjs=\"http://svgjs.com/svgjs\" version=\"1.1\" width=\"512\" height=\"512\" x=\"0\" y=\"0\" viewBox=\"0 0 30.051 30.051\" style=\"enable-background:new 0 0 512 512\" xml:space=\"preserve\" class=\"\">\n                        <path d=\"M19.982,14.438l-6.24-4.536c-0.229-0.166-0.533-0.191-0.784-0.062c-0.253,0.128-0.411,0.388-0.411,0.669v9.069   c0,0.284,0.158,0.543,0.411,0.671c0.107,0.054,0.224,0.081,0.342,0.081c0.154,0,0.31-0.049,0.442-0.146l6.24-4.532   c0.197-0.145,0.312-0.369,0.312-0.607C20.295,14.803,20.177,14.58,19.982,14.438z\" fill=\"currentColor\"/>\n                        <path d=\"M15.026,0.002C6.726,0.002,0,6.728,0,15.028c0,8.297,6.726,15.021,15.026,15.021c8.298,0,15.025-6.725,15.025-15.021   C30.052,6.728,23.324,0.002,15.026,0.002z M15.026,27.542c-6.912,0-12.516-5.601-12.516-12.514c0-6.91,5.604-12.518,12.516-12.518   c6.911,0,12.514,5.607,12.514,12.518C27.541,21.941,21.937,27.542,15.026,27.542z\" fill=\"currentColor\"/>\n                    </svg>\n\n                    <span>\u0422\u043E\u0440\u0440\u0435\u043D\u0442\u044B</span>\n                </div>\n\n                <div class=\"full-start__button selector view--trailer\">\n                    <svg version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\" viewBox=\"0 0 512 512\" style=\"enable-background:new 0 0 512 512;\" xml:space=\"preserve\">\n                        <path fill=\"currentColor\" d=\"M482.909,67.2H29.091C13.05,67.2,0,80.25,0,96.291v319.418C0,431.75,13.05,444.8,29.091,444.8h453.818\n                            c16.041,0,29.091-13.05,29.091-29.091V96.291C512,80.25,498.95,67.2,482.909,67.2z M477.091,409.891H34.909V102.109h442.182\n                            V409.891z\"/>\n                        <rect fill=\"currentColor\" x=\"126.836\" y=\"84.655\" width=\"34.909\" height=\"342.109\"/>\n                        <rect fill=\"currentColor\" x=\"350.255\" y=\"84.655\" width=\"34.909\" height=\"342.109\"/>\n                        <rect fill=\"currentColor\" x=\"367.709\" y=\"184.145\" width=\"126.836\" height=\"34.909\"/>\n                        <rect fill=\"currentColor\" x=\"17.455\" y=\"184.145\" width=\"126.836\" height=\"34.909\"/>\n                        <rect fill=\"currentColor\" x=\"367.709\" y=\"292.364\" width=\"126.836\" height=\"34.909\"/>\n                        <rect fill=\"currentColor\" x=\"17.455\" y=\"292.364\" width=\"126.836\" height=\"34.909\"/>\n                    </svg>\n\n                    <span>\u0422\u0440\u0435\u0439\u043B\u0435\u0440\u044B</span>\n                </div>\n\n                \n\n                <div class=\"full-start__button selector open--menu\">\n                    <svg version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\" viewBox=\"0 0 512 512\" style=\"enable-background:new 0 0 512 512;\" xml:space=\"preserve\">\n                        <path fill=\"currentColor\" d=\"M436.742,180.742c-41.497,0-75.258,33.761-75.258,75.258s33.755,75.258,75.258,75.258\n                            C478.239,331.258,512,297.503,512,256C512,214.503,478.239,180.742,436.742,180.742z M436.742,294.246\n                            c-21.091,0-38.246-17.155-38.246-38.246s17.155-38.246,38.246-38.246s38.246,17.155,38.246,38.246\n                            S457.833,294.246,436.742,294.246z\"/>\n                    \n                        <path fill=\"currentColor\" d=\"M256,180.742c-41.497,0-75.258,33.761-75.258,75.258s33.761,75.258,75.258,75.258c41.503,0,75.258-33.755,75.258-75.258\n                            C331.258,214.503,297.503,180.742,256,180.742z M256,294.246c-21.091,0-38.246-17.155-38.246-38.246s17.155-38.246,38.246-38.246\n                            s38.246,17.155,38.246,38.246S277.091,294.246,256,294.246z\"/>\n                    \n                        <path fill=\"currentColor\" d=\"M75.258,180.742C33.761,180.742,0,214.503,0,256c0,41.503,33.761,75.258,75.258,75.258\n                            c41.497,0,75.258-33.755,75.258-75.258C150.516,214.503,116.755,180.742,75.258,180.742z M75.258,294.246\n                            c-21.091,0-38.246-17.155-38.246-38.246s17.155-38.246,38.246-38.246c21.091,0,38.246,17.155,38.246,38.246\n                            S96.342,294.246,75.258,294.246z\"/>\n                    </svg>\n                </div>\n\n                \n            </div>\n\n            <div class=\"full-start__icons\">\n                <div class=\"info__icon icon--book selector\" data-type=\"book\"></div>\n                <div class=\"info__icon icon--like selector\" data-type=\"like\"></div>\n                <div class=\"info__icon icon--wath selector\" data-type=\"wath\"></div>\n            </div>\n        </div>\n\n    </div>\n</div>";

    var html$V = "<div class=\"full-descr\">\n    <div class=\"full-descr__left\">\n        <div class=\"full-descr__text\">{text}</div>\n\n        <div class=\"full-descr__line full--genres\">\n            <div class=\"full-descr__line-name\">\u0416\u0430\u043D\u0440</div>\n            <div class=\"full-descr__line-body\">{genres}</div>\n        </div>\n\n        <div class=\"full-descr__line full--companies\">\n            <div class=\"full-descr__line-name\">\u041F\u0440\u043E\u0438\u0437\u0432\u043E\u0434\u0441\u0442\u0432\u043E</div>\n            <div class=\"full-descr__line-body\">{companies}</div>\n        </div>\n    </div>\n\n    <div class=\"full-descr__right\">\n        <div class=\"full-descr__info\">\n            <div class=\"full-descr__info-name\">\u0414\u0430\u0442\u0430 \u0440\u0435\u043B\u0438\u0437\u0430</div>\n            <div class=\"full-descr__info-body\">{relise}</div>\n        </div>\n\n        <div class=\"full-descr__info\">\n            <div class=\"full-descr__info-name\">\u0411\u044E\u0434\u0436\u0435\u0442</div>\n            <div class=\"full-descr__info-body\">{budget}</div>\n        </div>\n\n        <div class=\"full-descr__info\">\n            <div class=\"full-descr__info-name\">\u0421\u0442\u0440\u0430\u043D\u044B</div>\n            <div class=\"full-descr__info-body\">{countries}</div>\n        </div>\n    </div>\n</div>";

    var html$U = "<div class=\"full-person selector\">\n    <div style=\"background-image: url('{img}');\" class=\"full-person__photo\"></div>\n\n    <div class=\"full-person__body\">\n        <div class=\"full-person__name\">{name}</div>\n        <div class=\"full-person__role\">{role}</div>\n    </div>\n</div>";

    var html$T = "<div class=\"full-review selector\">\n    <div class=\"full-review__text\">{text}</div>\n\n    <div class=\"full-review__footer\">\u041D\u0440\u0430\u0432\u0438\u0442\u0441\u044F: {like_count}</div>\n</div>";

    var html$S = "<div class=\"full-episode selector\">\n    <div class=\"full-episode__left\">\n        <div class=\"full-episode__img\">\n            <img />\n        </div>\n    </div>\n\n    <div class=\"full-episode__body\">\n        <div class=\"full-episode__name\">{name}</div>\n        <div class=\"full-episode__date\">{date}</div>\n    </div>\n</div>";

    var html$R = "<div class=\"player\">\n    \n</div>";

    var html$Q = "<div class=\"player-panel\">\n\n    <div class=\"player-panel__body\">\n        <div class=\"player-panel__timeline selector\">\n            <div class=\"player-panel__peding\"></div>\n            <div class=\"player-panel__position\"><div></div></div>\n            <div class=\"player-panel__time hide\"></div>\n        </div>\n\n        <div class=\"player-panel__line\">\n            <div class=\"player-panel__timenow\"></div>\n            <div class=\"player-panel__timeend\"></div>\n        </div>\n\n        <div class=\"player-panel__line\">\n            <div class=\"player-panel__left\">\n                <div class=\"player-panel__prev button selector hide\">\n                    <svg width=\"23\" height=\"24\" viewBox=\"0 0 23 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                    <path d=\"M2.75 13.7698C1.41666 13 1.41667 11.0755 2.75 10.3057L20 0.34638C21.3333 -0.42342 23 0.538831 23 2.07843L23 21.997C23 23.5366 21.3333 24.4989 20 23.7291L2.75 13.7698Z\" fill=\"currentColor\"/>\n                    <rect x=\"6\" y=\"24\" width=\"6\" height=\"24\" rx=\"2\" transform=\"rotate(180 6 24)\" fill=\"currentColor\"/>\n                    </svg>\n                </div>\n                <div class=\"player-panel__next button selector hide\">\n                    <svg width=\"23\" height=\"24\" viewBox=\"0 0 23 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                    <path d=\"M20.25 10.2302C21.5833 11 21.5833 12.9245 20.25 13.6943L3 23.6536C1.66666 24.4234 -6.72981e-08 23.4612 0 21.9216L8.70669e-07 2.00298C9.37967e-07 0.463381 1.66667 -0.498867 3 0.270933L20.25 10.2302Z\" fill=\"currentColor\"/>\n                    <rect x=\"17\" width=\"6\" height=\"24\" rx=\"2\" fill=\"currentColor\"/>\n                    </svg>\n                </div>\n\n                <div class=\"player-panel__next-episode-name hide\"></div>\n            </div>\n            <div class=\"player-panel__center\">\n                <div class=\"player-panel__tstart button selector\">\n                    <svg width=\"35\" height=\"24\" viewBox=\"0 0 35 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                    <path d=\"M14.75 10.2302C13.4167 11 13.4167 12.9245 14.75 13.6943L32 23.6536C33.3333 24.4234 35 23.4612 35 21.9216L35 2.00298C35 0.463381 33.3333 -0.498867 32 0.270933L14.75 10.2302Z\" fill=\"currentColor\"/>\n                    <path d=\"M1.75 10.2302C0.416665 11 0.416667 12.9245 1.75 13.6943L19 23.6536C20.3333 24.4234 22 23.4612 22 21.9216L22 2.00298C22 0.463381 20.3333 -0.498867 19 0.270933L1.75 10.2302Z\" fill=\"currentColor\"/>\n                    <rect width=\"6\" height=\"24\" rx=\"2\" transform=\"matrix(-1 0 0 1 6 0)\" fill=\"currentColor\"/>\n                    </svg>\n                </div>\n                <div class=\"player-panel__rprev button selector\">\n                    <svg width=\"35\" height=\"25\" viewBox=\"0 0 35 25\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                    <path d=\"M14 10.7679C12.6667 11.5377 12.6667 13.4622 14 14.232L31.25 24.1913C32.5833 24.9611 34.25 23.9989 34.25 22.4593L34.25 2.5407C34.25 1.0011 32.5833 0.0388526 31.25 0.808653L14 10.7679Z\" fill=\"currentColor\"/>\n                    <path d=\"M0.999998 10.7679C-0.333335 11.5377 -0.333333 13.4622 1 14.232L18.25 24.1913C19.5833 24.9611 21.25 23.9989 21.25 22.4593L21.25 2.5407C21.25 1.0011 19.5833 0.0388526 18.25 0.808653L0.999998 10.7679Z\" fill=\"currentColor\"/>\n                    </svg>\n                </div>\n                <div class=\"player-panel__playpause button selector\">\n                    <div>\n                        <svg width=\"22\" height=\"25\" viewBox=\"0 0 22 25\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                        <path d=\"M21 10.7679C22.3333 11.5377 22.3333 13.4622 21 14.232L3.75 24.1913C2.41666 24.9611 0.75 23.9989 0.75 22.4593L0.750001 2.5407C0.750001 1.0011 2.41667 0.0388526 3.75 0.808653L21 10.7679Z\" fill=\"currentColor\"/>\n                        </svg>\n                    </div>\n                    <div>\n                        <svg width=\"19\" height=\"25\" viewBox=\"0 0 19 25\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                        <rect width=\"6\" height=\"25\" rx=\"2\" fill=\"currentColor\"/>\n                        <rect x=\"13\" width=\"6\" height=\"25\" rx=\"2\" fill=\"currentColor\"/>\n                        </svg>                    \n                    </div>\n                </div>\n                <div class=\"player-panel__rnext button selector\">\n                    <svg width=\"35\" height=\"25\" viewBox=\"0 0 35 25\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                    <path d=\"M20.25 10.7679C21.5833 11.5377 21.5833 13.4622 20.25 14.232L3 24.1913C1.66666 24.9611 -6.72981e-08 23.9989 0 22.4593L8.70669e-07 2.5407C9.37967e-07 1.0011 1.66667 0.0388526 3 0.808653L20.25 10.7679Z\" fill=\"currentColor\"/>\n                    <path d=\"M33.25 10.7679C34.5833 11.5377 34.5833 13.4622 33.25 14.232L16 24.1913C14.6667 24.9611 13 23.9989 13 22.4593L13 2.5407C13 1.0011 14.6667 0.0388526 16 0.808653L33.25 10.7679Z\" fill=\"currentColor\"/>\n                    </svg>\n                </div>\n                <div class=\"player-panel__tend button selector\">\n                    <svg width=\"35\" height=\"24\" viewBox=\"0 0 35 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                    <path d=\"M20.25 10.2302C21.5833 11 21.5833 12.9245 20.25 13.6943L3 23.6536C1.66666 24.4234 -6.72981e-08 23.4612 0 21.9216L8.70669e-07 2.00298C9.37967e-07 0.463381 1.66667 -0.498867 3 0.270933L20.25 10.2302Z\" fill=\"currentColor\"/>\n                    <path d=\"M33.25 10.2302C34.5833 11 34.5833 12.9245 33.25 13.6943L16 23.6536C14.6667 24.4234 13 23.4612 13 21.9216L13 2.00298C13 0.463381 14.6667 -0.498867 16 0.270933L33.25 10.2302Z\" fill=\"currentColor\"/>\n                    <rect x=\"29\" width=\"6\" height=\"24\" rx=\"2\" fill=\"currentColor\"/>\n                    </svg>\n                </div>\n            </div>\n            <div class=\"player-panel__right\">\n                <div class=\"player-panel__quality button selector hide\">auto</div>\n                <div class=\"player-panel__playlist button selector hide\">\n                    <svg width=\"25\" height=\"25\" viewBox=\"0 0 25 25\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                    <rect y=\"5\" width=\"5\" height=\"25\" rx=\"2\" transform=\"rotate(-90 0 5)\" fill=\"currentColor\"/>\n                    <rect y=\"15\" width=\"5\" height=\"25\" rx=\"2\" transform=\"rotate(-90 0 15)\" fill=\"currentColor\"/>\n                    <rect y=\"25\" width=\"5\" height=\"25\" rx=\"2\" transform=\"rotate(-90 0 25)\" fill=\"currentColor\"/>\n                    </svg>\n                </div>\n                <div class=\"player-panel__subs button selector hide\">\n                    <svg width=\"23\" height=\"25\" viewBox=\"0 0 23 25\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                    <path d=\"M22.4357 20.0861C20.1515 23.0732 16.5508 25 12.5 25C5.59644 25 0 19.4036 0 12.5C0 5.59644 5.59644 0 12.5 0C16.5508 0 20.1515 1.9268 22.4357 4.9139L18.8439 7.84254C17.2872 6.09824 15.0219 5 12.5 5C7.80558 5 5 7.80558 5 12.5C5 17.1944 7.80558 20 12.5 20C15.0219 20 17.2872 18.9018 18.8439 17.1575L22.4357 20.0861Z\" fill=\"currentColor\"/>\n                    </svg>\n                </div>\n                <div class=\"player-panel__tracks button selector hide\">\n                    <svg width=\"24\" height=\"31\" viewBox=\"0 0 24 31\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                    <rect x=\"5\" width=\"14\" height=\"23\" rx=\"7\" fill=\"currentColor\"/>\n                    <path d=\"M3.39272 18.4429C3.08504 17.6737 2.21209 17.2996 1.44291 17.6073C0.673739 17.915 0.299615 18.7879 0.607285 19.5571L3.39272 18.4429ZM23.3927 19.5571C23.7004 18.7879 23.3263 17.915 22.5571 17.6073C21.7879 17.2996 20.915 17.6737 20.6073 18.4429L23.3927 19.5571ZM0.607285 19.5571C2.85606 25.179 7.44515 27.5 12 27.5V24.5C8.55485 24.5 5.14394 22.821 3.39272 18.4429L0.607285 19.5571ZM12 27.5C16.5549 27.5 21.1439 25.179 23.3927 19.5571L20.6073 18.4429C18.8561 22.821 15.4451 24.5 12 24.5V27.5Z\" fill=\"currentColor\"/>\n                    <rect x=\"10\" y=\"25\" width=\"4\" height=\"6\" rx=\"2\" fill=\"currentColor\"/>\n                    </svg>\n                </div>\n                <div class=\"player-panel__size button selector hide\">\n                    <svg width=\"25\" height=\"23\" viewBox=\"0 0 25 23\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                    <rect x=\"1\" y=\"1\" width=\"23\" height=\"21\" rx=\"3\" stroke=\"currentColor\" stroke-width=\"2\"/>\n                    <path d=\"M19.1055 3.78684C19.7724 3.61219 20.3878 4.22757 20.2132 4.89452L19.2308 8.64611C19.0561 9.31306 18.2225 9.53136 17.7301 9.03906L14.9609 6.26984C14.4686 5.77754 14.6869 4.94386 15.3539 4.76921L19.1055 3.78684Z\" fill=\"currentColor\"/>\n                    <path d=\"M15.5441 6.53738C16.067 6.01448 16.9203 6.02007 17.4501 6.54987C17.9799 7.07966 17.9855 7.93304 17.4626 8.45594L14.9379 10.9807C14.415 11.5036 13.5616 11.498 13.0318 10.9682C12.502 10.4384 12.4964 9.58505 13.0193 9.06215L15.5441 6.53738Z\" fill=\"currentColor\"/>\n                    <path d=\"M5.89453 19.2064C5.22758 19.3811 4.6122 18.7657 4.78684 18.0988L5.76922 14.3472C5.94386 13.6802 6.77755 13.4619 7.26985 13.9542L10.0391 16.7234C10.5314 17.2157 10.3131 18.0494 9.64611 18.2241L5.89453 19.2064Z\" fill=\"currentColor\"/>\n                    <path d=\"M9.45594 16.4559C8.93304 16.9788 8.07966 16.9732 7.54986 16.4434C7.02006 15.9136 7.01447 15.0602 7.53737 14.5373L10.0621 12.0126C10.585 11.4897 11.4384 11.4953 11.9682 12.0251C12.498 12.5549 12.5036 13.4082 11.9807 13.9311L9.45594 16.4559Z\" fill=\"currentColor\"/>\n                    </svg>\n                </div>\n                <div class=\"player-panel__share button selector hide\">\n                    <svg width=\"25\" height=\"23\" viewBox=\"0 0 25 23\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                    <path d=\"M6 0H4C1.79086 0 0 1.79086 0 4V19C0 21.2091 1.79086 23 4 23H21C23.2091 23 25 21.2091 25 19V4C25 1.79086 23.2091 0 21 0H19V2H21C22.1046 2 23 2.89543 23 4V19C23 20.1046 22.1046 21 21 21H4C2.89543 21 2 20.1046 2 19V4C2 2.89543 2.89543 2 4 2H6V0Z\" fill=\"currentColor\"/>\n                    <path d=\"M11.5428 0.590908C11.9682 -0.196971 13.0318 -0.196969 13.4572 0.59091L15.8503 5.02273C16.2757 5.81061 15.7439 6.79545 14.893 6.79545H10.1069C9.25609 6.79545 8.7243 5.81061 9.14973 5.02273L11.5428 0.590908Z\" fill=\"currentColor\"/>\n                    <path d=\"M10.8421 6.5C10.8421 5.52095 11.5843 4.72727 12.5 4.72727C13.4157 4.72727 14.158 5.52095 14.158 6.5V11.2273C14.158 12.2063 13.4157 13 12.5 13C11.5843 13 10.8421 12.2063 10.8421 11.2273V6.5Z\" fill=\"currentColor\"/>\n                    </svg>\n                </div>\n                <div class=\"player-panel__fullscreen button selector\">\n                    <svg width=\"25\" height=\"23\" viewBox=\"0 0 25 23\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                    <path d=\"M17 23H21C23.2091 23 25 21.2091 25 19V15H23V19C23 20.1046 22.1046 21 21 21H17V23Z\" fill=\"currentColor\"/>\n                    <path d=\"M17 2H21C22.1046 2 23 2.89543 23 4V8H25V4C25 1.79086 23.2091 0 21 0H17V2Z\" fill=\"currentColor\"/>\n                    <path d=\"M8 0L8 2H4C2.89543 2 2 2.89543 2 4V8H0V4C0 1.79086 1.79086 0 4 0H8Z\" fill=\"currentColor\"/>\n                    <path d=\"M8 21V23H4C1.79086 23 0 21.2091 0 19V15H2V19C2 20.1046 2.89543 21 4 21H8Z\" fill=\"currentColor\"/>\n                    </svg>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>";

    var html$P = "<div class=\"player-video\">\n    <div class=\"player-video__display\"></div>\n    <div class=\"player-video__loader\"></div>\n    <div class=\"player-video__paused hide\">\n        <svg width=\"19\" height=\"25\" viewBox=\"0 0 19 25\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n            <rect width=\"6\" height=\"25\" rx=\"2\" fill=\"white\"/>\n            <rect x=\"13\" width=\"6\" height=\"25\" rx=\"2\" fill=\"white\"/>\n        </svg>\n    </div>\n    <div class=\"player-video__subtitles hide\">\n        <div class=\"player-video__subtitles-text\"></div>\n    </div>\n</div>";

    var html$O = "<div class=\"player-info\">\n    <div class=\"player-info__body\">\n        <div class=\"player-info__line\">\n            <div class=\"player-info__name\"></div>\n            <div class=\"player-info__time\"><span class=\"time--clock\"></span></div>\n        </div>\n\n        <div class=\"player-info__values\">\n            <div class=\"value--size\">\n                <span>\u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430...</span>\n            </div>\n            <div class=\"value--stat\">\n                <span></span>\n            </div>\n            <div class=\"value--speed\">\n                <span></span>\n            </div>\n        </div>\n\n        <div class=\"player-info__error hide\"></div>\n    </div>\n</div>";

    var html$N = "<div class=\"selectbox\">\n    <div class=\"selectbox__layer\"></div>\n    <div class=\"selectbox__content layer--height\">\n        <div class=\"selectbox__head\">\n            <div class=\"selectbox__title\"></div>\n        </div>\n        <div class=\"selectbox__body\"></div>\n    </div>\n</div>";

    var html$M = "<div class=\"selectbox-item selector\">\n    <div class=\"selectbox-item__title\">{title}</div>\n    <div class=\"selectbox-item__subtitle\">{subtitle}</div>\n</div>";

    var html$L = "<div class=\"info layer--width\">\n    <div class=\"info__rate\"><span></span></div>\n    <div class=\"info__left\">\n        <div class=\"info__title\"></div>\n        <div class=\"info__title-original\"></div>\n    </div>\n    <div class=\"info__right\">\n        <div class=\"info__icon icon--book\"></div>\n        <div class=\"info__icon icon--like\"></div>\n        <div class=\"info__icon icon--wath\"></div>\n    </div>\n</div>";

    var html$K = "<div>\n    <div class=\"simple-button selector filter--search\">\n            <svg version=\"1.1\" id=\"Capa_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\"\n            viewBox=\"0 0 512 512\" style=\"enable-background:new 0 0 512 512;\" xml:space=\"preserve\">\n        <g>\n            <path fill=\"currentColor\" d=\"M225.474,0C101.151,0,0,101.151,0,225.474c0,124.33,101.151,225.474,225.474,225.474\n                c124.33,0,225.474-101.144,225.474-225.474C450.948,101.151,349.804,0,225.474,0z M225.474,409.323\n                c-101.373,0-183.848-82.475-183.848-183.848S124.101,41.626,225.474,41.626s183.848,82.475,183.848,183.848\n                S326.847,409.323,225.474,409.323z\"/>\n        </g>\n        <g>\n            <path fill=\"currentColor\" d=\"M505.902,476.472L386.574,357.144c-8.131-8.131-21.299-8.131-29.43,0c-8.131,8.124-8.131,21.306,0,29.43l119.328,119.328\n                c4.065,4.065,9.387,6.098,14.715,6.098c5.321,0,10.649-2.033,14.715-6.098C514.033,497.778,514.033,484.596,505.902,476.472z\"/>\n        </g>\n\n        </svg>\n\n        <span>\u0423\u0442\u043E\u0447\u043D\u0438\u0442\u044C</span>\n    </div>\n    <div class=\"simple-button simple-button--filter selector filter--sort\">\n        <span>\u0421\u043E\u0440\u0442\u0438\u0440\u043E\u0432\u0430\u0442\u044C</span><div class=\"hide\"></div>\n    </div>\n\n    <div class=\"simple-button simple-button--filter selector filter--filter\">\n        <span>\u0424\u0438\u043B\u044C\u0442\u0440</span><div class=\"hide\"></div>\n    </div>\n</div>";

    var html$J = "<div class=\"card-more selector\">\n    <div class=\"card-more__box\">\n        <div class=\"card-more__title\">\n            \u0415\u0449\u0451\n        </div>\n    </div>\n</div>";

    var html$I = "<div class=\"search\">\n    <div class=\"search__left\">\n        <div class=\"search__title\">\u041F\u043E\u0438\u0441\u043A</div>\n        <div class=\"search__input\">\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0442\u0435\u043A\u0441\u0442...</div>\n        <div class=\"search__keypad\"><div class=\"simple-keyboard\"></div></div>\n        <div class=\"search__history\"></div>\n    </div>\n    <div class=\"search__results\"></div>\n</div>";

    var html$H = "<div class=\"settings-input\">\n    <div class=\"settings-input__content\">\n        <div class=\"settings-input__input\"></div>\n\n        <div class=\"simple-keyboard\"></div>\n\n        <div class=\"settings-input__links\">\u0418\u0437\u0431\u0440\u0430\u043D\u043D\u043E\u0435</div>\n    </div>\n</div>";

    var html$G = "<div class=\"modal\">\n    <div class=\"modal__content\">\n        <div class=\"modal__head\">\n            <div class=\"modal__title\">{title}</div>\n        </div>\n        <div class=\"modal__body\">\n            \n        </div>\n    </div>\n</div>";

    var html$F = "<div class=\"company\">\n    <div class=\"company__name\">{name}</div>\n    <div class=\"company__headquarters\">\u0428\u0442\u0430\u0431: {headquarters}</div>\n    <div class=\"company__homepage\">\u0421\u0430\u0439\u0442: {homepage}</div>\n    <div class=\"company__country\">\u0421\u0442\u0440\u0430\u043D\u0430: {origin_country}</div>\n</div>";

    var html$E = "<div class=\"modal-loading\">\n    \n</div>";

    var html$D = "<div class=\"modal-pending\">\n    <div class=\"modal-pending__loading\"></div>\n    <div class=\"modal-pending__text\">{text}</div>\n</div>";

    var html$C = "<div class=\"person-start\">\n\n    <div class=\"person-start__body\">\n        <div class=\"person-start__right\">\n            <div class=\"person-start__poster\">\n                <img src=\"{img}\" class=\"person-start__img\" />\n            </div>\n        </div>\n\n        <div class=\"person-start__left\">\n            <div class=\"person-start__tags\">\n                <div class=\"person-start__tag\">\n                    <img src=\"./img/icons/pulse.svg\" /> <div>{birthday}</div>\n                </div>\n            </div>\n            \n            <div class=\"person-start__name\">{name}</div>\n            <div class=\"person-start__place\">{place}</div>\n\n            <div class=\"person-start__descr\">{descr}</div>\n\n\n            \n        </div>\n    </div>\n\n    <div class=\"full-start__buttons hide\">\n        <div class=\"full-start__button selector\">\n            <svg version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\" viewBox=\"0 0 512 512\" style=\"enable-background:new 0 0 512 512;\" xml:space=\"preserve\">\n                <g>\n                    <g>\n                        <path fill=\"currentColor\" d=\"M436.742,180.742c-41.497,0-75.258,33.761-75.258,75.258s33.755,75.258,75.258,75.258\n                            C478.239,331.258,512,297.503,512,256C512,214.503,478.239,180.742,436.742,180.742z M436.742,294.246\n                            c-21.091,0-38.246-17.155-38.246-38.246s17.155-38.246,38.246-38.246s38.246,17.155,38.246,38.246\n                            S457.833,294.246,436.742,294.246z\"/>\n                    </g>\n                </g>\n                <g>\n                    <g>\n                        <path fill=\"currentColor\" d=\"M256,180.742c-41.497,0-75.258,33.761-75.258,75.258s33.761,75.258,75.258,75.258c41.503,0,75.258-33.755,75.258-75.258\n                            C331.258,214.503,297.503,180.742,256,180.742z M256,294.246c-21.091,0-38.246-17.155-38.246-38.246s17.155-38.246,38.246-38.246\n                            s38.246,17.155,38.246,38.246S277.091,294.246,256,294.246z\"/>\n                    </g>\n                </g>\n                <g>\n                    <g>\n                        <path fill=\"currentColor\" d=\"M75.258,180.742C33.761,180.742,0,214.503,0,256c0,41.503,33.761,75.258,75.258,75.258\n                            c41.497,0,75.258-33.755,75.258-75.258C150.516,214.503,116.755,180.742,75.258,180.742z M75.258,294.246\n                            c-21.091,0-38.246-17.155-38.246-38.246s17.155-38.246,38.246-38.246c21.091,0,38.246,17.155,38.246,38.246\n                            S96.342,294.246,75.258,294.246z\"/>\n                    </g>\n                </g>\n            </svg>\n        </div>\n\n        <div class=\"full-start__icons\">\n            <div class=\"info__icon icon--like\"></div>\n        </div>\n    </div>\n</div>";

    var html$B = "<div class=\"empty\">\n    <div class=\"empty__img selector\"></div>\n    <div class=\"empty__title\">{title}</div>\n    <div class=\"empty__descr\">{descr}</div>\n</div>";

    var html$A = "<div class=\"notice selector\">\n    <div class=\"notice__head\">\n        <div class=\"notice__title\">{title}</div>\n        <div class=\"notice__time\">{time}</div>\n    </div>\n    \n    <div class=\"notice__descr\">{descr}</div>\n</div>";

    var html$z = "<div class=\"notice notice--card selector\">\n    <div class=\"notice__left\">\n        <div class=\"notice__img\">\n            <img src=\"{img}\" />\n        </div>\n    </div>\n    <div class=\"notice__body\">\n        <div class=\"notice__head\">\n            <div class=\"notice__title\">{title}</div>\n            <div class=\"notice__time\">{time}</div>\n        </div>\n        \n        <div class=\"notice__descr\">{descr}</div>\n    </div>\n</div>";

    var html$y = "<div class=\"torrent-item selector\">\n    <div class=\"torrent-item__title\">{title}</div>\n    <div class=\"torrent-item__details\">\n        <div class=\"torrent-item__date\">{date}</div>\n        <div class=\"torrent-item__tracker\">{tracker}</div>\n\n        <div class=\"torrent-item__bitrate bitrate\">\u0411\u0438\u0442\u0440\u0435\u0439\u0442: <span>{bitrate} \u041C\u0431\u0438\u0442/\u0441</span></div>\n        <div class=\"torrent-item__seeds\">\u0420\u0430\u0437\u0434\u0430\u044E\u0442: <span>{seeds}</span></div>\n        <div class=\"torrent-item__grabs\">\u041A\u0430\u0447\u0430\u044E\u0442: <span>{grabs}</span></div>\n        \n        <div class=\"torrent-item__size\">{size}</div>\n    </div>\n</div>";

    var html$x = "<div class=\"torrent-file selector\">\n    <div class=\"torrent-file__title\">{title}</div>\n    <div class=\"torrent-file__size\">{size}</div>\n</div>";

    var html$w = "<div class=\"files\">\n    <div class=\"files__left\">\n        <div class=\"full-start__poster selector\">\n            <img src=\"{img}\" class=\"full-start__img\" />\n        </div>\n\n        <div class=\"files__info\">\n            <div class=\"files__title\">{title}</div>\n            <div class=\"files__title-original\">{original_title}</div>\n        </div>\n    </div>\n    <div class=\"files__body\">\n        \n    </div>\n</div>";

    var html$v = "<div class=\"about\">\n    <div>\u041F\u0440\u0438\u043B\u043E\u0436\u0435\u043D\u0438\u0435 \u043F\u043E\u043B\u043D\u043E\u0441\u0442\u044C\u044E \u0431\u0435\u0441\u043F\u043B\u0430\u0442\u043D\u043E\u0435 \u0438 \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0435\u0442 \u043F\u0443\u0431\u043B\u0438\u0447\u043D\u044B\u0435 \u0441\u0441\u044B\u043B\u043A\u0438 \u0434\u043B\u044F \u043F\u043E\u043B\u0443\u0447\u0435\u043D\u0438\u044F \u0438\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u0438 \u043E \u0432\u0438\u0434\u0435\u043E, \u043D\u043E\u0432\u0438\u043D\u043A\u0430\u0445, \u043F\u043E\u043F\u0443\u043B\u044F\u0440\u043D\u044B\u0445 \u0444\u0438\u043B\u044C\u043C\u0430\u0445 \u0438 \u0442.\u0434. \u0412\u0441\u044F \u0434\u043E\u0441\u0442\u0443\u043F\u043D\u0430\u044F \u0438\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044F \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0435\u0442\u0441\u044F \u0438\u0441\u043A\u043B\u044E\u0447\u0438\u0442\u0435\u043B\u044C\u043D\u043E \u0432 \u043F\u043E\u0437\u043D\u0430\u0432\u0430\u0442\u0435\u043B\u044C\u043D\u044B\u0445 \u0446\u0435\u043B\u044F\u0445, \u043F\u0440\u0438\u043B\u043E\u0436\u0435\u043D\u0438\u0435 \u043D\u0435 \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0435\u0442 \u0441\u0432\u043E\u0438 \u0441\u043E\u0431\u0441\u0442\u0432\u0435\u043D\u043D\u044B\u0435 \u0441\u0435\u0440\u0432\u0435\u0440\u044B \u0434\u043B\u044F \u0440\u0430\u0441\u043F\u0440\u043E\u0441\u0442\u0440\u0430\u043D\u0435\u043D\u0438\u044F \u0438\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u0438.</div>\n\n\n    <div class=\"about__contacts\">\n        <div>\n            <small>\u041D\u0430\u0448 \u043A\u0430\u043D\u0430\u043B</small><br>\n            @lampa_channel\n        </div>\n\n        <div>\n            <small>\u0413\u0440\u0443\u043F\u043F\u0430</small><br>\n            @lampa_group\n        </div>\n\n        <div>\n            <small>\u0412\u0435\u0440\u0441\u0438\u044F</small><br>\n            1.4.1\n        </div>\n    </div>\n\n    <div class=\"about__contacts\">\n        <div>\n            <small>\u0414\u043E\u043D\u0430\u0442</small><br>\n            www.boosty.to/lampatv\n        </div>\n    </div>\n</div>";

    var html$u = "<div class=\"error\">\n    <div class=\"error__ico\"></div>\n    <div class=\"error__body\">\n        <div class=\"error__title\">{title}</div>\n        <div class=\"error__text\">{text}</div>\n    </div>\n</div>";

    var html$t = "<div class=\"error\">\n    <div class=\"error__ico\"></div>\n    <div class=\"error__body\">\n        <div class=\"error__title\">{title}</div>\n        <div class=\"error__text\">{text}</div>\n    </div>\n</div>\n\n<div class=\"torrent-error noconnect\">\n    <div>\n        <div>\u041F\u0440\u0438\u0447\u0438\u043D\u044B</div>\n        <ul>\n            <li>\u0418\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0435\u0442\u0441\u044F \u0430\u0434\u0440\u0435\u0441: <code>{ip}</code></li>\n            <li class=\"nocorect\">\u0422\u0435\u043A\u0443\u0449\u0438\u0439 \u0430\u0434\u0440\u0435\u0441 <code>{ip}</code> \u044F\u0432\u043B\u044F\u0435\u0442\u0441\u044F \u043D\u0435\u0432\u0435\u0440\u043D\u044B\u043C!</li>\n            <li>\u0422\u0435\u043A\u0443\u0449\u0438\u0439 \u043E\u0442\u0432\u0435\u0442: <code>{echo}</code></li>\n        </ul>\n    </div>\n\n    <div>\n        <div>\u041A\u0430\u043A \u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u043E?</div>\n        <ul>\n            <li>\u0418\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0439\u0442\u0435 \u0430\u0434\u0440\u0435\u0441: <code>192.168.0.\u0445\u0445\u0445:8090</code></li>\n            <li>\u0418\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0439\u0442\u0435 \u0432\u0435\u0440\u0441\u0438\u044E Matrix</li>\n        </ul>\n    </div>\n\n    <div>\n        <div>\u041A\u0430\u043A \u043F\u0440\u043E\u0432\u0435\u0440\u0438\u0442\u044C?</div>\n        <ul>\n            <li>\u041D\u0430 \u044D\u0442\u043E\u043C \u0436\u0435 \u0443\u0441\u0442\u0440\u043E\u0439\u0441\u0442\u0432\u0435, \u043E\u0442\u043A\u0440\u043E\u0439\u0442\u0435 \u0431\u0440\u0430\u0443\u0437\u0435\u0440 \u0438 \u0437\u0430\u0439\u0434\u0438\u0442\u0435 \u043F\u043E \u0430\u0434\u0440\u0435\u0441\u0443 <code>{ip}/echo</code></li>\n            <li>\u0415\u0441\u043B\u0438 \u0436\u0435 \u0431\u0440\u0430\u0443\u0437\u0435\u0440 \u043D\u0435 \u043E\u0442\u0432\u0435\u0442\u0438\u0442, \u043F\u0440\u043E\u0432\u0435\u0440\u044C\u0442\u0435 \u0437\u0430\u043F\u0443\u0449\u0435\u043D \u043B\u0438 TorrServe, \u0438\u043B\u0438 \u043F\u0435\u0440\u0435\u0437\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u0435 \u0435\u0433\u043E.</li>\n            <li>\u0415\u0441\u043B\u0438 \u0436\u0435 \u0431\u0440\u0430\u0443\u0437\u0435\u0440 \u043E\u0442\u0432\u0435\u0442\u0438\u043B, \u0443\u0431\u0435\u0434\u0438\u0442\u0435\u0441\u044C \u0447\u0442\u043E \u0432 \u043E\u0442\u0432\u0435\u0442\u0435 \u0435\u0441\u0442\u044C \u0441\u0442\u0440\u043E\u043A\u0430 <code>MatriX</code></li>\n        </ul>\n    </div>\n</div>";

    var html$s = "<div class=\"error\">\n    <div class=\"error__ico\"></div>\n    <div class=\"error__body\">\n        <div class=\"error__title\">{title}</div>\n        <div class=\"error__text\">{text}</div>\n    </div>\n</div>\n\n<div class=\"torrent-error noconnect\">\n    <div>\n        <div>\u041F\u0440\u0438\u0447\u0438\u043D\u044B</div>\n        <ul>\n            <li>\u0417\u0430\u043F\u0440\u043E\u0441 \u043D\u0430 \u043F\u0438\u043D\u0433 \u0432\u0435\u0440\u043D\u0443\u043B \u043D\u0435\u0432\u0435\u0440\u043D\u044B\u0439 \u0444\u043E\u0440\u043C\u0430\u0442</li>\n            <li>\u041E\u0442\u0432\u0435\u0442 \u043E\u0442 TorServer: <code>{echo}</code></li>\n        </ul>\n    </div>\n\n    <div>\n        <div>\u0427\u0442\u043E \u0434\u0435\u043B\u0430\u0442\u044C?</div>\n        <ul>\n            <li>\u0423\u0431\u0435\u0434\u0438\u0442\u0435\u0441\u044C \u0447\u0442\u043E \u0443 \u0432\u0430\u0441 \u0441\u0442\u043E\u0438\u0442 \u0432\u0435\u0440\u0441\u0438\u044F Matrix</li>\n        </ul>\n    </div>\n\n    <div>\n        <div>\u041A\u0430\u043A \u043F\u0440\u043E\u0432\u0435\u0440\u0438\u0442\u044C?</div>\n        <ul>\n            <li>\u041E\u0442\u043A\u0440\u043E\u0439\u0442\u0435 \u0431\u0440\u0430\u0443\u0437\u0435\u0440 \u0438 \u0437\u0430\u0439\u0434\u0438\u0442\u0435 \u043F\u043E \u0430\u0434\u0440\u0435\u0441\u0443 <code>{ip}/echo</code></li>\n            <li>\u0423\u0431\u0435\u0434\u0438\u0442\u0435\u0441\u044C \u0447\u0442\u043E \u0432 \u043E\u0442\u0432\u0435\u0442\u0435 \u0435\u0441\u0442\u044C \u043D\u0430\u043B\u0438\u0447\u0438\u0435 \u043A\u043E\u0434\u0430 <code>MatriX</code></li>\n        </ul>\n    </div>\n</div>";

    var html$r = "<div class=\"error\">\n    <div class=\"error__ico\"></div>\n    <div class=\"error__body\">\n        <div class=\"error__title\">{title}</div>\n        <div class=\"error__text\">{text}</div>\n    </div>\n</div>\n\n<div class=\"torrent-error noconnect\">\n    <div>\n        <div>\u041F\u0440\u0438\u0447\u0438\u043D\u044B</div>\n        <ul>\n            <li>TorServer \u043D\u0435 \u0441\u043C\u043E\u0433 \u0441\u043A\u0430\u0447\u0430\u0442\u044C \u0442\u043E\u0440\u0440\u0435\u043D\u0442 \u0444\u0430\u0439\u043B</li>\n            <li>\u041E\u0442\u0432\u0435\u0442 \u043E\u0442 TorServer: {echo}</li>\n            <li>\u0421\u0441\u044B\u043B\u043A\u0430: <code>{url}</code></li>\n        </ul>\n    </div>\n\n    <div class=\"is--jackett\">\n        <div>\u0427\u0442\u043E \u0434\u0435\u043B\u0430\u0442\u044C?</div>\n        <ul>\n            <li>\u041F\u0440\u043E\u0432\u0435\u0440\u044C\u0442\u0435 \u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u043E \u043B\u0438 \u0432\u044B \u043D\u0430\u0441\u0442\u0440\u043E\u0438\u043B\u0438 Jackett</li>\n            <li>\u041F\u0440\u0438\u0432\u0430\u0442\u043D\u044B\u0435 \u0438\u0441\u0442\u043E\u0447\u043D\u0438\u043A\u0438 \u043C\u043E\u0433\u0443\u0442 \u043D\u0435 \u0432\u044B\u0434\u0430\u0432\u0430\u0442\u044C \u0441\u0441\u044B\u043B\u043A\u0443 \u043D\u0430 \u0444\u0430\u0439\u043B</li>\n            <li>\u0423\u0431\u0435\u0434\u0438\u0442\u0435\u0441\u044C \u0447\u0442\u043E Jackett \u0442\u043E\u0436\u0435 \u043C\u043E\u0436\u0435\u0442 \u0441\u043A\u0430\u0447\u0430\u0442\u044C \u0444\u0430\u0439\u043B</li>\n        </ul>\n    </div>\n\n    <div class=\"is--torlook\">\n        <div>\u0427\u0442\u043E \u0434\u0435\u043B\u0430\u0442\u044C?</div>\n        <ul>\n            <li>\u041D\u0430\u043F\u0438\u0441\u0430\u0442\u044C \u0432 \u043D\u0430\u0448\u0443 \u0442\u0435\u043B\u0435\u0433\u0440\u0430\u043C \u0433\u0440\u0443\u043F\u043F\u0443: @lampa_group</li>\n            <li>\u0423\u043A\u0430\u0436\u0438\u0442\u0435 \u043A\u0430\u043A\u043E\u0439 \u0444\u0438\u043B\u044C\u043C, \u043A\u0430\u043A\u0430\u044F \u0440\u0430\u0437\u0434\u0430\u0447\u0430 \u0438 \u043F\u043E \u0432\u043E\u0437\u043C\u043E\u0436\u043D\u043E\u0441\u0442\u0438 \u0444\u043E\u0442\u043E \u044D\u0442\u043E\u0439 \u0440\u0430\u0437\u0430\u0434\u0430\u0447\u0438</li>\n        </ul>\n    </div>\n</div>";

    var html$q = "<div class=\"torrent-install\">\n    <div class=\"torrent-install__left\">\n        <img src=\"https://yumata.github.io/lampa/img/ili/tv.png\" class=\"torrent-install\"/>\n    </div>\n    <div class=\"torrent-install__details\">\n        <div class=\"torrent-install__title\">\u041D\u0435\u043E\u0431\u0445\u043E\u0434\u0438\u043C TorrServe</div>\n        <div class=\"torrent-install__descr\">TorrServe \u2013 \u043F\u0440\u0438\u043B\u043E\u0436\u0435\u043D\u0438\u0435, \u043A\u043E\u0442\u043E\u0440\u043E\u0435 \u043F\u043E\u0437\u0432\u043E\u043B\u044F\u0435\u0442 \u043F\u0440\u043E\u0441\u043C\u0430\u0442\u0440\u0438\u0432\u0430\u0442\u044C \u043A\u043E\u043D\u0442\u0435\u043D\u0442 \u0438\u0437 \u0442\u043E\u0440\u0440\u0435\u043D\u0442-\u0444\u0430\u0439\u043B\u043E\u0432 \u0432 \u043E\u043D\u043B\u0430\u0439\u043D \u0440\u0435\u0436\u0438\u043C\u0435.<br><br>\u0411\u043E\u043B\u0435\u0435 \u0434\u0435\u0442\u0430\u043B\u044C\u043D\u0443\u044E \u0438\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044E \u043F\u043E \u0443\u0441\u0442\u0430\u043D\u043E\u0432\u043A\u0435 \u0432\u044B \u043D\u0430\u0439\u0434\u0435\u0442\u0435 \u0432 Telegram-\u0433\u0440\u0443\u043F\u043F\u0430\u0445, \u0443\u043A\u0430\u0437\u0430\u043D\u043D\u044B\u0445 \u043D\u0438\u0436\u0435.</div>\n        \n        <div class=\"torrent-install__label\">Telegram-\u0433\u0440\u0443\u043F\u043F\u044B</div>\n\n        <div class=\"torrent-install__links\">\n            <div class=\"torrent-install__link\">\n                <div>LG - Samsung</div>\n                <div>@lampa_group</div>\n            </div>\n\n            <div class=\"torrent-install__link\">\n                <div>Android</div>\n                <div>@lampa_android</div>\n            </div>\n        </div>\n    </div>\n</div>";

    var html$p = "<div class=\"torrent-checklist\">\n    <div class=\"torrent-checklist__descr\">\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u043F\u043E\u0434\u043A\u043B\u044E\u0447\u0438\u0442\u044C\u0441\u044F \u043A TorrServe. \u0414\u0430\u0432\u0430\u0439\u0442\u0435 \u0431\u044B\u0441\u0442\u0440\u043E \u043F\u0440\u043E\u0439\u0434\u0451\u043C\u0441\u044F \u043F\u043E \u0441\u043F\u0438\u0441\u043A\u0443 \u0432\u043E\u0437\u043C\u043E\u0436\u043D\u044B\u0445 \u043F\u0440\u043E\u0431\u043B\u0435\u043C \u0438 \u0432\u0441\u0451 \u043F\u0440\u043E\u0432\u0435\u0440\u0438\u043C.</div>\n\n    <div class=\"torrent-checklist__progress-steps\">\u0412\u044B\u043F\u043E\u043B\u043D\u0435\u043D\u043E 0 \u0438\u0437 0</div>\n    <div class=\"torrent-checklist__progress-bar\">\n        <div style=\"width: 0\"></div>\n    </div>\n\n    <div class=\"torrent-checklist__content\">\n        <div class=\"torrent-checklist__steps\">\n            <ul class=\"torrent-checklist__list\">\n                <li>\u0417\u0430\u043F\u0443\u0449\u0435\u043D \u043B\u0438 TorrServe</li>\n                <li>\u0414\u0438\u043D\u0430\u043C\u0438\u0447\u0435\u0441\u043A\u0438\u0439 IP-\u0430\u0434\u0440\u0435\u0441</li>\n                <li>\u041F\u0440\u043E\u0442\u043E\u043A\u043E\u043B \u0438 \u043F\u043E\u0440\u0442</li>\n                <li>\u0411\u043B\u043E\u043A\u0438\u0440\u043E\u0432\u043A\u0430 \u0430\u043D\u0442\u0438\u0432\u0438\u0440\u0443\u0441\u0430\u043C\u0438</li>\n                <li>\u041F\u0440\u043E\u0432\u0435\u0440\u044C\u0442\u0435 \u043D\u0430 \u0434\u043E\u0441\u0442\u0443\u043F\u043D\u043E\u0441\u0442\u044C</li>\n                <li>\u0412\u0441\u0435 \u0440\u0430\u0432\u043D\u043E \u043D\u0435 \u0440\u0430\u0431\u043E\u0442\u0430\u0435\u0442</li>\n            </ul>\n        </div>\n\n        <div class=\"torrent-checklist__info\">\n            <div class=\"hide\">\u0423\u0431\u0435\u0434\u0438\u0442\u0435\u0441\u044C, \u0447\u0442\u043E \u0432\u044B \u0437\u0430\u043F\u0443\u0441\u0442\u0438\u043B\u0438 TorrServe \u043D\u0430 \u0443\u0441\u0442\u0440\u043E\u0439\u0441\u0442\u0432\u0435, \u0433\u0434\u0435 \u043E\u043D \u0443\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D.</div>\n            <div class=\"hide\">\u0427\u0430\u0441\u0442\u0430\u044F \u043E\u0448\u0438\u0431\u043A\u0430, \u0438\u0437\u043C\u0435\u043D\u0438\u043B\u0441\u044F IP-\u0430\u0434\u0440\u0435\u0441 \u0443\u0441\u0442\u0440\u043E\u0439\u0441\u0442\u0432\u0430 \u0441 TorrServe. \u0423\u0431\u0435\u0434\u0438\u0442\u0435\u0441\u044C, \u0447\u0442\u043E IP-\u0430\u0434\u0440\u0435\u0441, \u043A\u043E\u0442\u043E\u0440\u044B\u0439 \u0432\u044B \u0432\u0432\u0435\u043B\u0438 - {ip}, \u0441\u043E\u0432\u043F\u0430\u0434\u0430\u0435\u0442 \u0441 \u0430\u0434\u0440\u0435\u0441\u043E\u043C \u0443\u0441\u0442\u0440\u043E\u0439\u0441\u0442\u0432\u0430, \u043D\u0430 \u043A\u043E\u0442\u043E\u0440\u043E\u043C \u0443\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D TorrServe.</div>\n            <div class=\"hide\">\u0414\u043B\u044F \u043F\u043E\u0434\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u044F \u043A TorrServe, \u043D\u0435\u043E\u0431\u0445\u043E\u0434\u0438\u043C\u043E \u0443\u043A\u0430\u0437\u0430\u0442\u044C \u043F\u0440\u043E\u0442\u043E\u043A\u043E\u043B http:// \u0432 \u043D\u0430\u0447\u0430\u043B\u0435 \u0438 \u043F\u043E\u0440\u0442 :8090 \u0432 \u043A\u043E\u043D\u0446\u0435 \u0430\u0434\u0440\u0435\u0441\u0430. \u0423\u0431\u0435\u0434\u0438\u0442\u0435\u0441\u044C, \u0447\u0442\u043E \u043F\u043E\u0441\u043B\u0435 IP-\u0430\u0434\u0440\u0435\u0441\u0430 \u0443\u043A\u0430\u0437\u0430\u043D \u043F\u043E\u0440\u0442, \u0432\u0430\u0448 \u0442\u0435\u043A\u0443\u0449\u0438\u0439 \u0430\u0434\u0440\u0435\u0441 - {ip}</div>\n            <div class=\"hide\">\u0427\u0430\u0441\u0442\u043E\u0435 \u044F\u0432\u043B\u0435\u043D\u0438\u0435, \u0430\u043D\u0442\u0438\u0432\u0438\u0440\u0443\u0441 \u0438\u043B\u0438 \u0431\u0440\u0430\u043D\u0434\u043C\u0430\u0443\u044D\u0440 \u043C\u043E\u0436\u0435\u0442 \u0431\u043B\u043E\u043A\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0434\u043E\u0441\u0442\u0443\u043F \u043F\u043E IP-\u0430\u0434\u0440\u0435\u0441\u0443, \u043F\u043E\u043F\u0440\u043E\u0431\u0443\u0439\u0442\u0435 \u043E\u0442\u043A\u043B\u044E\u0447\u0438\u0442\u044C \u0430\u043D\u0442\u0438\u0432\u0438\u0440\u0443\u0441 \u0438 \u0431\u0440\u0430\u043D\u0434\u043C\u0430\u0443\u044D\u0440.</div>\n            <div class=\"hide\">\u041D\u0430 \u043B\u044E\u0431\u043E\u043C \u0434\u0440\u0443\u0433\u043E\u043C \u0443\u0441\u0442\u0440\u043E\u0439\u0441\u0442\u0432\u0435 \u0432 \u044D\u0442\u043E\u0439 \u0436\u0435 \u0441\u0435\u0442\u0438, \u043E\u0442\u043A\u0440\u043E\u0439\u0442\u0435 \u0432 \u0431\u0440\u0430\u0443\u0437\u0435\u0440\u0435 \u0430\u0434\u0440\u0435\u0441 {ip} \u0438 \u043F\u0440\u043E\u0432\u0435\u0440\u044C\u0442\u0435, \u0434\u043E\u0441\u0442\u0443\u043F\u0435\u043D \u043B\u0438 \u0432\u0435\u0431-\u0438\u043D\u0442\u0435\u0440\u0444\u0435\u0439\u0441 TorrServe.</div>\n            <div class=\"hide\">\u0415\u0441\u043B\u0438 \u043F\u043E\u0441\u043B\u0435 \u0432\u0441\u0435\u0445 \u043F\u0440\u043E\u0432\u0435\u0440\u043E\u043A \u0432\u0441\u0451 \u0440\u0430\u0432\u043D\u043E \u0432\u043E\u0437\u043D\u0438\u043A\u0430\u0435\u0442 \u043E\u0448\u0438\u0431\u043A\u0430 \u043F\u043E\u0434\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u044F, \u043F\u043E\u043F\u0440\u043E\u0431\u0443\u0439\u0442\u0435 \u043F\u0435\u0440\u0435\u0437\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044C TorrServe \u0438 \u0438\u043D\u0442\u0435\u0440\u043D\u0435\u0442-\u0430\u0434\u0430\u043F\u0442\u0435\u0440.</div>\n            <div class=\"hide\">\u0415\u0441\u043B\u0438 \u043F\u0440\u043E\u0431\u043B\u0435\u043C\u0430 \u043D\u0435 \u0443\u0441\u0442\u0440\u0430\u043D\u0435\u043D\u0430, \u043F\u0438\u0448\u0438\u0442\u0435 \u0432 Telegram-\u0433\u0440\u0443\u043F\u043F\u0443 @lampa_group \u0441 \u0442\u0435\u043A\u0441\u0442\u043E\u043C (Lampa \u043D\u0435 \u043F\u043E\u0434\u043A\u043B\u044E\u0447\u0430\u0435\u0442\u0441\u044F \u043A TorrServe \u043F\u043E\u0441\u043B\u0435 \u0432\u0441\u0435\u0445 \u043F\u0440\u043E\u0432\u0435\u0440\u043E\u043A, \u0442\u0435\u043A\u0443\u0449\u0438\u0439 \u0430\u0434\u0440\u0435\u0441 {ip})</div>\n        </div>\n    </div>\n\n    <div class=\"torrent-checklist__footer\">\n        <div class=\"simple-button selector\">\u041D\u0430\u0447\u0430\u0442\u044C \u043F\u0440\u043E\u0432\u0435\u0440\u043A\u0443</div><div class=\"torrent-checklist__next-step\"></div>\n    </div>\n</div>";

    var html$o = "<div class=\"torrent-serial selector\">\n    <img src=\"{img}\" class=\"torrent-serial__img\" />\n    <div class=\"torrent-serial__content\">\n        <div class=\"torrent-serial__body\">\n            <div class=\"torrent-serial__title\">{fname}</div>\n            <div class=\"torrent-serial__line\">\u0421\u0435\u0440\u0438\u044F - <b>{episode}</b> &nbsp;\u2022&nbsp; \u0421\u0435\u0437\u043E\u043D - <b>{season}</b> &nbsp;\u2022&nbsp; \u0412\u044B\u0445\u043E\u0434 - {air_date}</div>\n        </div>\n        <div class=\"torrent-serial__detail\">\n            <div class=\"torrent-serial__size\">{size}</div>\n            <div class=\"torrent-serial__exe\">.{exe}</div>\n        </div>\n    </div>\n    <div class=\"torrent-serial__episode\">{episode}</div>\n</div>";

    var html$n = "<div class=\"search-box search\">\n    <div class=\"search-box__input search__input\"></div>\n    <div class=\"search-box__keypad search__keypad\"><div class=\"simple-keyboard\"></div></div>\n</div>";

    var html$m = "<div class=\"console\">\n    <div class=\"console__tabs\"></div>\n    <div class=\"console__body\"></div>\n</div>";

    var html$l = "\n<svg width=\"15\" height=\"14\" viewBox=\"0 0 15 14\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n<path d=\"M6.54893 0.927035C6.84828 0.00572455 8.15169 0.00572705 8.45104 0.927038L9.40835 3.87334C9.54223 4.28537 9.92618 4.56433 10.3594 4.56433H13.4573C14.4261 4.56433 14.8288 5.80394 14.0451 6.37334L11.5388 8.19426C11.1884 8.4489 11.0417 8.90027 11.1756 9.31229L12.1329 12.2586C12.4322 13.1799 11.3778 13.946 10.594 13.3766L8.08777 11.5557C7.73728 11.3011 7.26268 11.3011 6.9122 11.5557L4.40592 13.3766C3.6222 13.946 2.56773 13.1799 2.86708 12.2586L3.82439 9.31229C3.95827 8.90027 3.81161 8.4489 3.46112 8.19426L0.954841 6.37334C0.171128 5.80394 0.573906 4.56433 1.54263 4.56433H4.64056C5.07378 4.56433 5.45774 4.28536 5.59161 3.87334L6.54893 0.927035Z\" fill=\"currentColor\"/>\n</svg>\n";

    var html$k = "<div class=\"time-line\" data-hash=\"{hash}\">\n    <div style=\"width: {percent}%\"></div>\n</div>";

    var html$j = "<span class=\"time-line-details\" data-hash=\"{hash}\">\n\u041F\u0440\u043E\u0441\u043C\u043E\u0442\u0440\u0435\u043D\u043D\u043E - <b a=\"t\">{time}</b> / <b a=\"p\">{percent}</b> \u0438\u0437 <b a=\"d\">{duration}</b>\n</span>";

    var html$i = "<div class=\"empty empty--list\">\n    <div class=\"empty__title\">\u041F\u0443\u0441\u0442\u043E</div>\n    <div class=\"empty__descr\">\u041F\u043E \u0432\u0430\u0448\u0435\u043C\u0443 \u0444\u0438\u043B\u044C\u0442\u0440\u0443 \u043D\u0438\u0447\u0435\u0433\u043E \u043D\u0435 \u043D\u0430\u0448\u043B\u043E\u0441\u044C, \u0443\u0442\u043E\u0447\u043D\u0438\u0442\u0435 \u0444\u0438\u043B\u044C\u0442\u0440.</div>\n</div>";

    var html$h = "<div class=\"screensaver\">\n    <div class=\"screensaver__slides\">\n        <img class=\"screensaver__slides-one\" />\n        <img class=\"screensaver__slides-two\" />\n    </div>\n    <div class=\"screensaver__gradient\"></div>\n    <div class=\"screensaver__title\">\n        <div class=\"screensaver__title-name\"></div>\n        <div class=\"screensaver__title-tagline\"></div>\n    </div>\n    <div class=\"screensaver__datetime\">\n        <div class=\"screensaver__datetime-time\"><span class=\"time--clock\"></span></div>\n        <div class=\"screensaver__datetime-date\"><span class=\"time--full\"></span></div>\n    </div>\n</div>";

    var html$g = "<div class=\"plugins-catalog\">\n\n    <div class=\"plugins-catalog__block\">\n        <div class=\"plugins-catalog__title selector\">\u0420\u0430\u0431\u043E\u0447\u0438\u0435 \u043F\u043B\u0430\u0433\u0438\u043D\u044B</div>\n        <div class=\"plugins-catalog__descr\">\u041F\u043B\u0430\u0433\u0438\u043D\u044B, \u043A\u043E\u0442\u043E\u0440\u044B\u0435 \u0442\u043E\u0447\u043D\u043E \u0440\u0430\u0431\u043E\u0442\u0430\u044E\u0442 \u0432 \u043B\u0430\u043C\u043F\u0435.</div>\n        <div class=\"plugins-catalog__list\">\n            \n        </div>\n    </div>\n\n    <div class=\"plugins-catalog__block\">\n        <div class=\"plugins-catalog__title\">\u041F\u043E\u043F\u0443\u043B\u044F\u0440\u043D\u044B\u0435 \u043F\u043B\u0430\u0433\u0438\u043D\u044B \u0441\u0440\u0435\u0434\u0438 \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u0435\u0439</div>\n        <div class=\"plugins-catalog__descr\">\u0423\u0441\u0442\u0430\u043D\u043E\u0432\u043A\u0430 \u0438\u0437 \u043D\u0435\u0438\u0437\u0432\u0435\u0441\u0442\u043D\u044B\u0445 \u0438\u0441\u0442\u043E\u0447\u043D\u0438\u043A\u043E\u0432 \u043C\u043E\u0436\u0435\u0442 \u043F\u0440\u0438\u0432\u0435\u0441\u0442\u0438 \u043A \u043D\u0435\u043A\u043E\u0440\u0440\u0435\u043A\u0442\u043D\u043E\u0439 \u0440\u0430\u0431\u043E\u0442\u0435 \u043F\u0440\u0438\u043B\u043E\u0436\u0435\u043D\u0438\u044F.</div>\n        <div class=\"plugins-catalog__list\">\n            \n        </div>\n    </div>\n</div>";

    var html$f = "<div class=\"broadcast\">\n    <div class=\"broadcast__text\">{text}</div>\n\n    <div class=\"broadcast__scan\"><div></div></div>\n\n    <div class=\"broadcast__devices\">\n    \n    </div>\n</div>";

    var templates = {
      head: html$1e,
      wrap: html$1d,
      menu: html$1c,
      activitys: html$1b,
      activity: html$1a,
      settings: html$18,
      settings_main: html$17,
      settings_interface: html$16,
      settings_parser: html$15,
      settings_server: html$14,
      settings_player: html$13,
      settings_more: html$12,
      settings_plugins: html$11,
      settings_cloud: html$10,
      settings_account: html$$,
      scroll: html$19,
      items_line: html$_,
      card: html$Z,
      card_parser: html$Y,
      card_watched: html$X,
      full_start: html$W,
      full_descr: html$V,
      full_person: html$U,
      full_review: html$T,
      full_episode: html$S,
      player: html$R,
      player_panel: html$Q,
      player_video: html$P,
      player_info: html$O,
      selectbox: html$N,
      selectbox_item: html$M,
      info: html$L,
      more: html$J,
      search: html$I,
      settings_input: html$H,
      modal: html$G,
      company: html$F,
      modal_loading: html$E,
      modal_pending: html$D,
      person_start: html$C,
      empty: html$B,
      notice: html$A,
      notice_card: html$z,
      torrent: html$y,
      torrent_file: html$x,
      files: html$w,
      about: html$v,
      error: html$u,
      torrent_noconnect: html$t,
      torrent_file_serial: html$o,
      torrent_nocheck: html$s,
      torrent_nohash: html$r,
      torrent_install: html$q,
      torrent_error: html$p,
      filter: html$K,
      search_box: html$n,
      console: html$m,
      icon_star: html$l,
      timeline: html$k,
      timeline_details: html$j,
      list_empty: html$i,
      screensaver: html$h,
      plugins_catalog: html$g,
      broadcast: html$f
    };

    function get$d(name) {
      var vars = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var like_static = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var tpl = templates[name];
      if (!tpl) throw 'Шаблон: ' + name + ' не найден!';

      for (var n in vars) {
        tpl = tpl.replace(new RegExp('{' + n + '}', 'g'), vars[n]);
      }

      tpl = tpl.replace(/{\@([a-z_-]+)}/g, function (e, s) {
        return templates[s] || '';
      });
      return like_static ? tpl : $(tpl);
    }

    function add$9(name, html) {
      templates[name] = html;
    }

    function all$3() {
      return templates;
    }

    var Template = {
      get: get$d,
      add: add$9,
      all: all$3
    };

    var Base64 = {
      // private property
      _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
      // public method for encoding
      encode: function encode(input) {
        var output = "";
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        var i = 0;
        input = Base64._utf8_encode(input);

        while (i < input.length) {
          chr1 = input.charCodeAt(i++);
          chr2 = input.charCodeAt(i++);
          chr3 = input.charCodeAt(i++);
          enc1 = chr1 >> 2;
          enc2 = (chr1 & 3) << 4 | chr2 >> 4;
          enc3 = (chr2 & 15) << 2 | chr3 >> 6;
          enc4 = chr3 & 63;

          if (isNaN(chr2)) {
            enc3 = enc4 = 64;
          } else if (isNaN(chr3)) {
            enc4 = 64;
          }

          output = output + this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) + this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);
        }

        return output;
      },
      // public method for decoding
      decode: function decode(input) {
        var output = "";
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;
        var i = 0;
        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

        while (i < input.length) {
          enc1 = this._keyStr.indexOf(input.charAt(i++));
          enc2 = this._keyStr.indexOf(input.charAt(i++));
          enc3 = this._keyStr.indexOf(input.charAt(i++));
          enc4 = this._keyStr.indexOf(input.charAt(i++));
          chr1 = enc1 << 2 | enc2 >> 4;
          chr2 = (enc2 & 15) << 4 | enc3 >> 2;
          chr3 = (enc3 & 3) << 6 | enc4;
          output = output + String.fromCharCode(chr1);

          if (enc3 != 64) {
            output = output + String.fromCharCode(chr2);
          }

          if (enc4 != 64) {
            output = output + String.fromCharCode(chr3);
          }
        }

        output = Base64._utf8_decode(output);
        return output;
      },
      // private method for UTF-8 encoding
      _utf8_encode: function _utf8_encode(string) {
        string = string.replace(/\r\n/g, "\n");
        var utftext = "";

        for (var n = 0; n < string.length; n++) {
          var c = string.charCodeAt(n);

          if (c < 128) {
            utftext += String.fromCharCode(c);
          } else if (c > 127 && c < 2048) {
            utftext += String.fromCharCode(c >> 6 | 192);
            utftext += String.fromCharCode(c & 63 | 128);
          } else {
            utftext += String.fromCharCode(c >> 12 | 224);
            utftext += String.fromCharCode(c >> 6 & 63 | 128);
            utftext += String.fromCharCode(c & 63 | 128);
          }
        }

        return utftext;
      },
      // private method for UTF-8 decoding
      _utf8_decode: function _utf8_decode(utftext) {
        var string = "";
        var i = 0;
        var c = c1 = c2 = 0;

        while (i < utftext.length) {
          c = utftext.charCodeAt(i);

          if (c < 128) {
            string += String.fromCharCode(c);
            i++;
          } else if (c > 191 && c < 224) {
            c2 = utftext.charCodeAt(i + 1);
            string += String.fromCharCode((c & 31) << 6 | c2 & 63);
            i += 2;
          } else {
            c2 = utftext.charCodeAt(i + 1);
            c3 = utftext.charCodeAt(i + 2);
            string += String.fromCharCode((c & 15) << 12 | (c2 & 63) << 6 | c3 & 63);
            i += 3;
          }
        }

        return string;
      }
    };

    var html$e = $('<div class="noty"><div class="noty__body"><div class="noty__text"></div></div></div>'),
        body$3 = html$e.find('.noty__text'),
        time$3;

    function show$5(text) {
      clearTimeout(time$3);
      time$3 = setTimeout(function () {
        html$e.removeClass('noty--visible');
      }, 3000);
      body$3.html(text);
      html$e.addClass('noty--visible');
    }

    function render$b() {
      return html$e;
    }

    var Noty = {
      show: show$5,
      render: render$b
    };

    var reqCallback = {};

    function exit$1() {
      if (checkVersion(1)) AndroidJS.exit();else $('<a href="lampa://exit"></a>')[0].click();
    }

    function playHash(SERVER) {
      var magnet = "magnet:?xt=urn:btih:" + SERVER.hash;

      if (checkVersion(10)) {
        var intentExtra = "";

        if (SERVER.movie) {
          intentExtra = {
            title: "[LAMPA] " + (SERVER.movie.title || 'No title').replace(/\s+/g, ' ').trim(),
            poster: SERVER.movie.img,
            data: {
              lampa: true,
              movie: SERVER.movie
            }
          };
        }

        AndroidJS.openTorrentLink(magnet, JSON.stringify(intentExtra));
      } else {
        $('<a href="' + magnet + '"/>')[0].click();
      }
    }

    function openTorrent(SERVER) {
      if (checkVersion(10)) {
        var intentExtra = {
          title: "[LAMPA] " + (SERVER.movie.title || 'No title').replace(/\s+/g, ' ').trim(),
          poster: SERVER.object.poster,
          data: {
            lampa: true,
            movie: SERVER.movie
          }
        };
        AndroidJS.openTorrentLink(SERVER.object.MagnetUri || SERVER.object.Link, JSON.stringify(intentExtra));
      } else {
        $('<a href="' + (SERVER.object.MagnetUri || SERVER.object.Link) + '"/>')[0].click();
      }
    }

    function openPlayer(link, data) {
      if (checkVersion(10)) AndroidJS.openPlayer(link, JSON.stringify(data));else $('<a href="' + link + '"><a/>')[0].click();
    }

    function openYoutube(link) {
      if (checkVersion(15)) AndroidJS.openYoutube(link);else $('<a href="' + link + '"><a/>')[0].click();
    }

    function resetDefaultPlayer() {
      if (checkVersion(15)) AndroidJS.clearDefaultPlayer();
    }

    function httpReq(data, call) {
      var index = Math.floor(Math.random() * 5000);
      reqCallback[index] = call;
      if (checkVersion(16)) AndroidJS.httpReq(JSON.stringify(data), index);else call.error({
        responseText: "No Native request"
      });
    }

    function httpCall(index, callback) {
      var req = reqCallback[index];

      if (req[callback]) {
        var resp = AndroidJS.getResp(index);

        try {
          var json = JSON.parse(resp);
          req[callback](json);
        } catch (_unused) {
          req[callback](resp);
        } finally {
          delete reqCallback[index];
        }
      }
    }

    function voiceStart() {
      if (checkVersion(25)) AndroidJS.voiceStart();else Lampa.Noty.show("Работает только на Android TV");
    }

    function showInput(inputText) {
      if (checkVersion(27)) AndroidJS.showInput(inputText);
    }

    function updateChannel(where) {
      if (checkVersion(28)) AndroidJS.updateChannel(where);
    }

    function checkVersion(needVersion) {
      if (typeof AndroidJS !== 'undefined') {
        try {
          var current = AndroidJS.appVersion().split('-');
          var versionCode = current.pop();

          if (parseInt(versionCode, 10) >= needVersion) {
            return true;
          } else {
            Lampa.Noty.show("Обновите приложение.<br>Требуется версия: " + needVersion + "<br>Текущая версия: " + versionCode);
            return false;
          }
        } catch (e) {
          Lampa.Noty.show("Обновите приложение.<br>Требуется версия: " + needVersion);
          return false;
        }
      } else return false;
    }

    var Android = {
      exit: exit$1,
      openTorrent: openTorrent,
      openPlayer: openPlayer,
      playHash: playHash,
      openYoutube: openYoutube,
      resetDefaultPlayer: resetDefaultPlayer,
      httpReq: httpReq,
      voiceStart: voiceStart,
      httpCall: httpCall,
      showInput: showInput,
      updateChannel: updateChannel
    };

    function create$m() {
      var listener = start$3();
      var _calls = [];

      var _last;

      var last_reguest;
      var need = {
        timeout: 1000 * 60
      };

      this.timeout = function (time) {
        need.timeout = time;
      };
      /**
       * Видимый запрос
       * @param {String} url адрес
       * @param {Function} complite успешно
       * @param {Function} error ошибка
       * @param {Object} post_data данные для пост запроса
       */


      this.get = function (url, _complite, _error, post_data) {
        clear();
        go({
          url: url,
          post_data: post_data,
          start: function start() {
            listener.send('start');
          },
          before_complite: function before_complite() {
            listener.send('before_complite');
          },
          complite: function complite(data) {
            if (_complite) _complite(data);
          },
          after_complite: function after_complite() {
            listener.send('after_complite');
          },
          before_error: function before_error() {
            listener.send('before_error');
          },
          error: function error(data) {
            if (_error) _error(data);
          },
          after_error: function after_error() {
            listener.send('after_error');
          },
          end: function end() {
            listener.send('end');
          }
        });
      };
      /**
       * Тихий запрос, отработает в любом случае
       * @param {String} url адрес
       * @param {Function} complite успешно
       * @param {Function} error ошибка
       * @param {Object} post_data данные для пост запроса
       * @param {Object} params дополнительные параметры
       */


      this.quiet = function (url, _complite2, _error2, post_data, params) {
        var add_params = {};

        if (params) {
          add_params = params;
        }

        var data = {
          url: url,
          post_data: post_data,
          complite: function complite(data) {
            if (_complite2) _complite2(data);
          },
          error: function error(data) {
            if (_error2) _error2(data);
          }
        };
        Arrays.extend(data, add_params, true);
        go(data);
      };
      /**
       * Бесшумный запрос, сработает прерывание при новом запросе
       * @param {String} url адрес
       * @param {Function} complite успешно
       * @param {Function} error ошибка
       * @param {Object} post_data данные для пост запроса
       * @param {Object} params дополнительные параметры
       */


      this.silent = function (url, complite, error, post_data, params) {
        var add_params = {};

        if (params) {
          add_params = params;
        }

        var reguest = {
          url: url,
          complite: complite,
          error: error
        };

        _calls.push(reguest);

        var data = {
          url: url,
          post_data: post_data,
          complite: function complite(data) {
            if (_calls.indexOf(reguest) !== -1 && reguest.complite) reguest.complite(data);
          },
          error: function error(data) {
            if (_calls.indexOf(reguest) !== -1 && reguest.error) reguest.error(data);
          },
          end: function end() {
            listener.send('end');
          }
        };
        Arrays.extend(data, add_params, true);
        go(data);
      };
      /**
       * Отработать только последний запрос в стеке
       * @param {String} url адрес
       * @param {Function} complite успешно
       * @param {Function} error ошибка
       * @param {Object} post_data данные для пост запроса
       */


      this.last = function (url, complite, error, post_data) {
        var reguest = {
          url: url,
          complite: complite,
          error: error
        };
        _last = reguest;
        go({
          url: url,
          post_data: post_data,
          complite: function complite(data) {
            if (_last && _last.complite) _last.complite(data);
          },
          error: function error(data) {
            if (_last && _last.error) _last.error(data);
          },
          end: function end() {
            dispatchEvent({
              type: 'load:end'
            });
          }
        });
      };

      this["native"] = function (url, complite, error, post_data, params) {
        var add_params = {};

        if (params) {
          add_params = params;
        }

        var reguest = {
          url: url,
          complite: complite,
          error: error
        };

        _calls.push(reguest);

        var data = {
          url: url,
          post_data: post_data,
          complite: function complite(data) {
            if (_calls.indexOf(reguest) !== -1 && reguest.complite) reguest.complite(data);
          },
          error: function error(data) {
            if (_calls.indexOf(reguest) !== -1 && reguest.error) reguest.error(data);
          },
          end: function end() {
            listener.send('end');
          }
        };
        Arrays.extend(data, add_params, true);

        _native(data);
      };
      /**
       * Очистить все запросы
       */


      this.clear = function () {
        _calls = [];
      };
      /**
       * Повторить запрос
       * @param {Object} custom 
       */


      this.again = function (custom) {
        if (custom || last_reguest) {
          go(custom || last_reguest);
        }
      };
      /**
       * Вернуть обьект последненго запроса
       * @returns Object
       */


      this.latest = function () {
        return last_reguest;
      };
      /**
       * Декодировать ошибку в запросе
       * @param {Object} jqXHR 
       * @param {String} exception 
       * @returns String
       */


      this.errorDecode = function (jqXHR, exception) {
        return errorDecode(jqXHR, exception);
      };

      function errorDecode(jqXHR, exception) {
        var msg = '';

        if (jqXHR.status === 0 && exception !== 'timeout') {
          msg = 'Нет подключения к сети.';
        } else if (jqXHR.status == 404) {
          msg = 'Запрошенная страница не найдена. [404]';
        } else if (jqXHR.status == 401) {
          msg = 'Авторизация не удалась';
        } else if (jqXHR.status == 500) {
          msg = 'Внутренняя ошибка сервера. [500]';
        } else if (exception === 'parsererror') {
          msg = 'Запрошенный синтаксический анализ JSON завершился неудачно.';
        } else if (exception === 'timeout') {
          msg = 'Время запроса истекло.';
        } else if (exception === 'abort') {
          msg = 'Запрос был прерван.';
        } else if (exception === 'custom') {
          msg = jqXHR.responseText;
        } else {
          msg = 'Неизвестная ошибка: ' + jqXHR.responseText;
        }

        return msg;
      }
      /**
       * Сделать запрос
       * @param {Object} params 
       */


      function go(params) {
        listener.send('go');
        last_reguest = params;
        if (params.start) params.start();

        var secuses = function secuses(data) {
          if (params.before_complite) params.before_complite(data);

          if (params.complite) {
            try {
              params.complite(data);
            } catch (e) {
              console.error('Request', 'complite error:', e.message + "\n\n" + e.stack);
              Noty.show('Error: ' + (e.error || e).message + '<br><br>' + (e.error && e.error.stack ? e.error.stack : e.stack || '').split("\n").join('<br>'));
            }
          }

          if (params.after_complite) params.after_complite(data);
          if (params.end) params.end();
        };

        var data = {
          dataType: params.dataType || 'json',
          url: params.url,
          timeout: need.timeout,
          crossDomain: true,
          success: function success(data) {
            //console.log('Request','result of '+params.url+' :',data)
            secuses(data);
          },
          error: function error(jqXHR, exception) {
            console.log('Request', 'error of ' + params.url + ' :', errorDecode(jqXHR, exception));
            if (params.before_error) params.before_error(jqXHR, exception);
            if (params.error) params.error(jqXHR, exception);
            if (params.after_error) params.after_error(jqXHR, exception);
            if (params.end) params.end();
          },
          beforeSend: function beforeSend(xhr) {
            var use = Storage.field('torrserver_auth');
            var srv = Storage.get(Storage.field('torrserver_use_link') == 'two' ? 'torrserver_url_two' : 'torrserver_url');
            if (use && params.url.indexOf(srv) > -1) xhr.setRequestHeader("Authorization", "Basic " + Base64.encode(Storage.get('torrserver_login') + ':' + Storage.get('torrserver_password')));

            if (params.beforeSend) {
              xhr.setRequestHeader(params.beforeSend.name, params.beforeSend.value);
            }
          }
        };

        if (params.post_data) {
          data.type = 'POST';
          data.data = params.post_data;
        }

        if (params.type) data.type = params.type;

        if (params.headers) {
          data.headers = params.headers;
        }

        $.ajax(data);
        need.timeout = 1000 * 60;
      }

      function _native(params) {
        var platform = Storage.get('platform', '');
        if (platform == 'webos') go(params);else if (platform == 'tizen') go(params);else if (platform == 'android') {
          listener.send('go');
          last_reguest = params;
          if (params.start) params.start();
          Android.httpReq(params, {
            complite: params.complite,
            error: params.error
          });
          need.timeout = 1000 * 60;
        } else go(params);
      }
    }

    function secondsToTime$1(sec, _short) {
      var sec_num = parseInt(sec, 10);
      var hours = Math.floor(sec_num / 3600);
      var minutes = Math.floor((sec_num - hours * 3600) / 60);
      var seconds = sec_num - hours * 3600 - minutes * 60;

      if (hours < 10) {
        hours = "0" + hours;
      }

      if (minutes < 10) {
        minutes = "0" + minutes;
      }

      if (seconds < 10) {
        seconds = "0" + seconds;
      }

      if (_short) return hours + ':' + minutes;
      return hours + ':' + minutes + ':' + seconds;
    }

    function capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }

    function substr(txt, len) {
      txt = txt || '';
      return txt.length > len ? txt.substr(0, len) + '...' : txt;
    }

    function numberWithSpaces(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    }

    function bytesToSize(bytes, speed) {
      if (bytes == 0) {
        return '0 Байт';
      }

      var unitMultiple = 1024;
      var unitNames = ['Байт', 'КБ', 'МБ', 'ГБ', 'ТБ', 'ПБ'];

      if (speed) {
        unitMultiple = 1000;
        unitNames = ['бит', 'Кбит', 'Мбит', 'Гбит', 'Тбит', 'Пбит'];
      }

      var unitChanges = Math.floor(Math.log(bytes) / Math.log(unitMultiple));
      return parseFloat((bytes / Math.pow(unitMultiple, unitChanges)).toFixed(2)) + ' ' + unitNames[unitChanges];
    }

    function sizeToBytes(str) {
      var gsize = str.match(/([0-9\\.,]+)\s+(Mb|МБ|GB|ГБ|TB|ТБ)/i);

      if (gsize) {
        var size = parseFloat(gsize[1].replace(',', '.'));
        if (/gb|гб/.test(gsize[2].toLowerCase())) size *= 1024;
        if (/tb|тб/.test(gsize[2].toLowerCase())) size *= 1048576;
        return size * 1048576;
      }

      return 0;
    }

    function calcBitrate(byteSize, minutes) {
      if (!minutes) return 0;
      var sec = minutes * 60;
      var bitSize = byteSize * 8;
      return (bitSize / Math.pow(1000, 2) / sec).toFixed(2);
    }

    function time$2(html) {
      var create = function create() {
        var months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Ма', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
        var days = ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"];

        this.moth = function (m) {
          var n = months[m];
          var d = n.slice(-1);
          if (d == 'ь') return n.slice(0, n.length - 1) + 'я';else if (n == 'Ма') return n + 'я';else return n + 'а';
        };

        this.tik = function () {
          var date = new Date(),
              time = date.getTime(),
              ofst = parseInt((localStorage.getItem('time_offset') == null ? 'n0' : localStorage.getItem('time_offset')).replace('n', ''));
          date = new Date(time + ofst * 1000 * 60 * 60);
          time = [date.getHours(), date.getMinutes(), date.getSeconds(), date.getFullYear()];

          if (time[0] < 10) {
            time[0] = "0" + time[0];
          }

          if (time[1] < 10) {
            time[1] = "0" + time[1];
          }

          if (time[2] < 10) {
            time[2] = "0" + time[2];
          }

          var current_time = [time[0], time[1]].join(':'),
              current_week = date.getDay(),
              current_day = date.getDate();
          $('.time--clock', html).text(current_time);
          $('.time--week', html).text(days[current_week]);
          $('.time--day', html).text(current_day);
          $('.time--moth', html).text(months[date.getMonth()]);
          $('.time--full', html).text(current_day + ' ' + this.moth(date.getMonth()) + ' ' + time[3]);
        };

        setInterval(this.tik.bind(this), 1000);
        this.tik();
      };

      return new create();
    }

    function parseTime(str) {
      var months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Ма', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
      var days = ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"];

      var mouth = function mouth(m) {
        var n = months[m];
        var d = (n + '').slice(-1);
        if (d == 'ь') return n.slice(0, n.length - 1) + 'я';else if (n == 'Ма') return n + 'я';else return n + 'а';
      };

      var date = new Date(str),
          time = [date.getHours(), date.getMinutes(), date.getSeconds(), date.getFullYear()];

      if (time[0] < 10) {
        time[0] = "0" + time[0];
      }

      if (time[1] < 10) {
        time[1] = "0" + time[1];
      }

      if (time[2] < 10) {
        time[2] = "0" + time[2];
      }

      var current_time = [time[0], time[1]].join(':'),
          current_week = date.getDay(),
          current_day = date.getDate();
      return {
        time: current_time,
        week: days[current_week],
        day: current_day,
        mouth: months[date.getMonth()],
        full: current_day + ' ' + mouth(date.getMonth()) + ' ' + time[3],
        "short": current_day + ' ' + mouth(date.getMonth())
      };
    }

    function secondsToTimeHuman(sec_num) {
      var hours = Math.trunc(sec_num / 3600);
      var minutes = Math.floor((sec_num - hours * 3600) / 60);
      return (hours ? hours + 'ч. ' : '') + minutes + 'м.';
    }

    function strToTime(str) {
      var date = new Date(str);
      return date.getTime();
    }

    function checkHttp(url) {
      url = url.replace(/https:\/\//, '');
      url = url.replace(/http:\/\//, '');
      url = protocol() + url;
      return url;
    }

    function shortText(fullStr, strLen, separator) {
      if (fullStr.length <= strLen) return fullStr;
      separator = separator || '...';
      var sepLen = separator.length,
          charsToShow = strLen - sepLen,
          frontChars = Math.ceil(charsToShow / 2),
          backChars = Math.floor(charsToShow / 2);
      return fullStr.substr(0, frontChars) + separator + fullStr.substr(fullStr.length - backChars);
    }

    function protocol() {
      return window.location.protocol == 'https:' ? 'https://' : 'http://';
    }

    function addUrlComponent(url, params) {
      return url + (/\?/.test(url) ? '&' : '?') + params;
    }

    function putScript(items, complite, error) {
      var p = 0;

      function next() {
        if (p >= items.length) return complite();
        var u = items[p];

        if (!u) {
          p++;
          return next();
        }

        console.log('Script', 'create:', u);
        var s = document.createElement('script');

        s.onload = function () {
          console.log('Script', 'include:', u);
          next();
        };

        s.onerror = function () {
          console.log('Script', 'error:', u);
          if (error) error(u);
          next();
        };

        s.setAttribute('src', u);
        document.body.appendChild(s);
        p++;
      }

      next();
    }

    function putStyle(items, complite, error) {
      var p = 0;

      function next() {
        if (p >= items.length) return complite();
        var u = items[p];
        $.get(u, function (css) {
          css = css.replace(/\.\.\//g, './');
          var style = document.createElement('style');
          style.type = 'text/css';

          if (style.styleSheet) {
            // This is required for IE8 and below.
            style.styleSheet.cssText = css;
          } else {
            style.appendChild(document.createTextNode(css));
          }

          document.body.appendChild(style);
          next();
        }, function () {
          if (error) error(u);
          next();
        }, 'TEXT');
        p++;
      }

      next(items[0]);
    }

    function clearTitle(title) {
      return title.replace(/[^a-zа-я0-9\s]/gi, '');
    }

    function cardImgBackground(card_data) {
      if (Storage.field('background')) {
        return Storage.get('background_type', 'complex') == 'poster' && card_data.backdrop_path ? Api.img(card_data.backdrop_path, 'original') : card_data.poster_path ? Api.img(card_data.poster_path) : card_data.poster || card_data.img || '';
      }

      return '';
    }

    function stringToHslColor(str, s, l) {
      var hash = 0;

      for (var i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
      }

      var h = hash % 360;
      return 'hsl(' + h + ', ' + s + '%, ' + l + '%)';
    }

    function pathToNormalTitle(path) {
      var add_exe = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      var name = path.split('.');
      var exe = name.pop();
      name = name.join('.');
      return (name + '').replace(/_|\./g, ' ') + (add_exe ? ' <span class="exe">.' + exe + '</span>' : '');
    }

    function hash$2(input) {
      var str = (input || '') + '';
      var hash = 0;
      if (str.length == 0) return hash;

      for (var i = 0; i < str.length; i++) {
        var _char = str.charCodeAt(i);

        hash = (hash << 5) - hash + _char;
        hash = hash & hash; // Convert to 32bit integer
      }

      return Math.abs(hash) + '';
    }

    function uid(len) {
      var ALPHABET = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
      var ID_LENGTH = len || 8;
      var id = '';

      for (var i = 0; i < ID_LENGTH; i++) {
        id += ALPHABET.charAt(Math.floor(Math.random() * ALPHABET.length));
      }

      return id;
    }

    function copyTextToClipboard(text, succes, error) {
      var textArea = document.createElement("textarea");
      textArea.value = text;
      textArea.style.top = "0";
      textArea.style.left = "0";
      textArea.style.position = "fixed";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();

      try {
        var successful = document.execCommand('copy');
        if (successful) succes();else error();
      } catch (err) {
        error();
      }

      document.body.removeChild(textArea);
    }

    function imgLoad(image, src, onload, onerror) {
      var img = $(image)[0];

      img.onload = function () {
        if (onload) onload();
      };

      img.onerror = function (e) {
        img.src = './img/img_broken.svg';
        if (onerror) onerror();
      };

      img.src = src;
    }

    function isTouchDevice() {
      return 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
    }

    var Utils = {
      secondsToTime: secondsToTime$1,
      secondsToTimeHuman: secondsToTimeHuman,
      capitalizeFirstLetter: capitalizeFirstLetter,
      substr: substr,
      numberWithSpaces: numberWithSpaces,
      time: time$2,
      bytesToSize: bytesToSize,
      calcBitrate: calcBitrate,
      parseTime: parseTime,
      checkHttp: checkHttp,
      shortText: shortText,
      protocol: protocol,
      addUrlComponent: addUrlComponent,
      sizeToBytes: sizeToBytes,
      putScript: putScript,
      putStyle: putStyle,
      clearTitle: clearTitle,
      cardImgBackground: cardImgBackground,
      strToTime: strToTime,
      stringToHslColor: stringToHslColor,
      pathToNormalTitle: pathToNormalTitle,
      hash: hash$2,
      uid: uid,
      copyTextToClipboard: copyTextToClipboard,
      imgLoad: imgLoad,
      isTouchDevice: isTouchDevice
    };

    function create$l() {
      var _this = this;

      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var html = Template.get('scroll');
      var body = html.find('.scroll__body');
      var content = html.find('.scroll__content');
      html.toggleClass('scroll--horizontal', params.horizontal ? true : false);
      html.toggleClass('scroll--mask', params.mask ? true : false);
      html.toggleClass('scroll--over', params.over ? true : false);
      html.toggleClass('scroll--nopadding', params.nopadding ? true : false);
      body.data('scroll', 0);
      var scroll_time = 0,
          scroll_step = params.step || 150;
      html.on('mousewheel', function (e) {
        var parent = $(e.target).parents('.scroll');

        if (Storage.field('navigation_type') == 'mouse' && Date.now() - scroll_time > 100 && html.is(parent[0])) {
          scroll_time = Date.now();

          if (e.originalEvent.wheelDelta / 120 > 0) {
            if (_this.onWheel) _this.onWheel(-scroll_step);

            _this.wheel(-scroll_step);
          } else {
            if (_this.onWheel) _this.onWheel(scroll_step);

            _this.wheel(scroll_step);
          }
        }
      });
      /*
      let drag = {
          start: {
              x: 0,
              y: 0
          },
          move: {
              x: 0,
              y: 0
          },
          difference : 0,
          speed: 0,
          position: 0,
          animate: false,
          enable: false
      }
       html.on('touchstart',(e)=>{
          drag.start.x = e.touches[0].clientX
          drag.start.y = e.touches[0].clientY
           drag.position = body.data('scroll') || 0
           body.toggleClass('notransition',true)
           let parent = $(e.target).parents('.scroll')
           drag.enable = html.is(parent[0])
           clearInterval(drag.time)
          clearTimeout(drag.time_animate)
           if(drag.enable){
              drag.animate = true
               drag.time_animate = setTimeout(()=>{
                  drag.animate = false
              },200)
          }
      })
       html.on('touchmove',(e)=>{
          if(drag.enable){
              drag.move.x = e.touches[0].clientX
              drag.move.y = e.touches[0].clientY
               let dir = params.horizontal ? 'x' : 'y'
               drag.difference = drag.move[dir] - drag.start[dir]
              drag.speed      = drag.difference
               touchTo(drag.position + drag.difference)
          }
      })
       html.on('touchend',(e)=>{
          body.toggleClass('notransition',false)
           if(drag.animate) touchTo((body.data('scroll') || 0) + drag.speed)
           drag.enable = false
          drag.speed  = 0
           clearInterval(drag.time)
          clearTimeout(drag.time_animate)
      })
       function touchTo(offset){
          offset = maxOffset(offset)
           body.css('transform','translate3d('+(params.horizontal ? offset : 0)+'px, '+(params.horizontal ? 0 : offset)+'px, 0px)')
           body.data('scroll',offset)
      }
      */

      function maxOffset(offset) {
        var w = params.horizontal ? html.width() : html.height();
        var p = parseInt(content.css('padding-' + (params.horizontal ? 'left' : 'top')));
        var s = body[0][params.horizontal ? 'scrollWidth' : 'scrollHeight'];
        offset = Math.min(0, offset);
        offset = Math.max(-(Math.max(s + p * 2, w) - w), offset);
        return offset;
      }

      this.wheel = function (size) {
        html.toggleClass('scroll--wheel', true);
        var direct = params.horizontal ? 'left' : 'top';
        var scrl = body.data('scroll'),
            scrl_offset = html.offset()[direct],
            scrl_padding = parseInt(content.css('padding-' + direct));

        if (params.scroll_by_item) {
          var pos = body.data('scroll-position');
          pos = pos || 0;
          var items = $('>*', body);
          pos += size > 0 ? 1 : -1;
          pos = Math.max(0, Math.min(items.length - 1, pos));
          body.data('scroll-position', pos);
          var item = items.eq(pos),
              ofst = item.offset()[direct];
          size = ofst - scrl_offset - scrl_padding;
        }

        var max = params.horizontal ? 10000 : body.height();
        max -= params.horizontal ? html.width() : html.height();
        max += scrl_padding * 2;
        scrl -= size;
        scrl = Math.min(0, Math.max(-max, scrl));
        scrl = maxOffset(scrl);
        this.reset();

        if (Storage.field('scroll_type') == 'css') {
          body.css('transform', 'translate3d(' + (params.horizontal ? scrl : 0) + 'px, ' + (params.horizontal ? 0 : scrl) + 'px, 0px)');
        } else {
          body.css('margin-left', (params.horizontal ? scrl : 0) + 'px');
          body.css('margin-top', (params.horizontal ? 0 : scrl) + 'px');
        }

        body.data('scroll', scrl);
      };

      this.update = function (elem, tocenter) {
        if (elem.data('ismouse')) return;
        html.toggleClass('scroll--wheel', false);
        var dir = params.horizontal ? 'left' : 'top',
            siz = params.horizontal ? 'width' : 'height';
        var toh = Lampa.Utils.isTouchDevice();
        var ofs_elm = elem.offset()[dir],
            ofs_box = body.offset()[dir],
            center = ofs_box + (tocenter ? content[siz]() / 2 - elem[siz]() / 2 : 0),
            scrl = Math.min(0, center - ofs_elm);
        scrl = maxOffset(scrl);
        this.reset();

        if (toh) {
          if (params.horizontal) html.stop().animate({
            scrollLeft: -scrl
          }, 200);else html.stop().animate({
            scrollTop: -scrl
          }, 200);
        } else {
          if (Storage.field('scroll_type') == 'css') {
            body.css('transform', 'translate3d(' + (params.horizontal ? scrl : 0) + 'px, ' + (params.horizontal ? 0 : scrl) + 'px, 0px)');
          } else {
            body.css('margin-left', (params.horizontal ? scrl : 0) + 'px');
            body.css('margin-top', (params.horizontal ? 0 : scrl) + 'px');
          }
        }

        body.data('scroll', scrl);
      };

      this.append = function (object) {
        body.append(object);
      };

      this.minus = function (minus) {
        html.addClass('layer--wheight');
        html.data('mheight', minus);
      };

      this.height = function (minus) {
        html.addClass('layer--height');
        html.data('mheight', minus);
      };

      this.body = function () {
        return body;
      };

      this.render = function (object) {
        if (object) body.append(object);
        return html;
      };

      this.clear = function () {
        body.empty();
      };

      this.reset = function () {
        body.css('transform', 'translate3d(0px, 0px, 0px)');
        body.css('margin', '0px');
        body.data('scroll', 0); //body.data('scroll-position',0)
      };

      this.destroy = function () {
        html.remove();
        body = null;
        content = null;
        html = null;
      };
    }

    var components$2 = {};
    var params$1 = {};
    /**
     * Добавить компонент
     * @param {{component:string, icon:string, name:string}} data 
     */

    function addComponent(data) {
      components$2[data.component] = data;
      Template.add('settings_' + data.component, '<div></div>');
    }
    /**
     * Получить компонент
     * @param {string} component 
     * @returns {{component:string, icon:string, name:string}}
     */


    function getComponent(component) {
      return components$2[component];
    }
    /**
     * Добавить параметр
     * @param {{component:string, name:string, type:string, values:string|object, default:string|boolean}} data 
     */


    function addParam(data) {
      if (!params$1[data.component]) params$1[data.component] = [];
      params$1[data.component].push(data);
      if (data.param.type == 'select' || data.param.type == 'input') Params.select(data.param.name, data.param.values, data.param["default"]);
      if (data.param.type == 'trigger') Params.trigger(data.param.name, data.param["default"]);
    }
    /**
     * Получить параметры
     * @param {string} component 
     * @returns {[{component:string, name:string, type:string, values:string|object, default:string|boolean}]}
     */


    function getParam(component) {
      return params$1[component];
    }
    /**
     * Получить все компоненты
     * @returns {{name:{component:string, icon:string, name:string}}}
     */


    function allComponents() {
      return components$2;
    }
    /**
     * Получить все параметры
     * @returns {{component:[{component:string, name:string, type:string, values:string|object, default:string|boolean}]}}
     */


    function allParams() {
      return params$1;
    }

    var Api$1 = {
      allComponents: allComponents,
      allParams: allParams,
      addComponent: addComponent,
      addParam: addParam,
      getComponent: getComponent,
      getParam: getParam
    };

    function Component$1(name) {
      var scrl = new create$l({
        mask: true,
        over: true
      });
      var comp = Template.get('settings_' + name);
      var last;
      /**
       * Обновить скролл
       */

      function updateScroll() {
        comp.find('.selector').unbind('hover:focus').on('hover:focus', function (e) {
          last = e.target;
          scrl.update($(e.target), true);
        });
      }
      /**
       * Билдим все события
       */


      function buildEvents() {
        if (Storage.get('native')) {
          comp.find('.is--torllok').remove();
        }

        if (!Platform.is('android')) {
          comp.find('.is--android').remove();
        }

        if (!Platform.any()) {
          comp.find('.is--player').remove();
        }

        if (!Platform.is('nw')) {
          comp.find('.is--nw').remove();
        }

        scrl.render().find('.scroll__content').addClass('layer--wheight').data('mheight', $('.settings__head'));
        comp.find('.clear-storage').on('hover:enter', function () {
          Noty.show('Кеш и данные очищены');
          localStorage.clear();
          setTimeout(function () {
            window.location.reload();
          }, 1000);
        });
        Params.bind(comp.find('.selector'));
        Params.listener.follow('update_scroll', updateScroll);
        updateScroll();
      }
      /**
       * Добавляем пользовательские параметры
       */


      function addParams() {
        var params = Api$1.getParam(name);

        if (params) {
          params.forEach(function (data) {
            var item;

            if (data.param.type == 'select') {
              item = $("<div class=\"settings-param selector\" data-type=\"select\" data-name=\"".concat(data.param.name, "\">\n                        <div class=\"settings-param__name\">").concat(data.field.name, "</div>\n                        <div class=\"settings-param__value\"></div>\n                    </div>"));
            }

            if (data.param.type == 'trigger') {
              item = $("<div class=\"settings-param selector\" data-type=\"toggle\" data-name=\"".concat(data.param.name, "\">\n                        <div class=\"settings-param__name\">").concat(data.field.name, "</div>\n                        <div class=\"settings-param__value\"></div>\n                    </div>"));
            }

            if (data.param.type == 'input') {
              item = $("<div class=\"settings-param selector\" data-type=\"input\" data-name=\"".concat(data.param.name, "\" placeholder=\"").concat(data.param.placeholder, "\">\n                        <div class=\"settings-param__name\">").concat(data.field.name, "</div>\n                        <div class=\"settings-param__value\"></div>\n                    </div>"));
            }

            if (data.param.type == 'title') {
              item = $("<div class=\"settings-param-title\"><span>".concat(data.field.name, "</span></div>"));
            }

            if (data.param.type == 'static') {
              item = $("<div class=\"settings-param selector\" data-static=\"true\">\n                        <div class=\"settings-param__name\">".concat(data.field.name, "</div>\n                    </div>"));
            }

            if (item) {
              if (data.field.description) item.append("<div class=\"settings-param__descr\">".concat(data.field.description, "</div>"));
              if (typeof data.onRender == 'function') data.onRender(item);
              if (typeof data.onChange == 'function') item.data('onChange', data.onChange);
              comp.append(item);
            }
          });
        }
      }
      /**
       * Стартуем
       */


      function start() {
        addParams();
        buildEvents();
        Controller.add('settings_component', {
          toggle: function toggle() {
            Controller.collectionSet(comp);
            Controller.collectionFocus(last, comp);
          },
          up: function up() {
            Navigator.move('up');
          },
          down: function down() {
            Navigator.move('down');
          },
          back: function back() {
            scrl.destroy();
            comp.remove();
            Params.listener.remove('update_scroll', updateScroll);
            Controller.toggle('settings');
          }
        });
      }

      start();
      /**
       * Уничтожить
       */

      this.destroy = function () {
        scrl.destroy();
        comp.remove();
        comp = null;
        Params.listener.remove('update_scroll', updateScroll);
      };
      /**
       * Рендер
       * @returns {object}
       */


      this.render = function () {
        return scrl.render(comp);
      };
    }

    function Main() {
      var _this = this;

      var comp;
      var scrl = new create$l({
        mask: true,
        over: true
      });
      var last;
      /**
       * Создать
       */

      this.create = function () {
        comp = Template.get('settings_main');

        _this.update();
      };
      /**
       * Обновить события
       */


      this.update = function () {
        var components = Api$1.allComponents();

        for (var name in components) {
          var aded = components[name];

          if (!comp.find('[data-component="' + name + '"]').length) {
            var item = $("<div class=\"settings-folder selector\" data-component=\"".concat(name, "\">\n                    <div class=\"settings-folder__icon\">\n                        ").concat(aded.icon, "\n                    </div>\n                    <div class=\"settings-folder__name\">").concat(aded.name, "</div>\n                </div>"));
            comp.append(item);
          }
        }

        comp.find('.selector').unbind('hover:focus hover:enter').on('hover:focus', function (event) {
          last = event.target;
          scrl.update($(event.target), true);
        }).on('hover:enter', function (event) {
          _this.render().detach();

          _this.onCreate($(event.target).data('component'));
        });
      };
      /**
       * Сделать активным
       */


      this.active = function () {
        Controller.collectionSet(comp);
        Controller.collectionFocus(last, comp);
        scrl.height($('.settings__head'));
      };
      /**
       * Рендер
       * @returns {object}
       */


      this.render = function () {
        return scrl.render(comp);
      };
    }

    var html$d = Template.get('settings');
    var body$2 = html$d.find('.settings__body');
    var listener$f = start$3();
    var last$3 = '';

    var _main;

    html$d.find('.settings__layer').on('click', function () {
      window.history.back();
    });
    /**
     * Запуск
     */

    function init$h() {
      _main = new Main();
      _main.onCreate = create$k;

      _main.create();

      Controller.add('settings', {
        toggle: function toggle() {
          _main.update();

          listener$f.send('open', {
            name: 'main',
            body: _main.render()
          });
          body$2.empty().append(_main.render());

          _main.active();

          $('body').toggleClass('settings--open', true);
        },
        up: function up() {
          Navigator.move('up');
        },
        down: function down() {
          Navigator.move('down');
        },
        left: function left() {
          _main.render().detach();

          Controller.toggle('content');
        },
        gone: function gone(to) {
          if (to !== 'settings_component') $('body').toggleClass('settings--open', false);
        },
        back: function back() {
          _main.render().detach();

          Controller.toggle('head');
        }
      });
    }
    /**
     * Создать компонент
     * @param {string} name 
     */


    function create$k(name) {
      var comp = new Component$1(name);
      body$2.empty().append(comp.render());
      listener$f.send('open', {
        name: name,
        body: comp.render()
      });
      last$3 = name;
      Controller.toggle('settings_component');
    }
    /**
     * Обновить открытый компонент
     */


    function update$8() {
      create$k(last$3);
    }
    /**
     * Рендер
     * @returns {object}
     */


    function render$a() {
      return html$d;
    }

    var Settings = {
      listener: listener$f,
      init: init$h,
      render: render$a,
      update: update$8,
      create: create$k,
      main: function main() {
        return _main;
      }
    };

    var html$c = Template.get('selectbox');
    var scroll$1 = new create$l({
      mask: true,
      over: true
    });
    var active$4;
    html$c.find('.selectbox__body').append(scroll$1.render());
    html$c.find('.selectbox__layer').on('click', function () {
      window.history.back();
    });
    $('body').append(html$c);

    function bind$3() {
      scroll$1.clear();
      html$c.find('.selectbox__title').text(active$4.title);
      active$4.items.forEach(function (element) {
        if (element.hide) return;
        element.title = Utils.capitalizeFirstLetter(element.title || '');
        var item = Template.get(element.template || 'selectbox_item', element);
        if (!element.subtitle) item.find('.selectbox-item__subtitle').remove();

        if (element.checkbox) {
          item.addClass('selectbox-item--checkbox');
          item.append('<div class="selectbox-item__checkbox"></div>');
          if (element.checked) item.addClass('selectbox-item--checked');
        }

        if (element.ghost) item.css('opacity', 0.5);

        if (!element.noenter) {
          var goclose = function goclose() {
            if (!active$4.nohide) hide$1();
            if (active$4.onSelect) active$4.onSelect(element);
          };

          item.on('hover:enter', function () {
            if (element.checkbox) {
              element.checked = !element.checked;
              item.toggleClass('selectbox-item--checked', element.checked);
              if (active$4.onCheck) active$4.onCheck(element);
            } else if (active$4.onBeforeClose) {
              if (active$4.onBeforeClose()) goclose();
            } else goclose();
          }).on('hover:focus', function (e) {
            scroll$1.update($(e.target), true);
            if (active$4.onFocus) active$4.onFocus(element, e.target);
          }).on('hover:long', function (e) {
            if (active$4.onLong) active$4.onLong(element, e.target);
          });
        }

        if (element.selected) item.addClass('selected');
        scroll$1.append(item);
      });
    }

    function show$4(object) {
      active$4 = object;
      bind$3();
      $('body').toggleClass('selectbox--open', true);
      html$c.find('.selectbox__body').addClass('layer--wheight').data('mheight', html$c.find('.selectbox__head'));
      toggle$8();
    }

    function toggle$8() {
      Controller.add('select', {
        toggle: function toggle() {
          var selected = scroll$1.render().find('.selected');
          Controller.collectionSet(html$c);
          Controller.collectionFocus(selected.length ? selected[0] : false, html$c);
        },
        up: function up() {
          Navigator.move('up');
        },
        down: function down() {
          Navigator.move('down');
        },
        left: close$3,
        back: close$3
      });
      Controller.toggle('select');
    }

    function hide$1() {
      $('body').toggleClass('selectbox--open', false);
    }

    function close$3() {
      hide$1();
      if (active$4.onBack) active$4.onBack();
    }

    function render$9() {
      return html$c;
    }

    var Select = {
      show: show$4,
      hide: hide$1,
      close: close$3,
      render: render$9
    };

    function AVPlay(call_video) {
      var stream_url, loaded;
      var object = $('<object class="player-video_video" type="application/avplayer"</object>');
      var video = object[0];
      var listener = start$3();
      var change_scale_later;
      object.width(window.innerWidth);
      object.height(window.innerHeight); // для тестов

      /*
      let webapis = {
      	paused: true,
      	duration: 500 * 1000,
      	position: 0,
      	avplay: {
      		open: ()=>{
      
      		},
      		close: ()=>{
      			clearInterval(webapis.timer)
      		},
      		play: ()=>{
      			webapis.paused = false
      		},
      		pause: ()=>{
      			webapis.paused = true
      		},
      		setDisplayRect: ()=>{
      
      		},
      		setDisplayMethod: ()=>{
      
      		},
      		seekTo: (t)=>{
      			webapis.position = t
      		},
      		getCurrentTime: ()=>{
      			return webapis.position
      		},
      		getDuration: ()=>{
      			return webapis.duration
      		},
      		getState: ()=>{
      			return webapis.paused ? 'PAUSED' : 'PLAYNING'
      		},
      		getTotalTrackInfo: ()=>{
      			return [
      				{
      					type: 'AUDIO',
      					index: 0,
      					extra_info: '{"language":"russion"}'
      				},
      				{
      					type: 'AUDIO',
      					index: 1,
      					extra_info: '{"language":"english"}'
      				},
      				{
      					type: 'TEXT',
      					index: 0,
      					extra_info: '{"track_lang":"rus"}'
      				},
      				{
      					type: 'TEXT',
      					index: 1,
      					extra_info: '{"track_lang":"eng"}'
      				}
      			]
      		},
      		getCurrentStreamInfo: ()=>{
      			return []
      		},
      		setListener: ()=>{
      
      		},
      		prepareAsync: (call)=>{
      			setTimeout(call, 1000)
      
      			webapis.timer = setInterval(()=>{
      				if(!webapis.paused) webapis.position += 100
      					if(webapis.position >= webapis.duration){
      					clearInterval(webapis.timer)
      						webapis.position = webapis.duration
      						listener.send('ended')
      				}
      					if(!webapis.paused){
      					listener.send('timeupdate')
      						let s = webapis.duration / 4,
      						t = 'Welcome to subtitles'
      						if(webapis.position > s * 3) t = 'That\'s all I wanted to say'
      					else if(webapis.position > s * 2) t = 'This is a super taizen player'
      					else if(webapis.position > s) t = 'I want to say a few words'
      						listener.send('subtitle',{text:  t })
      				}
      			},30)
      		}
      	}
      }
      */

      /**
       * Установить урл
       */

      Object.defineProperty(video, "src", {
        set: function set(url) {
          if (url) {
            stream_url = url;
            webapis.avplay.open(url);
            webapis.avplay.setDisplayRect(0, 0, window.innerWidth, window.innerHeight);
            webapis.avplay.setDisplayMethod('PLAYER_DISPLAY_MODE_LETTER_BOX');

            try {
              webapis.avplay.setSilentSubtitle(false);
            } catch (e) {}
          }
        },
        get: function get() {}
      });
      /**
       * Позиция
       */

      Object.defineProperty(video, "currentTime", {
        set: function set(t) {
          try {
            webapis.avplay.seekTo(t * 1000);
          } catch (e) {}
        },
        get: function get() {
          var d = 0;

          try {
            d = webapis.avplay.getCurrentTime();
          } catch (e) {}

          return d ? d / 1000 : 0;
        }
      });
      /**
       * Длительность
       */

      Object.defineProperty(video, "duration", {
        set: function set() {},
        get: function get() {
          var d = 0;

          try {
            d = webapis.avplay.getDuration();
          } catch (e) {}

          return d ? d / 1000 : 0;
        }
      });
      /**
       * Пауза
       */

      Object.defineProperty(video, "paused", {
        set: function set() {},
        get: function get() {
          try {
            return webapis.avplay.getState() == 'PAUSED';
          } catch (e) {
            return false;
          }
        }
      });
      /**
       * Аудиодорожки
       */

      Object.defineProperty(video, "audioTracks", {
        set: function set() {},
        get: function get() {
          try {
            var totalTrackInfo = webapis.avplay.getTotalTrackInfo();
            var tracks = totalTrackInfo.filter(function (track) {
              return track.type === 'AUDIO';
            }).map(function (track) {
              var info = JSON.parse(track.extra_info);
              var item = {
                extra: JSON.parse(track.extra_info),
                index: parseInt(track.index),
                language: info.language
              };
              Object.defineProperty(item, "enabled", {
                set: function set(v) {
                  if (v) {
                    try {
                      webapis.avplay.setSelectTrack('AUDIO', item.index);
                    } catch (e) {
                      console.log('Player', 'no change audio:', e.message);
                    }
                  }
                },
                get: function get() {}
              });
              return item;
            }).sort(function (a, b) {
              return a.index - b.index;
            });
            return tracks;
          } catch (e) {
            return [];
          }
        }
      });
      /**
       * Субтитры
       */

      Object.defineProperty(video, "textTracks", {
        set: function set() {},
        get: function get() {
          try {
            var totalTrackInfo = webapis.avplay.getTotalTrackInfo();
            var tracks = totalTrackInfo.filter(function (track) {
              return track.type === 'TEXT';
            }).map(function (track) {
              var info = JSON.parse(track.extra_info),
                  item = {
                extra: JSON.parse(track.extra_info),
                index: parseInt(track.index),
                language: info.track_lang
              };
              Object.defineProperty(item, "mode", {
                set: function set(v) {
                  if (v == 'showing') {
                    try {
                      webapis.avplay.setSelectTrack('TEXT', item.index);
                    } catch (e) {
                      console.log('Player', 'no change text:', e.message);
                    }
                  }
                },
                get: function get() {}
              });
              return item;
            }).sort(function (a, b) {
              return a.index - b.index;
            });
            return tracks;
          } catch (e) {
            return [];
          }
        }
      });
      /**
       * Ширина видео
       */

      Object.defineProperty(video, "videoWidth", {
        set: function set() {},
        get: function get() {
          var info = videoInfo();
          return info.Width || 0;
        }
      });
      /**
       * Высота видео
       */

      Object.defineProperty(video, "videoHeight", {
        set: function set() {},
        get: function get() {
          var info = videoInfo();
          return info.Height || 0;
        }
      });
      /**
       * Получить информацию о видео
       * @returns {object}
       */

      function videoInfo() {
        try {
          var info = webapis.avplay.getCurrentStreamInfo(),
              json = {};

          for (var i = 0; i < info.length; i++) {
            var detail = info[i];

            if (detail.type == 'VIDEO') {
              json = JSON.parse(detail.extra_info);
            }
          }

          return json;
        } catch (e) {
          return {};
        }
      }
      /**
       * Меняем размер видео
       * @param {string} scale - default|cover
       */


      function changeScale(scale) {
        try {
          if (scale == 'cover') {
            webapis.avplay.setDisplayMethod('PLAYER_DISPLAY_MODE_FULL_SCREEN');
          } else {
            webapis.avplay.setDisplayMethod('PLAYER_DISPLAY_MODE_LETTER_BOX');
          }
        } catch (e) {
          change_scale_later = scale;
        }
      }
      /**
       * Всегда говорим да, мы можем играть
       */


      video.canPlayType = function () {
        return true;
      };
      /**
       * Вешаем кастомные события
       */


      video.addEventListener = listener.follow.bind(listener);
      /**
       * Вешаем события от плеера тайзен
       */

      webapis.avplay.setListener({
        onbufferingstart: function onbufferingstart() {
          console.log('Player', 'buffering start');
          listener.send('waiting');
        },
        onbufferingprogress: function onbufferingprogress(percent) {
          listener.send('progress', {
            percent: percent
          });
        },
        onbufferingcomplete: function onbufferingcomplete() {
          console.log('Player', 'buffering complete');
          listener.send('playing');
        },
        onstreamcompleted: function onstreamcompleted() {
          console.log('Player', 'stream completed');
          webapis.avplay.stop();
          listener.send('ended');
        },
        oncurrentplaytime: function oncurrentplaytime() {
          listener.send('timeupdate');

          if (change_scale_later) {
            change_scale_later = false;
            changeScale(change_scale_later);
          }
        },
        onerror: function onerror(eventType) {
          listener.send('error', {
            error: {
              code: 'tizen',
              message: eventType
            }
          });
        },
        onevent: function onevent(eventType, eventData) {
          console.log('Player', 'event type:', eventType, 'data:', eventData);
        },
        onsubtitlechange: function onsubtitlechange(duration, text, data3, data4) {
          listener.send('subtitle', {
            text: text
          });
        },
        ondrmevent: function ondrmevent(drmEvent, drmData) {}
      });
      /**
       * Загрузить
       */

      video.load = function () {
        if (stream_url) {
          webapis.avplay.prepareAsync(function () {
            loaded = true;
            webapis.avplay.play();

            try {
              webapis.avplay.setSilentSubtitle(false);
            } catch (e) {}

            listener.send('canplay');
            listener.send('playing');
            listener.send('loadedmetadata');
          }, function (e) {
            listener.send('error', {
              error: 'code [' + e.code + '] ' + e.message
            });
          });
        }
      };
      /**
       * Играть
       */


      video.play = function () {
        if (loaded) webapis.avplay.play();
      };
      /**
       * Пауза
       */


      video.pause = function () {
        if (loaded) webapis.avplay.pause();
      };
      /**
       * Установить масштаб
       */


      video.size = function (type) {
        changeScale(type);
      };
      /**
       * Уничтожить
       */


      video.destroy = function () {
        try {
          webapis.avplay.close();
        } catch (e) {}

        video.remove();
        listener.destroy();
      };

      call_video(video);
      return object;
    }

    function create$j(object) {
      this.state = object.state;

      this.start = function () {
        this.dispath(this.state);
      };

      this.dispath = function (action_name) {
        var action = object.transitions[action_name];

        if (action) {
          action.call(this);
        } else {
          console.log('invalid action');
        }
      };
    }

    var html$b = Template.get('player_panel');
    var listener$e = start$3();
    var condition = {};
    var timer$6 = {};
    var tracks = [];
    var subs = [];
    var qualitys = false;
    var elems$1 = {
      peding: $('.player-panel__peding', html$b),
      position: $('.player-panel__position', html$b),
      time: $('.player-panel__time', html$b),
      timenow: $('.player-panel__timenow', html$b),
      timeend: $('.player-panel__timeend', html$b),
      title: $('.player-panel__filename', html$b),
      tracks: $('.player-panel__tracks', html$b),
      subs: $('.player-panel__subs', html$b),
      timeline: $('.player-panel__timeline', html$b),
      quality: $('.player-panel__quality', html$b),
      episode: $('.player-panel__next-episode-name', html$b)
    };
    /**
     * Отсеживаем состояние, 
     * когда надо показать панель, а когда нет
     */

    var state = new create$j({
      state: 'start',
      transitions: {
        start: function start() {
          clearTimeout(timer$6.hide);
          clearTimeout(timer$6.rewind);
          this.dispath('canplay');
        },
        canplay: function canplay() {
          if (condition.canplay) this.dispath('visible');else _visible(true);
        },
        visible: function visible() {
          if (condition.visible) _visible(true);else this.dispath('rewind');
        },
        rewind: function rewind() {
          var _this = this;

          clearTimeout(timer$6.rewind);

          if (condition.rewind) {
            _visible(true);

            timer$6.rewind = setTimeout(function () {
              condition.rewind = false;

              _this.dispath('mousemove');
            }, 1000);
          } else {
            this.dispath('mousemove');
          }
        },
        mousemove: function mousemove() {
          if (condition.mousemove) {
            _visible(true);
          }

          this.dispath('hide');
        },
        hide: function hide() {
          clearTimeout(timer$6.hide);
          timer$6.hide = setTimeout(function () {
            _visible(false);
          }, 3000);
        }
      }
    });
    html$b.find('.selector').on('hover:focus', function (e) {
    });
    html$b.find('.player-panel__playpause').on('hover:enter', function (e) {
      listener$e.send('playpause', {});
    });
    html$b.find('.player-panel__next').on('hover:enter', function (e) {
      listener$e.send('next', {});
    });
    html$b.find('.player-panel__prev').on('hover:enter', function (e) {
      listener$e.send('prev', {});
    });
    html$b.find('.player-panel__rprev').on('hover:enter', function (e) {
      listener$e.send('rprev', {});
    });
    html$b.find('.player-panel__rnext').on('hover:enter', function (e) {
      listener$e.send('rnext', {});
    });
    html$b.find('.player-panel__playlist').on('hover:enter', function (e) {
      listener$e.send('playlist', {});
    });
    html$b.find('.player-panel__tstart').on('hover:enter', function (e) {
      listener$e.send('to_start', {});
    });
    html$b.find('.player-panel__tend').on('hover:enter', function (e) {
      listener$e.send('to_end', {});
    });
    html$b.find('.player-panel__fullscreen').on('hover:enter', function (e) {
      listener$e.send('fullscreen', {});
    });
    html$b.find('.player-panel__share').on('hover:enter', function () {
      listener$e.send('share', {});
    });
    elems$1.timeline.attr('data-controller', 'player_rewind');
    elems$1.timeline.on('mousemove', function (e) {
      listener$e.send('mouse_rewind', {
        method: 'move',
        time: elems$1.time,
        percent: percent(e)
      });
    }).on('mouseout', function () {
      elems$1.time.addClass('hide');
    }).on('click', function (e) {
      listener$e.send('mouse_rewind', {
        method: 'click',
        time: elems$1.time,
        percent: percent(e)
      });
    });
    html$b.find('.player-panel__line:eq(1) .selector').attr('data-controller', 'player_panel');
    /**
     * Добавить контроллеры
     */

    function addController() {
      Controller.add('player_rewind', {
        toggle: function toggle() {
          Controller.collectionSet(render$8());
          Controller.collectionFocus(false, render$8());
        },
        up: function up() {
          Controller.toggle('player');
        },
        down: function down() {
          toggleButtons();
        },
        right: function right() {
          listener$e.send('rnext', {});
        },
        left: function left() {
          listener$e.send('rprev', {});
        },
        gone: function gone() {
          html$b.find('.selector').removeClass('focus');
        },
        back: function back() {
          Controller.toggle('player');
          hide();
        }
      });
      Controller.add('player_panel', {
        toggle: function toggle() {
          Controller.collectionSet(render$8());
          Controller.collectionFocus($('.player-panel__playpause', html$b)[0], render$8());
        },
        up: function up() {
          toggleRewind();
        },
        right: function right() {
          Navigator.move('right');
        },
        left: function left() {
          Navigator.move('left');
        },
        down: function down() {//listener.send('playlist',{})
        },
        gone: function gone() {
          html$b.find('.selector').removeClass('focus');
        },
        back: function back() {
          Controller.toggle('player');
          hide();
        }
      });
    }
    /**
     * Выбор качества
     */


    elems$1.quality.text('auto').on('hover:enter', function () {
      if (qualitys) {
        var qs = [];
        var nw = elems$1.quality.text();

        if (Arrays.isArray(qualitys)) {
          qs = qualitys;
        } else {
          for (var i in qualitys) {
            qs.push({
              title: i,
              url: qualitys[i],
              selected: nw == i
            });
          }
        }

        if (!qs.length) return;
        var enabled = Controller.enabled();
        Select.show({
          title: 'Качество',
          items: qs,
          onSelect: function onSelect(a) {
            elems$1.quality.text(a.title);
            a.enabled = true;
            if (!Arrays.isArray(qualitys)) listener$e.send('quality', {
              name: a.title,
              url: a.url
            });
            Controller.toggle(enabled.name);
          },
          onBack: function onBack() {
            Controller.toggle(enabled.name);
          }
        });
      }
    });
    /**
     * Выбор аудиодорожки
     */

    elems$1.tracks.on('hover:enter', function (e) {
      if (tracks.length) {
        tracks.forEach(function (element, p) {
          var name = [];
          name.push(p + 1);
          name.push(element.language || element.name || 'Неизвестно');
          if (element.label) name.push(element.label);

          if (element.extra) {
            if (element.extra.channels) name.push('Каналов: ' + element.extra.channels);
            if (element.extra.fourCC) name.push('Тип: ' + element.extra.fourCC);
          }

          element.title = name.join(' / ');
        });
        var enabled = Controller.enabled();
        Select.show({
          title: 'Аудиодорожки',
          items: tracks,
          onSelect: function onSelect(a) {
            tracks.forEach(function (element) {
              element.enabled = false;
              element.selected = false;
            });
            a.enabled = true;
            a.selected = true;
            Controller.toggle(enabled.name);
          },
          onBack: function onBack() {
            Controller.toggle(enabled.name);
          }
        });
      }
    });
    /**
     * Выбор субтитров
     */

    elems$1.subs.on('hover:enter', function (e) {
      if (subs.length) {
        if (subs[0].index !== -1) {
          var any_select = subs.find(function (s) {
            return s.selected;
          });
          Arrays.insert(subs, 0, {
            title: 'Отключено',
            selected: any_select ? false : true,
            index: -1
          });
        }

        subs.forEach(function (element, p) {
          if (element.index !== -1) element.title = p + ' / ' + (element.language && element.label ? element.language + ' / ' + element.label : element.language || element.label || 'Неизвестно');
        });
        var enabled = Controller.enabled();
        Select.show({
          title: 'Субтитры',
          items: subs,
          onSelect: function onSelect(a) {
            subs.forEach(function (element) {
              element.mode = 'disabled';
              element.selected = false;
            });
            a.mode = 'showing';
            a.selected = true;
            listener$e.send('subsview', {
              status: a.index > -1
            });
            Controller.toggle(enabled.name);
          },
          onBack: function onBack() {
            Controller.toggle(enabled.name);
          }
        });
      }
    });
    /**
     * Выбор масштаба видео
     */

    html$b.find('.player-panel__size').on('hover:enter', function (e) {
      var select = Storage.get('player_size', 'default');
      var items = [{
        title: 'По умолчанию',
        subtitle: 'Размер видео по умолчанию',
        value: 'default',
        selected: select == 'default'
      }, {
        title: 'Расширить',
        subtitle: 'Расширяет видео на весь экран',
        value: 'cover',
        selected: select == 'cover'
      }];

      if (!(Platform.is('tizen') && Storage.field('player') == 'tizen')) {
        items = items.concat([{
          title: 'Заполнить',
          subtitle: 'Вместить видео на весь экран',
          value: 'fill',
          selected: select == 'fill'
        }, {
          title: 'Увеличить 115%',
          subtitle: 'Увеличить видео на 115%',
          value: 's115',
          selected: select == 's115'
        }, {
          title: 'Увеличить 130%',
          subtitle: 'Увеличить видео на 130%',
          value: 's130',
          selected: select == 's130'
        }, {
          title: 'По вертикали 115%',
          subtitle: 'Увеличить видео на 115%',
          value: 'v115',
          selected: select == 'v115'
        }, {
          title: 'По вертикали 130%',
          subtitle: 'Увеличить видео на 130%',
          value: 'v130',
          selected: select == 'v130'
        }]);
      } else {
        if (select == 's130' || select == 'fill') {
          items[0].selected = true;
        }
      }

      Select.show({
        title: 'Размер видео',
        items: items,
        onSelect: function onSelect(a) {
          listener$e.send('size', {
            size: a.value
          });
          Controller.toggle('player_panel');
        },
        onBack: function onBack() {
          Controller.toggle('player_panel');
        }
      });
    });
    /**
     * Рассчитать проценты
     * @param {object} e 
     * @returns {number}
     */

    function percent(e) {
      var offset = elems$1.timeline.offset();
      var width = elems$1.timeline.width();
      return (e.clientX - offset.left) / width;
    }
    /**
     * Обновляем состояние панели
     * @param {string} need - что нужно обновить
     * @param {string|number} value - значение
     */


    function update$7(need, value) {
      if (need == 'position') {
        elems$1.position.css({
          width: value
        });
      }

      if (need == 'peding') {
        elems$1.peding.css({
          width: value
        });
      }

      if (need == 'timeend') {
        elems$1.timeend.text(value);
      }

      if (need == 'timenow') {
        elems$1.timenow.text(value);
      }

      if (need == 'play') {
        html$b.toggleClass('panel--paused', false);
      }

      if (need == 'pause') {
        html$b.toggleClass('panel--paused', true);
      }
    }
    /**
     * Показать или скрыть панель
     * @param {boolean} status 
     */


    function _visible(status) {
      listener$e.send('visible', {
        status: status
      });
      html$b.toggleClass('panel--visible', status);
    }
    /**
     * Можем играть, далее отслеживаем статус
     */


    function canplay() {
      condition.canplay = true;
      state.start();
    }
    /**
     * Перемотка
     */


    function rewind$1() {
      condition.rewind = true;
      state.start();
    }
    /**
     * Переключить на контроллер перемотки
     */


    function toggleRewind() {
      Controller.toggle('player_rewind');
    }
    /**
     * Переключить на контроллер кнопки
     */


    function toggleButtons() {
      Controller.toggle('player_panel');
    }
    /**
     * Контроллер
     */


    function toggle$7() {
      condition.visible = true;
      state.start();
      toggleRewind();
    }
    /**
     * Показать панель
     */


    function show$3() {
      state.start();
      html$b.find('.player-panel__fullscreen').toggleClass('hide', Platform.tv());
      addController();
    }
    /**
     * Если двигали мышку
     */


    function mousemove() {
      condition.mousemove = true;
      state.start();
    }
    /**
     * Скрыть панель
     */


    function hide() {
      condition.visible = false;

      _visible(false);
    }
    /**
     * Установить субтитры
     * @param {[{index:integer, language:string, label:string}]} su 
     */


    function setSubs(su) {
      subs = su; //elems.subs.toggleClass('hide',false)
    }
    /**
     * Установить дорожки
     * @param {[{index:integer, language:string, label:string}]} tr 
     */


    function setTracks(tr) {
      tracks = tr;
      elems$1.tracks.toggleClass('hide', false);
    }
    /**
     * Установить качество
     * @param {[{title:string, url:string}]} levels 
     * @param {string} current 
     */


    function setLevels(levels, current) {
      qualitys = levels;
      elems$1.quality.text(current);
    }
    /**
     * Показать текущие качество
     * @param {[{title:string, url:string}]} qs 
     * @param {string} url 
     */


    function quality(qs, url) {
      if (qs) {
        elems$1.quality.toggleClass('hide', false);
        qualitys = qs;

        for (var i in qs) {
          if (qs[i] == url) elems$1.quality.text(i);
        }
      }
    }
    /**
     * Показать название следующего эпизода 
     * @param {{position:integer, playlist:[{title:string, url:string}]}} e 
     */


    function showNextEpisodeName(e) {
      if (e.playlist[e.position + 1]) {
        elems$1.episode.text(e.playlist[e.position + 1].title).toggleClass('hide', false);
      } else elems$1.episode.toggleClass('hide', true);
    }
    /**
     * Уничтожить
     */


    function destroy$6() {
      condition = {};
      tracks = [];
      subs = [];
      qualitys = false;
      elems$1.peding.css({
        width: 0
      });
      elems$1.position.css({
        width: 0
      });
      elems$1.time.text('00:00');
      elems$1.timenow.text('00:00');
      elems$1.timeend.text('00:00');
      elems$1.quality.text('auto');
      elems$1.subs.toggleClass('hide', true);
      elems$1.tracks.toggleClass('hide', true);
      elems$1.episode.toggleClass('hide', true);
      html$b.toggleClass('panel--paused', false);
    }
    /**
     * Получить html
     * @returns {object}
     */


    function render$8() {
      return html$b;
    }

    var PlayerPanel = {
      listener: listener$e,
      render: render$8,
      toggle: toggle$7,
      show: show$3,
      destroy: destroy$6,
      hide: hide,
      canplay: canplay,
      update: update$7,
      rewind: rewind$1,
      setTracks: setTracks,
      setSubs: setSubs,
      setLevels: setLevels,
      mousemove: mousemove,
      quality: quality,
      showNextEpisodeName: showNextEpisodeName
    };

    var widgetAPI,
        tvKey,
        pluginAPI,
        orsay_loaded,
        orsay_call = Date.now();

    function init$g() {
      $('body').append($("<div style=\"position: absolute; left: -1000px; top: -1000px;\">\n    <object id=\"pluginObjectNNavi\" border=\"0\" classid=\"clsid:SAMSUNG-INFOLINK-NNAVI\" style=\"opacity: 0.0; background-color: #000; width: 1px; height: 1px;\"></object>\n    <object id=\"pluginObjectTVMW\" border=\"0\" classid=\"clsid:SAMSUNG-INFOLINK-TVMW\" style=\"opacity: 0.0; background-color: #000; width: 1px; height: 1px;\"></object>\n    <object id=\"pluginObjectSef\" border=\"0\" classid=\"clsid:SAMSUNG-INFOLINK-SEF\" style=\"opacity:0.0;background-color:#000;width:1px;height:1px;\"></object>\n</div>"));
      Utils.putScript(['$MANAGER_WIDGET/Common/API/Widget.js', '$MANAGER_WIDGET/Common/API/TVKeyValue.js', '$MANAGER_WIDGET/Common/API/Plugin.js'], function () {
        try {
          if (typeof Common !== 'undefined' && Common.API && Common.API.TVKeyValue && Common.API.Plugin && Common.API.Widget) {
            widgetAPI = new Common.API.Widget();
            tvKey = new Common.API.TVKeyValue();
            pluginAPI = new Common.API.Plugin();
            window.onShow = orsayOnshow;
            setTimeout(function () {
              orsayOnshow();
            }, 2000);
            widgetAPI.sendReadyEvent();
          } else {
            if (orsay_call + 5 * 1000 > Date.now()) setTimeout(orsayOnLoad, 50);
          }
        } catch (e) {}
      });
    }

    function orsayOnshow() {
      if (orsay_loaded) return;
      orsay_loaded = true;

      try {
        //Включает анимацию изменения громкости на ТВ и т.д.
        pluginAPI.SetBannerState(1); //Отключает перехват кнопок, этими кнопками управляет система ТВ

        pluginAPI.unregistKey(tvKey.KEY_INFO);
        pluginAPI.unregistKey(tvKey.KEY_TOOLS);
        pluginAPI.unregistKey(tvKey.KEY_MENU);
        pluginAPI.unregistKey(tvKey.KEY_VOL_UP);
        pluginAPI.unregistKey(tvKey.KEY_VOL_DOWN);
        pluginAPI.unregistKey(tvKey.KEY_MUTE);
      } catch (e) {}
    }

    function exit() {
      widgetAPI.sendReturnEvent();
    }

    var orsay = {
      init: init$g,
      exit: exit
    };

    var enabled$2 = false;
    var listener$d = start$3();
    var lastdown = 0;
    var timer$5;
    var longpress;

    function toggle$6(new_status) {
      enabled$2 = new_status;
      listener$d.send('toggle', {
        status: enabled$2
      });
    }

    function enable$2() {
      toggle$6(true);
    }

    function disable$1() {
      toggle$6(false);
    }

    function isEnter(keycode) {
      return keycode == 13 || keycode == 29443 || keycode == 117 || keycode == 65385;
    }

    function keyCode(e) {
      var keycode;

      if (window.event) {
        keycode = e.keyCode;
      } else if (e.which) {
        keycode = e.which;
      }

      return keycode;
    }

    function init$f() {
      window.addEventListener("keydown", function (e) {
        lastdown = keyCode(e);

        if (!timer$5) {
          timer$5 = setTimeout(function () {
            if (isEnter(lastdown)) {
              longpress = true;
              listener$d.send('longdown', {});
              Controller["long"]();
            }
          }, 800);
        }
      });
      window.addEventListener("keyup", function (e) {
        clearTimeout(timer$5);
        timer$5 = null;
        listener$d.send('keyup', {
          code: keyCode(e),
          enabled: enabled$2,
          event: e
        });

        if (!longpress) {
          if (isEnter(keyCode(e)) && !e.defaultPrevented) Controller.enter();
        } else longpress = false;
      });
      window.addEventListener("keydown", function (e) {
        var keycode = keyCode(e);
        listener$d.send('keydown', {
          code: keycode,
          enabled: enabled$2,
          event: e
        });
        if (e.defaultPrevented) return;
        if (isEnter(keycode)) return;
        if (!enabled$2) return; //отключить все
        //4 - Samsung orsay

        if (keycode == 37 || keycode == 4) {
          Controller.move('left');
        } //29460 - Samsung orsay


        if (keycode == 38 || keycode == 29460) {
          Controller.move('up');
        } //5 - Samsung orsay


        if (keycode == 39 || keycode == 5) {
          Controller.move('right');
        } //5 - Samsung orsay
        //29461 - Samsung orsay


        if (keycode == 40 || keycode == 29461) {
          Controller.move('down');
        } //33 - LG; 427 - Samsung


        if (keycode == 33 || keycode == 427) {
          Controller.move('toup');
        } //34 - LG; 428 - Samsung


        if (keycode == 34 || keycode == 428) {
          Controller.move('todown');
        } //Абсолютный Enter
        //10252 - Samsung tizen


        if (keycode == 32 || keycode == 179 || keycode == 10252) {
          Controller.trigger('playpause');
        } //Samsung media
        //71 - Samsung orsay


        if (keycode == 415 || keycode == 71) {
          Controller.trigger('play');
        } //Samsung stop


        if (keycode == 413) {
          Controller.trigger('stop');
        } //69 - Samsung orsay


        if (keycode == 412 || keycode == 69 || keycode == 177) {
          Controller.trigger('rewindBack');
        } //72 - Samsung orsay


        if (keycode == 418 || keycode == 417 || keycode == 72 || keycode == 176) {
          Controller.trigger('rewindForward');
        } //74 - Samsung orsay


        if (keycode == 19 || keycode == 74) {
          Controller.trigger('pause');
        }

        if (keycode == 457) {
          Controller.trigger('info');
        } //E-Manual


        if (keycode == 10146) {
          e.preventDefault();
        }

        if (keycode == 10133) {
          Controller.toggle('settings');
        } //Кнопка назад
        //8 - браузер
        //27
        //461 - LG
        //10009 - Samsung
        //88 - Samsung orsay


        if (keycode == 8 || keycode == 27 || keycode == 461 || keycode == 10009 || keycode == 88) {
          e.preventDefault();
          Activity$1.back();
          return false;
        } //Exit orsay


        if (keycode == 45) {
          orsay.exit();
        }

        e.preventDefault();
      });
    }

    var Keypad = {
      listener: listener$d,
      init: init$f,
      enable: enable$2,
      disable: disable$1
    };

    var subparams;

    var listener$c = function listener(e) {
      if (e.code == 405) getWebosmediaId(setSubtitleColor);
      if (e.code == 406) getWebosmediaId(setSubtitleBackgroundColor);
      if (e.code == 403) getWebosmediaId(setSubtitleFontSize);
      if (e.code == 404) getWebosmediaId(setSubtitlePosition);
      if (e.code == 55) getWebosmediaId(setSubtitleBackgroundOpacity);
      if (e.code == 57) getWebosmediaId(setSubtitleCharacterOpacity);
    };

    Keypad.listener.follow('keydown', listener$c);

    function luna$1(params, call, fail) {
      if (call) params.onSuccess = call;

      params.onFailure = function (result) {
        console.log('WebOS', params.method + " [fail][" + result.errorCode + "] " + result.errorText);
        if (fail) fail();
      };

      webOS.service.request("luna://com.webos.media", params);
    }

    function initStorage() {
      if (!subparams) {
        subparams = Storage.get('webos_subs_params', '{}');
        Arrays.extend(subparams, {
          color: 2,
          font_size: 1,
          bg_color: 'black',
          position: -1,
          bg_opacity: 0,
          char_opacity: 255
        });
      }
    }

    function subCallParams(mediaId, method, func_params) {
      var parameters = {
        mediaId: mediaId
      };
      Arrays.extend(parameters, func_params);
      luna$1({
        parameters: parameters,
        method: method
      });
      Storage.set('webos_subs_params', subparams);
    }

    function getWebosmediaId(func) {
      var video = document.querySelector('video');

      if (video && video.mediaId) {
        initStorage();
        setTimeout(function () {
          subCallParams(video.mediaId, func.name, func());
        }, 300);
      }
    }

    function setSubtitleColor() {
      subparams.color++;
      if (subparams.color == 6) subparams.color = 0;
      return {
        color: subparams.color
      };
    }

    function setSubtitleBackgroundColor() {
      var bgcolors = ['black', 'white', 'yellow', 'red', 'green', 'blue'];
      var ixcolors = bgcolors.indexOf(subparams.bg_color);
      ixcolors++;
      if (ixcolors == -1) ixcolors = 0;
      subparams.bg_color = bgcolors[ixcolors];
      return {
        bgColor: subparams.bg_color
      };
    }

    function setSubtitleFontSize() {
      subparams.font_size++;
      if (subparams.font_size == 5) subparams.font_size = 0;
      return {
        fontSize: subparams.font_size
      };
    }

    function setSubtitlePosition() {
      subparams.position++;
      if (subparams.position == 5) subparams.position = -3;
      return {
        position: subparams.position
      };
    }

    function setSubtitleBackgroundOpacity() {
      subparams.bg_opacity += 15;
      if (subparams.bg_opacity > 255) subparams.bg_opacity = 0;
      return {
        bgOpacity: subparams.bg_opacity
      };
    }

    function setSubtitleCharacterOpacity() {
      subparams.char_opacity += 15;
      if (subparams.char_opacity > 255) subparams.char_opacity = 0;
      return {
        charOpacity: subparams.char_opacity
      };
    }

    function initialize() {
      var video = document.querySelector('video');

      if (video && video.mediaId) {
        initStorage();
        var methods = ['setSubtitleColor', 'setSubtitleBackgroundColor', 'setSubtitleFontSize', 'setSubtitlePosition', 'setSubtitleBackgroundOpacity', 'setSubtitleCharacterOpacity'];
        var parameters = {
          mediaId: video.mediaId,
          color: subparams.color,
          bgColor: subparams.bg_color,
          position: subparams.position,
          fontSize: subparams.font_size,
          bgOpacity: subparams.bg_opacity,
          charOpacity: subparams.char_opacity
        };
        Arrays.extend(parameters, subparams);
        methods.forEach(function (method) {
          luna$1({
            parameters: parameters,
            method: method
          });
        });
      }
    }

    var WebosSubs = {
      initialize: initialize
    };

    /**
     * Для запросов в луну
     * @param {object} params 
     * @param {function} call 
     * @param {function} fail 
     */

    function luna(params, call, fail) {
      if (call) params.onSuccess = call;

      params.onFailure = function (result) {
        console.log('WebOS', params.method + " [fail][" + result.errorCode + "] " + result.errorText);
        if (fail) fail();
      };

      webOS.service.request("luna://com.webos.media", params);
    }

    function create$i(_video) {
      var video = _video;
      var media_id;
      var subtitle_visible = false;
      var timer;
      var timer_repet;
      var count = 0;
      var count_message = 0;
      var data = {
        subs: [],
        tracks: []
      };
      this.subscribed = false;
      this.repeted = false;
      /**
       * Начинаем поиск видео
       */

      this.start = function () {
        timer = setInterval(this.search.bind(this), 300);
      };
      /**
       * Включить/выключить сабы
       * @param {boolean} status 
       */


      this.toggleSubtitles = function (status) {
        subtitle_visible = status;
        luna({
          method: 'setSubtitleEnable',
          parameters: {
            'mediaId': media_id,
            'enable': status
          }
        });
        if (status) WebosSubs.initialize();
      };
      /**
       * Получили сабы, выводим в панель
       * @param {object} info 
       */


      this.subtitles = function (info) {
        var _this = this;

        if (info.numSubtitleTracks) {
          var all = [];

          var add = function add(sub, index) {
            sub.index = index;
            sub.language = sub.language == '(null)' ? '' : sub.language;
            Object.defineProperty(sub, 'mode', {
              set: function set(v) {
                if (v == 'showing') {
                  _this.toggleSubtitles(sub.index == -1 ? false : true);

                  console.log('WebOS', 'change subtitles for id: ', media_id, ' index:', sub.index);

                  if (sub.index !== -1) {
                    setTimeout(function () {
                      luna({
                        method: 'selectTrack',
                        parameters: {
                          'type': 'text',
                          'mediaId': media_id,
                          'index': sub.index
                        }
                      });
                    }, 500);
                  }
                }
              },
              get: function get() {}
            });
            all.push(sub);
          };

          add({
            title: 'Отключить',
            selected: true
          }, -1);

          for (var i = 0; i < info.subtitleTrackInfo.length; i++) {
            add(info.subtitleTrackInfo[i], i);
          }

          data.subs = all;
          PlayerVideo.listener.send('webos_subs', {
            subs: data.subs
          });
          PlayerPanel.setSubs(data.subs);
        }
      };
      /**
       * Получили дорожки, выводим в панель
       * @param {object} info 
       */


      this.tracks = function (info) {
        if (info.numAudioTracks) {
          var all = [];

          var add = function add(track, index) {
            track.index = index;
            track.selected = index == -1;
            track.extra = {
              channels: track.channels,
              fourCC: track.codec
            };
            Object.defineProperty(track, 'enabled', {
              set: function set(v) {
                if (v) {
                  console.log('WebOS', 'change audio for id:', media_id, ' index:', track.index);
                  luna({
                    method: 'selectTrack',
                    parameters: {
                      'type': 'audio',
                      'mediaId': media_id,
                      'index': track.index
                    }
                  });

                  if (video.audioTracks) {
                    for (var i = 0; i < video.audioTracks.length; i++) {
                      video.audioTracks[i].enabled = false;
                    }

                    if (video.audioTracks[track.index]) {
                      video.audioTracks[track.index].enabled = true;
                      console.log('WebOS', 'change audio two method:', track.index);
                    }
                  }
                }
              },
              get: function get() {}
            });
            all.push(track);
          };

          for (var i = 0; i < info.audioTrackInfo.length; i++) {
            add(info.audioTrackInfo[i], i);
          }

          data.tracks = all;
          PlayerVideo.listener.send('webos_tracks', {
            tracks: data.tracks
          });
          PlayerPanel.setTracks(data.tracks, true);
        }
      };
      /**
       * Подписываемся на видео и ждем события
       */


      this.subscribe = function () {
        var _this2 = this;

        this.subscribed = true;
        luna({
          method: 'subscribe',
          parameters: {
            'mediaId': media_id,
            'subscribe': true
          }
        }, function (result) {
          if (result.sourceInfo && !_this2.sourceInfo) {
            _this2.sourceInfo = true;
            var info = result.sourceInfo.programInfo[0];

            _this2.subtitles(info);

            _this2.tracks(info);

            _this2.unsubscribe();

            _this2.call();
          }

          if (result.bufferRange) {
            count_message++;

            if (count_message == 30) {
              _this2.unsubscribe();

              _this2.call();
            }
          }
        }, function () {
          _this2.call();
        });
      };
      /**
       * Отписка от видео
       */


      this.unsubscribe = function () {
        luna({
          method: 'unload',
          parameters: {
            'mediaId': media_id
          }
        });
      };
      /**
       * Сканируем наличия видео
       */


      this.search = function () {
        var _this3 = this;

        count++;

        if (count > 3) {
          clearInterval(timer);
          clearInterval(timer_repet);
        }

        var rootSubscribe = function rootSubscribe() {
          console.log('WebOS', 'Run root', 'version:', webOS.sdk_version);

          _this3.toggleSubtitles(false);

          if (_this3.subscribed) clearInterval(timer_repet);
          if (!_this3.subscribed) _this3.subscribe();else {
            if (data.tracks.length) {
              PlayerVideo.listener.send('webos_tracks', {
                tracks: data.tracks
              });
              PlayerPanel.setTracks(data.tracks, true);
            }

            if (data.subs.length) {
              PlayerVideo.listener.send('webos_subs', {
                subs: data.subs
              });
              PlayerPanel.setSubs(data.subs);
            }
          }
          clearInterval(timer);
        };

        console.log('WebOS', 'try get id:', video.mediaId);

        if (video.mediaId) {
          media_id = video.mediaId;
          console.log('WebOS', 'video id:', media_id);
          rootSubscribe();
        }
      };
      /**
       * Вызываем и завершаем работу
       */


      this.call = function () {
        if (this.callback) this.callback();
        this.callback = false;
      };
      /**
       * Создаем новое видео
       * @param {object} new_video 
       */


      this.repet = function (new_video) {
        video = new_video;
        console.log('WebOS', 'repeat to new video', new_video ? true : false);
        media_id = '';
        clearInterval(timer);
        count = 0;
        this.repeted = true;
        timer_repet = setInterval(this.search.bind(this), 300);
      };
      /**
       * После перемотки включаем состояние сабов
       */


      this.rewinded = function () {
        this.toggleSubtitles(subtitle_visible);
      };
      /**
       * Уничтожить
       */


      this.destroy = function () {
        clearInterval(timer);
        clearInterval(timer_repet);
        if (media_id) this.unsubscribe();
        data = null;
        this.subscribed = false;
        this.callback = false;
      };
    }

    /**
     * Поучить время
     * @param {string} val 
     * @returns {number}
     */

    function time$1(val) {
      var regex = /(\d+):(\d{2}):(\d{2})/;
      var parts = regex.exec(val);
      if (parts === null) return 0;

      for (var i = 1; i < 5; i++) {
        parts[i] = parseInt(parts[i], 10);
        if (isNaN(parts[i])) parts[i] = 0;
      } //hours + minutes + seconds + ms


      return parts[1] * 3600000 + parts[2] * 60000 + parts[3] * 1000;
    }
    /**
     * Парсить
     * @param {string} data 
     * @param {boolean} ms 
     * @returns 
     */


    function parse$2(data, ms) {
      if (/WEBVTT/gi.test(data)) return parseVTT(data, ms);else return parseSRT(data, ms);
    }
    /**
     * Парсить SRT
     * @param {string} data 
     * @param {boolean} ms 
     * @returns {[{id:string, startTime:number, endTime:number, text:string}]}
     */


    function parseSRT(data, ms) {
      var useMs = ms ? true : false;
      data = data.replace(/\r/g, '');
      var regex = /(\d+)\n(\d{2}:\d{2}:\d{2},\d{3}) --> (\d{2}:\d{2}:\d{2},\d{3})/g;
      data = data.split(regex);
      data.shift();
      var items = [];

      for (var i = 0; i < data.length; i += 4) {
        items.push({
          id: data[i].trim(),
          startTime: useMs ? time$1(data[i + 1].trim()) : data[i + 1].trim(),
          endTime: useMs ? time$1(data[i + 2].trim()) : data[i + 2].trim(),
          text: data[i + 3].trim()
        });
      }

      return items;
    }
    /**
     * Парсить VTT
     * @param {string} data 
     * @param {boolean} ms
     * @returns {[{id:string, startTime:number, endTime:number, text:string}]}
     */


    function parseVTT(data, ms) {
      var useMs = ms ? true : false;
      data = data.replace(/WEBVTT/gi, '').trim();
      data = data.replace(/\r/g, ''); //data = data.replace(/(\d+):(\d+)\.(\d+) --> (\d+):(\d+)\.(\d+)/g, '00:$1:$2.$3 --> 00:$4:$5.$6')

      var regex = /(\d+)?\n?(\d{2}:\d{2}:\d{2}[,.]\d{3}) --> (\d{2}:\d{2}:\d{2}[,.]\d{3}).*\n/g;
      data = data.split(regex);
      data.shift();
      var items = [];

      for (var i = 0; i < data.length; i += 4) {
        items.push({
          id: data[i] ? +data[i].trim() : items.length + 1,
          startTime: useMs ? time$1(data[i + 1].trim()) : data[i + 0].trim(),
          endTime: useMs ? time$1(data[i + 2].trim()) : data[i + 1].trim(),
          text: data[i + 3].trim()
        });
      }

      return items;
    }
    /**
     * Класс
     */


    function CustomSubs() {
      var parsed;
      var network = new create$m();
      this.listener = start$3();
      /**
       * Загрузить
       * @param {string} url 
       */

      this.load = function (url) {
        network.silent(url, function (data) {
          if (data) {
            parsed = parse$2(data, true);
          }
        }, false, false, {
          dataType: 'text'
        });
      };
      /**
       * Показать текст
       * @param {number} time_sec 
       */


      this.update = function (time_sec) {
        var time_ms = time_sec * 1000;

        if (parsed) {
          var text = '';

          for (var i = 0; i < parsed.length; i++) {
            var sub = parsed[i];

            if (time_ms > sub.startTime && time_ms < sub.endTime) {
              text = sub.text.replace("\n", '<br>');
              break;
            }
          }

          this.listener.send('subtitle', {
            text: text.trim()
          });
        }
      };
      /**
       * Уничтожить
       */


      this.destroy = function () {
        network.clear();
        network = null;
        this.listener = null;
      };
    }

    var context;

    function smooth(a, b, s, c) {
      return a + (b - a) * (s * 0.02);
    }

    function toDb(_float) {
      var db = 20 * (Math.log(_float) / Math.log(10));
      db = Math.max(-48, Math.min(db, 0));
      return db;
    }

    function Source(video) {
      var source = context.createMediaElementSource(video);
      var analyser = context.createAnalyser();
      var volume = context.createGain();
      var destroy = false;
      var display = true;
      var draw_html = $('<div class="normalization normalization--visible"><canvas></canvas></div>');
      var draw_canvas = draw_html.find('canvas')[0];
      var draw_context = draw_canvas.getContext("2d");
      draw_canvas.width = 5;
      draw_canvas.height = 200; //размер буффера

      try {
        analyser.fftSize = 2048 * 4;
      } catch (e) {
        try {
          analyser.fftSize = 2048 * 2;
        } catch (e) {
          analyser.fftSize = 2048;
        }
      } //данные от анализа


      analyser.time_array = new Uint8Array(analyser.fftSize); //нижний порог

      analyser.min_db = 0; //уровень для бара

      analyser.draw_db = 0; //подключаем анализ

      source.connect(analyser); //подключаем регулятор звука

      analyser.connect(volume); //подключаем к выходу

      volume.connect(context.destination);
      $('body').append(draw_html);

      function update() {
        if (!destroy) requestAnimationFrame(update);
        analyser.getByteTimeDomainData(analyser.time_array);
        var total = 0,
            rms = 0,
            i = 0;

        var _float2, mdb;

        var min = -48;

        while (i < analyser.fftSize) {
          _float2 = analyser.time_array[i++] / 0x80 - 1;
          total += _float2 * _float2;
          rms = Math.max(rms, _float2);
          mdb = toDb(_float2);
          if (!isNaN(mdb)) min = Math.max(min, mdb);
        }

        rms = Math.sqrt(total / analyser.fftSize);
        analyser.min_db = smooth(analyser.min_db, min, 20);
        var db = toDb(rms);
        var low = -48 - analyser.min_db;
        volume.gain.value = Math.max(0.0, Math.min(2, db / low));
        analyser.draw_db = smooth(analyser.draw_db, volume.gain.value, 5);

        if (display) {
          draw_context.clearRect(0, 0, draw_canvas.width, draw_canvas.height);
          var down = Math.min(1, Math.max(0, 1 - analyser.draw_db));
          var up = Math.min(1, Math.max(0, analyser.draw_db - 1));
          var half = draw_canvas.height / 2;
          draw_context.fillStyle = 'rgba(251,91,91,1)';
          draw_context.fillRect(0, half, draw_canvas.width, half * down);
          draw_context.fillStyle = 'rgba(91,213,251,1)';
          draw_context.fillRect(0, half - half * up, draw_canvas.width, half * up);
        }
      }

      update();

      this.visible = function (status) {
        display = status;
        draw_html.toggleClass('normalization--visible', status);
      };

      this.destroy = function () {
        volume.disconnect();
        analyser.disconnect();
        source.disconnect();
        destroy = true;
        draw_html.remove();
      };
    }

    function Normalization() {

      if (!context) {
        var classContext = window.AudioContext || window.webkitAudioContext;
        context = new classContext();
      }

      var source;

      this.attach = function (video) {
        if (!source) source = new Source(video);
      };

      this.visible = function (status) {
        if (source) source.visible(status);
      };

      this.destroy = function () {
        source.destroy();
        source = null;
      };
    }

    var listener$b = start$3();
    var html$a = Template.get('player_video');
    var display = html$a.find('.player-video__display');
    var paused = html$a.find('.player-video__paused');
    var subtitles$1 = html$a.find('.player-video__subtitles');
    var timer$4 = {};
    var params = {};
    var rewind_position = 0;
    var rewind_force = 0;
    var last_mutation = 0;
    var customsubs;

    var _video;

    var wait;
    var neeed_sacle;
    var neeed_sacle_last;
    var webos;
    var hls;
    var webos_wait = {};
    var normalization;
    html$a.on('click', function () {
      if (Storage.field('navigation_type') == 'mouse') playpause();
    });
    $(window).on('resize', function () {
      if (_video) {
        neeed_sacle = neeed_sacle_last;
        scale();
      }
    });
    /**
     * Специально для вебось
     */

    listener$b.follow('webos_subs', function (data) {
      webos_wait.subs = convertToArray(data.subs);
    });
    listener$b.follow('webos_tracks', function (data) {
      webos_wait.tracks = convertToArray(data.tracks);
    });
    /**
     * Переключаем субтитры с предыдущей серии
     */

    function webosLoadSubs() {
      var subs = webos_wait.subs;
      _video.webos_subs = subs;
      var inx = params.sub + 1;

      if (typeof params.sub !== 'undefined' && subs[inx]) {
        subs.forEach(function (e) {
          e.mode = 'disabled';
          e.selected = false;
        });
        subs[inx].mode = 'showing';
        subs[inx].selected = true;
        console.log('WebOS', 'enable subs', inx);
        subsview(true);
      } else
        /*if(Storage.field('subtitles_start'))*/
        {
          var full = subs.find(function (s) {
            return (s.label || '').indexOf('олные') >= 0;
          });
          subs[0].selected = false;

          if (full) {
            full.mode = 'showing';
            full.selected = true;
          } else {
            subs[1].mode = 'showing';
            subs[1].selected = true;
          }

          subsview(true);
        }
    }
    /**
     * Переключаем дорожки с предыдущей серии
     */


    function webosLoadTracks() {
      var tracks = webos_wait.tracks;
      _video.webos_tracks = tracks;

      if (typeof params.track !== 'undefined' && tracks[params.track]) {
        tracks.forEach(function (e) {
          return e.selected = false;
        });
        console.log('WebOS', 'enable tracks', params.track);
        tracks[params.track].enabled = true;
        tracks[params.track].selected = true;
      }
    }
    /**
     * Добовляем события к контейнеру
     */


    function bind$2() {
      // ждем загрузки
      _video.addEventListener("waiting", function () {
        loader(true);
      }); // начали играть


      _video.addEventListener("playing", function () {
        loader(false);
      }); // видео закончилось


      _video.addEventListener('ended', function () {
        listener$b.send('ended', {});
      }); // что-то пошло не так


      _video.addEventListener('error', function (e) {
        var error = _video.error || {};
        var msg = (error.message || '').toUpperCase();

        if (msg.indexOf('EMPTY SRC') == -1) {
          if (error.code == 3) {
            listener$b.send('error', {
              error: 'Не удалось декодировать видео'
            });
          } else if (error.code == 4) {
            listener$b.send('error', {
              error: 'Видео не найдено или повреждено'
            });
          } else if (typeof error.code !== 'undefined') {
            listener$b.send('error', {
              error: 'code [' + error.code + '] details [' + msg + ']'
            });
          }
        }
      }); // прогресс буферизации


      _video.addEventListener('progress', function (e) {
        if (e.percent) {
          listener$b.send('progress', {
            down: e.percent
          });
        } else {
          var duration = _video.duration;

          if (duration > 0) {
            for (var i = 0; i < _video.buffered.length; i++) {
              if (_video.buffered.start(_video.buffered.length - 1 - i) < _video.currentTime) {
                var down = Math.max(0, Math.min(100, _video.buffered.end(_video.buffered.length - 1 - i) / duration * 100)) + "%";
                listener$b.send('progress', {
                  down: down
                });
                break;
              }
            }
          }
        }
      }); // можно ли уже проигрывать?


      _video.addEventListener('canplay', function () {
        listener$b.send('canplay', {});
      }); // сколько прошло


      _video.addEventListener('timeupdate', function () {
        listener$b.send('timeupdate', {
          duration: _video.duration,
          current: _video.currentTime
        });
        listener$b.send('videosize', {
          width: _video.videoWidth,
          height: _video.videoHeight
        });
        scale();
        mutation();
        if (customsubs) customsubs.update(_video.currentTime);
      }); // обновляем субтитры


      _video.addEventListener('subtitle', function (e) {
        //В srt существует тег {\anX}, где X - цифра от 1 до 9, Тег определяет нестандартное положение субтитра на экране.
        //Здесь удаляется тег из строки и обрабатывается положение 8 (субтитр вверху по центру).
        //{\an8} используется когда нужно, чтобы субтитр не перекрывал надписи в нижней части экрана или субтитры вшитые в видеоряд.
        subtitles$1.removeClass('on-top');
        var posTag = e.text.match(/^{\\an(\d)}/);

        if (posTag) {
          e.text = e.text.replace(/^{\\an(\d)}/, '');

          if (posTag[1] && parseInt(posTag[1]) === 8) {
            subtitles$1.addClass('on-top');
          }
        }

        e.text = e.text.trim();
        $('> div', subtitles$1).html(e.text ? e.text : '&nbsp;').css({
          display: e.text ? 'inline-block' : 'none'
        });
      }); //получены первые данные


      _video.addEventListener('loadedmetadata', function (e) {
        listener$b.send('videosize', {
          width: _video.videoWidth,
          height: _video.videoHeight
        });
        scale();
        loaded$1();
      }); // для страховки


      _video.volume = 1;
      _video.muted = false;
    }
    /**
     * Может поможет избавится от скринсейва
     */


    function mutation() {
      if (last_mutation < Date.now() - 5000) {
        var style = _video.style;
        style.top = style.top;
        style.left = style.left;
        style.width = style.width;
        style.height = style.height;
        last_mutation = Date.now();
      }
    }
    /**
     * Конвертировать object to array
     * @param {object[]} arr 
     * @returns {array}
     */


    function convertToArray(arr) {
      if (!Arrays.isArray(arr)) {
        var new_arr = [];

        for (var index = 0; index < arr.length; index++) {
          new_arr.push(arr[index]);
        }

        arr = new_arr;
      }

      return arr;
    }
    /**
     * Масштаб видео
     */


    function scale() {
      if (!neeed_sacle) return;
      var vw = _video.videoWidth,
          vh = _video.videoHeight,
          rt = 1,
          sx = 1.00,
          sy = 1.00;
      if (vw == 0 || vh == 0 || typeof vw == 'undefined') return;

      var increase = function increase(sfx, sfy) {
        rt = Math.min(window.innerWidth / vw, window.innerHeight / vh);
        sx = sfx;
        sy = sfy;
      };

      if (neeed_sacle == 'default') {
        rt = Math.min(window.innerWidth / vw, window.innerHeight / vh);
      } else if (neeed_sacle == 'fill') {
        rt = Math.min(window.innerWidth / vw, window.innerHeight / vh);
        sx = window.innerWidth / (vw * rt);
        sy = window.innerHeight / (vh * rt);
      } else if (neeed_sacle == 's115') {
        increase(1.15, 1.15);
      } else if (neeed_sacle == 's130') {
        increase(1.34, 1.34);
      } else if (neeed_sacle == 'v115') {
        increase(1.01, 1.15);
      } else if (neeed_sacle == 'v130') {
        increase(1.01, 1.34);
      } else {
        rt = Math.min(window.innerWidth / vw, window.innerHeight / vh);
        vw = vw * rt;
        vh = vh * rt;
        rt = Math.max(window.innerWidth / vw, window.innerHeight / vh);
        sx = rt;
        sy = rt;
      }

      sx = sx.toFixed(2);
      sy = sy.toFixed(2);

      if (Platform.is('orsay') || Storage.field('player_scale_method') == 'calculate') {
        var nw = vw * rt,
            nh = vh * rt;
        var sz = {
          width: Math.round(nw * sx) + 'px',
          height: Math.round(nh * sy) + 'px',
          marginLeft: Math.round(window.innerWidth / 2 - nw * sx / 2) + 'px',
          marginTop: Math.round(window.innerHeight / 2 - nh * sy / 2) + 'px'
        };
      } else {
        var sz = {
          width: Math.round(window.innerWidth) + 'px',
          height: Math.round(window.innerHeight) + 'px',
          transform: sx == 1.00 ? 'unset' : 'scaleX(' + sx + ') scaleY(' + sy + ')'
        };
      }

      $(_video).css(sz);
      neeed_sacle = false;
    }
    /**
     * Сохранить текущие состояние дорожек и сабов
     * @returns {{sub:integer, track:integer, level:integer}}
     */


    function saveParams() {
      var subs = _video.customSubs || _video.webos_subs || _video.textTracks || [];
      var tracks = [];
      if (hls && hls.audioTracks && hls.audioTracks.length) tracks = hls.audioTracks;else if (_video.audioTracks && _video.audioTracks.length) tracks = _video.audioTracks;
      if (webos && webos.sourceInfo) tracks = _video.webos_tracks || [];

      if (tracks.length) {
        for (var i = 0; i < tracks.length; i++) {
          if (tracks[i].enabled == true || tracks[i].selected == true) params.track = i;
        }
      }

      if (subs.length) {
        for (var _i = 0; _i < subs.length; _i++) {
          if (subs[_i].enabled == true || subs[_i].selected == true) {
            params.sub = subs[_i].index;
          }
        }
      }

      if (hls && hls.levels) params.level = hls.currentLevel;
      console.log('WebOS', 'saved params', params);
      return params;
    }
    /**
     * Очисить состояние
     */


    function clearParamas() {
      params = {};
    }
    /**
     * Загрузитьновое состояние из прошлого
     * @param {{sub:integer, track:integer, level:integer}} saved_params 
     */


    function setParams(saved_params) {
      params = saved_params;
    }
    /**
     * Смотрим есть ли дорожки и сабы
     */


    function loaded$1() {
      var tracks = [];
      var subs = _video.customSubs || _video.textTracks || [];
      console.log('WebOS', 'video full loaded');
      if (hls) console.log('Player', 'hls test', hls.audioTracks.length);

      if (hls && hls.audioTracks && hls.audioTracks.length) {
        tracks = hls.audioTracks;
        tracks.forEach(function (track) {
          if (hls.audioTrack == track.id) track.selected = true;
          Object.defineProperty(track, "enabled", {
            set: function set(v) {
              if (v) hls.audioTrack = track.id;
            },
            get: function get() {}
          });
        });
      } else if (_video.audioTracks && _video.audioTracks.length) tracks = _video.audioTracks;

      console.log('Player', 'tracks', _video.audioTracks);

      if (webos && webos.sourceInfo) {
        tracks = [];
        if (webos_wait.tracks) webosLoadTracks();
        if (webos_wait.subs) webosLoadSubs();
      }

      if (tracks.length) {
        tracks = convertToArray(tracks);

        if (typeof params.track !== 'undefined' && tracks[params.track]) {
          tracks.forEach(function (e) {
            e.selected = false;
          });
          tracks[params.track].enabled = true;
          tracks[params.track].selected = true;
          console.log('WebOS', 'enable track by default');
        }

        listener$b.send('tracks', {
          tracks: tracks
        });
      }

      if (subs.length) {
        subs = convertToArray(subs);

        if (typeof params.sub !== 'undefined' && subs[params.sub]) {
          subs.forEach(function (e) {
            e.mode = 'disabled';
            e.selected = false;
          });
          subs[params.sub].mode = 'showing';
          subs[params.sub].selected = true;
          subsview(true);
        } else
          /*if(Storage.field('subtitles_start'))*/
          {
            var full = subs.find(function (s) {
              return (s.label || '').indexOf('олные') >= 0;
            });

            if (full) {
              full.mode = 'showing';
              full.selected = true;
            } else {
              subs[0].mode = 'showing';
              subs[0].selected = true;
            }

            subsview(true);
          }

        listener$b.send('subs', {
          subs: subs
        });
      }

      if (hls && hls.levels) {
        var current_level = 'AUTO';
        hls.levels.forEach(function (level, i) {
          level.title = level.qu ? level.qu : level.width ? level.width + 'x' + level.height : 'AUTO';

          if (hls.currentLevel == i) {
            current_level = level.title;
            level.selected = true;
          }

          Object.defineProperty(level, "enabled", {
            set: function set(v) {
              if (v) hls.currentLevel = i;
            },
            get: function get() {}
          });
        });

        if (typeof params.level !== 'undefined' && hls.levels[params.level]) {
          hls.levels.map(function (e) {
            return e.selected = false;
          });
          hls.levels[params.level].enabled = true;
          hls.levels[params.level].selected = true;
          current_level = hls.levels[params.level].title;
        }

        listener$b.send('levels', {
          levels: hls.levels,
          current: current_level
        });
      }
    }
    /**
     * Установить собственные субтитры
     * @param {[{index:integer, label:string, url:string}]} subs 
     */


    function customSubs(subs) {
      _video.customSubs = subs;
      customsubs = new CustomSubs();
      customsubs.listener.follow('subtitle', function (e) {
        $('> div', subtitles$1).html(e.text ? e.text : '&nbsp;').css({
          display: e.text ? 'inline-block' : 'none'
        });
      });
      var index = -1;
      subs.forEach(function (sub) {
        index++;
        if (typeof sub.index == 'undefined') sub.index = index;

        if (!sub.ready) {
          sub.ready = true;
          Object.defineProperty(sub, "mode", {
            set: function set(v) {
              if (v == 'showing') {
                customsubs.load(sub.url);
              }
            },
            get: function get() {}
          });
        }
      });
    }
    /**
     * Включить или выключить субтитры
     * @param {boolean} status 
     */


    function subsview(status) {
      subtitles$1.toggleClass('hide', !status);
    }
    /**
     * Применяет к блоку субтитров пользовательские настройки
     */


    function applySubsSettings() {
      var hasStroke = Storage.field('subtitles_stroke'),
          hasBackdrop = Storage.field('subtitles_backdrop'),
          size = Storage.field('subtitles_size');
      subtitles$1.removeClass('has--stroke has--backdrop size--normal size--large size--small');
      subtitles$1.addClass('size--' + size);

      if (hasStroke) {
        subtitles$1.addClass('has--stroke');
      }

      if (hasBackdrop) {
        subtitles$1.addClass('has--backdrop');
      }
    }
    /**
     * Создать контейнер для видео
     */


    function create$h() {
      var videobox;

      if (Platform.is('tizen') && Storage.field('player') == 'tizen') {
        videobox = AVPlay(function (object) {
          _video = object;
        });
      } else {
        videobox = $('<video class="player-video__video" poster="./img/video_poster.png" crossorigin="anonymous"></video>');
        _video = videobox[0];

        if (Storage.field('player_normalization')) {
          console.log('Player', 'normalization enabled');
          normalization = new Normalization();
          normalization.attach(_video);
        }
      }

      applySubsSettings();
      display.append(videobox);

      if (Platform.is('webos') && !webos) {
        webos = new create$i(_video);

        webos.callback = function () {
          var src = _video.src;
          var sub = _video.customSubs;
          console.log('WebOS', 'video loaded');
          $(_video).remove();
          if (normalization) normalization.destroy();
          url$5(src);
          _video.customSubs = sub;
          webos.repet(_video);
          listener$b.send('reset_continue', {});
        };

        webos.start();
      }

      bind$2();
    }

    function normalizationVisible(status) {
      if (normalization) normalization.visible(status);
    }
    /**
     * Показать згразку или нет
     * @param {boolean} status 
     */


    function loader(status) {
      wait = status;
      html$a.toggleClass('video--load', status);
    }
    /**
     * Устанавливаем ссылку на видео
     * @param {string} src 
     */


    function url$5(src) {
      loader(true);

      if (hls) {
        hls.destroy();
        hls = false;
      }

      create$h();

      if (/.m3u8/.test(src) && typeof Hls !== 'undefined') {
        if (navigator.userAgent.toLowerCase().indexOf('maple') > -1) src += '|COMPONENT=HLS';

        if (Hls.isSupported()) {
          try {
            hls = new Hls();
            hls.attachMedia(_video);
            hls.loadSource(src);
            hls.on(Hls.Events.ERROR, function (event, data) {
              if (data.details === Hls.ErrorDetails.MANIFEST_PARSING_ERROR) {
                if (data.reason === "no EXTM3U delimiter") {
                  load$1(src);
                }
              }
            });
            hls.on(Hls.Events.MANIFEST_LOADED, function () {
              play$2();
            });
          } catch (e) {
            console.log('Player', 'HLS play error:', e.message);
            load$1(src);
          }
        } else load$1(src);
      } else load$1(src);
    }
    /**
     * Начать загрузку
     * @param {string} src 
     */


    function load$1(src) {
      _video.src = src;

      _video.load();

      play$2();
    }
    /**
     * Играем
     */


    function play$2() {
      var playPromise;

      try {
        playPromise = _video.play();
      } catch (e) {}

      if (playPromise !== undefined) {
        playPromise.then(function () {
          console.log('Player', 'start plaining');
        })["catch"](function (e) {
          console.log('Player', 'play promise error:', e.message);
        });
      }

      paused.addClass('hide');
      listener$b.send('play', {});
    }
    /**
     * Пауза
     */


    function pause() {
      var pausePromise;

      try {
        pausePromise = _video.pause();
      } catch (e) {}

      if (pausePromise !== undefined) {
        pausePromise.then(function () {
          console.log('Player', 'pause');
        })["catch"](function (e) {
          console.log('Player', 'pause promise error:', e.message);
        });
      }

      paused.removeClass('hide');
      listener$b.send('pause', {});
    }
    /**
     * Играем или пауза
     */


    function playpause() {
      if (wait || rewind_position) return;

      if (_video.paused) {
        play$2();
        listener$b.send('play', {});
      } else {
        pause();
        listener$b.send('pause', {});
      }
    }
    /**
     * Завершаем перемотку
     * @param {boolean} immediately - завершить немедленно
     */


    function rewindEnd(immediately) {
      clearTimeout(timer$4.rewind_call);
      timer$4.rewind_call = setTimeout(function () {
        _video.currentTime = rewind_position;
        rewind_position = 0;
        rewind_force = 0;
        play$2();
        if (webos) webos.rewinded();
      }, immediately ? 0 : 500);
    }
    /**
     * Подготовка к перемотке
     * @param {number} position_time - новое время
     * @param {boolean} immediately - завершить немедленно
     */


    function rewindStart(position_time, immediately) {
      if (!_video.duration) return;
      rewind_position = Math.max(0, Math.min(position_time, _video.duration));
      pause();
      if (rewind_position == 0) _video.currentTime = 0;else if (rewind_position == _video.duration) _video.currentTime = _video.duration;
      timer$4.rewind = Date.now();
      listener$b.send('timeupdate', {
        duration: _video.duration,
        current: rewind_position
      });
      listener$b.send('rewind', {});
      rewindEnd(immediately);
    }
    /**
     * Начать перематывать
     * @param {boolean} forward - направление, true - вперед
     * @param {number} custom_step - свое значение в секундах
     */


    function rewind(forward, custom_step) {
      if (_video.duration) {
        var time = Date.now(),
            step = _video.duration / (30 * 60),
            mini = time - (timer$4.rewind || 0) > 50 ? 20 : 60;

        if (rewind_position == 0) {
          rewind_force = Math.min(mini, custom_step || 30 * step);
          rewind_position = _video.currentTime;
        }

        rewind_force *= 1.03;

        if (forward) {
          rewind_position += rewind_force;
        } else {
          rewind_position -= rewind_force;
        }

        rewindStart(rewind_position);
      }
    }
    /**
     * Размер видео, масштаб
     * @param {string} type
     */


    function size$1(type) {
      neeed_sacle = type;
      neeed_sacle_last = type;
      scale();
      if (_video.size) _video.size(type);
    }
    /**
     * Перемотка на позицию 
     * @param {number} type 
     */


    function to(seconds) {
      pause();
      if (seconds == -1) _video.currentTime = _video.duration;else _video.currentTime = seconds;
      play$2();
    }
    /**
     * Уничтожить
     * @param {boolean} type - сохранить с параметрами
     */


    function destroy$5(savemeta) {
      subsview(false);
      neeed_sacle = false;
      paused.addClass('hide');
      if (webos) webos.destroy();
      webos = null;
      webos_wait = {};

      if (hls) {
        hls.destroy();
        hls = false;
      }

      if (!savemeta) {
        if (customsubs) {
          customsubs.destroy();
          customsubs = false;
        }
      }

      if (_video) {
        if (_video.destroy) _video.destroy();else {
          _video.src = "";

          _video.load();
        }
      }

      if (normalization) {
        normalization.destroy();
        normalization = false;
      }

      display.empty();
      loader(false);
    }

    function render$7() {
      return html$a;
    }

    var PlayerVideo = {
      listener: listener$b,
      url: url$5,
      render: render$7,
      destroy: destroy$5,
      playpause: playpause,
      rewind: rewind,
      play: play$2,
      pause: pause,
      size: size$1,
      subsview: subsview,
      customSubs: customSubs,
      to: to,
      video: function video() {
        return _video;
      },
      saveParams: saveParams,
      clearParamas: clearParamas,
      setParams: setParams,
      normalizationVisible: normalizationVisible
    };

    var html$9 = Template.get('player_info');
    var listener$a = start$3();
    var network$a = new create$m();
    var elems = {
      name: $('.player-info__name', html$9),
      size: $('.value--size span', html$9),
      stat: $('.value--stat span', html$9),
      speed: $('.value--speed span', html$9),
      error: $('.player-info__error', html$9)
    };
    var error$1, stat_timer;
    Utils.time(html$9);
    /**
     * Установить значение
     * @param {string} need
     * @param {string|{width,height}} value 
     */

    function set$2(need, value) {
      if (need == 'name') elems.name.html(value);else if (need == 'size' && value.width && value.height) elems.size.text(value.width + 'x' + value.height);else if (need == 'error') {
        clearTimeout(error$1);
        elems.error.removeClass('hide').text(value);
        error$1 = setTimeout(function () {
          elems.error.addClass('hide');
        }, 5000);
      } else if (need == 'stat') stat$1(value);
    }
    /**
     * Показываем статистику по торренту
     * @param {string} url 
     */


    function stat$1(url) {
      var wait = 0;
      elems.stat.text('- / - • - seeds');
      elems.speed.text('--');

      var update = function update() {
        // если панель скрыта, то зачем каждую секунду чекать? хватит и 5 сек
        // проверено, если ставить на паузу, разадача удаляется, но если чекать постоянно, то все норм
        if (!html$9.hasClass('info--visible')) {
          wait++;
          if (wait <= 5) return;else wait = 0;
        }

        network$a.timeout(2000);
        network$a.silent(url.replace('preload', 'stat').replace('play', 'stat'), function (data) {
          elems.stat.text((data.active_peers || 0) + ' / ' + (data.total_peers || 0) + ' • ' + (data.connected_seeders || 0) + ' seeds');
          elems.speed.text(data.download_speed ? Utils.bytesToSize(data.download_speed * 8, true) + '/c' : '0.0');
          listener$a.send('stat', {
            data: data
          });
        });
      };

      stat_timer = setInterval(update, 2000);
      update();
    }
    /**
     * Показать скрыть инфо
     * @param {boolean} status 
     */


    function toggle$5(status) {
      html$9.toggleClass('info--visible', status);
    }
    /**
     * Уничтожить
     */


    function destroy$4() {
      elems.size.text('Загрузка...');
      elems.stat.text('');
      elems.speed.text('');
      elems.error.addClass('hide');
      clearTimeout(error$1);
      clearInterval(stat_timer);
      network$a.clear();
    }

    function render$6() {
      return html$9;
    }

    var PlayerInfo = {
      listener: listener$a,
      render: render$6,
      set: set$2,
      toggle: toggle$5,
      destroy: destroy$4
    };

    var listener$9 = start$3();
    var current = '';
    var playlist$1 = [];
    var position$1 = 0;
    /**
     * Показать плейлист
     */

    function show$2() {
      active$3();
      var enabled = Controller.enabled();
      Select.show({
        title: 'Плейлист',
        items: playlist$1,
        onSelect: function onSelect(a) {
          Controller.toggle(enabled.name);
          listener$9.send('select', {
            playlist: playlist$1,
            item: a,
            position: position$1
          });
        },
        onBack: function onBack() {
          Controller.toggle(enabled.name);
        }
      });
    }
    /**
     * Установить активным
     */


    function active$3() {
      playlist$1.forEach(function (element) {
        element.selected = element.url == current;
        if (element.selected) position$1 = playlist$1.indexOf(element);
      });
    }
    /**
     * Назад
     */


    function prev() {
      active$3();

      if (position$1 > 0) {
        listener$9.send('select', {
          playlist: playlist$1,
          position: position$1 - 1,
          item: playlist$1[position$1 - 1]
        });
      }
    }
    /**
     * Далее
     */


    function next() {
      active$3();

      if (position$1 < playlist$1.length - 1) {
        listener$9.send('select', {
          playlist: playlist$1,
          position: position$1 + 1,
          item: playlist$1[position$1 + 1]
        });
      }
    }
    /**
     * Установить плейлист
     * @param {[{title:string, url:string}]} p 
     */


    function set$1(p) {
      playlist$1 = p;
      playlist$1.forEach(function (l, i) {
        if (l.url == current) position$1 = i;
      });
      listener$9.send('set', {
        playlist: playlist$1,
        position: position$1
      });
    }
    /**
     * Получить список
     * @returns {[{title:string, url:string}]}
     */


    function get$c() {
      return playlist$1;
    }
    /**
     * Установить текуший урл
     * @param {string} u 
     */


    function url$4(u) {
      current = u;
    }

    var PlayerPlaylist = {
      listener: listener$9,
      show: show$2,
      url: url$4,
      get: get$c,
      set: set$1,
      prev: prev,
      next: next
    };

    var listener$8 = start$3();
    var enabled$1 = false;
    var worked = false;
    var chrome = false;
    var img$3;
    var html$8 = Template.get('screensaver');
    var movies = [];
    var timer$3 = {};
    var position = 0;
    var slides$1 = 'one';
    var direct = ['lt', 'rt', 'br', 'lb', 'ct'];
    html$8.on('click', function () {
      if (isWorked()) stopSlideshow();
    });

    function toggle$4(is_enabled) {
      enabled$1 = is_enabled;
      if (enabled$1) resetTimer();else clearTimeout(timer$3.wait);
      listener$8.send('toggle', {
        status: enabled$1
      });
    }

    function enable$1() {
      toggle$4(true);
    }

    function disable() {
      toggle$4(false);
    }

    function resetTimer() {
      if (!enabled$1) return;
      clearTimeout(timer$3.wait);
      if (!Storage.field('screensaver')) return;
      timer$3.wait = setTimeout(function () {
        if (Storage.field('screensaver_type') == 'nature') startSlideshow();else startChrome();
      }, 300 * 1000); //300 * 1000 = 5 минут
    }

    function startChrome() {
      worked = true;
      chrome = $('<div class="screensaver-chrome"><iframe src="https://clients3.google.com/cast/chromecast/home" class="screensaver-chrome__iframe"></iframe><div class="screensaver-chrome__overlay"></div></div>');
      chrome.find('.screensaver-chrome__overlay').on('click', function () {
        stopSlideshow();
      });
      $('body').append(chrome);
    }

    function startSlideshow() {
      if (!Storage.field('screensaver')) return;
      worked = true;
      html$8.fadeIn(300);
      Utils.time(html$8);
      nextSlide();
      timer$3.work = setInterval(function () {
        nextSlide();
      }, 30000);
      timer$3.start = setTimeout(function () {
        html$8.addClass('visible');
      }, 5000);
    }

    function nextSlide() {
      var movie = movies[position];
      var image = 'https://source.unsplash.com/1600x900/?nature&order_by=relevant&v=' + Math.random();
      img$3 = null;
      img$3 = new Image();
      img$3.src = image;

      img$3.onload = function () {
        var to = $('.screensaver__slides-' + (slides$1 == 'one' ? 'two' : 'one'), html$8);
        to[0].src = img$3.src;
        to.removeClass(direct.join(' ') + ' animate').addClass(direct[Math.floor(Math.random() * direct.length)]);
        setTimeout(function () {
          $('.screensaver__title', html$8).removeClass('visible');
          $('.screensaver__slides-' + slides$1, html$8).removeClass('visible');
          slides$1 = slides$1 == 'one' ? 'two' : 'one';
          to.addClass('visible').addClass('animate');

          if (movie) {
            setTimeout(function () {
              $('.screensaver__title-name', html$8).text(movie.title || movie.name);
              $('.screensaver__title-tagline', html$8).text(movie.original_title || movie.original_name);
              $('.screensaver__title', html$8).addClass('visible');
            }, 500);
          }
        }, 3000);
      };

      img$3.onerror = function (e) {
        console.error(e);
      };

      position++;
      if (position >= movies.length) position = 0;
    }

    function stopSlideshow() {
      setTimeout(function () {
        worked = false;
      }, 300);
      html$8.fadeOut(300, function () {
        html$8.removeClass('visible');
      });
      clearInterval(timer$3.work);
      clearTimeout(timer$3.start);
      movies = [];

      if (chrome) {
        chrome.remove();
        chrome = false;
      }
    }

    function init$e() {
      $('body').append(html$8);
      resetTimer();
      Keypad.listener.follow('keydown', function (e) {
        resetTimer();

        if (worked) {
          stopSlideshow();
          e.event.preventDefault();
        }
      });
      Keypad.listener.follow('keyup', function (e) {
        if (worked) e.event.preventDefault();
      });
      $(window).on('mousedown', function (e) {
        resetTimer();
      });
    }

    function isWorked() {
      return enabled$1 ? worked : enabled$1;
    }

    function render$5() {
      return html$8;
    }

    var Screensaver = {
      listener: listener$8,
      init: init$e,
      enable: enable$1,
      render: render$5,
      disable: disable,
      isWorked: isWorked,
      //for android back
      stopSlideshow: stopSlideshow //for android back

    };

    var html$7, active$2, scroll, last$2;

    function open$3(params) {
      active$2 = params;
      html$7 = Template.get('modal', {
        title: params.title
      });
      html$7.on('click', function (e) {
        if (!$(e.target).closest($('.modal__content', html$7)).length) window.history.back();
      });
      title$1(params.title);
      html$7.toggleClass('modal--medium', params.size == 'medium' ? true : false);
      html$7.toggleClass('modal--large', params.size == 'large' ? true : false);
      html$7.toggleClass('modal--overlay', params.overlay ? true : false);
      scroll = new create$l({
        over: true,
        mask: params.mask
      });
      html$7.find('.modal__body').append(scroll.render());
      bind$1(params.html);
      scroll.append(params.html);
      $('body').append(html$7);
      toggle$3();
    }

    function bind$1(where) {
      where.find('.selector').on('hover:focus', function (e) {
        last$2 = e.target;
        scroll.update($(e.target));
      }).on('hover:enter', function (e) {
        if (active$2.onSelect) active$2.onSelect($(e.target));
      });
    }

    function jump(tofoward) {
      var select = scroll.render().find('.selector.focus');
      if (tofoward) select = select.nextAll().filter('.selector');else select = select.prevAll().filter('.selector');
      select = select.slice(0, 10);
      select = select.last();

      if (select.length) {
        Controller.collectionFocus(select[0], scroll.render());
      }
    }

    function toggle$3() {
      Controller.add('modal', {
        invisible: true,
        toggle: function toggle() {
          Controller.collectionSet(scroll.render());
          Controller.collectionFocus(last$2, scroll.render());
        },
        up: function up() {
          Navigator.move('up');
        },
        down: function down() {
          Navigator.move('down');
        },
        right: function right() {
          jump(true);
        },
        left: function left() {
          jump(false);
        },
        back: function back() {
          if (active$2.onBack) active$2.onBack();
        }
      });
      Controller.toggle('modal');
    }

    function update$6(new_html) {
      last$2 = false;
      scroll.clear();
      scroll.append(new_html);
      bind$1(new_html);
      toggle$3();
    }

    function title$1(tit) {
      html$7.find('.modal__title').text(tit);
      html$7.toggleClass('modal--empty-title', tit ? false : true);
    }

    function destroy$3() {
      last$2 = false;
      scroll.destroy();
      html$7.remove();
    }

    function close$2() {
      destroy$3();
    }

    var Modal = {
      open: open$3,
      close: close$2,
      update: update$6,
      title: title$1,
      toggle: toggle$3
    };

    var network$9 = new create$m();

    function url$3() {
      var u = ip();
      return u ? Utils.checkHttp(u) : u;
    }

    function ip() {
      return Storage.get(Storage.field('torrserver_use_link') == 'two' ? 'torrserver_url_two' : 'torrserver_url');
    }

    function my(success, fail) {
      var data = JSON.stringify({
        action: 'list'
      });
      clear$7();
      network$9.silent(url$3() + '/torrents', function (result) {
        if (result.length) success(result);else fail();
      }, fail, data);
    }

    function add$8(object, success, fail) {
      var data = JSON.stringify({
        action: 'add',
        link: object.link,
        title: '[LAMPA] ' + (object.title + '').replace('??', '?'),
        poster: object.poster,
        data: object.data ? JSON.stringify(object.data) : '',
        save_to_db: true
      });
      clear$7();
      network$9.silent(url$3() + '/torrents', success, fail, data);
    }

    function hash$1(object, success, fail) {
      var data = JSON.stringify({
        action: 'add',
        link: object.link,
        title: '[LAMPA] ' + (object.title + '').replace('??', '?'),
        poster: object.poster,
        data: object.data ? JSON.stringify(object.data) : '',
        save_to_db: Storage.get('torrserver_savedb', 'false')
      });
      clear$7();
      network$9.silent(url$3() + '/torrents', success, function (a, c) {
        fail(network$9.errorDecode(a, c));
      }, data);
    }

    function files$1(hash, success, fail) {
      var data = JSON.stringify({
        action: 'get',
        hash: hash
      });
      clear$7();
      network$9.timeout(2000);
      network$9.silent(url$3() + '/torrents', function (json) {
        if (json.file_stats) {
          success(json);
        }
      }, fail, data);
    }

    function connected(success, fail) {
      clear$7();
      network$9.timeout(5000);
      network$9.silent(url$3() + '/settings', function (json) {
        if (typeof json.CacheSize == 'undefined') {
          fail('Не удалось подтвердить версию Matrix');
        } else {
          success(json);
        }
      }, function (a, c) {
        fail(network$9.errorDecode(a, c));
      }, JSON.stringify({
        action: 'get'
      }));
    }

    function stream(path, hash, id) {
      return url$3() + '/stream/' + encodeURIComponent(path.split('\\').pop().split('/').pop()) + '?link=' + hash + '&index=' + id + '&' + (Storage.field('torrserver_preload') ? 'preload' : 'play');
    }

    function drop(hash, success, fail) {
      var data = JSON.stringify({
        action: 'drop',
        hash: hash
      });
      clear$7();
      network$9.silent(url$3() + '/torrents', success, fail, data, {
        dataType: 'text'
      });
    }

    function remove$1(hash, success, fail) {
      var data = JSON.stringify({
        action: 'rem',
        hash: hash
      });
      clear$7();
      network$9.silent(url$3() + '/torrents', success, fail, data, {
        dataType: 'text'
      });
    }

    function parse$1(file_path, movie, is_file) {
      var path = file_path.toLowerCase();
      var data = {
        hash: '',
        season: 0,
        episode: 0,
        serial: movie.number_of_seasons ? true : false
      };
      var math = path.match(/s([0-9]+)\.?ep?([0-9]+)/);
      if (!math) math = path.match(/s([0-9]{2})([0-9]+)/);
      if (!math) math = path.match(/[ |\[|(]([0-9]{1,2})x([0-9]+)/);

      if (!math) {
        math = path.match(/[ |\[|(]([0-9]{1,3}) of ([0-9]+)/);
        if (math) math = [0, 1, math[1]];
      }

      if (!math) {
        math = path.match(/ep?([0-9]+)/);
        if (math) math = [0, 0, math[1]];
      }

      if (is_file) {
        data.hash = Utils.hash(file_path);
      } else if (math && movie.number_of_seasons) {
        data.season = parseInt(math[1]);
        data.episode = parseInt(math[2]);

        if (data.season === 0) {
          math = path.match(/s([0-9]+)/);
          if (math) data.season = parseInt(math[1]);
        }

        if (data.episode === 0) {
          math = path.match(/ep?([0-9]+)/);
          if (math) data.episode = parseInt(math[1]);
        }

        if (isNaN(data.season)) data.season = 0;
        if (isNaN(data.episode)) data.episode = 0;

        if (data.season && data.episode) {
          data.hash = [Utils.hash(movie.original_title), data.season, data.episode].join('_');
        } else if (data.episode) {
          data.season = 1;
          data.hash = [Utils.hash(movie.original_title), data.season, data.episode].join('_');
        } else {
          hash$1 = Utils.hash(file_path);
        }
      } else if (movie.original_title && !data.serial) {
        data.hash = Utils.hash(movie.original_title);
      } else {
        data.hash = Utils.hash(file_path);
      }

      return data;
    }

    function clear$7() {
      network$9.clear();
    }

    function error() {
      var temp = Template.get('torrent_error', {
        ip: ip()
      });
      var list = temp.find('.torrent-checklist__list > li');
      var info = temp.find('.torrent-checklist__info > div');
      var next = temp.find('.torrent-checklist__next-step');
      var prog = temp.find('.torrent-checklist__progress-bar > div');
      var comp = temp.find('.torrent-checklist__progress-steps');
      var btn = temp.find('.selector');
      var position = -2;

      function makeStep() {
        position++;
        list.slice(0, position + 1).addClass('wait');
        var total = list.length;
        comp.text('Выполнено ' + Math.max(0, position) + ' из ' + total);

        if (position > list.length) {
          Modal.close();
          Controller.toggle('content');
        } else if (position >= 0) {
          info.addClass('hide');
          info.eq(position).removeClass('hide');
          var next_step = list.eq(position + 1);
          prog.css('width', Math.round(position / total * 100) + '%');
          list.slice(0, position).addClass('check');
          btn.text(position < total ? 'Далее' : 'Завершить');
          next.text(next_step.length ? '- ' + next_step.text() : '');
        }
      }

      makeStep();
      btn.on('hover:enter', function () {
        makeStep();
      });
      Modal.title('Ошибка подключения');
      Modal.update(temp);
      Controller.add('modal', {
        invisible: true,
        toggle: function toggle() {
          Controller.collectionSet(temp);
          Controller.collectionFocus(false, temp);
        },
        back: function back() {
          Modal.close();
          Controller.toggle('content');
        }
      });
      Controller.toggle('modal');
    }

    var Torserver = {
      ip: ip,
      my: my,
      add: add$8,
      url: url$3,
      hash: hash$1,
      files: files$1,
      clear: clear$7,
      drop: drop,
      stream: stream,
      remove: remove$1,
      connected: connected,
      parse: parse$1,
      error: error
    };

    var timer$2;
    var listener$7;
    /**
     * Открыть окно
     * @param {{type:string, object:{}}} params 
     */

    function open$2(params) {
      var enabled = Controller.enabled().name;
      var text = params.type == 'card' ? 'Открыть карточку на другом устройстве' : params.type == 'play' ? 'Выберите устройство на котором смотреть' : '';
      var temp = Template.get('broadcast', {
        text: text
      });
      var list = temp.find('.broadcast__devices');
      if (!text) temp.find('.about').remove();

      listener$7 = function listener(e) {
        if (e.method == 'devices') {
          var devices = e.data.filter(function (d) {
            return !(d.name == 'CUB' || d.device_id == Socket.uid());
          });
          list.empty();
          devices.forEach(function (device) {
            var item = $('<div class="broadcast__device selector">' + device.name + '</div>');
            item.on('hover:enter', function () {
              close$1();
              Controller.toggle(enabled);

              if (params.type == 'card') {
                Socket.send('open', {
                  params: params.object,
                  uid: device.uid
                });
              }

              if (params.type == 'play') {
                Socket.send('other', {
                  params: {
                    submethod: 'play',
                    object: params.object
                  },
                  uid: device.uid
                });
              }
            });
            list.append(item);
          });
          Modal.toggle();
        }
      };

      Modal.open({
        title: '',
        html: temp,
        size: 'small',
        mask: true,
        onBack: function onBack() {
          close$1();
          Controller.toggle(enabled);
        }
      });
      listener$7({
        method: 'devices',
        data: Socket.devices()
      });
      Socket.listener.follow('message', listener$7);
    }
    /**
     * Закрыть окно
     */


    function close$1() {
      Socket.listener.remove('message', listener$7);
      clearInterval(timer$2);
      Modal.close();
      listener$7 = null;
    }

    var Broadcast = {
      open: open$2
    };

    var html$6 = Template.get('player');
    html$6.append(PlayerVideo.render());
    html$6.append(PlayerPanel.render());
    html$6.append(PlayerInfo.render());
    var listener$6 = start$3();
    var callback$2;
    var work = false;
    var network$8 = new create$m();
    var launch_player;
    var timer_ask;
    var preloader = {
      wait: false
    };
    var viewing = {
      time: 0,
      difference: 0,
      current: 0
    };
    html$6.on('mousemove', function () {
      if (Storage.field('navigation_type') == 'mouse') PlayerPanel.mousemove();
    });
    /**
     * Подписываемся на события
     */

    /** Следим за обновлением времени */

    PlayerVideo.listener.follow('timeupdate', function (e) {
      PlayerPanel.update('time', Utils.secondsToTime(e.current | 0, true));
      PlayerPanel.update('timenow', Utils.secondsToTime(e.current || 0));
      PlayerPanel.update('timeend', Utils.secondsToTime(e.duration || 0));
      PlayerPanel.update('position', e.current / e.duration * 100 + '%');

      if (work && work.timeline && !work.timeline.waiting_for_user && e.duration) {
        if (Storage.field('player_timecode') !== 'again' && !work.timeline.continued) {
          var prend = e.duration - 15,
              posit = Math.round(e.duration * work.timeline.percent / 100);
          if (posit > 10) PlayerVideo.to(posit > prend ? prend : posit);
          work.timeline.continued = true;
        } else {
          work.timeline.percent = Math.round(e.current / e.duration * 100);
          work.timeline.time = e.current;
          work.timeline.duration = e.duration;
        }
      }

      viewing.difference = e.current - viewing.current;
      viewing.current = e.current;
      if (viewing.difference > 0 && viewing.difference < 3) viewing.time += viewing.difference;
    });
    /** Буферизация видео */

    PlayerVideo.listener.follow('progress', function (e) {
      PlayerPanel.update('peding', e.down);
    });
    /** Может ли плеер начать играть */

    PlayerVideo.listener.follow('canplay', function (e) {
      PlayerPanel.canplay();
    });
    /** Плей видео */

    PlayerVideo.listener.follow('play', function (e) {
      Screensaver.disable();
      PlayerPanel.update('play');
    });
    /** Пауза видео */

    PlayerVideo.listener.follow('pause', function (e) {
      Screensaver.enable();
      PlayerPanel.update('pause');
    });
    /** Перемотка видео */

    PlayerVideo.listener.follow('rewind', function (e) {
      PlayerPanel.rewind();
    });
    /** Видео было завершено */

    PlayerVideo.listener.follow('ended', function (e) {
      if (Storage.field('playlist_next')) PlayerPlaylist.next();
    });
    /** Дорожки полученые из видео */

    PlayerVideo.listener.follow('tracks', function (e) {
      PlayerPanel.setTracks(e.tracks);
    });
    /** Субтитры полученые из видео */

    PlayerVideo.listener.follow('subs', function (e) {
      PlayerPanel.setSubs(e.subs);
    });
    /** Качество видео в m3u8 */

    PlayerVideo.listener.follow('levels', function (e) {
      PlayerPanel.setLevels(e.levels, e.current);
    });
    /** Размер видео */

    PlayerVideo.listener.follow('videosize', function (e) {
      PlayerInfo.set('size', e);
    });
    /** Ошибка при попытки возпроизвести */

    PlayerVideo.listener.follow('error', function (e) {
      if (work) PlayerInfo.set('error', e.error);
    });
    /** Сбросить (продолжить) */

    PlayerVideo.listener.follow('reset_continue', function (e) {
      if (work && work.timeline) work.timeline.continued = false;
    });
    /** Перемотка мышкой */

    PlayerPanel.listener.follow('mouse_rewind', function (e) {
      var vid = PlayerVideo.video();

      if (vid && vid.duration) {
        e.time.removeClass('hide').text(Utils.secondsToTime(vid.duration * e.percent)).css('left', e.percent * 100 + '%');

        if (e.method == 'click') {
          PlayerVideo.to(vid.duration * e.percent);
        }
      }
    });
    /** Плей/Пауза */

    PlayerPanel.listener.follow('playpause', function (e) {
      PlayerVideo.playpause();
    });
    /** Нажали на плейлист */

    PlayerPanel.listener.follow('playlist', function (e) {
      PlayerPlaylist.show();
    });
    /** Изменить размер видео */

    PlayerPanel.listener.follow('size', function (e) {
      PlayerVideo.size(e.size);
      Storage.set('player_size', e.size);
    });
    /** Предыдущая серия */

    PlayerPanel.listener.follow('prev', function (e) {
      PlayerPlaylist.prev();
    });
    /** Следуюшия серия */

    PlayerPanel.listener.follow('next', function (e) {
      PlayerPlaylist.next();
    });
    /** Перемотать назад */

    PlayerPanel.listener.follow('rprev', function (e) {
      PlayerVideo.rewind(false);
    });
    /** Перемотать далее */

    PlayerPanel.listener.follow('rnext', function (e) {
      PlayerVideo.rewind(true);
    });
    /** Показать/скрыть субтитры */

    PlayerPanel.listener.follow('subsview', function (e) {
      PlayerVideo.subsview(e.status);
    });
    /** Состояние панели, скрыта или нет */

    PlayerPanel.listener.follow('visible', function (e) {
      PlayerInfo.toggle(e.status);
      PlayerVideo.normalizationVisible(e.status);
    });
    /** К началу видео */

    PlayerPanel.listener.follow('to_start', function (e) {
      PlayerVideo.to(0);
    });
    /** К концу видео */

    PlayerPanel.listener.follow('to_end', function (e) {
      PlayerVideo.to(-1);
    });
    /** На весь экран */

    PlayerPanel.listener.follow('fullscreen', function () {
      var doc = window.document;
      var elem = doc.documentElement;
      var requestFullScreen = elem.requestFullscreen || elem.mozRequestFullScreen || elem.webkitRequestFullScreen || elem.msRequestFullscreen;
      var cancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;

      if (!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
        requestFullScreen.call(elem);
      } else {
        cancelFullScreen.call(doc);
      }
    });
    /** Переключили качемтво видео */

    PlayerPanel.listener.follow('quality', function (e) {
      PlayerVideo.destroy(true);
      PlayerVideo.url(e.url);
      if (work && work.timeline) work.timeline.continued = false;
    });
    /** Нажали на кнопку (отправить) */

    PlayerPanel.listener.follow('share', function (e) {
      Broadcast.open({
        type: 'play',
        object: {
          player: work,
          playlist: PlayerPlaylist.get()
        }
      });
    });
    /** Событие на переключение серии */

    PlayerPlaylist.listener.follow('select', function (e) {
      var params = PlayerVideo.saveParams();
      destroy$2();
      play$1(e.item);
      PlayerVideo.setParams(params);
      if (e.item.url.indexOf(Torserver.ip()) > -1) PlayerInfo.set('stat', e.item.url);
      PlayerPanel.showNextEpisodeName({
        playlist: e.playlist,
        position: e.position
      });
    });
    /** Установить название следующей серии */

    PlayerPlaylist.listener.follow('set', PlayerPanel.showNextEpisodeName);
    /** Прослушиваем на сколько загрузилось, затем запускаем видео */

    PlayerInfo.listener.follow('stat', function (e) {
      if (preloader.wait) {
        var pb = e.data.preloaded_bytes || 0,
            ps = e.data.preload_size || 0;
        var progress = Math.min(100, pb * 100 / ps);
        PlayerPanel.update('timenow', Math.round(progress) + '%');
        PlayerPanel.update('timeend', 100 + '%');
        PlayerPanel.update('peding', progress + '%');

        if (progress >= 90 || isNaN(progress)) {
          PlayerPanel.update('peding', '0%');
          preloader.wait = false;
          preloader.call();
        }
      }
    });
    /**
     * Главный контроллер
     */

    function toggle$2() {
      Controller.add('player', {
        invisible: true,
        toggle: function toggle() {
          PlayerPanel.hide();
        },
        up: function up() {
          PlayerPanel.toggle();
        },
        down: function down() {
          PlayerPanel.toggle();
        },
        right: function right() {
          PlayerVideo.rewind(true);
        },
        left: function left() {
          PlayerVideo.rewind(false);
        },
        gone: function gone() {},
        enter: function enter() {
          PlayerVideo.playpause();
        },
        playpause: function playpause() {
          PlayerVideo.playpause();
        },
        play: function play() {
          PlayerVideo.play();
        },
        pause: function pause() {
          PlayerVideo.pause();
        },
        rewindForward: function rewindForward() {
          PlayerVideo.rewind(true);
        },
        rewindBack: function rewindBack() {
          PlayerVideo.rewind(false);
        },
        back: backward$1
      });
      Controller.toggle('player');
    }
    /**
     * Контроллер предзагрузки
     */


    function togglePreload() {
      Controller.add('player_preload', {
        invisible: true,
        toggle: function toggle() {},
        enter: function enter() {
          PlayerPanel.update('peding', '0%');
          preloader.wait = false;
          preloader.call();
        },
        back: backward$1
      });
      Controller.toggle('player_preload');
    }
    /**
     * Вызвать событие назад
     */


    function backward$1() {
      destroy$2();
      if (callback$2) callback$2();else Controller.toggle('content');
      callback$2 = false;
    }
    /**
     * Уничтожить плеер
     */


    function destroy$2() {
      if (work.timeline && work.timeline.handler) work.timeline.handler(work.timeline.percent, work.timeline.time, work.timeline.duration);
      if (work.viewed) work.viewed(viewing.time);
      clearTimeout(timer_ask);
      work = false;
      preloader.wait = false;
      preloader.call = null;
      viewing.time = 0;
      viewing.difference = 0;
      viewing.current = 0;
      Screensaver.enable();
      PlayerVideo.destroy();
      PlayerVideo.clearParamas();
      PlayerPanel.destroy();
      PlayerInfo.destroy();
      html$6.detach();
      listener$6.send('destroy', {});
    }
    /**
     * Запустить webos плеер
     * @param {Object} params 
     */


    function runWebOS(params) {
      webOS.service.request("luna://com.webos.applicationManager", {
        method: "launch",
        parameters: {
          "id": params.need,
          "params": {
            "payload": [{
              "fullPath": params.url,
              "artist": "",
              "subtitle": "",
              "dlnaInfo": {
                "flagVal": 4096,
                "cleartextSize": "-1",
                "contentLength": "-1",
                "opVal": 1,
                "protocolInfo": "http-get:*:video/x-matroska:DLNA.ORG_OP=01;DLNA.ORG_CI=0;DLNA.ORG_FLAGS=01700000000000000000000000000000",
                "duration": 0
              },
              "mediaType": "VIDEO",
              "thumbnail": "",
              "deviceType": "DMR",
              "album": "",
              "fileName": params.name,
              "lastPlayPosition": params.position
            }]
          }
        },
        onSuccess: function onSuccess() {
          console.log("The app is launched");
        },
        onFailure: function onFailure(inError) {
          console.log('Player', "Failed to launch the app (" + params.need + "): ", "[" + inError.errorCode + "]: " + inError.errorText);

          if (params.need == 'com.webos.app.photovideo') {
            params.need = 'com.webos.app.smartshare';
            runWebOS(params);
          } else if (params.need == 'com.webos.app.smartshare') {
            params.need = 'com.webos.app.mediadiscovery';
            runWebOS(params);
          }
        }
      });
    }
    /**
     * Показать предзагрузку торрента
     * @param {Object} data 
     * @param {Function} call 
     */


    function preload(data, call) {
      if (data.url.indexOf(Torserver.ip()) > -1 && data.url.indexOf('&preload') > -1) {
        preloader.wait = true;
        PlayerInfo.set('name', data.title);
        $('body').append(html$6);
        PlayerPanel.show(true);
        togglePreload();
        network$8.timeout(2000);
        network$8.silent(data.url);

        preloader.call = function () {
          data.url = data.url.replace('&preload', '&play');
          call();
        };
      } else call();
    }
    /**
     * Спросить продолжать ли просмотр
     */


    function ask() {
      if (work && work.timeline && work.timeline.percent) {
        work.timeline.waiting_for_user = false;

        if (Storage.field('player_timecode') == 'ask') {
          work.timeline.waiting_for_user = true;
          Select.show({
            title: 'Действие',
            items: [{
              title: 'Продолжить просмотр с ' + Utils.secondsToTime(work.timeline.time) + '?',
              yes: true
            }, {
              title: 'Нет'
            }],
            onBack: function onBack() {
              work.timeline.continued = true;
              toggle$2();
              clearTimeout(timer_ask);
            },
            onSelect: function onSelect(a) {
              work.timeline.waiting_for_user = false;
              if (!a.yes) work.timeline.continued = true;
              toggle$2();
              clearTimeout(timer_ask);
            }
          });
          clearTimeout(timer_ask);
          timer_ask = setTimeout(function () {
            work.timeline.continued = true;
            Select.hide();
            toggle$2();
          }, 8000);
        }
      }
    }
    /**
     * Запустить плеер
     * @param {Object} data 
     */


    function play$1(data) {
      console.log('Player', 'url:', data.url);

      var lauch = function lauch() {
        preload(data, function () {
          listener$6.send('start', data);
          work = data;
          if (work.timeline) work.timeline.continued = false;
          PlayerPlaylist.url(data.url);
          PlayerPanel.quality(data.quality, data.url);
          PlayerVideo.url(data.url);
          PlayerVideo.size(Storage.get('player_size', 'default'));
          if (data.subtitles) PlayerVideo.customSubs(data.subtitles);
          PlayerInfo.set('name', data.title);
          if (!preloader.call) $('body').append(html$6);
          toggle$2();
          PlayerPanel.show(true);
          Controller.updateSelects();
          ask();
          listener$6.send('ready', data);
        });
      };

      if (launch_player == 'lampa') lauch();else if (Platform.is('webos') && (Storage.field('player') == 'webos' || launch_player == 'webos')) {
        data.url = data.url.replace('&preload', '&play');
        runWebOS({
          need: 'com.webos.app.photovideo',
          url: data.url,
          name: data.path || data.title,
          position: data.timeline ? data.timeline.time || -1 : -1
        });
      } else if (Platform.is('android') && (Storage.field('player') == 'android' || launch_player == 'android')) {
        data.url = data.url.replace('&preload', '&play');
        Android.openPlayer(data.url, data);
      } else if (Platform.is('nw') && Storage.field('player') == 'other') {
        var path = Storage.field('player_nw_path');

        var file = require('fs');

        if (file.existsSync(path)) {
          var spawn = require('child_process').spawn;

          spawn(path, [data.url.replace(/\s/g, '%20')]);
        } else {
          Noty.show('Плеер не найден: ' + path);
        }
      } else lauch();
      launch_player = '';
    }
    /**
     * Статистика для торрсервера
     * @param {String} url 
     */


    function stat(url) {
      if (work || preloader.wait) PlayerInfo.set('stat', url);
    }
    /**
     * Установить плейлист
     * @param {Array} playlist 
     */


    function playlist(playlist) {
      if (work || preloader.wait) PlayerPlaylist.set(playlist);
    }
    /**
     * Установить субтитры
     * @param {Array} subs 
     */


    function subtitles(subs) {
      if (work || preloader.wait) {
        PlayerVideo.customSubs(subs);
      }
    }
    /**
     * Запустить другой плеер
     * @param {String} need - тип плеера
     */


    function runas(need) {
      launch_player = need;
    }
    /**
     * Обратный вызов
     * @param {Function} back 
     */


    function onBack(back) {
      callback$2 = back;
    }
    /**
     * Рендер плеера
     * @returns Html
     */


    function render$4() {
      return html$6;
    }
    /**
     * Возвращает статус, открыт ли плеер
     * @returns boolean
     */


    function opened$1() {
      return $('body').find('.player').length ? true : false;
    }

    var Player = {
      listener: listener$6,
      play: play$1,
      playlist: playlist,
      render: render$4,
      stat: stat,
      subtitles: subtitles,
      runas: runas,
      callback: onBack,
      opened: opened$1,
      destroy: destroy$2
    };

    function update$5(params) {
      if (params.hash == 0) return;
      var viewed = Storage.cache('file_view', 10000, {});
      var road = viewed[params.hash];

      if (typeof road == 'undefined' || typeof road == 'number') {
        road = {
          duration: 0,
          time: 0,
          percent: 0
        };
        viewed[params.hash] = road;
      }

      road.percent = params.percent;
      if (typeof params.time !== 'undefined') road.time = params.time;
      if (typeof params.duration !== 'undefined') road.duration = params.duration;
      Storage.set('file_view', viewed);
      var line = $('.time-line[data-hash="' + params.hash + '"]').toggleClass('hide', params.percent ? false : true);
      $('> div', line).css({
        width: params.percent + '%'
      });
      $('.time-line-details[data-hash="' + params.hash + '"]').each(function () {
        var f = format(road);
        $(this).find('[a="t"]').text(f.time);
        $(this).find('[a="p"]').text(f.percent);
        $(this).find('[a="d"]').text(f.duration);
        $(this).toggleClass('hide', road.duration ? false : true);
      });
      if (!params.received) Socket.send('timeline', {
        params: params
      });
    }

    function view$1(hash) {
      var viewed = Storage.cache('file_view', 10000, {}),
          curent = typeof viewed[hash] !== 'undefined' ? viewed[hash] : 0;
      var road = {
        percent: 0,
        time: 0,
        duration: 0
      };

      if (_typeof(curent) == 'object') {
        road.percent = curent.percent;
        road.time = curent.time;
        road.duration = curent.duration;
      } else {
        road.percent = curent || 0;
      }

      return {
        hash: hash,
        percent: road.percent,
        time: road.time,
        duration: road.duration,
        handler: function handler(percent, time, duration) {
          return update$5({
            hash: hash,
            percent: percent,
            time: time,
            duration: duration
          });
        }
      };
    }

    function render$3(params) {
      var line = Template.get('timeline', params);
      line.toggleClass('hide', params.percent ? false : true);
      return line;
    }

    function details(params) {
      var str = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
      var line = Template.get('timeline_details', format(params));
      if (str) line.prepend(str);
      line.attr('data-hash', params.hash);
      line.toggleClass('hide', params.duration ? false : true);
      return line;
    }

    function secondsToTime(sec_num) {
      var hours = Math.trunc(sec_num / 3600);
      var minutes = Math.floor((sec_num - hours * 3600) / 60);
      return (hours ? hours + 'ч. ' : '') + minutes + 'м.';
    }

    function format(params) {
      var road = {
        percent: params.percent + '%',
        time: secondsToTime(params.time),
        duration: secondsToTime(params.duration)
      };
      return road;
    }

    var Timeline = {
      render: render$3,
      update: update$5,
      view: view$1,
      details: details,
      format: format
    };

    var socket;
    var ping;

    var _uid = Utils.uid();

    var _devices = [];
    var listener$5 = start$3();

    function connect$1() {
      clearInterval(ping);

      try {
        socket = new WebSocket('wss://cub.watch:8020');
      } catch (e) {
        console.log('Socket', 'not work');
        return;
      }

      socket.addEventListener('open', function (event) {
        //console.log('Socket','open')
        send('start', {});
        ping = setInterval(function () {
          send('ping', {});
        }, 5000);
      });
      socket.addEventListener('close', function (event) {
        //console.log('Socket','close', event.code)
        setTimeout(connect$1, 5000);
      });
      socket.addEventListener('error', function (event) {
        console.log('Socket', 'error', event.message, event.code);
        socket.close();
      }, false);
      socket.addEventListener('message', function (event) {
        var result = JSON.parse(event.data);

        if (result.method == 'devices') {
          _devices = result.data;
        } else if (result.method == 'open') {
          Controller.toContent();
          Activity$1.push(result.data);
        } else if (result.method == 'timeline') {
          result.data.received = true; //чтоб снова не остправлять и не зациклить

          Timeline.update(result.data);
        } else if (result.method == 'bookmarks') {
          Account.update();
        } else if (result.method == 'other' && result.data.submethod == 'play') {
          Controller.toContent();
          Player.play(result.data.object.player);
          Player.playlist(result.data.object.playlist);
        }

        listener$5.send('message', result);
      });
    }

    function send(method, data) {
      var name_devise = Platform.get() ? Platform.get() : navigator.userAgent.toLowerCase().indexOf('mobile') > -1 ? 'mobile' : navigator.userAgent.toLowerCase().indexOf('x11') > -1 ? 'chrome' : 'other';
      data.device_id = _uid;
      data.name = Utils.capitalizeFirstLetter(name_devise) + ' - ' + Storage.field('device_name');
      data.method = method;
      data.version = 1;
      data.account = Storage.get('account', '{}');
      if (socket.readyState == 1) socket.send(JSON.stringify(data));
    }

    var Socket = {
      listener: listener$5,
      init: connect$1,
      send: send,
      uid: function uid() {
        return _uid;
      },
      devices: function devices() {
        return _devices;
      }
    };

    var body$1;
    var network$7 = new create$m();
    var api = Utils.protocol() + 'cub.watch/api/';
    var notice_load = {
      time: 0,
      data: []
    };
    var bookmarks = [];
    /**
     * Запуск
     */

    function init$d() {
      Settings.listener.follow('open', function (e) {
        body$1 = null;

        if (e.name == 'account') {
          body$1 = e.body;
          renderPanel();
          check$1();
        }
      });
      Storage.listener.follow('change', function (e) {
        if (e.name == 'account_email' || e.name == 'account_password') {
          signin();
          if (e.name == 'account_password') Storage.set('account_password', '', true);
        }
      });
      Favorite.listener.follow('add,added', function (e) {
        save$4('add', e.where, e.card);
      });
      Favorite.listener.follow('remove', function (e) {
        save$4('remove', e.where, e.card);
      });
      updateBookmarks(Storage.get('account_bookmarks', '[]'));
      update$4();
      timelines();
    }

    function timelines() {
      var account = Storage.get('account', '{}');

      if (account.token && Storage.field('account_use')) {
        network$7.silent(api + 'timeline/all', function (result) {
          var viewed = Storage.cache('file_view', 10000, {});

          for (var i in result.timelines) {
            var time = result.timelines[i];
            viewed[i] = time;
            Arrays.extend(viewed[i], {
              duration: 0,
              time: 0,
              percent: 0
            });
            delete viewed[i].hash;
          }

          Storage.set('file_view', viewed);
        }, false, false, {
          headers: {
            token: account.token,
            profile: account.profile.id
          }
        });
      }
    }

    function save$4(method, type, card) {
      var account = Storage.get('account', '{}');

      if (account.token && Storage.field('account_use')) {
        var list = Storage.get('account_bookmarks', '[]');
        var find = list.find(function (elem) {
          return elem.card_id == card.id && elem.type == type;
        });
        network$7.clear();
        network$7.silent(api + 'bookmarks/' + method, update$4, false, {
          type: type,
          data: JSON.stringify(card),
          card_id: card.id,
          id: find ? find.id : 0
        }, {
          headers: {
            token: account.token,
            profile: account.profile.id
          }
        });

        if (method == 'remove') {
          if (find) Arrays.remove(list, find);
        } else {
          list.push({
            id: 0,
            card_id: card.id,
            type: type,
            data: JSON.stringify(card),
            profile: account.profile.id
          });
        }

        Socket.send('bookmarks', {});
        updateBookmarks(list);
      }
    }

    function clear$6(where) {
      var account = Storage.get('account', '{}');

      if (account.token) {
        network$7.silent(api + 'bookmarks/clear', function (result) {
          if (result.secuses) update$4();
        }, false, {
          type: 'group',
          group: where
        }, {
          headers: {
            token: account.token,
            profile: account.profile.id
          }
        });
      }
    }

    function update$4(call) {
      var account = Storage.get('account', '{}');

      if (account.token) {
        network$7.silent(api + 'bookmarks/all?full=1', function (result) {
          if (result.secuses) {
            updateBookmarks(result.bookmarks);
            if (call && typeof call == 'function') call();
          }
        }, function () {
          if (call && typeof call == 'function') call();
        }, false, {
          headers: {
            token: account.token,
            profile: account.profile.id
          }
        });
      } else {
        updateBookmarks([]);
      }
    }

    function plugins(call) {
      var account = Storage.get('account', '{}');

      if (account.token) {
        network$7.timeout(2000);
        network$7.silent(api + 'plugins/all', function (result) {
          if (result.secuses) {
            Storage.set('account_plugins', result.plugins);
            call(result.plugins);
          } else {
            call(Storage.get('account_plugins', '[]'));
          }
        }, function () {
          call(Storage.get('account_plugins', '[]'));
        }, false, {
          headers: {
            token: account.token,
            profile: account.profile.id
          }
        });
      } else {
        call([]);
      }
    }

    function pluginsStatus(plugin, status) {
      var account = Storage.get('account', '{}');

      if (account.token) {
        network$7.silent(api + 'plugins/status', false, false, {
          id: plugin.id,
          status: status
        }, {
          headers: {
            token: account.token,
            profile: account.profile.id
          }
        });
      }
    }
    /**
     * Статус
     */


    function renderStatus(name) {
      var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

      if (body$1) {
        body$1.find('.settings--account-status .settings-param__value').text(name);
        body$1.find('.settings--account-status .settings-param__descr').text(value);
      }
    }

    function renderPanel() {
      if (body$1) {
        var account = Storage.get('account', '{}');
        var signed = account.token ? true : false;
        body$1.find('.settings--account-signin').toggleClass('hide', signed);
        body$1.find('.settings--account-user').toggleClass('hide', !signed);

        if (account.token) {
          body$1.find('.settings--account-user-info .settings-param__value').text(account.email);
          body$1.find('.settings--account-user-profile .settings-param__value').text(account.profile.name);
          body$1.find('.settings--account-user-out').on('hover:enter', function () {
            Storage.set('account', {});
            Settings.update();
            update$4();
          });
          body$1.find('.settings--account-user-sync').on('hover:enter', function () {
            account = Storage.get('account', '{}');
            Select.show({
              title: 'Синхронизация',
              items: [{
                title: 'Подтверждаю',
                subtitle: 'Все закладки будут перенесены в профиль (' + account.profile.name + ')',
                confirm: true
              }, {
                title: 'Отменить'
              }],
              onSelect: function onSelect(a) {
                if (a.confirm) {
                  var file = new File([localStorage.getItem('favorite') || '{}'], "bookmarks.json", {
                    type: "text/plain"
                  });
                  var formData = new FormData($('<form></form>')[0]);
                  formData.append("file", file, "bookmarks.json");
                  $.ajax({
                    url: api + 'bookmarks/sync',
                    type: 'POST',
                    data: formData,
                    async: true,
                    cache: false,
                    contentType: false,
                    enctype: 'multipart/form-data',
                    processData: false,
                    headers: {
                      token: account.token,
                      profile: account.profile.id
                    },
                    success: function success(j) {
                      if (j.secuses) {
                        Noty.show('Все закладки успешно перенесены');
                        update$4();
                      }
                    }
                  });
                }

                Controller.toggle('settings_component');
              },
              onBack: function onBack() {
                Controller.toggle('settings_component');
              }
            });
          });
          body$1.find('.settings--account-user-backup').on('hover:enter', backup);
          profile();
        } else check$1();
      }
    }

    function profile() {
      var account = Storage.get('account', '{}');
      body$1.find('.settings--account-user-profile .settings-param__value').text(account.profile.name);
      body$1.find('.settings--account-user-profile').on('hover:enter', function () {
        showProfiles('settings_component');
      });
    }

    function showProfiles(controller) {
      var account = Storage.get('account', '{}');
      network$7.clear();
      network$7.silent(api + 'profiles/all', function (result) {
        if (result.secuses) {
          Select.show({
            title: 'Профили',
            items: result.profiles.map(function (elem) {
              elem.title = elem.name;
              elem.selected = account.profile.id == elem.id;
              return elem;
            }),
            onSelect: function onSelect(a) {
              account.profile = a;
              Storage.set('account', account);
              if (body$1) body$1.find('.settings--account-user-profile .settings-param__value').text(a.name);
              Controller.toggle(controller);
              update$4();
            },
            onBack: function onBack() {
              Controller.toggle(controller);
            }
          });
        } else {
          Noty.show(result.text);
        }
      }, function () {
        Noty.show('Не удалось получить список профилей');
      }, false, {
        headers: {
          token: account.token
        }
      });
    }

    function check$1() {
      var account = Storage.get('account', '{}');

      if (account.token) {
        renderStatus('Авторизованы', 'Вы вошли под аккаунтом ' + account.email);
      } else {
        renderStatus('Вход не выполнен', 'Ожидаем входа в аккаунт');
      }
    }

    function working() {
      return Storage.get('account', '{}').token && Storage.field('account_use');
    }

    function get$b(params) {
      return bookmarks.filter(function (elem) {
        return elem.type == params.type;
      }).map(function (elem) {
        return elem.data;
      });
    }

    function all$2() {
      return bookmarks.map(function (elem) {
        return elem.data;
      });
    }

    function updateBookmarks(rows) {
      Storage.set('account_bookmarks', rows);
      bookmarks = rows.reverse().map(function (elem) {
        elem.data = JSON.parse(elem.data);
        return elem;
      });
    }
    /**
     * Проверка авторизации
     */


    function signin() {
      var email = Storage.value('account_email', '');
      var password = Storage.value('account_password', '');

      if (email && password) {
        network$7.clear();
        network$7.silent(api + 'users/signin', function (result) {
          if (result.secuses) {
            Storage.set('account', {
              email: email,
              token: result.user.token,
              id: result.user.id,
              profile: {
                name: 'Общий',
                id: 0
              }
            });
            Settings.update();
            update$4();
          } else {
            renderStatus('Ошибка', result.text);
          }
        }, function () {
          renderStatus('Ошибка', 'Нет подключения к сети');
        }, {
          email: email,
          password: password
        });
      }
    }

    function notice(call) {
      var account = Storage.get('account', '{}');

      if (account.token) {
        if (notice_load.time + 1000 * 60 * 10 < Date.now()) {
          network$7.timeout(1000);
          network$7.silent(api + 'notice/all', function (result) {
            if (result.secuses) {
              notice_load.time = Date.now();
              notice_load.data = result.notice;
              Storage.set('account_notice', result.notice);
              call(result.notice);
            } else call([]);
          }, function () {
            call([]);
          }, false, {
            headers: {
              token: account.token
            }
          });
        } else call(notice_load.data);
      } else call([]);
    }

    function torrentViewed(data) {
      network$7.timeout(5000);
      network$7.silent(api + 'torrent/viewing', false, false, data);
    }

    function torrentPopular(data, secuses, error) {
      network$7.timeout(5000);
      network$7.silent(api + 'torrent/popular', secuses, error, data);
    }

    function backup() {
      var account = Storage.get('account', '{}');

      if (account.token) {
        Select.show({
          title: 'Бэкап',
          items: [{
            title: 'Экспорт',
            "export": true,
            selected: true
          }, {
            title: 'Импорт',
            "import": true
          }, {
            title: 'Отмена'
          }],
          onSelect: function onSelect(a) {
            if (a["export"]) {
              Select.show({
                title: 'Вы уверены?',
                items: [{
                  title: 'Потверждаю',
                  "export": true,
                  selected: true
                }, {
                  title: 'Отмена'
                }],
                onSelect: function onSelect(a) {
                  if (a["export"]) {
                    var file = new File([JSON.stringify(localStorage)], "backup.json", {
                      type: "text/plain"
                    });
                    var formData = new FormData($('<form></form>')[0]);
                    formData.append("file", file, "backup.json");
                    $.ajax({
                      url: api + 'users/backup/export',
                      type: 'POST',
                      data: formData,
                      async: true,
                      cache: false,
                      contentType: false,
                      enctype: 'multipart/form-data',
                      processData: false,
                      headers: {
                        token: account.token
                      },
                      success: function success(j) {
                        if (j.secuses) {
                          Noty.show('Экспорт успешно завершён');
                        }
                      },
                      error: function error() {
                        Noty.show('Ошибка при экспорте');
                      }
                    });
                  }

                  Controller.toggle('settings_component');
                },
                onBack: function onBack() {
                  Controller.toggle('settings_component');
                }
              });
            } else if (a["import"]) {
              network$7.silent(api + 'users/backup/import', function (data) {
                if (data.data) {
                  var keys = Arrays.getKeys(data.data);

                  for (var i in data.data) {
                    localStorage.setItem(i, data.data[i]);
                  }

                  Noty.show('Импорт успешно завершён - импортировано (' + keys.length + ') - перезагрузка через 5 сек.');
                  setTimeout(function () {
                    window.location.reload();
                  }, 5000);
                } else Noty.show('Нет данных');
              }, function () {
                Noty.show('Ошибка при импорте');
              }, false, {
                headers: {
                  token: account.token
                }
              });
              Controller.toggle('settings_component');
            } else {
              Controller.toggle('settings_component');
            }
          },
          onBack: function onBack() {
            Controller.toggle('settings_component');
          }
        });
      }
    }

    var Account = {
      init: init$d,
      working: working,
      get: get$b,
      all: all$2,
      plugins: plugins,
      notice: notice,
      pluginsStatus: pluginsStatus,
      showProfiles: showProfiles,
      torrentViewed: torrentViewed,
      torrentPopular: torrentPopular,
      clear: clear$6,
      update: update$4,
      network: network$7,
      backup: backup
    };

    var data$4 = {};
    var listener$4 = start$3();

    function save$3() {
      Storage.set('favorite', data$4);
    }
    /**
     * Добавить
     * @param {String} where 
     * @param {Object} card 
     */


    function add$7(where, card, limit) {
      read();

      if (data$4[where].indexOf(card.id) < 0) {
        Arrays.insert(data$4[where], 0, card.id);
        listener$4.send('add', {
          where: where,
          card: card
        });
        if (!search$4(card.id)) data$4.card.push(card);

        if (limit) {
          var excess = data$4[where].slice(limit);

          for (var i = excess.length - 1; i >= 0; i--) {
            remove(where, {
              id: excess[i]
            });
          }
        }

        save$3();
      } else {
        Arrays.remove(data$4[where], card.id);
        Arrays.insert(data$4[where], 0, card.id);
        save$3();
        listener$4.send('added', {
          where: where,
          card: card
        });
      }
    }
    /**
     * Удалить
     * @param {String} where 
     * @param {Object} card 
     */


    function remove(where, card) {
      read();
      Arrays.remove(data$4[where], card.id);
      listener$4.send('remove', {
        where: where,
        card: card
      });

      for (var i = data$4.card.length - 1; i >= 0; i--) {
        var element = data$4.card[i];

        if (!check(element).any) {
          Arrays.remove(data$4.card, element);
          listener$4.send('remove', {
            where: where,
            card: element
          });
        }
      }

      save$3();
    }
    /**
     * Найти
     * @param {Int} id 
     * @returns Object
     */


    function search$4(id) {
      var found;

      for (var index = 0; index < data$4.card.length; index++) {
        var element = data$4.card[index];

        if (element.id == id) {
          found = element;
          break;
        }
      }

      return found;
    }
    /**
     * Переключить
     * @param {String} where 
     * @param {Object} card 
     */


    function toggle$1(where, card) {
      read();
      var find = cloud(card);
      if (find[where]) remove(where, card);else add$7(where, card);
      return find[where] ? false : true;
    }
    /**
     * Проверить
     * @param {Object} card 
     * @returns Object
     */


    function check(card) {
      var result = {
        like: data$4.like.indexOf(card.id) > -1,
        wath: data$4.wath.indexOf(card.id) > -1,
        book: data$4.book.indexOf(card.id) > -1,
        history: data$4.history.indexOf(card.id) > -1,
        any: true
      };
      if (!result.like && !result.wath && !result.book && !result.history) result.any = false;
      return result;
    }

    function cloud(card) {
      if (Account.working()) {
        var list = {
          like: Account.get({
            type: 'like'
          }),
          wath: Account.get({
            type: 'wath'
          }),
          book: Account.get({
            type: 'book'
          }),
          history: Account.get({
            type: 'history'
          })
        };
        var result = {
          like: list.like.find(function (elem) {
            return elem.id == card.id;
          }) ? true : false,
          wath: list.wath.find(function (elem) {
            return elem.id == card.id;
          }) ? true : false,
          book: list.book.find(function (elem) {
            return elem.id == card.id;
          }) ? true : false,
          history: list.history.find(function (elem) {
            return elem.id == card.id;
          }) ? true : false,
          any: true
        };
        if (!result.like && !result.wath && !result.book && !result.history) result.any = false;
        return result;
      } else return check(card);
    }
    /**
     * Получить списаок по типу
     * @param {String} params.type - тип 
     * @returns Object
     */


    function get$a(params) {
      if (Account.working()) {
        return Account.get(params);
      } else {
        read();
        var result = [];
        var ids = data$4[params.type];
        ids.forEach(function (id) {
          for (var i = 0; i < data$4.card.length; i++) {
            var card = data$4.card[i];
            if (card.id == id) result.push(card);
          }
        });
        return result;
      }
    }
    /**
     * Очистить
     * @param {String} where 
     * @param {Object} card 
     */


    function clear$5(where, card) {
      read();

      if (Account.working()) {
        Account.clear(where);
      } else {
        if (card) remove(where, card);else {
          for (var i = data$4[where].length - 1; i >= 0; i--) {
            var _card = search$4(data$4[where][i]);

            if (_card) remove(where, _card);
          }
        }
      }
    }
    /**
     * Считать последние данные
     */


    function read() {
      data$4 = Storage.get('favorite', '{}');
      Arrays.extend(data$4, {
        like: [],
        wath: [],
        book: [],
        card: [],
        history: []
      });
    }
    /**
     * Получить весь список что есть
     */


    function full$5() {
      Arrays.extend(data$4, {
        like: [],
        wath: [],
        book: [],
        card: [],
        history: []
      });
      return data$4;
    }

    function continues(type) {
      return Arrays.clone(get$a({
        type: 'history'
      }).filter(function (e) {
        return type == 'tv' ? e.number_of_seasons || e.first_air_date : !(e.number_of_seasons || e.first_air_date);
      }).slice(0, 19)).map(function (e) {
        e.check_new_episode = true;
        return e;
      });
    }
    /**
     * Запуск
     */


    function init$c() {
      read();
    }

    var Favorite = {
      listener: listener$4,
      check: cloud,
      add: add$7,
      remove: remove,
      toggle: toggle$1,
      get: get$a,
      init: init$c,
      clear: clear$5,
      continues: continues,
      full: full$5
    };

    function status(need) {
      this.data = {};
      this.work = 0;
      this.need = need;
      this.complited = false;

      this.check = function () {
        if (this.work >= this.need && !this.complited) {
          this.complited = true;
          this.onComplite(this.data);
        }
      };

      this.append = function (name, json) {
        this.work++;
        this.data[name] = json;
        this.check();
      };

      this.error = function () {
        this.work++;
        this.check();
      };
    }

    var data$3 = [];
    /**
     * Запуск
     */

    function init$b() {
      data$3 = Storage.cache('recomends_scan', 300, []);
      Favorite.get({
        type: 'history'
      }).forEach(function (elem) {
        if (['cub', 'tmdb'].indexOf(elem.source) >= 0) {
          var id = data$3.filter(function (a) {
            return a.id == elem.id;
          });

          if (!id.length) {
            data$3.push({
              id: elem.id,
              tv: elem.number_of_seasons
            });
          }
        }
      });
      Storage.set('recomends_scan', data$3);
      setInterval(search$3, 120 * 1000);
    }

    function search$3() {
      var ids = data$3.filter(function (e) {
        return !e.scan;
      });

      if (ids.length) {
        var elem = ids[0];
        elem.scan = 1;
        TMDB.get((elem.tv ? 'tv' : 'movie') + '/' + elem.id + '/recommendations', {}, function (json) {
          if (json.results && json.results.length) {
            var recomend = Storage.cache('recomends_list', 200, []);
            var favorite = Favorite.get({
              type: 'history'
            });
            json.results.forEach(function (e) {
              if (!recomend.filter(function (r) {
                return r.id == e.id;
              }).length && !favorite.filter(function (h) {
                return h.id == e.id;
              }).length) {
                recomend.push(e);
              }
            });
            Storage.set('recomends_list', recomend);
          }
        });
      } else {
        data$3.forEach(function (a) {
          return a.scan = 0;
        });
      }

      Storage.set('recomends_scan', data$3);
    }

    function get$9(type) {
      var all = Storage.get('recomends_list', '[]');
      return all.filter(function (e) {
        return type == 'tv' ? e.number_of_seasons || e.first_air_date : !(e.number_of_seasons || e.first_air_date);
      }).reverse();
    }

    var Recomends = {
      init: init$b,
      get: get$9
    };

    var data$2 = [];
    var token = '3i40G5TSECmLF77oAqnEgbx61ZWaOYaE';
    var network$6 = new create$m();
    var videocdn = 'http://cdn.svetacdn.in/api/short?api_token=' + token;
    var object$1 = false;
    /**
     * Запуск
     */

    function init$a() {
      data$2 = Storage.cache('quality_scan', 300, []);
      setInterval(extract$2, 30 * 1000);
    }
    /**
     * Добавить карточку для парсинга
     * @param {[{id:integer, title:string, imdb_id:string}]} elems - карточки
     */


    function add$6(elems) {
      elems.filter(function (elem) {
        return !(elem.number_of_seasons || elem.seasons);
      }).forEach(function (elem) {
        var id = data$2.filter(function (a) {
          return a.id == elem.id;
        });

        if (!id.length) {
          data$2.push({
            id: elem.id,
            title: elem.title,
            imdb_id: elem.imdb_id
          });
        }
      });
      Storage.set('quality_scan', data$2);
    }
    /**
     * Начать парсить качество
     * @param {{id:integer, title:string, imdb_id:string}} itm - карточка
     */


    function search$2(itm) {
      var url = 'http://cdn.svetacdn.in/api/';
      var type = itm.iframe_src.split('/').slice(-2)[0];
      if (type == 'movie') type = 'movies';
      url += type;
      url = Lampa.Utils.addUrlComponent(url, 'api_token=' + token);
      url = Lampa.Utils.addUrlComponent(url, itm.imdb_id ? 'imdb_id=' + encodeURIComponent(itm.imdb_id) : 'title=' + encodeURIComponent(itm.title));
      url = Lampa.Utils.addUrlComponent(url, 'field=' + encodeURIComponent('global'));
      network$6.timeout(4000);
      network$6.silent(url, function (found) {
        var results = found.data.filter(function (elem) {
          return elem.id == itm.id;
        });
        var qualitys = ['ts', 'camrip', 'webdl', 'dvdrip', 'hdrip', 'bd'];
        var index = 0;

        if (results.length && results[0].media) {
          results[0].media.map(function (m) {
            index = Math.max(index, qualitys.indexOf(m.source_quality));
            object$1.quality = qualitys[index];
          });
        }

        save$2();
      }, save$2);
    }
    /**
     * Найти фильм по imdb_id или титлу
     * @param {string} imdb_id 
     * @param {string} query 
     */


    function req(imdb_id, query) {
      var url = videocdn + '&' + (imdb_id ? 'imdb_id=' + encodeURIComponent(imdb_id) : 'title=' + encodeURIComponent(query));
      network$6.timeout(1000 * 15);
      network$6.silent(url, function (json) {
        if (json.data && json.data.length) {
          if (object$1.imdb_id) {
            var imdb = json.data.filter(function (elem) {
              return elem.imdb_id == object$1.imdb_id;
            });
            if (imdb.length) json.data = imdb;
          }

          if (json.data.length) {
            return search$2(json.data[0]);
          }
        }

        save$2();
      }, save$2);
    }
    /**
     * Получить карточку которую нужно парсить
     */


    function extract$2() {
      var ids = data$2.filter(function (e) {
        return !e.scaned && (e.scaned_time || 0) + 60 * 60 * 12 * 1000 < Date.now();
      });

      if (ids.length) {
        object$1 = ids[0];

        if (object$1.imdb_id) {
          req(object$1.imdb_id);
        } else {
          var dom = Storage.field('proxy_tmdb') ? 'apitmdb.cub.watch/3/' : 'api.themoviedb.org/3/';
          network$6.silent('http://' + dom + 'movie/' + object$1.id + '/external_ids?api_key=4ef0d7355d9ffb5151e987764708ce96&language=ru', function (ttid) {
            req(ttid.imdb_id, object$1.title);
          }, save$2);
        }
      } else {
        data$2.forEach(function (a) {
          return a.scaned = 0;
        });
      }

      Storage.set('quality_scan', data$2);
    }
    /**
     * Сохранить состояние
     */


    function save$2() {
      if (object$1) {
        object$1.scaned = 1;
        object$1.scaned_time = Date.now();
        Storage.set('quality_scan', data$2);
      }
    }
    /**
     * Получить качество фильма если есть
     * @param {{id:integer}} elem - карточка
     * @returns {string}
     */


    function get$8(elem) {
      var fid = data$2.filter(function (e) {
        return e.id == elem.id;
      });
      return (fid.length ? fid[0] : {}).quality;
    }

    var VideoQuality = {
      init: init$a,
      get: get$8,
      add: add$6
    };

    var network$5 = new create$m();
    var key = '4ef0d7355d9ffb5151e987764708ce96';
    var menu_list$2 = [];

    function url$2(u) {
      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      u = add$5(u, 'api_key=' + key);
      u = add$5(u, 'language=' + Storage.field('tmdb_lang'));
      if (params.genres) u = add$5(u, 'with_genres=' + params.genres);
      if (params.page) u = add$5(u, 'page=' + params.page);
      if (params.query) u = add$5(u, 'query=' + params.query);

      if (params.filter) {
        for (var i in params.filter) {
          u = add$5(u, i + '=' + params.filter[i]);
        }
      }

      var base = Storage.field('proxy_tmdb') ? 'apitmdb.cub.watch/3/' : 'api.themoviedb.org/3/';
      return Utils.protocol() + base + u;
    }

    function add$5(u, params) {
      return u + (/\?/.test(u) ? '&' : '?') + params;
    }

    function img$2(src, size) {
      var poster_size = Storage.field('poster_size');
      var baseimg = Utils.protocol() + (Storage.field('proxy_tmdb') ? 'imagetmdb.cub.watch' : 'image.tmdb.org') + '/t/p/' + poster_size + '/';
      var path = baseimg;
      if (size) path = path.replace(new RegExp(poster_size, 'g'), size);
      return src ? path + src : '';
    }

    function find$1(find) {
      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var finded;

      var filtred = function filtred(items) {
        for (var i = 0; i < items.length; i++) {
          var item = items[i];

          if (params.original_title == item.original_title || params.title == item.title) {
            finded = item;
            break;
          }
        }
      };

      if (find.movie && find.movie.results.length) filtred(find.movie.results);
      if (find.tv && find.tv.results.length && !finded) filtred(find.tv.results);
      return finded;
    }

    function main$4() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var oncomplite = arguments.length > 1 ? arguments[1] : undefined;
      var onerror = arguments.length > 2 ? arguments[2] : undefined;
      var status$1 = new status(8);

      status$1.onComplite = function () {
        var fulldata = [];
        if (status$1.data.wath) fulldata.push(status$1.data.wath);
        if (status$1.data.trend_day) fulldata.push(status$1.data.trend_day);
        if (status$1.data.trend_week) fulldata.push(status$1.data.trend_week);
        if (status$1.data.upcoming) fulldata.push(status$1.data.upcoming);
        if (status$1.data.popular) fulldata.push(status$1.data.popular);
        if (status$1.data.popular_tv) fulldata.push(status$1.data.popular_tv);
        if (status$1.data.top) fulldata.push(status$1.data.top);
        if (status$1.data.top_tv) fulldata.push(status$1.data.top_tv);
        if (fulldata.length) oncomplite(fulldata);else onerror();
      };

      var append = function append(title, name, json) {
        json.title = title;
        status$1.append(name, json);
      };

      get$7('movie/now_playing', params, function (json) {
        append('Сейчас смотрят', 'wath', json);
        VideoQuality.add(json.results);
      }, status$1.error.bind(status$1));
      get$7('trending/moviews/day', params, function (json) {
        append('Сегодня в тренде', 'trend_day', json);
      }, status$1.error.bind(status$1));
      get$7('trending/moviews/week', params, function (json) {
        append('В тренде за неделю', 'trend_week', json);
      }, status$1.error.bind(status$1));
      get$7('movie/upcoming', params, function (json) {
        append('Смотрите в кинозалах', 'upcoming', json);
      }, status$1.error.bind(status$1));
      get$7('movie/popular', params, function (json) {
        append('Популярные фильмы', 'popular', json);
        VideoQuality.add(json.results);
      }, status$1.error.bind(status$1));
      get$7('tv/popular', params, function (json) {
        append('Популярные сериалы', 'popular_tv', json);
      }, status$1.error.bind(status$1));
      get$7('movie/top_rated', params, function (json) {
        append('Топ фильмы', 'top', json);
      }, status$1.error.bind(status$1));
      get$7('tv/top_rated', params, function (json) {
        append('Топ сериалы', 'top_tv', json);
      }, status$1.error.bind(status$1));
    }

    function category$4() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var oncomplite = arguments.length > 1 ? arguments[1] : undefined;
      var onerror = arguments.length > 2 ? arguments[2] : undefined;
      var show = ['tv', 'movie'].indexOf(params.url) > -1 && !params.genres;
      var books = show ? Favorite.continues(params.url) : [];
      var recomend = show ? Arrays.shuffle(Recomends.get(params.url)).slice(0, 19) : [];
      var status$1 = new status(6);

      status$1.onComplite = function () {
        var fulldata = [];
        if (books.length) fulldata.push({
          results: books,
          title: params.url == 'tv' ? 'Продолжить просмотр' : 'Вы смотрели'
        });
        if (recomend.length) fulldata.push({
          results: recomend,
          title: 'Рекомендуем посмотреть'
        });
        if (status$1.data["continue"] && status$1.data["continue"].results.length) fulldata.push(status$1.data["continue"]);
        if (status$1.data.wath && status$1.data.wath.results.length) fulldata.push(status$1.data.wath);
        if (status$1.data.popular && status$1.data.popular.results.length) fulldata.push(status$1.data.popular);
        if (status$1.data["new"] && status$1.data["new"].results.length) fulldata.push(status$1.data["new"]);
        if (status$1.data.tv_today && status$1.data.tv_today.results.length) fulldata.push(status$1.data.tv_today);
        if (status$1.data.tv_air && status$1.data.tv_air.results.length) fulldata.push(status$1.data.tv_air);
        if (status$1.data.top && status$1.data.top.results.length) fulldata.push(status$1.data.top);
        if (fulldata.length) oncomplite(fulldata);else onerror();
      };

      var append = function append(title, name, json) {
        json.title = title;
        status$1.append(name, json);
      };

      get$7(params.url + '/now_playing', params, function (json) {
        append('Сейчас смотрят', 'wath', json);
        if (show) VideoQuality.add(json.results);
      }, status$1.error.bind(status$1));
      get$7(params.url + '/popular', params, function (json) {
        append('Популярное', 'popular', json);
        if (show) VideoQuality.add(json.results);
      }, status$1.error.bind(status$1));
      var date = new Date();
      var nparams = Arrays.clone(params);
      nparams.filter = {
        sort_by: 'release_date.desc',
        year: date.getFullYear(),
        first_air_date_year: date.getFullYear(),
        'vote_average.gte': 7
      };
      get$7('discover/' + params.url, nparams, function (json) {
        json.filter = nparams.filter;
        append('Новинки', 'new', json);
      }, status$1.error.bind(status$1));
      get$7(params.url + '/airing_today', params, function (json) {
        append('Сегодня в эфире', 'tv_today', json);
      }, status$1.error.bind(status$1));
      get$7(params.url + '/on_the_air', params, function (json) {
        append('На этой неделе', 'tv_air', json);
      }, status$1.error.bind(status$1));
      get$7(params.url + '/top_rated', params, function (json) {
        append('В топе', 'top', json);
      }, status$1.error.bind(status$1));
    }

    function full$4() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var oncomplite = arguments.length > 1 ? arguments[1] : undefined;
      var status$1 = new status(7);
      status$1.onComplite = oncomplite;
      get$7(params.method + '/' + params.id, params, function (json) {
        json.source = 'tmdb';

        if (params.method == 'tv') {
          get$7('tv/' + json.id + '/season/' + json.number_of_seasons, {}, function (ep) {
            status$1.append('episodes', ep);
          }, status$1.error.bind(status$1));
        } else status$1.need--;

        if (json.belongs_to_collection) {
          get$7('collection/' + json.belongs_to_collection.id, {}, function (collection) {
            collection.results = collection.parts.slice(0, 19);
            status$1.append('collection', collection);
          }, status$1.error.bind(status$1));
        } else status$1.need--;

        status$1.append('movie', json);
      }, function () {
        status$1.need -= 2;
        status$1.error();
      });

      if (Storage.field('light_version')) {
        status$1.need -= 3;
      } else {
        get$7(params.method + '/' + params.id + '/credits', params, function (json) {
          status$1.append('persons', json);
        }, status$1.error.bind(status$1));
        get$7(params.method + '/' + params.id + '/recommendations', params, function (json) {
          status$1.append('recomend', json);
        }, status$1.error.bind(status$1));
        get$7(params.method + '/' + params.id + '/similar', params, function (json) {
          status$1.append('simular', json);
        }, status$1.error.bind(status$1));
      }

      get$7(params.method + '/' + params.id + '/videos', params, function (json) {
        status$1.append('videos', json);
      }, status$1.error.bind(status$1));
    }

    function list$5() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var oncomplite = arguments.length > 1 ? arguments[1] : undefined;
      var onerror = arguments.length > 2 ? arguments[2] : undefined;
      var u = url$2(params.url, params);
      network$5.silent(u, oncomplite, onerror);
    }

    function get$7(method) {
      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var oncomplite = arguments.length > 2 ? arguments[2] : undefined;
      var onerror = arguments.length > 3 ? arguments[3] : undefined;
      var u = url$2(method, params);
      network$5.silent(u, function (json) {
        json.url = method;
        oncomplite(json);
      }, onerror);
    }

    function search$1() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var oncomplite = arguments.length > 1 ? arguments[1] : undefined;
      var status$1 = new status(2);
      status$1.onComplite = oncomplite;
      get$7('search/movie', params, function (json) {
        json.title = 'Фильмы';
        status$1.append('movie', json);
      }, status$1.error.bind(status$1));
      get$7('search/tv', params, function (json) {
        json.title = 'Сериалы';
        status$1.append('tv', json);
      }, status$1.error.bind(status$1));
    }

    function person$4() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var oncomplite = arguments.length > 1 ? arguments[1] : undefined;

      var sortCredits = function sortCredits(credits) {
        return credits.map(function (a) {
          a.year = parseInt(((a.release_date || a.first_air_date || '0000') + '').slice(0, 4));
          return a;
        }).sort(function (a, b) {
          return b.vote_average - a.vote_average && b.vote_count - a.vote_count;
        }); //сортируем по оценке и кол-ву голосов (чтобы отсечь мусор с 1-2 оценками)
      };

      var convert = function convert(credits, person) {
        credits.crew.forEach(function (a) {
          a.department = a.department == 'Production' ? 'Производство' : a.department == 'Directing' ? 'Режиссура' : a.department;
        });
        var cast = sortCredits(credits.cast),
            crew = sortCredits(credits.crew),
            tv = sortCredits(cast.filter(function (media) {
          return media.media_type === 'tv';
        })),
            movie = sortCredits(cast.filter(function (media) {
          return media.media_type === 'movie';
        })),
            knownFor; //Наиболее известные работы человека
        //1. Группируем все работы по департаментам (Актер, Режиссер, Сценарист и т.д.)

        knownFor = Arrays.groupBy(crew, 'department');
        var actorGender = person.gender === 1 ? 'Актриса' : 'Актер';
        if (movie.length > 0) knownFor["".concat(actorGender, " - \u0424\u0438\u043B\u044C\u043C\u044B")] = movie;
        if (tv.length > 0) knownFor["".concat(actorGender, " - \u0421\u0435\u0440\u0438\u0430\u043B\u044B")] = tv; //2. Для каждого департамента суммируем кол-ва голосов (вроде бы сам TMDB таким образом определяет knownFor для людей)

        knownFor = Object.entries(knownFor).map(function (_ref) {
          var _ref2 = _slicedToArray(_ref, 2),
              depIdx = _ref2[0],
              dep = _ref2[1];

          //убираем дубликаты (человек может быть указан в одном департаменте несколько раз на разных должностях (job))
          var set = {},
              credits = dep.filter(function (credit) {
            return set.hasOwnProperty(credit.original_title || credit.original_name) ? false : credit.original_title ? set[credit.original_title] = true : set[credit.original_name] = true;
          });
          return {
            name: depIdx,
            credits: credits,
            vote_count: dep.reduce(function (a, b) {
              return a + b.vote_count;
            }, 0)
          }; //3. Сортируем департаменты по кол-ву голосов
        }).sort(function (a, b) {
          return b.vote_count - a.vote_count;
        });
        return {
          raw: credits,
          cast: cast,
          crew: crew,
          tv: tv,
          movie: movie,
          knownFor: knownFor
        };
      };

      var status$1 = new status(2);

      status$1.onComplite = function () {
        var fulldata = {};
        if (status$1.data.person) fulldata.person = status$1.data.person;
        if (status$1.data.credits) fulldata.credits = convert(status$1.data.credits, status$1.data.person);
        oncomplite(fulldata);
      };

      get$7('person/' + params.id, params, function (json) {
        status$1.append('person', json);
      }, status$1.error.bind(status$1));
      get$7('person/' + params.id + '/combined_credits', params, function (json) {
        status$1.append('credits', json);
      }, status$1.error.bind(status$1));
    }

    function menu$4() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var oncomplite = arguments.length > 1 ? arguments[1] : undefined;
      if (menu_list$2.length) oncomplite(menu_list$2);else {
        var u = url$2('genre/movie/list', params);
        network$5.silent(u, function (j) {
          j.genres.forEach(function (g) {
            menu_list$2.push({
              title: g.name,
              id: g.id
            });
          });
          oncomplite(menu_list$2);
        });
      }
    }

    function menuCategory$2(params, oncomplite) {
      var menu = [];

      if (params.action !== 'tv') {
        menu.push({
          title: 'Сейчас смотрят',
          url: params.action + '/now_playing'
        });
      }

      menu.push({
        title: 'Популярное',
        url: params.action + '/popular'
      });
      var date = new Date();
      var query = [];
      query.push('sort_by=release_date.desc');
      query.push('year=' + date.getFullYear());
      query.push('first_air_date_year=' + date.getFullYear());
      query.push('vote_average.gte=7');
      menu.push({
        title: 'Новинки',
        url: 'discover/' + params.action + '?' + query.join('&')
      });

      if (params.action == 'tv') {
        menu.push({
          title: 'Сегодня в эфире',
          url: params.action + '/airing_today'
        });
        menu.push({
          title: 'На этой неделе',
          url: params.action + '/on_the_air'
        });
      }

      menu.push({
        title: 'В топе',
        url: params.action + '/top_rated'
      });
      oncomplite(menu);
    }

    function external_ids() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var oncomplite = arguments.length > 1 ? arguments[1] : undefined;
      var onerror = arguments.length > 2 ? arguments[2] : undefined;
      get$7('tv/' + params.id + '/external_ids', oncomplite, onerror);
    }

    function company$1() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var oncomplite = arguments.length > 1 ? arguments[1] : undefined;
      var onerror = arguments.length > 2 ? arguments[2] : undefined;
      var u = url$2('company/' + params.id, params);
      network$5.silent(u, oncomplite, onerror);
    }

    function seasons$4(tv, from, oncomplite) {
      var status$1 = new status(from.length);
      status$1.onComplite = oncomplite;
      from.forEach(function (season) {
        get$7('tv/' + tv.id + '/season/' + season, {}, function (json) {
          status$1.append('' + season, json);
        }, status$1.error.bind(status$1));
      });
    }

    function screensavers(oncomplite, onerror) {
      get$7('trending/all/week', {
        page: Math.round(Math.random() * 30)
      }, function (json) {
        oncomplite(json.results.filter(function (entry) {
          return entry.backdrop_path && !entry.adult;
        }));
      }, onerror);
    }

    function clear$4() {
      network$5.clear();
    }

    var TMDB = {
      main: main$4,
      menu: menu$4,
      img: img$2,
      full: full$4,
      list: list$5,
      category: category$4,
      search: search$1,
      clear: clear$4,
      company: company$1,
      person: person$4,
      seasons: seasons$4,
      find: find$1,
      screensavers: screensavers,
      external_ids: external_ids,
      get: get$7,
      menuCategory: menuCategory$2
    };

    var prox$1 = 'http://proxy.cub.watch/img/';
    var baseurl$2 = 'https://ctx.playfamily.ru/screenapi/v1/noauth/';
    var network$4 = new create$m();
    var menu_list$1 = [];

    function img$1(element) {
      var need = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'PORTRAIT';

      if (element.basicCovers && element.basicCovers.items.length) {
        for (var index = 0; index < element.basicCovers.items.length; index++) {
          var _img = element.basicCovers.items[index];
          if (_img.imageType == need) return prox$1 + _img.url + '?width=' + (need == 'COVER' ? 800 : 300) + '&scale=1&quality=80&mediaType=jpeg';
        }

        return prox$1 + element.basicCovers.items[0].url + '?width=500&scale=1&quality=80&mediaType=jpeg';
      }

      return '';
    }

    function tocard$1(element) {
      return {
        url: element.alias,
        id: element.id,
        title: element.name,
        original_title: element.originalName,
        release_date: '0000',
        vote_average: element.kinopoiskRating || element.okkoRating || 0,
        poster: img$1(element),
        cover: img$1(element, 'COVER'),
        promo: element.promoText,
        description: element.description
      };
    }

    function collections$2(params, oncomplite, onerror) {
      var frm = 20 * (params.page - 1);
      var uri = baseurl$2 + 'collection/web/1?elementAlias=' + (params.url || 'collections_web') + '&elementType=COLLECTION&limit=20&offset=' + frm + '&withInnerCollections=true&includeProductsForUpsale=false&filter=%7B%22sortType%22%3A%22RANK%22%2C%22sortOrder%22%3A%22ASC%22%2C%22useSvodFilter%22%3Afalse%2C%22genres%22%3A%5B%5D%2C%22yearsRange%22%3Anull%2C%22rating%22%3Anull%7D';
      network$4["native"](uri, function (json) {
        var result = {
          results: [],
          total_pages: 0,
          page: params.page
        };

        if (json.element) {
          json.element.collectionItems.items.forEach(function (elem) {
            var element = elem.element;
            var item = {
              url: element.alias,
              id: element.id,
              title: element.name,
              poster: prox$1 + (element.basicCovers && element.basicCovers.items.length ? element.basicCovers.items[0].url + '?width=300&scale=1&quality=80&mediaType=jpeg' : 'https://www.ivi.ru/images/stubs/collection_preview_stub.jpeg')
            };
            if (params.url) item = tocard$1(element);
            result.results.push(item);
          });
          result.total_pages = Math.round(json.element.collectionItems.totalSize / 20);
        }

        oncomplite(result);
      }, onerror);
    }

    function persons$1(element) {
      var data = [];

      if (element.actors) {
        element.actors.items.forEach(function (elem) {
          var item = elem.element;
          data.push({
            url: item.alias,
            name: item.name,
            character: item.originalName
          });
        });
      }

      return data.length ? {
        cast: data
      } : false;
    }

    function genres$2(element) {
      return element.genres.items.map(function (elem) {
        elem.element.url = elem.element.alias;
        return elem.element;
      });
    }

    function countries$1(element) {
      return element.countries.items.map(function (elem) {
        return elem.element;
      });
    }

    function date(element) {
      var d = new Date(element.worldReleaseDate || element || 0);
      return d.getFullYear() + '-' + ('0' + (d.getMonth() + 1)).slice(-2) + '-' + ('0' + d.getDate()).slice(-2);
    }

    function seasonsCount$1(element) {
      var data = {
        seasons: 0,
        episodes: 0
      };

      if (element.children) {
        data.seasons = element.children.totalSize;
        element.children.items.forEach(function (elem) {
          data.episodes += elem.element.children ? elem.element.children.totalSize : 0;
        });
      }

      return data;
    }

    function seasonsDetails(element) {
      var data = {};

      if (element.children) {
        element.children.items.forEach(function (elem, sn) {
          var episodes = [];

          if (elem.element.children) {
            elem.element.children.items.forEach(function (episode, en) {
              episodes.push({
                name: episode.element.name,
                img: img$1(episode.element, 'COVER'),
                air_date: date(episode.element.releaseSaleDate || 0),
                episode_number: en + 1
              });
            });
          }

          data['' + (sn + 1)] = {
            name: elem.element.name,
            air_date: date(elem.element.worldReleaseDate || 0),
            episodes: episodes
          };
        });
        return data;
      }
    }

    function similar$1(element) {
      var data = [];
      element.similar.items.forEach(function (elem) {
        data.push(tocard$1(elem.element));
      });
      return data.length ? {
        results: data
      } : false;
    }

    function seasons$3(tv, from, oncomplite, onerror) {
      oncomplite(tv.seasons || {});
    }

    function menu$3(params, oncomplite) {
      if (!menu_list$1.length) {
        network$4.timeout(1000);
        network$4["native"](baseurl$2 + 'collection/web/1?elementAlias=action&elementType=GENRE&limit=20&offset=0&withInnerCollections=false&includeProductsForUpsale=false&filter=null', function (json) {
          if (json.uiScreenInfo && json.uiScreenInfo.webMain) {
            json.uiScreenInfo.webMain.forEach(function (element) {
              menu_list$1.push({
                title: element.name,
                id: element.alias
              });
            });
            oncomplite(menu_list$1);
          }
        });
      } else {
        oncomplite(menu_list$1);
      }
    }

    function videos$1(element) {
      var data = [];
      var qa = 0;
      element.trailers.items.forEach(function (item) {
        var media = item.media;

        if (media.width > qa && media.mimeType == 'mp4/ts') {
          qa = media.width;
          data.push({
            name: data.length + 1 + ' / ' + item.language,
            url: item.url,
            player: true
          });
        }
      });
      return data.length ? {
        results: data
      } : false;
    }

    function list$4(params, oncomplite, onerror) {
      var frm = 20 * (params.page - 1);
      network$4["native"](baseurl$2 + 'collection/web/1?elementAlias=' + (params.url || params.id) + '&elementType=' + (params.type || 'GENRE') + '&limit=20&offset=' + frm + '&withInnerCollections=false&includeProductsForUpsale=false&filter=null', function (json) {
        var items = [];

        if (json.element && json.element.collectionItems) {
          json.element.collectionItems.items.forEach(function (elem) {
            items.push(tocard$1(elem.element));
          });
          oncomplite({
            results: items,
            total_pages: Math.round(json.element.collectionItems.totalSize / 20)
          });
        } else {
          onerror();
        }
      }, onerror);
    }

    function person$3(params, oncomplite, onerror) {
      network$4["native"](baseurl$2 + 'collection/web/1?elementAlias=' + params.url + '&elementType=PERSON&limit=60&offset=0&withInnerCollections=false&includeProductsForUpsale=false&filter=null', function (json) {
        var data = {
          movie: {
            results: []
          }
        };

        if (json.element && json.element.collectionItems) {
          json.element.collectionItems.items.forEach(function (elem) {
            data.movie.results.push(tocard$1(elem.element));
          });
          data.person = {
            name: json.element.name,
            biography: '',
            img: '',
            place_of_birth: '',
            birthday: '----'
          };
          oncomplite(data);
        } else {
          onerror();
        }
      }, onerror);
    }

    function main$3(params, oncomplite, onerror) {
      network$4["native"](baseurl$2 + 'mainpage/web/1', function (json) {
        var element = json.element;
        var fulldata = [];

        if (element) {
          var blocks = json.element.collectionItems.items;

          if (blocks) {
            blocks.forEach(function (el) {
              if (el.element && el.element.alias === "web_featured") {
                var slides = {
                  title: 'Новинки',
                  results: [],
                  wide: true,
                  nomore: true
                };
                el.element.collectionItems.items.forEach(function (elem) {
                  slides.results.push(tocard$1(elem.element));
                });
                fulldata.push(slides);
              } else if (el.element && el.element.alias && el.element.name && el.element.description) {
                var line = {
                  title: el.element.name,
                  url: el.element.alias,
                  results: [],
                  more: true
                };
                el.element.collectionItems.items.forEach(function (elem) {
                  line.results.push(tocard$1(elem.element));
                });
                fulldata.push(line);
              }
            });
          }
        }

        if (fulldata.length) oncomplite(fulldata);else onerror();
      }, onerror);
    }

    function category$3(params, oncomplite, onerror) {
      var status$1 = new status(7);
      var books = Favorite.continues(params.url);

      status$1.onComplite = function () {
        var fulldata = [];
        if (books.length) fulldata.push({
          results: books,
          title: params.url == 'tv' ? 'Продолжить просмотр' : 'Вы смотрели'
        });
        if (status$1.data["new"] && status$1.data["new"].results.length) fulldata.push(status$1.data["new"]);
        if (status$1.data.top && status$1.data.top.results.length) fulldata.push(status$1.data.top);
        if (status$1.data.three && status$1.data.three.results.length) fulldata.push(status$1.data.three);
        if (status$1.data.four && status$1.data.four.results.length) fulldata.push(status$1.data.four);
        if (status$1.data.five && status$1.data.five.results.length) fulldata.push(status$1.data.five);
        if (status$1.data.six && status$1.data.six.results.length) fulldata.push(status$1.data.six);
        if (status$1.data.seven && status$1.data.seven.results.length) fulldata.push(status$1.data.seven);
        if (fulldata.length) oncomplite(fulldata);else onerror();
      };

      var append = function append(title, name, id, json) {
        json.title = title;
        json.url = id;
        status$1.append(name, json);
      };

      if (params.url == 'movie') {
        list$4({
          url: 'Novelty',
          type: 'COLLECTION',
          page: 1
        }, function (json) {
          append('Новое', 'new', 'Novelty', json);
        }, status$1.error.bind(status$1));
        list$4({
          url: 'topfilms',
          type: 'COLLECTION',
          page: 1
        }, function (json) {
          append('Топ-новинки', 'top', 'topfilms', json);
        }, status$1.error.bind(status$1));
        list$4({
          url: 'comedy-plus-horror-movies',
          type: 'COLLECTION',
          page: 1
        }, function (json) {
          append('Комедийные фильмы ужасов', 'three', 'comedy-plus-horror-movies', json);
        }, status$1.error.bind(status$1));
        list$4({
          url: 'collection_maniacs',
          type: 'COLLECTION',
          page: 1
        }, function (json) {
          append('Фильмы про маньяков', 'four', 'collection_maniacs', json);
        }, status$1.error.bind(status$1));
        list$4({
          url: 'witches',
          type: 'COLLECTION',
          page: 1
        }, function (json) {
          append('Фильмы про ведьм', 'five', 'witches', json);
        }, status$1.error.bind(status$1));
        list$4({
          url: 'zombies',
          type: 'COLLECTION',
          page: 1
        }, function (json) {
          append('Фильмы про зомби', 'six', 'zombies', json);
        }, status$1.error.bind(status$1));
        list$4({
          url: 'Russian-17490',
          type: 'COLLECTION',
          page: 1
        }, function (json) {
          append('Русские', 'seven', 'Russian-17490', json);
        }, status$1.error.bind(status$1));
      } else {
        list$4({
          url: 'Serials',
          type: 'COLLECTION',
          page: 1
        }, function (json) {
          append('Новое', 'new', 'Serials', json);
        }, status$1.error.bind(status$1));
        list$4({
          url: 'horror-serial-all-svod',
          type: 'COLLECTION',
          page: 1
        }, function (json) {
          append('Очень страшные', 'top', 'horror-serial-all-svod', json);
        }, status$1.error.bind(status$1));
        list$4({
          url: 'series-about-serial-killers',
          type: 'COLLECTION',
          page: 1
        }, function (json) {
          append('Про маньяков', 'three', 'series-about-serial-killers', json);
        }, status$1.error.bind(status$1));
        list$4({
          url: 'black-humor-serial-all-svod',
          type: 'COLLECTION',
          page: 1
        }, function (json) {
          append('С чёрным юмором', 'four', 'black-humor-serial-all-svod', json);
        }, status$1.error.bind(status$1));
        list$4({
          url: 'legkiye-serialy-all-svod',
          type: 'COLLECTION',
          page: 1
        }, function (json) {
          append('Лёгкие', 'five', 'legkiye-serialy-all-svod', json);
        }, status$1.error.bind(status$1));
        list$4({
          url: 'comedy-serial-all-svod',
          type: 'COLLECTION',
          page: 1
        }, function (json) {
          append('Комедийные', 'six', 'comedy-serial-all-svod', json);
        }, status$1.error.bind(status$1));
        list$4({
          url: 'russian_tvseries',
          type: 'COLLECTION',
          page: 1
        }, function (json) {
          append('Русские', 'seven', 'russian_tvseries', json);
        }, status$1.error.bind(status$1));
      }
    }

    function full$3(params, oncomplite, onerror) {
      var data = {};
      network$4["native"](baseurl$2 + 'moviecard/web/1?elementAlias=' + params.url + '&elementType=MOVIE', function (json) {
        var element = json.element;

        if (element) {
          data.persons = persons$1(element);
          data.simular = similar$1(element);
          data.videos = videos$1(element);
          data.movie = {
            id: element.id,
            url: element.alias,
            source: 'okko',
            title: element.name,
            original_title: element.originalName,
            name: element.type == 'SERIAL' ? element.name : '',
            original_name: element.type == 'SERIAL' ? element.originalName : '',
            overview: element.description,
            img: img$1(element),
            runtime: (element.duration || 0) / 1000 / 60,
            genres: genres$2(element),
            vote_average: element.imdbRating || element.kinopoiskRating || 0,
            production_companies: [],
            production_countries: countries$1(element),
            budget: element.budget && element.budget.value ? element.budget.value : 0,
            release_date: date(element),
            number_of_seasons: seasonsCount$1(element).seasons,
            number_of_episodes: seasonsCount$1(element).episodes,
            seasons: seasonsDetails(element),
            first_air_date: element.type == 'SERIAL' ? date(element) : ''
          };
        }

        oncomplite(data);
      }, onerror);
    }

    var OKKO = {
      main: main$3,
      full: full$3,
      collections: collections$2,
      seasons: seasons$3,
      list: list$4,
      person: person$3,
      menu: menu$3,
      category: category$3,
      clear: network$4.clear
    };

    var baseurl$1 = 'https://api.ivi.ru/mobileapi/';
    var network$3 = new create$m();
    var menu_list = [];
    var prox = 'http://proxy.cub.watch/img/';

    function tocard(element) {
      return {
        url: element.hru,
        id: element.id,
        title: element.title,
        original_title: element.orig_title,
        release_date: element.release_date || element.ivi_pseudo_release_date || element.ivi_release_date || (element.year ? element.year + '' : element.years ? element.years[0] + '' : '0000'),
        vote_average: element.ivi_rating_10 || 0,
        poster: img(element),
        year: element.year,
        years: element.years
      };
    }

    function entities(url, oncomplite, onerror) {
      network$3["native"]('https://www.ivi.ru/' + url, function (str) {
        var parse = parse = str.match(/window.__INITIAL_STATE__ = (\{.*?\});<\/script>/);
        var json = {};

        try {
          json = parse && eval('(' + parse[1] + ')');
        } catch (e) {}

        if (json.entities) {
          if (!menu_list.length) {
            for (var i in json.entities.genres) {
              var item = json.entities.genres[i];
              menu_list.push({
                title: item.title + ' (' + item.catalogue_count + ')',
                id: item.id
              });
            }
          }

          oncomplite(json.entities, json);
        } else onerror();
      }, onerror, false, {
        dataType: 'text'
      });
    }

    function find(json, id) {
      var found;

      for (var i in json.content) {
        if (i == id) found = json.content[i];
      }

      return found;
    }

    function img(element) {
      var posters = element.poster_originals || element.posters;
      return posters && posters[0] ? prox + (posters[0].path || posters[0].url) + '/300x456/' : '';
    }

    function genres$1(element, json) {
      var data = [];
      element.genres.forEach(function (id) {
        var genre = json.genres[id];

        if (genre) {
          data.push({
            id: genre.id,
            name: genre.title
          });
        }
      });
      return data;
    }

    function countries(element, json) {
      var data = [];

      if (element.country && json.countries[element.country]) {
        data.push({
          name: json.countries[element.country].title
        });
      }

      return data;
    }

    function persons(json) {
      var data = [];

      if (json.persons && json.persons.info) {
        for (var i in json.persons.info) {
          var _person = json.persons.info[i],
              images = Arrays.getValues(_person.images || {});

          if (_person.profession_types[0] == 6) {
            data.push({
              name: _person.name,
              character: 'Актер',
              id: _person.id,
              img: images.length ? prox + images[0].path : ''
            });
          }
        }
      }

      return data.length ? {
        cast: data
      } : false;
    }

    function similar(element, json) {
      var data = [];

      if (json.content) {
        for (var i in json.content) {
          var item = json.content[i];
          if (element !== item) data.push(tocard(item));
        }

        data.sort(function (a, b) {
          var ay = a.year || (a.years ? a.years[0] : 0);
          var by = b.year || (b.years ? b.years[0] : 0);
          return by - ay;
        });
      }

      return data.length ? {
        results: data
      } : false;
    }

    function videos(element) {
      var data = [];

      if (element.additional_data) {
        element.additional_data.forEach(function (atach) {
          if (atach.data_type == 'trailer' && atach.files) {
            atach.files.forEach(function (file) {
              if (file.content_format == 'MP4-HD1080') {
                data.push({
                  name: atach.title,
                  url: file.url,
                  player: true
                });
              }
            });
          }
        });
      }

      return data.length ? {
        results: data
      } : false;
    }

    function seasonsCount(element) {
      var data = {
        seasons: 0,
        episodes: 0
      };

      if (element.seasons) {
        data.seasons = element.seasons.length;

        for (var i in element.seasons_content_total) {
          data.episodes += element.seasons_content_total[i];
        }
      }

      return data;
    }

    function seasons$2(tv, from, oncomplite, onerror) {
      var status$1 = new status(from.length);
      status$1.onComplite = oncomplite;
      from.forEach(function (season) {
        network$3["native"](baseurl$1 + 'videofromcompilation/v5/?id=' + tv.id + '&season=' + season + '&from=0&to=60&fake=1&mark_as_purchased=1&app_version=870&session=66674cdb8528557407669760_1650471651-0EALRgbYRksN8Hfc5UthGeg', function (json) {
          if (json.result) {
            var episodes = [];
            json.result.forEach(function (elem) {
              episodes.push({
                name: elem.title,
                img: elem.promo_images && elem.promo_images.length ? prox + elem.promo_images[0].url + '/300x240/' : '',
                air_date: elem.release_date || elem.ivi_pseudo_release_date || elem.ivi_release_date || (elem.year ? elem.year + '' : elem.years ? elem.years[0] + '' : '0000'),
                episode_number: elem.episode
              });
            });
            status$1.append('' + season, {
              episodes: episodes
            });
          } else status$1.error();
        }, status$1.error.bind(status$1));
      });
    }

    function comments(json) {
      var data = [];

      if (json.comments) {
        for (var i in json.comments) {
          var com = json.comments[i];
          com.text = com.text.replace(/\\[n|r|t]/g, '');
          data.push(com);
        }
      }

      return data.length ? data : false;
    }

    function menu$2(params, oncomplite) {
      if (!menu_list.length) {
        network$3.timeout(1000);
        entities('', function () {
          oncomplite(menu_list);
        });
      } else oncomplite(menu_list);
    }

    function full$2(params, oncomplite, onerror) {
      entities('watch/' + (params.url || params.id), function (json, all) {
        var data = {};
        var element = find(json, params.id);
        console.log(json, all);

        if (element) {
          data.persons = persons(json);
          data.simular = similar(element, json);
          data.videos = videos(element);
          data.comments = comments(json);
          data.movie = {
            id: element.id,
            url: element.hru,
            source: 'ivi',
            title: element.title,
            original_title: element.orig_title,
            name: element.seasons ? element.title : '',
            original_name: element.seasons ? element.orig_title : '',
            overview: element.description.replace(/\\[n|r|t]/g, ''),
            img: img(element),
            runtime: element.duration_minutes,
            genres: genres$1(element, json),
            vote_average: parseFloat(element.ivi_rating_10 || element.imdb_rating || element.kp_rating || '0'),
            production_companies: [],
            production_countries: countries(element, json),
            budget: element.budget || 0,
            release_date: element.release_date || element.ivi_pseudo_release_date || element.ivi_release_date || '0000',
            number_of_seasons: seasonsCount(element).seasons,
            number_of_episodes: seasonsCount(element).episodes,
            first_air_date: element.seasons ? element.release_date || element.ivi_pseudo_release_date || element.ivi_release_date || '0000' : ''
          };
        }

        oncomplite(data);
      }, onerror);
    }

    function person$2(params, oncomplite, onerror) {
      entities('person/' + (params.url || params.id), function (json, all) {
        var data = {};

        if (all.pages && all.pages.personPage) {
          var element = all.pages.personPage.person.info,
              images = Arrays.getValues(element.images || {});
          data.person = {
            name: element.name,
            biography: element.bio,
            img: images.length ? prox + images[0].path : '',
            place_of_birth: element.eng_title,
            birthday: '----'
          };
          data.movie = similar(element, json);
        }

        oncomplite(data);
      }, onerror);
    }

    function list$3(params, oncomplite, onerror) {
      var fr = 20 * (params.page - 1),
          to = fr + 19;
      var url = baseurl$1 + 'catalogue/v5/?genre=' + params.genres + '&from=' + fr + '&to=' + to + '&withpreorderable=true';
      if (!params.genres) url = baseurl$1 + 'collection/catalog/v5/?id=' + params.url + '&withpreorderable=true&fake=false&from=' + fr + '&to=' + to + '&sort=priority_in_collection&fields=id%2Civi_pseudo_release_date%2Crelease_date%2Corig_title%2Ctitle%2Cfake%2Cpreorderable%2Cavailable_in_countries%2Chru%2Cposter_originals%2Crating%2Ccontent_paid_types%2Ccompilation_hru%2Ckind%2Cadditional_data%2Crestrict%2Chd_available%2Chd_available_all%2C3d_available%2C3d_available_all%2Cuhd_available%2Cuhd_available_all%2Chdr10_available%2Chdr10_available_all%2Cdv_available%2Cdv_available_all%2Cfullhd_available%2Cfullhd_available_all%2Chdr10plus_available%2Chdr10plus_available_all%2Chas_5_1%2Cshields%2Cseasons_count%2Cseasons_content_total%2Cseasons%2Cepisodes%2Cseasons_description%2Civi_rating_10_count%2Cseasons_extra_info%2Ccount%2Cgenres%2Cyears%2Civi_rating_10%2Crating%2Ccountry%2Cduration_minutes%2Cyear&app_version=870';
      network$3["native"](url, function (json) {
        var items = [];

        if (json.result) {
          json.result.forEach(function (element) {
            items.push(tocard(element));
          });
        }

        oncomplite({
          results: items,
          total_pages: Math.round(json.count / 20)
        });
      }, onerror);
    }

    function category$2(params, oncomplite, onerror) {
      var status$1 = new status(params.url == 'movie' ? 4 : 5);
      var books = Favorite.continues(params.url);

      status$1.onComplite = function () {
        var fulldata = [];
        if (books.length) fulldata.push({
          results: books,
          title: params.url == 'tv' ? 'Продолжить просмотр' : 'Вы смотрели'
        });
        if (status$1.data["new"] && status$1.data["new"].results.length) fulldata.push(status$1.data["new"]);
        if (status$1.data.best && status$1.data.best.results.length) fulldata.push(status$1.data.best);
        if (status$1.data.rus && status$1.data.rus.results.length) fulldata.push(status$1.data.rus);
        if (status$1.data.popular && status$1.data.popular.results.length) fulldata.push(status$1.data.popular);
        if (status$1.data.ivi && status$1.data.ivi.results.length) fulldata.push(status$1.data.ivi);
        if (fulldata.length) oncomplite(fulldata);else onerror();
      };

      var append = function append(title, name, id, json) {
        json.title = title;
        json.url = id;

        if (json.results.results) {
          json.results = json.results.results;
        }

        status$1.append(name, json);
      };

      if (params.url == 'movie') {
        collections$1({
          id: '8258'
        }, function (json) {
          append('Премьеры фильмов', 'new', '8258', {
            results: json
          });
        }, status$1.error.bind(status$1));
        collections$1({
          id: '942'
        }, function (json) {
          append('Лучшие фильмы', 'best', '942', {
            results: json
          });
        }, status$1.error.bind(status$1));
        collections$1({
          id: '11512'
        }, function (json) {
          append('Популярное сейчас', 'popular', '11512', {
            results: json
          });
        }, status$1.error.bind(status$1));
        collections$1({
          id: '8448'
        }, function (json) {
          append('Выбор ivi', 'ivi', '8448', {
            results: json
          });
        }, status$1.error.bind(status$1));
      } else {
        collections$1({
          id: '1984'
        }, function (json) {
          append('Новинки', 'new', '1984', {
            results: json
          });
        }, status$1.error.bind(status$1));
        collections$1({
          id: '1712'
        }, function (json) {
          append('Зарубежные', 'best', '1712', {
            results: json
          });
        }, status$1.error.bind(status$1));
        collections$1({
          id: '935'
        }, function (json) {
          append('Русские', 'rus', '935', {
            results: json
          });
        }, status$1.error.bind(status$1));
        collections$1({
          id: '12839'
        }, function (json) {
          append('Популярное сейчас', 'popular', '12839', {
            results: json
          });
        }, status$1.error.bind(status$1));
        collections$1({
          id: '1057'
        }, function (json) {
          append('Выбор ivi', 'ivi', '1057', {
            results: json
          });
        }, status$1.error.bind(status$1));
      }
    }

    function main$2(params, oncomplite, onerror) {
      var status$1 = new status(13);

      status$1.onComplite = function () {
        var fulldata = [];

        for (var i = 1; i <= 13; i++) {
          var n = i + '';
          if (status$1.data[n] && status$1.data[n].results.length) fulldata.push(status$1.data[n]);
        }

        console.log(fulldata, status$1);
        if (fulldata.length) oncomplite(fulldata);else onerror();
      };

      var append = function append(title, name, id, json) {
        json.title = title;
        json.url = id;

        if (json.results.results) {
          json.results = json.results.results;
        }

        status$1.append(name, json);
      };

      collections$1({
        id: '4655'
      }, function (json) {
        append('Рекомендуем вам посмотреть', '1', '4655', {
          results: json
        });
      }, status$1.error.bind(status$1));
      collections$1({
        id: '2460'
      }, function (json) {
        append('Мультики для всей семьи', '2', '2460', {
          results: json
        });
      }, status$1.error.bind(status$1));
      collections$1({
        id: '917'
      }, function (json) {
        append('Триллеры-ужасы', '3', '917', {
          results: json
        });
      }, status$1.error.bind(status$1));
      collections$1({
        id: '1327'
      }, function (json) {
        append('Приключенческие комедии', '4', '1327', {
          results: json
        });
      }, status$1.error.bind(status$1));
      collections$1({
        id: '1246'
      }, function (json) {
        append('Экранизации детективов', '5', '1246', {
          results: json
        });
      }, status$1.error.bind(status$1));
      collections$1({
        id: '1335'
      }, function (json) {
        append('Криминальные комедии', '6', '1335', {
          results: json
        });
      }, status$1.error.bind(status$1));
      collections$1({
        id: '1411'
      }, function (json) {
        append('Романтические драмы', '7', '1411', {
          results: json
        });
      }, status$1.error.bind(status$1));
      collections$1({
        id: '73'
      }, function (json) {
        append('Криминальные драмы', '8', '73', {
          results: json
        });
      }, status$1.error.bind(status$1));
      collections$1({
        id: '1413'
      }, function (json) {
        append('Фантастические драмы', '9', '1413', {
          results: json
        });
      }, status$1.error.bind(status$1));
      collections$1({
        id: '62'
      }, function (json) {
        append('Военные драмы', '10', '62', {
          results: json
        });
      }, status$1.error.bind(status$1));
      collections$1({
        id: '1418'
      }, function (json) {
        append('Мистические фильмы', '11', '1418', {
          results: json
        });
      }, status$1.error.bind(status$1));
      collections$1({
        id: '4495'
      }, function (json) {
        append('Зарубежные сериалы', '12', '4495', {
          results: json
        });
      }, status$1.error.bind(status$1));
      collections$1({
        id: '217'
      }, function (json) {
        append('Исторические сериалы', '13', '217', {
          results: json
        });
      }, status$1.error.bind(status$1));
    }

    function collections$1(params, oncomplite, onerror) {
      var fr = 20 * (params.page - 1),
          to = fr + 19;
      var uri = baseurl$1 + 'collections/v5/?app_version=870&from=' + fr + '&tags_exclude=goodmovies&to=' + to;
      if (params.id) uri = baseurl$1 + 'collection/catalog/v5/?id=' + params.id + '&withpreorderable=true&fake=false&from=' + fr + '&to=' + to + '&sort=priority_in_collection&fields=id%2Civi_pseudo_release_date%2Crelease_date%2Corig_title%2Ctitle%2Cfake%2Cpreorderable%2Cavailable_in_countries%2Chru%2Cposter_originals%2Crating%2Ccontent_paid_types%2Ccompilation_hru%2Ckind%2Cadditional_data%2Crestrict%2Chd_available%2Chd_available_all%2C3d_available%2C3d_available_all%2Cuhd_available%2Cuhd_available_all%2Chdr10_available%2Chdr10_available_all%2Cdv_available%2Cdv_available_all%2Cfullhd_available%2Cfullhd_available_all%2Chdr10plus_available%2Chdr10plus_available_all%2Chas_5_1%2Cshields%2Cseasons_count%2Cseasons_content_total%2Cseasons%2Cepisodes%2Cseasons_description%2Civi_rating_10_count%2Cseasons_extra_info%2Ccount%2Cgenres%2Cyears%2Civi_rating_10%2Crating%2Ccountry%2Cduration_minutes%2Cyear&app_version=870';
      network$3.timeout(15000);
      network$3["native"](uri, function (json) {
        var result = {
          results: [],
          total_pages: 0,
          page: params.page
        };

        if (json.result) {
          json.result.forEach(function (element) {
            var item = {
              id: element.id,
              url: element.hru,
              title: element.title,
              poster: prox + (element.images && element.images.length ? element.images[0].path : 'https://www.ivi.ru/images/stubs/collection_preview_stub.jpeg')
            };
            if (params.id) item = tocard(element);
            result.results.push(item);
          });
          result.total_pages = Math.round(json.count / 20);
        }

        oncomplite(result);
      }, onerror);
    }

    var IVI = {
      collections: collections$1,
      full: full$2,
      main: main$2,
      person: person$2,
      list: list$3,
      category: category$2,
      menu: menu$2,
      seasons: seasons$2,
      clear: network$3.clear
    };

    var baseurl = Utils.protocol() + 'tmdb.cub.watch/';
    var network$2 = new create$m();

    function url$1(u) {
      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      if (params.genres) u = add$4(u, 'genre=' + params.genres);
      if (params.page) u = add$4(u, 'page=' + params.page);
      if (params.query) u = add$4(u, 'query=' + params.query);

      if (params.filter) {
        for (var i in params.filter) {
          u = add$4(u, i + '=' + params.filter[i]);
        }
      }

      return baseurl + u;
    }

    function add$4(u, params) {
      return u + (/\?/.test(u) ? '&' : '?') + params;
    }

    function get$6(method) {
      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var oncomplite = arguments.length > 2 ? arguments[2] : undefined;
      var onerror = arguments.length > 3 ? arguments[3] : undefined;
      var u = url$1(method, params);
      network$2.silent(u, function (json) {
        json.url = method;
        oncomplite(json);
      }, onerror);
    }

    function list$2() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var oncomplite = arguments.length > 1 ? arguments[1] : undefined;
      var onerror = arguments.length > 2 ? arguments[2] : undefined;
      var u = url$1(params.url, params);
      network$2.silent(u, oncomplite, onerror);
    }

    function main$1() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var oncomplite = arguments.length > 1 ? arguments[1] : undefined;
      var onerror = arguments.length > 2 ? arguments[2] : undefined;
      var status$1 = new status(11);

      status$1.onComplite = function () {
        var fulldata = [];
        var data = status$1.data;

        for (var i = 1; i <= 11; i++) {
          var ipx = 's' + i;
          if (data[ipx] && data[ipx].results.length) fulldata.push(data[ipx]);
        }

        if (fulldata.length) oncomplite(fulldata);else onerror();
      };

      var append = function append(title, name, json) {
        json.title = title;
        status$1.append(name, json);
      };

      get$6('?sort=now_playing', params, function (json) {
        append('Сейчас смотрят', 's1', json);
        VideoQuality.add(json.results);
      }, status$1.error.bind(status$1));
      get$6('?sort=latest', params, function (json) {
        append('Последнее добавление', 's2', json);
      }, status$1.error.bind(status$1));
      get$6('movie/now', params, function (json) {
        append('Фильмы', 's3', json);
      }, status$1.error.bind(status$1));
      get$6('?sort=now&genre=16', params, function (json) {
        append('Мультфильмы', 's4', json);
      }, status$1.error.bind(status$1));
      get$6('tv/now', params, function (json) {
        append('Сериалы', 's5', json);
      }, status$1.error.bind(status$1));
      get$6('?sort=now&genre=12', params, function (json) {
        append('Приключения', 's6', json);
      }, status$1.error.bind(status$1));
      get$6('?sort=now&genre=35', params, function (json) {
        append('Комедии', 's7', json);
      }, status$1.error.bind(status$1));
      get$6('?sort=now&genre=10751', params, function (json) {
        append('Семейное', 's8', json);
      }, status$1.error.bind(status$1));
      get$6('?sort=now&genre=27', params, function (json) {
        append('Ужасы', 's9', json);
      }, status$1.error.bind(status$1));
      get$6('?sort=now&genre=878', params, function (json) {
        append('Фантастика', 's10', json);
      }, status$1.error.bind(status$1));
      get$6('?sort=now&genre=53', params, function (json) {
        append('Триллер', 's11', json);
      }, status$1.error.bind(status$1));
    }

    function category$1() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var oncomplite = arguments.length > 1 ? arguments[1] : undefined;
      var onerror = arguments.length > 2 ? arguments[2] : undefined;
      var total = 6;
      if (params.url !== 'tv') total--;
      var show = ['tv', 'movie'].indexOf(params.url) > -1;
      var books = show ? Favorite.continues(params.url) : [];
      var recomend = show ? Arrays.shuffle(Recomends.get(params.url)).slice(0, 19) : [];
      var status$1 = new status(total);

      status$1.onComplite = function () {
        var fulldata = [];
        var data = status$1.data;
        if (books.length) fulldata.push({
          results: books,
          title: params.url == 'tv' ? 'Продолжить просмотр' : 'Вы смотрели'
        });
        if (recomend.length) fulldata.push({
          results: recomend,
          title: 'Рекомендуем посмотреть'
        });

        for (var i = 1; i <= total + 1; i++) {
          var ipx = 's' + i;
          if (data[ipx] && data[ipx].results.length) fulldata.push(data[ipx]);
        }

        if (fulldata.length) oncomplite(fulldata);else onerror();
      };

      var append = function append(title, name, json) {
        json.title = title;
        status$1.append(name, json);
      };

      get$6('?cat=' + params.url + '&sort=now_playing', params, function (json) {
        append('Сейчас смотрят', 's1', json);
        if (show) VideoQuality.add(json.results);
      }, status$1.error.bind(status$1));

      if (params.url == 'tv') {
        get$6('?cat=' + params.url + '&sort=update', params, function (json) {
          append('Новые серии', 's2', json);
        }, status$1.error.bind(status$1));
      }

      get$6('?cat=' + params.url + '&sort=top', params, function (json) {
        append('Популярное', 's3', json);
        if (show) VideoQuality.add(json.results);
      }, status$1.error.bind(status$1));
      get$6('?cat=' + params.url + '&sort=latest', params, function (json) {
        append('Последнее добавление', 's4', json);
      }, status$1.error.bind(status$1));
      get$6('?cat=' + params.url + '&sort=now', params, function (json) {
        append('Новинки этого года', 's5', json);
      }, status$1.error.bind(status$1));
      get$6('?cat=' + params.url + '&sort=latest&vote=7', params, function (json) {
        append('С высоким рейтингом', 's6', json);
      }, status$1.error.bind(status$1));
    }

    function full$1(params, oncomplite, onerror) {
      var status$1 = new status(7);
      status$1.onComplite = oncomplite;
      get$6('3/' + params.method + '/' + params.id + '?api_key=4ef0d7355d9ffb5151e987764708ce96&language=' + Storage.field('tmdb_lang'), params, function (json) {
        json.source = 'tmdb';

        if (params.method == 'tv') {
          TMDB.get('tv/' + json.id + '/season/' + json.number_of_seasons, {}, function (ep) {
            status$1.append('episodes', ep);
          }, status$1.error.bind(status$1));
        } else status$1.need--;

        if (json.belongs_to_collection) {
          TMDB.get('collection/' + json.belongs_to_collection.id, {}, function (collection) {
            collection.results = collection.parts.slice(0, 19);
            status$1.append('collection', collection);
          }, status$1.error.bind(status$1));
        } else status$1.need--;

        status$1.append('movie', json);
      }, function () {
        status$1.need -= 2;
        status$1.error();
      });

      if (Storage.field('light_version')) {
        status$1.need -= 3;
      } else {
        TMDB.get(params.method + '/' + params.id + '/credits', params, function (json) {
          status$1.append('persons', json);
        }, status$1.error.bind(status$1));
        TMDB.get(params.method + '/' + params.id + '/recommendations', params, function (json) {
          status$1.append('recomend', json);
        }, status$1.error.bind(status$1));
        TMDB.get(params.method + '/' + params.id + '/similar', params, function (json) {
          status$1.append('simular', json);
        }, status$1.error.bind(status$1));
      }

      TMDB.get(params.method + '/' + params.id + '/videos', params, function (json) {
        status$1.append('videos', json);
      }, status$1.error.bind(status$1));
    }

    function menuCategory$1(params, oncomplite) {
      var menu = [];
      menu.push({
        title: 'Сейчас смотрят',
        url: '?cat=' + params.action + '&sort=now_playing'
      });

      if (params.action == 'tv') {
        menu.push({
          title: 'Новые серии',
          url: '?cat=' + params.action + '&sort=update'
        });
      }

      menu.push({
        title: 'Популярное',
        url: '?cat=' + params.action + '&sort=top'
      });
      menu.push({
        title: 'Последнее добавление',
        url: '?cat=' + params.action + '&sort=latest'
      });
      menu.push({
        title: 'Новинки этого года',
        url: '?cat=' + params.action + '&sort=now'
      });
      menu.push({
        title: 'С высоким рейтингом',
        url: '?cat=' + params.action + '&sort=latest&vote=7'
      });
      oncomplite(menu);
    }

    function person$1(params, oncomplite, onerror) {
      TMDB.person(params, oncomplite, onerror);
    }

    function menu$1(params, oncomplite) {
      TMDB.menu(params, oncomplite);
    }

    function seasons$1(tv, from, oncomplite) {
      TMDB.seasons(tv, from, oncomplite);
    }

    function clear$3() {
      network$2.clear();
    }

    var CUB = {
      main: main$1,
      menu: menu$1,
      full: full$1,
      list: list$2,
      category: category$1,
      clear: clear$3,
      person: person$1,
      seasons: seasons$1,
      menuCategory: menuCategory$1
    };

    var url;
    var network$1 = new create$m();

    function get$5() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var oncomplite = arguments.length > 1 ? arguments[1] : undefined;
      var onerror = arguments.length > 2 ? arguments[2] : undefined;

      function complite(data) {
        popular(params.movie, data, {}, oncomplite);
      }

      function error(e) {
        var data = {
          Results: []
        };
        popular(params.movie, data, {
          nolimit: true
        }, function () {
          if (data.Results.length) oncomplite(data);else onerror(e);
        });
      }

      if (Storage.field('parser_torrent_type') == 'jackett') {
        if (Storage.field('jackett_url')) {
          url = Utils.checkHttp(Storage.field('jackett_url'));
          jackett(params, complite, function () {
            torlook(params, complite, error);
          });
        } else {
          error('Укажите ссылку для парсинга Jackett');
        }
      } else {
        if (Storage.get('native')) {
          torlook(params, complite, error);
        } else if (Storage.field('torlook_parse_type') == 'site' && Storage.field('parser_website_url')) {
          url = Utils.checkHttp(Storage.field('parser_website_url'));
          torlook(params, complite, error);
        } else if (Storage.field('torlook_parse_type') == 'native') {
          torlook(params, complite, error);
        } else error('Укажите ссылку для парсинга TorLook');
      }
    }

    function popular(card, data, params, call) {
      Account.torrentPopular({
        card: card
      }, function (result) {
        var torrents = result.result.torrents.filter(function (t) {
          return t.viewing_request > (params.nolimit ? 0 : 3);
        });
        torrents.sort(function (a, b) {
          return b.viewing_average - a.viewing_average;
        });
        torrents.forEach(function (t) {
          delete t.viewed;
        });
        data.Results = data.Results.concat(params.nolimit ? torrents : torrents.slice(0, 3));
        call(data);
      }, function () {
        call(data);
      });
    }

    function viewed(hash) {
      var view = Storage.cache('torrents_view', 5000, []);
      return view.indexOf(hash) > -1;
    }

    function torlook() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var oncomplite = arguments.length > 1 ? arguments[1] : undefined;
      var onerror = arguments.length > 2 ? arguments[2] : undefined;
      torlookApi(params, oncomplite, onerror);
    }

    function torlookApi() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var oncomplite = arguments.length > 1 ? arguments[1] : undefined;
      var onerror = arguments.length > 2 ? arguments[2] : undefined;
      network$1.timeout(1000 * 30);
      var s = 'https://api.torlook.info/api.php?key=4JuCSML44FoEsmqK&s=';
      var q = (params.search + '').replace(/( )/g, "+").toLowerCase();
      var u = Storage.get('native') || Storage.field('torlook_parse_type') == 'native' ? s + encodeURIComponent(q) : url.replace('{q}', encodeURIComponent(s + encodeURIComponent(q)));
      network$1["native"](u, function (json) {
        if (json.error) onerror('Ошибка в запросе');else {
          var data = {
            Results: []
          };

          if (json.data) {
            json.data.forEach(function (elem) {
              var item = {};
              item.Title = elem.title;
              item.Tracker = elem.tracker;
              item.Size = parseInt(elem.size);
              item.size = Utils.bytesToSize(item.Size);
              item.PublishDate = parseInt(elem.date) * 1000;
              item.Seeders = parseInt(elem.seeders);
              item.Peers = parseInt(elem.leechers);
              item.PublisTime = parseInt(elem.date) * 1000;
              item.hash = Utils.hash(elem.title);
              item.MagnetUri = elem.magnet;
              item.viewed = viewed(item.hash);
              if (elem.magnet) data.Results.push(item);
            });
          }

          oncomplite(data);
        }
      }, function (a, c) {
        onerror(network$1.errorDecode(a, c));
      });
    }

    function jackett() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var oncomplite = arguments.length > 1 ? arguments[1] : undefined;
      var onerror = arguments.length > 2 ? arguments[2] : undefined;
      network$1.timeout(1000 * 15);
      var u = url + '/api/v2.0/indexers/all/results?apikey=' + Storage.field('jackett_key') + '&Query=' + encodeURIComponent(params.search);
      var genres = params.movie.genres.map(function (a) {
        return a.name;
      });

      if (!params.clarification) {
        u = Utils.addUrlComponent(u, 'title=' + encodeURIComponent(params.movie.title));
        u = Utils.addUrlComponent(u, 'title_original=' + encodeURIComponent(params.movie.original_title));
      }

      u = Utils.addUrlComponent(u, 'year=' + encodeURIComponent(((params.movie.release_date || params.movie.first_air_date || '0000') + '').slice(0, 4)));
      u = Utils.addUrlComponent(u, 'is_serial=' + (params.movie.first_air_date || params.movie.last_air_date ? '2' : params.other ? '0' : '1'));
      u = Utils.addUrlComponent(u, 'genres=' + encodeURIComponent(genres.join(',')));
      u = Utils.addUrlComponent(u, 'Category[]=' + (params.movie.number_of_seasons > 0 ? 5000 : 2000) + (params.movie.original_language == 'ja' ? ',5070' : ''));
      network$1["native"](u, function (json) {
        json.Results.forEach(function (element) {
          element.PublisTime = Utils.strToTime(element.PublishDate);
          element.hash = Utils.hash(element.Title);
          element.viewed = viewed(element.hash);
          element.size = Utils.bytesToSize(element.Size);
        });
        oncomplite(json);
      }, function (a, c) {
        onerror(network$1.errorDecode(a, c));
      });
    }

    function marnet(element, oncomplite, onerror) {
      network$1.timeout(1000 * 15);
      var s = Utils.checkHttp(Storage.field('torlook_site')) + '/';
      var u = Storage.get('native') || Storage.field('torlook_parse_type') == 'native' ? s + element.reguest : url.replace('{q}', encodeURIComponent(s + element.reguest));
      network$1["native"](u, function (html) {
        var math = html.match(/magnet:(.*?)'/);

        if (math && math[1]) {
          element.MagnetUri = 'magnet:' + math[1];
          oncomplite();
        } else {
          onerror('Неудалось получить magnet ссылку');
        }
      }, function (a, c) {
        onerror(network$1.errorDecode(a, c));
      }, false, {
        dataType: 'text'
      });
    }

    function clear$2() {
      network$1.clear();
    }

    var Parser = {
      get: get$5,
      torlook: torlook,
      jackett: jackett,
      marnet: marnet,
      clear: clear$2
    };

    /**
     * Источники
     */

    var sources = {
      ivi: IVI,
      okko: OKKO,
      tmdb: TMDB,
      cub: CUB
    };
    /**
     * Чтоб не переписали их
     */

    Object.defineProperty(sources, 'ivi', {
      get: function get() {
        return IVI;
      }
    });
    Object.defineProperty(sources, 'okko', {
      get: function get() {
        return OKKO;
      }
    });
    Object.defineProperty(sources, 'tmdb', {
      get: function get() {
        return TMDB;
      }
    });
    Object.defineProperty(sources, 'cub', {
      get: function get() {
        return CUB;
      }
    });
    var network = new create$m();
    /**
     * Получить источник
     * @param {{source:string}} params 
     * @returns {class}
     */

    function source(params) {
      return params.source ? sources[params.source] : sources.tmdb;
    }
    /**
     * Главная страница
     * @param {{source:string}} params 
     * @param {function} oncomplite 
     * @param {function} onerror 
     */


    function main() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var oncomplite = arguments.length > 1 ? arguments[1] : undefined;
      var onerror = arguments.length > 2 ? arguments[2] : undefined;
      source(params).main(params, oncomplite, onerror);
    }
    /**
     * Категория
     * @param {{url:string, source:string}} params 
     * @param {function} oncomplite 
     * @param {function} onerror 
     */


    function category() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var oncomplite = arguments.length > 1 ? arguments[1] : undefined;
      var onerror = arguments.length > 2 ? arguments[2] : undefined;
      source(params).category(params, oncomplite, onerror);
    }
    /**
     * Просмотр карточки
     * @param {{id:string, source:string, method:string, card:{}}} params 
     * @param {function} oncomplite 
     * @param {function} onerror 
     */


    function full() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var oncomplite = arguments.length > 1 ? arguments[1] : undefined;
      var onerror = arguments.length > 2 ? arguments[2] : undefined;
      source(params).full(params, oncomplite, onerror);
    }
    /**
     * Главный поиск
     * @param {{query:string}} params 
     * @param {function} oncomplite
     */


    function search() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var oncomplite = arguments.length > 1 ? arguments[1] : undefined;
      var use_parser = Storage.field('parser_use') && Storage.field('parse_in_search');
      var status$1 = new status(use_parser ? 3 : 2);
      status$1.onComplite = oncomplite;
      TMDB.search(params, function (json) {
        if (json.movie) status$1.append('movie', json.movie);
        if (json.tv) status$1.append('tv', json.tv);
      }, status$1.error.bind(status$1));

      if (use_parser) {
        Parser.get({
          search: decodeURIComponent(params.query),
          other: true,
          movie: {
            genres: [],
            title: decodeURIComponent(params.query),
            original_title: decodeURIComponent(params.query),
            number_of_seasons: 0
          }
        }, function (json) {
          json.title = 'Парсер';
          json.results = json.Results.slice(0, 20);
          json.Results = null;
          json.results.forEach(function (element) {
            element.Title = Utils.shortText(element.Title, 110);
          });
          status$1.append('parser', json);
        }, status$1.error.bind(status$1));
      }
    }
    /**
     * Что-то старое, надо проверить
     * @param {object} params
     * @param {function} oncomplite 
     */


    function menuCategory() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var oncomplite = arguments.length > 1 ? arguments[1] : undefined;
      source(params).menuCategory(params, oncomplite);
    }
    /**
     * Информация об актёре
     * @param {{id:integer, source:string}} params 
     * @param {function} oncomplite 
     * @param {function} onerror 
     */


    function person() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var oncomplite = arguments.length > 1 ? arguments[1] : undefined;
      var onerror = arguments.length > 2 ? arguments[2] : undefined;
      source(params).person(params, oncomplite, onerror);
    }
    /**
     * Жанры
     * @param {object} params 
     * @param {function} oncomplite 
     * @param {function} onerror 
     */


    function genres() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var oncomplite = arguments.length > 1 ? arguments[1] : undefined;
      var onerror = arguments.length > 2 ? arguments[2] : undefined;
      TMDB.genres(params, oncomplite, onerror);
    }
    /**
     * Компания
     * @param {{id:integer}} params 
     * @param {function} oncomplite 
     * @param {function} onerror 
     */


    function company() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var oncomplite = arguments.length > 1 ? arguments[1] : undefined;
      var onerror = arguments.length > 2 ? arguments[2] : undefined;
      TMDB.company(params, oncomplite, onerror);
    }
    /**
     * Полная категори
     * @param {{page:integer, url:string, source:string}} params 
     * @param {function} oncomplite 
     * @param {function} onerror 
     */


    function list$1() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var oncomplite = arguments.length > 1 ? arguments[1] : undefined;
      var onerror = arguments.length > 2 ? arguments[2] : undefined;
      source(params).list(params, oncomplite, onerror);
    }
    /**
     * Получить список категорий для каталога в меню
     * @param {{source:string}} params 
     * @param {function} oncomplite 
     */


    function menu() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var oncomplite = arguments.length > 1 ? arguments[1] : undefined;
      source(params).menu(params, oncomplite);
    }
    /**
     * Сезоны
     * @param {{id:integer, source:string}} tv 
     * @param {[1,2,3]} from - список сезонов 1,3,4...
     * @param {function} oncomplite 
     */


    function seasons(tv, from, oncomplite) {
      source(tv).seasons(tv, from, oncomplite);
    }
    /**
     * Коллекции 
     * @param {object} params 
     * @param {function} oncomplite 
     * @param {function} onerror 
     */


    function collections(params, oncomplite, onerror) {
      source(params).collections(params, oncomplite, onerror);
    }
    /**
     * Закладки
     * @param {{page:integer, type:string}} params 
     * @param {function} oncomplite 
     * @param {function} onerror 
     */


    function favorite() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var oncomplite = arguments.length > 1 ? arguments[1] : undefined;
      var onerror = arguments.length > 2 ? arguments[2] : undefined;
      var data = {};
      data.results = Favorite.get(params);
      data.total_pages = Math.ceil(data.results.length / 20);
      data.page = Math.min(params.page, data.total_pages);
      var offset = data.page - 1;
      data.results = data.results.slice(20 * offset, 20 * offset + 20);
      if (data.results.length) oncomplite(data);else onerror();
    }
    /**
     * Релизы
     * @param {function} oncomplite 
     * @param {function} onerror 
     */


    function relise(oncomplite, onerror) {
      network.silent(Utils.protocol() + 'tmdb.cub.watch?sort=releases&results=200', function (json) {
        json.results.forEach(function (item) {
          item.tmdbID = item.id;
        });
        oncomplite(json.results);
      }, onerror);
    }
    /**
     * Очистить
     */


    function clear$1() {
      for (var i in sources) {
        sources[i].clear();
      }

      network.clear();
    }

    var Api = {
      main: main,
      img: TMDB.img,
      full: full,
      list: list$1,
      genres: genres,
      category: category,
      search: search,
      clear: clear$1,
      company: company,
      person: person,
      favorite: favorite,
      seasons: seasons,
      screensavers: TMDB.screensavers,
      relise: relise,
      menu: menu,
      collections: collections,
      menuCategory: menuCategory,
      sources: sources
    };

    var data$1 = [];
    var object = false;
    /**
     * Запуск
     */

    function init$9() {
      data$1 = Storage.cache('timetable', 300, []);
      setInterval(extract$1, 1000 * 60 * 2);
      setInterval(favorites, 1000 * 60 * 10);
    }
    /**
     * Добавить карточки к парсингу
     * @param {[{id:integer,number_of_seasons:integer}]} elems - карточки
     */


    function add$3(elems) {
      elems.filter(function (elem) {
        return elem.number_of_seasons;
      }).forEach(function (elem) {
        var id = data$1.filter(function (a) {
          return a.id == elem.id;
        });

        if (!id.length) {
          data$1.push({
            id: elem.id,
            season: elem.number_of_seasons,
            episodes: []
          });
        }
      });
      Storage.set('timetable', data$1);
    }
    /**
     * Добавить из закладок
     */


    function favorites() {
      add$3(Favorite.get({
        type: 'book'
      }));
      add$3(Favorite.get({
        type: 'like'
      }));
      add$3(Favorite.get({
        type: 'wath'
      }));
    }
    /**
     * Парсим карточку
     */


    function parse() {
      if (Favorite.check(object).any) {
        TMDB.get('tv/' + object.id + '/season/' + object.season, {}, function (ep) {
          object.episodes = ep.episodes;
          save$1();
        }, save$1);
      } else {
        Arrays.remove(data$1, object); //очистить из расписания если больше нету в закладках

        save$1();
      }
    }
    /**
     * Получить карточку для парсинга
     */


    function extract$1() {
      var ids = data$1.filter(function (e) {
        return !e.scaned && (e.scaned_time || 0) + 60 * 60 * 12 * 1000 < Date.now();
      });

      if (ids.length) {
        object = ids[0];
        parse();
      } else {
        data$1.forEach(function (a) {
          return a.scaned = 0;
        });
      }

      Storage.set('timetable', data$1);
    }
    /**
     * Сохранить состояние
     */


    function save$1() {
      if (object) {
        object.scaned = 1;
        object.scaned_time = Date.now();
        Storage.set('timetable', data$1);
      }
    }
    /**
     * Получить эпизоды для карточки если есть
     * @param {{id:integer}} elem - карточка
     * @returns {array}
     */


    function get$4(elem) {
      var fid = data$1.filter(function (e) {
        return e.id == elem.id;
      });
      return (fid.length ? fid[0] : {}).episodes || [];
    }
    /**
     * Добавить карточку в парсинг самостоятельно
     * @param {{id:integer,number_of_seasons:integer}} elem - карточка
     */


    function update$3(elem) {
      if (elem.number_of_seasons && Favorite.check(elem).any) {
        var id = data$1.filter(function (a) {
          return a.id == elem.id;
        });
        TMDB.clear();

        if (!id.length) {
          var item = {
            id: elem.id,
            season: elem.number_of_seasons,
            episodes: []
          };
          data$1.push(item);
          Storage.set('timetable', data$1);
          object = item;
        } else object = id[0];

        parse();
      }
    }
    /**
     * Получить все данные
     * @returns {[{id:integer,season:integer,episodes:[]}]}
     */


    function all$1() {
      return data$1;
    }

    var TimeTable = {
      init: init$9,
      get: get$4,
      add: add$3,
      all: all$1,
      update: update$3
    };

    /**
     * Карточка
     * @param {object} data
     * @param {{isparser:boolean, card_small:boolean, card_category:boolean, card_collection:boolean, card_wide:true}} params 
     */

    function Card(data) {
      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      Arrays.extend(data, {
        title: data.name,
        original_title: data.original_name,
        release_date: data.first_air_date
      });
      data.release_year = ((data.release_date || '0000') + '').slice(0, 4);
      /**
       * Загрузить шаблон
       */

      this.build = function () {
        this.card = Template.get(params.isparser ? 'card_parser' : 'card', data);
        this.img = this.card.find('img')[0] || {};
        var quality = VideoQuality.get(data);

        if (data.first_air_date) {
          this.card.find('.card__view').append('<div class="card__type"></div>');
          this.card.find('.card__type').text(data.first_air_date ? 'TV' : 'MOV');
          this.card.addClass(data.first_air_date ? 'card--tv' : 'card--movie');
        }

        if (params.card_small) {
          this.card.addClass('card--small');

          if (!Storage.field('light_version')) {
            this.card.find('.card__title').remove();
            this.card.find('.card__age').remove();
          }
        }

        if (params.card_category) {
          this.card.addClass('card--category');
          this.card.find('.card__age').remove();
        }

        if (params.card_collection) {
          this.card.addClass('card--collection');
          this.card.find('.card__age').remove();
        }

        if (params.card_wide) {
          this.card.addClass('card--wide');
          data.poster = data.cover;
          if (data.promo) this.card.append('<div class="card__promo"><div class="card__promo-text">' + data.promo + '</div></div>');
          if (Storage.field('light_version')) this.card.find('.card__title').remove();
          this.card.find('.card__age').remove();
        }

        if (data.release_year == '0000') {
          this.card.find('.card__age').remove();
        }

        if (data.check_new_episode && Account.working()) {
          var notices = Storage.get('account_notice', []).filter(function (n) {
            return n.card_id == data.id;
          });

          if (notices.length) {
            var notice = notices[0];

            if (Utils.parseTime(notice.date).full == Utils.parseTime(Date.now()).full) {
              this.card.find('.card__view').append('<div class="card__new-episode"><div>Новая серия</div></div>');
            }
          }
        }

        if (quality) {
          this.card.find('.card__view').append('<div class="card__quality"><div>' + quality + '</div></div>');
        }
      };
      /**
       * Загрузить картинку
       */


      this.image = function () {
        var _this = this;

        this.img.onload = function () {
          _this.card.addClass('card--loaded');
        };

        this.img.onerror = function () {
          _this.img.src = './img/img_broken.svg';
        };
      };
      /**
       * Доюавить иконку
       * @param {string} name 
       */


      this.addicon = function (name) {
        this.card.find('.card__icons-inner').append('<div class="card__icon icon--' + name + '"></div>');
      };
      /**
       * Какие серии просмотрено
       */


      this.watched = function () {
        if (!this.watched_checked) {
          var episodes = TimeTable.get(data);
          var viewed;
          episodes.forEach(function (ep) {
            var hash = Utils.hash([ep.season_number, ep.episode_number, data.original_title].join(''));
            var view = Timeline.view(hash);
            if (view.percent) viewed = {
              ep: ep,
              view: view
            };
          });

          if (viewed) {
            var next = episodes.slice(episodes.indexOf(viewed.ep)).filter(function (ep) {
              var date = new Date(ep.air_date).getTime();
              return date < Date.now();
            }).slice(0, 5);
            var wrap = Template.get('card_watched', {});
            next.forEach(function (ep) {
              var item = $('<div class="card-watched__item"><span>' + ep.episode_number + ' - ' + (ep.name || 'Без названия') + '</span></div>');
              if (ep == viewed.ep) item.append(Timeline.render(viewed.view));
              wrap.find('.card-watched__body').append(item);
            });
            this.watched_wrap = wrap;
            this.card.find('.card__view').prepend(wrap);
          }

          this.watched_checked = true;
        }

        if (this.watched_wrap) {
          this.watched_wrap.toggleClass('reverce--position', this.card.offset().left > window.innerWidth / 2 ? true : false);
        }
      };
      /**
       * Обновить иконки на закладки
       */


      this.favorite = function () {
        var status = Favorite.check(data);
        this.card.find('.card__icon').remove();
        if (status.book) this.addicon('book');
        if (status.like) this.addicon('like');
        if (status.wath) this.addicon('wath');
        if (status.history) this.addicon('history');
      };
      /**
       * Вызвали меню
       * @param {object} target 
       * @param {object} data 
       */


      this.onMenu = function (target, data) {
        var _this2 = this;

        var enabled = Controller.enabled().name;
        var status = Favorite.check(data);
        Select.show({
          title: 'Действие',
          items: [{
            title: status.book ? 'Убрать из закладок' : 'В закладки',
            subtitle: 'Смотрите в меню (Закладки)',
            where: 'book'
          }, {
            title: status.like ? 'Убрать из понравившихся' : 'Нравится',
            subtitle: 'Смотрите в меню (Нравится)',
            where: 'like'
          }, {
            title: status.wath ? 'Убрать из ожидаемых' : 'Смотреть позже',
            subtitle: 'Смотрите в меню (Позже)',
            where: 'wath'
          }, {
            title: status.history ? 'Убрать из истории' : 'Добавить в историю',
            subtitle: 'Смотрите в меню (История)',
            where: 'history'
          }],
          onBack: function onBack() {
            Controller.toggle(enabled);
          },
          onSelect: function onSelect(a) {
            if (params.object) data.source = params.object.source;
            Favorite.toggle(a.where, data);

            _this2.favorite();

            Controller.toggle(enabled);
          }
        });
      };
      /**
       * Создать
       */


      this.create = function () {
        var _this3 = this;

        this.build();
        this.favorite();
        this.card.on('hover:focus', function (e) {
          _this3.watched();

          _this3.onFocus(e.target, data);
        }).on('hover:enter', function (e) {
          _this3.onEnter(e.target, data);
        }).on('hover:long', function (e) {
          _this3.onMenu(e.target, data);
        });
        this.image();
      };
      /**
       * Загружать картинку если видна карточка
       */


      this.visible = function () {
        if (this.visibled) return;
        if (data.poster_path) this.img.src = Api.img(data.poster_path);else if (data.poster) this.img.src = data.poster;else if (data.img) this.img.src = data.img;else this.img.src = './img/img_broken.svg';
        this.visibled = true;
      };
      /**
       * Уничтожить
       */


      this.destroy = function () {
        this.img.onerror = function () {};

        this.img.onload = function () {};

        this.img.src = '';
        this.card.remove();
        this.card = null;
        this.img = null;
      };
      /**
       * Рендер
       * @returns {object}
       */


      this.render = function () {
        return this.card;
      };
    }

    function init$8() {
      var timer;
      $(window).on('resize', function () {
        clearTimeout(timer);
        timer = setTimeout(update$2, 100);
      });
      toggleClasses();
      Storage.listener.follow('change', function (event) {
        if (event.name == 'interface_size') update$2();
        if (event.name == 'animation' || event.name == 'mask') toggleClasses();
      });
      var body = $('body');
      var mouse_timer;
      $(window).on('mousemove', function () {
        clearTimeout(mouse_timer);
        mouse_timer = setTimeout(function () {
          body.toggleClass('no--cursor', true);
        }, 3000);
        body.toggleClass('no--cursor', false);
      });
    }

    function size() {
      var sl = Storage.field('interface_size');
      var sz = {
        normal: 1,
        small: 0.9,
        bigger: 1.1
      };
      var fs = sz[sl];
      $('body').css({
        fontSize: Math.max(window.innerWidth / 84.17 * fs, 10.6) + 'px'
      }).removeClass('size--small size--normal size--bigger').addClass('size--' + sl);
    }

    function update$2() {
      size();
      var left = $('.wrap__left')[0].getBoundingClientRect();
      $('.layer--width').css('width', window.innerWidth - (Storage.field('light_version') && window.innerWidth >= 767 ? left.width : 0));
      var head = $('.head')[0].getBoundingClientRect();
      $('.layer--wheight').each(function () {
        var elem = $(this),
            heig = window.innerHeight - head.height;

        if (elem.data('mheight')) {
          heig -= elem.data('mheight')[0].getBoundingClientRect().height;
        }

        elem.css('height', heig);
      });
      $('.layer--height').each(function () {
        var elem = $(this),
            heig = window.innerHeight;

        if (elem.data('mheight')) {
          heig -= elem.data('mheight')[0].getBoundingClientRect().height;
        }

        elem.css('height', heig);
      });
    }

    function toggleClasses() {
      $('body').toggleClass('no--animation', !Storage.field('animation'));
      $('body').toggleClass('no--mask', !Storage.field('mask'));
    }

    var Layer = {
      update: update$2,
      init: init$8
    };

    /* eslint-disable no-bitwise -- used for calculations */

    /* eslint-disable unicorn/prefer-query-selector -- aiming at
      backward-compatibility */

    /**
    * StackBlur - a fast almost Gaussian Blur For Canvas
    *
    * In case you find this class useful - especially in commercial projects -
    * I am not totally unhappy for a small donation to my PayPal account
    * mario@quasimondo.de
    *
    * Or support me on flattr:
    * {@link https://flattr.com/thing/72791/StackBlur-a-fast-almost-Gaussian-Blur-Effect-for-CanvasJavascript}.
    *
    * @module StackBlur
    * @author Mario Klingemann
    * Contact: mario@quasimondo.com
    * Website: {@link http://www.quasimondo.com/StackBlurForCanvas/StackBlurDemo.html}
    * Twitter: @quasimondo
    *
    * @copyright (c) 2010 Mario Klingemann
    *
    * Permission is hereby granted, free of charge, to any person
    * obtaining a copy of this software and associated documentation
    * files (the "Software"), to deal in the Software without
    * restriction, including without limitation the rights to use,
    * copy, modify, merge, publish, distribute, sublicense, and/or sell
    * copies of the Software, and to permit persons to whom the
    * Software is furnished to do so, subject to the following
    * conditions:
    *
    * The above copyright notice and this permission notice shall be
    * included in all copies or substantial portions of the Software.
    *
    * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
    * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
    * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
    * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
    * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
    * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
    * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
    * OTHER DEALINGS IN THE SOFTWARE.
    */
    var mulTable = [512, 512, 456, 512, 328, 456, 335, 512, 405, 328, 271, 456, 388, 335, 292, 512, 454, 405, 364, 328, 298, 271, 496, 456, 420, 388, 360, 335, 312, 292, 273, 512, 482, 454, 428, 405, 383, 364, 345, 328, 312, 298, 284, 271, 259, 496, 475, 456, 437, 420, 404, 388, 374, 360, 347, 335, 323, 312, 302, 292, 282, 273, 265, 512, 497, 482, 468, 454, 441, 428, 417, 405, 394, 383, 373, 364, 354, 345, 337, 328, 320, 312, 305, 298, 291, 284, 278, 271, 265, 259, 507, 496, 485, 475, 465, 456, 446, 437, 428, 420, 412, 404, 396, 388, 381, 374, 367, 360, 354, 347, 341, 335, 329, 323, 318, 312, 307, 302, 297, 292, 287, 282, 278, 273, 269, 265, 261, 512, 505, 497, 489, 482, 475, 468, 461, 454, 447, 441, 435, 428, 422, 417, 411, 405, 399, 394, 389, 383, 378, 373, 368, 364, 359, 354, 350, 345, 341, 337, 332, 328, 324, 320, 316, 312, 309, 305, 301, 298, 294, 291, 287, 284, 281, 278, 274, 271, 268, 265, 262, 259, 257, 507, 501, 496, 491, 485, 480, 475, 470, 465, 460, 456, 451, 446, 442, 437, 433, 428, 424, 420, 416, 412, 408, 404, 400, 396, 392, 388, 385, 381, 377, 374, 370, 367, 363, 360, 357, 354, 350, 347, 344, 341, 338, 335, 332, 329, 326, 323, 320, 318, 315, 312, 310, 307, 304, 302, 299, 297, 294, 292, 289, 287, 285, 282, 280, 278, 275, 273, 271, 269, 267, 265, 263, 261, 259];
    var shgTable = [9, 11, 12, 13, 13, 14, 14, 15, 15, 15, 15, 16, 16, 16, 16, 17, 17, 17, 17, 17, 17, 17, 18, 18, 18, 18, 18, 18, 18, 18, 18, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24];
    /**
     * @param {string|HTMLImageElement} img
     * @param {string|HTMLCanvasElement} canvas
     * @param {Float} radius
     * @param {boolean} blurAlphaChannel
     * @param {boolean} useOffset
     * @param {boolean} skipStyles
     * @returns {undefined}
     */

    function processImage(img, canvas, radius, blurAlphaChannel, useOffset, skipStyles) {
      if (typeof img === 'string') {
        img = document.getElementById(img);
      }

      if (!img || !('naturalWidth' in img)) {
        return;
      }

      var dimensionType = useOffset ? 'offset' : 'natural';
      var w = img[dimensionType + 'Width'];
      var h = img[dimensionType + 'Height'];

      if (typeof canvas === 'string') {
        canvas = document.getElementById(canvas);
      }

      if (!canvas || !('getContext' in canvas)) {
        return;
      }

      if (!skipStyles) {
        canvas.style.width = w + 'px';
        canvas.style.height = h + 'px';
      }

      canvas.width = w;
      canvas.height = h;
      var context = canvas.getContext('2d');
      context.clearRect(0, 0, w, h);
      context.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight, 0, 0, w, h);

      if (isNaN(radius) || radius < 1) {
        return;
      }

      if (blurAlphaChannel) {
        processCanvasRGBA(canvas, 0, 0, w, h, radius);
      } else {
        processCanvasRGB(canvas, 0, 0, w, h, radius);
      }
    }
    /**
     * @param {string|HTMLCanvasElement} canvas
     * @param {Integer} topX
     * @param {Integer} topY
     * @param {Integer} width
     * @param {Integer} height
     * @throws {Error|TypeError}
     * @returns {ImageData} See {@link https://html.spec.whatwg.org/multipage/canvas.html#imagedata}
     */


    function getImageDataFromCanvas(canvas, topX, topY, width, height) {
      if (typeof canvas === 'string') {
        canvas = document.getElementById(canvas);
      }

      if (!canvas || _typeof(canvas) !== 'object' || !('getContext' in canvas)) {
        throw new TypeError('Expecting canvas with `getContext` method ' + 'in processCanvasRGB(A) calls!');
      }

      var context = canvas.getContext('2d');

      try {
        return context.getImageData(topX, topY, width, height);
      } catch (e) {
        throw new Error('unable to access image data: ' + e);
      }
    }
    /**
     * @param {HTMLCanvasElement} canvas
     * @param {Integer} topX
     * @param {Integer} topY
     * @param {Integer} width
     * @param {Integer} height
     * @param {Float} radius
     * @returns {undefined}
     */


    function processCanvasRGBA(canvas, topX, topY, width, height, radius) {
      if (isNaN(radius) || radius < 1) {
        return;
      }

      radius |= 0;
      var imageData = getImageDataFromCanvas(canvas, topX, topY, width, height);
      imageData = processImageDataRGBA(imageData, topX, topY, width, height, radius);
      canvas.getContext('2d').putImageData(imageData, topX, topY);
    }
    /**
     * @param {ImageData} imageData
     * @param {Integer} topX
     * @param {Integer} topY
     * @param {Integer} width
     * @param {Integer} height
     * @param {Float} radius
     * @returns {ImageData}
     */


    function processImageDataRGBA(imageData, topX, topY, width, height, radius) {
      var pixels = imageData.data;
      var div = 2 * radius + 1; // const w4 = width << 2;

      var widthMinus1 = width - 1;
      var heightMinus1 = height - 1;
      var radiusPlus1 = radius + 1;
      var sumFactor = radiusPlus1 * (radiusPlus1 + 1) / 2;
      var stackStart = new BlurStack();
      var stack = stackStart;
      var stackEnd;

      for (var i = 1; i < div; i++) {
        stack = stack.next = new BlurStack();

        if (i === radiusPlus1) {
          stackEnd = stack;
        }
      }

      stack.next = stackStart;
      var stackIn = null,
          stackOut = null,
          yw = 0,
          yi = 0;
      var mulSum = mulTable[radius];
      var shgSum = shgTable[radius];

      for (var y = 0; y < height; y++) {
        stack = stackStart;
        var pr = pixels[yi],
            pg = pixels[yi + 1],
            pb = pixels[yi + 2],
            pa = pixels[yi + 3];

        for (var _i = 0; _i < radiusPlus1; _i++) {
          stack.r = pr;
          stack.g = pg;
          stack.b = pb;
          stack.a = pa;
          stack = stack.next;
        }

        var rInSum = 0,
            gInSum = 0,
            bInSum = 0,
            aInSum = 0,
            rOutSum = radiusPlus1 * pr,
            gOutSum = radiusPlus1 * pg,
            bOutSum = radiusPlus1 * pb,
            aOutSum = radiusPlus1 * pa,
            rSum = sumFactor * pr,
            gSum = sumFactor * pg,
            bSum = sumFactor * pb,
            aSum = sumFactor * pa;

        for (var _i2 = 1; _i2 < radiusPlus1; _i2++) {
          var p = yi + ((widthMinus1 < _i2 ? widthMinus1 : _i2) << 2);
          var r = pixels[p],
              g = pixels[p + 1],
              b = pixels[p + 2],
              a = pixels[p + 3];
          var rbs = radiusPlus1 - _i2;
          rSum += (stack.r = r) * rbs;
          gSum += (stack.g = g) * rbs;
          bSum += (stack.b = b) * rbs;
          aSum += (stack.a = a) * rbs;
          rInSum += r;
          gInSum += g;
          bInSum += b;
          aInSum += a;
          stack = stack.next;
        }

        stackIn = stackStart;
        stackOut = stackEnd;

        for (var x = 0; x < width; x++) {
          var paInitial = aSum * mulSum >> shgSum;
          pixels[yi + 3] = paInitial;

          if (paInitial !== 0) {
            var _a2 = 255 / paInitial;

            pixels[yi] = (rSum * mulSum >> shgSum) * _a2;
            pixels[yi + 1] = (gSum * mulSum >> shgSum) * _a2;
            pixels[yi + 2] = (bSum * mulSum >> shgSum) * _a2;
          } else {
            pixels[yi] = pixels[yi + 1] = pixels[yi + 2] = 0;
          }

          rSum -= rOutSum;
          gSum -= gOutSum;
          bSum -= bOutSum;
          aSum -= aOutSum;
          rOutSum -= stackIn.r;
          gOutSum -= stackIn.g;
          bOutSum -= stackIn.b;
          aOutSum -= stackIn.a;

          var _p = x + radius + 1;

          _p = yw + (_p < widthMinus1 ? _p : widthMinus1) << 2;
          rInSum += stackIn.r = pixels[_p];
          gInSum += stackIn.g = pixels[_p + 1];
          bInSum += stackIn.b = pixels[_p + 2];
          aInSum += stackIn.a = pixels[_p + 3];
          rSum += rInSum;
          gSum += gInSum;
          bSum += bInSum;
          aSum += aInSum;
          stackIn = stackIn.next;
          var _stackOut = stackOut,
              _r = _stackOut.r,
              _g = _stackOut.g,
              _b = _stackOut.b,
              _a = _stackOut.a;
          rOutSum += _r;
          gOutSum += _g;
          bOutSum += _b;
          aOutSum += _a;
          rInSum -= _r;
          gInSum -= _g;
          bInSum -= _b;
          aInSum -= _a;
          stackOut = stackOut.next;
          yi += 4;
        }

        yw += width;
      }

      for (var _x = 0; _x < width; _x++) {
        yi = _x << 2;

        var _pr = pixels[yi],
            _pg = pixels[yi + 1],
            _pb = pixels[yi + 2],
            _pa = pixels[yi + 3],
            _rOutSum = radiusPlus1 * _pr,
            _gOutSum = radiusPlus1 * _pg,
            _bOutSum = radiusPlus1 * _pb,
            _aOutSum = radiusPlus1 * _pa,
            _rSum = sumFactor * _pr,
            _gSum = sumFactor * _pg,
            _bSum = sumFactor * _pb,
            _aSum = sumFactor * _pa;

        stack = stackStart;

        for (var _i3 = 0; _i3 < radiusPlus1; _i3++) {
          stack.r = _pr;
          stack.g = _pg;
          stack.b = _pb;
          stack.a = _pa;
          stack = stack.next;
        }

        var yp = width;
        var _gInSum = 0,
            _bInSum = 0,
            _aInSum = 0,
            _rInSum = 0;

        for (var _i4 = 1; _i4 <= radius; _i4++) {
          yi = yp + _x << 2;

          var _rbs = radiusPlus1 - _i4;

          _rSum += (stack.r = _pr = pixels[yi]) * _rbs;
          _gSum += (stack.g = _pg = pixels[yi + 1]) * _rbs;
          _bSum += (stack.b = _pb = pixels[yi + 2]) * _rbs;
          _aSum += (stack.a = _pa = pixels[yi + 3]) * _rbs;
          _rInSum += _pr;
          _gInSum += _pg;
          _bInSum += _pb;
          _aInSum += _pa;
          stack = stack.next;

          if (_i4 < heightMinus1) {
            yp += width;
          }
        }

        yi = _x;
        stackIn = stackStart;
        stackOut = stackEnd;

        for (var _y = 0; _y < height; _y++) {
          var _p2 = yi << 2;

          pixels[_p2 + 3] = _pa = _aSum * mulSum >> shgSum;

          if (_pa > 0) {
            _pa = 255 / _pa;
            pixels[_p2] = (_rSum * mulSum >> shgSum) * _pa;
            pixels[_p2 + 1] = (_gSum * mulSum >> shgSum) * _pa;
            pixels[_p2 + 2] = (_bSum * mulSum >> shgSum) * _pa;
          } else {
            pixels[_p2] = pixels[_p2 + 1] = pixels[_p2 + 2] = 0;
          }

          _rSum -= _rOutSum;
          _gSum -= _gOutSum;
          _bSum -= _bOutSum;
          _aSum -= _aOutSum;
          _rOutSum -= stackIn.r;
          _gOutSum -= stackIn.g;
          _bOutSum -= stackIn.b;
          _aOutSum -= stackIn.a;
          _p2 = _x + ((_p2 = _y + radiusPlus1) < heightMinus1 ? _p2 : heightMinus1) * width << 2;
          _rSum += _rInSum += stackIn.r = pixels[_p2];
          _gSum += _gInSum += stackIn.g = pixels[_p2 + 1];
          _bSum += _bInSum += stackIn.b = pixels[_p2 + 2];
          _aSum += _aInSum += stackIn.a = pixels[_p2 + 3];
          stackIn = stackIn.next;
          _rOutSum += _pr = stackOut.r;
          _gOutSum += _pg = stackOut.g;
          _bOutSum += _pb = stackOut.b;
          _aOutSum += _pa = stackOut.a;
          _rInSum -= _pr;
          _gInSum -= _pg;
          _bInSum -= _pb;
          _aInSum -= _pa;
          stackOut = stackOut.next;
          yi += width;
        }
      }

      return imageData;
    }
    /**
     * @param {HTMLCanvasElement} canvas
     * @param {Integer} topX
     * @param {Integer} topY
     * @param {Integer} width
     * @param {Integer} height
     * @param {Float} radius
     * @returns {undefined}
     */


    function processCanvasRGB(canvas, topX, topY, width, height, radius) {
      if (isNaN(radius) || radius < 1) {
        return;
      }

      radius |= 0;
      var imageData = getImageDataFromCanvas(canvas, topX, topY, width, height);
      imageData = processImageDataRGB(imageData, topX, topY, width, height, radius);
      canvas.getContext('2d').putImageData(imageData, topX, topY);
    }
    /**
     * @param {ImageData} imageData
     * @param {Integer} topX
     * @param {Integer} topY
     * @param {Integer} width
     * @param {Integer} height
     * @param {Float} radius
     * @returns {ImageData}
     */


    function processImageDataRGB(imageData, topX, topY, width, height, radius) {
      var pixels = imageData.data;
      var div = 2 * radius + 1; // const w4 = width << 2;

      var widthMinus1 = width - 1;
      var heightMinus1 = height - 1;
      var radiusPlus1 = radius + 1;
      var sumFactor = radiusPlus1 * (radiusPlus1 + 1) / 2;
      var stackStart = new BlurStack();
      var stack = stackStart;
      var stackEnd;

      for (var i = 1; i < div; i++) {
        stack = stack.next = new BlurStack();

        if (i === radiusPlus1) {
          stackEnd = stack;
        }
      }

      stack.next = stackStart;
      var stackIn = null;
      var stackOut = null;
      var mulSum = mulTable[radius];
      var shgSum = shgTable[radius];
      var p, rbs;
      var yw = 0,
          yi = 0;

      for (var y = 0; y < height; y++) {
        var pr = pixels[yi],
            pg = pixels[yi + 1],
            pb = pixels[yi + 2],
            rOutSum = radiusPlus1 * pr,
            gOutSum = radiusPlus1 * pg,
            bOutSum = radiusPlus1 * pb,
            rSum = sumFactor * pr,
            gSum = sumFactor * pg,
            bSum = sumFactor * pb;
        stack = stackStart;

        for (var _i5 = 0; _i5 < radiusPlus1; _i5++) {
          stack.r = pr;
          stack.g = pg;
          stack.b = pb;
          stack = stack.next;
        }

        var rInSum = 0,
            gInSum = 0,
            bInSum = 0;

        for (var _i6 = 1; _i6 < radiusPlus1; _i6++) {
          p = yi + ((widthMinus1 < _i6 ? widthMinus1 : _i6) << 2);
          rSum += (stack.r = pr = pixels[p]) * (rbs = radiusPlus1 - _i6);
          gSum += (stack.g = pg = pixels[p + 1]) * rbs;
          bSum += (stack.b = pb = pixels[p + 2]) * rbs;
          rInSum += pr;
          gInSum += pg;
          bInSum += pb;
          stack = stack.next;
        }

        stackIn = stackStart;
        stackOut = stackEnd;

        for (var x = 0; x < width; x++) {
          pixels[yi] = rSum * mulSum >> shgSum;
          pixels[yi + 1] = gSum * mulSum >> shgSum;
          pixels[yi + 2] = bSum * mulSum >> shgSum;
          rSum -= rOutSum;
          gSum -= gOutSum;
          bSum -= bOutSum;
          rOutSum -= stackIn.r;
          gOutSum -= stackIn.g;
          bOutSum -= stackIn.b;
          p = yw + ((p = x + radius + 1) < widthMinus1 ? p : widthMinus1) << 2;
          rInSum += stackIn.r = pixels[p];
          gInSum += stackIn.g = pixels[p + 1];
          bInSum += stackIn.b = pixels[p + 2];
          rSum += rInSum;
          gSum += gInSum;
          bSum += bInSum;
          stackIn = stackIn.next;
          rOutSum += pr = stackOut.r;
          gOutSum += pg = stackOut.g;
          bOutSum += pb = stackOut.b;
          rInSum -= pr;
          gInSum -= pg;
          bInSum -= pb;
          stackOut = stackOut.next;
          yi += 4;
        }

        yw += width;
      }

      for (var _x2 = 0; _x2 < width; _x2++) {
        yi = _x2 << 2;

        var _pr2 = pixels[yi],
            _pg2 = pixels[yi + 1],
            _pb2 = pixels[yi + 2],
            _rOutSum2 = radiusPlus1 * _pr2,
            _gOutSum2 = radiusPlus1 * _pg2,
            _bOutSum2 = radiusPlus1 * _pb2,
            _rSum2 = sumFactor * _pr2,
            _gSum2 = sumFactor * _pg2,
            _bSum2 = sumFactor * _pb2;

        stack = stackStart;

        for (var _i7 = 0; _i7 < radiusPlus1; _i7++) {
          stack.r = _pr2;
          stack.g = _pg2;
          stack.b = _pb2;
          stack = stack.next;
        }

        var _rInSum2 = 0,
            _gInSum2 = 0,
            _bInSum2 = 0;

        for (var _i8 = 1, yp = width; _i8 <= radius; _i8++) {
          yi = yp + _x2 << 2;
          _rSum2 += (stack.r = _pr2 = pixels[yi]) * (rbs = radiusPlus1 - _i8);
          _gSum2 += (stack.g = _pg2 = pixels[yi + 1]) * rbs;
          _bSum2 += (stack.b = _pb2 = pixels[yi + 2]) * rbs;
          _rInSum2 += _pr2;
          _gInSum2 += _pg2;
          _bInSum2 += _pb2;
          stack = stack.next;

          if (_i8 < heightMinus1) {
            yp += width;
          }
        }

        yi = _x2;
        stackIn = stackStart;
        stackOut = stackEnd;

        for (var _y2 = 0; _y2 < height; _y2++) {
          p = yi << 2;
          pixels[p] = _rSum2 * mulSum >> shgSum;
          pixels[p + 1] = _gSum2 * mulSum >> shgSum;
          pixels[p + 2] = _bSum2 * mulSum >> shgSum;
          _rSum2 -= _rOutSum2;
          _gSum2 -= _gOutSum2;
          _bSum2 -= _bOutSum2;
          _rOutSum2 -= stackIn.r;
          _gOutSum2 -= stackIn.g;
          _bOutSum2 -= stackIn.b;
          p = _x2 + ((p = _y2 + radiusPlus1) < heightMinus1 ? p : heightMinus1) * width << 2;
          _rSum2 += _rInSum2 += stackIn.r = pixels[p];
          _gSum2 += _gInSum2 += stackIn.g = pixels[p + 1];
          _bSum2 += _bInSum2 += stackIn.b = pixels[p + 2];
          stackIn = stackIn.next;
          _rOutSum2 += _pr2 = stackOut.r;
          _gOutSum2 += _pg2 = stackOut.g;
          _bOutSum2 += _pb2 = stackOut.b;
          _rInSum2 -= _pr2;
          _gInSum2 -= _pg2;
          _bInSum2 -= _pb2;
          stackOut = stackOut.next;
          yi += width;
        }
      }

      return imageData;
    }
    /**
     *
     */


    var BlurStack = /*#__PURE__*/_createClass(
    /**
     * Set properties.
     */
    function BlurStack() {
      _classCallCheck(this, BlurStack);

      this.r = 0;
      this.g = 0;
      this.b = 0;
      this.a = 0;
      this.next = null;
    });
    var Blur = {
      /**
        * @function module:StackBlur.image
        * @see module:StackBlur~processImage
        */
      image: processImage,

      /**
        * @function module:StackBlur.canvasRGBA
        * @see module:StackBlur~processCanvasRGBA
        */
      canvasRGBA: processCanvasRGBA,

      /**
        * @function module:StackBlur.canvasRGB
        * @see module:StackBlur~processCanvasRGB
        */
      canvasRGB: processCanvasRGB,

      /**
        * @function module:StackBlur.imageDataRGBA
        * @see module:StackBlur~processImageDataRGBA
        */
      imageDataRGBA: processImageDataRGBA,

      /**
        * @function module:StackBlur.imageDataRGB
        * @see module:StackBlur~processImageDataRGB
        */
      imageDataRGB: processImageDataRGB
    };

    var canvas = document.createElement('canvas'),
        ctx = canvas.getContext('2d');
    canvas.width = 30;
    canvas.height = 17;

    function extract(img_data) {
      var data = img_data.data,
          colors = [];

      for (var i = 0, n = data.length; i < n; i += 4) {
        colors.push([data[i], data[i + 1], data[i + 2]]);
      }

      return colors;
    }

    function palette(palette) {
      var colors = {
        bright: [0, 0, 0],
        average: [127, 127, 127],
        dark: [255, 255, 255]
      };
      var ar = 0,
          ag = 0,
          ab = 0,
          at = palette.length;
      var bg = 0,
          dk = 765;

      for (var i = 0; i < palette.length; i++) {
        var p = palette[i],
            a = p[0] + p[1] + p[2];
        ar += p[0];
        ag += p[1];
        ab += p[2];

        if (a > bg) {
          bg = a;
          colors.bright = p;
        }

        if (a < dk) {
          dk = a;
          colors.dark = p;
        }
      }

      colors.average = [Math.round(ar / at), Math.round(ag / at), Math.round(ab / at)];
      return colors;
    }

    function rgba(c) {
      var o = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
      return 'rgba(' + c.join(',') + ',' + o + ')';
    }

    function tone(c) {
      var o = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
      var s = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 30;
      var l = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 80;
      var hls = rgbToHsl(c[0], c[1], c[2]);
      var rgb = hslToRgb(hls[0], Math.min(s, hls[1]), l);
      return rgba(rgb, o);
    }
    /**
     * Converts an RGB color value to HSL.
     *
     * @param   {number}  r       The red color value
     * @param   {number}  g       The green color value
     * @param   {number}  b       The blue color value
     * @return  {Array}           The HSL representation
     */


    function rgbToHsl(r, g, b) {
      var rabs, gabs, babs, rr, gg, bb, h, s, v, diff, diffc, percentRoundFn;
      rabs = r / 255;
      gabs = g / 255;
      babs = b / 255;
      v = Math.max(rabs, gabs, babs), diff = v - Math.min(rabs, gabs, babs);

      diffc = function diffc(c) {
        return (v - c) / 6 / diff + 1 / 2;
      };

      percentRoundFn = function percentRoundFn(num) {
        return Math.round(num * 100) / 100;
      };

      if (diff == 0) {
        h = s = 0;
      } else {
        s = diff / v;
        rr = diffc(rabs);
        gg = diffc(gabs);
        bb = diffc(babs);

        if (rabs === v) {
          h = bb - gg;
        } else if (gabs === v) {
          h = 1 / 3 + rr - bb;
        } else if (babs === v) {
          h = 2 / 3 + gg - rr;
        }

        if (h < 0) {
          h += 1;
        } else if (h > 1) {
          h -= 1;
        }
      }

      return [Math.round(h * 360), percentRoundFn(s * 100), percentRoundFn(v * 100)];
    }
    /**
     * Converts an HSL color value to RGB.
     *
     * @param   {number}  h       The hue
     * @param   {number}  s       The saturation
     * @param   {number}  l       The lightness
     * @return  {Array}           The RGB representation
     */


    function hslToRgb(h, s, l) {
      s /= 100;
      l /= 100;
      var C = (1 - Math.abs(2 * l - 1)) * s;
      var hue = h / 60;
      var X = C * (1 - Math.abs(hue % 2 - 1));
      var r = 0,
          g = 0,
          b = 0;

      if (hue >= 0 && hue < 1) {
        r = C;
        g = X;
      } else if (hue >= 1 && hue < 2) {
        r = X;
        g = C;
      } else if (hue >= 2 && hue < 3) {
        g = C;
        b = X;
      } else if (hue >= 3 && hue < 4) {
        g = X;
        b = C;
      } else if (hue >= 4 && hue < 5) {
        r = X;
        b = C;
      } else {
        r = C;
        b = X;
      }

      var m = l - C / 2;
      r += m;
      g += m;
      b += m;
      r *= 255.0;
      g *= 255.0;
      b *= 255.0;
      return [Math.round(r), Math.round(g), Math.round(b)];
    }

    function reset(width, height) {
      canvas.width = width;
      canvas.height = height;
    }

    function get$3(img) {
      reset(30, 17);
      var ratio = Math.max(canvas.width / img.width, canvas.height / img.height);
      var nw = img.width * ratio,
          nh = img.height * ratio;
      ctx.drawImage(img, -(nw - canvas.width) / 2, -(nh - canvas.height) / 2, nw, nh);
      return extract(ctx.getImageData(0, 0, canvas.width, canvas.height));
    }

    function blur$1(img) {
      reset(200, 130);
      var ratio = Math.max(canvas.width / img.width, canvas.height / img.height);
      var nw = img.width * ratio,
          nh = img.height * ratio;
      ctx.drawImage(img, -(nw - canvas.width) / 2, -(nh - canvas.height) / 2, nw, nh);
      Blur.canvasRGB(canvas, 0, 0, canvas.width, canvas.height, 80);
      var nimg = new Image();
      nimg.src = canvas.toDataURL();
      return nimg;
    }

    var Color = {
      get: get$3,
      extract: extract,
      palette: palette,
      rgba: rgba,
      blur: blur$1,
      tone: tone,
      rgbToHsl: rgbToHsl
    };

    var html$5 = $("\n    <div class=\"background\">\n        <canvas class=\"background__one\"></canvas>\n        <canvas class=\"background__two\"></canvas>\n    </div>");
    var background = {
      one: {
        canvas: $('.background__one', html$5),
        ctx: $('.background__one', html$5)[0].getContext('2d')
      },
      two: {
        canvas: $('.background__two', html$5),
        ctx: $('.background__two', html$5)[0].getContext('2d')
      }
    };
    var view = 'one';
    var src = '';
    var loaded = {};
    var bokeh = {
      c: [],
      h: [],
      d: true
    };
    var timer$1;
    var timer_resize;
    /**
     * Запуск
     */

    function init$7() {
      Storage.listener.follow('change', function (event) {
        if (event.name == 'background' || event.name == 'background_type') resize();
      });
      var u = Platform.any() ? 'https://yumata.github.io/lampa/' : './';

      for (var i = 1; i <= 6; i++) {
        var im = new Image();
        im.src = u + 'img/bokeh-h/' + i + '.png';
        bokeh.h.push(im);
      }

      for (var _i = 1; _i <= 6; _i++) {
        var _im = new Image();

        _im.src = u + 'img/bokeh/' + _i + '.png';
        bokeh.c.push(_im);
      }

      $(window).on('resize', resize);
    }
    /**
     * Получить активный фон
     * @returns {{canvas:object, ctx: class}}
     */


    function bg() {
      html$5.find('canvas').removeClass('visible');
      view = view == 'one' ? 'two' : 'one';
      return background[view];
    }
    /**
     * Рисовать
     * @param {object} data 
     * @param {object} item - фон
     * @param {boolean} noimage
     */


    function draw(data, item, noimage) {
      if (!Storage.get('background', 'true') || noimage) {
        background.one.canvas.removeClass('visible');
        background.two.canvas.removeClass('visible');
        return;
      }

      item.canvas[0].width = window.innerWidth;
      item.canvas[0].height = window.innerHeight;
      var palette = data.palette;
      var type = Storage.field('background_type');
      blur(data, item, function () {
        if (type == 'complex' && bokeh.d) {
          var bright = Color.rgbToHsl(palette.average[0], palette.average[1], palette.average[2]);
          item.ctx.globalAlpha = bright[2] > 30 ? bright[2] / 100 * 0.6 : 0.4;
          item.ctx.globalCompositeOperation = bright[2] > 30 ? 'color-dodge' : 'screen';

          for (var i = 0; i < 10; i++) {
            var bp = Math.round(Math.random() * (bokeh.c.length - 1));
            var im = bright[2] > 30 ? bokeh.h[bp] : bokeh.c[bp];
            var xp = window.innerWidth * Math.random(),
                yp = window.innerHeight / 2 * Math.random() + window.innerHeight / 2,
                sz = Math.max(window.innerHeight / 8, window.innerHeight / 5 * Math.random()) * 0.01,
                nw = im.width * sz,
                nh = im.height * sz;

            try {
              item.ctx.drawImage(im, xp - nw / 2, yp - nw / 2, nw, nh);
            } catch (e) {}
          }
        }

        item.ctx.globalAlpha = type == 'poster' ? 0.7 : 0.6;
        item.ctx.globalCompositeOperation = 'multiply';
        var angle = 90 * Math.PI / 180,
            x2 = item.canvas[0].width * Math.cos(angle),
            y2 = item.canvas[0].height * Math.sin(angle);
        var gradient = item.ctx.createLinearGradient(0, 0, x2, y2);
        gradient.addColorStop(0, 'rgba(0,0,0,1)');
        gradient.addColorStop(1, 'rgba(0,0,0,0)');
        item.ctx.fillStyle = gradient;
        item.ctx.fillRect(0, 0, item.canvas[0].width, item.canvas[0].height);
        item.canvas.addClass('visible');
      });
    }
    /**
     * Размыть картинку
     * @param {object} data 
     * @param {object} item - фон
     * @param {function} complite 
     */


    function blur(data, item, complite) {
      var img = data.img.width > 1000 ? data.img : Color.blur(data.img);
      setTimeout(function () {
        var ratio = Math.max(item.canvas[0].width / img.width, item.canvas[0].height / img.height);
        var nw = img.width * ratio,
            nh = img.height * ratio;
        item.ctx.globalAlpha = data.img.width > 1000 ? bokeh.d ? 0.7 : 0.2 : 1;
        item.ctx.drawImage(img, -(nw - item.canvas[0].width) / 2, -(nh - item.canvas[0].height) / 2, nw, nh);
        complite();
      }, 100);
    }
    /**
     * Обновить если изменился размер окна
     */


    function resize() {
      clearTimeout(timer_resize);
      html$5.find('canvas').removeClass('visible');
      background.one.canvas.width(window.innerWidth);
      background.one.canvas.height(window.innerHeight);
      background.two.canvas.width(window.innerWidth);
      background.two.canvas.height(window.innerHeight);
      timer_resize = setTimeout(function () {
        if (loaded[src]) draw(loaded[src], background[view]);
      }, 200);
    }
    /**
     * Максимум картинок в памяти
     */


    function limit$1() {
      var a = Arrays.getKeys(loaded);

      if (a.length > 30) {
        var u = a.slice(0, 1);
        delete loaded[u];
      }
    }
    /**
     * Загрузить картинку в память
     */


    function load() {
      if (loaded[src]) {
        draw(loaded[src], bg());
      } else if (src) {
        limit$1();
        var cache_src = src;
        var colors;
        var img = new Image();
        img.crossOrigin = "Anonymous";

        img.onload = function () {
          try {
            colors = Color.get(img);
          } catch (e) {
            colors = [[200, 200, 200], [100, 100, 100], [10, 10, 10]];
          }

          loaded[cache_src] = {
            img: img,
            palette: Color.palette(colors)
          };
          draw(loaded[cache_src], bg());
        };

        img.onerror = function () {
          draw(false, false, true);
        };

        img.src = src;
      }
    }
    /**
     * Изменить картинку
     * @param {string} url
     */


    function change() {
      var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      if (url == src || Storage.field('light_version')) return;
      bokeh.d = true;
      if (url) src = url;
      clearTimeout(timer$1);
      timer$1 = setTimeout(function () {
        if (url) load();else draw(false, false, true);
      }, 1000);
    }
    /**
     * Изменить немедленно без ожидания
     * @param {string} url
     */


    function immediately() {
      var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      if (Storage.field('light_version')) return;
      if (url) src = url;
      clearTimeout(timer$1);
      bokeh.d = false;
      if (url) load();else draw(false, false, true);
    }
    /**
     * Рендер
     * @returns {object}
     */


    function render$2() {
      return html$5;
    }

    var Background = {
      render: render$2,
      change: change,
      update: resize,
      init: init$7,
      immediately: immediately
    };

    function create$g() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var card = Template.get('more');

      if (params.card_small) {
        card.addClass('card-more--small');
      }

      this.create = function () {
        var _this = this;

        card.on('hover:focus', function (e) {
          _this.onFocus(e.target);
        }).on('hover:enter', function (e) {
          _this.onEnter(e.target);
        });
      };

      this.render = function () {
        return card;
      };

      this.destroy = function () {
        card.remove();
        card = null;
      };
    }

    function create$f(data) {
      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var content = Template.get('items_line', {
        title: data.title
      });
      var body = content.find('.items-line__body');
      var scroll = new create$l({
        horizontal: true,
        step: params.wide ? 600 : 300
      });
      var viewall = Storage.field('card_views_type') == 'view' || Storage.field('navigation_type') == 'mouse';
      var light = Storage.field('light_version') && window.innerWidth >= 767;
      var items = [];
      var active = 0;
      var more;
      var last;

      this.create = function () {
        scroll.render().find('.scroll__body').addClass('items-cards');
        content.find('.items-line__title').text(data.title);
        this.bind();
        body.append(scroll.render());
      };

      this.bind = function () {
        data.results.slice(0, viewall ? light ? 6 : data.results.length : 8).forEach(this.append.bind(this));
        if ((data.results.length >= 20 || data.more) && !params.nomore) this.more();
        this.visible();
        Layer.update();
      };

      this.append = function (element) {
        var _this = this;

        if (element.ready) return;
        element.ready = true;
        var card = new Card(element, params);
        card.create();

        card.onFocus = function (target, card_data) {
          last = target;
          active = items.indexOf(card);
          if (!viewall && !light) data.results.slice(0, active + 5).forEach(_this.append.bind(_this));

          if (more) {
            more.render().detach();
            scroll.append(more.render());
          }

          scroll.update(items[active].render(), params.align_left ? false : true);

          _this.visible();

          if (!data.noimage) Background.change(Utils.cardImgBackground(card_data));
          if (_this.onFocus) _this.onFocus(card_data);
        };

        card.onEnter = function (target, card_data) {
          if (_this.onEnter) _this.onEnter(target, card_data);
          if (_this.onPrevent) return _this.onPrevent(target, card_data);
          if (!element.source) element.source = params.object.source;
          Activity$1.push({
            url: element.url,
            component: 'full',
            id: element.id,
            method: card_data.name ? 'tv' : 'movie',
            card: element,
            source: element.source || params.object.source
          });
        };

        if (params.card_events) {
          for (var i in params.card_events) {
            card[i] = params.card_events[i];
          }
        }

        scroll.append(card.render());
        items.push(card);
      };

      this.more = function () {
        var _this2 = this;

        more = new create$g(params);
        more.create();

        var onmore = function onmore() {
          if (_this2.onEnter) _this2.onEnter();

          if (_this2.onMore) {
            _this2.onMore();
          } else {
            Activity$1.push({
              url: data.url,
              title: 'Категория',
              component: 'category_full',
              page: light ? 1 : 2,
              genres: params.genres,
              filter: data.filter,
              source: params.object.source
            });
          }
        };

        more.onFocus = function (target) {
          last = target;
          scroll.update(more.render(), params.align_left ? false : true);
          if (_this2.onFocusMore) _this2.onFocusMore();
        };

        more.onEnter = function () {
          onmore();
        };

        var button = $('<div class="items-line__more selector">Ещё</div>');
        button.on('hover:enter', function () {
          onmore();
        });
        content.find('.items-line__head').append(button);
        scroll.append(more.render());
      };

      this.visible = function () {
        var vis = items;
        if (!viewall) vis = items.slice(active, active + 8);
        vis.forEach(function (item) {
          item.visible();
        });
      };

      this.toggle = function () {
        var _this3 = this;

        Controller.add('items_line', {
          toggle: function toggle() {
            Controller.collectionSet(scroll.render());
            Controller.collectionFocus(items.length ? last : false, scroll.render());

            _this3.visible();
          },
          right: function right() {
            Navigator.move('right');
            Controller.enable('items_line');
          },
          left: function left() {
            if (Navigator.canmove('left')) Navigator.move('left');else if (_this3.onLeft) _this3.onLeft();else Controller.toggle('menu');
          },
          down: this.onDown,
          up: this.onUp,
          gone: function gone() {},
          back: this.onBack
        });
        Controller.toggle('items_line');
      };

      this.render = function () {
        return content;
      };

      this.destroy = function () {
        Arrays.destroy(items);
        scroll.destroy();
        content.remove();
        if (more) more.destroy();
        items = null;
        more = null;
      };
    }

    function create$e() {
      var html;

      this.create = function () {
        html = Template.get('info');
      };

      this.update = function (data) {
        var nofavorite = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
        var create = ((data.release_date || data.first_air_date || '0000') + '').slice(0, 4);
        var vote = parseFloat((data.vote_average || 0) + '').toFixed(1);
        html.find('.info__title').text(data.title);
        html.find('.info__title-original').text((create == '0000' ? '' : create + ' - ') + data.original_title);
        html.find('.info__rate span').text(vote);
        html.find('.info__rate').toggleClass('hide', !(vote > 0));
        html.find('.info__icon').removeClass('active');

        if (!nofavorite) {
          var status = Favorite.check(data);
          $('.icon--book', html).toggleClass('active', status.book);
          $('.icon--like', html).toggleClass('active', status.like);
          $('.icon--wath', html).toggleClass('active', status.wath);
        }

        html.find('.info__right').toggleClass('hide', nofavorite);
      };

      this.render = function () {
        return html;
      };

      this.empty = function () {
        this.update({
          title: 'Ещё',
          original_title: 'Показать больше результатов',
          vote_average: 0
        }, true);
      };

      this.destroy = function () {
        html.remove();
        html = null;
      };
    }

    function create$d() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      Arrays.extend(params, {
        title: 'Здесь пусто',
        descr: 'На данный момент список пустой'
      });
      var html = Template.get('empty', params);

      this.start = function () {
        Controller.add('content', {
          toggle: function toggle() {
            Controller.collectionSet(html);
            Controller.collectionFocus(false, html);
          },
          left: function left() {
            if (Navigator.canmove('left')) Navigator.move('left');else Controller.toggle('menu');
          },
          up: function up() {
            if (Navigator.canmove('up')) Navigator.move('up');else Controller.toggle('head');
          },
          down: function down() {
            Navigator.move('down');
          },
          right: function right() {
            Navigator.move('right');
          },
          back: function back() {
            Activity$1.backward();
          }
        });
        Controller.toggle('content');
      };

      this.render = function (add) {
        if (add) html.append(add);
        return html;
      };
    }

    function component$f(object) {
      var network = new create$m();
      var scroll = new create$l({
        mask: true,
        over: true,
        scroll_by_item: true
      });
      var items = [];
      var html = $('<div></div>');
      var active = 0;
      var info;
      var lezydata;
      var viewall = Storage.field('card_views_type') == 'view' || Storage.field('navigation_type') == 'mouse';

      this.create = function () {};

      this.empty = function () {
        var empty = new create$d();
        html.append(empty.render());
        this.start = empty.start;
        this.activity.loader(false);
        this.activity.toggle();
      };

      this.build = function (data) {
        var _this = this;

        lezydata = data;

        if (Storage.field('light_version') && window.innerWidth >= 767) {
          scroll.minus();
          html.append(scroll.render());

          scroll.onWheel = function (step) {
            if (step > 0) _this.down();else _this.up();
          };
        } else {
          info = new create$e();
          info.create();
          scroll.minus(info.render());
          html.append(info.render());
          html.append(scroll.render());
        }

        data.slice(0, viewall ? data.length : 2).forEach(this.append.bind(this));
        this.activity.loader(false);
        this.activity.toggle();
      };

      this.append = function (element) {
        if (element.ready) return;
        element.ready = true;
        var item = new create$f(element, {
          url: element.url,
          card_small: true,
          genres: object.genres,
          object: object,
          card_wide: element.wide,
          nomore: element.nomore
        });
        item.create();
        item.onDown = this.down.bind(this);
        item.onUp = this.up.bind(this);
        item.onBack = this.back.bind(this);

        if (info) {
          item.onFocus = info.update;
          item.onFocusMore = info.empty.bind(info);
          scroll.append(item.render());
        } else {
          item.wrap = $('<div></div>');
          scroll.append(item.wrap);
        }

        items.push(item);
      };

      this.back = function () {
        Activity$1.backward();
      };

      this.detach = function () {
        if (!info) {
          items.forEach(function (item) {
            item.render().detach();
          });
          items.slice(active, active + 2).forEach(function (item) {
            item.wrap.append(item.render());
          });
        }
      };

      this.down = function () {
        active++;
        active = Math.min(active, items.length - 1);
        if (!viewall) lezydata.slice(0, active + 2).forEach(this.append.bind(this));
        this.detach();
        items[active].toggle();
        scroll.update(items[active].render());
      };

      this.up = function () {
        active--;

        if (active < 0) {
          active = 0;
          this.detach();
          Controller.toggle('head');
        } else {
          this.detach();
          items[active].toggle();
        }

        scroll.update(items[active].render());
      };

      this.start = function () {
        var _this2 = this;

        Controller.add('content', {
          toggle: function toggle() {
            if (items.length) {
              _this2.detach();

              items[active].toggle();
            }
          },
          back: this.back
        });
        Controller.toggle('content');
      };

      this.pause = function () {};

      this.stop = function () {};

      this.render = function () {
        return html;
      };

      this.destroy = function () {
        network.clear();
        Arrays.destroy(items);
        scroll.destroy();
        if (info) info.destroy();
        html.remove();
        items = null;
        network = null;
        lezydata = null;
      };
    }

    function component$e(object) {
      var comp = new component$f(object);

      comp.create = function () {
        this.activity.loader(true);
        Api.main(object, this.build.bind(this), this.empty.bind(this));
        return this.render();
      };

      return comp;
    }

    var player;
    var html$4;
    var timer;

    function create$c(id) {
      html$4 = $('<div class="youtube-player"><div id="youtube-player"></div><div id="youtube-player__progress" class="youtube-player__progress"></div></div>');
      $('body').append(html$4);
      player = new YT.Player('youtube-player', {
        height: window.innerHeight,
        width: window.innerWidth,
        playerVars: {
          'controls': 0,
          'showinfo': 0,
          'autohide': 1,
          'modestbranding': 1,
          'autoplay': 1
        },
        videoId: id,
        events: {
          onReady: function onReady(event) {
            event.target.playVideo();
            update$1();
          },
          onStateChange: function onStateChange(state) {
            if (state.data == 0) {
              Controller.toggle('content');
            }
          }
        }
      });
    }

    function update$1() {
      timer = setTimeout(function () {
        var progress = player.getCurrentTime() / player.getDuration() * 100;
        $('#youtube-player__progress').css('width', progress + '%');
        update$1();
      }, 400);
    }

    function play(id) {
      create$c(id);
      Controller.add('youtube', {
        invisible: true,
        toggle: function toggle() {},
        right: function right() {
          player.seekTo(player.getCurrentTime() + 10, true);
        },
        left: function left() {
          player.seekTo(player.getCurrentTime() - 10, true);
        },
        enter: function enter() {},
        gone: function gone() {
          destroy$1();
        },
        back: function back() {
          Controller.toggle('content');
        }
      });
      Controller.toggle('youtube');
    }

    function destroy$1() {
      clearTimeout(timer);
      player.destroy();
      html$4.remove();
      html$4 = null;
    }

    var YouTube = {
      play: play
    };

    function create$b(data) {
      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var html;
      var last;
      var tbtn;

      var follow = function follow(e) {
        if (e.name == 'parser_use') {
          var status = Storage.get('parser_use');
          tbtn.toggleClass('selector', status).toggleClass('hide', !status);
        }
      };

      var buttons_scroll = new create$l({
        horizontal: true,
        nopadding: true
      });
      var poster_size = Storage.field('poster_size');
      Arrays.extend(data.movie, {
        title: data.movie.name,
        original_title: data.movie.original_name,
        runtime: 0,
        img: data.movie.poster_path ? Api.img(data.movie.poster_path, poster_size) : 'img/img_broken.svg'
      });

      this.create = function () {
        var _this = this;

        var genres = (data.movie.genres || ['---']).slice(0, 3).map(function (a) {
          return Utils.capitalizeFirstLetter(a.name);
        }).join(', ');
        html = Template.get('full_start', {
          title: data.movie.title,
          original_title: data.movie.original_title,
          descr: Utils.substr(data.movie.overview || 'Без описания.', 420),
          time: Utils.secondsToTime(data.movie.runtime * 60, true),
          genres: Utils.substr(genres, 30),
          r_themovie: parseFloat((data.movie.vote_average || 0) + '').toFixed(1),
          seasons: data.movie.number_of_seasons,
          episodes: data.movie.number_of_episodes
        });

        if (data.movie.number_of_seasons) {
          html.find('.is--serial').removeClass('hide');
        }

        $('.full-start__buttons-scroll', html).append(buttons_scroll.render());
        buttons_scroll.append($('.full-start__buttons', html));
        if (!data.movie.runtime) $('.tag--time', html).remove();

        if (data.movie.next_episode_to_air) {
          var air = new Date(data.movie.next_episode_to_air.air_date);
          var now = Date.now();
          var day = Math.round((air.getTime() - now) / (24 * 60 * 60 * 1000));
          if (day > 0) $('.tag--episode', html).removeClass('hide').find('div').text('Следующая: ' + Utils.parseTime(data.movie.next_episode_to_air.air_date)["short"] + ' / Осталось дней: ' + day);
        }

        tbtn = html.find('.view--torrent');
        tbtn.on('hover:enter', function () {
          var query = data.movie.original_title;
          if (Storage.field('parse_lang') == 'ru' || !/\w{3}/.test(query)) query = data.movie.title;
          Activity$1.push({
            url: '',
            title: 'Торренты',
            component: 'torrents',
            search: query,
            search_one: data.movie.title,
            search_two: data.movie.original_title,
            movie: data.movie,
            page: 1
          });
        });
        html.find('.info__icon').on('hover:enter', function (e) {
          var type = $(e.target).data('type');
          params.object.card = data.movie;
          params.object.card.source = params.object.source;
          Favorite.toggle(type, params.object.card);

          _this.favorite();
        });

        if (data.videos && data.videos.results.length) {
          html.find('.view--trailer').on('hover:enter', function () {
            var items = [];
            data.videos.results.forEach(function (element) {
              items.push({
                title: element.name,
                subtitle: element.official ? 'Официальный' : 'Неофициальный',
                id: element.key,
                player: element.player,
                url: element.url
              });
            });
            Select.show({
              title: 'Трейлеры',
              items: items,
              onSelect: function onSelect(a) {
                _this.toggle();

                if (a.player) {
                  Player.play(a);
                  Player.playlist([a]);
                } else if (Platform.is('android')) {
                  Android.openYoutube(a.id);
                } else YouTube.play(a.id);
              },
              onBack: function onBack() {
                Controller.toggle('full_start');
              }
            });
          });
        } else {
          html.find('.view--trailer').remove();
        }

        var img = html.find('.full-start__img')[0] || {};

        img.onerror = function (e) {
          img.src = './img/img_broken.svg';
        };

        img.src = data.movie.img;
        Background.immediately(Utils.cardImgBackground(data.movie));
        Storage.listener.follow('change', follow);
        follow({
          name: 'parser_use'
        });
        this.favorite();
      };

      this.groupButtons = function () {
        var buttons = html.find('.full-start__buttons > *').not('.full-start__icons,.info__rate,.open--menu,.view--torrent,.view--trailer');
        var max = 2;

        if (buttons.length > max) {
          buttons.hide();
          html.find('.open--menu').on('hover:enter', function () {
            var enabled = Controller.enabled().name;
            var menu = [];
            var ready = {};
            buttons.each(function () {
              var name = $(this).find('span').text();

              if (ready[name]) {
                ready[name]++;
                name = name + ' ' + ready[name];
              } else {
                ready[name] = 1;
              }

              menu.push({
                title: name,
                subtitle: $(this).data('subtitle'),
                btn: $(this)
              });
            });
            Select.show({
              title: 'Смотреть',
              items: menu,
              onBack: function onBack() {
                Controller.toggle(enabled);
              },
              onSelect: function onSelect(a) {
                a.btn.trigger('hover:enter');
              }
            });
          });
        } else {
          html.find('.open--menu').hide();
        }
      };

      this.favorite = function () {
        var status = Favorite.check(params.object.card);
        $('.info__icon', html).removeClass('active');
        $('.icon--book', html).toggleClass('active', status.book);
        $('.icon--like', html).toggleClass('active', status.like);
        $('.icon--wath', html).toggleClass('active', status.wath);
      };

      this.toggleBackground = function () {
        Background.immediately(Utils.cardImgBackground(data.movie));
      };

      this.toggle = function () {
        var _this2 = this;

        Controller.add('full_start', {
          toggle: function toggle() {
            var btns = html.find('.full-start__buttons > *').not('.full-start__icons,.info__rate,.open--menu').filter(function () {
              return $(this).is(':visible');
            });
            Controller.collectionSet(_this2.render());
            Controller.collectionFocus(last || (btns.length ? btns.eq(0)[0] : $('.open--menu', html)[0]), _this2.render());
          },
          right: function right() {
            Navigator.move('right');
          },
          left: function left() {
            if (Navigator.canmove('left')) Navigator.move('left');else Controller.toggle('menu');
          },
          down: this.onDown,
          up: this.onUp,
          gone: function gone() {},
          back: this.onBack
        });
        Controller.toggle('full_start');
      };

      this.render = function () {
        return html;
      };

      this.destroy = function () {
        last = null;
        buttons_scroll.destroy();
        html.remove();
        Storage.listener.remove('change', follow);
      };
    }

    function create$a(data) {
      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var html, body, last;

      this.create = function () {
        html = Template.get('items_line', {
          title: 'Подробно'
        });
        var genres = data.movie.genres.map(function (a) {
          return '<div class="full-descr__tag selector" data-genre="' + a.id + '" data-url="' + a.url + '">' + a.name + '</div>';
        }).join('');
        var companies = data.movie.production_companies.map(function (a) {
          return '<div class="full-descr__tag selector" data-company="' + a.id + '">' + a.name + '</div>';
        }).join('');
        var countries = data.movie.production_countries.map(function (a) {
          return a.name;
        }).join(', ');
        body = Template.get('full_descr', {
          text: (data.movie.overview || 'Без описания.') + '<br><br>',
          genres: genres,
          companies: companies,
          relise: data.movie.release_date || data.movie.first_air_date,
          budget: '$ ' + Utils.numberWithSpaces(data.movie.budget || 0),
          countries: countries
        });
        if (!genres) $('.full--genres', body).remove();
        if (!companies) $('.full--companies', body).remove();
        body.find('.selector').on('hover:enter', function (e) {
          var item = $(e.target);

          if (item.data('genre')) {
            var tmdb = params.object.source == 'tmdb' || params.object.source == 'cub';
            Activity$1.push({
              url: tmdb ? 'movie' : item.data('url'),
              component: tmdb ? 'category' : 'category_full',
              genres: item.data('genre'),
              source: params.object.source,
              page: 1
            });
          }

          if (item.data('company')) {
            Api.clear();
            Modal.open({
              title: 'Компания',
              html: Template.get('modal_loading'),
              size: 'medium',
              onBack: function onBack() {
                Modal.close();
                Controller.toggle('full_descr');
              }
            });
            Api.company({
              id: item.data('company')
            }, function (json) {
              if (Controller.enabled().name == 'modal') {
                Arrays.empty(json, {
                  homepage: '---',
                  origin_country: '---',
                  headquarters: '---'
                });
                Modal.update(Template.get('company', json));
              }
            }, function () {});
          }
        }).on('hover:focus', function (e) {
          last = e.target;
        });
        html.find('.items-line__body').append(body);
      };

      this.toggle = function () {
        var _this = this;

        Controller.add('full_descr', {
          toggle: function toggle() {
            Controller.collectionSet(_this.render());
            Controller.collectionFocus(last, _this.render());
          },
          right: function right() {
            Navigator.move('right');
          },
          left: function left() {
            if (Navigator.canmove('left')) Navigator.move('left');else Controller.toggle('menu');
          },
          down: function down() {
            if (Navigator.canmove('down')) Navigator.move('down');else _this.onDown();
          },
          up: function up() {
            if (Navigator.canmove('up')) Navigator.move('up');else _this.onUp();
          },
          gone: function gone() {},
          back: this.onBack
        });
        Controller.toggle('full_descr');
      };

      this.render = function () {
        return html;
      };

      this.destroy = function () {
        body.remove();
        html.remove();
        html = null;
        body = null;
      };
    }

    function create$9(persons, params) {
      var html, scroll, last;

      this.create = function () {
        html = Template.get('items_line', {
          title: params.title || 'Актеры'
        });
        scroll = new create$l({
          horizontal: true,
          scroll_by_item: true
        });
        scroll.render().find('.scroll__body').addClass('full-persons');
        html.find('.items-line__body').append(scroll.render());
        persons.forEach(function (element) {
          var person = Template.get('full_person', {
            name: element.name,
            role: element.character || element.job,
            img: element.profile_path ? Api.img(element.profile_path) : element.img || './img/actor.svg'
          });
          person.on('hover:focus', function (e) {
            last = e.target;
            scroll.update($(e.target), true);
          }).on('hover:enter', function () {
            Activity$1.push({
              url: element.url,
              title: 'Персона',
              component: 'actor',
              id: element.id,
              source: params.object.source
            });
          });
          scroll.append(person);
        });
      };

      this.toggle = function () {
        var _this = this;

        Controller.add('full_descr', {
          toggle: function toggle() {
            Controller.collectionSet(_this.render());
            Controller.collectionFocus(last, _this.render());
          },
          right: function right() {
            Navigator.move('right');
          },
          left: function left() {
            if (Navigator.canmove('left')) Navigator.move('left');else Controller.toggle('menu');
          },
          down: this.onDown,
          up: this.onUp,
          gone: function gone() {},
          back: this.onBack
        });
        Controller.toggle('full_descr');
      };

      this.render = function () {
        return html;
      };

      this.destroy = function () {
        scroll.destroy();
        html.remove();
        html = null;
      };
    }

    function create$8(data) {
      var html, scroll, last;

      this.create = function () {
        html = Template.get('items_line', {
          title: 'Коментарии'
        });
        scroll = new create$l({
          horizontal: true
        });
        scroll.render().find('.scroll__body').addClass('full-reviews');
        html.find('.items-line__body').append(scroll.render());
        data.comments.forEach(function (element) {
          var review = Template.get('full_review', element);
          review.on('hover:focus', function (e) {
            last = e.target;
            scroll.update($(e.target), true);
          });
          scroll.append(review);
        });
      };

      this.toggle = function () {
        var _this = this;

        Controller.add('full_reviews', {
          toggle: function toggle() {
            Controller.collectionSet(_this.render());
            Controller.collectionFocus(last, _this.render());
          },
          right: function right() {
            Navigator.move('right');
          },
          left: function left() {
            if (Navigator.canmove('left')) Navigator.move('left');else Controller.toggle('menu');
          },
          down: this.onDown,
          up: this.onUp,
          gone: function gone() {},
          back: this.onBack
        });
        Controller.toggle('full_reviews');
      };

      this.render = function () {
        return html;
      };
    }

    function create$7(data) {
      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var html, scroll, last;

      this.create = function () {
        html = Template.get('items_line', {
          title: 'Выход серий'
        });
        scroll = new create$l({
          horizontal: true
        });
        scroll.render().find('.scroll__body').addClass('full-episodes');
        html.find('.items-line__body').append(scroll.render());
        var movie_title = params.title;
        data.reverse().forEach(function (element) {
          element.date = element.air_date ? Utils.parseTime(element.air_date).full : '----';
          var episode = Template.get('full_episode', element);
          var hash = Utils.hash([element.season_number, element.episode_number, movie_title].join(''));
          var view = Timeline.view(hash);
          if (view.percent) episode.append(Timeline.render(view));

          if (element.plus) {
            episode.addClass('full-episode--next');
          } else {
            var img = episode.find('img')[0];

            img.onerror = function (e) {
              img.src = './img/img_broken.svg';
            };

            if (element.still_path) img.src = Api.img(element.still_path, 'w200');else img.src = './img/img_broken.svg';
          }

          episode.on('hover:focus', function (e) {
            last = e.target;
            scroll.update($(e.target), true);
          }).on('hover:enter', function () {
            if (element.overview) {
              Modal.open({
                title: element.name,
                html: $('<div class="about"><div class="selector">' + element.overview + '</div></div>'),
                onBack: function onBack() {
                  Modal.close();
                  Controller.toggle('content');
                },
                onSelect: function onSelect() {
                  Modal.close();
                  Controller.toggle('content');
                }
              });
            }
          });
          scroll.append(episode);
        });
      };

      this.toggle = function () {
        var _this = this;

        Controller.add('full_episodes', {
          toggle: function toggle() {
            Controller.collectionSet(_this.render());
            Controller.collectionFocus(last, _this.render());
          },
          right: function right() {
            Navigator.move('right');
          },
          left: function left() {
            if (Navigator.canmove('left')) Navigator.move('left');else Controller.toggle('menu');
          },
          down: this.onDown,
          up: this.onUp,
          gone: function gone() {},
          back: this.onBack
        });
        Controller.toggle('full_episodes');
      };

      this.render = function () {
        return html;
      };
    }

    var components$1 = {
      start: create$b,
      descr: create$a,
      persons: create$9,
      recomend: create$f,
      simular: create$f,
      comments: create$8,
      episodes: create$7
    };

    function component$d(object) {
      var network = new create$m();
      var scroll = new create$l({
        mask: true,
        over: true,
        step: 400,
        scroll_by_item: false
      });
      var items = [];
      var active = 0;
      scroll.render().addClass('layer--wheight');

      this.create = function () {
        var _this = this;

        this.activity.loader(true);
        Api.full(object, function (data) {
          _this.activity.loader(false);

          if (data.movie) {
            Lampa.Listener.send('full', {
              type: 'start',
              object: object,
              data: data
            });

            _this.build('start', data);

            if (data.episodes && data.episodes.episodes) {
              var today = new Date();
              var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
              var time = new Date(date).getTime();
              var plus = false;
              var cameout = data.episodes.episodes.filter(function (e) {
                var air = new Date(e.air_date).getTime();
                if (air <= time) return true;else if (!plus) {
                  plus = true;
                  e.plus = true;
                  return true;
                }
                return false;
              });
              if (cameout.length) _this.build('episodes', cameout, {
                title: data.movie.original_title
              });
            }

            _this.build('descr', data);

            if (data.persons && data.persons.crew && data.persons.crew.length) {
              var directors = data.persons.crew.filter(function (member) {
                return member.job === 'Director';
              });

              if (directors.length) {
                _this.build('persons', directors, {
                  title: 'Режиссер'
                });
              }
            }

            if (data.persons && data.persons.cast && data.persons.cast.length) _this.build('persons', data.persons.cast);
            if (data.comments && data.comments.length) _this.build('comments', data);

            if (data.collection && data.collection.results.length) {
              data.collection.title = 'Коллекция';
              data.collection.noimage = true;

              _this.build('recomend', data.collection);
            }

            if (data.recomend && data.recomend.results.length) {
              data.recomend.title = 'Рекомендации';
              data.recomend.noimage = true;

              _this.build('recomend', data.recomend);
            }

            if (data.simular && data.simular.results.length) {
              data.simular.title = 'Похожие';
              data.simular.noimage = true;

              _this.build('simular', data.simular);
            }

            TimeTable.update(data.movie);
            Lampa.Listener.send('full', {
              type: 'complite',
              object: object,
              data: data
            });
            items[0].groupButtons();

            _this.activity.toggle();
          } else {
            _this.empty();
          }
        }, this.empty.bind(this));
        return this.render();
      };

      this.empty = function () {
        var empty = new create$d();
        scroll.append(empty.render());
        this.start = empty.start;
        this.activity.loader(false);
        this.activity.toggle();
      };

      this.build = function (name, data, params) {
        var item = new components$1[name](data, _objectSpread2({
          object: object,
          nomore: true
        }, params));
        item.onDown = this.down;
        item.onUp = this.up;
        item.onBack = this.back;
        item.create();
        items.push(item);
        Lampa.Listener.send('full', {
          type: 'build',
          name: name,
          body: item.render()
        });
        scroll.append(item.render());
      };

      this.down = function () {
        active++;
        active = Math.min(active, items.length - 1);
        items[active].toggle();
        scroll.update(items[active].render());
      };

      this.up = function () {
        active--;

        if (active < 0) {
          active = 0;
          Controller.toggle('head');
        } else {
          items[active].toggle();
        }

        scroll.update(items[active].render());
      };

      this.back = function () {
        Activity$1.backward();
      };

      this.start = function () {
        if (items.length) items[0].toggleBackground();
        Controller.add('content', {
          toggle: function toggle() {
            if (items.length) {
              items[active].toggle();
            }
          }
        });
        Controller.toggle('content');
      };

      this.pause = function () {};

      this.stop = function () {};

      this.render = function () {
        return scroll.render();
      };

      this.destroy = function () {
        network.clear();
        Arrays.destroy(items);
        scroll.destroy();
        items = null;
        network = null;
      };
    }

    function component$c(object) {
      var network = new create$m();
      var scroll = new create$l({
        mask: true,
        over: true,
        step: 250
      });
      var items = [];
      var html = $('<div></div>');
      var body = $('<div class="category-full"></div>');
      var total_pages = 0;
      var info;
      var last;
      var waitload;

      this.create = function () {};

      this.empty = function () {
        var empty = new create$d();
        scroll.append(empty.render());
        this.start = empty.start;
        this.activity.loader(false);
        this.activity.toggle();
      };

      this.next = function () {
        var _this = this;

        if (waitload) return;

        if (object.page < 15 && object.page < total_pages) {
          waitload = true;
          object.page++;
          Api.list(object, function (result) {
            _this.append(result);

            waitload = false;
            Controller.enable('content');
          }, function () {});
        }
      };

      this.append = function (data) {
        var _this2 = this;

        data.results.forEach(function (element) {
          var card = new Card(element, {
            card_category: true,
            object: object
          });
          card.create();

          card.onFocus = function (target, card_data) {
            last = target;
            scroll.update(card.render(), true);
            Background.change(Utils.cardImgBackground(card_data));

            if (info) {
              info.update(card_data);
              var maxrow = Math.ceil(items.length / 7) - 1;
              if (Math.ceil(items.indexOf(card) / 7) >= maxrow) _this2.next();
            }
          };

          card.onEnter = function (target, card_data) {
            Activity$1.push({
              url: card_data.url,
              component: 'full',
              id: element.id,
              method: card_data.name ? 'tv' : 'movie',
              card: element,
              source: object.source
            });
          };

          card.visible();
          body.append(card.render());
          items.push(card);
        });
      };

      this.build = function (data) {
        if (data.results.length) {
          total_pages = data.total_pages;

          if (Storage.field('light_version') && window.innerWidth >= 767) {
            scroll.minus();
            html.append(scroll.render());
          } else {
            info = new create$e();
            info.create();
            scroll.minus(info.render());
            html.append(info.render());
            html.append(scroll.render());
          }

          this.append(data);
          if (!info && items.length) this.back();
          if (total_pages > data.page && !info && items.length) this.more();
          scroll.append(body);
          this.activity.loader(false);
          this.activity.toggle();
        } else {
          html.append(scroll.render());
          this.empty();
        }
      };

      this.more = function () {
        var more = $('<div class="selector" style="width: 100%; height: 5px"></div>');
        more.on('hover:focus', function (e) {
          Controller.collectionFocus(last || false, scroll.render());
          var next = Arrays.clone(object);
          delete next.activity;
          next.page++;
          Activity$1.push(next);
        });
        body.append(more);
      };

      this.back = function () {
        last = items[0].render()[0];
        var more = $('<div class="selector" style="width: 100%; height: 5px"></div>');
        more.on('hover:focus', function (e) {
          if (object.page > 1) {
            Activity$1.backward();
          } else {
            Controller.toggle('head');
          }
        });
        body.prepend(more);
      };

      this.start = function () {
        Controller.add('content', {
          toggle: function toggle() {
            Controller.collectionSet(scroll.render());
            Controller.collectionFocus(last || false, scroll.render());
          },
          left: function left() {
            if (Navigator.canmove('left')) Navigator.move('left');else Controller.toggle('menu');
          },
          right: function right() {
            Navigator.move('right');
          },
          up: function up() {
            if (Navigator.canmove('up')) Navigator.move('up');else Controller.toggle('head');
          },
          down: function down() {
            if (Navigator.canmove('down')) Navigator.move('down');
          },
          back: function back() {
            Activity$1.backward();
          }
        });
        Controller.toggle('content');
      };

      this.pause = function () {};

      this.stop = function () {};

      this.render = function () {
        return html;
      };

      this.destroy = function () {
        network.clear();
        Arrays.destroy(items);
        scroll.destroy();
        if (info) info.destroy();
        html.remove();
        body.remove();
        network = null;
        items = null;
        html = null;
        body = null;
        info = null;
      };
    }

    function component$b(object) {
      var comp = new component$c(object);

      comp.create = function () {
        Api.list(object, this.build.bind(this), this.empty.bind(this));
      };

      return comp;
    }

    function component$a(object) {
      var comp = new component$f(object);

      comp.create = function () {
        this.activity.loader(true);
        Api.category(object, this.build.bind(this), this.empty.bind(this));
        return this.render();
      };

      return comp;
    }

    function create$6(data) {
      var html;
      var last;

      this.create = function () {
        html = Template.get('person_start', {
          name: data.name,
          birthday: data.birthday,
          descr: Utils.substr(data.biography, 1020),
          img: data.profile_path ? Api.img(data.profile_path) : data.img || 'img/img_broken.svg',
          place: data.place_of_birth
        });
      };

      this.toggle = function () {
        var _this = this;

        Controller.add('full_start', {
          toggle: function toggle() {
            Controller.collectionSet(_this.render());
            Controller.collectionFocus(last, _this.render());
          },
          right: function right() {
            Navigator.move('right');
          },
          left: function left() {
            if (Navigator.canmove('left')) Navigator.move('left');else Controller.toggle('menu');
          },
          down: this.onDown,
          up: this.onUp,
          gone: function gone() {},
          back: this.onBack
        });
        Controller.toggle('full_start');
      };

      this.render = function () {
        return html;
      };

      this.destroy = function () {
        last = null;
        html.remove();
      };
    }

    var components = {
      start: create$6,
      line: create$f
    };

    function component$9(object) {
      var network = new create$m();
      var scroll = new create$l({
        mask: true,
        over: true
      });
      var items = [];
      var active = 0;
      scroll.render().addClass('layer--wheight');

      this.create = function () {
        var _this = this;

        this.activity.loader(true);
        Api.person(object, function (data) {
          _this.activity.loader(false);

          if (data.person) {
            _this.build('start', data.person);

            if (data.credits && data.credits.knownFor && data.credits.knownFor.length > 0) {
              for (var i = 0; i < Math.min(data.credits.knownFor.length, 3); i++) {
                var departament = data.credits.knownFor[i];

                _this.build('line', {
                  title: departament.name,
                  noimage: true,
                  results: departament.credits
                });
              }
            } else {
              //для обратной совместимости с иви и окко
              if (data.movie && data.movie.results.length) {
                data.movie.title = 'Фильмы';
                data.movie.noimage = true;

                _this.build('line', data.movie);
              }

              if (data.tv && data.tv.results.length) {
                data.tv.title = 'Сериалы';
                data.tv.noimage = true;

                _this.build('line', data.tv);
              }
            }

            _this.activity.toggle();
          } else {
            _this.empty();
          }
        }, this.empty.bind(this));
        return this.render();
      };

      this.empty = function () {
        var empty = new create$d();
        scroll.append(empty.render());
        this.start = empty.start;
        this.activity.loader(false);
        this.activity.toggle();
      };

      this.build = function (name, data) {
        var item = new components[name](data, {
          object: object,
          nomore: true
        });
        item.onDown = this.down;
        item.onUp = this.up;
        item.onBack = this.back;
        item.create();
        items.push(item);
        scroll.append(item.render());
      };

      this.down = function () {
        active++;
        active = Math.min(active, items.length - 1);
        items[active].toggle();
        scroll.update(items[active].render());
      };

      this.up = function () {
        active--;

        if (active < 0) {
          active = 0;
          Controller.toggle('head');
        } else {
          items[active].toggle();
        }

        scroll.update(items[active].render());
      };

      this.back = function () {
        Activity$1.backward();
      };

      this.start = function () {
        Controller.add('content', {
          toggle: function toggle() {
            if (items.length) {
              items[active].toggle();
            }
          }
        });
        Controller.toggle('content');
      };

      this.pause = function () {};

      this.stop = function () {};

      this.render = function () {
        return scroll.render();
      };

      this.destroy = function () {
        network.clear();
        Arrays.destroy(items);
        scroll.destroy();
        items = null;
        network = null;
      };
    }

    function component$8(object) {
      var _this = this;

      var network = new create$m();
      var scroll = new create$l({
        mask: true,
        over: true,
        step: 250
      });
      var items = [];
      var html = $('<div></div>');
      var body = $('<div class="category-full"></div>');
      var total_pages = 0;
      var info;
      var last;
      var waitload;
      var timer_offer;

      this.create = function () {
        this.activity.loader(true);

        if (Account.working()) {
          Account.network.timeout(5000);
          Account.update(this.display.bind(this));
        } else this.display();

        return this.render();
      };

      this.display = function () {
        Api.favorite(object, this.build.bind(this), this.empty.bind(this));
      };

      this.offer = function () {
        if (!Account.working()) {
          var shw = Storage.get('favotite_offer', 'false');

          if (!shw) {
            timer_offer = setTimeout(function () {
              var tpl = Template.get('torrent_install', {});
              Storage.set('favotite_offer', 'true');
              tpl.find('.torrent-install__title').text('Синхронизация закладок');
              tpl.find('.torrent-install__descr').html('Хочешь чтобы твои любимые закладки были на всех твоих устройствах? <br><br>Зарегистрируйся на сайте www.cub.watch, создай профиль и авторизуйся в лампе.');
              tpl.find('.torrent-install__label').remove();
              tpl.find('.torrent-install__links').html('<div class="torrent-install__link"><div>Сайт</div><div>www.cub.watch</div></div>');
              tpl.find('.torrent-install__left img').attr('src', 'https://yumata.github.io/lampa/img/ili/bookmarks.png');
              Modal.open({
                title: '',
                html: tpl,
                size: 'large',
                onBack: function onBack() {
                  Modal.close();
                  Controller.toggle('content');
                }
              });
            }, 5000);
          }
        }
      };

      this.empty = function () {
        var empty = new create$d();
        html.append(empty.render());
        _this.start = empty.start;

        _this.activity.loader(false);

        _this.activity.toggle();
      };

      this.next = function () {
        var _this2 = this;

        if (waitload) return;

        if (object.page < 15 && object.page < total_pages) {
          waitload = true;
          object.page++;
          Api.favorite(object, function (result) {
            _this2.append(result);

            waitload = false;
            Controller.enable('content');
          }, function () {});
        }
      };

      this.append = function (data) {
        var _this3 = this;

        data.results.forEach(function (element) {
          var card = new Card(element, {
            card_category: true
          });
          card.create();

          card.onFocus = function (target, card_data) {
            last = target;
            scroll.update(card.render(), true);
            Background.change(Utils.cardImgBackground(card_data));

            if (info) {
              info.update(card_data);
              var maxrow = Math.ceil(items.length / 7) - 1;
              if (Math.ceil(items.indexOf(card) / 7) >= maxrow) _this3.next();
            }
          };

          card.onEnter = function (target, card_data) {
            Activity$1.push({
              url: card_data.url,
              component: 'full',
              id: element.id,
              method: card_data.name ? 'tv' : 'movie',
              card: element,
              source: card_data.source || 'tmdb'
            });
          };

          if (object.type == 'history') {
            card.onMenu = function (target, card_data) {
              var enabled = Controller.enabled().name;
              Select.show({
                title: 'Действие',
                items: [{
                  title: 'Удалить из истории',
                  subtitle: 'Удалить выделенную карточку',
                  one: true
                }, {
                  title: 'Очистить историю',
                  subtitle: 'Удалить все карточки из истории',
                  all: true
                }, {
                  title: 'Очистить метки',
                  subtitle: 'Очистить метки о просмотрах',
                  label: true
                }, {
                  title: 'Очистить таймкоды',
                  subtitle: 'Очистить все таймкоды',
                  timecode: true
                }],
                onBack: function onBack() {
                  Controller.toggle(enabled);
                },
                onSelect: function onSelect(a) {
                  if (a.all) {
                    Favorite.clear('history');

                    _this3.clear();

                    html.empty();

                    _this3.empty();
                  } else if (a.label) {
                    Storage.set('online_view', []);
                    Storage.set('torrents_view', []);
                    Noty.show('Отметки очищены');
                  } else if (a.timecode) {
                    Storage.set('file_view', {});
                    Noty.show('Таймкоды очищены');
                  } else {
                    Favorite.remove('history', card_data);
                    var index = items.indexOf(card);
                    if (index > 0) last = items[index - 1].render()[0];else if (items[index + 1]) last = items[index + 1].render()[0];
                    Arrays.remove(items, card);
                    card.destroy();

                    if (!items.length) {
                      _this3.clear();

                      html.empty();

                      _this3.empty();
                    }
                  }

                  Controller.toggle(enabled);
                }
              });
            };
          }

          card.visible();
          body.append(card.render());
          items.push(card);
        });
      };

      this.build = function (data) {
        total_pages = data.total_pages;

        if (Storage.field('light_version')) {
          scroll.minus();
          html.append(scroll.render());
        } else {
          info = new create$e();
          info.create();
          scroll.minus(info.render());
          html.append(info.render());
          html.append(scroll.render());
        }

        this.append(data);
        if (total_pages > data.page && !info) this.more();
        scroll.append(body);
        this.activity.loader(false);
        this.activity.toggle();
        this.offer();
      };

      this.more = function () {
        var more = $('<div class="category-full__more selector"><span>Показать ещё</span></div>');
        more.on('hover:focus', function (e) {
          Controller.collectionFocus(last || false, scroll.render());
          var next = Arrays.clone(object);
          delete next.activity;
          next.page++;
          Activity$1.push(next);
        });
        body.append(more);
      };

      this.start = function () {
        Controller.add('content', {
          toggle: function toggle() {
            Controller.collectionSet(scroll.render());
            Controller.collectionFocus(last || false, scroll.render());
          },
          left: function left() {
            if (Navigator.canmove('left')) Navigator.move('left');else Controller.toggle('menu');
          },
          right: function right() {
            Navigator.move('right');
          },
          up: function up() {
            if (Navigator.canmove('up')) Navigator.move('up');else Controller.toggle('head');
          },
          down: function down() {
            if (Navigator.canmove('down')) Navigator.move('down');
          },
          back: function back() {
            Activity$1.backward();
          }
        });
        Controller.toggle('content');
      };

      this.pause = function () {};

      this.stop = function () {};

      this.render = function () {
        return html;
      };

      this.clear = function () {
        network.clear();
        Arrays.destroy(items);
        items = [];
        if (scroll) scroll.destroy();
        if (info) info.destroy();
        scroll = null;
        info = null;
      };

      this.destroy = function () {
        this.clear();
        html.remove();
        body.remove();
        clearTimeout(timer_offer);
        network = null;
        items = null;
        html = null;
        body = null;
        info = null;
      };
    }

    function create$5() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var html = Template.get('files', params.movie);
      html.addClass('layer--width');

      if (params.movie.id) {
        html.find('.selector').on('hover:enter', function () {
          if (Activity$1.all().length > 1) {
            Activity$1.back();
          } else {
            Activity$1.push({
              url: params.movie.url,
              component: 'full',
              id: params.movie.id,
              method: params.movie.name ? 'tv' : 'movie',
              card: params.movie,
              source: params.movie.source
            });
          }
        });
      } else {
        html.find('.selector').removeClass('selector');
      }

      this.render = function () {
        return html;
      };

      this.append = function (add) {
        html.find('.files__body').append(add);
      };

      this.destroy = function () {
        html.remove();
        html = null;
      };

      this.clear = function () {
        html.find('.files__body').empty();
      };
    }

    function create$4() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var search = Template.get('search_box');
      var input = '';

      function destroy() {
        keyboard.destroy();
        search.remove();
        search = null;
      }

      function back() {
        destroy();
        params.onBack();
      }

      function enter() {
        destroy();
        params.onSearch(input);
      }

      function change(text) {
        input = text.trim();

        if (input) {
          search.find('.search-box__input').text(input);
        } else {
          search.find('.search-box__input').text('Введите текст...');
        }
      }

      if (Storage.field('keyboard_type') !== 'lampa') search.find('.search-box__input').hide();
      $('body').append(search);
      var keyboard = new create({
        layout: {
          'en': ['1 2 3 4 5 6 7 8 9 0 - {bksp}', 'q w e r t y u i o p', 'a s d f g h j k l', 'z x c v b n m .', '{mic} {RU} {space} {search}'],
          'default': ['1 2 3 4 5 6 7 8 9 0 - {bksp}', 'й ц у к е н г ш щ з х ъ', 'ф ы в а п р о л д ж э', 'я ч с м и т ь б ю .', '{mic} {EN} {space} {search}']
        }
      });
      keyboard.create();
      keyboard.listener.follow('change', function (event) {
        change(event.value);
      });
      keyboard.listener.follow('back', back);
      keyboard.listener.follow('enter', enter);
      keyboard.value(params.input);
      change(params.input);
      keyboard.toggle();
    }

    function create$3() {
      var _this2 = this;

      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var line = Template.get('filter').addClass('torrent-filter');
      var empty = $('<div class="empty__footer"><div class="simple-button selector">Уточнить поиск</div></div>');
      var data = {
        sort: [],
        filter: []
      };
      var similars = [];
      var buttons_scroll = new create$l({
        horizontal: true,
        nopadding: true
      });

      function selectSearch() {
        var _this = this;

        var selected = params.search_one == params.search ? 0 : params.search_two == params.search ? 1 : -1;
        var search = [];

        if (similars.length) {
          similars.forEach(function (sim) {
            search.push({
              title: sim,
              query: sim
            });
          });
        } else {
          if (params.search_one) {
            search.push({
              title: params.search_one,
              query: params.search_one,
              selected: selected == 0
            });
          }

          if (params.search_two) {
            search.push({
              title: params.search_two,
              query: params.search_two,
              selected: selected == 1
            });
          }
        }

        search.push({
          title: 'Указать название',
          selected: selected == -1,
          query: ''
        });
        Select.show({
          title: 'Уточнить',
          items: search,
          onBack: this.onBack,
          onSelect: function onSelect(a) {
            if (!a.query) {
              new create$4({
                input: params.search,
                onSearch: _this.onSearch,
                onBack: _this.onBack
              });
            } else {
              _this.onSearch(a.query);
            }
          }
        });
      }

      empty.on('hover:enter', selectSearch.bind(this));
      line.find('.filter--search').on('hover:enter', selectSearch.bind(this));
      line.find('.filter--sort').on('hover:enter', function () {
        _this2.show('Сортировать', 'sort');
      });
      line.find('.filter--filter').on('hover:enter', function () {
        _this2.show('Фильтр', 'filter');
      });
      buttons_scroll.append(line);

      this.show = function (title, type) {
        var _this3 = this;

        var where = data[type];
        Select.show({
          title: title,
          items: where,
          onBack: this.onBack,
          onSelect: function onSelect(a) {
            _this3.selected(where, a);

            if (a.items) {
              Select.show({
                title: a.title,
                items: a.items,
                onBack: function onBack() {
                  _this3.show(title, type);
                },
                onSelect: function onSelect(b) {
                  _this3.selected(a.items, b);

                  _this3.onSelect(type, a, b);

                  _this3.show(title, type);
                },
                onCheck: function onCheck(b) {
                  _this3.onCheck(type, a, b);
                }
              });
            } else {
              _this3.onSelect(type, a);
            }
          }
        });
      };

      this.selected = function (items, a) {
        items.forEach(function (element) {
          element.selected = false;
        });
        a.selected = true;
      };

      this.render = function () {
        return buttons_scroll.render();
      };

      this.append = function (add) {
        html.find('.files__body').append(add);
      };

      this.empty = function () {
        return empty;
      };

      this.toggle = function () {
        line.find('.filter--sort').toggleClass('selector', data.sort.length ? true : false).toggleClass('hide', data.sort.length ? false : true);
        line.find('.filter--filter').toggleClass('selector', data.filter.length ? true : false).toggleClass('hide', data.filter.length ? false : true);
      };

      this.set = function (type, items) {
        data[type] = items;
        this.toggle();
      };

      this.get = function (type) {
        return data[type];
      };

      this.similar = function (sim) {
        similars = sim;
        return empty;
      };

      this.sort = function (items, by) {
        items.sort(function (c, b) {
          if (c[by] < b[by]) return 1;
          if (c[by] > b[by]) return -1;
          return 0;
        });
      };

      this.chosen = function (type, select) {
        line.find('.filter--' + type + ' > div').text(Utils.shortText(select.join(', '), 25)).toggleClass('hide', select.length ? false : true);
      };

      this.destroy = function () {
        empty.remove();
        line.remove();
        buttons_scroll.destroy();
        empty = null;
        line = null;
        data = null;
      };
    }

    var html$3 = $("<div class=\"helper\">\n    <div class=\"helper__body\">\n        <div class=\"helper__ico\">\n            <svg height=\"173\" viewBox=\"0 0 180 173\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n            <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M126 3C126 18.464 109.435 31 89 31C68.5655 31 52 18.464 52 3C52 2.4505 52.0209 1.90466 52.0622 1.36298C21.3146 15.6761 0 46.8489 0 83C0 132.706 40.2944 173 90 173C139.706 173 180 132.706 180 83C180 46.0344 157.714 14.2739 125.845 0.421326C125.948 1.27051 126 2.13062 126 3ZM88.5 169C125.779 169 156 141.466 156 107.5C156 84.6425 142.314 64.6974 122 54.0966C116.6 51.2787 110.733 55.1047 104.529 59.1496C99.3914 62.4998 94.0231 66 88.5 66C82.9769 66 77.6086 62.4998 72.4707 59.1496C66.2673 55.1047 60.3995 51.2787 55 54.0966C34.6864 64.6974 21 84.6425 21 107.5C21 141.466 51.2208 169 88.5 169Z\" fill=\"white\"/>\n            <path d=\"M133 121.5C133 143.315 114.196 161 91 161C67.804 161 49 143.315 49 121.5C49 99.6848 67.804 116.5 91 116.5C114.196 116.5 133 99.6848 133 121.5Z\" fill=\"white\"/>\n            <path d=\"M72 81C72 89.8366 66.1797 97 59 97C51.8203 97 46 89.8366 46 81C46 72.1634 51.8203 65 59 65C66.1797 65 72 72.1634 72 81Z\" fill=\"white\"/>\n            <path d=\"M131 81C131 89.8366 125.18 97 118 97C110.82 97 105 89.8366 105 81C105 72.1634 110.82 65 118 65C125.18 65 131 72.1634 131 81Z\" fill=\"white\"/>\n            </svg>\n        </div>\n        <div class=\"helper__text\"></div>\n    </div>\n</div>");
    var body = html$3.find('.helper__text'),
        time;
    var memorys = {};
    var remember = 1000 * 60 * 60 * 14;

    function show$1(name, text, elem) {
      if (!Storage.field('helper')) return;
      var help = memorys[name];

      if (!help) {
        help = {
          time: 0,
          count: 0
        };
        if (_typeof(memorys) !== 'object') memorys = {}; //хз, вылазит ошибка, что в переменную true нельзя записать значение, откуда там true хз

        memorys[name] = help;
      }

      if (help.time + remember < Date.now() && help.count < 3) {
        help.time = Date.now();
        help.count++;
        Storage.set('helper', memorys);
        clearTimeout(time);
        time = setTimeout(function () {
          html$3.removeClass('helper--visible');
        }, 10000);
        body.html(text);
        html$3.addClass('helper--visible');

        if (elem) {
          var blink = $('<div class="helper-blink"></div>');
          elem.append(blink);
          setTimeout(function () {
            blink.remove();
          }, 3000);
        }
      }
    }

    function init$6() {
      memorys = Storage.cache('helper', 300, {});
      Settings.listener.follow('open', function (e) {
        if (e.name == 'more') {
          e.body.find('.helper--start-again').on('hover:enter', function () {
            memorys = {};
            Storage.set('helper', memorys);
            Noty.show('Успешно, подсказки будут показаны заново.');
          });
        }
      });
      $('body').append(html$3);
    }

    var Helper = {
      show: show$1,
      init: init$6
    };

    var SERVER = {};
    var timers = {};
    var callback$1;
    var callback_back;
    var formats = ['asf', 'wmv', 'divx', 'avi', 'mp4', 'm4v', 'mov', '3gp', '3g2', 'mkv', 'trp', 'tp', 'mts', 'mpg', 'mpeg', 'dat', 'vob', 'rm', 'rmvb', 'm2ts', 'ts'];
    var formats_individual = ['vob', 'm2ts'];

    function start$2(element, movie) {
      SERVER.object = element;
      if (movie) SERVER.movie = movie;

      if (!Storage.field('internal_torrclient')) {
        Android.openTorrent(SERVER);
        if (movie && movie.id) Favorite.add('history', movie, 100);
        if (callback$1) callback$1();
      } else if (Torserver.url()) {
        loading();
        connect();
      } else install();
    }

    function open$1(hash, movie) {
      SERVER.hash = hash;
      if (movie) SERVER.movie = movie;

      if (!Storage.field('internal_torrclient')) {
        Android.playHash(SERVER);
        if (callback$1) callback$1();
      } else if (Torserver.url()) {
        loading();
        files();
      } else install();
    }

    function loading() {
      Modal.open({
        title: '',
        html: Template.get('modal_loading'),
        size: 'large',
        mask: true,
        onBack: function onBack() {
          Modal.close();
          close();
        }
      });
    }

    function connect() {
      Torserver.connected(function () {
        hash();
      }, function (echo) {
        Torserver.error();
      });
    }

    function hash() {
      Torserver.hash({
        title: SERVER.object.title,
        link: SERVER.object.MagnetUri || SERVER.object.Link,
        poster: SERVER.object.poster,
        data: {
          lampa: true,
          movie: SERVER.movie
        }
      }, function (json) {
        SERVER.hash = json.hash;
        files();
      }, function (echo) {
        //Torserver.error()
        var jac = Storage.field('parser_torrent_type') == 'jackett';
        var tpl = Template.get('torrent_nohash', {
          title: 'Ошибка',
          text: 'Не удалось получить HASH',
          url: SERVER.object.MagnetUri || SERVER.object.Link,
          echo: echo
        });
        if (jac) tpl.find('.is--torlook').remove();else tpl.find('.is--jackett').remove();
        Modal.update(tpl);
      });
    }

    function files() {
      var repeat = 0;
      timers.files = setInterval(function () {
        repeat++;
        Torserver.files(SERVER.hash, function (json) {
          if (json.file_stats) {
            clearInterval(timers.files);
            show(json.file_stats);
          }
        });

        if (repeat >= 45) {
          Modal.update(Template.get('error', {
            title: 'Ошибка',
            text: 'Время ожидания истекло'
          }));
          Torserver.clear();
          Torserver.drop(SERVER.hash);
        }
      }, 2000);
    }

    function install() {
      Modal.open({
        title: '',
        html: Template.get('torrent_install', {}),
        size: 'large',
        onBack: function onBack() {
          Modal.close();
          Controller.toggle('content');
        }
      });
    }

    function show(files) {
      var plays = files.filter(function (a) {
        var exe = a.path.split('.').pop().toLowerCase();
        return formats.indexOf(exe) >= 0;
      });
      var active = Activity$1.active(),
          movie = active.movie || SERVER.movie || {};
      var seasons = [];
      plays.forEach(function (element) {
        var info = Torserver.parse(element.path, movie);

        if (info.serial && info.season && seasons.indexOf(info.season) == -1) {
          seasons.push(info.season);
        }
      });

      if (seasons.length) {
        Api.seasons(movie, seasons, function (data) {
          list(plays, {
            movie: movie,
            seasons: data,
            files: files
          });
        });
      } else {
        list(plays, {
          movie: movie,
          files: files
        });
      }
    }

    function parseSubs(path, files) {
      var name = path.split('/').pop().split('.').slice(0, -1).join('.');
      var index = -1;
      var subtitles = files.filter(function (a) {
        var _short = a.path.split('/').pop();

        var issub = ['srt', 'vtt'].indexOf(a.path.split('.').pop().toLowerCase()) >= 0;
        return _short.indexOf(name) >= 0 && issub;
      }).map(function (a) {
        index++;
        return {
          label: '',
          url: Torserver.stream(a.path, SERVER.hash, a.id),
          index: index
        };
      });
      return subtitles.length ? subtitles : false;
    }

    function list(items, params) {
      var html = $('<div class="torrent-files"></div>');
      var playlist = [];
      items.forEach(function (element) {
        var exe = element.path.split('.').pop().toLowerCase();
        var info = Torserver.parse(element.path, params.movie, formats_individual.indexOf(exe) >= 0);
        var view = Timeline.view(info.hash);
        var item;

        var viewed = function viewed(viewing) {
          Account.torrentViewed({
            object: SERVER.object,
            viewing: viewing,
            card: SERVER.movie
          });
        };

        Arrays.extend(element, {
          season: info.season,
          episode: info.episode,
          title: Utils.pathToNormalTitle(element.path),
          size: Utils.bytesToSize(element.length),
          url: Torserver.stream(element.path, SERVER.hash, element.id),
          torrent_hash: SERVER.hash,
          timeline: view,
          air_date: '--',
          img: './img/img_broken.svg',
          exe: exe,
          viewed: viewed
        });

        if (params.seasons) {
          var episodes = params.seasons[info.season];
          element.title = info.episode + ' / ' + Utils.pathToNormalTitle(element.path, false);
          element.fname = element.title;

          if (episodes) {
            var episode = episodes.episodes.filter(function (a) {
              return a.episode_number == info.episode;
            })[0];

            if (episode) {
              element.title = info.episode + ' / ' + episode.name;
              element.air_date = episode.air_date;
              element.fname = episode.name;
              if (episode.still_path) element.img = Api.img(episode.still_path);else if (episode.img) element.img = episode.img;
            }
          }

          item = Template.get('torrent_file_serial', element);
        } else {
          item = Template.get('torrent_file', element);
          if (params.movie.title) element.title = params.movie.title;
        }

        item.append(Timeline.render(view));
        element.subtitles = parseSubs(element.path, params.files);
        playlist.push(element);
        item.on('hover:enter', function () {
          if (params.movie.id) Favorite.add('history', params.movie, 100);

          if (Platform.is('android') && playlist.length > 1) {
            var trim_playlist = [];
            playlist.forEach(function (elem) {
              trim_playlist.push({
                title: elem.title,
                url: elem.url,
                timeline: elem.timeline
              });
            });
            element.playlist = trim_playlist;
          }

          Player.play(element);
          Player.callback(function () {
            Controller.toggle('modal');
          });
          Player.playlist(playlist);
          Player.stat(element.url);

          if (callback$1) {
            callback$1();
            callback$1 = false;
          }
        }).on('hover:long', function () {
          var enabled = Controller.enabled().name;
          var menu = [{
            title: 'Сбросить таймкод',
            timeclear: true
          }];

          if (Platform.is('webos')) {
            menu.push({
              title: 'Запустить плеер - WebOS',
              player: 'webos'
            });
          }

          if (Platform.is('android')) {
            menu.push({
              title: 'Запустить плеер - Android',
              player: 'android'
            });
          }

          menu.push({
            title: 'Запустить плеер - Lampa',
            player: 'lampa'
          });

          if (!Platform.tv()) {
            menu.push({
              title: 'Копировать ссылку на видео',
              link: true
            });
          }

          Select.show({
            title: 'Действие',
            items: menu,
            onBack: function onBack() {
              Controller.toggle(enabled);
            },
            onSelect: function onSelect(a) {
              if (a.timeclear) {
                view.percent = 0;
                view.time = 0;
                view.duration = 0;
                element.timeline = view;
                Timeline.update(view);
              }

              if (a.link) {
                Utils.copyTextToClipboard(element.url, function () {
                  Noty.show('Ссылка скопирована в буфер обмена');
                }, function () {
                  Noty.show('Ошибка при копирование ссылки');
                });
              }

              Controller.toggle(enabled);

              if (a.player) {
                Player.runas(a.player);
                item.trigger('hover:enter');
              }
            }
          });
        }).on('hover:focus', function () {
          Helper.show('torrents_view', 'Для сброса таймкода и вызова меню удерживайте клавишу (ОК)', item);
        });
        html.append(item);
      });
      if (items.length == 0) html = Template.get('error', {
        title: 'Пусто',
        text: 'Не удалось извлечь подходящие файлы'
      });else Modal.title('Файлы');
      Modal.update(html);
    }

    function opened(call) {
      callback$1 = call;
    }

    function back$3(call) {
      callback_back = call;
    }

    function close() {
      Torserver.drop(SERVER.hash);
      Torserver.clear();
      clearInterval(timers.files);

      if (callback_back) {
        callback_back();
      } else {
        Controller.toggle('content');
      }

      callback_back = false;
      SERVER = {};
    }

    var Torrent = {
      start: start$2,
      open: open$1,
      opened: opened,
      back: back$3
    };

    function component$7(object) {
      var network = new create$m();
      var scroll = new create$l({
        mask: true,
        over: true
      });
      var files = new create$5(object);
      var filter = new create$3(object);
      var results = [];
      var filtred = [];
      var total_pages = 1;
      var count = 0;
      var last;
      var last_filter;
      var filter_items = {
        quality: ['Любое', '4k', '1080p', '720p'],
        hdr: ['Не выбрано', 'Да', 'Нет'],
        sub: ['Не выбрано', 'Да', 'Нет'],
        voice: [],
        tracker: ['Любой'],
        year: ['Любой']
      };
      var filter_translate = {
        quality: 'Качество',
        hdr: 'HDR',
        sub: 'Субтитры',
        voice: 'Перевод',
        tracker: 'Трекер',
        year: 'Год',
        season: 'Сезон'
      };
      var filter_multiple = ['quality', 'voice', 'tracker', 'season'];
      var sort_translate = {
        Seeders: 'По раздающим',
        Size: 'По размеру',
        Title: 'По названию',
        Tracker: 'По источнику',
        PublisTime: 'По дате',
        viewed: 'По просмотренным'
      };
      var i = 20,
          y = new Date().getFullYear();

      while (i--) {
        filter_items.year.push(y - (19 - i) + '');
      }

      var viewed = Storage.cache('torrents_view', 5000, []);
      var finded_seasons = [];
      var finded_seasons_full = [];
      var voices = ["Laci", "Kerob", "LE-Production", "Parovoz Production", "Paradox", "Omskbird", "LostFilm", "Причудики", "BaibaKo", "NewStudio", "AlexFilm", "FocusStudio", "Gears Media", "Jaskier", "ViruseProject", "Кубик в Кубе", "IdeaFilm", "Sunshine Studio", "Ozz.tv", "Hamster Studio", "Сербин", "To4ka", "Кравец", "Victory-Films", "SNK-TV", "GladiolusTV", "Jetvis Studio", "ApofysTeam", "ColdFilm", "Agatha Studdio", "KinoView", "Jimmy J.", "Shadow Dub Project", "Amedia", "Red Media", "Selena International", "Гоблин", "Universal Russia", "Kiitos", "Paramount Comedy", "Кураж-Бамбей", "Студия Пиратского Дубляжа", "Чадов", "Карповский", "RecentFilms", "Первый канал", "Alternative Production", "NEON Studio", "Колобок", "Дольский", "Синема УС", "Гаврилов", "Живов", "SDI Media", "Алексеев", "GreenРай Studio", "Михалев", "Есарев", "Визгунов", "Либергал", "Кузнецов", "Санаев", "ДТВ", "Дохалов", "Sunshine Studio", "Горчаков", "LevshaFilm", "CasStudio", "Володарский", "ColdFilm", "Шварко", "Карцев", "ETV+", "ВГТРК", "Gravi-TV", "1001cinema", "Zone Vision Studio", "Хихикающий доктор", "Murzilka", "turok1990", "FOX", "STEPonee", "Elrom", "Колобок", "HighHopes", "SoftBox", "GreenРай Studio", "NovaFilm", "Четыре в квадрате", "Greb&Creative", "MUZOBOZ", "ZM-Show", "RecentFilms", "Kerems13", "Hamster Studio", "New Dream Media", "Игмар", "Котов", "DeadLine Studio", "Jetvis Studio", "РенТВ", "Андрей Питерский", "Fox Life", "Рыбин", "Trdlo.studio", "Studio Victory Аsia", "Ozeon", "НТВ", "CP Digital", "AniLibria", "STEPonee", "Levelin", "FanStudio", "Cmert", "Интерфильм", "SunshineStudio", "Kulzvuk Studio", "Кашкин", "Вартан Дохалов", "Немахов", "Sedorelli", "СТС", "Яроцкий", "ICG", "ТВЦ", "Штейн", "AzOnFilm", "SorzTeam", "Гаевский", "Мудров", "Воробьев Сергей", "Студия Райдо", "DeeAFilm Studio", "zamez", "ViruseProject", "Иванов", "STEPonee", "РенТВ", "СВ-Дубль", "BadBajo", "Комедия ТВ", "Мастер Тэйп", "5-й канал СПб", "SDI Media", "Гланц", "Ох! Студия", "СВ-Кадр", "2x2", "Котова", "Позитив", "RusFilm", "Назаров", "XDUB Dorama", "Реальный перевод", "Kansai", "Sound-Group", "Николай Дроздов", "ZEE TV", "Ozz.tv", "MTV", "Сыендук", "GoldTeam", "Белов", "Dream Records", "Яковлев", "Vano", "SilverSnow", "Lord32x", "Filiza Studio", "Sony Sci-Fi", "Flux-Team", "NewStation", "XDUB Dorama", "Hamster Studio", "Dream Records", "DexterTV", "ColdFilm", "Good People", "RusFilm", "Levelin", "AniDUB", "SHIZA Project", "AniLibria.TV", "StudioBand", "AniMedia", "Kansai", "Onibaku", "JWA Project", "MC Entertainment", "Oni", "Jade", "Ancord", "ANIvoice", "Nika Lenina", "Bars MacAdams", "JAM", "Anika", "Berial", "Kobayashi", "Cuba77", "RiZZ_fisher", "OSLIKt", "Lupin", "Ryc99", "Nazel & Freya", "Trina_D", "JeFerSon", "Vulpes Vulpes", "Hamster", "KinoGolos", "Fox Crime", "Денис Шадинский", "AniFilm", "Rain Death", "LostFilm", "New Records", "Ancord", "Первый ТВЧ", "RG.Paravozik", "Profix Media", "Tycoon", "RealFake", "HDrezka", "Jimmy J.", "AlexFilm", "Discovery", "Viasat History", "AniMedia", "JAM", "HiWayGrope", "Ancord", "СВ-Дубль", "Tycoon", "SHIZA Project", "GREEN TEA", "STEPonee", "AlphaProject", "AnimeReactor", "Animegroup", "Shachiburi", "Persona99", "3df voice", "CactusTeam", "AniMaunt", "AniMedia", "AnimeReactor", "ShinkaDan", "Jaskier", "ShowJet", "RAIM", "RusFilm", "Victory-Films", "АрхиТеатр", "Project Web Mania", "ko136", "КураСгречей", "AMS", "СВ-Студия", "Храм Дорам ТВ", "TurkStar", "Медведев", "Рябов", "BukeDub", "FilmGate", "FilmsClub", "Sony Turbo", "ТВЦ", "AXN Sci-Fi", "NovaFilm", "DIVA Universal", "Курдов", "Неоклассика", "fiendover", "SomeWax", "Логинофф", "Cartoon Network", "Sony Turbo", "Loginoff", "CrezaStudio", "Воротилин", "LakeFilms", "Andy", "CP Digital", "XDUB Dorama + Колобок", "SDI Media", "KosharaSerials", "Екатеринбург Арт", "Julia Prosenuk", "АРК-ТВ Studio", "Т.О Друзей", "Anifilm", "Animedub", "AlphaProject", "Paramount Channel", "Кириллица", "AniPLague", "Видеосервис", "JoyStudio", "HighHopes", "TVShows", "AniFilm", "GostFilm", "West Video", "Формат AB", "Film Prestige", "West Video", "Екатеринбург Арт", "SovetRomantica", "РуФилмс", "AveBrasil", "Greb&Creative", "BTI Studios", "Пифагор", "Eurochannel", "NewStudio", "Кармен Видео", "Кошкин", "Кравец", "Rainbow World", "Воротилин", "Варус-Видео", "ClubFATE", "HiWay Grope", "Banyan Studio", "Mallorn Studio", "Asian Miracle Group", "Эй Би Видео", "AniStar", "Korean Craze", "LakeFilms", "Невафильм", "Hallmark", "Netflix", "Mallorn Studio", "Sony Channel", "East Dream", "Bonsai Studio", "Lucky Production", "Octopus", "TUMBLER Studio", "CrazyCatStudio", "Amber", "Train Studio", "Анастасия Гайдаржи", "Мадлен Дюваль", "Fox Life", "Sound Film", "Cowabunga Studio", "Фильмэкспорт", "VO-Production", "Sound Film", "Nickelodeon", "MixFilm", "GreenРай Studio", "Sound-Group", "Back Board Cinema", "Кирилл Сагач", "Bonsai Studio", "Stevie", "OnisFilms", "MaxMeister", "Syfy Universal", "TUMBLER Studio", "NewStation", "Neo-Sound", "Муравский", "IdeaFilm", "Рутилов", "Тимофеев", "Лагута", "Дьяконов", "Zone Vision Studio", "Onibaku", "AniMaunt", "Voice Project", "AniStar", "Пифагор", "VoicePower", "StudioFilms", "Elysium", "AniStar", "BeniAffet", "Selena International", "Paul Bunyan", "CoralMedia", "Кондор", "Игмар", "ViP Premiere", "FireDub", "AveTurk", "Sony Sci-Fi", "Янкелевич", "Киреев", "Багичев", "2x2", "Лексикон", "Нота", "Arisu", "Superbit", "AveDorama", "VideoBIZ", "Киномания", "DDV", "Alternative Production", "WestFilm", "Анастасия Гайдаржи + Андрей Юрченко", "Киномания", "Agatha Studdio", "GreenРай Studio", "VSI Moscow", "Horizon Studio", "Flarrow Films", "Amazing Dubbing", "Asian Miracle Group", "Видеопродакшн", "VGM Studio", "FocusX", "CBS Drama", "NovaFilm", "Novamedia", "East Dream", "Дасевич", "Анатолий Гусев", "Twister", "Морозов", "NewComers", "kubik&ko", "DeMon", "Анатолий Ашмарин", "Inter Video", "Пронин", "AMC", "Велес", "Volume-6 Studio", "Хоррор Мэйкер", "Ghostface", "Sephiroth", "Акира", "Деваль Видео", "RussianGuy27", "neko64", "Shaman", "Franek Monk", "Ворон", "Andre1288", "Selena International", "GalVid", "Другое кино", "Студия NLS", "Sam2007", "HaseRiLLoPaW", "Севастьянов", "D.I.M.", "Марченко", "Журавлев", "Н-Кино", "Lazer Video", "SesDizi", "Red Media", "Рудой", "Товбин", "Сергей Дидок", "Хуан Рохас", "binjak", "Карусель", "Lizard Cinema", "Варус-Видео", "Акцент", "RG.Paravozik", "Max Nabokov", "Barin101", "Васька Куролесов", "Фортуна-Фильм", "Amalgama", "AnyFilm", "Студия Райдо", "Козлов", "Zoomvision Studio", "Пифагор", "Urasiko", "VIP Serial HD", "НСТ", "Кинолюкс", "Project Web Mania", "Завгородний", "AB-Video", "Twister", "Universal Channel", "Wakanim", "SnowRecords", "С.Р.И", "Старый Бильбо", "Ozz.tv", "Mystery Film", "РенТВ", "Латышев", "Ващенко", "Лайко", "Сонотек", "Psychotronic", "DIVA Universal", "Gremlin Creative Studio", "Нева-1", "Максим Жолобов", "Good People", "Мобильное телевидение", "Lazer Video", "IVI", "DoubleRec", "Milvus", "RedDiamond Studio", "Astana TV", "Никитин", "КТК", "D2Lab", "НСТ", "DoubleRec", "Black Street Records", "Останкино", "TatamiFilm", "Видеобаза", "Crunchyroll", "Novamedia", "RedRussian1337", "КонтентикOFF", "Creative Sound", "HelloMickey Production", "Пирамида", "CLS Media", "Сонькин", "Мастер Тэйп", "Garsu Pasaulis", "DDV", "IdeaFilm", "Gold Cinema", "Че!", "Нарышкин", "Intra Communications", "OnisFilms", "XDUB Dorama", "Кипарис", "Королёв", "visanti-vasaer", "Готлиб", "Paramount Channel", "СТС", "диктор CDV", "Pazl Voice", "Прямостанов", "Zerzia", "НТВ", "MGM", "Дьяков", "Вольга", "АРК-ТВ Studio", "Дубровин", "МИР", "Netflix", "Jetix", "Кипарис", "RUSCICO", "Seoul Bay", "Филонов", "Махонько", "Строев", "Саня Белый", "Говинда Рага", "Ошурков", "Horror Maker", "Хлопушка", "Хрусталев", "Антонов Николай", "Золотухин", "АрхиАзия", "Попов", "Ultradox", "Мост-Видео", "Альтера Парс", "Огородников", "Твин", "Хабар", "AimaksaLTV", "ТНТ", "FDV", "3df voice", "The Kitchen Russia", "Ульпаней Эльром", "Видеоимпульс", "GoodTime Media", "Alezan", "True Dubbing Studio", "FDV", "Карусель", "Интер", "Contentica", "Мельница", "RealFake", "ИДДК", "Инфо-фильм", "Мьюзик-трейд", "Кирдин | Stalk", "ДиоНиК", "Стасюк", "TV1000", "Hallmark", "Тоникс Медиа", "Бессонов", "Gears Media", "Бахурани", "NewDub", "Cinema Prestige", "Набиев", "New Dream Media", "ТВ3", "Малиновский Сергей", "Superbit", "Кенс Матвей", "LE-Production", "Voiz", "Светла", "Cinema Prestige", "JAM", "LDV", "Videogram", "Индия ТВ", "RedDiamond Studio", "Герусов", "Элегия фильм", "Nastia", "Семыкина Юлия", "Электричка", "Штамп Дмитрий", "Пятница", "Oneinchnales", "Gravi-TV", "D2Lab", "Кинопремьера", "Бусов Глеб", "LE-Production", "1001cinema", "Amazing Dubbing", "Emslie", "1+1", "100 ТВ", "1001 cinema", "2+2", "2х2", "3df voice", "4u2ges", "5 канал", "A. Lazarchuk", "AAA-Sound", "AB-Video", "AdiSound", "ALEKS KV", "AlexFilm", "AlphaProject", "Alternative Production", "Amalgam", "AMC", "Amedia", "AMS", "Andy", "AniLibria", "AniMedia", "Animegroup", "Animereactor", "AnimeSpace Team", "Anistar", "AniUA", "AniWayt", "Anything-group", "AOS", "Arasi project", "ARRU Workshop", "AuraFilm", "AvePremier", "AveTurk", "AXN Sci-Fi", "Azazel", "AzOnFilm", "BadBajo", "BadCatStudio", "BBC Saint-Petersburg", "BD CEE", "Black Street Records", "Bonsai Studio", "Boльгa", "Brain Production", "BraveSound", "BTI Studios", "Bubble Dubbing Company", "Byako Records", "Cactus Team", "Cartoon Network", "CBS Drama", "CDV", "Cinema Prestige", "CinemaSET GROUP", "CinemaTone", "ColdFilm", "Contentica", "CP Digital", "CPIG", "Crunchyroll", "Cuba77", "D1", "D2lab", "datynet", "DDV", "DeadLine", "DeadSno", "DeMon", "den904", "Description", "DexterTV", "Dice", "Discovery", "DniproFilm", "DoubleRec", "DreamRecords", "DVD Classic", "East Dream", "Eladiel", "Elegia", "ELEKTRI4KA", "Elrom", "ELYSIUM", "Epic Team", "eraserhead", "erogg", "Eurochannel", "Extrabit", "F-TRAIN", "Family Fan Edition", "FDV", "FiliZa Studio", "Film Prestige", "FilmGate", "FilmsClub", "FireDub", "Flarrow Films", "Flux-Team", "FocusStudio", "FOX", "Fox Crime", "Fox Russia", "FoxLife", "Foxlight", "Franek Monk", "Gala Voices", "Garsu Pasaulis", "Gears Media", "Gemini", "General Film", "GetSmart", "Gezell Studio", "Gits", "GladiolusTV", "GoldTeam", "Good People", "Goodtime Media", "GoodVideo", "GostFilm", "Gramalant", "Gravi-TV", "GREEN TEA", "GreenРай Studio", "Gremlin Creative Studio", "Hallmark", "HamsterStudio", "HiWay Grope", "Horizon Studio", "hungry_inri", "ICG", "ICTV", "IdeaFilm", "IgVin &amp; Solncekleshka", "ImageArt", "INTERFILM", "Ivnet Cinema", "IНТЕР", "Jakob Bellmann", "JAM", "Janetta", "Jaskier", "JeFerSon", "jept", "JetiX", "Jetvis", "JimmyJ", "KANSAI", "KIHO", "kiitos", "KinoGolos", "Kinomania", "KosharaSerials", "Kолобок", "L0cDoG", "LakeFilms", "LDV", "LE-Production", "LeDoyen", "LevshaFilm", "LeXiKC", "Liga HQ", "Line", "Lisitz", "Lizard Cinema Trade", "Lord32x", "lord666", "LostFilm", "Lucky Production", "Macross", "madrid", "Mallorn Studio", "Marclail", "Max Nabokov", "MC Entertainment", "MCA", "McElroy", "Mega-Anime", "Melodic Voice Studio", "metalrus", "MGM", "MifSnaiper", "Mikail", "Milirina", "MiraiDub", "MOYGOLOS", "MrRose", "MTV", "Murzilka", "MUZOBOZ", "National Geographic", "NemFilm", "Neoclassica", "NEON Studio", "New Dream Media", "NewComers", "NewStation", "NewStudio", "Nice-Media", "Nickelodeon", "No-Future", "NovaFilm", "Novamedia", "Octopus", "Oghra-Brown", "OMSKBIRD", "Onibaku", "OnisFilms", "OpenDub", "OSLIKt", "Ozz TV", "PaDet", "Paramount Comedy", "Paramount Pictures", "Parovoz Production", "PashaUp", "Paul Bunyan", "Pazl Voice", "PCB Translate", "Persona99", "PiratVoice", "Postmodern", "Profix Media", "Project Web Mania", "Prolix", "QTV", "R5", "Radamant", "RainDeath", "RATTLEBOX", "RealFake", "Reanimedia", "Rebel Voice", "RecentFilms", "Red Media", "RedDiamond Studio", "RedDog", "RedRussian1337", "Renegade Team", "RG Paravozik", "RinGo", "RoxMarty", "Rumble", "RUSCICO", "RusFilm", "RussianGuy27", "Saint Sound", "SakuraNight", "Satkur", "Sawyer888", "Sci-Fi Russia", "SDI Media", "Selena", "seqw0", "SesDizi", "SGEV", "Shachiburi", "SHIZA", "ShowJet", "Sky Voices", "SkyeFilmTV", "SmallFilm", "SmallFilm", "SNK-TV", "SnowRecords", "SOFTBOX", "SOLDLUCK2", "Solod", "SomeWax", "Sony Channel", "Sony Turbo", "Sound Film", "SpaceDust", "ssvss", "st.Elrom", "STEPonee", "SunshineStudio", "Superbit", "Suzaku", "sweet couple", "TatamiFilm", "TB5", "TF-AniGroup", "The Kitchen Russia", "The Mike Rec.", "Timecraft", "To4kaTV", "Tori", "Total DVD", "TrainStudio", "Troy", "True Dubbing Studio", "TUMBLER Studio", "turok1990", "TV 1000", "TVShows", "Twister", "Twix", "Tycoon", "Ultradox", "Universal Russia", "VashMax2", "VendettA", "VHS", "VicTeam", "VictoryFilms", "Video-BIZ", "Videogram", "ViruseProject", "visanti-vasaer", "VIZ Media", "VO-production", "Voice Project Studio", "VoicePower", "VSI Moscow", "VulpesVulpes", "Wakanim", "Wayland team", "WestFilm", "WiaDUB", "WVoice", "XL Media", "XvidClub Studio", "zamez", "ZEE TV", "Zendos", "ZM-SHOW", "Zone Studio", "Zone Vision", "Агапов", "Акопян", "Алексеев", "Артемьев", "Багичев", "Бессонов", "Васильев", "Васильцев", "Гаврилов", "Герусов", "Готлиб", "Григорьев", "Дасевич", "Дольский", "Карповский", "Кашкин", "Киреев", "Клюквин", "Костюкевич", "Матвеев", "Михалев", "Мишин", "Мудров", "Пронин", "Савченко", "Смирнов", "Тимофеев", "Толстобров", "Чуев", "Шуваев", "Яковлев", "ААА-sound", "АБыГДе", "Акалит", "Акира", "Альянс", "Амальгама", "АМС", "АнВад", "Анубис", "Anubis", "Арк-ТВ", "АРК-ТВ Studio", "Б. Федоров", "Бибиков", "Бигыч", "Бойков", "Абдулов", "Белов", "Вихров", "Воронцов", "Горчаков", "Данилов", "Дохалов", "Котов", "Кошкин", "Назаров", "Попов", "Рукин", "Рутилов", "Варус Видео", "Васька Куролесов", "Ващенко С.", "Векшин", "Велес", "Весельчак", "Видеоимпульс", "Витя «говорун»", "Войсовер", "Вольга", "Ворон", "Воротилин", "Г. Либергал", "Г. Румянцев", "Гей Кино Гид", "ГКГ", "Глуховский", "Гризли", "Гундос", "Деньщиков", "Есарев", "Нурмухаметов", "Пучков", "Стасюк", "Шадинский", "Штамп", "sf@irat", "Держиморда", "Домашний", "ДТВ", "Дьяконов", "Е. Гаевский", "Е. Гранкин", "Е. Лурье", "Е. Рудой", "Е. Хрусталёв", "ЕА Синема", "Екатеринбург Арт", "Живаго", "Жучков", "З Ранку До Ночі", "Завгородний", "Зебуро", "Зереницын", "И. Еремеев", "И. Клушин", "И. Сафронов", "И. Степанов", "ИГМ", "Игмар", "ИДДК", "Имидж-Арт", "Инис", "Ирэн", "Ист-Вест", "К. Поздняков", "К. Филонов", "К9", "Карапетян", "Кармен Видео", "Карусель", "Квадрат Малевича", "Килька", "Кипарис", "Королев", "Котова", "Кравец", "Кубик в Кубе", "Кураж-Бамбей", "Л. Володарский", "Лазер Видео", "ЛанселаП", "Лапшин", "Лексикон", "Ленфильм", "Леша Прапорщик", "Лизард", "Люсьена", "Заугаров", "Иванов", "Иванова и П. Пашут", "Латышев", "Ошурков", "Чадов", "Яроцкий", "Максим Логинофф", "Малиновский", "Марченко", "Мастер Тэйп", "Махонько", "Машинский", "Медиа-Комплекс", "Мельница", "Мика Бондарик", "Миняев", "Мительман", "Мост Видео", "Мосфильм", "Муравский", "Мьюзик-трейд", "Н-Кино", "Н. Антонов", "Н. Дроздов", "Н. Золотухин", "Н.Севастьянов seva1988", "Набиев", "Наталья Гурзо", "НЕВА 1", "Невафильм", "НеЗупиняйПродакшн", "Неоклассика", "Несмертельное оружие", "НЛО-TV", "Новий", "Новый диск", "Новый Дубляж", "Новый Канал", "Нота", "НСТ", "НТВ", "НТН", "Оверлорд", "Огородников", "Омикрон", "Гланц", "Карцев", "Морозов", "Прямостанов", "Санаев", "Парадиз", "Пепелац", "Первый канал ОРТ", "Переводман", "Перец", "Петербургский дубляж", "Петербуржец", "Пирамида", "Пифагор", "Позитив-Мультимедиа", "Прайд Продакшн", "Премьер Видео", "Премьер Мультимедиа", "Причудики", "Р. Янкелевич", "Райдо", "Ракурс", "РенТВ", "Россия", "РТР", "Русский дубляж", "Русский Репортаж", "РуФилмс", "Рыжий пес", "С. Визгунов", "С. Дьяков", "С. Казаков", "С. Кузнецов", "С. Кузьмичёв", "С. Лебедев", "С. Макашов", "С. Рябов", "С. Щегольков", "С.Р.И.", "Сolumbia Service", "Самарский", "СВ Студия", "СВ-Дубль", "Светла", "Селена Интернешнл", "Синема Трейд", "Синема УС", "Синта Рурони", "Синхрон", "Советский", "Сокуров", "Солодухин", "Сонотек", "Сонькин", "Союз Видео", "Союзмультфильм", "СПД - Сладкая парочка", "Строев", "СТС", "Студии Суверенного Лепрозория", "Студия «Стартрек»", "KOleso", "Студия Горького", "Студия Колобок", "Студия Пиратского Дубляжа", "Студия Райдо", "Студия Трёх", "Гуртом", "Супербит", "Сыендук", "Так Треба Продакшн", "ТВ XXI век", "ТВ СПб", "ТВ-3", "ТВ6", "ТВИН", "ТВЦ", "ТВЧ 1", "ТНТ", "ТО Друзей", "Толмачев", "Точка Zрения", "Трамвай-фильм", "ТРК", "Уолт Дисней Компани", "Хихидок", "Хлопушка", "Цікава Ідея", "Четыре в квадрате", "Швецов", "Штамп", "Штейн", "Ю. Живов", "Ю. Немахов", "Ю. Сербин", "Ю. Товбин", "Я. Беллманн"];
      scroll.minus();
      scroll.body().addClass('torrent-list');

      this.create = function () {
        var _this = this;

        this.activity.loader(true);
        Background.immediately(Utils.cardImgBackground(object.movie));
        Parser.get(object, function (data) {
          results = data;

          _this.build();

          _this.activity.loader(false);

          _this.activity.toggle();
        }, function (text) {
          _this.empty('Ответ: ' + text);
        });

        filter.onSearch = function (value) {
          Activity$1.replace({
            search: value,
            clarification: true
          });
        };

        filter.onBack = function () {
          _this.start();
        };

        filter.render().find('.selector').on('hover:focus', function (e) {
          last_filter = e.target;
        });
        return this.render();
      };

      this.empty = function (descr) {
        var empty = new create$d({
          descr: descr
        });
        files.append(empty.render(filter.empty()));
        this.start = empty.start;
        this.activity.loader(false);
        this.activity.toggle();
      };

      this.listEmpty = function () {
        scroll.append(Template.get('list_empty'));
      };

      this.buildSorted = function () {
        var need = Storage.get('torrents_sort', 'Seeders');
        var select = [{
          title: 'По раздающим',
          sort: 'Seeders'
        }, {
          title: 'По размеру',
          sort: 'Size'
        }, {
          title: 'По названию',
          sort: 'Title'
        }, {
          title: 'По источнику',
          sort: 'Tracker'
        }, {
          title: 'По дате',
          sort: 'PublisTime'
        }, {
          title: 'По просмотренным',
          sort: 'viewed'
        }];
        select.forEach(function (element) {
          if (element.sort == need) element.selected = true;
        });
        filter.sort(results.Results, need);
        this.sortWithPopular();
        filter.set('sort', select);
        this.selectedSort();
      };

      this.sortWithPopular = function () {
        var popular = [];
        var other = [];
        results.Results.forEach(function (a) {
          if (a.viewing_request) popular.push(a);else other.push(a);
        });
        popular.sort(function (a, b) {
          return b.viewing_average - a.viewing_average;
        });
        results.Results = popular.concat(other);
      };

      this.buildFilterd = function () {
        var need = Storage.get('torrents_filter', '{}');
        var select = [];

        var add = function add(type, title) {
          var items = filter_items[type];
          var subitems = [];
          var multiple = filter_multiple.indexOf(type) >= 0;
          var value = need[type];
          if (multiple) value = Arrays.toArray(value);
          items.forEach(function (name, i) {
            subitems.push({
              title: name,
              selected: multiple ? i == 0 : value == i,
              checked: multiple && value.indexOf(name) >= 0,
              checkbox: multiple && i > 0,
              index: i
            });
          });
          select.push({
            title: title,
            subtitle: multiple ? value.length ? value.join(', ') : items[0] : typeof value == 'undefined' ? items[0] : items[value],
            items: subitems,
            stype: type
          });
        };

        filter_items.voice = ["Любой", "Дубляж", "Многоголосый", "Двухголосый", "Любительский"];
        filter_items.tracker = ['Любой'];
        filter_items.season = ['Любой'];
        results.Results.forEach(function (element) {
          var title = element.Title.toLowerCase(),
              tracker = element.Tracker;

          for (var _i = 0; _i < voices.length; _i++) {
            var voice = voices[_i].toLowerCase();

            if (title.indexOf(voice) >= 0) {
              if (filter_items.voice.indexOf(voices[_i]) == -1) filter_items.voice.push(voices[_i]);
            }
          }

          if (filter_items.tracker.indexOf(tracker) === -1) filter_items.tracker.push(tracker);
          var season = title.match(/.?s\[(\d+)-\].?|.?s(\d+).?|.?\((\d+) сезон.?|.?season (\d+),.?/);

          if (season) {
            season = season.filter(function (c) {
              return c;
            });

            if (season.length > 1) {
              var orig = season[1];
              var number = parseInt(orig) + '';

              if (number && finded_seasons.indexOf(number) == -1) {
                finded_seasons.push(number);
                finded_seasons_full.push(orig);
              }
            }
          }
        });
        finded_seasons_full.sort(function (a, b) {
          var ac = parseInt(a);
          var bc = parseInt(b);
          if (ac > bc) return 1;else if (ac < bc) return -1;else return 0;
        });
        finded_seasons.sort(function (a, b) {
          var ac = parseInt(a);
          var bc = parseInt(b);
          if (ac > bc) return 1;else if (ac < bc) return -1;else return 0;
        });
        if (finded_seasons.length) filter_items.season = filter_items.season.concat(finded_seasons); //надо очистить от отсутствующих ключей

        need.voice = Arrays.removeNoIncludes(Arrays.toArray(need.voice), filter_items.voice);
        need.tracker = Arrays.removeNoIncludes(Arrays.toArray(need.tracker), filter_items.tracker);
        need.season = Arrays.removeNoIncludes(Arrays.toArray(need.season), filter_items.season);
        Storage.set('torrents_filter', need);
        select.push({
          title: 'Сбросить фильтр',
          reset: true
        });
        add('quality', 'Качество');
        add('hdr', 'HDR');
        add('sub', 'Субтитры');
        add('voice', 'Перевод');
        add('season', 'Сезон');
        add('tracker', 'Трекер');
        add('year', 'Год');
        filter.set('filter', select);
        this.selectedFilter();
      };

      this.selectedFilter = function () {
        var need = Storage.get('torrents_filter', '{}'),
            select = [];

        for (var _i2 in need) {
          if (need[_i2]) {
            if (Arrays.isArray(need[_i2])) {
              if (need[_i2].length) select.push(filter_translate[_i2] + ':' + need[_i2].join(', '));
            } else {
              select.push(filter_translate[_i2] + ': ' + filter_items[_i2][need[_i2]]);
            }
          }
        }

        filter.chosen('filter', select);
      };

      this.selectedSort = function () {
        var select = Storage.get('torrents_sort', 'Seeders');
        filter.chosen('sort', [sort_translate[select]]);
      };

      this.build = function () {
        var _this2 = this;

        this.buildSorted();
        this.buildFilterd();
        this.filtred();

        filter.onSelect = function (type, a, b) {
          if (type == 'sort') {
            Storage.set('torrents_sort', a.sort);
            filter.sort(results.Results, a.sort);

            _this2.sortWithPopular();
          } else {
            if (a.reset) {
              Storage.set('torrents_filter', '{}');

              _this2.buildFilterd();
            } else {
              var filter_data = Storage.get('torrents_filter', '{}');
              filter_data[a.stype] = filter_multiple.indexOf(a.stype) >= 0 ? [] : b.index;
              a.subtitle = b.title;
              Storage.set('torrents_filter', filter_data);
            }
          }

          _this2.applyFilter();

          _this2.start();
        };

        filter.onCheck = function (type, a, b) {
          var data = Storage.get('torrents_filter', '{}'),
              need = Arrays.toArray(data[a.stype]);
          if (b.checked && need.indexOf(b.title)) need.push(b.title);else if (!b.checked) Arrays.remove(need, b.title);
          data[a.stype] = need;
          Storage.set('torrents_filter', data);
          a.subtitle = need.join(', ');

          _this2.applyFilter();
        };

        if (results.Results.length) this.showResults();else {
          this.empty('Не удалось получить результатов');
        }
      };

      this.applyFilter = function () {
        this.filtred();
        this.selectedFilter();
        this.selectedSort();
        this.reset();
        this.showResults();
        last = scroll.render().find('.torrent-item:eq(0)')[0];
      };

      this.filtred = function () {
        var filter_data = Storage.get('torrents_filter', '{}');
        var filter_any = false;

        for (var _i3 in filter_data) {
          var filr = filter_data[_i3];

          if (filr) {
            if (Arrays.isArray(filr)) {
              if (filr.length) filter_any = true;
            } else filter_any = true;
          }
        }

        filtred = results.Results.filter(function (element) {
          if (filter_any) {
            var passed = false,
                nopass = false,
                title = element.Title.toLowerCase(),
                tracker = element.Tracker;
            var qua = Arrays.toArray(filter_data.quality),
                hdr = filter_data.hdr,
                sub = filter_data.sub,
                voi = Arrays.toArray(filter_data.voice),
                tra = Arrays.toArray(filter_data.tracker),
                ses = Arrays.toArray(filter_data.season),
                yer = filter_data.year;

            var test = function test(search, test_index) {
              var regex = new RegExp(search);
              return test_index ? title.indexOf(search) >= 0 : regex.test(title);
            };

            var check = function check(search, invert) {
              if (test(search)) {
                if (invert) nopass = true;else passed = true;
              } else {
                if (invert) passed = true;else nopass = true;
              }
            };

            var includes = function includes(type, arr) {
              if (!arr.length) return;
              var any = false;
              arr.forEach(function (a) {
                if (type == 'quality') {
                  if (a == '4k' && test('(4k|uhd)[ |\\]|,|$]|2160[pр]|ultrahd')) any = true;
                  if (a == '1080p' && test('fullhd|1080[pр]')) any = true;
                  if (a == '720p' && test('720[pр]')) any = true;
                }

                if (type == 'voice') {
                  var p = filter_items.voice.indexOf(a);

                  if (p == 1) {
                    if (test('дублирован|дубляж|  apple| dub| d[,| |$]|[,|\\s]дб[,|\\s|$]')) any = true;
                  } else if (p == 2) {
                    if (test('многоголос| p[,| |$]|[,|\\s](лм|пм)[,|\\s|$]')) any = true;
                  } else if (p == 3) {
                    if (test('двухголос|двуголос| l2[,| |$]|[,|\\s](лд|пд)[,|\\s|$]')) any = true;
                  } else if (p == 4) {
                    if (test('любитель|авторский| l1[,| |$]|[,|\\s](ло|ап)[,|\\s|$]')) any = true;
                  } else if (test(a.toLowerCase(), true)) any = true;
                }

                if (type == 'tracker') {
                  if (tracker.toLowerCase() == a.toLowerCase()) any = true;
                }

                if (type == 'season') {
                  var pad = function pad(n) {
                    return n < 10 && n != '01' ? '0' + n : n;
                  };

                  var _i4 = finded_seasons.indexOf(a);

                  var f = finded_seasons_full[_i4];
                  var SES1 = title.match(/\[s(\d+)-(\d+)\]/);
                  var SES2 = title.match(/season (\d+)-(\d+)/);
                  var SES3 = title.match(/season (\d+) - (\d+).?/);
                  var SES4 = title.match(/сезон: (\d+)-(\d+) \/.?/);
                  if (Array.isArray(SES1) && (f >= SES1[1] && f <= SES1[2] || pad(f) >= SES1[1] && pad(f) <= SES1[2] || f >= pad(SES1[1]) && f <= pad(SES1[2]))) any = true;
                  if (Array.isArray(SES2) && (f >= SES2[1] && f <= SES2[2] || pad(f) >= SES2[1] && pad(f) <= SES2[2] || f >= pad(SES2[1]) && f <= pad(SES2[2]))) any = true;
                  if (Array.isArray(SES3) && (f >= SES3[1] && f <= SES3[2] || pad(f) >= SES3[1] && pad(f) <= SES3[2] || f >= pad(SES3[1]) && f <= pad(SES3[2]))) any = true;
                  if (Array.isArray(SES4) && (f >= SES4[1] && f <= SES4[2] || pad(f) >= SES4[1] && pad(f) <= SES4[2] || f >= pad(SES4[1]) && f <= pad(SES4[2]))) any = true;
                  if (test('.?\\[0' + f + 'x0.?|.?\\[s' + f + '-.?|.?-' + f + '\\].?|.?\\[s0' + f + '\\].?|.?\\[s' + f + '\\].?|.?s' + f + 'e.?|.?s' + f + '-.?|.?сезон: ' + f + ' .?|.?сезон:' + f + '.?|сезон ' + f + ',.?|\\[' + f + ' сезон.?|.?\\(' + f + ' сезон.?|.?season ' + f + '.?')) any = true;
                }
              });
              if (any) passed = true;else nopass = true;
            };

            includes('quality', qua);
            includes('voice', voi);
            includes('tracker', tra);
            includes('season', ses);

            if (hdr) {
              if (hdr == 1) check('[\\[| ]hdr[10| |\\]|,|$]');else check('[\\[| ]hdr[10| |\\]|,|$]', true);
            }

            if (sub) {
              if (sub == 1) check(' sub|[,|\\s]ст[,|\\s|$]');else check(' sub|[,|\\s]ст[,|\\s|$]', true);
            }

            if (yer) {
              check(filter_items.year[yer]);
            }

            return nopass ? false : passed;
          } else return true;
        });
      };

      this.showResults = function () {
        total_pages = Math.ceil(filtred.length / 20);
        filter.render();
        scroll.append(filter.render());

        if (filtred.length) {
          this.append(filtred.slice(0, 20));
        } else {
          this.listEmpty();
        }

        files.append(scroll.render());
      };

      this.reset = function () {
        last = false;
        filter.render().detach();
        scroll.clear();
      };

      this.next = function () {
        if (object.page < 15 && object.page < total_pages) {
          object.page++;
          var offset = (object.page - 1) * 20;
          this.append(filtred.slice(offset, offset + 20));
          Controller.enable('content');
        }
      };

      this.loadMagnet = function (element, call) {
        var _this3 = this;

        Parser.marnet(element, function () {
          Modal.close();
          element.poster = object.movie.img;

          _this3.start();

          if (call) call();else Torrent.start(element, object.movie);
        }, function (text) {
          Modal.update(Template.get('error', {
            title: 'Ошибка',
            text: text
          }));
        });
        Modal.open({
          title: '',
          html: Template.get('modal_pending', {
            text: 'Запрашиваю magnet ссылку'
          }),
          onBack: function onBack() {
            Modal.close();
            network.clear();
            Controller.toggle('content');
          }
        });
      };

      this.mark = function (element, item, add) {
        if (add) {
          if (viewed.indexOf(element.hash) == -1) {
            viewed.push(element.hash);
            item.append('<div class="torrent-item__viewed">' + Template.get('icon_star', {}, true) + '</div>');
          }
        } else {
          element.viewed = true;
          Arrays.remove(viewed, element.hash);
          item.find('.torrent-item__viewed').remove();
        }

        element.viewed = add;
        Storage.set('torrents_view', viewed);
      };

      this.addToBase = function (element) {
        Torserver.add({
          poster: object.movie.img,
          title: object.movie.title + ' / ' + object.movie.original_title,
          link: element.MagnetUri || element.Link,
          data: {
            lampa: true,
            movie: object.movie
          }
        }, function () {
          Noty.show(object.movie.title + ' - добавлено в «Мои торренты»');
        });
      };

      this.append = function (items) {
        var _this4 = this;

        items.forEach(function (element) {
          count++;
          var date = Utils.parseTime(element.PublishDate);
          var pose = count;
          var bitrate = object.movie.runtime ? Utils.calcBitrate(element.Size, object.movie.runtime) : 0;
          Arrays.extend(element, {
            title: element.Title,
            date: date.full,
            tracker: element.Tracker,
            bitrate: bitrate,
            size: element.Size ? Utils.bytesToSize(element.Size) : element.size,
            seeds: element.Seeders,
            grabs: element.Peers
          });
          var item = Template.get('torrent', element);
          if (!bitrate) item.find('.bitrate').remove();
          if (element.viewed) item.append('<div class="torrent-item__viewed">' + Template.get('icon_star', {}, true) + '</div>');

          if (element.viewing_request) {
            item.addClass('torrent-item--popular');
            var time_min = Infinity;
            var time_max = 0;
            var time_avr = Utils.secondsToTimeHuman(element.viewing_average);
            element.viewing_times.forEach(function (m) {
              time_min = Math.min(time_min, m);
              time_max = Math.max(time_max, m);
            });
            time_min = Utils.secondsToTimeHuman(time_min);
            time_max = Utils.secondsToTimeHuman(time_max);
            var details = $("<div class=\"torrent-item__stat\">\n                    <div>\u0421\u0440\u0435\u0434\u043D\u0435\u0435: ".concat(time_avr, "</div>\n                    <div>\u041C\u0438\u043D\u0438\u043C\u0430\u043B\u044C\u043D\u043E\u0435: ").concat(time_min, "</div>\n                    <div>\u041C\u0430\u043A\u0441\u0438\u043C\u0430\u043B\u044C\u043D\u043E\u0435: ").concat(time_max, "</div>\n                    <div>\u0417\u0430\u043F\u0440\u043E\u0441\u043E\u0432: ").concat(element.viewing_request, "</div>\n                </div>"));
            item.append(details);
          }

          item.on('hover:focus', function (e) {
            last = e.target;
            scroll.update($(e.target), true);
            if (pose > object.page * 20 - 4) _this4.next();
            Helper.show('torrents', 'Удерживайте клавишу (ОК) для вызова контекстного меню', item);
          }).on('hover:enter', function () {
            Torrent.opened(function () {
              _this4.mark(element, item, true);
            });

            if (element.reguest && !element.MagnetUri) {
              _this4.loadMagnet(element);
            } else {
              element.poster = object.movie.img;

              _this4.start();

              Torrent.start(element, object.movie);
            }
          }).on('hover:long', function () {
            var enabled = Controller.enabled().name;
            Select.show({
              title: 'Действие',
              items: [{
                title: 'Добавить в «Мои торренты»',
                tomy: true
              }, {
                title: 'Пометить',
                subtitle: 'Пометить раздачу с флагом (просмотрено)',
                mark: true
              }, {
                title: 'Снять отметку',
                subtitle: 'Снять отметку с раздачи (просмотрено)'
              }],
              onBack: function onBack() {
                Controller.toggle(enabled);
              },
              onSelect: function onSelect(a) {
                if (a.tomy) {
                  if (element.reguest && !element.MagnetUri) {
                    _this4.loadMagnet(element, function () {
                      _this4.addToBase(element);
                    });
                  } else _this4.addToBase(element);
                } else if (a.mark) {
                  _this4.mark(element, item, true);
                } else {
                  _this4.mark(element, item, false);
                }

                Controller.toggle(enabled);
              }
            });
          });
          scroll.append(item);
        });
      };

      this.back = function () {
        Activity$1.backward();
      };

      this.start = function () {
        Controller.add('content', {
          toggle: function toggle() {
            Controller.collectionSet(scroll.render(), files.render());
            Controller.collectionFocus(last || false, scroll.render());
          },
          up: function up() {
            if (Navigator.canmove('up')) {
              if (scroll.render().find('.selector').slice(3).index(last) == 0 && last_filter) {
                Controller.collectionFocus(last_filter, scroll.render());
              } else Navigator.move('up');
            } else Controller.toggle('head');
          },
          down: function down() {
            Navigator.move('down');
          },
          right: function right() {
            if (Navigator.canmove('right')) Navigator.move('right');else filter.render().find('.filter--filter').trigger('hover:enter');
          },
          left: function left() {
            if (Navigator.canmove('left')) Navigator.move('left');else Controller.toggle('menu');
          },
          back: this.back
        });
        Controller.toggle('content');
      };

      this.pause = function () {};

      this.stop = function () {};

      this.render = function () {
        return files.render();
      };

      this.destroy = function () {
        network.clear();
        Parser.clear();
        files.destroy();
        scroll.destroy();
        results = null;
        network = null;
      };
    }

    function component$6(object) {
      var network = new create$m();
      var scroll = new create$l({
        mask: true,
        over: true
      });
      var items = [];
      var html = $('<div></div>');
      var body = $('<div class="category-full"></div>');
      var total_pages = 0;
      var last;
      var torrents = [];

      this.create = function () {
        var _this = this;

        this.activity.loader(true);
        Torserver.my(this.build.bind(this), function () {
          var empty = new create$d();
          html.append(empty.render());
          _this.start = empty.start;

          _this.activity.loader(false);

          _this.activity.toggle();
        });
        return this.render();
      };

      this.next = function () {
        if (object.page < 15 && object.page < total_pages) {
          object.page++;
          var offset = object.page - 1;
          this.append(torrents.slice(20 * offset, 20 * offset + 20));
          Controller.enable('content');
        }
      };

      this.append = function (data) {
        var _this2 = this;

        data.forEach(function (element) {
          element.title = element.title.replace('[LAMPA] ', '');
          var item_data = Arrays.decodeJson(element.data, {});
          var card = new Card(element, {
            card_category: true
          });
          card.create();

          card.onFocus = function (target, card_data) {
            last = target;
            scroll.update(card.render(), true);
            Background.change(item_data.movie ? Utils.cardImgBackground(item_data.movie) : element.poster);
            var maxrow = Math.ceil(items.length / 7) - 1;
            if (Math.ceil(items.indexOf(card) / 7) >= maxrow) _this2.next();
          };

          card.onEnter = function (target, card_data) {
            _this2.start();

            Torrent.open(card_data.hash, item_data.lampa && item_data.movie ? item_data.movie : false);
          };

          card.onMenu = function (target, card_data) {
            var enabled = Controller.enabled().name;
            Select.show({
              title: 'Действие',
              items: [{
                title: 'Удалить',
                subtitle: 'Торрент будет удален из вашего списка'
              }],
              onBack: function onBack() {
                Controller.toggle(enabled);
              },
              onSelect: function onSelect(a) {
                Torserver.remove(card_data.hash);
                Arrays.remove(items, card);
                card.destroy();
                last = false;
                Controller.toggle(enabled);
              }
            });
          };

          card.visible();
          body.append(card.render());
          items.push(card);
        });
      };

      this.build = function (data) {
        torrents = data;
        total_pages = Math.ceil(torrents.length / 20);
        scroll.minus();
        this.append(torrents.slice(0, 20));
        scroll.append(body);
        html.append(scroll.render());
        this.activity.loader(false);
        this.activity.toggle();
      };

      this.start = function () {
        Controller.add('content', {
          toggle: function toggle() {
            Controller.collectionSet(scroll.render());
            Controller.collectionFocus(last || false, scroll.render());
          },
          left: function left() {
            if (Navigator.canmove('left')) Navigator.move('left');else Controller.toggle('menu');
          },
          right: function right() {
            Navigator.move('right');
          },
          up: function up() {
            if (Navigator.canmove('up')) Navigator.move('up');else Controller.toggle('head');
          },
          down: function down() {
            if (Navigator.canmove('down')) Navigator.move('down');
          },
          back: function back() {
            Activity$1.backward();
          }
        });
        Controller.toggle('content');
      };

      this.pause = function () {};

      this.stop = function () {};

      this.render = function () {
        return html;
      };

      this.destroy = function () {
        network.clear();
        Arrays.destroy(items);
        scroll.destroy();
        html.remove();
        body.remove();
        network = null;
        items = null;
        html = null;
        body = null;
      };
    }

    function component$5(object) {
      var network = new create$m();
      var scroll = new create$l({
        mask: true,
        over: true,
        step: 250
      });
      var items = [];
      var html = $('<div></div>');
      var body = $('<div class="category-full"></div>');
      var total_pages = 0;
      var info;
      var last;
      var relises = [];

      this.create = function () {
        var _this = this;

        this.activity.loader(true);
        Api.relise(this.build.bind(this), function () {
          var empty = new create$d();
          html.append(empty.render());
          _this.start = empty.start;

          _this.activity.loader(false);

          _this.activity.toggle();
        });
        return this.render();
      };

      this.next = function () {
        if (object.page < 15 && object.page < total_pages) {
          object.page++;
          var offset = object.page - 1;
          this.append(relises.slice(20 * offset, 20 * offset + 20));
          Controller.enable('content');
        }
      };

      this.append = function (data) {
        var _this2 = this;

        data.forEach(function (element) {
          var card = new Card(element, {
            card_category: true,
            card_type: true
          });
          card.create();

          card.onFocus = function (target, card_data) {
            last = target;
            scroll.update(card.render(), true);

            if (info) {
              info.update(card_data);
              Background.change(Utils.cardImgBackground(card_data));
              var maxrow = Math.ceil(items.length / 7) - 1;
              if (Math.ceil(items.indexOf(card) / 7) >= maxrow) _this2.next();
            }
          };

          card.onEnter = function (target, card_data) {
            if (card_data.tmdbID) {
              card_data.id = card_data.tmdbID;
              Activity$1.push({
                url: '',
                component: 'full',
                id: card_data.tmdbID,
                method: card_data.name ? 'tv' : 'movie',
                card: card_data
              });
            } else {
              Modal.open({
                title: '',
                html: Template.get('modal_loading'),
                size: 'small',
                mask: true,
                onBack: function onBack() {
                  Modal.close();
                  Api.clear();
                  Controller.toggle('content');
                }
              });
              Api.search({
                query: encodeURIComponent(card_data.original_title)
              }, function (find) {
                Modal.close();
                var finded = TMDB.find(find, card_data);

                if (finded) {
                  Activity$1.push({
                    url: '',
                    component: 'full',
                    id: finded.id,
                    method: finded.name ? 'tv' : 'movie',
                    card: finded
                  });
                } else {
                  Noty.show('Не удалось найти фильм.');
                  Controller.toggle('content');
                }
              }, function () {
                Modal.close();
                Noty.show('Не удалось найти фильм.');
                Controller.toggle('content');
              });
            }
          };

          card.onMenu = function () {};

          card.visible();
          body.append(card.render());
          items.push(card);
        });
      };

      this.build = function (data) {
        relises = data;
        total_pages = Math.ceil(relises.length / 20);

        if (Storage.field('light_version')) {
          scroll.minus();
          html.append(scroll.render());
        } else {
          info = new create$e();
          info.create();
          info.render().find('.info__right').addClass('hide');
          scroll.minus(info.render());
          html.append(info.render());
          html.append(scroll.render());
        }

        var start = (object.page - 1) * 20;
        this.append(relises.slice(start, start + 20));
        if (total_pages > object.page && !info) this.more();
        scroll.append(body);
        this.activity.loader(false);
        this.activity.toggle();
      };

      this.more = function () {
        var more = $('<div class="category-full__more selector"><span>Показать ещё</span></div>');
        more.on('hover:focus', function (e) {
          Controller.collectionFocus(last || false, scroll.render());
          var next = Arrays.clone(object);
          delete next.activity;
          next.page++;
          Activity$1.push(next);
        });
        body.append(more);
      };

      this.start = function () {
        Controller.add('content', {
          toggle: function toggle() {
            Controller.collectionSet(scroll.render());
            Controller.collectionFocus(last || false, scroll.render());
          },
          left: function left() {
            if (Navigator.canmove('left')) Navigator.move('left');else Controller.toggle('menu');
          },
          right: function right() {
            Navigator.move('right');
          },
          up: function up() {
            if (Navigator.canmove('up')) Navigator.move('up');else Controller.toggle('head');
          },
          down: function down() {
            if (Navigator.canmove('down')) Navigator.move('down');
          },
          back: function back() {
            Activity$1.backward();
          }
        });
        Controller.toggle('content');
      };

      this.pause = function () {};

      this.stop = function () {};

      this.render = function () {
        return html;
      };

      this.destroy = function () {
        network.clear();
        Arrays.destroy(items);
        scroll.destroy();
        html.remove();
        body.remove();
        if (info) info.destroy();
        network = null;
        items = null;
        html = null;
        body = null;
        info = null;
      };
    }

    function component$4(object) {
      var network = new create$m();
      var scroll = new create$l({
        mask: true,
        over: true
      });
      var items = [];
      var html = $('<div></div>');
      var body = $('<div class="category-full"></div>');
      var last;
      var collections = [];
      var waitload;

      this.create = function () {
        var _this = this;

        this.activity.loader(true);
        Api.collections(object, this.build.bind(this), function () {
          var empty = new create$d();
          html.append(empty.render());
          _this.start = empty.start;

          _this.activity.loader(false);

          _this.activity.toggle();
        });
        return this.render();
      };

      this.next = function () {
        var _this2 = this;

        if (waitload) return;

        if (object.page < 30) {
          waitload = true;
          object.page++;
          Api.collections(object, function (result) {
            _this2.append(result.results);

            if (result.results.length) waitload = false;
            Controller.enable('content');
          }, function () {});
        }
      };

      this.append = function (data) {
        var _this3 = this;

        data.forEach(function (element) {
          var card = new Card(element, {
            card_collection: true,
            object: object
          });
          card.create();

          card.onFocus = function (target, card_data) {
            last = target;
            scroll.update(card.render(), true);
            Background.change(Utils.cardImgBackground(card_data));
            var maxrow = Math.ceil(items.length / 7) - 1;
            if (Math.ceil(items.indexOf(card) / 7) >= maxrow) _this3.next();
          };

          card.onEnter = function (target, card_data) {
            Activity$1.push({
              url: card_data.url,
              id: card_data.id,
              title: 'Подборки - ' + card_data.title,
              component: 'collections_view',
              source: object.source,
              page: 1
            });
          };

          card.onMenu = function (target, card_data) {};

          card.visible();
          body.append(card.render());
          items.push(card);
        });
      };

      this.build = function (data) {
        collections = data.results;
        scroll.minus();
        this.append(collections.slice(0, 20));
        scroll.append(body);
        html.append(scroll.render());
        this.activity.loader(false);
        this.activity.toggle();
      };

      this.start = function () {
        Controller.add('content', {
          toggle: function toggle() {
            Controller.collectionSet(scroll.render());
            Controller.collectionFocus(last || false, scroll.render());
          },
          left: function left() {
            if (Navigator.canmove('left')) Navigator.move('left');else Controller.toggle('menu');
          },
          right: function right() {
            Navigator.move('right');
          },
          up: function up() {
            if (Navigator.canmove('up')) Navigator.move('up');else Controller.toggle('head');
          },
          down: function down() {
            if (Navigator.canmove('down')) Navigator.move('down');
          },
          back: function back() {
            Activity$1.backward();
          }
        });
        Controller.toggle('content');
      };

      this.pause = function () {};

      this.stop = function () {};

      this.render = function () {
        return html;
      };

      this.destroy = function () {
        network.clear();
        Arrays.destroy(items);
        scroll.destroy();
        html.remove();
        body.remove();
        network = null;
        items = null;
        html = null;
        body = null;
      };
    }

    function component$3(object) {
      var comp = new component$c(object);

      comp.create = function () {
        Api.collections(object, this.build.bind(this), this.empty.bind(this));
      };

      return comp;
    }

    function component$2(object) {
      var html = $('<div></div>');
      var empty = new create$d();

      this.create = function () {
        html.append(empty.render());
        this.start = empty.start;
        this.activity.loader(false);
        this.activity.toggle();
      };

      this.start = function () {
        Controller.add('content', {
          toggle: function toggle() {
            Controller.collectionSet(empty.render());
            Controller.collectionFocus(false, empty.render());
          }
        });
        Controller.toggle('content');
      };

      this.pause = function () {};

      this.stop = function () {};

      this.render = function () {
        return html;
      };

      this.destroy = function () {
        html.remove();
      };
    }

    function component$1(object) {
      var _this = this;

      var scroll = new create$l({
        mask: true,
        over: true
      });
      var html = $('<div></div>');
      var body = $('<div class="timetable"></div>');
      var cards = Favorite.full().card;
      var table = TimeTable.all();
      var last;

      this.create = function () {
        if (Account.working()) cards = Account.all();

        if (table.length) {
          var date_max = 0;
          var date_now = new Date();
          var date_end = new Date();
          var date_one = 24 * 60 * 60 * 1000;
          table.forEach(function (elem) {
            elem.episodes.forEach(function (ep) {
              var air = new Date(ep.air_date);
              var tim = air.getTime();

              if (date_max < tim) {
                date_max = tim;
                date_end = air;
              }
            });
          });
          var date_dif = Math.min(30, Math.round(Math.abs((date_now - date_end) / date_one)));

          if (date_dif > 0) {
            for (var i = 0; i < date_dif; i++) {
              this.append(date_now);
              date_now.setDate(date_now.getDate() + 1);
            }

            scroll.minus();
            scroll.append(body);
            html.append(scroll.render());
          } else this.empty();
        } else this.empty();

        this.activity.loader(false);
        this.activity.toggle();
        return this.render();
      };

      this.empty = function () {
        var empty = new create$d({
          descr: 'В этом разделе будут отображаться даты выхода новых серий'
        });
        html.append(empty.render());
        _this.start = empty.start;

        _this.activity.loader(false);

        _this.activity.toggle();
      };

      this.append = function (date) {
        var item = $("\n            <div class=\"timetable__item selector\">\n                <div class=\"timetable__inner\">\n                    <div class=\"timetable__date\"></div>\n                    <div class=\"timetable__body\"></div>\n                </div>\n            </div>\n        ");
        var air_date = date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);
        var air_epis = [];
        var day_week = Utils.parseTime(date.getTime());
        var weeks = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
        table.forEach(function (elem) {
          elem.episodes.forEach(function (ep) {
            var card = cards.find(function (card) {
              return card.id == elem.id;
            });

            if (ep.air_date == air_date && card) {
              air_epis.push({
                episode: ep,
                card: cards.find(function (card) {
                  return card.id == elem.id;
                })
              });
            }
          });
        });

        if (air_epis.length) {
          air_epis.slice(0, 3).forEach(function (elem) {
            item.find('.timetable__body').append('<div><span style="background-color: ' + Utils.stringToHslColor(elem.card.name, 50, 50) + '"></span>' + elem.card.name + '</div>');
          });

          if (air_epis.length > 3) {
            item.find('.timetable__body').append('<div>+' + (air_epis.length - 3) + '</div>');
          }

          if (air_epis.length == 1) {
            var preview = $('<div class="timetable__preview"><img><div>' + (air_epis[0].episode.name || 'Без названия') + '</div></div>');
            Utils.imgLoad(preview.find('img'), Utils.protocol() + 'imagetmdb.cub.watch/t/p/w200/' + air_epis[0].episode.still_path, false, function () {
              preview.find('img').remove();
            });
            item.find('.timetable__body').prepend(preview);
          }

          item.addClass('timetable__item--any');
        }

        item.find('.timetable__date').text(day_week["short"] + ' - ' + weeks[date.getDay()] + '.');
        item.on('hover:focus', function () {
          last = $(this)[0];
          scroll.update($(this));
        }).on('hover:enter', function () {
          var modal = $('<div></div>');
          air_epis.forEach(function (elem) {
            var noty = Template.get('notice_card', {
              time: air_date,
              title: elem.card.name,
              descr: 'Cезон - <b>' + elem.episode.season_number + '</b><br>Эпизод - <b>' + elem.episode.episode_number + '</b>'
            });
            Utils.imgLoad(noty.find('img'), elem.card.poster ? elem.card.poster : elem.card.img ? elem.card.img : Utils.protocol() + 'imagetmdb.cub.watch/t/p/w200/' + elem.card.poster_path);
            noty.on('hover:enter', function () {
              Modal.close();
              Activity$1.push({
                url: '',
                component: 'full',
                id: elem.card.id,
                method: 'tv',
                card: elem.card,
                source: elem.card.source
              });
            });
            modal.append(noty);
          });
          Modal.open({
            title: 'Сериалы',
            size: 'medium',
            html: modal,
            onBack: function onBack() {
              Modal.close();
              Controller.toggle('content');
            }
          });
        });
        body.append(item);
      };

      this.back = function () {
        Activity$1.backward();
      };

      this.start = function () {
        Controller.add('content', {
          toggle: function toggle() {
            Controller.collectionSet(scroll.render());
            Controller.collectionFocus(last || false, scroll.render());
          },
          left: function left() {
            if (Navigator.canmove('left')) Navigator.move('left');else Controller.toggle('menu');
          },
          right: function right() {
            Navigator.move('right');
          },
          up: function up() {
            if (Navigator.canmove('up')) Navigator.move('up');else Controller.toggle('head');
          },
          down: function down() {
            if (Navigator.canmove('down')) Navigator.move('down');
          },
          back: this.back
        });
        Controller.toggle('content');
      };

      this.pause = function () {};

      this.stop = function () {};

      this.render = function () {
        return html;
      };

      this.destroy = function () {
        scroll.destroy();
        html.remove();
      };
    }

    var component = {
      main: component$e,
      full: component$d,
      category: component$a,
      category_full: component$b,
      actor: component$9,
      favorite: component$8,
      torrents: component$7,
      mytorrents: component$6,
      relise: component$5,
      collections: component$4,
      collections_view: component$3,
      nocomponent: component$2,
      timetable: component$1
    };
    /**
     * Создать компонент
     * @param {{component:string}} object 
     * @returns 
     */

    function create$2(object) {
      if (component[object.component]) {
        return new component[object.component](object);
      } else {
        return new component.nocomponent(object);
      }
    }
    /**
     * Добавить
     * @param {string} name 
     * @param {class} comp 
     */


    function add$2(name, comp) {
      component[name] = comp;
    }
    /**
     * Получить компонент
     * @param {string} name 
     * @returns {class}
     */


    function get$2(name) {
      return component[name];
    }

    var Component = {
      create: create$2,
      add: add$2,
      get: get$2
    };

    var where;
    var data = {};
    var notices = [];

    function init$5() {
      data = Storage.get('notice', '{}');
      notices = [{
        time: '2022-04-18 18:00',
        title: 'Еженедельник',
        descr: '- Новая фишка, популярные торренты которые чаше всего смотрят (тестовый режим)<br>- Добавлен каталог плагинов для быстрой установки.<br>- Трансляция карточки на другие устройства в сети.<br>- Чек лист для проверки работы TorrServe<br>- Копирование ссылки на видео из торрентов.<br>- Доделан лонг клик для мышей и тача.<br>- В карточках появились коллекции.<br>- Добавлены уведомления о выходе фильма в лучшем качестве.'
      }, {
        time: '2021-12-23 14:00',
        title: 'Обновление 1.3.7',
        descr: '1. Добавлен голосовой поиск.<br>2. Устранены баги с мышкой и добавлена поддержка мыши в плеере.<br>3. Добавлена привязка аккаунта к CUB.<br>4. Всякие другие не интересные мелочи.'
      }, {
        time: '2021-11-25 13:00',
        title: 'Обновление 1.3.6',
        descr: '1. Добавлен новый каталог CUB.<br>2. Изменен источник релизов, теперь работает даже в MSX.<br>3. Добавлена категория аниме ;)'
      }, {
        time: '2021-11-15 11:00',
        title: 'Обновление 1.3.5',
        descr: '1. Добавлен скринсейвер от Google ChromeCast.<br>2. Релизы запускаются сразу же без поиска .<br>3. В клавиатуре убрана кнопка ввода.<br>4. В плеере улучшена перемотка и добавлены кнопки (в конец / в начало).<br>5. Добавлена синхронизация через сервис gist.github.com.'
      }, {
        time: '2021-11-10 10:00',
        title: 'Обновление 1.3.4',
        descr: '1. Исправлена отметка времени при выключенном свойстве (продолжить с последнего места).<br>2. На телеках самсунг исправлены плашки черного цвета в плеере.<br>3. Добавлены плагины в настройках.'
      }, {
        time: '2021-11-02 10:00',
        title: 'Обновление 1.3.3',
        descr: '1. Добавлен поиск по торрентам.<br>2. Исправлена загрузка главной с выбранным источником.<br>3. Добавлен множественный выбор в фильтре.<br>4. Добавлено больше выбора для масштабирования видео.<br>5. Исправлены другие мелочи.'
      }, {
        time: '2021-10-25 15:00',
        title: 'Обновление 1.3.2',
        descr: '1. Исправлен поиск карточки, каждая карточка имеет свой источник (tmdb,ivi,okko)<br>2. Возможность переключить источник на (tmdb,ivi,okko).<br>3. Обновлена работа фона.<br>4. Добавлено перелистывание в торрент файлах, влево или вправо перелистывает на 10 позиций.<br>5. Изменен источник НЦР.<br>6. Исправлена история просмотров, теперь карточка добавляется если начали просмотр видео.<br>7. Добавлены комментарии в источнике ivi.'
      }, {
        time: '2021-10-20 16:20',
        title: 'Обновление 1.3.1',
        descr: '1. Добавлены подборки с ivi и okko<br>2. Вернул возможность изменения масштаба видео.<br>3. Добавлены цифровые релизы, в MSX не работает.<br>4. На каком языке выводить данные TMDB.<br>5. В скринсейвер добавлена возможно переключить на природу.<br>6. Возможность выбрать на каком языке находить торренты.<br>7. Возможность отключить продолжить по таймкоду.'
      }, {
        time: '2021-10-14 13:00',
        title: 'Скринсейвер',
        descr: 'Добавлен скринсейвер, запускается через 5 минут, если ничего не делать.'
      }, {
        time: '2021-10-14 10:00',
        title: 'Обновление 1.2.6',
        descr: '1. Исправлена ошибка удаления торрента.<br>2. Исправлена отметка времени.<br>3. Добавлен визуал для сериалов, в торрент-файлах лучше видно серии.<br>4. Другие мелочи.'
      }, {
        time: '2021-10-12 19:10',
        title: 'Полезно знать',
        descr: 'А вы знали? Что если долго удерживать кнопку (OK) на карточке, то можно вызвать меню для добавления в закладки. Такой же метод работает и на торрентах, долгий тап позволяет добавить раздачу в список (Мои торренты)'
      }, {
        time: '2021-10-12 19:00',
        title: 'Обновление 1.2.4',
        descr: '1. Добавлено меню (Мои торренты).<br>2. Обновлен фильтр и сортировка в торрентах.<br>3. Добавлена лента (Новинки) в фильмах и сериалах.<br>4. Исправлены ссылки для Torserver.<br>5. Добавлена отметка просмотра для сериалов.<br>6. Исправлено несколько багов и ошибок.'
      }, {
        time: '2021-10-10 18:00',
        title: 'Обновление 1.2.3',
        descr: '1. Добавлена поддержка мыши.<br>2. Добавлено запоминание позиции просмотра (Фильмы)<br>3. Исправлен баг в плеере с недоконца закрытыми плашками.<br>4. Добавлена дополнительная ссылка на Torserver<br>5. Отметка просмотренного торрента<br>6. Добавлен переход с торрента на карточку фильма'
      }, {
        time: '2021-10-09 15:00',
        title: 'Обновление 1.2.2',
        descr: '1. Добавлен Tizen плеер<br>2. Добавлен WebOS плеер<br>3. В плеере добавлена статистика загрузки торрента.<br>4. Добавлена полоса перемотки в плеере<br>5. Исправлено пустые постеры для Torserver<br>6. Исправлены другие мелкие ошибки и баги'
      }, {
        time: '2021-10-07 17:00',
        title: 'Обновление 1.2.1',
        descr: '1. Исправлен баг с кнопкой назад в MSX<br>2. Исправлен баг с поиском<br>3. Добавлен фильтр в торрентах<br>4. Визуально доработан плеер<br>5. Добавлены настройки быстродействия<br>6. Исправлены имена в торрент-файлах<br>7. Исправлен баг с паузой в плеере<br>8. Исправлены другие мелкие ошибки и баги'
      }, {
        time: '2021-10-03 12:00',
        title: 'Обновление 1.0.10',
        descr: '1. Доработана подгрузка карточек в мелком режиме<br>2. Добавлены логи, для просмотра логов наведите на шапку и щелкайте вверх 10 раз'
      }, {
        time: '2021-10-01 09:00',
        title: 'Обновление 1.0.9',
        descr: '1. Доработан фон в закладках и в фильме<br>2. Изменены инструкции<br>3. Доделан плагин под Orsay'
      }, {
        time: '2021-09-30 18:00',
        title: 'Обновление 1.0.8',
        descr: '1. Доработан фон<br>2. Выведена кнопка (Торренты)<br>3. Добавлена сортировка торрентов<br>4. Доделан выход под Tizen и WebOS<br> 5. Возможно доделаны кнопки управления под Orsay'
      }, {
        time: '2021-09-29 17:00',
        title: 'Обновление 1.0.7',
        descr: '1. Оптимизирована главная страница и каталоги<br>2. Добавлена авторизация для TorServer<br> 3. Добавлены подсказки ошибок в TorServer'
      }, {
        time: '2021-09-28 16:00',
        title: 'Исправления',
        descr: '1. Исправлена ошибка (Невозможно получить HASH)<br>2. Доделан парсер для MSX, теперь не нужно указывать явную ссылку, только по желанию<br> 3. Улучшен парсер jac.red, теперь точнее ищет'
      }, {
        time: '2021-09-27 15:00',
        title: 'Исправлен парсер',
        descr: 'В парсере была выявлена ошибка, из за которой jac.red не выдавал результаты'
      }, {
        time: '2021-09-26 17:00',
        title: 'Добро пожаловать!',
        descr: 'Это ваш первый запуск приложения, надеемся вам очень понравится. Приятного вам просмотра.'
      }];
      Arrays.extend(data, {
        time: 0
      });
    }

    function getNotice(call) {
      Account.notice(function (result) {
        if (result.length) {
          var items = [];
          result.forEach(function (item) {
            var data = JSON.parse(item.data);
            var desc = 'Доступно новое качество<br><br>Качество - <b>' + data.card.quality + '</b>';

            if (data.card.seasons) {
              var k = [];

              for (var i in data.card.seasons) {
                k.push(i);
              }

              var s = k.pop();
              desc = 'Новая серия<br><br>Cезон - <b>' + s + '</b><br>Эпизод - <b>' + data.card.seasons[s] + '</b>';
            }

            items.push({
              time: item.date + ' 12:00',
              title: data.card.title || data.card.name,
              descr: desc,
              card: data.card
            });
          });
          var all = notices.slice(0, 10).concat(items);
          all.sort(function (a, b) {
            var t_a = new Date(a.time).getTime(),
                t_b = new Date(b.time).getTime();
            if (t_a > t_b) return -1;else if (t_a < t_b) return 1;else return 0;
          });
          call(all);
        } else call(notices.slice(0, 10));
      });
    }

    function open() {
      getNotice(function (notice) {
        var html = $('<div></div>');
        notice.forEach(function (element) {
          var item = Template.get(element.card ? 'notice_card' : 'notice', element);

          if (element.card) {
            var img = item.find('img')[0];
            var poster_size = Storage.field('poster_size');

            img.onload = function () {};

            img.onerror = function (e) {
              img.src = './img/img_broken.svg';
            };

            img.src = element.card.poster ? element.card.poster : element.card.img ? element.card.img : Utils.protocol() + 'imagetmdb.cub.watch/t/p/' + poster_size + '/' + element.card.poster_path;
            item.on('hover:enter', function () {
              Modal.close();
              Activity$1.push({
                url: '',
                component: 'full',
                id: element.card.id,
                method: element.card.seasons ? 'tv' : 'movie',
                card: element.card,
                source: 'cub'
              });
            });
          }

          html.append(item);
        });
        Modal.open({
          title: 'Уведомления',
          size: 'medium',
          html: html,
          onBack: function onBack() {
            Modal.close();
            Controller.toggle('head');
          }
        });
        data.time = maxtime(notice);
        Storage.set('notice', data);
        icon(notice);
      });
    }

    function maxtime(notice) {
      var max = 0;
      notice.forEach(function (element) {
        var time = new Date(element.time).getTime();
        max = Math.max(max, time);
      });
      return max;
    }

    function any$1(notice) {
      return maxtime(notice) > data.time;
    }

    function icon(notice) {
      where.find('.notice--icon').toggleClass('active', any$1(notice));
    }

    function start$1(html) {
      where = html;
      getNotice(icon);
    }

    var Notice = {
      open: open,
      start: start$1,
      init: init$5
    };

    var html$2;
    var last$1;
    var activi = false;

    function init$4() {
      html$2 = Template.get('head');
      Utils.time(html$2);
      Notice.start(html$2);
      html$2.find('.selector').data('controller', 'head').on('hover:focus', function (event) {
        last$1 = event.target;
      });
      html$2.find('.open--settings').on('hover:enter', function () {
        Controller.toggle('settings');
      });
      html$2.find('.open--notice').on('hover:enter', function () {
        Notice.open();
      });
      html$2.find('.open--search').on('hover:enter', function () {
        Controller.toggle('search');
      });
      html$2.find('.head__logo-icon').on('click', function () {
        Controller.toggle('menu');
      });
      Storage.listener.follow('change', function (e) {
        if (e.name == 'account') {
          html$2.find('.open--profile').toggleClass('hide', e.value.token ? false : true);
        }
      });
      if (Storage.get('account', '{}').token) html$2.find('.open--profile').removeClass('hide');
      html$2.find('.open--profile').on('hover:enter', function () {
        Account.showProfiles('head');
      });
      Controller.add('head', {
        toggle: function toggle() {
          Controller.collectionSet(html$2);
          Controller.collectionFocus(last$1, html$2);
        },
        right: function right() {
          Navigator.move('right');
        },
        left: function left() {
          if (Navigator.canmove('left')) Navigator.move('left');else Controller.toggle('menu');
        },
        down: function down() {
          Controller.toggle('content');
        },
        back: function back() {
          Activity$1.backward();
        }
      });
      var timer;
      var broadcast = html$2.find('.open--broadcast').hide();
      broadcast.on('hover:enter', function () {
        Broadcast.open({
          type: 'card',
          object: Activity$1.extractObject(activi)
        });
      });
      Lampa.Listener.follow('activity', function (e) {
        if (e.type == 'start') activi = e.object;
        clearTimeout(timer);
        timer = setTimeout(function () {
          if (activi) {
            if (activi.component !== 'full') {
              broadcast.hide();
              activi = false;
            }
          }
        }, 1000);

        if (e.type == 'start' && e.component == 'full') {
          broadcast.show();
          activi = e.object;
        }
      });
    }

    function title(title) {
      html$2.find('.head__title').text(title ? '- ' + title : '');
    }

    function render$1() {
      return html$2;
    }

    var Head = {
      render: render$1,
      title: title,
      init: init$4
    };

    var listener$3 = start$3();
    var activites = [];
    var callback = false;
    var fullout = false;
    var content;
    var slides;
    var maxsave;

    function Activity(component) {
      var slide = Template.get('activity');
      var body = slide.find('.activity__body');
      this.stoped = false;
      this.started = false;
      /**
       * Добовляет активити в список активитис
       */

      this.append = function () {
        slides.append(slide);
      };
      /**
       * Создает новую активность
       */


      this.create = function () {
        component.create(body);
        body.append(component.render());
      };
      /**
       * Показывает загрузку
       * @param {boolean} status 
       */


      this.loader = function (status) {
        slide.toggleClass('activity--load', status);

        if (!status) {
          setTimeout(function () {
            Controller.updateSelects();
          }, 10);
        }
      };
      /**
       * Создает повторно
       */


      this.restart = function () {
        this.append();
        this.stoped = false;
        component.start();
      };
      /**
       * Стартуем активную активность
       */


      this.start = function () {
        this.started = true;
        Controller.add('content', {
          invisible: true,
          toggle: function toggle() {},
          left: function left() {
            Controller.toggle('menu');
          },
          up: function up() {
            Controller.toggle('head');
          },
          back: function back() {
            Activity.backward();
          }
        });
        Controller.toggle('content');
        if (this.stoped) this.restart();else component.start();
      };
      /**
       * Пауза
       */


      this.pause = function () {
        this.started = false;
        component.pause();
      };
      /**
       * Включаем активность если она активна
       */


      this.toggle = function () {
        if (this.started) this.start();
      };
      /**
       * Стоп
       */


      this.stop = function () {
        this.started = false;
        if (this.stoped) return;
        this.stoped = true;
        component.stop();
        slide.detach();
      };
      /**
       * Рендер
       */


      this.render = function () {
        return slide;
      };
      /**
       * Получить класс компонента
       */


      this.component = function () {
        return component;
      };
      /**
       * Уничтожаем активность
       */


      this.destroy = function () {
        component.destroy();
        slide.remove();
      };

      this.append();
    }
    /**
     * Запуск
     */


    function init$3() {
      content = Template.get('activitys');
      slides = content.find('.activitys__slides');
      maxsave = Storage.get('pages_save_total', 5);
      empty();
      var wait = true;
      setTimeout(function () {
        wait = false;
      }, 1500);
      window.addEventListener('popstate', function () {
        if (fullout || wait) return;
        empty();
        listener$3.send('popstate', {
          count: activites.length
        });
        if (callback) callback();else {
          backward();
        }
      });
      Storage.listener.follow('change', function (event) {
        if (event.name == 'pages_save_total') maxsave = Storage.get('pages_save_total', 5);
      });
    }
    /**
     * Лимит активностей, уничтожать если больше maxsave
     */


    function limit() {
      var curent = active$1();
      if (curent && curent.activity) curent.activity.pause();
      var tree_stop = activites.slice(-2);
      if (tree_stop.length > 1 && tree_stop[0].activity) tree_stop[0].activity.stop();
      var tree_destroy = activites.slice(-maxsave);

      if (tree_destroy.length > maxsave - 1) {
        var first = tree_destroy[0];

        if (first.activity) {
          first.activity.destroy();
          first.activity = null;
        }
      }
    }
    /**
     * Добавить новую активность
     * @param {{component:string}} object 
     */


    function push(object) {
      limit();
      create$1(object);
      activites.push(object);
      start(object);
    }
    /**
     * Создать новую активность
     * @param {{component:string}} object 
     */


    function create$1(object) {
      var comp = Component.create(object);
      object.activity = new Activity(comp);
      comp.activity = object.activity;
      Lampa.Listener.send('activity', {
        component: object.component,
        type: 'init',
        object: object
      });
      object.activity.create();
      Lampa.Listener.send('activity', {
        component: object.component,
        type: 'create',
        object: object
      });
    }
    /**
     * Вызов обратно пользователем
     */


    function back$2() {
      window.history.back();
    }
    /**
     * Получить активную активность
     * @returns {object}
     */


    function active$1() {
      return activites[activites.length - 1];
    }
    /**
     * Создат пустую историю
     */


    function empty() {
      window.history.pushState(null, null, window.location.pathname);
    }
    /**
     * Получить все активности
     * @returns {[{component:string, activity:class}]}
     */


    function all() {
      return activites;
    }
    /**
     * Обработать событие назад
     */


    function backward() {
      callback = false;
      listener$3.send('backward', {
        count: activites.length
      });
      if (activites.length == 1) return;
      slides.find('>div').removeClass('activity--active');
      var curent = activites.pop();

      if (curent) {
        setTimeout(function () {
          curent.activity.destroy();
          Lampa.Listener.send('activity', {
            component: curent.component,
            type: 'destroy',
            object: curent
          });
        }, 200);
      }

      var previous_tree = activites.slice(-maxsave);

      if (previous_tree.length > maxsave - 1) {
        create$1(previous_tree[0]);
      }

      previous_tree = activites.slice(-1)[0];

      if (previous_tree) {
        if (previous_tree.activity) start(previous_tree);else {
          create$1(previous_tree);
          start(previous_tree);
        }
      }
    }
    /**
     * Сохранить активность в память
     * @param {{component:string, activity:class}} object 
     */


    function save(object) {
      var saved = {};

      for (var i in object) {
        if (i !== 'activity') saved[i] = object[i];
      }

      Storage.set('activity', saved);
    }
    /**
     * Получить данные активности
     * @param {{component:string, activity:class}} object 
     * @returns {{component:string}}
     */


    function extractObject(object) {
      var saved = {};

      for (var i in object) {
        if (i !== 'activity') saved[i] = object[i];
      }

      return saved;
    }
    /**
     * Активируем следующию активность 
     * @param {{component:string, activity:class}} object 
     */


    function start(object) {
      save(object);
      object.activity.start();
      slides.find('> div').removeClass('activity--active');
      object.activity.render().addClass('activity--active');
      Head.title(object.title);
      Lampa.Listener.send('activity', {
        component: object.component,
        type: 'start',
        object: object
      });
    }
    /**
     * С какой активности начать запуск лампы
     */


    function last() {
      var active = Storage.get('activity', 'false');
      var start_from = Storage.field("start_page");

      if (window.start_deep_link) {
        push(window.start_deep_link);
      } else if (active && start_from === "last") {
        if (active.page) active.page = 1;
        push(active);
      } else {
        var _start_from$split = start_from.split('@'),
            _start_from$split2 = _slicedToArray(_start_from$split, 2),
            action = _start_from$split2[0],
            type = _start_from$split2[1];

        if (action == 'favorite') {
          push({
            url: '',
            title: type == 'book' ? 'Закладки' : type == 'like' ? 'Нравится' : type == 'history' ? 'История просмотров' : 'Позже',
            component: 'favorite',
            type: type,
            page: 1
          });
        } else if (action == 'mytorrents') {
          push({
            url: '',
            title: 'Мои торренты',
            component: 'mytorrents',
            page: 1
          });
        } else {
          push({
            url: '',
            title: 'Главная - ' + Storage.field('source').toUpperCase(),
            component: 'main',
            source: Storage.field('source'),
            page: 1
          });
        }
      }
    }
    /**
     * Рендер
     * @returns {object}
     */


    function render() {
      return content;
    }
    /**
     * Подключить обратный вызов при изменени истории
     * @param {*} call 
     */


    function call(call) {
      callback = call;
    }
    /**
     * Выход из лампы
     */


    function out() {
      fullout = true;
      back$2();

      for (var i = 0; i < window.history.length; i++) {
        back$2();
      }

      setTimeout(function () {
        fullout = false;
        empty();
      }, 100);
    }
    /**
     * Заменить активную активность
     * @param {object} replace 
     */


    function replace() {
      var replace = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var object = extractObject(active$1());

      for (var i in replace) {
        object[i] = replace[i];
      }

      active$1().activity.destroy();
      activites.pop();
      push(object);
    }

    var Activity$1 = {
      init: init$3,
      listener: listener$3,
      push: push,
      back: back$2,
      render: render,
      backward: backward,
      call: call,
      last: last,
      out: out,
      replace: replace,
      active: active$1,
      all: all,
      extractObject: extractObject
    };

    var listener$2 = start$3();
    var active;
    var active_name = '';
    var controlls = {};
    var selects;
    var select_active;
    /**
     * Добавить контроллер
     * @param {String} name 
     * @param {Object} calls 
     */

    function add$1(name, calls) {
      controlls[name] = calls;
    }
    /**
     * Запустить функцию
     * @param {String} name 
     * @param {Object} params 
     */


    function run(name, params) {
      if (active) {
        if (active[name]) {
          if (typeof active[name] == 'function') active[name](params);else if (typeof active[name] == 'string') {
            run(active[name], params);
          }
        }
      }
    }
    /**
     * Двигать
     * @param {String} direction 
     */


    function move(direction) {
      run(direction);
    }
    /**
     * Вызов enter
     */


    function enter() {
      if (active && active.enter) run('enter');else if (select_active) {
        select_active.trigger('hover:enter');
      }
    }
    /**
     * Вызов long
     */


    function _long() {
      if (active && active["long"]) run('long');else if (select_active) {
        select_active.trigger('hover:long');
      }
    }
    /**
     * Завершить
     */


    function finish() {
      run('finish');
    }
    /**
     * Нажали назад
     */


    function back$1() {
      run('back');
    }
    /**
     * Переключить контроллер
     * @param {String} name 
     */


    function toggle(name) {
      if (active && active.gone) active.gone(name);

      if (controlls[name]) {
        active = controlls[name];
        active_name = name;
        Activity$1.call(function () {
          run('back');
        });
        if (active.toggle) active.toggle(); //updateSelects()

        listener$2.send('toggle', {
          name: name
        });
      }
    }

    function bindMouseOrTouch(name) {
      selects.on(name + '.hover', function (e) {
        if ($(this).hasClass('selector')) {
          if (name == 'touchstart') $('.selector').removeClass('focus enter');
          selects.removeClass('focus enter').data('ismouse', false);
          $(this).addClass('focus').data('ismouse', true).trigger('hover:focus', [true]);
          var silent = Navigator.silent;
          Navigator.silent = true;
          Navigator.focus($(this)[0]);
          Navigator.silent = silent;
        }
      });
      if (name == 'mouseenter') selects.on('mouseleave.hover', function () {
        $(this).removeClass('focus');
      });
    }

    function bindMouseAndTouchLong() {
      selects.each(function () {
        var selector = $(this);
        var position = 0;
        var timer;

        var trigger = function trigger() {
          clearTimeout(timer);
          timer = setTimeout(function () {
            var time = selector.data('long-time') || 0;

            if (time + 100 < Date.now()) {
              var mutation = Math.abs(position - (selector.offset().top + selector.offset().left));
              if (mutation < 30) selector.trigger('hover:long', [true]);
            }

            selector.data('long-time', Date.now());
          }, 800);
          position = selector.offset().top + selector.offset().left;
        };

        selector.on('mousedown.hover touchstart.hover', trigger).on('mouseout.hover mouseup.hover touchend.hover touchmove.hover', function (e) {
          clearTimeout(timer);
        });
      });
    }

    function updateSelects(cuctom) {
      selects = cuctom || $('.selector');
      selects.unbind('.hover');

      if (Storage.field('navigation_type') == 'mouse') {
        selects.on('click.hover', function (e) {
          var time = $(this).data('click-time') || 0; //ну хз, 2 раза клик срабатывает, нашел такое решение:

          if (time + 100 < Date.now()) {
            selects.removeClass('focus enter');
            if (e.keyCode !== 13) $(this).addClass('focus').trigger('hover:enter', [true]);
          }

          $(this).data('click-time', Date.now());
        });
        bindMouseOrTouch('mouseenter');
        bindMouseAndTouchLong();
      }

      bindMouseOrTouch('touchstart');
    }

    function enable(name) {
      if (active_name == name) toggle(name);
    }

    function clearSelects() {
      select_active = false;
      if (selects) selects.removeClass('focus enter'); //if(selects) selects.unbind('.hover')
    }
    /**
     * Вызвать событие
     * @param {String} name 
     * @param {Object} params 
     */


    function trigger$1(name, params) {
      run(name, params);
    }
    /**
     * Фокус на элементе
     * @param {Object} target 
     */


    function focus(target) {
      if (selects) selects.removeClass('focus enter').data('ismouse', false);
      $(target).addClass('focus').trigger('hover:focus');
      select_active = $(target);
    }

    function collectionSet(html, append) {
      var selectors = html.find('.selector');
      var colection = selectors.toArray();

      if (append) {
        selectors = $.merge(selectors, append.find('.selector'));
        colection = colection.concat(append.find('.selector').toArray());
      }

      if (colection.length || active.invisible) {
        clearSelects();
        Navigator.setCollection(colection);
        updateSelects(selectors);
      }
    }

    function collectionFocus(target, html) {
      if (target) {
        Navigator.focus(target);
      } else {
        var colection = html.find('.selector').not('.hide').toArray();
        if (colection.length) Navigator.focus(colection[0]);
      }
    }

    function enabled() {
      return {
        name: active_name,
        controller: active
      };
    }

    function toContent() {
      var trys = 0;
      Screensaver.stopSlideshow();

      var go = function go() {
        var contrl = enabled();
        var any = parseInt([$('body').hasClass('settings--open') ? 1 : 0, $('body').hasClass('selectbox--open') ? 1 : 0, $('.modal,.youtube-player,.player,.search-box,.search').length ? 1 : 0].join(''));
        trys++;

        if (any) {
          if (contrl.controller.back) contrl.controller.back();
          if (trys < 10) go();
        }
      };

      go();
    }

    var Controller = {
      listener: listener$2,
      add: add$1,
      move: move,
      enter: enter,
      finish: finish,
      toggle: toggle,
      trigger: trigger$1,
      back: back$1,
      focus: focus,
      collectionSet: collectionSet,
      collectionFocus: collectionFocus,
      enable: enable,
      enabled: enabled,
      "long": _long,
      updateSelects: updateSelects,
      toContent: toContent
    };

    function create() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var _keyClass = window.SimpleKeyboard["default"],
          _keyBord;

      var last;
      var recognition;
      var simple = Storage.field('keyboard_type') !== 'lampa';
      var input;
      var _default_layout = {
        'en': ['{abc} 1 2 3 4 5 6 7 8 9 0 - + = {bksp}', '{RU} q w e r t y u i o p', 'a s d f g h j k l /', '{shift} z x c v b n m , . : http://', '{space}'],
        'en-shift': ['{abc} 1 2 3 4 5 6 7 8 9 0 - + = {bksp}', '{RU} Q W E R T Y U I O P', 'A S D F G H J K L /', '{shift} Z X C V B N M , . : http://', '{space}'],
        'abc': ['1 2 3 4 5 6 7 8 9 0 - + = {bksp}', '! @ # $ % ^ & * ( ) [ ]', '- _ = + \\ | [ ] { }', '; : \' " , . < > / ?', '{rus} {space} {eng}'],
        'default': ['{abc} 1 2 3 4 5 6 7 8 9 0 - + = {bksp}', '{EN} й ц у к е н г ш щ з х ъ', 'ф ы в а п р о л д ж э', '{shift} я ч с м и т ь б ю , . : http://', '{space}'],
        'ru-shift': ['{abc} 1 2 3 4 5 6 7 8 9 0 - + = {bksp}', '{EN} Й Ц У К Е Н Г Ш Щ З Х Ъ', 'Ф Ы В А П Р О Л Д Ж Э', '{shift} Я Ч С М И Т Ь Б Ю , . : http://', '{space}']
      };
      this.listener = start$3();

      this.create = function () {
        var _this = this;

        if (simple) {
          input = $('<input type="text" class="simple-keyboard-input selector" placeholder="Введите текст..." />');
          var last_value = '';
          var time_blur = 0;
          var time_focus = 0;
          var stated, ended;
          input.on('keyup change input keypress', function (e) {
            var now_value = input.val();

            if (last_value !== now_value) {
              last_value = now_value;
              stated = ended = false;

              _this.listener.send('change', {
                value: now_value
              });
            }
          });
          input.on('blur', function () {
            Keypad.enable();
            time_blur = Date.now();
          });
          input.on('focus', function () {
            Keypad.disable();
            time_focus = Date.now();
          });
          input.on('keyup', function (e) {
            if (time_focus + 1000 > Date.now()) return;
            var keys = [13, 65376, 29443, 117, 65385, 461, 27];
            var valu = input.val();
            var cart = e.target.selectionStart;

            if (keys.indexOf(e.keyCode) >= 0) {
              e.preventDefault();
              input.blur();
            }

            if (e.keyCode == 13 || e.keyCode == 65376) _this.listener.send('enter');

            if (e.keyCode == 37 && cart == 0) {
              if (stated) input.blur(), _this.listener.send('left');
              stated = true;
              ended = false;
            }

            if (e.keyCode == 39 && cart >= valu.length) {
              if (ended) input.blur(), _this.listener.send('right');
              ended = true;
              stated = false;
            }

            if (e.keyCode == 40) {
              input.blur(), _this.listener.send('down');
            }

            if (e.keyCode == 38) {
              input.blur(), _this.listener.send('up');
            }
          });
          input.on('hover:focus', function () {
            input.focus();
          });
          input.on('hover:enter', function () {
            if (time_blur + 1000 < Date.now()) input.focus();
          });
          $('.simple-keyboard').append(input);
        } else {
          _keyBord = new _keyClass({
            display: {
              '{bksp}': '&nbsp;',
              '{enter}': '&nbsp;',
              '{shift}': '&nbsp;',
              '{space}': '&nbsp;',
              '{RU}': '&nbsp;',
              '{EN}': '&nbsp;',
              '{abc}': '&nbsp;',
              '{rus}': 'русский',
              '{eng}': 'english',
              '{search}': 'Найти',
              '{mic}': "<svg viewBox=\"0 0 24 31\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                        <rect x=\"5\" width=\"14\" height=\"23\" rx=\"7\" fill=\"currentColor\"/>\n                        <path d=\"M3.39272 18.4429C3.08504 17.6737 2.21209 17.2996 1.44291 17.6073C0.673739 17.915 0.299615 18.7879 0.607285 19.5571L3.39272 18.4429ZM23.3927 19.5571C23.7004 18.7879 23.3263 17.915 22.5571 17.6073C21.7879 17.2996 20.915 17.6737 20.6073 18.4429L23.3927 19.5571ZM0.607285 19.5571C2.85606 25.179 7.44515 27.5 12 27.5V24.5C8.55485 24.5 5.14394 22.821 3.39272 18.4429L0.607285 19.5571ZM12 27.5C16.5549 27.5 21.1439 25.179 23.3927 19.5571L20.6073 18.4429C18.8561 22.821 15.4451 24.5 12 24.5V27.5Z\" fill=\"currentColor\"/>\n                        <rect x=\"10\" y=\"25\" width=\"4\" height=\"6\" rx=\"2\" fill=\"currentColor\"/>\n                        </svg>"
            },
            layout: params.layout || _default_layout,
            onChange: function onChange(value) {
              _this.listener.send('change', {
                value: value
              });
            },
            onKeyPress: function onKeyPress(button) {
              if (button === "{shift}" || button === "{abc}" || button === "{EN}" || button === "{RU}" || button === "{rus}" || button === "{eng}") _this._handle(button);else if (button === '{mic}') {
                if (Platform.is('android')) {
                  Android.voiceStart();
                  window.voiceResult = _this.value.bind(_this);
                } else if (recognition) {
                  try {
                    if (recognition.record) recognition.stop();else recognition.start();
                  } catch (e) {
                    recognition.stop();
                  }
                }
              } else if (button === '{enter}' || button === '{search}') {
                _this.listener.send('enter');
              }
            }
          });
          this.speechRecognition();
        }
      };

      this.speechRecognition = function () {
        var _this2 = this;

        var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        console.log('Speech', 'status:', SpeechRecognition ? true : false);

        if (SpeechRecognition) {
          recognition = new SpeechRecognition();
          recognition.continuous = false;
          recognition.addEventListener("start", function () {
            console.log('Speech', 'start');
            $('.simple-keyboard [data-skbtn="{mic}"]').css('color', 'red');
            recognition.record = true;
            Noty.show('Говорите, я слушаю...');
          });
          recognition.addEventListener("end", function () {
            console.log('Speech', 'end');
            $('.simple-keyboard [data-skbtn="{mic}"]').css('color', 'white');
            recognition.record = false;
          });
          recognition.addEventListener("result", function (event) {
            console.log('Speech', 'result:', event.resultIndex, event.results[event.resultIndex]);
            var current = event.resultIndex;
            var transcript = event.results[current][0].transcript;
            console.log('Speech', 'transcript:', transcript);

            if (transcript.toLowerCase().trim() === "stop recording") {
              recognition.stop();
            } else {
              if (transcript.toLowerCase().trim() === "reset input") {
                _this2.value('');
              } else {
                _this2.value(transcript);
              }
            }
          });
          recognition.addEventListener("error", function (event) {
            console.log('Speech', 'error:', event);

            if (event.error == 'not-allowed') {
              Noty.show('Нет доступа к микрофону');
            }

            recognition.stop();
          });
        } else {
          $('.simple-keyboard [data-skbtn="{mic}"]').css('opacity', '0.3');
        }
      };

      this.value = function (value) {
        if (simple) input.val(value);else _keyBord.setInput(value);
        this.listener.send('change', {
          value: value
        });
      };

      this._layout = function () {
        var keys = $('.simple-keyboard .hg-button').addClass('selector');
        Controller.collectionSet($('.simple-keyboard'));
        Controller.collectionFocus(last || keys[0], $('.simple-keyboard'));
        $('.simple-keyboard .hg-button:not(.binded)').on('hover:enter', function (e, click) {
          Controller.collectionFocus($(this)[0]);
          if (!click) _keyBord.handleButtonClicked($(this).attr('data-skbtn'), e);
        }).on('hover:focus', function (e) {
          last = e.target;
        });
        keys.addClass('binded');
      };

      this._handle = function (button) {
        var current_layout = _keyBord.options.layoutName,
            layout = 'default';

        if (button == '{shift}') {
          if (current_layout == 'default') layout = 'ru-shift';else if (current_layout == 'ru-shift') layout = 'default';else if (current_layout == 'en') layout = 'en-shift';else if (current_layout == 'en-shift') layout = 'en';
        } else if (button == '{abc}') layout = 'abc';else if (button == '{EN}' || button == '{eng}') layout = 'en';else if (button == '{RU}' || button == '{rus}') layout = 'default';

        _keyBord.setOptions({
          layoutName: layout
        });

        last = false;
        Controller.toggle('keybord');
      };

      this.toggle = function () {
        var _this3 = this;

        Controller.add('keybord', {
          toggle: function toggle() {
            if (simple) {
              Controller.collectionSet($('.simple-keyboard'));
              Controller.collectionFocus(false, $('.simple-keyboard'));
            } else _this3._layout();
          },
          up: function up() {
            if (!Navigator.canmove('up')) {
              _this3.listener.send('up');
            } else Navigator.move('up');
          },
          down: function down() {
            if (!Navigator.canmove('down')) {
              _this3.listener.send('down');
            } else Navigator.move('down');
          },
          left: function left() {
            if (!Navigator.canmove('left')) {
              _this3.listener.send('left');
            } else Navigator.move('left');
          },
          right: function right() {
            if (!Navigator.canmove('right')) {
              _this3.listener.send('right');
            } else Navigator.move('right');
          },
          back: function back() {
            _this3.listener.send('back');
          }
        });
        Controller.toggle('keybord');
      };

      this.destroy = function () {
        try {
          if (simple) {
            input.remove();
          } else _keyBord.destroy();
        } catch (e) {}

        this.listener.destroy();
        Keypad.enable();
      };
    }

    var html$1, keyboard, input;
    /**
     * Заустить редактор
     * @param {{title:string, value:string, free:boolean, nosave:boolean}} params 
     * @param {function} call 
     */

    function edit(params, call) {
      html$1 = Template.get('settings_input');
      input = html$1.find('.settings-input__input');
      if (Storage.field('keyboard_type') !== 'lampa') input.hide();
      $('body').append(html$1);
      keyboard = new create();
      keyboard.listener.follow('change', function (event) {
        input.text(event.value.trim());
      });
      keyboard.listener.follow('enter', function (event) {
        var val = input.text();
        back();
        call(val);
      });
      html$1.toggleClass('settings-input--free', params.free ? true : false);
      $('.settings-input__links', html$1).toggleClass('hide', params.nosave ? true : false);
      if (params.title) html$1.find('.settings-input__content').prepend('<div class="settings-input__title">' + params.title + '</div>');
      keyboard.listener.follow('down', function (event) {
        if (params.nosave) return;
        var members = Storage.get('setting_member', []);
        var links = [];
        links.push({
          title: (members.indexOf(input.text()) == -1 ? 'Добавить' : 'Удалить') + ' текущее значение',
          subtitle: input.text(),
          add: true
        });
        members.forEach(function (link) {
          links.push({
            title: link,
            subtitle: 'Пользовательская ссылка',
            url: link,
            member: true
          });
        });
        links = links.concat([{
          title: 'jac.red',
          subtitle: 'Для торрентов, Api ключ - пустой',
          url: 'jac.red'
        }, {
          title: '127.0.0.1:8090',
          subtitle: 'Для локального TorrServer',
          url: '127.0.0.1:8090'
        }]);
        Select.show({
          title: 'Ссылки',
          items: links,
          onSelect: function onSelect(a) {
            if (a.add) {
              if (members.indexOf(a.subtitle) == -1) {
                Arrays.insert(members, 0, a.subtitle);
                Noty.show('Добавлено (' + a.subtitle + ')');
              } else {
                Arrays.remove(members, a.subtitle);
                Noty.show('Удалено (' + a.subtitle + ')');
              }

              Storage.set('setting_member', members);
            } else {
              keyboard.value(a.url);
            }

            keyboard.toggle();
          },
          onLong: function onLong(a, elem) {
            if (a.member) {
              Arrays.remove(members, a.url);
              Noty.show('Удалено (' + a.url + ')');
              Storage.set('setting_member', members);
              $(elem).css({
                opacity: 0.4
              });
            }
          },
          onBack: function onBack() {
            keyboard.toggle();
          }
        });
      });
      keyboard.listener.follow('back', function () {
        var val = input.text();
        back();
        call(val);
      });
      keyboard.create();
      keyboard.value(params.value);
      keyboard.toggle();
      Helper.show('keyboard', 'После ввода значения нажмите кнопку «Назад» для сохранения');
    }
    /**
     * Назад
     */


    function back() {
      destroy();
      Controller.toggle('settings_component');
    }
    /**
     * Уничтожить
     */


    function destroy() {
      keyboard.destroy();
      html$1.remove();
      html$1 = null;
      keyboard = null;
      input = null;
    }

    var Input = {
      edit: edit
    };

    var values = {};
    var defaults = {};
    var listener$1 = start$3();
    /**
     * Запуск
     */

    function init$2() {
      if (Platform.is('tizen')) {
        select('player', {
          'inner': 'Встроенный',
          'tizen': 'Tizen'
        }, 'tizen');
      }

      if (Platform.is('orsay')) {
        select('player', {
          'inner': 'Встроенный',
          'orsay': 'Orsay'
        }, 'inner');
      } else if (Platform.is('webos')) {
        select('player', {
          'inner': 'Встроенный',
          'webos': 'WebOS'
        }, 'inner');
      } else if (Platform.is('android')) {
        select('player', {
          'inner': 'Встроенный',
          'android': 'Android'
        }, 'android');
        trigger('internal_torrclient', false);
      } else if (Platform.is('nw')) {
        select('player', {
          'inner': 'Встроенный',
          'other': 'Внешний'
        }, 'inner');
      }

      Storage.set('player_size', 'default'); //делаем возврат на нормальный масштаб видео
    }
    /**
     * Переключатель
     * @param {string} name - название
     * @param {boolean} value_default - значение по дефолту
     */


    function trigger(name, value_default) {
      values[name] = {
        'true': 'Да',
        'false': 'Нет'
      };
      defaults[name] = value_default;
    }
    /**
     * Выбрать
     * @param {string} name - название
     * @param {{key:string}} select_data - значение
     * @param {string} select_default_value - значение по дефолту
     */


    function select(name, select_data, select_default_value) {
      values[name] = select_data;
      defaults[name] = select_default_value;
    }
    /**
     * Биндит события на элемент
     * @param {object} elems 
     */


    function bind(elems) {
      elems.on('hover:enter', function (event) {
        var elem = $(event.target);
        var type = elem.data('type');
        var name = elem.data('name');
        var onChange = elem.data('onChange');

        if (type == 'toggle') {
          var params = values[name];
          var keys = Arrays.isArray(params) ? params : Arrays.getKeys(params),
              value = Storage.get(name, defaults[name]) + '',
              position = keys.indexOf(value);
          position++;
          if (position >= keys.length) position = 0;
          position = Math.max(0, Math.min(keys.length - 1, position));
          value = keys[position];
          Storage.set(name, value);
          update(elem);
          if (onChange) onChange(value);
        }

        if (type == 'input') {
          Input.edit({
            elem: elem,
            name: name,
            value: elem.data('string') ? window.localStorage.getItem(name) || defaults[name] : Storage.get(name, defaults[name]) + ''
          }, function (new_value) {
            Storage.set(name, new_value);
            update(elem);
            if (onChange) onChange(new_value);
          });
        }

        if (type == 'button') {
          listener$1.send('button', {
            name: name
          });
        }

        if (type == 'add') {
          Input.edit({
            value: ''
          }, function (new_value) {
            if (new_value && Storage.add(name, new_value)) {
              displayAddItem(elem, new_value);
              listener$1.send('update_scroll');
            }
          });
        }

        if (type == 'select') {
          var _params = values[name];

          var _value = Storage.get(name, defaults[name]) + '';

          var items = [];

          for (var i in _params) {
            items.push({
              title: _params[i],
              value: i,
              selected: i == _value
            });
          }

          var enabled = Controller.enabled().name;
          Select.show({
            title: 'Выбрать',
            items: items,
            onBack: function onBack() {
              Controller.toggle(enabled);
            },
            onSelect: function onSelect(a) {
              Storage.set(name, a.value);
              update(elem);
              Controller.toggle(enabled);
              if (onChange) onChange(a.value);
            }
          });
        }
      }).each(function () {
        if (!$(this).data('static')) update($(this));
      });

      if (elems.eq(0).data('type') == 'add') {
        displayAddList(elems.eq(0));
      }
    }
    /**
     * Добавить дополнительное полу
     * @param {object} elem 
     * @param {object} element 
     */


    function displayAddItem(elem, element) {
      var name = elem.data('name');
      var item = $('<div class="settings-param selector"><div class="settings-param__name">' + element + '</div>' + '</div>');
      item.on('hover:long', function () {
        var list = Storage.get(name, '[]');
        Arrays.remove(list, element);
        Storage.set(name, list);
        item.css({
          opacity: 0.5
        });
      });
      elem.after(item);
    }
    /**
     * Вывести дополнительные поля
     * @param {object} elem 
     */


    function displayAddList(elem) {
      var list = Storage.get(elem.data('name'), '[]');
      list.forEach(function (element) {
        displayAddItem(elem, element);
      });
      listener$1.send('update_scroll');
    }
    /**
     * Обновляет значения на элементе
     * @param {object} elem 
     */


    function update(elem) {
      var name = elem.data('name');
      var key = elem.data('string') ? window.localStorage.getItem(name) || defaults[name] : Storage.get(name, defaults[name] + '');
      var val = typeof values[name] == 'string' ? key : values[name][key] || values[name][defaults[name]];
      var plr = elem.attr('placeholder');
      if (!val && plr) val = plr;
      elem.find('.settings-param__value').text(val);
    }
    /**
     * Получить значение параметра
     * @param {string} name 
     * @returns *
     */


    function field$1(name) {
      return Storage.get(name, defaults[name] + '');
    }
    /**
     * Добовляем селекторы
     */


    select('interface_size', {
      'small': 'Меньше',
      'normal': 'Нормальный'
    }, 'normal');
    select('poster_size', {
      'w200': 'Низкое',
      'w300': 'Среднее',
      'w500': 'Высокое'
    }, 'w200');
    select('parser_torrent_type', {
      'jackett': 'Jackett',
      'torlook': 'Torlook'
    }, 'jackett');
    select('torlook_parse_type', {
      'native': 'Напрямую',
      'site': 'Через API сайта'
    }, 'native');
    select('background_type', {
      'complex': 'Сложный',
      'simple': 'Простой',
      'poster': 'Картинка'
    }, 'simple');
    select('pages_save_total', {
      '1': '1',
      '2': '2',
      '3': '3',
      '4': '4',
      '5': '5'
    }, '5');
    select('player', {
      'inner': 'Встроенный'
    }, 'inner');
    select('torrserver_use_link', {
      'one': 'Основную',
      'two': 'Дополнительную'
    }, 'one');
    select('subtitles_size', {
      'small': 'Маленькие',
      'normal': 'Обычные',
      'large': 'Большие'
    }, 'normal');
    select('screensaver_type', {
      'nature': 'Природа',
      'chrome': 'ChromeCast'
    }, 'chrome');
    select('tmdb_lang', {
      'ru': 'Русский',
      'en': 'Английский'
    }, 'ru');
    select('parse_lang', {
      'df': 'Оригинал',
      'ru': 'Русский'
    }, 'df');
    select('player_timecode', {
      'again': 'Начать с начала',
      'continue': 'Продолжить',
      'ask': 'Спрашивать'
    }, 'continue');
    select('player_scale_method', {
      'transform': 'Transform',
      'calculate': 'Рассчитать'
    }, 'transform');
    select('source', {
      'tmdb': 'TMDB',
      'ivi': 'IVI',
      'okko': 'OKKO',
      'cub': 'CUB'
    }, 'tmdb');
    select('start_page', {
      'main': 'Главная',
      'favorite@book': 'Закладки',
      'favorite@like': 'Нравится',
      'favorite@wath': 'Позже',
      'favorite@history': 'История просмотров',
      'mytorrents': 'Мои торренты',
      'last': 'Последняя'
    }, 'last');
    select('scroll_type', {
      'css': 'CSS',
      'js': 'Javascript'
    }, 'css');
    select('card_views_type', {
      'preload': 'Подгружать',
      'view': 'Показать все'
    }, 'preload');
    select('navigation_type', {
      'controll': 'Пульт',
      'mouse': 'Пульт с мышкой'
    }, 'mouse');
    select('keyboard_type', {
      'lampa': 'Встроенная',
      'integrate': 'Системная'
    }, 'lampa');
    select('time_offset', {
      'n-5': '-5',
      'n-4': '-4',
      'n-3': '-3',
      'n-2': '-2',
      'n-1': '-1',
      'n0': '0',
      'n1': '1',
      'n2': '2',
      'n3': '3',
      'n4': '4',
      'n5': '5'
    }, 'n0');
    select('video_quality_default', {
      '480': '480p',
      '720': '720p',
      '1080': '1080p',
      '1440': '1440p',
      '2160': '2160p'
    }, '1080');
    /**
     * Добовляем триггеры
     */

    trigger('animation', true);
    trigger('background', true);
    trigger('torrserver_savedb', false);
    trigger('torrserver_preload', false);
    trigger('parser_use', false);
    trigger('cloud_use', false);
    trigger('account_use', false);
    trigger('torrserver_auth', false);
    trigger('mask', true);
    trigger('playlist_next', true);
    trigger('internal_torrclient', true);
    trigger('subtitles_stroke', true);
    trigger('subtitles_backdrop', false);
    trigger('screensaver', true);
    trigger('proxy_tmdb', true);
    trigger('proxy_other', true);
    trigger('parse_in_search', false);
    trigger('subtitles_start', false);
    trigger('helper', true);
    trigger('light_version', false);
    trigger('player_normalization', false);
    /**
     * Добовляем поля
     */

    select('jackett_url', '', '');
    select('jackett_key', '', '');
    select('torrserver_url', '', '');
    select('torrserver_url_two', '', '');
    select('torrserver_login', '', '');
    select('torrserver_password', '', '');
    select('parser_website_url', '', '');
    select('torlook_site', '', 'w41.torlook.info');
    select('cloud_token', '', '');
    select('account_email', '', '');
    select('account_password', '', '');
    select('device_name', '', 'Lampa');
    select('player_nw_path', '', 'C:/Program Files/VideoLAN/VLC/vlc.exe');
    var Params = {
      listener: listener$1,
      init: init$2,
      bind: bind,
      update: update,
      field: field$1,
      select: select,
      trigger: trigger
    };

    var listener = start$3();

    function get$1(name, empty) {
      var value = window.localStorage.getItem(name) || empty || '';
      var convert = parseInt(value);
      if (!isNaN(convert) && /^\d+$/.test(value)) return convert;

      if (value == 'true' || value == 'false') {
        return value == 'true' ? true : false;
      }

      try {
        value = JSON.parse(value);
      } catch (error) {}

      return value;
    }

    function value(name, empty) {
      return window.localStorage.getItem(name) || empty || '';
    }

    function set(name, value, nolisten) {
      try {
        if (Arrays.isObject(value) || Arrays.isArray(value)) {
          var str = JSON.stringify(value);
          window.localStorage.setItem(name, str);
        } else {
          window.localStorage.setItem(name, value);
        }
      } catch (e) {}

      if (!nolisten) listener.send('change', {
        name: name,
        value: value
      });
    }

    function add(name, new_value) {
      var list = get$1(name, '[]');

      if (list.indexOf(new_value) == -1) {
        list.push(new_value);
        set(name, list);
        listener.send('add', {
          name: name,
          value: new_value
        });
        return true;
      }
    }

    function field(name) {
      return Params.field(name);
    }

    function cache(name, max, empty) {
      var result = get$1(name, JSON.stringify(empty));

      if (Arrays.isObject(empty)) {
        var keys = Arrays.getKeys(result);

        if (keys.length > max) {
          var remv = keys.slice(0, keys.length - max);
          remv.forEach(function (k) {
            delete result[k];
          });
          set(name, result);
        }
      } else if (result.length > max) {
        result = result.slice(result.length - max);
        set(name, result);
      }

      return result;
    }

    var Storage = {
      listener: listener,
      get: get$1,
      set: set,
      field: field,
      cache: cache,
      add: add,
      value: value
    };

    function init$1() {
      if (typeof webOS !== 'undefined' && webOS.platform.tv === true) {
        Storage.set('platform', 'webos');
        webOS.deviceInfo(function (e) {
          webOS.sdk_version = parseFloat(e.sdkVersion);
        });
      } else if (typeof webapis !== 'undefined' && typeof tizen !== 'undefined') {
        Storage.set('platform', 'tizen');
        tizen.tvinputdevice.registerKey("MediaPlayPause");
        tizen.tvinputdevice.registerKey("MediaPlay");
        tizen.tvinputdevice.registerKey("MediaStop");
        tizen.tvinputdevice.registerKey("MediaPause");
        tizen.tvinputdevice.registerKey("MediaRewind");
        tizen.tvinputdevice.registerKey("MediaFastForward");
      } else if (navigator.userAgent.toLowerCase().indexOf("lampa_client") > -1) {
        Storage.set('platform', 'android');
      } else if (typeof nw !== 'undefined') {
        Storage.set('platform', 'nw');
      } else if (navigator.userAgent.toLowerCase().indexOf("windows nt") > -1) {
        Storage.set('platform', 'browser');
      } else if (navigator.userAgent.toLowerCase().indexOf("maple") > -1) {
        Storage.set('platform', 'orsay');
      } else {
        Storage.set('platform', '');
      }

      Storage.set('native', Storage.get('platform') ? true : false);
    }
    /**
     * Какая платформа
     * @returns String
     */


    function get() {
      return Storage.get('platform', '');
    }
    /**
     * Если это платформа
     * @param {String} need - какая нужна? tizen, webos, android, orsay
     * @returns Boolean
     */


    function is(need) {
      return get() == need ? true : false;
    }
    /**
     * Если хоть одна из платформ tizen, webos, android
     * @returns Boolean
     */


    function any() {
      return is('tizen') || is('webos') || is('android') || is('nw') ? true : false;
    }
    /**
     * Если это именно телек
     * @returns Boolean
     */


    function tv() {
      return is('tizen') || is('webos') || is('orsay') ? true : false;
    }

    var Platform = {
      init: init$1,
      get: get,
      any: any,
      is: is,
      tv: tv
    };

    var initialized = false;

    function init() {
      if (initialized) {
        return;
      }

      initialized = true;
      Keypad.init();
      Keypad.enable(); // Controller.listener.follow('toggle',() => {})

      Navigator.follow('focus', function (event) {
        Controller.focus(event.elem);
      });
      if (Utils.isTouchDevice()) $('body').addClass('touch-device');
    }

    window.Lampa = {
      init: init,
      Player: Player,
      PlayerVideo: PlayerVideo,
      PlayerInfo: PlayerInfo,
      PlayerPanel: PlayerPanel,
      PlayerPlaylist: PlayerPlaylist,
      Utils: Utils
    };

})();
