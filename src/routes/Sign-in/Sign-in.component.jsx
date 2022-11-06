import { Link } from "react-router-dom";

import Alerts from "../../components/Alerts/alerts.component";

import { useState, useRef } from "react";
import { signInwithAuth, signInwithGooglePopup } from "../../utils/firebase/firebase.utils";

//Error Fields
const defaultErrors = []

const Login = () => {

    const [errorAlerts, setErrorAlerts] = useState(defaultErrors);

    const emailRef = useRef();
    const passRef = useRef();

    //Login Using Google
    const logGoogleUser = async () => {
        await signInwithGooglePopup();
        resetErrorAlerts();
    }

    //Login Using Email Password
    const handleSubmit = async (event) => {
        event.preventDefault();
        resetErrorAlerts();
        try {
            await signInwithAuth(emailRef.current.value, passRef.current.value);
            resetFormFields();
            resetErrorAlerts();
        } catch (error) {
            addError(error);
        }
    }

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
        emailRef.current.value = "";
        passRef.current.value = "";
    }

    return (
        <div className="login">
            <div className="loginForm">
                <h3>Login</h3>
                <Alerts errors={errorAlerts} />

                <button onClick={logGoogleUser} className="Google">Sign in with Google</button>
                <form onSubmit={handleSubmit}>
                    <input type="email" placeholder='Email Address' name="email" ref={emailRef} required />
                    <input type="password" placeholder='Password' name="password" ref={passRef} required />
                    <button className="Submit">Login</button>
                </form>
                <span>Don't Have an Account? <Link className="animate" to="/Sign-up">Sign up</Link></span>
            </div>
        </div>
    )
}

export default Login;