import "../../../styles/detailBimbingan.css";
import UrlParser from '../../routes/url-parser';
import {cekUser} from "../../utils/cekUser";

const DetailBimbingann = {
    async render() {
        return `
      <div class="content__DetailBimbingann">
        <side-bar class="active"></side-bar>
        <div class="detail__content">
            <div class="detail__title">
                <h1>Detail Bimbingan</h1>
                <p>Feizal Reza</p>
            </div>
            <div class="detail__main">
                
            </div>

        </div>
      </div>
    `;
    },

    async afterRender() {
        cekUser()
        const url = UrlParser.parseActiveUrlWithoutCombiner();
        console.log(url.id)
    },
};

export default DetailBimbingann;
