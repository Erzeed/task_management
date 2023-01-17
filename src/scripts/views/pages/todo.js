import "../../../styles/todo.css";
import {cekUser} from "../../utils/cekUser";
import {cardTodo} from "../components/cardTodo/card"
import {getAllDataMhsBmbngan, saveDataInTodo , getDataTodo} from "../../globals/api-endpoint.js";

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
                <div class="todo__card">
        
                </div>
            </div>
            <div class="todo doing">
                <div class="todo__title">
                    <p>Do Ing</p>
                    <p>5</p>
                </div>
                <div class="todo__card">
                
                </div>
            </div>
            <div class="todo review">
                <div class="todo__title">
                    <p>Review</p>
                    <p>5</p>
                </div>
                <div class="todo__card">
                <div class="card">
                    <div class="card__header">
                        <p>Bab 1</p>
                        <button class="menu">...</button>
                        <div class="card__nav">
                            <button class="move">move</button>
                            <button class="back">back</button>
                            <button class="delete">delete</button>
                        </div>
                    </div>
                    <div class="card__body">
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit, eius.</p>
                    </div>
                    <div class="card__footer">
                        <div class="footer__name">
                            <p>Feizal Reza</p>
                        </div>
                        <div class="footer__createAt">
                            <p>1 Jan 2023</p>
                        </div>
                    </div>
                </div>
                </div>
            </div>
            <div class="todo revisi">
                <div class="todo__title">
                    <p>Revisi</p>
                    <p>5</p>
                </div>
                <div class="todo__card">
                
                </div>
            </div>
            <div class="todo done">
                <div class="todo__title">
                    <p>Done</p>
                    <p>5</p>
                </div>
                <div class="todo__card">
                
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
    cekUser()
    const menu = document.querySelectorAll(".menu");
    const openForm = document.querySelector(".openForm");
    const cancel = document.querySelector(".cancel");
    const simpan = document.querySelector(".simpan");
    const id = localStorage.getItem("id");
    const userInput = document.querySelectorAll(".popUp__container form input");
    const textArea = document.querySelector(".popUp__container form textarea");
    const todo__card = document.querySelector(".todo__card");
    let dataInputForm = {
        status: "",
        nim: "",
        judul: "",
        createdAt: "",
        deskripsi: ""
    }
    let dataUserBimbingan = [];
    const respDataMhs = await getAllDataMhsBmbngan(id);
    dataUserBimbingan = respDataMhs;

    const getDataInTodo = () => {
        const dataTodo = []
        dataUserBimbingan.forEach(async (data) => {
            const resp = await getDataTodo(data.id);
            dataTodo.push(...resp)
            // showDataInTodo(dataTodo)
        })
    }
    
    const showDataInTodo = (data) => {
        data.forEach(e => {
            if(e.status == "todo") {
                todo__card.innerHTML += cardTodo(e)
                console.log(e)

            }
        })

    }

    getDataInTodo()

    menu.forEach(e  => {
        e.addEventListener("click", (e) => {
            e.path[1].childNodes[5].classList.toggle("active")
        })
    })

    openForm.addEventListener("click", () => {
        const form = document.querySelector(".popUp__container");
        const listnim = document.querySelector(".listnim");
        form.classList.add("active")
        dataUserBimbingan.forEach(e => {
            listnim.innerHTML += `<option value=${e.nim}>`;
        })
      });
      
    cancel.addEventListener("click", () => {
        const form = document.querySelector(".popUp__container");
        form.classList.remove("active");
    });

    textArea.addEventListener("change", e => {
        dataInputForm = {
            ...dataInputForm,
            [e.target.id]: e.target.value,
        }

    });
    
    [...userInput].forEach(e => {
        e.addEventListener("change", data => {
            dataInputForm = {
                ...dataInputForm,
                [data.target.id]: data.target.value,
                status: "todo",
                createdAt: Date.now()
            }
        })
    })

     simpan.addEventListener("click", () => {
        const {nim, judul, deskripsi} = dataInputForm;
        if(nim == "" || judul == "" || deskripsi == ""){
            alert("Semua data harus di isi")
        }else {
            let count = 0
            dataUserBimbingan.forEach(async (data) => {
                if(data.nim == nim) {
                    const resp = await saveDataInTodo(dataInputForm, data.id);
                    console.log(resp)
                } else {
                    count++
                    if(count == dataUserBimbingan.length){
                        alert("Nim tidak ditemukan")
                    }
                }
            })
            count = 0;
        }
    })
  },
};

export default Todo;
