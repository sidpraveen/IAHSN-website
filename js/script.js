
const navigation = document.querySelector(".navbar");
const menuToggle = document.querySelector(".nav-menu-toggle");
const compactNavigation = window.matchMedia("(max-width: 1080px)");

function closeNavigation() {
  navigation?.classList.remove("nav-open");
  menuToggle?.setAttribute("aria-expanded", "false");
  navigation?.querySelectorAll(".is-open").forEach((item) => {
    item.classList.remove("is-open");
    item.querySelector(":scope > a")?.setAttribute("aria-expanded", "false");
  });
}

menuToggle?.addEventListener("click", () => {
  if (navigation.classList.contains("nav-open")) {
    closeNavigation();
  } else {
    navigation.classList.add("nav-open");
    menuToggle.setAttribute("aria-expanded", "true");
  }
});

navigation?.querySelectorAll(".has-dropdown > a, .has-submenu > a").forEach((link) => {
  link.addEventListener("click", (event) => {
    if (!compactNavigation.matches) return;
    if (!link.parentElement.classList.contains("is-open")) {
      event.preventDefault();
      link.parentElement.classList.add("is-open");
      link.setAttribute("aria-expanded", "true");
    } else {
      closeNavigation();
    }
  });
});
navigation?.querySelectorAll(".nav-dropdown a:not([aria-haspopup]), .nav-menu > .nav-item:not(.has-dropdown) a").forEach((link) => {
  link.addEventListener("click", closeNavigation);
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && navigation?.classList.contains("nav-open")) {
    closeNavigation();
    menuToggle.focus();
  }
});
document.addEventListener("click", (event) => {
  if (navigation && !navigation.contains(event.target)) closeNavigation();
});
compactNavigation.addEventListener("change", closeNavigation);

const heroSlides = document.querySelectorAll('[data-hero-slide]');
const heroDots = document.querySelectorAll('[data-hero-dot]');
const heroPrev = document.querySelector('[data-hero-prev]');
const heroNext = document.querySelector('[data-hero-next]');
const heroPause = document.querySelector('[data-hero-pause]');

if (heroSlides.length && heroDots.length) {
  let heroIndex = 0;
  let paused = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const showHeroSlide = (index) => {
    heroIndex = (index + heroSlides.length) % heroSlides.length;
    heroSlides.forEach((slide, slideIndex) => {
      const active = slideIndex === heroIndex;
      slide.classList.toggle('active', active);
      slide.inert = !active;
      slide.setAttribute("aria-hidden", String(!active));
    });
    heroDots.forEach((dot, dotIndex) => {
      dot.classList.toggle('active', dotIndex === heroIndex);
      dot.setAttribute("aria-pressed", String(dotIndex === heroIndex));
    });
  };

  heroDots.forEach((dot) => {
    dot.addEventListener('click', () => showHeroSlide(Number(dot.dataset.heroDot)));
  });

  if (heroPrev) {
    heroPrev.addEventListener('click', () => showHeroSlide(heroIndex - 1));
  }

  if (heroNext) {
    heroNext.addEventListener('click', () => showHeroSlide(heroIndex + 1));
  }

  const updatePauseLabel = () => {
    if (heroPause) heroPause.textContent = paused ? "Play slideshow" : "Pause slideshow";
  };
  heroPause?.addEventListener("click", () => {
    paused = !paused;
    updatePauseLabel();
  });
  showHeroSlide(0);
  updatePauseLabel();
  setInterval(() => {
    const hero = document.querySelector("#hero-section");
    if (!paused && !document.hidden && !hero.contains(document.activeElement) && !hero.matches(":hover")) {
      showHeroSlide(heroIndex + 1);
    }
  }, 25000);
}

window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;
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

const azSearchInput = document.querySelector("[data-az-search]");
const azSearchForm = document.querySelector("#az-search");
const azTopicCards = document.querySelectorAll("[data-topic-card]");
const azLetterSections = document.querySelectorAll("[data-letter-section]");
const azCount = document.querySelector("[data-az-count]");
const azEmptyState = document.querySelector("[data-az-empty]");

if (azSearchInput && azTopicCards.length) {
  const updateAzSearch = () => {
    const query = azSearchInput.value.trim().toLowerCase();
    let visibleCount = 0;

    azTopicCards.forEach((card) => {
      const matches = !query || card.dataset.topic.includes(query);
      card.hidden = !matches;
      if (matches) {
        visibleCount += 1;
      }
    });

    azLetterSections.forEach((section) => {
      section.hidden = !section.querySelector("[data-topic-card]:not([hidden])");
    });

    if (azCount) {
      azCount.textContent = query
        ? `${visibleCount} matching topic${visibleCount === 1 ? "" : "s"}`
        : `${azTopicCards.length} topics available`;
    }

    if (azEmptyState) {
      azEmptyState.hidden = visibleCount !== 0;
    }
  };

  azSearchInput.addEventListener("input", updateAzSearch);
  updateAzSearch();
  azSearchForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    updateAzSearch();
  });
}

// Unconfigured destinations must not look like working forms or jump to the top.
const pendingDialog = document.createElement("dialog");
pendingDialog.className = "pending-dialog";
pendingDialog.setAttribute("aria-labelledby", "pending-title");
const pendingTitle = document.createElement("h2");
pendingTitle.id = "pending-title";
const pendingMessage = document.createElement("p");
const pendingContact = document.createElement("a");
pendingContact.href = "mailto:info@iahsn.org";
pendingContact.textContent = "Contact IAHSN";
const pendingClose = document.createElement("button");
pendingClose.type = "button";
pendingClose.textContent = "Close";
pendingClose.addEventListener("click", () => pendingDialog.close());
pendingDialog.append(pendingTitle, pendingMessage, pendingContact, pendingClose);
document.body.append(pendingDialog);

document.addEventListener("click", (event) => {
  const trigger = event.target.closest('a[href="#"], #newsletter-btn, .hs-news-card button');
  if (!trigger) return;
  event.preventDefault();
  closeNavigation();
  pendingTitle.textContent = trigger.closest(".hs-news-card")?.querySelector("h3")?.textContent
    || trigger.getAttribute("aria-label") || trigger.textContent.trim();
  pendingMessage.textContent = trigger.dataset.pendingMessage
    || (trigger.id === "newsletter-btn"
      ? "Online newsletter signup is not available yet. Please contact IAHSN for newsletter information."
      : trigger.closest(".hs-news-card")
        ? "The full article has not been added yet. Please check back for updates."
        : "This feature is not available yet. Please contact IAHSN for more information.");
  pendingDialog.showModal();
});
