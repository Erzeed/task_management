import css from "./card.css";

export const cardTodo = ({nim, judul, deskripsi, status, id, id_mhs}) =>  {
    return `
        <style>
            ${css}
        </style>
        <div class="card" id="${id}">
            <div class="card__header">
                <p>${judul}</p>
                <button class="menu">...</button>
                <div class="card__nav">
                    <button class="move ${status}" data-id_mhs="${id_mhs}" id="${id}">move</button>
                    <button class="back">back</button>
                    <button class="delete" data-id_mhs="${id_mhs}" id="${id}">delete</button>
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
            </div>
        </div>
    
    `
}