import "../../../styles/login.css";
import iconLogin from "../../../asset/icons/43916.png";
import iconLogin2 from "../../../asset/illustration/3d-register-illustration.png";


const Register = {
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
                    <input type="password" id='password' placeholder="Re-type Password" /><br/>
                </form>
                <button>Create Account</button>
            </div>
            <div class="form__doesnHaveAccount">
                <p>Don't have account ? register now</p>
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

  //   async afterRender() {
  //     const landingContainer = document.querySelector('#landing__page');
  //     movies.forEach((movie) => {
  //       landingContainer.innerHTML += createMovieItemTemplate(movie);
  //     });
  //   },
};

export default Register;
