import "./Signin.styles.scss"

import { useState } from "react";

import { signInwithGooglePopup, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils"
import { eventWrapper } from "@testing-library/user-event/dist/utils";

const logGoogleUser = async () => {
    const { user } = await signInwithGooglePopup();
    const userDocRef = await createUserDocumentFromAuth(user);
}

const defaultFormFields = {
    display: "",
    email: "",
    password: "",
    confirmPassword: "",
}

const Signin = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);

    const handleChange = (event) => {
        setFormFields({ ...formFields, [event.target.name]: event.target.value });
    }

    return (
        <div className="Signup">
            <h2>Sign-in Page</h2>
            <div className="loginForm">
                <button onClick={logGoogleUser} className="Google">Sign In With Google</button>
                <form onSubmit={() => { }}>
                    <input type="text" placeholder='Display Name' name="display" onChange={handleChange} value={formFields.display} required />
                    <input type="email" placeholder='Email Address' name="email" onChange={handleChange} value={formFields.email} required />
                    <input type="password" placeholder='Password' name="password" onChange={handleChange} value={formFields.password} required />
                    <input type="password" placeholder='Confirm Password' name="confirmPassword" onChange={handleChange} value={formFields.confirmPassword} required />
                    <button className="Submit">Sign Up</button>
                </form>
            </div>
        </div>

    )
}

export default Signin;