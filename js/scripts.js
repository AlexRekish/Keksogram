/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
;"use strict";
var commons = exports.commons = function () {
    var ESC_KEYCODE = 27;
    var ENTER_KEYCODE = 13;
    var RIGHT_KEYCODE = 39;
    var LEFT_KEYCODE = 37;

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
        return keyEvt.keyCode === ESC_KEYCODE;
    }

    // функция сравнения нажатой клавиши с Enter; @keyEvt = event;

    function onEnterPress(keyEvt) {
        return keyEvt.keyCode === ENTER_KEYCODE;
    }

    // функция сравнения нажатой клавиши с Right; @keyEvt = event;

    function onRightPress(keyEvt) {
        return keyEvt.keyCode === RIGHT_KEYCODE;
    }

    // функция сравнения нажатой клавиши с Left; @keyEvt = event;

    function onLeftPress(keyEvt) {
        return keyEvt.keyCode === LEFT_KEYCODE;
    }

    return {
        randomSort: randomSort,
        getRandom: getRandom,
        onEnterPress: onEnterPress,
        onEscPress: onEscPress,
        onLeftPress: onLeftPress,
        onRightPress: onRightPress
    };
}();

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.filters = undefined;

var _data = __webpack_require__(2);

var _pictures = __webpack_require__(5);

;"use strict";
var filters = exports.filters = function () {
    var filters = document.querySelector('.filters');
    var picturesContainer = document.querySelector('.pictures');
    var timerId = void 0;

    filters.classList.remove('hidden');
    filters.addEventListener('change', function () {
        clearTimeout(timerId);
        timerId = setTimeout(function () {
            setPictureSort();
        }, 300);
    });

    // функция сортировки изображений в зависимости от выбранного фильтра сортировки

    function setPictureSort() {
        var filter = document.querySelector('input[name = filter]:checked').value;
        var pictureFilters = {
            recommend: _data.data.generatedPictures,
            popular: _data.data.getPopularPictures(),
            discussed: _data.data.getDicsussedPictures(),
            random: _data.data.getRandomPictures()
        };
        picturesContainer.innerHTML = '';
        _pictures.pictures.renderPictures(pictureFilters[filter]);
    }

    return {
        setPictureSort: setPictureSort
    };
}();

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.data = undefined;

var _commons = __webpack_require__(0);

var _backend = __webpack_require__(3);

;"use strict";
var data = exports.data = function () {
    var comments = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда  вы  делаете  фотографию,  хорошо  бы  убирать  палец  из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент ?!'];
    var generatedPictures = [];
    var randomPictures = generatedPictures.slice();

    // функция генерации рандомных комментариев. При загрузке изображений через ajax не используется

    function getRandomComments() {
        var count = _commons.commons.getRandom(1, 30);
        var randomComments = [];
        for (var i = 0; i < count; i++) {
            randomComments.push(comments[_commons.commons.getRandom(0, comments.length - 1)]);
        }
        return randomComments;
    }

    // функция генерации массива объектов с фотографиями

    function generatePictures() {
        // for (let i = 0; i < 26; i++) {
        //     generatedPictures[i] = {
        //         url: `photos/${i + 1}.jpg`,
        //         likes: commons.getRandom(15, 200),
        //         comments: getRandomComments()
        //     };
        // }
        _backend.backend.downloadData(_backend.backend.onSuccess, _backend.backend.onError); // замена генерации массива изображений получением JSON через ajax
    }

    // функция сортировки фотографий по количеству лайков 

    function getPopularPictures() {
        generatedPictures = data.generatedPictures.slice();
        var popularPictures = generatedPictures.slice();
        return popularPictures.sort(function (a, b) {
            return b.likes - a.likes;
        });
    }

    // функция сортировки фотографий по количеству комментариев

    function getDicsussedPictures() {
        generatedPictures = data.generatedPictures.slice();
        var discussedPictures = generatedPictures.slice();
        return discussedPictures.sort(function (a, b) {
            return b.comments.length - a.comments.length;
        });
    }

    // функция сортировки фотографий в случайном порядке

    function getRandomPictures() {
        generatedPictures = data.generatedPictures.slice();
        var randomPictures = generatedPictures.slice();
        return randomPictures.sort(_commons.commons.randomSort);
    }

    generatePictures();

    return {
        generatedPictures: generatedPictures,
        generatePictures: generatePictures,
        getPopularPictures: getPopularPictures,
        getDicsussedPictures: getDicsussedPictures,
        getRandomPictures: getRandomPictures
    };
}();

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.backend = undefined;

