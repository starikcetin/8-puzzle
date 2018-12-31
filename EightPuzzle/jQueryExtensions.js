(function ($) {

    $.fn.nextCircular = function ()
    {
        if (this.next().length === 0) {
            return this.siblings().first();
        } else {
            return this.next();
        }
    };

}(jQuery));


