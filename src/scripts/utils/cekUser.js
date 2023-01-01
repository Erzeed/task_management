
export const cekUser = () => {
    const id = localStorage.getItem("id");
    if(id === null){
        window.location.href = "/#/login"
    }
}