var _filters = __webpack_require__(1);

var _data = __webpack_require__(2);

;"use strict";
var backend = exports.backend = function () {
    var downloadedData = [];

    // функция обработки успешной загрузки данных; @evt = event

    function onSuccess(evt) {
        try {
            downloadedData = JSON.parse(evt.target.responseText);
            // backend.downloadedData.length = 0;
            // backend.downloadedData = downloadedData.slice();
            _data.data.generatedPictures.length = 0;
            _data.data.generatedPictures = downloadedData.slice();
            _filters.filters.setPictureSort();
        } catch (error) {
            alert('\u041D\u0435\u043F\u0440\u0435\u0434\u0432\u0438\u0434\u0435\u043D\u043D\u0430\u044F \u043E\u0448\u0438\u0431\u043A\u0430 ' + error + ' \u0432 \u0434\u0430\u043D\u043D\u044B\u0445 :(');
        }
    }

    // функция обработки ошибок при загрузке данных; @evt = event

    function onError(evt) {
        var status = evt.target.status;
        var errorText = evt.target.statusText;
        alert('\u041E\u0448\u0438\u0431\u043A\u0430 ' + status + ' : ' + errorText);
    }

    // функция отправки формы с фото; @data - данные формы, @onError - колбэк обработки ошибок

    function uploadForm(data, onError) {
        var xhr = new XMLHttpRequest();
        xhr.timeout = 20000;
        var server = 'https://js.dump.academy/kekstagram';
        xhr.addEventListener('load', function (evt) {
            evt.target.status != 200 ? onError(evt) : alert('Данные успешно отправлены!');;
        });
        xhr.addEventListener('error', function () {
            alert('Ошибка передачи данных!');
        });

        xhr.addEventListener('timeout', function () {
            alert('\u0421\u0435\u0440\u0432\u0435\u0440 \u043D\u0435 \u043E\u0442\u0432\u0435\u0442\u0438\u043B \u0437\u0430 ' + xhr.timeout / 1000 + ' \u0441\u0435\u043A\u0443\u043D\u0434!');
        });

        xhr.open('POST', server);
        xhr.send(data);
    }

    //функция загрузки фото с сервера; @onSuccess, @onError - колбэки обработки успешной загрузки / ошибок

    function downloadData(onSuccess, onError) {
        var xhr = new XMLHttpRequest();
        xhr.timeout = 20000;
        var server = 'https://js.dump.academy/kekstagram/data';
        xhr.addEventListener('load', function (evt) {
            if (evt.target.status != 200) {
                onError(evt);
            } else return onSuccess(evt);
        });
        xhr.addEventListener('error', function () {
            alert('Ошибка загрузки данных!');
        });

        xhr.addEventListener('timeout', function () {
            alert('Сервер не ответил за 20 секунд!');
        });

        xhr.open('GET', server);
        xhr.send();
    }

    return {
        uploadForm: uploadForm,
        downloadData: downloadData,
        onError: onError,
        onSuccess: onSuccess,
        downloadedData: downloadedData
    };
}();

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.form = undefined;

var _validation = __webpack_require__(7);

var _commons = __webpack_require__(0);

var _slider = __webpack_require__(8);

var _backend = __webpack_require__(3);

