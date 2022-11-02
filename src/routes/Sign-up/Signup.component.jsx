import "./Signup.styles.scss"

import { useState } from "react";

import { createUser, signInwithGooglePopup, createUserDocumentFromAuth, createUserDocument } from "../../utils/firebase/firebase.utils"
import { Link } from "react-router-dom";

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

const Signup = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);

    //Reset Data in Fields
    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    //Handling Submit Form
    const handleSubmit = async (event) =>{
        event.preventDefault();
        if(formFields.password != formFields.confirmPassword){
            alert("Passwords don't match!");
            return;
        }

        try{
            const response = await createUser(formFields.email, formFields.password);
            const ref = await createUserDocument(response, formFields.display);
            resetFormFields();
        }catch(error){
            console.log(error);
        }
        
    }

    //Sync Input data with Form Hook
    const handleChange = (event) => {
        setFormFields({ ...formFields, [event.target.name]: event.target.value });
    }

    return (
        <div className="Signup">
            <div className="alerts">

            </div>
            <div className="loginForm">
                <h3>Sign Up</h3>
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