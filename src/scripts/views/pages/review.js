import "../../../styles/review.css";
import pdfObject from 'pdfobject';
import UrlParser from '../../routes/url-parser';
import {getDataBimbingan, updateStatusAndCreateDataBimbingan} from "../../globals/api-endpoint.js";
const Review = {
  async render() {
    return `
      <div class="content__review">
      <side-bar class="home"></side-bar>
        <div id="review__page" class="review__page">
          <div class="container_pdf">
            <div id="pdfViewer"></div>
          </div>
          <div class="body_review">
            <div class="review__header">
              <div class="header__title">
                <h2>Catatan</h2>
              </div>
              <div class="header__button">
                <h1>...</h1>
                <div class="card__nav" >
                    <button class="revisi" >Revisi</button>
                    <button class="selesai">Selesai</button>
                </div>
              </div>
            </div>
            <div class="review__body">
              <form>
                <textarea ="catatan" id="catatan" cols="30" rows="10" placeholder="Tulis Catatan"></textarea>
              </form>
              <div class="body__footer">
                <div class="footer__tgl">
                <p>20 desember 2019</p>
                </div>
                <div class="btn__footer">
                <button class="kirim">Kirim</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  async afterRender() {
    let dataBimbingan = {}
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const resp = await getDataBimbingan(url.id,url.idTodo);
    const header__button = document.querySelector(".header__button");
    const card__nav = document.querySelector(".card__nav");
    const revisi = document.querySelector(".revisi");
    const selesai = document.querySelector(".selesai");
    const kirim = document.querySelector(".kirim");
    const catatan = document.querySelector("#catatan");


    if(resp){
      dataBimbingan = {
        ...dataBimbingan,
        ...resp
      } 
      pdfObject.embed(`${resp.link_file}`, "#pdfViewer");
      console.log(dataBimbingan);
    }

    revisi.addEventListener("click", () => {
      dataBimbingan = {
        ...dataBimbingan,
        status: "revisi"
      }
    })
    
    selesai.addEventListener("click", () => {
      dataBimbingan = {
        ...dataBimbingan,
        status: "selesai"
      }
    })

    header__button.addEventListener("click", () => {
      card__nav.classList.toggle("active");
    })

    catatan.addEventListener("change", (el) => {
      dataBimbingan = {
        ...dataBimbingan,
        deskripsi: el.target.value
      }
    })

    kirim.addEventListener("click", async () => {
      if(dataBimbingan.status !== "selesai" && dataBimbingan.status !== "revisi"){
        console.log(dataBimbingan)
        alert("status harus jelas jangan digantung")
      }else {
        dataBimbingan = {
          ...dataBimbingan,
          tgl_selesai: + new Date()
        }
        const resp = await updateStatusAndCreateDataBimbingan(dataBimbingan.status, url.id, url.idTodo, dataBimbingan);
        console.log(resp);
      }
    })
  }
};

export default Review;
