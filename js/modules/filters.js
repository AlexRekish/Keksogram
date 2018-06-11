;"use strict";
import {data} from './data';
import {pictures} from './pictures';
export const filters = (function() {
    let filters = document.querySelector('.filters');
    let picturesContainer = document.querySelector('.pictures');
    let timerId;

    filters.classList.remove('hidden');
    filters.addEventListener('change', () => {
        clearTimeout(timerId);
        timerId = setTimeout(() => {
        setPictureSort();
        }, 300)
    });

    // функция сортировки изображений в зависимости от выбранного фильтра сортировки

    function setPictureSort() {
        let filter = document.querySelector('input[name = filter]:checked').value;
        const pictureFilters = {
            recommend: data.generatedPictures,
            popular: data.getPopularPictures(),
            discussed: data.getDicsussedPictures(),
            random: data.getRandomPictures()
       };
       picturesContainer.innerHTML = '';
       pictures.renderPictures(pictureFilters[filter]);
    }
    
    return {
        setPictureSort
    };
})();