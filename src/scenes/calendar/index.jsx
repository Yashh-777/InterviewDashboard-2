import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import styled from "styled-components";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Calendar = () => {
  const form = useRef();
  const showToastMessage = () => {
    toast.success('Email sent successfully!', {
        position: toast.POSITION.BOTTOM_CENTER, 
        className: 'toast-message'
    });
  };

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_bqkv3w4",
        "template_brrsasj",
        form.current,
        "hCzSbzKCEHRt71zEr"
      )
      .then(
        (result) => {
          console.log(result.text);
          console.log("message sent");
          e.target.reset();
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  return (
    <StyledContactForm>
      <form ref={form} onSubmit={sendEmail}>
        <label>Name</label>
        <input type="text" name="user_name" />
        <label>Your Email address</label>
        <input type="email" name="user_email" />
        <label>Receiver's Email address</label>
        <input type="email" name="r_email" />
        <label>Message</label>
        <textarea name="message" />
        <input type="submit" onClick={showToastMessage} value="Send" />
        <ToastContainer />
      </form>
    </StyledContactForm>
  );
};

export default Calendar;


const StyledContactForm = styled.div`
  width: 400px;

  .toast-message {
    background: black;
    color: #fff;
    font-size: 20px;
    width: 20vw;
    padding: 15px 15px;
  }

  form {
    display: flex;
    flex-direction: column;
    width: 100%;
    font-size: 16px;
    margin-left: 30px;
    justify-content: 'center';
    align-items: 'center';

    input {
      width: 100%;
      height: 35px;
      padding: 7px;
      outline: none;
      border-radius: 5px;
      border: 1px solid rgb(220, 220, 220);

      &:focus {
        border: 2px solid rgba(0, 206, 158, 1);
      }
    }

    textarea {
      max-width: 100%;
      min-width: 100%;
      width: 100%;
      max-height: 100px;
      min-height: 100px;
      padding: 7px;
      outline: none;
      border-radius: 5px;
      border: 1px solid rgb(220, 220, 220);

      &:focus {
        border: 2px solid rgba(0, 206, 158, 1);
      }
    }

    label {
      margin-top: 1rem;
    }

    input[type="submit"] {
      margin-top: 2rem;
      cursor: pointer;
      background: rgba(0, 206, 158, 1);
      color: white;
      border: none;
    }
  }
`;