import * as Yup from "yup";

export const signUpSchema = Yup.object({
    firstName: Yup.string().min(2).max(25).required("Enter your first name"),
    lastName: Yup.string().min(3).max(50).required("Enter your last name"),
    email: Yup.string().email().required("Enter your Email ID"),
    address1: Yup.string().min(6).required("Enter your password"),
    address2: Yup.string().required().oneOf([Yup.ref("address1"), null], "Password must match")
})