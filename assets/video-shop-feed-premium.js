// LAZYLOAD
document.addEventListener("DOMContentLoaded", function() {
  var lazyVideos = [].slice.call(document.querySelectorAll("video.m_pvf_lazyload"));
  if ("IntersectionObserver" in window) {
    var lazyVideoObserver = new IntersectionObserver(function(entries, observer) {
      entries.forEach(function(video) {
        if (video.isIntersecting) {
          for (var source in video.target.children) {
            var videoSource = video.target.children[source];
            if (typeof videoSource.tagName === "string" && videoSource.tagName === "SOURCE") {
              videoSource.src = videoSource.dataset.src;
            }
          }
          video.target.load();
          video.target.classList.remove("m_pvf_lazyload");
          lazyVideoObserver.unobserve(video.target);
        }
      });
    });
    lazyVideos.forEach(function(lazyVideo) {lazyVideoObserver.observe(lazyVideo);});
  }
});

//ADD TO CART
async function m_pvf_addToCart(variantId, element) {
  element.innerHTML = '<span class="merox-loader"></span>';
  const result = await fetch("/cart/add.json", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      id: variantId,
      quantity: 1
    })
  }).then((response) => response.json()
  ).then((data) => {
    // element.innerHTML = '<span>Added</span>';
    // replace the button with an anchor tag that redirects to the cart page
    const cartLink = document.createElement('a');
    cartLink.href = '/cart';
    cartLink.classList.add('m_add_to_cart', 'm_sticky_cta');
    cartLink.textContent = 'Go to Cart';
    element.parentNode.replaceChild(cartLink, element);
  });
}

// ADD TO CART FOR PRODUCT WITH VARIANTS  
async function m_pvf_addToCartVariant(element) {
  element.innerHTML = '<span class="merox-loader"></span>';
  var originalVariantSelect = element.parentElement.parentElement.querySelector('.m_productOriginalVariants');
  var variantId = originalVariantSelect.options[originalVariantSelect.selectedIndex].value;
  const result = await fetch("/cart/add.json", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      id: variantId,
      quantity: 1
    })
  }).then((response) => response.json()
  ).then((data) => {
    // element.innerHTML = '<span>Added</span>';
    // replace the button with an anchor tag that redirects to the cart page
    const cartLink = document.createElement('a');
    cartLink.href = '/cart';
    cartLink.classList.add('m_add_to_cart', 'm_sticky_cta');
    cartLink.textContent = 'Go to Cart';
    element.parentNode.replaceChild(cartLink, element);
  });
}