;"use strict";
var form = exports.form = function () {
    var uploadForm = document.querySelector('.upload-form');
    var uploadImageField = uploadForm.querySelector('#upload-file');
    var uploadOverlay = uploadForm.querySelector('.upload-overlay');
    var commentsArea = uploadForm.querySelector('.upload-form-description');
    var decResizeButton = uploadForm.querySelector('.upload-resize-controls-button-dec');
    var incResizeButton = uploadForm.querySelector('.upload-resize-controls-button-inc');
    var resizeValue = uploadForm.querySelector('.upload-resize-controls-value');
    var previewImage = uploadForm.querySelector('.effect-image-preview');
    var effectControls = uploadForm.querySelector('.upload-effect-controls');
    var closeUploadOverlay = uploadOverlay.querySelector('.upload-form-cancel');
    var preview = uploadForm.querySelector('.effect-image-preview');
    var scaleContainer = document.querySelector('.upload-effect-level');
    var RESIZE_STEP = 25;
    var RESIZE_MIN = 25;
    var RESIZE_MAX = 100;

    uploadForm.setAttribute('action', 'https://js.dump.academy/kekstagram');
    uploadImageField.addEventListener('change', function () {
        if (_validation.validation.checkFileType(uploadImageField)) {
            var reader = new FileReader();
            reader.addEventListener('load', function () {
                preview.src = reader.result;
            });
            reader.readAsDataURL(uploadImageField.files[0]);
            showUploadForm();
        } else {
            alert('Неверный тип файла! Допустимо использовать только .jpg или .png изображения!');
            uploadImageField.setCustomValidity('Неверный тип файла! Допустимо использовать только .jpg или .png изображения!');
        }
    });

    // функция показа настроек загружаемого изображения;

    function showUploadForm() {
        scaleContainer.classList.add('hidden');
        uploadOverlay.classList.remove('hidden');
        closeUploadOverlay.addEventListener('click', closeUploadForm);
        document.addEventListener('keydown', cancelUploadOnEsc);
    }

    // функция закрытия настроек загружаемого изображения; @evt = event

    function closeUploadForm() {
        uploadOverlay.classList.add('hidden');
        closeUploadOverlay.removeEventListener('click', closeUploadForm);
        document.removeEventListener('keydown', cancelUploadOnEsc);
        uploadForm.reset();
        previewImage.style = 'none';
    }

    // функция закрытия настроек загружаемого изображения клавишей Esc; @keyEvt = event

    function cancelUploadOnEsc(keyEvt) {
        if (_commons.commons.onEscPress(keyEvt) && commentsArea !== document.activeElement) {
            keyEvt.preventDefault();
            closeUploadForm();
        }
    }

    commentsArea.setAttribute('maxlength', 140);
    resizeValue.value = RESIZE_MAX + '%';
    var resizeImageValue = parseInt(resizeValue.value, 10);
    decResizeButton.addEventListener('click', decPictureSize);
    incResizeButton.addEventListener('click', incPictureSize);

    // функция уменьшения масштаба загружаемого изображения; @evt = event

    function decPictureSize(evt) {
        evt.preventDefault();
        resizeImageValue > RESIZE_MIN ? resizeImageValue -= RESIZE_STEP : resizeImageValue;
        if (resizeImageValue < RESIZE_MIN) resizeImageValue = RESIZE_MIN;
        resizeValue.value = resizeImageValue + '%';
        previewImage.style.transform = 'scale(' + resizeImageValue / 100 + ')';
    }

    // функция увеличения масштаба загружаемого изображения; @evt = event

    function incPictureSize(evt) {
        evt.preventDefault();
        resizeImageValue < RESIZE_MAX ? resizeImageValue += RESIZE_STEP : resizeImageValue;
        if (resizeImageValue > RESIZE_MAX) resizeImageValue = RESIZE_MAX;
        resizeValue.value = resizeImageValue + '%';
        previewImage.style.transform = 'scale(' + resizeImageValue / 100 + ')';
    }

    effectControls.addEventListener('change', setImageFilter);

    // функция выбора фильтра загружаемого изображения; @evt = event

    function setImageFilter(evt) {
        var effect = evt.target.value;
        _slider.slider.pin.style = 'none';
        _slider.slider.scaleActive.style = 'none';
        _slider.slider.shift = 25;
        evt.target.classList.add('filter-' + effect);
        changeImageFilterValue();
    }

    // функция настройки фильтра загружаемого изображения

    function changeImageFilterValue() {
        var filterValue = _slider.slider.shift;
        var target = uploadForm.querySelector('input[name=effect]:checked');
        var filter = target.value;
        var filters = {
            none: 'none',
            chrome: 'grayscale(' + filterValue / 100 + ')',
            sepia: 'sepia(' + filterValue / 100 + ')',
            marvin: 'invert(' + filterValue + '%)',
            phobos: 'blur(' + filterValue / 100 * 3 + 'px)',
            heat: 'brightness(' + filterValue / 100 * 3 + ')'
        };

        filter !== 'none' ? scaleContainer.classList.remove('hidden') : scaleContainer.classList.add('hidden');
        target.style.filter = 'none';
        previewImage.style.filter = filters[filter];
    }

    uploadForm.addEventListener('submit', function (evt) {
        evt.preventDefault();
        _backend.backend.uploadForm(new FormData(uploadForm), _backend.backend.onError);
        closeUploadForm();
    });

    return {
        uploadImageField: uploadImageField,
        changeImageFilterValue: changeImageFilterValue
    };
}();

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.pictures = undefined;

