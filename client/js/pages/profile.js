
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


/* --------------------------------------------------
   DOM ELEMENTS
-------------------------------------------------- */

// Button used to add a new subject row
const addButton = document.querySelector(
    "[data-add-profile-subject]"
);

// Element where the APS score is displayed
const apsOutput = document.querySelector(
    "[data-profile-aps]"
);

// Container that holds the subject rows
const subjectsContainer = addButton.closest(
    ".student-section-stack"
);

// List of subjects available in the dropdown
const subjects = [
    "English Home Language",
    "English FAL",
    "Mathematics",
    "Mathematical Literacy",
    "Life Orientation",
    "Physical Sciences",
    "Life Sciences",
    "Geography",
    "History",
    "Accounting",
    "Business Studies",
    "Economics",
    "Xitsonga",
    "isiZulu",
    "Sepedi",
    "Tshivenda",
    "Setswana",
    "Agricultural Sciences",
    "Consumer Studies",
    "Computer Applications Technology",
    "Information Technology",
    "Visual Arts",
    "Engineering Graphics and Design",
    "Tourism",
    "Religion Studies",
    "Dramatic Arts",
    "Music"
];


//SUBJECT COUNTER
// Count existing rows so new IDs stay unique
let subjectCount =
    document.querySelectorAll(".student-subject-row").length;


function markToPoints(mark) {

    if (mark >= 80) return 7;
    if (mark >= 70) return 6;
    if (mark >= 60) return 5;
    if (mark >= 50) return 4;
    if (mark >= 40) return 3;
    if (mark >= 30) return 2;

    return 1;
}


/* APS CALCULATION ------------------------------------------------------------
   1. Get all subject rows
   2. Read the subject and mark
   3. Ignore empty marks
   4. Ignore Life Orientation
   5. Convert marks into APS points
   6. Take the best 6 subjects
   7. Add their points together
   8. Display the APS score
 */

function calculateAPS() {

    // Get every subject row
    const rows =
        document.querySelectorAll(".student-subject-row");

    // Store APS points here
    const points = [];

    rows.forEach(row => {

        // Selected subject
        const subject =
            row.querySelector("select")?.value;

        // Entered mark
        const mark =
            parseFloat(
                row.querySelector(
                    'input[name="mark[]"]'
                )?.value
            );

        // Ignore rows without marks
        if (isNaN(mark)) return;

        // Life Orientation does not count
        if (subject === "Life Orientation") return;

        // Convert mark to APS points
        points.push(markToPoints(mark));
    });

    // Highest scores first
    points.sort((a, b) => b - a);

    // Use only the best 6 subjects
    const aps = points
        .slice(0, 6)
        .reduce(
            (sum, point) => sum + point,
            0
        );

    // Update the APS display
    apsOutput.textContent = aps;
}


/* CREATE NEW SUBJECT ROW ------------------------------------------------------------
   Runs when the user clicks: "Add Subject"
   Creates: Subject dropdown, Mark input, Remove button
 */

function createSubjectRow() {

    // Increase counter
    subjectCount++;

    // Create row element
    const row = document.createElement("div");

    row.className = "student-subject-row";

    // Build row HTML
    row.innerHTML = `
        <div class="student-field">
            <label for="subject-${subjectCount}">
                Subject
            </label>

            <select
                id="subject-${subjectCount}"
                name="subject[]">

                ${subjects.map(subject => `
                    <option value="${subject}">
                        ${subject}
                    </option>
                `).join("")}

            </select>
        </div>

        <div class="student-field">
            <label for="mark-${subjectCount}">
                Mark %
            </label>

            <input
                id="mark-${subjectCount}"
                name="mark[]"
                type="number"
                min="0"
                max="100"
                placeholder="0-100">
        </div>

        <button
            class="student-icon-button"
            type="button"
            aria-label="Remove subject"
            data-remove-profile-subject>

            <svg viewBox="0 0 24 24">
                <path d="M4 7h16"></path>
                <path d="M10 11v6"></path>
                <path d="M14 11v6"></path>
                <path d="M6 7l1 14h10l1-14"></path>
                <path d="M9 7V4h6v3"></path>
            </svg>

        </button>
    `;

    // APS display paragraph
    const apsDisplay =
        document.querySelector(".student-detail-stat");

    // Insert new row above APS result
    subjectsContainer.insertBefore(
        row,
        apsDisplay
    );
}


/* ADD SUBJECT BUTTON --------------------------------------------------------
   When clicked:
   1. Create a new row
   2. Recalculate APS
 */

addButton.addEventListener("click", () => {

    createSubjectRow();

    calculateAPS();

});


//REMOVE SUBJECT BUTTONS , Uses event delegation because new rows are created dynamically.

document.addEventListener("click", event => {

    const removeButton =
        event.target.closest(
            "[data-remove-profile-subject]"
        );

    // Exit if the click wasn't on a remove button
    if (!removeButton) return;

    const rows =
        document.querySelectorAll(
            ".student-subject-row"
        );

    // Prevent deleting all rows
    if (rows.length <= 1) {

        alert(
            "At least one subject is required."
        );

        return;
    }

    // Remove the selected row
    removeButton
        .closest(".student-subject-row")
        .remove();

    // Update APS
    calculateAPS();
});


 //  Recalculate APS whenever: A mark changes Or a subject changes

document.addEventListener("input", event => {

    if (
        event.target.matches(
            'input[name="mark[]"]'
        ) ||
        event.target.matches(
            'select[name="subject[]"]'
        )
    ) {
        calculateAPS();
    }
});




//Runs once when page loads-------------------------------
calculateAPS();
