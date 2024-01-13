const swiper_thumbs = new Swiper(".slider-thumbs .slider", {
  direction: "horizontal",
  loop: true,
  speed: 500,
  slidesPerView: 3,
  freeMode: true,
  autoScrollOffset: 2,

  breakpoints:{
    1200: {
      slidesPerView: 4,
    }
  }
});

const swiper = new Swiper(".slider-images .slider", {
  direction: "vertical",
  loop: true,
  speed: 1000,
  slidesPerView: 1,
  spaceBetween: 200,
  // freeMode: true,
  freeMode: {
    enabled: true,
  },
  grabCursor: true,

  autoplay: {
    delay: 3000,
    pauseOnMouseEnter: true,
    disableOnInteraction: false,
    // reverseDirection:true
  },

  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  thumbs: {
    swiper: swiper_thumbs,
  },

  
});

const woodProductsDescriptionArray = Array.from(document.querySelectorAll(".wood-products-description-container p"));
let prevWoodProductsDescriptionElement = woodProductsDescriptionArray[0];

 swiper.on("slideChange", ()=>{
  prevWoodProductsDescriptionElement.classList.remove("active");
  prevWoodProductsDescriptionElement = woodProductsDescriptionArray[swiper.realIndex];
  // setTimeout(()=>{
    woodProductsDescriptionArray[swiper.realIndex].classList.add("active");
    console.log(swiper.realIndex);
  // }, 800)
  
 })

