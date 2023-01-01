import "../../../styles/todo.css";
import {cekUser} from "../../utils/cekUser";

const Todo = {
  async render() {
    return `
      <div class="content__todo">
      <side-bar class="todo"></side-bar>
      <div class="todo__main">
        <h1>Bimbingan Skripsi</h1>
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
      </div>
      </div>
    `;
  },

  async afterRender() {
    cekUser()

  },
};

export default Todo;
