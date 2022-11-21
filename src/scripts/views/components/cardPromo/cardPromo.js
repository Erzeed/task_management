import css from "./cardPromo.css";

export const cardPromo = ({icon, title, desc}) =>  {
    return `
        <style>
            ${css}
        </style>
        <div class="cardPromo">
            <div class="cardPromo__icon">
                <img src=${icon} alt="task icon" />
            </div>
            <div class="cardPromo__title">
                <h3>${title}</h3>
            </div>
            <div class="cardPromo__desc">
                <p>${desc}</p>
            </div>
        </div>
    
    `
}