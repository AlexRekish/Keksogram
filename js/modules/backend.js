;"use strict";
export const backend = (function() {

    function onLoad(evt) {
        let goodAnswer = evt.target.responseText;
        alert('Данные успешно отправлены');
        return goodAnswer;
    }

    function onError(evt) {
        let status = evt.target.status;
        let errorText = evt.target.statusText;
        alert(`Ошибка ${status} : ${errorText}`);
    }
    
    function uploadForm(data, onLoad, onError) {
        let xhr = new XMLHttpRequest();
        xhr.timeout = 20000;
        const server = 'https://js.dump.academy/kekstagram';
        xhr.addEventListener('load', (evt) => {
            evt.target.status != 200 ? onError(evt) : onLoad(evt);
        });
        xhr.addEventListener('error', () => {
            alert('Ошибка загрузки данных!');
        });

        xhr.addEventListener('timeout', () => {
            alert('Сервер не ответил за 20 секунд!');
        });

        xhr.open('POST', server);
        xhr.send(data);
    }
    
    return {
        uploadForm,
        onError,
        onLoad
    }
})();