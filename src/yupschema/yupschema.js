import * as Yup from "yup"

export const formSignUpSchema = Yup.object({
    name: Yup.string().required("enter your name"),
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string().min(4).required("password required"),
    c_password: Yup.string().required("confirm password required").oneOf([Yup.ref("password"), null], "password not match"),
})

export const LoginSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string().required("password required")
})


const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

export const editinfoSchema=Yup.object({
    name: Yup.string().required("enter your name"),
    contact: Yup.string().min(10).max(10).matches(phoneRegExp, "Phone number is not valid"),
    address: Yup.string(),
})

export const emailVerifySchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Required"),
   
})

export const passwordChecking = Yup.object({
    password: Yup.string().min(4).required("password required"),
    c_password: Yup.string().required("confirm password required").oneOf([Yup.ref("password"), null], "password not match"),
   
})


export const shopProductSchema = Yup.object({
    title: Yup.string().required("product title"),
    description:  Yup.string().required("product description"),
    category:  Yup.string().required("product category"),
    price:  Yup.string().required("product price"),
    stock:  Yup.string().required("number of stocks available"),
    tags:  Yup.string(),
    brand:  Yup.string().required("brand name"),
    warrantyInformation:  Yup.string().required("mention warranty days"),
    availabilityStatus:  Yup.string().required("write In stock or out of stock"),
    returnPolicy:  Yup.string().required("return days"),
      images1: Yup.string().url("enter a valid url"),
      images2: Yup.string().url("enter a valid url"),
      images3: Yup.string().url("enter a valid url"),
    thumbnail: Yup.string().url("enter a valid url").required("link for thumbnail image"),
   
})