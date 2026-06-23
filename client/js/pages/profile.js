
// TODO: Load the student's existing profile and populate [data-profile-form].
// TODO: Save personal, address, academic, contact, and financial fields on submit.
// TODO: Implement profile section tab switching for .student-tab buttons if desired.
// TODO: Wire [data-add-profile-subject] and [data-remove-profile-subject] to subject row management.
// TODO: Calculate APS from the subject rows and update [data-profile-aps].
import { getProfile, updateProfile } from "../api/profileApi.js";
import { initializeStudentAuth } from "../auth/authUi.js";
import { setCurrentPage } from "../utils/dom.js";

export const page = Object.freeze({
    id: "profile",
    status: "template-static",
});

setCurrentPage(page.id);
await initializeStudentAuth();

const profileForm = document.querySelector("[data-profile-form]");

function formatDateForInput(value) {
    if (!value) {
        return "";
    }

    return String(value).slice(0, 10);
}

function setFormValue(form, name, value) {
    const field = form?.elements?.[name];

    if (!field || value === null || value === undefined) {
        return;
    }

    if (field.type === "date") {
        field.value = formatDateForInput(value);
        return;
    }

    if (field.type === "checkbox") {
        field.checked = Boolean(value);
        return;
    }

    field.value = value;
}

function renderProfileForm(profile) {
    if (!profileForm || !profile) {
        return;
    }

    setFormValue(profileForm, "first_name", profile.first_name);
    setFormValue(profileForm, "middle_name", profile.middle_name);
    setFormValue(profileForm, "last_name", profile.last_name);
    setFormValue(profileForm, "email", profile.email);
    setFormValue(profileForm, "id_number", profile.id_number);
    setFormValue(profileForm, "passport_number", profile.passport_number);
    setFormValue(profileForm, "citizenship", profile.citizenship);
    setFormValue(profileForm, "date_of_birth", profile.date_of_birth);
    setFormValue(profileForm, "gender", profile.gender);
    setFormValue(profileForm, "home_language", profile.home_language);
    setFormValue(profileForm, "disability_status", profile.disability_status);
    setFormValue(profileForm, "phone_number", profile.phone_number);
    setFormValue(profileForm, "address_line1", profile.address_line1);
    setFormValue(profileForm, "address_line2", profile.address_line2);
    setFormValue(profileForm, "city", profile.city);
    setFormValue(profileForm, "province", profile.province);
    setFormValue(profileForm, "postal_code", profile.postal_code);
}

function getFormValue(form, name) {
    return form.elements[name]?.value?.trim() || "";
}

function getDigitsOnlyFormValue(form, name) {
    return getFormValue(form, name).replace(/\D/g, "");
}

function getProfilePayload(form) {
    return {
        first_name: getFormValue(form, "first_name"),
        middle_name: getFormValue(form, "middle_name"),
        last_name: getFormValue(form, "last_name"),
        email: getFormValue(form, "email"),
        id_number: getFormValue(form, "id_number"),
        passport_number: getFormValue(form, "passport_number"),
        citizenship: getFormValue(form, "citizenship"),
        date_of_birth: getFormValue(form, "date_of_birth"),
        gender: getFormValue(form, "gender"),
        home_language: getFormValue(form, "home_language"),
        disability_status: getFormValue(form, "disability_status"),
        phone_number: getDigitsOnlyFormValue(form, "phone_number"),
        address_line1: getFormValue(form, "address_line1"),
        address_line2: getFormValue(form, "address_line2"),
        city: getFormValue(form, "city"),
        province: getFormValue(form, "province"),
        postal_code: getFormValue(form, "postal_code"),
    };
}

async function loadProfileForm() {
    try {
        const response = await getProfile();
        renderProfileForm(response.data);
    } catch (error) {
        console.error(error);
        alert(error.message);
    }
}

loadProfileForm();

profileForm?.addEventListener("submit", async (event) => {
    event.preventDefault();

    try {
        const response = await updateProfile(getProfilePayload(profileForm));
        renderProfileForm(response.data);
        alert("Profile saved successfully.");
    } catch (error) {
        console.error(error);
        alert(error.message);
    }
});

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
