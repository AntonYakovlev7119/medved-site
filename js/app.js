const navContainer = document.querySelector(".header__navigation");
const toggleMenu = document.querySelector(".header__toggle-menu");
const woodProductsDescriptionContainer = document.querySelector(".wood-products-description-container");

// let highestWPElem = woodProductsDescriptionContainer.children.item(0);

// getHighestWPElement();

// Проверка прокрутки страницы для изменения навигации

(window.onscroll = function() {
  let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
  if (scrollTop > 64) {
    navContainer.classList.add("header__navigation--scrolled");
  }
  if (scrollTop < 64) {
    navContainer.classList.remove("header__navigation--scrolled");
  }
})();

toggleMenu.addEventListener("click", () => {
  navContainer.classList.toggle(".header__mobile-navigation--active");
});

// Отслеживание курсора

document.addEventListener("mousemove", (e) => {
  Object.assign(document.documentElement, {
    // style: `
		// --move-x: ${(e.clientX - window.innerWidth / 2) * -0.01}deg;
		// --move-y: ${(e.clientY - window.innerHeight / 2) * 0.015}deg;
		// `,
    style: `
		--move-x: ${(e.clientX - window.innerWidth / 2) * 0.05}px;
		--move-y: ${(e.clientY - window.innerHeight / 2) * 0.025}px;
		`,
  });
});

//Поиск самого большого по высоте .wood-products__description элемента

// function getHighestWPElement(){
  
//   Array.from(woodProductsDescriptionContainer.children).forEach((elem)=> {
//   if(elem.offsetHeight > highestWPElem.offsetHeight) highestWPElem = elem;
// });
// setTimeout(()=>{
//   woodProductsDescriptionContainer.style.cssText = `--wp-height: ${highestWPElem.offsetHeight}px`;
// }, 800)
// };

// Изменение высоты wood_products_description_container при изменении размера окна 

// window.onresize = ()=>{
//   setTimeout(()=>{
//     woodProductsDescriptionContainer.style.cssText = `--wp-height: ${highestWPElem.offsetHeight}px`;
//   }, 800)
  
// }