var _gallery = __webpack_require__(6);

var _form = __webpack_require__(4);

;"use strict";
var pictures = exports.pictures = function () {
    var pictureTemplate = document.querySelector('#picture-template').content.querySelector('.picture');
    var picturesContainer = document.querySelector('.pictures');

    // функция создания объекта с фото; @pictureItem - элемент массива generatedPictures

    function createPictureObjects(pictureItem) {
        var pictureElement = pictureTemplate.cloneNode(true);
        pictureElement.querySelector('img').src = pictureItem.url;
        pictureElement.querySelector('.picture-likes').textContent = pictureItem.likes;
        pictureElement.querySelector('.picture-comments').textContent = pictureItem.comments.length;
        return pictureElement;
    }

    //функция отрисовки фото на страницу; @array - отсортированный массив объектов с фото 

    function renderPictures(array) {
        var pictureFragment = document.createDocumentFragment();
        array.forEach(function (current) {
            pictureFragment.appendChild(createPictureObjects(current));
        });
        picturesContainer.appendChild(pictureFragment);
    }

    picturesContainer.addEventListener('click', _gallery.gallery.openPopup);

    return {
        renderPictures: renderPictures,
        picturesContainer: picturesContainer
    };
}();

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.gallery = undefined;

var _commons = __webpack_require__(0);

