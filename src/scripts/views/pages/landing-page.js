import "../../../styles/landingpage.css";
import ilustration1 from "../../../asset/illustration/work-together.png";
import iconTask from "../../../asset/icons/icons8-task.png";
import iconCollaboration from "../../../asset/icons/icons8-collaborating.png";
import iconDashboard from "../../../asset/icons/icons8-dashboard.png";

const LandingPage = {
  async render() {
    return `
      <div class="content">
        <div id="landing__page" class="landing__page">
          <jumbo-tron></jumbo-tron>
          <div class="landing__page__tryOurApp">
              <h1>Get and try the <span class="logo">Wgether </span> app for free</h1>
          </div>
          <div class="landing__page__work">
              <div class="work__img__container">
                  <div class="container__img">
                    <img src=${ilustration1} alt="ilustrasi work together" />
                  </div>
              </div>
              <div class="work__txt">
                  <div class="work__txt__desc">
                  <h2>An easy way to organize all your task and work neatly</h2>
                  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt deleniti numquam culpa qui aliquid blanditiis eaque, nihil dolorum reprehenderit volu</p>
                  </div>
              </div>
          </div>
          <div class="landing__page__addTask">
              <h1>Add Task That <span>Matter To You</span></h1>
              <div class="addTask__cardPromo">
                  <div class="cardPromo">
                      <div class="cardPromo__icon">
                          <img src=${iconTask} alt="task icon" />
                      </div>
                      <div class="cardPromo__title">
                          <h3>Add Task Efficiently</h3>
                      </div>
                      <div class="cardPromo__desc">
                          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Accusamus, autem? Inventore maxime, quam illo expedita totam repellendus nulla eius neque?</p>
                      </div>
                  </div>
                  <div class="cardPromo">
                      <div class="cardPromo__icon">
                          <img src=${iconDashboard} alt="task icon" />
                      </div>
                      <div class="cardPromo__title">
                          <h3>Easy Manage Your Team</h3>
                      </div>
                      <div class="cardPromo__desc">
                          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Accusamus, autem? Inventore maxime, quam illo expedita totam repellendus nulla eius neque?</p>
                      </div>
                  </div>
                  <div class="cardPromo">
                      <div class="cardPromo__icon">
                          <img src=${iconCollaboration} alt="task icon" />
                      </div>
                      <div class="cardPromo__title">
                          <h3>Collaborative Team Work</h3>
                      </div>
                      <div class="cardPromo__desc">
                          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Accusamus, autem? Inventore maxime, quam illo expedita totam repellendus nulla eius neque?</p>
                      </div>
                  </div>
              </div>
          </div>
        </div>
      </div>
    `;
  },

    async afterRender() {
        const id = localStorage.getItem("id");
        if(id === null){
            window.location.href = "/#/"
        }else {
            window.location.href = "/#/todo"

        }
    },
};

export default LandingPage;
