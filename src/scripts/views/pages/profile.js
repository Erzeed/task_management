import "../../../styles/profile.css";
import banner from "../../../asset/banner/gradienta-banner-unsplash.png";
import profileimg from "../../../asset/img/profile-default.jpg";
import { cekUser } from "../../utils/cekUser";
import { getDataUser, updateProfileUser, getDataDosen, updatePasswordUser } from "../../globals/api-endpoint.js";
import { showDetail } from "../components/showDetail/showDetail";
import { loading } from "../../utils/customToast";
import { validasiFormRegisLogin } from "../../utils/validasiLoginRegister";

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
                    <button class="changePass">Update Password</button>
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
        <div class="edit__password">
            <div class="form__edit">
              <h1>Update Password</h1>
              <form id="form_editpassword">
                  <input type='password' id='password_lama' class="inputForm" placeholder="Password Lama" /><br/>
                  <input type='password' id='password_baru' class="inputForm" placeholder="Password Baru" /><br/>
              </form>
              <div class="btn__create">
                <button class="simpan_password" type='button'>Simpan</button>
                <button class="cancel_password" type='button'>Cancel</button>
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

    let dataUpdatePass = {
      email: '',
      password_lama: '',
      password_baru: ''
    }
    
    const id = localStorage.getItem("id");
    const header__btn = document.querySelector(".header__btn button");
    const profile__detail = document.querySelector(".profile__detail");
    const cancel = document.querySelector(".cancel");
    const cancel_password = document.querySelector(".cancel_password");
    const simpan = document.querySelector(".simpan");
    const formUp = document.querySelector(".edit__profileDosen");
    const edit__password = document.querySelector(".edit__password");
    const form = document.querySelectorAll("#form");
    const form_editpassword = document.querySelectorAll("#form_editpassword");
    const header__titleH2 = document.querySelector(".header__title h2");
    const header__titleP = document.querySelector(".header__title p");
    const loadingToast = document.querySelector("loading-roll");
    const changePass = document.querySelector(".changePass");
    const simpan_password = document.querySelector(".simpan_password");
    const role = localStorage.getItem("role");


    [...form].forEach((e) => {
      e.addEventListener("change", (e) => {
        dataUser = {
          ...dataUser,
          [e.target.id]: e.target.value,
        };
      });
    });
    
    [...form_editpassword].forEach((e) => {
      e.addEventListener("change", (e) => {
        dataUpdatePass = {
          ...dataUpdatePass,
          [e.target.id]: e.target.value,
        };
      });
    });

    const getData = async () => {
      if(role == "dosen") {
        const data = await getDataDosen(id);
        loadingToast.style.display = "none";
        dataUpdatePass = {
          ...dataUpdatePass,
          email: data.email
        };
        showData(data)
      }else {
        const data = await getDataUser(id);
        loadingToast.style.display = "none";
        dataUpdatePass = {
          ...dataUpdatePass,
          email: data.email
        };
        showData(data)
      }
    }

    getData();

    if(!navigator.onLine){
      loadingToast.style.display = "none";
    }

    const showData = async (resp) => {
      if (resp){
        header__titleH2.innerHTML = resp.nama !== undefined ? resp.nama : "User";
        header__titleP.innerHTML = resp.role_status;
        onHandleEditProfile(resp);

        if(resp.role_status == "Mahasiswa"){
          const dataDosen = await getDataDosen(resp.id_dosen);
          profile__detail.innerHTML = showDetail(resp, dataDosen);
          
        }else {
          const dataTemp = {
            nama : "",
            email : "",
            nomor_telepon : "",
          }
          profile__detail.innerHTML = showDetail(resp, dataTemp);
          
        }
      }else {
        console.log(resp)
      }
    }

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

    simpan_password.addEventListener("click", async () => {
      const {email, password_lama, password_baru} = dataUpdatePass;
      if(password_lama != '' || password_baru != ''){
        const resp = await updatePasswordUser(dataUpdatePass).catch((err) => err)
        if(resp == "succes") {
          loading(false, "Update Succes")
        }else {
          validasiFormRegisLogin(resp)
        }
      }else {
        loading(true, "Semua Data Harus Terisi")
      }
    })

    changePass.addEventListener("click", () => {
      edit__password.classList.add("active")
    })

    cancel.addEventListener("click", () => {
      formUp.classList.remove("active");
    });

    cancel_password.addEventListener("click", () => {
      edit__password.classList.remove("active")
    });
  },
};

export default profile;
