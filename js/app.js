const navContainer = document.querySelector(".header__navigation");
const toggleMenu = document.querySelector(".header__toggle-menu");
const headerBackground = document.querySelector(".header__background");
const treeClearingImg = document.querySelector(".tree-clearing__background");

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
  Object.assign(headerBackground, {
    style: `
		--move-x: ${(e.clientX - window.innerWidth / 2) * 0.05}px;
		--move-y: ${(e.clientY - window.innerHeight / 2) * 0.025}px;
		`,
  });
});

// Отслеживание прокрутки

window.addEventListener("scroll", (e)=>{
  treeClearingImg.style.cssText = `--scrollTop: ${this.scrollY}px`;
})

// window.addEventListener("scroll", (e)=>{
//   Object.assign(document.documentElement, {style: `--scrollTop: ${this.scrollY}px`}
//   )});
