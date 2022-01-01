import { FaUnlockAlt } from "react-icons/fa";
import "./Login.css";

const Login = () => {
  return (
    <div className="login-container">
      <div className="login-container__login-wrapper">
        <div className="login-wrapper__logo">
          <img src="./MTCC-logo.png" alt="" />
        </div>

        <button className="login-wrapper__button"><FaUnlockAlt/> <span>Login</span></button>
        <div className="login-wrapper__copyright">© 2022 MTCC Plc. All Rights Reserved.</div>
      </div>
    </div>
  );
};

export default Login;
