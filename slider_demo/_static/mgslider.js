/*
Copyright (C) 2022 Max R. P. Grossmann

This program is free software; you can redistribute it and/or
modify it under the terms of the GNU Lesser General Public
License as published by the Free Software Foundation; either
version 3 of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
Lesser General Public License for more details.

You should have received a copy of the GNU Lesser General Public License
along with this program; if not, write to the Free Software Foundation,
Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
*/

var mgsliders = Array();

mgsliders.lookup = function (which) { //lookup遍历mgsliders数组，查找其内部对象的field属性是否与“which”匹配，
    for (var j = 0; j < mgsliders.length; j++) {
        if (mgsliders[j].field == which) {
            return mgsliders[j].obj; //如果匹配，返回该对象‘obj’属性，否则返回undefined
        }
    }

    return undefined;
};

//定义构造滑块对象的函数
function mgslider(field, min, max, step) {
    this.field = field;
    this.min = parseFloat(min);
    this.max = parseFloat(max);
    this.step = parseFloat(step);
    this.digits = this.suggest_digits(step);
    this.hook = function (slider, value) {};

    this.prefix = "mgslider_yF5sTZLy";
    this.yourvalue = "あなた今の推測";

    mgsliders.push({field: field, obj: this});
}

//返回字符串‘s’从末尾开始的第一个非零字符的位置
mgslider.prototype.fzero = function (s) {
    for (var c = s.length-1; c >= 0; c--) {
        if (s[c] != "0") {
            return c;
        }
    }

    return 0;
};

//推测一个数‘x’应有的小数位数。
//首先将数字固定为10位小数，然后返回小数点之后的非零数字的数量。
mgslider.prototype.suggest_digits = function (x) {
    x = x.toFixed(10);
    return this.fzero(x) - x.search(/\./);
};

//将一个浮点数 val 转换为字符串
mgslider.prototype.f2s = function (val, detect, digits) {
    if (digits) {
        return val.toFixed(digits).replace("-", "&ndash;");
    }
    else if (detect) {
        return val.toFixed(this.suggest_digits(val)).replace("-", "&ndash;");
    }
    else {
        return val.toFixed(this.digits).replace("-", "&ndash;");
    }
};

//返回一个基于当前滑块对象的属性和传入参数‘id_’的id字符串
mgslider.prototype.id = function (id_) {
    if (id_ === undefined) {
        id_ = "";
    }

    return this.prefix + "_" + this.field + "_" + id_;
};

// mgslider.prototype.markup = function () {
//     return "\
//         <table id='" + this.id("wrapper") + "' class='mgslider-wrapper' border='0'>\
//             <tr>\
//                 <td class='mgslider-limit'>" + this.f2s(this.min, true) + "</td>\
//                 <td width='100%'>\
//                     <div id='" + this.id("before") + "' class='mgslider-before' onclick='mgsliders.lookup(\"" + this.field + "\").reveal(event)'></div>\
//                     <input type='range' id='" + this.id() + "' min='" + this.min + "' max='" + this.max + "' step='" + this.step + "' value='' class='mgslider form-range' oninput='mgsliders.lookup(\"" + this.field + "\").change()' onchange='mgsliders.lookup(\"" + this.field + "\").change()'>\
//                 </td>\
//                 <td class='mgslider-limit'>" + this.f2s(this.max, true) + "</td>\
//             </tr>\
//             <tr class='mgslider-feedback'>\
//                 <td id='" + this.id("show") + "' class='mgslider-show' colspan='3'>" + this.yourvalue + ": <b><span id='" + this.id("cur") + "' class='mgslider-value'></span></b></td>\
//             </tr>\
//         </table>\
//         \
//         <input type='hidden' id='" + this.id("input") + "' name='" + this.field + "' value='' />";
// };

mgslider.prototype.markup = function () {
    return "\
        <table id='" + this.id("wrapper") + "' class='mgslider-wrapper' border='0'>\
            <tr>\
                <td class='mgslider-limit' style='font-size:1em;' >" + this.f2s(this.min, true) + "</td>\
                <td></td>\
                <td class='mgslider-limit_max' style='font-size:1em;' >" + this.f2s(this.max, true) + "</td>\
            </tr>\
            <tr>\
                <td width='100%' colspan='3'>\
                    <div id='" + this.id("before") + "' class='mgslider-before' onclick='mgsliders.lookup(\"" + this.field + "\").reveal(event)'></div>\
                    <input type='range' id='" + this.id() + "' min='" + this.min + "' max='" + this.max + "' step='" + this.step + "' value='' class='mgslider form-range' oninput='mgsliders.lookup(\"" + this.field + "\").change()' onchange='mgsliders.lookup(\"" + this.field + "\").change()'>\
                </td>\
            </tr>\
            <tr>\
                <td style='font-size:1em;' ><b>偽</b></td>\
                <td ></td>\
                <td style='font-size:1em;' class='rightalign'><b>真</b></td>\
            </tr>\
            <tr class='mgslider-feedback'>\
                <td id='" + this.id("show") + "' class='mgslider-show' colspan='3'>" + this.yourvalue + ":  <b><span id='" + this.id("cur") + "' class='mgslider-value'></span></b></td>\
            </tr>\
        </table>\
        \
        <input type='hidden' id='" + this.id("input") + "' name='" + this.field + "' value='' />";
};


mgslider.prototype.hide = function () {
    document.getElementById(this.id()).style.display = "none";
    document.getElementById(this.id("show")).style.visibility = "hidden";
    document.getElementById(this.id("show")).style.textAlign = "center";
    document.getElementById(this.id("before")).style.display = "block";
};

mgslider.prototype.print = function (el) {
    el.innerHTML += this.markup();
    this.hide();
};

mgslider.prototype.value = function () {
    return parseFloat(document.getElementById(this.id()).value);
};

mgslider.prototype.change = function (target, omit_hook) {
    if (typeof target === "undefined") {
        var value = this.value();
    }
    else {
        var value = target;

        document.getElementById(this.id()).value = value;
    }

    document.getElementById(this.id("cur")).innerHTML = this.f2s(value, false);
    document.getElementById(this.id("input")).value = value;

    if (omit_hook !== true) {
        return this.hook(this, value);
    }
};

mgslider.prototype.reveal = function (event) {
    var now;

    if (event !== undefined && typeof event.offsetX !== undefined) {
        var max = parseInt(getComputedStyle(document.getElementById(this.id("before"))).width.replace("px", ""));
        var cur = event.offsetX;

        now = (cur/max)*(this.max-this.min) + this.min;
    }
    else {
        now = this.min + Math.random()*(this.max - this.min);
    }

    now = Math.round(now/this.step)*this.step;

    document.getElementById(this.id()).style.display = "block";
    document.getElementById(this.id("before")).style.display = "none";
    document.getElementById(this.id("show")).style.visibility = "visible";

    document.getElementById(this.id()).value = now;
    this.change();
};
