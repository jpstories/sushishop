window.addEventListener('DOMContentLoaded', () => {

    document.querySelector('.search__input').oninput = function () {
        let str = this.value.toLowerCase().trim();
        let itemTitle = document.querySelectorAll('.wrap__desc');
        if (str != '') {
            itemTitle.forEach(function (elem) {
                if (elem.innerText.toLowerCase().search(str) == -1) {
                    elem.parentElement.classList.add('hide');
                    setTimeout(() => {
                        elem.parentElement.style.display = 'none';
                    }, 270);
                    // elem.innerHTML = elem.innerText;
                }
                else {
                    elem.parentElement.classList.remove('hide');
                    elem.parentElement.style.display = '';
                    // elem.innerHTML = markString(elem.innerText, elem.innerText.toLowerCase().search(str), str.lenght);
                }
            });
        }
        else {
            itemTitle.forEach(function (elem) {
                elem.parentElement.classList.remove('hide');
                setTimeout(() => {
                    elem.parentElement.style.display = '';    
                }, 280);
                // elem.innerHTML = elem.innerText;
            });
        };
    };
});





function markString(str, pos, len){
    return str.slice(0, pos) + '<mark>' + str.slice(pos, pos + len) + '</mark>' + str.slice(pos + len);
}