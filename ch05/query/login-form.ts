import { css, html, LitElement } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";

@customElement("login-form")
export class LoginForm extends LitElement {
  @query("#username") userNameInput?: HTMLInputElement;
  @query("#password") passwordInput?: HTMLInputElement;
  @state() errorMessage = "";
  @state() password = "";
  @state() username = "";

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

  private handlePasswordInput(e: Event) {
    this.password = (e.target as HTMLInputElement).value;
  }

  private handleUsernameInput(e: Event) {
    this.username = (e.target as HTMLInputElement).value;
  }

  private validate(event: Event) {
    if (this.username === "") {
      this.errorMessage = "Username is required.";
      this.userNameInput?.focus();
    } else if (this.password === "") {
      this.errorMessage = "Password is required.";
      this.passwordInput?.focus();
    } else if (this.password.length < 8) {
      this.errorMessage = "Password must be at least 8 characters.";
      this.passwordInput?.focus();
    } else {
      this.errorMessage = "";
    }
    if (this.errorMessage) event.preventDefault();
  }

  render() {
    return html`
      <h1>Login</h1>
      <form @submit=${this.validate} method="POST" action="/login">
        <div>
          <label for="username">Username</label>
          <input
            id="username"
            name="username"
            .value=${this.username}
            @input=${this.handleUsernameInput}
          />
        </div>
        <div>
          <label for="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            .value=${this.password}
            @input=${this.handlePasswordInput}
          />
        </div>
        <div class="error-message">${this.errorMessage}</div>
        <button type="submit">Submit</button>
      </form>
    `;
  }
}
