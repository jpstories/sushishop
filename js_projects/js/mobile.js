window.addEventListener('DOMContentLoaded', () => {

    let slider = document.querySelector('.sliderBox'),
        wrapTopMobile = document.querySelector('.wrap__top'),
        wrapTopDiscount = document.querySelector('.wrap__top-discount'),
        wrapTopSauce = document.querySelector('.wrap__top-sauce'),
        logoMobile = document.querySelector('.logo');

    window.addEventListener('resize', () => {

        if (window.innerWidth < 400){
            wrapTopDiscount.remove();
            wrapTopSauce.remove();


            slider.style.display = "none";
            logoMobile.style.display = 'flex';


            // let logoMobile = document.createElement('div');
            // logoMobile.classList.add('logo');

            // let imgMobile = document.createElement('img').src = 'img/mainlogo.png';
            // imgMobile.style.width = '180px';
            // imgMobile.style.height = '250px';

            // logoMobile.appendChild(imgMobile);
            
            // wrapTopMobile.appendChild(logoMobile);
        } else {
            slider.style.display = "flex";
            logoMobile.style.display = 'none';
            
        };

    });
});