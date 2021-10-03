class FormulaCaptcha extends HTMLElement {
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

  submit(ev) {
    ev.preventDefault();
    const userText = this.shadowRoot.querySelector("input").value;
    const isHuman = userText.toLowerCase() === "ni idea";
    const answer = this.shadowRoot.querySelector(".answer");

    if (!isHuman) {
      answer.innerHTML = "¡No eres humano!";
    } else {
      answer.innerHTML = "Venga, pasa...";
    }
  }

  connectedCallback() {
    this.type = Math.floor(Math.random() * 3) + 1;
    this.render();
    this.shadowRoot.querySelector(".captcha").addEventListener("submit", (ev) => this.submit(ev));
  }

  render() {
    this.shadowRoot.innerHTML = /* html */`
    <style>${FormulaCaptcha.styles}</style>
    <form class="captcha">
      <img src="images/formula${this.type}.png" alt="Fórmula">
      <input class="user-text" type="text">
      <div class="answer"></div>
    </form>`;
  }
}

customElements.define("formula-captcha", FormulaCaptcha);
