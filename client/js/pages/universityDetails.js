import {
  getUniversityBySlug,
  getUniversityDescription,
  getUniversityImageUrl,
  getUniversityNotes,
} from "../data/universities.js";
import { queryRequired, setCurrentPage } from "../utils/dom.js";

export const page = Object.freeze({
  id: "universityDetails",
  status: "interactive",
});

setCurrentPage(page.id);

const DEFAULT_UNIVERSITY_SLUG = "university-of-cape-town";

function setText(selector, value) {
  queryRequired(selector).textContent = value;
}

function setExternalLink(selector, url, text) {
  const link = queryRequired(selector);

  if (!url) {
    link.hidden = true;
    return;
  }

  link.hidden = false;
  link.href = url;
  link.textContent = text;
}

function createDetailMedia(university) {
  const media = queryRequired("[data-university-media]");
  const imageUrl = getUniversityImageUrl(university, 1) || getUniversityImageUrl(university);
  media.replaceChildren();

  if (!imageUrl) {
    const fallback = document.createElement("span");
    fallback.className = "student-university-fallback";
    fallback.textContent = university.shortName;
    media.append(fallback);
    return;
  }

  const image = document.createElement("img");
  image.src = imageUrl;
  image.alt = `${university.name} campus`;
  image.decoding = "async";
  media.append(image);
}

function renderChips(university) {
  const chipList = queryRequired("[data-university-chip-list]");
  const chips = [
    university.shortName,
    university.type,
    university.province,
    university.city,
    university.application.route,
  ];

  chipList.replaceChildren();

  chips.forEach((chip) => {
    const badge = document.createElement("span");
    badge.className = "student-badge";
    badge.textContent = chip;
    chipList.append(badge);
  });
}

function renderNotes(university) {
  const noteList = queryRequired("[data-university-note-list]");
  noteList.replaceChildren();

  getUniversityNotes(university).forEach((note) => {
    const item = document.createElement("li");
    item.className = "student-list-row student-note-item";
    item.textContent = note;
    noteList.append(item);
  });
}

function createTelephoneHref(phone) {
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}

function renderUniversity(university) {
  document.title = `${university.name} | UniApply SA`;

  createDetailMedia(university);
  setText("[data-university-short-name]", university.shortName);
  setText("[data-university-name]", university.name);
  setText("[data-university-location]", `${university.city}, ${university.province}`);
  setText("[data-university-type]", university.type);
  setText("[data-university-description]", getUniversityDescription(university));
  setText("[data-university-opening]", university.application.openLabel);
  setText("[data-university-closing]", university.application.closeLabel);
  setText("[data-university-province]", university.province);
  setText("[data-university-route]", university.application.route);
  setText("[data-university-opening-period]", university.application.typicalOpeningPeriod);
  setText("[data-university-sidebar-close]", university.application.closeLabel);
  setText("[data-university-address]", university.address);

  const emailLink = queryRequired("[data-university-email]");
  emailLink.href = `mailto:${university.email}`;
  emailLink.textContent = university.email;

  const phoneLink = queryRequired("[data-university-phone]");
  phoneLink.href = createTelephoneHref(university.phone);
  phoneLink.textContent = university.phone;

  setExternalLink("[data-university-website]", university.website, "Visit website");
  setExternalLink("[data-university-prospectus]", university.prospectusUrl, "Open prospectus");

  renderChips(university);
  renderNotes(university);
}

const params = new URLSearchParams(window.location.search);
const university = getUniversityBySlug(params.get("university") || params.get("id") || DEFAULT_UNIVERSITY_SLUG)
  || getUniversityBySlug(DEFAULT_UNIVERSITY_SLUG);

renderUniversity(university);

// TODO: Wire [data-start-application] to create a draft application.
// TODO: Wire [data-sign-out] to the auth/session service.
