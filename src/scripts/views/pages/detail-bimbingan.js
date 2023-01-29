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
                <div class="detail__header">
                    <div class="header__tnggal">
                        <p>Tanggal</p>
                    </div>
                    <div class="header__notes">
                        <p>Catatan</p>
                    </div>
                    <div class="header__status">
                        <p>Status</p>
                    </div>
                    <div class="header__file">
                        <p>File</p>
                    </div>
                </div>
                <div class="detail__container">
                    <div class="tggl__bimbingan">
                        <p>1 Januari 2023</p>
                    </div>
                    <div class="notes__bimbingan">
                        <p>Tambahkan batasan masalah</p>
                    </div>
                    <div class="status__bimbingan">
                        <p>revisi</p>
                    </div>
                    <div class="file__bimbingan">
                        <p>Bab 1</p>
                    </div>
                </div>
                <div class="detail__container">
                    <div class="tggl__bimbingan">
                        <p>1 Januari 2023</p>
                    </div>
                    <div class="notes__bimbingan">
                        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Architecto accusamus alias eaque inventore hic necessitatibus. Totam aspernatur dolorum et veniam.</p>
                    </div>
                    <div class="status__bimbingan">
                        <p>revisi</p>
                    </div>
                    <div class="file__bimbingan">
                        <p>Bab 1</p>
                    </div>
                </div>
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
