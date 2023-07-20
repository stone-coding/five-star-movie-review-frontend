import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Container from "../Container";
import Title from "../form/Title";
import FormInput from "../form/FormInput";
import Submit from "../form/Submit";
import CustomLink from "../CustomLink";
import { commonModalClasses } from "../../utils/theme";
import FormContainer from "./FormContainer";
import { createUser } from "../../api/auth";
import { useAuth, useNotification } from "../../hooks";
import { isValidEmail } from "../../utils/helper";

const validateUserInfo = ({ name, email, password }) => {
  // const isVaildEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const isValidName = /^[a-z A-Z]+$/;

  if (!name.trim()) return { ok: false, error: "Name is missing!" };
  if (!isValidName.test(name)) return { ok: false, error: "Invalid name!" };

  if (!email.trim()) return { ok: false, error: "Email is missing!" };
  if (!isValidEmail(email)) return { ok: false, error: "Invalid email!" };

  if (!password.trim()) return { ok: false, error: "Password is missing!" };
  if (password.length < 8)
    return { ok: false, error: "Password must be at least 8 characters long!" };

  return { ok: true };
};

export default function Signup() {
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate()

  const {updateNotification} = useNotification()
  const { handleLogin, authInfo} = useAuth();
  const { isPending, isLoggedIn} = authInfo

  const handleChange = ({ target }) => {
    const { value, name } = target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  /**
   * using e.preventDefault to prevent the browser lose the submitted form info SignUp form
   * when user click on button
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { ok, error } = validateUserInfo(userInfo);

    if (!ok) return updateNotification("error", error);

    const response = await createUser(userInfo);
    if (response.error) return console.log(response.error);

    navigate("/auth/verification", {
      state: { user: response.user },
      replace: true,
    });
    
  };

  useEffect(()=> {
    if(isLoggedIn) navigate("/") // we want to move our user to somewhere else
  }, [isLoggedIn])

  //user info with name email password
  const { name, email, password } = userInfo;

  return (
    <FormContainer>
      <Container>
        <form onSubmit={handleSubmit} className={commonModalClasses + " w-72"}>
          <Title>Sign up</Title>
          <FormInput
            label="Name"
            placeholder="name"
            name="name"
            value={name}
            onChange={handleChange}
          ></FormInput>
          <FormInput
            label="Email"
            placeholder="name@email.com"
            name="email"
            value={email}
            onChange={handleChange}
          ></FormInput>
          <FormInput
            label="Password"
            placeholder="********"
            name="password"
            value={password}
            type="password"
            onChange={handleChange}
          ></FormInput>
          <Submit value="Sign up"></Submit>
          <div className="flex justify-between">
            <CustomLink to="/auth/forget-password">Forget Password</CustomLink>
            <CustomLink to="/auth/signin">Sign in</CustomLink>
          </div>
        </form>
      </Container>
    </FormContainer>
  );
}
