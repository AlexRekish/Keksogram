;"use strict";
import {commons} from './commons';
export const gallery = (function() {
    let overlayPicture = document.querySelector('.gallery-overlay');
    let overlayImage = overlayPicture.querySelector('.gallery-overlay-image');
    let overlayLikes = overlayPicture.querySelector('.likes-count');
    let overlayComments = overlayPicture.querySelector('.comments-count');
    let closeButton = overlayPicture.querySelector('.gallery-overlay-close');
    let overlayLeftSide;
    let overlayRightSide;
    let targetImage;
    closeButton.setAttribute('tabindex', 0);

    // функция открытия поп-апа с изображением; @evt = event

    function openPopup(evt) {
        evt.preventDefault();
        targetImage = evt.target;
        if (!evt.target.classList.contains('pictures')) {
            overlayImage.src = evt.target.parentNode.querySelector('img').src;
            overlayLikes.textContent = evt.target.parentNode.querySelector('.picture-likes').textContent;
            overlayComments.textContent = evt.target.parentNode.querySelector('.picture-comments').textContent;
            overlayPicture.classList.remove('hidden');
            overlayLeftSide = overlayImage.getBoundingClientRect().left;
            overlayRightSide = overlayImage.getBoundingClientRect().right;
            document.addEventListener('keydown', closeOnEscPress);
            closeButton.addEventListener('click', closePopup);
            closeButton.addEventListener('keydown', closeOnEnterPress);
            overlayPicture.addEventListener('click', switchImage);     
            document.addEventListener('keydown', arrowNext);   
            document.addEventListener('keydown', arrowPrev);   
        }
    }

    // функция закрытия поп-апа с изображением; @evt = event

    function closePopup(evt) {
        evt.preventDefault();
        overlayPicture.classList.add('hidden');
        document.removeEventListener('keydown', closeOnEscPress);
        closeButton.removeEventListener('click', closePopup);
        closeButton.removeEventListener('keydown', closeOnEnterPress);
        overlayPicture.removeEventListener('click', switchImage);
        document.removeEventListener('keydown', arrowNext);
        document.removeEventListener('keydown', arrowPrev);
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

    // функция перелистывания изображений поп-апа кликом мыши; @overlayEvt = event

    function switchImage(overlayEvt) {
        overlayEvt.preventDefault();
        if (overlayEvt.clientX > overlayRightSide) {
            switchNext();
        } else if (overlayEvt.clientX < overlayLeftSide) {
            switchPrev();
        }
    } 

    // функция перелистывания изображений поп-апа вправо

    function switchNext() {
        let nextLink;
        if (targetImage.parentNode === targetImage.parentNode.parentNode.lastElementChild) {
            nextLink = targetImage.parentNode.parentNode.firstElementChild;
        } else nextLink = targetImage.parentNode.nextSibling;
        overlayImage.src = nextLink.querySelector('img').src;
        overlayLikes.textContent = nextLink.querySelector('.picture-likes').textContent;
        overlayComments.textContent = nextLink.querySelector('.picture-comments').textContent;
        targetImage = nextLink.querySelector('img');
    }

    // функция перелистывания изображений поп-апа влево

    function switchPrev() {
        let prevLink;
        if (targetImage.parentNode === targetImage.parentNode.parentNode.firstElementChild) {
            prevLink = targetImage.parentNode.parentNode.lastElementChild;
        } else prevLink = targetImage.parentNode.previousSibling;
        overlayImage.src = prevLink.querySelector('img').src;
        overlayLikes.textContent = prevLink.querySelector('.picture-likes').textContent;
        overlayComments.textContent = prevLink.querySelector('.picture-comments').textContent;
        targetImage = prevLink.querySelector('img');
    }

    // функция перелистывания изображений поп-апа вправо клавишей right; @keyEvt = event

    function arrowNext(keyEvt) {
        keyEvt.preventDefault();
        if (commons.onRightPress(keyEvt)) {
            switchNext();
        }
    }

    // функция перелистывания изображений поп-апа влево клавишей left; @keyEvt = event

    function arrowPrev(keyEvt) {
        keyEvt.preventDefault();
        if (commons.onLeftPress(keyEvt)) {
            switchPrev();
        }
    }

    return {
        openPopup
    };
})();