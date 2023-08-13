(function ($) {

    $(function () {
        // https://github.com/jquery/jquery/issues/4007#issuecomment-372592926
        $.cssNumber.gridColumnStart = true;
        $.cssNumber.gridColumnEnd = true;
        $.cssNumber.gridRowStart = true;
        $.cssNumber.gridRowEnd = true;
    });

    $.fn.nextCircular = function () {
        if (this.siblings().length === 0) {
            console.warn("nextCircular: "
                + "this has no siblings. Returning this.");
            return this;
        }

        if (this.next().length === 0) {
            return this.siblings().first();
        } else {
            return this.next();
        }
    };

    // returns the setInterval id. 
    // so you can call clearInterval on it to stop the animation.
    $.fn.fadeCycleChildren = function (fadeOutT, fadeInT, delayT, stepCallback) {
        var children = this.children();

        if (children.length === 0) {
            console.warn("fadeCycleChildren: "
                + "this has no children. Returning.");
            return this;
        }

        if (children.length === 1) {
            console.warn("fadeCycleChildren: "
                + "this has only one children.");
        }

        var current = children.first();
        children.slice(1).css("display", "none");

        var totalT = fadeOutT + fadeInT + delayT;

        var step = function () {
            var next = current.nextCircular();

            current.fadeOut(fadeOutT, function () {
                if (stepCallback === undefined) {
                    next.fadeIn(fadeInT);
                } else {
                    next.fadeIn(fadeInT, stepCallback);
                }
            });

            current = next;
        };

        return setInterval(step, totalT);
    };

    $.fn.encapsulateLargestChild = function () {
        var children = this.children();

        if (children.length === 0) {
            console.warn("encapsulateLargestChild: "
                + "this has no children. Returning.");
            return this;
        }

        if (children.length === 1) {
            console.warn("encapsulateLargestChild: "
                + "this has only one children.");
        }

        var maxH = -1;
        var maxW = -1;

        children.each(function () {
            var it = $(this);
            
            var w = it.outerWidth();
            var h = it.outerHeight();

            if (w > maxW) {
                maxW = w;
            }

            if (h > maxH) {
                maxH = h;
            }
        });

        this.height(maxH);
        this.width(maxW);

        return this;
    };

    $.fn.gridRowCount = function () {
        return this.css("grid-template-rows").split(' ').length;
    };

    $.fn.gridColumnCount = function () {
        return this.css("grid-template-columns").split(' ').length;
    };

    $.fn.gridRowStart = function (value) {
        if (value === undefined) {
            return this.css("grid-row-start");
        } else {
            return this.css({"grid-row-start": value});
        }
    };

    $.fn.gridColumnStart = function (value) {
        if (value === undefined) {
            return this.css("grid-column-start");
        } else {
            return this.css({"grid-column-start": value});
        }
    };

    $.fn.gridRowEnd = function (value) {
        if (value === undefined) {
            return this.css("grid-row-end");
        } else {
            return this.css({"grid-row-end": value});
        }
    };

    $.fn.gridColumnEnd = function (value) {
        if (value === undefined) {
            return this.css("grid-column-end");
        } else {
            return this.css({"grid-column-end": value});
        }
    };

    $.fn.makeGridCellsUniformWithExplicitStartAndEnd = function () {
        if (this.css("display") !== "grid") {
            console.warn("makeGridPositionsExplicit: "
                + "this is not a CSS grid. Returning.");
            return this;
        }

        var children = this.children();

        if (children.length === 0) {
            console.warn("makeGridPositionsExplicit: "
                + "this has no children. Returning.");
            return this;
        }

        var columnCount = this.gridColumnCount();

        children.each(function (index) {
            var row = Math.floor(index / columnCount);
            var column = index % columnCount;

            var cell = $(this);

            cell.gridRowStart(row + 1);
            cell.gridRowEnd("span 1");
            cell.gridColumnStart(column + 1);
            cell.gridColumnEnd("span 1");
        });

        return this;
    };

    // Source: https://stackoverflow.com/a/2700029/6301627
    $.fn.disableSelection = function () {
        return this
            .attr('unselectable', 'on')
            .css('user-select', 'none')
            .on('selectstart', false);
    };

}(jQuery));
