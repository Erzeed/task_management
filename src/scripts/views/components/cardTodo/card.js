import css from "./card.css";
import lampiranIcons from "../../../../asset/icons/attach-24.png";
import linkIcons from "../../../../asset/icons/link-24.png";
import commentsIcons from "../../../../asset/icons/comments-24.png";

export const cardTodo = ({nim, judul, deskripsi, status, id, id_mhs}) =>  {
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
                        <li><img src="${commentsIcons}" alt="comment" /></li>
                    </ul>
                </div>
            </div>
            <div class="footer__link" id="${id}">
                <form >
                    <input type="url" placeHolder="masukkan url">
                    <button type="submit">Ok</button>
                </form>
            </div>
            <div class="footer__upload" id="${id}">
                <form >
                    <input
                    type="file"
                    id="docpicker"
                    accept=".doc,.docx,.pdf" />
                    <button type="submit">Ok</button>
                </form>
            </div>
        </div>
    
    `
}