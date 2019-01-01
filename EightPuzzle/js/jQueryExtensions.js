(function ($) {

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
            var w = it.width();
            var h = it.height();

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

}(jQuery));
