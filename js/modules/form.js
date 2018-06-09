;"use strict";
import {validation} from './validation';
import {commons} from './commons';
export const form = (function(){
    let uploadForm = document.querySelector('.upload-form');
    let uploadImageField = uploadForm.querySelector('#upload-file');
    let uploadOverlay = uploadForm.querySelector('.upload-overlay');
    let commentsArea = uploadForm.querySelector('.upload-form-description');
    let decResizeButton = uploadForm.querySelector('.upload-resize-controls-button-dec');
    let incResizeButton = uploadForm.querySelector('.upload-resize-controls-button-inc');
    let resizeValue = uploadForm.querySelector('.upload-resize-controls-value');
    let previewImage = uploadForm.querySelector('.effect-image-preview');
    let effectControls = uploadForm.querySelector('.upload-effect-controls');
    let closeUploadOverlay = uploadOverlay.querySelector('.upload-form-cancel');
    let preview = uploadForm.querySelector('.effect-image-preview');
    const RESIZE_STEP = 25;
    const RESIZE_MIN = 25;
    const RESIZE_MAX = 100;

    uploadForm.setAttribute('action', 'https://js.dump.academy/kekstagram');
    uploadImageField.addEventListener('change', () => {
        if(validation.checkFileType(uploadImageField)) {
            let reader = new FileReader();
            reader.addEventListener('load', () => {
            preview.src = reader.result;
            });
            reader.readAsDataURL(uploadImageField.files[0]);
            showUploadForm(); 
        } else alert('Неверный тип файла! Допустимо использовать только .jpg или .png изображения!');
    }
    );
   
    // функция показа настроек загружаемого изображения;

    function showUploadForm() {
       uploadOverlay.classList.remove('hidden');
       closeUploadOverlay.addEventListener('click', closeUploadForm);
       document.addEventListener('keydown', cancelUploadOnEsc);
    }

    // функция закрытия настроек загружаемого изображения; @evt = event

    function closeUploadForm(evt) {
        evt.preventDefault();
        uploadOverlay.classList.add('hidden');
        closeUploadOverlay.removeEventListener('click', closeUploadForm);
        document.removeEventListener('keydown', cancelUploadOnEsc);
    }

    // функция закрытия настроек загружаемого изображения клавишей Esc; @keyEvt = event

    function cancelUploadOnEsc(keyEvt) {
        if (commons.onEscPress(keyEvt) && (commentsArea !== document.activeElement)) {
            keyEvt.preventDefault();
            closeUploadForm(keyEvt);
        }
    }

    commentsArea.setAttribute('maxlength', 140);
    resizeValue.value = `${RESIZE_MAX}%`;
    let resizeImageValue = parseInt(resizeValue.value, 10); 
    decResizeButton.addEventListener('click', decPictureSize);
    incResizeButton.addEventListener('click', incPictureSize);

    // функция уменьшения масштаба загружаемого изображения; @evt = event

    function decPictureSize(evt) {
        evt.preventDefault();
        resizeImageValue > RESIZE_MIN ? resizeImageValue -= RESIZE_STEP : resizeImageValue;
        if (resizeImageValue < RESIZE_MIN) resizeImageValue = RESIZE_MIN;
        resizeValue.value = `${resizeImageValue}%`;
        previewImage.style.transform = `scale(${resizeImageValue / 100})`;
    }

     // функция увеличения масштаба загружаемого изображения; @evt = event

    function incPictureSize(evt) {
        evt.preventDefault();
        resizeImageValue < RESIZE_MAX ? resizeImageValue += RESIZE_STEP : resizeImageValue;
        if (resizeImageValue > RESIZE_MAX) resizeImageValue = RESIZE_MAX;
        resizeValue.value = `${resizeImageValue}%`;
        previewImage.style.transform = `scale(${resizeImageValue / 100})`;
    }

    effectControls.addEventListener('change', setImageFilter);

    // функция настройки фильтра загружаемого изображения; @evt = event

    function setImageFilter(evt) {
        let filterValue = 75;
        let filter = evt.target.value;
        let filters = {
            none: `none`,
            chrome : `grayscale(${filterValue}%)`,
            sepia : `sepia(${filterValue}%)`,
            marvin : `invert(${filterValue}%)`,
            phobos : `blur(${filterValue / 10}px)`,
            heat : `brightness(${filterValue + 50}%)`
        };
        evt.target.style.filter = 'none'; 
        previewImage.style.filter = filters[filter];
    }

    return {
        uploadImageField
    };
})();