//ADD TO CART
async function m_pvf_addToCartMob(variantId, element) {
  element.innerHTML = '<span class="merox-loader"></span>';
  const result = await fetch("/cart/add.json", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      id: variantId,
      quantity: 1
    })
  }).then((response) => response.json()
  ).then((data) => {
    // element.innerHTML = '<span>Added</span>';
    element.closest('.swiper-slide').querySelector('.m_addToCart').innerHTML = '<span><svg xmlns="http://www.w3.org/2000/svg" class="svg-icon" style="width: 2em;height: 2em;vertical-align: middle;fill: white;overflow: hidden;" viewBox="0 0 1024 1024" version="1.1"><path d="M750.933333 341.333333c-3.413333 0-10.24 0-13.653333-3.413333l-68.266667-68.266667c-6.826667-6.826667-6.826667-17.066667 0-23.893333s17.066667-6.826667 23.893334 0L750.933333 300.373333l157.013334-157.013333c6.826667-6.826667 17.066667-6.826667 23.893333 0s6.826667 17.066667 0 23.893333l-170.666667 170.666667c0 3.413333-6.826667 3.413333-10.24 3.413333zM887.466667 750.933333H402.773333c-71.68 0-139.946667-51.2-153.6-116.053333L167.253333 102.4H34.133333c-10.24 0-17.066667-6.826667-17.066666-17.066667S23.893333 68.266667 34.133333 68.266667h146.773334c6.826667 0 17.066667 6.826667 17.066666 13.653333l85.333334 546.133333c10.24 47.786667 64.853333 88.746667 119.466666 88.746667H887.466667c10.24 0 17.066667 6.826667 17.066666 17.066667s-6.826667 17.066667-17.066666 17.066666zM375.466667 1024c-64.853333 0-119.466667-54.613333-119.466667-119.466667S310.613333 785.066667 375.466667 785.066667s119.466667 54.613333 119.466666 119.466666S440.32 1024 375.466667 1024z m0-204.8c-47.786667 0-85.333333 37.546667-85.333334 85.333333S327.68 989.866667 375.466667 989.866667s85.333333-37.546667 85.333333-85.333334S423.253333 819.2 375.466667 819.2zM785.066667 1024c-64.853333 0-119.466667-54.613333-119.466667-119.466667S720.213333 785.066667 785.066667 785.066667s119.466667 54.613333 119.466666 119.466666S849.92 1024 785.066667 1024z m0-204.8c-47.786667 0-85.333333 37.546667-85.333334 85.333333S737.28 989.866667 785.066667 989.866667s85.333333-37.546667 85.333333-85.333334S832.853333 819.2 785.066667 819.2z" fill=""/><path d="M785.066667 443.733333c-122.88 0-221.866667-98.986667-221.866667-221.866666S662.186667 0 785.066667 0s221.866667 98.986667 221.866666 221.866667S907.946667 443.733333 785.066667 443.733333z m0-409.6c-102.4 0-187.733333 85.333333-187.733334 187.733334S682.666667 409.6 785.066667 409.6s187.733333-85.333333 187.733333-187.733333S887.466667 34.133333 785.066667 34.133333z" fill=""/><path d="M853.333333 580.266667H256c-10.24 0-17.066667-6.826667-17.066667-17.066667s6.826667-17.066667 17.066667-17.066667H853.333333c27.306667 0 64.853333-13.653333 68.266667-51.2l10.24-58.026666c3.413333-10.24 10.24-17.066667 20.48-13.653334 10.24 3.413333 17.066667 10.24 13.653333 20.48l-10.24 58.026667c-6.826667 44.373333-47.786667 78.506667-102.4 78.506667zM512 238.933333H204.8c-10.24 0-17.066667-6.826667-17.066667-17.066666S194.56 204.8 204.8 204.8h307.2c10.24 0 17.066667 6.826667 17.066667 17.066667s-6.826667 17.066667-17.066667 17.066666z" fill=""/></svg></span>';
    // element.closest('.m_product_overlay_info').style.display = "none";
    // element.closest('.m_product_info_popup').classList.remove('m_animatedDrawer');

    // replace the button with an anchor tag that redirects to the cart page
    const cartLink = document.createElement('a');
    cartLink.href = '/cart';
    cartLink.classList.add('m_add_to_cart', 'm_sticky_cta');
    cartLink.textContent = 'Go to Cart';
    element.parentNode.replaceChild(cartLink, element);
  });
}

