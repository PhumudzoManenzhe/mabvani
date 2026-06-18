import { createUniversityCard } from "../components/universityCard.js";
import { filterUniversities, getProvinces } from "../data/universities.js";
import { queryRequired, setCurrentPage } from "../utils/dom.js";

export const page = Object.freeze({
  id: "universities",
  status: "interactive",
});

setCurrentPage(page.id);

const form = queryRequired("[data-university-filter-form]");
const list = queryRequired("[data-university-list]");
const provinceSelect = queryRequired("[data-university-province]", form);
const resultCount = queryRequired("[data-university-count]");

function createEmptyState() {
  const empty = document.createElement("article");
  empty.className = "student-empty-state student-university-empty";

  const title = document.createElement("h2");
  title.className = "student-panel-title";
  title.textContent = "No universities match your filters";

  const message = document.createElement("p");
  message.className = "student-muted";
  message.textContent = "Try a different search term or choose all provinces.";

  empty.append(title, message);
  return empty;
}

function populateProvinceFilter() {
  const currentValue = provinceSelect.value;
  provinceSelect.replaceChildren(new Option("All provinces", ""));

  getProvinces().forEach((province) => {
    provinceSelect.append(new Option(province, province));
  });

  provinceSelect.value = currentValue;
}

function updateResultCount(count) {
  resultCount.textContent = `${count} ${count === 1 ? "university" : "universities"}`;
}

function getFilterValues() {
  const formData = new FormData(form);
  const query = formData.get("q")?.toString() || "";
  const province = formData.get("province")?.toString() || "";

  // Save the current values to the browser's session memory
  sessionStorage.setItem("universityQuery", query);
  sessionStorage.setItem("universityProvince", province);

  return {
    query: query,
    province: province,
  };
}
function restoreFilterValues() {
  const savedQuery = sessionStorage.getItem("universityQuery");
  const savedProvince = sessionStorage.getItem("universityProvince");

  // If we have saved memory, put it back into the HTML inputs
  if (savedQuery !== null) {
    form.elements["q"].value = savedQuery;
  }
  if (savedProvince !== null) {
    form.elements["province"].value = savedProvince;
  }
}

function renderUniversities() {
  const universities = filterUniversities(getFilterValues());

  list.replaceChildren();
  updateResultCount(universities.length);

  if (!universities.length) {
    list.append(createEmptyState());
    return;
  }

  universities.forEach((university) => {
    list.append(createUniversityCard(university));
  });
}

// --- Initialize Page ---
populateProvinceFilter();
restoreFilterValues(); // <-- This line restores the memory first!
renderUniversities();

// --- Event Listeners ---
form.addEventListener("input", renderUniversities);
form.addEventListener("change", renderUniversities);
form.addEventListener("submit", (event) => {
  event.preventDefault(); // Stops the Enter key from refreshing the page
});

// TODO: Wire [data-sign-out] to the auth/session service.
