const headerBackground = document.querySelector(".header__background");
const treeClearingImg = document.querySelector(".tree-clearing__background");

// Отслеживание курсора

document.addEventListener("mousemove", (e) => {
    Object.assign(headerBackground, {
      style: `
          --move-x: ${(e.clientX - window.innerWidth / 2) * 0.05}px;
          --move-y: ${(e.clientY - window.innerHeight / 2) * 0.025}px;
          `,
    });
  });

  // Отслеживание скролла

  window.addEventListener("scroll", (e) => {
    const scrollY = this.scrollY || document.documentElement.scrollTop;
  
    treeClearingImg.style.cssText = `--scrollTop: ${scrollY}px`;
  });

  // Отслеживание появления объектов на экране при скролле

const animatedObjects = document.querySelectorAll(
    ".wood, .wood-products, .order, .transportation"
  );
  
  const showObjects = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add(`${entry.target.classList[0]}--show`);
        observer.unobserve(entry.target);
      }
    });
  };
  
  const options = { threshold: 0.5 };
  
  const observer = new IntersectionObserver(showObjects, options);
  
  animatedObjects.forEach((object) => observer.observe(object));
  