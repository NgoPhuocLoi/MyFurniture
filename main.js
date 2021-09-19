

function hideAndShowHeaderWhenScroll() {
    let lastScrollTop = 0;
    document.onscroll = () => {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop
        if(scrollTop > 184){
            if(scrollTop > lastScrollTop){
                document.querySelector('.header').style.top = '-126px'
            }else{
                document.querySelector('.header').style.top = '0'
            }
        }

        lastScrollTop = scrollTop;
    }
}

hideAndShowHeaderWhenScroll()

function handleSlider() {
    autoSlider()
    changeImgOnMobile()

    function autoSlider() {
        let count = 2;
        document.querySelector('#radio' + 1).checked = true;
        setInterval(() => {
            document.querySelector('#radio' + count).checked = true;
            count++;
    
            if(count > 3) count = 1
        },5000)
    }
    
    

    function changeImgOnMobile() {
        const mobileSliderPath = [
            './images/mobile-slider/img-1.jpg',
            './images/mobile-slider/img-2.jpg',
            './images/mobile-slider/img-1.jpg'
        ]
        
        const PcSliderPath = [
            './images/slider1.png',
            './images/slider2.png',
            './images/slider3.jpeg'
        ]
        
        
        const slideImgs = document.querySelectorAll('.slide img')
        window.onload = () => {
            if(document.documentElement.offsetWidth < 768){
                slideImgs.forEach((img, index) => {
                    img.setAttribute('src', `${mobileSliderPath[index]}`)
                })
            }
        }
        
        window.addEventListener('resize', () => {
            if(document.documentElement.offsetWidth < 768){
                slideImgs.forEach((img, index) => {
                    img.setAttribute('src', `${mobileSliderPath[index]}`)
                })
            }else{
                slideImgs.forEach((img, index) => {
                    img.setAttribute('src', `${PcSliderPath[index]}`)
                })
            }
        })
        
    }
}

handleSlider()

function handleProductList(){
    const productLists = document.querySelectorAll('.product-main__list')
    const productItems =  document.querySelectorAll('.product-main__list .product-main__item-thumb')
    const thumbs =  document.querySelectorAll('.product-main__item-thumb')
    const navBtnLeft = document.querySelector('.product-nav-icon-left')
    const navBtnRight = document.querySelector('.product-nav-icon-right')
    const n_navBtnLeft = document.querySelector('.n_product-nav-icon-left') // n_ : new products
    const n_navBtnRight = document.querySelector('.n_product-nav-icon-right')

    // scrollWhenDragging()
    handleWhenHoverOnProduct()
    // handleWhenClickNavBtn(navBtnLeft, navBtnRight)
    // handleWhenClickNavBtn(n_navBtnLeft, n_navBtnRight) // n_ : new products


    function scrollWhenDragging() {
        let isDown = false
        let startX
        let scrollLeft
    
        productLists.forEach(productList => {
            productList.addEventListener('mousedown', e => {
                isDown = true
                e.preventDefault()
                startX = e.pageX - productList.offsetLeft
                scrollLeft = productList.scrollLeft
            })
        
            productList.addEventListener('mouseup', () => {
                isDown = false
            })
            productList.addEventListener('mouseleave', () => {
                isDown = false
            })
        
            productList.addEventListener('mousemove', e => {
                productItems.forEach(item => {          //bug when click without scroll
                    item.onclick = event => {
                        event.preventDefault()
                    }
                })
        
                if(!isDown) return;
                e.preventDefault()
                const x = e.pageX - productList.offsetLeft
                const distanceMove = x - startX
                productList.scrollLeft = scrollLeft - distanceMove
            })
        })
        
    }
    function handleWhenHoverOnProduct(){
        
        thumbs.forEach(thumb => {
            const thumbImgOverlay = thumb.querySelector('img:last-of-type')
            const productActions = thumb.nextElementSibling
        
            thumb.onmouseover = () => {
                thumbImgOverlay.style.opacity = '1'
                productActions.style.transform = 'scaleX(1)'
            }
            
            thumb.onmouseout = () => {
                thumbImgOverlay.style.opacity = '0'
                productActions.style.transform = 'scaleX(0)'
            }
            
            productActions.onmouseover = () => {
                thumbImgOverlay.style.opacity = '1'
                productActions.style.transform = 'scaleX(1)'
            }
            
            productActions.onmouseout = () => {
                thumbImgOverlay.style.opacity = '0'
                productActions.style.transform = 'scaleX(0)'
            }
        })
    }
    // have bug when click and no smooth (can use scrollTo method )
    function handleWhenClickNavBtn(leftBtn, rightBtn) {
        const list = rightBtn.previousElementSibling.firstElementChild
        let isClickLeft = false;
        let isClickRight = true;
        let widthScroll = 285
        const listLength = list.childElementCount
        const listWidth = list.firstElementChild.offsetWidth * (listLength - 4) + 30 * (listLength - 4)
        
        list.onmouseover = () => {
            list.style.scrollBehavior = 'unset'
        }
        list.onmouseout = () => {
            list.style.scrollBehavior = 'smooth'
        }

        list.onscroll = () => {
            if(list.scrollLeft > 0){
                isClickLeft = true
            }else{
                isClickLeft = false
            }

            if(list.scrollLeft > listWidth -1 ){
                isClickRight = false
            }else{
                isClickRight= true
            }

            if(isClickLeft){
                leftBtn.classList.add('active')
                leftBtn.style.pointerEvents = 'auto'

                leftBtn.onclick = () => {
                    
                    list.scrollLeft = - widthScroll + list.scrollLeft
                    console.log('left')
                }
            }else{
                leftBtn.classList.remove('active')
                leftBtn.style.pointerEvents = 'none'
            }

            if(isClickRight){
                rightBtn.classList.add('active')
                rightBtn.style.pointerEvents = 'auto'
                rightBtn.onclick = () => {
                    list.scrollLeft = widthScroll + list.scrollLeft
                    console.log('right')
                    console.log(list)  

                }
            }else{
                rightBtn.classList.remove('active')
                rightBtn.style.pointerEvents = 'none'
            }

            
        }
        rightBtn.onclick = () => {
        list.scrollLeft = widthScroll + list.scrollLeft
        console.log('right')
        console.log(list)
        } 
        
    }

    const options = {
        slidesPerView: 2,
        slidesPerGroup:1,
        spaceBetween:20,
        navigation: {
            nextEl: '.product-nav-icon-right',
            prevEl: '.product-nav-icon-left',
            // lockClass:'none'
        },
        pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
        },
        breakpoints: {
            768: {
              slidesPerView: 3,
              spaceBetween: 20,
                        
            },
            990: {
              slidesPerView: 3,
              spaceBetween: 30,
                       

            },
            1200: {
              slidesPerView: 4,
              spaceBetween: 20,
                        

            },
        },
    }
    
    const productListSwiper = new Swiper('.product-main', options)
}

