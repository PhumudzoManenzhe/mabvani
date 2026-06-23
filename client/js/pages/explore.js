import { initializeStudentAuth } from "../auth/authUi.js";

await initializeStudentAuth();

// Navigation tabs
const tabs = document.querySelectorAll(".student-tab");
const sections = document.querySelectorAll("section");

// Click tab → scroll to section
tabs.forEach(tab => {
    tab.addEventListener("click", (e) => {

        e.preventDefault();

        tabs.forEach(t => t.classList.remove("is-active"));
        tab.classList.add("is-active");

        const section = document.getElementById(tab.dataset.target);

        if (section) {
            section.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }
    });
});
