import React from "react";
import { auth } from "./firebase.config";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { useState } from "react";
import "./app.css";

export default function App() {
  const [number, setNumber] = useState("+63");
  const [otp, setOtp] = useState("");

  function signNow() {
    window.recaptchaVerifier = new RecaptchaVerifier(
      "sign-in-button",
      {
        // size: "invisible",
        callback: (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          console.log(response);
        },
      },
      auth
    );

    const appVerifier = window.recaptchaVerifier;

    signInWithPhoneNumber(auth, number, appVerifier)
      .then((response) => {
        window.confirmOpt = response;
      })
      .catch((err) => console.log(err));
  }

  function optVerify() {
    if (otp.length < 6) {
      alert("Please enter a valid OTP");
    } else {
      let confirmtheopt = window.confirmOpt;
      confirmtheopt
        .confirm(otp)
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    }
  }

  return (
    <div>
      <h1>Hello</h1>

      <input
        type="text"
        placeholder="Number"
        value={number}
        onChange={(val) => setNumber(val.target.value)}
      />
      <button onClick={signNow}>Sign</button>

      <input
        type="text"
        placeholder="OTP"
        value={otp}
        onChange={(val) => setOtp(val.target.value)}
      />
      <button onClick={optVerify}>OPT</button>

      {/* recapcha */}
      <div id="sign-in-button" className="rechapcha"></div>
    </div>
  );
}
