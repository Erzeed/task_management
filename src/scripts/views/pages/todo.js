import "../../../styles/todo.css";
import {cekUser} from "../../utils/cekUser";

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
                    <div class="card">
                        <div class="card__header">
                            <p>Bab 2</p>
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
                    <div class="card">
                        <div class="card__header">
                            <p>Bab 2</p>
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
                                <p>Iqbal Fanani</p>
                            </div>
                            <div class="footer__createAt">
                                <p>1 Jan 2023</p>
                            </div>
                        </div>
                    </div>
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
                <label htmlFor="judul">Judul</label>
                <input type="text" name="judul" placeholder="Judul" id="judul"/>
                <label htmlFor="date">Deadline</label>
                <input type="date" id="deadline" name="date" />
                <label htmlFor="content">Deskripsi</label>
                <textarea name="content" id="content" placeholder="Deskripsi" cols="30" rows="10" ></textarea>
            </form>
            <div class="actionForm">
                <button  >Simpan</button>
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

    menu.forEach(e  => {
        e.addEventListener("click", (e) => {
            e.path[1].childNodes[5].classList.toggle("active")
        })
    })

    openForm.addEventListener("click", () => {
        const form = document.querySelector(".popUp__container");
        form.classList.add("active")
      })
      
    cancel.addEventListener("click", () => {
        const form = document.querySelector(".popUp__container");
        form.classList.remove("active");
    })
  },
};

export default Todo;
