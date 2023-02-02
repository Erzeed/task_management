import "../../../styles/dashboard.css";
import Chart from "chart.js/auto";
import userIcon from "../../../asset/icons/icons8-user.png";
import proggresIcon from "../../../asset/icons/icons8-in-progress.png";
import revisiIcon from "../../../asset/icons/icons8-revisi.png";
import deleteIcon from "../../../asset/icons/delete-24.png";
import doneIcon from "../../../asset/icons/icons8-done.png";
import { TabulatorFull as Tabulator } from "tabulator-tables";
import SortModule from "tabulator-tables/src/js/modules/Sort/Sort";
import { cekUser } from "../../utils/cekUser";
import {
  createNewUser,
  getDataUser,
  getAllDataMhsBmbngan,
} from "../../globals/api-endpoint.js";

Tabulator.registerModule([SortModule]);

const Dashboard = {
  async render() {
    return `
      <div class="content__dashboard">
      <side-bar class="home"></side-bar>
        <div class="dashboard__menu">
          <loading-roll></loading-roll>
            <div class="menu__title">
                <h1>Selamat datang <span id="username"></span> .</h1>
                <button class="create">Create Account</button>
            </div>
            <div class="menu__card__clients">
                <div class="clients__card">
                    <div class="card__icon">
                        <img src=${userIcon} alt="user" />
                    </div>
                    <div class="card__count">
                        <h1>10</h1>
                    </div>
                    <div class="card__title">
                        <p>Jumlah Mahasiswa</p>
                    </div>
                </div>
                <div class="clients__card">
                    <div class="card__icon">
                        <img src=${proggresIcon} alt="user" />
                    </div>
                    <div class="card__count">
                        <h1>10</h1>
                    </div>
                    <div class="card__title">
                        <p>Review</p>
                    </div>
                </div>
                <div class="clients__card">
                    <div class="card__icon">
                        <img src=${revisiIcon} alt="user" />
                    </div>
                    <div class="card__count">
                        <h1>10</h1>
                    </div>
                    <div class="card__title">
                        <p>Jumlah Mahasiswa Revisi</p>
                    </div>
                </div>
                <div class="clients__card">
                    <div class="card__icon">
                        <img src=${doneIcon} alt="user" />
                    </div>
                    <div class="card__count">
                        <h1>10</h1>
                    </div>
                    <div class="card__title">
                        <p>Jumlah Mahasiswa Selesai</p>
                    </div>
                </div>
            </div>
            <div class="menu__statistik">
                <div class="statistik__donut">
                    <h1>Data Proggres Mahasiswa</h1>
                    <canvas id="myChart" ></canvas>
                </div>
                <div class="statistik__lineChart">
                    <h1>Data Proggres Mahasiswa</h1>
                    <canvas id="lineChart" ></canvas>
                </div>
            </div>
            <div class="menu__table">
                <h1>Data Mahasiswa Bimbingan</h1>
                <div id="data-table">
                <p>Data bimbingang kosong </p>
                </div>
                <div class="button__refresh">
                    <button>Refresh</button>
                </div>
            </div>
            <div class="create__form">
              <h1>Create Account</h1>
              <form id="form">
                  <input type='text' id='nim' class="inputForm" placeholder="Nim" /><br/>
                  <input type='email' id='email' class="inputForm" placeholder="Email" /><br/>
                  <div class="buttonIn__input">
                    <input type="password" id='password'class="inputForm" placeholder="Password"/><br/>
                    <button class="random__pas" type='button' >Random</button>
                  </div>
                  <div class="showPass">
                    <input type="checkbox" class="checkBox">
                    <p>show password</p>
                  </div>
              </form>
              <div class="btn__create">
                <button class="simpan" type='button'>Simpan</button>
                <button class="cancel" type='button'>Cancel</button>
              </div>
            </div>
        </div>
        <div class="dashboard__mytask">
            <div class="mytask__progres">
            
            </div>
        
        </div>
      </div>
    `;
  },

  async afterRender() {
    cekUser();
    let dataNewAccount = {
      idDosen: "",
      nim: "",
      email: "",
      password: "",
      role: "",
    };
    let user = {};
    const id = localStorage.getItem("id");
    const ctx = document.getElementById("myChart").getContext("2d");
    const lineChart = document.getElementById("lineChart").getContext("2d");
    const random__pas = document.querySelector(".random__pas");
    const checkBox = document.querySelector(".checkBox");
    const create = document.querySelector(".create");
    const cancel = document.querySelector(".cancel");
    const simpan = document.querySelector(".simpan");
    const button__refresh = document.querySelector(".button__refresh button");
    const form = document.querySelectorAll(".inputForm");
    const loadingToast = document.querySelector('loading-roll');

    const getData = async () => {
      const data = await getDataUser(id);
      if(data) {
        loadingToast.style.display = 'none';
        user = data;
        changeTitle(data.nama);
      }
    };

    const changeTitle = (title) => {
      document.getElementById("username").innerHTML = title;
    };

    getData();

    [...form].forEach((e) => {
      e.addEventListener("change", (e) => {
        const id = localStorage.getItem("id");
        dataNewAccount = {
          ...dataNewAccount,
          idDosen: id,
          [e.target.id]: e.target.value,
          role: "Mahasiswa",
        };
      });
    });

    simpan.addEventListener("click", async () => {
      const { nim, email, password } = dataNewAccount;
      if (nim == "" || email == "" || password == "") {
        alert("Semua data harus di isi");
      } else {
        const dataMhs = await getAllDataMhsBmbngan(id);
        dataMhs.forEach(data => {
          console.log(data.nim, dataNewAccount.nim)
        })
      }
    });

    const data = {
      labels: ["Bab 1", "Bab 2", "Bab 3", "Bab 4", "Bab 5"],
      datasets: [
        {
          label: "Data mahasiswa",
          data: [300, 50, 100, 200, 30],
          backgroundColor: [
            "rgb(255, 99, 132)",
            "rgb(54, 162, 235)",
            "rgb(255, 205, 86)",
            "rgb(44,58,144)",
            "rgb(37,75,248)",
          ],
          hoverOffset: 4,
        },
      ],
    };

    const dataLineChart = {
      labels: ["Bab 1", "Bab 2", "Bab 3", "Bab 4", "Bab 5"],
      datasets: [
        {
          label: "Mahasiswa",
          data: [1, 5, 10, 3, 0],
          // borderColor: Utils.CHART_COLORS.red,
          borderColor: "rgb(43,36,130)",
          pointStyle: "circle",
          pointRadius: 10,
          pointHoverRadius: 15,
        },
      ],
    };

    new Chart(ctx, {
      type: "doughnut",
      data: data,
      options: {
        responsive: true,
        aspectRatio: 2,
        plugins: {
          legend: {
            position: "right",
          },
        },
        layout: {
          padding: 20,
        },
      },
    });
    new Chart(lineChart, {
      type: "line",
      data: dataLineChart,
      options: {
        responsive: true,
        layout: {
          padding: {
            left: 20,
            bottom: 20,
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            max: 20,
            min: 0,
          },
        },
      },
    });

    //define table
    const defaultValue = (cell) => {
      if (!cell.getValue()) {
        return "-";
      }
      return cell.getValue();
    };

    const getAllDataMhs = async () => {
      const dataMhs = await getAllDataMhsBmbngan(id);
      const table = new Tabulator("#data-table", {
        //   minHeight: 300,
        rowHeight: 40,
        data: dataMhs,
        placeholder: "No Data Set",
        columns: [
          {
            title: "Nim",
            field: "nim",
            sorter: "string",
            hozAlign: "center",
            vertAlign: "middle",
            formatter: defaultValue,
          },
          {
            title: "Name",
            field: "nama",
            sorter: "string",
            hozAlign: "center",
            vertAlign: "middle",
            formatter: defaultValue,
          },
          {
            title: "Email",
            field: "email",
            hozAlign: "center",
            vertAlign: "middle",
            formatter: defaultValue,
          },
          {
            title: "Fakultas",
            field: "fakultas",
            hozAlign: "center",
            vertAlign: "middle",
            formatter: defaultValue,
          },
          {
            title: "Jurusan",
            field: "jurusan",
            hozAlign: "center",
            vertAlign: "middle",
            formatter: defaultValue,
          },
          {
            title: "Angkatan",
            field: "angkatan",
            hozAlign: "center",
            vertAlign: "middle",
            formatter: defaultValue,
          },
          {
            title: "Judul",
            field: "judul_skripsi",
            hozAlign: "center",
            vertAlign: "middle",
            formatter: defaultValue,
          },
          {
            title: "Mulai Bimbingan",
            field: "mulai_bimbingan",
            hozAlign: "center",
            vertAlign: "middle",
            formatter: defaultValue,
          },
          {
            title: "Terakhir Bimbingan",
            field: "terakhir_bimbingan",
            hozAlign: "center",
            vertAlign: "middle",
            formatter: defaultValue,
          },
          {
            title: "Bab",
            field: "bab_skripsi",
            hozAlign: "center",
            vertAlign: "middle",
            formatter: defaultValue,
          },
        ],
      });

      table.on("rowClick", (e, row) => {
        window.location.href = `/#/detailbimbingan/${row.getIndex()}`;
      });
    };

    getAllDataMhs();

    button__refresh.addEventListener("click", () => {
      getAllDataMhs();
      table.redraw(true);
    });

    const randomPass = () => {
      const chars =
        "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      const passwordLength = 12;
      let password = "";
      for (let i = 0; i <= passwordLength; i++) {
        let randomNumber = Math.floor(Math.random() * chars.length);
        password += chars.substring(randomNumber, randomNumber + 1);
      }
      return password;
    };
    random__pas.addEventListener("click", () => {
      document.getElementById("password").value = randomPass();
    });
    checkBox.addEventListener("click", () => {
      const pass = document.getElementById("password");
      if (pass.type === "password") {
        pass.type = "text";
      } else {
        pass.type = "password";
      }
    });

    create.addEventListener("click", () => {
      const formUp = document.querySelector(".create__form");
      formUp.classList.add("active");
    });

    cancel.addEventListener("click", () => {
      const formUp = document.querySelector(".create__form");
      formUp.classList.remove("active");
    });
  },
};

export default Dashboard;
