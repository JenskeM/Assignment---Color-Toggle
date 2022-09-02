let menuBtn = document.querySelector(`.menuButton`);
let getPickedColor = '';
let getIdColor = 0;
let clicked = false;
let firstTime = true;
let getSidebar = document.querySelector('.nav-sidebar');
let getSidebarUl = document.querySelector('.nav-sidebar ul');
let getSidebarLis = document.querySelectorAll('.nav-sidebar ul li');
let getSidebarRadio = document.querySelectorAll('.nav-sidebar ul input');
let bodyBackground = document.querySelector(".nav-sidebar").parentElement; 
let colorText = document.querySelector('#text');


//The following function I got from the internet 😇
let lightOrDark = function(color) {
    // Variables for red, green, blue values
    var r, g, b, hsp;
    //RGB --> store the red, green, blue values in separate variables
    color = color.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/);
    r = color[1];
    g = color[2];
    b = color[3];

    // HSP (Highly Sensitive Poo) equation from http://alienryderflex.com/hsp.html
    hsp = Math.sqrt(
        0.299 * (r * r) +
        0.587 * (g * g) +
        0.114 * (b * b)
    );

    // Using the HSP value, determine whether the color is light or dark
    if (hsp > 127.5) {
        return 'light';
    }
    else {
        return 'dark';
    }
}

const visibleMenu = function () {
    for (i = 0; i < getSidebarLis.length; i++) {
        getSidebarLis[i].style.background = getSidebarRadio[i].id;
        checkDarkBackground = lightOrDark(window.getComputedStyle(getSidebarLis[i]).backgroundColor);
        if (checkDarkBackground === "dark") {
            getSidebarLis[i].style.color = 'white'
        }
        else {
            getSidebarLis[i].style.color = 'black'
        };
        if (getSidebarRadio[i].checked) {
            clicked = true;
        }
    };

    getSidebarUl.style.visibility = 'visible';
    getSidebar.style.width = '150px';
    getSidebar.style.opacity = '1';
    getSidebarUl.style.opacity = '1';
    for (i = 0; i < getSidebarLis.length; i++){
        getSidebarLis[i].style.opacity = '1';
    };

    if (clicked && (!getSidebarRadio[getIdColor].checked || firstTime === true))  {
        for (i = 0; i < getSidebarLis.length; i++) {
            if (getSidebarRadio[i].checked) {
                firstTime = false;
                pickedColor = getSidebarRadio[i].id;
                getIdColor = i;
                bodyBackground.style.background = pickedColor;                    
                checkFontColor = lightOrDark(window.getComputedStyle(getSidebarLis[i]).backgroundColor);
                if (checkFontColor === "dark") {
                    colorText.style.color = 'white'
                }
                else {
                    colorText.style.color = 'black'
                };
                colorText.innerText = `You have chosen the color: 
                ${pickedColor}`;
                getSidebarUl.style.visibility = 'hidden';
                getSidebar.style.width = '0px';
                getSidebar.style.opacity = '0';
                getSidebarUl.style.opacity = '0';
                for (i = 0; i < getSidebarLis.length; i++){
                    getSidebarLis[i].style.opacity = '0';
                };
            }
        };
    }
    else {
        window.setTimeout(visibleMenu, 50);
    }
};


menuBtn.addEventListener('mouseover', visibleMenu);



  
window.addEventListener('keydown', function (event) {
    for (i = 0; i < getSidebarLis.length; i++){
        if (parseInt(event.key) === i+1){
            bodyBackground.style.background = getSidebarRadio[i].id;
            checkFontColor = lightOrDark(window.getComputedStyle(document.querySelector(".backgroundChange")).backgroundColor);
            if (checkFontColor === "dark") {
                colorText.style.color = 'white'
            }
            else {
                colorText.style.color = 'black'
            };
            colorText.innerText = `You have chosen the color: 
            ${getSidebarRadio[i].id}`;
        }
    }
})
