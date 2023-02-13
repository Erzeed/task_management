const DrawerInitiator = {
  init({ button, drawer, content }) {


    content.addEventListener('click', (event) => {
      // this._closeDrawer(event, drawer);
      // console.log(drawer);
    });
    // console.log(content, drawer);
  },

  // _toggleDrawer(event, drawer) {
  //   event.stopPropagation();
  //   drawer.classList.toggle('open');
  // },

  // _closeDrawer(event, drawer) {
  //   event.stopPropagation();
  //   drawer.classList.remove('open');
  // },
};

export default DrawerInitiator;