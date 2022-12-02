import "../../../styles/profile.css";

const Profile = {
  async render() {
    return `
      <div class="content__profile">
      <side-bar class="active"></side-bar>
        <div class="profile__main"> 
          <p>hai</p>
        </div>
        
      </div>
    `;
  },

  async afterRender() {
    
  },
};

export default Profile;