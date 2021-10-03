class GradientCaptcha extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  static get styles() {
    return /* css */`
      .captcha {
        display: flex;
        align-items: flex-end;
      }
      .answer {
        display: inline-flex;
        color: red;
      }
      p {
        font-weight: bold;
      }
      .flex {
        display: inline-flex;
        flex-direction: column;
      }
      .gradient {
        border: 1px solid #111;
        width: 200px;
        height: 25px;
        background: linear-gradient(to right, red, gold, green, purple, black, hotpink);
      }
    `;
  }

  submit(ev) {
    ev.preventDefault();
    const userText = this.shadowRoot.querySelector("input").value;
    const goodAnswer = userText.toLowerCase() === "3762217";
    const answer = this.shadowRoot.querySelector(".answer");

    if (goodAnswer) {
      answer.innerHTML = "¡No eres humano!";
    } else {
      answer.innerHTML = "Eres un robot";
    }
  }

  connectedCallback() {
    this.render();
    this.shadowRoot.querySelector(".captcha").addEventListener("submit", (ev) => this.submit(ev));
  }

  render() {
    this.shadowRoot.innerHTML = /* html */`
    <style>${GradientCaptcha.styles}</style>
    <form class="captcha">
      <div class="flex">
        <p>¿Cuántos colores hay en la imagen?</p>
        <div class="gradient"></div>
      </div>
      <input class="user-text" type="text">
      <div class="answer"></div>
    </form>`;
  }
}

customElements.define("gradient-captcha", GradientCaptcha);
