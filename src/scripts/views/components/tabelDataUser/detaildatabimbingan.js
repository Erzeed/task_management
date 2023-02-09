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
}) => {
  return `
    <table class="tg">
        <tbody>
            <tr>
                <td  class="tg-0lax">Nama</td>
                <td  class="tg-0lax">:</td>
                <td  class="tg-data">${nama}</td>
            </tr>
            <tr>
                <td class="tg-0pky">Nim</td>
                <td class="tg-0lax">:</td>
                <td class="tg-data">${nim}</td>
            </tr>
            <tr>
                <td class="tg-0pky">Angkatan</td>
                <td class="tg-0lax">:</td>
                <td class="tg-data">${angkatan}</td>
            </tr>
            <tr>
                <td class="tg-0pky">Dosen</td>
                <td class="tg-0lax">:</td>
                <td class="tg-data">${dosen_pembimbing}</td>
            </tr>
            <tr>
                <td class="tg-0lax">Judul skripsi</td>
                <td class="tg-0lax">:</td>
                <td class="tg-data">${judul_skripsi}</td>
            </tr>
            <tr>
                <td class="tg-0lax">Fakultas</td>
                <td class="tg-0lax">:</td>
                <td class="tg-data">${fakultas}</td>
            </tr>
            <tr>
                <td class="tg-0lax">Jurusan</td>
                <td class="tg-0lax">:</td>
                <td class="tg-data">${jurusan}</td>
            </tr>
            <tr>
                <td class="tg-0lax">Email</td>
                <td class="tg-0lax">:</td>
                <td class="tg-data">${email}</td>
            </tr>
            <tr>
                <td class="tg-0lax">Nomor Telepon</td>
                <td class="tg-0lax">:</td>
                <td class="tg-data">${nomor_telepon}</td>
            </tr>
            <tr>
                <td class="tg-0lax">Status</td>
                <td class="tg-0lax">:</td>
                <td class="tg-data">${role_status}</td>
            </tr>
        </tbody>
    </table>    
    `;
};
