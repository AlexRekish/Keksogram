;"use strict";
import {commons} from './commons';
import {gallery} from './gallery';
import {data} from './data';
import {form} from './form';

(function() {
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

    //функция отрисовки фото на страницы

    function renderPictures() {
        data.generatePictures();
        data.generatedPictures.sort(commons.randomSort);
        let pictureFragment = document.createDocumentFragment();
        data.generatedPictures.forEach(current => {
            pictureFragment.appendChild(createPictureObjects(current));
        }); 
        picturesContainer.appendChild(pictureFragment);
    }

    renderPictures();
    picturesContainer.addEventListener('click', gallery.openPopup);
})();