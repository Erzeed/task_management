import "../../../styles/dashboard.css";



const Dashboard = {
  async render() {
    return `
      <div class="content__dashboard">
      <side-bar></side-bar>
        <p>haii</p>
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

export default Dashboard;