// ADD TO CART FOR PRODUCT WITH VARIANTS  
async function m_pvf_addToCartVariantMob(element) {
  element.innerHTML = '<span class="merox-loader"></span>';
  var originalVariantSelect = element.parentElement.parentElement.querySelector('.m_productOriginalVariants');
  var variantId = originalVariantSelect.options[originalVariantSelect.selectedIndex].value;
  const result = await fetch("/cart/add.json", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      id: variantId,
      quantity: 1
    })
  }).then((response) => response.json()
  ).then((data) => {
    // element.innerHTML = '<span>Added</span>';
    element.closest('.swiper-slide').querySelector('.m_addToCart').innerHTML = '<span><svg xmlns="http://www.w3.org/2000/svg" class="svg-icon" style="width: 2em;height: 2em;vertical-align: middle;fill: white;overflow: hidden;" viewBox="0 0 1024 1024" version="1.1"><path d="M750.933333 341.333333c-3.413333 0-10.24 0-13.653333-3.413333l-68.266667-68.266667c-6.826667-6.826667-6.826667-17.066667 0-23.893333s17.066667-6.826667 23.893334 0L750.933333 300.373333l157.013334-157.013333c6.826667-6.826667 17.066667-6.826667 23.893333 0s6.826667 17.066667 0 23.893333l-170.666667 170.666667c0 3.413333-6.826667 3.413333-10.24 3.413333zM887.466667 750.933333H402.773333c-71.68 0-139.946667-51.2-153.6-116.053333L167.253333 102.4H34.133333c-10.24 0-17.066667-6.826667-17.066666-17.066667S23.893333 68.266667 34.133333 68.266667h146.773334c6.826667 0 17.066667 6.826667 17.066666 13.653333l85.333334 546.133333c10.24 47.786667 64.853333 88.746667 119.466666 88.746667H887.466667c10.24 0 17.066667 6.826667 17.066666 17.066667s-6.826667 17.066667-17.066666 17.066666zM375.466667 1024c-64.853333 0-119.466667-54.613333-119.466667-119.466667S310.613333 785.066667 375.466667 785.066667s119.466667 54.613333 119.466666 119.466666S440.32 1024 375.466667 1024z m0-204.8c-47.786667 0-85.333333 37.546667-85.333334 85.333333S327.68 989.866667 375.466667 989.866667s85.333333-37.546667 85.333333-85.333334S423.253333 819.2 375.466667 819.2zM785.066667 1024c-64.853333 0-119.466667-54.613333-119.466667-119.466667S720.213333 785.066667 785.066667 785.066667s119.466667 54.613333 119.466666 119.466666S849.92 1024 785.066667 1024z m0-204.8c-47.786667 0-85.333333 37.546667-85.333334 85.333333S737.28 989.866667 785.066667 989.866667s85.333333-37.546667 85.333333-85.333334S832.853333 819.2 785.066667 819.2z" fill=""/><path d="M785.066667 443.733333c-122.88 0-221.866667-98.986667-221.866667-221.866666S662.186667 0 785.066667 0s221.866667 98.986667 221.866666 221.866667S907.946667 443.733333 785.066667 443.733333z m0-409.6c-102.4 0-187.733333 85.333333-187.733334 187.733334S682.666667 409.6 785.066667 409.6s187.733333-85.333333 187.733333-187.733333S887.466667 34.133333 785.066667 34.133333z" fill=""/><path d="M853.333333 580.266667H256c-10.24 0-17.066667-6.826667-17.066667-17.066667s6.826667-17.066667 17.066667-17.066667H853.333333c27.306667 0 64.853333-13.653333 68.266667-51.2l10.24-58.026666c3.413333-10.24 10.24-17.066667 20.48-13.653334 10.24 3.413333 17.066667 10.24 13.653333 20.48l-10.24 58.026667c-6.826667 44.373333-47.786667 78.506667-102.4 78.506667zM512 238.933333H204.8c-10.24 0-17.066667-6.826667-17.066667-17.066666S194.56 204.8 204.8 204.8h307.2c10.24 0 17.066667 6.826667 17.066667 17.066667s-6.826667 17.066667-17.066667 17.066666z" fill=""/></svg></span>';
    // element.closest('.m_product_overlay_info').style.display = "none";
    // element.closest('.m_product_info_popup').classList.remove('m_animatedDrawer');

    // replace the button with an anchor tag that redirects to the cart page
    const cartLink = document.createElement('a');
    cartLink.href = '/cart';
    cartLink.classList.add('m_add_to_cart', 'm_sticky_cta');
    cartLink.textContent = 'Go to Cart';
    element.parentNode.replaceChild(cartLink, element);
  });
}

var atcBtns = document.querySelectorAll('.m_atc_btn_variants');
atcBtns.forEach(function (atcBtn) {
  atcBtn.addEventListener('click', function (ele) {
    var originalVariantSelect = this.parentElement.parentElement.querySelector('.m_productOriginalVariants');
    var selectedOriginalVariant = originalVariantSelect.options[originalVariantSelect.selectedIndex].value;
    // console.log(selectedOriginalVariant);
    m_pvf_addToCart(selectedOriginalVariant, ele);
  });
});

