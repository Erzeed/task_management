import "../../../styles/editprofile.css";
import {cekUser} from "../../utils/cekUser";
import {updateProfileUser, getDataUser} from "../../globals/api-endpoint.js";
import { editForm } from "../components/editForm/editForm";

const EditProfile = {
  async render() {
    return `
      <div class="content__editprofile">
      <side-bar ></side-bar>
        <div class="editprofile__main"> 
          <div class="header">
            <h2>Edit Profile</h2>
          </div>
          <div class="profile__input form-style-2">
            <form action="#" class="form">
              <label for="field1"><span>Nama </span><input  id="nama" type="text" class="input-field" name="field1" value="" /></label>
              <label for="field2"><span>Nomor Telepon </span><input  id="nomor_telepon" type="tel" class="input-field" name="field2" value="" /></label>
              <div class="button">
                <button type="button" id="btnSubmit">Simpan</button>
                <button type="button" id="cancel">Cancel</button>
              </div>
            </form>
          </div>
        </div>
        
      </div>
    `;
  },

  async afterRender() {
    cekUser()
    let dataUser = {
      Angkatan: "",
      Judul_Skripsi: "",
      Jurusan: "",
      Name: "",
      Nomor_Telepon: ""
    }
    const id = localStorage.getItem("id")
    const form = document.querySelectorAll(".input-field");
    const profile__input = document.querySelector(".profile__input");

    const getUserData = await getDataUser(id);
    // profile__input.innerHTML = editForm(getUserData);
    
    
    [...form].forEach(e => {
      e.addEventListener("change", (e) => {
        dataUser = {
          ...dataUser,
          [e.target.id]: e.target.value,
        }
      })
    });

    document.addEventListener("click",e => {
      if(e.target.id == "cancel") {
        window.location.href = "/#/profile"
      }else if(e.target.id == "btnSubmit"){
        const {Angkatan, Judul_Skripsi, Jurusan, Name, Nomor_Telepon} = dataUser;
        if (Angkatan == "" || Judul_Skripsi == "" || Jurusan == "" || Name == "" || Nomor_Telepon == "") {
          alert("Semua data harus diisi");
        } else {
          // updateProfileUser(id, dataUser)
          console.log(dataUser)
        }
      }
    })
  },
};

export default EditProfile;
