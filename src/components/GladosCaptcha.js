import "./RandomText.js";

class GladosCaptcha extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  static get styles() {
    return /* css */`
      img {
        width: 100px;
      }
    `;
  }

  submit() {
    const userText = this.shadowRoot.querySelector("input").value;
    const captchaText = this.shadowRoot.querySelector("random-text").text;

    const isHuman = userText === captchaText;

    if (!isHuman) {
      alert("You are not human!");
    } else {
      document.body.outerHTML = "<body style=\"background: black;\"></body>";
    }
  }

  connectedCallback() {
    this.render();
    this.shadowRoot.querySelector(".captcha").addEventListener("submit", () => this.submit());
  }

  render() {
    this.shadowRoot.innerHTML = /* html */`
    <style>${GladosCaptcha.styles}</style>
    <form class="captcha">
      <img src="images/glados.png" alt="GLaDOS">
      <random-text></random-text>
      <input class="user-text" type="text">
    </form>`;
  }
}

customElements.define("glados-captcha", GladosCaptcha);
