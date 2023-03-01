import "../../../styles/login.css";
import iconLogin from "../../../asset/icons/login-3d-icons.png";
import iconLogin2 from "../../../asset/icons/login-3d-icons2.png";
import iconLoginByGoogle from "../../../asset/icons/btn_google_signin_dark_pressed_web@2x.png";
import {
  loginByEmailPass,
  registerPageWithGogle,
} from "../../globals/api-endpoint";
import { validasiFormRegisLogin } from "../../utils/validasiLoginRegister";
import { getDataUser } from "../../globals/api-endpoint";

const Login = {
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
                </form>
                <button>Sign in</button>
            </div>
            <div class="sigin__gogle">
                <p>-- Or Sign in with --</p>
                <div class="google__icon">
          
                    <img class="btn__goggle" src=${iconLoginByGoogle} alt="icon google" />
                </div>
            </div>
            <div class="form__doesnHaveAccount">
                <p>Don't have account ? <a href="/#/register">Register Now</a></p>
            </div>
          </div>
          </div>
          <p class="copyright">Copyright @Wgether 2022</p>
          <div class="login__ilustration">
            <img src=${iconLogin} alt="login ilustration" />
          </div>
          <div class="login__ilustration__second">
            <img src=${iconLogin2} alt="login ilustration" />
          </div>
      </div>
    `;
  },

  async afterRender() {
    let data = {
      email: "",
      password: "",
    };
    const email = document.querySelector("#email");
    const password = document.querySelector("#password");
    const button = document.querySelector(".form__input button");
    const btn__goggle = document.querySelector(".btn__goggle");
    const accountBtn = document.querySelector('nav-bar').shadowRoot.querySelector('.navbar__account');
    accountBtn.classList.remove("hide")
    email.addEventListener("change", (e) => {
      data = {
        ...data,
        email: e.target.value,
      };
    });
    password.addEventListener("change", (e) => {
      data = {
        ...data,
        password: e.target.value,
      };
    });

    const navigateByRole = async (response) => {
      validasiFormRegisLogin(response);
        localStorage.setItem("id", response.uid);
        const resp = await getDataUser(response.uid);
        if(resp){
          localStorage.setItem("role", "mahasiswa")
          setTimeout(() => {
            window.location.href = `/#/detailbimbingan/${response.uid}`;
          }, 1610);
        }else {
          localStorage.setItem("role", "dosen")
          setTimeout(() => {
            window.location.href = "/#/dashboard"
          }, 1610);
        }
    }
    button.addEventListener("click", async () => {
      const response = await loginByEmailPass(data).catch((err) => err);
      if (response.uid !== undefined) {
        navigateByRole(response)
      } else {
        validasiFormRegisLogin(response);
      }
    });
    btn__goggle.addEventListener("click", async () => {
      const responseGogle = await registerPageWithGogle().catch((err) => err);
    if (responseGogle) {
      localStorage.setItem("accessToken", responseGogle.accessToken)
      navigateByRole(responseGogle)
    }
    })
  },
};

export default Login;
