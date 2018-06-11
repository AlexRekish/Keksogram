;"use strict";
import {gallery} from './gallery';
import {form} from './form';

export const pictures = (function() {
    let pictureTemplate = document.querySelector('#picture-template').content.querySelector('.picture');
    let picturesContainer = document.querySelector('.pictures');
    
    // функция создания объекта с фото; @pictureItem - элемент массива generatedPictures

    function createPictureObjects(pictureItem) {
        let pictureElement = pictureTemplate.cloneNode(true);
        pictureElement.querySelector('img').src = pictureItem.url;
        pictureElement.querySelector('.picture-likes').textContent = pictureItem.likes;
        pictureElement.querySelector('.picture-comments').textContent = pictureItem.comments.length;
        return pictureElement;
    }

    //функция отрисовки фото на страницу; @array - отсортированный массив объектов с фото 

    function renderPictures(array) {
        let pictureFragment = document.createDocumentFragment();
        array.forEach(current => {
            pictureFragment.appendChild(createPictureObjects(current));
        }); 
        picturesContainer.appendChild(pictureFragment);
    }

    picturesContainer.addEventListener('click', gallery.openPopup);

    return {
        renderPictures,
        picturesContainer
    }
})();