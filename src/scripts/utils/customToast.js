import Swal from "sweetalert2/dist/sweetalert2.all.min.js";

const customToast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 800,
  width: 400,
  timerProgressBar: true,
});

const succes = (title) => {
  customToast.fire({
    title: `${title}`,
    icon: "success"
  });
};
const error = (title) => {
  customToast.fire({
    title: `${title}`,
    icon: "error",
    timer: 2000,
  });
};

export const loading = (data, message) => {
  customToast
    .fire({
      title: `Loading`,
      didOpen: () => {
        Swal.showLoading();
      },
    })
    .then((result) => {
      if (result.dismiss === Swal.DismissReason.timer) {
        if (data === true) {
          error(message);
        } else {
          succes(message);
        }
      }
    });
};

export const loadingProggresUploadFile = (data, nameFile, message) => {
  customToast
    .fire({
      title: `upload file ${nameFile} in progress ${data}% remaining`,
      timer: 20000,
      timerProgressBar: false,
      didOpen: () => {
        Swal.showLoading();
        if(data == 100){
          Swal.stopTimer()
          succes(message);
        }
      },
    })

};

export const loadingUploadError = (nameFile,) => {

    error(`upload file ${nameFile} failed`);

};