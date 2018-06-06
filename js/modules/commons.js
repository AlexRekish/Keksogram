"use strict";
;window.commons = (function() {

    // рандомайзер значений в заданном диапазоне 

    function getRandom(min, max) {
        min -= 0.5;
        max += 0.5;
        return Math.round(Math.random() * (max - min) + min);
    }

    return {
        getRandom
    };

})();