import Button from "../../Button/Button";
import { StyledLogin } from "./Login.styled";

export const Login = () => {
  return (
    <StyledLogin>
      <h1>Log in</h1>

      <form>
        <div className="form-control">
          <input required type="text" name="login" />
          <label htmlFor="">
            <span>Email</span>
          </label>
        </div>

        <div className="form-control">
          <input required type="password" name="password" />
          <label htmlFor="">
            <span>Password</span>
          </label>
        </div>

        <Button>Log in</Button>

        <p>
          Don't have an account?
          <a href="#"> Register</a>
        </p>
      </form>
    </StyledLogin>
  );
};
