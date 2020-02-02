const more = document.querySelector('.more'),
    uiLoad = document.querySelector('.ui__load'),
    logoimg = document.querySelector('.logo > img'),
    nightBtn2 = document.querySelector('.switch');


more.addEventListener('click', () => {

    const loadContent = (url)=> {
        fetch(url)
            .then(response => response.json())
            .then(json => createCard(json.goodsLoad));
    };

    function createCard(arr) {
        const cartWrapper = document.querySelector('.wrap');
        arr.forEach(function (item) {
            let card = document.createElement('div');
            card.classList.add('wrap__item', 'animate__content');
            card.innerHTML = `
                    <div class="wrap__img"><img src="${item.url}" alt=""></div>
                    <div class="wrap__desc">${item.title}</div>
                    <div class="wrap__add">Добавить</div>
                    <div class="money">
                        <span class="money-title">Цена: </span>
                        <span class="money-price">${item.price}</span>
                        <span>р</span>
                    </div>
            `;


            if (logoimg.classList.contains('withlove')){
                card.querySelector('.wrap__desc').style.color = 'white';
            };

            nightBtn2.addEventListener('click', function(){
                if (logoimg.classList.contains('withlove')){
                    card.querySelector('.wrap__desc').style.color = '#555';
                } else {
                    card.querySelector('.wrap__desc').style.color = 'white';
                }
            });

            cartWrapper.appendChild(card);

            function sliceTitleLoad() {
                let itemDesc = document.querySelectorAll('.wrap__desc');
                itemDesc.forEach(function (desc) {
                  if (desc.textContent.length < 56) {
                    return;
                  } else {
                    let str = desc.textContent.slice(0, 56) + '...';
                    desc.textContent = str;
                  };
                });
              };
          
              sliceTitleLoad();

            setTimeout(() => {
                card.classList.remove('animate__content'),
            25});

        });
    };
    loadContent('json/load.json');
});