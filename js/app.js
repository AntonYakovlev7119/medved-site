const navContainer = document.querySelector(".header__navigation");
const toggleMenu = document.querySelector(".header__toggle-menu");
const headerBackground = document.querySelector(".header__background");
const treeClearingImg = document.querySelector(".tree-clearing__background");
const scrollTopButton = document.querySelector(".scroll-top-button");

// Проверка прокрутки страницы для изменения навигации

(window.onscroll = function () {
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

window.addEventListener("scroll", (e) => {
  const scrollY = this.scrollY || document.documentElement.scrollTop;

  treeClearingImg.style.cssText = `--scrollTop: ${scrollY}px`;

  if (scrollY >= 800) {
    scrollTopButton.classList.add("scroll-top-button--show");
    setTimeout(() => {
      scrollTopButton.classList.remove("scroll-top-button--clicked");
    }, 600);
  } else {
    scrollTopButton.classList.remove("scroll-top-button--show");
  }
});

// Нажатие кнопки скролла на верх сайта

scrollTopButton.addEventListener("click", () => {
  // scrollTopButton.style.cssText = "animation: 0.5s scroll-top-button linear;"
  scrollTopButton.classList.add("scroll-top-button--clicked");
});
