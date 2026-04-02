const trafficLight = document.getElementById("trafficLight");
const stateLabel = document.getElementById("stateLabel");

const cycle = [
  { state: "go", delay: 3000 },
  { state: "yield", delay: 2000 },
  { state: "stop", delay: 1000 },
];

let timerId = 0;
let cycleIndex = 0;

function updateLabel(state) {
  stateLabel.textContent = `Current state: ${state}`;
}

function scheduleNextChange() {
  const { state, delay } = cycle[cycleIndex];

  timerId = window.setTimeout(() => {
    trafficLight.state = state;
    updateLabel(state);
    cycleIndex = (cycleIndex + 1) % cycle.length;
    scheduleNextChange();
  }, delay);
}

trafficLight.state = "stop";
updateLabel("stop");
scheduleNextChange();

window.addEventListener("beforeunload", () => {
  window.clearTimeout(timerId);
});
