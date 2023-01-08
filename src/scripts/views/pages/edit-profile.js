import "../../../styles/editprofile.css";
import {cekUser} from "../../utils/cekUser";
import {updateProfileUser} from "../../globals/api-endpoint.js";

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
              <label for="field1"><span>Angkatan </span><input  id="Angkatan" type="number" class="input-field" name="field1" value="" /></label>
              <label for="field1"><span>Name </span><input  id="Name" type="text" class="input-field" name="field1" value="" /></label>
              <label for="field2"><span>Email </span><input  id="Email" type="text" class="input-field" name="field2" value="" /></label>
              <label for="field2"><span>Nomor Telepon </span><input  id="Nomor_Telepon" type="tel" class="input-field" name="field2" value="" /></label>
              <label for="field1"><span>Jurusan </span><input  id="Jurusan" type="text" class="input-field" name="field1" value="" /></label>
              <label for="field1"><span>Judul Skripsi </span><input  id="Judul_Skripsi" type="text" class="input-field" name="field1" value="" /></label>
              <div class="button">
                <button type="button" id="btnSubmit">Simpan</button>
              </div>

            </form>
          </div>
        </div>
        
      </div>
    `;
  },

  async afterRender() {
    cekUser()
    let dataUser = {}
    const id = localStorage.getItem("id")
    const form = document.querySelectorAll(".input-field");
    const btnSubmit = document.querySelector("#btnSubmit");
    
    [...form].forEach(e => {
      e.addEventListener("change", (e) => {
        dataUser = {
          ...dataUser,
          [e.target.id]: e.target.value,
        }
      })
    });

    btnSubmit.addEventListener("click", () => {
      updateProfileUser(id, dataUser)
    })

  },
};

export default EditProfile;
