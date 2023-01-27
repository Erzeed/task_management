import "../../../styles/todo.css";
import { cekUser } from "../../utils/cekUser";
import { cardTodo } from "../components/cardTodo/card";
import {
  getAllDataMhsBmbngan,
  saveDataInTodo,
  getDataTodo,
  updateCardStatus,
  deleteCard,
  uploadFile
} from "../../globals/api-endpoint.js";

const Todo = {
  async render() {
    return `
      <div class="content__todo">
      <side-bar class="todo"></side-bar>
      <div class="todo__main">
        <div class="main__title">
            <h1>Bimbingan Skripsi</h1>
            <button class="openForm">Add Todo</button>
        </div>
        <div class="main__list">
            <div class="todo planning">
                <div class="todo__title">
                    <p>Todo</p>
                    <p>5</p>
                </div>
                <div class="todo__card todo">
                    <p>Data kosong</p>
        
                </div>
            </div>
            <div class="todo doing">
                <div class="todo__title">
                    <p>Do Ing</p>
                    <p>5</p>
                </div>
                <div class="todo__card doing">
                    <p>Data kosong</p>
                </div>
            </div>
            <div class="todo review">
                <div class="todo__title">
                    <p>Review</p>
                    <p>5</p>
                </div>
                <div class="todo__card review">
                    <p>Data kosong</p>
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
                <label htmlFor="nim">Nim</label>
                <input list="listnim" name="nim" id="nim" placeholder="Nim">
                <datalist id="listnim">
                    
                </datalist>
                <label htmlFor="judul">Judul</label>
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
    let dataInputForm = {
      id_mhs: "",
      status: "",
      nim: "",
      judul: "",
      createdAt: "",
      deskripsi: "",
    };
    let dataUserBimbingan = [];
    const respDataMhs = await getAllDataMhsBmbngan(id);
    dataUserBimbingan = respDataMhs;

    const getDataInTodo = () => {
      const dataTodo = [];
      dataUserBimbingan.forEach(async (data) => {
        const resp = await getDataTodo(data.id);
        dataTodo.push(...resp);
        showDataInTodo(dataTodo);
      });
    };

    const showDataInTodo = (data) => {
      [...allTodo].forEach((e) => {
        e.innerHTML = "";
      });
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
        getDataInTodo();
      } else {
        console.log(resp);
      }
    };

    const delCard = async (idMhs, idCard) => {
        const respUser = confirm("Apakah anda yakin ?")
        if(respUser) {
            const resp = await deleteCard(idMhs, idCard);
            if(resp){
                getDataInTodo();
            }
            console.log(resp)
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

    const cekOpenMenuActive = (elements, idCard) => {
      if(elements.id == idCard){
        if(elements.classList.value.includes("active")){
          elements.classList.remove("active")
        }
      }
    }

    const activatedMenu = (elementActivate, unActivatedElement, unActivatedElement2, idCard) => {
      [...elementActivate].forEach((el,i) => {
        cekOpenMenuActive(unActivatedElement[i], idCard);
        cekOpenMenuActive(unActivatedElement2[i], idCard);
        if(el.id == idCard) {
          el.classList.toggle("active")
        }
      })
    }

    const openMenu = (elements) => {
      const footer__link = document.querySelectorAll(".footer__link");
      const footer__uploads = document.querySelectorAll(".footer__upload");
      const footer__comment = document.querySelectorAll(".footer__comment");

      if (elements.target.classList == "btnLinks") {
        activatedMenu(footer__link, footer__uploads, footer__comment, elements.target.id)
      } else if (elements.target.classList == "btnLampiran") {
        activatedMenu(footer__uploads, footer__link, footer__comment, elements.target.id);
      } else if (elements.target.classList == "btnKoment") {
        activatedMenu(footer__comment, footer__link, footer__uploads, elements.target.id);
      }
    }

    getDataInTodo();

    window.addEventListener("click", async (e) => {
      const idMhs = e.target.parentElement.dataset.id_mhs;
      const idCard = e.target.parentElement.id;

      if (e.target.classList == "menu") {
        e.target.nextElementSibling.classList.toggle("active");
      } else if (e.target.classList == "move todo") {
        moveCard("doing", idMhs, idCard);
      } else if (e.target.classList == "move doing") {
        moveCard("review", idMhs, idCard);
      } else if (e.target.classList == "move review") {
        moveCard("revisi", idMhs, idCard);
      } else if (e.target.classList == "move revisi") {
        moveCard("done", idMhs, idCard);
      } else if (e.target.classList == "delete") {
        delCard(idMhs, idCard);
      }  else if (e.target.classList == "btn__file") {
        const file = document.getElementById("file__upoloud").files[0];
        const resp = await uploadFile(file)
        console.log(resp)
      }  
      backCard(e)
      openMenu(e)
    });

    openForm.addEventListener("click", () => {
      const form = document.querySelector(".popUp__container");
      const listnim = document.querySelector(".listnim");
      form.classList.add("active");
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
      const { nim, judul, deskripsi } = dataInputForm;
      if (nim == "" || judul == "" || deskripsi == "") {
        alert("Semua data harus di isi");
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
              getDataInTodo();
            }
          } else {
            count++;
            if (count == dataUserBimbingan.length) {
              alert("Nim tidak ditemukan");
            }
          }
        });
        count = 0;
      }
    });
  },
};

export default Todo;
