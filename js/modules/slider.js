;"use strict";
import {form} from "./form";
export const slider = (function() {
    let scaleLine = document.querySelector('.upload-effect-level-line');
    let pin = scaleLine.querySelector('.upload-effect-level-pin');
    let scaleActive = scaleLine.querySelector('.upload-effect-level-val');
    let scaleContainer = document.querySelector('.upload-effect-level');
    let shift = 25;

    pin.addEventListener('mousedown', onSliderPinActive);
    scaleContainer.addEventListener('click', onSliderPinMove);
    
    // функция обработки mousedown при перетягивании ползунка

    function onSliderPinActive(evt) {
        evt.preventDefault();
        document.addEventListener('mousemove', onSliderPinMove);
        document.addEventListener('mouseup', onSliderPinDrop);
    }

    // функция обработки mousemove и рассчета положения ползунка в процентах 
    
    function onSliderPinMove(evt) {
        const scaleMax = scaleLine.getBoundingClientRect().right;
        const scaleMin = scaleLine.getBoundingClientRect().left;
        let currentX = evt.clientX;
        currentX > scaleMax ? currentX = scaleMax : currentX;
        currentX < scaleMin ? currentX = scaleMin : currentX;
        shift = parseInt((currentX - scaleMin) * 100 / (scaleMax - scaleMin), 10);
        slider.shift = parseInt((currentX - scaleMin) * 100 / (scaleMax - scaleMin), 10);
        pin.style.left = `${shift}%`;
        scaleActive.style.width = `${shift}%`;
        form.changeImageFilterValue();
    }
    
    // функция обработки mouseup при перетягивании ползунка

    function onSliderPinDrop(evt) {
        evt.preventDefault();
        document.removeEventListener('mousemove', onSliderPinMove);
        document.removeEventListener('mouseup', onSliderPinDrop);
    }
    
    return {
        shift,
        pin,
        scaleActive
    };
})();