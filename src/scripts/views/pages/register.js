import "../../../styles/login.css";
import iconLogin from "../../../asset/icons/43916.png";
import iconLogin2 from "../../../asset/illustration/3d-register-illustration.png";
import {
  registerPage,
  registerPageWithGogle,
} from "../../globals/api-endpoint";
import { validasiFormRegisLogin } from "../../utils/validasiLoginRegister";

const Register = {
  async render() {
    return `
      <div class="content__login">
        <div id="login__page" class="login__page">
          <div class="login__form">
            <div class="form__title">
                <h1>Wgether</h1>
                <p>Enter your detail to get sigin to your account</p>
            </div>
            <div class="form__input">
                <form>
                    <input type='email' id='email' placeholder="Email" /><br/>
                    <input type="password" id='password' placeholder="Password" /><br/>
                    <input type="password" id='password2' placeholder="Re-type Password" /><br/>
                </form>
                <button>Create Account</button>
            </div>
            <div class="form__doesnHaveAccount">
                <p><a href="/#/login">Login Now</a></p>
            </div>
          </div>
          </div>
          <p class="copyright">Copyright @Wgether 2022</p>
          <div class="login__ilustration register">
            <img src=${iconLogin} alt="login ilustration" />
          </div>
          <div class="login__ilustration__second register">
            <img src=${iconLogin2} alt="login ilustration" />
          </div>
      </div>
    `;
  },

  async afterRender() {
    let pass = "";
    let pass2 = "";
    let data = {
      email: "",
      password: "",
    };
    const email = document.querySelector("#email");
    const password = document.querySelector("#password");
    const re_type_password = document.querySelector("#password2");
    const button = document.querySelector(".form__input button");
    email.addEventListener("change", (e) => {
      data = {
        ...data,
        email: e.target.value,
      };
    });
    password.addEventListener("change", (e) => {
      pass = e.target.value;
    });
    re_type_password.addEventListener("change", (e) => {
      pass2 = e.target.value;
    });
    button.addEventListener("click", async () => {
      if (pass === pass2) {
        data = {
          ...data,
          password: pass,
        };
        const response = await registerPage(data).catch((err) => err);
        if (response.error === false) {
          console.log(response);
          validasiFormRegisLogin(response);
          // setTimeout(() => {
          //   navigate("/");
          // }, 1610);
        } else {
          console.log(response);
          validasiFormRegisLogin(response);
        }
      } else {
        alert("password tidak cocok");
      }
    });
  },
};

export default Register;
