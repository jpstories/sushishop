window.addEventListener('DOMContentLoaded', () => {

    let slider = document.querySelector('.sliderBox');
    let lineWidth = document.querySelector('.slider__line');
    let slides = document.querySelectorAll('.slider__line div');
    let needWidth = 0;
    let widthArray = [0];
    let step = 0;
    let offset = 0;
    let ostatok = 0;

    slides.forEach(function(slide, i){
        widthArray[i] = slide.offsetWidth;
        needWidth += slide.offsetWidth;
    });

    lineWidth.style.width = needWidth + 'px';

    slider.addEventListener('click', function() {

        //Сдвигаем на ширину слайда
        offset = offset + widthArray[step];
        ostatok = needWidth - offset;

        lineWidth.style.left = -offset + 'px';
        step++;

        console.log(ostatok);

        if (ostatok < slider.offsetWidth){
            ostatok = ostatok - (slider.offsetWidth);
            offset = offset + ostatok;
            lineWidth.style.left = -offset + 'px';
        }

        if(widthArray.length <= step){
            step = 0; 
            offset = 0;
            lineWidth.style.left = 0 + 'px';
        };
    });
});