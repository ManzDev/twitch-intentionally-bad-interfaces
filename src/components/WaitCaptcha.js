import "./RandomText.js";

class WaitCaptcha extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  static get styles() {
    return /* css */`
      .answer {
        display: inline-flex;
        color: red;
      }
    `;
  }

  submit() {
    const userText = this.shadowRoot.querySelector("input").value;
    const captchaText = this.shadowRoot.querySelector("random-text").text;
    const answer = this.shadowRoot.querySelector(".answer");

    const isHuman = userText === captchaText;

    if (!isHuman) {
      answer.textContent = "You are not human!";
    } else {
      answer.textContent = "You are human!";
    }
  }

  block() {
    const input = this.shadowRoot.querySelector("input");
    const answer = this.shadowRoot.querySelector(".answer");

    input.disabled = true;
    answer.textContent = "Processing... Please wait...";

    setTimeout(() => {
      input.disabled = false;
      answer.textContent = "";
    }, 4000);
  }

  connectedCallback() {
    this.render();
    this.shadowRoot.querySelector("input").addEventListener("input", () => this.block());
    this.shadowRoot.querySelector(".captcha").addEventListener("submit", () => this.submit());
  }

  render() {
    this.shadowRoot.innerHTML = /* html */`
    <style>${WaitCaptcha.styles}</style>
    <form class="captcha">
      <random-text></random-text>
      <input class="user-text" type="text">
      <div class="answer"></div>
    </form>`;
  }
}

customElements.define("wait-captcha", WaitCaptcha);
