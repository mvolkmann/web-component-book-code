import {css, html, Wrec} from 'wrec';

class TrafficLight extends Wrec {
  static properties = {
    state: {
      type: String,
      values: ['stop', 'yield', 'go'],
      value: 'stop'
    }
  };

  static css = css`
    :host {
      display: inline-block;
      cursor: pointer;
      user-select: none;
    }

    .housing {
      width: 98px;
      padding: 10px;
      box-sizing: border-box;
      border-radius: 28px;
      border: 2px solid #2a2a2a;
      background:
        linear-gradient(180deg, #151515 0%, #030303 55%, #111111 100%);
      box-shadow:
        inset 0 2px 2px rgb(255 255 255 / 0.08),
        inset 0 -2px 3px rgb(0 0 0 / 0.55);
    }

    .stack {
      display: flex;
      flex-direction: column;
      gap: 10px;
      align-items: center;
    }

    .light {
      width: 60px;
      aspect-ratio: 1;
      border-radius: 50%;
      border: 1px solid rgb(0 0 0 / 0.45);
      box-shadow:
        inset 0 10px 16px rgb(255 255 255 / 0.14),
        inset 0 -12px 18px rgb(0 0 0 / 0.4);
      transition:
        filter 150ms ease,
        opacity 150ms ease,
        box-shadow 150ms ease;
    }

    .red {
      background: #ff0000;
    }

    .yellow {
      background: #808000;
    }

    .green {
      background: #3d8500;
    }

    .off {
      filter: saturate(0.8) brightness(0.72);
      opacity: 0.88;
    }

    .on.red {
      box-shadow:
        0 0 16px rgb(255 0 0 / 0.45),
        inset 0 10px 16px rgb(255 255 255 / 0.16),
        inset 0 -12px 18px rgb(0 0 0 / 0.3);
    }

    .on.yellow {
      box-shadow:
        0 0 16px rgb(255 255 0 / 0.35),
        inset 0 10px 16px rgb(255 255 255 / 0.16),
        inset 0 -12px 18px rgb(0 0 0 / 0.3);
    }

    .on.green {
      box-shadow:
        0 0 16px rgb(57 255 20 / 0.3),
        inset 0 10px 16px rgb(255 255 255 / 0.16),
        inset 0 -12px 18px rgb(0 0 0 / 0.3);
    }
  `;

  static html = html`
    <div
      class="housing"
      onClick="this.next()"
      role="img"
      aria-label='"Traffic light showing " + this.state'
    >
      <div class="stack">
        <div class='"light red " + (this.state === "stop" ? "on" : "off")'></div>
        <div class='"light yellow " + (this.state === "yield" ? "on" : "off")'></div>
        <div class='"light green " + (this.state === "go" ? "on" : "off")'></div>
      </div>
    </div>
  `;

  next() {
    const nextByState = {
      stop: 'yield',
      yield: 'go',
      go: 'stop'
    };

    this.state = nextByState[this.state] ?? 'stop';
  }
}

TrafficLight.define('traffic-light');
