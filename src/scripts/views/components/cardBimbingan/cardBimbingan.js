export const cardBimbingan = (count, data) => {
    const {tgl_selesai, deskripsi, status, link_file ,judul ,url_file} = data
    const genTimeStamp = (tglSelesai) => {
        const tanggal = new Date(tglSelesai);
        const tgl = tanggal.getDate();
        const bln = tanggal.getMonth();
        const thn = tanggal.getFullYear();
        const dataBulan = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
        const bulan = dataBulan[bln];
  
        return tgl + " " + bulan + " " + thn;
    }
    
    return `
        <div class="card__bimbingan">
            <div class="card__number">
                <p>${count}</p>
            </div>
            <div class="card_judul">
                <p>${judul}</p>
            </div>
            <div class="card__tgl">
                <p>${genTimeStamp(tgl_selesai)}</p>
            </div>
            <div class="card__desk">
                <p>${deskripsi}</p>
            </div>
            <div class="card__status">
                <p>${status}</p>
            </div>
            <div class="card__file">
                ${link_file !== undefined ? `<p> <a href=${link_file}  target=”_blank”>file pdf</a> </p>` : ""}
                ${url_file !== undefined ? `<p> <a href=${url_file}  target=”_blank”>file lainnya</a> </p>` : ""}
            </div>
        </div>
    `
}