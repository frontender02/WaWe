document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;
    const anchors = document.querySelectorAll('a[href*="#"]');

    AOS.init();

    // Menu
    const menu = document.querySelector('.menu__body');
    const menuBtn = document.querySelector('.menu__icon');
    if (menu && menuBtn){
        menuBtn.addEventListener('click', () => {
            menu.classList.toggle('active');
            menuBtn.classList.toggle('active');
            body.classList.toggle('lock');
        })

        menu.querySelectorAll('.menu__link').forEach((link) => {
            link.addEventListener('click', () => {
                menu.classList.remove('active');
                menuBtn.classList.remove('active');
                body.classList.remove('lock');
            })
        })
    }

    anchors.forEach((anchor) => {
        anchor.addEventListener('click', (event) => {
            event.preventDefault();

            const sectionID = anchor.getAttribute('href').substring(1);
            document.getElementById(sectionID).scrollIntoView({
                block: 'start',
                behavior: 'smooth'
            })
        })
    })

    // Scroll to bottom
    const scrollBottom = document.querySelector('.scroll-to-bottom-btn');
    const heroSection = document.querySelector('.hero');
    scrollBottom.addEventListener('click', () => {
        const heroSectionHeight = heroSection.offsetHeight;
        scrollBy({
            top: heroSectionHeight,
            behavior: 'smooth'
        })
    })

    // Tabs Gallery
    const tabsGallery = () => {
        const head = document.querySelector('.tabs-gallery__head'); 
        const body = document.querySelector('.tabs-gallery__body');

        const getActiveTabName = () => {
            return head.querySelector('.tabs-gallery__btn--active').dataset.tab;
        }
        const setActiveContent = () => {
            if (body.querySelector('.tabs-gallery__content--active')){
                body.querySelector('.tabs-gallery__content--active').classList.remove('tabs-gallery__content--active');
            }
            body.querySelector(`[data-tab=${getActiveTabName()}]`).classList.add('tabs-gallery__content--active');
        }

        if (!head.querySelector('.tabs-gallery__btn--active')){
            head.querySelector('.tabs-gallery__btn').classList.add('tabs-gallery__btn--active');
        }

        setActiveContent(getActiveTabName());
        
        head.addEventListener('click', (e) => {
            const caption = e.target.closest('.tabs-gallery__btn');
            if (!caption) return;
            if (caption.classList.contains('tabs-gallery__btn--active')) return; 
            if (head.querySelector('.tabs-gallery__btn--active')){
                head.querySelector('.tabs-gallery__btn--active').classList.remove('tabs-gallery__btn--active'); 
            }
            caption.classList.add('tabs-gallery__btn--active');

            setActiveContent(getActiveTabName());
        })
    }
    tabsGallery();

    // Video Blog
    const videoBtn = document.querySelector('#video-blog-play');
    const videoFile = document.querySelector('#video-blog');
    const videoFileImg = document.querySelector('.video-blog__img');
    videoBtn.addEventListener('click', () => {
        if (videoFile.paused){
            videoFile.play();
            videoFileImg.style.opacity = '0';
        } else {
            videoFile.pause();
            videoFileImg.style.opacity = '1';
        }
    })

    // Slider
    const swiper = new Swiper('.swiper', {
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
    });
})