handleProductList()


function handlePromotionalProducts(){ 
    // p_ : promotional
    handlePromotionalList()
    handleCounter()
    handleWhenHoverImg()
    
    
    
    function handlePromotionalList(){
        const p_productList = new Swiper('.promotional-product-wrap', {
            slidesPerView:1,
            slidesPerGroup:1,
            loop:true,
            pagination: {
                el: '.swiper-pagination',
                type: 'bullets',
            },
            navigation: {
                nextEl: '.promotional-product-navIcon-next',
                prevEl: '.promotional-product-navIcon-prev',
            },
            autoplay: {
                delay: 5000,
                disableOnInteraction: true,
            }
        })
    }
    function handleCounter(){
        const counters = document.querySelectorAll('.promotional-product__counter')
        const nextTime = new Date('sep 27 2021 00:00:00')  //can edit
          // the result is  millisecond

        counters.forEach(counter => {
            const days = counter.querySelector('.promotional-product__counter-days')
            const hours = counter.querySelector('.promotional-product__counter-hours')
            const minutes = counter.querySelector('.promotional-product__counter-minutes')
            const seconds = counter.querySelector('.promotional-product__counter-seconds')

            function countDown() {
                const currentTime = new Date()
                const diff = nextTime - currentTime
                const dayCount = Math.floor(diff / 1000 / 60 / 60 / 24)
                const hourCount = Math.floor(diff / 1000 / 60 / 60) % 24
                const minuteCount = Math.floor(diff / 1000 / 60) % 60
                const secondCount = Math.floor(diff / 1000) % 60

                days.innerHTML = `<b>${dayCount >= 10 ? dayCount : '0' + dayCount}</b> <br> Days`
                hours.innerHTML = `<b>${hourCount >= 10 ? hourCount : '0' + hourCount}</b> <br> Hours`
                minutes.innerHTML = `<b>${minuteCount >= 10 ? minuteCount : '0' + minuteCount}</b> <br> Minutes`
                seconds.innerHTML = `<b>${secondCount >= 10 ? secondCount : '0' + secondCount}</b> <br> Seconds`
            }

            setInterval(() => {
                countDown()
            },1000)
        })
    }
    function handleWhenHoverImg(){
        const p_thumbs = document.querySelectorAll('.promotional-product__thumb')
        p_thumbs.forEach(thumb => {
            const thumbImgOverlay = thumb.querySelector('img:last-child')

            thumb.onmouseover = () => {
                thumbImgOverlay.style.opacity = '1'
            }

            thumb.onmouseout = () => {
                thumbImgOverlay.style.opacity = '0'
            }
        })
    }

}

