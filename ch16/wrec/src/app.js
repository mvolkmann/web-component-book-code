const trafficLight = document.querySelector('traffic-light');

const cycle = [
  {state: 'stop', delay: 3000},
  {state: 'go', delay: 2000},
  {state: 'yield', delay: 1000}
];

let cycleIndex = 0;

function advanceLight() {
  const {state, delay} = cycle[cycleIndex];
  trafficLight.state = state;
  cycleIndex = (cycleIndex + 1) % cycle.length;
  window.setTimeout(advanceLight, delay);
}

advanceLight();
