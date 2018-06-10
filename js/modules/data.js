;"use strict";
import {commons} from './commons';
export const data = (function() {
    let comments = ['Всё отлично!',
        'В целом всё неплохо. Но не всё.',
        'Когда  вы  делаете  фотографию,  хорошо  бы  убирать  палец  из кадра. В конце концов это просто непрофессионально.',
        'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
        'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
        'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент ?!'
    ];
    let generatedPictures = [];
    let randomPictures = generatedPictures.slice();

    // функция генерации рандомных комментариев

    function getRandomComments() {
        let count = commons.getRandom(1, 30);
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

    function getPopularPictures() {
        let popularPictures = generatedPictures.slice();
        return popularPictures.sort((a, b) => {
            return b.likes - a.likes;
        });
    }

    function getDicsussedPictures() {
        let discussedPictures = generatedPictures.slice();
        return discussedPictures.sort((a, b) => {
            return b.comments.length - a.comments.length;
        });
    }

    function getRandomPictures() {
        let randomPictures = generatedPictures.slice();
        return randomPictures.sort(commons.randomSort);
    }

    generatePictures();

    return {
        generatedPictures,
        generatePictures,
        getPopularPictures,
        getDicsussedPictures,
        getRandomPictures
    };
})();