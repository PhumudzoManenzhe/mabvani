/**
 * Browser module for the About page.
 * Page behaviour will be added during feature implementation.
 */
import { setCurrentPage } from "../utils/dom.js";

export const page = Object.freeze({
  id: "about",
  status: "placeholder",
});

setCurrentPage(page.id);

document.addEventListener("DOMContentLoaded", () => {

    const cards = document.querySelectorAll(
        ".feature-card, .card, .step"
    );

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {

                if (entry.isIntersecting) {
                    entry.target.classList.add("show");
                }

            });
        },
        { threshold: 0.15 }
    );

    cards.forEach(card => {
        card.classList.add("hidden");
        observer.observe(card);
    });

});
