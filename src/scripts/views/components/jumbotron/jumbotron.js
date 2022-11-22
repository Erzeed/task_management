import css from "./jumbotron.css";
import illustration1 from "../../../../asset/illustration/illustration1.png";
import callender from "../../../../asset/illustration/Calendar_object.png";

class jumbotron extends HTMLElement {
  constructor() {
    super();
    this.shadowDOM = this.attachShadow({ mode: "open" });
  }
  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowDOM.innerHTML = `
        <style>
            ${css}
        </style>
        <div class="jumbotron">
            <div class="jumbotron__txt">
                <div class="txt__headline">
                    <h1>Are silos making teamwork more painful?</h1>
                </div>
                <div class="txt__desc">
                    <p>Asana helps you manage projects, focus on what’s important, and organize work in one place for seamless collaboration.</p>
                </div>
                <div class="txt__img">
                    <img src=${callender} alt="calender" />
                </div>
                <div class="txt__button">
                    <button>Get Started</button>
                </div>
            </div>
            <div class="jumbotron__img">
                <img src=${illustration1} alt="illustration1" />
            </div>
        </div>
    `;
  }
}

customElements.define("jumbo-tron", jumbotron);