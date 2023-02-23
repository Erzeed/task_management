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
    let isLogin = false;
    const id = localStorage.getItem("id");
    if(id) {
      isLogin = true
    }
    console.log(isLogin)
    return isLogin;
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
