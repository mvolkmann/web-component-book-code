import { css, html, LitElement } from "lit";
import {
  customElement,
  eventOptions,
  property,
  query,
  queryAll,
  queryAssignedElements,
  queryAssignedNodes,
  queryAsync,
  state,
} from "lit/decorators.js";

@customElement("my-demo")
export class MyDemo extends LitElement {
  @property({ type: Boolean }) checked = true;
  @property({ type: Number }) count = 0;
  @property({ type: Boolean }) showYellow = false;
  @query("#scroll-container") scrollContainer!: HTMLDivElement;
  // Adding "declare" here prevents the error "Property 'buttons' has
  // no initializer and is not definitely assigned in the constructor."
  @queryAll("button") declare buttons: HTMLButtonElement[];
  @queryAssignedElements() declare assignedElements: HTMLElement[];
  @queryAssignedNodes() declare assignedNodes: Node[];
  //TODO: This directive does not seem particularly useful.
  @queryAsync("#yellow-btn") declare yellowButton: HTMLButtonElement;
  @state() scrollPercentage = 0;

  static styles = css`
    button:focus {
      outline-color: blue;
    }

    #scroll-container {
      border: 2px solid blue;
      height: 200px;
      overflow-y: scroll;
      padding: 1rem;
    }
  `;

  protected firstUpdated() {
    //this.preventScrolling();
    for (const button of this.buttons) {
      console.log("found button with text", button.textContent);
    }
    console.log("this.assignedElements =", this.assignedElements);
    console.log("this.assignedNodes =", this.assignedNodes);
  }

  private handleCheckbox(event: Event) {
    const target = event.target as HTMLInputElement;
    this.checked = target.checked;
  }

  private handleColorButton(event: Event) {
    this.resetButtons();
    const target = event.target as HTMLButtonElement;
    target.style.backgroundColor = target.textContent.toLowerCase();
    target.style.color = "white";
  }

  @eventOptions({ once: true })
  private handleFirstRed() {
    // This will only be output the first time the "Red" button is clicked.
    alert("Warning: Red may be perceived as an angry color.");
    const btn = this.shadowRoot?.getElementById("red-btn");
    btn?.addEventListener("click", this.handleColorButton.bind(this));
  }

  // This decorator is needed to prevent click events
  // from reaching the color buttons.
  @eventOptions({ capture: true })
  private handleOuter(event: Event) {
    this.count++;
    if (!this.checked) event.stopPropagation();
  }

  private preventScrolling() {
    const container = this.scrollContainer;
    // Ignore mouse wheel events inside the container.
    container.addEventListener("wheel", (e) => e.preventDefault(), {
      passive: false,
    });
    // Ignore mobile touch events inside the container.
    container.addEventListener("touchmove", (e) => e.preventDefault(), {
      passive: false,
    });
    // Ignore keydown events that would cause scrolling inside the container.
    container.addEventListener(
      "keydown",
      (e) => {
        const keys = ["ArrowUp", "ArrowDown", "Space", "PageUp", "PageDown"];
        if (keys.includes(e.code)) e.preventDefault();
      },
      { passive: false },
    );
  }

  private async addYellowButton() {
    this.showYellow = true;
    // This uses a queryAsync directive to get
    // a reference to the newly added "Yellow" button.
    // One use case is to move focus to it.
    const button = await this.yellowButton;
    button.focus();
    // After calling the focus method, the button did not get a blue outline
    // to indicate that it had focus until I added a CSS rule for button:focus.
  }

  render() {
    return html`<div @click=${this.handleOuter}>
      <slot></slot>
      <div>Outer Click Count: ${this.count}</div>
      <div>
        <label>Enabled</label>
        <input
          type="checkbox"
          .checked="${this.checked}"
          @change=${this.handleCheckbox}
        />
      </div>
      <div id="color-buttons">
        <button id="red-btn" @click=${this.handleFirstRed}>Red</button>
        <button @click=${this.handleColorButton}>Green</button>
        <button @click=${this.handleColorButton}>Blue</button>
        ${this.showYellow
          ? html`<button id="yellow-btn" @click=${this.handleColorButton}>
              Yellow
            </button>`
          : null}
      </div>
      <button @click=${this.addYellowButton}>Add Yellow</button>
      <div>Scroll Percentage: ${this.scrollPercentage}%</div>
      <!-- Setting tabindex on this div enables it to receive keydown events.
           When certain keys are pressed, such as the up and down arrow keys,
           the contents will scroll. -->
      <div
        id="scroll-container"
        @scroll=${this.updateScrollPercent}
        tabindex="0"
      >
        <div class="scroll-content">
          <h4>Scroll down to update scroll percentage.</h4>
          <p>
            This is a long scrollable area. The progress bar updates smoothly as
            you scroll.
          </p>
          <p>
            Notice how smooth the scrolling feels? That's because we're using
            <code>passive: true</code>.
          </p>
          <p>
            The browser doesn't have to wait for JavaScript before scrolling.
          </p>
          <p>Keep scrolling...</p>
          <p>More content here...</p>
          <p>And more...</p>
          <p>Almost there...</p>
          <p>Just a bit further...</p>
          <p>Keep going...</p>
          <p>You're doing great!</p>
          <p>Nearly at the bottom!</p>
          <p>Last paragraph! You made it to the end! 🎉</p>
        </div>
      </div>
    </div> `;
  }

  private resetButtons() {
    const buttons = this.shadowRoot?.querySelectorAll("button") ?? [];
    for (const button of buttons) {
      button.style.backgroundColor = "ButtonFace";
      button.style.color = "black";
    }
  }

  // The passive option is set because we're just
  // reading the scroll position and never preventing scrolling.
  // Is the passive option set to true by default in modern browsers?
  //@eventOptions({ passive: true })
  @eventOptions({ passive: false })
  private updateScrollPercent(e: Event) {
    // Calling e.preventDefault() here will not prevent scrolling!
    // The proper way do this is in the the firstUpdated method.
    const element = e.target as HTMLElement;
    const scrollTop = element.scrollTop;
    const scrollHeight = element.scrollHeight - element.clientHeight;
    this.scrollPercentage = Math.round((scrollTop / scrollHeight) * 100);
  }
}
