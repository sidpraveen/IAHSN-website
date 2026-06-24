window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});



if (document.querySelector(".slide-content") && window.Swiper) {
  var swiper = new Swiper(".slide-content", {
    slidesPerView: 3,
    spaceBetween: 25,
    loop: true,
    centerSlide: 'true',
    fade: 'true',
    grabCursor: 'true',

    pagination: {
      el: ".swiper-pagination",
      clickable: true,
      dynamicBullets: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },

    breakpoints: {
      0: {
        slidesPerView: 1,
      },
      520: {
        slidesPerView: 2,
      },
      950: {
        slidesPerView: 3,
      },
    },
  });
}


  const tabButtons = document.querySelectorAll(".tab-btn");
  const tabPanels = document.querySelectorAll(".tab-panel");

  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const targetTab = button.getAttribute("data-tab");

      tabButtons.forEach((btn) => btn.classList.remove("active"));
      tabPanels.forEach((panel) => panel.classList.remove("active"));

      button.classList.add("active");
      document.getElementById(targetTab).classList.add("active");
    });
  });

const understandSection = document.querySelector("#learn-hs");
const defaultIntroState = document.querySelector(".intro-state-default");
const topicTriggers = document.querySelectorAll("[data-understand-trigger]");
const topicBackButtons = document.querySelectorAll("[data-understand-back]");
const topicStates = document.querySelectorAll(".intro-state:not(.intro-state-default)");
const topicPanels = document.querySelectorAll("[data-understand-panel]");

if (understandSection && defaultIntroState && topicTriggers.length && topicStates.length && topicPanels.length) {
  const topicClasses = ["topic-active", "symptoms-active", "wellness-active", "resources-active"];

  const resetUnderstandSection = () => {
    understandSection.classList.remove(...topicClasses);
    defaultIntroState.setAttribute("aria-hidden", "false");
    topicStates.forEach((state) => state.setAttribute("aria-hidden", "true"));
    topicPanels.forEach((panel) => panel.setAttribute("aria-hidden", "true"));
  };

  const activateUnderstandTopic = (topic) => {
    resetUnderstandSection();
    understandSection.classList.add("topic-active", `${topic}-active`);
    defaultIntroState.setAttribute("aria-hidden", "true");
    document.querySelector(`.intro-state-${topic}`)?.setAttribute("aria-hidden", "false");
    document.querySelector(`[data-understand-panel="${topic}"]`)?.setAttribute("aria-hidden", "false");
  };

  topicTriggers.forEach((trigger) => {
    trigger.addEventListener("click", (event) => {
      event.preventDefault();
      activateUnderstandTopic(trigger.getAttribute("data-understand-trigger"));
      understandSection.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  });

  topicBackButtons.forEach((button) => {
    button.addEventListener("click", () => {
      resetUnderstandSection();
      understandSection.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  });

  window.addEventListener("scroll", () => {
    if (!understandSection.classList.contains("topic-active")) {
      return;
    }

    const sectionBounds = understandSection.getBoundingClientRect();
    const hasScrolledAway = sectionBounds.bottom < window.innerHeight * 0.22 || sectionBounds.top > window.innerHeight * 0.78;

    if (hasScrolledAway) {
      resetUnderstandSection();
    }
  }, { passive: true });
}
