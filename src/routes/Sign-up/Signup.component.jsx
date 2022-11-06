import "./Signup.styles.scss"

import { useState } from "react";

import { createUser, signInwithGooglePopup, createUserDocumentFromAuth, createUserDocument } from "../../utils/firebase/firebase.utils"
import { Link } from "react-router-dom";

import Alerts from "../../components/Alerts/alerts.component";

//Default Fields
const defaultFormFields = {
    display: "",
    email: "",
    password: "",
    confirmPassword: "",
}
const defaultErrors = []

const Signup = () => {

    const [errorAlerts, setErrorAlerts] = useState(defaultErrors);
    const [formFields, setFormFields] = useState(defaultFormFields);

    //Error Handling
    //Reset Error
    const resetErrorAlerts = () => {
        setErrorAlerts(defaultErrors);
    }

    //Update List
    const addErrorString = (errorString) => {
        const temp = [...errorAlerts];
        temp.push(errorString);
        setErrorAlerts(temp);
    }

    const addError = (error) => {
        addErrorString(error.code);
    }

    //Reset Data in Fields
    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    //Signup with Google
    const logGoogleUser = async () => {
        const response = await signInwithGooglePopup();
        return await createUserDocumentFromAuth(response.user);
    }

    //Signup with Email and Pass
    const handleSubmit = async (event) => {
        event.preventDefault();
        resetErrorAlerts();
        if (formFields.password !== formFields.confirmPassword) {
            addErrorString("Passwords don't match");
            return;
        }

        try {
            const response = await createUser(formFields.email, formFields.password);
            await createUserDocument(response, formFields.display);
            resetFormFields();
        } catch (error) {
            addError(error);
        }

    }

    //Sync Input data with Form Hook
    const handleChange = (event) => {
        setFormFields({ ...formFields, [event.target.name]: event.target.value });
    }

    return (
        <div className="Signup">
            <div className="loginForm">
                <h3>Sign Up</h3>
                <Alerts errors={errorAlerts} />

                <button onClick={logGoogleUser} className="Google">Sign up with Google</button>
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder='Display Name' name="display" onChange={handleChange} value={formFields.display} required />
                    <input type="email" placeholder='Email Address' name="email" onChange={handleChange} value={formFields.email} required />
                    <input type="password" placeholder='Password' name="password" onChange={handleChange} value={formFields.password} required />
                    <input type="password" placeholder='Confirm Password' name="confirmPassword" onChange={handleChange} value={formFields.confirmPassword} required />
                    <button className="Submit">Sign Up</button>
                </form>
                <span>Already Have an Account? <Link className="animate" to="/Login">Login</Link></span>
            </div>
        </div>

    )
}

export default Signup;