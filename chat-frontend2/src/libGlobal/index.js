var formatMoney = require("./formatMoney");

exports.install = function (Vue) {
    Vue.prototype.libGlobal = {
        formatMoney: formatMoney.default
    };
};