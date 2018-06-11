;"use strict";
import {filters} from './filters';
import {data} from './data';
export const backend = (function() {
    let downloadedData = [];

    // функция обработки успешной загрузки данных; @evt = event

    function onSuccess(evt) {
        try {
            downloadedData = JSON.parse(evt.target.responseText);
            // backend.downloadedData.length = 0;
            // backend.downloadedData = downloadedData.slice();
            data.generatedPictures.length = 0;
            data.generatedPictures = downloadedData.slice();
            filters.setPictureSort();
        } catch (error) {
            alert(`Непредвиденная ошибка ${error} в данных :(`);
        }
    }

    // функция обработки ошибок при загрузке данных; @evt = event

    function onError(evt) {
        let status = evt.target.status;
        let errorText = evt.target.statusText;
        alert(`Ошибка ${status} : ${errorText}`);
    }
    
    // функция отправки формы с фото; @data - данные формы, @onError - колбэк обработки ошибок

    function uploadForm(data, onError) {
        let xhr = new XMLHttpRequest();
        xhr.timeout = 20000;
        const server = 'https://js.dump.academy/kekstagram';
        xhr.addEventListener('load', (evt) => {
            evt.target.status != 200 ? onError(evt) : alert('Данные успешно отправлены!');;
        });
        xhr.addEventListener('error', () => {
            alert('Ошибка передачи данных!');
        });

        xhr.addEventListener('timeout', () => {
            alert(`Сервер не ответил за ${xhr.timeout / 1000} секунд!`);
        });

        xhr.open('POST', server);
        xhr.send(data);
    }

    //функция загрузки фото с сервера; @onSuccess, @onError - колбэки обработки успешной загрузки / ошибок

    function downloadData(onSuccess, onError) {
        let xhr = new XMLHttpRequest();
        xhr.timeout = 20000;
        const server = 'https://js.dump.academy/kekstagram/data';
        xhr.addEventListener('load', (evt) => {
            if (evt.target.status != 200) {
                onError(evt)
            } else return onSuccess(evt);
        });
        xhr.addEventListener('error', () => {
            alert('Ошибка загрузки данных!');
        });

        xhr.addEventListener('timeout', () => {
            alert('Сервер не ответил за 20 секунд!');
        });

        xhr.open('GET', server);
        xhr.send();
    }

    return {
        uploadForm,
        downloadData,
        onError,
        onSuccess,
        downloadedData
    }
})();