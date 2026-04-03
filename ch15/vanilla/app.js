const trafficLight = document.querySelector("traffic-light");
const stateLabel = document.querySelector("[data-state-label]");

const cycle = [
  { state: "stop", delay: 3000 },
  { state: "go", delay: 2000 },
  { state: "yield", delay: 1000 },
];

let currentIndex = 0;

function updateUI(state) {
  trafficLight.state = state;
  stateLabel.textContent = state;
}

function advance() {
  currentIndex = (currentIndex + 1) % cycle.length;
  const { state, delay } = cycle[currentIndex];
  updateUI(state);
  window.setTimeout(advance, delay);
}

trafficLight.tabIndex = -1;
trafficLight.setAttribute("role", "img");
trafficLight.style.pointerEvents = "none";

const initialStep = cycle[currentIndex];
updateUI(initialStep.state);
window.setTimeout(advance, initialStep.delay);
