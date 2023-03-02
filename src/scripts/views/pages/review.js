import "../../../styles/review.css";
import pdfObject from 'pdfobject';
import UrlParser from '../../routes/url-parser';
import {getDataBimbingan, updateStatusAndCreateDataBimbingan,  getDataUser, sendNotif} from "../../globals/api-endpoint.js";
import { loading } from "../../utils/customToast";

const Review = {
  async render() {
    return `
      <div class="content__review">
      <side-bar class="home"></side-bar>
        <div id="review__page" class="review__page">
        <loading-roll></loading-roll>
          <div class="container__detail">
              <div class="detail_judul">
                <h1>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vitae, enim.</h1>
              </div>
              <div class="detail_name">
                <p class="nimMhs">19.11.2877</p>
              </div>
          </div>
          <div class="container__review">
            <div class="document__review">
              <h2>File bimbingan</h2>
              <div class="container__urlFile">
                <p class="btnPdf">File pdf</p>
                
              </div>
            </div>
            <div class="container_pdf">
              <div id="pdfViewer"></div>
            </div>
            <div class="body_review">
              <div class="review__header">
                <div class="header__title">
                  <h2>Catatan</h2>
                </div>
                <div class="header__button">
                  <p class="status">review</p>
                  <button class="btn_Review">...</button>
                  <div class="card__navigate" >
                      <div class="close__el">
                        <button class="closeBtn">X</button>
                      </div>
                      <button class="revisi" >Revisi</button>
                      <button class="selesai">Selesai</button>
                  </div>
                </div>
              </div>
              <div class="review__body">
                <form>
                  <textarea ="catatan" id="catatan" placeholder="Tulis Catatan"></textarea>
                </form>
                <div class="body__footer">
                  <div class="footer__tgl">
                  </div>
                  <div class="btn__footer">
                  <button class="kirim">Kirim</button>
                  </div>
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
    const header__button = document.querySelector(".btn_Review");
    const btn_nav = document.querySelector(".card__navigate");
    const revisi = document.querySelector(".revisi");
    const selesai = document.querySelector(".selesai");
    const kirim = document.querySelector(".kirim");
    const catatan = document.querySelector("#catatan");
    const container__detail = document.querySelector(".container__detail");
    const statusEl = document.querySelector(".status");
    const pdfViewer = document.querySelector("#pdfViewer");
    const container_pdf = document.querySelector(".container_pdf");
    const container__urlFile = document.querySelector(".container__urlFile");
    const loadingToast = document.querySelector("loading-roll");
    const closeBtn = document.querySelector(".closeBtn");
    const btnPdf = document.querySelector(".btnPdf");
    let filePdf = "";
    let acces_token = undefined



    const showDetalEl = (data) => {
      return `
        <div class="element">
          <div class="detail_judul">
            <h1>${data.judul}</h1>
          </div>
          <div class="detail_name">
            <p>${data.nim}</p>
          </div>
        </div>
      `
    }

    const getDataUserBimbingan = async () => {
      const resp = await getDataUser(url.id);
      if(resp) {
        getDataForReview();
        acces_token = resp.token_notif
        dataBimbingan = {
          ...dataBimbingan,
          nama: resp.nama,
        } 
      }
    }

    if(!navigator.onLine){
      loadingToast.style.display = "none";
    }

    const getDataForReview = async () => {
      const resp = await getDataBimbingan(url.id,url.idTodo);
      if(resp){
        loadingToast.style.display = "none";
        dataBimbingan = {
          ...dataBimbingan,
          ...resp
        } 
        if(resp.link_file !== undefined){
          btnPdf.style.display = "block"
          filePdf = resp.link_file
        
        } if(resp.url_file !== undefined){
          container__urlFile.innerHTML += `<a href=${resp.url_file} target="_blank">File lainnya</a>`
        }
        container__detail.innerHTML = showDetalEl(dataBimbingan);
      }
    }

    getDataUserBimbingan()

    const showPdfFile = () => {
      pdfObject.embed(`${filePdf}`, "#pdfViewer");
    }

    
    btnPdf.addEventListener("click", () => {
      container_pdf.classList.add("active");
      showPdfFile()
    })
    
    window.addEventListener("click", (el) => {
      if(el.target.classList == "container__detail"){
        container_pdf.classList.remove("active");
      }
    })

    revisi.addEventListener("click", () => {
      statusEl.innerText = "revisi";
      dataBimbingan = {
        ...dataBimbingan,
        status: "revisi"
      }
    })
    
    selesai.addEventListener("click", () => {
      statusEl.innerText = "selesai";
      dataBimbingan = {
        ...dataBimbingan,
        status: "done"
      }
    })

    header__button.addEventListener("click", () => {
      btn_nav.classList.add("active");
      console.log(btn_nav.classList.value)
    })
    
    closeBtn.addEventListener("click", () => {
      btn_nav.classList.remove("active");
    })
    catatan.addEventListener("change", (el) => {
      dataBimbingan = {
        ...dataBimbingan,
        deskripsi: el.target.value
      }
    })

    kirim.addEventListener("click", async () => {
      if(dataBimbingan.status !== "done" && dataBimbingan.status !== "revisi"){
        loading(true, "Status belum diubah");
      }else {
        dataBimbingan = {
          ...dataBimbingan,
          tgl_selesai: + new Date()
        }
        const resp = await updateStatusAndCreateDataBimbingan(dataBimbingan.status, url.id, url.idTodo, dataBimbingan);
        if(resp) {
          if(acces_token !== undefined){
            const message = {
              'token': acces_token,
              "title": "Hasil Review",
              "body": `Hasil Review ${dataBimbingan.judul} Sudah Keluar`,
            };
            const respNotif = await sendNotif(message.token,message);
            console.log(respNotif)
          }
          loading(false,"Data berhasil di kirim");
        }else {
          loading(true, resp);
        }
      }
    })
  }
};

export default Review;
