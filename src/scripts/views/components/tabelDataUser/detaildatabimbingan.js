export const tabelUserBimbingan = ({
  nama,
  angkatan,
  email,
  judul_skripsi,
  jurusan,
  nim,
  nomor_telepon,
  role_status,
  fakultas,
  dosen_pembimbing,
  createdAt
}) => {

    const cekDataUndefined = (data) => data !== undefined ? data : "-";

    const lamaBimbingan = (dataTgl) => {
        const hariIni = new Date();
        const _MS_PER_DAY = 1000 * 60 * 60 * 24;
        const lamaBimbingan = Math.floor((hariIni - dataTgl) / _MS_PER_DAY)
        return lamaBimbingan
      }


  return `
    <table class="tg">
        <tbody>
            <tr>
                <td  class="tg-0lax">Nama</td>
                <td  class="tg-0lax">:</td>
                <td  class="tg-data">${cekDataUndefined(nama)}</td>
            </tr>
            <tr>
                <td class="tg-0pky">Nim</td>
                <td class="tg-0lax">:</td>
                <td class="tg-data">${cekDataUndefined(nim)}</td>
            </tr>
            <tr>
                <td class="tg-0pky">Angkatan</td>
                <td class="tg-0lax">:</td>
                <td class="tg-data">${cekDataUndefined(angkatan)}</td>
            </tr>
            <tr>
                <td class="tg-0pky">Lama bimbingan</td>
                <td class="tg-0lax">:</td>
                <td class="tg-data">${lamaBimbingan(createdAt)} hari</td>
            </tr>
            <tr>
                <td class="tg-0pky">Dosen</td>
                <td class="tg-0lax">:</td>
                <td class="tg-data">${cekDataUndefined(dosen_pembimbing)}</td>
            </tr>
            <tr>
                <td class="tg-0lax">Judul skripsi</td>
                <td class="tg-0lax">:</td>
                <td class="tg-data">${cekDataUndefined(judul_skripsi)}</td>
            </tr>
            <tr>
                <td class="tg-0lax">Fakultas</td>
                <td class="tg-0lax">:</td>
                <td class="tg-data">${cekDataUndefined(fakultas)}</td>
            </tr>
            <tr>
                <td class="tg-0lax">Jurusan</td>
                <td class="tg-0lax">:</td>
                <td class="tg-data">${cekDataUndefined(jurusan)}</td>
            </tr>
            <tr>
                <td class="tg-0lax">Email</td>
                <td class="tg-0lax">:</td>
                <td class="tg-data">${cekDataUndefined(email)}</td>
            </tr>
            <tr>
                <td class="tg-0lax">Nomor Telepon</td>
                <td class="tg-0lax">:</td>
                <td class="tg-data">${cekDataUndefined(nomor_telepon)}</td>
            </tr>
            <tr>
                <td class="tg-0lax">Status</td>
                <td class="tg-0lax">:</td>
                <td class="tg-data">${cekDataUndefined(role_status)}</td>
            </tr>
        </tbody>
    </table>    
    `;
};
