import "../../../styles/dashboard.css";
import Chart from "chart.js/auto";
import userIcon from "../../../asset/icons/icons8-user.png";
import proggresIcon from "../../../asset/icons/icons8-in-progress.png";
import revisiIcon from "../../../asset/icons/icons8-revisi.png";
import doneIcon from "../../../asset/icons/icons8-done.png";
import Tabulator from "tabulator-tables/src/js/core/Tabulator";
import SortModule from "tabulator-tables/src/js/modules/Sort/Sort";

Tabulator.registerModule([SortModule]);

const Dashboard = {
  async render() {
    return `
      <div class="content__dashboard">
      <side-bar class="active"></side-bar>
        <div class="dashboard__menu">
            <div class="menu__title">
                <h1>Selamat datang, Feizal .</h1>
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
                        <p>Proggres Mahasiswa</p>
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
                <div id="data-table"></div>
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
    const ctx = document.getElementById("myChart").getContext("2d");
    const lineChart = document.getElementById("lineChart").getContext("2d");
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
          borderColor: 'rgb(43,36,130)',
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
          }
        },
        layout: {
            padding: 20
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
                bottom: 20
            }
        },
        scales: {
          y: {
            beginAtZero: true,
            max: 20,
            min: 0
          },
        },
      },
    });
    //define data
    const tabledata = [
      {
        id: 1,
        nim: "19.11.2877",
        nama: "Feizal Reza",
        email: "feizalreza29@gmail.com",
        jurusan: "S1 Informatika",
        judul: "Implementasi Progressive Web...",
        mulai_bimbingan: "20/10/2022",
        terakhir_bimbingan: "26/11/2022",
        bab_skripsi: 2,
      },
      {
        id: 1,
        nim: "19.11.2877",
        nama: "Billy Bob",
        email: "feizalreza29@gmail.com",
        jurusan: "S1 Informatika",
        judul: "Implementasi Progressive Web...",
        mulai_bimbingan: "20/10/2022",
        terakhir_bimbingan: "26/11/2022",
        bab_skripsi: 2,
      },
      {
        id: 1,
        nim: "19.11.2877",
        nama: "Billy Bob",
        email: "feizalreza29@gmail.com",
        jurusan: "S1 Informatika",
        judul: "Implementasi Progressive Web...",
        mulai_bimbingan: "20/10/2022",
        terakhir_bimbingan: "26/11/2022",
        bab_skripsi: 2,
      },
      {
        id: 1,
        nim: "19.11.2877",
        nama: "Billy Bob",
        email: "feizalreza29@gmail.com",
        jurusan: "S1 Informatika",
        judul: "Implementasi Progressive Web...",
        mulai_bimbingan: "20/10/2022",
        terakhir_bimbingan: "26/11/2022",
        bab_skripsi: 2,
      },
    ];

    //define table
    new Tabulator("#data-table", {
      //   minHeight: 300,
      rowHeight: 40,
      headerSort: true,
      layout: "fitData",
      data: tabledata,
      responsiveLayout: "collapse",
      columns: [
        {
          title: "Nim",
          field: "nim",
          sorter: "string",
          hozAlign: "center",
          vertAlign: "middle",
        },
        {
          title: "Name",
          field: "nama",
          sorter: "string",
          hozAlign: "left",
          vertAlign: "middle",
        },
        {
          title: "Email",
          field: "email",
          hozAlign: "left",
          vertAlign: "middle",
        },
        {
          title: "Jurusan",
          field: "jurusan",
          hozAlign: "left",
          vertAlign: "middle",
        },
        {
          title: "Judul",
          field: "judul",
          hozAlign: "left",
          vertAlign: "middle",
        },
        {
          title: "Mulai Bimbingan",
          field: "mulai_bimbingan",
          hozAlign: "center",
          vertAlign: "middle",
          formatter: "color",
        },
        {
          title: "Terakhir Bimbingan",
          field: "terakhir_bimbingan",
          hozAlign: "center",
          vertAlign: "middle",
        },
        {
          title: "Bab",
          field: "bab_skripsi",
          hozAlign: "center",
          vertAlign: "middle",
        },
      ],
    });
  },
};

export default Dashboard;
