import React, { useContext } from "react";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import { StoreContext } from "../../context/Context";
import Otp from "./Otp";
import ForgotPassword from "./ForgotPassword";

const Auth = () => {
  const { signState } = useContext(StoreContext);
  return (
    <div>
      {signState === "Sign Up" && <SignUp />}
      {signState === "Verify" && <Otp />}
      {signState === "Sign In" && <SignIn />}
      {signState === "Forgot Password" && <ForgotPassword />}
      {signState === "Reset Password" && <ForgotPassword />}
    </div>
  );
};

export default Auth;
