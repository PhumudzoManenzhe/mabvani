import { setCurrentPage } from "../utils/dom.js";
import { initializeStudentAuth } from "../auth/authUi.js";

export const page = Object.freeze({
    id: "results",
    status: "template-static",
});

setCurrentPage(page.id);
await initializeStudentAuth();

const form = document.querySelector("[data-aps-form]");
const addButton = document.querySelector("[data-add-aps-subject]");
const result = document.querySelector("[data-aps-result]");
const band = document.querySelector("[data-aps-band]");

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

let subjectCount = 0;

function createSubjectRow(defaultSubject = "") {

    subjectCount++;

    const row = document.createElement("div");
    row.className = "student-subject-row";

    row.innerHTML = `
        <div class="student-field">
            <label for="aps-subject-${subjectCount}">Subject</label>

            <select id="aps-subject-${subjectCount}" name="subject[]">
                ${subjects.map(subject => `
                    <option value="${subject}"
                        ${subject === defaultSubject ? "selected" : ""}>
                        ${subject}
                    </option>
                `).join("")}
            </select>
        </div>

        <div class="student-field">
            <label for="aps-mark-${subjectCount}">Mark %</label>

            <input
                id="aps-mark-${subjectCount}"
                type="number"
                min="0"
                max="100"
                name="mark[]"
                placeholder="0-100">
        </div>

        <button
            type="button"
            class="student-icon-button"
            data-remove-aps-subject
            aria-label="Remove Subject">

            <svg viewBox="0 0 24 24">
                <path d="M4 7h16"></path>
                <path d="M10 11v6"></path>
                <path d="M14 11v6"></path>
                <path d="M6 7l1 14h10l1-14"></path>
                <path d="M9 7V4h6v3"></path>
            </svg>

        </button>
    `;

    form.insertBefore(row, addButton);
}

const defaults = [
    "English Home Language",
    "Mathematics",
    "Physical Sciences",
    "Life Sciences",
    "Geography",
    "History",
    "Life Orientation"
];

defaults.forEach(subject => createSubjectRow(subject));

function markToPoints(mark) {

    if (mark >= 80) return 7;
    if (mark >= 70) return 6;
    if (mark >= 60) return 5;
    if (mark >= 50) return 4;
    if (mark >= 40) return 3;
    if (mark >= 30) return 2;

    return 1;
}

function calculateAPS() {

    const rows = document.querySelectorAll(".student-subject-row");

    const points = [];

    rows.forEach(row => {

        const subject = row.querySelector("select").value;
        const mark = parseFloat(row.querySelector("input").value);

        if (isNaN(mark)) return;

        if (subject === "Life Orientation") return;

        points.push(markToPoints(mark));

    });

    points.sort((a, b) => b - a);

    const aps = points
        .slice(0, 6)
        .reduce((sum, point) => sum + point, 0);

    result.textContent = aps;

    if (aps >= 42) {
        band.textContent =
            "Excellent APS. Competitive for Medicine, Engineering and other high-demand programmes.";
    }
    else if (aps >= 38) {
        band.textContent =
            "Very competitive for most university programmes.";
    }
    else if (aps >= 34) {
        band.textContent =
            "Eligible for many degree programmes.";
    }
    else if (aps >= 30) {
        band.textContent =
            "May qualify for diploma and selected degree programmes.";
    }
    else {
        band.textContent =
            "Below threshold. Consider foundation programmes.";
    }
}

form.addEventListener("input", calculateAPS);
form.addEventListener("change", calculateAPS);

addButton.addEventListener("click", () => {

    createSubjectRow();

    calculateAPS();

});

document.addEventListener("click", (e) => {

    const button = e.target.closest("[data-remove-aps-subject]");

    if (!button) return;

    const rows = document.querySelectorAll(".student-subject-row");

    if (rows.length <= 7) {
        alert("A minimum of 7 subjects is required.");
        return;
    }

    button.closest(".student-subject-row").remove();

    calculateAPS();

});

calculateAPS();