;"use strict";
var gallery = exports.gallery = function () {
    var overlayPicture = document.querySelector('.gallery-overlay');
    var overlayImage = overlayPicture.querySelector('.gallery-overlay-image');
    var overlayLikes = overlayPicture.querySelector('.likes-count');
    var overlayComments = overlayPicture.querySelector('.comments-count');
    var closeButton = overlayPicture.querySelector('.gallery-overlay-close');
    var overlayLeftSide = void 0;
    var overlayRightSide = void 0;
    var targetImage = void 0;
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
        if (_commons.commons.onEscPress(keyEvt)) {
            keyEvt.preventDefault();
            closePopup(keyEvt);
        }
    }

    // функция закрытия поп-апа с изображением по нажатию на крестик Enter'ом; @keyEvt = event

    function closeOnEnterPress(keyEvt) {
        if (_commons.commons.onEnterPress(keyEvt)) {
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
        var nextLink = void 0;
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
        var prevLink = void 0;
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
        if (_commons.commons.onRightPress(keyEvt)) {
            switchNext();
        }
    }

    // функция перелистывания изображений поп-апа влево клавишей left; @keyEvt = event

    function arrowPrev(keyEvt) {
        keyEvt.preventDefault();
        if (_commons.commons.onLeftPress(keyEvt)) {
            switchPrev();
        }
    }

    return {
        openPopup: openPopup
    };
}();

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
;"use strict";
var validation = exports.validation = function () {
    var hashTag = document.querySelector('.upload-form-hashtags');
    var MAX_LENGTH = 20;
    var MIN_LENGTH = 2;
    var HASH_FIRST_CHAR = '#';
    var Bad = {
        firstChar: '\u0425\u044D\u0448\u0442\u0435\u0433 \u0434\u043E\u043B\u0436\u0435\u043D \u043D\u0430\u0447\u0438\u043D\u0430\u0442\u044C\u0441\u044F \u0441 ' + HASH_FIRST_CHAR + ' !',
        splitter: 'Хэштеги должны разделяться одним пробелом!',
        unique: 'Хэштег должен быть уникальным!',
        tooMany: 'Нельзя указать больше пяти хэштегов!',
        tooLong: '\u041C\u0430\u043A\u0441\u0438\u043C\u0430\u043B\u044C\u043D\u0430\u044F \u0434\u043B\u0438\u043D\u0430 \u0445\u044D\u0448\u0442\u0435\u0433\u0430 - ' + MAX_LENGTH + ' \u0441\u0438\u043C\u0432\u043E\u043B\u043E\u0432',
        tooShort: '\u041C\u0438\u043D\u0438\u043C\u0430\u043B\u044C\u043D\u0430\u044F \u0434\u043B\u0438\u043D\u0430 \u0445\u044D\u0448\u0442\u0435\u0433\u0430 - ' + MIN_LENGTH + ' \u0441\u0438\u043C\u0432\u043E\u043B\u0430',
        outline: '3px solid red;'
    };

    var timerId = void 0;

    hashTag.addEventListener('input', function () {
        var hash = hashTag.value.toLowerCase().trim().split(' ');
        clearTimeout(timerId);
        timerId = setTimeout(function () {
            checkValid(hash);
        }, 2000);
    });

    //функция проверки первого символа хэштега; @hashArray - массив введенных хэштегов

    function checkFirstChar(hashArray) {
        return hashArray.every(function (current) {
            return current[0] === HASH_FIRST_CHAR;
        });
    }

    //функция проверки уникальности введенного хэштега; @hashArray - массив введенных хэштегов

    function checkUnique(hashArray) {
        return hashArray.every(function (current, index) {
            return hashArray.indexOf(current) === index;
        });
    }

    //функция проверки длины введенного хэштега; @hashArray - массив введенных хэштегов

    function checkTooShort(hashArray) {
        return hashArray.every(function (current) {
            return current.length >= MIN_LENGTH;
        });
    }

    //функция проверки длины введенного хэштега; @hashArray - массив введенных хэштегов

    function checkTooLong(hashArray) {
        return hashArray.every(function (current) {
            return current.length <= MAX_LENGTH;
        });
    }

    //общая функция проверки введенных хэштегов; @hashArray - массив введенных хэштегов

    function checkValid(hashArray) {
        var errorMessage = '';
        if (!checkFirstChar(hashArray)) {
            hashTag.style.outline = Bad.outline;
            errorMessage = Bad.firstChar + ' ' + Bad.splitter;
        } else if (!checkUnique(hashArray)) {
            hashTag.style.outline = Bad.outline;
            errorMessage = Bad.unique;
        } else if (!checkTooShort(hashArray)) {
            hashTag.style.outline = Bad.outline;
            errorMessage = Bad.tooShort;
        } else if (!checkTooLong(hashArray)) {
            hashTag.style.outline = Bad.outline;
            errorMessage = Bad.tooLong;
        } else {
            hashTag.style.outline = '';
            errorMessage = '';
        }
        hashTag.setCustomValidity(errorMessage);
    }

    //функция проверки загружаемого файла; @file - input type="file"

    function checkFileType(file) {
        var FILE_TYPES = ['image/jpeg', 'image/png'];
        if (file.files[0]) {
            var fileType = file.files[0].type.toLowerCase();
            return FILE_TYPES.some(function (type) {
                return fileType === type;
            });
        }
        return false;
    }

    return {
        checkFileType: checkFileType
    };
}();

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.slider = undefined;

var _form = __webpack_require__(4);

;"use strict";
var slider = exports.slider = function () {
    var scaleLine = document.querySelector('.upload-effect-level-line');
    var pin = scaleLine.querySelector('.upload-effect-level-pin');
    var scaleActive = scaleLine.querySelector('.upload-effect-level-val');
    var scaleContainer = document.querySelector('.upload-effect-level');
    var shift = 25;

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
        var scaleMax = scaleLine.getBoundingClientRect().right;
        var scaleMin = scaleLine.getBoundingClientRect().left;
        var currentX = evt.clientX;
        currentX > scaleMax ? currentX = scaleMax : currentX;
        currentX < scaleMin ? currentX = scaleMin : currentX;
        shift = parseInt((currentX - scaleMin) * 100 / (scaleMax - scaleMin), 10);
        slider.shift = parseInt((currentX - scaleMin) * 100 / (scaleMax - scaleMin), 10);
        pin.style.left = shift + "%";
        scaleActive.style.width = shift + "%";
        _form.form.changeImageFilterValue();
    }

    // функция обработки mouseup при перетягивании ползунка

    function onSliderPinDrop(evt) {
        evt.preventDefault();
        document.removeEventListener('mousemove', onSliderPinMove);
        document.removeEventListener('mouseup', onSliderPinDrop);
    }

    return {
        shift: shift,
        pin: pin,
        scaleActive: scaleActive
    };
}();

/***/ })
/******/ ]);