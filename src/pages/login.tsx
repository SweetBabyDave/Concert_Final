import { useState } from "react";
import { auth } from "../lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    function login() {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user
                console.log("User is" + user);
            })
    }

    return (
        <div className="bones">
            <div>
                <h1>Login</h1>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
                <div className="login-commands">
                    <button onClick={login}>Login</button>
                    <button onClick={() => navigate('/signup')}>Signup</button>
                </div>
            </div>
        </div>
    )
}