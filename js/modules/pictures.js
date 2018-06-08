import {commons} from './commons';
import {popupImage} from './popupImage';
import {form} from './form';
"use strict";
(function() {
    let comments = ['Всё отлично!', 
                    'В целом всё неплохо. Но не всё.', 
                    'Когда  вы  делаете  фотографию,  хорошо  бы  убирать  палец  из кадра. В конце концов это просто непрофессионально.', 
                    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
                    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
                    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент ? !'];
    let generatedPictures = [];

    // функция генерации рандомных комментариев

    function getRandomComments() {
        let count = commons.getRandom(1, 2);
        let randomComments = [];
        for (let i = 0; i < count; i++) {
            randomComments.push(comments[commons.getRandom(0, comments.length - 1)]);
        }
        return randomComments;
    }

    // функция генерации массива объектов с фотографиями

    function generatePictures() {
        for (let i = 0; i < 26; i++) {
            generatedPictures[i] = {
                url: `photos/${i + 1}.jpg`,
                likes: commons.getRandom(15, 200),
                comments: getRandomComments()
            };
        }
    }

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
        generatePictures();
        generatedPictures.sort(commons.randomSort);
        let pictureFragment = document.createDocumentFragment();
        generatedPictures.forEach(current => {
            pictureFragment.appendChild(createPictureObjects(current));
        }); 
        picturesContainer.appendChild(pictureFragment);
    }

    renderPictures();
    picturesContainer.addEventListener('click', popupImage.openPopup);
})();