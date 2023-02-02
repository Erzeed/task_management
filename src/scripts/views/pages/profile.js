import "../../../styles/profile.css";
import banner from "../../../asset/banner/gradienta-banner-unsplash.jpeg";
import profileimg from "../../../asset/img/profile-default.jpg";
import { cekUser } from "../../utils/cekUser";
import { getDataUser, updateProfileUser } from "../../globals/api-endpoint.js";
import { showDetail } from "../components/showDetail/showDetail";
import { loading } from "../../utils/customToast";

const profile = {
  async render() {
    return `
      <div class="content__profile">
         <side-bar class="profile"></side-bar>
        <div class="profile__main"> 
        <loading-roll></loading-roll>
          <div class="header">
            <div class="header__banner">
              <img src=${banner} alt="" />
            </div>
            <div class="header__txt">
                <div class="header__img">
                  <img src=${profileimg} alt="" />
                </div>
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
      nomor_telepon: "",
    };
    const id = localStorage.getItem("id");
    const header__btn = document.querySelector(".header__btn button");
    const profile__detail = document.querySelector(".profile__detail");
    const cancel = document.querySelector(".cancel");
    const simpan = document.querySelector(".simpan");
    const formUp = document.querySelector(".edit__profileDosen");
    const form = document.querySelectorAll("#form");
    const header__titleH2 = document.querySelector(".header__title h2");
    const header__titleP = document.querySelector(".header__title p");
    const loadingToast = document.querySelector('loading-roll');


    [...form].forEach((e) => {
      e.addEventListener("change", (e) => {
        dataUser = {
          ...dataUser,
          [e.target.id]: e.target.value,
        };
      });
    });

    const getData = async () => {
      const resp = await getDataUser(id);
      if (resp){

        header__titleH2.innerHTML = resp.nama !== undefined ? resp.nama : "User";
        header__titleP.innerHTML = resp.role_status;
        onHandleEditProfile(resp);

        if(resp.role_status == "Mahasiswa"){
          const dataDosen = await getDataUser(resp.id_dosen);
          profile__detail.innerHTML = showDetail(resp, dataDosen);
          loadingToast.style.display = 'none';
        }else {
          const dataTemp = {
            nama : "",
            email : "",
            nomor_telepon : "",
          }
          profile__detail.innerHTML = showDetail(resp, dataTemp);
          loadingToast.style.display = 'none';
        }
      }else {
        console.log(resp)
      }
    }

    getData();

    const onHandleEditProfile = (data) => {
      header__btn.addEventListener("click", () => {
        if (data.role_status == "dosen") {
          formUp.classList.add("active");
        } else {
          window.location = "/#/editprofile";
        }
      });
    }

    simpan.addEventListener("click", async () => {
      const { nik, nama, nomor_telepon } = dataUser;
      if (nik == "" || nama == "" || nomor_telepon == "") {
        loading(true, "Semua data harus diisi");
      } else {
          const resp = await updateProfileUser(id, dataUser, "Dosen");
          if(resp){
            loading(false,"Data berhasil di update");
            getData();
          } else {
            loading(true, error);
          }
      }
    });

    cancel.addEventListener("click", () => {
      formUp.classList.remove("active");
    });
  },
};

export default profile;
