import css from "./card.css";

export const cardTodo = ({nim, judul, deskripsi}) =>  {
    return `
        <style>
            ${css}
        </style>
        <div class="card">
            <div class="card__header">
                <p>${judul}</p>
                <button class="menu">...</button>
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