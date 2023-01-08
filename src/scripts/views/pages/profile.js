import "../../../styles/profile.css";
import banner from "../../../asset/banner/gradienta-banner-unsplash.jpeg";
import profileimg from "../../../asset/img/profile-default.jpg";
import { cekUser } from "../../utils/cekUser";
import { getDataUser} from "../../globals/api-endpoint.js";


const profile = {
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
              <img src=${profileimg} alt="" />
            </div>
            <div class="header__txt">
                <div class="header__title">
                    <h2>Feizal Reza</h2>
                    <p>Universitas Amikom Yogyakarta</p>
                </div>
                <div class="header__btn">
                    <button>Edit Profile</button>
                </div>
            </div>
          </div>
          <div class="profile__detail">
            <div class="detail">
                <div class="detail__name">
                    <p>Nim</p>
                    <p>Angkatan</p>
                    <p>Nama</p>
                    <p>Email</p>
                    <p>Nomor Telepon</p>
                    <p>Jurusan</p>
                    <p>Judul Skripsi</p>
                    <p>Dosen Pembimbing</p>
                </div>
                <div class="detail__value">
                    <p>19.11.2877</p>
                    <p>2019</p>
                    <p>Feizal Reza</p>
                    <p>-</p>
                    <p>-</p>
                    <p>-</p>
                    <p>-</p>
                    <p>-</p>
                </div>            
            </div>
        </div>
        
      </div>
    `;
    },

    async afterRender() {
        cekUser()
        const id = localStorage.getItem("id");
        const header__btn = document.querySelector(".header__btn button");

        header__btn.addEventListener("click", () => {
            window.location = "/#/editprofile"
        })

        const getData = await getDataUser(id);
        console.log(getData)

    },
};

export default profile;
