import css from "./navbar.css";
import iconNotif from "../../../../asset/icons/bell-30.png";

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
    return isLogin;
  }

  onHandleCloseNotif() {
    const close = this.shadowDOM.querySelector(".close");
    const popUpNotif = this.shadowDOM.querySelector(".popUpNotif");
    close.addEventListener("click", () => {
      popUpNotif.classList.remove("active")
    })
  }

  onCLickNotif() {
    const notif = this.shadowDOM.querySelector(".notifBtn");
    const popUpNotif = this.shadowDOM.querySelector(".popUpNotif");
    notif.addEventListener("click", () => {
      popUpNotif.classList.add("active")
    })
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
              <button class=${this.cekLoginOrNot() == true ? "hide" : "login"}><a href="/#/login">Login</a></button>
              <button class=${this.cekLoginOrNot() == true ? "hide" : "started"}>Get Started</button>
              <button class="notifBtn" ><img src=${iconNotif} alt="" /></button>
          </div>
          <div class="popUpNotif">
            <div class="headerNotif">
              <h2>Notifikasi</h2>
              <button class="close">X</button>
            </div>
            <div class="bodyNotif">
              <div class="cardNotif">
                <div class="iconNotif"></div>
                <div class="bodyNotif__desk">
                  <div class="desk__title">
                    <p>Bab 1 <span>perlu direview</span></p>
                  </div>
                  <div class="desk__name">
                    <p>Feizal Reza</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </div>
    `;
    this.onCLickNotif()
    this.onHandleCloseNotif()
  }
}

customElements.define("nav-bar", navbar);
