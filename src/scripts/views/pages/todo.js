import "../../../styles/todo.css";
import { cekUser } from "../../utils/cekUser";
import { cardTodo } from "../components/cardTodo/card";
import {
  getAllDataMhsBmbngan,
  saveDataInTodo,
  getDataTodo,
  updateCardStatus,
  deleteCard,
  uploadFile,
  getDataUser,
  addLinkBimbingan
} from "../../globals/api-endpoint.js";
import { loading } from "../../utils/customToast";


const Todo = {
  async render() {
    return `
      <div class="content__todo">
      <side-bar class="todo"></side-bar>
      <div class="todo__main">
      <loading-roll></loading-roll>
        <div class="main__title">
            <h1>Bimbingan Skripsi</h1>
            <button class="openForm">Tambah tugas</button>
        </div>
        <div class="main__list">
            <div class="todo planning">
                <div class="todo__title">
                    <p>Todo</p>
                    <p class="countTodo">5</p>
                </div>
                <div class="todo__card todo">
                </div>
            </div>
            <div class="todo doing">
                <div class="todo__title">
                    <p>Do Ing</p>
                    <p>5</p>
                </div>
                <div class="todo__card doing">
                </div>
            </div>
            <div class="todo review">
                <div class="todo__title">
                    <p>Review</p>
                    <p>5</p>
                </div>
                <div class="todo__card review">
                </div>
            </div>
            <div class="todo revisi">
                <div class="todo__title">
                    <p>Revisi</p>
                    <p>5</p>
                </div>
                <div class="todo__card revisi">
                
                </div>
            </div>
            <div class="todo done">
                <div class="todo__title">
                    <p>Done</p>
                    <p>5</p>
                </div>
                <div class="todo__card done">
                
                </div>
            </div>
        </div>
        <div class="popUp__container" >
            <form action=''>
                <label htmlFor="nim">Nim*</label>
                <input list="listnim" name="nim" id="nim" placeholder="Nim">
                <datalist id="listnim">
                    
                </datalist>
                <label htmlFor="judul">Judul*</label>
                <input type="text" name="judul" placeholder="Judul" id="judul"/>
                <label htmlFor="content">Deskripsi</label>
                <textarea name="content" id="deskripsi" placeholder="Deskripsi" cols="30" rows="10" ></textarea>
            </form>
            <div class="actionForm">
                <button class="simpan"  >Simpan</button>
                <button class='cancel' >Cancel</button>
            </div>
        </div>
        </div>
      </div>
    `;
  },

  async afterRender() {
    cekUser();
    const openForm = document.querySelector(".openForm");
    const cancel = document.querySelector(".cancel");
    const simpan = document.querySelector(".simpan");
    const id = localStorage.getItem("id");
    const userInput = document.querySelectorAll(".popUp__container form input");
    const textArea = document.querySelector(".popUp__container form textarea");
    const allTodo = document.querySelectorAll(".todo__card");
    const todo__card = document.querySelector(".todo__card.todo");
    const doingCard = document.querySelector(".todo__card.doing");
    const reviewCard = document.querySelector(".todo__card.review");
    const revisiCard = document.querySelector(".todo__card.revisi");
    const doneCard = document.querySelector(".todo__card.done");
    const countTodo = document.querySelector('.countTodo');
    const loadingToast = document.querySelector("loading-roll");
    
    
    let inputUrlUser = "";

    let dataInputForm = {
      id_mhs: "",
      status: "",
      nim: "",
      judul: "",
      createdAt: "",
      deskripsi: "",
    };
    
    let dataUserBimbingan = [];
    let dataUser = {};

    const getData = async () => {
      const resp = await getDataUser(id);
      if(resp) {
        dataUser = {
          ...resp
        }
        loadingToast.style.display = "none";
        cekRoleUser();
      }
    }

    getData();
    
    if(!navigator.onLine){
      loadingToast.style.display = "none";
    }

    const getDataInTodo = async  (role) => {
      const dataTodo = [];
      if(role == "mhs"){
        const resp = await getDataTodo(id);
        dataTodo.push(...resp);
        showDataInTodo(dataTodo);
      }else {
        dataUserBimbingan.forEach( async (data) => {
          const resp = await getDataTodo(data.id);
          if(resp) {
            dataTodo.push(...resp);
            showDataInTodo(dataTodo)
          }
        });
      }
    };

    const cekRoleUser = async () => {
      console.log(dataUser.role_status)
      if(dataUser.role_status == "Mahasiswa"){
        openForm.style.display = "none";
        getDataInTodo("mhs");
      } else {
        const respDataMhs = await getAllDataMhsBmbngan(id);
        dataUserBimbingan = respDataMhs;
        getDataInTodo("dosen");
      }
    }

    const showDataInTodo = (data) => {
      [...allTodo].forEach((e) => {
        e.innerHTML = "";
      });
      // console.log(data)
      if (data.length == 0) {
        todo__card.innerHTML = "<p>Data kosong</p>";
      } else {
        data.forEach((e) => {
          if (e.status == "todo") {
            todo__card.innerHTML += cardTodo(e);
          } else if (e.status == "doing") {
            doingCard.innerHTML += cardTodo(e);
          } else if (e.status == "review") {
            reviewCard.innerHTML += cardTodo(e);
          } else if (e.status == "revisi") {
            revisiCard.innerHTML += cardTodo(e);
          } else if (e.status == "done") {
            doneCard.innerHTML += cardTodo(e);
          }
        });
      }
    };

    const moveCard = async (status, idMhs, idCard) => {
      const resp = await updateCardStatus(status, idMhs, idCard);
      if (resp) {
        cekRoleUser();
      } else {
        console.log(resp);
      }
    };

    const delCard = async (idMhs, idCard) => {
        const resp = await deleteCard(idMhs, idCard);
        if(resp){
          cekRoleUser();
        }
    }

    const backCard = (elements) => {
      const idMhs = elements.target.parentElement.dataset.id_mhs;
      const idCard = elements.target.parentElement.id;
      if(elements.target.classList == "back doing"){
        moveCard("todo", idMhs, idCard);
      } else if (elements.target.classList == "back review"){
        moveCard("doing", idMhs, idCard);
      } else if (elements.target.classList == "back revisi"){
        moveCard("review", idMhs, idCard);
      } else if (elements.target.classList == "back done"){
        moveCard("revisi", idMhs, idCard);
      }
    }

    const forwardCard = (elements) => {
      const idMhs = elements.target.parentElement.dataset.id_mhs;
      const idCard = elements.target.parentElement.id;
      if (elements.target.classList == "move todo") {
        moveCard("doing", idMhs, idCard);
      } else if (elements.target.classList == "move doing") {
        moveCard("review", idMhs, idCard);
      } else if (elements.target.classList == "move review") {
        moveCard("revisi", idMhs, idCard);
      } else if (elements.target.classList == "move revisi") {
        moveCard("done", idMhs, idCard);
      } 
    }

    const nonActivateElement = (elements, idCard) => {
      if(elements.id == idCard){
        if(elements.classList.value.includes("active")){
          elements.classList.remove("active")
        }
      }
    }

    const activatedMenu = (elementActivate, unActivatedElement, idCard) => {
      [...elementActivate].forEach((el,i) => {
        nonActivateElement(unActivatedElement[i], idCard);
        if(el.id == idCard) {
          el.classList.add("active")
        }
      })
    }

    const openMenu = (elements) => {
      const footer__link = document.querySelectorAll(".footer__link");
      const footer__uploads = document.querySelectorAll(".footer__upload");

      if (elements.target.classList == "btnLinks") {
        activatedMenu(footer__link, footer__uploads, elements.target.id)
      } else if (elements.target.classList == "btnLampiran") {
        activatedMenu(footer__uploads, footer__link, elements.target.id);
      } else if (elements.target.classList == "closeLink") {
        footer__link.forEach(el => {
          nonActivateElement(el, el.id)
        })
      }  else if (elements.target.classList == "closeUpload") {
        footer__uploads.forEach(el => {
          nonActivateElement(el, el.id)
        })
      }
    }

    const uploadFileBimbingan = async (element, nim, idMhs, idCard) => {
      const file = element.target.previousElementSibling.files[0];
      if(file == undefined){
        loading(true, "File tidak ada")
      }else{
        const resp = await uploadFile(nim, "file-pdf",file, idMhs, idCard )
        if(resp){
          cekRoleUser()
        }
      }
    }

    const addUrlBimbingan = async (idMhs, idCard) => {
      if(inputUrlUser == ""){
        loading(true, "Mohon inputkan url")
      }else {
        const resp = await addLinkBimbingan(idMhs, idCard, inputUrlUser);
        if(resp) {
          loading(false, "Url berhasil disimpan")
          cekRoleUser()
        }else {
          loading(true, resp)
        }
      }
    }


    window.addEventListener("change", el => {
      if(el.target.classList == "input_url"){
        inputUrlUser = el.target.value;
      }
    })


    window.addEventListener("click",(e) => {
      const idMhs = e.target.parentElement.dataset.id_mhs;
      const idCard = e.target.parentElement.id;
      
      if (e.target.classList == "menu") {
        e.target.nextElementSibling.classList.add("active");
      }  else if (e.target.classList == "delete") {
        delCard(idMhs, idCard);
      }  else if (e.target.classList == "btn__file") {
        uploadFileBimbingan(e, dataUser.nim, idMhs, idCard);
      }  else if (e.target.classList == "btn__url") {
        addUrlBimbingan(idMhs, idCard);
      } else if(e.target.classList != "menu"){
        const card__nav = document.querySelectorAll(".card__nav")
        card__nav.forEach(el => {
          if(el.classList.contains("active")){
            el.classList.remove("active")
          }
        })
      } 
      forwardCard(e);
      backCard(e)
      openMenu(e)
    });

    openForm.addEventListener("click", () => {
      const form = document.querySelector(".popUp__container");
      form.classList.add("active");
      const listnim = document.querySelector("#listnim");
      dataUserBimbingan.forEach((e) => {
        listnim.innerHTML += `<option value=${e.nim}>`;
      });
    });

    cancel.addEventListener("click", () => {
      const form = document.querySelector(".popUp__container");
      form.classList.remove("active");
    });

    textArea.addEventListener("change", (e) => {
      dataInputForm = {
        ...dataInputForm,
        [e.target.id]: e.target.value,
      };
    });


    [...userInput].forEach((e) => {
      e.addEventListener("change", (data) => {
        dataInputForm = {
          ...dataInputForm,
          [data.target.id]: data.target.value,
          status: "todo",
          createdAt: Date.now(),
        };
      });
    });

    simpan.addEventListener("click", () => {
      const { nim, judul } = dataInputForm;
      if (nim == "" || judul == "") {
        loading(true, "Nim daan Judul tidak boleh kosong")
      } else {
        let count = 0;
        dataUserBimbingan.forEach(async (data) => {
          if (data.nim == nim) {
            dataInputForm = {
              ...dataInputForm,
              id_mhs: data.id,
            };
            const resp = await saveDataInTodo(dataInputForm, data.id);
            if (resp) {
              cekRoleUser();
              loading(false, "Data berhasil ditambahkan");
            }else {
              loading(true, resp)
            }
          } else {
            count++;
            if (count == dataUserBimbingan.length) {
              loading(true, "Nim tidak terdaftar")
            }
          }
        });
        count = 0;
      }
    });
  },
};

export default Todo;
