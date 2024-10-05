import React, { useRef, useState } from "react";
import "../App.css";
import { useNavigate } from "react-router-dom";

// IMG
import Close from "../img/close.svg";
import Openeye from "../img/openeye.svg";
import http from "../axios";

export default function Register() {
  const firstRef = useRef();
  const lastRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const RePasswordRef = useRef();
  const formRef = useRef();

  const [errorFirst, setErrorFirst] = useState("");
  const [errorLast, setErrorLast] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [errorRePassword, setErrorRePassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);

  const navigate = useNavigate();
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
    // FIRSTNAME
    if (firstRef.current.value.length < 3) {
      setErrorFirst("firstname xato 3 ta sozdan koproq yozing");
      console.log(firstRef);
      firstRef.current.focus();
      firstRef.current.style.outlineColor = "red";
      return false;
    } else {
      firstRef.current.style.outlineColor = "black";
      setErrorFirst("");
    }
    // LASTNAME
    if (lastRef.current.value.length < 3) {
      setErrorFirst("lastname xato 3 ta sozdan koproq yozing");
      console.log(lastRef);
      lastRef.current.focus();
      lastRef.current.style.outlineColor = "red";
      return false;
    } else {
      lastRef.current.style.outlineColor = "black";
      setErrorLast("");
    }
    // EMAIL
    if (!validateEmail(emailRef.current.value)) {
      setErrorEmail("email xato");
      emailRef.current.focus();
      emailRef.current.style.outlineColor = "red";
    } else {
      setErrorEmail("");
      emailRef.current.style.outlineColor = "black";
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

    if (RePasswordRef.current.value != passwordRef.current.value) {
      setErrorRePassword("qayta kiritilgan password xato");
      RePasswordRef.current.focus();
      RePasswordRef.current.style.outlineColor = "red";
    } else {
      setErrorRePassword("");
      RePasswordRef.current.style.outlineColor = "black";
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
      firstName: firstRef.current.value,
      lastName: lastRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      confirmPassword: RePasswordRef.current.value,
    };
    http
      .post("/auth/register", user, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((data) => {
        if (
          data.data.message ===
          "Ro'yxatdan muvaffaqiyatli o'tdingiz! Email tasdiqlash uchun havola yuborildi."
        ) {
          navigate("/login");
        }
        console.log(data.data.message);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function togglePassword() {
    setShowPassword(!showPassword);
  }
  function toggleRePassword() {
    setShowRePassword(!showRePassword);
  }
  return (
    <div className="register pt-[10%]">
      <form
        ref={formRef}
        className="w-1/4 flex flex-col rounded-lg pt-10 py-3 px-5 mx-auto  border-2 border-solid border-white bg-inherit gap-4 backdrop-blur-sm"
      >
        <h1 className="text-white  text-center font-bold text-5xl mb-2">
          Register
        </h1>
        {errorFirst && <p className="text-red-700 mb-[-5px]">{errorFirst}</p>}
        <input
          className="rounded-md outline-none p-2 "
          type="text"
          ref={firstRef}
          placeholder="Enter first name..."
          required
        />
        {errorLast && <p className="text-red-700 mb-[-5px]">{errorLast}</p>}
        <input
          className="rounded-md outline-none p-2 "
          type="text"
          ref={lastRef}
          placeholder="Enter last name..."
          required
        />
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
            className=" w-full rounded-md outline-none p-2"
            placeholder="Enter password..."
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
        {errorRePassword && (
          <p className="text-red-700 mb-[-5px]">{errorRePassword}</p>
        )}

        <div className="flex showRe justify-between">
          <input
            ref={RePasswordRef}
            type={showRePassword ? "text" : "password"}
            className=" w-full rounded-md outline-none p-2"
            placeholder="Enter password..."
          />
          <button
            type="button"
            className="mr-2 cursor-pointer"
            onClick={toggleRePassword}
          >
            {showRePassword ? (
              <img src={Openeye} alt="" width={30} />
            ) : (
              <img src={Close} alt="" width={30} />
            )}
          </button>
        </div>
        <button
          type="submit"
          onClick={handleRegister}
          className="border py-2 px-3 text-white rounded-md"
        >
          Register
        </button>
      </form>
    </div>
  );
}
