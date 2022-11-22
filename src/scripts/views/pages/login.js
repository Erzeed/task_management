import "../../../styles/login.css";
import iconLogin from "../../../asset/icons/login-3d-icons.png";
import iconLogin2 from "../../../asset/icons/login-3d-icons2.png";
import iconLoginByGoogle from "../../../asset/icons/btn_google_signin_dark_pressed_web@2x.png";


const Login = {
  async render() {
    return `
      <div class="content">
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
                    <img src=${iconLoginByGoogle} alt="icon google" />
                </div>
            </div>
            <div class="form__doesnHaveAccount">
                <p>Don't have account ? register now</p>
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

  //   async afterRender() {
  //     const landingContainer = document.querySelector('#landing__page');
  //     movies.forEach((movie) => {
  //       landingContainer.innerHTML += createMovieItemTemplate(movie);
  //     });
  //   },
};

export default Login;
