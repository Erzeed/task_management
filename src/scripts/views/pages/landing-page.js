import "../../../styles/landingpage.css";
import ilustration1 from "../../../asset/illustration/work-together.png";

const LandingPage = {
  async render() {
    return `
      <div class="content">
        <div id="landing__page" class="landing__page">
          <nav-bar></nav-bar>
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
                  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt deleniti numquam culpa qui aliquid blanditiis eaque, nihil dolorum reprehenderit voluptas porro voluptates sunt vero quidem fugit ex similique eligendi officia!</p>
                  </div>
              </div>
          </div>
        </div>
      </div>
    `;
  },

//   async afterRender() {
//     const landingContainer = document.querySelector('#landing__page');
//     movies.forEach((movie) => {
//       landingContainer.innerHTML += createMovieItemTemplate(movie);
//     });
//   },
};

export default LandingPage;
