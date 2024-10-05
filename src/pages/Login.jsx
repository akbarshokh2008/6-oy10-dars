import React, { useRef, useState } from "react";
import Close from "../img/close.svg";
import Openeye from "../img/openeye.svg";
import { useNavigate } from "react-router-dom";
import http from "../axios";

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const formRef = useRef();

  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  function validatePassword(password) {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (regex.test(password)) {
      return true;
    } else {
      return false;
    }
  }
  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  function validate() {
    // EMAIL
    if (!validateEmail(emailRef.current.value)) {
      setErrorEmail("email xato");
      emailRef.current.focus();
      emailRef.current.style.outlineColor = "red";
    } else {
      setErrorEmail("");
      emailRef.current.style.outlineColor = "none";
    }
    // PASSWORD
    if (!validatePassword(passwordRef.current.value)) {
      setErrorPassword("password xato");
      passwordRef.current.focus();
      passwordRef.current.style.outlineColor = "red";
    } else {
      setErrorPassword("");
      passwordRef.current.style.outlineColor = "black";
    }

    return true;
  }
  function handleRegister(e) {
    e.preventDefault();
    const valid = validate();
    if (!valid) {
      return;
    }

    const user = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
    http
      .post("/auth/login", user, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((data) => {
        if (data.data.message === "success") {
          localStorage.setItem("token", data.data.token);
          localStorage.setItem("user", data.data);
          navigate("/");
        }
        console.log(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function togglePassword() {
    setShowPassword(!showPassword);
  }
  return (
    <div className="login pt-[10%]">
      <form
        ref={formRef}
        className="w-1/4 flex flex-col rounded-lg pt-10 py-3 px-5 mx-auto  border-2 border-solid border-white bg-inherit gap-8 backdrop-blur-sm"
      >
        <h1 className="text-white  text-center font-bold text-5xl mb-2">
          Login
        </h1>

        {errorEmail && <p className="text-red-700 mb-[-5px]">{errorEmail}</p>}
        <input
          className="rounded-md outline-none p-2 "
          type="email"
          ref={emailRef}
          placeholder="Enter email..."
          required
        />
        {errorPassword && (
          <p className="text-red-700 mb-[-5px]">{errorPassword}</p>
        )}

        <div className="flex showRe justify-between">
          <input
            ref={passwordRef}
            type={showPassword ? "text" : "password"}
            id="password"
            className=" w-full rounded-md outline-none p-2"
            placeholder="Enter password..."
            required
          />
          <button
            type="button"
            className="mr-2 cursor-pointer"
            onClick={togglePassword}
          >
            {showPassword ? (
              <img src={Openeye} alt="" width={30} />
            ) : (
              <img src={Close} alt="" width={30} />
            )}
          </button>
        </div>

        <button
          type="submit"
          onClick={handleRegister}
          className="border py-2 px-3 mb-4 text-white rounded-md"
        >
          Login
        </button>
      </form>
    </div>
  );
}
