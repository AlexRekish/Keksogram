"use strict";
;window.keks = {};
(function() {
    const ESC_KEYCODE = 27;
    const ENTER_KEYCODE = 13;

    // рандомайзер значений в заданном диапазоне 

    function getRandom(min, max) {
        min -= 0.5;
        max += 0.5;
        return Math.round(Math.random() * (max - min) + min);
    }

    //функция рандомной сортировки

    function randomSort() {
        return Math.random() - 0.5;
    }
    // функция сравнения нажатой клавиши с Esc; @keyEvt = event;

    function onEscPress(keyEvt) {
        return (keyEvt.keyCode === ESC_KEYCODE);
    }

    // функция сравнения нажатой клавиши с Enter; @keyEvt = event;

    function onEnterPress(keyEvt) {
        return (keyEvt.keyCode === ENTER_KEYCODE);
    }

    return window.keks.commons = {
        randomSort,
        getRandom,
        onEnterPress,
        onEscPress
    };

})();