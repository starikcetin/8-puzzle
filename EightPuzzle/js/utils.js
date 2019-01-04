Array.prototype.randomElement = function () {
    return this[Math.floor(Math.random() * this.length)];
};

Array.prototype.swap = function (i1, i2) {
    const val1 = this[i1];
    this[i1] = this[i2];
    this[i2] = val1;
};

Array.prototype.exceptValue = function (val) {
    return this.slice(0).filter(n => n !== val);
};

Array.prototype.exceptIndex = function (index) {
    var length = this.length;
    var before = this.slice(0, index);
    var after = this.slice(index + 1, length);
    return before.concat(after);
};