handlePromotionalProducts()

function handleProductClassification(){
    handleChangeTab()
    scrollTabIntoViewInMobile()


    function handleChangeTab(){
        const productGroup = document.querySelectorAll('.product-main__list.wrap')
        const groupTabs = document.querySelectorAll('.pcl-tab')


        groupTabs.forEach((tab, index) => {
            tab.onclick = () => {
                const groupActive = document.querySelector('.product-main__list.wrap.active')
                const tabActive = document.querySelector('.pcl-tab.active')

                tabActive.classList.remove('active')
                tab.classList.add('active')
                groupActive.classList.remove('active')
                productGroup[index].classList.add('active')
            }
        })
    }

    function scrollTabIntoViewInMobile(){
        const tabs = document.querySelectorAll('.pcl-tab')

        tabs.forEach((tab) => {
            tab.addEventListener('click', function(){
                if(tab.nextElementSibling){
                    tab.nextElementSibling.scrollIntoView({
                        behavior:'smooth',
                        block:'nearest',
                        inline:'end'
                    })
                }
            })
        })
    }
}

handleProductClassification()

function handelNewsList() {
    var swiper = new Swiper('.news-container', {
        slidesPerView: 1,
        spaceBetween: 10,
        // slidesPerGroup: 2,
        loop: true,
        pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
        },
        navigation: {
            nextEl: '.news-navBtn-next',
            prevEl: '.news-navBtn-prev',
        },
        breakpoints: {
            768: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            990: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            1200: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
        },
    })
}
handelNewsList()

function handlePartnersList() {
    const partnersList = new Swiper('.partners-container', {
        slidesPerView: 3,
        spaceBetween: 50,
        // slidesPerGroup: 2,
        loop: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: true,
        },
        breakpoints: {
            768: {
              slidesPerView: 5,
              spaceBetween: 60,
            },
            990: {
              slidesPerView: 5,
              spaceBetween: 50,
            },
            1200: {
              slidesPerView: 7,
              spaceBetween: 30,
            },
        },
    })
}
handlePartnersList()


function handleBackToTopBtn() {
    const backToTopBtn = document.querySelector('.back-to-top-btn')
    window.onscroll = () => {
        if(document.documentElement.scrollTop > 300){
            backToTopBtn.style.left = `${document.documentElement.offsetWidth < 768 ? -15 : 0}px`
        }else{
            backToTopBtn.style.left = '40px'
        }
    }    

    backToTopBtn.onclick = () => {
        document.documentElement.scrollTop = 0
    }
}

handleBackToTopBtn()

function handelModelForm(){
    const modalForm = document.querySelector('.modal-form')
    const switchBtns = document.querySelectorAll('.form-switch-btn')
    const formMains = document.querySelectorAll('.form-content')
    const userBtn = document.querySelectorAll('.header-user__item')[0]
    const closeBtn = document.querySelector('.form-close-btn')
    const overlay = modalForm.querySelector('.overlay')

    userBtn.onclick = () => {
        modalForm.style.display = 'flex'
    }
    closeBtn.onclick = () => {
        modalForm.style.display = 'none'
    }

    overlay.onclick = () => {
        modalForm.style.display = 'none'

    }


    switchBtns.forEach((btn, index) => {
        btn.onclick = () => {
            const activeForm = document.querySelector('.form-content.active')
            const activeBtn = document.querySelector('.form-switch-btn.active')

            activeBtn.classList.remove('active')
            btn.classList.add('active')
            activeForm.classList.remove('active')
            formMains[index].classList.add('active')
        }
    })
}

handelModelForm()


