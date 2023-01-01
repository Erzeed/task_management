import "../../../styles/profile.css";
import banner from "../../../asset/banner/gradienta-banner-unsplash.jpeg";
import profile from "../../../asset/img/profile-default.jpg";
import {cekUser} from "../../utils/cekUser";

const Profile = {
  async render() {
    return `
      <div class="content__profile">
      <side-bar class="profile"></side-bar>
        <div class="profile__main"> 
          <div class="header">
            <div class="header__banner">
              <img src=${banner} alt="" />
            </div>
            <div class="header__img">
              <img src=${profile} alt="" />
            </div>
            <div class="header__txt">
              <h2>Feizal Reza</h2>
              <p>Universitas Amikom Yogyakarta</p>
            </div>
          </div>
          <div class="profile__input form-style-2">
            <form action="#" class="form">
              <label for="field1"><span>Nim <span class="required">*</span></span><input type="text" class="input-field" name="field1" value="" /></label>
              <label for="field1"><span>Name <span class="required">*</span></span><input type="text" class="input-field" name="field1" value="" /></label>
              <label for="field2"><span>Email <span class="required">*</span></span><input type="text" class="input-field" name="field2" value="" /></label>
              <label for="field1"><span>Jurusan <span class="required">*</span></span><input type="text" class="input-field" name="field1" value="" /></label>
              <label for="field1"><span>Judul Skripsi <span class="required">*</span></span><input type="text" class="input-field" name="field1" value="" /></label>
              <div class="button">
              <label><span> </span><input type="submit" value="Submit" /></label>
              </div>

            </form>
          </div>
        </div>
        
      </div>
    `;
  },

  async afterRender() {
    cekUser()

  },
};

export default Profile;
