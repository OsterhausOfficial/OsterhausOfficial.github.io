/* =========================================================
   Osterhaus Academy(Osterhaus Scholarium of Alpha)
   Global JavaScript for GitHub Pages
   File: /js/main.js
   ========================================================= */

(function () {
  "use strict";

  const body = document.body;
  const header = document.querySelector(".site-header");
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelectorAll(".nav-link");
  const backToTop = document.querySelector(".back-to-top");
  const readingProgress = document.querySelector(".reading-progress");

  /* =========================================================
     Sticky Header
     ========================================================= */

  function handleHeaderScroll() {
    if (!header) return;

    if (window.scrollY > 12) {
      header.classList.add("is-scrolled");
    } else {
      header.classList.remove("is-scrolled");
    }
  }

  window.addEventListener("scroll", handleHeaderScroll, { passive: true });
  handleHeaderScroll();

  /* =========================================================
     Mobile Navigation
     ========================================================= */

  if (menuToggle) {
    menuToggle.addEventListener("click", function () {
      const isOpen = body.classList.toggle("nav-open");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
    });
  }

  navLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      body.classList.remove("nav-open");
      if (menuToggle) {
        menuToggle.setAttribute("aria-expanded", "false");
      }
    });
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      body.classList.remove("nav-open");
      if (menuToggle) {
        menuToggle.setAttribute("aria-expanded", "false");
      }
    }
  });

  /* =========================================================
     Active Navigation by Current Page
     ========================================================= */

  function setActiveNavigation() {
    const path = window.location.pathname.split("/").pop() || "index.html";

    navLinks.forEach(function (link) {
      const href = link.getAttribute("href");

      if (!href) return;

      const normalizedHref = href.split("/").pop();

      if (
        normalizedHref === path ||
        (path === "" && normalizedHref === "index.html") ||
        (path === "index.html" && normalizedHref === "index.html")
      ) {
        link.classList.add("active");
        link.setAttribute("aria-current", "page");
      }
    });
  }

  setActiveNavigation();

  /* =========================================================
     Reveal on Scroll
     ========================================================= */

  const revealElements = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window && revealElements.length > 0) {
    const revealObserver = new IntersectionObserver(
      function (entries, observer) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px"
      }
    );

    revealElements.forEach(function (element) {
      revealObserver.observe(element);
    });
  } else {
    revealElements.forEach(function (element) {
      element.classList.add("is-visible");
    });
  }

  /* =========================================================
     FAQ Accordion
     ========================================================= */

  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach(function (item) {
    const question = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");

    if (!question || !answer) return;

    question.addEventListener("click", function () {
      const isOpen = item.classList.contains("is-open");

      faqItems.forEach(function (otherItem) {
        const otherAnswer = otherItem.querySelector(".faq-answer");
        const otherQuestion = otherItem.querySelector(".faq-question");

        otherItem.classList.remove("is-open");

        if (otherAnswer) {
          otherAnswer.style.maxHeight = "0px";
        }

        if (otherQuestion) {
          otherQuestion.setAttribute("aria-expanded", "false");
        }
      });

      if (!isOpen) {
        item.classList.add("is-open");
        answer.style.maxHeight = answer.scrollHeight + "px";
        question.setAttribute("aria-expanded", "true");
      }
    });
  });

  window.addEventListener("resize", function () {
    faqItems.forEach(function (item) {
      const answer = item.querySelector(".faq-answer");

      if (item.classList.contains("is-open") && answer) {
        answer.style.maxHeight = answer.scrollHeight + "px";
      }
    });
  });

  /* =========================================================
     Reading Progress for Article Pages
     ========================================================= */

  function updateReadingProgress() {
    if (!readingProgress) return;

    const scrollTop = window.scrollY;
    const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = documentHeight > 0 ? (scrollTop / documentHeight) * 100 : 0;

    readingProgress.style.width = Math.min(Math.max(progress, 0), 100) + "%";
  }

  window.addEventListener("scroll", updateReadingProgress, { passive: true });
  updateReadingProgress();

  /* =========================================================
     Back to Top
     ========================================================= */

  function handleBackToTop() {
    if (!backToTop) return;

    if (window.scrollY > 520) {
      backToTop.classList.add("is-visible");
    } else {
      backToTop.classList.remove("is-visible");
    }
  }

  window.addEventListener("scroll", handleBackToTop, { passive: true });
  handleBackToTop();

  if (backToTop) {
    backToTop.addEventListener("click", function () {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }

  /* =========================================================
     Blog Search Filter
     ========================================================= */

  const blogSearchInput = document.querySelector("[data-blog-search]");
  const blogCards = document.querySelectorAll("[data-blog-card]");
  const noResults = document.querySelector("[data-no-results]");

  if (blogSearchInput && blogCards.length > 0) {
    blogSearchInput.addEventListener("input", function () {
      const keyword = blogSearchInput.value.trim().toLowerCase();
      let visibleCount = 0;

      blogCards.forEach(function (card) {
        const searchableText = card.textContent.toLowerCase();
        const matched = searchableText.includes(keyword);

        card.style.display = matched ? "" : "none";

        if (matched) {
          visibleCount += 1;
        }
      });

      if (noResults) {
        noResults.style.display = visibleCount === 0 ? "block" : "none";
      }
    });
  }

  /* =========================================================
     Contact Form Front-End Message
     Static site only: no backend submission.
     ========================================================= */

  const contactForm = document.querySelector("[data-contact-form]");
  const formStatus = document.querySelector("[data-form-status]");

  if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
      event.preventDefault();

      if (formStatus) {
        formStatus.textContent =
          "Thank you. Osterhaus Academy(Osterhaus Scholarium of Alpha) has received your front-end inquiry draft. Please email support@osoqllc.com for direct communication.";
      }

      contactForm.reset();
    });
  }

  /* =========================================================
     Email Copy Button
     ========================================================= */

  const copyEmailButtons = document.querySelectorAll("[data-copy-email]");

  copyEmailButtons.forEach(function (button) {
    button.addEventListener("click", async function () {
      const email = button.getAttribute("data-copy-email");

      if (!email) return;

      try {
        await navigator.clipboard.writeText(email);
        const originalText = button.textContent;
        button.textContent = "Email Copied";

        setTimeout(function () {
          button.textContent = originalText;
        }, 1800);
      } catch (error) {
        window.location.href = "mailto:" + email;
      }
    });
  });

  /* =========================================================
     Smooth Anchor Offset
     ========================================================= */

  const anchorLinks = document.querySelectorAll('a[href^="#"]');

  anchorLinks.forEach(function (link) {
    link.addEventListener("click", function (event) {
      const targetId = link.getAttribute("href");

      if (!targetId || targetId === "#") return;

      const target = document.querySelector(targetId);

      if (!target) return;

      event.preventDefault();

      const headerHeight = header ? header.offsetHeight : 0;
      const top = target.getBoundingClientRect().top + window.scrollY - headerHeight - 18;

      window.scrollTo({
        top: top,
        behavior: "smooth"
      });
    });
  });

  /* =========================================================
     Current Year
     ========================================================= */

  const yearElements = document.querySelectorAll("[data-current-year]");

  yearElements.forEach(function (element) {
    element.textContent = new Date().getFullYear();
  });

  /* =========================================================
     External Link Safety
     ========================================================= */

  const externalLinks = document.querySelectorAll('a[href^="http"]');

  externalLinks.forEach(function (link) {
    const href = link.getAttribute("href");

    if (!href) return;

    if (!href.includes(window.location.hostname)) {
      link.setAttribute("target", "_blank");
      link.setAttribute("rel", "noopener noreferrer");
    }
  });
})();
