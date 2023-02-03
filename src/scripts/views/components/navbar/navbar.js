import css from "./navbar.css";

class navbar extends HTMLElement {
  constructor() {
    super();
    this.shadowDOM = this.attachShadow({ mode: "open" });
  }
  connectedCallback() {
    this.render();
  }

  cekLoginOrNot() {
    console.log("haii")
  }

  render() {
    this.shadowDOM.innerHTML = `
        <style>
            ${css}
        </style>
        <div class="navbar">
          <div class="navbar__logo">
              <p>Wgether</p>
          </div>
          <div class="navbar__list">
              <ul>
                  <li>Platform</li>
                  <li>Company</li>
                  <li>Pricing</li>
              </ul>
          </div>
          <div class="navbar__account">
              <button class="login"><a href="/#/login">Login</a></button>
              <button class="started">Get Started</button>
          </div>
      </div>
    `;
    this.cekLoginOrNot();
  }
}

customElements.define("nav-bar", navbar);
