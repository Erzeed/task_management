const DrawerInitiator = {
  init({ button, drawer, content }) {


    content.addEventListener('click', (event) => {
      // this._closeDrawer(event, drawer);
      // console.log(drawer);
    });
    const checkUser = localStorage.getItem("role");
    if(checkUser) {
      drawer.classList.add("hide")
    }
  },
};

export default DrawerInitiator;