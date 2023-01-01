import css from "./sidebar.css";
import logoHome from "../../../../asset/icons/icons8-home.png";
import logoTask from "../../../../asset/icons/icons8-task.png";
import logoSetting from "../../../../asset/icons/icons8-setting.png";
import logoLogout from "../../../../asset/icons/icons8-log-out.png";

class sidebar extends HTMLElement {
  constructor() {
    super();
    this.shadowDOM = this.attachShadow({ mode: "open" });
  }
  connectedCallback() {
    this.class = this.getAttribute("class") || null;

    this.render();
  }

  render() {
    this.shadowDOM.innerHTML = `
        <style>
            ${css}
        </style>
        <div class="sidebar">
            <div class="sidebar__logo">
                
            </div>
            <div class="sidebar__menu">
                <ul>
                    <li class=${this.class == "home" ? "active" : ""}>
                      <a href="/#/dashboard"><img src=${logoHome} alt="home" /></a>
                    </li>
                    <li class=${this.class == "todo" ? "active" : ""}>
                      <a href="/#/todo"><img src=${logoTask} alt="task" /></a>
                    </li>
                    <li class=${this.class == "profile" ? "active" : ""}>
                      <a href="/#/profile"><img src=${logoSetting} alt="setting" /><a/>
                    </li>
                </ul>
            </div>
            <div class="sidebar__logout">
                <img src=${logoLogout} alt="logout" />
            </div>
        </div>
    `;
  }
}

customElements.define("side-bar", sidebar);
