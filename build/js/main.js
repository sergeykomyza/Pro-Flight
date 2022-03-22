// ================================================== исключение по наименованию страницы
// const contactsPage = window.location.pathname == '/contacts.html'
// if(contactsPage){
//     ...
// }

// ================================================== исключение по селектору
const body = document.querySelector('body');
if (!body.querySelector('.main-page')) {
    body.style.padding = '300px 0 0 0';
}

// ================================================== МЕНЮ
document.addEventListener('DOMContentLoaded', function(){
    const menu = document.querySelector('.header__box')
    const openMenu = document.querySelector('.open-menu')
    const closeMenu = document.querySelector('.close-menu')
    openMenu.addEventListener('click', function(e){
        menu.classList.add('active')
    })
    closeMenu.addEventListener('click', function(e){
        menu.classList.remove('active')
    })
});

// ================================================== СТРОКА ПОИСКА
document.addEventListener('DOMContentLoaded', function(){
    const searchForm = document.querySelector('.search')
    const inputSearch = document.querySelector('.search__input')

    document.addEventListener('click', function (e) {
        let target = e.target
        const itsInputSearch = target == inputSearch
        itsInputSearch ? inputSearch.classList.add('search__input--full') : inputSearch.classList.remove('search__input--full')
    })
});
// ================================================== ТАБЫ
const tabs = (tabBoxSelector, headerSelector, tabSelector, contentSelector, activeClass) => {
    const tabBox = document.querySelector(tabBoxSelector),
        header = tabBox.querySelector(headerSelector),
        tab = tabBox.querySelectorAll(tabSelector),
        content = tabBox.querySelectorAll(contentSelector);

    function hideContent() {
        content.forEach(item => {
            item.style.display = 'none';
        });
        tab.forEach(item => {
            item.classList.remove(activeClass);
        });
    }

    function showContent(i) {
        content[i].style.display = 'block';
        tab[i].classList.add(activeClass);
    }

    header.addEventListener('click', (e) => {
        e.preventDefault();
        const target = e.target;
        if (target &&
            (target.classList.contains(tabSelector.replace(/\./, "")) ||
                target.parentNode.classList.contains(tabSelector.replace(/\./, "")))) {
            tab.forEach((item, i) => {
                if (target == item || target.parentNode == item) {
                    hideContent();
                    showContent(i);
                }
            });
        }
    });

    hideContent();
    showContent(0); // в скобках указываем индекс таба, который хотим видеть активным

}

tabs('#rent-0', '.tickets__header', '.tickets__toggle', '.tickets__content', 'active');
tabs('#rent-1', '.rent__header', '.rent__toggle', '.rent__content', 'active');
tabs('#rent-2', '.rent__header', '.rent__toggle', '.rent__content', 'active');

// ================================================== ПРОКРУТКА, ШАПКА
// document.addEventListener('DOMContentLoaded', function () {
//     // СКРОЛЛ К НУЖНОЙ СЕКЦИИ ПО КЛИКУ НА ПУНКТАХ МЕНЮ
//     $('.menu__link').click(function () {
//         var scroll_elem = $(this).attr('href');
//         $('html, body').animate({
//             scrollTop: $(scroll_elem).offset().top
//         }, 1000);
//     });
//     // ДОБАВЛЯЕМ АКТИВНЫЙ КЛАСС ШАПКЕ
//     function headerActiveToggle() {
//         const scrollSize = window.pageYOffset
//         scrollSize > 1 ? header.classList.add('active') : header.classList.remove('active')
//     }
//     window.addEventListener('load', headerActiveToggle) // ПРИ ПЕРЕЗАГРУЗКЕ СТРАНИЦЫ ЕСЛИ СТРАНИЦА УЖЕ ПРОСКРОЛЛЕНА
//     window.addEventListener('scroll', headerActiveToggle) // ПРИ СКРОЛЛЕ
// });

// ================================================== МАСКА ДЛЯ ИНПУТОВ (https://github.com/RobinHerbots/Inputmask)
$(document).ready(function () {
    $(".phone").inputmask({
        mask: "+7 999 999 99 99",
        clearIncomplete: true
    });
    $('.email').inputmask({
        mask: "*{1,20}[.*{1,20}]@*{1,20}.*{2,4}",
        clearIncomplete: true
        //     greedy: false,
        //     onBeforePaste: function (pastedValue, opts) {
        //         pastedValue = pastedValue.toLowerCase();
        //         return pastedValue.replace("mailto:", "");
        //     },
        //     definitions: {
        //         '*': {
        //             validator: "[0-9A-Za-z-а-я-]",
        //             casing: "lower"
        //         }
        //     }
    });
    $(".date").inputmask({
        mask: "99/99/9999",
        clearIncomplete: true,
        'placeholder': 'dd/mm/yyyy'
    });
});

// ================================================== СЛАЙДЕРЫ (https://kenwheeler.github.io/slick/)
document.addEventListener('DOMContentLoaded', function () {
    $('.aircrafts__slider').slick({
        fade: false,
        slidesToShow: 4,
        slidesToScroll: 1,
        arrows: true,
        dots: false,
        prevArrow: '<button type="button" class="slick-prev"><img src="img/icon_arrow_slider.png" /></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="img/icon_arrow_slider.png" /></button>',
        responsive: [
            {
                breakpoint: 1100,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 565,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });
    // пользовательская навигация
    // var dot = $(".dots__item");
    // $('.slider').on("beforeChange", function (event, slick, currentSlide, nextSlide) {
    //     dot.removeClass("dots__item--active").eq(nextSlide).addClass("dots__item--active")
    // });
    // dot.on("click", function () {
    //     var i = dot.index(this);
    //     $('.slider').slick("slickGoTo", i)
    // });
    // $(".prev").on("click", function () {
    //     $('.slider').slick("slickPrev")
    // });
    // $(".next").on("click", function () {
    //     $('.slider').slick("slickNext")
    // });

});
// ================================================== 
// ================================================== 
// ================================================== 
// ================================================== 
// ================================================== 
// ================================================== 
// ================================================== 
// ================================================== 
// ================================================== 

// ================================================== КАРТА, ОТЛОЖЕННАЯ ЗАГРУЗКА (ЧТОБЫ УЛУЧШИТЬ ПОКАЗАТЕЛИ - PageSpeed Insights)
// document.addEventListener('DOMContentLoaded', function () {
//     setTimeout(function() {
//         var headID = document.getElementsByTagName("body")[0];         
//         var newScript = document.createElement('script');
//         newScript.type = 'text/javascript';
//         newScript.src = 'https://api-maps.yandex.ru/2.1/?lang=ru_RU';
//         headID.appendChild(newScript);
//     }, 3000);
//     setTimeout(function() {
//         var myMap = new ymaps.Map('map', {
//             center: [48.570612, 39.341628],
//             zoom: 16
//         }, {
//             searchControlProvider: 'yandex#search'
//         }),
//             MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
//                 '<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'
//             ),
//             myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
//                 hintContent: 'г. Луганск, кв. Лиховида 1',
//                 balloonContent: 'г. Луганск, кв. Лиховида 1'
//             }, {
//                 iconLayout: 'default#image',
//                 iconImageHref: 'img/logo_sign.png',
//                 iconImageSize: [40, 45],
//                 iconImageOffset: [-5, -38]
//             })
//         myMap.geoObjects
//             .add(myPlacemark)
//     }, 4000);
// });