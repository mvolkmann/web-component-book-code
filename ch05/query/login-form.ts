import { css, html, LitElement } from "lit";
import { customElement, query, state } from "lit/decorators.js";

@customElement("login-form")
export class LoginForm extends LitElement {
  @query("#username") usernameInput?: HTMLInputElement;
  @query("#password") passwordInput?: HTMLInputElement;
  @state() errorMessage = "";

  static styles = css`
    .error-message {
      color: red;
      font-weight: bold;
    }
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
      width: 4rem;
      text-align: right;
    }
  `;

  private onSubmit(event: Event) {
    const username = this.usernameInput!.value;
    const password = this.passwordInput!.value;
    if (username === "username") {
      event.preventDefault();
      this.errorMessage = "Username not allowed!";
      this.usernameInput?.focus();
    } else if (password === "password") {
      event.preventDefault();
      this.errorMessage = "Password not allowed!";
      this.passwordInput?.focus();
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
          <label for="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            required
            minlength="8"
          />
        </div>
        <div class="error-message">${this.errorMessage}</div>
        <button type="submit">Submit</button>
      </form>
    `;
  }
}
