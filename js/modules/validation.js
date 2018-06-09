;"use strict";
export const validation = (function () {
    let hashTag = document.querySelector('.upload-form-hashtags');
    const MAX_LENGTH = 20;
    const MIN_LENGTH = 2;
    const HASH_FIRST_CHAR = '#';
    const Bad = {
        firstChar : `Хэштег должен начинаться с ${HASH_FIRST_CHAR} !`,
        splitter : 'Хэштеги должны разделяться одним пробелом!',
        unique : 'Хэштег должен быть уникальным!',
        tooMany : 'Нельзя указать больше пяти хэштегов!',
        tooLong : `Максимальная длина хэштега - ${MAX_LENGTH} символов`,
        tooShort : `Минимальная длина хэштега - ${MIN_LENGTH} символа`,
        outline: '3px solid red;'
    };

    let timerId;

    hashTag.addEventListener('input', () => {
        let hash = hashTag.value.toLowerCase().trim().split(' ');
        clearTimeout(timerId);
        timerId = setTimeout(() => {
            checkValid(hash);
        }, 2000);
    });

    //функция проверки первого символа хэштега; @hashArray - массив введенных хэштегов

    function checkFirstChar(hashArray) {
        return hashArray.every(current => {
            return current[0] === HASH_FIRST_CHAR;
        });
    }

    //функция проверки уникальности введенного хэштега; @hashArray - массив введенных хэштегов

    function checkUnique(hashArray) {
        return hashArray.every((current, index) => {
            return hashArray.indexOf(current) === index;
        })
    }

    //функция проверки длины введенного хэштега; @hashArray - массив введенных хэштегов

    function checkTooShort(hashArray) {
        return hashArray.every(current => {
            return current.length >= MIN_LENGTH;
        })
    }

    //функция проверки длины введенного хэштега; @hashArray - массив введенных хэштегов

    function checkTooLong(hashArray) {
        return hashArray.every(current => {
            return current.length <= MAX_LENGTH;
        })
    }

    //общая функция проверки введенных хэштегов; @hashArray - массив введенных хэштегов

    function checkValid(hashArray) {
        let errorMessage = '';
        if (!checkFirstChar(hashArray)) {
            hashTag.style.outline = Bad.outline;
            errorMessage = `${Bad.firstChar} ${Bad.splitter}`;
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
        const FILE_TYPES = ['image/jpeg', 'image/png'];
        if (file.files[0]) {
            let fileType = file.files[0].type.toLowerCase();
            return FILE_TYPES.some((type) => fileType === type);
        }
        return false;
    }

    return {
        checkFileType
    };

})();