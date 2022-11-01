import './Signin.styles.scss'

import { signInwithGooglePopup, createUserDocumentFromAuth} from "../../utils/firebase/firebase.utils"

const Signin = () =>{
    const logGoogleUser = async () =>{
        const {user} = await signInwithGooglePopup();
        const userDocRef = await createUserDocumentFromAuth(user);
    }

    return (
        <div className="loginForm">
            <button onClick={logGoogleUser} className="Google">Sign In With Google</button>
            <form onSubmit={()=>{}}>
                <input type="text" placeholder='Display Name' required/>
                <input type="email" placeholder='Email Address' required/>
                <input type="password" placeholder='Password' name="pass" id="p" required/>
                <button className="Submit">Sign Up</button>
            </form>
        </div>    
    )
}

export default Signin;