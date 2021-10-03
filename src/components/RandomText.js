const ACCEPTED_CHARS = "QWERTYUIOPASDFGHJKLÑZXCVBNMqwertyuiopasdfghjklñzxcvbnm1234567890";

class RandomText extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  static get styles() {
    return /* css */`
      .text {
        display: inline-flex;
        border: 2px solid #444;
        padding: 6px;
        background: #999;
        font-family: "Anonymous Clippings";
        font-size: 34px;
        user-select: none;
      }
    `;
  }

  getRandomText() {
    const textLength = Math.floor(Math.random() * 7) + 5;
    this.text = "";
    for (let i = 0; i < textLength; i++) {
      const randomValue = Math.floor(Math.random() * ACCEPTED_CHARS.length);
      const char = ACCEPTED_CHARS[randomValue];
      this.text += char;
    }
    return this.text;
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = /* html */`
    <style>${RandomText.styles}</style>
    <div class="text">
      ${this.getRandomText()}
    </div>`;
  }
}

customElements.define("random-text", RandomText);
