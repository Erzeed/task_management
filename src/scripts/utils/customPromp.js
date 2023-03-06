import Swal from "sweetalert2/dist/sweetalert2.all.min.js";

const customPromp = Swal.mixin({
  showCancelButton: true,
  confirmButtonText: "Yes",
  showCancelButton: true,
  confirmButtonText: "Yes",
  cancelButtonText: "Cancel",
});

export const customAlert = (txt) => {
  return new Promise((resolve) => {
    customPromp
      .fire({
        title: `Apakah Anda Yakin`,
        text: `${txt}`,
      })
      .then((result) => {
        if (result.isConfirmed) {
          resolve(true);
        } else {
          resolve(false);
        }
      });
  });
};
