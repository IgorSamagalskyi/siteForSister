// search-box open close js code
let navbar = document.querySelector(".navbar");

// sidebar open close js code
let navLinks = document.querySelector(".nav-links");
let menuOpenBtn = document.querySelector(".navbar .bx-menu");
let navLinksSnow = document.querySelector('*')
let navLinksBurger = document.querySelector('.overflow-button')

menuOpenBtn.onclick = function() {
    if(menuOpenBtn){
        navLinksSnow.classList.add('triger')
        navLinksBurger.classList.add('myClass')
        navLinks.style.left = "0";
        menuOpenBtn = false;
    }else{
    navLinks.style.left = "-100%";
        navLinksSnow.classList.remove('triger')
        navLinksBurger.classList.remove('myClass')
        menuOpenBtn = true;
    }
}

// sidebar submenu open close js code
let htmlcssArrow = document.querySelector(".htmlcss-arrow");
htmlcssArrow.onclick = function() {
    navLinks.classList.toggle("show1");
}

// ======================================tabs=================================================
const tab = document.querySelectorAll(".tab");
const tabContent = document.querySelectorAll(".tab-content");

for (let i = 0; i < tab.length; i++)
{
    tab[i].onclick = tabActive;
}

function tabActive()
{
    for (let i = 0; i < tab.length; i++)
    {
        this.classList.add("tab-active");

        if (tab[i] !== this)
        {
            tab[i].classList.remove("tab-active");
        }
    }

    for (let i = 0; i < tabContent.length; i++)
    {
        tabContent[i].classList.add("tab-content-active");
        if (tab[i] !== this)
        {
            tabContent[i].classList.remove("tab-content-active");
        }
    }
}

