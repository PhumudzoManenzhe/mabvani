import { getUniversityDescription, getUniversityImageUrl } from "../data/universities.js";

function createTextElement(tagName, className, text) {
  const element = document.createElement(tagName);
  if (className) {
    element.className = className;
  }
  element.textContent = text;
  return element;
}

function createUniversityMedia(university) {
  const media = document.createElement("div");
  media.className = "student-university-media";

  const imageUrl = getUniversityImageUrl(university);

  if (!imageUrl) {
    const fallback = createTextElement("span", "student-university-fallback", university.shortName);
    media.append(fallback);
    return media;
  }

  const image = document.createElement("img");
  image.src = imageUrl;
  image.alt = `${university.name} campus`;
  image.loading = "lazy";
  image.decoding = "async";
  media.append(image);

  return media;
}

export function createUniversityCard(university) {
  const link = document.createElement("a");
  link.className = "student-card-link";
  link.href = `university-details.html?university=${encodeURIComponent(university.slug)}`;
  link.setAttribute("aria-label", `View ${university.name}`);

  const article = document.createElement("article");
  article.className = "student-card student-university-card is-horizontal"; 

  // 1. Add the Photo
  article.append(createUniversityMedia(university));

  // 2. Add the Body Content
  const body = document.createElement("div");
  body.className = "student-university-card-body";

  // --- Header Row: Title and Price Badge ---
  const headerRow = document.createElement("div");
  headerRow.className = "student-card-header-row";

  const title = createTextElement("h2", "student-panel-title", university.name);
  
  // Uses a placeholder if 'applicationFee' isn't in your data file yet
  const feeText = university.applicationFee || "R100"; 
  const priceBadge = createTextElement("span", "student-price-badge", feeText);
  
  headerRow.append(title, priceBadge);

  // --- Subheader: Yellow Short Name ---
  const shortName = createTextElement("span", "student-card-shortname", university.shortName);

  // --- Short Description ---
  // Uses your long description as a fallback if 'shortDescription' isn't in your data file yet
  const descText = university.shortDescription || getUniversityDescription(university);
  const description = createTextElement("p", "student-card-shortdesc", descText);

  // --- Details Row: Location and Calendar ---
  const detailsRow = document.createElement("div");
  detailsRow.className = "student-card-details-row";

  const location = document.createElement("div");
  location.className = "student-card-detail-item";
  location.innerHTML = `<svg viewBox="0 0 24 24" class="student-icon"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg> <span>${university.city}, ${university.province}</span>`;

  const date = document.createElement("div");
  date.className = "student-card-detail-item";
  const closeDateText = university.application.closeDate || "TBA";
  date.innerHTML = `<svg viewBox="0 0 24 24" class="student-icon"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg> <span>${closeDateText}</span>`;

  detailsRow.append(location, date);

  // --- Bottom Row: Arrow ---
  const bottomRow = document.createElement("div");
  bottomRow.className = "student-card-bottom-row";
  bottomRow.innerHTML = `<svg viewBox="0 0 24 24" class="student-arrow-icon"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>`;

  // Assemble the card
  body.append(headerRow, shortName, description, detailsRow, bottomRow);
  article.append(body);
  link.append(article);

  return link;
}