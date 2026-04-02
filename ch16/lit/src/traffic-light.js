import {LitElement, css, html} from 'lit';

const STATES = ['stop', 'yield', 'go'];

export class TrafficLight extends LitElement {
  static properties = {
    state: {reflect: true},
  };

  static styles = css`
    :host {
      display: inline-block;
      cursor: pointer;
      user-select: none;
      -webkit-tap-highlight-color: transparent;
    }

    .housing {
      display: grid;
      gap: 14px;
      padding: 10px;
      border-radius: 28px;
      background: linear-gradient(180deg, #1d1d1d 0%, #020202 100%);
      border: 2px solid #2d2d2d;
      box-shadow:
        inset 0 1px 1px rgb(255 255 255 / 0.15),
        0 8px 18px rgb(0 0 0 / 0.2);
    }

    .light {
      inline-size: 62px;
      block-size: 62px;
      border-radius: 50%;
      border: 1px solid rgb(0 0 0 / 0.45);
      transition:
        filter 160ms ease,
        opacity 160ms ease,
        box-shadow 160ms ease,
        transform 160ms ease;
      opacity: 0.35;
      filter: saturate(0.7);
    }

    .red {
      background: #ff1a12;
    }

    .yellow {
      background: #a9a300;
    }

    .green {
      background: #3f9400;
    }

    .light.on {
      opacity: 1;
      filter: saturate(1);
      box-shadow:
        0 0 14px currentColor,
        inset 0 10px 16px rgb(255 255 255 / 0.12);
      transform: scale(1.01);
    }

    .red.on {
      color: #ff3b30;
    }

    .yellow.on {
      color: #fff066;
    }

    .green.on {
      color: #63dd00;
    }
  `;

  constructor() {
    super();
    this.state = 'stop';
  }

  render() {
    return html`
      <div
        class="housing"
        part="housing"
        role="button"
        aria-label="Traffic light showing ${this.state}"
        @click=${this.next}
      >
        ${this.renderLight('red', this.state === 'stop')}
        ${this.renderLight('yellow', this.state === 'yield')}
        ${this.renderLight('green', this.state === 'go')}
      </div>
    `;
  }

  renderLight(color, isOn) {
    return html`<div
      class="light ${color} ${isOn ? 'on' : ''}"
      part="${color}-light"
    ></div>`;
  }

  next = () => {
    const index = STATES.indexOf(this.state);
    const nextIndex = index === -1 ? 0 : (index + 1) % STATES.length;
    this.state = STATES[nextIndex];
  };
}

customElements.define('traffic-light', TrafficLight);
