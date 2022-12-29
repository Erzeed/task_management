import css from "./card.css";

export const cardPromo = ({icon, title, desc}) =>  {
    return `
        <style>
            ${css}
        </style>
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
    
    `
}