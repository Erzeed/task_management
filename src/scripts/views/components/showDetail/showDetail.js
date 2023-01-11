
export const showDetail = (data) => {
    return `
        <div class="detail">
            <div class="detail__name">
                <p>${data.role_status == "dosen" ? "Nik" : "Nim"}</p>
                <p>Nama</p>
                <p>Email</p>
                <p>Nomor Telepon</p>
                <div class="${data.role_status == "dosen" ? "hide" : "show"}">
                    <p>Angkatan</p>
                    <p>Jurusan</p>
                    <p>Judul Skripsi</p>
                    <p>Dosen Pembimbing</p>
                </div>
            </div>
            <div class="detail__value">
                <p>${data.nim == undefined ? data.nik == undefined ? "-" : data.nik : data.nim}</p>
                <p>${data.nama == undefined ? "-" : data.nama}</p>
                <p>${data.email == undefined ? "-" : data.email}</p>
                <p>${data.nomor_telepon == undefined ? "-" : data.nomor_telepon}</p>
                <div class="${data.role_status == "dosen" ? "hide" : "show"}">
                    <p>${data.angkatan == undefined ? "-" : data.angkatan}</p>
                    <p>${data.jurusan == undefined ? "-" : data.jurusan}</p>
                    <p>${data.judul_skripsi == undefined ? "-" : data.judul_skripsi}</p>
                    <p>${data.dosen_pembimbing == undefined ? "-" : data.dosen_pembimbing}</p>
                </div>
            </div>            
        </div>
    `

}