window.addEventListener('DOMContentLoaded', () => {

  const loadContent = async (url, callback) => {
    await fetch(url)
      .then(response => response.json())
      .then(json => createCard(json.goods));

    callback();
  }

  function createCard(arr) {
    const cartWrapper = document.querySelector('.wrap');
    arr.forEach(function (item) {
      let card = document.createElement('div');
      card.classList.add('wrap__item');
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
      cartWrapper.appendChild(card);
    });
  }

  loadContent('json/db.json', () => {
    const cartAdd = document.querySelectorAll('.wrap__add'),
      cartWrap = document.querySelector('.wrap__cart'),
      container = document.querySelector('.container'),
      cartItemWrap = document.querySelector('.wrap__cart-item'),
      cartWrappos = document.querySelector('.wrap__cart-pos'),
      cartClose = document.querySelector('.wrap__cart-close'),
      sellItem = document.querySelectorAll('.wrap__item'),
      userCart = document.querySelector('.user__cart'),
      cartEmpty = document.querySelector('.empty__cart-desc'),
      cartCount = document.querySelector('#cart__count'),
      cartFrame = document.querySelector('.cart__frame'),
      switchSlider = document.querySelector('.slider'),
      moreClear = document.querySelector('.more'),
      cartImage = document.querySelector('.user__cart-img'),
      searchWrap = document.querySelector('.search'),
      resultBtn = document.querySelector('.result__btn'),
      itemDesc = document.querySelectorAll('.wrap__desc'),
      searchBtn = {
        "element": document.querySelector(".search__btn"),
        "active": false
      };

    function okami() {
      searchBtn.element.addEventListener('mouseenter', () => {
        searchBtn.element.style.fontWeight = '700';
      });
      searchBtn.element.addEventListener('mouseout', () => {
        searchBtn.element.style.fontWeight = '100';
      });
    };

    okami();

    let moneyCount = document.querySelector('.wrap__cart-money'),
      summAll = document.querySelector('.summ__all');

    function itemCount() {
      let wrapEmpty = document.querySelector('.wrap__empty');
      if (sellItem.length > 0) {
        return;
      } else {
        wrapEmpty.style.display = 'block';
      }
    };

    itemCount();

    function opencart() {
      cartImage.style.opacity = '0';
      moreClear.style.display = 'none';
      switchSlider.style.display = 'none';
      cartWrappos.style.display = 'block';
      cartWrappos.classList.add('animate__cart');
      setTimeout(() => {
        cartWrappos.classList.remove('animate__cart'),
          25
      });

      if (window.innerWidth < 400) {
        document.body.style.overflow = 'hidden';
        totalBox = document.querySelector('.total');
        totalBox.style.flexFlow = 'row';
        totalBox.style.marginTop = '0';
        summAll.style.fontSize = '1.3em';
        cartItemWrap.style.height = 'max-content';
        resultMobile = {
          "font": resultBtn.style.fontSize = '1em',
          "line": resultBtn.style.lineHeight = '2.8',
          "width": resultBtn.style.width = '110px',
          "height": resultBtn.style.height = '45px'
        };
      };
    };

    function closecart() {
      cartImage.style.opacity = '1';
      moreClear.style.display = 'block';
      switchSlider.style.display = 'block';
      cartWrappos.style.display = 'none';
      setTimeout(() => {
        cartWrappos.classList.add('animate__cart'),
          25
      });

      if (window.innerWidth < 400) {
        document.body.style.overflow = '';
      }


    }

    userCart.addEventListener('click', opencart);
    cartClose.addEventListener('click', closecart);

    cartAdd.forEach(function (btn, i) {
      btn.addEventListener('click', () => {
        let cloneitem = sellItem[i].cloneNode(true),
          addBtn = cloneitem.querySelector('.wrap__add'),
          money = cloneitem.querySelector('.money'),
          moneycart = document.querySelector('.empty__cart-desc'),
          exit = document.createElement('div');

        exit.classList.add('del__item-btn');

        if (window.innerWidth < 400) {
          exit.style.padding = '5px 10px';
        }

        exit.innerHTML = '&times';
        addBtn.remove();

        // setTimeout(() => {
        //   cloneitem.style.boxShadow = '0 0 1px 1px #eee';
        // }, 50);

        cloneitem.style.boxShadow = '0 0 1px 1px #eee';

        function animateCart() {
          cartFrame.style.display = 'block';
          let counter = 300;
          let opac = 1000;
          const id = setInterval(frame, 5);

          function frame() {
            if (counter == 20) {
              clearInterval(id);
              cartFrame.style.display = 'none';
              cartFrame.style.transform = `translateY(0px)`;
              cartFrame.style.opacity = '0';
            } else {
              counter--;
              opac = opac - 3;
              cartFrame.style.transform = `translateY(-${counter}px)`;
              cartFrame.style.opacity = '0.' + opac;
            };
          };
        };

        animateCart();
        cartBadge(1);

        money.style.color = "#444";

        cartItemWrap.appendChild(cloneitem);

        cloneitem.appendChild(exit);

        function exititem() {
          let delItems = cartItemWrap.querySelectorAll('.del__item-btn');
          delItems.forEach(function (delbtn) {
            delbtn.addEventListener('click', () => {
              delbtn.parentElement.remove();

              cartBadge(0);
              calcTotal();
            });
          });
        };

        calcTotal();
        exititem();
      });
    });


    function sliceTitle() {
      itemDesc.forEach(function (desc) {
        if (desc.textContent.length < 56) {
          return;
        } else {
          let str = desc.textContent.slice(0, 56) + '...';
          desc.textContent = str;
        };
      });
    };

    sliceTitle();

    function cartBadge(i) {
      const items = cartWrap.querySelectorAll('.wrap__item');
      cartCount.textContent = i + items.length;
    };

    function calcTotal() {
      const prices = document.querySelectorAll('.wrap__cart > .wrap__cart-item > .wrap__item > .money > .money-price');

      if (prices.length == 0) {
        moneyCount.textContent = 0;
        cartEmpty.style.display = 'block';
        resultBtn.style.display = 'none';
      } else {
        cartEmpty.style.display = 'none';
        resultBtn.style.display = 'block';
      }
      let total = 0;
      prices.forEach(function (item) {
        total += +item.textContent;
        moneyCount.textContent = total;
      });
    };

    function openSearch() {
      hr = document.querySelector('.hr__frame');
      function searchStyle(b, c, d, i, f, j) {
        let searchBoxStyle = {
          "height": searchWrap.style.height = b,
          "opacity": searchWrap.style.opacity = c
        };

        let searchBtnStyle = {
          "status": searchBtn.active = d,
          "bgcolor": searchBtn.element.style.backgroundColor = i,
          "color": searchBtn.element.style.color = f,
          "hr": hr.style.display = j
        };
      };
      searchBtn.element.addEventListener('click', () => {
        if (searchBtn.active === false) {
          setTimeout(() => {
            searchStyle('70px', '1.0', true, 'red', 'white', 'block')
          }, 20);
          searchWrap.style.display = 'flex';
        } else {
          setTimeout(() => {
            searchWrap.style.display = 'none';
          }, 500);
          searchStyle('0', '0', false, '', 'black', 'none');
        };
      });
    };
    openSearch();

    function nightMode() {
      const nightBtn = document.querySelector('.switch'),
        itemDesc = document.querySelectorAll('.wrap__desc'),
        nightDesc = document.querySelector('.night__desc'),
        logo = document.querySelector('.logo > img');
      let nightActive = false;
      nightBtn.addEventListener('change', () => {
        if (nightActive === false) {
          let night = {
            "status": nightActive = true,
            "bodyColor": document.body.style.backgroundColor = '#222',
            "searchWrapColor": searchWrap.style.backgroundColor = '#222',
            "nightDescColor": nightDesc.style.color = 'white',
            "summColor": summAll.style.color = '#eeeeee',
            "switchColor": switchSlider.style.backgroundColor = 'rgb(230, 49, 49)',
            "itemColor": cartItemWrap.style.backgroundColor = '#222',
            "logosrc": logo.src = 'img/logo4.png',
            "logoclass": logo.classList.add('withlove'),
            "cartbgcolor": cartWrap.style.backgroundColor = '#222',
            "cartborder": cartWrap.style.borderColor = '#333'
          };
        } else {
          let light = {
            "status": nightActive = false,
            "bodyColor": document.body.style.backgroundColor = '',
            "searchWrapColor": searchWrap.style.backgroundColor = '',
            "nightDescColor": nightDesc.style.color = 'black',
            "summColor": summAll.style.color = 'black',
            "switchColor": switchSlider.style.backgroundColor = '#2196F3',
            "itemColor": cartItemWrap.style.backgroundColor = 'white',
            "logosrc": logo.src = 'img/mainlogo.png',
            "logoclass": logo.classList.remove('withlove'),
            "cartbgcolor": cartWrap.style.backgroundColor = 'white',
            "cartborder": cartWrap.style.borderColor = '#eee'
          };
        };

        itemDesc.forEach(function (item, i) {
          if (nightActive === false) {
            item.style.color = 'black';
            sellItem[i].style.boxShadow = '';
          } else {
            item.style.color = 'white';
            sellItem[i].style.boxShadow = "10px 20px 30px red";
          };
        });
      });
    };
    nightMode();

    function cartLabel() {
      cartImage.style.transition = 'all 150ms';
      cartImage.addEventListener('mouseenter', () => {
        cartImage.style.transform = 'rotate(15deg)';
        setTimeout(() => {
          cartImage.style.transform = 'rotate(-15deg)';
        }, 150);

        setTimeout(() => {
          cartImage.style.transform = 'rotate(15deg)';
        }, 300);

        setTimeout(() => {
          cartImage.style.transform = 'rotate(0deg)';
        }, 450);
      });
    };
    cartLabel();

    function menuChangeLi() {
      let li = document.querySelectorAll('.menu__list-li');
      li.forEach(function (item) {

        item.addEventListener('mouseover', () => {
          item.childNodes[1].style.color = '#a66';
        });

        item.addEventListener('mouseout', () => {
          item.childNodes[1].style.color = 'red';
        });
      });
    };
    menuChangeLi();

    // function searchFilter() {
    //   let searchInput = document.querySelector('.search__input');
    //   let filter = searchInput.value.toLowerCase();
    //   searchInput.addEventListener('keyup', function () {
    //     itemDesc.forEach(function (desc) {
    //       sellItem.forEach(function(good){
    //       // if(desc.innerHTML.toLowerCase().indexOf(filter) > -1) {
    //       //     desc.style.display = 'flex';
    //       // } else {
    //       //     desc.style.display = 'none';
    //       // };

    //         if (searchInput.value !== desc.innerHTML) {
    //           good.style.display = 'none';
    //         } else {
    //         setTimeout(() => {
    //           good.style.display = '';
    //         }, 50);
    //       };

    //     });
    //     });
    //   });
    // };
    // searchFilter();

  });
});

// Слайдер конвейер тарелочек с роллами