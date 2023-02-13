import css from "./card.css";
import lampiranIcons from "../../../../asset/icons/attach-24.png";
import linkIcons from "../../../../asset/icons/link-24.png";
import imageIcons from "../../../../asset/icons/comments-24.png";
import profileimg from "../../../../asset/img/profile-default.jpg";
import autosize from 'autosize';

export const cardTodo = ({nim, judul, deskripsi, status, id, id_mhs , link_file, url_file, createdAt}) =>  {
    const textarea = document.querySelector("textarea");


    autosize(textarea)
    const date = new Date(createdAt);
    const tglBuat = date.toLocaleString().slice(0 , 8).replace(/[/]/g, "-");


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
                    <p>${tglBuat}</p>
                </div>
                <div class="footer__menu">
                    <ul>
                        <li><img class="btnLinks" id="${id}" src="${linkIcons}" alt="link file" /></li>
                        <li><img class="btnLampiran" id="${id}" src="${lampiranIcons}" alt="lampiran" /></li>
                        <li><img class="btnKoment" id="${id}" src="${imageIcons}" alt="comment" /></li>
                    </ul>
                </div>
            </div>
            <div class="footer__link" id="${id}">
                <div class="footer__link_btn">
                    <button class="closeLink">X</button>
                </div>
                <form data-id_mhs="${id_mhs}" id="${id}">
                    <input class="input_url" type="url" placeHolder="masukkan url">
                    <button class="btn__url" type="button">Ok</button>
                </form>
                <div class="current_file">
                    <p>${url_file == undefined ? "" : `<a target=”_blank” href=${url_file}>Url bimbingan</a>`}</p>
                </div>
            </div>
            <div class="footer__upload" id="${id}">
                <div class="footer__upload_btn">
                    <button class="closeUpload">X</button>
                </div>
                <form data-id_mhs="${id_mhs}" id="${id}">
                    <input
                    type="file"
                    id="file__upoloud"
                    accept=".pdf" />
                    <button class="btn__file" type="button">Upload</button>
                </form>
                <div class="current_file">
                    <p>${link_file == undefined ? "" : `<a target=”_blank” href=${link_file}>file bimbingan</a>`}</p>
                </div>
            </div>
            <div class="footer__img" id="${id}">
                <div class="footer__img_btn">
                    <button class="closeImg">X</button>
                </div>
                <form data-id_mhs="${id_mhs}" id="${id}">
                    <input
                    type="file"
                    id="img__upoloud"
                    accept=".jpg, .jpeg, .png" />
                    <button class="btn__file" type="button">Upload</button>
                </form>
                <div class="current_file">
                    <p>${link_file == undefined ? "" : `<a target=”_blank” href=${link_file}>file bimbingan</a>`}</p>
                </div
                
            </div>
        </div>
    
    `
}