import {commons} from './commons';
"use strict";
export let popupImage = (function() {
    let overlayPicture = document.querySelector('.gallery-overlay');
    let overlayImage = overlayPicture.querySelector('.gallery-overlay-image');
    let overlayLikes = overlayPicture.querySelector('.likes-count');
    let overlayComments = overlayPicture.querySelector('.comments-count');
    let closeButton = overlayPicture.querySelector('.gallery-overlay-close');
    closeButton.setAttribute('tabindex', 0);

    // функция открытия поп-апа с изображением; @evt = event

    function openPopup(evt) {
        evt.preventDefault();
        if (!evt.target.classList.contains('pictures')) {
            overlayImage.src = evt.target.parentNode.querySelector('img').src;
            overlayLikes.textContent = evt.target.parentNode.querySelector('.picture-likes').textContent;
            overlayComments.textContent = evt.target.parentNode.querySelector('.picture-comments').textContent;
            overlayPicture.classList.remove('hidden');
            document.addEventListener('keydown', closeOnEscPress);
            closeButton.addEventListener('click', closePopup);
            closeButton.addEventListener('keydown', closeOnEnterPress);
        }
    }

    // функция закрытия поп-апа с изображением; @evt = event

    function closePopup(evt) {
        evt.preventDefault();
        overlayPicture.classList.add('hidden');
        document.removeEventListener('keydown', closeOnEscPress);
        closeButton.removeEventListener('click', closePopup);
        closeButton.removeEventListener('keydown', closeOnEnterPress);
    }

    // функция закрытия поп-апа с изображением по нажатию Esc; @keyEvt = event

    function closeOnEscPress(keyEvt) {
        if (commons.onEscPress(keyEvt)) {
            keyEvt.preventDefault();
            closePopup(keyEvt);
        }
    }

    // функция закрытия поп-апа с изображением по нажатию на крестик Enter'ом; @keyEvt = event

    function closeOnEnterPress(keyEvt) {
        if (commons.onEnterPress(keyEvt)) {
            closePopup(keyEvt);
        }
    }

    return {
        openPopup
    };
})();