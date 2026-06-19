import { getUniversityImageUrl } from "../data/universities.js";

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

// --- NEW FUNCTION: Calculates days left and percentage for color coding ---
function calculateDeadlineStatus(openDateStr, closeDateStr) {
  if (!openDateStr || !closeDateStr) return { text: "Deadline TBA", status: "neutral" };

  const openDate = new Date(openDateStr);
  const closeDate = new Date(closeDateStr);
  const today = new Date();

  // Reset times to midnight for accurate day calculations
  openDate.setHours(0, 0, 0, 0);
  closeDate.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  // Failsafes for invalid data
  if (isNaN(openDate.getTime()) || isNaN(closeDate.getTime())) {
    return { text: "Deadline TBA", status: "neutral" };
  }

  // Application has closed
  if (today > closeDate) {
    return { text: "Applications closed", status: "danger" }; // Red
  }

  // Application hasn't opened yet
  if (today < openDate) {
    const daysUntilOpen = Math.ceil((openDate - today) / (1000 * 60 * 60 * 24));
    return { text: `Opens in ${daysUntilOpen} days`, status: "neutral" }; // Grey
  }

  // Application is open - Calculate percentages
  const totalDuration = (closeDate - openDate) / (1000 * 60 * 60 * 24);
  const daysLeft = Math.ceil((closeDate - today) / (1000 * 60 * 60 * 24));
  const percentageLeft = (daysLeft / totalDuration) * 100;

  let statusClass = "success"; // Green (> 50%)
  if (percentageLeft <= 10) {
    statusClass = "danger"; // Red (<= 10%)
  } else if (percentageLeft <= 50) {
    statusClass = "warning"; // Yellow/Orange (11% - 50%)
  }

  return { text: `${daysLeft} days left to apply`, status: statusClass };
}

export function createUniversityCard(university) {
  const link = document.createElement("a");
  link.className = "student-card-link";
  link.href = `university-details.html?university=${encodeURIComponent(university.slug)}`;
  link.setAttribute("aria-label", `View ${university.name}`);

  const article = document.createElement("article");
  article.className = "student-card student-university-card is-horizontal";

  article.append(createUniversityMedia(university));

  const body = document.createElement("div");
  body.className = "student-university-card-body";

  const headerRow = document.createElement("div");
  headerRow.className = "student-card-header-row";

  const title = createTextElement("h2", "student-panel-title", university.name);
  const feeText = university.applicationFee || "R100";
  const priceBadge = createTextElement("span", "student-price-badge", feeText);
  headerRow.append(title, priceBadge);

  const shortName = createTextElement("span", "student-card-shortname", university.shortName);

  // --- NEW LOGIC: Countdown Wrapper instead of Description ---
  const deadlineInfo = calculateDeadlineStatus(university.application.openDate, university.application.closeDate);
  
  const countdownWrapper = document.createElement("div");
  countdownWrapper.className = "student-card-countdown";
  
  const dot = document.createElement("span");
  dot.className = `student-status-dot ${deadlineInfo.status}`;
  
  const countdownText = createTextElement("span", "student-countdown-text", deadlineInfo.text);
  
  countdownWrapper.append(dot, countdownText);

  // Details Row
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

  const bottomRow = document.createElement("div");
  bottomRow.className = "student-card-bottom-row";
  bottomRow.innerHTML = `<svg viewBox="0 0 24 24" class="student-arrow-icon"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>`;

  // Assemble
  body.append(headerRow, shortName, countdownWrapper, detailsRow, bottomRow);
  article.append(body);
  link.append(article);

  return link;
}