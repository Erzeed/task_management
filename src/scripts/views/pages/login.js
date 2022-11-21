import "../../../styles/login.css";
import loginIlustration from "../../../asset/illustration/Data_security_26.png";
import iconLogin from "../../../asset/icons/login-3d-icons.png";
import iconLogin2 from "../../../asset/icons/login-3d-icons2.png";


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
            <div class="form__doesnHaveAccount">
                <p>Don't have account ? register now</p>
            </div>
          </div>
          </div>
          <p>Copyright @Wgether 2022</p>
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
