import React, { useEffect, useState } from "react";
import Container from "../Container";
import Title from "../form/Title";
import FormInput from "../form/FormInput";
import Submit from "../form/Submit";
import CustomLink from "../CustomLink";
import { commonModalClasses } from "../../utils/theme";
import FormContainer from "./FormContainer";
import { useAuth, useNotification } from "../../hooks";
import { useNavigate } from "react-router";
import { isValidEmail } from "../../utils/helper";

const validateUserInfo = ({ email, password }) => {
  // const isVaildEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  if (!email.trim()) return { ok: false, error: "Email is missing!" };
  if (!isValidEmail(email)) return { ok: false, error: "Invalid email!" };

  if (!password.trim()) return { ok: false, error: "Password is missing!" };
  if (password.length < 8)
    return { ok: false, error: "Password must be at least 8 characters long!" };

  return { ok: true };
};

export default function Signin() {
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate()
  const { updateNotification } = useNotification();
  const { handleLogin, authInfo} = useAuth();
  const { isPending, isLoggedIn} = authInfo


  const handleChange = ({ target }) => {
    const { value, name } = target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { ok, error } = validateUserInfo(userInfo);

    if (!ok) return updateNotification("error", error);
    handleLogin(userInfo.email, userInfo.password)
  };

  // useEffect(()=> {
  //   if(isLoggedIn) navigate("/") // we want to move our user to somewhere else
  // }, [isLoggedIn])

  return (
    <FormContainer>
      <Container>
        <form onSubmit={handleSubmit} className={commonModalClasses + " w-72"}>
          <Title>Sign in</Title>
          <FormInput
            label="Email"
            placeholder="name@email.com"
            name="email"
            value={userInfo.email}
            onChange={handleChange}
          ></FormInput>
          <FormInput
            label="Password"
            placeholder="********"
            name="password"
            value={userInfo.password}
            onChange={handleChange}
            type="password"
          ></FormInput>
          <Submit value="Sign in" busy={isPending}></Submit>
          <div className="flex justify-between">
            <CustomLink to="/auth/forget-password">Forget Password</CustomLink>
            <CustomLink to="/auth/signup">Sign up</CustomLink>
          </div>
        </form>
      </Container>
    </FormContainer>
  );
}
