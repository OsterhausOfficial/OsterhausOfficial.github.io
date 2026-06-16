// Osterhaus Academy - Stripe Style Interaction JS

document.addEventListener("DOMContentLoaded", () => {

  // FAQ accordion toggle
  const items = document.querySelectorAll(".faq-item");

  items.forEach(item => {
    item.addEventListener("click", () => {
      item.classList.toggle("active");
    });
  });

  // Smooth hover enhancement (optional micro-interaction)
  const cards = document.querySelectorAll(".card");

  cards.forEach(card => {
    card.addEventListener("mouseenter", () => {
      card.style.transform = "translateY(-6px)";
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "translateY(0px)";
    });
  });

  // Navbar subtle scroll effect (Stripe-like feel)
  const header = document.querySelector("header");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 20) {
      header.style.background = "rgba(10,15,23,0.9)";
      header.style.backdropFilter = "blur(20px)";
    } else {
      header.style.background = "rgba(10,15,23,0.7)";
      header.style.backdropFilter = "blur(16px)";
    }
  });

});
