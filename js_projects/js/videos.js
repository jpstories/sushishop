const godsEatBtn = document.querySelector('.gods__eat'),
    wrap = document.querySelector('.wrap'),
    moreDel = document.querySelector('.more'),
    switchSlider = document.querySelector('.slider'),
    modalVideo = document.querySelector('.modalPos'),
    modalCenter = document.querySelector('#video__modal-window'),
    container = document.querySelector('.container'),
    videoItems = document.querySelectorAll('.wrap__video'),
    sellItem = document.querySelectorAll('.wrap__item');

let player;
godsEatBtn.addEventListener('click', () => {

    //Очищаем главный блок от элементов
    function wrapClear() {
        while (wrap.firstChild) {
            wrap.removeChild(wrap.firstChild);
        };
        moreDel.remove();
    };

    wrapClear();

    let videoID = ['rGpbgDO5REQ', 'rGpbgDO5REQ', 'rGpbgDO5REQ'];

    function createVideo() {
        for (let i = 0; i < 3; i++) {
            let video = document.createElement('a');
            video.classList.add('wrap__item', 'animate__content');
            video.setAttribute('data-url', videoID[i]);
            video.innerHTML = `
                <img class="wrap__img" src="img/video__prev.jpg" alt="">
                <span class="wrap__desc">В еде богов, отважные ребята проверяют на себе опасную еду</span>
            `;

            let videoBoxStyle = {
                'href': video.href = '#',
                'text': video.style.textDecoration = 'none',
                'font': video.style.fontFamily = 'Arial',
                'height': video.style.height = '350px',
                'transform': video.style.transition = 'all 300ms'
            };

            setTimeout(() => {
                let wrapImg = document.querySelectorAll('.wrap__img');
                wrapImg.forEach(function (img) {
                    img.style.width = '240px';
                    img.style.height = '220px';
                    img.parentElement.style.boxShadow = '1px 1px 2px 2px #eee';
                });
            }, 50);

            setTimeout(() => {
                video.classList.remove('animate__content'),
                    120
            });

            //Создание модального окна с видео
            video.addEventListener('click', (e) => {
                
                // var online = navigator.onLine;
                // if (!online) {
                //     let noConnection = {
                //         'text': modalCenter.textContent = 'No connection...',
                //         'align': modalCenter.style.textAlign = 'center',
                //         'font': modalCenter.style.fontSize = '2.5em',
                //         'line': modalCenter.style.lineHeight = '10'
                //     };

                // } else {
                    e.preventDefault();
                    switchSlider.style.display = 'none';
                    modalVideo.style.display = 'flex';

                    function videoTag() {
                        let videotag = document.createElement('video');
                        let sourcetag = document.createElement('source');
                        videotag.appendChild(sourcetag);
                        sourcetag.src = 'https://interactive-examples.mdn.mozilla.net/media/examples/flower.webm';
                        videotag.style.height = '100%';
                        videotag.style.width = '100%';
                        modalCenter.appendChild(videotag);
                        videotag.controls = "controls";
                    };

                    // modalCenter.addEventListener('click', (e) => {
                    //     console.log(e.target);
                    //     if(!e.target.modalCenter){
                    //         modalVideo.style.display = 'none';
                    //     };
                    // });

                    videoTag();
                    // iframeVideo();
            });
            wrap.appendChild(video);
        };
    };

    createVideo();

    let videoBox = document.querySelector('#video__modal-window video');
    modalCenter.addEventListener('click', () => {
        if(!e.target.videoBox){
            console.log('Попал')
        } else {
            console.log('Miss')
        };
    });

    // modalCenter.addEventListener('click', (e) => {
    //     modalVideo.style.display = 'flex';
    //     switchSlider.style.display = 'block';
    // });

    function iframeVideo() {
        setTimeout(() => {
            var tag = document.createElement('script');
            tag.src = "https://www.youtube.com/iframe_api";
            var firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

            setTimeout(() => {
                player = new YT.Player('video__modal-window', {
                    height: '650px',
                    width: '100%',
                    videoID: 'rGpbgDO5REQ',
                });
            }, 300);
        }, 200);
    };

    // modalCenter.addEventListener('click', (e) => {
    //     console.log(e.target);

    //     if(!e.target.videoBox){
    //         console.log('Попал');
    //         // modalVideo.style.display = 'none';
    //     } else {
    //         console.log('Miss');
    //     }
    // });


});