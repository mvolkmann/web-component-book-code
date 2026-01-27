const colorRadio = document.getElementById("color-radio");
colorRadio.addEventListener("change", () => {
  const h1 = document.querySelector("h1");
  h1.style.color = colorRadio.value;
});

const relativeTime = document.getElementById("relative-time");

function showRelativeTime(dateString) {
  // Specifying the time of 00:00:00 ensures that
  // the date is parse as midnight in the local timezone.
  const date = new Date(dateString + "T00:00:00");

  // Update the time portion of the date to match the current time.
  const now = new Date();
  date.setHours(
    now.getHours(),
    now.getMinutes(),
    now.getSeconds(),
    now.getMilliseconds()
  );

  relativeTime.setAttribute("date", date.toISOString());
  relativeTime.style.display = "inline-block";
}

const dateInput = document.getElementById("date-input");
dateInput.addEventListener("change", (event) => {
  showRelativeTime(event.target.value);
});

const viewButton = document.getElementById("view-button");
const buttonBadge = viewButton.querySelector("wa-badge");
const badgeSwitch = document.getElementById("badge-switch");
let messages = [];

const progressBar = document.getElementById("progress-bar");
const progressRing = document.getElementById("progress-ring");
const MAX_MESSAGES = 20;
function updateBadge() {
  buttonBadge.textContent = messages.length;
  const haveMessages = messages.length > 0;
  buttonBadge.style.display =
    badgeSwitch.checked && haveMessages ? "flex" : "none";
  const percentComplete = (100 * messages.length) / MAX_MESSAGES;
  progressBar.setAttribute("value", percentComplete);
  progressRing.setAttribute("value", percentComplete);
  progressBar.textContent = `${percentComplete}%`;
  progressRing.textContent = `${percentComplete}%`;
}

badgeSwitch.addEventListener("change", updateBadge);

updateBadge();

async function getMessage() {
  const url = "https://techy-api.vercel.app/api/text";
  try {
    const response = await fetch(url);
    if (response.ok) return response.text();
    console.error(`API error: ${response.status}`);
  } catch (error) {
    console.error("Failed to fetch message:", error);
  }
  return null;
}

// Generate up to MAX_MESSAGES.
setInterval(async () => {
  if (messages.length < MAX_MESSAGES) {
    const message = await getMessage();
    if (message) {
      messages.push(message + ".");
      updateBadge();
    }
  }
}, 2000);

function openContainer(container) {
  const items = messages.map((message) => `<li>${message}</li>`);
  const div = container.querySelector("div");
  div.innerHTML = `<ol>${items.join("")}</ol>`;
  messages = [];
  updateBadge();
  container.open = true;
}

const messageDialog = document.getElementById("message-dialog");
viewButton.addEventListener("click", () => openContainer(messageDialog));

const drawerButton = document.getElementById("drawer-button");
const messageDrawer = document.getElementById("message-drawer");
drawerButton.addEventListener("click", () => openContainer(messageDrawer));

// This causes the wa-rating component to use hearts instead of stars.
const rating = document.getElementById("rating");
rating.getSymbol = () => '<wa-icon name="heart" variant="solid"></wa-icon>';
rating.addEventListener("change", () => {
  const span = rating.nextElementSibling;
  span.textContent = rating.value;
});
