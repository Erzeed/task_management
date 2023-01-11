import "../../../styles/profile.css";
import banner from "../../../asset/banner/gradienta-banner-unsplash.jpeg";
import profileimg from "../../../asset/img/profile-default.jpg";
import { cekUser } from "../../utils/cekUser";
import { getDataUser, updateProfileUser} from "../../globals/api-endpoint.js";
import {showDetail} from "../components/showDetail/showDetail";


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
                    <h2>User</h2>
                    <p>Mahasiswa</p>
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
                    <p>Nama</p>
                    <p>Email</p>
                    <p>Nomor Telepon</p>
                    <p>Angkatan</p>
                    <p>Jurusan</p>
                    <p>Judul Skripsi</p>
                    <p>Dosen Pembimbing</p>
                </div>
                <div class="detail__value">
                    <p>-</p>
                    <p>-</p>
                    <p>-</p>
                    <p>-</p>
                    <p>-</p>
                    <p>-</p>
                    <p>-</p>
                    <p>-</p>
                </div>            
            </div>
        </div>
        <div class="edit__profileDosen">
            <div class="form__container">
              <h1>Edit Profile</h1>
              <form id="form">
                  <input type='text' id='nik' class="inputForm" placeholder="Nik" /><br/>
                  <input type='text' id='nama' class="inputForm" placeholder="Nama" /><br/>
                  <input type='text' id='nomor_telepon' class="inputForm" placeholder="Nomor Telepon" /><br/>
                  
              </form>
              <div class="btn__create">
                <button class="simpan" type='button'>Simpan</button>
                <button class="cancel" type='button'>Cancel</button>
              </div>
            </div>
          </div>
      </div>
    `;
    },

    async afterRender() {
        cekUser();
        let dataUser = {
          nik: "",
          nama: "",
          nomor_telepon:""
        }
        const id = localStorage.getItem("id");
        const header__btn = document.querySelector(".header__btn button");
        const profile__detail = document.querySelector(".profile__detail");
        const cancel = document.querySelector(".cancel");
        const simpan = document.querySelector(".simpan");
        const formUp = document.querySelector(".edit__profileDosen");
        const form = document.querySelectorAll("#form");
        const header__titleH2 = document.querySelector(".header__title h2");
        const header__titleP = document.querySelector(".header__title p");

        [...form].forEach(e => {
          e.addEventListener("change", (e) => {
            dataUser = {
              ...dataUser,
              [e.target.id]: e.target.value,
            }
          })
        });

        const getData = await getDataUser(id);
        profile__detail.innerHTML = showDetail(getData)
        header__titleH2.innerHTML = getData.nama
        header__titleP.innerHTML = getData.role_status
        header__btn.addEventListener("click", () => {
            if(getData.role_status == "dosen") {
              formUp.classList.add("active")
            } else {
              window.location = "/#/editprofile"
            }
        })

        simpan.addEventListener("click", () => {
          const {nik, nama, nomor_telepon} = dataUser
          if(nik == "" || nama == "" || nomor_telepon == ""){
            alert("Semua data harus di isi")
          }else {
            updateProfileUser(id, dataUser, "Dosen")
          }
        })

        cancel.addEventListener("click", () => {
          formUp.classList.remove("active")
        })

    },
};

export default profile;
