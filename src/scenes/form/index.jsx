import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as Yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { Link } from "react-router-dom";
import GoogleButton from "react-google-button";
import { UserAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styled from "styled-components";
// Import toastify css file
import 'react-toastify/dist/ReactToastify.css';
 

const Form = () => {

  const { googleSignIn, user } = UserAuth();
  const navigate = useNavigate();
  const showToastMessage = () => {
    toast.success('Signing in!', {
        position: toast.POSITION.TOP_RIGHT, 
        className: 'toast-message'
    });
  };

  const showToastMessage1 = () => {
    toast.success('Account created!', {
        position: toast.POSITION.BOTTOM_CENTER, 
        className: 'toast-message1'
    });
  };

  const handleGoogleSignIn = async () => {
    try {
      
      console.log("SignedIN")
      await googleSignIn();
      // swal({
      //   title: "Logged in Successfuly!",
      //   text: "",
      //   icon: "success",
      //   button: "Ok",
      // });


    } catch (error) {
      console.log(error);
      toast.error("Error Occured")
    }
  };

  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleFormSubmit = async (values) => {
    console.log(values);

    let result = await fetch("http://localhost:5000/register", {
      method: "post",
      body: JSON.stringify(values),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    console.log(result);
  };

  useEffect(() => {
    if (user != null) {
      navigate("/");
    }
  }, [user]);

  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    contact: "",
    address1: "",
    address2: "",
  });

  let name, value;

  const handleInputs = (e) => {
    console.log(e);
    name = e.target.name;
    value= e.target.value;

    setUserData(...user, {[name]:value});
  }

  const PostData = async (e) => {
    e.preventDefault();

    const {firstName, lastName, email, contact, address1, address2} = user;
    const res = await fetch("/register",{
      method: "POST",
      headers: {
        "content-Type" : "application/json"
      },
      body: JSON.stringify({
        firstName, lastName, email, contact, address1, address2
      })
    });

    const data = await res.json();

    if(data.status == 422 || !data){
      // window.alert("Invalid Registration");
      console.log("Invalid Registratiion");
    }
    else{
      // windows.alert("Registration Successfull");
      console.log("Successfull Registration");

      // history.pushState("/login");
    }
  }


  return (
    <Box m="20px">
      <Header title="CREATE USER" subtitle="Create a New User Profile" />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit} method="POST">
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="First Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.firstName}
                name="firstName"
                error={!!touched.firstName && !!errors.firstName}
                helperText={touched.firstName && errors.firstName}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Last Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.lastName}
                name="lastName"
                error={!!touched.lastName && !!errors.lastName}
                helperText={touched.lastName && errors.lastName}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="email"
                label="Email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name="email"
                error={!!touched.email && !!errors.email}
                helperText={touched.email && errors.email}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Contact Number"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.contact}
                name="contact"
                error={!!touched.contact && !!errors.contact}
                helperText={touched.contact && errors.contact}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="password"
                label="Password"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.address1}
                name="address1"
                error={!!touched.address1 && !!errors.address1}
                helperText={touched.address1 && errors.address1}
                sx={{ gridColumn: "span 4" }}
              />

              <TextField
                fullWidth
                variant="filled"
                type="password"
                label="Confirm password"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.address2}
                name="address2"
                error={!!touched.address2 && !!errors.address2}
                helperText={touched.address2 && errors.address2}
                sx={{ gridColumn: "span 4" }}
              />

              
            </Box>
              
            <Button onClick={showToastMessage}>
            <GoogleButton sx = {{ml : '10px'}} onClick={handleGoogleSignIn} className = "first"/>
            </Button>
            <ToastContainer />

            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" onClick={showToastMessage1} margin = "auto" color="secondary" variant="contained">
                <div className="sign_up" onClick={PostData}>
                  <Link to="/signup" style={{ textDecoration: 'none', color: '#ffffff', fontSize: '15px' }}>Create User</Link>
                </div>
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const checkoutSchema = Yup.object().shape({
    firstName: Yup.string().min(3).max(25).required("Enter your first name"),
    lastName: Yup.string().min(3).max(50).required("Enter your last name"),
    email: Yup.string().email().required("Enter your Email ID"),
    contact: Yup.string()
    .required("This field is Required")
    .matches(
      /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
      "Phone number is not valid"
    ),
    address1: Yup.string().min(6).required("Enter your password"),
    address2: Yup.string().required().oneOf([Yup.ref("address1"), null], "Password must match")
});
const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  contact: "",
  address1: "",
  address2: "",
};

export default Form;

const StyledAccountForm = styled.div`

  .toast-message {
    background: black;
    color: #fff;
    font-size: 20px;
    width: 20vw;
    padding: 15px 15px;
  }
  .toast-message1 {
    background: black;
    color: #fff;
    font-size: 20px;
    width: 20vw;
    padding: 15px 15px;
  }
`
