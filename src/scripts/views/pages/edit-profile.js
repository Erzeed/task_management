import "../../../styles/editprofile.css";
import {cekUser} from "../../utils/cekUser";
import {updateProfileUser, getDataUser} from "../../globals/api-endpoint.js";
import { loading } from "../../utils/customToast";

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
              <label for="field1"><span>Foto Profile </span>
              <input
                type="file"
                id="img_upload"
                accept="image/png, image/jpeg" />
              </label>
              <label for="field1"><span>Nama* </span><input  id="nama" type="text" class="input-field" name="field1" value="" /></label>
              <label for="field2"><span>Nomor Telepon* </span><input  id="nomor_telepon" type="tel" class="input-field" name="field2" value="" /></label>
              <label for="field1"><span>Angkatan* </span><input  id="angkatan" type="number" class="input-field" name="field1" value="" /></label>
              <label for="field1"><span>Fakultas* </span><input  id="fakultas" type="text" class="input-field" name="field1" value="" /></label>
              <label for="field1"><span>Jurusan* </span><input  id="jurusan" type="text" class="input-field" name="field1" value="" /></label>
              <label for="field1"><span>Judul Skripsi* </span><input  id="judul_skripsi" type="text" class="input-field" name="field1" value="" /></label>
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
      angkatan: "",
      judul_skripsi: "",
      jurusan: "",
      nama: "",
      nomor_telepon: "",
      fakultas: "",
    }
    const id = localStorage.getItem("id")
    const form = document.querySelectorAll(".input-field");

    
    [...form].forEach(e => {
      e.addEventListener("change", (e) => {
        dataUser = {
          ...dataUser,
          [e.target.id]: e.target.value,
        }
      })
    });

    document.addEventListener("click", async (e) => {
      if(e.target.id == "cancel") {
        window.location.href = "/#/profile"
      }else if(e.target.id == "btnSubmit"){
        const {angkatan, judul_skripsi, jurusan, nama, nomor_telepon, fakultas} = dataUser;
        if (angkatan == "" || judul_skripsi == "" || jurusan == "" || nama == "" || nomor_telepon == "" || fakultas == "") {
          loading(true, "Semua data harus diisi");
        } else {
          const resp = await updateProfileUser(id, dataUser, "Mahasiswa")
          if(resp){
            loading(false,"Data berhasil di update");
          } else {
            loading(true, resp);
          }
        }
      }
    })
  },
};

export default EditProfile;
