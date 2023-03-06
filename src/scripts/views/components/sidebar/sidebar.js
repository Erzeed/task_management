import css from "./sidebar.css";
import logoHome from "../../../../asset/icons/icons8-home.png";
import logoTask from "../../../../asset/icons/icons8-task.png";
import logoSetting from "../../../../asset/icons/icons8-setting.png";
import logoLogout from "../../../../asset/icons/icons8-log-out.png";
import { deleteFieldToken } from "../../../globals/api-endpoint";

class sidebar extends HTMLElement {
  constructor() {
    super();
    this.shadowDOM = this.attachShadow({ mode: "open" });
  }
  connectedCallback() {
    this.class = this.getAttribute("class") || null;

    this.render();
  }

  cekRole() {
    const role = localStorage.getItem("role");
    return role;
  }

  async logOut() {
    const btnLogOut = this.shadowDOM.querySelector('.sidebar__logout img');
    const role = localStorage.getItem("role");
    const id = localStorage.getItem("id");
    const firstLetter = role.charAt(0).toUpperCase();
    const restOfWord = role.slice(1);
    const result = firstLetter + restOfWord;
    btnLogOut.addEventListener("click", async () => {
      await deleteFieldToken(result, id)
      localStorage.removeItem("id");
      localStorage.removeItem("role");
      window.location.href = "/#/login";
    })
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
                      <a href=${this.cekRole() == "dosen" ? "/#/dashboard" : `/#/detailbimbingan/${localStorage.getItem("id")}`}><img src=${logoHome} alt="home" /></a>
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
    this.logOut();
    this.cekRole();
  }
}

customElements.define("side-bar", sidebar);