const blockComponent = document.querySelectorAll('.merox_pvf_pro_slider_component');
blockComponent.forEach(function(block){
  var blockID = block.getAttribute('data-block-id');
  var isSoundEnabled = block.getAttribute('data-sound-config');
  console.log(blockID +isSoundEnabled);
  premiumReelsConfig(blockID, isSoundEnabled);
}); 

function premiumReelsConfig(blockId, isSoundEnabled) {
window.addEventListener("load", function () {
  const $Speed = 1000;
  console.log('swiper initialized');

  if (screen.width <= 768) {
      const horizontalSwiper = new Swiper(".outer-slider-mobile-"+blockId+" .mainSwiper", {
      loop: false,
      spaceBetween: 10,
      slidesPerView: 2.5,
      freeMode: true,
      speed: $Speed,
      lazy: { loadPrevNext: true, },
      navigation: {
        nextEl: ".swiper-button-next-"+blockId,
        prevEl: ".swiper-button-prev-"+blockId,
      },
      breakpoints: {
        768: {
          slidesPerView: 2,
        }
      },
    });
      const vertical = document.querySelector('.outer-slider-mobile-'+blockId+' .verticalSwiper');
      const verticalvideos = document.querySelectorAll('.outer-slider-mobile-'+blockId+' .verticalSwiper video');
      const verticalSwiper = new Swiper(vertical, {
        loop: false,
        spaceBetween: 0,
        slidesPerView: 1,
        direction: "vertical",
        longSwipesRatio: 0.01,
        followFinger: false,
        grabCursor: true,
        // speed: $Speed,
        lazy: { loadPrevNext: true, },
        navigation: {
          nextEl: ".swiper-button-next-"+blockId,
          prevEl: ".swiper-button-prev-"+blockId,
        },
        thumbs: {
          swiper: horizontalSwiper,
        },
        on: {
          slideChange: function () {
            const activeIndex = this.activeIndex;
            verticalvideos.forEach((video, index) => {
              setTimeout(function () {
                if(index === activeIndex) {
                   if(isSoundEnabled == 'true'){video.muted = false;}
                  video.play();
                }
                 else {
                  video.pause();
                }
              },500);
              var productInfoDrawer = document.querySelectorAll('.outer-slider-mobile-'+blockId+' .m_product_overlay_info');
              productInfoDrawer.forEach(function (element) {
                element.style.display = "none";
                element.querySelector('.m_product_info_popup').classList.remove('m_animatedDrawer');
              });
            });
          }
        }
      });

    var swiperSlides = document.querySelectorAll('.outer-slider-mobile-'+blockId+' .mainSwiper .swiper-slide');
    swiperSlides.forEach(function (slide) {
      slide.addEventListener('click', function() {
        document.querySelector('.outer-slider-mobile-'+blockId+' #modalchart').style.display = 'block';
        // document.querySelector('.outer-slider-mobile-'+blockId+' #modalchart').style.transform = 'translateY(0px)';
        document.querySelector('body').style.overflow = 'hidden';
        setTimeout(function () { 
          // console.log('clicked'); 
          document.querySelector('.outer-slider-mobile-'+blockId+' .verticalSwiper .swiper-slide-active video').play(); 
           if(isSoundEnabled == 'true'){document.querySelector('.outer-slider-mobile-'+blockId+' .verticalSwiper .swiper-slide-active video').muted = false;}
        }, 200);
      });
    });

    document.querySelector('.outer-slider-mobile-'+blockId+' #modalchart .close').addEventListener('click', function () {
      document.querySelector('.outer-slider-mobile-'+blockId+' #modalchart').style.display = 'none';
      // document.querySelector('.outer-slider-mobile-'+blockId+' #modalchart').style.transform = 'translateY(100vh)';
      document.querySelector('body').style.overflow = 'auto';
      var slides = document.querySelectorAll(".outer-slider-mobile-"+blockId+" .verticalSwiper video");
      slides.forEach(function (slide) {
        if(isSoundEnabled == 'true'){slide.muted = true;}
      });
    });

    document.querySelector('.outer-slider-mobile-'+blockId+' .modal2').addEventListener('click', function (event) {
      if (event.target == modalchart) {
        document.querySelector('.outer-slider-mobile-'+blockId+' #modalchart').style.display = 'none';
        // document.querySelector('.outer-slider-mobile-'+blockId+' #modalchart').style.transform = 'translateY(100vh)';
        document.querySelector('body').style.overflow = 'auto';
        var slides = document.querySelectorAll(".outer-slider-mobile .verticalSwiper video");
        slides.forEach(function (slide) {
         if(isSoundEnabled == 'true'){slide.muted = true;}
        });
      }
    });

    const bottomDrawers = document.querySelectorAll('.m_product_overlay_info');
    bottomDrawers.forEach(function(bottomDrawer){
      bottomDrawer.addEventListener('click', function(event){
        if(event.target == bottomDrawer){
          bottomDrawer.style.display = 'none';
          bottomDrawer.querySelector('.m_product_info_popup').classList.remove('m_animatedDrawer');
        }
      });
    });

     if(isSoundEnabled == 'true'){
    var toggleMute = document.querySelectorAll(".outer-slider-mobile-"+blockId+" .verticalSwiper video");
    toggleMute.forEach(function (element) {
      element.addEventListener('click', function () {
        if (element.muted) {
          element.muted = false;
          element.parentNode.querySelector('.outer-slider-mobile-'+blockId+' .soundIconsFixed .m_unmuteIcon').style.display = "block";
          element.parentNode.querySelector('.outer-slider-mobile-'+blockId+' .soundIconsFixed .m_muteIcon').style.display = "none";
        } else {
          element.muted = true;
          element.parentNode.querySelector('.outer-slider-mobile-'+blockId+' .soundIconsFixed .m_muteIcon').style.display = "block";
          element.parentNode.querySelector('.outer-slider-mobile-'+blockId+' .soundIconsFixed .m_unmuteIcon').style.display = "none";
        } 

        // Show the icons for 2 seconds and then hide them
        const icons = element.parentNode.querySelectorAll('.outer-slider-mobile-'+blockId+'  .soundIconsFixed');
        icons.forEach(function (icon) {
          icon.style.display = "block";
          setTimeout(() => {
            icon.style.display = "none";
          }, 2000);
        });
      });
    });
    }
    
    var slideInfo = document.querySelectorAll('.outer-slider-mobile-'+blockId+' .verticalSwiper .m_verticalSlideInfoWrapper');
    slideInfo.forEach(function (ele) {
      ele.addEventListener('click', function () {
        ele.closest('.swiper-slide').querySelector('.m_product_overlay_info').style.display = 'block';
        // ele.closest('.swiper-slide').querySelector('.m_product_info_popup').style.bottom = '0%';
        ele.closest('.swiper-slide').querySelector('.m_product_info_popup').classList.add('m_animatedDrawer');
      });
    });

    var closePopup = document.querySelectorAll('.outer-slider-mobile-'+blockId+' .verticalSwiper .m_popup_header');
    closePopup.forEach(function (ele) {
      ele.addEventListener('click', function () {
        ele.closest('.m_product_overlay_info').style.display = 'none';
        // ele.closest('.m_product_info_popup').style.bottom = '-80%';
        ele.closest('.m_product_info_popup').classList.remove('m_animatedDrawer');
      });
    });

    const shareButtonMobile = document.querySelector('.outer-slider-mobile-'+blockId+' .m_shareProductMobile');
    shareButtonMobile.addEventListener('click', async () => {
      var activeSlide = document.querySelector('.outer-slider-mobile-'+blockId+' .verticalSwiper .swiper-slide-active').getAttribute('data-vertical-index');
      try {
        const url = window.location.href;
        const urlObj = new URL(url);
        urlObj.search = '';
        urlObj.hash = '';
        const result = urlObj.toString();
    
        const shareDataMob = {
          title: 'Check out this link',
          url: result + '?scrollToPVF=true'
        };
        await navigator.share(shareDataMob);
        // console.log('Shared successfully');
      } catch (err) {
        // console.error('Error sharing:', err);
      }
    });
    
  } else {

    const desktopSwiper = new Swiper(".outer-slider-desktop-"+blockId+" .mainSwiperDesktop", {
      loop: false,
      spaceBetween: 10,
      slidesPerView: 2,
      freeMode: true,
      speed: $Speed,
      lazy: { loadPrevNext: true, },
      navigation: {
        nextEl: ".swiper-button-next-"+blockId,
        prevEl: ".swiper-button-prev-"+blockId,
      },
      breakpoints: {
        1200: {
          slidesPerView: 5,
        },
        900: {
          slidesPerView: 4,
        },
        769: {
          slidesPerView: 3,
        }
      },
    });

    const popupSwiper = document.querySelector('.outer-slider-desktop-'+blockId+' -'+blockId+' .popupSwiperDesktop');
    const popupSwiperDesktop = new Swiper(popupSwiper, {
        loop: false,
        spaceBetween: 0,
        slidesPerView: 1,
        longSwipesRatio: 0.01,
        followFinger: false,
        grabCursor: true,
        speed: $Speed,
        lazy: { loadPrevNext: true, },
        navigation: {
          nextEl: ".swiper-button-next-"+blockId,
          prevEl: ".swiper-button-prev-"+blockId,
        },
        thumbs: {
          swiper: desktopSwiper,
        },
      });

      // Mute/Unmute on slide change function
      popupSwiperDesktop.on('slideChange', () => {
        var slides = document.querySelectorAll(".outer-slider-desktop-"+blockId+" .popupSwiperDesktop video");
        slides.forEach(function (slide) {
           if(isSoundEnabled == 'true'){slide.muted = true;}
          slide.pause();
        });
        setTimeout(function () { document.querySelector('.outer-slider-desktop-'+blockId+' -'+blockId+' .popupSwiperDesktop .swiper-slide-active video').play(); 
         if(isSoundEnabled == 'true'){document.querySelector('.outer-slider-desktop-'+blockId+' -'+blockId+' .popupSwiperDesktop .swiper-slide-active video').muted = false;}
      }, 200);
      });

    var desktopSlides = document.querySelectorAll('.outer-slider-desktop-'+blockId+'  .mainSwiperDesktop .swiper-slide');
    desktopSlides.forEach(function (slide) {
      slide.addEventListener('click', function () {
        document.querySelector('.outer-slider-desktop-'+blockId+'  #modalchart1').style.display = 'block';
        document.querySelector('.outer-slider-desktop-'+blockId+'  #modalchart1 .m_modalAnimation').classList.add("m_modalActive");
        document.querySelector('body').style.overflow = 'hidden';
        var index = this.getAttribute('data-horizontal-index');
         if(isSoundEnabled == 'true'){setTimeout(function () { document.querySelector('.outer-slider-desktop-'+blockId+'  .popupSwiperDesktop .swiper-slide-active video').muted = false; }, 200);}
      });
    });

    document.querySelector('.outer-slider-desktop-'+blockId+'  #modalchart1 .close1').addEventListener('click', function () {
      document.querySelector('.outer-slider-desktop-'+blockId+'  #modalchart1').style.display = 'none';
      document.querySelector('.outer-slider-desktop-'+blockId+'  #modalchart1 .m_modalAnimation').classList.remove("m_modalActive");
      document.querySelector('body').style.overflow = 'auto';
      var slides = document.querySelectorAll(".outer-slider-desktop-"+blockId+" .popupSwiperDesktop video");
      slides.forEach(function (slide) {
         if(isSoundEnabled == 'true'){slide.muted = true;}
      });
    });

    document.querySelector('.outer-slider-desktop-'+blockId+' .modal21').addEventListener('click', function(event) {
      if(event.target == modalchart1) {
        document.querySelector('.outer-slider-desktop-'+blockId+' #modalchart1').style.display = 'none';
        document.querySelector('.outer-slider-desktop-'+blockId+' #modalchart1 .m_modalAnimation').classList.remove("m_modalActive");
        document.querySelector('body').style.overflow = 'auto';
        var slides = document.querySelectorAll(".outer-slider-desktop-"+blockId+" .popupSwiperDesktop video");
        slides.forEach(function (slide) {
           if(isSoundEnabled == 'true'){slide.muted = true;}
        });
      }
    });

     if(isSoundEnabled == 'true'){
      var toggleMuteDesktop = document.querySelectorAll(".outer-slider-desktop-"+blockId+" .popupSwiperDesktop video");
      toggleMuteDesktop.forEach(function (element) {
        element.addEventListener('click', function () {
          if (element.muted) {
            element.muted = false;
            element.parentNode.querySelector('.outer-slider-desktop-'+blockId+'  .soundIconsFixed .m_unmuteIcon').style.display = "block";
            element.parentNode.querySelector('.outer-slider-desktop-'+blockId+'  .soundIconsFixed .m_muteIcon').style.display = "none";
          } else {
            element.muted = true;
            element.parentNode.querySelector('.outer-slider-desktop-'+blockId+'  .soundIconsFixed .m_muteIcon').style.display = "block";
            element.parentNode.querySelector('.outer-slider-desktop-'+blockId+'  .soundIconsFixed .m_unmuteIcon').style.display = "none";
          }
  
          // Show the icons for 2 seconds and then hide them
          const desk_icons = element.parentNode.querySelectorAll('.outer-slider-desktop-'+blockId+'  .popupSwiperDesktop .soundIconsFixed');
          desk_icons.forEach(function (icon) {
            icon.style.display = "block";
            setTimeout(() => {
              icon.style.display = "none";
            }, 2000);
          });
        });
      });
    }
    const shareButtonDesktop = document.querySelector('.outer-slider-desktop-'+blockId+' .m_shareProductDesktop');
    shareButtonDesktop.addEventListener('click', async () => {
      var activeSlide = document.querySelector('.outer-slider-desktop-'+blockId+' .popupSwiperDesktop .swiper-slide-active').getAttribute('data-vertical-index');
      try {
        const url = window.location.href;
        const urlObj = new URL(url);
        urlObj.search = '';
        urlObj.hash = '';
        const result = urlObj.toString();
        const shareDataDesk = {
          title: 'Check out this link',
          url: result + '?scrollToPVF=true'
        };
        await navigator.share(shareDataDesk);
      } catch (err) {
      }
    });
  }

  var readMore = document.querySelectorAll('.moreDescription');
  readMore.forEach(function (desc) {
    desc.addEventListener('click', function () {
      desc.parentElement.style.display = 'none';
      desc.parentElement.parentElement.querySelector('.m_longDescription').style.display = 'block';
    });
  });

  var readLess = document.querySelectorAll('.lessDescription');
  readLess.forEach(function (desc) {
    desc.addEventListener('click', function () {
      desc.parentElement.style.display = 'none';
      desc.parentElement.parentElement.querySelector('.m_shortDescription').style.display = 'block';
    });
  });

  const variantWrapper = document.querySelectorAll('.m_product_variants');
  const originalVariants = document.querySelectorAll('.m_productOriginalVariants');

  variantWrapper.forEach(function (element) {
    var selects = element.parentElement.querySelectorAll('select');
    var selectedValues = [];
    for (var i = 0; i < selects.length; i++) {
      var select = selects[i];
      select.addEventListener('change', function () {
        selectedValues = [];
        for (var j = 0; j < selects.length; j++) {
          var selectedOption = selects[j].options[selects[j].selectedIndex];
          selectedValues.push(selectedOption.value);
        }
        var result = selectedValues.join(' / ');
        // console.log(result);
        // console.log(originalVariants);
        originalVariants.forEach(function (originalVariant) {
          var option = originalVariant.querySelector('option[data-title="' + result + '"]');
          if (option) {
            option.setAttribute('selected', 'selected');
          }
        });
      });
    }
  });
var urlParams = new URLSearchParams(window.location.search);
if (window.location.href.indexOf("scrollToPVF") > -1) {
  const section = document.querySelector('merox_pvf_pro_slider_component[data-block-id="'+blockId+'"]');
  window.scrollTo({
    top: section.offsetTop,
    behavior: 'smooth'
  });
}
  
});
}