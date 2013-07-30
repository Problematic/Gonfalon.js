(function (global) {
    "use strict";

    var Mask = function (set, flags) {
        if (!(this instanceof Mask)) {
            return new Mask(flags);
        }

        flags = flags || [];

        var mask = 0;
        for (var i = 0; i < flags.length; i++) {
            mask |= set[flags[i]];
        }

        this._value = mask;
        this._set = set;
    };

    Mask.prototype.value = function () {
        return this._value;
    };

    Mask.prototype.and = Mask.prototype.has = function (key) {
        return (this.value() & this._set[key]) !== 0;
    };

    Mask.prototype.or = Mask.prototype.on = function (mask) {
        if (mask instanceof Mask) {
            mask = mask.value();
        } else if (typeof mask === 'string') {
            mask = this._set[mask];
        }

        this._value |= mask;
        return this._value;
    };

    Mask.prototype.xor = Mask.prototype.toggle = function (mask) {
        if (mask instanceof Mask) {
            mask = mask.value();
        } else if (typeof mask === 'string') {
            mask = this._set[mask];
        }

        this._value ^= mask;
        return this._value;
    };

    Mask.prototype.nand = Mask.prototype.off = function (mask) {
        if (mask instanceof Mask) {
            mask = mask.value();
        } else if (typeof mask === 'string') {
            mask = this._set[mask];
        }

        this._value &= ~mask;
        return this._value;
    };


    var Gonfalon = function (flags) {
        if (!(this instanceof Gonfalon)) {
            return new Gonfalon(flags);
        }

        if (!(flags instanceof Array)) {
            flags = Array.prototype.slice.call(arguments);
        }

        this._next = 1;
        this._flags = {};

        for (var i = 0; i < flags.length; i++) {
            this._flags[flags[i]] = this._next;
            this._next *= 2;
        }
    };

    Gonfalon.prototype.value = function value (key) {
        return this._flags[key];
    };

    Gonfalon.prototype.mask = function mask (flags) {
        if (!(flags instanceof Array)) {
            flags = Array.prototype.slice.call(arguments);
        }

        return new Gonfalon.Mask(this._flags, flags);
    };


    Gonfalon.Mask = Mask;

    if (typeof exports !== 'undefined') {
        if (typeof module !== 'undefined' && module.exports) {
            exports = module.exports = Gonfalon;
        }
        exports.Gonfalon = Gonfalon;
    } else {
        global.Gonfalon = Gonfalon;
    }
}(this));
