
export const showDetail = (data, dataDosen) => {
    
    return `
        <div class="detail">
            <div class="detail__name">
                <p>${data.role_status == "dosen" ? "Nik" : "Nim"}</p>
                <p>Nama</p>
                <p>Email</p>
                <p>Nomor Telepon</p>
                <div class="${data.role_status == "dosen" ? "hide" : "show"}">
                    <p>Fakultas</p>
                    <p>Angkatan</p>
                    <p>Jurusan</p>
                    <p>Judul Skripsi</p>
                    <p>Nama Dosen</p>
                    <p>Email Dosen</p>
                    <p>Nomor Tel Dosen</p>
                </div>
            </div>
            <div class="detail__value">
                <p>${data.nim == undefined ? data.nik == undefined ? "-" : data.nik : data.nim}</p>
                <p>${data.nama == undefined ? "-" : data.nama}</p>
                <p>${data.email == undefined ? "-" : data.email}</p>
                <p>${data.nomor_telepon == undefined ? "-" : data.nomor_telepon}</p>
                <div class="${data.role_status == "dosen" ? "hide" : "show"}">
                    <p>${data.fakultas == undefined ? "-" : data.fakultas}</p>
                    <p>${data.angkatan == undefined ? "-" : data.angkatan}</p>
                    <p>${data.jurusan == undefined ? "-" : data.jurusan}</p>
                    <p>${data.judul_skripsi == undefined ? "-" : data.judul_skripsi}</p>
                    <p>${dataDosen.nama == undefined ? "-" : dataDosen.nama}</p>
                    <p>${dataDosen.email == undefined ? "-" : dataDosen.email}</p>
                    <p>${dataDosen.nomor_telepon == undefined ? "-" : dataDosen.nomor_telepon}</p>
                </div>
            </div>            
        </div>
    `

}