function handleModalSidebar() {
    const listBtn = document.querySelectorAll('.header-user__item') // 5 btn 
    const [user, ...newListBtn] = listBtn  // newListBtn has 3 btns (wishList, cartList, compareList)
    const modalSidebar = document.querySelector('.modal-sidebar')
    const closeBtn = document.querySelectorAll('.close-modal-sidebar')
    const sidebarContents = document.querySelectorAll('.sidebar-content')
    const overlay = modalSidebar.querySelector('.overlay')
    const compareBtns = document.querySelectorAll('.product-action-compare')
    const addToCartBtns = document.querySelectorAll('.product-action-addToCart')
    const likeBtns = document.querySelectorAll('.product-action-like')

    closeBtn.forEach(btn => {
        btn.onclick = closeSidebar
    })

    overlay.onclick = closeSidebar

    newListBtn.forEach((btn, index) => {
        btn.onclick = () => {
            showSidebar(index)
        }
    })

    // show compare sidebar when click compareBtn on products
    compareBtns.forEach(btn => {   
        btn.onclick = () => {
            showSidebar(2)
        }
    })

    addToCartBtns.forEach(btn => {
        btn.onclick = () => {
            showSidebar(1)
        }
    })

    likeBtns.forEach(btn => {
        btn.onclick = () => {
            showSidebar(0)
        }
    })

    const menuItems = document.querySelectorAll('.sidebar-main-item.has-subMenu') 
    const subMenus = document.querySelectorAll('.sidebar-main-subList')
    menuItems.forEach((item, index )=> {
        item.onclick = (e) => {
            
            e.preventDefault()
            e.stopPropagation()
            if(e.target.matches('.sidebar-main-item.has-subMenu > .sidebar-main-link')){
                if(item.getAttribute('class').includes('active')){
                    hideSubMenu(item, index)
                }else{
                    showSubMenu(item, index)
                    
                }
                item.classList.toggle('active')
            }
            
            // console.log(e.target)
        }
    })

    function closeSidebar(){
        document.querySelector('.sidebar-container').animate([
            {transform: 'translateX(100%)'}
        ],{
            duration:300,
            fill: "forwards"
        })
        modalSidebar.querySelector('.overlay').animate([
        { opacity: 0},
            
        ],{
            duration:300,
            
        })
        setTimeout(() => {
        modalSidebar.style.display = 'none'

        },300)
    }

    function showSidebar(index) {
        const activeContent = document.querySelector('.sidebar-content.active')
            modalSidebar.style.display = 'block'
            document.querySelector('.sidebar-container').animate([
                {transform: 'translateX(0)'}
            ],{
                duration:300,
                fill: "forwards"
            })
            activeContent.classList.remove('active')
            sidebarContents[index].classList.add('active')
    }

    function hideSubMenu(item, index){
        subMenus[index].style.zIndex = '-1'
        item.nextElementSibling.animate([
            {marginTop: `unset`}
        ],{
            duration:300,
            fill:"forwards"
        })

        subMenus[index].animate([
            {transform: 'translateY(-20px)'},
        ],{
            duration:300,
            fill:"forwards"
        })

        item.querySelector('ion-icon').animate([
            {transform :'rotate(0)'}
        ],{
            duration:400,
            fill:"forwards"
        })

        setTimeout(() => {
            subMenus[index].style.display = 'none'
        }, 300)
    }

    function showSubMenu(item, index){
        subMenus[index].style.display = 'block'
        item.nextElementSibling.animate([
            {marginTop: `${subMenus[index].offsetHeight}px`}
        ],{
            duration:300,
            fill:"forwards"
        })

        subMenus[index].animate([
            {transform: 'translateY(0)'},
            // {zIndex: '1'}
        ],{
            duration:300,
            fill:"forwards"
        })

        setTimeout(() => {
            subMenus[index].style.zIndex = '1'
        },300)

        item.querySelector('ion-icon').animate([
            {transform :'rotate(90deg)'}
        ],{
            duration:400,
            fill:"forwards"
        })
    }
}

handleModalSidebar()

function handleMobileBanner() {
    const PcBanner = './images/banner.jpg'
    const mobileBanner = './images/mobile-banner.jpg'

    window.onresize = () => {
        if(document.documentElement.offsetWidth < 768){

            document.querySelector('.banner img').setAttribute('src', mobileBanner)
        }else{
            document.querySelector('.banner img').setAttribute('src', PcBanner)

        }
    }
}

handleMobileBanner()

function handleMobileSupport() {

}
const mobileSupport = document.querySelector('.mobile-support')
const supportBtn = document.querySelector('.mobile-support-btn')
const supportItems = document.querySelectorAll('.mobile-support-item')

supportBtn.addEventListener('click', function(){
    supportBtn.classList.toggle('active')

    if(supportBtn.classList.contains('active')){
        supportItems.forEach(item => {
            item.style.transform = 'scale(1)'
            mobileSupport.style.zIndex = '1'

        })
    }else{
        supportItems.forEach(item => {
            item.style.transform = 'scale(0)'
            mobileSupport.style.zIndex = '-1'
        })
    }
})







