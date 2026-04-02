import { Component, h, Host, Method, Prop, Watch } from '@stencil/core';

type TrafficLightState = 'stop' | 'yield' | 'go';

const STATES: TrafficLightState[] = ['stop', 'yield', 'go'];

@Component({
  tag: 'traffic-light',
  styleUrl: 'traffic-light.css',
  shadow: true
})
export class TrafficLight {
  @Prop({ mutable: true, reflect: true }) state: TrafficLightState = 'stop';

  @Watch('state')
  validateState(nextValue: TrafficLightState) {
    this.state = this.normalizeState(nextValue);
  }

  componentWillLoad() {
    this.state = this.normalizeState(this.state);
  }

  @Method()
  async next(): Promise<void> {
    const currentIndex = STATES.indexOf(this.state);
    const nextIndex = (currentIndex + 1) % STATES.length;
    this.state = STATES[nextIndex];
  }

  private normalizeState(value: string): TrafficLightState {
    return STATES.includes(value as TrafficLightState)
      ? (value as TrafficLightState)
      : 'stop';
  }

  private handleClick = () => {
    void this.next();
  };

  private handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      void this.next();
    }
  };

  render() {
    return (
      <Host>
        <div
          class="traffic-light"
          onClick={this.handleClick}
          onKeyDown={this.handleKeyDown}
          role="button"
          tabindex={0}
          aria-label={`Traffic light showing ${this.state}`}
        >
          <div class={{ light: true, red: true, active: this.state === 'stop' }}></div>
          <div class={{ light: true, yellow: true, active: this.state === 'yield' }}></div>
          <div class={{ light: true, green: true, active: this.state === 'go' }}></div>
        </div>
      </Host>
    );
  }
}
