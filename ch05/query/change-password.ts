import { css, html, LitElement } from "lit";
import { customElement, query, state } from "lit/decorators.js";

@customElement("change-password")
export class ChangePassword extends LitElement {
  @query("#confirm") confirmInput!: HTMLInputElement;
  @query("#password") passwordInput!: HTMLInputElement;

  static styles = css`
    form {
      display: inline-flex;
      flex-direction: column;
      gap: 1rem;

      > div {
        display: flex;
        gap: 1rem;
      }
    }
    label {
      display: inline-block;
      width: 8rem;
      text-align: right;
    }
  `;

  private onSubmit(event: Event) {
    const password = this.passwordInput.value;
    const confirm = this.confirmInput.value;
    if (confirm !== password) {
      event.preventDefault();
      this.confirmInput.setCustomValidity("Passwords do not match.");
    }
  }

  render() {
    return html`
      <form @submit=${this.onSubmit} method="POST" action="/login">
        <div>
          <label for="username">Username</label>
          <input id="username" name="username" type="text" required />
        </div>
        <div>
          <label for="password">New Password</label>
          <input
            id="password"
            name="password"
            type="password"
            required
            minlength="8"
          />
        </div>
        <div>
          <label for="confirm">Confirm Password</label>
          <input id="confirm" type="password" required />
        </div>
        <button type="submit">Submit</button>
      </form>
    `;
  }
}
