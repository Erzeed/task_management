import css from "./card.css";
import lampiranIcons from "../../../../asset/icons/attach-24.png";
import linkIcons from "../../../../asset/icons/link-24.png";
import commentsIcons from "../../../../asset/icons/comments-24.png";
import profileimg from "../../../../asset/img/profile-default.jpg";
import autosize from 'autosize';

export const cardTodo = ({nim, judul, deskripsi, status, id, id_mhs}) =>  {
    const textarea = document.querySelector("textarea");
    autosize(textarea)
    return `
        <style>
            ${css}
        </style>
        <div class="card" id="${id}">
            <div class="card__header">
                <p>${judul}</p>
                <button class="menu">...</button>
                <div class="card__nav" data-id_mhs="${id_mhs}" id="${id}">
                    <button class="move ${status}" >move</button>
                    <button class="back ${status}">back</button>
                    <button class="delete" >delete</button>
                </div>
            </div>
            <div class="card__body">
                <p>${deskripsi}</p>
            </div>
            <div class="card__footer">
                <div class="footer__name">
                    <p>${nim}</p>
                </div>
                <div class="footer__createAt">
                    <p>1 Jan 2023</p>
                </div>
                <div class="footer__menu">
                    <ul>
                        <li><img class="btnLinks" id="${id}" src="${linkIcons}" alt="link file" /></li>
                        <li><img class="btnLampiran" id="${id}" src="${lampiranIcons}" alt="lampiran" /></li>
                        <li><img class="btnKoment" id="${id}" src="${commentsIcons}" alt="comment" /></li>
                    </ul>
                </div>
            </div>
            <div class="footer__link" id="${id}">
                <form data-id_mhs="${id_mhs}" id="${id}">
                    <input type="url" placeHolder="masukkan url">
                    <button type="button">Ok</button>
                </form>
            </div>
            <div class="footer__upload" id="${id}">
                <form data-id_mhs="${id_mhs}" id="${id}">
                    <input
                    type="file"
                    id="file__upoloud"
                    accept=".doc,.docx,.pdf" />
                    <button class="btn__file" type="button">Upload</button>
                </form>
            </div>
            <div class="footer__comment" id="${id}">
                <div class="comment__area">
                    <form >
                        <textarea id="w3review" name="w3review" rows="3" cols="26"></textarea>
                    </form>
                    <div class="btnComment">
                        <button type="button">Kirim</button>
                    </div>
                </div>
                <div class="comment__user">
                    <div class="card__comment">
                        <div class="card__header">
                            <div class="profile">
                                <img src="${profileimg}" alt="" />
                            </div>
                            <div class="header__name">
                                <p>Feizal Reza</p>
                                <small>Mahasiswa</small>
                            </div>
                        </div>
                        <div class="card__body">
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente, voluptatibus.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    
    `
}