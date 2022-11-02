import { Link } from "react-router-dom";

import Alerts from "../../components/Alerts/alerts.component";

import { useState } from "react";
import { signInwithAuth, signInwithGooglePopup } from "../../utils/firebase/firebase.utils";

const logGoogleUser = async () => {
    return await signInwithGooglePopup();
}

const defaultFormFields = {
    email: "",
    password: "",
}

//Error Fields
const defaultErrors = []

const Login = () => {
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

    //Handling Submit Form
    const handleSubmit = async (event) => {
        event.preventDefault();
        resetErrorAlerts();
        try {
            const response = await signInwithAuth(formFields.email, formFields.password);
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
        <div className="login">
            <div className="loginForm">
                <h3>Login</h3>
                <Alerts errors={errorAlerts} />

                <button onClick={logGoogleUser} className="Google">Sign in with Google</button>
                <form onSubmit={handleSubmit}>
                    <input type="email" placeholder='Email Address' name="email" onChange={handleChange} value={formFields.email} required />
                    <input type="password" placeholder='Password' name="password" onChange={handleChange} value={formFields.password} required />
                    <button className="Submit">Login</button>
                </form>
                <span>Don't Have an Account? <Link className="animate" to="/Sign-up">Sign up</Link></span>
            </div>
        </div>
    )
}

export default Login;