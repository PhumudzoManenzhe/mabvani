
// TODO: Load the student's existing profile and populate [data-profile-form].
// TODO: Save personal, address, academic, contact, and financial fields on submit.
// TODO: Implement profile section tab switching for .student-tab buttons if desired.
// TODO: Wire [data-add-profile-subject] and [data-remove-profile-subject] to subject row management.
// TODO: Calculate APS from the subject rows and update [data-profile-aps].
// TODO: Wire [data-sign-out] to the auth/session service.

import { setCurrentPage } from "../utils/dom.js";

export const page = Object.freeze({
    id: "profile",
    status: "template-static",
});

setCurrentPage(page.id);

// Navigation tabs
const tabs = document.querySelectorAll(".student-tab");
const sections = document.querySelectorAll("section");

// Click tab → scroll to section
tabs.forEach(tab => {
    tab.addEventListener("click", () => {

        // Update active tab immediately
        tabs.forEach(t => t.classList.remove("is-active"));
        tab.classList.add("is-active");

        // Scroll to matching section
        const section = document.getElementById(tab.dataset.target);

        if (section) {
            section.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }
    });
});

// Scroll section → update active tab
const observer = new IntersectionObserver(
    entries => {

        entries.forEach(entry => {

            if (!entry.isIntersecting) return;

            tabs.forEach(tab =>
                tab.classList.remove("is-active")
            );

            const activeTab = document.querySelector(
                `.student-tab[data-target="${entry.target.id}"]`
            );

            if (activeTab) {
                activeTab.classList.add("is-active");
            }
        });
    },
    {
        threshold: 0.4
    }
);

// Observe all profile sections
sections.forEach(section => observer.observe(section));
