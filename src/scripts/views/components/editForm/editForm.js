
export const editForm = (data) => {
    console.log(data)
    return `
    <form action="#" class="form">
        <label for="field1"><span>Nik </span><input  id="nik" type="text" class="input-field" name="field1" value="" /></label>
        <label for="field1"><span>Nama </span><input  id="nama" type="text" class="input-field" name="field1" value="" /></label>
        <label for="field2"><span>Nomor Telepon </span><input  id="nomor_telepon" type="tel" class="input-field" name="field2" value="" /></label>
        <div class="show">
            <label for="field1"><span>Angkatan </span><input  id="angkatan" type="number" class="input-field" name="field1" value="" /></label>
            <label for="field1"><span>Jurusan </span><input  id="jurusan" type="text" class="input-field" name="field1" value="" /></label>
            <label for="field1"><span>Judul Skripsi </span><input  id="judul_skripsi" type="text" class="input-field" name="field1" value="" /></label>
        </div>
        <div class="button">
            <button type="button" id="btnSubmit">Simpan</button>
            <button type="button" id="cancel">Cancel</button>
        </div>
    </form>
    `

}