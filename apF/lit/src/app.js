import {LitElement, css, html} from 'lit';
import './traffic-light.js';

const CYCLE = [
  {state: 'stop', delay: 3000},
  {state: 'go', delay: 2000},
  {state: 'yield', delay: 1000},
];

class TrafficLightApp extends LitElement {
  static properties = {
    state: {state: true},
  };

  static styles = css`
    :host {
      display: grid;
      place-items: center;
      min-height: 100vh;
      padding: 24px;
      box-sizing: border-box;
      background:
        radial-gradient(circle at top, rgb(255 255 255 / 0.8), transparent 30%),
        linear-gradient(180deg, #eef4ff 0%, #d7e0ec 100%);
      color: #172033;
      font-family: 'Avenir Next', 'Segoe UI', sans-serif;
    }

    .panel {
      display: grid;
      justify-items: center;
      gap: 20px;
      padding: 32px 36px;
      border-radius: 28px;
      background: rgb(255 255 255 / 0.72);
      box-shadow:
        0 22px 60px rgb(22 34 51 / 0.16),
        inset 0 1px 0 rgb(255 255 255 / 0.7);
      backdrop-filter: blur(10px);
    }

    h1 {
      margin: 0;
      font-size: clamp(1.8rem, 4vw, 2.8rem);
      letter-spacing: 0.04em;
      text-transform: uppercase;
    }

    p {
      margin: 0;
      font-size: 1rem;
      text-align: center;
      color: #4b5568;
    }

    strong {
      color: #172033;
    }

    traffic-light {
      pointer-events: none;
    }
  `;

  constructor() {
    super();
    this.state = CYCLE[0].state;
    this.timeoutId = 0;
    this.cycleIndex = 0;
  }

  connectedCallback() {
    super.connectedCallback();
    this.startCycle();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    clearTimeout(this.timeoutId);
  }

  render() {
    return html`
      <section class="panel">
        <h1>Traffic Light</h1>
        <traffic-light .state=${this.state}></traffic-light>
        <p>
          Current state: <strong>${this.state}</strong>
        </p>
      </section>
    `;
  }

  startCycle() {
    clearTimeout(this.timeoutId);
    this.state = CYCLE[this.cycleIndex].state;
    const delay = CYCLE[this.cycleIndex].delay;
    this.timeoutId = window.setTimeout(() => {
      this.cycleIndex = (this.cycleIndex + 1) % CYCLE.length;
      this.startCycle();
    }, delay);
  }
}

customElements.define('traffic-light-app', TrafficLightApp);
