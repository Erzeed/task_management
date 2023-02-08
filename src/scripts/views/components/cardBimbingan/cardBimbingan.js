export const cardBimbingan = ({tgl_selesai, deskripsi, status, link_file ,judul}) => {
    return `
        <div class="card__bimbingan">
            <div class="card__number">
                <p>1</p>
            </div>
            <div class="card_judul">
                <p>${judul}</p>
            </div>
            <div class="card__tgl">
                <p>${tgl_selesai}</p>
            </div>
            <div class="card__desk">
                <p>${deskripsi}</p>
            </div>
            <div class="card__status">
                <p>${status}</p>
            </div>
            <div class="card__file">
                <p> <a href=${link_file}  target=”_blank”>file</a> </p>
            </div>
        </div>
    `
}