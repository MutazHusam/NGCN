import { Button } from "@material-ui/core";
import { auth, provider } from "../../firebase";
import "./Login.css";

const Login = () => {
  const signIn = () => {
    auth.signInWithPopup(provider).catch((error) => alert(error.message));
  };

  return (
    <div className="login">
      <div className="login__logo">
        <img
          alt="logo"
          src="https://cdn.discordapp.com/attachments/816390205405266022/830063771154120804/Untitled-2.png"
        />
      </div>

      <Button onClick={signIn}>Sign in</Button>
    </div>
  );
};

export default Login;
